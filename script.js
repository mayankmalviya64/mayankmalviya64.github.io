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
  between: {title:'Between Lines',category:'USEFUL TOOLS / CONVERSATION INSIGHTS',icon:'❝',color:'#e5cfe0',description:'A private, browser-based tool for exploring WhatsApp conversations. Discover response patterns, initiative, and conversation rhythms, with local analysis that keeps your chat in your browser.',tags:['Conversation insights','WhatsApp','Local analysis'],url:'https://mayankmalviya64.github.io/between-lines/'}
};
const dialog = document.querySelector('#project-dialog');
const bubbles = [...document.querySelectorAll('.bubble')];
const playground = document.querySelector('#playground');
document.querySelector('[data-filter="all"] small').textContent = String(bubbles.length).padStart(2, '0');
// The native dialog handles Escape, keyboard focus, and focus restoration.
bubbles.forEach(bubble => bubble.addEventListener('click', () => {
  const project = projects[bubble.dataset.project];
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-description').textContent = project.description;
  const icon = document.querySelector('#dialog-icon');
  icon.textContent = project.icon;
  icon.style.background = project.color;
  document.querySelector('#dialog-link').href = project.url;
  document.querySelector('#dialog-link').textContent = 'Explore project ↗';
  document.querySelector('#dialog-tags').replaceChildren(...project.tags.map(label => {
    const tag = document.createElement('span');
    tag.textContent = label;
    return tag;
  }));
  dialog.showModal();
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
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
