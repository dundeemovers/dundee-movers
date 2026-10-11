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

// Clean operational jobs store (all test data cleared)
let jobsDatabase = [];

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
