/**
 * Dundee Movers — Luxury Branded HTML Email Template Engine.
 * Bulletproof, responsive email templates compatible with Outlook, Gmail, Apple Mail, and mobile.
 * Features official logo, Scottish Emerald & Gold branding, and high-converting CTA modules.
 */

const LOGO_URL = 'https://dundeemovers.co.uk/images/logo.jpg';
const PHONE_NUMBER = '01382 932840';
const PHONE_TEL = 'tel:01382932840';
const BOOKINGS_EMAIL = 'bookings@dundeemovers.co.uk';
const WEBSITE_URL = 'https://dundeemovers.co.uk';

/**
 * Master Email Layout Wrapper
 */
export function wrapEmailLayout({
  title,
  previewText,
  refCode,
  content,
  badgeText = 'Official Move Notification'
}) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no" />
  <title>${title}</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .responsive-column { display: block !important; width: 100% !important; }
      .mobile-center { text-align: center !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-title { font-size: 22px !important; line-height: 28px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; color: #1e293b;">
  <!-- Preview Text Spoofer -->
  <div style="display: none; font-size: 1px; color: #f1f5f9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${previewText || title} &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 24px 12px;">
        <!-- Email Container -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="email-container" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner with Logo & Brand Title -->
          <tr>
            <td style="background: linear-gradient(135deg, #064e3b 0%, #022c22 100%); background-color: #064e3b; padding: 32px 28px; text-align: center;">
              <!-- Logo Container -->
              <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 16px auto;">
                <tr>
                  <td align="center" style="background: #ffffff; padding: 8px; border-radius: 18px; box-shadow: 0 8px 20px rgba(0,0,0,0.2); border: 2px solid #10b981;">
                    <a href="${WEBSITE_URL}" target="_blank" style="text-decoration: none; display: block;">
                      <img src="${LOGO_URL}" alt="Dundee Movers Official Logo" width="88" height="88" style="display: block; border-radius: 12px; width: 88px; height: 88px; object-fit: contain;" />
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Brand Name -->
              <h1 style="margin: 0; font-size: 26px; font-weight: 900; letter-spacing: -0.03em; color: #ffffff; text-transform: uppercase;">
                DUNDEE <span style="color: #f59e0b;">MOVERS</span>
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 11px; font-weight: 800; color: #6ee7b7; text-transform: uppercase; letter-spacing: 0.18em;">
                SCOTTISH HOME & TENEMENT REMOVAL SPECIALISTS
              </p>
            </td>
          </tr>

          <!-- Golden Accent Divider Line -->
          <tr>
            <td style="background-color: #d97706; height: 4px; font-size: 1px; line-height: 1px;">&nbsp;</td>
          </tr>

          <!-- Top Meta Bar (Pill Badge & Ref Code) -->
          <tr>
            <td style="padding: 20px 28px 0 28px; background-color: #ffffff;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left">
                    <span style="display: inline-block; background-color: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em;">
                      ${badgeText}
                    </span>
                  </td>
                  ${refCode ? `
                    <td align="right">
                      <span style="font-size: 12px; font-weight: 700; color: #64748b; font-family: monospace;">
                        REF #${refCode}
                      </span>
                    </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td class="mobile-padding" style="padding: 20px 28px 32px 28px; background-color: #ffffff;">
              ${content}
            </td>
          </tr>

          <!-- Customer Service / Direct Assistance Box -->
          <tr>
            <td style="padding: 0 28px 28px 28px; background-color: #ffffff;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px;">
                <tr>
                  <td align="center" style="font-size: 13px; color: #475569; line-height: 1.6;">
                    <div style="font-size: 11px; font-weight: 800; color: #064e3b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">
                      Direct Scottish Operations Dispatch
                    </div>
                    Questions about your move or date availability? Speak directly to our move coordinator:
                    <div style="margin-top: 8px;">
                      <a href="${PHONE_TEL}" style="display: inline-block; font-size: 16px; font-weight: 900; color: #064e3b; text-decoration: none; margin-right: 14px;">
                        📞 ${PHONE_NUMBER}
                      </a>
                      <a href="mailto:${BOOKINGS_EMAIL}" style="display: inline-block; font-size: 13px; font-weight: 700; color: #047857; text-decoration: underline;">
                        ✉️ ${BOOKINGS_EMAIL}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Trust Badges Strip (Insurance & Reviews) -->
          <tr>
            <td style="background-color: #0f172a; padding: 20px 24px; text-align: center;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-size: 12px; color: #94a3b8; line-height: 1.8;">
                    <span style="color: #f59e0b; font-weight: 800;">★★★★★ 4.9/5 Rating</span> &nbsp;•&nbsp; 
                    <span style="color: #ffffff; font-weight: 700;">£50,000 Goods in Transit Covered</span> &nbsp;•&nbsp; 
                    <span style="color: #6ee7b7; font-weight: 700;">Tenement Stair Specialists</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #090d16; padding: 24px 28px; text-align: center; font-size: 11px; color: #64748b; line-height: 1.7;">
              <p style="margin: 0 0 6px 0; color: #cbd5e1; font-weight: 700;">
                Dundee Movers Ltd • 30 Whitehall Street, Dundee, Scotland, DD1 4AF
              </p>
              <p style="margin: 0;">
                Serving Dundee, Broughty Ferry, Angus, Fife, Perthshire, Edinburgh, Glasgow & Nationwide UK.<br />
                <a href="${WEBSITE_URL}" target="_blank" style="color: #10b981; text-decoration: none; font-weight: 700;">Visit Official Website</a> &nbsp;|&nbsp; 
                <a href="${WEBSITE_URL}/#quote-calculator" target="_blank" style="color: #94a3b8; text-decoration: none;">Request Free Move Survey</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 1. Customer Inquiry Acknowledgment Email
 */
export function generateInquiryReceivedEmailHtml(lead) {
  const name = lead.customerName || 'Valued Customer';
  const pickup = lead.pickupAddress || 'Dundee / Angus / Fife';
  const delivery = lead.deliveryAddress || 'Destination Address';
  const moveDate = lead.moveDate || 'Flexible / To Be Confirmed';
  const pickupFloor = lead.pickupFloor || 'Ground Floor / Bungalow';
  const deliveryFloor = lead.deliveryFloor || 'Ground Floor / Bungalow';
  const pickupLiftText = lead.pickupLift ? '• 🛗 Lift Available' : '• 🪜 Stairs Access';
  const deliveryLiftText = lead.deliveryLift ? '• 🛗 Lift Available' : '• 🪜 Stairs Access';
  const moveType = lead.moveType || 'Home / Flat Move';
  const refCode = lead.id ? String(lead.id).slice(-6).toUpperCase() : 'DM-ONLINE';

  const content = `
    <h2 class="mobile-title" style="font-size: 24px; font-weight: 900; color: #0f172a; margin: 0 0 12px 0; letter-spacing: -0.02em;">
      We've Received Your Move Inquiry, ${name}!
    </h2>
    <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
      Thank you for submitting your move details to Dundee Movers. Because every Scottish home and tenement stairwell has unique logistics, our senior operations team is reviewing your address access, flight levels, and item inventory to prepare a <strong>guaranteed, transparent fixed quote</strong>.
    </p>

    <!-- Summary Route Card -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
      <tr>
        <td style="background-color: #064e3b; padding: 10px 18px; color: #ffffff; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;">
          Move Details Overview
        </td>
      </tr>
      <tr>
        <td style="padding: 18px 20px;">
          <!-- Collection -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 14px;">
            <tr>
              <td width="28" valign="top" style="font-size: 16px; line-height: 1.4;">📍</td>
              <td>
                <div style="font-size: 11px; font-weight: 800; color: #064e3b; text-transform: uppercase; letter-spacing: 0.04em;">Collection Property</div>
                <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 2px;">${pickup}</div>
                <div style="font-size: 12px; color: #64748b; margin-top: 2px;">🏢 ${pickupFloor} ${pickupLiftText}</div>
              </td>
            </tr>
          </table>

          <!-- Delivery -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 14px;">
            <tr>
              <td width="28" valign="top" style="font-size: 16px; line-height: 1.4;">🏁</td>
              <td>
                <div style="font-size: 11px; font-weight: 800; color: #d97706; text-transform: uppercase; letter-spacing: 0.04em;">Delivery Destination</div>
                <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 2px;">${delivery}</div>
                <div style="font-size: 12px; color: #64748b; margin-top: 2px;">🏁 ${deliveryFloor} ${deliveryLiftText}</div>
              </td>
            </tr>
          </table>

          <!-- Schedule & Service -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #e2e8f0; padding-top: 12px;">
            <tr>
              <td width="50%" valign="top">
                <div style="font-size: 11px; color: #64748b;">Preferred Date:</div>
                <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 2px;">📅 ${moveDate}</div>
              </td>
              <td width="50%" valign="top">
                <div style="font-size: 11px; color: #64748b;">Move Category:</div>
                <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 2px;">📦 ${moveType}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- 3-Step Process Module -->
    <div style="margin-bottom: 28px;">
      <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.04em;">
        What Happens Next?
      </h3>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="36" valign="top">
            <div style="width: 26px; height: 26px; background-color: #064e3b; color: #ffffff; border-radius: 50%; text-align: center; line-height: 26px; font-weight: 800; font-size: 12px;">1</div>
          </td>
          <td style="padding-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 700; color: #0f172a;">Tenement Access & Inventory Review</div>
            <div style="font-size: 12px; color: #64748b; line-height: 1.5; margin-top: 2px;">We assess your property access, parking requirements, and volume.</div>
          </td>
        </tr>
        <tr>
          <td width="36" valign="top">
            <div style="width: 26px; height: 26px; background-color: #064e3b; color: #ffffff; border-radius: 50%; text-align: center; line-height: 26px; font-weight: 800; font-size: 12px;">2</div>
          </td>
          <td style="padding-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 700; color: #0f172a;">Tailored Quote Sent to Your Inbox</div>
            <div style="font-size: 12px; color: #64748b; line-height: 1.5; margin-top: 2px;">You receive a fully fixed price with no hidden staircase charges.</div>
          </td>
        </tr>
        <tr>
          <td width="36" valign="top">
            <div style="width: 26px; height: 26px; background-color: #d97706; color: #ffffff; border-radius: 50%; text-align: center; line-height: 26px; font-weight: 800; font-size: 12px;">3</div>
          </td>
          <td>
            <div style="font-size: 13px; font-weight: 700; color: #0f172a;">Lock Your Preferred Move Date</div>
            <div style="font-size: 12px; color: #64748b; line-height: 1.5; margin-top: 2px;">Secure your van and dedicated moving team with an agreed booking deposit.</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Call and WhatsApp Action Bar -->
    <div style="text-align: center; margin: 28px 0 0 0;">
      <a href="${PHONE_TEL}" style="display: inline-block; background: linear-gradient(135deg, #064e3b 0%, #047857 100%); background-color: #064e3b; color: #ffffff; font-size: 15px; font-weight: 800; padding: 14px 28px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 14px rgba(6,78,59,0.25); margin-bottom: 12px;">
        📞 Call Move Coordinator: ${PHONE_NUMBER}
      </a>
      <div>
        <a href="https://wa.me/441382932840" target="_blank" style="display: inline-block; font-size: 13px; font-weight: 700; color: #047857; text-decoration: none; padding: 8px 18px; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px;">
          💬 Or Chat With Dispatch on WhatsApp
        </a>
      </div>
    </div>
  `;

  return wrapEmailLayout({
    title: `Move Inquiry Received — Dundee Movers (#${refCode})`,
    previewText: `Hi ${name}, our operations team has received your move details and is reviewing access and pricing.`,
    refCode,
    badgeText: 'Move Inquiry Confirmed',
    content
  });
}

/**
 * 2. Official Tailored Quote Delivery Email
 */
export function generateTailoredQuoteEmailHtml(lead, options = {}) {
  const name = lead.customerName || 'Valued Customer';
  const pickup = lead.pickupAddress || 'Dundee, Scotland';
  const delivery = lead.deliveryAddress || 'Destination Address';
  const van = options.assignedVan || lead.recommendedVan || '3.5T Luton Van with 500kg Tail-Lift';
  const crew = options.assignedCrew || lead.recommendedCrew || '2-Man Professional Tenement Movers';
  const quotePrice = options.quotePrice || (lead.estimatedPriceMin ? `£${lead.estimatedPriceMin}` : '£280');
  const deposit = options.depositAmount || '£50';
  const refCode = lead.id ? String(lead.id).slice(-6).toUpperCase() : 'DM-QUOTE';
  const moveDate = lead.moveDate || 'To Be Confirmed';

  const content = `
    <h2 class="mobile-title" style="font-size: 24px; font-weight: 900; color: #0f172a; margin: 0 0 10px 0; letter-spacing: -0.02em;">
      Your Guaranteed Move Quote is Ready, ${name}!
    </h2>
    <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 20px 0;">
      Our senior dispatch team has assessed your move route, tenement access, and items. Below is your official fixed-price quote with your allocated van and dedicated crew.
    </p>

    <!-- Luxury Pricing Hero Card -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border: 2px solid #10b981; border-radius: 14px; margin-bottom: 24px; box-shadow: 0 6px 20px rgba(16,185,129,0.12); overflow: hidden;">
      <tr>
        <td align="center" style="background: linear-gradient(135deg, #064e3b 0%, #047857 100%); background-color: #064e3b; padding: 20px 20px; color: #ffffff;">
          <div style="font-size: 12px; font-weight: 800; color: #a7f3d0; text-transform: uppercase; letter-spacing: 0.12em;">
            GUARANTEED FIXED MOVE PRICE
          </div>
          <div style="font-size: 40px; font-weight: 900; color: #ffffff; margin: 6px 0 2px 0; letter-spacing: -0.03em;">
            ${quotePrice}
          </div>
          <div style="font-size: 12px; color: #f59e0b; font-weight: 700;">
            ✓ Lock this date with a ${deposit} deposit &nbsp;•&nbsp; No Hidden Tenement Fees
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px 22px; background-color: #f8fafc;">
          <div style="font-size: 11px; font-weight: 800; color: #064e3b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px;">
            Allocated Move Package
          </div>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; line-height: 1.8; color: #334155;">
            <tr>
              <td width="24" valign="top">🚐</td>
              <td><strong>Assigned Vehicle:</strong> ${van}</td>
            </tr>
            <tr>
              <td width="24" valign="top">👥</td>
              <td><strong>Dedicated Crew:</strong> ${crew}</td>
            </tr>
            <tr>
              <td width="24" valign="top">🛡️</td>
              <td><strong>Included Cover:</strong> £50,000 Goods in Transit & £2,000,000 Public Liability</td>
            </tr>
            <tr>
              <td width="24" valign="top">🧰</td>
              <td><strong>Equipment:</strong> Padded transit blankets, furniture ties & heavy-duty dolly trolleys</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Route Review Box -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; margin-bottom: 24px; font-size: 13px; line-height: 1.6; color: #475569;">
      <tr>
        <td>
          <div>📍 <strong>Collection:</strong> ${pickup} (${lead.pickupFloor || 'Ground'})</div>
          <div style="margin-top: 4px;">🏁 <strong>Delivery:</strong> ${delivery} (${lead.deliveryFloor || 'Ground'})</div>
          <div style="margin-top: 4px;">📅 <strong>Move Date:</strong> ${moveDate}</div>
        </td>
      </tr>
    </table>

    <!-- Big Action Button -->
    <div style="text-align: center; margin: 28px 0 16px 0;">
      <a href="${PHONE_TEL}" style="display: inline-block; background: linear-gradient(135deg, #064e3b 0%, #047857 100%); background-color: #064e3b; color: #ffffff; font-size: 16px; font-weight: 900; padding: 15px 32px; border-radius: 10px; text-decoration: none; box-shadow: 0 6px 18px rgba(6,78,59,0.3); letter-spacing: -0.01em; margin-bottom: 12px;">
        📞 Call ${PHONE_NUMBER} to Lock Date
      </a>
      <div>
        <a href="https://wa.me/441382932840" target="_blank" style="display: inline-block; font-size: 13px; font-weight: 700; color: #047857; text-decoration: none; padding: 8px 18px; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px;">
          💬 Or Confirm Move on WhatsApp
        </a>
      </div>
      <div style="margin-top: 10px; font-size: 12px; color: #64748b;">
        Or simply reply directly to this email to lock in your move schedule.
      </div>
    </div>
  `;

  return wrapEmailLayout({
    title: `Your Guaranteed Move Quote — Dundee Movers (#${refCode})`,
    previewText: `Hi ${name}, your bespoke fixed price quote of ${quotePrice} is ready for review with allocated vehicle and crew.`,
    refCode,
    badgeText: 'Official Bespoke Quote',
    content
  });
}

/**
 * 3. Internal Operations Notification Email
 */
export function generateInternalLeadNotificationHtml(lead) {
  const refCode = lead.id ? String(lead.id).slice(-6).toUpperCase() : 'NEW';
  return `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; padding: 24px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
    <div style="background: #064e3b; padding: 18px 22px; color: #ffffff;">
      <h2 style="margin: 0; font-size: 18px; font-weight: 800;">🚨 New Move Inquiry Received — #${refCode}</h2>
    </div>
    <div style="padding: 20px 22px;">
      <table style="width: 100%; font-size: 13px; line-height: 1.8; color: #334155;">
        <tr><td width="120"><strong>Customer:</strong></td><td>${lead.customerName || 'N/A'}</td></tr>
        <tr><td><strong>Phone:</strong></td><td><a href="tel:${lead.customerPhone}">${lead.customerPhone || 'N/A'}</a></td></tr>
        <tr><td><strong>Email:</strong></td><td><a href="mailto:${lead.customerEmail}">${lead.customerEmail || 'N/A'}</a></td></tr>
        <tr><td><strong>Move Date:</strong></td><td>${lead.moveDate || 'Flexible'}</td></tr>
        <tr><td><strong>Move Type:</strong></td><td>${lead.moveType || 'General'}</td></tr>
        <tr><td><strong>Collection:</strong></td><td>${lead.pickupAddress} (Floor: ${lead.pickupFloor}, Lift: ${lead.pickupLift ? 'Yes' : 'No'})</td></tr>
        <tr><td><strong>Destination:</strong></td><td>${lead.deliveryAddress} (Floor: ${lead.deliveryFloor}, Lift: ${lead.deliveryLift ? 'Yes' : 'No'})</td></tr>
        <tr><td><strong>Notes / Manifest:</strong></td><td>${lead.notes || 'None'}</td></tr>
      </table>
      <div style="margin-top: 20px; text-align: center;">
        <a href="https://crm.dundeemovers.co.uk/#leads" style="display: inline-block; background: #064e3b; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 800; font-size: 13px;">
          Open in CRM Dashboard ➔
        </a>
      </div>
    </div>
  </div>
</body>
</html>`;
}
