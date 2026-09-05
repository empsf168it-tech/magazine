import { ARTICLES } from '../data/articles.js';

export function renderSearchOverlay(onNavigate) {
  const overlayEl = document.getElementById('search-overlay');
  if (!overlayEl) return;

  const popularTags = ['AI', 'Fashion', 'Design', 'Culture', 'Travel', 'Architecture', 'Minimalism', 'Luxury'];

  overlayEl.innerHTML = `
    <button id="search-close-btn" class="search-close-btn" title="Close Search (ESC)">✕</button>

    <div class="search-container">
      <div class="category-badge" style="margin-bottom: 12px;">VANTA SEARCH ENGINE</div>
      <h2 style="font-family: var(--font-heading); font-size: clamp(1.8rem, 4vw, 2.8rem); color: var(--text-primary); margin-bottom: 24px;">
        WHAT ARE YOU LOOKING FOR?
      </h2>

      <div class="search-input-wrapper">
        <input id="vanta-search-input" type="text" class="search-input" placeholder="Search stories, topics, authors..." autofocus />
      </div>

      <div class="search-tags">
        <span class="metadata-text" style="margin-right: 8px;">POPULAR:</span>
        ${popularTags.map(tag => `
          <button class="search-tag-pill" data-tag="${tag}">${tag}</button>
        `).join('')}
      </div>

      <!-- Live Search Results Grid -->
      <div id="search-results-output" class="search-results-grid"></div>
    </div>
  `;

  const closeBtn = overlayEl.querySelector('#search-close-btn');
  const inputEl = overlayEl.querySelector('#vanta-search-input');
  const resultsOutput = overlayEl.querySelector('#search-results-output');

  function closeSearch() {
    overlayEl.classList.remove('open');
    inputEl.value = '';
    resultsOutput.innerHTML = '';
  }

  closeBtn.addEventListener('click', closeSearch);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlayEl.classList.contains('open')) {
      closeSearch();
    }
  });

  // Tag pills click
  overlayEl.querySelectorAll('.search-tag-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const tag = pill.getAttribute('data-tag');
      inputEl.value = tag;
      performSearch(tag);
    });
  });

  // Input listener
  inputEl.addEventListener('input', (e) => {
    performSearch(e.target.value.trim());
  });

  function performSearch(query) {
    if (!query) {
      resultsOutput.innerHTML = '';
      return;
    }

    const q = query.toLowerCase();
    const matches = ARTICLES.filter(a => 
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.author.name.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );

    if (matches.length === 0) {
      resultsOutput.innerHTML = `<div style="grid-column: span 2; color: var(--text-muted); font-size: 0.9rem;">No editorial stories matching "${query}".</div>`;
      return;
    }

    resultsOutput.innerHTML = matches.map(art => `
      <div class="search-result-card" data-id="${art.id}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="category-badge">${art.category}</span>
          <span class="metadata-text">${art.readTime}</span>
        </div>
        <h4 style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--text-primary); margin-bottom: 6px;">${art.title}</h4>
        <div style="font-size: 0.78rem; color: var(--text-secondary);">BY ${art.author.name.toUpperCase()}</div>
      </div>
    `).join('');

    resultsOutput.querySelectorAll('.search-result-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        closeSearch();
        onNavigate('article', { articleId: id });
      });
    });
  }
}
