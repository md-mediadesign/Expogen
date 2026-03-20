// ══════════════════════════════════════════════════════
// TEMPLATE D — Querformat / Diagonal & Geometrisch
// Diagonaler Farbkeil auf Titelseite, zweispaltige Innenseiten
// ══════════════════════════════════════════════════════
function buildPreviewD() {
  const d = data;
  const size = d.size || 'L';
  const out = document.getElementById('preview-output');
  out.innerHTML = '';

  const pair = (typeof getColorPair === 'function') ? getColorPair() : { accent:'#0f1d40', secondary:'#c4a43c' };
  const acc = pair.accent;
  const sec = pair.secondary;

  const overrideId = 'tmpl-d-color-override';
  let overrideEl = document.getElementById(overrideId);
  if (!overrideEl) { overrideEl = document.createElement('style'); overrideEl.id = overrideId; document.head.appendChild(overrideEl); }
  overrideEl.textContent = `
    .td-accent { background: ${acc} !important; }
    .td-accent-text { color: ${acc} !important; }
    .td-secondary { background: ${sec} !important; }
    .td-secondary-text { color: ${sec} !important; }
    .td-heading { color: ${acc} !important; border-bottom-color: ${acc} !important; }
    .td-table td:first-child { color: #777 !important; }
    .td-table td:last-child { color: ${acc} !important; font-weight: 600 !important; }
    .td-highlight-num { color: ${acc} !important; }
    .td-sidebar { background: ${acc} !important; }
  `;

  const esc = (typeof escHtml === 'function') ? escHtml : (s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
  const coverPhoto = photos.find(p => p.isCover) || photos[0];

  const logoHtml = d.brandLogoSrc
    ? `<img src="${d.brandLogoSrc}" style="max-height:36px;object-fit:contain;display:block">`
    : d.brandFirma ? `<span style="font-family:'Ubuntu',sans-serif;font-size:.9rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#fff">${esc(d.brandFirma)}</span>` : '';

  // ── PAGE 1: COVER ──
  const coverBg = coverPhoto ? `url('${coverPhoto.src}')` : 'linear-gradient(135deg,#1a2033 0%,#0d1117 100%)';
  out.innerHTML += `
  <div class="tl-page" style="background:${coverPhoto?'#000':'#1a2033'};display:flex;flex-direction:column">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap');
    </style>
    <!-- Cover: full background image -->
    <div style="position:absolute;inset:0;background-image:${coverBg};background-size:cover;background-position:center;opacity:.75"></div>
    <!-- Diagonal overlay bottom-left -->
    <div style="position:absolute;bottom:0;left:0;width:55%;height:100%;clip-path:polygon(0 30%,0 100%,100% 100%);background:${acc};opacity:.93"></div>
    <!-- Logo top right -->
    <div style="position:absolute;top:24px;right:32px;z-index:5">${logoHtml}</div>
    <!-- Content bottom-left -->
    <div style="position:absolute;bottom:48px;left:44px;z-index:5;max-width:50%">
      <div style="font-size:.55rem;letter-spacing:.22em;text-transform:uppercase;color:${sec};font-weight:700;margin-bottom:10px">IMMOBILIEN-EXPOSÉ</div>
      <div style="font-family:'Ubuntu',sans-serif;font-size:1.9rem;font-weight:700;color:#fff;line-height:1.15;margin-bottom:10px;text-shadow:0 2px 12px rgba(0,0,0,.4)">${esc(d.titel||'Ohne Titel')}</div>
      ${d.untertitel?`<div style="font-size:.95rem;color:rgba(255,255,255,.85);margin-bottom:5px">${esc(d.untertitel)}</div>`:''}
      <div style="font-size:.85rem;color:rgba(255,255,255,.7)">${esc(d.adresse||'')}</div>
      ${d.preis?`<div style="margin-top:14px;font-size:1.15rem;font-weight:700;color:${sec}">${esc(d.preis)}</div>`:''}
    </div>
  </div>`;

  // ── PAGE 2: OBJEKTDATEN ──
  const dataRows = [
    ['Objekt-Typ', d.type],
    ['Baujahr', d.baujahr],
    ['Zustand', d.zustand],
    ['Wohnfläche', d.wohnflaeche],
    ['Gesamtfläche', d.gesamtflaeche],
    ['Zimmer', d.zimmer],
    ['Verfügbarkeit', d.verfuegbar],
    ['Hausgeld', d.hausgeld],
    ['Stellplätze', (formatStellplaetzeLines(d.stellplaetze)||[]).join('\n')],
    ['Energiestandard', d.energiestandard],
    ['Heizung', d.heizung],
    ['Energieklasse', d.energieklasse],
    ['Primärenergiebedarf', d.energiekennwert ? d.energiekennwert + ' kWh/(m²·a)' : ''],
    ['Kaufpreis', d.preis],
    ['Käuferprovision', d.kaeuferp],
  ].filter(r=>r[1]);

  const leftRows = dataRows.slice(0, Math.ceil(dataRows.length/2));
  const rightRows = dataRows.slice(Math.ceil(dataRows.length/2));

  const mkRow = r => `<tr>
    <td style="padding:6px 10px 6px 0;font-size:.72rem;color:#888;white-space:nowrap;vertical-align:top">${esc(r[0])}</td>
    <td style="padding:6px 0;font-size:.78rem;font-weight:600;color:${acc};overflow-wrap:break-word;word-break:break-word;vertical-align:top">${esc(r[1]).replace(/\n/g,'<br>')}</td>
  </tr>`;

  const sideImg = photos.length > 1 ? `<img src="${photos[1].src}" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:4px;margin-top:1rem;display:block" alt="">` : '';

  out.innerHTML += `
  <div class="tl-page" style="display:flex;flex-direction:column">
    <!-- Header -->
    <div style="height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:${acc}">
      <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);font-weight:600">OBJEKTDATEN</div>
      <div style="font-size:.7rem;color:rgba(255,255,255,.6)">${logoHtml}</div>
    </div>
    <!-- Content -->
    <div style="flex:1;display:flex;padding:24px 32px;gap:28px;min-height:0">
      <div style="flex:1.3;min-width:0">
        <div style="font-family:'Ubuntu',sans-serif;font-size:1.3rem;font-weight:700;color:${acc};margin-bottom:16px;padding-bottom:8px;border-bottom:2px solid ${acc}">${esc(d.titel||'Objektinformationen')}</div>
        <div style="display:flex;gap:24px">
          <table class="td-table" style="border-collapse:collapse;flex:1">${leftRows.map(mkRow).join('')}</table>
          <table class="td-table" style="border-collapse:collapse;flex:1">${rightRows.map(mkRow).join('')}</table>
        </div>
      </div>
      <div style="width:220px;flex-shrink:0">
        ${photos.length>1?`<img src="${photos[1].src}" style="width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:6px;display:block" alt="">`:''}
      </div>
    </div>
  </div>`;

  // ── PAGE 3: BESCHREIBUNG & HIGHLIGHTS ──
  const hlHtml = d.highlights?.length
    ? `<div style="margin-top:16px">${d.highlights.map((h,i)=>`<div style="display:flex;gap:10px;margin-bottom:9px;align-items:flex-start"><span style="font-size:1rem;font-weight:700;color:${acc};flex-shrink:0;line-height:1.4">${String(i+1).padStart(2,'0')}</span><span style="font-size:.78rem;color:#333;line-height:1.5">${esc(h)}</span></div>`).join('')}</div>` : '';

  out.innerHTML += `
  <div class="tl-page" style="display:flex;flex-direction:column">
    <div style="height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:${acc}">
      <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);font-weight:600">ÜBERBLICK</div>
      <div>${logoHtml}</div>
    </div>
    <div style="flex:1;display:flex;padding:24px 32px;gap:32px;min-height:0">
      <div style="flex:1.4;min-width:0">
        <div style="font-family:'Ubuntu',sans-serif;font-size:1.2rem;font-weight:700;color:${acc};margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid ${acc}">Objektbeschreibung</div>
        <div style="font-size:.78rem;color:#333;line-height:1.75;white-space:pre-wrap;overflow:hidden">${esc(d.beschreibung||'').substring(0,900)}</div>
      </div>
      <div style="flex:1;min-width:0">
        ${d.highlights?.length?`<div style="font-family:'Ubuntu',sans-serif;font-size:.75rem;font-weight:700;color:${acc};letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px">Highlights</div>${hlHtml}`:''}
        ${photos.length>2?`<img src="${photos[2].src}" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:4px;margin-top:14px;display:block" alt="">`:''}
      </div>
    </div>
  </div>`;

  // ── PAGE 4: BILDERGALERIE ──
  if (photos.length > 1) {
    const perPage = d.photosPerPage || 6;
    const photoSet = photos.slice(0, perPage);
    const rows = [];
    for (let i = 0; i < photoSet.length; i += 3) rows.push(photoSet.slice(i, i+3));
    out.innerHTML += `
    <div class="tl-page" style="display:flex;flex-direction:column">
      <div style="height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:${acc}">
        <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);font-weight:600">IMPRESSIONEN</div>
        <div>${logoHtml}</div>
      </div>
      <div style="flex:1;padding:20px 24px;display:flex;flex-direction:column;gap:6px;min-height:0">
        ${rows.map(row=>`<div style="display:flex;gap:6px;flex:1">${row.map(p=>`<img src="${p.src}" style="flex:1;min-width:0;object-fit:cover;display:block;border-radius:3px" alt="">`).join('')}</div>`).join('')}
      </div>
    </div>`;
  }

  // ── PAGE 5: LAGE (M+L) ──
  if ((size==='M'||size==='L') && d.lage && isStepEnabled(8)) {
    out.innerHTML += `
    <div class="tl-page" style="display:flex;flex-direction:column">
      <div style="height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:${acc}">
        <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);font-weight:600">LAGE</div>
        <div>${logoHtml}</div>
      </div>
      <div style="flex:1;display:flex;padding:24px 32px;gap:32px;min-height:0">
        <div style="flex:1;min-width:0">
          <div style="font-family:'Ubuntu',sans-serif;font-size:1.2rem;font-weight:700;color:${acc};margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid ${acc}">Stadtteil & Mikrolage</div>
          <div style="font-size:.78rem;color:#333;line-height:1.75"><p>${d.lage.split('\n').filter(Boolean).map(esc).join('</p><p style="margin-top:.6rem">')}</p></div>
        </div>
        <div style="width:280px;flex-shrink:0">
          ${data.mapEnabled && data.mapLat
            ? buildStaticMapHtml(data.mapLat, data.mapLon, 80)
            : photos.length>3 ? `<img src="${photos[3].src}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;display:block" alt="">` : ''
          }
        </div>
      </div>
    </div>`;
  }

  // ── PAGE 6: AUSSTATTUNG (L) ──
  if (size==='L' && (d.ausstattung||d.ausstattungList?.length) && isStepEnabled(10)) {
    const ausHtml = d.ausstattungList?.length
      ? `<div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:6px 16px">${d.ausstattungList.map(a=>`<div style="display:flex;gap:6px;align-items:baseline"><span style="color:${acc};font-weight:700;font-size:.8rem">·</span><span style="font-size:.75rem;color:#444">${esc(a)}</span></div>`).join('')}</div>` : '';
    out.innerHTML += `
    <div class="tl-page" style="display:flex;flex-direction:column">
      <div style="height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:${acc}">
        <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);font-weight:600">AUSSTATTUNG</div>
        <div>${logoHtml}</div>
      </div>
      <div style="flex:1;display:flex;padding:24px 32px;gap:32px;min-height:0">
        <div style="flex:1;min-width:0">
          <div style="font-family:'Ubuntu',sans-serif;font-size:1.2rem;font-weight:700;color:${acc};margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid ${acc}">Ausstattung & Qualität</div>
          <div style="font-size:.78rem;color:#333;line-height:1.75">${esc(d.ausstattung||'')}</div>
          ${ausHtml}
        </div>
        ${photos.length>4?`<div style="width:260px;flex-shrink:0"><img src="${photos[4].src}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;display:block" alt=""></div>`:''}</div>
    </div>`;
  }

  // ── PAGE 7: KONTAKT ──
  const contactBlock = (d.name||d.tel||d.email||d.firma) ? [
    ['Name', d.name], ['Telefon', d.tel], ['E-Mail', d.email], ['Firma', d.firma], ['Adresse', d.kontaktAdresse]
  ].filter(r=>r[1]).map(r=>`<div style="margin-bottom:8px"><div style="font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:#aaa;font-weight:600;margin-bottom:2px">${esc(r[0])}</div><div style="font-size:.85rem;color:#222;font-weight:500">${esc(r[1])}</div></div>`).join('') : '';

  out.innerHTML += `
  <div class="tl-page" style="display:flex">
    <!-- Left sidebar -->
    <div style="width:200px;flex-shrink:0;background:${acc};display:flex;flex-direction:column;padding:32px 24px">
      <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.6);font-weight:600;margin-bottom:16px">KONTAKT</div>
      <div style="font-family:'Ubuntu',sans-serif;font-size:1.1rem;font-weight:700;color:#fff;line-height:1.3;margin-bottom:24px">${esc(d.firma||d.brandFirma||'')}</div>
      <div style="margin-top:auto;font-size:.65rem;color:rgba(255,255,255,.5);line-height:1.8">
        ${d.tel?`<div>☎ ${esc(d.tel)}</div>`:''}
        ${d.email?`<div>✉ ${esc(d.email)}</div>`:''}
      </div>
    </div>
    <!-- Right content -->
    <div style="flex:1;padding:32px;display:flex;flex-direction:column;justify-content:center;gap:20px">
      <div>
        <div style="font-family:'Ubuntu',sans-serif;font-size:1.3rem;font-weight:700;color:${acc};margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid ${acc}">Ihr Ansprechpartner</div>
        ${contactBlock}
      </div>
      <div style="padding:14px 18px;background:${sec}22;border-left:3px solid ${sec};border-radius:0 6px 6px 0">
        <div style="font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:${acc};font-weight:700;margin-bottom:5px">OBJEKT</div>
        <div style="font-size:.85rem;font-weight:600;color:#222">${esc(d.titel||'')}</div>
        <div style="font-size:.75rem;color:#666;margin-top:3px">${esc(d.adresse||'')}</div>
        ${d.preis?`<div style="font-size:.9rem;font-weight:700;color:${acc};margin-top:6px">${esc(d.preis)}</div>`:''}
      </div>
    </div>
  </div>`;
}
