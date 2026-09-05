import gsap from 'gsap';
import { ISSUES } from '../data/issues.js';

export function renderLatestIssueHero(containerEl, onNavigate, showToast) {
  const issue = ISSUES[0]; // Issue 024

  containerEl.innerHTML = `
    <section class="issue-hero-section">
      <div class="section-container">
        <div class="issue-hero-grid">
          <!-- Left Column: Heading, Subheading, Specifications & CTAs -->
          <div class="issue-hero-content">
            <div class="category-badge">CURRENT EDITION — ISSUE 024</div>

            <h1 class="issue-hero-title">
              THE HUMAN <br/>
              <span class="highlight">FUTURE</span>
            </h1>

            <p class="issue-hero-subtitle">
              184 heavy-rag pages investigating synthetic intelligence, cybernetic fashion, and spatial ethics. Includes exclusive conversations with 14 global visionaries.
            </p>

            <!-- Specifications Grid -->
            <div class="issue-specs-grid">
              <div class="spec-box">
                <span class="spec-label">PAGES</span>
                <span class="spec-val">184 HARDCOVER</span>
              </div>
              <div class="spec-box">
                <span class="spec-label">PUBLICATION DATE</span>
                <span class="spec-val">OCTOBER 2026</span>
              </div>
              <div class="spec-box">
                <span class="spec-label">CURATED BY</span>
                <span class="spec-val">JUNA SHAH</span>
              </div>
              <div class="spec-box">
                <span class="spec-label">ISBN</span>
                <span class="spec-val">978-3-9524-1</span>
              </div>
            </div>

            <!-- Action CTAs -->
            <div class="issue-hero-actions">
              <button id="issue-hero-read-btn" class="btn-primary" data-cursor="read">
                <span>READ DIGITAL EDITION</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>

              <button id="issue-hero-order-btn" class="btn-secondary" data-cursor="view">
                <span>ORDER HARDCOVER ($32)</span>
              </button>
            </div>
          </div>

          <!-- Right Column: Interactive 3D Product Mockup Showcase -->
          <div class="issue-hero-mockup-stage" data-cursor="3d">
            <div id="issue-3d-hero-mockup" class="issue-product-mockup">
              <!-- Physical Hardcover 3D Foil Ribbon -->
              <div class="issue-ribbon-badge">VOL. 12 • ISSUE 024</div>

              <!-- Main Cover Frame -->
              <div class="issue-mockup-cover">
                <img src="${issue.coverImage}" alt="${issue.title}" class="issue-cover-img" />
                <div class="issue-mockup-glare"></div>
              </div>

              <!-- Background Stacked Depth Layers -->
              <div class="issue-mockup-layer layer-back-1"></div>
              <div class="issue-mockup-layer layer-back-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach button events
  const readBtn = containerEl.querySelector('#issue-hero-read-btn');
  const orderBtn = containerEl.querySelector('#issue-hero-order-btn');

  if (readBtn) {
    readBtn.addEventListener('click', () => {
      const tocSection = document.querySelector('.issue-section');
      if (tocSection) {
        tocSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      if (showToast) {
        showToast("Issue 024 Hardcover Edition added to your cart ($32). Free worldwide dispatch.");
      } else {
        alert("Issue 024 Hardcover Edition added to your cart ($32).");
      }
    });
  }

  // Interactive 3D Mockup Mouse Tilt
  const mockupCard = containerEl.querySelector('#issue-3d-hero-mockup');
  const stage = containerEl.querySelector('.issue-hero-mockup-stage');

  if (mockupCard && stage) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * 16;
      const rotateY = ((x - centerX) / centerX) * 16;

      mockupCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    stage.addEventListener('mouseleave', () => {
      mockupCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    });
  }

  // GSAP Entrance Animations
  const content = containerEl.querySelector('.issue-hero-content');
  const stageEl = containerEl.querySelector('.issue-hero-mockup-stage');

  if (content && stageEl) {
    gsap.fromTo(content.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
    );
    gsap.fromTo(stageEl,
      { opacity: 0, scale: 0.9, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }
}
