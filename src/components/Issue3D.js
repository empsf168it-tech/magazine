import { ISSUES } from '../data/issues.js';
import gsap from 'gsap';

export function renderIssue3D(containerEl, onNavigate) {
  const currentIssue = ISSUES[0]; // Issue 024

  containerEl.innerHTML = `
    <section class="issue-section" style="padding-top: 60px; padding-bottom: 120px;">
      <div class="section-container">
        <!-- Section Header -->
        <div class="section-header-editorial" style="margin-bottom: 48px;">
          <div class="category-badge">${currentIssue.number} TABLE OF CONTENTS</div>
          <h2 class="section-title">CHAPTER DISPATCHES & EDITORIAL CURATION</h2>
        </div>

        <div class="issue-grid">
          <!-- 3D Stacked Covers Column with Continuous Floating Motion -->
          <div class="issue-3d-stack-wrapper">
            <div class="issue-3d-stack" data-cursor="3d">
              <div class="issue-cover-card layer-3">
                <img src="${ISSUES[2].coverImage}" alt="Issue Layer" />
              </div>
              <div class="issue-cover-card layer-2">
                <img src="${ISSUES[1].coverImage}" alt="Issue Layer" />
              </div>
              <div id="issue-main-cover-btn" class="issue-cover-card layer-1">
                <img src="${currentIssue.coverImage}" alt="${currentIssue.title}" />
                <div class="cover-glare-effect"></div>
                <div class="cover-gold-seal">VOL. 12</div>
              </div>
            </div>

            <!-- Curator Statement Badge -->
            <div class="curator-statement-card">
              <div class="category-badge">CURATOR STATEMENT</div>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-top: 8px;">
                "Issue 024 examines the threshold where machine intelligence meets human spatial craft. An essential volume for curators of the modern mind."
              </p>
              <div style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 700; margin-top: 8px;">— JUNA SHAH, EXECUTIVE EDITOR</div>
            </div>
          </div>

          <!-- Interactive Chapter List Column -->
          <div style="display: flex; flex-direction: column; gap: 24px;">
            <div class="category-badge">${currentIssue.number} — PRINT & DIGITAL</div>
            
            <h2 style="font-family: var(--font-heading); font-size: clamp(2.4rem, 4.5vw, 3.8rem); line-height: 1.05; color: var(--text-primary);">
              ${currentIssue.title}
            </h2>

            <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.65;">
              ${currentIssue.editorialNote}
            </p>

            <!-- Interactive Table of Contents List -->
            <div class="issue-toc-list">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span class="metadata-text" style="color: var(--accent-gold);">CURATED CHAPTERS (INCLUDED IN EDITION):</span>
                <span class="metadata-text">184 PAGES TOTAL</span>
              </div>

              ${currentIssue.toc.map((item, idx) => `
                <div class="toc-item-card" data-cursor="read">
                  <div class="toc-item-header">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span class="toc-num">${item.num}.</span>
                      <div>
                        <h4 style="color: var(--text-primary); font-size: 1.1rem; font-weight: 600;">${item.title}</h4>
                        <span style="font-size: 0.75rem; color: var(--text-muted);">PG. ${item.page} • ESSAY DISPATCH</span>
                      </div>
                    </div>
                    <button class="audio-listen-pill">
                      <span>▶ LISTEN AUDIO</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="display: flex; align-items: center; gap: 16px; margin-top: 12px; flex-wrap: wrap;">
              <button id="read-issue-btn" class="btn-primary" data-cursor="read">
                <span>OPEN DIGITAL READER EDITION</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>

              <button id="view-archive-btn" class="btn-secondary" data-cursor="view">
                <span>VIEW PAST ARCHIVE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Continuous floating 3D animation for stacked cover back layers
  const stackCards = containerEl.querySelectorAll('.issue-cover-card');
  if (stackCards.length > 0) {
    gsap.to(stackCards[0], { y: -8, rotation: -4, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(stackCards[1], { y: -12, rotation: 3, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });
  }

  // Audio pill click handlers
  containerEl.querySelectorAll('.audio-listen-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      alert("VANTA Audio Dispatch: Playing essay audio commentary stream.");
    });
  });

  // Navigation handlers
  const readBtn = containerEl.querySelector('#read-issue-btn');
  const archiveBtn = containerEl.querySelector('#view-archive-btn');
  const mainCover = containerEl.querySelector('#issue-main-cover-btn');

  if (readBtn) readBtn.addEventListener('click', () => onNavigate('article', { articleId: 'vanta-01' }));
  if (archiveBtn) archiveBtn.addEventListener('click', () => onNavigate('archive'));
  if (mainCover) mainCover.addEventListener('click', () => onNavigate('article', { articleId: 'vanta-01' }));
}
