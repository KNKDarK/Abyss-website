function initSideNav() {
  const nav = document.getElementById('side-nav');
  if (!nav) return;
  const items = nav.querySelectorAll('.side-item');
  const total = items.length;
  let activeIndex = 0;
  let hideTimer = null;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  items.forEach((item, i) => {
    if (item.getAttribute('href') === currentPage) {
      item.classList.add('active');
      activeIndex = i;
    }
  });

  function show() {
    clearTimeout(hideTimer);
    nav.classList.add('visible');
  }

  function hide(delay) {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => nav.classList.remove('visible'), delay || 400);
  }

  const edgeThreshold = 80;

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const w = window.innerWidth;
    const h = window.innerHeight;

    const nearLeft = x < edgeThreshold;
    const nearEdge = nearLeft || x > w - edgeThreshold || y < edgeThreshold || y > h - edgeThreshold;

    if (nearEdge) {
      show();

      if (nearLeft) {
        const inTL = y < edgeThreshold;
        const inBL = y > h - edgeThreshold;
        let idx = -1;
        if (inTL) idx = 0;
        else if (inBL) idx = 3;
        else idx = activeIndex;
        if (idx >= 0 && idx !== activeIndex) {
          items[activeIndex].classList.remove('active');
          activeIndex = idx;
          items[activeIndex].classList.add('active');
        }
      }
    } else {
      hide(400);
    }
  });

  document.addEventListener('mouseleave', () => hide(600));

  document.addEventListener('wheel', (e) => {
    if (!nav.classList.contains('visible')) return;
    e.preventDefault();

    items[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + (e.deltaY > 0 ? 1 : total - 1)) % total;
    items[activeIndex].classList.add('active');
    show();
    hide(2000);

    const href = items[activeIndex].getAttribute('href');
    if (href && href !== (window.location.pathname.split('/').pop() || 'index.html')) {
      const screen = document.getElementById('loading-screen');
      if (screen) screen.classList.remove('hidden');
      setTimeout(() => { window.location.href = href; }, 500);
    }
  }, { passive: false });

  nav.addEventListener('click', (e) => {
    const item = e.target.closest('.side-item');
    if (item) {
      show();
      hide(1500);
    }
  });
}

function initNavigation() {
  initSideNav();
}

function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  function hide() {
    screen.classList.add('hidden');
  }

  if (document.readyState === 'complete') {
    setTimeout(hide, 500);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 500));
  }

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) setTimeout(hide, 300);
  });

  setTimeout(() => {
    if (!screen.classList.contains('hidden')) hide();
  }, 4000);
}

function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
        bar.style.width = pct + '%';
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const pull = 6;
      btn.style.setProperty('--mx', (x / rect.width) * pull + 'px');
      btn.style.setProperty('--my', (y / rect.height) * pull + 'px');
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.setProperty('--mx', '0px');
      btn.style.setProperty('--my', '0px');
    });
  });
}

function initStaggeredReveal() {
  const containers = [
    document.querySelectorAll('.team-member'),
    document.querySelectorAll('.project-card'),
    document.querySelectorAll('.extra-card'),
  ];

  containers.forEach(group => {
    group.forEach((el, i) => {
      el.classList.add('reveal');
      const delay = Math.min((i + 1) * 0.1, 0.6);
      el.style.transitionDelay = delay + 's';
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

function initTeamHoverBurst() {
  const members = document.querySelectorAll('.team-member');
  members.forEach(member => {
    member.addEventListener('mouseenter', (e) => {
      const rect = member.getBoundingClientRect();
      const count = 8 + Math.floor(Math.random() * 6);
      for (let i = 0; i < count; i++) {
        createParticleBurst(member, rect, e);
      }
    });
  });
}

function createParticleBurst(container, rect, event) {
  const particle = document.createElement('div');
  particle.className = 'particle-burst';

  const angle = (Math.PI * 2 * Math.random());
  const distance = 40 + Math.random() * 80;
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;

  const color = Math.random() > 0.5 ? '#6c3bff' : '#4a1dcc';
  const size = 2 + Math.random() * 4;

  particle.style.cssText = `
    left: ${event.clientX - rect.left}px;
    top: ${event.clientY - rect.top}px;
    background: ${color};
    width: ${size}px;
    height: ${size}px;
    --tx: ${tx}px;
    --ty: ${ty}px;
  `;

  container.appendChild(particle);
  setTimeout(() => particle.remove(), 800);
}

function initGlitchTexts() {
  const glitches = document.querySelectorAll('.glitch');
  glitches.forEach(el => {
    if (!el.dataset.text) {
      el.dataset.text = el.textContent;
    }
  });
}

function lazyLoadImages() {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }
}

/* ==========================================
   3D TILT CARDS
   ========================================== */
function initTiltCards() {
  const cards = document.querySelectorAll('.team-member, .project-card, .extra-card');
  cards.forEach(card => {
    card.classList.add('tilt-card');

    const inner = card.querySelector('.role-badge, .project-number, .extra-icon') || card;
    if (inner) inner.classList.add('tilt-content');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * -20;
      const tiltY = (x - 0.5) * 20;
      card.style.setProperty('--tilt-glow-x', x * 100 + '%');
      card.style.setProperty('--tilt-glow-y', y * 100 + '%');
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      card.style.boxShadow = `${(x - 0.5) * 30}px ${(y - 0.5) * 30}px 40px var(--accent-subtle)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}

/* ==========================================
   NAVIGATION INTERCEPTION (loading screen)
   ========================================== */
function initNavInterception() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  document.addEventListener('click', (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const link = e.target.closest('a[href$=".html"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) return;
    const current = window.location.pathname.split('/').pop() || 'index.html';
    if (href === current) return;

    e.preventDefault();
    screen.classList.remove('hidden');
    setTimeout(() => { window.location.href = href; }, 500);
  });
}

/* ==========================================
   SCROLL-TRIGGERED TEXT REVEAL
   ========================================== */
function initTextReveal() {
  const targets = document.querySelectorAll('h1:not(.glitch), h2, .page-header p, .subtitle, .hero-badge, .member-bio');
  targets.forEach(el => {
    const text = el.textContent.trim();
    if (!text || el.classList.contains('reveal-text')) return;
    el.classList.add('reveal-text');
    const chars = text.split('').map((c, i) => {
      if (c === ' ') return '<span class="reveal-char" style="--char-index:' + i + '">&nbsp;</span>';
      return '<span class="reveal-char" style="--char-index:' + i + '">' + c + '</span>';
    }).join('');
    el.innerHTML = chars;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const chars = entry.target.querySelectorAll('.reveal-char');
        chars.forEach((ch, i) => {
          setTimeout(() => ch.classList.add('visible'), i * 20);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-text').forEach(el => observer.observe(el));
}

/* ==========================================
   AMBIENT CURSOR TRAIL
   ========================================== */
function initCursorTrail() {
  let lastX = 0, lastY = 0;
  let frameCount = 0;
  let hasMoved = false;
  let moveTimer = null;

  document.addEventListener('mousemove', (e) => {
    lastX = e.clientX;
    lastY = e.clientY;
    hasMoved = true;
    clearTimeout(moveTimer);
    moveTimer = setTimeout(() => hasMoved = false, 150);
  });

  function spawnTrail() {
    frameCount++;
    if (hasMoved && frameCount % 2 === 0) {
      const dx = (Math.random() - 0.5) * 30;
      const dy = (Math.random() - 0.5) * 30;
      const size = 3 + Math.random() * 6;
      const duration = 0.5 + Math.random() * 0.6;

      const p = document.createElement('div');
      p.className = 'trail-particle';
      p.style.cssText = `
        left: ${lastX}px;
        top: ${lastY}px;
        width: ${size}px;
        height: ${size}px;
        --trail-dx: ${dx}px;
        --trail-dy: ${dy}px;
        --trail-duration: ${duration}s;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), duration * 1000);
    }
    requestAnimationFrame(spawnTrail);
  }

  requestAnimationFrame(spawnTrail);
}

/* ==========================================
   FULL-SCREEN SNAP SCROLL
   ========================================== */
function initSnapScroll() {
  const html = document.documentElement;
  const sections = [...document.querySelectorAll('.hero, .team-grid, .projects-container, .extras-grid')];

  document.querySelectorAll('.page-header').forEach(h => {
    if (h.matches('[style*="padding-top"]')) return;
    sections.push(h);
  });

  if (sections.length < 2) return;

  html.classList.add('snap-scroll');
  sections.forEach(s => s.classList.add('snap-section'));

  const indicators = document.createElement('div');
  indicators.className = 'snap-indicators';

  const dots = [];
  sections.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'snap-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      sections[i].scrollIntoView({ behavior: 'smooth' });
    });
    indicators.appendChild(dot);
    dots.push(dot);
  });

  document.body.appendChild(indicators);

  let ticking = false;
  document.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const viewportCenter = window.scrollY + window.innerHeight / 2;
        let activeIdx = 0;
        sections.forEach((s, i) => {
          const top = s.offsetTop;
          const bottom = top + s.offsetHeight;
          if (viewportCenter >= top && viewportCenter < bottom) activeIdx = i;
        });
        dots.forEach((d, i) => d.classList.toggle('active', i === activeIdx));
        ticking = false;
      });
      ticking = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initLoadingScreen();
  initNavInterception();
  initScrollProgress();
  initMagneticButtons();
  initTiltCards();
  initTextReveal();
  initCursorTrail();
  initSnapScroll();
  initStaggeredReveal();
  initTeamHoverBurst();
  initGlitchTexts();
  lazyLoadImages();
});
