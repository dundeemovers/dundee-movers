/**
 * Dundee Movers CRM — Driver Job Sheet & Digital Bill of Lading Modal.
 * Aligned with UK Removals & BAR industry standards for paperless crew dispatch.
 */

export function renderJobSheetModal(job) {
  if (!job) return '';

  const crewList = Array.isArray(job.assignedCrew) ? job.assignedCrew.join(', ') : (job.assignedCrew || 'Not assigned');
  const inventoryItems = Array.isArray(job.inventoryItems) ? job.inventoryItems : [];

  return `
    <div class="lead-modal-backdrop" id="jobsheet-modal-backdrop">
      <div class="lead-modal-content jobsheet-modal-content" style="max-width: 850px;">
        
        <!-- Job Sheet Actions & Close Header -->
        <div class="jobsheet-top-bar no-print">
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button type="button" class="btn-crm btn-crm-email" id="jobsheet-btn-print">
              🖨️ Print Driver Sheet
            </button>
            <span style="font-size: 0.75rem; color: #64748b;">Formatted for mobile screen or clipboard print</span>
          </div>
          <button type="button" class="lead-modal-close" id="btn-close-jobsheet">&times;</button>
        </div>

        <!-- Printable Document Body -->
        <div class="jobsheet-printable" id="jobsheet-print-area">
          
          <!-- Official Removals Header -->
          <div class="jobsheet-header">
            <div class="jobsheet-brand">
              <div class="jobsheet-logo">DM</div>
              <div>
                <h1 class="jobsheet-title">DUNDEE MOVERS</h1>
                <p class="jobsheet-subtitle">Official Move Manifest & Digital Bill of Lading</p>
                <p class="jobsheet-legal">30 Whitehall St, Dundee, DD1 4AF • Tel: 07308 420884 • bookings@dundeemovers.co.uk • £50k Goods in Transit (Trading Style of Dundee Removals)</p>
              </div>
            </div>
            <div class="jobsheet-ref-box">
              <div class="ref-row"><span>Job Ref:</span> <strong>#${job.id}</strong></div>
              <div class="ref-row"><span>Move Date:</span> <strong>${job.moveDate}</strong></div>
              <div class="ref-row"><span>Time Window:</span> <strong>${job.timeWindow}</strong></div>
              <div class="ref-row"><span>Status:</span> <strong style="text-transform: uppercase;">${(job.jobStatus || '').replace(/_/g, ' ')}</strong></div>
            </div>
          </div>

          <!-- Vehicle & Crew Assignment Banner -->
          <div class="jobsheet-section jobsheet-crew-banner">
            <div class="crew-item">
              <span class="crew-label">Allocated Vehicle:</span>
              <span class="crew-value">🚐 ${job.assignedVehicle || '3.5T Luton Box Van'}</span>
            </div>
            <div class="crew-item">
              <span class="crew-label">Assigned Crew:</span>
              <span class="crew-value">👥 ${crewList}</span>
            </div>
            <div class="crew-item">
              <span class="crew-label">Estimated Volume:</span>
              <span class="crew-value">📦 ~${job.estimatedVolumeM3 || 12} m³ (${job.itemsCount || 20} items)</span>
            </div>
          </div>

          <!-- Customer & Route Logistics Table -->
          <div class="jobsheet-section">
            <h3 class="section-heading">1. Customer & Journey Logistics</h3>
            <div class="jobsheet-logistics-grid">
              
              <!-- Pickup -->
              <div class="logistics-card pickup-border">
                <div class="logistics-tag tag-pickup">📍 COLLECTION POINT</div>
                <div class="logistics-name">${job.customerName}</div>
                <div class="logistics-phone">📞 Tel: <a href="tel:${job.customerPhone}">${job.customerPhone || 'N/A'}</a></div>
                <div class="logistics-address">${job.pickupAddress}</div>
                <div class="logistics-access">
                  <span class="access-pill">🏢 ${job.pickupFloor}</span>
                  <span class="access-pill ${job.pickupLift ? 'pill-good' : 'pill-warn'}">
                    ${job.pickupLift ? '🛗 Lift Available' : '🪜 Stairs Only'}
                  </span>
                </div>
              </div>

              <!-- Delivery -->
              <div class="logistics-card delivery-border">
                <div class="logistics-tag tag-delivery">🏁 DELIVERY DESTINATION</div>
                <div class="logistics-name">${job.customerName}</div>
                <div class="logistics-phone">📞 Tel: <a href="tel:${job.customerPhone}">${job.customerPhone || 'N/A'}</a></div>
                <div class="logistics-address">${job.deliveryAddress}</div>
                <div class="logistics-access">
                  <span class="access-pill">🏢 ${job.deliveryFloor}</span>
                  <span class="access-pill ${job.deliveryLift ? 'pill-good' : 'pill-warn'}">
                    ${job.deliveryLift ? '🛗 Lift Available' : '🪜 Stairs Only'}
                  </span>
                </div>
              </div>

            </div>

            <!-- Tenement Stair Equipment Alert -->
            ${job.stairEquipmentRequired ? `
              <div class="tenement-alert" style="margin-top: 0.75rem;">
                <span>⚠️</span>
                <span><strong>Heavy Tenement Protocol:</strong> Upper floor stair carry. Ensure electric stair climbing dolly, heavy appliance straps, and protective banister pads are equipped on van.</span>
              </div>
            ` : ''}
          </div>

          <!-- Manifest Items Checklist -->
          <div class="jobsheet-section">
            <h3 class="section-heading">2. Itemized Removals Checklist & Loading Manifest</h3>
            <div class="jobsheet-inventory-box">
              ${inventoryItems.length > 0 ? `
                <table class="jobsheet-table">
                  <thead>
                    <tr>
                      <th style="width: 35px;">✓</th>
                      <th>Item Description</th>
                      <th style="width: 70px; text-align: center;">Qty</th>
                      <th style="width: 80px; text-align: right;">Est. m³</th>
                      <th>Condition / Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${inventoryItems.map(item => `
                      <tr>
                        <td style="text-align: center;"><input type="checkbox" class="manifest-chk" /></td>
                        <td style="font-weight: 700; color: #0f172a;">${item.name}</td>
                        <td style="text-align: center; font-weight: 800;">${item.count}x</td>
                        <td style="text-align: right; color: #64748b;">${item.m3 || (item.count * 0.2).toFixed(1)}</td>
                        <td style="color: #64748b; font-style: italic;">Inspected / Protected</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              ` : `
                <p style="color: #64748b; font-size: 0.85rem; padding: 0.5rem 0;">
                  Full household removal — manifest itemized via digital survey. Includes lounge furniture, bedroom sets, kitchen appliances, and approx. 20-30 boxed items.
                </p>
              `}
            </div>
            ${job.notes ? `
              <div style="background: #f8fafc; padding: 0.65rem 0.85rem; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 0.8rem; margin-top: 0.5rem;">
                <strong>Special Customer Instructions:</strong> <em>${job.notes}</em>
              </div>
            ` : ''}
          </div>

          <!-- Payment Summary & Financials -->
          <div class="jobsheet-section">
            <h3 class="section-heading">3. Job Financials & Balance Handover</h3>
            <div class="jobsheet-financials-bar">
              <div class="fin-box">
                <span class="fin-label">Total Agreed Price</span>
                <span class="fin-val">£${job.finalPrice || 280}</span>
              </div>
              <div class="fin-box">
                <span class="fin-label">Deposit Collected</span>
                <span class="fin-val" style="color: #065f46;">- £${job.depositPaid || 50}</span>
              </div>
              <div class="fin-box highlight-due">
                <span class="fin-label">Remaining Balance Due</span>
                <span class="fin-val" style="color: ${job.balanceDue > 0 ? '#b45309' : '#065f46'};">
                  ${job.balanceDue > 0 ? `£${job.balanceDue} (Collect on Finish)` : '✓ SETTLED IN FULL'}
                </span>
              </div>
            </div>
          </div>

          <!-- Customer Sign-Off & Bill of Lading Acceptance -->
          <div class="jobsheet-section jobsheet-signoff">
            <h3 class="section-heading">4. Completion Handover & Customer Sign-Off</h3>
            <p style="font-size: 0.75rem; color: #64748b; line-height: 1.4; margin-bottom: 0.75rem;">
              I confirm that all goods listed on this manifest have been delivered to the destination address in satisfactory order, with no damage to property or goods, under Dundee Movers standard terms of carriage (£50,000 Goods in Transit cover).
            </p>
            
            <div class="signoff-grid">
              <div class="signoff-box">
                <div class="signoff-label">Customer Signature / E-Sign:</div>
                <div class="signoff-canvas-wrap">
                  <canvas id="jobsheet-signature-pad" width="320" height="90" class="signature-canvas"></canvas>
                  <div class="signoff-actions no-print">
                    <button type="button" class="btn-clear-sig" id="btn-clear-signature">Clear</button>
                    <button type="button" class="btn-preset-sig" id="btn-confirm-signature">✓ Sign as ${job.customerName.split(' ')[0]}</button>
                  </div>
                </div>
              </div>

              <div class="signoff-box">
                <div class="signoff-label">Lead Mover Sign-Off:</div>
                <div class="crew-signoff-line">
                  <span>Crew Lead: <strong>${Array.isArray(job.assignedCrew) ? job.assignedCrew[0] : 'Lead Mover'}</strong></span>
                  <span>Date: <strong>${job.moveDate}</strong></span>
                  <span>Time Completed: <strong>___ : ___</strong></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

export function initJobSheetModalEvents(container, job, onSaveSignature) {
  const backdrop = container.querySelector('#jobsheet-modal-backdrop');
  const closeBtn = container.querySelector('#btn-close-jobsheet');
  const printBtn = container.querySelector('#jobsheet-btn-print');
  const clearBtn = container.querySelector('#btn-clear-signature');
  const confirmSigBtn = container.querySelector('#btn-confirm-signature');
  const canvas = container.querySelector('#jobsheet-signature-pad');

  const handleEsc = e => {
    if (e.key === 'Escape') closeModal();
  };

  const closeModal = () => {
    document.removeEventListener('keydown', handleEsc);
    container.remove();
  };

  document.addEventListener('keydown', handleEsc);

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) closeModal();
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Signature canvas drawing logic
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let drawing = false;

    ctx.strokeStyle = '#064e3b';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    const getPos = e => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const startDraw = e => {
      drawing = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      if (e.cancelable) e.preventDefault();
    };

    const draw = e => {
      if (!drawing) return;
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      if (e.cancelable) e.preventDefault();
    };

    const stopDraw = () => {
      drawing = false;
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDraw);

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }

    if (confirmSigBtn) {
      confirmSigBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'italic 24px Outfit, cursive, sans-serif';
        ctx.fillStyle = '#064e3b';
        ctx.fillText(job.customerName, 20, 55);
        if (onSaveSignature) {
          onSaveSignature(job.id, job.customerName);
        }
      });
    }
  }
}
