/**
 * Operations & Front Desk Job Dispatch Service.
 * Manages daily jobs, Today's active fleet moves, Tomorrow's prep, and stage transitions.
 */

// Format relative date string YYYY-MM-DD
function getRelativeDateString(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

const todayStr = getRelativeDateString(0);
const tomorrowStr = getRelativeDateString(1);

// Starter in-memory jobs database
let jobsDatabase = [
  {
    id: 'job-01',
    customerName: 'Alistair Campbell',
    customerPhone: '07700 900543',
    moveDate: todayStr,
    timeWindow: '08:30 – 09:30 AM',
    pickupAddress: 'Flat 3/2, 112 Nethergate, Dundee, DD1 4EH',
    pickupFloor: '3rd Floor (Tenement / Top)',
    pickupLift: false,
    deliveryAddress: '14 Panmure Terrace, Broughty Ferry, DD5 2QL',
    deliveryFloor: 'Ground Floor / Bungalow',
    deliveryLift: false,
    assignedVehicle: 'Luton Van 1 (3.5T Electric Tail-Lift - SK21 XYZ)',
    assignedCrew: ['Callum Stewart (Lead Driver)', 'Dave Robertson (Porter)'],
    stairEquipmentRequired: true,
    jobStatus: 'on_site_loading', // scheduled, crew_dispatched, on_site_loading, in_transit, completed
    finalPrice: 320,
    depositPaid: 50,
    balanceDue: 270,
    paymentStatus: 'deposit_received',
    itemsCount: 28,
    estimatedVolumeM3: 16.5,
    notes: 'Fragile upright piano and heavy oak sideboard on 3rd floor.'
  },
  {
    id: 'job-02',
    customerName: 'Sarah Jenkins',
    customerPhone: '07812 345678',
    moveDate: todayStr,
    timeWindow: '01:30 – 02:30 PM',
    pickupAddress: '24 Blackness Avenue, Dundee, DD2 1JN',
    pickupFloor: 'Ground Floor / Bungalow',
    pickupLift: false,
    deliveryAddress: 'Flat 1/1, 89 Perth Road, Dundee, DD1 4HZ',
    deliveryFloor: '1st Floor',
    deliveryLift: false,
    assignedVehicle: 'MWB Express Van (SK69 ABC)',
    assignedCrew: ['Gordon Milne (Driver)'],
    stairEquipmentRequired: false,
    jobStatus: 'scheduled',
    finalPrice: 195,
    depositPaid: 50,
    balanceDue: 145,
    paymentStatus: 'deposit_received',
    itemsCount: 14,
    estimatedVolumeM3: 7.0,
    notes: 'Student 1-bedroom flat relocation.'
  },
  {
    id: 'job-03',
    customerName: 'Marcus Fraser',
    customerPhone: '07999 888777',
    moveDate: tomorrowStr,
    timeWindow: '09:00 – 10:00 AM',
    pickupAddress: 'Flat 4, 33 Constitution Road, Dundee, DD3 6NE',
    pickupFloor: '4th Floor or Higher',
    pickupLift: true,
    deliveryAddress: '7 St Andrews Road, Cupar, KY15 4JE',
    deliveryFloor: 'Ground Floor / Bungalow',
    deliveryLift: false,
    assignedVehicle: 'Luton Van 2 (3.5T High-Roof - SK72 DEF)',
    assignedCrew: ['Ross Barclay (Lead Driver)', 'Liam Vance (Porter)'],
    stairEquipmentRequired: false,
    jobStatus: 'scheduled',
    finalPrice: 410,
    depositPaid: 80,
    balanceDue: 330,
    paymentStatus: 'deposit_received',
    itemsCount: 36,
    estimatedVolumeM3: 22.0,
    notes: 'Working lift available at pickup. Wardrobe boxes required.'
  },
  {
    id: 'job-04',
    customerName: 'Emma Donaldson',
    customerPhone: '07722 334455',
    moveDate: tomorrowStr,
    timeWindow: '02:00 – 03:00 PM',
    pickupAddress: '15 Strathmartine Road, Dundee, DD3 7RA',
    pickupFloor: '2nd Floor (Tenement)',
    pickupLift: false,
    deliveryAddress: '5 Albert Street, Dundee, DD4 6NS',
    deliveryFloor: 'Ground Floor / Bungalow',
    deliveryLift: false,
    assignedVehicle: 'Luton Van 1 (3.5T Electric Tail-Lift - SK21 XYZ)',
    assignedCrew: ['Callum Stewart (Lead Driver)', 'Dave Robertson (Porter)'],
    stairEquipmentRequired: true,
    jobStatus: 'scheduled',
    finalPrice: 280,
    depositPaid: 50,
    balanceDue: 230,
    paymentStatus: 'deposit_received',
    itemsCount: 22,
    estimatedVolumeM3: 13.0,
    notes: 'Narrow tenement close staircase; stair dolly required.'
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

export function getJobById(id) {
  return jobsDatabase.find(j => j.id === id) || null;
}

export function updateJobStatus(id, newStatus) {
  const job = getJobById(id);
  if (!job) return null;
  job.jobStatus = newStatus;
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
