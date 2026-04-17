/* ============================================================
   GOLDLINES — Contact Page JavaScript (contact.js)
   Form validation and submission handling
   ============================================================ */

(function () {
  'use strict';

  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('contact-submit-btn');
  const successEl  = document.getElementById('contact-success');
  const errorEl    = document.getElementById('contact-error');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous error
    errorEl.style.display = 'none';

    // Validate
    const name    = form.querySelector('#contact-name').value.trim();
    const email   = form.querySelector('#contact-email').value.trim();
    const subject = form.querySelector('#contact-subject').value;
    const message = form.querySelector('#contact-message').value.trim();

    if (!name || !email || !subject || !message) {
      errorEl.style.display = 'block';
      errorEl.textContent   = 'Please fill in all required fields.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorEl.style.display = 'block';
      errorEl.textContent   = 'Please enter a valid email address.';
      return;
    }

    // Loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled    = true;

    /*
      ── CONNECT YOUR FORM BACKEND HERE ─────────────────────
      Options:
      1. Formspree   — https://formspree.io  (free tier, easy setup)
         Replace the fetch URL with: https://formspree.io/f/YOUR_FORM_ID

      2. EmailJS     — https://www.emailjs.com (free tier)
         Use emailjs.send() here instead of fetch

      3. Google Apps Script — free, connects to Google Sheets
         Deploy as web app and use that URL

      Example with Formspree:
      fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      })
      .then(res => res.ok ? showSuccess() : showError('Something went wrong. Please try again.'))
      .catch(() => showError('Something went wrong. Please try again.'));
      ───────────────────────────────────────────────────────
    */

    // Simulate submission for now — replace with real backend above
    setTimeout(() => {
      showSuccess();
    }, 1200);

  });

  function showSuccess() {
    form.style.display       = 'none';
    successEl.classList.add('visible');
    successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function showError(msg) {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled    = false;
    errorEl.style.display = 'block';
    errorEl.textContent   = msg || 'Something went wrong. Please try again.';
  }

})();