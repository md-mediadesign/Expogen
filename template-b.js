// ══════════════════════════════════════════════════════
// TEMPLATE B — Editorial / Bold
// Sand/Terrakotta Palette, Diagonale Schnitte
// Inspiriert von SDH Beesener Str. 256
// ══════════════════════════════════════════════════════

const TB_CSS = `
/* ─── BASE ───────────────────────────────────────────── */
.tb-page {
  position: relative;
  width: 210mm;
  min-height: 297mm;
  background: #fff;
  margin: 0 auto 3rem;
  box-shadow: 0 4px 40px rgba(0,0,0,.15);
  overflow: hidden;
  page-break-after: always;
  font-family: 'Roboto', sans-serif;
  color: #3a3a3a;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.tb-page:last-child { margin-bottom: 0; }

/* ─── COVER ─────────────────────────────────────────── */
.tb-cover {
  background: #c5b98a;
  height: 297mm;
  position: relative;
}
.tb-cover-hatch {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    -55deg,
    transparent 0px, transparent 3px,
    rgba(255,255,255,0.18) 3px, rgba(255,255,255,0.18) 4.5px
  );
  z-index: 1;
}
.tb-cover-photo {
  position: absolute;
  right: 0;
  top: 0;
  width: 74%;
  height: 100%;
  z-index: 2;
  clip-path: polygon(27% 0, 100% 0, 100% 100%, 0% 100%);
}
.tb-cover-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.tb-cover-photo-placeholder {
  width: 100%;
  height: 100%;
  background: #9aaa88;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.6);
  font-size: 11pt;
}
.tb-cover-logo {
  position: absolute;
  top: 0;
  right: 0;
  width: 38%;
  height: 11%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 2.2rem;
  z-index: 6;
}
.tb-cover-logo img {
  max-height: 38px;
  max-width: 160px;
  object-fit: contain;
}
.tb-cover-logo-firm {
  font-family: 'Ubuntu', sans-serif;
  font-size: 10pt;
  font-weight: 700;
  color: #3a3a3a;
  letter-spacing: 0.05em;
}
.tb-cover-content {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 44%;
  padding: 0 3rem;
  z-index: 6;
}
.tb-cover-type-label {
  font-size: 8pt;
  letter-spacing: 0.18em;
  color: #b25450;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.7rem;
}
.tb-cover-title {
  font-family: 'Ubuntu', sans-serif;
  font-size: 26pt;
  font-weight: 700;
  color: #3a3a3a;
  line-height: 1.1;
  margin-bottom: 1rem;
}
.tb-cover-addr {
  font-size: 8.5pt;
  color: rgba(58,58,58,0.65);
  letter-spacing: 0.06em;
  line-height: 1.55;
}
.tb-cover-diag {
  position: absolute;
  top: -20%;
  left: 29%;
  width: 2.5px;
  height: 160%;
  background: #b25450;
  transform-origin: top center;
  transform: rotate(20deg);
  z-index: 7;
}

/* ─── INNER PAGE HEADER ─────────────────────────────── */
.tb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2.5rem;
  border-bottom: 1.5px solid #c5b98a;
  margin-bottom: 2rem;
}
.tb-header-logo img { max-height: 24px; object-fit: contain; }
.tb-header-logo-text { font-size: 8pt; font-weight: 700; letter-spacing: 0.05em; color: #3a3a3a; }
.tb-header-addr { font-size: 7pt; letter-spacing: 0.15em; color: #b25450; text-transform: uppercase; }

/* ─── DATEN & FAKTEN ─────────────────────────────────── */
.tb-facts-wrap {
  display: flex;
  min-height: 250mm;
}
.tb-facts-left {
  width: 36%;
  background: #c5b98a;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 2rem 2rem 1.5rem;
  clip-path: polygon(0 0, 100% 0, 78% 100%, 0 100%);
  flex-shrink: 0;
}
.tb-facts-left-hatch {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    -55deg, transparent 0, transparent 3px,
    rgba(255,255,255,0.18) 3px, rgba(255,255,255,0.18) 4.5px
  );
}
.tb-facts-badge {
  position: relative;
  z-index: 2;
  text-align: center;
}
.tb-facts-badge-title {
  font-size: 12pt;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: white;
  text-transform: uppercase;
  line-height: 1.4;
}
.tb-facts-badge-sub {
  font-size: 8pt;
  color: rgba(255,255,255,0.82);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 0.6rem;
}
.tb-ek-chip {
  display: inline-block;
  color: white;
  font-family: 'Ubuntu', sans-serif;
  font-size: 18pt;
  font-weight: 700;
  padding: 0.2rem 0.7rem;
  letter-spacing: 0.05em;
  margin-top: 1.2rem;
  border-radius: 2px;
}
.tb-ek-label {
  font-size: 6.5pt;
  color: rgba(255,255,255,0.75);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 0.25rem;
}
.tb-facts-right {
  flex: 1;
  padding: 2.5rem 2.5rem 2.5rem 3rem;
}
.tb-facts-headline {
  font-family: 'Ubuntu', sans-serif;
  font-size: 38pt;
  font-weight: 300;
  color: #3a3a3a;
  line-height: 1.0;
  margin-bottom: 1.8rem;
}
.tb-facts-subhead {
  font-size: 9pt;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #3a3a3a;
  margin-bottom: 1rem;
}
.tb-data-table {
  width: 100%;
  border-collapse: collapse;
}
.tb-data-table tr:nth-child(odd)  { background: #c8cdb8; }
.tb-data-table tr:nth-child(even) { background: white; }
.tb-data-table td {
  padding: 0.45rem 0.8rem;
  font-size: 8.5pt;
  color: #3a3a3a;
}
.tb-data-table td:first-child { color: #5a5a5a; width: 44%; }
.tb-data-table td:last-child  { font-weight: 500; }

/* ─── BESCHREIBUNG ───────────────────────────────────── */
.tb-desc-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 0 2.5rem;
}
.tb-desc-body {
  font-size: 8.5pt;
  line-height: 1.7;
  color: #3a3a3a;
  white-space: pre-wrap;
}
.tb-hl-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.tb-hl-list li {
  font-size: 8.5pt;
  padding: 0.42rem 0 0.42rem 1.1rem;
  border-bottom: 1px solid #e8e0d0;
  position: relative;
  color: #3a3a3a;
}
.tb-hl-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: #b25450;
}
.tb-photo-overlay-wrap {
  position: relative;
  margin: 1.5rem 0 0;
  height: 88mm;
  overflow: hidden;
}
.tb-photo-overlay-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.tb-photo-overlay-text {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.58));
  padding: 4rem 2.5rem 1.8rem;
}
.tb-photo-overlay-headline {
  font-family: 'Ubuntu', sans-serif;
  font-size: 30pt;
  font-weight: 700;
  color: white;
  letter-spacing: 0.06em;
  line-height: 1;
  text-transform: uppercase;
}

/* ─── LAGE ───────────────────────────────────────────── */
.tb-lage-headline {
  padding: 0 2.5rem 1.5rem;
}
.tb-lage-hl1 {
  font-family: 'Ubuntu', sans-serif;
  font-size: 40pt;
  font-weight: 300;
  color: #3a3a3a;
  letter-spacing: 0.04em;
  line-height: 1;
  text-transform: uppercase;
}
.tb-lage-hl2 {
  font-family: 'Ubuntu', sans-serif;
  font-size: 40pt;
  font-weight: 300;
  color: #b25450;
  letter-spacing: 0.04em;
  line-height: 1;
  text-transform: uppercase;
}
.tb-lage-hl3 {
  font-family: 'Ubuntu', sans-serif;
  font-size: 22pt;
  font-weight: 300;
  color: #3a3a3a;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.tb-lage-body {
  padding: 0 2.5rem;
  font-size: 8.5pt;
  line-height: 1.7;
  color: #3a3a3a;
  white-space: pre-wrap;
  margin-bottom: 1.5rem;
}
.tb-lage-photos {
  display: flex;
  height: 58mm;
  overflow: hidden;
}
.tb-lage-photo1 {
  flex: 1;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%);
}
.tb-lage-photo2 {
  flex: 1;
  overflow: hidden;
  clip-path: polygon(12% 0, 100% 0, 100% 100%, 0 100%);
  margin-left: -12%;
}
.tb-lage-photo1 img, .tb-lage-photo2 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ─── STADTBESCHREIBUNG ─────────────────────────────── */
.tb-stadt-page {
  height: 297mm;
  position: relative;
}
.tb-stadt-bg {
  position: absolute;
  inset: 0;
}
.tb-stadt-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tb-stadt-bg-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #c5b98a 50%, #9aaa88 100%);
}
.tb-stadt-overlay {
  position: absolute;
  right: 0;
  top: 22%;
  width: 58%;
  background: rgba(197,185,138,0.9);
  padding: 2.5rem 2.8rem 2.5rem 3.2rem;
}
.tb-stadt-overlay-title {
  font-family: 'Ubuntu', sans-serif;
  font-size: 16pt;
  font-weight: 700;
  color: white;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.tb-stadt-overlay-body {
  font-size: 8pt;
  line-height: 1.65;
  color: white;
  white-space: pre-wrap;
}

/* ─── AUSSTATTUNG ────────────────────────────────────── */
.tb-aus-top {
  display: flex;
  padding: 0 2.5rem;
  gap: 2.5rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}
.tb-aus-icon {
  flex-shrink: 0;
  width: 55mm;
  opacity: 0.16;
}
.tb-aus-icon svg { width: 100%; height: auto; }
.tb-aus-label {
  font-size: 8pt;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #b25450;
  margin-bottom: 0.6rem;
}
.tb-aus-body {
  font-size: 8.5pt;
  line-height: 1.7;
  color: #3a3a3a;
  white-space: pre-wrap;
  margin-bottom: 1rem;
}
.tb-aus-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.tb-aus-list li {
  font-size: 8.5pt;
  padding: 0.38rem 0 0.38rem 1rem;
  border-bottom: 1px solid #e8e0d0;
  position: relative;
  color: #3a3a3a;
}
.tb-aus-list li::before { content: '•'; position: absolute; left: 0; color: #b25450; }
.tb-aus-photo-wrap {
  position: relative;
  height: 72mm;
  overflow: hidden;
}
.tb-aus-photo-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.tb-aus-photo-text {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.62));
  padding: 3rem 2.5rem 1.5rem;
}
.tb-aus-photo-headline {
  font-family: 'Ubuntu', sans-serif;
  font-size: 40pt;
  font-weight: 700;
  color: white;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

/* ─── WOHNUNGEN / EINHEITEN ─────────────────────────── */
.tb-wohn-title {
  font-family: 'Ubuntu', sans-serif;
  font-size: 62pt;
  font-weight: 300;
  color: #3a3a3a;
  letter-spacing: 0.03em;
  padding: 1.5rem 2.5rem 0;
  line-height: 1;
}
.tb-wohn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;
  padding: 1.5rem 2.5rem;
}
.tb-wohn-item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1.5px solid #3a3a3a;
  padding-bottom: 0.3rem;
  margin-bottom: 0.3rem;
}
.tb-wohn-item-name {
  font-size: 9pt;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #3a3a3a;
}
.tb-wohn-item-sub {
  font-size: 6.5pt;
  color: #7a7a7a;
  display: block;
  margin-top: 0.1rem;
}
.tb-wohn-item-area { font-size: 10pt; font-weight: 700; color: #3a3a3a; }
.tb-wohn-item-price { font-size: 8pt; color: #b25450; text-align: right; margin-top: 0.2rem; }
.tb-wohn-item-count { font-size: 7pt; color: #7a7a7a; margin-top: 0.2rem; }
.tb-units-table { width: 100%; border-collapse: collapse; }
.tb-units-table thead tr { background: #3a3a3a; color: white; }
.tb-units-table thead th { padding: 0.6rem 0.8rem; font-size: 7.5pt; text-align: left; letter-spacing: 0.1em; }
.tb-units-table tbody tr:nth-child(even) { background: #c8cdb8; }
.tb-units-table tbody td { padding: 0.5rem 0.8rem; font-size: 8pt; }

/* ─── FOTOGALERIE ────────────────────────────────────── */
.tb-gallery-label {
  padding: 1.5rem 2.5rem 0.8rem;
  font-size: 7pt;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #b25450;
}
.tb-gallery-hero-wrap {
  padding: 0 2.5rem;
}
.tb-gallery-hero {
  height: 68mm;
  overflow: hidden;
}
.tb-gallery-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.tb-gallery-caption {
  font-size: 5.5pt;
  color: #7a7a7a;
  padding: 0.18rem 0.1rem;
  line-height: 1.3;
}
.tb-gallery-img-wrap {
  overflow: hidden;
}
.tb-gallery-img-wrap img {
  width: 100%;
  height: 40mm;
  object-fit: cover;
  display: block;
}
.tb-gallery-grid3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3px;
  padding: 3px 2.5rem 0;
}
.tb-gallery-grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
  padding: 3px 2.5rem 0;
}

/* ─── KONTAKT ────────────────────────────────────────── */
.tb-contact-page {
  height: 297mm;
  position: relative;
  background: #c5b98a;
}
.tb-contact-bg {
  position: absolute;
  inset: 0;
  display: flex;
}
.tb-contact-bg-left {
  flex: 1;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);
}
.tb-contact-bg-mid {
  flex: 1;
  overflow: hidden;
  clip-path: polygon(20% 0, 100% 0, 80% 100%, 0 100%);
  margin-left: -20%;
}
.tb-contact-bg-right {
  flex: 1;
  overflow: hidden;
  clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%);
  margin-left: -20%;
}
.tb-contact-bg-left img,
.tb-contact-bg-mid  img,
.tb-contact-bg-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.tb-contact-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(197,185,138,0.93);
  padding: 2.5rem 3rem;
  text-align: center;
  min-width: 72mm;
  max-width: 88mm;
  z-index: 5;
}
.tb-contact-logo { margin-bottom: 1.5rem; }
.tb-contact-logo img { max-height: 38px; object-fit: contain; }
.tb-contact-logo-firm { font-weight: 700; font-size: 11pt; color: white; letter-spacing: 0.06em; }
.tb-contact-role {
  font-size: 7pt;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.8);
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}
.tb-contact-name {
  font-family: 'Ubuntu', sans-serif;
  font-size: 14pt;
  font-weight: 400;
  color: white;
  margin-bottom: 1.5rem;
}
.tb-contact-detail {
  font-size: 8.5pt;
  color: white;
  line-height: 1.85;
}
.tb-contact-invest {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.4);
  text-align: left;
}
.tb-contact-invest-label {
  font-size: 7pt;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.8);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.tb-contact-invest-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.tb-contact-invest-list li {
  font-size: 7.5pt;
  color: white;
  padding: 0.22rem 0 0.22rem 0.9rem;
  position: relative;
}
.tb-contact-invest-list li::before {
  content: '›';
  position: absolute;
  left: 0;
  color: #ffcfb3;
}

/* ─── RÜCKSEITE ──────────────────────────────────────── */
.tb-back-page {
  height: 297mm;
  background: #c5b98a;
  position: relative;
}
.tb-back-hatch-r {
  position: absolute;
  right: 0; top: 0;
  width: 45%;
  height: 100%;
  background: repeating-linear-gradient(
    -55deg, transparent 0, transparent 3px,
    rgba(255,255,255,0.15) 3px, rgba(255,255,255,0.15) 4.5px
  );
}
.tb-back-hatch-l {
  position: absolute;
  left: 0; top: 0;
  width: 25%;
  height: 100%;
  background: repeating-linear-gradient(
    -55deg, transparent 0, transparent 3px,
    rgba(255,255,255,0.12) 3px, rgba(255,255,255,0.12) 4.5px
  );
}
.tb-back-diag {
  position: absolute;
  top: -20%;
  left: 25%;
  width: 2.5px;
  height: 160%;
  background: #b25450;
  transform-origin: top center;
  transform: rotate(25deg);
  z-index: 2;
}
.tb-back-diag2 {
  position: absolute;
  top: -20%;
  left: 18%;
  width: 1.5px;
  height: 160%;
  background: rgba(255,255,255,0.28);
  transform-origin: top center;
  transform: rotate(25deg);
  z-index: 2;
}
.tb-back-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 3;
}
.tb-back-street {
  font-size: 12pt;
  letter-spacing: 0.18em;
  color: #3a3a3a;
  text-transform: uppercase;
  margin-bottom: 0.3rem;
}
.tb-back-number {
  font-family: 'Ubuntu', sans-serif;
  font-size: 72pt;
  font-weight: 700;
  color: #b25450;
  line-height: 0.85;
}
.tb-back-subtitle {
  font-size: 8pt;
  color: rgba(58,58,58,0.78);
  letter-spacing: 0.08em;
  margin-top: 0.7rem;
  line-height: 1.5;
}
.tb-back-footer {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}
.tb-back-footer img { max-height: 30px; object-fit: contain; }
.tb-back-footer-firm { font-weight: 700; font-size: 9.5pt; color: #3a3a3a; }
.tb-back-footer-contact { font-size: 7pt; color: #5a5a5a; line-height: 1.7; }

/* ─── PRINT ─────────────────────────────────────────── */
@media print {
  .tb-page { box-shadow: none; margin: 0; }
}
`;

function buildPreviewB() {
  const d = data;
  const size = d.size || 'L';
  const out = document.getElementById('preview-output');
  out.innerHTML = '';

  // Inject CSS with color pair applied
  const pair = (typeof getColorPair === 'function') ? getColorPair() : { accent:'#b25450', secondary:'#c5b98a' };
  const css = TB_CSS
    .replace(/#b25450/g, pair.accent)
    .replace(/#c5b98a/g, pair.secondary);
  let st = document.getElementById('tmpl-b-styles');
  if (!st) { st = document.createElement('style'); st.id = 'tmpl-b-styles'; document.head.appendChild(st); }
  st.textContent = css;

  const esc = escHtml;

  // Logo HTML
  const logoHtml = d.brandLogoSrc
    ? `<img src="${d.brandLogoSrc}" alt="">`
    : d.brandFirma ? `<div class="tb-cover-logo-firm">${esc(d.brandFirma)}</div>` : '';

  const headerLogoHtml = d.brandLogoSrc
    ? `<img src="${d.brandLogoSrc}" style="max-height:22px;object-fit:contain" alt="">`
    : `<span class="tb-header-logo-text">${esc(d.brandFirma || '')}</span>`;

  const pageHeader = `
    <div class="tb-header">
      <div class="tb-header-logo">${headerLogoHtml}</div>
      <div class="tb-header-addr">${esc(d.adresse || d.titel || '')}</div>
    </div>`;

  // ── PAGE 1: COVER ──────────────────────────────────────
  const hero = photos.length ? `<img src="${photos[0].src}" alt="">` : `<div class="tb-cover-photo-placeholder">Kein Foto hochgeladen</div>`;
  out.innerHTML += `
  <div class="tb-page tb-cover">
    <div class="tb-cover-hatch"></div>
    <div class="tb-cover-photo">${hero}</div>
    <div class="tb-cover-logo">${logoHtml}</div>
    <div class="tb-cover-content">
      ${d.type ? `<div class="tb-cover-type-label">${esc(d.type)}</div>` : ''}
      <div class="tb-cover-title">${esc(d.titel || 'Ihre Immobilie')}</div>
      ${d.adresse ? `<div class="tb-cover-addr">${esc(d.adresse)}</div>` : ''}
    </div>
    <div class="tb-cover-diag"></div>
  </div>`;

  // ── PAGE 2: DATEN & FAKTEN ─────────────────────────────
  const dataRows = [
    ['Adresse',          d.adresse],
    ['Objekt-Typ',       d.type],
    ['Baujahr',          d.baujahr],
    ['Zustand',          d.zustand],
    ['Denkmalschutz',    d.denkmal],
    ['Einheiten',        d.einheitenAnz],
    ['Wohnfläche',       d.wohnflaeche],
    ['Gesamtfläche',     d.gesamtflaeche],
    ['Zimmer',           d.zimmer],
    ['Stellplätze',      [d.stellplaetzeTyp, d.stellplaetzeAnz ? d.stellplaetzeAnz+' Pl.' : '', d.stellplaetzeKosten].filter(Boolean).join(' · ') || d.stellplaetze],
    ['Energiestandard',  d.energiestandard],
    ['Heizung',          d.heizung],
    ['Heizungsart',      d.heizungsart],
    ['Energieausweis',   d.energieausweis],
    ['Energieklasse',    d.energieklasse],
    ['Primärenergiebedarf', d.energiekennwert ? d.energiekennwert + ' kWh/(m²·a)' : ''],
    ['Ausweistyp',       d.energieausweisTyp],
    ['Verfügbarkeit',    d.verfuegbar],
    ['Hausgeld',         d.hausgeld],
    ['Kaufpreis',        d.preis],
    ['Käuferprovision',  d.kaeuferp],
    ['Weitere Kosten',   d.weitereKosten],
  ].filter(r => r[1]);

  const badgeTitle = d.energiestandard
    ? d.energiestandard
    : d.einheitenAnz
    ? `${esc(d.einheitenAnz)}<br>Einheiten`
    : esc(d.type || 'Immobilie');
  const badgeSub = d.energiestandard ? 'Energiestandard'
    : d.einheitenAnz ? esc(d.type || '')
    : '';

  const ekColors = {'A+':'#00a651','A':'#57b240','B':'#a8c840','C':'#d4c800','D':'#f0a800','E':'#e87000','F':'#e84000','G':'#c80000','H':'#780000'};
  const ekColor = d.energieklasse ? (ekColors[d.energieklasse] || '#888') : null;
  const ekChipHtml = ekColor ? `<div class="tb-ek-chip" style="background:${ekColor}">${esc(d.energieklasse)}</div><div class="tb-ek-label">Energieklasse</div>` : '';

  const subheadParts = [
    d.einheitenAnz ? `${esc(d.einheitenAnz)} Einheiten` : '',
    d.zimmer       ? `${esc(d.zimmer)} Zimmer` : '',
    d.wohnflaeche  ? `${esc(d.wohnflaeche)} Wohnfläche` : '',
  ].filter(Boolean);

  out.innerHTML += `
  <div class="tb-page">
    ${pageHeader}
    <div class="tb-facts-wrap">
      <div class="tb-facts-left">
        <div class="tb-facts-left-hatch"></div>
        <div class="tb-facts-badge">
          <div class="tb-facts-badge-title">${badgeTitle}</div>
          ${badgeSub ? `<div class="tb-facts-badge-sub">${esc(badgeSub)}</div>` : ''}
          ${ekChipHtml}
        </div>
      </div>
      <div class="tb-facts-right">
        <div class="tb-facts-headline">DATEN &amp;<br>FAKTEN</div>
        ${subheadParts.length ? `<div class="tb-facts-subhead">${subheadParts.join(' · ')}</div>` : ''}
        <table class="tb-data-table">
          ${dataRows.map(([l, v]) => `<tr><td>${esc(l)}</td><td>${esc(v)}</td></tr>`).join('')}
        </table>
      </div>
    </div>
  </div>`;

  // ── PAGE 3: BESCHREIBUNG ───────────────────────────────
  const hlHtml = d.highlights?.length
    ? `<ul class="tb-hl-list">${d.highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>` : '';
  const descPhoto = photos.length > 1 ? photos[1] : null;
  const descPhotoSrc = descPhoto ? descPhoto.src : null;

  out.innerHTML += `
  <div class="tb-page">
    ${pageHeader}
    <div class="tb-desc-cols">
      <div class="tb-desc-body">${esc(d.beschreibung || '')}</div>
      <div>${hlHtml}</div>
    </div>
    ${descPhotoSrc ? `
    <div class="tb-photo-overlay-wrap">
      <img src="${descPhotoSrc}" alt="">
      <div class="tb-photo-overlay-text">
        <div class="tb-photo-overlay-headline">${esc((d.titel || '').toUpperCase())}</div>
      </div>
    </div>` : ''}
  </div>`;

  // ── PAGE 4: LAGE (M+L) ────────────────────────────────
  if ((size === 'M' || size === 'L') && d.lage && isStepEnabled(8)) {
    const lp1 = photos.length > 2 ? photos[2].src : null;
    const lp2 = photos.length > 3 ? photos[3].src : null;
    out.innerHTML += `
    <div class="tb-page">
      ${pageHeader}
      <div class="tb-lage-headline">
        <div class="tb-lage-hl1">IDEALER</div>
        <div class="tb-lage-hl2">STANDORT</div>
        <div class="tb-lage-hl3">INMITTEN URBANER LEBENDIGKEIT</div>
      </div>
      <div class="tb-lage-body">${esc(d.lage)}</div>
      ${(data.mapEnabled && data.mapLat) ? `
      <div style="margin-top:.8rem">${buildStaticMapHtml(data.mapLat, data.mapLon, 58)}</div>` : (lp1 || lp2) ? `
      <div class="tb-lage-photos">
        ${lp1 ? `<div class="tb-lage-photo1"><img src="${lp1}" alt=""></div>` : ''}
        ${lp2 ? `<div class="tb-lage-photo2"><img src="${lp2}" alt=""></div>` : ''}
      </div>` : ''}
    </div>`;
  }

  // ── PAGE 5: STADTBESCHREIBUNG (L) ─────────────────────
  if (size === 'L' && d.stadtbeschr && isStepEnabled(9)) {
    const sp = photos.length > 4 ? photos[4].src : null;
    out.innerHTML += `
    <div class="tb-page tb-stadt-page">
      <div class="tb-stadt-bg">
        ${sp ? `<img src="${sp}" alt="">` : `<div class="tb-stadt-bg-fallback"></div>`}
      </div>
      <div class="tb-stadt-overlay">
        <div class="tb-stadt-overlay-title">Der Standort</div>
        <div class="tb-stadt-overlay-body">${esc(d.stadtbeschr)}</div>
      </div>
    </div>`;
  }

  // ── PAGE 6: AUSSTATTUNG (L) ───────────────────────────
  if (size === 'L' && (d.ausstattung || d.ausstattungList?.length) && isStepEnabled(10)) {
    const ap = photos.length > 5 ? photos[5].src : photos.length > 2 ? photos[2].src : null;
    const ausListHtml = d.ausstattungList?.length
      ? `<ul class="tb-aus-list">${d.ausstattungList.map(a => `<li>${esc(a)}</li>`).join('')}</ul>` : '';
    const buildingIcon = `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#3a3a3a" stroke-width="2.5" stroke-linecap="round">
      <rect x="15" y="42" width="70" height="78" rx="2"/>
      <polygon points="10,42 50,6 90,42"/>
      <rect x="34" y="68" width="13" height="16" rx="1"/>
      <rect x="53" y="68" width="13" height="16" rx="1"/>
      <rect x="34" y="94" width="13" height="26" rx="1"/>
      <rect x="53" y="94" width="13" height="26" rx="1"/>
      <line x1="15" y1="62" x2="85" y2="62"/>
    </svg>`;
    out.innerHTML += `
    <div class="tb-page">
      ${pageHeader}
      <div class="tb-aus-top">
        <div class="tb-aus-icon">${buildingIcon}</div>
        <div style="flex:1">
          <div class="tb-aus-label">Ausstattung &amp; Qualität</div>
          ${d.ausstattung ? `<div class="tb-aus-body">${esc(d.ausstattung)}</div>` : ''}
          ${ausListHtml}
        </div>
      </div>
      ${ap ? `
      <div class="tb-aus-photo-wrap">
        <img src="${ap}" alt="">
        <div class="tb-aus-photo-text">
          <div class="tb-aus-photo-headline">AUSSTATTUNG</div>
        </div>
      </div>` : ''}
    </div>`;
  }

  // ── PAGE 7: EINHEITEN (L) ─────────────────────────────
  if (size === 'L' && isStepEnabled(11) && d.einheiten?.length) {
    if (d.type === 'Neubau-Projekt') {
      out.innerHTML += `
      <div class="tb-page">
        ${pageHeader}
        <div class="tb-wohn-title">WOHNUNGEN</div>
        <div class="tb-wohn-grid">
          ${d.einheiten.map(u => `
          <div>
            <div class="tb-wohn-item-header">
              <div>
                <div class="tb-wohn-item-name">${esc(u.typ)}</div>
                ${u.besonderheit ? `<span class="tb-wohn-item-sub">${esc(u.besonderheit)}</span>` : ''}
              </div>
              <div class="tb-wohn-item-area">${esc(u.flaeche)}</div>
            </div>
            ${u.preis  ? `<div class="tb-wohn-item-price">${esc(u.preis)}</div>` : ''}
            ${u.anzahl ? `<div class="tb-wohn-item-count">Anzahl: ${esc(u.anzahl)}</div>` : ''}
          </div>`).join('')}
        </div>
      </div>`;
    } else {
      out.innerHTML += `
      <div class="tb-page">
        ${pageHeader}
        <div class="tb-wohn-title">EINHEITEN</div>
        <div style="padding:1rem 2.5rem">
          <table class="tb-units-table">
            <thead><tr><th>Typ</th><th>Anzahl</th><th>Wohnfläche</th><th>Preis ab</th><th>Besonderheit</th></tr></thead>
            <tbody>${d.einheiten.map(u => `<tr>
              <td><strong>${esc(u.typ)}</strong></td>
              <td>${esc(u.anzahl)}</td>
              <td>${esc(u.flaeche)}</td>
              <td>${esc(u.preis)}</td>
              <td>${esc(u.besonderheit)}</td>
            </tr>`).join('')}</tbody>
          </table>
        </div>
      </div>`;
    }
  }

  // ── PAGE 8+: FOTOGALERIE ─────────────────────────────
  if (photos.length) {
    // Split into pages: 1 hero + up to 6 more (2 rows of 3) = 7 per page
    const PHOTOS_PER_PAGE = 7;
    const gallPages = [];
    for (let i = 0; i < photos.length; i += PHOTOS_PER_PAGE) gallPages.push(photos.slice(i, i + PHOTOS_PER_PAGE));

    gallPages.forEach((pagePhotos, pgIdx) => {
      const [p0, ...rest] = pagePhotos;
      const chunks = [];
      for (let i = 0; i < rest.length; i += 3) chunks.push(rest.slice(i, i + 3));
      const pageLabel = gallPages.length > 1 ? `IMPRESSIONEN ${pgIdx + 1} / ${gallPages.length}` : 'IMPRESSIONEN';

      out.innerHTML += `
      <div class="tb-page">
        ${pageHeader}
        <div class="tb-gallery-label">${pageLabel}</div>
        <div class="tb-gallery-hero-wrap">
          <div class="tb-gallery-hero"><img src="${p0.src}" alt=""></div>
          ${p0.caption ? `<div class="tb-gallery-caption">${esc(p0.caption)}</div>` : ''}
        </div>
        ${chunks.map(ch => ch.length === 3
          ? `<div class="tb-gallery-grid3">${ch.map(p => `<div class="tb-gallery-img-wrap"><img src="${p.src}" alt="">${p.caption ? `<div class="tb-gallery-caption">${esc(p.caption)}</div>` : ''}</div>`).join('')}</div>`
          : `<div class="tb-gallery-grid2">${ch.map(p => `<div class="tb-gallery-img-wrap"><img src="${p.src}" alt="">${p.caption ? `<div class="tb-gallery-caption">${esc(p.caption)}</div>` : ''}</div>`).join('')}</div>`
        ).join('')}
      </div>`;
    });
  }

  // ── PAGE 9: KONTAKT ───────────────────────────────────
  const hasInvest = size === 'L' && isStepEnabled(12) && (d.investment || d.investHighlights?.length);
  const cpArr = photos.length >= 3 ? photos.slice(-3) : photos;
  const cp0 = cpArr[0] ? cpArr[0].src : null;
  const cp1 = cpArr[1] ? cpArr[1].src : null;
  const cp2 = cpArr[2] ? cpArr[2].src : null;

  const contactLogoHtml = d.brandLogoSrc
    ? `<img src="${d.brandLogoSrc}" style="max-height:36px;object-fit:contain" alt="">`
    : d.brandFirma ? `<div class="tb-contact-logo-firm">${esc(d.brandFirma)}</div>` : '';

  out.innerHTML += `
  <div class="tb-page tb-contact-page">
    <div class="tb-contact-bg">
      ${cp0 ? `<div class="tb-contact-bg-left"><img src="${cp0}" alt=""></div>` : `<div class="tb-contact-bg-left" style="background:#9aaa88"></div>`}
      ${cp1 ? `<div class="tb-contact-bg-mid"><img src="${cp1}" alt=""></div>` : ''}
      ${cp2 ? `<div class="tb-contact-bg-right"><img src="${cp2}" alt=""></div>` : ''}
    </div>
    <div class="tb-contact-box">
      ${contactLogoHtml ? `<div class="tb-contact-logo">${contactLogoHtml}</div>` : ''}
      <div class="tb-contact-role">Ihr Ansprechpartner</div>
      ${d.name ? `<div class="tb-contact-name">${esc(d.name)}</div>` : ''}
      <div class="tb-contact-detail">
        ${d.firma           ? esc(d.firma) + '<br>' : ''}
        ${d.kontaktAdresse  ? esc(d.kontaktAdresse) + '<br>' : ''}
        ${d.tel             ? 'Telefon: ' + esc(d.tel) + '<br>' : ''}
        ${d.email           ? 'E-Mail: ' + esc(d.email) : ''}
      </div>
      ${hasInvest ? `
      <div class="tb-contact-invest">
        <div class="tb-contact-invest-label">Investment-Highlights</div>
        <ul class="tb-contact-invest-list">
          ${(d.investHighlights || []).slice(0, 4).map(h => `<li>${esc(h)}</li>`).join('')}
        </ul>
      </div>` : ''}
    </div>
  </div>`;

  // ── EXTRAS PAGE (optional) ──
  const hasExtrasB = isStepEnabled(14) && (
    (d.extras360Enabled && d.link360) ||
    (d.extrasYTEnabled && d.linkYT) ||
    (d.extrasSonstigesEnabled && d.sonstigerText) ||
    (d.extrasAgbEnabled && d.agbText)
  );
  if (hasExtrasB) {
    const escB = s => (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    const qrBlockB = (enabled, url, label, icon) => {
      if (!enabled || !url) return '';
      const qrSrc = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=' + encodeURIComponent(url);
      return `<div style="display:flex;gap:1.5rem;align-items:flex-start;margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid #e5e0d6">
        <img src="${qrSrc}" alt="QR-Code" style="width:90px;height:90px;flex-shrink:0;border:1px solid #ddd;border-radius:6px">
        <div>
          <div style="font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;color:${pair.accent};font-weight:700;margin-bottom:.3rem">${icon} ${escB(label)}</div>
          <div style="font-size:.8rem;color:#555;word-break:break-all">${escB(url)}</div>
          <div style="font-size:.72rem;color:#999;margin-top:.3rem">QR-Code scannen oder Link direkt aufrufen</div>
        </div>
      </div>`;
    };
    out.innerHTML += `
    <div class="tb-page" style="background:#fff;padding:0">
      <div style="height:8px;background:${pair.accent}"></div>
      <div style="padding:2.5rem 2.8rem">
        <div style="font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:#aaa;margin-bottom:.3rem">EXTRAS</div>
        <div style="font-family:'Ubuntu',sans-serif;font-size:1.7rem;font-weight:700;color:${pair.accent};text-transform:uppercase;letter-spacing:.04em;padding-bottom:.8rem;border-bottom:2px solid ${pair.accent};margin-bottom:1.8rem">Weitere Informationen</div>
        ${qrBlockB(d.extras360Enabled, d.link360, '360°-Rundgang', '🔄')}
        ${qrBlockB(d.extrasYTEnabled, d.linkYT, 'Video', '▶')}
        ${(d.extrasSonstigesEnabled && d.sonstigerText) ? `<div style="margin-bottom:1.5rem"><div style="font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;color:${pair.accent};font-weight:700;margin-bottom:.5rem">SONSTIGES</div><div style="font-size:.88rem;color:#333;line-height:1.8;white-space:pre-wrap">${escB(d.sonstigerText)}</div></div>` : ''}
        ${(d.extrasAgbEnabled && d.agbText) ? `<div style="padding-top:1.5rem;border-top:1px solid #e5e0d6"><div style="font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:#aaa;font-weight:700;margin-bottom:.5rem">RECHTLICHE HINWEISE / AGBS</div><div style="font-size:.75rem;color:#888;line-height:1.7;white-space:pre-wrap">${escB(d.agbText)}</div></div>` : ''}
      </div>
    </div>`;
  }

  // ── PAGE 10: RÜCKSEITE ────────────────────────────────
  const backLogoHtml = d.brandLogoSrc
    ? `<img src="${d.brandLogoSrc}" alt="">`
    : '';
  out.innerHTML += `
  <div class="tb-page tb-back-page">
    <div class="tb-back-hatch-l"></div>
    <div class="tb-back-hatch-r"></div>
    <div class="tb-back-diag2"></div>
    <div class="tb-back-diag"></div>
    <div class="tb-back-content">
      <div class="tb-back-street">${coverStreet}</div>
      ${coverNum
        ? `<div class="tb-back-number">${esc(coverNum)}</div>`
        : `<div class="tb-back-number" style="font-size:30pt">${esc(d.titel || '')}</div>`}
      ${d.untertitel ? `<div class="tb-back-subtitle">${esc(d.untertitel)}</div>` : ''}
    </div>
    <div class="tb-back-footer">
      ${backLogoHtml}
      ${d.brandFirma ? `<div class="tb-back-footer-firm">${esc(d.brandFirma)}</div>` : ''}
      <div class="tb-back-footer-contact">
        ${d.tel   ? esc(d.tel)   + '<br>' : ''}
        ${d.email ? esc(d.email) : ''}
      </div>
    </div>
  </div>`;
}
