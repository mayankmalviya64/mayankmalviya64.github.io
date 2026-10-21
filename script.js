// Edit this collection when project descriptions or destinations change.
const projects = {
  cv: {title:'CV Builder',category:'USEFUL TOOLS / CAREERS',icon:'▤',color:'#dbea9f',description:'A focused CV builder for fitting your experience onto one carefully formatted page. Spend less time wrestling with spacing and more time telling your story.',tags:['Career tools','One-page CV','Web app'],url:'https://mayankmalviya64.github.io/cv-builder/'},
  spotify: {title:'Spotify Lyrics Pop-Out',category:'USEFUL TOOLS / MUSIC',icon:'♫',color:'#c7ddd0',description:'Time-synced Spotify lyrics in a movable Picture-in-Picture window. Keep the words alongside whatever you’re doing, without hopping back to the music tab.',tags:['Chrome extension','Music','Picture-in-Picture'],url:'https://chromewebstore.google.com/detail/spotify-lyrics-pop-out/iefmjdliplhckfhclcjkpcbdahknciih'},
  company: {title:'Company Overview',category:'EXPLORE & LEARN / BUSINESS',icon:'⌘',color:'#d6cce7',description:'Explore the businesses behind familiar names. Company briefs bring together business structure, products, and research in an approachable format for MBA preparation.',tags:['Business research','MBA prep','Interactive guides'],url:'https://mayankmalviya64.github.io/company-overview/'},
  spirit: {title:'Spirit Atlas',category:'EXPLORE & LEARN / EDITORIAL',icon:'✧',color:'#f0c6a7',description:'An explorable guide to the world of spirits: ingredients, processes, and the stories that connect them. An editorial rabbit hole, from grain to glass.',tags:['Interactive atlas','Editorial','Discovery'],url:'https://mayankmalviya64.github.io/spirit-atlas/'},
  listenr: {title:'Listenr',category:'USEFUL TOOLS / READING',icon:'≋',color:'#c9dce9',description:'A reading and listening experiment that gives text another way to be experienced. Explore the Listenr web app and its approach to listening on the web.',tags:['Audio','Reading','Web app'],url:'https://mayankmalviya64.github.io/listenr-web/'},
  otif: {title:'OTIF Intelligence',category:'EXPLORE & LEARN / ANALYTICS',icon:'↗',color:'#e9dfa6',description:'An AI-enabled on-time, in-full performance analysis project for KOSMIC Case 10. An exploration of delivery performance through data and business analysis.',tags:['Supply chain','Analytics','Case competition'],url:'https://github.com/mayankmalviya64/kearney-otif-analysis'}
};
const dialog = document.querySelector('#project-dialog');
const bubbles = [...document.querySelectorAll('.bubble')];
const playground = document.querySelector('#playground');
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
  document.querySelector('#dialog-link').textContent = bubble.dataset.project === 'otif' ? 'Explore on GitHub ↗' : 'Explore project ↗';
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
  // Spread the filtered group across desktop; mobile uses a two-column grid.
  visible.forEach((bubble, index) => bubble.style.setProperty('--filtered-x', `${5 + index * 32}%`));
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
