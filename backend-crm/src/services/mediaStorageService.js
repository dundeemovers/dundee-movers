/**
 * Dundee Movers CRM — Lead Media & Video Storage Service.
 * Persists uploaded customer survey photos and video walkthroughs to local disk
 * and serves them directly through the CRM dashboard.
 */
import path from 'node:path';
import { uploadToSupabaseStorage, isSupabaseConfigured } from './supabaseClient.js';

let fs = null;
let UPLOADS_ROOT = '';

// Safely initialize local filesystem references only in Node.js environment
try {
  if (typeof process !== 'undefined' && process.versions?.node && typeof navigator === 'undefined') {
    const fsModName = 'node:fs';
    const urlModName = 'node:url';
    const [fsMod, urlMod] = await Promise.all([
      import(/* @vite-ignore */ fsModName),
      import(/* @vite-ignore */ urlModName)
    ]);
    fs = fsMod.default || fsMod;
    if (urlMod.fileURLToPath && import.meta?.url) {
      const __dirname = path.dirname(urlMod.fileURLToPath(import.meta.url));
      UPLOADS_ROOT = path.join(__dirname, '..', 'client', 'uploads');
    }
  }
} catch (_) {
  fs = null;
}

export function ensureUploadsDir(leadId) {
  if (!fs || !UPLOADS_ROOT) return null;
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

export async function saveLeadMediaFiles(leadId, mediaFiles = []) {
  if (!leadId || !Array.isArray(mediaFiles) || mediaFiles.length === 0) return [];
  const targetDir = ensureUploadsDir(leadId);
  const results = [];

  for (const item of mediaFiles) {
    if (!item) continue;
    const safeName = sanitizeFilename(item.name || `media-${Date.now()}`);
    const mediaType = determineMediaType(safeName, item.type);
    let publicUrl = null;
    let fileBytes = null;

    if (item.dataUrl && typeof item.dataUrl === 'string') {
      try {
        const matches = item.dataUrl.match(/^data:([^;]+);base64,(.+)$/);
        const mime = matches ? matches[1] : (item.type || 'image/jpeg');
        const base64Data = matches ? matches[2] : item.dataUrl.replace(/^data:[^,]+,/, '');

        if (typeof Buffer !== 'undefined') {
          fileBytes = Buffer.from(base64Data, 'base64');
        } else {
          const bin = atob(base64Data);
          const arr = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
          fileBytes = arr;
        }

        // 1. Upload to Supabase Storage if configured
        if (isSupabaseConfigured()) {
          const sPath = `${leadId}/${safeName}`;
          publicUrl = await uploadToSupabaseStorage('lead-attachments', sPath, fileBytes, mime);
        }

        // 2. Save to local disk if Node fs exists
        if (fs && targetDir) {
          const filePath = path.join(targetDir, safeName);
          fs.writeFileSync(filePath, fileBytes);
          if (!publicUrl) {
            publicUrl = `/uploads/${leadId}/${encodeURIComponent(safeName)}`;
          }
        }
      } catch (err) {
        console.warn(`[MediaStorage] Error processing media ${safeName}:`, err.message);
      }
    }

    if (publicUrl) {
      results.push({
        name: safeName,
        size: item.size || (fileBytes ? fileBytes.length : 0),
        type: mediaType,
        url: publicUrl,
        exists: true
      });
    } else if (item.url) {
      results.push({
        name: safeName,
        size: item.size || 0,
        type: mediaType,
        url: item.url,
        exists: true
      });
    } else if (item.dataUrl && typeof item.dataUrl === 'string') {
      // Direct Data URL fallback (allows immediate preview even if offline/storage failed)
      results.push({
        name: safeName,
        size: item.size || 0,
        type: mediaType,
        url: item.dataUrl,
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
  const diskFiles = [];
  const normKey = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  if (fs && UPLOADS_ROOT) {
    const targetDir = path.join(UPLOADS_ROOT, leadId);
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
        const alreadyOnDisk = diskFiles.find(df => normKey(df.name) === normKey(safeName) || normKey(df.name) === normKey(name));

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
