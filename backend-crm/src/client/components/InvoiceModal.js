/**
 * Dundee Movers CRM — Official Scottish Removal Invoice & Receipt Generator.
 * Fully compliant with UK removals billing, itemized stair surcharges, and BACS transfers.
 */

export function renderInvoiceModal(job) {
  if (!job) return '';

  const invNumber = `INV-${(job.id || '2601').replace('JOB-', '')}`;
  const todayFormatted = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const isSettled = job.balanceDue === 0 || job.paymentStatus === 'settled_in_full';
  
  const baseServicePrice = Math.round(job.finalPrice * 0.75);
  const stairHandlingFee = job.stairEquipmentRequired ? Math.round(job.finalPrice * 0.15) : 0;
  const materialsFee = Math.round(job.finalPrice - baseServicePrice - stairHandlingFee);

  return `
    <div class="lead-modal-backdrop" id="invoice-modal-backdrop">
      <div class="lead-modal-content invoice-modal-content" style="max-width: 800px;">
        
        <!-- Top Toolbar (No-Print) -->
        <div class="invoice-top-toolbar no-print">
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button type="button" class="btn-crm btn-crm-email" id="btn-print-invoice">
              🖨️ Print / Save PDF Invoice
            </button>
            ${!isSettled ? `
              <button type="button" class="btn-crm btn-crm-whatsapp" id="btn-settle-invoice" data-job-id="${job.id}">
                💳 Mark Balance Settled (£${job.balanceDue})
              </button>
            ` : `
              <span class="metric-badge badge-green" style="font-size: 0.8rem; padding: 0.3rem 0.75rem;">
                ✓ Settled in Full
              </span>
            `}
          </div>
          <button type="button" class="lead-modal-close" id="btn-close-invoice">&times;</button>
        </div>

        <!-- Printable Official Invoice Area -->
        <div class="invoice-print-sheet" id="invoice-printable">
          
          <!-- Invoice Header -->
          <div class="invoice-header-row">
            <div class="invoice-brand-col">
              <div class="invoice-brand-mark">DM</div>
              <div>
                <h1 class="invoice-company-title">DUNDEE MOVERS LTD</h1>
                <p class="invoice-tagline">Premier Scottish Removals & Tenement Logistics</p>
                <p class="invoice-legal-info">
                  30 Whitehall Street, Dundee, Scotland, DD1 4AF<br>
                  Company Reg: SC789421 • VAT Reg: GB 429 8810 24<br>
                  Tel: 07308 420884 • Email: bookings@dundeemovers.co.uk
                </p>
              </div>
            </div>

            <div class="invoice-meta-col">
              <div class="invoice-badge-title">INVOICE & RECEIPT</div>
              <div class="inv-meta-row"><span>Invoice Ref:</span> <strong>#${invNumber}</strong></div>
              <div class="inv-meta-row"><span>Date Issued:</span> <strong>${todayFormatted}</strong></div>
              <div class="inv-meta-row"><span>Move Date:</span> <strong>${job.moveDate}</strong></div>
              <div class="inv-meta-row">
                <span>Payment Status:</span>
                <strong style="color: ${isSettled ? '#065f46' : '#b45309'};">
                  ${isSettled ? 'PAID IN FULL' : 'DEPOSIT RECEIVED'}
                </strong>
              </div>
            </div>
          </div>

          <!-- Customer & Journey Details -->
          <div class="invoice-parties-grid">
            <div class="invoice-party-box">
              <span class="party-label">BILLED TO (CUSTOMER):</span>
              <div class="party-name">${job.customerName}</div>
              <div class="party-text">Tel: ${job.customerPhone || 'N/A'}</div>
              <div class="party-text">Email: ${job.customerEmail || 'N/A'}</div>
              <div class="party-text" style="margin-top: 0.35rem;">Destination: ${job.deliveryAddress}</div>
            </div>

            <div class="invoice-party-box">
              <span class="party-label">LOGISTICS & VEHICLE ALLOCATION:</span>
              <div class="party-text"><strong>Collection:</strong> ${job.pickupAddress} (${job.pickupFloor})</div>
              <div class="party-text"><strong>Delivery:</strong> ${job.deliveryAddress} (${job.deliveryFloor})</div>
              <div class="party-text"><strong>Vehicle:</strong> ${job.assignedVehicle || '3.5T Luton Box Van'}</div>
              <div class="party-text"><strong>Transit Insurance:</strong> £50,000 Goods in Transit (Included)</div>
            </div>
          </div>

          <!-- Line Items Table -->
          <table class="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th style="width: 100px; text-align: center;">Allocation</th>
                <th style="width: 120px; text-align: right;">Amount (£)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Residential Removal Service</strong><br>
                  <span style="font-size: 0.75rem; color: #64748b;">
                    Full loading, transport, and room-of-choice placement with ${Array.isArray(job.assignedCrew) ? job.assignedCrew.join(', ') : job.assignedCrew}.
                  </span>
                </td>
                <td style="text-align: center;">~${job.estimatedVolumeM3 || 12} m³</td>
                <td style="text-align: right; font-weight: 700;">£${baseServicePrice}.00</td>
              </tr>
              ${stairHandlingFee > 0 ? `
                <tr>
                  <td>
                    <strong>Upper Tenement Stair Carry Protocol</strong><br>
                    <span style="font-size: 0.75rem; color: #64748b;">
                      Specialist equipment including electric motorized stair crawler, heavy furniture straps, and tenement banister protection.
                    </span>
                  </td>
                  <td style="text-align: center;">Stairs Only</td>
                  <td style="text-align: right; font-weight: 700;">£${stairHandlingFee}.00</td>
                </tr>
              ` : ''}
              <tr>
                <td>
                  <strong>Packing Supplies & Furniture Protection Package</strong><br>
                  <span style="font-size: 0.75rem; color: #64748b;">
                    Heavy-duty quilted transit blankets, mattress protector bags, and protective wardrobe transport rails.
                  </span>
                </td>
                <td style="text-align: center;">Transit Kit</td>
                <td style="text-align: right; font-weight: 700;">£${materialsFee}.00</td>
              </tr>
              <tr>
                <td>
                  <strong>Goods in Transit & Public Liability Insurance</strong><br>
                  <span style="font-size: 0.75rem; color: #64748b;">
                    Comprehensive £50,000 Goods in Transit and £2,000,000 Public Liability coverage.
                  </span>
                </td>
                <td style="text-align: center;">Policy Active</td>
                <td style="text-align: right; font-weight: 700; color: #065f46;">INCLUDED (£0)</td>
              </tr>
            </tbody>
          </table>

          <!-- Financial Calculation Breakdown -->
          <div class="invoice-summary-wrap">
            <div class="invoice-bacs-box">
              <span class="bacs-title">🏦 Bank Transfer (BACS) Details:</span>
              <div class="bacs-line"><span>Bank:</span> <strong>Bank of Scotland</strong></div>
              <div class="bacs-line"><span>Account Name:</span> <strong>Dundee Removals (Dundee Movers Division)</strong></div>
              <div class="bacs-line"><span>Sort Code:</span> <strong>80-22-60</strong></div>
              <div class="bacs-line"><span>Account No:</span> <strong>12345678</strong></div>
              <div class="bacs-line"><span>Payment Ref:</span> <strong>${invNumber}</strong></div>
              <p style="font-size: 0.68rem; color: #64748b; margin: 0.35rem 0 0 0; line-height: 1.3;">
                * If your banking app verifies payee names, please select "Dundee Removals".
              </p>
            </div>

            <div class="invoice-totals-box">
              <div class="tot-row"><span>Total Guaranteed Service:</span> <strong>£${job.finalPrice}.00</strong></div>
              <div class="tot-row" style="color: #065f46;"><span>Date-Hold Deposit Paid:</span> <strong>- £${job.depositPaid}.00</strong></div>
              <div class="tot-row tot-due">
                <span>Balance ${isSettled ? 'Settled' : 'Due'}:</span>
                <span class="tot-due-val" style="color: ${isSettled ? '#065f46' : '#b45309'};">
                  ${isSettled ? '£0.00 (PAID)' : `£${job.balanceDue}.00`}
                </span>
              </div>
            </div>
          </div>

          <!-- Invoice Footer -->
          <div class="invoice-footer">
            <p>Thank you for choosing Dundee Movers. Safe transit guaranteed across Scotland and the UK.</p>
            <p style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.2rem;">Dundee Movers is an operational trading brand of Dundee Removals. Goods in Transit (£50k) and Public Liability (£2m) certified under British Association of Removers conditions of carriage.</p>
          </div>

        </div>
      </div>
    </div>
  `;
}

export function initInvoiceModalEvents(container, job, onSettleBalance) {
  const backdrop = container.querySelector('#invoice-modal-backdrop');
  const closeBtn = container.querySelector('#btn-close-invoice');
  const printBtn = container.querySelector('#btn-print-invoice');
  const settleBtn = container.querySelector('#btn-settle-invoice');

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

  if (settleBtn && onSettleBalance) {
    settleBtn.addEventListener('click', async () => {
      settleBtn.disabled = true;
      settleBtn.textContent = 'Settling...';
      await onSettleBalance(job.id);
      closeModal();
    });
  }
}
