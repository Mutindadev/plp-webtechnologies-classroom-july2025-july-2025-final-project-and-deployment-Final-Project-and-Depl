// main.js — website interactions
// 1) Mobile nav toggle (shared across pages)
// 2) Back to top button
// 3) Scroll reveal (IntersectionObserver)
// 4) Testimonials simple carousel
// 5) Contact form validation (on contact page)

// ------- Utility: select safely -------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// ------- Mobile nav (works on each page) -------
function setupNavToggle() {
  // multiple pages use different navToggle ids - find the first matching button
  const toggles = $$('.nav-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = document.getElementById('primaryNav');
      if (!nav) return;
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

// ------- Back to top -------
function setupBackToTop() {
  const back = document.getElementById('backToTop');
  if (!back) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) back.style.display = 'block';
    else back.style.display = 'none';
  });
  back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ------- Scroll reveal using IntersectionObserver -------
function setupScrollReveal() {
  const items = $$('.fade-up');
  if (!('IntersectionObserver' in window) || !items.length) {
    // fallback: show all
    items.forEach(i => i.classList.add('show'));
    return;
  }
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        o.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  items.forEach(i => obs.observe(i));
}

// ------- Testimonials carousel -------
function setupTestimonials() {
  const track = document.getElementById('testTrack');
  if (!track) return;
  const items = Array.from(track.children);
  let idx = 0;
  function show(i) {
    items.forEach((el, k) => el.classList.toggle('active', k === i));
  }
  show(0);
  setInterval(() => {
    idx = (idx + 1) % items.length;
    show(idx);
  }, 4500);
}

// ------- Contact form validation & fake submit -------
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (form.name.value || '').trim();
    const email = (form.email.value || '').trim();
    const message = (form.message.value || '').trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill all required fields.';
      status.style.color = '#c84343';
      return;
    }

    // basic email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.style.color = '#c84343';
      return;
    }

    // pretend to submit (you could integrate an API or serverless function)
    status.textContent = 'Sending…';
    status.style.color = '#333';
    setTimeout(() => {
      status.textContent = 'Thanks — your message has been sent!';
      status.style.color = '#0a8a3b';
      form.reset();
    }, 900);
  });
}

// ------- Document ready -------
document.addEventListener('DOMContentLoaded', () => {
  setupNavToggle();
  setupBackToTop();
  setupScrollReveal();
  setupTestimonials();
  setupContactForm();
});
