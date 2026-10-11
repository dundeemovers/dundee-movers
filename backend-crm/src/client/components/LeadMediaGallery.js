/**
 * Dundee Movers CRM — Customer Photos & Video Walkthrough Sub-Component.
 * Renders thumbnail gallery, playable video players, full-screen lightbox,
 * and direct dispatcher dropzone for attaching survey media.
 */
import { parseAttachedMedia } from '../utils/leadFormatters.js';
import { uploadMultipleFiles, resolvePlayableMediaUrl } from '../utils/supabaseStorage.js';

export function renderLeadMediaGallery(lead) {
  if (!lead) return '';
  const mediaList = parseAttachedMedia(lead);

  return `
    <div class="survey-section-title" style="display: flex; justify-content: space-between; align-items: center;">
      <span>📸 Customer Attached Photos & Video Walkthrough (${mediaList.length})</span>
      <span style="font-size: 0.75rem; font-weight: normal; color: #64748b;">
        ${mediaList.length > 0 ? 'Click to inspect or play' : 'No attachments submitted'}
      </span>
    </div>

    <div class="crm-media-section" id="crm-media-section-container">
      ${mediaList.length > 0 ? `
        <div class="crm-media-grid">
          ${mediaList.map((item, idx) => {
            const isVideo = item.type === 'video';
            const phone = lead.customerPhone ? lead.customerPhone.replace(/[^0-9]/g, '') : '';
            const waText = encodeURIComponent(`Hi ${lead.customerName || 'there'}, this is Dundee Movers dispatch. Could you please send through the move attachment "${item.name}" here on WhatsApp so we can complete your guaranteed quote review?`);
            const waLink = `https://wa.me/${phone}?text=${waText}`;

            return `
              <div class="crm-media-card" data-media-index="${idx}">
                <div class="crm-media-preview-box">
                  ${item.exists && (item.url || (item.chunks && item.chunks.length > 0)) ? (
                    isVideo ? `
                      <video src="${item.url || ''}" data-media-chunks="${(item.chunks || []).join(',')}" preload="metadata" controls playsinline></video>
                    ` : `
                      <img src="${item.url}" alt="${item.name}" loading="lazy" class="crm-lightbox-trigger" data-media-url="${item.url}" data-media-name="${item.name}" data-media-type="image" />
                    `
                  ) : `
                    <div style="text-align: center; padding: 0.75rem; color: #94a3b8; font-size: 0.8rem; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
                      <span style="font-size: 1.8rem; margin-bottom: 0.25rem;">${isVideo ? '🎥' : '📷'}</span>
                      <span style="font-weight: 700; color: #e2e8f0;">${item.name}</span>
                      <span style="color: #fbbf24; font-size: 0.7rem; margin-top: 2px;">⚠️ Pending upload</span>
                    </div>
                  `}
                </div>

                <div class="crm-media-info">
                  <div>
                    <span class="crm-media-filename" title="${item.name}">${item.name}</span>
                    <span class="crm-media-filesize">
                      ${item.formattedSize || ''} • ${isVideo ? 'Video Walkthrough' : 'Photo Survey'}
                    </span>
                  </div>

                  <div class="crm-media-actions">
                    ${item.exists && (item.url || (item.chunks && item.chunks.length > 0)) ? `
                      <button type="button" class="crm-media-btn btn-view crm-lightbox-trigger" data-media-url="${item.url || ''}" data-media-chunks="${(item.chunks || []).join(',')}" data-media-name="${item.name}" data-media-type="${isVideo ? 'video' : 'image'}">
                        ${isVideo ? '▶ Full Player' : '🔍 Zoom'}
                      </button>
                      <a href="${item.url || '#'}" download="${item.name}" class="crm-media-btn crm-media-download-btn" title="Download to PC">
                        ⬇️ Save
                      </a>
                    ` : `
                      <a href="${waLink}" target="_blank" class="crm-media-btn btn-whatsapp" title="Request file via WhatsApp">
                        💬 Request on WA
                      </a>
                      <button type="button" class="crm-media-btn btn-attach-single" title="Upload this file directly">
                        ⬆️ Upload
                      </button>
                    `}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <p class="crm-media-empty-note">
          No survey media attached yet. You can drag and drop photos or video walkthroughs below to attach them to this lead.
        </p>
      `}

      <!-- Quick Drag & Drop Upload Zone for Dispatcher -->
      <div class="crm-media-dropzone" id="modal-media-dropzone" data-lead-id="${lead.id}">
        <input type="file" id="modal-media-input" multiple accept="image/*,video/*" style="display: none;" />
        <span style="font-size: 1.1rem; display: block; margin-bottom: 0.25rem;">📁 Drag & Drop or Click to Attach Media</span>
        <span style="font-size: 0.75rem; color: #64748b;">Supports PNG, JPG, WEBP, MP4, MOV, WEBM (Saved to server & previewed immediately)</span>
      </div>
    </div>
  `;
}

export function initLeadMediaGalleryEvents(container, lead, onMediaRefreshed) {
  const dropzone = container.querySelector('#modal-media-dropzone');
  const fileInput = container.querySelector('#modal-media-input');

  // Resolve and mount multi-chunk videos automatically
  container.querySelectorAll('video[data-media-chunks]').forEach(async (vid) => {
    const rawChunks = vid.getAttribute('data-media-chunks');
    const chunks = rawChunks ? rawChunks.split(',').filter(Boolean) : [];
    if (chunks.length > 1) {
      try {
        const objectUrl = await resolvePlayableMediaUrl({ chunks, type: 'video' });
        if (objectUrl) {
          vid.src = objectUrl;
          const card = vid.closest('.crm-media-card');
          if (card) {
            const dl = card.querySelector('.crm-media-download-btn');
            if (dl) dl.href = objectUrl;
          }
        }
      } catch (err) {
        console.warn('Could not reassemble video chunks:', err);
      }
    }
  });

  // Lightbox Trigger Handling
  container.querySelectorAll('.crm-lightbox-trigger').forEach(el => {
    el.addEventListener('click', async (e) => {
      e.stopPropagation();
      let url = el.getAttribute('data-media-url');
      const name = el.getAttribute('data-media-name') || 'Media Preview';
      const type = el.getAttribute('data-media-type') || 'image';
      const rawChunks = el.getAttribute('data-media-chunks');
      const chunks = rawChunks ? rawChunks.split(',').filter(Boolean) : [];

      if (chunks.length > 1) {
        try {
          url = await resolvePlayableMediaUrl({ chunks, type: 'video' });
        } catch (_) {}
      }

      if (!url) return;
      openMediaLightbox(url, name, type);
    });
  });

  // Pending attachment direct upload button
  container.querySelectorAll('.btn-attach-single').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (fileInput) fileInput.click();
    });
  });

  // Dropzone Click
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', async (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer && e.dataTransfer.files) {
        await handleFilesUpload(e.dataTransfer.files, lead, dropzone, onMediaRefreshed);
      }
    });

    fileInput.addEventListener('change', async () => {
      if (fileInput.files && fileInput.files.length > 0) {
        await handleFilesUpload(fileInput.files, lead, dropzone, onMediaRefreshed);
      }
    });
  }
}

async function handleFilesUpload(filesList, lead, dropzone, onMediaRefreshed) {
  const files = Array.from(filesList);
  if (files.length === 0) return;

  const originalText = dropzone.innerHTML;
  dropzone.innerHTML = `<span style="font-size: 0.9rem; color: #065f46; font-weight: 700;">⏳ Uploading ${files.length} file(s)...</span>`;

  try {
    const mediaFiles = await uploadMultipleFiles(files, {
      pathPrefix: lead.id,
      onProgress: (fIdx, total, progress) => {
        dropzone.innerHTML = `<span style="font-size: 0.9rem; color: #065f46; font-weight: 700;">⏳ Uploading (${fIdx + 1}/${total}) ${progress.percent > 0 ? progress.percent + '%' : ''}...</span>`;
      }
    });

    const validFiles = mediaFiles.filter(item => item && (item.url || item.dataUrl));
    if (validFiles.length === 0) {
      throw new Error('Upload was unable to process selected file(s)');
    }

    const res = await fetch(`/api/leads/${lead.id}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mediaFiles: validFiles })
    });

    if (res.ok) {
      const data = await res.json();
      dropzone.innerHTML = `<span style="font-size: 0.9rem; color: #059669; font-weight: 700;">✓ Uploaded successfully!</span>`;
      setTimeout(() => {
        if (onMediaRefreshed) onMediaRefreshed(data.lead || lead);
      }, 500);
    } else {
      dropzone.innerHTML = `<span style="font-size: 0.9rem; color: #dc2626; font-weight: 700;">⚠️ Server failed to attach media</span>`;
      setTimeout(() => { dropzone.innerHTML = originalText; }, 2500);
    }
  } catch (err) {
    console.error('Error uploading media:', err);
    dropzone.innerHTML = `<span style="font-size: 0.9rem; color: #dc2626; font-weight: 700;">⚠️ Upload error: ${err.message}</span>`;
    setTimeout(() => { dropzone.innerHTML = originalText; }, 3000);
  }
}

export function openMediaLightbox(url, name, type) {
  const existing = document.getElementById('crm-active-lightbox');
  if (existing) existing.remove();

  const isVideo = type === 'video';
  const backdrop = document.createElement('div');
  backdrop.id = 'crm-active-lightbox';
  backdrop.className = 'crm-lightbox-backdrop';

  backdrop.innerHTML = `
    <div class="crm-lightbox-content">
      <button type="button" class="crm-lightbox-close" id="crm-lightbox-close-btn">&times;</button>
      ${isVideo ? `
        <video src="${url}" controls autoplay playsinline style="max-width: 90vw; max-height: 80vh; background: #000; border-radius: 8px;"></video>
      ` : `
        <img src="${url}" alt="${name}" style="max-width: 90vw; max-height: 80vh; object-fit: contain; border-radius: 8px;" />
      `}
      <div class="crm-lightbox-footer">
        <span style="font-weight: 700;">${name}</span>
        <a href="${url}" download="${name}" style="color: #6ee7b7; text-decoration: underline; font-weight: 600;">⬇️ Download Full Resolution</a>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  const close = () => {
    backdrop.remove();
    document.removeEventListener('keydown', handleKey);
  };

  const handleKey = (e) => {
    if (e.key === 'Escape') close();
  };

  document.addEventListener('keydown', handleKey);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop || e.target.id === 'crm-lightbox-close-btn') close();
  });
}
