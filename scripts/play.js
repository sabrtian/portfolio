/* ═══════════════════════════════════════════════════════════════
   PLAY PAGE JS — play.js
   Draggable scattered objects, ambient interactions
   ═══════════════════════════════════════════════════════════════ */

// ── SCATTER POSITIONS ─────────────────────────────────────────
// These are the hand-tuned positions for each object on desktop.
// Coordinates are in % of the container width/height.
// Adjust these to change the layout.
const scatterPositions = [
  { left: '4%',   top: '5%',   rotate: '-2deg'  },
  { left: '26%',  top: '2%',   rotate: '1.5deg' },
  { left: '50%',  top: '7%',   rotate: '-1deg'  },
  { left: '72%',  top: '3%',   rotate: '2deg'   },
  { left: '8%',   top: '46%',  rotate: '1deg'   },
  { left: '30%',  top: '50%',  rotate: '-2.5deg'},
  { left: '56%',  top: '44%',  rotate: '1.5deg' },
  { left: '76%',  top: '48%',  rotate: '-1deg'  },
];

// ── INIT POSITIONS ────────────────────────────────────────────
const objects = document.querySelectorAll('.play-object');
const field   = document.querySelector('.objects-field');
const isMobile = () => window.innerWidth <= 900;

function applyScatterLayout() {
  if (isMobile()) return; // mobile uses CSS grid instead

  const h = field.getBoundingClientRect().height || 600;
  field.style.minHeight = Math.max(h, 640) + 'px';

  objects.forEach((obj, i) => {
    const pos = scatterPositions[i] || {
      left: `${10 + (i % 4) * 22}%`,
      top:  `${5  + Math.floor(i / 4) * 48}%`,
      rotate: `${(i % 3 - 1) * 2}deg`
    };

    obj.style.left    = pos.left;
    obj.style.top     = pos.top;
    obj.style.transform = `rotate(${pos.rotate})`;
  });
}

applyScatterLayout();

// ── DRAG BEHAVIOR ─────────────────────────────────────────────
let dragging = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let hasDragged = false;

objects.forEach(obj => {
  obj.addEventListener('mousedown', startDrag);
  obj.addEventListener('touchstart', startDrag, { passive: true });
});

function startDrag(e) {
  if (isMobile()) return;

  dragging = e.currentTarget;
  dragging.style.zIndex = 20;
  dragging.style.transition = 'box-shadow 0.2s, z-index 0s';

  const rect = dragging.getBoundingClientRect();
  const fieldRect = field.getBoundingClientRect();
  const touch = e.touches?.[0] || e;

  dragOffsetX = touch.clientX - rect.left;
  dragOffsetY = touch.clientY - rect.top;

  // Store original position for transform calculation
  dragging._originLeft = rect.left - fieldRect.left;
  dragging._originTop  = rect.top  - fieldRect.top;

  // Switch to pixel positioning
  dragging.style.left      = dragging._originLeft + 'px';
  dragging.style.top       = dragging._originTop  + 'px';
  dragging.style.transform = 'rotate(0deg) scale(1.03)';

  hasDragged = false;
}

document.addEventListener('mousemove', onDrag);
document.addEventListener('touchmove', onDrag, { passive: true });

function onDrag(e) {
  if (!dragging) return;

  const touch = e.touches?.[0] || e;
  const fieldRect = field.getBoundingClientRect();

  const x = touch.clientX - fieldRect.left - dragOffsetX;
  const y = touch.clientY - fieldRect.top  - dragOffsetY;

  dragging.style.left = x + 'px';
  dragging.style.top  = y + 'px';
  hasDragged = true;
}

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function endDrag(e) {
  if (!dragging) return;

  dragging.style.zIndex    = 2;
  dragging.style.transform = 'rotate(0deg) scale(1)';
  dragging.style.transition = '';

  // Prevent click-through if user actually dragged
  if (hasDragged) {
    const link = dragging.querySelector('a') || dragging;
    const stop = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      link.removeEventListener('click', stop);
    };
    dragging.addEventListener('click', stop, { once: true });
  }

  dragging = null;
  hasDragged = false;
}

// ── DRAG HINT: fade out after first drag ─────────────────────
const dragHint = document.querySelector('.drag-hint');
let hintFaded  = false;

function fadeHint() {
  if (hintFaded) return;
  hintFaded = true;
  if (dragHint) {
    dragHint.classList.add('faded');
    setTimeout(() => dragHint?.remove(), 1200);
  }
}

// Fade hint on first drag or after 5s
setTimeout(fadeHint, 5000);
document.addEventListener('mousedown', (e) => {
  if (e.target.closest('.play-object')) setTimeout(fadeHint, 800);
});

// ── HOVER TILT ────────────────────────────────────────────────
objects.forEach(obj => {
  const card = obj.querySelector('.object-card');
  if (!card) return;

  obj.addEventListener('mousemove', (e) => {
    if (isMobile() || dragging) return;
    const rect  = card.getBoundingClientRect();
    const cx    = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy    = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${cx * 6}deg) rotateX(${-cy * 6}deg)`;
  });

  obj.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── DRAW CONNECTOR LINES (SVG) ───────────────────────────────
// Draws faint lines between related objects on desktop
function drawConnectors() {
  if (isMobile()) return;

  const svg = document.querySelector('.connector-svg');
  if (!svg) return;

  svg.innerHTML = '';
  const fieldRect = field.getBoundingClientRect();

  // Define which objects connect to which (by index)
  const connections = [[0,2],[1,5],[3,7],[4,6],[2,5]];

  connections.forEach(([a, b]) => {
    if (!objects[a] || !objects[b]) return;

    const ra = objects[a].getBoundingClientRect();
    const rb = objects[b].getBoundingClientRect();

    const x1 = ra.left + ra.width  / 2 - fieldRect.left;
    const y1 = ra.top  + ra.height / 2 - fieldRect.top;
    const x2 = rb.left + rb.width  / 2 - fieldRect.left;
    const y2 = rb.top  + rb.height / 2 - fieldRect.top;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#1A1814');
    line.setAttribute('stroke-width', '0.5');
    line.setAttribute('stroke-dasharray', '4 6');

    svg.appendChild(line);
  });
}

// ── RE-LAYOUT ON RESIZE ───────────────────────────────────────
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (!isMobile()) {
      applyScatterLayout();
      setTimeout(drawConnectors, 100);
    }
  }, 200);
});

// Init connectors after layout settles
setTimeout(drawConnectors, 300);
