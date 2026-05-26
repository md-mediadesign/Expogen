// Bauzaunbanner-Template: 3400 × 1730 mm
// Sicherheitsrand 80 mm allseits (Ösen-Bereich) — wichtige Inhalte nur im "safe zone"
// 1 Hauptbild + 2 Nebenbilder + ORANGE-Logo
// generateBanner(state) → eigenständiges HTML-Dokument für Print

function generateBanner(state) {
  const w = 3400, h = 1730; // mm
  const safe = 80;          // Ösen-Sicherheitsrand
  const f = state.fields || {};
  const imgs = state.images || [];
  const logo = state.logoSrc || '';
  const accent = state.accent || '#c9a84c';
  const dark = '#1a1a2e';

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const sideImg = (idx) =>
    imgs[idx]
      ? `<img src="${esc(imgs[idx])}" alt="">`
      : `<div style="width:100%;height:100%;background:#ddd"></div>`;

  const logoMarkup = logo
    ? `<img src="${esc(logo)}" alt="Logo" class="logo-img">`
    : `<div class="logo-text">${esc(f.firma || "")}</div>`;

  return `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>Bauzaunbanner · ${esc(f.titel || '')}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  @page { size: ${w}mm ${h}mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${w}mm; height: ${h}mm; }
  body { font-family: 'Manrope', sans-serif; color: ${dark}; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .banner { width: ${w}mm; height: ${h}mm; position: relative; overflow: hidden; }
  .safe-zone { position: absolute; top: ${safe}mm; left: ${safe}mm; right: ${safe}mm; bottom: ${safe}mm; border: 2mm dashed rgba(244,159,37,.4); pointer-events: none; }
  @media print { .safe-zone { display: none; } }
  /* Linke Hälfte: Hauptbild */
  .hero { position: absolute; top: 0; left: 0; width: 56%; height: 100%; overflow: hidden; background: #ddd; }
  .hero img { width: 100%; height: 100%; object-fit: cover; display: block; }
  /* Rechte Hälfte: Text + 2 Nebenbilder */
  .content { position: absolute; top: 0; right: 0; width: 44%; height: 100%; padding: ${safe + 60}mm ${safe + 40}mm ${safe + 40}mm ${60}mm; display: flex; flex-direction: column; gap: 50mm; background: #fff; }
  .top-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 40mm; }
  .kicker { font-weight: 800; font-size: 60pt; letter-spacing: .2em; text-transform: uppercase; color: ${accent}; line-height: 1; }
  .titel { font-weight: 900; font-size: 200pt; line-height: .92; letter-spacing: -.03em; color: ${dark}; word-break: break-word; }
  .untertitel { font-weight: 500; font-size: 60pt; line-height: 1.2; color: #555; max-width: 95%; }
  .preis-wrap { padding-top: 24mm; border-top: 8mm solid ${accent}; }
  .preis { font-weight: 800; font-size: 140pt; color: ${accent}; line-height: 1; letter-spacing: -.02em; }
  .preis-detail { font-weight: 500; font-size: 44pt; color: #707173; margin-top: 10mm; }
  .adresse { font-weight: 700; font-size: 60pt; color: ${dark}; line-height: 1.15; }
  .side-imgs { display: grid; grid-template-columns: 1fr 1fr; gap: 16mm; height: 240mm; }
  .side-imgs > div, .side-imgs img { width: 100%; height: 100%; object-fit: cover; display: block; background: #ddd; border-radius: 4mm; }
  .footer { margin-top: auto; display: flex; flex-direction: column; gap: 10mm; }
  .kontakt-label { font-weight: 700; font-size: 32pt; letter-spacing: .15em; text-transform: uppercase; color: ${accent}; }
  .kontakt-name { font-weight: 700; font-size: 54pt; color: ${dark}; }
  .kontakt-tel { font-weight: 800; font-size: 100pt; color: ${dark}; letter-spacing: -.01em; }
  .kontakt-line { font-weight: 500; font-size: 40pt; color: #707173; }
  /* Logo: oben links auf Hauptbild */
  .logo-on-hero { position: absolute; top: ${safe + 60}mm; left: 60mm; background: rgba(255,255,255,.96); padding: 24mm 36mm; border-radius: 4mm; box-shadow: 0 8mm 24mm rgba(0,0,0,.2); }
  .logo-img { height: 80mm; width: auto; object-fit: contain; display: block; }
  .logo-text { font-weight: 900; font-size: 90pt; letter-spacing: .25em; text-transform: uppercase; color: ${accent}; }
</style></head><body>
  <div class="banner">
    <div class="hero">
      ${sideImg(0)}
      <div class="logo-on-hero">${logoMarkup}</div>
    </div>
    <div class="content">
      <div class="top-row" style="flex-direction:column;gap:30mm">
        ${f.kicker ? `<div class="kicker">${esc(f.kicker)}</div>` : ''}
        ${f.titel ? `<div class="titel">${esc(f.titel)}</div>` : ''}
        ${f.untertitel ? `<div class="untertitel">${esc(f.untertitel)}</div>` : ''}
      </div>
      ${(f.preis || f.preisDetail) ? `<div class="preis-wrap">${f.preis ? `<div class="preis">${esc(f.preis)}</div>` : ''}${f.preisDetail ? `<div class="preis-detail">${esc(f.preisDetail)}</div>` : ''}</div>` : ''}
      ${f.adresse ? `<div class="adresse">${esc(f.adresse)}</div>` : ''}
      <div class="side-imgs">${sideImg(1)}${sideImg(2)}</div>
      <div class="footer">
        ${f.firma ? `<div class="kontakt-label">${esc(f.firma)}</div>` : '<div class="kontakt-label">Kontakt</div>'}
        ${f.name ? `<div class="kontakt-name">${esc(f.name)}</div>` : ''}
        ${f.tel ? `<div class="kontakt-tel">${esc(f.tel)}</div>` : ''}
        ${f.email ? `<div class="kontakt-line">${esc(f.email)}</div>` : ''}
      </div>
    </div>
    <div class="safe-zone"></div>
  </div>
</body></html>`;
}

const BANNER_CONFIG = {
  variants: [
    { id: 'standard', label: 'Standard', size: '340 × 173 cm (mit 8 cm Ösen-Rand)' },
  ],
  fields: [
    { key: 'kicker',       label: 'Kicker (Eyecatcher)',   placeholder: 'z. B. Hier entsteht' },
    { key: 'titel',        label: 'Titel (groß!)',          placeholder: 'z. B. Quartier Mittelring' },
    { key: 'untertitel',   label: 'Untertitel',             placeholder: 'z. B. 11 Eigentumswohnungen' },
    { key: 'preis',        label: 'Preis',                  placeholder: 'z. B. ab 189.000 €' },
    { key: 'preisDetail',  label: 'Preis-Zusatz',           placeholder: 'z. B. provisionsfrei' },
    { key: 'adresse',      label: 'Lage',                   placeholder: 'Straße, PLZ Ort' },
    { key: 'firma',        label: 'Firma',                  placeholder: '' },
    { key: 'name',         label: 'Ansprechpartner:in',     placeholder: 'Name' },
    { key: 'tel',          label: 'Telefon (groß sichtbar)', placeholder: '0341 / 123 456 78' },
    { key: 'email',        label: 'E-Mail',                 placeholder: '' },
  ],
  imageSlots: 3,
  notes: 'Im Editor wird ein gestrichelter Rahmen angezeigt — alles innerhalb dieses Rahmens liegt im sicheren Bereich (≥ 8 cm von der Bannerkante entfernt). Beim Druck wird der Rahmen ausgeblendet.',
};
