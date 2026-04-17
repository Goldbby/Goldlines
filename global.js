/* ============================================================
   GOLDLINES — Global JavaScript
   Shared across all pages
   ============================================================ */

(function () {
  'use strict';

  /* ── NAV SCROLL EFFECT ────────────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── MOBILE NAV TOGGLE ────────────────────────────────── */
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('nav-drawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close drawer when a link is clicked
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });

    // Close drawer on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── ACTIVE NAV LINK ──────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── SCROLL REVEAL ────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── COLOUR SWATCH SELECTOR ───────────────────────────── */
  document.querySelectorAll('.swatch-group').forEach(group => {
    const swatches = group.querySelectorAll('.swatch');
    const label = group.closest('.selector-block')?.querySelector('.swatch-selected-name');

    swatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        if (label) label.textContent = swatch.getAttribute('data-name') || '';
      });
    });
  });

  /* ── SIZE SELECTOR ────────────────────────────────────── */
  document.querySelectorAll('.size-selector').forEach(selector => {
    const btns = selector.querySelectorAll('.size-btn');
    const label = selector.closest('.selector-block')?.querySelector('.size-selected-name');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (label) label.textContent = btn.textContent;
      });
    });
  });

  /* ── WAITLIST INLINE FORM (homepage banner) ───────────── */
  const waitlistForm = document.getElementById('waitlist-inline');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn  = waitlistForm.querySelector('button[type="submit"]');
      const input = waitlistForm.querySelector('input[type="email"]');
      if (!input.value) return;

      btn.textContent = "You're on the list ✦";
      btn.style.background = '#1a1a1a';
      btn.style.color = '#fff';
      btn.disabled = true;
      input.value = '';
      input.placeholder = 'See you on launch day!';
      input.disabled = true;
    });
  }

  /* ── SMOOTH ANCHOR SCROLL ─────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ── WHATSAPP REDIRECT BUILDER ────────────────────────── */
  // Called by product page Pre-Order buttons
  window.openWhatsApp = function (productName, colour, size) {
    const phone   = '09029896724'; // e.g. 2348012345678
    const message = colour && size
      ? `Hi Goldlines, I would like to pre-order ${productName} in ${colour}, Size ${size}. Please send me payment details. ✦`
      : `Hi Goldlines, I'm interested in ${productName}. Can you please send me more details? ✦`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  /* ── IMAGE LAZY LOADING ───────────────────────────────── */
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback — load all images immediately
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  }

})();