import gsap from 'gsap';
import { createThreeHeroMagazine } from './ThreeHeroMagazine.js';

export function renderHero3D(containerEl, onNavigate) {
  containerEl.innerHTML = `
    <section class="hero-section">
      <div class="section-container">
        <div class="hero-grid">
          <!-- Hero Text Content -->
          <div class="hero-content">
            <div class="category-badge hero-badge">ISSUE 024 — VOL. 12</div>

            <h1 class="hero-title">
              <div class="line-mask"><span class="hero-line">THE NEW</span></div>
              <div class="line-mask"><span class="hero-line">CULTURE OF</span></div>
              <div class="line-mask"><span class="hero-line highlight">NOW</span></div>
            </h1>

            <p class="hero-subtitle">
              Stories, people and ideas shaping the world around us. A luxury digital publication bridging physical space, artificial intelligence, and avant-garde editorial craft.
            </p>
            
            <div class="hero-actions">
              <button id="hero-explore-btn" class="btn-primary" data-cursor="read">
                <span>EXPLORE STORIES</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button id="hero-issue-btn" class="btn-secondary" data-cursor="view">
                <span>LATEST ISSUE</span>
              </button>
            </div>

            <div class="hero-metadata-bar">
              <div class="metadata-item">
                <span class="label">PUBLICATION</span>
                <span class="val">VANTA MAG</span>
              </div>
              <div class="metadata-item">
                <span class="label">CURATOR</span>
                <span class="val">ELENA VANCE</span>
              </div>
              <div class="metadata-item">
                <span class="label">READERSHIP</span>
                <span class="val">GLOBAL EDITORIAL</span>
              </div>
            </div>
          </div>

          <!-- Priority 1: Interactive Three.js 3D Magazine Cover Stage -->
          <div class="hero-3d-stage" data-cursor="3d">
            <div id="three-magazine-container" class="three-magazine-mount"></div>
            
            <!-- Floating Editorial Badges -->
            <div class="floating-badge badge-pos-1">
              <span>ISSUE 024 • 184 PAGES</span>
            </div>
            <div class="floating-badge badge-pos-2">
              <span>THE HUMAN FUTURE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach button handlers
  const exploreBtn = containerEl.querySelector('#hero-explore-btn');
  const issueBtn = containerEl.querySelector('#hero-issue-btn');

  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      const featuredSec = document.querySelector('.featured-section');
      if (featuredSec) featuredSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (issueBtn) {
    issueBtn.addEventListener('click', () => onNavigate('issue'));
  }

  // Mount Priority 1: Three.js 3D Magazine
  const threeMount = containerEl.querySelector('#three-magazine-container');
  if (threeMount) {
    createThreeHeroMagazine(threeMount, '/assets/vanta_cover_024.png');
  }

  // Run Priority 2: GSAP Masked Line Reveal Animation
  runCinematicHeroAnimation(containerEl);
}

function runCinematicHeroAnimation(containerEl) {
  const badge = containerEl.querySelector('.hero-badge');
  const heroLines = containerEl.querySelectorAll('.hero-line');
  const subtitle = containerEl.querySelector('.hero-subtitle');
  const actions = containerEl.querySelector('.hero-actions');
  const metadata = containerEl.querySelector('.hero-metadata-bar');
  const stage = containerEl.querySelector('.hero-3d-stage');

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.fromTo(badge, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
    .fromTo(heroLines[0], { y: '110%' }, { y: '0%', duration: 0.9 }, "-=0.3")
    .fromTo(heroLines[1], { y: '110%' }, { y: '0%', duration: 0.9 }, "-=0.7")
    .fromTo(heroLines[2], { y: '110%' }, { y: '0%', duration: 0.9 }, "-=0.7")
    .fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
    .fromTo(actions, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
    .fromTo(stage, { opacity: 0, scale: 0.92, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.0 }, "-=0.6")
    .fromTo(metadata, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.8");
}
