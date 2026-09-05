/**
 * In-Memory & Modular CRM Leads Management Service.
 * Easily extensible with SQLite, PostgreSQL, or Supabase.
 */

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

export function getAllLeads(filter = {}) {
  let result = [...leadsDatabase];
  if (filter.status) {
    result = result.filter(lead => lead.status === filter.status);
  }
  return result;
}

export function getLeadById(id) {
  return leadsDatabase.find(lead => lead.id === id) || null;
}

export function createLead(leadData) {
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
    estimatedVolumeM3: leadData.estimatedVolumeM3 || 0,
    recommendedVan: leadData.recommendedVan || '3.5T Luton Van',
    recommendedCrew: leadData.recommendedCrew || '2 Movers',
    status: 'new',
    notes: leadData.notes || ''
  };

  leadsDatabase.unshift(newLead);
  return newLead;
}

export function updateLeadStatus(id, newStatus) {
  const lead = getLeadById(id);
  if (!lead) return null;
  lead.status = newStatus;
  lead.updatedAt = new Date().toISOString();
  return lead;
}
