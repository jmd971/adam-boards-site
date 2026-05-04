/* ============================================================
   ADAM BOARDS — Interactions
   ============================================================ */

// ── Header scrolled state ──────────────────────────────────
const header = document.querySelector('.site-header, .header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ── Mobile menu toggle ────────────────────────────────────
const menuBtn = document.querySelector('.menu-btn, .menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('.nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    if (mobileMenu) mobileMenu.classList.toggle('open');
    if (nav) nav.classList.toggle('open');
  });
}

// ── Reveal on scroll (IntersectionObserver) ──────────────
const reveals = document.querySelectorAll('.reveal, .reveal-stagger');
if ('IntersectionObserver' in window && reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// ── Number counting animation ─────────────────────────────
const counters = document.querySelectorAll('[data-count]');
if ('IntersectionObserver' in window && counters.length) {
  const fmt = (v, decimals) => {
    const n = decimals ? v.toFixed(decimals) : Math.round(v);
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f');
  };
  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = parseInt(el.dataset.duration || '1400', 10);
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const v = target * ease(p);
      el.textContent = `${prefix}${fmt(v, decimals)}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const ioCount = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animate(e.target);
        ioCount.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach((el) => ioCount.observe(el));
}

// ── Smooth anchor scrolling ───────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    const y = t.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: 'smooth' });
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (nav) nav.classList.remove('open');
  });
});

// ── Subtle parallax on hero background ────────────────────
const heroBg = document.querySelector('[data-parallax]');
if (heroBg && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY * 0.25;
        heroBg.style.transform = `translate3d(0, ${y}px, 0)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ── FAQ accordion (legacy support) ────────────────────────
document.querySelectorAll('.faq-question').forEach((q) => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ── Diagnostic form (legacy) ──────────────────────────────
const diagForm = document.getElementById('diagnostic-form');
if (diagForm) {
  diagForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = diagForm.querySelector('button[type="submit"]');
    btn.textContent = '✓ Demande envoyée';
    btn.style.background = '#00C896';
    btn.disabled = true;
  });
}
