/**
 * Legal & Policy Views Component: Terms & Conditions and Privacy Policy.
 * Provides clear, professional, customer-friendly legal protections tailored to Scottish removals.
 * Strictly complies with AGENTS.md SRP and 500-line limit.
 */

export function renderTermsView() {
  return `
    <div class="legal-page-container">
      <nav class="modular-breadcrumbs" aria-label="Breadcrumb" style="margin-bottom: 1.5rem;">
        <a href="/" class="breadcrumb-back">‹ Back to Home</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Terms & Conditions</span>
      </nav>

      <article class="legal-card glass-panel spotlight-card">
        <header class="legal-header">
          <div class="legal-badge-row">
            <span class="badge">Customer Service Agreement</span>
            <span style="font-size: 0.78rem; font-weight: 700; color: #059669;">✓ Updated September 2026</span>
          </div>
          <h1 class="legal-title">Terms & Conditions of Service</h1>
          <p class="legal-meta">Please review these terms and conditions carefully before confirming your relocation booking with Dundee Movers.</p>
        </header>

        <div class="legal-body">
          <div class="legal-highlight-box">
            <strong>Key Summary:</strong> We provide written or emailed quotations valid for a stated period, dedicated 1-move-at-a-time vans, and comprehensive Goods in Transit insurance. Payment is by cash or direct bank transfer only upon completion. Extra costs apply if job conditions are more difficult than described, waiting time is charged at £40 per van per hour, and any transit damage claims must be submitted in writing within 48 hours.
          </div>

          <h2>1. Dedicated 1-Move-At-A-Time Guarantee</h2>
          <p>
            When you book Dundee Movers, your assigned vehicle and crew are 100% exclusive to your relocation from collection to delivery. We never combine multiple customers' belongings into shared loads or route cargo through third-party sorting hubs.
          </p>

          <h2>2. Quotations & Validity Period</h2>
          <p>
            We provide a formal written or emailed quote based strictly on the information, inventory list, property access details, and floor levels you supply during the quotation process.
          </p>
          <ul>
            <li><strong>Limited Time Validity:</strong> Every quotation is valid for a limited time, as stated on your written estimate (standard validity is 14 calendar days from issue date, unless an alternate date is explicitly specified in writing). Bookings remain subject to van and crew schedule availability at the moment your booking deposit is received.</li>
            <li><strong>Fixed Price Integrity:</strong> Provided that the actual inventory, access conditions, and addresses match what was declared, your agreed move price is guaranteed and fixed with zero surprise fuel surcharges or hidden mileage fees on moving day.</li>
          </ul>

          <h2>3. Job Accuracy & Scope Adjustments (Extra Difficulty)</h2>
          <p>
            Our quotations and crew allocations are calculated precisely upon the details you provide. Extra costs may apply if the actual job is materially more difficult or extensive than described during booking:
          </p>
          <ul>
            <li><strong>Undeclared Items & Excess Volume:</strong> If additional large furniture pieces, extra unlisted rooms, lofts, garden sheds, or heavy loose cargo are added on moving morning, our team will review the adjustment with you prior to loading.</li>
            <li><strong>Access Obstacles & Extended Walking Distance:</strong> Extra costs may apply if property access differs from what was described (e.g. undisclosed high floor levels without an elevator, narrow spiral closes, difficult gate clearances, or walking carry distances exceeding 20 meters from vehicle to entrance).</li>
            <li><strong>Unprepared Goods & Specialist Labor:</strong> If furniture requires unexpected dismantling, door removal, or specialist maneuvering that was not stated during booking, additional labor time will be charged fairly.</li>
          </ul>

          <h2>4. Waiting Time & Client Delays (£40/hr per Van)</h2>
          <p>
            In Scottish property purchases and relocations, completion delays between collection and key handover can occasionally happen (such as delayed settlement of missives, banking transfer holdups, or late estate agent key releases).
          </p>
          <ul>
            <li><strong>Waiting Time Rate:</strong> Waiting time due to client, solicitor, or third-party handover delays is charged at <strong>£40 per van per hour</strong> (calculated in fair 30-minute intervals).</li>
            <li><strong>Courtesy Window:</strong> To assist you during the stress of key handover, we provide a complimentary courtesy grace period of 30 minutes upon arrival at the destination address before waiting charges commence.</li>
            <li><strong>Exclusive Dedication:</strong> Because our crew and locked van remain 100% dedicated to your belongings and cannot take on other work while waiting on standby, this fee ensures fair compensation for our team's operational time.</li>
          </ul>

          <h2>5. Parking & Street Curb Access</h2>
          <p>
            Adequate and safe parking space directly outside both the collection and delivery addresses is essential for swift loading and unloading.
          </p>
          <ul>
            <li><strong>Customer Responsibility:</strong> The customer is responsible for ensuring reasonable parking space is kept outside their close or home (for example, by parking their personal vehicle outside the property and moving it when the removals van arrives).</li>
            <li><strong>Restricted Streets:</strong> If parking requires permits or special arrangements, the customer must arrange this in advance. Any unavoidable parking penalty charge notices resulting from customer-directed illegal parking without reasonable curb space remain the responsibility of the customer.</li>
          </ul>

          <h2>6. Bookings, Deposits & Rescheduling</h2>
          <p>
            To secure your dedicated vehicle and removals crew for your chosen date, a standard booking deposit is payable upon quotation acceptance.
          </p>
          <ul>
            <li><strong>Date Rescheduling:</strong> In Scottish property transactions, delays in missives and entry dates can happen. If your move date changes, please give us at least 48 hours notice and we will gladly transfer your deposit to a new available date at no penalty.</li>
            <li><strong>Cancellations:</strong> Cancellations made with more than 48 hours notice before moving morning will receive a deposit credit toward future moves.</li>
          </ul>

          <h2>7. Payment Terms: Cash or Bank Transfer Only</h2>
          <p>
            Payment settlement is straightforward and transparent:
          </p>
          <ul>
            <li><strong>Accepted Payment Methods:</strong> We accept payment by <strong>cash or direct bank transfer only</strong>. We do not accept card payments or personal cheques.</li>
            <li><strong>Timing of Settlement:</strong> The remaining balance (total quoted price minus your initial deposit, plus any agreed waiting time or access adjustments) is strictly payable upon completion of the move on moving day.</li>
            <li><strong>Receipts & Invoices:</strong> Formal itemized commercial receipts and invoices are provided for all completed moves.</li>
          </ul>

          <h2>8. Customer Supervision & Final Property Sweep</h2>
          <p>
            To ensure complete accuracy and prevent items being left behind:
          </p>
          <ul>
            <li><strong>Authorized Presence:</strong> The customer or an authorized adult representative (aged 18+) must be present on-site throughout both the loading and unloading phases.</li>
            <li><strong>Final Inspection:</strong> It is the customer's sole responsibility to ensure that all items intended for relocation are loaded. Please conduct a thorough final inspection of all rooms, lofts, cupboards, attics, garages, and garden outbuildings before the removals vehicle departs the collection address. Dundee Movers cannot accept liability for items overlooked or left behind after departure.</li>
          </ul>

          <h2>9. Appliance Preparation & Plumbing Disconnection</h2>
          <p>
            Removals crews are professional movers and are not certified plumbers or electricians:
          </p>
          <ul>
            <li><strong>Pre-Move Disconnection:</strong> All washing machines, dishwashers, and refrigeration appliances must be fully drained, defrosted, and disconnected from water and power supplies prior to our crew's arrival.</li>
            <li><strong>Transit Bolts:</strong> Drum stabilizer transit bolts should be fitted to washing machines by the customer where applicable.</li>
            <li><strong>Liability Limitation:</strong> Dundee Movers is not liable for water leaks, damp damage, or internal mechanical and electrical faults resulting from pre-existing plumbing issues or appliances not properly prepared prior to moving.</li>
          </ul>

          <h2>10. Furniture Dismantling & Flat-Pack (MDF / Particle Board)</h2>
          <p>
            Flat-pack or composite chipboard/MDF furniture (such as IKEA wardrobes, chests of drawers, and modular shelving) is designed by manufacturers for single assembly and can be structurally compromised when moved:
          </p>
          <ul>
            <li><strong>Pre-Dismantling Recommendation:</strong> We strongly advise that customers dismantle large flat-pack wardrobes and units prior to moving morning.</li>
            <li><strong>Transit of Assembled Units:</strong> If flat-pack furniture is moved assembled at the customer's request, Dundee Movers cannot accept liability for structural joint failure, stripped screw sockets, or wood dowel fractures inherent to composite wood during normal transit.</li>
            <li><strong>Assembly Assistance:</strong> Basic furniture disassembly and reassembly can be requested in advance as part of your quotation.</li>
          </ul>

          <h2>11. Self-Packed Boxes (PBO) & Fragile Goods</h2>
          <p>
            Where packing is completed by the customer rather than our removals team (Packed By Owner / PBO):
          </p>
          <ul>
            <li><strong>Packing Standards:</strong> Cartons must be sturdy, well-taped, and fragile items individually wrapped with bubble wrap or packing paper. Boxes should not be overloaded beyond 20kg for safe handling.</li>
            <li><strong>Internal Breakage Liability:</strong> Dundee Movers cannot accept liability for internal damage or breakages inside customer-packed cartons unless there is clear external physical damage to the box caused by crew mishandling.</li>
          </ul>

          <h2>12. Excluded Items & Personal Valuables</h2>
          <p>
            Certain high-value and sensitive personal possessions must not be packed inside removals cartons or loaded into our vehicles. The customer must retain personal custody of:
          </p>
          <ul>
            <li>Cash, banknotes, currency, deeds, securities, passports, and essential identity documents.</li>
            <li>High-value fine jewellery, luxury watches, and precious gemstones.</li>
            <li>Essential prescription medications and critical daily medical equipment.</li>
          </ul>

          <h2>13. Goods in Transit Insurance Cover & 48-Hour Damage Claims</h2>
          <p>
            Dundee Movers is fully insured. Every relocation includes comprehensive Goods in Transit and Public Liability insurance cover:
          </p>
          <ul>
            <li><strong>Delivery Inspection:</strong> The customer must inspect goods during unloading at the destination property.</li>
            <li><strong>48-Hour Notification Window:</strong> In the unlikely event of loss or damage to your belongings, written notice with clear photographic evidence must be submitted to dispatch within <strong>48 hours</strong> of job completion. Claims submitted after 48 hours cannot be accepted under our transit insurance.</li>
            <li><strong>High-Value Items:</strong> Any single antique, artwork, or high-value item exceeding standard domestic furniture value should be explicitly declared in writing prior to moving day.</li>
          </ul>

          <h2>14. Unforeseen Delays & Force Majeure (Weather & Road Closures)</h2>
          <p>
            While our team prides itself on punctual timekeeping and dependable logistics, certain external circumstances are beyond our control:
          </p>
          <ul>
            <li>We cannot be held financially liable for delays resulting from severe Scottish weather (heavy snow, ice, blizzards), police road closures, high-wind closures of major bridges (e.g. Tay Road Bridge, Queensferry Crossing), or unavoidable traffic gridlock.</li>
            <li>In such events, our dispatch team maintains active communication and will take every safe, reasonable step to complete your relocation as promptly as conditions allow.</li>
          </ul>

          <h2>15. Deliveries to Customer-Chosen Self-Storage</h2>
          <p>
            Dundee Movers does not operate a public warehouse storage facility. However, our team regularly provides direct transport to and from any licensed self-storage facility of the customer's choice (including Kangaroo Self Storage, Armadillo, or local units).
          </p>

          <h2>16. Prohibited & Hazardous Goods</h2>
          <p>
            For safety and insurance compliance, our crews cannot transport flammable gases, petrol/diesel fuel canisters, open chemicals, firearms, or illegal contraband.
          </p>

          <div class="legal-contact-box">
            <div class="legal-contact-text">
              <strong>Have questions regarding our terms or your move?</strong><br />
              Our Dundee dispatch team is available 7 days a week to assist you.
            </div>
            <a href="tel:+447308420884" class="legal-contact-btn">Speak with Dispatch</a>
          </div>
        </div>
      </article>
    </div>
  `;
}

export function renderPrivacyView() {
  return `
    <div class="legal-page-container">
      <nav class="modular-breadcrumbs" aria-label="Breadcrumb" style="margin-bottom: 1.5rem;">
        <a href="/" class="breadcrumb-back">‹ Back to Home</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Privacy Policy</span>
      </nav>

      <article class="legal-card glass-panel spotlight-card">
        <header class="legal-header">
          <div class="legal-badge-row">
            <span class="badge">UK GDPR Compliance</span>
            <span style="font-size: 0.78rem; font-weight: 700; color: #059669;">✓ Updated September 2026</span>
          </div>
          <h1 class="legal-title">Privacy Policy</h1>
          <p class="legal-meta">How Dundee Movers collects, protects, and respects your personal contact and relocation data.</p>
        </header>

        <div class="legal-body">
          <div class="legal-highlight-box">
            <strong>Your Privacy Matters:</strong> We collect only the information necessary to provide accurate removals quotes and execute your move. We never sell, rent, or share your details with third-party marketing brokers.
          </div>

          <h2>1. Who We Are</h2>
          <p>
            Dundee Movers ("we", "our", "us") operates residential, student, and commercial removals across Dundee, Angus, Fife, and the entire United Kingdom. We act as the data controller for any information submitted through our website (<a href="https://dundeemovers.co.uk">https://dundeemovers.co.uk</a>).
          </p>

          <h2>2. Personal Data We Collect</h2>
          <p>When you use our online quote calculator or contact our dispatch team, we collect:</p>
          <ul>
            <li><strong>Contact Details:</strong> Your name, phone number, and email address.</li>
            <li><strong>Relocation Details:</strong> Collection address, destination address, preferred moving date, and floor access details (e.g. floor level, elevator availability).</li>
            <li><strong>Item Manifest:</strong> Lists of furniture and boxes you request to be moved.</li>
            <li><strong>Technical Data:</strong> Basic browser telemetry and anonymous analytics to maintain website stability and security.</li>
          </ul>

          <h2>3. How We Use Your Data</h2>
          <p>We process your personal information solely for legitimate operational purposes:</p>
          <ul>
            <li>To calculate and issue your tailored moving quotation.</li>
            <li>To contact you regarding your move schedule and arrival coordination.</li>
            <li>To generate itemized commercial invoices and receipts upon booking completion.</li>
            <li>To satisfy UK transport and insurance record-keeping requirements.</li>
          </ul>

          <h2>4. Data Storage & Security</h2>
          <p>
            All data submitted through our website is transmitted via encrypted Transport Layer Security (HTTPS/SSL). We retain customer move records only for as long as necessary to complete your booking, provide customer support, and comply with standard accounting standards.
          </p>

          <h2>5. Your Rights Under UK GDPR</h2>
          <p>Under the UK General Data Protection Regulation (UK GDPR), you have the right to:</p>
          <ul>
            <li>Request a copy of the personal information we hold about you.</li>
            <li>Request correction of any incomplete or inaccurate data.</li>
            <li>Request deletion of your contact details once your move is completed.</li>
          </ul>

          <div class="legal-contact-box">
            <div class="legal-contact-text">
              <strong>Data Inquiries & Privacy Requests:</strong><br />
              Email our privacy team at <a href="mailto:bookings@dundeemovers.co.uk" style="color: #047857; font-weight: 700;">bookings@dundeemovers.co.uk</a>
            </div>
            <a href="mailto:bookings@dundeemovers.co.uk" class="legal-contact-btn">Contact Privacy Officer</a>
          </div>
        </div>
      </article>
    </div>
  `;
}
