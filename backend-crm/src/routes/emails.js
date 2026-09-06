/**
 * Email Automations Route Handler
 */
import {
  getEmailLogs,
  sendEmailWithResend,
  generateInquiryReceivedEmailHtml,
  generateTailoredQuoteEmailHtml,
  generateInternalLeadNotificationHtml
} from '../services/emailService.js';
import { getLeadById, updateLeadStatus } from '../services/leadsService.js';

export async function handleEmailsRoute(req, res, pathname, query, body) {
  // GET /api/emails/logs
  if (req.method === 'GET' && pathname === '/api/emails/logs') {
    const logs = await getEmailLogs();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ count: logs.length, logs }, null, 2));
  }

  // POST /api/emails/send-quote
  if (req.method === 'POST' && pathname === '/api/emails/send-quote') {
    try {
      const payload = typeof body === 'string' ? JSON.parse(body || '{}') : body;
      const lead = payload.leadId ? (getLeadById(payload.leadId) || payload.leadData) : payload.leadData;
      
      const recipientEmail = payload.recipientEmail || lead?.customerEmail;
      const recipientName = payload.recipientName || lead?.customerName || 'Valued Customer';

      if (!recipientEmail) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Customer email address is required' }));
      }

      const quoteOptions = {
        quotePrice: payload.quotePrice,
        depositAmount: payload.depositAmount,
        assignedVan: payload.assignedVan,
        assignedCrew: payload.assignedCrew
      };

      const html = generateTailoredQuoteEmailHtml(lead || { customerName: recipientName }, quoteOptions);
      const subject = `Your Guaranteed Move Quote — Dundee Movers`;

      const result = await sendEmailWithResend({
        to: recipientEmail,
        subject,
        html,
        customerName: recipientName,
        templateType: 'tailored_quote',
        quoteId: lead?.id || null
      });

      if (lead?.id) {
        updateLeadStatus(lead.id, 'quoted');
      }

      res.writeHead(result.success ? 200 : 502, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        success: result.success,
        resendId: result.resendId,
        log: result.log,
        error: result.error
      }, null, 2));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Failed to process email dispatch: ' + err.message }));
    }
  }

  // POST /api/emails/send-test
  if (req.method === 'POST' && pathname === '/api/emails/send-test') {
    try {
      const payload = typeof body === 'string' ? JSON.parse(body || '{}') : body;
      const to = payload.to || 'bookings@dundeemovers.co.uk';

      const result = await sendEmailWithResend({
        to,
        subject: 'Dundee Movers — Resend Email Engine Online',
        html: `
          <div style="font-family: sans-serif; padding: 24px; color: #064e3b;">
            <h2>Dundee Movers Resend Verification Successful</h2>
            <p>Your transactional email engine is officially live and verified on dundeemovers.co.uk.</p>
          </div>
        `,
        customerName: 'Dundee Movers Admin',
        templateType: 'system_test'
      });

      res.writeHead(result.success ? 200 : 502, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result, null, 2));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  // GET /api/emails/preview/:template
  const matchPreview = pathname.match(/^\/api\/emails\/preview\/([^/]+)$/);
  if (req.method === 'GET' && matchPreview) {
    const templateName = matchPreview[1];
    const sampleLead = {
      id: 'lead-test123',
      customerName: 'Alistair Campbell',
      pickupAddress: 'Flat 3/2, 112 Nethergate, Dundee',
      pickupFloor: '3rd Floor (Tenement)',
      deliveryAddress: '14 Panmure Terrace, Broughty Ferry',
      deliveryFloor: 'Ground Floor',
      moveDate: 'Friday, 19th September 2026',
      moveType: '2-Bedroom Tenement Move',
      notes: 'Washing machine, 3-seater sofa, upright piano, 25 packing boxes',
      recommendedVan: '3.5T Luton Van with Tail-Lift',
      recommendedCrew: '2-Man Professional Tenement Crew'
    };

    let html = '';
    if (templateName === 'inquiry') {
      html = generateInquiryReceivedEmailHtml(sampleLead);
    } else if (templateName === 'alert') {
      html = generateInternalLeadNotificationHtml(sampleLead);
    } else {
      html = generateTailoredQuoteEmailHtml(sampleLead);
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Email route not found' }));
}
