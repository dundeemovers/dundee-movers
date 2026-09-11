/**
 * Dundee Movers CRM — Lead Media & Video Storage Service.
 * Persists uploaded customer survey photos and video walkthroughs to local disk
 * and serves them directly through the CRM dashboard.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_ROOT = path.join(__dirname, '..', 'client', 'uploads');

export function ensureUploadsDir(leadId) {
  const targetDir = leadId ? path.join(UPLOADS_ROOT, leadId) : UPLOADS_ROOT;
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  return targetDir;
}

export function sanitizeFilename(rawName) {
  if (!rawName || typeof rawName !== 'string') return `attachment-${Date.now()}`;
  const base = path.basename(rawName.trim());
  return base.replace(/[^a-zA-Z0-9.\-_]/g, '_');
}

export function determineMediaType(filename, mime = '') {
  const lowerMime = (mime || '').toLowerCase();
  const lowerName = (filename || '').toLowerCase();

  if (lowerMime.startsWith('video/') || /\.(mp4|mov|webm|m4v|mkv|avi)$/i.test(lowerName)) {
    return 'video';
  }
  if (lowerMime.startsWith('image/') || /\.(png|jpe?g|webp|gif|svg|bmp)$/i.test(lowerName)) {
    return 'image';
  }
  return 'file';
}

export function saveLeadMediaFiles(leadId, mediaFiles = []) {
  if (!leadId || !Array.isArray(mediaFiles) || mediaFiles.length === 0) return [];
  const targetDir = ensureUploadsDir(leadId);
  const results = [];

  for (const item of mediaFiles) {
    if (!item) continue;
    const safeName = sanitizeFilename(item.name || `media-${Date.now()}`);
    const filePath = path.join(targetDir, safeName);
    const mediaType = determineMediaType(safeName, item.type);

    if (item.dataUrl && typeof item.dataUrl === 'string') {
      try {
        const matches = item.dataUrl.match(/^data:([^;]+);base64,(.+)$/);
        const base64Data = matches ? matches[2] : item.dataUrl.replace(/^data:[^,]+,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(filePath, buffer);

        results.push({
          name: safeName,
          size: buffer.length,
          type: mediaType,
          url: `/uploads/${leadId}/${encodeURIComponent(safeName)}`,
          exists: true
        });
        continue;
      } catch (err) {
        console.warn(`[MediaStorage] Failed to save base64 media ${safeName}:`, err.message);
      }
    }

    // If already exists on disk
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      results.push({
        name: safeName,
        size: stats.size,
        type: mediaType,
        url: `/uploads/${leadId}/${encodeURIComponent(safeName)}`,
        exists: true
      });
    } else {
      results.push({
        name: safeName,
        size: item.size || 0,
        type: mediaType,
        url: null,
        exists: false
      });
    }
  }

  return results;
}

export function getLeadMediaFiles(leadId, notes = '') {
  if (!leadId) return [];
  const targetDir = path.join(UPLOADS_ROOT, leadId);
  const diskFiles = [];

  if (fs.existsSync(targetDir)) {
    try {
      const files = fs.readdirSync(targetDir);
      for (const f of files) {
        const fullPath = path.join(targetDir, f);
        const stat = fs.statSync(fullPath);
        if (stat.isFile()) {
          diskFiles.push({
            name: f,
            size: stat.size,
            type: determineMediaType(f),
            url: `/uploads/${leadId}/${encodeURIComponent(f)}`,
            exists: true
          });
        }
      }
    } catch (_) {}
  }

  // Also parse historical notes (e.g. Attached Media (2 files): 2.png (1026KB), Snapchat-1748851596.mp4 (5711KB))
  if (notes && typeof notes === 'string') {
    const match = notes.match(/Attached Media\s*\([^)]*\):\s*([^|]+)/i);
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

        const safeName = sanitizeFilename(name);
        const alreadyOnDisk = diskFiles.find(df => df.name.toLowerCase() === safeName.toLowerCase());

        if (!alreadyOnDisk) {
          diskFiles.push({
            name: safeName,
            size: sizeInBytes,
            type: determineMediaType(safeName),
            url: null,
            exists: false
          });
        }
      }
    }
  }

  return diskFiles;
}
