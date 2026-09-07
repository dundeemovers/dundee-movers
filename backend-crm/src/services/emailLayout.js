/**
 * Dundee Movers — Master Responsive Email Layout Wrapper
 * Bulletproof, responsive HTML email foundation supporting Outlook, Gmail, Apple Mail, and mobile.
 */

export const LOGO_URL = 'https://dundeemovers.co.uk/images/logo.jpg';
export const PHONE_NUMBER = '07308 420884';
export const PHONE_TEL = 'tel:+447308420884';
export const BOOKINGS_EMAIL = 'bookings@dundeemovers.co.uk';
export const WEBSITE_URL = 'https://dundeemovers.co.uk';

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
