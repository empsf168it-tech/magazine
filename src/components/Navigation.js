export function renderNavigation(currentView, savedArticlesCount = 0, onNavigate, onOpenSearch) {
  const headerEl = document.getElementById('main-header');
  const drawerEl = document.getElementById('mobile-nav-drawer');
  
  if (!headerEl || !drawerEl) return;

  // Header HTML
  headerEl.innerHTML = `
    <div class="header-container">
      <div class="nav-brand" data-view="home">
        <div class="brand-logo">VANTA<span>.</span></div>
        <div class="brand-tag">VOL. 12 — ISSUE 024</div>
      </div>

      <nav class="desktop-nav">
        <a class="nav-link ${currentView === 'home' ? 'active' : ''}" data-view="home">Home</a>
        <a class="nav-link ${currentView === 'stories' ? 'active' : ''}" data-view="stories">Stories</a>
        <a class="nav-link ${currentView === 'category' ? 'active' : ''}" data-view="category" data-cat="CULTURE">Categories</a>
        <a class="nav-link ${currentView === 'issue' ? 'active' : ''}" data-view="issue">Latest Issue</a>
        <a class="nav-link ${currentView === 'archive' ? 'active' : ''}" data-view="archive">Archive</a>
        <a class="nav-link ${currentView === 'about' ? 'active' : ''}" data-view="about">About</a>
      </nav>

      <div class="header-actions">
        <button id="search-trigger-btn" class="header-btn" title="Search Stories ( / )" data-cursor="view">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>

        <button id="bookmarks-trigger-btn" class="header-btn" title="Saved Stories" data-cursor="view">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          ${savedArticlesCount > 0 ? `<span class="badge-count">${savedArticlesCount}</span>` : ''}
        </button>

        <button id="menu-toggle-btn" class="header-btn menu-toggle-btn" data-cursor="view">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          <span class="menu-txt">Menu</span>
        </button>
      </div>
    </div>
  `;

  // Mobile Drawer HTML
  drawerEl.innerHTML = `
    <div class="drawer-header">
      <div class="brand-logo">VANTA<span>.</span></div>
      <button id="close-drawer-btn" class="header-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <div class="drawer-nav-list">
      <a class="drawer-nav-item" data-view="home"><span class="num">01</span> HOME</a>
      <a class="drawer-nav-item" data-view="stories"><span class="num">02</span> STORIES</a>
      <a class="drawer-nav-item" data-view="category" data-cat="CULTURE"><span class="num">03</span> CATEGORIES</a>
      <a class="drawer-nav-item" data-view="issue"><span class="num">04</span> LATEST ISSUE</a>
      <a class="drawer-nav-item" data-view="archive"><span class="num">05</span> ARCHIVE</a>
      <a class="drawer-nav-item" data-view="about"><span class="num">06</span> ABOUT</a>
    </div>

    <div class="drawer-footer">
      <div>
        <div class="metadata-text">VANTA EDITORIAL PUBLICATION</div>
        <div style="color: var(--text-muted); font-size: 0.8rem;">Culture. Ideas. Stories That Move.</div>
      </div>
      <div style="display: flex; gap: 16px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">
        <a href="#instagram" style="color: var(--accent-gold); text-decoration: none;">Instagram</a>
        <a href="#twitter" style="color: var(--accent-gold); text-decoration: none;">X / Twitter</a>
        <a href="#youtube" style="color: var(--accent-gold); text-decoration: none;">YouTube</a>
      </div>
    </div>
  `;

  // Scroll listener for sticky header background change
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      headerEl.classList.add('scrolled');
    } else {
      headerEl.classList.remove('scrolled');
    }
  });

  // Attach Navigation Click Event Listeners
  headerEl.querySelectorAll('[data-view]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = el.getAttribute('data-view');
      const cat = el.getAttribute('data-cat');
      onNavigate(targetView, { category: cat });
    });
  });

  drawerEl.querySelectorAll('[data-view]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = el.getAttribute('data-view');
      const cat = el.getAttribute('data-cat');
      drawerEl.classList.remove('open');
      onNavigate(targetView, { category: cat });
    });
  });

  // Search trigger button
  const searchBtn = document.getElementById('search-trigger-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => onOpenSearch());
  }

  // Keyboard shortcut `/` for search
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      onOpenSearch();
    }
  });

  // Drawer Toggles
  const menuBtn = document.getElementById('menu-toggle-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  if (menuBtn) menuBtn.addEventListener('click', () => drawerEl.classList.add('open'));
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => drawerEl.classList.remove('open'));
}
