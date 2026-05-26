// Social-Media-Post-Template – nachempfunden „Real Estate Instagram Post" (Marco-Vorlage).
// Quadratisch 1:1 (270×270mm Druck = hoher Pixel-Export für Instagram-Upload).
// Farb-Adaption: ORANGE-Branding.

function generateSocialpost(state) {
  const w = 270, h = 270; // mm – ergibt bei 96 dpi ~1020 px, beim PDF-Export hochauflösend
  const f = state.fields || {};
  const imgs = state.images || [];
  const logo = state.logoSrc || '';
  const accent = state.accent || '#c9a84c';
  const dark = '#1a1a2e';
  const cream = '#F5F3EE';

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const img = (idx) => imgs[idx]
    ? `<img src="${esc(imgs[idx])}" alt="">`
    : `<div class="img-empty"></div>`;
  const logoMarkup = logo
    ? `<img src="${esc(logo)}" alt="Logo" class="logo-img">`
    : `<div class="logo-text">${esc(f.firma || "")}</div>`;

  // Top-3 Features für Badges
  const featuresRaw = (f.highlights || f.featuresList || '').split(/[\n,]/).map(x => x.trim()).filter(Boolean).slice(0, 3);
  const features = featuresRaw.length > 0 ? featuresRaw : [
    f.zimmer && `${f.zimmer} Zimmer`,
    f.wohnflaeche,
    f.zustand,
  ].filter(Boolean).slice(0, 3);

  // Highlights für die Querleiste in der Mitte
  const highlightLine = (f.lage || f.untertitel || f.adresse || '').split(',').map(s => s.trim()).filter(Boolean).slice(0, 3);
  const fallbackLine = highlightLine.length > 0 ? highlightLine : [f.adresse || ''];

  return `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>Social Post · ${esc(f.titel || '')}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  @page { size: ${w}mm ${h}mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${w}mm; height: ${h}mm; }
  body { font-family: 'Manrope', sans-serif; color: ${dark}; background: ${cream}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .post { width: ${w}mm; height: ${h}mm; display: grid; grid-template-rows: 1.6fr 1.6fr .65fr .65fr; }

  /* Reihe 1: Titel-Block links + Hauptbild rechts */
  .row1 { display: grid; grid-template-columns: 1fr 1fr; }
  .titel-block { background: ${cream}; padding: 14mm 12mm; display: flex; flex-direction: column; justify-content: center; gap: 4mm; }
  .kicker { font-weight: 500; font-size: 11pt; color: ${dark}; opacity: .7; }
  .headline { font-weight: 800; font-size: 40pt; line-height: .9; letter-spacing: -.025em; color: ${dark}; }
  .headline-accent { color: ${accent}; display: block; }
  .img-main { background: #c0c0c0; overflow: hidden; }

  /* Reihe 2: Nebenbild links + Features-Block rechts */
  .row2 { display: grid; grid-template-columns: 1fr 1fr; }
  .img-side { background: #c0c0c0; overflow: hidden; }
  .features-block { background: ${dark}; color: #fff; padding: 12mm 11mm; display: flex; flex-direction: column; justify-content: space-between; }
  .feat-title { font-weight: 800; font-size: 16pt; letter-spacing: -.01em; margin-bottom: 4mm; }
  .feat-pills { display: flex; flex-direction: column; gap: 3mm; }
  .feat-pill { background: rgba(255,255,255,.95); color: ${dark}; border-radius: 100px; padding: 3mm 6mm; font-weight: 600; font-size: 11pt; display: flex; align-items: center; gap: 3mm; }
  .feat-pill::before { content: "✓"; color: ${accent}; font-weight: 800; }
  .price-wrap { margin-top: 6mm; }
  .price-label { font-weight: 500; font-size: 9pt; letter-spacing: .14em; text-transform: uppercase; opacity: .8; }
  .price-value { font-weight: 800; font-size: 24pt; line-height: 1.05; color: ${accent}; margin-top: 1mm; letter-spacing: -.01em; }

  .img-main img, .img-side img, .img-empty { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* Reihe 3: Highlight-Liste in 3 Zellen quer */
  .row3 { display: grid; grid-template-columns: repeat(3, 1fr); }
  .row3 > div { padding: 6mm 8mm; display: flex; align-items: center; gap: 3mm; font-weight: 600; font-size: 11pt; color: ${dark}; }
  .row3 > div::before { content: "•"; color: ${accent}; font-weight: 800; font-size: 18pt; }
  .row3 > div:nth-child(1) { background: ${cream}; }
  .row3 > div:nth-child(2) { background: ${dark}; color: #fff; }
  .row3 > div:nth-child(2)::before { color: ${accent}; }
  .row3 > div:nth-child(3) { background: ${cream}; }

  /* Reihe 4: Footer Kontakt + Mehr Info + Logo */
  .row4 { display: grid; grid-template-columns: 1fr 1fr; }
  .foot-l { background: ${dark}; color: #fff; padding: 6mm 8mm; display: flex; flex-direction: column; justify-content: center; gap: 1mm; }
  .foot-r { background: ${cream}; color: ${dark}; padding: 6mm 8mm; display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 4mm; }
  .foot-label { font-weight: 800; font-size: 12pt; letter-spacing: -.005em; }
  .foot-r .foot-label { color: ${dark}; }
  .foot-l .foot-label { color: #fff; }
  .foot-value { font-weight: 600; font-size: 9pt; line-height: 1.35; }
  .foot-l .foot-value { color: rgba(255,255,255,.9); }
  .foot-tel { font-weight: 800; font-size: 14pt; color: ${accent}; }
  .foot-logo .logo-img { height: 13mm; width: auto; object-fit: contain; }
  .foot-logo .logo-text { font-weight: 800; font-size: 10pt; letter-spacing: .2em; color: ${accent}; text-transform: uppercase; }
</style></head><body>
  <div class="post">

    <!-- Reihe 1 -->
    <div class="row1">
      <div class="titel-block">
        ${f.kicker ? `<div class="kicker">${esc(f.kicker)}</div>` : ''}
        <div class="headline">${esc((f.titel || 'Real Estate').split(' ')[0])}<span class="headline-accent">${esc((f.titel || 'Real Estate').split(' ').slice(1).join(' ') || 'Estate')}</span></div>
      </div>
      <div class="img-main">${img(0)}</div>
    </div>

    <!-- Reihe 2 -->
    <div class="row2">
      <div class="img-side">${img(1)}</div>
      <div class="features-block">
        <div>
          <div class="feat-title">Property Features</div>
          <div class="feat-pills">
            ${features.map(it => `<div class="feat-pill">${esc(it)}</div>`).join('')}
          </div>
        </div>
        ${(f.preis || f.preisDetail) ? `<div class="price-wrap"><div class="price-label">${esc(f.preisDetail || 'Preis ab')}</div><div class="price-value">${esc(f.preis || '')}</div></div>` : ''}
      </div>
    </div>

    <!-- Reihe 3 -->
    <div class="row3">
      ${[0,1,2].map(i => `<div>${esc(fallbackLine[i] || '')}</div>`).join('')}
    </div>

    <!-- Reihe 4 -->
    <div class="row4">
      <div class="foot-l">
        <div class="foot-label">Kontakt</div>
        ${f.tel ? `<div class="foot-tel">${esc(f.tel)}</div>` : ''}
        ${f.name ? `<div class="foot-value">${esc(f.name)}</div>` : ''}
      </div>
      <div class="foot-r">
        <div>
          <div class="foot-label">Mehr Infos</div>
          ${f.adresse ? `<div class="foot-value">${esc(f.adresse)}</div>` : ''}
          ${f.email ? `<div class="foot-value" style="color:${accent}">${esc(f.email)}</div>` : ''}
        </div>
        <div class="foot-logo">${logoMarkup}</div>
      </div>
    </div>
  </div>
</body></html>`;
}

const SOCIALPOST_CONFIG = {
  variants: [
    { id: 'standard', label: 'Quadrat 1:1', size: '270 × 270 mm · für Instagram/Facebook' },
  ],
  fields: [
    { key: 'kicker',       label: 'Kicker',                 placeholder: 'z. B. Wir präsentieren' },
    { key: 'titel',        label: 'Headline',               placeholder: 'z. B. Real Estate' },
    { key: 'preis',        label: 'Preis',                  placeholder: 'z. B. ab 1.500.000 €' },
    { key: 'preisDetail',  label: 'Preis-Label',            placeholder: 'z. B. Preis ab' },
    { key: 'highlights',   label: 'Top 3 Features (Komma-getrennt)', placeholder: 'z. B. Schlafzimmer, Pool, Wäscheraum' },
    { key: 'lage',         label: 'Highlights-Zeile (3 Stichworte, Komma-getrennt)', placeholder: 'z. B. Spacious Layout, Helle Räume, Top-Lage' },
    { key: 'adresse',      label: 'Adresse',                placeholder: '123 Main Street, Ort' },
    { key: 'name',         label: 'Ansprechpartner',        placeholder: 'Name' },
    { key: 'tel',          label: 'Telefon (groß)',         placeholder: '0341 / 123 456 78' },
    { key: 'email',        label: 'Web / E-Mail',           placeholder: 'orange-immobilien.de' },
  ],
  imageSlots: 2,
};
