// ══════════════════════════════════════════════════════
// TEMPLATE C — Modern / Clean (Navy & Warmgrau)
// Weißes Drucklayout, Wellenlinien-Dekoration
// Inspiriert von: Modern Real Estate Broschüre
// ══════════════════════════════════════════════════════

const TC_CSS = `
/* ─── BASE ─────────────────────────────────────────── */
.tc-page {
  position: relative;
  width: 210mm;
  min-height: 297mm;
  background: #fff;
  margin: 0 auto 3rem;
  box-shadow: 0 4px 40px rgba(0,0,0,.15);
  overflow: hidden;
  page-break-after: always;
  font-family: 'Roboto', sans-serif;
  color: #2c2c2c;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.tc-page:last-child { margin-bottom: 0; }

/* ─── COVER ─────────────────────────────────────────── */
.tc-cover-page {
  display: flex;
  flex-direction: column;
  height: 297mm;
}
.tc-cover-upper {
  flex: 0 0 54%;
  position: relative;
  background: #8b7d6b;
  overflow: hidden;
}
.tc-cover-upper-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.tc-cover-upper-placeholder {
  width: 100%;
  height: 100%;
  background: #8b7d6b;
}
.tc-wave-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.tc-cover-band {
  flex: 0 0 auto;
  background: #aeb8cc;
  padding: 0.5rem 2.5rem;
  font-size: 7.5pt;
  font-style: italic;
  color: #1a2744;
  letter-spacing: 0.04em;
}
.tc-cover-lower {
  flex: 1;
  background: #1a2744;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.2rem 2.8rem 2.5rem;
}
.tc-cover-lower-wave {
  position: absolute;
  right: -8%;
  top: -15%;
  width: 68%;
  height: 130%;
  pointer-events: none;
  opacity: 0.18;
}
.tc-cover-lower-wave svg { width: 100%; height: 100%; }
.tc-cover-brand-row {
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;
  position: relative;
  z-index: 2;
}
.tc-cover-logo-img {
  max-height: 38px;
  max-width: 150px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}
.tc-cover-logo-text {
  font-family: 'Ubuntu', sans-serif;
  font-size: 10pt;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.tc-cover-content {
  position: relative;
  z-index: 2;
}
.tc-cover-headline {
  font-family: 'Ubuntu', sans-serif;
  font-size: 27pt;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 1.1rem;
}
.tc-cover-divider {
  width: 100%;
  height: 1px;
  background: rgba(174,184,204,0.4);
  margin-bottom: 0.9rem;
}
.tc-cover-type {
  font-size: 8pt;
  letter-spacing: 0.14em;
  color: #aeb8cc;
  text-transform: uppercase;
  margin-bottom: 0.3rem;
}
.tc-cover-addr {
  font-size: 9pt;
  color: rgba(174,184,204,0.7);
  letter-spacing: 0.04em;
}

/* ─── INNER PAGE ─────────────────────────────────────── */
.tc-inner {
  padding: 1.8rem 2.5rem 2.5rem;
  height: 297mm;
  box-sizing: border-box;
}
.tc-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.55rem;
  border-bottom: 0.5px solid #d0d0d0;
  margin-bottom: 2rem;
  font-size: 7pt;
  color: #8b7d6b;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.tc-ph-page { color: #1a2744; font-weight: 600; }

/* ─── TYPOGRAPHY ─────────────────────────────────────── */
.tc-section-title {
  font-family: 'Ubuntu', sans-serif;
  font-size: 24pt;
  font-weight: 700;
  color: #1a2744;
  line-height: 1.1;
  margin-bottom: 0.8rem;
}
.tc-hr {
  border: none;
  border-top: 1.5px solid #1a2744;
  margin-bottom: 1.4rem;
}
.tc-body {
  font-size: 8.5pt;
  line-height: 1.65;
  color: #444;
}
.tc-body p { margin-bottom: 0.75rem; }

/* ─── DATA FACTS ─────────────────────────────────────── */
.tc-data-layout {
  display: flex;
  gap: 2rem;
  height: calc(297mm - 7.5rem);
}
.tc-data-left { flex: 0 0 54%; overflow: hidden; }
.tc-data-right { flex: 1; }
.tc-data-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
  display: block;
}
.tc-data-placeholder {
  width: 100%;
  height: 100%;
  background: #8b7d6b;
  border-radius: 3px;
}
.tc-facts { margin-top: 0.8rem; }
.tc-fact-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.42rem 0;
  border-bottom: 0.5px solid #ebebeb;
  gap: 0.8rem;
}
.tc-fact-label {
  font-size: 7pt;
  color: #8b7d6b;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  flex-shrink: 0;
  min-width: 30%;
}
.tc-fact-value {
  font-size: 8pt;
  color: #1a2744;
  font-weight: 500;
  text-align: right;
}

/* ─── BESCHREIBUNG ───────────────────────────────────── */
.tc-desc-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
}
.tc-hl-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.tc-hl-list li {
  font-size: 8pt;
  color: #1a2744;
  padding: 0.42rem 0 0.42rem 1.1rem;
  border-bottom: 0.5px solid #ebebeb;
  position: relative;
  line-height: 1.4;
}
.tc-hl-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #8b7d6b;
}
.tc-strip-img {
  width: 100%;
  height: 45mm;
  object-fit: cover;
  display: block;
}
.tc-strip-placeholder {
  width: 100%;
  height: 45mm;
  background: #8b7d6b;
}

/* ─── LAGE ───────────────────────────────────────────── */
.tc-lage-layout {
  display: flex;
  gap: 2rem;
}
.tc-lage-left { flex: 1; }
.tc-lage-right {
  flex: 0 0 42%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.tc-lage-photo {
  flex: 1;
  min-height: 70mm;
  object-fit: cover;
  display: block;
  border-radius: 3px;
  width: 100%;
}
.tc-lage-photo-placeholder {
  flex: 1;
  min-height: 70mm;
  background: #8b7d6b;
  border-radius: 3px;
}
.tc-city-box {
  background: #1a2744;
  padding: 1.2rem 1.4rem;
  border-radius: 3px;
}
.tc-city-box p {
  font-size: 7.5pt;
  color: #aeb8cc;
  line-height: 1.6;
  margin: 0;
}

/* ─── AUSSTATTUNG ────────────────────────────────────── */
.tc-aus-layout {
  display: flex;
  gap: 2rem;
}
.tc-aus-photo-col { flex: 0 0 43%; }
.tc-aus-photo {
  width: 100%;
  height: 85mm;
  object-fit: cover;
  border-radius: 3px;
  display: block;
}
.tc-aus-photo-placeholder {
  width: 100%;
  height: 85mm;
  background: #8b7d6b;
  border-radius: 3px;
}
.tc-aus-text-col { flex: 1; }
.tc-aus-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.tc-aus-list li {
  font-size: 8pt;
  color: #444;
  padding: 0.42rem 0 0.42rem 1.2rem;
  border-bottom: 0.5px solid #ebebeb;
  position: relative;
  line-height: 1.4;
}
.tc-aus-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #1a2744;
  font-weight: 700;
  font-size: 7pt;
}

/* ─── EINHEITEN ──────────────────────────────────────── */
.tc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 8pt;
}
.tc-table th {
  background: #1a2744;
  color: white;
  padding: 0.6rem 0.8rem;
  text-align: left;
  font-size: 7pt;
  letter-spacing: 0.06em;
  font-weight: 500;
  text-transform: uppercase;
}
.tc-table td {
  padding: 0.55rem 0.8rem;
  border-bottom: 0.5px solid #ebebeb;
  color: #333;
}
.tc-table tr:nth-child(even) td { background: #f7f7f7; }

/* ─── INVESTMENT ─────────────────────────────────────── */
.tc-inv-layout {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 1.5rem;
}
.tc-inv-left { flex: 1; }
.tc-inv-right {
  flex: 0 0 36%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.tc-stat-box { border-top: 2px solid #1a2744; padding-top: 0.7rem; }
.tc-stat-num {
  font-family: 'Ubuntu', sans-serif;
  font-size: 18pt;
  font-weight: 700;
  color: #1a2744;
  line-height: 1;
}
.tc-stat-label {
  font-size: 7pt;
  color: #8b7d6b;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-top: 0.3rem;
}
.tc-inv-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
}
.tc-inv-list li {
  font-size: 7.5pt;
  color: #444;
  padding: 0.4rem 0 0.4rem 1.1rem;
  border-bottom: 0.5px solid #ebebeb;
  position: relative;
}
.tc-inv-list li::before { content: '→'; position: absolute; left: 0; color: #1a2744; }

/* ─── FOTOGALERIE ────────────────────────────────────── */
.tc-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4px;
}
.tc-gallery-item { overflow: hidden; }
.tc-gallery-item img {
  width: 100%;
  height: 52mm;
  object-fit: cover;
  display: block;
}
.tc-gallery-item.tc-wide {
  grid-column: 1 / -1;
}
.tc-gallery-item.tc-wide img { height: 72mm; }

/* ─── KONTAKT ────────────────────────────────────────── */
.tc-contact-page {
  background: #1a2744;
  height: 297mm;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tc-contact-wave {
  position: absolute;
  inset: 0;
  opacity: 0.18;
  pointer-events: none;
}
.tc-contact-wave svg { width: 100%; height: 100%; }
.tc-contact-inner {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 3rem;
  max-width: 88%;
}
.tc-contact-logo-img {
  max-height: 50px;
  max-width: 200px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  margin-bottom: 2rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.tc-contact-logo-text {
  font-family: 'Ubuntu', sans-serif;
  font-size: 13pt;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 2rem;
}
.tc-contact-headline {
  font-family: 'Ubuntu', sans-serif;
  font-size: 24pt;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}
.tc-contact-hr {
  border: none;
  border-top: 1px solid rgba(174,184,204,0.35);
  margin-bottom: 1.5rem;
}
.tc-contact-name {
  font-size: 12pt;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.4rem;
}
.tc-contact-firm {
  font-size: 8.5pt;
  color: #aeb8cc;
  margin-bottom: 1rem;
}
.tc-contact-line {
  font-size: 9pt;
  color: rgba(174,184,204,0.85);
  margin-bottom: 0.35rem;
}
`;

// ── Wave SVG ──────────────────────────────────────────
function tcWaveSvg(color) {
  const c = color || 'rgba(174,184,204,0.55)';
  const paths = Array.from({ length: 22 }, (_, i) => {
    const r = 55 + i * 21;
    const x1 = -20, y1 = 380 - r * 0.28;
    const cx = r * 0.38, cy = -r * 0.05;
    const x2 = 440, y2 = r * 0.25;
    return `<path d="M${x1},${y1} Q${cx},${cy} ${x2},${y2}" stroke="${c}" stroke-width="1.1" fill="none"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 380" preserveAspectRatio="xMidYMid slice">${paths}</svg>`;
}

// ══════════════════════════════════════════════════════
function buildPreviewC() {
  const d = data;
  const out = document.getElementById('preview-output');
  out.innerHTML = '';

  // Inject styles once
  if (!document.getElementById('tmpl-c-styles')) {
    const s = document.createElement('style');
    s.id = 'tmpl-c-styles';
    s.textContent = TC_CSS;
    document.head.appendChild(s);
  }

  function esc(s) {
    if (!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function body(text) {
    if (!text) return '';
    return '<p>' + esc(text).replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
  }

  const brand = esc(d.brandFirma || 'Ihr Makler');
  const logoHtml = d.brandLogoSrc
    ? `<img src="${d.brandLogoSrc}" class="tc-cover-logo-img" alt="Logo">`
    : `<span class="tc-cover-logo-text">${brand}</span>`;
  const contactLogoHtml = d.brandLogoSrc
    ? `<img src="${d.brandLogoSrc}" class="tc-contact-logo-img" alt="Logo">`
    : `<div class="tc-contact-logo-text">${brand}</div>`;

  const wave = tcWaveSvg();

  const pageHdr = (n) => `
    <div class="tc-page-header">
      <span>${brand}</span>
      <span class="tc-ph-page">Seite ${n}</span>
    </div>`;

  // ── PAGE 1: COVER ──────────────────────────────────
  const heroImg = photos.length
    ? `<img src="${photos[0].src}" class="tc-cover-upper-img" alt="">`
    : `<div class="tc-cover-upper-placeholder"></div>`;

  out.innerHTML += `
  <div class="tc-page tc-cover-page">
    <div class="tc-cover-upper">
      ${heroImg}
      <div class="tc-wave-overlay">${tcWaveSvg('rgba(255,255,255,0.18)')}</div>
    </div>
    <div class="tc-cover-band">Kontakt: ${esc(d.tel || d.email || d.firma || brand)}</div>
    <div class="tc-cover-lower">
      <div class="tc-cover-lower-wave">${wave}</div>
      <div class="tc-cover-brand-row">${logoHtml}</div>
      <div class="tc-cover-content">
        <div class="tc-cover-headline">${esc(d.titel || 'Ihr Objekt')}</div>
        <div class="tc-cover-divider"></div>
        ${d.type ? `<div class="tc-cover-type">${esc(d.type)}</div>` : ''}
        ${d.adresse ? `<div class="tc-cover-addr">${esc(d.adresse)}</div>` : ''}
      </div>
    </div>
  </div>`;

  // ── PAGE 2: OBJEKT-DATEN ───────────────────────────
  const facts = [
    ['Adresse', d.adresse],
    ['Typ', d.type],
    ['Baujahr', d.baujahr],
    ['Zustand', d.zustand],
    ['Verfügbar', d.verfuegbar],
    ['Kaufpreis', d.preis],
    ['Nebenkosten', d.preisDetail],
    ['Wohnfläche', d.wohnflaeche],
    ['Gesamtfläche', d.gesamtflaeche],
    ['Zimmer', d.zimmer],
    ['Einheiten', d.einheitenAnz],
    ['Hausgeld', d.hausgeld],
    ['Energiestandard', d.energiestandard],
    ['Heizung', d.heizung],
    ['Energieklasse', d.energieklasse ? `Klasse ${d.energieklasse}` : null],
    ['Energiekennwert', d.energiekennwert ? `${d.energiekennwert} kWh/m²a` : null],
    ['Käuferprovision', d.kaeuferp],
  ].filter(([, v]) => v);

  const dataRightHtml = photos.length > 1
    ? `<img src="${photos[1].src}" class="tc-data-img" alt="">`
    : `<div class="tc-data-placeholder"></div>`;

  out.innerHTML += `
  <div class="tc-page tc-inner">
    ${pageHdr(2)}
    <div class="tc-data-layout">
      <div class="tc-data-left">
        <h2 class="tc-section-title">Objekt im<br>Überblick</h2>
        <div class="tc-facts">
          ${facts.map(([k, v]) => `
          <div class="tc-fact-row">
            <span class="tc-fact-label">${esc(k)}</span>
            <span class="tc-fact-value">${esc(v)}</span>
          </div>`).join('')}
        </div>
      </div>
      <div class="tc-data-right">${dataRightHtml}</div>
    </div>
  </div>`;

  // ── PAGE 3: BESCHREIBUNG ───────────────────────────
  if (d.beschreibung && isStepEnabled(7)) {
    const hlHtml = d.highlights?.length
      ? `<ul class="tc-hl-list">${d.highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>` : '';
    out.innerHTML += `
    <div class="tc-page tc-inner">
      ${pageHdr(3)}
      <h2 class="tc-section-title">Das Objekt</h2>
      <hr class="tc-hr">
      <div class="tc-desc-cols">
        <div class="tc-body">${body(d.beschreibung)}</div>
        <div>${hlHtml}</div>
      </div>
      ${photos.length > 2
        ? `<img src="${photos[2].src}" class="tc-strip-img" alt="">`
        : `<div class="tc-strip-placeholder"></div>`}
    </div>`;
  }

  // ── PAGE 4: LAGE ──────────────────────────────────
  if (d.lage && isStepEnabled(8)) {
    const stadtSnippet = d.stadtbeschr && isStepEnabled(9)
      ? `<div class="tc-city-box"><p>${esc(d.stadtbeschr.split('\n\n')[0])}</p></div>` : '';
    out.innerHTML += `
    <div class="tc-page tc-inner">
      ${pageHdr(4)}
      <div class="tc-lage-layout">
        <div class="tc-lage-left">
          <h2 class="tc-section-title">Lage &<br>Standort</h2>
          <hr class="tc-hr">
          <div class="tc-body">${body(d.lage)}</div>
        </div>
        <div class="tc-lage-right">
          ${(data.mapEnabled && data.mapLat)
            ? buildStaticMapHtml(data.mapLat, data.mapLon, 70)
            : photos.length > 3
              ? `<img src="${photos[3].src}" class="tc-lage-photo" alt="">`
              : `<div class="tc-lage-photo-placeholder"></div>`}
          ${stadtSnippet}
        </div>
      </div>
    </div>`;
  }

  // ── PAGE 5: AUSSTATTUNG ────────────────────────────
  if ((d.ausstattung || d.ausstattungList?.length) && isStepEnabled(10)) {
    const ausList = d.ausstattungList?.length
      ? `<ul class="tc-aus-list">${d.ausstattungList.map(a => `<li>${esc(a)}</li>`).join('')}</ul>` : '';
    out.innerHTML += `
    <div class="tc-page tc-inner">
      ${pageHdr(5)}
      <div class="tc-aus-layout">
        <div class="tc-aus-photo-col">
          ${photos.length > 4
            ? `<img src="${photos[4].src}" class="tc-aus-photo" alt="">`
            : `<div class="tc-aus-photo-placeholder"></div>`}
        </div>
        <div class="tc-aus-text-col">
          <h2 class="tc-section-title">Ausstattung</h2>
          <hr class="tc-hr">
          ${d.ausstattung ? `<div class="tc-body" style="margin-bottom:1rem">${body(d.ausstattung)}</div>` : ''}
          ${ausList}
        </div>
      </div>
    </div>`;
  }

  // ── PAGE 6: EINHEITEN ──────────────────────────────
  if (d.einheiten?.length && isStepEnabled(11)) {
    const rows = d.einheiten.map(e => `
      <tr>
        <td>${esc(e.typ)}</td>
        <td>${esc(e.anzahl)}</td>
        <td>${esc(e.flaeche)}</td>
        <td>${esc(e.preis)}</td>
        <td>${esc(e.besonderheit) || '–'}</td>
      </tr>`).join('');
    out.innerHTML += `
    <div class="tc-page tc-inner">
      ${pageHdr(6)}
      <h2 class="tc-section-title">Wohneinheiten</h2>
      <hr class="tc-hr">
      <table class="tc-table">
        <thead><tr>
          <th>Typ</th><th>Anzahl</th><th>Fläche</th><th>Preis</th><th>Besonderheit</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      ${photos.length > 5
        ? `<img src="${photos[5].src}" class="tc-strip-img" style="margin-top:1.5rem" alt="">`
        : ''}
    </div>`;
  }

  // ── PAGE 7: INVESTMENT ─────────────────────────────
  if (d.investment && isStepEnabled(12)) {
    const invList = d.investHighlights?.length
      ? `<ul class="tc-inv-list">${d.investHighlights.map(v => `<li>${esc(v)}</li>`).join('')}</ul>` : '';
    out.innerHTML += `
    <div class="tc-page tc-inner">
      ${pageHdr(7)}
      <div class="tc-inv-layout">
        <div class="tc-inv-left">
          <h2 class="tc-section-title">Investment</h2>
          <hr class="tc-hr">
          <div class="tc-body">${body(d.investment)}</div>
        </div>
        <div class="tc-inv-right">
          ${d.preis ? `<div class="tc-stat-box"><div class="tc-stat-num">${esc(d.preis)}</div><div class="tc-stat-label">Kaufpreis ab</div></div>` : ''}
          ${d.energiestandard ? `<div class="tc-stat-box"><div class="tc-stat-num">${esc(d.energiestandard)}</div><div class="tc-stat-label">Energiestandard</div></div>` : ''}
          ${d.kaeuferp ? `<div class="tc-stat-box"><div class="tc-stat-num">${esc(d.kaeuferp)}</div><div class="tc-stat-label">Käuferprovision</div></div>` : ''}
          ${invList}
        </div>
      </div>
    </div>`;
  }

  // ── PAGE 8: FOTOGALERIE ────────────────────────────
  if (photos.length > 0) {
    const set = photos.slice(0, 7);
    out.innerHTML += `
    <div class="tc-page tc-inner">
      ${pageHdr(8)}
      <h2 class="tc-section-title">Impressionen</h2>
      <hr class="tc-hr">
      <div class="tc-gallery">
        ${set.map((p, i) => `
        <div class="tc-gallery-item${i === 0 ? ' tc-wide' : ''}">
          <img src="${p.src}" alt="">
        </div>`).join('')}
      </div>
    </div>`;
  }

  // ── PAGE 9: KONTAKT ────────────────────────────────
  if (isStepEnabled(13)) {
    out.innerHTML += `
    <div class="tc-page tc-contact-page">
      <div class="tc-contact-wave">${wave}</div>
      <div class="tc-contact-inner">
        ${contactLogoHtml}
        <h2 class="tc-contact-headline">Interesse geweckt?<br>Sprechen Sie uns an.</h2>
        <hr class="tc-contact-hr">
        ${d.name ? `<div class="tc-contact-name">${esc(d.name)}</div>` : ''}
        ${d.firma ? `<div class="tc-contact-firm">${esc(d.firma)}</div>` : ''}
        ${d.tel ? `<div class="tc-contact-line">Tel: ${esc(d.tel)}</div>` : ''}
        ${d.email ? `<div class="tc-contact-line">${esc(d.email)}</div>` : ''}
        ${d.kontaktAdresse ? `<div class="tc-contact-line">${esc(d.kontaktAdresse)}</div>` : ''}
      </div>
    </div>`;
  }

  // ── EXTRAS PAGE (optional) ──
  const cpairC = (typeof getColorPair === 'function') ? getColorPair() : { accent:'#1a2744', secondary:'#c4a43c' };
  const hasExtrasC = isStepEnabled(14) && (
    (d.extras360Enabled && d.link360) ||
    (d.extrasYTEnabled && d.linkYT) ||
    (d.extrasSonstigesEnabled && d.sonstigerText) ||
    (d.extrasAgbEnabled && d.agbText)
  );
  if (hasExtrasC) {
    const qrBlockC = (enabled, url, label, icon) => {
      if (!enabled || !url) return '';
      const qrSrc = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=' + encodeURIComponent(url);
      return `<div style="display:flex;gap:1.5rem;align-items:flex-start;margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid #e8ebf2">
        <img src="${qrSrc}" alt="QR-Code" style="width:90px;height:90px;flex-shrink:0;border:1px solid #e0e3ea;border-radius:6px">
        <div>
          <div style="font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;color:${cpairC.accent};font-weight:700;margin-bottom:.3rem">${icon} ${esc(label)}</div>
          <div style="font-size:.8rem;color:#555;word-break:break-all">${esc(url)}</div>
          <div style="font-size:.72rem;color:#999;margin-top:.3rem">QR-Code scannen oder Link direkt aufrufen</div>
        </div>
      </div>`;
    };
    out.innerHTML += `
    <div class="tc-page" style="background:#fff;padding:0">
      <div style="height:8px;background:${cpairC.accent}"></div>
      <div style="padding:2.5rem 2.8rem">
        <div style="font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:#aaa;margin-bottom:.3rem">EXTRAS</div>
        <div style="font-family:'Ubuntu',sans-serif;font-size:1.7rem;font-weight:700;color:${cpairC.accent};text-transform:uppercase;letter-spacing:.04em;padding-bottom:.8rem;border-bottom:2px solid ${cpairC.accent};margin-bottom:1.8rem">Weitere Informationen</div>
        ${qrBlockC(d.extras360Enabled, d.link360, '360°-Rundgang', '🔄')}
        ${qrBlockC(d.extrasYTEnabled, d.linkYT, 'Video', '▶')}
        ${(d.extrasSonstigesEnabled && d.sonstigerText) ? `<div style="margin-bottom:1.5rem"><div style="font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;color:${cpairC.accent};font-weight:700;margin-bottom:.5rem">SONSTIGES</div><div style="font-size:.88rem;color:#333;line-height:1.8;white-space:pre-wrap">${esc(d.sonstigerText)}</div></div>` : ''}
        ${(d.extrasAgbEnabled && d.agbText) ? `<div style="padding-top:1.5rem;border-top:1px solid #e8ebf2"><div style="font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:#aaa;font-weight:700;margin-bottom:.5rem">RECHTLICHE HINWEISE / AGBS</div><div style="font-size:.75rem;color:#888;line-height:1.7;white-space:pre-wrap">${esc(d.agbText)}</div></div>` : ''}
      </div>
    </div>`;
  }
}
