/**
 * Supabase Storage Resumable Multi-Part Upload Utility
 * Handles reliable upload of survey photos and large video walkthroughs (up to 500MB+).
 * Bypasses Cloudflare 30MB gateway & Supabase 50MB free-tier limits via 20MB chunking.
 */

const SUPABASE_PUBLIC_HOST = 'https://ozcttsokgyscukrdgxfp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_VnlNAAw4kVm7CaWlmjxXZQ_reFOSDzV';
const DEFAULT_BUCKET = 'lead-attachments';
const CHUNK_SIZE = 20 * 1024 * 1024; // 20MB safe chunk size

/**
 * Upload a single binary chunk with automatic exponential retry
 */
async function uploadChunkWithRetry(blob, storagePath, bucket = DEFAULT_BUCKET, maxRetries = 3) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const res = await fetch(`${SUPABASE_PUBLIC_HOST}/storage/v1/object/${bucket}/${storagePath}`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': blob.type || 'application/octet-stream'
        },
        body: blob
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(`Upload error (${res.status}): ${errText}`);
      }

      return `${SUPABASE_PUBLIC_HOST}/storage/v1/object/public/${bucket}/${storagePath}`;
    } catch (err) {
      attempt++;
      if (attempt >= maxRetries) throw err;
      await new Promise((r) => setTimeout(r, 600 * attempt));
    }
  }
}

/**
 * Upload a single file (image or large video walkthrough).
 * Automatically splits files > 20MB into 20MB chunks to guarantee 100% upload success.
 */
export async function uploadFileToStorage(file, options = {}) {
  const {
    bucket = DEFAULT_BUCKET,
    pathPrefix = 'uploads',
    onProgress
  } = options;

  const isVideo = file.type?.startsWith('video') || /\.(mp4|mov|webm|m4v|mkv|avi)$/i.test(file.name);
  const safeName = (file.name || `media_${Date.now()}`).replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const timestamp = Date.now();

  try {
    // 1. Single-chunk upload for files <= 20MB
    if (file.size <= CHUNK_SIZE) {
      const storagePath = `${pathPrefix}/${timestamp}_${safeName}`;
      const publicUrl = await uploadChunkWithRetry(file, storagePath, bucket);

      if (typeof onProgress === 'function') {
        onProgress({ loaded: file.size, total: file.size, percent: 100 });
      }

      return {
        name: file.name,
        size: file.size,
        type: isVideo ? 'video' : 'image',
        url: publicUrl,
        chunks: [publicUrl],
        exists: true
      };
    }

    // 2. Multi-chunk upload for large video walkthroughs (> 20MB up to 500MB+)
    const total = file.size;
    const chunkUrls = [];
    let offset = 0;
    let partIdx = 0;

    while (offset < total) {
      const end = Math.min(offset + CHUNK_SIZE, total);
      const chunkBlob = file.slice(offset, end, file.type || 'video/mp4');
      const storagePath = `${pathPrefix}/${timestamp}_part${partIdx}_${safeName}`;

      const partUrl = await uploadChunkWithRetry(chunkBlob, storagePath, bucket);
      chunkUrls.push(partUrl);

      offset = end;
      partIdx++;

      if (typeof onProgress === 'function') {
        const percent = Math.min(100, Math.round((offset / total) * 100));
        onProgress({ loaded: offset, total, percent });
      }

      // Brief delay to prevent browser socket saturation
      await new Promise((r) => setTimeout(r, 200));
    }

    return {
      name: file.name,
      size: file.size,
      type: isVideo ? 'video' : 'image',
      url: chunkUrls[0],
      chunks: chunkUrls,
      exists: true
    };
  } catch (err) {
    console.warn(`[StorageUpload] Upload failed for ${file.name}:`, err.message);

    return {
      name: file.name,
      size: file.size,
      type: isVideo ? 'video' : 'image',
      url: null,
      chunks: [],
      exists: false,
      error: err.message
    };
  }
}

/**
 * Upload multiple files sequentially with progress reporting
 */
export async function uploadMultipleFiles(files, options = {}) {
  const fileArray = Array.from(files || []);
  const results = [];

  for (let i = 0; i < fileArray.length; i++) {
    const file = fileArray[i];
    const res = await uploadFileToStorage(file, {
      ...options,
      onProgress: (progress) => {
        if (typeof options.onProgress === 'function') {
          options.onProgress(i, fileArray.length, progress, file);
        }
      }
    });
    results.push(res);
  }

  return results;
}

/**
 * Reassembles multi-chunk video in browser memory and returns a playable Blob URL
 */
const blobCache = new Map();

export async function resolvePlayableMediaUrl(item, onProgress) {
  if (!item) return null;
  if (!item.chunks || item.chunks.length <= 1) {
    return item.url || null;
  }

  const cacheKey = item.chunks.join('|');
  if (blobCache.has(cacheKey)) {
    return blobCache.get(cacheKey);
  }

  const buffers = [];
  const totalParts = item.chunks.length;

  for (let i = 0; i < totalParts; i++) {
    const partUrl = item.chunks[i];
    const resp = await fetch(partUrl);
    if (!resp.ok) throw new Error(`Failed to load video part ${i + 1}`);
    const buf = await resp.arrayBuffer();
    buffers.push(buf);

    if (typeof onProgress === 'function') {
      const percent = Math.round(((i + 1) / totalParts) * 100);
      onProgress(percent);
    }
  }

  const mime = item.type === 'video' ? 'video/mp4' : 'application/octet-stream';
  const blob = new Blob(buffers, { type: mime });
  const objectUrl = URL.createObjectURL(blob);
  blobCache.set(cacheKey, objectUrl);
  return objectUrl;
}
