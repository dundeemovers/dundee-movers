/**
 * Automated Customer Communications & Luxury Resend Email Service.
 * Synchronizes email logs with Supabase email_logs table and dispatches
 * high-converting, branded HTML transactional emails via Resend.
 */
import { executeSupabaseQuery, isSupabaseConfigured } from './supabaseClient.js';
import {
  wrapEmailLayout,
  generateInquiryReceivedEmailHtml,
  generateTailoredQuoteEmailHtml,
  generateInternalLeadNotificationHtml
} from './emailTemplates.js';

export {
  wrapEmailLayout,
  generateInquiryReceivedEmailHtml,
  generateTailoredQuoteEmailHtml,
  generateInternalLeadNotificationHtml
};

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

// Backward compatibility helpers
export function generateInstantQuoteEmailHtml(lead) {
  return generateTailoredQuoteEmailHtml(lead);
}

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
