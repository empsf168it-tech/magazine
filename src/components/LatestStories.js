import { ARTICLES } from '../data/articles.js';
import gsap from 'gsap';

export function renderLatestStories(containerEl, onOpenArticle, initialCategory = 'ALL') {
  const categories = ['ALL', 'CULTURE', 'DESIGN', 'TECH', 'FASHION', 'TRAVEL', 'LIFESTYLE', 'ART'];
  let currentCat = initialCategory;

  function renderGrid(cat) {
    const filtered = cat === 'ALL' ? ARTICLES : ARTICLES.filter(a => a.category.toUpperCase() === cat.toUpperCase());

    const gridEl = containerEl.querySelector('#editorial-grid-container');
    if (!gridEl) return;

    if (filtered.length === 0) {
      gridEl.innerHTML = `<div style="grid-column: span 12; padding: 60px 0; text-align: center; color: var(--text-secondary);">No stories found in category ${cat}.</div>`;
      return;
    }

    gridEl.innerHTML = filtered.map((article, idx) => {
      let spanClass = 'span-4';
      if (idx % 5 === 0) spanClass = 'span-8';
      if (idx % 5 === 1) spanClass = 'span-4';
      if (idx % 5 === 2) spanClass = 'span-6';
      if (idx % 5 === 3) spanClass = 'span-6';
      if (idx % 5 === 4) spanClass = 'span-12';

      return `
        <div class="grid-card ${spanClass}" data-id="${article.id}" data-cursor="read">
          <div class="grid-card-media">
            <img src="${article.coverImage}" alt="${article.title}" loading="lazy" class="card-media-img" />
            <div class="card-shimmer-overlay"></div>
            <span class="category-badge" style="position: absolute; top: 16px; left: 16px; z-index: 2;">${article.category}</span>
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

            <div class="grid-card-footer" style="display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid var(--border-subtle); font-size: 0.78rem; color: var(--text-secondary);">
              <span>BY ${article.author.name.toUpperCase()}</span>
              <span class="read-arrow-link" style="color: var(--accent-gold); font-weight: 700; letter-spacing: 0.1em; display: flex; align-items: center; gap: 4px;">
                READ <span class="arrow">→</span>
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Animate cards entrance
    const cards = gridEl.querySelectorAll('.grid-card');
    gsap.fromTo(cards, 
      { opacity: 0, y: 25 }, 
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
    );

    // PRIORITY 6: Attach 3D Article Mouse Hover Micro-Interactions
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Subtle 3D values: rotateX ±2deg, rotateY ±3deg, translateZ 15px, scale 1.02
        const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 2;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1.0)`;
      });

      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        onOpenArticle(id);
      });
    });
  }

  containerEl.innerHTML = `
    <section class="latest-stories-section">
      <div class="section-container">
        <div class="section-header-editorial">
          <div class="category-badge glow-badge">THE JOURNAL</div>
          <h2 class="section-title">LATEST STORIES</h2>
          <p class="section-subtitle">Investigative writing, interviews, and visual essays from VANTA correspondents across eight disciplines.</p>
        </div>

        <!-- Category Filter Tabs -->
        <div class="filter-tabs-wrapper">
          ${categories.map(cat => `
            <button class="filter-tab ${cat === currentCat ? 'active' : ''}" data-cat="${cat}">
              ${cat}
            </button>
          `).join('')}
        </div>

        <!-- Editorial Grid -->
        <div id="editorial-grid-container" class="editorial-grid"></div>
      </div>
    </section>
  `;

  // Attach filter tab click handlers
  const tabBtns = containerEl.querySelectorAll('.filter-tab');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = cat;
      renderGrid(currentCat);
    });
  });

  // Initial grid render
  renderGrid(currentCat);
}
