/**
 * Operations & Front Desk Job Dispatch Service.
 * Manages daily jobs, calendar scheduling, crew/vehicle assignments, and stage transitions.
 */
import { executeSupabaseQuery, isSupabaseConfigured } from './supabaseClient.js';

// Format relative date string YYYY-MM-DD
export function getRelativeDateString(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

const todayStr = getRelativeDateString(0);
const tomorrowStr = getRelativeDateString(1);
const dayAfterStr = getRelativeDateString(2);
const yesterdayStr = getRelativeDateString(-1);
const nextWeekStr = getRelativeDateString(4);

// Production operational jobs store with rich Scottish seed data
let jobsDatabase = [
  {
    id: 'JOB-2601',
    quoteId: 'lead-s29k1',
    customerName: 'Alistair Campbell',
    customerPhone: '+44 7700 900412',
    customerEmail: 'a.campbell.scot@gmail.com',
    moveDate: todayStr,
    timeWindow: '08:30 - 09:30 AM',
    pickupAddress: 'Flat 3/2, 112 Nethergate, Dundee, DD1 4AF',
    pickupFloor: '3rd Floor (Tenement)',
    pickupLift: false,
    deliveryAddress: '14 Panmure Terrace, Broughty Ferry, DD5 2QL',
    deliveryFloor: 'Ground Floor / Cottage',
    deliveryLift: false,
    assignedVehicle: '3.5T Luton Box Van "SCOT 24" (Tail-Lift)',
    assignedCrew: ['Callum (Lead Mover)', 'Ross (Porter)'],
    stairEquipmentRequired: true,
    jobStatus: 'on_site_loading',
    itemsCount: 32,
    estimatedVolumeM3: 16.5,
    finalPrice: 360,
    depositPaid: 50,
    balanceDue: 310,
    paymentStatus: 'deposit_received',
    notes: 'Upper tenement stair carry. Electric stair crawler and furniture blankets allocated. Heavy mahogany dining suite.',
    materialsKit: 'Tenement 2-Bed Moving Bundle',
    inventoryItems: [
      { name: '3-Seater Chesterfield Sofa', count: 1, m3: 1.6 },
      { name: 'King Size Bed & Mattress', count: 1, m3: 1.8 },
      { name: 'Mahogany Dining Table & 6 Chairs', count: 1, m3: 2.2 },
      { name: 'Washing Machine', count: 1, m3: 0.5 },
      { name: 'Double Wardrobe', count: 2, m3: 2.4 },
      { name: 'Book & Medium Packing Boxes', count: 24, m3: 3.6 }
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'JOB-2602',
    quoteId: 'lead-m92j2',
    customerName: 'Morag MacLeod',
    customerPhone: '+44 7891 234567',
    customerEmail: 'morag.macleod@outlook.com',
    moveDate: todayStr,
    timeWindow: '01:30 - 02:30 PM',
    pickupAddress: '22 Perth Road, Dundee, DD1 4LN',
    pickupFloor: '1st Floor Flat',
    pickupLift: true,
    deliveryAddress: '8 St Andrews Road, Cupar, Fife, KY15 4HA',
    deliveryFloor: '1st Floor Flat',
    deliveryLift: false,
    assignedVehicle: 'LWB High-Roof Sprinter "TAYSIDE 1"',
    assignedCrew: ['Liam (Driver)', 'Jamie (Porter)'],
    stairEquipmentRequired: false,
    jobStatus: 'crew_dispatched',
    itemsCount: 18,
    estimatedVolumeM3: 11.2,
    finalPrice: 280,
    depositPaid: 50,
    balanceDue: 230,
    paymentStatus: 'deposit_received',
    notes: 'Customer has parking suspension reserved outside 22 Perth Road. Lift available at collection.',
    materialsKit: 'Standard Flat Kit',
    inventoryItems: [
      { name: '2-Seater Fabric Sofa', count: 1, m3: 1.2 },
      { name: 'Double Bed & Base', count: 1, m3: 1.5 },
      { name: 'Writing Desk & Office Chair', count: 1, m3: 0.8 },
      { name: 'Large Flat Screen TV (Wrapped)', count: 1, m3: 0.3 },
      { name: 'Medium Boxes', count: 14, m3: 2.1 }
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'JOB-2603',
    quoteId: 'lead-k18v9',
    customerName: 'Dr. Fiona Henderson',
    customerPhone: '+44 7912 345678',
    customerEmail: 'fiona.henderson@st-andrews.ac.uk',
    moveDate: tomorrowStr,
    timeWindow: '09:00 - 10:00 AM',
    pickupAddress: '45 Blackness Road, Dundee, DD1 5PD',
    pickupFloor: '2nd Floor (Tenement)',
    pickupLift: false,
    deliveryAddress: '12 South Street, St Andrews, Fife, KY16 9QU',
    deliveryFloor: '2nd Floor Flat',
    deliveryLift: true,
    assignedVehicle: '3.5T Luton Box Van "SCOT 24" (Tail-Lift)',
    assignedCrew: ['Callum (Lead Mover)', 'Ross (Porter)', 'Euan (Porter)'],
    stairEquipmentRequired: true,
    jobStatus: 'scheduled',
    itemsCount: 42,
    estimatedVolumeM3: 19.8,
    finalPrice: 480,
    depositPaid: 100,
    balanceDue: 380,
    paymentStatus: 'deposit_received',
    notes: 'Delicate academic book collection (30+ heavy boxes). Requires 3-man crew for Blackness Road stone stairs.',
    materialsKit: 'Full House 4-Bed Pack',
    inventoryItems: [
      { name: 'Solid Oak Bookcases', count: 3, m3: 2.7 },
      { name: 'King Size Ottoman Bed', count: 1, m3: 2.0 },
      { name: 'Chesterfield Armchairs', count: 2, m3: 1.6 },
      { name: 'Heavy Book Boxes', count: 30, m3: 4.5 },
      { name: 'Kitchen Dishware Barrels', count: 4, m3: 1.0 }
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'JOB-2604',
    quoteId: 'lead-f44z3',
    customerName: 'Gregor & Kirsty Stewart',
    customerPhone: '+44 7723 889900',
    customerEmail: 'stewart.family@btinternet.com',
    moveDate: dayAfterStr,
    timeWindow: '08:00 - 09:00 AM',
    pickupAddress: '18 Strathmartine Road, Dundee, DD3 7SD',
    pickupFloor: 'Ground Floor Villa',
    pickupLift: false,
    deliveryAddress: '5 Marchmont Crescent, Edinburgh, EH9 1HN',
    deliveryFloor: '3rd Floor Tenement',
    deliveryLift: false,
    assignedVehicle: '3.5T Luton Box Van "SCOT 24" (Tail-Lift)',
    assignedCrew: ['Callum (Lead Mover)', 'Liam (Driver)', 'Ross (Porter)'],
    stairEquipmentRequired: true,
    jobStatus: 'scheduled',
    itemsCount: 38,
    estimatedVolumeM3: 18.0,
    finalPrice: 560,
    depositPaid: 100,
    balanceDue: 460,
    paymentStatus: 'deposit_received',
    notes: 'Long distance run Dundee ➔ Edinburgh. Marchmont tenement staircase is traditional spiral stone with narrow landing.',
    materialsKit: 'Tenement 2-Bed Moving Bundle',
    inventoryItems: [
      { name: 'Corner Sectional Sofa', count: 1, m3: 2.8 },
      { name: 'King Bed & Mattress', count: 1, m3: 1.8 },
      { name: 'Double Wardrobe (Dismantled)', count: 2, m3: 1.5 },
      { name: 'American Fridge Freezer', count: 1, m3: 1.2 },
      { name: 'Cardboard Removal Boxes', count: 26, m3: 3.9 }
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'JOB-2600',
    quoteId: 'lead-prev1',
    customerName: 'David Patterson',
    customerPhone: '+44 7700 900555',
    customerEmail: 'd.patterson@dundeetech.com',
    moveDate: yesterdayStr,
    timeWindow: '09:00 - 10:00 AM',
    pickupAddress: '9 Dock Street, Dundee, DD1 4BT',
    pickupFloor: '2nd Floor Flat',
    pickupLift: true,
    deliveryAddress: '3 Westfield Place, Dundee, DD2 1DL',
    deliveryFloor: 'Ground Floor',
    deliveryLift: false,
    assignedVehicle: 'LWB High-Roof Sprinter "TAYSIDE 1"',
    assignedCrew: ['Liam (Driver)', 'Jamie (Porter)'],
    stairEquipmentRequired: false,
    jobStatus: 'completed',
    itemsCount: 15,
    estimatedVolumeM3: 8.5,
    finalPrice: 220,
    depositPaid: 50,
    balanceDue: 0,
    paymentStatus: 'settled_in_full',
    notes: 'Move completed cleanly. Customer gave 5-star Google review.',
    materialsKit: 'Student Pack',
    inventoryItems: [],
    updatedAt: new Date().toISOString()
  }
];

export function getTodayJobs() {
  return jobsDatabase.filter(j => j.moveDate === todayStr);
}

export function getTomorrowJobs() {
  return jobsDatabase.filter(j => j.moveDate === tomorrowStr);
}

export function getAllJobs() {
  return [...jobsDatabase];
}

export function getJobsByDate(dateStr) {
  return jobsDatabase.filter(j => j.moveDate === dateStr);
}

export function getJobById(id) {
  return jobsDatabase.find(j => j.id === id) || null;
}

export function createJob(jobData) {
  const newJob = {
    id: jobData.id || `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
    quoteId: jobData.quoteId || null,
    customerName: jobData.customerName || 'Customer',
    customerPhone: jobData.customerPhone || '',
    customerEmail: jobData.customerEmail || '',
    moveDate: jobData.moveDate || todayStr,
    timeWindow: jobData.timeWindow || '08:30 - 09:30 AM',
    pickupAddress: jobData.pickupAddress || 'Address to be confirmed',
    pickupFloor: jobData.pickupFloor || 'Ground Floor',
    pickupLift: Boolean(jobData.pickupLift),
    deliveryAddress: jobData.deliveryAddress || 'Address to be confirmed',
    deliveryFloor: jobData.deliveryFloor || 'Ground Floor',
    deliveryLift: Boolean(jobData.deliveryLift),
    assignedVehicle: jobData.assignedVehicle || '3.5T Luton Box Van "SCOT 24" (Tail-Lift)',
    assignedCrew: Array.isArray(jobData.assignedCrew) ? jobData.assignedCrew : ['Callum (Lead Mover)', 'Ross (Porter)'],
    stairEquipmentRequired: Boolean(jobData.stairEquipmentRequired || (jobData.pickupFloor && jobData.pickupFloor.includes('Tenement'))),
    jobStatus: jobData.jobStatus || 'scheduled',
    itemsCount: parseInt(jobData.itemsCount, 10) || 20,
    estimatedVolumeM3: parseFloat(jobData.estimatedVolumeM3) || 12.0,
    finalPrice: Math.round(parseFloat(jobData.finalPrice) || 280),
    depositPaid: Math.round(parseFloat(jobData.depositPaid) || 50),
    balanceDue: Math.round((parseFloat(jobData.finalPrice) || 280) - (parseFloat(jobData.depositPaid) || 50)),
    paymentStatus: jobData.paymentStatus || 'deposit_received',
    notes: jobData.notes || '',
    materialsKit: jobData.materialsKit || 'Standard Flat Kit',
    inventoryItems: jobData.inventoryItems || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  jobsDatabase.unshift(newJob);

  if (isSupabaseConfigured()) {
    try {
      executeSupabaseQuery('jobs', {
        method: 'POST',
        body: {
          quote_id: newJob.quoteId,
          customer_name: newJob.customerName,
          customer_phone: newJob.customerPhone,
          move_date: newJob.moveDate,
          time_window: newJob.timeWindow,
          pickup_address: newJob.pickupAddress,
          pickup_floor: newJob.pickupFloor,
          pickup_lift: newJob.pickupLift,
          delivery_address: newJob.deliveryAddress,
          delivery_floor: newJob.deliveryFloor,
          delivery_lift: newJob.deliveryLift,
          assigned_crew: newJob.assignedCrew,
          job_status: newJob.jobStatus,
          final_price: newJob.finalPrice,
          deposit_paid: newJob.depositPaid,
          balance_due: newJob.balanceDue,
          payment_status: newJob.paymentStatus
        }
      }).catch(() => {});
    } catch (_) {}
  }

  return newJob;
}

export function updateJobStatus(id, newStatus) {
  const job = getJobById(id);
  if (!job) return null;
  job.jobStatus = newStatus;
  job.updatedAt = new Date().toISOString();
  return job;
}

export function updateJobAssignment(id, vehicle, crew) {
  const job = getJobById(id);
  if (!job) return null;
  if (vehicle) job.assignedVehicle = vehicle;
  if (crew) job.assignedCrew = Array.isArray(crew) ? crew : [crew];
  job.updatedAt = new Date().toISOString();
  return job;
}

export function updatePaymentStatus(id, newStatus, balanceSettled = false) {
  const job = getJobById(id);
  if (!job) return null;
  job.paymentStatus = newStatus;
  if (balanceSettled) {
    job.balanceDue = 0;
  }
  job.updatedAt = new Date().toISOString();
  return job;
}
