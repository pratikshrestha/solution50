/**
 * Solution50 — Main JavaScript
 * Phase 1 Static Site | WordPress-Ready
 */

(function () {
  'use strict';

  /* ── Navbar scroll shadow ─────────────────────────────── */
  const navbar = document.querySelector('.s50-navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile nav toggle ────────────────────────────────── */
  const toggler = document.getElementById('navToggler');
  const mobileNav = document.getElementById('mobileNav');
  if (toggler && mobileNav) {
    toggler.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      toggler.setAttribute('aria-expanded', isOpen);
      toggler.querySelector('i').className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggler.setAttribute('aria-expanded', false);
        toggler.querySelector('i').className = 'bi bi-list';
      });
    });
  }

  /* ── FAQ Accordion ────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));

      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Scroll-triggered fade-up animations ─────────────── */
  const animatedEls = document.querySelectorAll('[data-animate]');
  if (animatedEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || '0';
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, parseInt(delay));
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  /* ── Contact form validation ──────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      contactForm.querySelectorAll('[required]').forEach(field => {
        const errorEl = contactForm.querySelector(`[data-error="${field.name}"]`);
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#EF4444';
          if (errorEl) errorEl.style.display = 'block';
        } else {
          field.style.borderColor = '';
          if (errorEl) errorEl.style.display = 'none';
        }
      });

      // Email validation
      const emailField = contactForm.querySelector('[name="email"]');
      if (emailField && emailField.value.trim()) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailField.value)) {
          valid = false;
          emailField.style.borderColor = '#EF4444';
        }
      }

      if (valid) {
        const btn = contactForm.querySelector('.form-submit-btn');
        const original = btn.textContent;
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#10B981';
        btn.disabled = true;
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      }
    });

    // Live validation reset
    contactForm.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', function () {
        this.style.borderColor = '';
        const errorEl = contactForm.querySelector(`[data-error="${this.name}"]`);
        if (errorEl) errorEl.style.display = 'none';
      });
    });
  }

  /* ── Active nav link ──────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

})();
