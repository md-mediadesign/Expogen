// ══════════════════════════════════════════════════════
// TEMPLATE E — Querformat / Seitenleiste & Clean Lines
// Horizontales Accent-Banner, Dreispaltige Highlights
// ══════════════════════════════════════════════════════
function buildPreviewE() {
  const d = data;
  const size = d.size || 'L';
  const out = document.getElementById('preview-output');
  out.innerHTML = '';

  const pair = (typeof getColorPair === 'function') ? getColorPair() : { accent:'#0f1d40', secondary:'#c4a43c' };
  const acc = pair.accent;
  const sec = pair.secondary;

  const overrideId = 'tmpl-e-color-override';
  let overrideEl = document.getElementById(overrideId);
  if (!overrideEl) { overrideEl = document.createElement('style'); overrideEl.id = overrideId; document.head.appendChild(overrideEl); }
  overrideEl.textContent = `
    .te-accent { background: ${acc} !important; }
    .te-sec { background: ${sec} !important; }
  `;

  const esc = (typeof escHtml === 'function') ? escHtml : (s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
  const coverPhoto = photos.find(p => p.isCover) || photos[0];
  const coverBgPosE = coverPhoto ? fmtPos(coverPhoto) : 'center';

  const logoHtml = d.brandLogoSrc
    ? `<img src="${d.brandLogoSrc}" style="max-height:30px;object-fit:contain;display:block">`
    : d.brandFirma ? `<span style="font-family:'Ubuntu',sans-serif;font-size:.8rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${acc}">${esc(d.brandFirma)}</span>` : '';

  // ── PAGE 1: COVER ──
  const coverBg = coverPhoto ? coverPhoto.src : '';
  out.innerHTML += `
  <div class="tl-page" style="display:flex;flex-direction:column">
    <!-- Full bleed image -->
    ${coverBg ? `<div style="position:absolute;inset:0;background-image:url('${coverBg}');background-size:cover;background-position:${coverBgPosE}"></div>` : `<div style="position:absolute;inset:0;background:#1a2033"></div>`}
    <!-- Gradient overlay -->
    <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.2) 60%, rgba(0,0,0,.05) 100%)"></div>
    <!-- Top bar -->
    <div style="position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:18px 32px">
      <div style="font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.6);font-weight:600">IMMOBILIEN-EXPOSÉ</div>
      ${d.brandLogoSrc ? `<img src="${d.brandLogoSrc}" style="max-height:28px;object-fit:contain;filter:brightness(0) invert(1)">` : d.brandFirma ? `<span style="font-family:'Ubuntu',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#fff">${esc(d.brandFirma)}</span>` : ''}
    </div>
    <!-- Bottom banner -->
    <div style="position:absolute;bottom:0;left:0;right:0;z-index:2;background:${acc};padding:18px 32px 22px">
      <div style="font-family:'Ubuntu',sans-serif;font-size:1.65rem;font-weight:700;color:#fff;margin-bottom:5px;line-height:1.2">${esc(d.titel||'Ohne Titel')}</div>
      <div style="display:flex;gap:24px;align-items:center;margin-top:6px">
        ${d.untertitel?`<span style="font-size:.82rem;color:rgba(255,255,255,.8)">${esc(d.untertitel)}</span>`:''}
        <span style="font-size:.82rem;color:rgba(255,255,255,.7)">${esc(d.adresse||'')}</span>
        ${d.preis?`<span style="font-size:1rem;font-weight:700;color:${sec};margin-left:auto">${esc(d.preis)}</span>`:''}
      </div>
    </div>
  </div>`;

  // ── PAGE 2: HIGHLIGHTS (3 Spalten) ──
  const highlights = d.highlights || [];
  const keyData = [
    ['Wohnfläche', d.wohnflaeche],
    ['Zimmer', d.zimmer],
    ['Baujahr', d.baujahr],
    ['Kaufpreis', d.preis],
    ['Objekt-Typ', d.type],
    ['Verfügbarkeit', d.verfuegbar],
  ].filter(r=>r[1]);

  out.innerHTML += `
  <div class="tl-page" style="display:flex;flex-direction:column">
    <div style="height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:${acc}">
      <div style="font-size:.52rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);font-weight:600">HIGHLIGHTS & ECKDATEN</div>
      <div>${d.brandLogoSrc?`<img src="${d.brandLogoSrc}" style="max-height:24px;object-fit:contain;filter:brightness(0) invert(1)">`:d.brandFirma?`<span style="font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.7)">${esc(d.brandFirma)}</span>`:''}</div>
    </div>
    <!-- Key metrics row -->
    <div style="display:flex;background:${sec}22;border-bottom:1px solid ${sec}55;flex-shrink:0">
      ${keyData.slice(0,4).map(r=>`<div style="flex:1;padding:12px 16px;border-right:1px solid ${sec}44">
        <div style="font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:#888;font-weight:600;margin-bottom:3px">${esc(r[0])}</div>
        <div style="font-size:.95rem;font-weight:700;color:${acc}">${esc(r[1])}</div>
      </div>`).join('')}
    </div>
    <!-- 3-column highlights -->
    <div style="flex:1;display:flex;padding:20px 24px;gap:16px;min-height:0">
      ${highlights.slice(0,9).reduce((cols, h, i) => { cols[i%3] = (cols[i%3]||[]).concat(h); return cols; }, [[],[],[]]).map(col=>`
        <div style="flex:1;min-width:0">
          ${col.map(h=>`<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #f0f0f0">
            <div style="width:6px;height:6px;border-radius:50%;background:${acc};flex-shrink:0;margin-top:5px"></div>
            <div style="font-size:.75rem;color:#333;line-height:1.5">${esc(h)}</div>
          </div>`).join('')}
        </div>
      `).join('')}
      ${!highlights.length ? `<div style="flex:1;font-size:.8rem;color:#999;font-style:italic">Keine Highlights angegeben</div>` : ''}
    </div>
  </div>`;

  // ── PAGE 3: DATEN-TABELLE ──
  const dataRows = [
    ['Adresse', d.adresse],
    ['Objekt-Typ', d.type],
    ['Baujahr', d.baujahr],
    ['Zustand', d.zustand],
    ['Wohnfläche', d.wohnflaeche],
    ['Gesamtfläche', d.gesamtflaeche],
    ['Zimmer', d.zimmer],
    ['Verfügbarkeit', d.verfuegbar],
    ['Hausgeld', d.hausgeld],
    ['Denkmalschutz', d.denkmal],
    ['Stellplätze', (formatStellplaetzeLines(d.stellplaetze)||[]).join('\n')],
    ['Energiestandard', d.energiestandard],
    ['Heizung', d.heizung],
    ['Heizungsart', d.heizungsart],
    ['Energieklasse', d.energieklasse],
    ['Primärenergiebedarf', d.energiekennwert ? d.energiekennwert + ' kWh/(m²·a)' : ''],
    ['Kaufpreis', d.preis],
    ['Käuferprovision', d.kaeuferp],
    ['Weitere Kosten', d.weitereKosten],
  ].filter(r=>r[1]);

  const half = Math.ceil(dataRows.length/2);
  const leftRows = dataRows.slice(0, half);
  const rightRows = dataRows.slice(half);

  const mkRow = (r, i) => `<tr style="background:${i%2===0?`${sec}18`:'#fff'}">
    <td style="padding:7px 12px;font-size:.72rem;color:#777;font-weight:500;white-space:nowrap;border-bottom:1px solid #f5f5f5">${esc(r[0])}</td>
    <td style="padding:7px 12px;font-size:.78rem;font-weight:600;color:${acc};border-bottom:1px solid #f5f5f5;overflow-wrap:break-word;word-break:break-word">${esc(r[1]).replace(/\n/g,'<br>')}</td>
  </tr>`;

  out.innerHTML += `
  <div class="tl-page" style="display:flex;flex-direction:column">
    <div style="height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:${acc}">
      <div style="font-size:.52rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);font-weight:600">OBJEKTDATEN</div>
      <div>${d.brandLogoSrc?`<img src="${d.brandLogoSrc}" style="max-height:24px;object-fit:contain;filter:brightness(0) invert(1)">`:d.brandFirma?`<span style="font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.7)">${esc(d.brandFirma)}</span>`:''}</div>
    </div>
    <div style="flex:1;display:flex;padding:20px 28px;gap:28px;min-height:0">
      <div style="flex:1;min-width:0">
        <table style="border-collapse:collapse;width:100%">${leftRows.map((r,i)=>mkRow(r,i)).join('')}</table>
      </div>
      <div style="flex:1;min-width:0">
        <table style="border-collapse:collapse;width:100%">${rightRows.map((r,i)=>mkRow(r,i)).join('')}</table>
      </div>
    </div>
  </div>`;

  // ── PAGE 4+: BILDERGALERIE (paginiert) ──
  const galleryStartE = TEMPLATE_SLOT_MAP?.['E']?.galleryStartIndex ?? 1;
  const galleryPhotosE = photos.slice(galleryStartE);
  if (galleryPhotosE.length > 0) {
    const perPage = d.photosPerPage || 6;
    const numPagesE = Math.ceil(galleryPhotosE.length / perPage);
    for (let pg = 0; pg < numPagesE; pg++) {
      const pgSet = galleryPhotosE.slice(pg * perPage, (pg + 1) * perPage);
      const mainPhoto = pgSet[0];
      const thumbs = pgSet.slice(1);
      out.innerHTML += `
      <div class="tl-page" style="display:flex;flex-direction:column">
        <div style="height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:${acc}">
          <div style="font-size:.52rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);font-weight:600">IMPRESSIONEN${numPagesE > 1 ? ` ${pg+1}/${numPagesE}` : ''}</div>
          <div>${d.brandLogoSrc?`<img src="${d.brandLogoSrc}" style="max-height:24px;object-fit:contain;filter:brightness(0) invert(1)">`:''}</div>
        </div>
        <div style="flex:1;display:flex;padding:12px 16px;gap:8px;min-height:0">
          ${mainPhoto?`<div style="flex:1.5;min-width:0"><img src="${mainPhoto.src}" style="width:100%;height:100%;object-fit:cover;object-position:${fmtPos(mainPhoto)};display:block;border-radius:4px" alt=""></div>`:''}
          ${thumbs.length?`<div style="flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(${Math.ceil(thumbs.length/2)},1fr);gap:6px">${thumbs.map(p=>`<img src="${p.src}" style="width:100%;height:100%;object-fit:cover;object-position:${fmtPos(p)};display:block;border-radius:3px;min-height:0" alt="">`).join('')}</div>`:''}
        </div>
      </div>`;
    }
  }

  // ── PAGE 5: BESCHREIBUNG ──
  out.innerHTML += `
  <div class="tl-page" style="display:flex;flex-direction:column">
    <div style="height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:${acc}">
      <div style="font-size:.52rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);font-weight:600">BESCHREIBUNG</div>
      <div>${d.brandLogoSrc?`<img src="${d.brandLogoSrc}" style="max-height:24px;object-fit:contain;filter:brightness(0) invert(1)">`:d.brandFirma?`<span style="font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.7)">${esc(d.brandFirma)}</span>`:''}</div>
    </div>
    <div style="flex:1;display:flex;padding:24px 32px;gap:32px;min-height:0">
      <div style="flex:1.3;min-width:0">
        <div style="font-family:'Ubuntu',sans-serif;font-size:1.15rem;font-weight:700;color:${acc};margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid ${acc}">${esc(d.titel||'Objektbeschreibung')}</div>
        <div style="font-size:.78rem;color:#333;line-height:1.8;white-space:pre-wrap;overflow:hidden">${esc(d.beschreibung||'').substring(0,1000)}</div>
      </div>
      ${(size==='M'||size==='L') && d.lage && isStepEnabled(8) ? `
      <div style="flex:1;min-width:0">
        <div style="font-family:'Ubuntu',sans-serif;font-size:1rem;font-weight:700;color:${acc};margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid ${acc}55">Lage</div>
        <div style="font-size:.75rem;color:#444;line-height:1.75"><p>${d.lage.split('\n').filter(Boolean).slice(0,6).map(esc).join('</p><p style="margin-top:.5rem">')}</p></div>
      </div>` : ''}
    </div>
  </div>`;

  // ── PAGE 6: KONTAKT ──
  out.innerHTML += `
  <div class="tl-page" style="display:flex">
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:32px 40px">
      <div style="font-size:.52rem;letter-spacing:.22em;text-transform:uppercase;color:#aaa;font-weight:600;margin-bottom:10px">KONTAKT</div>
      <div style="font-family:'Ubuntu',sans-serif;font-size:1.5rem;font-weight:700;color:${acc};margin-bottom:20px">Ihr Ansprechpartner</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${d.name?`<div style="font-size:.88rem;font-weight:600;color:#222">${esc(d.name)}</div>`:''}
        ${d.firma?`<div style="font-size:.8rem;color:#555">${esc(d.firma)}</div>`:''}
        <div style="height:1px;background:${acc}33;margin:6px 0"></div>
        ${d.tel?`<div style="font-size:.78rem;color:#444">☎ ${esc(d.tel)}</div>`:''}
        ${d.email?`<div style="font-size:.78rem;color:#444">✉ ${esc(d.email)}</div>`:''}
        ${d.kontaktAdresse?`<div style="font-size:.78rem;color:#444">⌂ ${esc(d.kontaktAdresse)}</div>`:''}
      </div>
    </div>
    <div style="width:260px;flex-shrink:0;background:${acc};display:flex;flex-direction:column;justify-content:flex-end;padding:32px 28px">
      ${d.brandLogoSrc?`<img src="${d.brandLogoSrc}" style="max-height:48px;object-fit:contain;filter:brightness(0) invert(1);margin-bottom:24px">`:d.brandFirma?`<div style="font-family:'Ubuntu',sans-serif;font-size:1rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#fff;margin-bottom:24px">${esc(d.brandFirma)}</div>`:''}
      <div style="font-size:.62rem;color:rgba(255,255,255,.5);line-height:1.8">
        <div style="color:rgba(255,255,255,.85);font-size:.78rem;font-weight:700;margin-bottom:6px">${esc(d.titel||'')}</div>
        <div>${esc(d.adresse||'')}</div>
        ${d.preis?`<div style="margin-top:8px;font-size:.88rem;font-weight:700;color:${sec}">${esc(d.preis)}</div>`:''}
      </div>
    </div>
  </div>`;
}
