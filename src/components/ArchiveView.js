import { ISSUES } from '../data/issues.js';
import gsap from 'gsap';

export function renderArchiveView(containerEl, onNavigate, showToast) {
  let activeFilter = 'ALL';

  function filterIssues(filter) {
    if (filter === '2026') return ISSUES.filter(i => i.date.includes('2026') || i.number === '024');
    if (filter === '2025') return ISSUES.filter(i => i.date.includes('2025') || i.number === '023');
    if (filter === '2024') return ISSUES.filter(i => i.date.includes('2024') || i.number === '022');
    return ISSUES;
  }

  function renderGrid(filteredList) {
    const gridEl = containerEl.querySelector('#archive-grid-mount');
    if (!gridEl) return;

    gridEl.innerHTML = filteredList.map(issue => `
      <div class="card-3d-item archive-parallax-card" data-id="${issue.id}" data-cursor="3d">
        <div class="card-3d-media" style="aspect-ratio: 3/4; position: relative; overflow: hidden; border-radius: 4px;">
          <img src="${issue.coverImage}" alt="${issue.title}" loading="lazy" />
          <div class="card-shimmer-overlay"></div>
          <span class="category-badge" style="position: absolute; top: 16px; left: 16px; z-index: 2;">${issue.number}</span>
          <span class="card-spine-indicator">HARDCOVER</span>
        </div>

        <div class="card-3d-body">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="metadata-text" style="color: var(--accent-gold); font-weight: 700;">${issue.date}</span>
            <span class="metadata-text">${issue.pages} PAGES</span>
          </div>

          <h3 class="card-3d-title">${issue.title}</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">${issue.subtitle}</p>

          <div class="card-3d-footer">
            <span style="font-size: 0.72rem; color: var(--text-muted);">CURATED BY ${issue.curator.toUpperCase()}</span>
            <button class="btn-primary read-issue-btn" style="padding: 10px 20px; font-size: 0.7rem;">VIEW ISSUE</button>
          </div>
        </div>
      </div>
    `).join('');

    // Reattach interactive 3D mouse tilt & click
    const cards = gridEl.querySelectorAll('.archive-parallax-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = -((y - rect.height/2) / (rect.height/2)) * 12;
        const rotateY = ((x - rect.width/2) / (rect.width/2)) * 12;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      });

      card.addEventListener('click', () => {
        const issueId = card.getAttribute('data-id');
        if (showToast) showToast(`Opening digital interactive edition for ${issueId.toUpperCase()}`);
        onNavigate('issue');
      });
    });

    // GSAP Card Stagger Animation
    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
    );
  }

  containerEl.innerHTML = `
    <!-- Animated Gradient Mesh Hero Section -->
    <section class="archive-mesh-hero">
      <div class="archive-mesh-bg">
        <div class="mesh-orb orb-1"></div>
        <div class="mesh-orb orb-2"></div>
        <div class="mesh-orb orb-3"></div>
      </div>

      <div class="archive-mesh-overlay"></div>

      <div class="section-container" style="position: relative; z-index: 4; width: 100%;">
        <div class="archive-hero-content">
          <div class="category-badge glow-badge">HISTORICAL COMPENDIUM</div>

          <h1 class="archive-hero-title">
            CHRONICLES OF HUMAN <br/>
            <span class="highlight">INQUIRY</span>
          </h1>

          <p class="archive-hero-subtitle">
            Explore complete past volumes, investigative monographs, architectural critiques, and digital interactive editions from 2024 to present.
          </p>

          <!-- Filter Pills Bar -->
          <div class="archive-pills-bar">
            <button class="archive-hero-pill active" data-filter="ALL"><span class="pill-dot">●</span> ALL VOLUMES</button>
            <button class="archive-hero-pill" data-filter="2026"><span class="pill-dot">●</span> 2026 DISPATCHES</button>
            <button class="archive-hero-pill" data-filter="2025"><span class="pill-dot">●</span> 2025 COMPENDIUM</button>
            <button class="archive-hero-pill" data-filter="2024"><span class="pill-dot">●</span> 2024 ORIGINS</button>
          </div>

          <!-- Hero Action CTAs -->
          <div class="archive-hero-actions">
            <button id="archive-explore-btn" class="btn-primary" data-cursor="read">
              <span>EXPLORE CATALOGUE</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </button>
            
            <button id="archive-boxset-btn" class="btn-secondary" data-cursor="view">
              <span>COLLECTOR BOXSET ($95)</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Archive Grid Section -->
    <section id="archive-grid-section" class="section-container" style="padding-top: 60px; padding-bottom: 80px;">
      <div class="section-header-editorial" style="margin-bottom: 40px;">
        <div class="category-badge">ALL PUBLISHED ISSUES</div>
        <h2 class="section-title">THE COMPLETE CATALOGUE</h2>
      </div>

      <div id="archive-grid-mount" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px;"></div>
    </section>

    <!-- Collector Boxset Showcase Banner -->
    <section class="section-container" style="padding-bottom: 120px;">
      <div class="boxset-banner-card">
        <div class="boxset-text">
          <div class="category-badge glow-badge">LIMITED EDITION COLLECTOR BOXSET</div>
          <h2 style="font-family: var(--font-heading); font-size: clamp(2.2rem, 4vw, 3.5rem); color: var(--text-primary); margin: 16px 0;">
            THE COMPLETE VOL. 01–12 OBSIDIAN BOXSET
          </h2>
          <p style="color: var(--text-secondary); line-height: 1.7; max-width: 620px; margin-bottom: 24px;">
            Own all 24 printed issues of VANTA Magazine in a custom handcrafted obsidian linen slipcase. Includes rare manuscript inserts, high-res digital WebGL access codes, and a signed letter by Editor-in-Chief Elena Vance.
          </p>
          <button id="boxset-order-cta" class="btn-primary" data-cursor="read">
            <span>ORDER BOXSET ($95 WORLDWIDE SHIP)</span>
          </button>
        </div>

        <div class="boxset-visual-preview">
          <img src="assets/vanta_cover_023.png" alt="Boxset Preview" class="boxset-img-1" />
          <img src="assets/vanta_cover_024.png" alt="Boxset Preview" class="boxset-img-2" />
        </div>
      </div>
    </section>
  `;

  // Render initial grid
  renderGrid(ISSUES);

  // Attach pill click events
  containerEl.querySelectorAll('.archive-hero-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      containerEl.querySelectorAll('.archive-hero-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      activeFilter = filter;
      renderGrid(filterIssues(filter));
    });
  });

  // Attach button events
  const exploreBtn = containerEl.querySelector('#archive-explore-btn');
  const boxsetBtn = containerEl.querySelector('#archive-boxset-btn');
  const boxsetOrderCta = containerEl.querySelector('#boxset-order-cta');

  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      const gridSec = containerEl.querySelector('#archive-grid-section');
      if (gridSec) gridSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const triggerBoxsetOrder = () => {
    if (showToast) {
      showToast("VANTA Complete Historical Collector Boxset added to cart ($95). Free worldwide courier dispatch.");
    } else {
      alert("VANTA Complete Collector Boxset added to cart ($95).");
    }
  };

  if (boxsetBtn) boxsetBtn.addEventListener('click', triggerBoxsetOrder);
  if (boxsetOrderCta) boxsetOrderCta.addEventListener('click', triggerBoxsetOrder);

  // GSAP animation
  const heroContent = containerEl.querySelector('.archive-hero-content');
  if (heroContent) {
    gsap.fromTo(heroContent.children,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }
}
