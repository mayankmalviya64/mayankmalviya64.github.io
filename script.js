// Edit this collection when project descriptions or destinations change.
const projects = {
  cv: {title:'CV Builder',category:'USEFUL TOOLS / CAREERS',icon:'▤',color:'#dbea9f',description:'A focused CV builder for fitting your experience onto one carefully formatted page. Spend less time wrestling with spacing and more time telling your story.',tags:['Career tools','One-page CV','Web app'],url:'https://mayankmalviya64.github.io/cv-builder/'},
  spotify: {title:'Spotify Lyrics Pop-Out',category:'USEFUL TOOLS / MUSIC',icon:'♫',color:'#c7ddd0',description:'Time-synced Spotify lyrics in a movable Picture-in-Picture window. Keep the words alongside whatever you’re doing, without hopping back to the music tab.',tags:['Chrome extension','Music','Picture-in-Picture'],url:'https://chromewebstore.google.com/detail/spotify-lyrics-pop-out/iefmjdliplhckfhclcjkpcbdahknciih'},
  company: {title:'Company Overview',category:'EXPLORE & LEARN / BUSINESS',icon:'⌘',color:'#d6cce7',description:'Explore the businesses behind familiar names. Company briefs bring together business structure, products, and research in an approachable format for MBA preparation.',tags:['Business research','MBA prep','Interactive guides'],url:'https://mayankmalviya64.github.io/company-overview/'},
  spirit: {title:'Spirit Atlas',category:'EXPLORE & LEARN / EDITORIAL',icon:'✧',color:'#f0c6a7',description:'An explorable guide to the world of spirits: ingredients, processes, and the stories that connect them. An editorial rabbit hole, from grain to glass.',tags:['Interactive atlas','Editorial','Discovery'],url:'https://mayankmalviya64.github.io/spirit-atlas/'},
  listenr: {title:'Listenr',category:'USEFUL TOOLS / READING',icon:'≋',color:'#c9dce9',description:'A reading and listening experiment that gives text another way to be experienced. Explore the Listenr web app and its approach to listening on the web.',tags:['Audio','Reading','Web app'],url:'https://mayankmalviya64.github.io/listenr-web/'},
  otif: {title:'OTIF Sentinel',category:'EXPLORE & LEARN / ANALYTICS',icon:'↗',color:'#e9dfa6',description:'An AI-enabled on-time, in-full performance analysis project for KOSMIC Case 10. Explore the OTIF Sentinel dashboard for a closer look at delivery performance through data and business analysis.',tags:['Supply chain','Analytics','Case competition'],url:'https://mayankmalviya64.github.io/kearney-otif-analysis/otif-sentinel.html'},
  tracker: {title:'Unstop Case Comp Tracker',category:'USEFUL TOOLS / COMPETITIONS',icon:'⚑',color:'#eed0cc',description:'A Chrome extension for tracking Unstop case competitions, upcoming rounds, and deadlines. Keep your competition calendar and progress in one place.',tags:['Chrome extension','Unstop','Deadline tracking'],url:'https://casecomptracker.me/'},
  reviewradar: {title:'ReviewRadar',category:'USEFUL TOOLS / PRODUCT INSIGHTS',icon:'◎',color:'#c7ded8',description:'Turn Google Play reviews into evidence-backed product intelligence. Explore sentiment, liked features, recurring complaints, and feature requests to understand what users are saying.',tags:['Product intelligence','Review analysis','AI'],url:'https://mayankmalviya64.github.io/reviewradar/'},
  between: {title:'Between Lines',category:'USEFUL TOOLS / CONVERSATION INSIGHTS',icon:'❝',color:'#e5cfe0',description:'A private, browser-based tool for exploring WhatsApp conversations. Discover response patterns, initiative, and conversation rhythms, with local analysis that keeps your chat in your browser.',tags:['Conversation insights','WhatsApp','Local analysis'],url:'https://mayankmalviya64.github.io/between-lines/'},
  drishti: {title:'Drishti AI',category:'EXPLORE & LEARN / MARKETING AI',icon:'◈',color:'#d2d6ee',description:'A team of AI agents that sits above Meta, Google and OTT ad managers, spots wasted ad spend every hour, fixes it within guardrails, and grades itself on true revenue. Built for Abhikalp 2026 — explore the story and a live playground.',tags:['AI agents','Ad spend','Case competition'],url:'https://mayankmalviya64.github.io/drishti-ai/'},
  dsat: {title:'DSAT Simulator',category:'EXPLORE & LEARN / OPERATIONS',icon:'⇅',color:'#f1dcb9',description:'An interactive lever model for a customer-dissatisfaction (DSAT) operations case. Move contact mix, agent tenure or volume, and nine linked modules show what changed, why, and what to do next.',tags:['Operational excellence','DMAIC','Simulation'],url:'https://mayankmalviya64.github.io/dsat-simulator/'},
  quizmaker: {title:'Quizmaker',category:'USEFUL TOOLS / LEARNING',icon:'✓',color:'#d9e4c3',description:'A timed, one-question-at-a-time MCQ test app. Import your own quiz from JSON, TXT or Markdown, get instant feedback with explanations, and retry only the questions you got wrong.',tags:['Self-testing','Timed quiz','Study tool'],url:'https://mayankmalviya64.github.io/quizmaker/'}
};
const dialog = document.querySelector('#project-dialog');
const bubbles = [...document.querySelectorAll('.bubble')];
const playground = document.querySelector('#playground');
document.querySelector('[data-filter="all"] small').textContent = String(bubbles.length).padStart(2, '0');
// One non-modal preview follows the active bubble without blocking the page.
// Links retain normal browser behavior, including opening in a new tab.
let activeBubble = null;
let closeTimer;
function closePreview() {
  clearTimeout(closeTimer);
  dialog.hidden = true;
  activeBubble?.setAttribute('aria-expanded', 'false');
  bubbles.forEach(item => delete item.dataset.touchReady);
  activeBubble = null;
}
function positionPreview() {
  if (!activeBubble) return;
  const bounds = activeBubble.getBoundingClientRect();
  const gap = 14;
  const width = dialog.offsetWidth;
  const height = dialog.offsetHeight;
  // Prefer beside the bubble; clamp both axes to keep the preview onscreen.
  const beside = bounds.right + gap + width <= innerWidth;
  const left = beside ? bounds.right + gap : bounds.left - width - gap;
  dialog.style.left = `${Math.max(12, Math.min(left, innerWidth - width - 12))}px`;
  dialog.style.top = `${Math.max(12, Math.min(bounds.top, innerHeight - height - 12))}px`;
}
function showPreview(bubble) {
  clearTimeout(closeTimer);
  activeBubble?.setAttribute('aria-expanded', 'false');
  activeBubble = bubble;
  const project = projects[bubble.dataset.project];
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-description').textContent = project.description;
  const icon = document.querySelector('#dialog-icon');
  icon.textContent = project.icon;
  icon.style.background = project.color;
  document.querySelector('#dialog-link').href = project.url;
  document.querySelector('#dialog-tags').replaceChildren(...project.tags.map(label => {
    const tag = document.createElement('span');
    tag.textContent = label;
    return tag;
  }));
  dialog.hidden = false;
  bubble.setAttribute('aria-expanded', 'true');
  positionPreview();
}
function scheduleClose() {
  // The delay lets the pointer cross the gap into the preview and its link.
  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    if (!dialog.matches(':hover') && !dialog.contains(document.activeElement)) closePreview();
  }, 220);
}
bubbles.forEach(bubble => {
  bubble.setAttribute('aria-controls', 'project-dialog');
  bubble.setAttribute('aria-expanded', 'false');
  bubble.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') showPreview(bubble);
  });
  bubble.addEventListener('pointerleave', scheduleClose);
  bubble.addEventListener('focus', () => showPreview(bubble));
  bubble.addEventListener('blur', scheduleClose);
  // Touch has no hover: first tap previews, then use Explore project or tap again.
  bubble.addEventListener('click', event => {
    if (window.matchMedia('(hover: none)').matches && bubble.dataset.touchReady !== 'true') {
      event.preventDefault();
      bubbles.forEach(item => delete item.dataset.touchReady);
      bubble.dataset.touchReady = 'true';
      showPreview(bubble);
    }
  });
});
dialog.addEventListener('pointerenter', () => clearTimeout(closeTimer));
dialog.addEventListener('pointerleave', scheduleClose);
dialog.addEventListener('focusout', scheduleClose);
document.querySelector('#close-dialog').addEventListener('click', closePreview);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closePreview(); });
document.addEventListener('pointerdown', event => {
  if (!dialog.contains(event.target) && !event.target.closest('.bubble')) {
    closePreview();
    bubbles.forEach(item => delete item.dataset.touchReady);
  }
});
window.addEventListener('scroll', closePreview, { passive: true });
window.addEventListener('resize', closePreview);
// Hover opens case context. Clicking the summary pins it open, and touch/keyboard
// users can use the native disclosure without relying on hover.
document.querySelectorAll('.case-card').forEach(card => {
  const details = card.querySelector('details');
  let pinned = false;
  details.querySelector('summary').addEventListener('click', event => {
    event.preventDefault();
    pinned = !pinned;
    details.open = pinned;
  });
  card.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') details.open = true;
  });
  card.addEventListener('pointerleave', () => {
    if (!pinned && !card.contains(document.activeElement)) details.open = false;
  });
  card.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (!pinned && !card.matches(':hover') && !card.contains(document.activeElement)) details.open = false;
    });
  });
});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  closePreview();
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  const visible = bubbles.filter(bubble => filter === 'all' || bubble.dataset.category === filter);
  bubbles.forEach(bubble => { bubble.hidden = !visible.includes(bubble); });
  // CSS grid reflows any number of filtered projects without clipping bubbles.
  playground.classList.toggle('filtered', filter !== 'all');
  document.querySelector('#project-count').textContent = `${String(visible.length).padStart(2,'0')} PROJECTS · ${filter === 'all' ? 'IN NO PARTICULAR ORBIT' : button.textContent.trim().toUpperCase()}`;
}));
const motion = document.querySelector('#motion');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches;
function updateMotion() {
  playground.classList.toggle('paused', paused);
  motion.setAttribute('aria-pressed', String(paused));
  motion.textContent = paused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
  // Respect the operating-system preference before the local animation toggle.
  motion.disabled = reducedMotion.matches;
  if (reducedMotion.matches) motion.textContent = 'Reduced motion on';
}
motion.addEventListener('click', () => { paused = !paused; updateMotion(); });
reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updateMotion(); });
updateMotion();
document.querySelector('#year').textContent = new Date().getFullYear();
