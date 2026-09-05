import { ARTICLES } from '../data/articles.js';

export function renderStoryCards3D(containerEl, onOpenArticle, onBookmarkToggle, isBookmarkedFn) {
  // Select top 3 non-featured articles
  const topArticles = ARTICLES.filter(a => !a.featured).slice(0, 3);

  containerEl.innerHTML = `
    <section class="story-cards-section">
      <div class="section-container">
        <div class="section-header-editorial">
          <div class="category-badge">3D EDITORIAL PERSPECTIVES</div>
          <h2 class="section-title">CURATED SELECTIONS</h2>
          <p class="section-subtitle">Tactile physical magazine pages translated into interactive 3D digital artifacts.</p>
        </div>

        <div class="cards-grid-3d">
          ${topArticles.map(article => `
            <div class="card-3d-item" data-id="${article.id}" data-cursor="3d">
              <div class="card-3d-media">
                <img src="${article.coverImage}" alt="${article.title}" loading="lazy" />
                <span class="category-badge" style="position: absolute; top: 16px; left: 16px; z-index: 2;">${article.category}</span>
              </div>

              <div class="card-3d-body">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="metadata-text">NO. ${article.number}</span>
                  <span class="metadata-text">${article.issue}</span>
                </div>

                <h3 class="card-3d-title">${article.title}</h3>

                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${article.excerpt}
                </p>

                <div class="card-3d-footer">
                  <span>${article.author.name}</span>
                  <span>${article.readTime}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  // Attach 3D Mouse Tilt Effects & Click Handlers
  const cardElements = containerEl.querySelectorAll('.card-3d-item');

  cardElements.forEach(card => {
    const articleId = card.getAttribute('data-id');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * 12; // tilt max 12 deg
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    });

    card.addEventListener('click', () => onOpenArticle(articleId));
  });
}
