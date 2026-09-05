import { ARTICLES } from '../data/articles.js';
import gsap from 'gsap';

export function renderCategoryView(containerEl, categoryName = 'CULTURE', onOpenArticle) {
  const categoriesList = ['CULTURE', 'DESIGN', 'TECH', 'FASHION', 'TRAVEL', 'LIFESTYLE'];
  const activeCat = categoryName.toUpperCase();
  const catArticles = ARTICLES.filter(a => a.category.toUpperCase() === activeCat);

  // Department curators mapping
  const curators = {
    CULTURE: "Sienna Croix (Paris)",
    DESIGN: "Elena Vance (Zurich)",
    TECH: "Dr. Julian Sterling (Cambridge)",
    FASHION: "Claire Fontaine (Milan)",
    TRAVEL: "Marco Rossi (Kyoto)",
    LIFESTYLE: "Valerie Dubois (Geneva)"
  };

  const currentCurator = curators[activeCat] || "Elena Vance";

  // Ambient looping video URL
  const videoUrl = "https://cdn.coverr.co/videos/coverr-dark-abstract-lines-5264/1080p.mp4";

  containerEl.innerHTML = `
    <!-- Video Background Hero Section with Ambient Particles -->
    <section class="category-video-hero">
      <video class="category-bg-video" autoplay loop muted playsinline poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80">
        <source src="${videoUrl}" type="video/mp4" />
      </video>

      <div class="category-hero-overlay"></div>

      <div class="section-container" style="position: relative; z-index: 4; width: 100%;">
        <div class="category-hero-content">
          <div class="category-badge glow-badge">VANTA DEPARTMENTS</div>

          <h1 class="category-hero-title">
            THE SPECTRUM OF <br/>
            <span class="highlight">${activeCat}</span> & DISCOVERY
          </h1>

          <p class="category-hero-subtitle">
            Curated investigations into ${activeCat.toLowerCase()}, spatial aesthetics, nomadic culture, and synthetic intelligence.
          </p>

          <!-- Category Selector Pills -->
          <div class="category-pills-bar">
            ${categoriesList.map(cat => `
              <button class="cat-hero-pill ${cat === activeCat ? 'active' : ''}" data-category="${cat}">
                <span class="pill-dot">●</span> ${cat}
              </button>
            `).join('')}
          </div>

          <!-- Hero Action CTAs -->
          <div class="category-hero-actions">
            <button id="category-scroll-btn" class="btn-primary" data-cursor="read">
              <span>EXPLORE ${activeCat} DISPATCHES</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Department Metrics Bar -->
    <section class="dept-stats-strip">
      <div class="section-container">
        <div class="dept-stats-grid">
          <div class="dept-stat-item">
            <span class="stat-meta">PUBLISHED ARTICLES</span>
            <span class="stat-value">${catArticles.length} ESSAYS</span>
          </div>
          <div class="dept-stat-item">
            <span class="stat-meta">DEPARTMENT HEAD</span>
            <span class="stat-value">${currentCurator.toUpperCase()}</span>
          </div>
          <div class="dept-stat-item">
            <span class="stat-meta">READING TIME</span>
            <span class="stat-value">AVG 7 MIN / ESSAY</span>
          </div>
          <div class="dept-stat-item">
            <span class="stat-meta">STATUS</span>
            <span class="stat-value" style="color: var(--accent-gold);">● LIVE EDITORIAL DISPATCH</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Article Grid -->
    <section id="category-stories-grid" class="section-container" style="padding-top: 60px; padding-bottom: 120px;">
      <div class="section-header-editorial" style="margin-bottom: 40px;">
        <div class="category-badge">${activeCat} ESSAYS</div>
        <h2 class="section-title">CURRENT DISPATCHES</h2>
      </div>

      <div class="editorial-grid">
        ${catArticles.length > 0 ? catArticles.map((article, idx) => `
          <div class="grid-card span-6 cat-animated-card" data-id="${article.id}" data-cursor="read">
            <div class="grid-card-media">
              <img src="${article.coverImage}" alt="${article.title}" loading="lazy" />
              <div class="card-shimmer-overlay"></div>
              <span class="category-badge" style="position: absolute; top: 16px; left: 16px; z-index: 2;">${article.category}</span>
              <span class="card-index-badge">ESSAY 0${idx + 1}</span>
            </div>

            <div class="grid-card-content">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="metadata-text">NO. ${article.number}</span>
                <span class="metadata-text">${article.readTime}</span>
              </div>

              <h3 class="grid-card-title">${article.title}</h3>

              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${article.excerpt}
              </p>

              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid var(--border-subtle); font-size: 0.78rem; color: var(--text-secondary);">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <img src="${article.author.avatar}" alt="${article.author.name}" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;" />
                  <span>BY ${article.author.name.toUpperCase()}</span>
                </div>
                <span style="color: var(--accent-gold); font-weight: 700; display: flex; align-items: center; gap: 4px;">
                  READ STORY <span>→</span>
                </span>
              </div>
            </div>
          </div>
        `).join('') : `
          <div style="grid-column: span 12; padding: 80px 0; text-align: center; color: var(--text-secondary); background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px;">
            <div class="category-badge" style="margin-bottom: 12px;">NO DISPATCHES</div>
            <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--text-primary);">UPCOMING ${activeCat} ESSAYS IN EDITORIAL REVIEW</h3>
          </div>
        `}
      </div>
    </section>
  `;

  // Pill switch event with GSAP stagger animation
  containerEl.querySelectorAll('.cat-hero-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const selected = pill.getAttribute('data-category');
      renderCategoryView(containerEl, selected, onOpenArticle);
    });
  });

  // Scroll CTA handler
  const scrollBtn = containerEl.querySelector('#category-scroll-btn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const grid = containerEl.querySelector('#category-stories-grid');
      if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 3D Parallax Mouse Tilt for Cards
  containerEl.querySelectorAll('.cat-animated-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 8;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });

    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      onOpenArticle(id);
    });
  });

  // GSAP Entrance Animations
  const heroContent = containerEl.querySelector('.category-hero-content');
  const gridCards = containerEl.querySelectorAll('.cat-animated-card');

  if (heroContent) {
    gsap.fromTo(heroContent.children,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }

  if (gridCards.length > 0) {
    gsap.fromTo(gridCards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );
  }
}
