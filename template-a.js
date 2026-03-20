// ══════════════════════════════════════════════════════
// TEMPLATE A — Klassisch / Strukturiert
// Weißes Drucklayout, Navy/Gold Akzente
// ══════════════════════════════════════════════════════
function fmtAr(p) {
  const f = p?.format || 'landscape';
  return f === 'portrait' ? '9/16' : f === 'square' ? '1/1' : '16/9';
}

function buildPreviewA() {
  const d = data;
  const size = d.size || 'L';
  const out = document.getElementById('preview-output');
  out.innerHTML = '';

  // Inject color override from selected color pair
  const pair = (typeof getColorPair === 'function') ? getColorPair() : { accent:'#1a1a2e', secondary:'#c4a43c' };
  const overrideId = 'tmpl-a-color-override';
  let overrideEl = document.getElementById(overrideId);
  if (!overrideEl) { overrideEl = document.createElement('style'); overrideEl.id = overrideId; document.head.appendChild(overrideEl); }
  overrideEl.textContent = `
    .expo-cover-logo-text { color: ${pair.accent}!important; }
    .expo-cover-logo-line { background: ${pair.accent}!important; }
    .expo-cover-bottom { border-top-color: ${pair.accent}!important; }
    .expo-cover-title { color: ${pair.accent}!important; }
    .expo-page-header-logo { color: ${pair.accent}!important; }
    .expo-page-title { color: ${pair.accent}!important; border-bottom-color: ${pair.accent}!important; }
    .expo-data-heading { color: ${pair.accent}!important; }
    .expo-data-table td:last-child { color: ${pair.accent}!important; }
    .expo-list li::before { color: ${pair.accent}!important; }
    .expo-units thead tr { background: ${pair.accent}!important; color:#fff!important; }
    .expo-invest-item { border-left-color: ${pair.accent}!important; }
    .expo-invest-value { color: ${pair.accent}!important; }
  `;

  const logoBlock = d.brandLogoSrc
    ? `<img src="${d.brandLogoSrc}" class="expo-cover-logo-img">`
    : d.brandFirma ? `<div class="expo-cover-logo-text">${escHtml(d.brandFirma)}</div><div class="expo-cover-logo-line"></div>` : '';

  const pageHeader = `<div class="expo-page-header"><div class="expo-page-header-logo">${d.brandLogoSrc?`<img src="${d.brandLogoSrc}" style="max-height:28px;object-fit:contain">`:escHtml(d.brandFirma||'')}</div></div>`;

  // ── PAGE 1: COVER ──
  const coverPhoto = photos.find(p => p.isCover) || photos[0];
  const heroImg = coverPhoto
    ? `<img src="${coverPhoto.src}" alt="Hauptbild">`
    : `<div class="expo-cover-hero-placeholder"><span>Kein Hauptbild hochgeladen</span></div>`;
  out.innerHTML += `
  <div class="expo-page expo-cover">
    <div class="expo-cover-header"><div class="expo-cover-logo-block">${logoBlock}</div></div>
    <div class="expo-cover-hero">${heroImg}</div>
    <div class="expo-cover-bottom">
      <div class="expo-cover-title">${escHtml(d.titel||'Ohne Titel')}</div>
      ${d.untertitel?`<div class="expo-cover-adresse">${escHtml(d.untertitel)}</div>`:''}
      <div class="expo-cover-adresse">${escHtml(d.adresse||'')}</div>
      ${d.preis?`<div class="expo-cover-preis">${escHtml(d.preis)}${d.preisDetail?' · '+escHtml(d.preisDetail):''}</div>`:''}
    </div>
  </div>`;

  // ── PAGE 2: OBJEKTDATEN ──
  const dataRows = [
    ['Adresse', d.adresse],
    ['Objekt-Typ', d.type],
    ['Baujahr', d.baujahr],
    ['Zustand', d.zustand],
    ['Verfügbarkeit', d.verfuegbar],
    ['Hausgeld', d.hausgeld],
    ['Denkmalschutz', d.denkmal],
    ['Einheiten', d.einheitenAnz],
    ['Wohnfläche', d.wohnflaeche],
    ['Gesamtfläche', d.gesamtflaeche],
    ['Zimmer', d.zimmer],
    ['Stellplätze', (formatStellplaetzeLines(d.stellplaetze)||[]).join(' · ')],
    ['Energiestandard', d.energiestandard],
    ['Heizung', d.heizung],
    ['Heizungsart', d.heizungsart],
    ['Energieausweis', d.energieausweis],
    ['Energieklasse', d.energieklasse],
    ['Primärenergiebedarf', d.energiekennwert ? d.energiekennwert + ' kWh/(m²·a)' : ''],
    ['Ausweistyp', d.energieausweisTyp],
    ['Kaufpreis', d.preis],
    ['Käuferprovision', d.kaeuferp],
    ['Weitere Kosten', d.weitereKosten],
  ].filter(r=>r[1]);

  const leftRows = dataRows.slice(0, Math.ceil(dataRows.length/2));
  const rightRows = dataRows.slice(Math.ceil(dataRows.length/2));

  const mkTable = rows => `<table class="expo-data-table">${rows.map(r=>`<tr><td>${escHtml(r[0])}</td><td>${escHtml(r[1])}</td></tr>`).join('')}</table>`;

  const sideImg = photos.length > 1 ? `<img src="${photos[1].src}" class="expo-sidebar-img" alt="">` : '';

  out.innerHTML += `
  <div class="expo-page expo-inner">
    ${pageHeader}
    <div class="expo-page-content">
      <div class="expo-page-badge">OBJEKTDATEN</div>
      <div class="expo-page-title">Objektinformationen</div>
      <div class="expo-two-col-wide">
        <div class="expo-two-col">
          <div>${mkTable(leftRows)}</div>
          <div>${mkTable(rightRows)}</div>
        </div>
        ${sideImg?`<div>${sideImg}</div>`:''}
      </div>
    </div>
  </div>`;

  // ── PAGE 3: BESCHREIBUNG ──
  const hlHtml = d.highlights?.length
    ? `<ul class="expo-list">${d.highlights.map(h=>`<li>${escHtml(h)}</li>`).join('')}</ul>` : '';
  out.innerHTML += `
  <div class="expo-page expo-inner">
    ${pageHeader}
    <div class="expo-page-content">
      <div class="expo-page-badge">ÜBERBLICK</div>
      <div class="expo-page-title">${escHtml(d.titel||'Objektbeschreibung')}</div>
      <div class="expo-two-col">
        <div>
          <div class="expo-body">${escHtml(d.beschreibung||'')}</div>
        </div>
        <div>
          ${hlHtml}
          ${photos.length>2?`<img src="${photos[2].src}" style="width:100%;aspect-ratio:${fmtAr(photos[2])};object-fit:cover;margin-top:1rem;border-radius:4px" alt="">` : ''}
        </div>
      </div>
    </div>
  </div>`;

  // ── PAGE 4: LAGE (M+L) ──
  if ((size==='M'||size==='L') && d.lage && isStepEnabled(8)) {
    out.innerHTML += `
    <div class="expo-page expo-inner">
      ${pageHeader}
      <div class="expo-page-content">
        <div class="expo-page-badge">LAGE</div>
        <div class="expo-page-title">Stadtteil & Mikrolage</div>
        <div class="expo-two-col">
          <div class="expo-body-plain"><p>${d.lage.split('\n').filter(Boolean).map(escHtml).join('</p><p>')}</p></div>
          <div>${data.mapEnabled && data.mapLat
            ? buildStaticMapHtml(data.mapLat, data.mapLon, 80)
            : photos.length>3 ? `<img src="${photos[3].src}" style="width:100%;aspect-ratio:${fmtAr(photos[3])};object-fit:cover;border-radius:4px" alt="">` : ''
          }</div>
        </div>
      </div>
    </div>`;
  }

  // ── PAGE 5: STADTBESCHREIBUNG (L) ──
  if (size==='L' && d.stadtbeschr && isStepEnabled(9)) {
    out.innerHTML += `
    <div class="expo-page expo-inner">
      ${pageHeader}
      <div class="expo-page-content">
        <div class="expo-page-badge">STANDORT</div>
        <div class="expo-page-title">Der Standort</div>
        <div class="expo-body-plain"><p>${d.stadtbeschr.split('\n').filter(Boolean).map(escHtml).join('</p><p>')}</p></div>
      </div>
    </div>`;
  }

  // ── PAGE 6: AUSSTATTUNG (L) ──
  if (size==='L' && (d.ausstattung||d.ausstattungList?.length) && isStepEnabled(10)) {
    const ausHtml = d.ausstattungList?.length
      ? `<ul class="expo-list" style="margin-top:1.2rem">${d.ausstattungList.map(a=>`<li>${escHtml(a)}</li>`).join('')}</ul>` : '';
    out.innerHTML += `
    <div class="expo-page expo-inner">
      ${pageHeader}
      <div class="expo-page-content">
        <div class="expo-page-badge">AUSSTATTUNG</div>
        <div class="expo-page-title">Ausstattung & Qualität</div>
        <div class="expo-two-col">
          <div><div class="expo-body">${escHtml(d.ausstattung||'')}</div></div>
          <div>${ausHtml}${photos.length>4?`<img src="${photos[4].src}" style="width:100%;aspect-ratio:${fmtAr(photos[4])};object-fit:cover;margin-top:1rem;border-radius:4px" alt="">`:''}
          </div>
        </div>
      </div>
    </div>`;
  }

  // ── PAGE 7: FOTOS ──
  if (photos.length) {
    const perPage = d.photosPerPage || 7;
    const photoSet = photos.slice(0, perPage);
    const firstThree = photoSet.slice(0,3);
    const rest = photoSet.slice(3);
    out.innerHTML += `
    <div class="expo-page expo-inner" style="padding:0">
      ${pageHeader}
      <div style="padding:0 2.8rem 0">
        <div class="expo-page-badge" style="padding-top:1.5rem">IMPRESSIONEN</div>
        <div class="expo-page-title">Fotogalerie</div>
      </div>
      <div class="expo-photo-grid" style="margin:0 2.8rem">
        ${firstThree.map((s,i)=>i===0?`<img src="${s.src}" style="aspect-ratio:${fmtAr(s)};object-fit:cover" alt="">`:``).join('')}
      </div>
      ${firstThree.length>1?`<div class="expo-photo-grid-2col" style="margin:3px 2.8rem 0">${firstThree.slice(1).map(s=>`<img src="${s.src}" style="aspect-ratio:${fmtAr(s)};object-fit:cover" alt="">`).join('')}</div>`:''}
      ${rest.length?`<div class="expo-photo-grid-2col" style="margin:3px 2.8rem 0">${rest.map(s=>`<img src="${s.src}" style="aspect-ratio:${fmtAr(s)};object-fit:cover" alt="">`).join('')}</div>`:''}
      <div style="height:2rem"></div>
    </div>`;
  }

  // ── PAGE 8: EINHEITEN (L, Neubau-Projekt) ──
  if (size==='L' && d.type==='Neubau-Projekt' && d.einheiten?.length && isStepEnabled(11)) {
    out.innerHTML += `
    <div class="expo-page expo-inner">
      ${pageHeader}
      <div class="expo-page-content">
        <div class="expo-page-badge">WOHNUNGSÜBERSICHT</div>
        <div class="expo-page-title">Verfügbare Einheiten</div>
        <table class="expo-units">
          <thead><tr><th>Typ</th><th>Anzahl</th><th>Wohnfläche</th><th>Kaufpreis ab</th><th>Besonderheit</th></tr></thead>
          <tbody>${d.einheiten.map(e=>`<tr><td><strong>${escHtml(e.typ)}</strong></td><td>${escHtml(e.anzahl)}</td><td>${escHtml(e.flaeche)}</td><td>${escHtml(e.preis)}</td><td>${escHtml(e.besonderheit)}</td></tr>`).join('')}</tbody>
        </table>
      </div>
    </div>`;
  }

  // ── PAGE 9: INVESTMENT + KONTAKT (L) / KONTAKT (S/M) ──
  const investSection = (size==='L' && isStepEnabled(12) && (d.investment||d.investHighlights?.length)) ? `
    <div class="expo-page-badge">KAPITALANLAGE</div>
    <div class="expo-page-title">Investment-Case</div>
    ${d.investment?`<div class="expo-body-plain" style="margin-bottom:1.2rem"><p>${escHtml(d.investment)}</p></div>`:''}
    ${d.investHighlights?.length?`<ul class="expo-list">${d.investHighlights.map(h=>`<li>${escHtml(h)}</li>`).join('')}</ul>`:''}
    <div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid #e5e7eb">
  ` : `<div class="expo-page-badge">KONTAKT</div><div class="expo-page-title">Ihr Ansprechpartner</div><div>`;

  const contactBlock = (d.name||d.tel||d.email||d.firma) ? `
    <div class="expo-contact">
      ${d.name?`<div class="expo-contact-item"><strong>Name</strong><span>${escHtml(d.name)}</span></div>`:''}
      ${d.tel?`<div class="expo-contact-item"><strong>Telefon</strong><span>${escHtml(d.tel)}</span></div>`:''}
      ${d.email?`<div class="expo-contact-item"><strong>E-Mail</strong><span>${escHtml(d.email)}</span></div>`:''}
      ${d.firma?`<div class="expo-contact-item"><strong>Firma</strong><span>${escHtml(d.firma)}</span></div>`:''}
      ${d.kontaktAdresse?`<div class="expo-contact-item"><strong>Adresse</strong><span>${escHtml(d.kontaktAdresse)}</span></div>`:''}
    </div>` : '';

  out.innerHTML += `
  <div class="expo-page expo-inner">
    ${pageHeader}
    <div class="expo-page-content">
      ${investSection}
      ${(size==='L'&&isStepEnabled(12)&&(d.investment||d.investHighlights?.length))?`<div class="expo-page-badge" style="margin-top:0">KONTAKT</div><div class="expo-page-title" style="font-size:1.2rem">Ihr Ansprechpartner</div>`:''}
      ${contactBlock}
      </div>
    </div>
  </div>`;

  // ── EXTRAS PAGE (optional) ──
  const hasExtras = isStepEnabled(14) && (
    (d.extras360Enabled && d.link360) ||
    (d.extrasYTEnabled && d.linkYT) ||
    (d.extrasSonstigesEnabled && d.sonstigerText) ||
    (d.extrasAgbEnabled && d.agbText)
  );
  if (hasExtras) {
    const qrBlock = (enabled, url, label, icon) => {
      if (!enabled || !url) return '';
      const qrSrc = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=' + encodeURIComponent(url);
      return `<div style="display:flex;gap:1.5rem;align-items:flex-start;margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid #f0f0f0">
        <img src="${qrSrc}" alt="QR-Code" style="width:90px;height:90px;flex-shrink:0;border:1px solid #e5e7eb;border-radius:6px">
        <div>
          <div style="font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;color:${pair.accent};font-weight:700;margin-bottom:.3rem">${icon} ${escHtml(label)}</div>
          <div style="font-size:.8rem;color:#555;word-break:break-all">${escHtml(url)}</div>
          <div style="font-size:.72rem;color:#999;margin-top:.3rem">QR-Code scannen oder Link direkt aufrufen</div>
        </div>
      </div>`;
    };
    const sonstigesBlock = (d.extrasSonstigesEnabled && d.sonstigerText) ? `
      <div style="margin-bottom:1.5rem">
        <div style="font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;color:${pair.accent};font-weight:700;margin-bottom:.5rem">SONSTIGES</div>
        <div style="font-size:.88rem;color:#333;line-height:1.8;white-space:pre-wrap">${escHtml(d.sonstigerText)}</div>
      </div>` : '';
    const agbBlock = (d.extrasAgbEnabled && d.agbText) ? `
      <div style="padding-top:1.5rem;border-top:1px solid #f0f0f0">
        <div style="font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:#999;font-weight:700;margin-bottom:.5rem">RECHTLICHE HINWEISE / AGBS</div>
        <div style="font-size:.75rem;color:#888;line-height:1.7;white-space:pre-wrap">${escHtml(d.agbText)}</div>
      </div>` : '';
    out.innerHTML += `
    <div class="expo-page expo-inner">
      ${pageHeader}
      <div class="expo-page-content">
        <div class="expo-page-badge">EXTRAS</div>
        <div class="expo-page-title">Weitere Informationen</div>
        ${qrBlock(d.extras360Enabled, d.link360, '360°-Rundgang', '🔄')}
        ${qrBlock(d.extrasYTEnabled, d.linkYT, 'Video', '▶')}
        ${sonstigesBlock}
        ${agbBlock}
      </div>
    </div>`;
  }
}
