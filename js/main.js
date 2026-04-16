// Header scroll effect
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-inner')) {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
    }
  });
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav && nav.classList.remove('open');
    }
  });
});

// Simple form validation for diagnostic page
const diagForm = document.getElementById('diagnostic-form');
if (diagForm) {
  diagForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = diagForm.querySelector('button[type="submit"]');
    btn.textContent = 'Demande envoyee !';
    btn.style.background = '#10B981';
    btn.disabled = true;
    // In production, this would submit to GHL/backend
  });
}
