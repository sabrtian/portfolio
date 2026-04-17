/* ═══════════════════════════════════════════════════════════════
   HOME PAGE JS — index.js
   Multi-select tag filtering with promoted grid + overflow dropdown
   ═══════════════════════════════════════════════════════════════ */

const ALL_PROJECTS = [
  { id:'jacobs',           year:2025, title:'Urban Infrastructure Dashboards', sub:'Decision-making tools for engineers & planners',     location:'San Francisco',                    tags:['software'],            href:'projects/jacobs.html',                image:'assets/projects/jacobs-dashboards/home-jacobs.png',         featured:true },
  { id:'sensing-garden',   year:2025, title:'Sensing Garden',                  sub:'AI biodiversity hardware',                           location:'Amsterdam & London',               tags:['physical','research'], href:'projects/sensing-garden.html',        image:'assets/projects/sensing-garden/home-sg.png',                featured:true },
  { id:'octous',           year:2025, title:'Octopus',                         sub:'Modular, urban sensing device',                      location:'Amsterdam, Boston, Dubai, Milan',  tags:['physical','research'], href:'https://senseable.mit.edu/octopus/',  image:'assets/projects/octopus/home-octopus.png',                  featured:true },
  { id:'vleur',            year:2023, title:'Vleur',                           sub:'Transforming food waste into personal care products',location:'Tokyo, NYC, Dubai',                tags:['physical','research'], href:'projects/vleur.html',                 image:'assets/projects/vleur/home-vleur.png',                      featured:true },
  { id:'slowing-design',   year:2025, title:'Slowing by Design',               sub:'AI analysis for urban speed compliance',             location:'Amsterdam, Dubai, Milan',          tags:['software','research'],   href:'https://senseable.mit.edu/slowing-design/', image:'assets/projects/slowing-design/home-slowingbydesign.gif' },
  { id:'ubiroot',          year:2024, title:'Ubiroot',                         sub:'Circular supply chain systems',                      location:'London',                           tags:['research','software'],    href:'projects/ubiroot.html',             image:'assets/projects/ubiroot/home-ubiroot.gif' },
  { id:'snap-ar',          year:2023, title:'Oscillating Cultures',            sub:'AI Bias in AR',                                      location:'London',                           tags:['software','craft'],    href:'projects/snap-ar.html',               image:'assets/projects/oscillating-cultures/home-oc.gif' },
  { id:'superbloom',       year:2023, title:'Superbloom',                      sub:'GID return exhibition visual identity',              location:'London',                           tags:['craft'],               href:'projects/superbloom.html',            image:'assets/projects/superbloom/home-superbloom.gif' },
  { id:'plasticraft',      year:2023, title:'PlastiCraft',                     sub:'Waste perception in Japan',                          location:'Tokyo',                            tags:['research'],            href:'projects/plasticraft.html',           image:'assets/projects/plasticraft/home-plasticraft.gif' },
  { id:'akerue',           year:2023, title:'Upcycling Workshop @ AkeruE',     sub:'Panasonic Creative Museum',                          location:'Tokyo',                            tags:['research','physical'], href:'projects/akerue.html',                image:'assets/projects/akerue/home-akerue.gif' },
  { id:'kirage',           year:2023, title:'Kirage',                          sub:'Urban transportation design',                        location:'Tokyo',                            tags:['research','physical'], href:'projects/kirage.html',                image:'assets/projects/kirage/home-kirage.png' },
  { id:'skinsideout',      year:2022, title:'Skinside Out',                    sub:'Biological material design',                         location:'London',                           tags:['physical','craft'],    href:'projects/skinsideout.html',           image:'assets/projects/skinsideout/home-skinsideout.gif' },
  { id:'language',         year:2022, title:'Tactile Language Learning',       sub:'Arduino + machine learning',                         location:'London',                           tags:['physical'],            href:'projects/language.html',              image:'assets/projects/tactile-language/home-language.png' },
  { id:'poolepavilion',    year:2022, title:'Poole Pavilion',                  sub:'Grand Challenge top 12 shortlist',                   location:'London',                           tags:['research','craft'],    href:'projects/poolepavilion.html',         image:'assets/projects/poole-pavilion/home-poole.png' },
  { id:'babblebubble',     year:2022, title:'Babble Bubble',                   sub:'Design psychology, packaging',                       location:'London',                           tags:['craft','research'],    href:'projects/babblebubble.html',          image:'assets/projects/babblebubble/home-bb.jpg' },
  { id:'poldergeist',      year:2022, title:'Poldergeist',                     sub:'Climate change animation — featured on documentary', location:'Netherlands',                      tags:['craft','research'],    href:'projects/poldergeist.html',           image:'assets/projects/poldergeist/home-poldergeist.gif' },
  { id:'test-vemlidy',     year:2022, title:'T.E.S.T with Vemlidy',            sub:'Medical wearable UI/UX',                             location:'New York',                         tags:['software'],            href:null,                                  image:'assets/projects/test-vemlidy/home-test.png' },
  { id:'theia',            year:2021, title:'Theia Health Ventures',           sub:'Web design & brand strategy',                        location:'Philadelphia',                     tags:['software','craft'],    href:'projects/theia.html',                 image:'assets/projects/theia/home-theia.png' },
  { id:'bicgia',           year:2021, title:'Born in China, Grown in America', sub:'Publication design, risograph',                      location:'Philadelphia',                     tags:['craft','research'],    href:'projects/bicgia.html',                image:'assets/projects/bicgia/home-bicgia.png' },
  { id:'scoby',            year:2021, title:'SCOBY: Experiment & Tea Bags',    sub:'Biological design, materials',                       location:'Philadelphia',                     tags:['physical','research'], href:'projects/scoby.html',                 image:'assets/projects/scoby/home-scoby.JPG' },
  { id:'futureofwaste',    year:2021, title:'The Future of Waste',             sub:'Speculative design, 3D modeling',                    location:'Philadelphia',                     tags:['craft','research'],    href:'projects/futureofwaste.html',         image:'assets/projects/future-of-waste/home-waste.png' },
  { id:'heartofvalley',    year:2020, title:"Heart of Valley's Delight",       sub:'Biological design, social impact',                   location:'San Jose',                         tags:['craft','research'],    href:'projects/heartofvalleysdelight.html', image:'assets/projects/heart-of-valley/home-heartofvalley.jpeg' },
  { id:'redesigningmeat',  year:2020, title:'Redesigning Meat',                sub:'Speculative food systems design',                    location:'Philadelphia',                     tags:['craft','research'],    href:'projects/redesigningmeat.html',       image:'assets/projects/redesigningmeat/home-meat.gif' },
  { id:'breakfast',        year:2019, title:'Politics of Breakfast',           sub:'Publication design & design theory',                 location:'Philadelphia',                     tags:['craft','research'],    href:'projects/breakfast.html',             image:'assets/projects/breakfast/bp-m2.png' },
];

ALL_PROJECTS.sort((a, b) => b.year - a.year);

// ── STATE ─────────────────────────────────────────────────────
let activeFilters = new Set();

// ── ELEMENTS ──────────────────────────────────────────────────
const filterBtns      = document.querySelectorAll('.filter-btn');
const filterClear     = document.querySelector('.filter-clear');
const projectsGrid    = document.querySelector('.projects-grid');
const sectionTitle    = document.querySelector('.section-title');
const sectionCount    = document.querySelector('.section-count');
const overflowSection = document.querySelector('.overflow-section');
const overflowList    = document.querySelector('.overflow-list');
const overflowLabel   = document.querySelector('.overflow-label');
const archiveSection  = document.querySelector('.archive-section');

// Snapshot original featured card ELEMENTS (detached from DOM when needed)
const featuredCards = [...document.querySelectorAll('.project-card[data-id]')];

// ── MAKE CARDS VISIBLE (bypasses IntersectionObserver after re-insert) ──
function showCards(cards) {
  cards.forEach((card, i) => {
    // Small stagger so it feels animated even on re-render
    setTimeout(() => card.classList.add('visible'), i * 60);
  });
}

// ── INITIAL PAGE LOAD: show featured cards ────────────────────
// The fade-up observer in main.js handles first load,
// but we also mark them visible immediately as a fallback.
window.addEventListener('DOMContentLoaded', () => {
  showCards(featuredCards);
});

// ── FILTER CLICKS ─────────────────────────────────────────────
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    if (activeFilters.has(f)) {
      activeFilters.delete(f);
      btn.classList.remove('active');
    } else {
      activeFilters.add(f);
      btn.classList.add('active');
    }
    render();
  });
});

filterClear?.addEventListener('click', () => {
  activeFilters.clear();
  filterBtns.forEach(b => b.classList.remove('active'));
  render();
});

// ── RENDER ────────────────────────────────────────────────────
function render() {
  const hasFilters = activeFilters.size > 0;
  if (filterClear) filterClear.classList.toggle('visible', hasFilters);
  hasFilters ? renderFiltered() : renderDefault();
}

function renderDefault() {
  projectsGrid.innerHTML = '';

  // Re-insert original featured cards and make them visible
  featuredCards.forEach(card => {
    card.style.display = '';
    projectsGrid.appendChild(card);
  });
  showCards(featuredCards);

  sectionTitle.textContent = 'Selected Work';
  sectionCount.textContent = '04 projects';

  if (overflowSection) overflowSection.classList.remove('visible');
  if (archiveSection)  archiveSection.style.display = '';
}

function renderFiltered() {
  const filters   = [...activeFilters];
  const matched   = ALL_PROJECTS.filter(p => p.tags.some(t => filters.includes(t)));
  const unmatched = ALL_PROJECTS.filter(p => !p.tags.some(t => filters.includes(t)));

  projectsGrid.innerHTML = '';

  if (matched.length === 0) {
    const nr = document.createElement('p');
    nr.className = 'no-results';
    nr.style.display = 'block';
    nr.textContent = 'No projects match this filter.';
    projectsGrid.appendChild(nr);
  } else {
    const insertedCards = [];
    matched.forEach(project => {
      const existing = featuredCards.find(c => c.dataset.id === project.id);
      if (existing) {
        existing.style.display = '';
        projectsGrid.appendChild(existing);
        insertedCards.push(existing);
      } else {
        const card = buildCard(project);
        projectsGrid.appendChild(card);
        insertedCards.push(card);
      }
    });
    showCards(insertedCards);
  }

  const tagLabels = filters.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(' + ');
  sectionTitle.textContent = tagLabels;
  sectionCount.textContent = `${String(matched.length).padStart(2,'0')} project${matched.length !== 1 ? 's' : ''}`;

  if (overflowSection && overflowList) {
    if (unmatched.length > 0) {
      overflowSection.classList.add('visible');
      if (overflowLabel) overflowLabel.textContent = `Other projects — ${unmatched.length}`;
      overflowList.innerHTML = '';
      unmatched.forEach((p, i) => overflowList.appendChild(buildArchiveRow(p, i + matched.length + 1)));
    } else {
      overflowSection.classList.remove('visible');
    }
  }

  if (archiveSection) archiveSection.style.display = 'none';
}

// ── BUILD CARD ────────────────────────────────────────────────
function buildCard(project) {
  const noLink = !project.href || project.href === 'project.html';
  const a = document.createElement(noLink ? 'div' : 'a');
  if (!noLink) {
    a.href = project.href;
    if (project.href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  }
  a.className = 'project-card fade-up';
  a.dataset.id   = project.id;
  a.dataset.tags = project.tags.join(' ');
  a.dataset.year = project.year;

  const tagPills = project.tags.map(t => {
    const cls = t === 'physical' ? 'physical' : t === 'software' ? 'software' : t === 'research' ? 'research' : t === 'craft' ? 'craft' : '';
    return `<span class="ptag ${cls}">${t.charAt(0).toUpperCase() + t.slice(1)}</span>`;
  }).join('');

  a.innerHTML = `
    <div class="project-image">
      ${project.image ? `<img src="${project.image}" alt="${project.title}">` : `<div class="project-image-placeholder">[ ${project.title.toLowerCase()} ]</div>`}
    </div>
    <div class="project-body">
      <div class="project-meta">
        <div class="project-meta-left">
          <span class="project-year">${project.year}</span>
          <span class="ptag location">${project.location}</span>
        </div>
        <div class="project-meta-right">
          ${tagPills}
        </div>
      </div>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-subtitle">${project.sub}</p>
    </div>
    ${noLink ? '' : '<span class="project-arrow" aria-hidden="true">&#x2197;&#xFE0E;</span>'}
  `;
  return a;
}

// ── BUILD ARCHIVE ROW ─────────────────────────────────────────
function buildArchiveRow(project, num) {
  const a = document.createElement('a');
  a.href = project.href;
  a.className = 'archive-item';
  if (project.href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }

  const tagPills = project.tags.map(t => {
    const cls = t === 'physical' ? 'physical' : t === 'software' ? 'software' : t === 'research' ? 'research' : t === 'craft' ? 'craft' : '';
    return `<span class="ptag ${cls}">${t.charAt(0).toUpperCase() + t.slice(1)}</span>`;
  }).join('');

  a.innerHTML = `
    <span class="archive-num">${String(num).padStart(2,'0')}</span>
    <span class="archive-name">${project.title}</span>
    <div class="archive-middle">
      <span class="archive-sub">${project.sub}</span>
      <span class="archive-sep">|</span>
      <span class="archive-location">${project.location}</span>
    </div>
    <div class="archive-tags">${tagPills}</div>
  `;
  return a;
}

// ── ARCHIVE HOVER PREVIEW ─────────────────────────────────────
// Each row gets a consistent offset so images feel scattered, not stacked.
const SCATTER_OFFSETS = [
  { x: 24,  y: -180 },
  { x: 32,  y: -20  },
  { x: 20,  y: -140 },
  { x: 40,  y: -60  },
  { x: 16,  y: -200 },
  { x: 28,  y: -100 },
  { x: 36,  y: -40  },
  { x: 12,  y: -160 },
];

(function initArchivePreview() {
  // Hover previews are mouse-only — skip on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const preview = document.createElement('div');
  preview.className = 'archive-preview';
  const img = document.createElement('img');
  preview.appendChild(img);
  document.body.appendChild(preview);

  function attachPreview(item, index) {
    const src = item.dataset.preview;
    if (!src) return;
    const offset = SCATTER_OFFSETS[index % SCATTER_OFFSETS.length];

    item.addEventListener('mouseenter', () => {
      img.src = src;
      preview.classList.add('visible');
    });

    item.addEventListener('mousemove', e => {
      preview.style.left = (e.clientX + offset.x) + 'px';
      preview.style.top  = (e.clientY + offset.y) + 'px';
    });

    item.addEventListener('mouseleave', () => {
      preview.classList.remove('visible');
    });
  }

  // Attach to static archive items
  document.querySelectorAll('.archive-item[data-preview]').forEach((item, i) => {
    item._previewAttached = true;
    attachPreview(item, i);
  });

  // Re-attach whenever overflow list is populated (filtered view)
  const observer = new MutationObserver(() => {
    document.querySelectorAll('.archive-item[data-preview]').forEach((item, i) => {
      if (!item._previewAttached) {
        item._previewAttached = true;
        attachPreview(item, i);
      }
    });
  });
  const overflowList = document.querySelector('.overflow-list');
  if (overflowList) observer.observe(overflowList, { childList: true });
})();

// ── OVERFLOW TOGGLE ───────────────────────────────────────────
function toggleOverflow(btn) {
  const list   = document.querySelector('.overflow-list');
  const isOpen = list.classList.contains('open');
  list.classList.toggle('open');
  btn.classList.toggle('open');
  btn.setAttribute('aria-expanded', !isOpen);
}

// ── ARCHIVE TOGGLE (default view) ────────────────────────────
function toggleArchive(btn) {
  const list   = document.getElementById('archiveList');
  const isOpen = list.classList.contains('open');
  list.classList.toggle('open');
  btn.classList.toggle('open');
  btn.setAttribute('aria-expanded', !isOpen);
  const label = btn.querySelector('.archive-label');
  if (label) label.textContent = isOpen ? 'Archive — 16 more projects' : 'Archive — collapse';
}

// ── RESTORE ARCHIVE STATE ─────────────────────────────────────
// If user navigated here from a project page, re-expand the archive.
window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('archiveOpen') === '1') {
    sessionStorage.removeItem('archiveOpen');
    const btn  = document.querySelector('.archive-toggle');
    const list = document.getElementById('archiveList');
    if (btn && list && !list.classList.contains('open')) {
      list.classList.add('open');
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      const label = btn.querySelector('.archive-label');
      if (label) label.textContent = 'Archive — collapse';
    }
  }
});

// Set flag whenever an archive-item link is followed
document.addEventListener('click', e => {
  const item = e.target.closest('#archiveList .archive-item');
  if (item) sessionStorage.setItem('archiveOpen', '1');
});
