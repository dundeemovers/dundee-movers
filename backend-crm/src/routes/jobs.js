/**
 * Jobs & Front Desk Route Handler
 */
import { getAllJobs, getTodayJobs, getTomorrowJobs, getJobById, updateJobStatus, updatePaymentStatus } from '../services/jobsService.js';

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

  // GET /api/jobs
  if (req.method === 'GET' && pathname === '/api/jobs') {
    const jobs = getAllJobs();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ count: jobs.length, jobs }, null, 2));
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
