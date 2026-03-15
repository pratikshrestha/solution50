/**
 * Solution50 — Main JavaScript
 * Phase 1 Static Site | WordPress-Ready
 */

(function () {
    'use strict';

    /* ── Header scroll state ── */
    const header = document.querySelector('.s50-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }

    /* ── Mobile menu toggle ── */
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', false);
                mobileMenu.setAttribute('aria-hidden', true);
            });
        });
    }

    /* ── Header scroll state ── */
    const header = document.querySelector('.s50-header');
    if (header) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    header.classList.toggle('scrolled', window.scrollY > 60);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* ── Active nav link handling ── */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link, .mobile-nav-link, .nav-dropdown-item').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');

            // If it's a dropdown item, also highlight the parent trigger
            if (link.classList.contains('nav-dropdown-item')) {
                const parentTrigger = link.closest('.nav-has-dropdown')?.querySelector('.nav-dropdown-trigger');
                if (parentTrigger) parentTrigger.classList.add('active');
            }
        }
    });

    /* ── Solutions dropdown (Desktop Hover + Mobile Click) ── */
    const dropdowns = document.querySelectorAll('.nav-has-dropdown');

    dropdowns.forEach(item => {
        const trigger = item.querySelector('.nav-dropdown-trigger');

        // Toggle on click
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = item.classList.toggle('open');
            trigger.setAttribute('aria-expanded', isOpen);

            // Close other dropdowns
            dropdowns.forEach(other => {
                if (other !== item) {
                    other.classList.remove('open');
                    other.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', false);
                }
            });
        });

        // Hover for desktop
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth >= 992) {
                item.classList.add('open');
                trigger.setAttribute('aria-expanded', true);
            }
        });

        item.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 992) {
                item.classList.remove('open');
                trigger.setAttribute('aria-expanded', false);
            }
        });
    });

    document.addEventListener('click', () => {
        dropdowns.forEach(item => {
            item.classList.remove('open');
            item.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', false);
        });
    });

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


})();
