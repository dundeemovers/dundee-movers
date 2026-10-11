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
    .replace(/Additional Items:\s*[^|]+/gi, '')
    .replace(/Timing Notes:\s*[^|]+/gi, '')
    .replace(/Move Timing:\s*[^|]+/gi, '')
    .replace(/^\|\s*|\s*\|\s*$/g, '')
    .trim();
}

/**
 * Extract specific additional inventory / heavy goods notes (from Step 2)
 */
export function extractInventoryNotes(lead) {
  if (!lead) return '';
  if (lead.inventoryNotes && typeof lead.inventoryNotes === 'string' && lead.inventoryNotes.trim()) {
    return lead.inventoryNotes.trim();
  }
  if (lead.inventory_notes && typeof lead.inventory_notes === 'string' && lead.inventory_notes.trim()) {
    return lead.inventory_notes.trim();
  }

  const notes = lead.notes || lead.custom_notes || '';
  if (typeof notes === 'string') {
    const match = notes.match(/Additional Items:\s*([^|]+)/i) || notes.match(/Special Notes \/ Other Items:\s*([^|]+)/i);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return '';
}

/**
 * Extract specific move timing / logistics notes (from Step 4)
 */
export function extractTimingNotes(lead) {
  if (!lead) return '';
  if (lead.timingNotes && typeof lead.timingNotes === 'string' && lead.timingNotes.trim()) {
    return lead.timingNotes.trim();
  }
  if (lead.timing_notes && typeof lead.timing_notes === 'string' && lead.timing_notes.trim()) {
    return lead.timing_notes.trim();
  }

  const notes = lead.notes || lead.custom_notes || '';
  if (typeof notes === 'string') {
    const match = notes.match(/Timing Notes:\s*([^|]+)/i) || notes.match(/Move Timing Notes:\s*([^|]+)/i);
    if (match && match[1]) {
      return match[1].trim();
    }

    // Legacy fallback: if notes has a generic Notes: section without partitioned tags
    const legacyNotesMatch = notes.match(/Notes:\s*([^|]+)/i);
    if (legacyNotesMatch && legacyNotesMatch[1]) {
      return legacyNotesMatch[1].trim();
    }
  }

  return '';
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

export function normalizeMediaKey(name) {
  return (name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Extract media attachments from lead.mediaFiles or fallback to regex parsing of lead.notes.
 * Strictly de-duplicates entries so uploaded files never appear duplicated in the UI.
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
          const rawName = itemMatch[1].trim();
          const normK = normalizeMediaKey(rawName);
          const num = parseFloat(itemMatch[2]);
          const unit = itemMatch[3].toUpperCase();
          reportedSizes[normK] = unit.startsWith('M') ? Math.round(num * 1024 * 1024) : Math.round(num * 1024);
        }
      }
    }
  }

  // 1. Process structured lead.mediaFiles
  if (Array.isArray(lead.mediaFiles) && lead.mediaFiles.length > 0) {
    for (const f of lead.mediaFiles) {
      if (!f || !f.name) continue;
      const normK = normalizeMediaKey(f.name);
      if (!seen.has(normK)) {
        seen.add(normK);
        const effectiveSize = (f.size && f.size > 1024) ? f.size : (reportedSizes[normK] || f.size || 0);
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

  // 2. Fallback to notes only for any files not already covered in mediaFiles
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

        const normK = normalizeMediaKey(name);
        if (!seen.has(normK)) {
          seen.add(normK);
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
