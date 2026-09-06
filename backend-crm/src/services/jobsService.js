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

// Production in-memory jobs database (starts empty)
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
