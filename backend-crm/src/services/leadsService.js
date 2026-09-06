/**
 * In-Memory & Modular CRM Leads Management Service.
 * Synchronizes with Supabase leads_quotes table with zero-config local fallback.
 */
import { executeSupabaseQuery, isSupabaseConfigured } from './supabaseClient.js';
import {
  sendEmailWithResend,
  generateInquiryReceivedEmailHtml,
  generateTailoredQuoteEmailHtml,
  generateQuoteAcceptedEmailHtml,
  generateInternalLeadNotificationHtml
} from './emailService.js';

// Production in-memory leads store (starts empty)
const leadsDatabase = [];

function mapLeadRow(r) {
  return {
    id: r.id,
    createdAt: r.created_at,
    customerName: r.customer_name,
    customerPhone: r.customer_phone || '',
    customerEmail: r.customer_email || '',
    moveType: r.move_type,
    moveDate: r.preferred_date || '',
    pickupAddress: r.pickup_address,
    pickupFloor: r.pickup_floor,
    pickupLift: Boolean(r.pickup_lift),
    deliveryAddress: r.delivery_address,
    deliveryFloor: r.delivery_floor,
    deliveryLift: Boolean(r.delivery_lift),
    estimatedVolumeM3: parseFloat(r.estimated_volume_m3) || 0,
    recommendedVan: r.recommended_van || '3.5T Luton Van with Tail-Lift',
    recommendedCrew: r.recommended_crew || '2-Man Tenement Crew',
    status: r.status || 'new',
    notes: r.custom_notes || '',
    quotedPrice: r.quoted_price ? parseFloat(r.quoted_price) : (r.estimated_price_min || null),
    depositAmount: r.deposit_amount ? parseFloat(r.deposit_amount) : 50,
    quoteExpiresAt: r.quote_expires_at || null,
    acceptedAt: r.accepted_at || null,
    acceptedSignature: r.accepted_signature || null,
    selectedAddons: r.selected_addons || []
  };
}

export async function getAllLeads(filter = {}) {
  if (isSupabaseConfigured()) {
    try {
      const data = await executeSupabaseQuery('leads_quotes?select=*&order=created_at.desc');
      if (Array.isArray(data) && data.length > 0) {
        return data.map(mapLeadRow);
      }
    } catch (_) {}
  }

  let result = [...leadsDatabase];
  if (filter.status) {
    result = result.filter(lead => lead.status === filter.status);
  }
  return result;
}

export async function getLeadById(id) {
  if (isSupabaseConfigured()) {
    try {
      const data = await executeSupabaseQuery(`leads_quotes?id=eq.${id}&select=*`);
      if (Array.isArray(data) && data[0]) {
        return mapLeadRow(data[0]);
      }
    } catch (_) {}
  }
  return leadsDatabase.find(lead => lead.id === id) || null;
}

export async function createLead(leadData) {
  const newLead = {
    id: `lead-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    customerName: leadData.customerName || 'Inquiry Customer',
    customerPhone: leadData.customerPhone || '',
    customerEmail: leadData.customerEmail || '',
    moveType: leadData.moveType || 'House / Flat Move',
    moveDate: leadData.moveDate || '',
    pickupAddress: leadData.pickupAddress || '',
    pickupFloor: leadData.pickupFloor || 'Ground Floor / Bungalow',
    pickupLift: Boolean(leadData.pickupLift),
    deliveryAddress: leadData.deliveryAddress || '',
    deliveryFloor: leadData.deliveryFloor || 'Ground Floor / Bungalow',
    deliveryLift: Boolean(leadData.deliveryLift),
    estimatedVolumeM3: parseFloat(leadData.estimatedVolumeM3) || 0,
    recommendedVan: leadData.recommendedVan || '3.5T Luton Van with Tail-Lift',
    recommendedCrew: leadData.recommendedCrew || '2-Man Tenement Crew',
    status: 'new',
    notes: leadData.notes || '',
    items: leadData.items || {},
    quotedPrice: null,
    depositAmount: 50,
    quoteExpiresAt: null,
    acceptedAt: null,
    acceptedSignature: null,
    selectedAddons: []
  };

  leadsDatabase.unshift(newLead);

  if (isSupabaseConfigured()) {
    try {
      const spPayload = {
        customer_name: newLead.customerName,
        customer_phone: newLead.customerPhone,
        customer_email: newLead.customerEmail,
        move_type: newLead.moveType,
        preferred_date: newLead.moveDate || null,
        pickup_address: newLead.pickupAddress,
        pickup_postcode: leadData.pickupPostcode || 'DD1 1AA',
        pickup_floor: newLead.pickupFloor,
        pickup_lift: newLead.pickupLift,
        delivery_address: newLead.deliveryAddress,
        delivery_postcode: leadData.deliveryPostcode || 'DD1 1AA',
        delivery_floor: newLead.deliveryFloor,
        delivery_lift: newLead.deliveryLift,
        estimated_volume_m3: newLead.estimatedVolumeM3,
        recommended_van: newLead.recommendedVan,
        recommended_crew: newLead.recommendedCrew,
        custom_notes: newLead.notes,
        items: newLead.items,
        status: 'new',
        source: 'website_wizard'
      };
      await executeSupabaseQuery('leads_quotes', {
        method: 'POST',
        body: spPayload
      });
    } catch (err) {
      console.warn('[LeadsService] Error syncing lead to Supabase:', err.message);
    }
  }

  // Asynchronously dispatch confirmation and team notification emails
  (async () => {
    try {
      if (newLead.customerEmail && newLead.customerEmail.includes('@')) {
        await sendEmailWithResend({
          to: newLead.customerEmail,
          subject: 'We Have Received Your Move Details — Dundee Movers',
          html: generateInquiryReceivedEmailHtml(newLead),
          customerName: newLead.customerName,
          templateType: 'inquiry_received',
          quoteId: newLead.id
        });
      }

      await sendEmailWithResend({
        to: 'bookings@dundeemovers.co.uk',
        subject: `🚨 New Move Inquiry: ${newLead.customerName} (${newLead.pickupFloor} ➔ ${newLead.deliveryFloor})`,
        html: generateInternalLeadNotificationHtml(newLead),
        customerName: 'Dundee Movers Team',
        templateType: 'internal_lead_alert',
        quoteId: newLead.id
      });
    } catch (emailErr) {
      console.warn('[LeadsService] Automatic email dispatch exception:', emailErr.message);
    }
  })();

  return newLead;
}

export async function prepareAndSendMovePass(leadId, quoteData = {}) {
  const lead = await getLeadById(leadId);
  if (!lead) return { success: false, error: 'Lead not found' };

  const quotedPrice = parseFloat(quoteData.quotePrice || quoteData.quotedPrice || lead.quotedPrice || 280);
  const depositAmount = parseFloat(quoteData.depositAmount || lead.depositAmount || 50);
  const assignedVan = quoteData.assignedVan || lead.recommendedVan || '3.5T Luton Van with Tail-Lift';
  const assignedCrew = quoteData.assignedCrew || lead.recommendedCrew || '2-Man Tenement Crew';
  
  // 48 hour hold period
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

  lead.status = 'quoted';
  lead.quotedPrice = quotedPrice;
  lead.depositAmount = depositAmount;
  lead.recommendedVan = assignedVan;
  lead.recommendedCrew = assignedCrew;
  lead.quoteExpiresAt = expiresAt;

  if (isSupabaseConfigured()) {
    try {
      await executeSupabaseQuery(`leads_quotes?id=eq.${leadId}`, {
        method: 'PATCH',
        body: {
          status: 'quoted',
          quoted_price: quotedPrice,
          deposit_amount: depositAmount,
          recommended_van: assignedVan,
          recommended_crew: assignedCrew,
          quote_expires_at: expiresAt,
          updated_at: new Date().toISOString()
        }
      });
    } catch (err) {
      console.warn('[LeadsService] Error updating quote in Supabase:', err.message);
    }
  }

  // Construct direct interactive pass URL
  const passUrl = `https://dundeemovers.co.uk/#pass/${lead.id}`;

  if (quoteData.sendEmail === false) {
    return {
      success: true,
      lead,
      passUrl,
      emailResult: { success: true, skipped: true }
    };
  }

  const emailHtml = generateTailoredQuoteEmailHtml(lead, {
    quotePrice: `£${quotedPrice}`,
    depositAmount: `£${depositAmount}`,
    assignedVan,
    assignedCrew,
    passUrl
  });

  const emailRes = await sendEmailWithResend({
    to: lead.customerEmail,
    subject: `Your Dundee Movers Move Pass & Guaranteed Quote — Ref #${String(lead.id).slice(-6).toUpperCase()}`,
    html: emailHtml,
    customerName: lead.customerName,
    templateType: 'move_pass_dispatch',
    quoteId: lead.id
  });

  return {
    success: true,
    lead,
    passUrl,
    emailResult: emailRes
  };
}

export async function acceptQuotePass(leadId, acceptanceData = {}) {
  const lead = await getLeadById(leadId);
  if (!lead) return { success: false, error: 'Lead not found' };

  const acceptedAt = new Date().toISOString();
  const signature = acceptanceData.signature || lead.customerName || 'Online Verified Signature';
  const selectedAddons = acceptanceData.addons || [];
  const finalPrice = parseFloat(acceptanceData.finalPrice || lead.quotedPrice || 280);
  const depositAmount = parseFloat(lead.depositAmount || 50);

  lead.status = 'confirmed';
  lead.acceptedAt = acceptedAt;
  lead.acceptedSignature = signature;
  lead.selectedAddons = selectedAddons;
  lead.quotedPrice = finalPrice;

  if (isSupabaseConfigured()) {
    try {
      // 1. Update lead record
      await executeSupabaseQuery(`leads_quotes?id=eq.${leadId}`, {
        method: 'PATCH',
        body: {
          status: 'confirmed',
          accepted_at: acceptedAt,
          accepted_signature: signature,
          selected_addons: selectedAddons,
          quoted_price: finalPrice,
          updated_at: acceptedAt
        }
      });

      // 2. Create or sync to jobs table
      await executeSupabaseQuery('jobs', {
        method: 'POST',
        body: {
          quote_id: lead.id,
          customer_name: lead.customerName,
          customer_phone: lead.customerPhone,
          move_date: lead.moveDate || new Date().toISOString().split('T')[0],
          pickup_address: lead.pickupAddress,
          pickup_floor: lead.pickupFloor,
          pickup_lift: lead.pickupLift,
          delivery_address: lead.deliveryAddress,
          delivery_floor: lead.deliveryFloor,
          delivery_lift: lead.deliveryLift,
          assigned_crew: [lead.recommendedCrew || '2-Man Tenement Crew'],
          job_status: 'booked',
          final_price: Math.round(finalPrice),
          deposit_paid: 0,
          balance_due: Math.round(finalPrice),
          payment_status: 'deposit_pending'
        }
      });
    } catch (err) {
      console.warn('[LeadsService] Error accepting quote in Supabase:', err.message);
    }
  }

  // Dispatches customer confirmation & team alert
  (async () => {
    try {
      if (lead.customerEmail && lead.customerEmail.includes('@')) {
        await sendEmailWithResend({
          to: lead.customerEmail,
          subject: `Move Booking Confirmed — Dundee Movers (#${String(lead.id).slice(-6).toUpperCase()})`,
          html: generateQuoteAcceptedEmailHtml(lead, { finalPrice, depositAmount }),
          customerName: lead.customerName,
          templateType: 'quote_accepted_customer',
          quoteId: lead.id
        });
      }

      await sendEmailWithResend({
        to: 'bookings@dundeemovers.co.uk',
        subject: `🎉 MOVE PASS ACCEPTED: ${lead.customerName} (£${finalPrice})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #064e3b;">
            <h2>Customer Accepted Move Pass!</h2>
            <p><strong>Customer:</strong> ${lead.customerName} (${lead.customerPhone || 'No phone'})</p>
            <p><strong>Agreed Price:</strong> £${finalPrice} (Deposit due: £${depositAmount})</p>
            <p><strong>Route:</strong> ${lead.pickupAddress} ➔ ${lead.deliveryAddress}</p>
            <p><strong>Date:</strong> ${lead.moveDate || 'TBD'}</p>
            <p><strong>Signature / E-Sign:</strong> ${signature}</p>
            <p><a href="https://crm.dundeemovers.co.uk/#front-desk" style="display: inline-block; background: #064e3b; color: #fff; padding: 10px 18px; border-radius: 6px; text-decoration: none;">View in CRM Front Desk ➔</a></p>
          </div>
        `,
        customerName: 'Dundee Movers Operations',
        templateType: 'quote_accepted_alert',
        quoteId: lead.id
      });
    } catch (e) {
      console.warn('[LeadsService] Error dispatching acceptance emails:', e.message);
    }
  })();

  return { success: true, lead, finalPrice, depositAmount };
}

export function updateLeadStatus(id, newStatus) {
  const lead = leadsDatabase.find(l => l.id === id);
  if (lead) {
    lead.status = newStatus;
    lead.updatedAt = new Date().toISOString();
  }
  if (isSupabaseConfigured()) {
    executeSupabaseQuery(`leads_quotes?id=eq.${id}`, {
      method: 'PATCH',
      body: { status: newStatus, updated_at: new Date().toISOString() }
    }).catch(() => {});
  }
  return lead;
}
