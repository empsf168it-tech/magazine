import gsap from 'gsap';

export function renderStoriesHero(containerEl, onNavigate) {
  containerEl.innerHTML = `
    <section class="stories-hero-section">
      <div class="section-container">
        <div class="stories-hero-grid">
          <!-- Left Column: Heading, Subheading, CTAs & Metadata -->
          <div class="stories-hero-content">
            <div class="category-badge">EDITORIAL COMPENDIUM — VOL. 12</div>
            
            <h1 class="stories-hero-title">
              CURATED STORIES <br/>
              FOR THE <span class="highlight">MODERN MIND</span>
            </h1>

            <p class="stories-hero-subtitle">
              Investigative writing, cultural essays, architectural critiques, and technological inquiries from global correspondents across eight master disciplines.
            </p>

            <div class="stories-hero-actions">
              <button id="stories-explore-btn" class="btn-primary" data-cursor="read">
                <span>EXPLORE JOURNAL</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              
              <button id="stories-cat-btn" class="btn-secondary" data-cursor="view">
                <span>CATEGORIES</span>
              </button>
            </div>

            <!-- Metadata Metrics Grid -->
            <div class="stories-hero-metrics">
              <div class="metric-box">
                <span class="metric-num">48+</span>
                <span class="metric-label">PUBLISHED ESSAYS</span>
              </div>
              <div class="metric-box">
                <span class="metric-num">08</span>
                <span class="metric-label">DISCIPLINES</span>
              </div>
              <div class="metric-box">
                <span class="metric-num">12</span>
                <span class="metric-label">GLOBAL BUREAUS</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Interactive 3D Product Mockup Showcase -->
          <div class="stories-mockup-stage" data-cursor="3d">
            <div id="stories-3d-mockup" class="stories-product-mockup">
              <!-- Digital Reader Mockup Frame -->
              <div class="mockup-frame-header">
                <div class="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <div class="mockup-url">vanta.magazine / journal / digital-reader</div>
                <div class="mockup-live-badge">● LIVE READ</div>
              </div>

              <!-- Main Mockup Screen Content -->
              <div class="mockup-screen-body">
                <img src="assets/vanta_featured_story.png" alt="Featured Digital Reader" class="mockup-hero-img" />
                <div class="mockup-screen-overlay">
                  <span class="category-badge">COVER ESSAY</span>
                  <h3 class="mockup-article-title">WHY EVERYTHING IS BECOMING DESIGN</h3>
                  <div class="mockup-author-bar">
                    <span>BY ELENA VANCE</span>
                    <span>8 MIN READ</span>
                  </div>
                </div>
              </div>

              <!-- Secondary Floating Reader Layer behind Mockup -->
              <div class="mockup-layer-back">
                <img src="assets/vanta_cover_024.png" alt="Issue 024" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach button events
  const exploreBtn = containerEl.querySelector('#stories-explore-btn');
  const catBtn = containerEl.querySelector('#stories-cat-btn');

  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      const gridSec = document.querySelector('.latest-stories-section');
      if (gridSec) gridSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (catBtn) {
    catBtn.addEventListener('click', () => onNavigate('category', { category: 'CULTURE' }));
  }

  // Interactive 3D Product Mockup Mouse Tilt Effect
  const mockupCard = containerEl.querySelector('#stories-3d-mockup');
  const stage = containerEl.querySelector('.stories-mockup-stage');

  if (mockupCard && stage) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * 14;
      const rotateY = ((x - centerX) / centerX) * 14;

      mockupCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(16px)`;
    });

    stage.addEventListener('mouseleave', () => {
      mockupCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    });
  }

  // GSAP Entrance Animations
  const content = containerEl.querySelector('.stories-hero-content');
  const mockup = containerEl.querySelector('.stories-mockup-stage');

  if (content && mockup) {
    gsap.fromTo(content.children, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
    );
    gsap.fromTo(mockup, 
      { opacity: 0, scale: 0.9, y: 40 }, 
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }
}
