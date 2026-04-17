/* ============================================================
   GOLDLINES — Waitlist Page JavaScript (waitlist.js)
   Live countdown timer + form validation + submission
   ============================================================ */

(function () {
  'use strict';

  /* ── COUNTDOWN TIMER ────────────────────────────────────── */

  /*
    SET YOUR LAUNCH DATE HERE:
    Format: 'YYYY-MM-DDTHH:MM:SS'
    Example: '2026-06-01T00:00:00' = June 1st 2026 midnight

    Once you have a confirmed launch date, replace the line below.
    Until then it counts down 30 days from when the page first loads.
  */
  const LAUNCH_DATE = getLaunchDate();

  function getLaunchDate() {
    // Check if a launch date is stored
    const stored = localStorage.getItem('gl_launch_date');
    if (stored) return new Date(stored);

    // Default: 30 days from now — replace with your real date
    // e.g. return new Date('2026-06-15T00:00:00');
    const d = new Date();
    d.setDate(d.getDate() + 30);
    localStorage.setItem('gl_launch_date', d.toISOString());
    return d;
  }

  const daysEl  = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl  = document.getElementById('cd-mins');
  const secsEl  = document.getElementById('cd-secs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = new Date();
    const diff = LAUNCH_DATE - now;

    if (diff <= 0) {
      // Launch day — stop timer and show launch message
      if (daysEl)  daysEl.textContent  = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl)  minsEl.textContent  = '00';
      if (secsEl)  secsEl.textContent  = '00';
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl)  daysEl.textContent  = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minsEl)  minsEl.textContent  = pad(mins);

    // Tick animation on seconds
    if (secsEl && secsEl.textContent !== pad(secs)) {
      secsEl.classList.remove('tick');
      void secsEl.offsetWidth; // reflow
      secsEl.textContent = pad(secs);
      secsEl.classList.add('tick');
      setTimeout(() => secsEl.classList.remove('tick'), 300);
    }
  }

  if (daysEl) {
    tick();
    setInterval(tick, 1000);
  }

  /* ── WAITLIST FORM ──────────────────────────────────────── */
  const form       = document.getElementById('waitlist-full-form');
  const formWrap   = document.getElementById('waitlist-form-wrap');
  const successEl  = document.getElementById('waitlist-success');
  const submitBtn  = document.getElementById('wl-submit-btn');
  const errorEl    = document.getElementById('wl-error');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorEl.style.display = 'none';

    // Collect values
    const name     = form.querySelector('#wl-name').value.trim();
    const email    = form.querySelector('#wl-email').value.trim();
    const whatsapp = form.querySelector('#wl-whatsapp').value.trim();
    const set      = form.querySelector('#wl-set').value;

    // Validate required fields
    if (!name) return showError('Please enter your name.');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return showError('Please enter a valid email address.');
    }

    if (!set) return showError('Please select which set you\'re interested in.');

    // Loading state
    submitBtn.textContent = 'Joining...';
    submitBtn.disabled    = true;

    /*
      ── CONNECT YOUR FORM BACKEND HERE ─────────────────────

      OPTION 1 — Formspree (recommended, free):
      1. Go to https://formspree.io and create a free account
      2. Create a new form and copy your form ID
      3. Replace YOUR_FORM_ID below

      fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, whatsapp, set })
      })
      .then(res => {
        if (res.ok) showSuccess();
        else showError('Something went wrong. Please try again.');
      })
      .catch(() => showError('Something went wrong. Please try again.'));
      return;

      ──────────────────────────────────────────────────────

      OPTION 2 — Google Sheets via Apps Script:
      1. Create a Google Sheet for waitlist entries
      2. Go to Extensions → Apps Script
      3. Deploy as web app and use that URL below

      fetch('YOUR_APPS_SCRIPT_URL', {
        method: 'POST',
        body: JSON.stringify({ name, email, whatsapp, set })
      })
      .then(() => showSuccess())
      .catch(() => showError('Something went wrong. Please try again.'));
      return;

      ───────────────────────────────────────────────────────
    */

    // Simulated submission — remove once real backend is connected
    setTimeout(() => {
      showSuccess();
    }, 1400);

  });

  function showSuccess() {
    formWrap.style.display = 'none';
    successEl.classList.add('visible');
    successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function showError(msg) {
    submitBtn.textContent = 'Join the Waitlist →';
    submitBtn.disabled    = false;
    errorEl.style.display = 'block';
    errorEl.textContent   = msg;
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

})();