import gsap from 'gsap';

export function renderAboutView(containerEl) {
  const contributors = [
    {
      name: "Elena Vance",
      role: "Editor-in-Chief & Founder",
      bureau: "ZURICH HQ",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: "Former architectural director in Zurich, leading VANTA's culture and spatial philosophy.",
      fact: "Collects vintage Leica M3 cameras and 1970s Swiss typography posters."
    },
    {
      name: "Dr. Julian Sterling",
      role: "Technology & AI Editor",
      bureau: "CAMBRIDGE BUREAU",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "Neural network researcher investigating human-machine creative collaboration.",
      fact: "Builds analog modular synthesizers in his spare time."
    },
    {
      name: "Sienna Croix",
      role: "Culture Correspondent",
      bureau: "PARIS BUREAU",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      bio: "Documenting emerging nomadic art scenes across Tokyo, Paris, and Berlin.",
      fact: "Speaks four languages and curates underground Parisian vinyl sessions."
    },
    {
      name: "Kenji Takahashi",
      role: "Architecture Critic",
      bureau: "TOKYO BUREAU",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      bio: "Specialist in biophilic monoliths and Japanese timber joinery.",
      fact: "Apprenticed with master carpenters in Kyoto."
    }
  ];

  const milestones = [
    { year: "2024", title: "FOUNDING IN ZURICH", desc: "VANTA was born as an antidote to fast-food algorithmic media, merging obsidian print aesthetics with real-time 3D graphics." },
    { year: "2025", title: "GLOBAL EXPANSION", desc: "Opened editorial bureaus in Tokyo, Paris, and New York. Reached 50,000 Sunday Dispatch readers worldwide." },
    { year: "2026", title: "PUBLICATION OF THE YEAR", desc: "Awarded Awwwards Publication of the Year. Launched interactive WebGL 3D digital reader editions." }
  ];

  const values = [
    { num: "01", name: "TACTILE PERMANENCE", desc: "We treat digital pixels with the reverence of heavy obsidian stone and rag paper, ensuring every layout feels timeless and durable." },
    { num: "02", name: "UNCOMPROMISING TASTE", desc: "We ignore viral trends and clickbait in favor of independent cultural investigations, deep research, and rigorous editing." },
    { num: "03", name: "HYBRID 3D STORYTELLING", desc: "We leverage real-time WebGL graphics to provide readers with spatial depth, immersion, and interactive tactile feedback." },
    { num: "04", name: "GLOBAL BICULTURAL EYE", desc: "We bridge East and West, bringing cross-disciplinary perspectives from Zurich to Tokyo into every printed and digital volume." }
  ];

  const stats = [
    { num: "48+", label: "PUBLISHED ESSAYS" },
    { num: "85K+", label: "SUNDAY DISPATCH READERS" },
    { num: "12", label: "GLOBAL BUREAUS" },
    { num: "98.4%", label: "READER RETENTION" },
    { num: "14", label: "PUBLISHING AWARDS" }
  ];

  const partners = ["MONOCLE", "SPATIAL LABS", "DESIGN MUSEUM ZURICH", "WALLPAPER*", "ARCHDAILY"];

  const awards = [
    { title: "PUBLICATION OF THE YEAR 2025", org: "Awwwards International" },
    { title: "DIGITAL EDITORIAL EXCELLENCE", org: "European Design Awards" },
    { title: "SITE OF THE MONTH", org: "FWA World Awards" },
    { title: "TYPOGRAPHY EXCELLENCE", org: "Type Directors Club NY" }
  ];

  containerEl.innerHTML = `
    <!-- 1. HERO SECTION -->
    <section class="about-hero-section">
      <div class="section-container">
        <div class="about-hero-grid">
          <div class="about-hero-text">
            <div class="category-badge">ABOUT VANTA MEDIA GROUP</div>
            <h1 class="about-hero-title">
              THE MINDS BEHIND <br/>
              THE <span class="highlight">DISPATCH</span>
            </h1>
            <p class="about-hero-subtitle">
              A global collective of editors, critics, neural network researchers, and spatial designers dedicated to documenting the ideas shaping tomorrow.
            </p>
            <div class="about-hero-actions">
              <a href="#our-story" class="btn-primary" data-cursor="read">OUR STORY</a>
              <a href="#masthead" class="btn-secondary" data-cursor="view">MEET THE MASTHEAD</a>
            </div>
          </div>

          <div class="about-hero-media">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="VANTA Studio" class="about-hero-img" />
            <div class="about-media-badge">
              <span class="metadata-text">ZURICH NEWSROOM & STUDIO</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. OUR STORY & MILESTONES -->
    <section id="our-story" class="section-container" style="padding-top: 100px; padding-bottom: 80px;">
      <div class="section-header-editorial">
        <div class="category-badge">GENESIS & JOURNEY</div>
        <h2 class="section-title">OUR STORY</h2>
        <p class="section-subtitle">How a small group of Zurich architects and writers set out to redefine digital publishing.</p>
      </div>

      <div class="story-layout-grid">
        <div class="story-narrative">
          <h3 style="font-family: var(--font-heading); font-size: 2rem; color: var(--text-primary); margin-bottom: 16px;">
            RECLAIMING THE DIGNITY OF LONG-FORM JOURNALISM
          </h3>
          <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 20px;">
            VANTA was founded in 2024 as a direct response to the fragmentation of modern media. In an era dominated by fleeting social media feeds, we believed that ideas deserve physical dignity, visual serenity, and rigorous editorial investigation.
          </p>
          <p style="color: var(--text-secondary); line-height: 1.8;">
            By marrying high-end Swiss print typography with real-time WebGL 3D graphics, VANTA creates digital reading experiences that feel as valuable and permanent as a heavy obsidian hardcover publication.
          </p>
        </div>

        <!-- Milestones Timeline -->
        <div class="milestones-timeline">
          ${milestones.map(m => `
            <div class="milestone-card">
              <div class="milestone-year">${m.year}</div>
              <h4 class="milestone-title">${m.title}</h4>
              <p class="milestone-desc">${m.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 3. MISSION & EDITORIAL VALUES -->
    <section class="section-container" style="padding-top: 60px; padding-bottom: 100px;">
      <div class="section-header-editorial">
        <div class="category-badge">GUIDING PRINCIPLES</div>
        <h2 class="section-title">EDITORIAL VALUES</h2>
      </div>

      <div class="values-grid">
        ${values.map(v => `
          <div class="value-card" data-cursor="view">
            <div class="value-num">${v.num}</div>
            <h3 class="value-title">${v.name}</h3>
            <p class="value-desc">${v.desc}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- 4. EDITORIAL MASTHEAD (TEAM SECTION & PET MASCOT) -->
    <section id="masthead" class="section-container" style="padding-top: 60px; padding-bottom: 100px;">
      <div class="section-header-editorial">
        <div class="category-badge">EDITORIAL BOARD</div>
        <h2 class="section-title">THE MASTHEAD</h2>
        <p class="section-subtitle">Meet the journalists, critics, and creative directors behind every edition.</p>
      </div>

      <div class="contributors-grid">
        ${contributors.map(c => `
          <div class="contributor-card" data-cursor="view">
            <img src="${c.avatar}" alt="${c.name}" loading="lazy" />
            <div class="category-badge" style="margin-top: 16px; font-size: 0.65rem;">${c.bureau}</div>
            <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--text-primary); margin-top: 6px;">${c.name}</h3>
            <div class="metadata-text" style="color: var(--accent-gold); margin-bottom: 8px;">${c.role}</div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">${c.bio}</p>
            <div style="font-size: 0.78rem; color: var(--text-muted); font-style: italic; border-top: 1px solid var(--border-color); padding-top: 8px;">
              ★ ${c.fact}
            </div>
          </div>
        `).join('')}

        <!-- Studio Mascot Card -->
        <div class="contributor-card" style="border-color: var(--border-gold);" data-cursor="view">
          <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80" alt="Vanta Cat" loading="lazy" />
          <div class="category-badge" style="margin-top: 16px; font-size: 0.65rem;">ZURICH HQ MASCOT</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--accent-gold); margin-top: 6px;">Vanta</h3>
          <div class="metadata-text" style="color: var(--accent-gold); margin-bottom: 8px;">HEAD OF SILENCE & INSPIRATION</div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
            Oversees late-night editing sessions, naps on manuscript drafts, and maintains strict studio calm.
          </p>
          <div style="font-size: 0.78rem; color: var(--text-muted); font-style: italic; border-top: 1px solid var(--border-color); padding-top: 8px;">
            ★ Favorite spot: Warm amplifier grid.
          </div>
        </div>
      </div>
    </section>

    <!-- 5. PUBLISHING CULTURE -->
    <section class="section-container" style="padding-top: 40px; padding-bottom: 100px;">
      <div class="culture-banner">
        <div class="culture-text">
          <div class="category-badge">LIFE AT VANTA</div>
          <h2 style="font-family: var(--font-heading); font-size: 2.8rem; color: var(--text-primary); margin-top: 12px; margin-bottom: 16px;">
            CULTURE & PUBLISHING FREEDOM
          </h2>
          <p style="color: var(--text-secondary); line-height: 1.7; max-width: 600px;">
            Our newsrooms function like creative research laboratories. We offer full editorial autonomy, deep investigation grants, bi-weekly editorial roundtables, and a hybrid global bureau framework spanning Zurich, Tokyo, and Paris.
          </p>
        </div>
        <div class="culture-gallery">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="Newsroom Culture" />
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80" alt="Editorial Review" />
        </div>
      </div>
    </section>

    <!-- 6. BY THE NUMBERS -->
    <section style="background: var(--bg-card); border-y: 1px solid var(--border-color); padding: 80px 0;">
      <div class="section-container">
        <div class="stats-counter-grid">
          ${stats.map(s => `
            <div class="stat-box">
              <div class="stat-number">${s.num}</div>
              <div class="stat-label">${s.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 7. SYNDICATION & PARTNERS -->
    <section class="section-container" style="padding-top: 100px; padding-bottom: 80px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <div class="category-badge">SYNDICATION & EDITORIAL PARTNERS</div>
      </div>
      <div class="partners-logo-strip">
        ${partners.map(p => `<div class="partner-logo">${p}</div>`).join('')}
      </div>
    </section>

    <!-- 8. GLOBAL BUREAUS / LOCATIONS -->
    <section class="section-container" style="padding-top: 40px; padding-bottom: 100px;">
      <div class="section-header-editorial">
        <div class="category-badge">LOCATIONS</div>
        <h2 class="section-title">GLOBAL BUREAUS</h2>
      </div>

      <div class="bureaus-grid">
        <div class="bureau-card">
          <div class="category-badge">HEADQUARTERS</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--text-primary); margin: 12px 0 6px;">ZURICH</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            Bahnhofstrasse 42, 8001 Zürich, Switzerland<br/>
            Contact: zurich@vanta-magazine.com
          </p>
        </div>

        <div class="bureau-card">
          <div class="category-badge">ASIA PACIFIC BUREAU</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--text-primary); margin: 12px 0 6px;">TOKYO</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            Ginza 6-Chome, Chuo-ku, Tokyo 104-0061, Japan<br/>
            Contact: tokyo@vanta-magazine.com
          </p>
        </div>

        <div class="bureau-card">
          <div class="category-badge">EUROPEAN BUREAU</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--text-primary); margin: 12px 0 6px;">PARIS</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            Rue du Faubourg Saint-Honoré, 75008 Paris, France<br/>
            Contact: paris@vanta-magazine.com
          </p>
        </div>
      </div>
    </section>

    <!-- 9. AWARDS & RECOGNITION -->
    <section class="section-container" style="padding-top: 40px; padding-bottom: 100px;">
      <div class="section-header-editorial">
        <div class="category-badge">HONORS</div>
        <h2 class="section-title">AWARDS & RECOGNITION</h2>
      </div>

      <div class="awards-grid">
        ${awards.map(a => `
          <div class="award-item">
            <span class="award-icon">🏆</span>
            <div>
              <h4 style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--text-primary);">${a.title}</h4>
              <div class="metadata-text" style="color: var(--accent-gold); margin-top: 4px;">${a.org}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- 10 & 11. CAREERS & CONTACT CTAS -->
    <section class="section-container" style="padding-top: 40px; padding-bottom: 120px;">
      <div class="about-cta-box">
        <div style="max-width: 600px;">
          <div class="category-badge">JOIN THE DISPATCH</div>
          <h2 style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--text-primary); margin-top: 12px; margin-bottom: 12px;">
            PITCH A STORY OR GET IN TOUCH
          </h2>
          <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.6;">
            We are always seeking guest essayists, critics, and spatial researchers. Submit manuscript drafts or schedule press inquiries with our editors.
          </p>
        </div>

        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <button id="cta-pitch-btn" class="btn-primary" data-cursor="read">SUBMIT MANUSCRIPT</button>
          <button id="cta-contact-btn" class="btn-secondary" data-cursor="view">CONTACT EDITORS</button>
        </div>
      </div>
    </section>
  `;

  // Attach CTA handlers
  const pitchBtn = containerEl.querySelector('#cta-pitch-btn');
  const contactBtn = containerEl.querySelector('#cta-contact-btn');

  if (pitchBtn) {
    pitchBtn.addEventListener('click', () => {
      alert("VANTA Submissions Portal: Please email manuscript proposals to pitch@vanta-magazine.com");
    });
  }

  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      alert("Editorial Office Contact: editors@vanta-magazine.com | Zurich HQ: +41 44 211 00 90");
    });
  }

  // GSAP animation
  const heroText = containerEl.querySelector('.about-hero-text');
  if (heroText) {
    gsap.fromTo(heroText.children,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }
}
