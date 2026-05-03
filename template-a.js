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
  const coverIdx = photos.findIndex(p => p.isCover);
  const coverSlot = coverIdx >= 0 ? coverIdx : 0;
  const heroImg = coverPhoto
    ? previewImgWrap(coverPhoto, coverSlot, 'width:100%;height:100%;min-height:550px', '')
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
    ['Stellplätze', (formatStellplaetzeLines(d.stellplaetze)||[]).join('\n')],
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

  const mkTable = rows => `<table class="expo-data-table">${rows.map(r=>`<tr><td>${escHtml(r[0])}</td><td>${escHtml(r[1]).replace(/\n/g,'<br>')}</td></tr>`).join('')}</table>`;

  const sideImg = photos.length > 1 ? previewImgWrap(photos[1], 1, 'width:100%;aspect-ratio:3/4;border-radius:4px', '') : '';

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

  // ── PAGE 3: GRUNDRISSE (wenn vorhanden) ──
  if (typeof grundrisse !== 'undefined' && grundrisse.length > 0) {
    const grClass = grundrisse.length === 1 ? 'expo-gr-grid-1' : 'expo-gr-grid-2';
    out.innerHTML += `
    <div class="expo-page expo-inner">
      ${pageHeader}
      <div class="expo-page-content">
        <div class="expo-page-badge">GRUNDRISSE</div>
        <div class="expo-page-title">Grundriss &amp; Raumaufteilung</div>
        <div class="${grClass}">
          ${grundrisse.map(gr => `
          <div class="expo-gr-item">
            <div class="expo-gr-img-wrap"><img src="${gr.src}" alt="Grundriss"></div>
            ${gr.caption ? `<div class="expo-gr-caption">${escHtml(gr.caption)}</div>` : ''}
          </div>`).join('')}
        </div>
      </div>
    </div>`;
  }

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
          ${photos.length>2?previewImgWrap(photos[2],2,'width:100%;aspect-ratio:'+fmtAr(photos[2])+';margin-top:1rem;border-radius:4px',''):''}
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
            : photos.length>3 ? previewImgWrap(photos[3],3,'width:100%;aspect-ratio:'+fmtAr(photos[3])+';border-radius:4px','') : ''
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
          <div>${ausHtml}${photos.length>4?previewImgWrap(photos[4],4,'width:100%;aspect-ratio:'+fmtAr(photos[4])+';margin-top:1rem;border-radius:4px',''):''}
          </div>
        </div>
      </div>
    </div>`;
  }

  // ── PAGE 7+: FOTOGALERIE (paginiert, wechselnde Layouts) ──
  const galleryStartA = TEMPLATE_SLOT_MAP?.['A']?.galleryStartIndex ?? 5;
  const galleryPhotosA = photos.slice(galleryStartA);
  if (galleryPhotosA.length > 0) {
    const perPage = d.photosPerPage || 7;
    const numPages = Math.ceil(galleryPhotosA.length / perPage);
    for (let pg = 0; pg < numPages; pg++) {
      const pgPhotos = galleryPhotosA.slice(pg * perPage, (pg + 1) * perPage);
      const layout = pg % 3; // 0=Hero, 1=Triptychon, 2=Editorial
      const pageTitle = `Fotogalerie${numPages > 1 ? ` (${pg + 1}/${numPages})` : ''}`;
      const m = '0 2.8rem'; // margin shorthand
      const imgStyle = (s) => `object-fit:cover;object-position:${fmtPos(s)};display:block;width:100%`;

      let galleryContent = '';

      if (layout === 0) {
        // ── Hero: 1 breites Bild oben, dann 2-spaltig ──
        const hero = pgPhotos[0];
        const rest = pgPhotos.slice(1);
        const rows2 = [];
        for (let i = 0; i < rest.length; i += 2) rows2.push(rest.slice(i, i + 2));
        galleryContent = `
          <div style="margin:${m}">
            ${hero ? `<img src="${hero.src}" style="${imgStyle(hero)};aspect-ratio:16/7;margin-bottom:3px" alt="">` : ''}
            ${rows2.map(row => `<div style="display:flex;gap:3px;margin-bottom:3px">${row.map(s =>
              `<img src="${s.src}" style="${imgStyle(s)};flex:1;min-width:0;aspect-ratio:${fmtAr(s)}" alt="">`).join('')}</div>`).join('')}
          </div>`;

      } else if (layout === 1) {
        // ── Triptychon: 3 gleiche Spalten ──
        const rows3 = [];
        for (let i = 0; i < pgPhotos.length; i += 3) rows3.push(pgPhotos.slice(i, i + 3));
        galleryContent = `
          <div style="margin:${m};display:flex;flex-direction:column;gap:3px">
            ${rows3.map(row => `<div style="display:flex;gap:3px">${row.map(s =>
              `<img src="${s.src}" style="${imgStyle(s)};flex:1;min-width:0;aspect-ratio:4/3" alt="">`).join('')}</div>`).join('')}
          </div>`;

      } else {
        // ── Editorial: 1 großes links (60%) + 2 gestapelt rechts, dann 2-spaltig ──
        const big = pgPhotos[0];
        const r1 = pgPhotos[1];
        const r2 = pgPhotos[2];
        const rest = pgPhotos.slice(3);
        const rows2 = [];
        for (let i = 0; i < rest.length; i += 2) rows2.push(rest.slice(i, i + 2));
        galleryContent = `
          <div style="margin:${m}">
            <div style="display:flex;gap:3px;margin-bottom:3px">
              ${big ? `<img src="${big.src}" style="${imgStyle(big)};flex:1.6;min-width:0;aspect-ratio:4/3" alt="">` : ''}
              ${(r1 || r2) ? `<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px">
                ${r1 ? `<img src="${r1.src}" style="${imgStyle(r1)};flex:1;min-height:0" alt="">` : ''}
                ${r2 ? `<img src="${r2.src}" style="${imgStyle(r2)};flex:1;min-height:0" alt="">` : ''}
              </div>` : ''}
            </div>
            ${rows2.map(row => `<div style="display:flex;gap:3px;margin-bottom:3px">${row.map(s =>
              `<img src="${s.src}" style="${imgStyle(s)};flex:1;min-width:0;aspect-ratio:${fmtAr(s)}" alt="">`).join('')}</div>`).join('')}
          </div>`;
      }

      out.innerHTML += `
      <div class="expo-page expo-inner" style="padding:0">
        ${pageHeader}
        <div style="padding:0 2.8rem 0">
          <div class="expo-page-badge" style="padding-top:1.5rem">IMPRESSIONEN</div>
          <div class="expo-page-title">${pageTitle}</div>
        </div>
        ${galleryContent}
        <div style="height:2rem"></div>
      </div>`;
    }
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
