/**
 * Automated Customer Communications & Luxury Resend Email Service.
 * Synchronizes email logs with Supabase email_logs table and dispatches
 * high-converting, branded HTML transactional emails via Resend.
 */
import { executeSupabaseQuery, isSupabaseConfigured } from './supabaseClient.js';

let runtimeConfig = {
  apiKey: '',
  fromEmail: 'Dundee Movers <bookings@dundeemovers.co.uk>'
};

export function setEmailCredentials(apiKey, fromEmail) {
  if (apiKey) runtimeConfig.apiKey = apiKey;
  if (fromEmail) runtimeConfig.fromEmail = fromEmail;
}

function getEmailCredentials() {
  const apiKey = (typeof process !== 'undefined' && process.env?.RESEND_API_KEY) || runtimeConfig.apiKey || '';
  const fromEmail = (typeof process !== 'undefined' && process.env?.EMAIL_FROM) || runtimeConfig.fromEmail || 'Dundee Movers <bookings@dundeemovers.co.uk>';
  return { apiKey, fromEmail };
}

// In-memory fallback logs store
const emailLogsDatabase = [];

/**
 * Record email dispatch into Supabase email_logs and in-memory store
 */
export async function recordEmailLog({
  recipientEmail,
  recipientName = 'Customer',
  templateType = 'instant_quote',
  subject = 'Dundee Movers Notification',
  status = 'delivered',
  errorMessage = null,
  resendId = null,
  quoteId = null
}) {
  const localLog = {
    id: resendId || `email-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    recipientEmail,
    recipientName,
    templateType,
    subject,
    status,
    errorMessage,
    quoteId
  };

  emailLogsDatabase.unshift(localLog);

  if (isSupabaseConfigured()) {
    try {
      await executeSupabaseQuery('email_logs', {
        method: 'POST',
        body: {
          recipient_email: recipientEmail,
          template_type: templateType,
          subject: subject,
          status: status,
          error_message: errorMessage,
          quote_id: quoteId || null
        }
      });
    } catch (err) {
      console.warn('[EmailService] Error syncing email log to Supabase:', err.message);
    }
  }

  return localLog;
}

/**
 * Retrieve recent email logs from Supabase or memory
 */
export async function getEmailLogs() {
  if (isSupabaseConfigured()) {
    try {
      const data = await executeSupabaseQuery('email_logs?select=*&order=created_at.desc&limit=50');
      if (Array.isArray(data) && data.length > 0) {
        return data.map(r => ({
          id: r.id,
          createdAt: r.created_at,
          recipientEmail: r.recipient_email,
          recipientName: r.recipient_email?.split('@')[0] || 'Customer',
          templateType: r.template_type,
          subject: r.subject,
          status: r.status,
          openedAt: r.opened_at,
          errorMessage: r.error_message,
          quoteId: r.quote_id
        }));
      }
    } catch (_) {}
  }

  return [...emailLogsDatabase];
}

/**
 * Send an email via Resend API
 */
export async function sendEmailWithResend({
  to,
  subject,
  html,
  text,
  customerName = 'Customer',
  templateType = 'instant_quote',
  quoteId = null
}) {
  const { apiKey, fromEmail } = getEmailCredentials();
  const recipientList = Array.isArray(to) ? to : [to];
  const recipientStr = recipientList.join(', ');

  if (!apiKey) {
    console.warn('[EmailService] RESEND_API_KEY is not configured. Email dispatch skipped.');
    const log = await recordEmailLog({
      recipientEmail: recipientStr,
      recipientName: customerName,
      templateType,
      subject,
      status: 'skipped',
      errorMessage: 'RESEND_API_KEY not configured',
      quoteId
    });
    return { success: false, error: 'RESEND_API_KEY not configured', log };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipientList,
        subject,
        html,
        text: text || undefined
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.message || `Resend dispatch failed (HTTP ${response.status})`;
      console.warn(`[EmailService] Resend API error: ${errorMsg}`);
      const log = await recordEmailLog({
        recipientEmail: recipientStr,
        recipientName: customerName,
        templateType,
        subject,
        status: 'failed',
        errorMessage: errorMsg,
        quoteId
      });
      return { success: false, error: errorMsg, log };
    }

    const log = await recordEmailLog({
      recipientEmail: recipientStr,
      recipientName: customerName,
      templateType,
      subject,
      status: 'delivered',
      resendId: data.id,
      quoteId
    });

    return { success: true, resendId: data.id, log };
  } catch (err) {
    console.warn('[EmailService] Network exception contacting Resend:', err.message);
    const log = await recordEmailLog({
      recipientEmail: recipientStr,
      recipientName: customerName,
      templateType,
      subject,
      status: 'failed',
      errorMessage: err.message,
      quoteId
    });
    return { success: false, error: err.message, log };
  }
}

/**
 * 1. Customer Inquiry Acknowledgment Template
 */
export function generateInquiryReceivedEmailHtml(lead) {
  const name = lead.customerName || 'Valued Customer';
  const pickup = lead.pickupAddress || 'Dundee & Surrounding Areas';
  const delivery = lead.deliveryAddress || 'Destination Address';
  const moveDate = lead.moveDate || 'Flexible / To Be Confirmed';
  const pickupFloor = lead.pickupFloor || 'Ground Floor';
  const deliveryFloor = lead.deliveryFloor || 'Ground Floor';
  const refCode = lead.id ? String(lead.id).slice(-6).toUpperCase() : 'DM-ONLINE';

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #1e293b;">
      <div style="background: #064e3b; padding: 28px 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">DUNDEE MOVERS</h1>
        <p style="margin: 6px 0 0; font-size: 12px; color: #a7f3d0; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">Scottish Removals & Logistics Concierge</p>
      </div>

      <div style="padding: 32px 24px;">
        <span style="display: inline-block; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; margin-bottom: 16px;">
          Reference #${refCode}
        </span>
        <h2 style="font-size: 20px; color: #0f172a; margin: 0 0 12px 0;">We've Received Your Move Request, ${name}!</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
          Thank you for choosing Dundee Movers. Our operations coordinators are currently reviewing your property access, tenement floor levels, and items to craft your official fixed-price quote.
        </p>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
          <div style="font-size: 12px; font-weight: 800; color: #064e3b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Submitted Move Details</div>
          
          <div style="font-size: 13px; line-height: 1.8; color: #334155;">
            <div>📍 <strong>Collection:</strong> ${pickup} (${pickupFloor})</div>
            <div>🏁 <strong>Delivery:</strong> ${delivery} (${deliveryFloor})</div>
            <div>📅 <strong>Preferred Date:</strong> ${moveDate}</div>
            <div>🛡️ <strong>Insurance:</strong> £50,000 Goods in Transit Included Free</div>
          </div>
        </div>

        <div style="border-left: 4px solid #10b981; padding-left: 14px; margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">What Happens Next?</h3>
          <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin: 0;">
            1. Our senior team reviews van parking and stair access.<br>
            2. You receive your transparent tailored quote via email.<br>
            3. Lock your move date with an agreed booking deposit.
          </p>
        </div>

        <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 16px;">
          <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Need immediate assistance or urgent date confirmation?</div>
          <div style="font-size: 16px; font-weight: 800; color: #0f172a;">📞 Direct Dispatch: 01382 932840</div>
        </div>

        <p style="text-align: center; font-size: 12px; color: #94a3b8; margin: 0;">
          Dundee Movers • 30 Whitehall Street, Dundee, DD1 4AF • bookings@dundeemovers.co.uk
        </p>
      </div>
    </div>
  `;
}

/**
 * 2. Official Tailored Quote Delivery Template
 */
export function generateTailoredQuoteEmailHtml(lead, options = {}) {
  const name = lead.customerName || 'Valued Customer';
  const pickup = lead.pickupAddress || 'Dundee, Scotland';
  const delivery = lead.deliveryAddress || 'Destination Address';
  const van = options.assignedVan || lead.recommendedVan || '3.5T Luton Van with Tail-Lift';
  const crew = options.assignedCrew || lead.recommendedCrew || '2-Man Professional Tenement Crew';
  const quotePrice = options.quotePrice || (lead.estimatedPriceMin ? `£${lead.estimatedPriceMin}` : '£280');
  const deposit = options.depositAmount || '£50';
  const refCode = lead.id ? String(lead.id).slice(-6).toUpperCase() : 'DM-QUOTE';

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #1e293b;">
      <div style="background: #064e3b; padding: 28px 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">DUNDEE MOVERS</h1>
        <p style="margin: 6px 0 0; font-size: 12px; color: #a7f3d0; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">Guaranteed Move Quote</p>
      </div>

      <div style="padding: 32px 24px;">
        <span style="display: inline-block; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; margin-bottom: 16px;">
          Quote Ref #${refCode}
        </span>
        <h2 style="font-size: 20px; color: #0f172a; margin: 0 0 12px 0;">Your Tailored Move Quote is Ready, ${name}!</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
          Our logistics team has completed your property assessment and allocated your vehicle and crew:
        </p>

        <div style="background: #f8fafc; border: 2px solid #10b981; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
          <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">Guaranteed Fixed Move Price</div>
          <div style="font-size: 32px; font-weight: 800; color: #064e3b; margin-bottom: 4px;">${quotePrice}</div>
          <div style="font-size: 13px; color: #059669; font-weight: 600; margin-bottom: 16px;">Lock your date with a ${deposit} deposit • No hidden stair fees</div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 14px; font-size: 13px; line-height: 1.8; color: #334155;">
            <div>🚐 <strong>Allocated Vehicle:</strong> ${van}</div>
            <div>👥 <strong>Allocated Crew:</strong> ${crew}</div>
            <div>📍 <strong>Collection:</strong> ${pickup} (${lead.pickupFloor || 'Ground'})</div>
            <div>🏁 <strong>Delivery:</strong> ${delivery} (${lead.deliveryFloor || 'Ground'})</div>
            <div>🛡️ <strong>Included Cover:</strong> £50,000 Goods in Transit & £2,000,000 Public Liability</div>
          </div>
        </div>

        <div style="text-align: center; margin: 24px 0 20px;">
          <a href="tel:01382932840" style="display: inline-block; background: #064e3b; color: #ffffff; padding: 14px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 15px;">
            📞 Call Office (01382 932840) to Confirm & Lock Date
          </a>
        </div>

        <p style="text-align: center; font-size: 12px; color: #94a3b8; margin: 0;">
          Dundee Movers • 30 Whitehall Street, Dundee, DD1 4AF • bookings@dundeemovers.co.uk
        </p>
      </div>
    </div>
  `;
}

/**
 * 3. Internal Team Alert Template
 */
export function generateInternalLeadNotificationHtml(lead) {
  const refCode = lead.id ? String(lead.id).slice(-6).toUpperCase() : 'NEW';
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; color: #0f172a;">
      <h2 style="color: #064e3b; margin-top: 0; font-size: 18px;">🚨 New Move Inquiry Received — #${refCode}</h2>
      <div style="background: #f8fafc; padding: 14px; border-radius: 6px; font-size: 13px; line-height: 1.7; margin-bottom: 16px;">
        <div>👤 <strong>Customer:</strong> ${lead.customerName || 'N/A'}</div>
        <div>📞 <strong>Phone:</strong> ${lead.customerPhone || 'N/A'}</div>
        <div>✉️ <strong>Email:</strong> ${lead.customerEmail || 'N/A'}</div>
        <div>📅 <strong>Preferred Date:</strong> ${lead.moveDate || 'Flexible'}</div>
        <div>📍 <strong>Collection:</strong> ${lead.pickupAddress} (${lead.pickupFloor})</div>
        <div>🏁 <strong>Destination:</strong> ${lead.deliveryAddress} (${lead.deliveryFloor})</div>
        <div>💬 <strong>Notes / Manifest:</strong> ${lead.notes || 'None'}</div>
      </div>
      <a href="https://crm.dundeemovers.co.uk/#leads" style="display: inline-block; background: #064e3b; color: #fff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 700;">
        Open CRM Leads Pipeline ➔
      </a>
    </div>
  `;
}

// Backward compatibility helper
export function generateInstantQuoteEmailHtml(lead) {
  return generateTailoredQuoteEmailHtml(lead);
}

// Backward compatibility helper
export function logAutomatedEmail(recipientEmail, recipientName, templateType, subject, status = 'delivered', errorMessage = null) {
  return recordEmailLog({
    recipientEmail,
    recipientName,
    templateType,
    subject,
    status,
    errorMessage
  });
}
