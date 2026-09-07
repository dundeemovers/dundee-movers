/**
 * Jobs & Front Desk Route Handler
 */
import {
  getAllJobs,
  getTodayJobs,
  getTomorrowJobs,
  getJobsByDate,
  getJobById,
  createJob,
  updateJobStatus,
  updateJobAssignment,
  updatePaymentStatus
} from '../services/jobsService.js';

export async function handleJobsRoute(req, res, pathname, query, body) {
  // GET /api/jobs/today
  if (req.method === 'GET' && pathname === '/api/jobs/today') {
    const jobs = getTodayJobs();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ count: jobs.length, jobs }, null, 2));
  }

  // GET /api/jobs/tomorrow
  if (req.method === 'GET' && pathname === '/api/jobs/tomorrow') {
    const jobs = getTomorrowJobs();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ count: jobs.length, jobs }, null, 2));
  }

  // GET /api/jobs/date/:date
  const matchDate = pathname.match(/^\/api\/jobs\/date\/([^/]+)$/);
  if (req.method === 'GET' && matchDate) {
    const jobs = getJobsByDate(matchDate[1]);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ count: jobs.length, jobs }, null, 2));
  }

  // GET /api/jobs
  if (req.method === 'GET' && pathname === '/api/jobs') {
    const jobs = getAllJobs();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ count: jobs.length, jobs }, null, 2));
  }

  // POST /api/jobs (Manual phone intake / direct booking)
  if (req.method === 'POST' && pathname === '/api/jobs') {
    try {
      const payload = typeof body === 'string' ? JSON.parse(body || '{}') : body;
      const created = createJob(payload);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, job: created }, null, 2));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Failed to create job: ' + err.message }));
    }
  }

  // GET /api/jobs/:id
  const matchSingle = pathname.match(/^\/api\/jobs\/([^/]+)$/);
  if (req.method === 'GET' && matchSingle) {
    const job = getJobById(matchSingle[1]);
    if (!job) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Job not found' }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(job, null, 2));
  }

  // PATCH /api/jobs/:id/assignment
  const matchAssignment = pathname.match(/^\/api\/jobs\/([^/]+)\/assignment$/);
  if (req.method === 'PATCH' && matchAssignment) {
    try {
      const payload = typeof body === 'string' ? JSON.parse(body || '{}') : body;
      const updated = updateJobAssignment(matchAssignment[1], payload.vehicle, payload.crew);
      if (!updated) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Job not found' }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, job: updated }, null, 2));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid JSON body' }));
    }
  }

  // PATCH /api/jobs/:id/status
  const matchStatus = pathname.match(/^\/api\/jobs\/([^/]+)\/status$/);
  if (req.method === 'PATCH' && matchStatus) {
    try {
      const payload = typeof body === 'string' ? JSON.parse(body || '{}') : body;
      if (!payload.status) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Missing status field' }));
      }
      const updated = updateJobStatus(matchStatus[1], payload.status);
      if (!updated) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Job not found' }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, job: updated }, null, 2));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid JSON body' }));
    }
  }

  // PATCH /api/jobs/:id/payment
  const matchPayment = pathname.match(/^\/api\/jobs\/([^/]+)\/payment$/);
  if (req.method === 'PATCH' && matchPayment) {
    try {
      const payload = typeof body === 'string' ? JSON.parse(body || '{}') : body;
      const updated = updatePaymentStatus(matchPayment[1], payload.status || 'settled_in_full', payload.balanceSettled);
      if (!updated) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Job not found' }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, job: updated }, null, 2));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid JSON body' }));
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Job endpoint not found' }));
}
