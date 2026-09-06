/**
 * In-Memory & Modular CRM Leads Management Service.
 * Synchronizes with Supabase leads_quotes table with zero-config local fallback.
 */
import { executeSupabaseQuery, isSupabaseConfigured } from './supabaseClient.js';
import {
  sendEmailWithResend,
  generateInquiryReceivedEmailHtml,
  generateInternalLeadNotificationHtml
} from './emailService.js';

// Production in-memory leads store (starts empty)
const leadsDatabase = [];

export async function getAllLeads(filter = {}) {
  if (isSupabaseConfigured()) {
    try {
      const data = await executeSupabaseQuery('leads_quotes?select=*&order=created_at.desc');
      if (Array.isArray(data) && data.length > 0) {
        return data.map(r => ({
          id: r.id,
          createdAt: r.created_at,
          customerName: r.customer_name,
          customerPhone: r.customer_phone || '',
          customerEmail: r.customer_email || '',
          moveType: r.move_type,
          moveDate: r.preferred_date || '',
          pickupAddress: r.pickup_address,
          pickupFloor: r.pickup_floor,
          pickupLift: r.pickup_lift,
          deliveryAddress: r.delivery_address,
          deliveryFloor: r.delivery_floor,
          deliveryLift: r.delivery_lift,
          estimatedVolumeM3: parseFloat(r.estimated_volume_m3) || 0,
          recommendedVan: r.recommended_van,
          recommendedCrew: r.recommended_crew,
          status: r.status,
          notes: r.custom_notes || ''
        }));
      }
    } catch (_) {}
  }

  let result = [...leadsDatabase];
  if (filter.status) {
    result = result.filter(lead => lead.status === filter.status);
  }
  return result;
}

export function getLeadById(id) {
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
    recommendedVan: leadData.recommendedVan || '3.5T Luton Van',
    recommendedCrew: leadData.recommendedCrew || '2 Movers',
    status: 'new',
    notes: leadData.notes || ''
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

      // Internal team alert to Dundee Movers bookings inbox
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

export function updateLeadStatus(id, newStatus) {
  const lead = getLeadById(id);
  if (!lead) return null;
  lead.status = newStatus;
  lead.updatedAt = new Date().toISOString();
  return lead;
}
