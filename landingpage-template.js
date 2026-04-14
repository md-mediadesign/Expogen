// Landing Page Template – generiert eine eigenständige HTML-Datei
// aus dem bestehenden data-Objekt und photos-Array.

// Wandelt einen Bild-Pfad/URL in eine Data-URL um.
// Strategie: erst fetch (funktioniert im http://-Kontext), dann Canvas-Fallback
// über <img> (funktioniert bei file:// in vielen Browsern).
async function _srcToDataUrl(src) {
  // 1. fetch (http/https oder CORS-freundliche lokale Server)
  try {
    const res = await fetch(src);
    if (res.ok) {
      const blob = await res.blob();
      return await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = reject;
        r.readAsDataURL(blob);
      });
    }
  } catch (e) {
    console.warn('[LandingPage] fetch failed for', src, '→ trying canvas', e.message);
  }

  // 2. Canvas via <img> (ohne crossOrigin, damit file:// lädt)
  try {
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const c = document.createElement('canvas');
          c.width = img.naturalWidth; c.height = img.naturalHeight;
          c.getContext('2d').drawImage(img, 0, 0);
          resolve(c.toDataURL('image/jpeg', 0.88));
        } catch (e) { reject(e); }
      };
      img.onerror = () => reject(new Error('img load error'));
      img.src = src;
    });
  } catch (e) {
    console.warn('[LandingPage] canvas failed for', src, e.message);
    return null;
  }
}

async function _photosToDataUrls(photos) {
  const out = [];
  let failed = 0;
  for (const p of (photos || [])) {
    let src = p && p.src;
    if (!src) continue;
    if (!src.startsWith('data:')) {
      const converted = await _srcToDataUrl(src);
      if (converted) { src = converted; }
      else { failed++; continue; }
    }
    out.push({ src, caption: (p && p.caption) || '' });
  }
  if (failed > 0) {
    console.warn(`[LandingPage] ${failed} Bild(er) konnten nicht eingebettet werden. Tipp: index.html über lokalen Server öffnen (z.B. "python3 -m http.server" im Projektordner), nicht per Doppelklick.`);
  }
  return out;
}

// Helligkeits-Utility: liefert hellere/dunklere Variante einer Hex-Farbe
function _shadeHex(hex, pct) {
  const h = (hex || '#000000').replace('#','');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c+c).join('') : h, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const adj = v => Math.max(0, Math.min(255, Math.round(v + (pct > 0 ? (255 - v) : v) * pct)));
  return '#' + [adj(r), adj(g), adj(b)].map(v => v.toString(16).padStart(2,'0')).join('');
}
function _hexToRgba(hex, alpha) {
  const h = (hex || '#000000').replace('#','');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c+c).join('') : h, 16);
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${alpha})`;
}

function generateLandingPage(data, photos, colors) {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const has = v => v && String(v).trim().length > 0;
  const list = v => Array.isArray(v) ? v.filter(has) : String(v || '').split('\n').map(s => s.trim()).filter(Boolean);

  const accent = (colors && colors.accent) || '#0f1d40';
  const secondary = (colors && colors.secondary) || '#c4a43c';
  const accentSoft = _shadeHex(accent, 0.15);
  const secondaryLight = _shadeHex(secondary, 0.25);

  const title = esc(data.titel || 'Immobilien-Exposé');
  const subtitle = esc(data.untertitel || '');
  const address = esc(data.adresse || '');
  const price = esc(data.preis || '');
  const priceDetail = esc(data.preisDetail || '');
  const type = esc(data.type || 'Immobilie');

  const heroImg = photos && photos[0] ? photos[0].src : '';
  const galleryPhotos = (photos || []).slice(0, 12);

  const keyFacts = [
    data.wohnflaeche && { label: 'Wohnfläche', value: data.wohnflaeche },
    data.zimmer && { label: 'Zimmer', value: data.zimmer },
    data.baujahr && { label: 'Baujahr', value: data.baujahr },
    data.zustand && { label: 'Zustand', value: data.zustand },
    data.verfuegbar && { label: 'Verfügbar', value: data.verfuegbar },
    data.gesamtflaeche && { label: 'Gesamtfläche', value: data.gesamtflaeche },
  ].filter(Boolean);

  const highlights = list(data.highlights);
  const ausstattung = list(data.ausstattungList);

  const energy = [
    data.energiestandard && { label: 'Standard', value: data.energiestandard },
    data.energieklasse && { label: 'Klasse', value: data.energieklasse },
    data.energiekennwert && { label: 'Kennwert', value: data.energiekennwert },
    data.heizung && { label: 'Heizung', value: data.heizung },
  ].filter(Boolean);

  const agent = {
    name: esc(data.name || ''),
    firma: esc(data.firma || ''),
    tel: esc(data.tel || ''),
    email: esc(data.email || ''),
    adresse: esc(data.kontaktAdresse || ''),
  };

  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}${subtitle ? ' – ' + subtitle : ''}</title>
<meta name="description" content="${esc((data.beschreibung || '').slice(0, 160))}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
:root{
  --ink:#0e1116; --ink-soft:#2a2e36; --muted:#6b7280;
  --paper:#fafaf7; --paper-2:#f1efe8; --line:#e5e2d8;
  --gold:${secondary}; --gold-2:${secondaryLight}; --navy:${accent}; --navy-soft:${accentSoft};
  --gold-rgba:${_hexToRgba(secondary, .4)};
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Roboto',sans-serif;font-weight:300;color:var(--ink);background:var(--paper);line-height:1.6;font-size:17px;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
h1,h2,h3,h4{font-family:'Ubuntu',sans-serif;font-weight:500;letter-spacing:-.01em;color:var(--ink);line-height:1.15}
h1{font-size:clamp(2.4rem,6vw,5rem)}
h2{font-size:clamp(1.8rem,3.5vw,3rem);margin-bottom:1.2rem}
h3{font-size:1.3rem;font-weight:500}
a{color:var(--ink);text-decoration:none;transition:color .25s}
a:hover{color:var(--gold)}

/* Nav */
.nav{position:fixed;top:0;left:0;right:0;z-index:50;padding:1.1rem 2rem;display:flex;justify-content:space-between;align-items:center;background:rgba(250,250,247,0);backdrop-filter:blur(0);transition:background .3s,backdrop-filter .3s,border-color .3s;border-bottom:1px solid transparent}
.nav.scrolled{background:rgba(250,250,247,.88);backdrop-filter:blur(12px);border-bottom-color:var(--line)}
.nav-brand{font-family:'Ubuntu',sans-serif;font-size:1.4rem;font-weight:600;letter-spacing:.02em}
.nav-brand span{color:var(--gold)}
.nav-links{display:flex;gap:2rem;font-size:.88rem;letter-spacing:.05em;text-transform:uppercase;font-weight:500}
.nav-links a{position:relative}
.nav-links a::after{content:'';position:absolute;left:0;bottom:-4px;width:0;height:1px;background:var(--gold);transition:width .3s}
.nav-links a:hover::after{width:100%}
@media (max-width:720px){.nav-links{display:none}}

/* Hero */
.hero{position:relative;min-height:100vh;display:flex;align-items:flex-end;padding:6rem 2rem 4rem;overflow:hidden;background:var(--navy)}
.hero-img{position:absolute;inset:0;background-size:cover;background-position:center;${heroImg ? `background-image:url('${heroImg}')` : ''}}
.hero::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,17,22,.35) 0%,rgba(14,17,22,.1) 40%,rgba(14,17,22,.85) 100%);z-index:1}
.hero-inner{position:relative;z-index:2;max-width:1280px;margin:0 auto;width:100%;color:#fff}
.hero-kicker{font-size:.8rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold-2);margin-bottom:1.2rem;font-weight:500}
.hero h1{color:#fff;max-width:900px}
.hero-sub{font-family:'Ubuntu',sans-serif;font-style:italic;font-size:clamp(1.2rem,2vw,1.6rem);color:rgba(255,255,255,.85);margin-top:1rem;max-width:700px}
.hero-meta{display:flex;gap:2.5rem;margin-top:2.5rem;flex-wrap:wrap;padding-top:2rem;border-top:1px solid rgba(255,255,255,.2);max-width:700px}
.hero-meta-item .lbl{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:.3rem}
.hero-meta-item .val{font-family:'Ubuntu',sans-serif;font-size:1.6rem;color:#fff;font-weight:500}
.hero-meta-item .val .detail{font-family:'Roboto',sans-serif;font-size:.8rem;color:rgba(255,255,255,.55);font-weight:300;display:block;margin-top:.15rem}
.scroll-hint{position:absolute;bottom:1.5rem;left:50%;transform:translateX(-50%);z-index:2;font-size:.7rem;letter-spacing:.25em;text-transform:uppercase;color:rgba(255,255,255,.55);animation:bob 2s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,6px)}}

/* Sections */
section{padding:clamp(4rem,8vw,7rem) 2rem;max-width:1280px;margin:0 auto}
.section-kicker{font-size:.75rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:.9rem;font-weight:600}
.lead{font-size:1.15rem;color:var(--ink-soft);max-width:720px;margin-bottom:2rem;font-weight:300;line-height:1.7}
.prose{max-width:720px;color:var(--ink-soft);white-space:pre-wrap;line-height:1.75}

/* Facts */
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-top:2rem}
.fact{background:var(--paper);padding:1.8rem 1.5rem}
.fact .lbl{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:.5rem}
.fact .val{font-family:'Ubuntu',sans-serif;font-size:1.8rem;font-weight:500;color:var(--ink)}

/* Two-col */
.two-col{display:grid;grid-template-columns:1.1fr .9fr;gap:5rem;align-items:start}
@media (max-width:900px){.two-col{grid-template-columns:1fr;gap:3rem}}

/* Highlights */
.bullets{list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:.7rem 2rem;margin-top:1.5rem}
.bullets li{position:relative;padding-left:1.8rem;color:var(--ink-soft);line-height:1.6;padding-top:.15rem}
.bullets li::before{content:'';position:absolute;left:0;top:.75rem;width:1rem;height:1px;background:var(--gold)}

/* Gallery */
.gallery-section{background:var(--paper-2);max-width:none;padding-left:0;padding-right:0}
.gallery-section > .wrap{max-width:1280px;margin:0 auto;padding:0 2rem}
.gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin-top:2rem}
.gallery .g{position:relative;aspect-ratio:4/3;overflow:hidden;background:var(--line);cursor:zoom-in}
.gallery .g img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}
.gallery .g:hover img{transform:scale(1.05)}
.gallery .g.wide{grid-column:span 2}
.gallery .g.tall{grid-row:span 2;aspect-ratio:1/1.3}
@media (max-width:720px){.gallery{grid-template-columns:repeat(2,1fr)}.gallery .g.wide,.gallery .g.tall{grid-column:span 1;grid-row:span 1;aspect-ratio:4/3}}

/* Lightbox */
.lb{position:fixed;inset:0;background:rgba(10,12,16,.96);z-index:100;display:none;align-items:center;justify-content:center;padding:2rem;cursor:zoom-out}
.lb.show{display:flex}
.lb img{max-width:95vw;max-height:90vh;object-fit:contain}
.lb-close{position:absolute;top:1.5rem;right:2rem;color:#fff;font-size:2rem;cursor:pointer;background:none;border:none}

/* Energy */
.energy{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1.5rem;margin-top:1.5rem;padding:2rem;background:var(--paper-2);border-left:3px solid var(--gold)}
.energy-item .lbl{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:.4rem}
.energy-item .val{font-family:'Ubuntu',sans-serif;font-size:1.4rem;font-weight:500}

/* Contact */
.contact{background:var(--navy);color:#fff;max-width:none;padding:clamp(5rem,9vw,7rem) 2rem}
.contact .wrap{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center}
@media (max-width:900px){.contact .wrap{grid-template-columns:1fr;gap:3rem}}
.contact h2{color:#fff}
.contact .section-kicker{color:var(--gold-2)}
.contact-details{font-size:1.05rem;line-height:2;color:rgba(255,255,255,.88)}
.contact-details .name{font-family:'Ubuntu',sans-serif;font-size:1.8rem;color:#fff;margin-bottom:.3rem;font-weight:500}
.contact-details .firma{color:var(--gold-2);font-size:1rem;letter-spacing:.04em;margin-bottom:1.5rem}
.contact-details a{color:#fff;border-bottom:1px solid var(--gold-rgba);padding-bottom:2px}
.contact-details a:hover{color:var(--gold-2);border-color:var(--gold-2)}
.contact-cta{padding:3rem;border:1px solid var(--gold-rgba);background:rgba(255,255,255,.02)}
.contact-cta h3{color:#fff;margin-bottom:1rem;font-size:1.6rem}
.contact-cta p{color:rgba(255,255,255,.7);margin-bottom:1.5rem}
.cta-btn{display:inline-block;padding:1rem 2.2rem;background:var(--gold);color:var(--navy);font-weight:600;letter-spacing:.08em;text-transform:uppercase;font-size:.85rem;transition:background .25s,transform .25s}
.cta-btn:hover{background:var(--gold-2);color:var(--navy);transform:translateY(-2px)}

/* Footer */
footer{padding:2.5rem 2rem;text-align:center;color:var(--muted);font-size:.8rem;letter-spacing:.05em;border-top:1px solid var(--line)}

/* Reveal */
.reveal{opacity:0;transform:translateY(30px);transition:opacity .9s ease,transform .9s ease}
.reveal.in{opacity:1;transform:none}
</style>
</head>
<body>

<nav class="nav" id="nav">
  <div class="nav-brand">${agent.firma || 'Exposé'}${agent.firma ? '' : ''}</div>
  <div class="nav-links">
    <a href="#objekt">Objekt</a>
    <a href="#galerie">Galerie</a>
    <a href="#lage">Lage</a>
    <a href="#kontakt">Kontakt</a>
  </div>
</nav>

<header class="hero">
  <div class="hero-img"></div>
  <div class="hero-inner">
    ${type ? `<div class="hero-kicker">${type}${address ? ' · ' + address : ''}</div>` : ''}
    <h1>${title}</h1>
    ${subtitle ? `<p class="hero-sub">${subtitle}</p>` : ''}
    <div class="hero-meta">
      ${price ? `<div class="hero-meta-item"><div class="lbl">Preis</div><div class="val">${price}${priceDetail ? `<span class="detail">${priceDetail}</span>` : ''}</div></div>` : ''}
      ${data.wohnflaeche ? `<div class="hero-meta-item"><div class="lbl">Wohnfläche</div><div class="val">${esc(data.wohnflaeche)}</div></div>` : ''}
      ${data.zimmer ? `<div class="hero-meta-item"><div class="lbl">Zimmer</div><div class="val">${esc(data.zimmer)}</div></div>` : ''}
    </div>
  </div>
  <div class="scroll-hint">Scrollen</div>
</header>

${has(data.beschreibung) || keyFacts.length ? `
<section id="objekt" class="reveal">
  <div class="section-kicker">Das Objekt</div>
  <h2>Willkommen${address ? ' in <em>' + address + '</em>' : ''}.</h2>
  ${has(data.beschreibung) ? `<div class="prose">${esc(data.beschreibung)}</div>` : ''}
  ${keyFacts.length ? `<div class="facts">${keyFacts.map(f => `<div class="fact"><div class="lbl">${f.label}</div><div class="val">${esc(f.value)}</div></div>`).join('')}</div>` : ''}
</section>
` : ''}

${highlights.length || ausstattung.length || has(data.ausstattung) ? `
<section id="ausstattung" class="reveal">
  <div class="two-col">
    <div>
      <div class="section-kicker">Highlights & Ausstattung</div>
      <h2>Das Besondere</h2>
      ${has(data.ausstattung) ? `<div class="prose">${esc(data.ausstattung)}</div>` : ''}
    </div>
    <div>
      ${highlights.length ? `<ul class="bullets">${highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
      ${ausstattung.length ? `<ul class="bullets" style="margin-top:${highlights.length ? '2rem' : '0'}">${ausstattung.map(h => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
    </div>
  </div>
</section>
` : ''}

${galleryPhotos.length > 1 ? `
<section id="galerie" class="gallery-section reveal">
  <div class="wrap">
    <div class="section-kicker">Impressionen</div>
    <h2>Bildergalerie</h2>
    <div class="gallery">
      ${galleryPhotos.map((p, i) => {
        const cls = i === 0 ? 'wide' : (i === 3 ? 'tall' : '');
        return `<div class="g ${cls}" onclick="openLb('${p.src}')"><img src="${p.src}" alt="${esc(p.caption || '')}" loading="lazy"></div>`;
      }).join('')}
    </div>
  </div>
</section>
` : ''}

${has(data.lage) || has(data.stadtbeschr) ? `
<section id="lage" class="reveal">
  <div class="section-kicker">Die Lage</div>
  <h2>${address ? esc(address.split(',').slice(-1)[0].trim()) + '.' : 'Umgebung & Lage'}</h2>
  ${has(data.lage) ? `<div class="prose">${esc(data.lage)}</div>` : ''}
  ${has(data.stadtbeschr) ? `<div class="prose" style="margin-top:1.5rem">${esc(data.stadtbeschr)}</div>` : ''}
</section>
` : ''}

${energy.length ? `
<section id="energie" class="reveal">
  <div class="section-kicker">Energie</div>
  <h2>Energetische Daten</h2>
  <div class="energy">
    ${energy.map(e => `<div class="energy-item"><div class="lbl">${e.label}</div><div class="val">${esc(e.value)}</div></div>`).join('')}
  </div>
</section>
` : ''}

<section id="kontakt" class="contact reveal">
  <div class="wrap">
    <div>
      <div class="section-kicker">Kontakt</div>
      <h2>Besichtigung<br>vereinbaren.</h2>
      <div class="contact-details" style="margin-top:2rem">
        ${agent.name ? `<div class="name">${agent.name}</div>` : ''}
        ${agent.firma ? `<div class="firma">${agent.firma}</div>` : ''}
        ${agent.tel ? `<div>Tel. <a href="tel:${agent.tel.replace(/[^+0-9]/g,'')}">${agent.tel}</a></div>` : ''}
        ${agent.email ? `<div><a href="mailto:${agent.email}">${agent.email}</a></div>` : ''}
        ${agent.adresse ? `<div style="margin-top:1rem;color:rgba(255,255,255,.6);font-size:.95rem">${agent.adresse}</div>` : ''}
      </div>
    </div>
    <div class="contact-cta">
      <h3>Interesse geweckt?</h3>
      <p>Wir freuen uns auf Ihre Anfrage und senden Ihnen gern das vollständige Exposé sowie einen Termin zur persönlichen Besichtigung.</p>
      ${agent.email ? `<a class="cta-btn" href="mailto:${agent.email}?subject=${encodeURIComponent('Anfrage: ' + (data.titel || ''))}">Jetzt anfragen</a>` : agent.tel ? `<a class="cta-btn" href="tel:${agent.tel.replace(/[^+0-9]/g,'')}">Jetzt anrufen</a>` : ''}
    </div>
  </div>
</section>

<footer>
  © ${new Date().getFullYear()} ${agent.firma || 'Exposé'} · Alle Angaben ohne Gewähr · Provisionsfrei vorbehaltlich
</footer>

<div class="lb" id="lb" onclick="closeLb(event)">
  <button class="lb-close" onclick="closeLb(event)" aria-label="Schließen">×</button>
  <img id="lbImg" src="" alt="">
</div>

<script>
(function(){
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function(){
    if (window.scrollY > 60) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
})();
function openLb(src){ document.getElementById('lbImg').src = src; document.getElementById('lb').classList.add('show'); }
function closeLb(e){ if (e && e.target && e.target.tagName === 'IMG' && e.target.id === 'lbImg') return; document.getElementById('lb').classList.remove('show'); }
</script>
</body>
</html>`;
}

async function _buildLandingPageHtml(data, photos) {
  const colors = (typeof getColorPair === 'function') ? getColorPair() : null;
  const embeddedPhotos = await _photosToDataUrls(photos);
  return generateLandingPage(data, embeddedPhotos, colors);
}

async function downloadLandingPage(data, photos) {
  const html = await _buildLandingPageHtml(data, photos);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const filename = ((data.titel || 'landingpage').toLowerCase().replace(/[^a-z0-9äöüß-]+/g, '-').replace(/^-+|-+$/g, '') || 'landingpage') + '.html';
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function previewLandingPage(data, photos) {
  const w = window.open('', '_blank');
  if (w) w.document.write('<!doctype html><title>Landing Page wird geladen…</title><style>body{font-family:system-ui;background:#101826;color:#e8c97a;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-size:.9rem;letter-spacing:.15em;text-transform:uppercase}</style><body>Landing Page wird erstellt…');
  const html = await _buildLandingPageHtml(data, photos);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  if (w) w.location.href = url; else window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
