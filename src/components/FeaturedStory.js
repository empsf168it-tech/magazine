import { ARTICLES } from '../data/articles.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function renderFeaturedStory(containerEl, onOpenArticle) {
  const featured = ARTICLES.find(a => a.featured) || ARTICLES[0];

  containerEl.innerHTML = `
    <section class="featured-section">
      <div class="section-container">
        <!-- Section Title Header -->
        <div class="section-header-editorial">
          <div class="category-badge">CURATED FEATURE</div>
          <h2 class="section-title">FEATURED THIS MONTH</h2>
        </div>

        <div class="featured-grid">
          <!-- Image Column with Parallax Scale -->
          <div id="featured-image-trigger" class="featured-image-wrapper" data-cursor="read">
            <img src="${featured.coverImage}" alt="${featured.title}" loading="lazy" class="featured-parallax-img" />
            <div class="featured-image-overlay"></div>
          </div>

          <!-- Editorial Content Column -->
          <div class="featured-content-col">
            <div class="editorial-number">${featured.number}</div>
            
            <div class="featured-meta-row" style="display: flex; align-items: center; gap: 16px;">
              <span class="category-badge">${featured.category}</span>
              <span class="metadata-text">${featured.readTime}</span>
              <span class="metadata-text">• ${featured.issue}</span>
            </div>

            <h3 id="featured-title-trigger" class="featured-headline" data-cursor="read">
              ${featured.title}
            </h3>

            <p class="featured-excerpt">
              ${featured.excerpt}
            </p>

            <div class="author-inline-card">
              <img src="${featured.author.avatar}" alt="${featured.author.name}" class="author-avatar" />
              <div class="author-details">
                <span class="author-name">${featured.author.name}</span>
                <span class="author-meta">${featured.author.role}</span>
              </div>
            </div>

            <div style="margin-top: 12px;">
              <button id="featured-read-btn" class="btn-primary" data-cursor="read">
                <span>READ STORY</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach click event listeners
  const imgTrigger = containerEl.querySelector('#featured-image-trigger');
  const titleTrigger = containerEl.querySelector('#featured-title-trigger');
  const btnTrigger = containerEl.querySelector('#featured-read-btn');
  const handler = () => onOpenArticle(featured.id);

  if (imgTrigger) imgTrigger.addEventListener('click', handler);
  if (titleTrigger) titleTrigger.addEventListener('click', handler);
  if (btnTrigger) btnTrigger.addEventListener('click', handler);

  // PRIORITY 4: GSAP ScrollTrigger Image Parallax & Staggered Typography
  const imgWrapper = containerEl.querySelector('.featured-image-wrapper');
  const img = containerEl.querySelector('.featured-parallax-img');
  const num = containerEl.querySelector('.editorial-number');
  const meta = containerEl.querySelector('.featured-meta-row');
  const headline = containerEl.querySelector('.featured-headline');
  const excerpt = containerEl.querySelector('.featured-excerpt');
  const authorCard = containerEl.querySelector('.author-inline-card');
  const btn = containerEl.querySelector('#featured-read-btn');

  if (imgWrapper && img) {
    gsap.fromTo(img,
      { scale: 1.15, yPercent: 6 },
      {
        scale: 1.0,
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: imgWrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerEl.querySelector('.featured-grid'),
      start: 'top 80%',
    }
  });

  if (num) tl.fromTo(num, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });
  if (meta) tl.fromTo(meta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, "-=0.6");
  if (headline) tl.fromTo(headline, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.5");
  if (excerpt) tl.fromTo(excerpt, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, "-=0.5");
  if (authorCard) tl.fromTo(authorCard, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, "-=0.5");
  if (btn) tl.fromTo(btn, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, "-=0.4");
}
