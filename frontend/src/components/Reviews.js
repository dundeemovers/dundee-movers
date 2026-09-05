/**
 * Reviews & Customer Testimonials Component.
 */

const REVIEWS_DATA = [
  {
    name: 'Callum MacLeod',
    role: 'West End Tenement Move (DD2)',
    rating: 5,
    date: 'August 2026',
    comment: 'Moving out of a 3rd-floor flat on Perth Road seemed daunting, but the Dundee Movers team were absolute machines. Wrapped every sofa and negotiated the spiral stairs without a single scratch on the walls.'
  },
  {
    name: 'Dr. Fiona Henderson',
    role: 'Broughty Ferry Family Home (DD5)',
    rating: 5,
    date: 'July 2026',
    comment: 'Flawless 4-bedroom house move to Barnhill. They supplied all wardrobe cartons and dismantled our king bed in 10 minutes. Transparent pricing with zero surprise charges.'
  },
  {
    name: 'Liam Chen',
    role: 'University of Dundee Student Move',
    rating: 5,
    date: 'August 2026',
    comment: 'Used their student moving service from Heathfield Halls into a private flat in City Quay. On time, polite, and the student discount was a lifesaver.'
  },
  {
    name: 'Heather Robertson',
    role: 'Office Relocation, Technology Park',
    rating: 5,
    date: 'June 2026',
    comment: 'Relocated our 15-person design office over a Saturday morning. Everything was labeled, computer monitors crated safely, and we were fully operational by Monday 8 AM.'
  }
];

export function renderReviews() {
  return `
    <section id="reviews" class="section-py reviews-section">
      <div class="container">
        <div class="section-header">
          <span class="badge">Verified Dundee Feedback</span>
          <h2>Trusted by Homeowners, Students & Businesses</h2>
          <p>Read why Dundee residents rate us 4.94 / 5 stars across Google and Trustpilot.</p>
        </div>

        <div class="reviews-grid">
          ${REVIEWS_DATA.map(review => `
            <div class="glass-panel review-card spotlight-card">
              <div class="review-header">
                <div class="reviewer-avatar">${review.name.charAt(0)}</div>
                <div class="reviewer-meta">
                  <strong class="reviewer-name">${review.name}</strong>
                  <span class="reviewer-role">${review.role}</span>
                </div>
              </div>
              <div class="review-stars">★★★★★</div>
              <p class="review-comment">"${review.comment}"</p>
              <div class="review-date-row">
                <span class="verified-badge">✓ Verified Move</span>
                <span class="review-date">${review.date}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
