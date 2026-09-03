/* Kiki eSIM — in-page folder browser for every dropped file.
 *
 * Lives on the same page as the screen review so ONE link is permanent:
 *   https://balraj1604.github.io/kiki-esim-screens/
 *
 * Deep links (both survive reload and are safe to hand to an AI):
 *   #/Emirates Illustrations/Wallpaper     open that folder
 *   #D0412                                 open item 412 and highlight it
 *
 * Paths in catalog/all.json are percent-encoded exactly as published, so a URL
 * is never rebuilt here — only decoded for display.
 */

(function () {
  const F = (id) => document.getElementById(id);
  const PAGE = 240;

  let CAT = null;          // { base, kinds, items }
  let TREE = null;         // nested { dirs:Map, files:[] }
  let CWD = [];            // current folder as path segments (decoded)
  let SHOWN = 0;           // lazy paging inside the current folder
  let FILTER = '';

  const dec = (s) => { try { return decodeURIComponent(s); } catch (e) { return s; } };

  /* ---------- build the tree ---------- */

  function node() { return { dirs: new Map(), files: [], count: 0 }; }

  function buildTree(items) {
    const root = node();
    items.forEach((it) => {
      const segs = it[2].split('/').map(dec);
      const fileName = segs.pop();
      let cur = root;
      cur.count++;
      segs.forEach((s) => {
        if (!cur.dirs.has(s)) cur.dirs.set(s, node());
        cur = cur.dirs.get(s);
        cur.count++;
      });
      cur.files.push({ n: it[0], kind: CAT.kinds[it[1]], path: it[2], size: it[3], name: fileName });
    });
    return root;
  }

  function at(segs) {
    let cur = TREE;
    for (const s of segs) {
      if (!cur.dirs.has(s)) return null;
      cur = cur.dirs.get(s);
    }
    return cur;
  }

  /* ---------- render ---------- */

  function crumbs() {
    const bar = F('f-crumbs');
    bar.replaceChildren();
    const mk = (label, segs) => {
      const b = document.createElement('button');
      b.className = 'crumb';
      b.textContent = label;
      b.onclick = () => go(segs);
      return b;
    };
    bar.appendChild(mk('All files', []));
    CWD.forEach((s, i) => {
      const sep = document.createElement('span');
      sep.className = 'crumb-sep';
      sep.textContent = '/';
      bar.appendChild(sep);
      bar.appendChild(mk(s, CWD.slice(0, i + 1)));
    });
  }

  function folderTile(name, n, segs) {
    const b = document.createElement('button');
    b.className = 'ftile fdir';
    b.onclick = () => go(segs);
    const ic = document.createElement('div');
    ic.className = 'fdir-ic';
    ic.textContent = '📁';
    const d = document.createElement('div');
    d.className = 'fmeta';
    const t = document.createElement('div');
    t.className = 'fname';
    t.textContent = name;
    const c = document.createElement('div');
    c.className = 'fsub';
    c.textContent = n.toLocaleString() + (n === 1 ? ' file' : ' files');
    d.append(t, c);
    b.append(ic, d);
    return b;
  }

  function fileTile(f) {
    const url = CAT.base + f.path;
    const fig = document.createElement('figure');
    fig.className = 'ftile';
    fig.id = 'D' + String(f.n).padStart(4, '0');

    const num = document.createElement('span');
    num.className = 'fnum';
    num.textContent = f.n;
    fig.appendChild(num);

    if (f.kind === 'image') {
      const a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener';
      const img = document.createElement('img');
      img.loading = 'lazy'; img.src = url;
      img.alt = 'D' + f.n + ' ' + f.name;
      a.appendChild(img);
      fig.appendChild(a);
    } else if (f.kind === 'video') {
      const v = document.createElement('video');
      v.controls = true; v.preload = 'metadata'; v.src = url;
      fig.appendChild(v);
    } else {
      const a = document.createElement('a');
      a.className = 'fdoc';
      a.href = url; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = f.kind.toUpperCase() + ' — open ↗';
      fig.appendChild(a);
    }

    const cap = document.createElement('figcaption');
    cap.className = 'fmeta';
    const t = document.createElement('div');
    t.className = 'fname';
    t.textContent = f.name;
    const s = document.createElement('div');
    s.className = 'fsub';
    s.textContent = 'D' + String(f.n).padStart(4, '0') + ' · ' + f.size;
    cap.append(t, s);
    fig.appendChild(cap);
    return fig;
  }

  /* Filtering searches the whole tree, not just the open folder. */
  function matches() {
    const q = FILTER.trim().toLowerCase().replace(/^d0*/, '');
    if (!q) return null;
    const n = /^\d+$/.test(q) ? parseInt(q, 10) : null;
    const out = [];
    (function walk(nd, segs) {
      nd.files.forEach((f) => {
        if ((n !== null && f.n === n) ||
            f.name.toLowerCase().includes(q) ||
            segs.join('/').toLowerCase().includes(q)) out.push({ f: f, segs: segs });
      });
      nd.dirs.forEach((v, k) => walk(v, segs.concat(k)));
    })(TREE, []);
    return out;
  }

  function draw(reset) {
    if (reset) { SHOWN = 0; F('f-grid').replaceChildren(); }

    const hits = matches();
    const grid = F('f-grid');

    if (hits) {
      F('f-crumbs').replaceChildren();
      const slice = hits.slice(SHOWN, SHOWN + PAGE);
      slice.forEach((h) => {
        const tile = fileTile(h.f);
        if (h.segs.length) {
          const where = document.createElement('div');
          where.className = 'fwhere';
          where.textContent = h.segs.join(' / ');
          tile.querySelector('figcaption').appendChild(where);
        }
        grid.appendChild(tile);
      });
      SHOWN += slice.length;
      F('f-count').textContent =
        hits.length.toLocaleString() + ' match' + (hits.length === 1 ? '' : 'es');
      F('f-empty').hidden = hits.length > 0;
      F('f-more').hidden = SHOWN >= hits.length;
      F('f-more').textContent = 'Show more (' + (hits.length - SHOWN).toLocaleString() + ' left)';
      return;
    }

    const nd = at(CWD);
    if (!nd) { go([]); return; }
    crumbs();

    if (SHOWN === 0) {
      [...nd.dirs.keys()].sort((a, b) => a.localeCompare(b))
        .forEach((k) => grid.appendChild(
          folderTile(k, nd.dirs.get(k).count, CWD.concat(k))));
    }

    const files = nd.files;
    const slice = files.slice(SHOWN, SHOWN + PAGE);
    slice.forEach((f) => grid.appendChild(fileTile(f)));
    SHOWN += slice.length;

    const dirs = nd.dirs.size;
    F('f-count').textContent =
      (dirs ? dirs + (dirs === 1 ? ' folder · ' : ' folders · ') : '') +
      nd.count.toLocaleString() + ' file' + (nd.count === 1 ? '' : 's') +
      (files.length ? ' · ' + files.length.toLocaleString() + ' here' : '');
    F('f-empty').hidden = nd.count > 0;
    F('f-more').hidden = SHOWN >= files.length;
    F('f-more').textContent = 'Show more (' + (files.length - SHOWN).toLocaleString() + ' left)';
  }

  function go(segs, quiet) {
    CWD = segs;
    FILTER = '';
    F('f-q').value = '';
    draw(true);
    if (!quiet) {
      const h = segs.length ? '#/' + segs.join('/') : '#/';
      history.replaceState(null, '', h);
      F('files').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ---------- deep links ---------- */

  function fromHash() {
    if (!TREE) return false;
    const raw = location.hash;
    if (!raw) return false;

    const d = raw.replace('#', '').match(/^D0*(\d{1,4})$/i);
    if (d) {
      const n = parseInt(d[1], 10);
      let found = null;
      (function walk(nd, segs) {
        if (found) return;
        nd.files.forEach((f) => { if (f.n === n) found = { f: f, segs: segs }; });
        nd.dirs.forEach((v, k) => walk(v, segs.concat(k)));
      })(TREE, []);
      if (!found) return false;
      go(found.segs, true);
      const t = document.getElementById('D' + String(n).padStart(4, '0'));
      if (t) {
        t.classList.add('fhit');
        t.scrollIntoView({ block: 'center' });
      } else {
        // it is past the first page — filter to it instead
        F('f-q').value = 'D' + String(n).padStart(4, '0');
        FILTER = F('f-q').value;
        draw(true);
        const t2 = document.getElementById('D' + String(n).padStart(4, '0'));
        if (t2) { t2.classList.add('fhit'); t2.scrollIntoView({ block: 'center' }); }
      }
      return true;
    }

    if (raw.startsWith('#/')) {
      const segs = decodeURIComponent(raw.slice(2)).split('/').filter(Boolean);
      if (at(segs)) { go(segs, true); F('files').scrollIntoView({ block: 'start' }); return true; }
    }
    return false;
  }

  /* ---------- boot ---------- */

  fetch('catalog/all.json')
    .then((r) => r.json())
    .then((d) => {
      CAT = d;
      TREE = buildTree(d.items);
      F('f-total').textContent = d.items.length.toLocaleString();
      draw(true);
      fromHash();
    })
    .catch(() => { F('f-count').textContent = 'Could not load catalog/all.json'; });

  F('f-q').addEventListener('input', (e) => { FILTER = e.target.value; draw(true); });
  F('f-more').addEventListener('click', () => draw(false));
  F('f-up').addEventListener('click', () => go(CWD.slice(0, -1)));
  window.addEventListener('hashchange', fromHash);
})();
