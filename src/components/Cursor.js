import gsap from 'gsap';

export function initCustomCursor() {
  // Mobile / Tablet check
  if (window.innerWidth <= 992 || 'ontouchstart' in window) {
    return;
  }

  // Create cursor DOM elements if not present
  let cursorDot = document.querySelector('.custom-cursor-dot');
  let cursorRing = document.querySelector('.custom-cursor-ring');

  if (!cursorDot) {
    cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);
  }

  if (!cursorRing) {
    cursorRing = document.createElement('div');
    cursorRing.className = 'custom-cursor-ring';
    cursorRing.innerHTML = '<span class="cursor-label"></span>';
    document.body.appendChild(cursorRing);
  }

  const cursorLabel = cursorRing.querySelector('.cursor-label');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  // Track Mouse Movement
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Quick dot position update
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  // RAF loop for smooth lerping ring follower
  function updateRing() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;

    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(updateRing);
  }
  updateRing();

  // Attach hover delegation for View Expansion & Magnetic Buttons
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    const viewCard = target.closest('.grid-card, .featured-story-card, .card-3d-item, .horizontal-card, [data-cursor="read"], [data-cursor="view"], [data-cursor="3d"]');
    const ctaBtn = target.closest('.btn-primary, .btn-secondary, .header-btn, .nav-item, .hero-action-btn');

    if (viewCard) {
      cursorRing.classList.add('expand-view');
      const cursorMode = viewCard.getAttribute('data-cursor');
      if (cursorMode === '3d') {
        cursorLabel.textContent = 'DRAG 3D';
      } else if (cursorMode === 'read') {
        cursorLabel.textContent = 'READ';
      } else {
        cursorLabel.textContent = 'VIEW';
      }
    }

    if (ctaBtn) {
      cursorRing.classList.add('hover-cta');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target;
    const viewCard = target.closest('.grid-card, .featured-story-card, .card-3d-item, .horizontal-card, [data-cursor="read"], [data-cursor="view"], [data-cursor="3d"]');
    const ctaBtn = target.closest('.btn-primary, .btn-secondary, .header-btn, .nav-item, .hero-action-btn');

    if (viewCard) {
      cursorRing.classList.remove('expand-view');
      cursorLabel.textContent = '';
    }

    if (ctaBtn) {
      cursorRing.classList.remove('hover-cta');
      gsap.to(ctaBtn, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' });
    }
  });

  // Magnetic Button Hover Physics
  document.addEventListener('mousemove', (e) => {
    const target = e.target;
    const ctaBtn = target.closest('.btn-primary, .btn-secondary, .header-btn');
    if (ctaBtn) {
      const rect = ctaBtn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - btnCenterX) * 0.3;
      const deltaY = (e.clientY - btnCenterY) * 0.3;

      gsap.to(ctaBtn, { x: deltaX, y: deltaY, duration: 0.2, ease: 'power2.out' });
    }
  });
}
