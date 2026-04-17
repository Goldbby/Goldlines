/* ============================================================
   GOLDLINES — Shop Page JavaScript (shop.js)
   Filter tabs, sticky filter bar elevation
   ============================================================ */

(function () {
  'use strict';

  /* ── FILTER TABS ────────────────────────────────────────── */
  const tabs       = document.querySelectorAll('.filter-tab');
  const cards      = document.querySelectorAll('.shop-product-card');
  const countEl    = document.getElementById('filter-count');
  const emptyEl    = document.getElementById('shop-empty');
  const filterBar  = document.getElementById('filter-bar');

  function filterProducts(category) {
    let visible = 0;

    cards.forEach(card => {
      const categories = card.getAttribute('data-category') || '';
      const show = category === 'all' || categories.includes(category);

      if (show) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Update count
    if (countEl) {
      countEl.textContent = visible === 1
        ? 'Showing 1 piece'
        : `Showing ${visible} pieces`;
    }

    // Show/hide empty state
    if (emptyEl) {
      emptyEl.classList.toggle('visible', visible === 0);
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active state
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Filter
      filterProducts(tab.getAttribute('data-filter'));
    });
  });

  /* ── STICKY FILTER BAR ELEVATION ───────────────────────── */
  if (filterBar) {
    // Get the filter bar's position relative to the nav
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
    ) || 72;

    window.addEventListener('scroll', () => {
      const rect = filterBar.getBoundingClientRect();
      filterBar.classList.toggle('elevated', rect.top <= navH + 1);
    }, { passive: true });
  }

  /* ── KEYBOARD NAVIGATION FOR FILTER TABS ───────────────── */
  const tabList = document.querySelector('.filter-tabs');
  if (tabList) {
    tabList.addEventListener('keydown', (e) => {
      const currentTab = document.activeElement;
      if (!currentTab.classList.contains('filter-tab')) return;

      const tabsArr = [...tabs];
      const idx     = tabsArr.indexOf(currentTab);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = tabsArr[(idx + 1) % tabsArr.length];
        next.focus();
        next.click();
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = tabsArr[(idx - 1 + tabsArr.length) % tabsArr.length];
        prev.focus();
        prev.click();
      }
    });
  }

})();