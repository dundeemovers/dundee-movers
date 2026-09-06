/**
 * Cloudflare Edge Worker for Dundee Movers Operations CRM.
 * Serves API endpoints (/api/*) and routes client dashboard static assets.
 */
import { getAllLeads, getLeadById, createLead, updateLeadStatus } from './services/leadsService.js';
import { getTodayJobs, getTomorrowJobs, updateJobStatus, updatePaymentStatus } from './services/jobsService.js';
import {
  getEmailLogs,
  sendEmailWithResend,
  setEmailCredentials,
  generateTailoredQuoteEmailHtml,
  generateInquiryReceivedEmailHtml
} from './services/emailService.js';
import { getSupabaseConfig, setSupabaseCredentials } from './services/supabaseClient.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...CORS_HEADERS
    }
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    // Set Supabase & Resend credentials from Worker environment bindings
    if (env && (env.SUPABASE_URL || env.SUPABASE_ANON_KEY)) {
      setSupabaseCredentials(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    }
    if (env && (env.RESEND_API_KEY || env.EMAIL_FROM)) {
      setEmailCredentials(env.RESEND_API_KEY, env.EMAIL_FROM);
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // 1. Health & Status
    if (pathname === '/api/health') {
      return jsonResponse({
        status: 'online',
        service: 'Dundee Movers CRM Edge Worker',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        supabase: getSupabaseConfig()
      });
    }

    // 2. Leads API
    if (pathname === '/api/leads' && request.method === 'GET') {
      const status = searchParams.get('status');
      const leads = await getAllLeads(status ? { status } : {});
      return jsonResponse({ count: leads.length, leads });
    }

    const leadMatch = pathname.match(/^\/api\/leads\/([^/]+)$/);
    if (leadMatch && request.method === 'GET') {
      const lead = getLeadById(leadMatch[1]);
      if (!lead) return jsonResponse({ error: 'Lead not found' }, 404);
      return jsonResponse(lead);
    }

    if (pathname === '/api/leads' && request.method === 'POST') {
      try {
        const body = await request.json();
        const created = await createLead(body);
        return jsonResponse({ success: true, lead: created }, 201);
      } catch (_) {
        return jsonResponse({ error: 'Invalid JSON payload' }, 400);
      }
    }

    const leadStatusMatch = pathname.match(/^\/api\/leads\/([^/]+)\/status$/);
    if (leadStatusMatch && request.method === 'PATCH') {
      try {
        const body = await request.json();
        if (!body.status) return jsonResponse({ error: 'Missing status field' }, 400);
        const updated = updateLeadStatus(leadStatusMatch[1], body.status);
        if (!updated) return jsonResponse({ error: 'Lead not found' }, 404);
        return jsonResponse({ success: true, lead: updated });
      } catch (_) {
        return jsonResponse({ error: 'Invalid JSON payload' }, 400);
      }
    }

    // 3. Jobs & Front Desk Dispatch API
    if (pathname === '/api/jobs/today' && request.method === 'GET') {
      const jobs = getTodayJobs();
      return jsonResponse({ count: jobs.length, jobs });
    }

    if (pathname === '/api/jobs/tomorrow' && request.method === 'GET') {
      const jobs = getTomorrowJobs();
      return jsonResponse({ count: jobs.length, jobs });
    }

    const jobStatusMatch = pathname.match(/^\/api\/jobs\/([^/]+)\/status$/);
    if (jobStatusMatch && request.method === 'PATCH') {
      try {
        const body = await request.json();
        const updated = updateJobStatus(jobStatusMatch[1], body.status);
        if (!updated) return jsonResponse({ error: 'Job not found' }, 404);
        return jsonResponse({ success: true, job: updated });
      } catch (_) {
        return jsonResponse({ error: 'Invalid JSON payload' }, 400);
      }
    }

    const jobPaymentMatch = pathname.match(/^\/api\/jobs\/([^/]+)\/payment$/);
    if (jobPaymentMatch && request.method === 'PATCH') {
      try {
        const body = await request.json();
        const updated = updatePaymentStatus(jobPaymentMatch[1], body.paymentStatus, body.balancePaid);
        if (!updated) return jsonResponse({ error: 'Job not found' }, 404);
        return jsonResponse({ success: true, job: updated });
      } catch (_) {
        return jsonResponse({ error: 'Invalid JSON payload' }, 400);
      }
    }

    // 4. Automated Communications & Email API
    if (pathname === '/api/emails/logs' && request.method === 'GET') {
      const logs = await getEmailLogs();
      return jsonResponse({ count: logs.length, logs });
    }

    if (pathname === '/api/emails/send-quote' && request.method === 'POST') {
      try {
        const body = await request.json();
        const lead = body.leadId ? (getLeadById(body.leadId) || body.leadData) : body.leadData;
        const recipientEmail = body.recipientEmail || lead?.customerEmail;
        const recipientName = body.recipientName || lead?.customerName || 'Valued Customer';

        if (!recipientEmail) {
          return jsonResponse({ error: 'Customer email address is required' }, 400);
        }

        const quoteOptions = {
          quotePrice: body.quotePrice,
          depositAmount: body.depositAmount,
          assignedVan: body.assignedVan,
          assignedCrew: body.assignedCrew
        };

        const html = generateTailoredQuoteEmailHtml(lead || { customerName: recipientName }, quoteOptions);
        const subject = 'Your Guaranteed Move Quote — Dundee Movers';

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

        return jsonResponse(result, result.success ? 200 : 502);
      } catch (err) {
        return jsonResponse({ error: 'Failed to process email dispatch: ' + err.message }, 400);
      }
    }

    if (pathname.startsWith('/api/emails/preview/') && request.method === 'GET') {
      const template = pathname.split('/').pop();
      const sampleLead = {
        customerName: 'Alistair Campbell',
        pickupAddress: 'Flat 3/2, 112 Nethergate, Dundee',
        deliveryAddress: '14 Panmure Terrace, Broughty Ferry',
        recommendedVan: '3.5T Luton Van with Electric Tail-Lift',
        estimatedVolumeM3: '16.5',
        pickupFloor: '3rd Floor (Tenement)',
        deliveryFloor: 'Ground Floor',
        moveDate: 'Friday, 19th September 2026'
      };

      const html = template === 'inquiry' 
        ? generateInquiryReceivedEmailHtml(sampleLead) 
        : generateTailoredQuoteEmailHtml(sampleLead);

      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8', ...CORS_HEADERS }
      });
    }

    // Fallback: If not an API route, serve static SPA assets via env.ASSETS
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404, headers: CORS_HEADERS });
  }
};
