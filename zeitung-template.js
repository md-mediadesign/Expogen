// Zeitungsanzeigen-Template mit adaptivem Layout.
// Zeigt je nach Fläche (Breite × Höhe in mm) automatisch unterschiedlich viel Inhalt:
//   XS  (< 30 cm²)  → Titel + Preis + Kontakt
//   S   (30–80 cm²) → + Adresse + 2-3 Highlights
//   M   (80–200 cm²) → + kleines Foto rechts
//   L   (> 200 cm²) → + Beschreibung + größeres Foto

function generateZeitung(state) {
  // Maße ermitteln: bei "custom" aus state.fields._w/_h, sonst aus Variant
  let w = 92, h = 60; // Default: 2-Spalter
  const presets = {
    'small':  { w: 45,  h: 60  },
    'medium': { w: 92,  h: 60  },
    'large':  { w: 92,  h: 130 },
    'half':   { w: 190, h: 140 },
  };
  if (state.variant === 'custom') {
    const cw = parseInt(state.fields?._w, 10);
    const ch = parseInt(state.fields?._h, 10);
    if (cw > 0) w = cw;
    if (ch > 0) h = ch;
  } else if (presets[state.variant]) {
    w = presets[state.variant].w;
    h = presets[state.variant].h;
  }

  const f = state.fields || {};
  const imgs = state.images || [];
  const logo = state.logoSrc || '';
  const accent = state.accent || '#c9a84c';
  const dark = '#1a1a2e';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Größenklasse
  const area = w * h; // mm²
  const sizeClass =
    area < 3000 ? 'xs' :
    area < 8000 ? 's'  :
    area < 20000 ? 'm' :
    'l';

  const showHighlights = sizeClass !== 'xs';
  const showFoto       = sizeClass === 'm' || sizeClass === 'l';
  const showLageDesc   = sizeClass === 'l' || sizeClass === 'm';
  const showAusstattung = sizeClass === 'l';

  // Skalierung – kleine Anzeigen brauchen kleinere Schrift
  const fs = sizeClass === 'xs' ? .7 : sizeClass === 's' ? .85 : sizeClass === 'm' ? .95 : 1.05;

  // Highlights aus Komma-Liste oder Highlights-Array – mehr für größere Anzeigen
  const hlMax = sizeClass === 's' ? 3 : sizeClass === 'm' ? 5 : 7;
  let highlights = (f.highlights || '').split(/[,\n]/).map(x => x.trim()).filter(Boolean).slice(0, hlMax);
  // Fallback aus Eckdaten falls keine highlights gepflegt
  if (highlights.length === 0 && showHighlights) {
    highlights = [
      f.zimmer && `${f.zimmer} Zimmer`,
      f.wohnflaeche,
      f.baujahr && `Baujahr ${f.baujahr}`,
      f.zustand,
      f.energiestandard,
      f.heizung,
    ].filter(Boolean).slice(0, hlMax);
  }

  // Padding skaliert mit Größe
  const pad = sizeClass === 'xs' ? 2 : sizeClass === 's' ? 3 : 4;

  const logoMarkup = logo
    ? `<img src="${esc(logo)}" alt="Logo" class="logo-img">`
    : `<div class="logo-text">${esc(f.firma || "")}</div>`;

  const fotoBlock = showFoto && imgs[0]
    ? `<div class="foto"><img src="${esc(imgs[0])}" alt=""></div>`
    : '';

  return `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>Zeitungsanzeige · ${esc(f.titel || '')}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  @page { size: ${w}mm ${h}mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${w}mm; height: ${h}mm; }
  body { font-family: 'Manrope', sans-serif; color: ${dark}; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .anzeige { position: relative; width: ${w}mm; height: ${h}mm; padding: ${pad}mm; border: ${sizeClass === 'xs' ? '.4mm' : '.5mm'} solid ${dark}; display: ${showFoto ? 'grid' : 'flex'}; ${showFoto ? `grid-template-columns: ${sizeClass === 'l' ? '1.3fr 1fr' : '1.5fr 1fr'}; gap: ${pad}mm;` : 'flex-direction: column;'} }

  .body { display: flex; flex-direction: column; gap: ${pad * .35}mm; min-width: 0; }
  .head-row { display: flex; align-items: center; justify-content: space-between; gap: 1mm; }
  .kicker { font-weight: 700; font-size: ${5 * fs}pt; letter-spacing: .12em; text-transform: uppercase; color: ${accent}; }
  .logo { flex-shrink: 0; }
  .logo .logo-img { height: ${4 * fs}mm; width: auto; object-fit: contain; }
  .logo .logo-text { font-weight: 800; font-size: ${5 * fs}pt; letter-spacing: .15em; color: ${accent}; text-transform: uppercase; }

  .titel { font-weight: 800; font-size: ${(sizeClass === 'xs' ? 7 : sizeClass === 's' ? 9 : sizeClass === 'm' ? 11 : 13) * fs}pt; line-height: 1.05; letter-spacing: -.01em; color: ${dark}; word-break: break-word; }
  .untertitel { font-weight: 500; font-size: ${5.5 * fs}pt; color: #555; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
  .preis { font-weight: 800; font-size: ${(sizeClass === 'xs' ? 7 : sizeClass === 's' ? 9 : 11) * fs}pt; color: ${accent}; letter-spacing: -.01em; margin-top: ${pad * .25}mm; }
  .preis-detail { font-size: ${5 * fs}pt; color: #666; font-weight: 500; }
  .adresse { font-size: ${5.5 * fs}pt; color: ${dark}; font-weight: 600; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

  .highlights { display: flex; flex-direction: column; gap: ${pad * .15}mm; padding-top: ${pad * .2}mm; }
  .hl { font-size: ${5 * fs}pt; color: #333; line-height: 1.3; padding-left: 2mm; position: relative; }
  .hl::before { content: "▸"; position: absolute; left: 0; color: ${accent}; font-weight: 800; }

  .desc { font-size: ${5.5 * fs}pt; color: #444; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: ${sizeClass === 'l' ? 8 : 5}; -webkit-box-orient: vertical; overflow: hidden; padding-top: ${pad * .25}mm; }
  .ausst { font-size: ${5 * fs}pt; color: #555; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; padding-top: ${pad * .2}mm; font-style: italic; }
  .size-tag { position: absolute; bottom: 1mm; right: 2mm; font-size: ${4.5 * fs}pt; color: ${accent}; font-weight: 700; opacity: .85; letter-spacing: .04em; }
  @media print { .size-tag { display: none; } }

  .foto { background: #ddd; overflow: hidden; border-radius: 1mm; min-height: 0; }
  .foto img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .footer { margin-top: auto; padding-top: ${pad * .35}mm; border-top: .2mm solid #ccc; display: flex; justify-content: space-between; align-items: end; gap: 1.5mm; flex-wrap: wrap; }
  .foot-l { font-size: ${5 * fs}pt; color: ${dark}; line-height: 1.25; font-weight: 600; }
  .foot-r { font-size: ${5 * fs}pt; color: #555; line-height: 1.25; text-align: right; }
  .foot-tel { font-weight: 800; color: ${accent}; }
</style></head><body>
  <div class="anzeige">
    <div class="body">
      <div class="head-row">
        ${f.kicker ? `<div class="kicker">${esc(f.kicker)}</div>` : '<div class="kicker">Immobilie</div>'}
        <div class="logo">${logoMarkup}</div>
      </div>
      <div class="titel">${esc(f.titel || 'Immobilie zu verkaufen')}</div>
      ${f.untertitel ? `<div class="untertitel">${esc(f.untertitel)}</div>` : ''}
      ${(f.preis) ? `<div class="preis">${esc(f.preis)}${f.preisDetail ? `<span class="preis-detail"> · ${esc(f.preisDetail)}</span>` : ''}</div>` : ''}
      ${(sizeClass !== 'xs' && f.adresse) ? `<div class="adresse">${esc(f.adresse)}</div>` : ''}

      ${(showHighlights && highlights.length) ? `<div class="highlights">${highlights.map(h => `<div class="hl">${esc(h)}</div>`).join('')}</div>` : ''}

      ${(showLageDesc && (f.beschreibung || f.lage)) ? `<div class="desc">${esc(f.beschreibung || f.lage)}</div>` : ''}

      ${(showAusstattung && f.ausstattung) ? `<div class="ausst">${esc(f.ausstattung)}</div>` : ''}

      <div class="footer">
        <div class="foot-l">
          ${f.firma ? esc(f.firma) : ''}<br>
          ${f.tel ? `<span class="foot-tel">${esc(f.tel)}</span>` : ''}
        </div>
        <div class="foot-r">
          ${f.name ? esc(f.name) : ''}<br>
          ${f.email ? esc(f.email) : ''}
        </div>
      </div>
    </div>

    ${fotoBlock}

    <div class="size-tag">${w} × ${h} mm</div>
  </div>
</body></html>`;
}

const ZEITUNG_CONFIG = {
  variants: [
    { id: 'small',  label: '1-Spalter',     size: '45 × 60 mm' },
    { id: 'medium', label: '2-Spalter',     size: '92 × 60 mm' },
    { id: 'large',  label: 'Quartalsanz.',  size: '92 × 130 mm' },
    { id: 'half',   label: 'Halbe Seite',   size: '190 × 140 mm' },
    { id: 'custom', label: 'Eigenes Maß',   size: 'Breite/Höhe in mm', custom: true },
  ],
  fields: [
    { key: '_w',           label: 'Breite (mm) — nur bei "Eigenes Maß"', placeholder: 'z. B. 92' },
    { key: '_h',           label: 'Höhe (mm) — nur bei "Eigenes Maß"',   placeholder: 'z. B. 60' },
    { key: 'kicker',       label: 'Kicker',         placeholder: 'z. B. Neu am Markt' },
    { key: 'titel',        label: 'Titel',          placeholder: 'z. B. 3-Zi-Wohnung Leipzig-Süd' },
    { key: 'untertitel',   label: 'Kurzbeschreibung (1 Zeile)', placeholder: 'z. B. Mit Balkon, Erstbezug' },
    { key: 'preis',        label: 'Preis',          placeholder: 'z. B. 189.000 €' },
    { key: 'preisDetail',  label: 'Preis-Zusatz',   placeholder: 'z. B. provisionsfrei' },
    { key: 'adresse',      label: 'Lage / Adresse', placeholder: 'Stadtteil, Ort' },
    { key: 'highlights',   label: 'Highlights (Komma-getrennt)', placeholder: 'z. B. Balkon, EBK, Stellplatz, Garten' },
    { key: 'beschreibung', label: 'Beschreibung (M/L)',     placeholder: 'Kurzer Verkaufstext', multiline: true },
    { key: 'ausstattung',  label: 'Ausstattung (nur L)',    placeholder: 'Bodenbeläge, Sanitär, Smart Home …', multiline: true },
    { key: 'energiestandard', label: 'Energie-Standard',    placeholder: 'z. B. KfW 40' },
    { key: 'heizung',      label: 'Heizung',                placeholder: 'z. B. Wärmepumpe' },
    { key: 'wohnflaeche',  label: 'Wohnfläche',             placeholder: 'z. B. 78 m²' },
    { key: 'zimmer',       label: 'Zimmer',                 placeholder: 'z. B. 3' },
    { key: 'baujahr',      label: 'Baujahr',                placeholder: 'z. B. 2026' },
    { key: 'zustand',      label: 'Zustand',                placeholder: 'z. B. Erstbezug' },
    { key: 'firma',        label: 'Firma',          placeholder: '' },
    { key: 'name',         label: 'Ansprechpartner',placeholder: 'Name' },
    { key: 'tel',          label: 'Telefon',        placeholder: '' },
    { key: 'email',        label: 'E-Mail / Web',   placeholder: '' },
  ],
  imageSlots: 1,
  notes: 'Layout passt sich automatisch an: Bei sehr kleinen Anzeigen (< 30 cm²) nur Titel + Preis. Größere zeigen zusätzlich Highlights und Foto. Wähle "Eigenes Maß" und gib Breite + Höhe in den ersten zwei Feldern an.',
};
