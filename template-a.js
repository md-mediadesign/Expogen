// ══════════════════════════════════════════════════════
// TEMPLATE A — Klassisch / Strukturiert
// Weißes Drucklayout, Navy/Gold Akzente
// ══════════════════════════════════════════════════════
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
  const heroImg = photos.length
    ? `<img src="${photos[0]}" alt="Hauptbild">`
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
    ['Stellplätze', d.stellplaetze],
    ['Energiestandard', d.energiestandard],
    ['Heizung', d.heizung],
    ['Heizungsart', d.heizungsart],
    ['Energieausweis', d.energieausweis],
    ['Kaufpreis', d.preis],
    ['Käuferprovision', d.kaeuferp],
    ['Weitere Kosten', d.weitereKosten],
  ].filter(r=>r[1]);

  const leftRows = dataRows.slice(0, Math.ceil(dataRows.length/2));
  const rightRows = dataRows.slice(Math.ceil(dataRows.length/2));

  const mkTable = rows => `<table class="expo-data-table">${rows.map(r=>`<tr><td>${escHtml(r[0])}</td><td>${escHtml(r[1])}</td></tr>`).join('')}</table>`;

  const sideImg = photos.length > 1 ? `<img src="${photos[1]}" class="expo-sidebar-img" alt="">` : '';

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
          ${photos.length>2?`<img src="${photos[2]}" style="width:100%;aspect-ratio:4/3;object-fit:cover;margin-top:1rem;border-radius:4px" alt="">` : ''}
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
          <div>${photos.length>3?`<img src="${photos[3]}" style="width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:4px" alt="">`:''}</div>
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
          <div>${ausHtml}${photos.length>4?`<img src="${photos[4]}" style="width:100%;aspect-ratio:4/3;object-fit:cover;margin-top:1rem;border-radius:4px" alt="">`:''}
          </div>
        </div>
      </div>
    </div>`;
  }

  // ── PAGE 7: FOTOS ──
  if (photos.length) {
    const photoSet = photos.slice(0, 7);
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
        ${firstThree.map((s,i)=>i===0?`<img src="${s}" alt="">`:``).join('')}
      </div>
      ${firstThree.length>1?`<div class="expo-photo-grid-2col" style="margin:3px 2.8rem 0">${firstThree.slice(1).map(s=>`<img src="${s}" alt="">`).join('')}</div>`:''}
      ${rest.length?`<div class="expo-photo-grid-2col" style="margin:3px 2.8rem 0">${rest.map(s=>`<img src="${s}" alt="">`).join('')}</div>`:''}
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
}
