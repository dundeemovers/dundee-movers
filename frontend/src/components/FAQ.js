/**
 * Interactive FAQ Accordion Component matching the JSON-LD Schema.
 * Addresses 1 Move At A Time / No Shared Loads policy, UK-wide logistics, and local Dundee access.
 */

const FAQS = [
  {
    q: 'Do you share van space with other customers’ belongings?',
    a: 'Never. We operate a strict 1-move-at-a-time policy. When we load your items, our vehicle is 100% dedicated to your relocation from pickup straight to delivery. Your belongings are never mixed with other customers’ goods or delayed at third-party sorting hubs.'
  },
  {
    q: 'How do I get a tailored quote for my move?',
    a: 'Simply use our online request form above to search your exact pickup and delivery addresses, choose the furniture and boxes you need moved, and note any access requirements. Our team will review your itemized inventory and provide a fast, guaranteed quote via phone or email.'
  },
  {
    q: 'Do you provide removals from Dundee to anywhere in the UK?',
    a: 'Yes! We cover the entire UK. Whether you are moving locally in Dundee or relocating to London, Manchester, Birmingham, Edinburgh, Glasgow, Aberdeen, or anywhere in England, Wales, or Scotland, we provide direct door-to-door transit in our dedicated van.'
  },
  {
    q: 'Do you handle both small flat moves and large multi-bedroom houses?',
    a: 'Yes, we cater to all move sizes. From moving a single sofa or student room to complete 4–5 bedroom family houses and office relocations, we assign the appropriate vehicle and crew members to match your needs.'
  },
  {
    q: 'Can you handle top-floor flats with narrow stairs and tight corners in Dundee?',
    a: 'Absolutely. A large portion of our local Dundee moves involve traditional multi-storey flats in the West End, City Centre, and Stobswell. Our crews are equipped with specialized high-tensile lifting straps, thick padded furniture blankets, and corner protectors to safely maneuver bulky furniture through narrow stairwells.'
  },
  {
    q: 'Are my belongings fully insured during transit?',
    a: 'Yes, we are fully insured. Every move automatically includes comprehensive Goods in Transit and Public Liability insurance at no extra charge.'
  },
  {
    q: 'What happens if there is a delay getting the keys on moving day?',
    a: 'In Scottish property purchases, key release delays can happen. We provide a 30-minute complimentary courtesy window upon arrival at your new property. If key handover is delayed beyond this by solicitors or previous occupants, waiting time is charged at a standard rate of £40 per van per hour.'
  },
  {
    q: 'Do you provide office and commercial removals in Dundee and Scotland?',
    a: 'Yes. We offer complete office and business relocation services throughout Dundee, Angus, Fife, and across Scotland. We provide weekend and evening moves to minimize commercial downtime, crate hire, secure IT and desktop computer transport, office furniture dismantling/assembly, and tailored B2B invoicing with formal itemized commercial receipts.'
  }
];

export function renderFAQ() {
  return `
    <section id="faq" class="section-py faq-section">
      <div class="container">
        <div class="section-header">
          <span class="badge">Got Questions?</span>
          <h2>Frequently Asked Questions</h2>
          <p>Learn more about our 1-move-at-a-time dedicated policy, UK-wide long-distance routes, and local Dundee logistics.</p>
        </div>

        <div class="faq-accordion-list">
          ${FAQS.map((faq, idx) => `
            <div class="glass-panel faq-item ${idx === 0 ? 'active' : ''}">
              <button class="faq-question-btn" aria-expanded="${idx === 0 ? 'true' : 'false'}">
                <span class="faq-question-text">${faq.q}</span>
                <span class="faq-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-answer-pane">
                <p class="faq-answer-text">${faq.a}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    btn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question-btn')?.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
