import { ARTICLES } from '../data/articles.js';

export function renderArticleView(containerEl, articleId, onNavigate, onBookmarkToggle, isBookmarkedFn, showToast) {
  const article = ARTICLES.find(a => a.id === articleId) || ARTICLES[0];
  const isSaved = isBookmarkedFn(article.id);

  containerEl.innerHTML = `
    <div class="article-view-container">
      <!-- Back Navigation Header -->
      <div style="margin-bottom: 32px;">
        <a id="back-to-home-link" class="back-link">
          ← BACK TO STORIES
        </a>
      </div>

      <!-- Article Header -->
      <div class="article-header">
        <div style="display: flex; align-items: center; gap: 16px;">
          <span class="category-badge">${article.category}</span>
          <span class="metadata-text">${article.issue}</span>
          <span class="metadata-text">• ${article.readTime}</span>
        </div>

        <h1 class="article-main-title">${article.title}</h1>
        <p style="font-size: 1.25rem; color: var(--text-secondary); line-height: 1.6;">${article.subtitle}</p>

        <!-- Meta & Author Row -->
        <div class="article-meta-row">
          <div class="author-inline-card" style="border: none; padding: 0;">
            <img src="${article.author.avatar}" alt="${article.author.name}" class="author-avatar" />
            <div class="author-details">
              <span class="author-name">${article.author.name}</span>
              <span class="author-meta">${article.author.role}</span>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 14px;">
            <span class="metadata-text">${article.date}</span>
            <button id="article-save-btn" class="header-btn ${isSaved ? 'text-gold border-gold' : ''}" title="Save Article">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Full-Width Hero Media -->
      <div class="article-hero-media">
        <img src="${article.coverImage}" alt="${article.title}" />
      </div>

      <!-- Article Body Content -->
      <article class="article-body-text">
        <p class="excerpt-lead" style="font-size: 1.3rem; font-family: var(--font-editorial); line-height: 1.7; color: var(--text-primary);">
          ${article.excerpt}
        </p>

        ${article.content ? article.content.map(block => {
          if (block.type === 'heading') {
            return `<h2 style="font-family: var(--font-heading); font-size: 2.2rem; color: var(--text-primary); margin-top: 24px;">${block.text}</h2>`;
          } else if (block.type === 'quote') {
            return `
              <div class="article-quote-block">
                "${block.quote}"
                <div style="font-size: 0.85rem; font-family: var(--font-sans); font-style: normal; color: var(--accent-gold); margin-top: 12px; text-transform: uppercase; letter-spacing: 0.15em;">— ${block.author}</div>
              </div>
            `;
          } else {
            return `<p>${block.text}</p>`;
          }
        }).join('') : `<p>Full digital publication available in ISSUE 024 print & iPad edition.</p>`}

        <!-- Secondary Image Gallery Inset -->
        ${article.secondaryImage ? `
          <div style="margin: 40px 0; border-radius: 4px; overflow: hidden; border: 1px solid var(--border-color);">
            <img src="${article.secondaryImage}" alt="Editorial Detail" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;" />
            <div style="padding: 12px 16px; background: var(--bg-card); font-size: 0.78rem; color: var(--text-secondary); display: flex; justify-content: space-between;">
              <span>PHOTOGRAPHY BY VANTA STUDIO</span>
              <span>FIGURE 1.2 — SPATIAL METAPHYSICS</span>
            </div>
          </div>
        ` : ''}
      </article>

      <!-- Share & Action Bar -->
      <div class="article-share-bar">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="metadata-text">SHARE STORY:</span>
          <button id="copy-link-btn" class="header-btn" title="Copy Link" style="width: 38px; height: 38px;">🔗</button>
          <button id="share-twitter-btn" class="header-btn" title="Share on X" style="width: 38px; height: 38px;">𝕏</button>
        </div>

        <div>
          <button id="bottom-back-btn" class="btn-secondary" style="padding: 10px 24px;">
            <span>RETURN TO STORIES</span>
          </button>
        </div>
      </div>

      <!-- Related Stories Carousel Grid -->
      <div style="margin-top: 80px; padding-top: 40px; border-top: 1px solid var(--border-color);">
        <div class="category-badge" style="margin-bottom: 12px;">CONTINUE READING</div>
        <h3 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 32px;">RELATED EDITORIALS</h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
          ${ARTICLES.filter(a => a.id !== article.id).slice(0, 3).map(rel => `
            <div class="grid-card" data-id="${rel.id}" data-cursor="read">
              <div class="grid-card-media">
                <img src="${rel.coverImage}" alt="${rel.title}" />
              </div>
              <div class="grid-card-content" style="padding: 20px;">
                <span class="category-badge">${rel.category}</span>
                <h4 style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--text-primary);">${rel.title}</h4>
                <span class="metadata-text" style="font-size: 0.7rem;">${rel.readTime}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Attach Reading Progress Bar Scroll Handler
  const progressBar = document.getElementById('reading-progress-bar');
  function updateProgress() {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    if (progressBar) progressBar.style.width = `${Math.min(progress, 100)}%`;
  }
  window.addEventListener('scroll', updateProgress);

  // Back button events
  const backLink = containerEl.querySelector('#back-to-home-link');
  const bottomBackBtn = containerEl.querySelector('#bottom-back-btn');
  if (backLink) backLink.addEventListener('click', () => onNavigate('stories'));
  if (bottomBackBtn) bottomBackBtn.addEventListener('click', () => onNavigate('stories'));

  // Save Bookmark event
  const saveBtn = containerEl.querySelector('#article-save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      onBookmarkToggle(article.id);
      const nowSaved = isBookmarkedFn(article.id);
      saveBtn.classList.toggle('text-gold', nowSaved);
      saveBtn.classList.toggle('border-gold', nowSaved);
      showToast(nowSaved ? 'Story saved to bookmarks' : 'Story removed from saved');
    });
  }

  // Copy Link event
  const copyBtn = containerEl.querySelector('#copy-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article URL copied to clipboard');
    });
  }

  // Related cards click handlers
  containerEl.querySelectorAll('.grid-card[data-id]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      onNavigate('article', { articleId: id });
    });
  });
}
