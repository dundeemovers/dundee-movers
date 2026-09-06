/**
 * In-Memory & Modular CRM Leads Management Service.
 * Synchronizes with Supabase leads_quotes table with zero-config local fallback.
 */
import { executeSupabaseQuery, isSupabaseConfigured } from './supabaseClient.js';

// Initial starter seed leads for Dundee Movers
const leadsDatabase = [
  {
    id: 'lead-001',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    customerName: 'Fiona MacLeod',
    customerPhone: '07700 900123',
    customerEmail: 'fiona.m@example.co.uk',
    moveType: 'House / Flat Move',
    moveDate: '2026-09-12',
    pickupAddress: 'Flat 2/1, 45 Perth Road, Dundee, DD1 4LN',
    pickupFloor: '2nd Floor (Tenement)',
    pickupLift: false,
    deliveryAddress: '12 Strathmartine Road, Dundee, DD3 7SD',
    deliveryFloor: 'Ground Floor / Bungalow',
    deliveryLift: false,
    estimatedVolumeM3: 14.5,
    recommendedVan: '1x 3.5T Long Wheelbase (LWB) High-Roof Van',
    recommendedCrew: '2–3 Professional Movers (Stair Equipment)',
    status: 'new',
    notes: 'Heavy antique oak dresser in master bedroom'
  },
  {
    id: 'lead-002',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    customerName: 'Callum Stewart',
    customerPhone: '07811 234567',
    customerEmail: 'c.stewart@example.com',
    moveType: 'Student Move',
    moveDate: '2026-09-18',
    pickupAddress: 'Seabraes Halls, Roseangle, Dundee, DD1 4LR',
    pickupFloor: '1st Floor',
    pickupLift: true,
    deliveryAddress: '5 Market Street, St Andrews, KY16 9NS',
    deliveryFloor: '1st Floor',
    deliveryLift: false,
    estimatedVolumeM3: 5.2,
    recommendedVan: '1x Dedicated Medium Wheelbase (MWB) Van',
    recommendedCrew: '1–2 Professional Movers',
    status: 'quoted',
    notes: 'Desk, monitor, 8 packing cartons, and bike'
  }
];

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

  return newLead;
}

export function updateLeadStatus(id, newStatus) {
  const lead = getLeadById(id);
  if (!lead) return null;
  lead.status = newStatus;
  lead.updatedAt = new Date().toISOString();
  return lead;
}
