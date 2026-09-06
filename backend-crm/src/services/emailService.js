/**
 * Automated Customer Communications & Luxury Email Generator.
 * Creates branded HTML emails for instant quotes, van hold follow-ups, and review requests.
 */

// Production in-memory email logs database (starts empty)
let emailLogsDatabase = [];

export function getEmailLogs() {
  return [...emailLogsDatabase];
}

export function generateInstantQuoteEmailHtml(lead) {
  const name = lead.customerName || 'Valued Customer';
  const pickup = lead.pickupAddress || 'Dundee, Scotland';
  const delivery = lead.deliveryAddress || 'Delivery Address';
  const van = lead.recommendedVan || '1x 3.5T Luton Van with Tail-Lift';
  const volume = lead.estimatedVolumeM3 || '12.0';
  const floorPickup = lead.pickupFloor || 'Ground Floor';
  const floorDelivery = lead.deliveryFloor || 'Ground Floor';
  const priceEstimate = lead.estimatedPriceMin && lead.estimatedPriceMax 
    ? `£${lead.estimatedPriceMin} – £${lead.estimatedPriceMax}` 
    : '£220 – £290';

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: #064e3b; padding: 28px 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">DUNDEE MOVERS</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #a7f3d0; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">Scottish Removals & Logistics Concierge</p>
      </div>

      <div style="padding: 28px 24px;">
        <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">Your Move Estimate is Ready, ${name}!</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.6;">Thank you for requesting a move quote. Based on your exact collection and delivery details, our team has pre-allocated your vehicle and crew:</p>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0;">
          <div style="font-size: 13px; color: #64748b; margin-bottom: 8px;">ESTIMATED GUARANTEED PRICE:</div>
          <div style="font-size: 26px; font-weight: 800; color: #064e3b; margin-bottom: 12px;">${priceEstimate} <span style="font-size: 12px; font-weight: 600; color: #64748b;">(No Hidden Tenement Fees)</span></div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; font-size: 13px; line-height: 1.7; color: #334155;">
            <div>🚐 <strong>Assigned Vehicle:</strong> ${van}</div>
            <div>📦 <strong>Estimated Volume:</strong> ~${volume} m³</div>
            <div>📍 <strong>Collection:</strong> ${pickup} (${floorPickup})</div>
            <div>🏁 <strong>Delivery:</strong> ${delivery} (${floorDelivery})</div>
            <div>🛡️ <strong>Insurance:</strong> £50,000 Goods in Transit Included Free</div>
          </div>
        </div>

        <div style="text-align: center; margin: 28px 0 16px;">
          <a href="https://wa.me/441382932840" style="display: inline-block; background: #064e3b; color: #ffffff; padding: 14px 28px; border-radius: 6px; font-weight: 700; text-decoration: none; font-size: 14px;">Lock In Your Move Date on WhatsApp ➔</a>
        </div>
        <p style="text-align: center; font-size: 12px; color: #94a3b8; margin: 0;">Or call our office dispatch directly: 01382 932840</p>
      </div>
    </div>
  `;
}

export function logAutomatedEmail(recipientEmail, recipientName, templateType, subject) {
  const newLog = {
    id: `email-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    recipientEmail,
    recipientName: recipientName || 'Customer',
    templateType,
    subject,
    status: 'delivered',
    openedAt: null
  };
  emailLogsDatabase.unshift(newLog);
  return newLog;
}
