/* Kiki eSIM screen review — search, side-by-side pairing, crosshair coordinates. */

let DATA = null, LIST = [], CUR = null, CAT = null;

const $ = (id) => document.getElementById(id);

fetch('data/screens.json')
  .then((r) => r.json())
  .then((d) => {
    DATA = d;
    LIST = d.screens;
    $('build').textContent = `build ${d.build} · ${d.device} · ${d.count} screens · ${d.coordinate_system}`;
    buildFilters();
    render(LIST);
    fromHash();
  })
  .catch(() => { $('grid').textContent = 'Could not load data/screens.json'; });

/* ---------- search ---------- */

// "3", "003", "S3", "S003", "s003-b", a name, a route, a category, a tier.
function search(raw) {
  const q = raw.trim().toLowerCase();
  if (!q) return LIST;

  const el = q.match(/^s?(\d{1,3})\s*-\s*([a-d])$/i);       // S003-B
  if (el) {
    const n = parseInt(el[1], 10);
    return LIST.filter((s) => s.number === n);
  }
  const num = q.match(/^s?0*(\d{1,3})$/i);                   // 3 / 003 / S003
  if (num) {
    const n = parseInt(num[1], 10);
    const hit = LIST.filter((s) => s.number === n);
    if (hit.length) return hit;
  }
  return LIST.filter((s) =>
    [s.id, s.name, s.slug, s.category, s.category_name, s.tier, s.state,
     s.route || '', s.source_file].join(' ').toLowerCase().includes(q));
}

$('q').addEventListener('input', (e) => {
  const res = search(e.target.value);
  render(CAT ? res.filter((s) => s.category === CAT) : res);
  if (res.length === 1) show(res[0]);
});

/* ---------- filters ---------- */

function buildFilters() {
  const cats = [...new Set(LIST.map((s) => s.category))].sort();
  const wrap = $('filters');
  const mk = (label, value) => {
    const b = document.createElement('button');
    b.textContent = label;
    b.setAttribute('aria-pressed', String(CAT === value));
    b.onclick = () => {
      CAT = CAT === value ? null : value;
      buildFilters();
      const res = search($('q').value);
      render(CAT ? res.filter((s) => s.category === CAT) : res);
    };
    return b;
  };
  wrap.replaceChildren(mk(`All ${LIST.length}`, null));
  cats.forEach((c) => {
    const n = LIST.filter((s) => s.category === c).length;
    const name = LIST.find((s) => s.category === c).category_name;
    wrap.appendChild(mk(`${name} ${n}`, c));
  });
}

/* ---------- grid ---------- */

function render(items) {
  const g = $('grid');
  g.replaceChildren();
  $('empty').hidden = items.length > 0;
  items.forEach((s) => {
    const b = document.createElement('button');
    b.className = 'tile';
    b.onclick = () => show(s);
    const img = document.createElement('img');
    img.loading = 'lazy'; img.src = s.original; img.alt = `${s.id} ${s.name}`;
    const d = document.createElement('div');
    d.innerHTML = `<div class="t-id">${s.id}</div><div class="t-name"></div><div class="t-cat"></div>`;
    d.querySelector('.t-name').textContent = s.name;
    d.querySelector('.t-cat').textContent = `${s.category_name} · ${s.state}`;
    b.append(img, d);
    g.appendChild(b);
  });
}

/* ---------- viewer ---------- */

function show(s) {
  CUR = s;
  $('viewer').hidden = false;
  $('v-id').textContent = s.id;
  $('v-name').textContent = s.name;

  const meta = $('v-meta');
  meta.replaceChildren();
  const bits = [
    ['Category', s.category_name],
    ['Tier', s.tier],
    ['State', s.state],
    ['Route', s.route || 'not mapped'],
    ['Size', `${s.points.w} × ${s.points.h} pt (${s.pixels.w} × ${s.pixels.h} px)`],
    ['Source', s.source_file],
  ];
  bits.forEach(([k, v]) => {
    const span = document.createElement('span');
    span.innerHTML = `${k}: <code></code>`;
    span.querySelector('code').textContent = v;
    meta.appendChild(span);
  });

  $('v-orig').src = s.original;  $('v-orig').alt = `${s.id} ${s.name} original`;
  $('v-anno').src = s.annotated; $('v-anno').alt = `${s.id} ${s.name} annotated`;
  $('v-o-full').href = s.original;
  $('v-a-full').href = s.annotated;

  const r = $('v-regions');
  r.replaceChildren();
  s.regions.forEach((rg) => {
    const el = document.createElement('span');
    el.innerHTML = '<b></b> — <i></i> · Y <em></em> pt';
    el.querySelector('b').textContent = rg.id;
    el.querySelector('i').textContent = rg.label;
    el.querySelector('em').textContent = `${rg.y_from}–${rg.y_to}`;
    r.appendChild(el);
  });

  history.replaceState(null, '', '#' + s.id);
  $('viewer').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function step(delta) {
  if (!CUR) return;
  const i = LIST.findIndex((s) => s.id === CUR.id);
  const n = LIST[(i + delta + LIST.length) % LIST.length];
  show(n);
}
$('prev').onclick = () => step(-1);
$('next').onclick = () => step(1);
$('copy').onclick = () => {
  const url = location.href.split('#')[0] + '#' + CUR.id;
  navigator.clipboard?.writeText(url);
  $('copy').textContent = 'Copied';
  setTimeout(() => ($('copy').textContent = 'Copy link'), 1200);
};

document.addEventListener('keydown', (e) => {
  if (document.activeElement === $('q')) return;
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});

/* ---------- crosshair: report coordinates in the ORIGINAL screenshot space ---------- */

const wrap = $('shotwrap');
wrap.addEventListener('mousemove', (e) => {
  if (!CUR) return;
  const b = wrap.getBoundingClientRect();
  const fx = (e.clientX - b.left) / b.width;
  const fy = (e.clientY - b.top) / b.height;
  const pt = { x: Math.round(fx * CUR.points.w), y: Math.round(fy * CUR.points.h) };
  const px = { x: Math.round(fx * CUR.pixels.w), y: Math.round(fy * CUR.pixels.h) };
  $('crossx').style.left = (e.clientX - b.left) + 'px';
  $('crossy').style.top = (e.clientY - b.top) + 'px';
  const band = CUR.regions.find((r) => pt.y >= r.y_from && pt.y <= r.y_to);
  $('readout').textContent =
    `X ${pt.x} · Y ${pt.y} pt   (${px.x}, ${px.y} px)` + (band ? `   ${band.id}` : '');
});

/* ---------- deep links ---------- */

function fromHash() {
  const h = decodeURIComponent(location.hash.replace('#', '')).toUpperCase();
  if (!h) return;
  const m = h.match(/^(S\d{3})(-[A-D])?$/);
  if (!m) return;
  const s = LIST.find((x) => x.id === m[1]);
  if (s) show(s);
}
window.addEventListener('hashchange', fromHash);
