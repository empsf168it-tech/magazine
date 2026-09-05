export function renderFooter(onNavigate, showToast) {
  const footerEl = document.getElementById('main-footer');
  if (!footerEl) return;

  footerEl.innerHTML = `
    <div class="section-container">
      <div class="footer-grid">
        <!-- Brand Column -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div class="footer-brand-title">VANTA<span>.</span></div>
          <p style="font-size: 1rem; color: var(--text-secondary); max-width: 400px; line-height: 1.6;">
            Culture. Ideas. Stories That Move. A luxury digital publication bridging physical space, synthetic intelligence, and modern editorial craft.
          </p>

          <div style="display: flex; gap: 16px; margin-top: 12px;">
            <a href="#instagram" style="color: var(--accent-gold); font-size: 0.85rem; text-decoration: none; font-weight: 700;">INSTAGRAM</a>
            <a href="#twitter" style="color: var(--accent-gold); font-size: 0.85rem; text-decoration: none; font-weight: 700;">X / TWITTER</a>
            <a href="#youtube" style="color: var(--accent-gold); font-size: 0.85rem; text-decoration: none; font-weight: 700;">YOUTUBE</a>
            <a href="#pinterest" style="color: var(--accent-gold); font-size: 0.85rem; text-decoration: none; font-weight: 700;">PINTEREST</a>
          </div>
        </div>

        <!-- Directory Links Column 1 -->
        <div class="footer-links-col">
          <div class="footer-col-title">DEPARTMENTS</div>
          <a class="footer-link" data-view="category" data-cat="CULTURE">Culture</a>
          <a class="footer-link" data-view="category" data-cat="DESIGN">Design</a>
          <a class="footer-link" data-view="category" data-cat="TECH">Technology</a>
          <a class="footer-link" data-view="category" data-cat="FASHION">Fashion</a>
          <a class="footer-link" data-view="category" data-cat="TRAVEL">Travel</a>
          <a class="footer-link" data-view="category" data-cat="LIFESTYLE">Lifestyle</a>
        </div>

        <!-- Directory Links Column 2 -->
        <div class="footer-links-col">
          <div class="footer-col-title">PUBLICATION</div>
          <a class="footer-link" data-view="stories">All Stories</a>
          <a class="footer-link" data-view="issue">Latest Issue 024</a>
          <a class="footer-link" data-view="archive">Issue Archive</a>
          <a class="footer-link" data-view="about">About VANTA</a>
          <a class="footer-link" data-view="about">Editorial Board</a>
        </div>

        <!-- Newsletter Column -->
        <div class="footer-links-col">
          <div class="footer-col-title">GET THE STORIES THAT MATTER</div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
            Join 85,000+ global curators receiving our weekly Sunday dispatch.
          </p>

          <form id="footer-newsletter-form" class="newsletter-form">
            <div class="newsletter-input-wrapper">
              <input id="newsletter-email-input" type="email" class="newsletter-input" placeholder="Enter your email..." required />
              <button type="submit" class="newsletter-btn">JOIN</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Footer Bottom Row -->
      <div class="footer-bottom">
        <div>© 2026 VANTA EDITORIAL MEDIA GROUP. ALL RIGHTS RESERVED.</div>
        <div style="display: flex; gap: 20px;">
          <span>PRIVACY POLICY</span>
          <span>TERMS OF SERVICE</span>
          <span>EDITORIAL GUIDELINES</span>
        </div>
        <button id="back-to-top-btn" class="header-btn" style="width: auto; height: 36px; padding: 0 16px; border-radius: 18px; font-size: 0.7rem; font-weight: 700;">
          TOP ↑
        </button>
      </div>
    </div>
  `;

  // Attach Navigation events
  footerEl.querySelectorAll('[data-view]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');
      const cat = link.getAttribute('data-cat');
      onNavigate(targetView, { category: cat });
    });
  });

  // Newsletter Submit event
  const form = footerEl.querySelector('#footer-newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = footerEl.querySelector('#newsletter-email-input');
      if (input && input.value) {
        showToast(`Thank you! ${input.value} subscribed to VANTA Sunday Dispatch.`);
        input.value = '';
      }
    });
  }

  // Back to Top button
  const topBtn = footerEl.querySelector('#back-to-top-btn');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
