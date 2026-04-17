/* ═══════════════════════════════════════════════════════════════
   SABRINA TIAN PORTFOLIO — MAIN JS
   Shared across all pages.
   ═══════════════════════════════════════════════════════════════ */

// ── THEME TOGGLE ──────────────────────────────────────────────
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// ── MOBILE NAV ────────────────────────────────────────────────
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

// Close mobile menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── FADE-UP ON SCROLL ─────────────────────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target); // stop watching once visible
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// Stagger children with fade-up within a container
document.querySelectorAll('[data-stagger]').forEach(container => {
  container.querySelectorAll('.fade-up').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
  });
});

// ── SMOOTH SCROLL FOR IN-PAGE LINKS ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.querySelector('nav')?.offsetHeight || 64;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset - 20,
        behavior: 'smooth'
      });
    }
  });
});

// ── DEVTOOLS / INSPECT DETERRENCE ────────────────────────────
// Note: this is a soft deterrent, not a hard block.
// Determined users can always work around these.
(function() {
  // Disable right-click context menu
  document.addEventListener('contextmenu', e => e.preventDefault());

  // Block common keyboard shortcuts for inspect / view source
  document.addEventListener('keydown', e => {
    const forbidden = (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I','J','C','K'].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && e.key === 'U') ||   // View source
      (e.metaKey && e.altKey && e.key === 'I') // Mac devtools
    );
    if (forbidden) e.preventDefault();
  });

  // Detect if devtools is open and show a gentle message (desktop only)
  if (window.matchMedia('(hover: none)').matches) return;
  let devtoolsOpen = false;
  const threshold = 160;

  setInterval(() => {
    const widthDiff  = window.outerWidth  - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    const isOpen = widthDiff > threshold || heightDiff > threshold;

    if (isOpen && !devtoolsOpen) {
      devtoolsOpen = true;
      showDevtoolsMessage();
    } else if (!isOpen && devtoolsOpen) {
      devtoolsOpen = false;
      hideDevtoolsMessage();
    }
  }, 1000);

  function showDevtoolsMessage() {
    if (document.getElementById('devtools-msg')) return;
    const el = document.createElement('div');
    el.id = 'devtools-msg';
    el.style.cssText = `
      position: fixed; bottom: 1.5rem; right: 1.5rem;
      background: #1A1814; color: #FAF8F4;
      font-family: 'DM Mono', monospace; font-size: 0.65rem;
      letter-spacing: 0.08em; line-height: 1.6;
      padding: 1rem 1.25rem; border-radius: 2px;
      z-index: 99999; max-width: 280px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.2);
    `;
    el.innerHTML = `
      Reach out if you'd like to collaborate 🌱<br>
      <a href="mailto:sabrina.c.tian@gmail.com" style="color:#B85C38;text-decoration:none;">
        sabrina.c.tian@gmail.com
      </a>
    `;
    document.body.appendChild(el);
  }

  function hideDevtoolsMessage() {
    document.getElementById('devtools-msg')?.remove();
  }

  // Disable text selection on images only (allow text copying)
  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.style.userSelect = 'none';
    img.style.webkitUserSelect = 'none';
    img.style.pointerEvents = 'none'; // prevents drag-to-save
  });
})();
