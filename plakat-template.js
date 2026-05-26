// Plakat-Template – nachempfunden „Real Estate Plakat" (Marco-Vorlage).
// 2 Varianten: A3 (297×420mm) und A2 (420×594mm), beide hochformat.
// Farb-Adaption: ORANGE-Branding statt Blau, Anthrazit als Color-Block-Begleiter.

function generatePlakat(state) {
  const variants = {
    a3: { w: '297mm', h: '420mm', label: 'A3', s: 1   },
    a2: { w: '420mm', h: '594mm', label: 'A2', s: 1.4 },
  };
  const v = variants[state.variant] || variants.a3;
  const f = state.fields || {};
  const imgs = state.images || [];
  const logo = state.logoSrc || '';
  const accent = state.accent || '#c9a84c';
  const dark = '#1a1a2e';
  const cream = '#F5F4EE';
  const s = v.s; // Skalierung A3 → A2

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const img = (idx) => imgs[idx]
    ? `<img src="${esc(imgs[idx])}" alt="">`
    : `<div class="img-empty"></div>`;

  const logoMarkup = logo
    ? `<img src="${esc(logo)}" alt="Logo" class="logo-img">`
    : `<div class="logo-text">${esc(f.firma || "")}</div>`;

  // Features-Liste (max. 4) – baut nummerierte Items aus highlights/ausstattung
  const featuresRaw = (f.highlights || f.featuresList || '').split(/[\n,]/).map(x => x.trim()).filter(Boolean).slice(0, 4);
  const features = featuresRaw.length > 0 ? featuresRaw : [
    f.zimmer && `${f.zimmer} Zimmer`,
    f.wohnflaeche && `${f.wohnflaeche} Wohnfläche`,
    f.baujahr && `Baujahr ${f.baujahr}`,
    f.zustand,
  ].filter(Boolean).slice(0, 4);

  return `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>Plakat · ${esc(f.titel || '')}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  @page { size: ${v.w} ${v.h}; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${v.w}; height: ${v.h}; }
  body { font-family: 'Manrope', sans-serif; color: ${dark}; background: ${cream}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .plakat { width: ${v.w}; height: ${v.h}; position: relative; padding: ${15 * s}mm; display: flex; flex-direction: column; }

  /* Header: Kicker + Logo */
  .head-row { display: flex; align-items: center; justify-content: space-between; gap: ${10 * s}mm; margin-bottom: ${8 * s}mm; }
  .kicker { font-weight: 600; font-size: ${10 * s}pt; letter-spacing: .25em; text-transform: uppercase; color: ${dark}; }
  .kicker-line { flex: 1; height: 2px; background: ${accent}; margin-left: ${4 * s}mm; max-width: ${50 * s}mm; }
  .head-logo .logo-img { height: ${10 * s}mm; width: auto; object-fit: contain; }
  .head-logo .logo-text { font-weight: 800; font-size: ${12 * s}pt; letter-spacing: .2em; color: ${accent}; text-transform: uppercase; }

  /* Headline-Block mit Preis-Eyecatcher */
  .headline-row { position: relative; margin-bottom: ${10 * s}mm; }
  .headline { font-weight: 800; font-size: ${64 * s}pt; line-height: .92; letter-spacing: -.025em; color: ${dark}; }
  .price-box { position: absolute; top: ${4 * s}mm; right: 0; background: ${accent}; color: #fff; padding: ${5 * s}mm ${8 * s}mm; border-radius: ${2 * s}mm; text-align: right; max-width: ${85 * s}mm; }
  .price-label { font-weight: 600; font-size: ${10 * s}pt; letter-spacing: .12em; text-transform: uppercase; opacity: .9; }
  .price-value { font-weight: 800; font-size: ${24 * s}pt; line-height: 1.05; margin-top: ${1 * s}mm; }
  /* Eyecatcher Pfeil-Icon (CSS-Stack) */
  .arrow-stack { display: inline-flex; flex-direction: column; gap: ${2 * s}mm; margin-left: ${4 * s}mm; vertical-align: middle; }
  .arrow-stack .a1, .arrow-stack .a2 { width: ${14 * s}mm; height: ${5 * s}mm; border-top: ${2 * s}mm solid ${accent}; border-right: ${2 * s}mm solid ${accent}; transform: rotate(-45deg) skew(-20deg, -20deg); }
  .arrow-stack .a2 { opacity: .55; }

  /* Bild-Mosaik: 1 großes links, 2 kleinere rechts gestapelt */
  .img-mosaic { display: grid; grid-template-columns: 1.4fr 1fr; gap: ${3 * s}mm; height: ${165 * s}mm; margin-bottom: ${10 * s}mm; }
  .img-main { background: #d6d6d6; border-radius: ${4 * s}mm; overflow: hidden; }
  .img-side { display: flex; flex-direction: column; gap: ${3 * s}mm; }
  .img-side > * { flex: 1; background: #d6d6d6; border-radius: ${4 * s}mm; overflow: hidden; }
  .img-mosaic img, .img-empty { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* Property-Features-Sektion */
  .features-row { display: grid; grid-template-columns: auto 1fr 1.2fr; gap: ${8 * s}mm; align-items: start; margin-bottom: ${8 * s}mm; }
  .feat-badge { background: ${accent}; color: #fff; padding: ${10 * s}mm ${8 * s}mm; border-radius: ${3 * s}mm; font-weight: 800; font-size: ${16 * s}pt; line-height: 1.05; letter-spacing: .02em; text-transform: uppercase; min-width: ${60 * s}mm; text-align: center; }
  .feat-list { display: flex; flex-direction: column; gap: ${3 * s}mm; padding-top: ${2 * s}mm; }
  .feat-item { font-weight: 700; font-size: ${12 * s}pt; color: ${dark}; letter-spacing: .04em; text-transform: uppercase; }
  .feat-item-num { color: ${accent}; margin-right: ${2 * s}mm; }
  .feat-desc { font-weight: 400; font-size: ${10 * s}pt; line-height: 1.55; color: #444; padding-top: ${1 * s}mm; }

  /* Footer dunkel */
  .footer { margin-top: auto; background: ${dark}; color: #fff; padding: ${7 * s}mm ${10 * s}mm; border-radius: ${3 * s}mm; display: flex; justify-content: space-between; align-items: center; gap: ${8 * s}mm; flex-wrap: wrap; }
  .foot-contact { display: flex; flex-direction: column; gap: ${0.5 * s}mm; }
  .foot-label { font-weight: 600; font-size: ${9 * s}pt; letter-spacing: .15em; text-transform: uppercase; color: ${accent}; }
  .foot-value { font-weight: 600; font-size: ${11 * s}pt; }
  .foot-web { font-weight: 700; font-size: ${13 * s}pt; color: #fff; }
</style></head><body>
  <div class="plakat">
    <div class="head-row">
      <div style="display:flex;align-items:center;flex:1">
        <div class="kicker">${esc(f.kicker || 'Wir präsentieren')}</div>
        <div class="kicker-line"></div>
      </div>
      <div class="head-logo">${logoMarkup}</div>
    </div>

    <div class="headline-row">
      <div class="headline">${esc(f.titel || 'Real Estate')}<span class="arrow-stack"><span class="a1"></span><span class="a2"></span></span></div>
      ${(f.preis || f.preisDetail) ? `<div class="price-box"><div class="price-label">${esc(f.preisDetail || 'Preis ab')}</div><div class="price-value">${esc(f.preis || '')}</div></div>` : ''}
    </div>

    <div class="img-mosaic">
      <div class="img-main">${img(0)}</div>
      <div class="img-side">
        <div>${img(1)}</div>
        <div>${img(2)}</div>
      </div>
    </div>

    <div class="features-row">
      <div class="feat-badge">Property<br>Features</div>
      <div class="feat-list">
        ${features.map((it, i) => `<div class="feat-item"><span class="feat-item-num">${String(i+1).padStart(2,'0')}.</span>${esc(it)}</div>`).join('')}
      </div>
      <div class="feat-desc">${esc(f.beschreibung || f.untertitel || '')}</div>
    </div>

    <div class="footer">
      <div class="foot-contact">
        <span class="foot-label">Kontakt</span>
        ${f.name ? `<span class="foot-value">${esc(f.name)}</span>` : ''}
        ${f.tel ? `<span class="foot-value">${esc(f.tel)}</span>` : ''}
      </div>
      <div class="foot-contact" style="text-align:right">
        <span class="foot-label">Web</span>
        <span class="foot-web">${esc(f.email || f.firma || 'orange-immobilien.de')}</span>
      </div>
    </div>
  </div>
</body></html>`;
}

const PLAKAT_CONFIG = {
  variants: [
    { id: 'a3', label: 'A3', size: '297 × 420 mm' },
    { id: 'a2', label: 'A2', size: '420 × 594 mm' },
  ],
  fields: [
    { key: 'kicker',       label: 'Kicker (oben links)',  placeholder: 'z. B. Wir präsentieren' },
    { key: 'titel',        label: 'Headline',              placeholder: 'z. B. Real Estate' },
    { key: 'preis',        label: 'Preis',                 placeholder: 'z. B. ab 189.000 €' },
    { key: 'preisDetail',  label: 'Preis-Label',           placeholder: 'z. B. Preis ab' },
    { key: 'highlights',   label: 'Top-Features (max. 4, Komma-getrennt)', placeholder: 'z. B. 4 Schlafzimmer, Wohnzimmer, Gästebad, Pool' },
    { key: 'beschreibung', label: 'Kurzer Beschreibungstext', placeholder: 'Kurz, max. 2-3 Sätze', multiline: true },
    { key: 'name',         label: 'Ansprechpartner',       placeholder: 'Name' },
    { key: 'tel',          label: 'Telefon',               placeholder: '' },
    { key: 'email',        label: 'Web / E-Mail',          placeholder: 'orange-immobilien.de' },
    { key: 'firma',        label: 'Firma',                 placeholder: '' },
  ],
  imageSlots: 3,
};
