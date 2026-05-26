// Flyer-Template – nachempfunden „Flyer1694" (A5/DIN lang) + „Postkarte" (Postkarte quer 2-seitig).
// Farb-Adaption: ORANGE-Branding statt Blau/Braun.

function generateFlyer(state) {
  const variants = {
    dinlang:    { w: '99mm',  h: '210mm', label: 'DIN lang' },
    a5:         { w: '148mm', h: '210mm', label: 'A5' },
    postkarte:  { w: '148mm', h: '105mm', label: 'Postkarte quer' },
  };
  const v = variants[state.variant] || variants.dinlang;
  const f = state.fields || {};
  const imgs = state.images || [];
  const logo = state.logoSrc || '';
  const accent = state.accent || '#c9a84c';
  const dark = '#1a1a2e';

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const img = (idx) => imgs[idx]
    ? `<img src="${esc(imgs[idx])}" alt="">`
    : `<div class="img-empty"></div>`;
  const logoMarkup = logo
    ? `<img src="${esc(logo)}" alt="Logo" class="logo-img">`
    : `<div class="logo-text">${esc(f.firma || "")}</div>`;

  // ═══════════════════════════════════════════════════
  // POSTKARTE: 2-seitig (Vorder- + Rückseite)
  // ═══════════════════════════════════════════════════
  if (state.variant === 'postkarte') {
    return generatePostkarte({ f, imgs, logo, accent, dark, esc, img, logoMarkup, v });
  }

  // ═══════════════════════════════════════════════════
  // A5 / DIN lang: Flyer1694-Style
  // ═══════════════════════════════════════════════════
  const isA5 = state.variant === 'a5';
  const padding = isA5 ? 8 : 6;       // mm
  const heroH   = isA5 ? 70 : 65;     // mm
  const blockH  = isA5 ? 48 : 42;     // mm

  // Eckdaten als 2-spaltige Liste im Color-Block – möglichst voll
  const facts = [
    f.zimmer && `${f.zimmer} Zimmer`,
    f.wohnflaeche && f.wohnflaeche,
    f.baujahr && `Baujahr ${f.baujahr}`,
    f.zustand,
    f.energiestandard,
    f.heizung,
  ].filter(Boolean).slice(0, 6);

  // Highlights als Aufzählungspunkte unter der Beschreibung
  const highlights = (f.highlights || '').split(/[,\n]/).map(x => x.trim()).filter(Boolean).slice(0, isA5 ? 5 : 3);

  // Hat das Tool ein Lage-Feld? Wenn nein → Beschreibung volle Breite
  const hasLage = !!(f.lage || f.adresse);

  return `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>Flyer · ${esc(f.titel || '')}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  @page { size: ${v.w} ${v.h}; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${v.w}; height: ${v.h}; }
  body { font-family: 'Manrope', sans-serif; color: ${dark}; background: #ECEAE3; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .flyer { width: ${v.w}; height: ${v.h}; padding: ${padding}mm; display: flex; flex-direction: column; }

  /* Header: Logo + Markenname */
  .head { display: flex; align-items: center; gap: 3mm; margin-bottom: ${padding * 0.5}mm; }
  .head .logo-img { height: 9mm; width: auto; object-fit: contain; }
  .head .logo-text { font-weight: 800; font-size: 9pt; letter-spacing: .2em; color: ${dark}; text-transform: uppercase; }
  .head-name { font-weight: 600; font-size: 9pt; color: ${dark}; }

  /* Hero-Bild zentral */
  .hero { width: 100%; height: ${heroH}mm; overflow: hidden; border-radius: 2mm; background: #d6d6d6; margin-bottom: 0; }
  .hero img, .hero .img-empty { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* Großer Color-Block: Headline + Preis + Eckdaten */
  .block { background: ${dark}; color: #fff; padding: ${isA5 ? 7 : 5}mm; margin-top: -${isA5 ? 8 : 6}mm; margin-left: -${padding/2}mm; margin-right: -${padding/2}mm; border-radius: 2mm; display: grid; grid-template-columns: 1fr 1fr; gap: ${isA5 ? 6 : 4}mm; min-height: ${blockH}mm; }
  .block-l { display: flex; flex-direction: column; justify-content: center; gap: 1mm; }
  .kicker { font-weight: 500; font-size: ${isA5 ? 8 : 7}pt; letter-spacing: .12em; text-transform: uppercase; opacity: .8; }
  .headline { font-weight: 800; font-size: ${isA5 ? 22 : 16}pt; line-height: .98; letter-spacing: -.02em; color: #fff; }
  .headline-accent { color: ${accent}; }
  .block-r { display: flex; flex-direction: column; justify-content: center; gap: 2mm; }
  .price-label { font-weight: 500; font-size: ${isA5 ? 7 : 6}pt; letter-spacing: .14em; text-transform: uppercase; opacity: .85; }
  .price-value { font-weight: 800; font-size: ${isA5 ? 18 : 13}pt; line-height: 1.05; color: ${accent}; letter-spacing: -.01em; }
  .facts { display: grid; grid-template-columns: 1fr 1fr; gap: ${isA5 ? 1.5 : 1}mm ${isA5 ? 4 : 3}mm; margin-top: 1.5mm; }
  .fact { font-weight: 500; font-size: ${isA5 ? 8 : 6.5}pt; line-height: 1.3; opacity: .92; }
  .fact::before { content: "•"; color: ${accent}; margin-right: 1.5mm; font-weight: 800; }

  /* 2-spaltiger Body (oder 1 Spalte falls keine Lage gepflegt) */
  .body { padding: ${isA5 ? 5 : 3}mm 0 ${isA5 ? 3 : 2}mm; flex: 1; display: grid; grid-template-columns: ${hasLage ? '1fr 1fr' : '1fr'}; gap: ${isA5 ? 6 : 4}mm; min-height: 0; }
  .body-col-title { font-weight: 800; font-size: ${isA5 ? 11 : 9}pt; color: ${accent}; margin-bottom: 1.5mm; letter-spacing: -.01em; }
  .body-col-text { font-weight: 400; font-size: ${isA5 ? 8 : 6.5}pt; line-height: 1.5; color: #2a2a2e; display: -webkit-box; -webkit-line-clamp: ${isA5 ? 14 : 10}; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; }
  .hl-list { padding-top: 1.5mm; display: flex; flex-direction: column; gap: ${isA5 ? 1.2 : .8}mm; }
  .hl-item { font-weight: 600; font-size: ${isA5 ? 7.5 : 6}pt; color: ${dark}; padding-left: 3mm; position: relative; line-height: 1.3; }
  .hl-item::before { content: "▸"; position: absolute; left: 0; color: ${accent}; font-weight: 800; }

  /* Footer */
  .footer { border-top: 1px solid ${dark}; padding-top: ${isA5 ? 3 : 2}mm; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 3mm; align-items: end; }
  .foot-block { display: flex; flex-direction: column; gap: .3mm; }
  .foot-label { font-weight: 800; font-size: ${isA5 ? 9 : 7.5}pt; color: ${accent}; letter-spacing: .02em; }
  .foot-value { font-weight: 500; font-size: ${isA5 ? 7 : 5.5}pt; color: ${dark}; line-height: 1.3; }
</style></head><body>
  <div class="flyer">
    <div class="head">
      ${logoMarkup}
      ${f.firma ? `<div class="head-name">${esc(f.firma)}</div>` : ''}
    </div>

    <div class="hero">${img(0)}</div>

    <div class="block">
      <div class="block-l">
        ${f.kicker ? `<div class="kicker">${esc(f.kicker)}</div>` : ''}
        <div class="headline">${esc(f.titel || 'Immobilie')}</div>
        ${f.untertitel ? `<div class="headline" style="font-size:${isA5 ? 22 : 16}pt"><span class="headline-accent">${esc(f.untertitel)}</span></div>` : ''}
      </div>
      <div class="block-r">
        ${(f.preis || f.preisDetail) ? `<div><div class="price-label">${esc(f.preisDetail || 'Preis ab')}</div><div class="price-value">${esc(f.preis || '')}</div></div>` : ''}
        ${facts.length ? `<div class="facts">${facts.map(x => `<div class="fact">${esc(x)}</div>`).join('')}</div>` : ''}
      </div>
    </div>

    <div class="body">
      <div>
        <div class="body-col-title">Über das Objekt</div>
        <div class="body-col-text">${esc(f.beschreibung || f.untertitel || '')}</div>
        ${highlights.length ? `<div class="hl-list">${highlights.map(h => `<div class="hl-item">${esc(h)}</div>`).join('')}</div>` : ''}
      </div>
      ${hasLage ? `<div>
        <div class="body-col-title">Die Lage</div>
        <div class="body-col-text">${esc(f.lage || f.adresse || '')}</div>
        ${(f.ausstattung) ? `<div class="body-col-title" style="margin-top:${isA5 ? 4 : 3}mm">Ausstattung</div><div class="body-col-text" style="-webkit-line-clamp:${isA5 ? 8 : 6}">${esc(f.ausstattung)}</div>` : ''}
      </div>` : ''}
    </div>

    <div class="footer">
      <div class="foot-block">
        <div class="foot-label">Get In Touch</div>
        ${f.name ? `<div class="foot-value">${esc(f.name)}</div>` : ''}
      </div>
      <div class="foot-block">
        <div class="foot-label">Telefon</div>
        ${f.tel ? `<div class="foot-value">${esc(f.tel)}</div>` : ''}
      </div>
      <div class="foot-block">
        <div class="foot-label">Web</div>
        ${f.email ? `<div class="foot-value">${esc(f.email)}</div>` : ''}
      </div>
    </div>
  </div>
</body></html>`;
}

// ═══════════════════════════════════════════════════════════════
// POSTKARTE quer (148×105mm), 2-seitig (Vorder + Rückseite)
// nachempfunden „Postkarte"-Vorlage – edel, zentriert, dunkler Streifen
// ═══════════════════════════════════════════════════════════════
function generatePostkarte({ f, imgs, logo, accent, dark, esc, img, logoMarkup, v }) {
  const cream = '#F5F1EA';
  return `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>Postkarte · ${esc(f.titel || '')}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,500;0,700;1,400&display=swap" rel="stylesheet">
<style>
  @page { size: ${v.w} ${v.h}; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${v.w}; }
  body { font-family: 'Manrope', sans-serif; color: ${dark}; background: ${cream}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .pk { width: ${v.w}; height: ${v.h}; position: relative; overflow: hidden; }
  .pk + .pk { page-break-before: always; }

  /* ── VORDERSEITE ── */
  .pk-front { display: flex; flex-direction: column; }
  .front-logo { text-align: center; padding: 5mm 8mm 3mm; }
  .front-logo .logo-img { height: 11mm; width: auto; object-fit: contain; display: block; margin: 0 auto; }
  .front-logo .logo-text { font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 16pt; letter-spacing: .25em; color: ${dark}; text-transform: uppercase; }
  .front-logo .logo-sub { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 7pt; letter-spacing: .35em; color: ${accent}; text-transform: uppercase; margin-top: 1mm; font-style: italic; }
  .front-image { flex: 1; margin: 0 6mm; background: #c0c0c0; overflow: hidden; }
  .front-image img, .front-image .img-empty { width: 100%; height: 100%; object-fit: cover; display: block; }
  .front-stripe { background: ${dark}; color: #fff; padding: 4mm 8mm; display: grid; grid-template-columns: 1fr auto 1fr; gap: 4mm; align-items: center; text-align: center; }
  .stripe-l, .stripe-r { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 9pt; letter-spacing: .25em; text-transform: uppercase; opacity: .85; }
  .stripe-c { font-weight: 700; font-size: 14pt; letter-spacing: .04em; color: ${accent}; }
  .front-bottom { padding: 3mm 8mm 4mm; text-align: center; }
  .front-tagline { font-weight: 500; font-size: 9pt; letter-spacing: .35em; color: ${dark}; text-transform: uppercase; margin-bottom: 2mm; }
  .front-tagline span { color: ${accent}; margin: 0 1.5mm; }
  .front-desc { font-weight: 400; font-size: 7pt; line-height: 1.45; color: #444; max-width: 95%; margin: 0 auto; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

  /* ── RÜCKSEITE ── */
  .pk-back { display: grid; grid-template-columns: 1fr 1fr; }
  .back-l { display: flex; flex-direction: column; }
  .back-img { flex: 1; background: #c0c0c0; overflow: hidden; }
  .back-img img, .back-img .img-empty { width: 100%; height: 100%; object-fit: cover; display: block; }
  .back-contact { background: ${dark}; color: #fff; padding: 5mm 6mm; }
  .back-name { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 11pt; letter-spacing: .15em; text-transform: uppercase; margin-bottom: 1mm; }
  .back-name-line { width: 14mm; height: 1px; background: ${accent}; margin-bottom: 3mm; }
  .back-mail { font-weight: 500; font-size: 7.5pt; letter-spacing: .04em; }
  .back-tel { font-weight: 500; font-size: 7.5pt; letter-spacing: .04em; margin-bottom: 3mm; }
  .back-text { font-weight: 400; font-size: 6.5pt; line-height: 1.45; opacity: .9; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
  .back-r { padding: 6mm; display: flex; flex-direction: column; justify-content: space-between; position: relative; }
  .back-stamp { position: absolute; top: 5mm; right: 5mm; width: 14mm; height: 14mm; background: ${dark}; border-radius: 1mm; }
  .back-lines { margin-top: 22mm; display: flex; flex-direction: column; gap: 4.5mm; }
  .back-lines .ln { height: 1px; background: rgba(0,0,0,.4); width: 80%; }
  .back-logo { text-align: center; margin-top: auto; padding-bottom: 2mm; }
  .back-logo .logo-img { height: 11mm; width: auto; object-fit: contain; display: block; margin: 0 auto; }
  .back-logo .logo-text { font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 14pt; letter-spacing: .25em; color: ${dark}; text-transform: uppercase; }
  .back-logo .logo-sub { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 6pt; letter-spacing: .35em; color: ${accent}; text-transform: uppercase; margin-top: 1mm; font-style: italic; }
  .back-tag { text-align: center; font-weight: 500; font-size: 7pt; letter-spacing: .35em; color: ${dark}; text-transform: uppercase; padding: 0 8mm 2.5mm; line-height: 1.5; }
</style></head><body>

  <!-- VORDERSEITE -->
  <div class="pk pk-front">
    <div class="front-logo">
      ${logoMarkup}
      <div class="logo-sub">Real Estate</div>
    </div>
    <div class="front-image">${img(0)}</div>
    <div class="front-stripe">
      <div class="stripe-l">${esc(f.kicker || 'Aktuell')}</div>
      <div class="stripe-c">${esc(f.preis || '')}</div>
      <div class="stripe-r">${esc(f.preisDetail || 'Limited Edition')}</div>
    </div>
    <div class="front-bottom">
      <div class="front-tagline">
        ${esc(f.titel || 'Komfortabel').toUpperCase()}
        <span>|</span>
        ${esc(f.untertitel || 'Exklusiv').toUpperCase()}
        <span>|</span>
        ${esc(f.zustand || 'Modern').toUpperCase()}
      </div>
      <div class="front-desc">${esc(f.beschreibung || f.lage || f.adresse || '')}</div>
    </div>
  </div>

  <!-- RÜCKSEITE -->
  <div class="pk pk-back">
    <div class="back-l">
      <div class="back-img">${img(1)}</div>
      <div class="back-contact">
        <div class="back-name">${esc(f.name || 'Ansprechpartner')}</div>
        <div class="back-name-line"></div>
        ${f.email ? `<div class="back-mail">${esc(f.email)}</div>` : ''}
        ${f.tel ? `<div class="back-tel">${esc(f.tel)}</div>` : ''}
        <div class="back-text">${esc(f.lage || f.beschreibung || '')}</div>
      </div>
    </div>
    <div class="back-r">
      <div class="back-stamp"></div>
      <div class="back-lines">
        <div class="ln"></div><div class="ln"></div><div class="ln"></div>
        <div class="ln"></div><div class="ln"></div>
      </div>
      <div class="back-logo">
        ${logoMarkup}
        <div class="logo-sub">Real Estate</div>
      </div>
    </div>
  </div>
  <div class="back-tag">${esc((f.untertitel || 'Exklusiver Service auf Premium-Niveau').toUpperCase())}</div>

</body></html>`;
}

const FLYER_CONFIG = {
  variants: [
    { id: 'dinlang',   label: 'DIN lang',          size: '99 × 210 mm' },
    { id: 'a5',        label: 'A5',                size: '148 × 210 mm' },
    { id: 'postkarte', label: 'Postkarte quer',    size: '148 × 105 mm · 2-seitig' },
  ],
  fields: [
    { key: 'kicker',       label: 'Kicker (oben/Streifen)', placeholder: 'z. B. Neu & Exklusiv' },
    { key: 'titel',        label: 'Titel (Headline)',       placeholder: 'z. B. Haus zu verkaufen' },
    { key: 'untertitel',   label: 'Untertitel (Akzent)',    placeholder: 'z. B. Mit Garten' },
    { key: 'preis',        label: 'Preis',                  placeholder: 'z. B. ab 189.000 €' },
    { key: 'preisDetail',  label: 'Preis-Label',            placeholder: 'z. B. Preis ab' },
    { key: 'wohnflaeche',  label: 'Wohnfläche',             placeholder: 'z. B. 78 m²' },
    { key: 'zimmer',       label: 'Zimmer',                 placeholder: 'z. B. 3' },
    { key: 'baujahr',      label: 'Baujahr',                placeholder: 'z. B. 2026' },
    { key: 'zustand',      label: 'Zustand / Tag',          placeholder: 'z. B. Erstbezug' },
    { key: 'energiestandard', label: 'Energie-Standard',    placeholder: 'z. B. KfW 40' },
    { key: 'heizung',      label: 'Heizung',                placeholder: 'z. B. Wärmepumpe' },
    { key: 'adresse',      label: 'Lage / Adresse',         placeholder: 'Straße, PLZ Ort' },
    { key: 'beschreibung', label: 'Über das Objekt',        placeholder: 'Kurzer Verkaufstext', multiline: true },
    { key: 'lage',         label: 'Über die Lage',          placeholder: 'Lagebeschreibung', multiline: true },
    { key: 'highlights',   label: 'Highlights (Komma-getrennt)', placeholder: 'z. B. Balkon, EBK, Garage, Pool' },
    { key: 'ausstattung',  label: 'Ausstattung',            placeholder: 'Bodenbeläge, Sanitär, Smart Home …', multiline: true },
    { key: 'name',         label: 'Ansprechpartner:in',     placeholder: 'Name' },
    { key: 'firma',        label: 'Firma',                  placeholder: '' },
    { key: 'tel',          label: 'Telefon',                placeholder: '' },
    { key: 'email',        label: 'E-Mail / Web',           placeholder: '' },
  ],
  imageSlots: 3,
};
