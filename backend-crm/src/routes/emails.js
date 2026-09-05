/**
 * Email Automations Route Handler
 */
import { getEmailLogs, generateInstantQuoteEmailHtml, logAutomatedEmail } from '../services/emailService.js';
import { getLeadById } from '../services/leadsService.js';

export async function handleEmailsRoute(req, res, pathname, query, body) {
  // GET /api/emails/logs
  if (req.method === 'GET' && pathname === '/api/emails/logs') {
    const logs = getEmailLogs();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ count: logs.length, logs }, null, 2));
  }

  // POST /api/emails/send-quote
  if (req.method === 'POST' && pathname === '/api/emails/send-quote') {
    try {
      const payload = typeof body === 'string' ? JSON.parse(body || '{}') : body;
      const lead = payload.leadId ? getLeadById(payload.leadId) : payload.leadData;
      
      if (!lead) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Lead not found or payload missing' }));
      }

      const emailHtml = generateInstantQuoteEmailHtml(lead);
      const log = logAutomatedEmail(
        lead.customerEmail || 'customer@example.co.uk',
        lead.customerName,
        'instant_quote',
        `Your Guaranteed Move Estimate — Dundee Movers`
      );

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, log, previewHtml: emailHtml }, null, 2));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Failed to process email dispatch' }));
    }
  }

  // GET /api/emails/preview/:template
  const matchPreview = pathname.match(/^\/api\/emails\/preview\/([^/]+)$/);
  if (req.method === 'GET' && matchPreview) {
    const sampleLead = {
      customerName: 'Sample Customer',
      pickupAddress: 'Perth Road, Dundee',
      deliveryAddress: 'Broughty Ferry, Dundee',
      recommendedVan: '1x 3.5T Luton Van with Tail-Lift',
      estimatedVolumeM3: 15.0,
      pickupFloor: '3rd Floor Tenement',
      deliveryFloor: 'Ground Floor'
    };
    const html = generateInstantQuoteEmailHtml(sampleLead);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Email route not found' }));
}
