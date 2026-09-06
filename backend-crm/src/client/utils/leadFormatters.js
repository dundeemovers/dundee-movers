/**
 * Dundee Movers CRM — Lead Formatting & Manifest Parser Helpers.
 */

/**
 * Extract itemized inventory from lead.items or lead.notes
 */
export function parseManifestItems(lead) {
  const itemsList = [];

  // 1. Check structured items object
  if (lead.items && typeof lead.items === 'object' && Object.keys(lead.items).length > 0) {
    for (const [key, count] of Object.entries(lead.items)) {
      if (typeof count === 'number' && count > 0) {
        itemsList.push({ name: formatItemName(key), count });
      }
    }
  }

  // 2. If empty, parse from notes string (e.g., "Manifest: 1x Sofa, 2x Wardrobes")
  if (itemsList.length === 0 && lead.notes) {
    const manifestMatch = lead.notes.match(/Manifest:\s*([^|]+)/i);
    if (manifestMatch && manifestMatch[1]) {
      const rawItems = manifestMatch[1].split(',');
      for (const raw of rawItems) {
        const itemMatch = raw.trim().match(/^(\d+)x?\s+(.+)$/i);
        if (itemMatch) {
          itemsList.push({
            count: parseInt(itemMatch[1], 10),
            name: itemMatch[2].trim()
          });
        } else if (raw.trim().length > 0) {
          itemsList.push({ count: 1, name: raw.trim() });
        }
      }
    }
  }

  return itemsList;
}

function formatItemName(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

/**
 * Extract clean customer notes excluding reference codes and manifest
 */
export function extractCustomerNotes(notes) {
  if (!notes) return '';
  return notes
    .replace(/Ref:\s*#[A-Za-z0-9\-]+/gi, '')
    .replace(/Manifest:[^|]+/gi, '')
    .replace(/^\|\s*|\s*\|\s*$/g, '')
    .trim();
}

/**
 * Pre-filled Scottish WhatsApp message
 */
export function generateWhatsAppMessage(lead, price, passUrl) {
  const name = lead.customerName || 'there';
  const agreedPrice = price ? `£${price}` : 'a guaranteed fixed price';
  const url = passUrl || `https://dundeemovers.co.uk/#pass/${lead.id}`;

  const text = `Hi ${name}, this is Dundee Movers dispatch regarding your move from ${lead.pickupAddress || 'Dundee'} to ${lead.deliveryAddress || 'your destination'}. We have reviewed your property access and prepared your official move quote of ${agreedPrice}. You can view your allocated vehicle, crew, and accept your Move Pass directly here: ${url}`;

  return encodeURIComponent(text);
}
