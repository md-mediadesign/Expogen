// ══════════════════════════════════════════════════════
// TEMPLATE F — Querformat / Bold Typography
// Linke Hälfte Farbfläche mit großem Titel, rechts Foto
// ══════════════════════════════════════════════════════
function buildPreviewF() {
  const d = data;
  const size = d.size || 'L';
  const out = document.getElementById('preview-output');
  out.innerHTML = '';

  const pair = (typeof getColorPair === 'function') ? getColorPair() : { accent:'#0f1d40', secondary:'#c4a43c' };
  const acc = pair.accent;
  const sec = pair.secondary;

  const overrideId = 'tmpl-f-color-override';
  let overrideEl = document.getElementById(overrideId);
  if (!overrideEl) { overrideEl = document.createElement('style'); overrideEl.id = overrideId; document.head.appendChild(overrideEl); }
  overrideEl.textContent = '';

  const esc = (typeof escHtml === 'function') ? escHtml : (s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
  const coverPhoto = photos.find(p => p.isCover) || photos[0];
  const coverIdxF = photos.findIndex(p => p.isCover);
  const coverSlotF = coverIdxF >= 0 ? coverIdxF : 0;

  const logoBar = (light) => d.brandLogoSrc
    ? `<img src="${d.brandLogoSrc}" style="max-height:28px;object-fit:contain;${light?'filter:brightness(0) invert(1)':''};display:block">`
    : d.brandFirma ? `<span style="font-family:'Ubuntu',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${light?'#fff':acc}">${esc(d.brandFirma)}</span>` : '';

  // ── PAGE 1: COVER — Split Layout ──
  out.innerHTML += `
  <div class="tl-page" style="display:flex">
    <!-- Left: color block with title -->
    <div style="width:45%;flex-shrink:0;background:${acc};display:flex;flex-direction:column;justify-content:space-between;padding:36px 40px">
      <div>
        ${logoBar(true)}
        <div style="margin-top:32px;font-size:.5rem;letter-spacing:.24em;text-transform:uppercase;color:${sec};font-weight:700">IMMOBILIEN-EXPOSÉ</div>
      </div>
      <div>
        <div style="font-family:'Ubuntu',sans-serif;font-size:2.1rem;font-weight:700;color:#fff;line-height:1.1;margin-bottom:14px">${esc(d.titel||'Ohne Titel')}</div>
        ${d.untertitel?`<div style="font-size:.9rem;color:rgba(255,255,255,.75);margin-bottom:6px">${esc(d.untertitel)}</div>`:''}
        <div style="font-size:.82rem;color:rgba(255,255,255,.6)">${esc(d.adresse||'')}</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end">
        ${d.preis?`<div style="font-size:1.2rem;font-weight:700;color:${sec}">${esc(d.preis)}</div>`:'<div></div>'}
        <div style="font-size:.6rem;color:rgba(255,255,255,.4);text-align:right">
          ${d.tel?`<div>${esc(d.tel)}</div>`:''}
          ${d.email?`<div>${esc(d.email)}</div>`:''}
        </div>
      </div>
    </div>
    <!-- Right: cover photo -->
    <div style="flex:1;min-width:0;overflow:hidden">
      ${coverPhoto
        ? previewImgWrap(coverPhoto, coverSlotF, 'width:100%;height:100%', '')
        : `<div style="width:100%;height:100%;background:linear-gradient(135deg,${acc}55,${sec}33)"></div>`}
    </div>
  </div>`;

  // ── PAGE 2: HIGHLIGHTS KACHELN ──
  const dataKacheln = [
    ['Wohnfläche', d.wohnflaeche, '㎡'],
    ['Zimmer', d.zimmer, ''],
    ['Baujahr', d.baujahr, ''],
    ['Kaufpreis', d.preis, ''],
    ['Objekt', d.type, ''],
    ['Zustand', d.zustand, ''],
  ].filter(r=>r[1]);

  const highlights = d.highlights || [];

  out.innerHTML += `
  <div class="tl-page" style="display:flex;flex-direction:column">
    <div style="height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 32px;border-bottom:2px solid ${acc}">
      <div style="font-size:.52rem;letter-spacing:.2em;text-transform:uppercase;color:${acc};font-weight:700">HIGHLIGHTS</div>
      <div>${logoBar(false)}</div>
    </div>
    <!-- Kacheln row -->
    <div style="display:flex;flex-shrink:0;background:${acc}">
      ${dataKacheln.slice(0,6).map(k=>`<div style="flex:1;padding:14px 18px;border-right:1px solid rgba(255,255,255,.12);text-align:center">
        <div style="font-size:.52rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.55);font-weight:600;margin-bottom:5px">${esc(k[0])}</div>
        <div style="font-family:'Ubuntu',sans-serif;font-size:1.05rem;font-weight:700;color:${sec}">${esc(k[1])}</div>
      </div>`).join('')}
    </div>
    <!-- Highlights list (2 columns) -->
    <div style="flex:1;padding:20px 28px;display:grid;grid-template-columns:1fr 1fr;gap:10px 32px;align-content:start;min-height:0">
      ${highlights.slice(0,8).map(h=>`<div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid #f0f0f0">
        <div style="width:20px;height:20px;background:${acc};border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center">
          <span style="font-size:.55rem;font-weight:700;color:${sec}">✓</span>
        </div>
        <div style="font-size:.77rem;color:#333;line-height:1.5">${esc(h)}</div>
      </div>`).join('')}
      ${!highlights.length?`<div style="font-size:.8rem;color:#bbb;font-style:italic">Keine Highlights</div>`:''}
    </div>
  </div>`;

  // ── PAGE 3: VOLLBILD-FOTO + OVERLAY ──
  if (photos.length > 1) {
    const bigPhoto = photos[1];
    out.innerHTML += `
    <div class="tl-page" style="position:relative;overflow:hidden">
      <img src="${bigPhoto.src}" style="width:100%;height:100%;object-fit:cover;display:block" alt="">
      <div style="position:absolute;inset:0;background:linear-gradient(to right, rgba(0,0,0,.6) 0%, rgba(0,0,0,.1) 60%)"></div>
      <div style="position:absolute;top:50%;left:48px;transform:translateY(-50%);max-width:38%">
        <div style="font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:${sec};font-weight:700;margin-bottom:10px">IMPRESSIONEN</div>
        <div style="font-family:'Ubuntu',sans-serif;font-size:1.5rem;font-weight:700;color:#fff;line-height:1.2">${esc(d.titel||'')}</div>
        <div style="margin-top:10px;font-size:.78rem;color:rgba(255,255,255,.75)">${esc(d.adresse||'')}</div>
      </div>
    </div>`;
  }

  // ── PAGE 4: ECKDATEN + BESCHREIBUNG ──
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
    ['Stellplätze', (formatStellplaetzeLines(d.stellplaetze)||[]).join('\n')],
    ['Energieklasse', d.energieklasse],
    ['Kaufpreis', d.preis],
    ['Käuferprovision', d.kaeuferp],
  ].filter(r=>r[1]);

  out.innerHTML += `
  <div class="tl-page" style="display:flex;flex-direction:column">
    <div style="height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 32px;border-bottom:2px solid ${acc}">
      <div style="font-size:.52rem;letter-spacing:.2em;text-transform:uppercase;color:${acc};font-weight:700">OBJEKTDATEN & BESCHREIBUNG</div>
      <div>${logoBar(false)}</div>
    </div>
    <div style="flex:1;display:flex;padding:20px 28px;gap:32px;min-height:0">
      <!-- Data table -->
      <div style="width:260px;flex-shrink:0">
        <table style="border-collapse:collapse;width:100%">
          ${dataRows.map((r,i)=>`<tr style="background:${i%2===0?`${sec}18`:'transparent'}">
            <td style="padding:5px 8px;font-size:.68rem;color:#888;white-space:nowrap">${esc(r[0])}</td>
            <td style="padding:5px 8px;font-size:.74rem;font-weight:600;color:${acc};overflow-wrap:break-word;word-break:break-word">${esc(r[1]).replace(/\n/g,'<br>')}</td>
          </tr>`).join('')}
        </table>
      </div>
      <!-- Description -->
      <div style="flex:1;min-width:0">
        <div style="font-family:'Ubuntu',sans-serif;font-size:1rem;font-weight:700;color:${acc};margin-bottom:12px;padding-bottom:6px;border-bottom:1.5px solid ${acc}55">Objektbeschreibung</div>
        <div style="font-size:.77rem;color:#333;line-height:1.8;white-space:pre-wrap;overflow:hidden">${esc(d.beschreibung||'').substring(0,750)}</div>
        ${size==='L' && d.ausstattung && isStepEnabled(10) ? `<div style="margin-top:16px;font-family:'Ubuntu',sans-serif;font-size:.85rem;font-weight:700;color:${acc};margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid ${acc}33">Ausstattung</div><div style="font-size:.74rem;color:#444;line-height:1.7;overflow:hidden">${esc(d.ausstattung).substring(0,300)}</div>` : ''}
      </div>
    </div>
  </div>`;

  // ── PAGE 5+: LAGE + BILDERGALERIE (paginiert) ──
  const galleryStartF = TEMPLATE_SLOT_MAP?.['F']?.galleryStartIndex ?? 2;
  const galleryPhotosF = photos.slice(galleryStartF);
  const perPageF = d.photosPerPage || 4;
  const numPagesF = Math.max(1, Math.ceil(galleryPhotosF.length / perPageF));
  for (let pg = 0; pg < numPagesF; pg++) {
    const pgPhotos = galleryPhotosF.slice(pg * perPageF, (pg + 1) * perPageF);
    out.innerHTML += `
    <div class="tl-page" style="display:flex;flex-direction:column">
      <div style="height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 32px;border-bottom:2px solid ${acc}">
        <div style="font-size:.52rem;letter-spacing:.2em;text-transform:uppercase;color:${acc};font-weight:700">${pg === 0 ? 'LAGE & BILDER' : `IMPRESSIONEN ${pg+1}/${numPagesF}`}</div>
        <div>${logoBar(false)}</div>
      </div>
      <div style="flex:1;display:flex;padding:16px 24px;gap:16px;min-height:0">
        ${pg === 0 && (size==='M'||size==='L') && d.lage && isStepEnabled(8) ? `
        <div style="flex:1;min-width:0">
          <div style="font-family:'Ubuntu',sans-serif;font-size:.9rem;font-weight:700;color:${acc};margin-bottom:10px;padding-bottom:6px;border-bottom:1.5px solid ${acc}">Lage</div>
          <div style="font-size:.75rem;color:#333;line-height:1.7">${d.lage.split('\n').filter(Boolean).slice(0,5).map(esc).join('<br>')}</div>
        </div>` : ''}
        ${pgPhotos.length ? `
        <div style="flex:1.5;min-width:0;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:6px">
          ${pgPhotos.map(p=>`<img src="${p.src}" style="width:100%;height:100%;object-fit:cover;object-position:${fmtPos(p)};display:block;border-radius:3px;min-height:0" alt="">`).join('')}
        </div>` : ''}
      </div>
    </div>`;
  }

  // ── PAGE 6: KONTAKT ──
  out.innerHTML += `
  <div class="tl-page" style="display:flex">
    <div style="flex:1;background:${acc};display:flex;flex-direction:column;justify-content:center;padding:48px 52px">
      <div style="font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:${sec};font-weight:700;margin-bottom:16px">KONTAKT</div>
      ${d.brandLogoSrc?`<img src="${d.brandLogoSrc}" style="max-height:52px;object-fit:contain;filter:brightness(0) invert(1);margin-bottom:20px;display:block">`:d.brandFirma?`<div style="font-family:'Ubuntu',sans-serif;font-size:1.3rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#fff;margin-bottom:20px">${esc(d.brandFirma)}</div>`:''}
      <div style="font-family:'Ubuntu',sans-serif;font-size:1.05rem;font-weight:600;color:rgba(255,255,255,.9);margin-bottom:16px">${esc(d.name||'')}</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${d.tel?`<div style="font-size:.8rem;color:rgba(255,255,255,.75)">☎ ${esc(d.tel)}</div>`:''}
        ${d.email?`<div style="font-size:.8rem;color:rgba(255,255,255,.75)">✉ ${esc(d.email)}</div>`:''}
        ${d.kontaktAdresse?`<div style="font-size:.78rem;color:rgba(255,255,255,.6)">⌂ ${esc(d.kontaktAdresse)}</div>`:''}
      </div>
    </div>
    <div style="flex:1;background:${sec}22;display:flex;flex-direction:column;justify-content:center;padding:48px 44px">
      <div style="font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:${acc};font-weight:700;margin-bottom:14px">DAS OBJEKT</div>
      <div style="font-family:'Ubuntu',sans-serif;font-size:1.2rem;font-weight:700;color:${acc};line-height:1.2;margin-bottom:10px">${esc(d.titel||'')}</div>
      <div style="font-size:.82rem;color:#555;margin-bottom:6px">${esc(d.adresse||'')}</div>
      ${d.preis?`<div style="font-size:1.1rem;font-weight:700;color:${acc};margin-top:16px">${esc(d.preis)}</div>`:''}
      ${d.kaeuferp?`<div style="font-size:.72rem;color:#888;margin-top:4px">Provision: ${esc(d.kaeuferp)}</div>`:''}
    </div>
  </div>`;
}
