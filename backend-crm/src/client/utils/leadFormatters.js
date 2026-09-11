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
 * Extract clean customer notes excluding reference codes, manifest, and attached media
 */
export function extractCustomerNotes(notes) {
  if (!notes) return '';
  return notes
    .replace(/Ref:\s*#[A-Za-z0-9\-]+/gi, '')
    .replace(/Manifest:[^|]+/gi, '')
    .replace(/Attached Media\s*\([^)]*\):[^|]+/gi, '')
    .replace(/Attached Media:[^|]+/gi, '')
    .replace(/^\|\s*|\s*\|\s*$/g, '')
    .trim();
}

/**
 * Format bytes to readable string (e.g. 1026 KB, 5.7 MB)
 */
export function formatFileSize(bytes) {
  if (!bytes || isNaN(bytes) || bytes <= 0) return '';
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (bytes >= 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${bytes} B`;
}

/**
 * Extract media attachments from lead.mediaFiles or fallback to regex parsing of lead.notes
 */
export function parseAttachedMedia(lead) {
  if (!lead) return [];
  const results = [];
  const seen = new Set();

  // Extract reported sizes from notes (e.g. 2.png (1026KB))
  const reportedSizes = {};
  if (lead.notes && typeof lead.notes === 'string') {
    const match = lead.notes.match(/Attached Media\s*\([^)]*\):\s*([^|]+)/i);
    if (match && match[1]) {
      for (const entry of match[1].split(',')) {
        const itemMatch = entry.trim().match(/^(.+?)\s*\(([0-9.]+)\s*([A-Za-z]+)\)$/);
        if (itemMatch) {
          const name = itemMatch[1].trim().toLowerCase();
          const num = parseFloat(itemMatch[2]);
          const unit = itemMatch[3].toUpperCase();
          reportedSizes[name] = unit.startsWith('M') ? Math.round(num * 1024 * 1024) : Math.round(num * 1024);
        }
      }
    }
  }

  // 1. Check lead.mediaFiles
  if (Array.isArray(lead.mediaFiles) && lead.mediaFiles.length > 0) {
    for (const f of lead.mediaFiles) {
      if (!f || !f.name) continue;
      const key = f.name.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        const effectiveSize = (f.size && f.size > 1024) ? f.size : (reportedSizes[key] || f.size || 0);
        results.push({
          name: f.name,
          size: effectiveSize,
          formattedSize: formatFileSize(effectiveSize),
          type: f.type || determineTypeFromName(f.name),
          url: f.url || null,
          exists: Boolean(f.exists && f.url)
        });
      }
    }
  }

  // 2. Parse from notes string
  if (lead.notes && typeof lead.notes === 'string') {
    const match = lead.notes.match(/Attached Media\s*\([^)]*\):\s*([^|]+)/i);
    if (match && match[1]) {
      const entries = match[1].split(',');
      for (const entry of entries) {
        const itemMatch = entry.trim().match(/^(.+?)\s*\(([0-9.]+)\s*([A-Za-z]+)\)$/);
        let name = entry.trim();
        let sizeInBytes = 0;

        if (itemMatch) {
          name = itemMatch[1].trim();
          const num = parseFloat(itemMatch[2]);
          const unit = itemMatch[3].toUpperCase();
          sizeInBytes = unit.startsWith('M') ? Math.round(num * 1024 * 1024) : Math.round(num * 1024);
        }

        const key = name.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          results.push({
            name,
            size: sizeInBytes,
            formattedSize: formatFileSize(sizeInBytes),
            type: determineTypeFromName(name),
            url: null,
            exists: false
          });
        }
      }
    }
  }

  return results;
}

function determineTypeFromName(filename) {
  if (/\.(mp4|mov|webm|m4v|mkv|avi)$/i.test(filename)) return 'video';
  if (/\.(png|jpe?g|webp|gif|svg|bmp)$/i.test(filename)) return 'image';
  return 'file';
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
