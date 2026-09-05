import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function renderHorizontalScroll(containerEl, onOpenArticle) {
  const horizontalStories = [
    {
      id: "why-everything-is-becoming-design",
      title: "TOKYO — THE ARCHITECTURE OF SILENCE",
      category: "DESIGN",
      location: "JAPAN",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
      number: "01",
      excerpt: "Exploring the biophilic sanctuaries and brutalist tea houses redefining urban tranquility in Tokyo."
    },
    {
      id: "fashion-without-boundaries",
      title: "PARIS — OBSIDIAN & GOLD SILHOUETTES",
      category: "FASHION",
      location: "FRANCE",
      image: "/assets/vanta_cover_023.png",
      number: "02",
      excerpt: "Avant-garde haute couture merging 3D printed cybernetic textiles with traditional embroidery."
    },
    {
      id: "the-future-is-already-here",
      title: "ZURICH — SYNTHETIC INTELLIGENCE LABS",
      category: "TECH",
      location: "SWITZERLAND",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
      number: "03",
      excerpt: "Inside the neural network research studios building spatial interfaces for tomorrow's human mind."
    },
    {
      id: "inside-the-new-creative-class",
      title: "BERLIN — THE NOMADIC SANCTUARIES",
      category: "CULTURE",
      location: "GERMANY",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      number: "04",
      excerpt: "How a global collective of spatial designers transformed industrial ruins into living art spaces."
    },
    {
      id: "the-cities-we-will-live-in",
      title: "SINGAPORE — VERTICAL BOTANICAL TOWERS",
      category: "TRAVEL",
      location: "SINGAPORE",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
      number: "05",
      excerpt: "Architectural investigations into vertical rainforests and zero-emission residential monoliths."
    }
  ];

  containerEl.innerHTML = `
    <section class="horizontal-scroll-section">
      <div class="section-container" style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px;">
          <div>
            <div class="category-badge glow-badge">GLOBAL PERSPECTIVE</div>
            <h2 class="section-title">THE WORLD THROUGH VANTA</h2>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <span class="metadata-text" style="color: var(--accent-gold);">SWIPE OR SCROLL TO EXPLORE</span>
            <div style="display: flex; gap: 8px;">
              <button id="track-prev-btn" class="header-btn" title="Scroll Left">←</button>
              <button id="track-next-btn" class="header-btn" title="Scroll Right">→</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Horizontal Scroll Track Wrapper -->
      <div class="horizontal-track-wrapper">
        <div id="horizontal-track" class="horizontal-track">
          ${horizontalStories.map(story => `
            <div class="horizontal-card" data-id="${story.id}" data-cursor="view">
              <div class="horizontal-card-media">
                <img src="${story.image}" alt="${story.title}" loading="lazy" />
                <span class="category-badge" style="position: absolute; top: 16px; left: 16px; z-index: 2;">${story.category}</span>
                <span class="horizontal-num-badge">SCENE ${story.number}</span>
              </div>

              <div class="horizontal-card-body">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span class="metadata-text" style="color: var(--accent-gold); font-weight: 700;">${story.location}</span>
                  <span class="metadata-text">ESSAY ${story.number} / 05</span>
                </div>

                <h3 style="font-family: var(--font-heading); font-size: clamp(1.2rem, 2.2vw, 1.6rem); color: var(--text-primary); line-height: 1.25; margin-bottom: 8px;">
                  ${story.title}
                </h3>

                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${story.excerpt}
                </p>

                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--border-subtle); font-size: 0.75rem;">
                  <span class="metadata-text">VANTA GLOBAL DISPATCH</span>
                  <span style="color: var(--accent-gold); font-weight: 700; letter-spacing: 0.1em; display: flex; align-items: center; gap: 4px;">
                    EXPLORE DISPATCH <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Thin Gold Scroll Progress Bar -->
      <div class="horizontal-progress-bar">
        <div id="horizontal-progress-fill" class="horizontal-progress-fill"></div>
      </div>
    </section>
  `;

  // Attach Arrow Scroll Events
  const track = containerEl.querySelector('#horizontal-track');
  const prevBtn = containerEl.querySelector('#track-prev-btn');
  const nextBtn = containerEl.querySelector('#track-next-btn');

  if (track && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -450, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 450, behavior: 'smooth' });
    });
  }

  // Attach Card Click Handlers
  containerEl.querySelectorAll('.horizontal-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      onOpenArticle(id);
    });
  });

  // PRIORITY 5: GSAP ScrollTrigger Sticky Horizontal Scroll Animation
  const sec = containerEl.querySelector('.horizontal-scroll-section');
  const trackEl = containerEl.querySelector('#horizontal-track');
  const progressFill = containerEl.querySelector('#horizontal-progress-fill');

  if (sec && trackEl && window.innerWidth > 768) {
    const totalScrollAmount = () => trackEl.scrollWidth - window.innerWidth + 120;

    gsap.to(trackEl, {
      x: () => -totalScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: sec,
        pin: true,
        scrub: 1,
        end: () => '+=' + (totalScrollAmount() + 300),
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressFill) {
            progressFill.style.width = `${Math.min(self.progress * 100, 100)}%`;
          }
        }
      }
    });
  }
}
