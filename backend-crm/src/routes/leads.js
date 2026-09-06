/**
 * Leads API Route Handler
 */
import { getAllLeads, getLeadById, createLead, updateLeadStatus } from '../services/leadsService.js';

export async function handleLeadsRoute(req, res, pathname, query, body) {
  // GET /api/leads
  if (req.method === 'GET' && pathname === '/api/leads') {
    const statusFilter = query.get('status');
    const leads = await getAllLeads(statusFilter ? { status: statusFilter } : {});
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ count: leads.length, leads }, null, 2));
  }

  // GET /api/leads/:id
  const matchSingle = pathname.match(/^\/api\/leads\/([^/]+)$/);
  if (req.method === 'GET' && matchSingle) {
    const lead = getLeadById(matchSingle[1]);
    if (!lead) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Lead not found' }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(lead, null, 2));
  }

  // POST /api/leads
  if (req.method === 'POST' && pathname === '/api/leads') {
    try {
      const payload = typeof body === 'string' ? JSON.parse(body || '{}') : body;
      const created = await createLead(payload);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, lead: created }, null, 2));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
    }
  }

  // PATCH /api/leads/:id/status
  const matchStatus = pathname.match(/^\/api\/leads\/([^/]+)\/status$/);
  if (req.method === 'PATCH' && matchStatus) {
    try {
      const payload = typeof body === 'string' ? JSON.parse(body || '{}') : body;
      if (!payload.status) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Missing status field' }));
      }
      const updated = updateLeadStatus(matchStatus[1], payload.status);
      if (!updated) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Lead not found' }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, lead: updated }, null, 2));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
}
