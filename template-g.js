// ══════════════════════════════════════════════════════
// TEMPLATE G — Querformat / Magazin & Editorial
// Schmale Accent-Spalte links, Mosaik-Galerie, horizontale Highlights
// ══════════════════════════════════════════════════════
function buildPreviewG() {
  const d = data;
  const size = d.size || 'L';
  const out = document.getElementById('preview-output');
  out.innerHTML = '';

  const pair = (typeof getColorPair === 'function') ? getColorPair() : { accent:'#0f1d40', secondary:'#c4a43c' };
  const acc = pair.accent;
  const sec = pair.secondary;

  const overrideId = 'tmpl-g-color-override';
  let overrideEl = document.getElementById(overrideId);
  if (!overrideEl) { overrideEl = document.createElement('style'); overrideEl.id = overrideId; document.head.appendChild(overrideEl); }
  overrideEl.textContent = '';

  const esc = (typeof escHtml === 'function') ? escHtml : (s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
  const coverPhoto = photos.find(p => p.isCover) || photos[0];
  const coverIdxG = photos.findIndex(p => p.isCover);
  const coverSlotG = coverIdxG >= 0 ? coverIdxG : 0;

  const logoHtml = (light) => d.brandLogoSrc
    ? `<img src="${d.brandLogoSrc}" style="max-height:30px;object-fit:contain;${light?'filter:brightness(0) invert(1)':''};display:block">`
    : d.brandFirma ? `<span style="font-family:'Ubuntu',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${light?'#fff':acc}">${esc(d.brandFirma)}</span>` : '';

  // ── PAGE 1: COVER — Vertical Sidebar + Full Photo ──
  out.innerHTML += `
  <div class="tl-page" style="display:flex">
    <!-- Left: vertical accent sidebar with rotated title -->
    <div style="width:72px;flex-shrink:0;background:${acc};display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:24px 0">
      <div style="writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:${sec};font-weight:700">EXPOSÉ</div>
      <div style="writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);font-family:'Ubuntu',sans-serif;font-size:.9rem;font-weight:700;color:#fff;text-align:center;line-height:1;max-height:180px;overflow:hidden">${esc(d.titel||'Objekt')}</div>
      <div style="width:2px;height:32px;background:${sec}55"></div>
    </div>
    <!-- Right: full bleed photo -->
    <div style="flex:1;min-width:0;position:relative;overflow:hidden">
      ${coverPhoto
        ? previewImgWrap(coverPhoto, coverSlotG, 'width:100%;height:100%', '')
        : `<div style="width:100%;height:100%;background:linear-gradient(135deg,${acc}55,${sec}22)"></div>`}
      <!-- Bottom info overlay -->
      <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 100%);padding:20px 28px">
        <div style="font-family:'Ubuntu',sans-serif;font-size:1.5rem;font-weight:700;color:#fff;margin-bottom:5px">${esc(d.titel||'')}</div>
        <div style="display:flex;gap:20px;align-items:center">
          <span style="font-size:.8rem;color:rgba(255,255,255,.75)">${esc(d.adresse||'')}</span>
          ${d.preis?`<span style="font-size:.95rem;font-weight:700;color:${sec}">${esc(d.preis)}</span>`:''}
        </div>
      </div>
      <!-- Top-right logo -->
      <div style="position:absolute;top:18px;right:20px">${logoHtml(true)}</div>
    </div>
  </div>`;

  // ── PAGE 2+: MOSAIK-BILDGALERIE (paginiert) ──
  const galleryStartG = TEMPLATE_SLOT_MAP?.['G']?.galleryStartIndex ?? 1;
  const galleryPhotosG = photos.slice(galleryStartG);
  if (galleryPhotosG.length > 0) {
    const perPage = d.photosPerPage || 5;
    const numPagesG = Math.ceil(galleryPhotosG.length / perPage);
    for (let pg = 0; pg < numPagesG; pg++) {
      const pgSet = galleryPhotosG.slice(pg * perPage, (pg + 1) * perPage);
      const [p1, p2, p3, p4, p5] = pgSet;
      out.innerHTML += `
      <div class="tl-page" style="display:flex;flex-direction:column">
        <div style="height:44px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 28px;background:${acc}">
          <div style="font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);font-weight:600">IMPRESSIONEN${numPagesG > 1 ? ` ${pg+1}/${numPagesG}` : ''}</div>
          <div>${logoHtml(true)}</div>
        </div>
        <div style="flex:1;display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:4px;padding:4px;min-height:0">
          ${p1?`<div style="grid-column:1/3;grid-row:1/2;overflow:hidden"><img src="${p1.src}" style="width:100%;height:100%;object-fit:cover;object-position:${fmtPos(p1)};display:block" alt=""></div>`:''}
          ${p2?`<div style="grid-column:3/4;grid-row:1/2;overflow:hidden"><img src="${p2.src}" style="width:100%;height:100%;object-fit:cover;object-position:${fmtPos(p2)};display:block" alt=""></div>`:''}
          ${p3?`<div style="grid-column:1/2;grid-row:2/3;overflow:hidden"><img src="${p3.src}" style="width:100%;height:100%;object-fit:cover;object-position:${fmtPos(p3)};display:block" alt=""></div>`:''}
          ${p4?`<div style="grid-column:2/3;grid-row:2/3;overflow:hidden"><img src="${p4.src}" style="width:100%;height:100%;object-fit:cover;object-position:${fmtPos(p4)};display:block" alt=""></div>`:''}
          ${p5?`<div style="grid-column:3/4;grid-row:2/3;overflow:hidden"><img src="${p5.src}" style="width:100%;height:100%;object-fit:cover;object-position:${fmtPos(p5)};display:block" alt=""></div>`:''}
        </div>
      </div>`;
    }
  }

  // ── PAGE 3: ECKDATEN + BESCHREIBUNG ──
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
    ['Heizung', d.heizung],
    ['Kaufpreis', d.preis],
    ['Käuferprovision', d.kaeuferp],
  ].filter(r=>r[1]);

  out.innerHTML += `
  <div class="tl-page" style="display:flex;flex-direction:column">
    <div style="height:44px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 28px;border-bottom:2px solid ${acc}">
      <div style="font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:${acc};font-weight:700">OBJEKTDATEN & BESCHREIBUNG</div>
      <div>${logoHtml(false)}</div>
    </div>
    <div style="flex:1;display:flex;padding:20px 28px;gap:32px;min-height:0">
      <!-- Daten -->
      <div style="width:270px;flex-shrink:0;border-right:1px solid ${sec}55;padding-right:24px">
        <table style="border-collapse:collapse;width:100%">
          ${dataRows.map((r,i)=>`<tr>
            <td style="padding:5px 0;font-size:.68rem;color:#888;white-space:nowrap;border-bottom:1px solid #f5f5f5">${esc(r[0])}</td>
            <td style="padding:5px 0 5px 10px;font-size:.74rem;font-weight:600;color:${acc};border-bottom:1px solid #f5f5f5;overflow-wrap:break-word;word-break:break-word">${esc(r[1]).replace(/\n/g,'<br>')}</td>
          </tr>`).join('')}
        </table>
      </div>
      <!-- Beschreibung -->
      <div style="flex:1;min-width:0">
        <div style="font-family:'Ubuntu',sans-serif;font-size:1rem;font-weight:700;color:${acc};margin-bottom:12px;padding-bottom:6px;border-bottom:1.5px solid ${acc}">Objektbeschreibung</div>
        <div style="font-size:.77rem;color:#333;line-height:1.8;white-space:pre-wrap;overflow:hidden">${esc(d.beschreibung||'').substring(0,800)}</div>
      </div>
    </div>
  </div>`;

  // ── PAGE 4: HIGHLIGHTS horizontal ──
  const highlights = d.highlights || [];
  const keyData = [
    ['Wohnfläche', d.wohnflaeche],
    ['Zimmer', d.zimmer],
    ['Baujahr', d.baujahr],
    ['Kaufpreis', d.preis],
    ['Verfügbarkeit', d.verfuegbar],
    ['Käuferprovision', d.kaeuferp],
  ].filter(r=>r[1]);

  out.innerHTML += `
  <div class="tl-page" style="display:flex;flex-direction:column">
    <div style="height:44px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 28px;background:${acc}">
      <div style="font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);font-weight:600">HIGHLIGHTS</div>
      <div>${logoHtml(true)}</div>
    </div>
    <!-- Key metrics strip -->
    <div style="display:flex;flex-shrink:0;border-bottom:1px solid ${sec}44;background:${sec}15">
      ${keyData.slice(0,6).map(k=>`<div style="flex:1;padding:10px 16px;border-right:1px solid ${sec}33;text-align:center">
        <div style="font-size:.52rem;letter-spacing:.12em;text-transform:uppercase;color:#999;margin-bottom:3px">${esc(k[0])}</div>
        <div style="font-size:.9rem;font-weight:700;color:${acc}">${esc(k[1])}</div>
      </div>`).join('')}
    </div>
    <!-- Highlight rows -->
    <div style="flex:1;padding:16px 28px;overflow:hidden">
      ${highlights.slice(0,8).map((h,i)=>`<div style="display:flex;align-items:center;gap:14px;padding:9px 0;border-bottom:1px solid #f5f5f5">
        <div style="font-family:'Ubuntu',sans-serif;font-size:1.1rem;font-weight:700;color:${acc};width:26px;flex-shrink:0;text-align:right">${String(i+1).padStart(2,'0')}</div>
        <div style="width:1.5px;height:20px;background:${sec};flex-shrink:0"></div>
        <div style="font-size:.77rem;color:#333;line-height:1.5">${esc(h)}</div>
      </div>`).join('')}
      ${!highlights.length?`<div style="font-size:.8rem;color:#bbb;font-style:italic;margin-top:16px">Keine Highlights angegeben</div>`:''}
    </div>
  </div>`;

  // ── PAGE 5: LAGE ──
  if ((size==='M'||size==='L') && d.lage && isStepEnabled(8)) {
    out.innerHTML += `
    <div class="tl-page" style="display:flex;flex-direction:column">
      <div style="height:44px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 28px;border-bottom:2px solid ${acc}">
        <div style="font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:${acc};font-weight:700">LAGE & STANDORT</div>
        <div>${logoHtml(false)}</div>
      </div>
      <div style="flex:1;display:flex;padding:24px 28px;gap:32px;min-height:0">
        <div style="flex:1;min-width:0">
          <div style="font-family:'Ubuntu',sans-serif;font-size:1rem;font-weight:700;color:${acc};margin-bottom:12px;padding-bottom:6px;border-bottom:1.5px solid ${acc}">Stadtteil & Mikrolage</div>
          <div style="font-size:.77rem;color:#333;line-height:1.8"><p>${d.lage.split('\n').filter(Boolean).map(esc).join('</p><p style="margin-top:.5rem">')}</p></div>
        </div>
        <div style="width:280px;flex-shrink:0">
          ${data.mapEnabled && data.mapLat
            ? buildStaticMapHtml(data.mapLat, data.mapLon, 80)
            : photos.length>3 ? previewImgWrap(photos[3],3,'width:100%;height:100%;border-radius:6px','') : ''
          }
        </div>
      </div>
    </div>`;
  }

  // ── PAGE 6: KONTAKT ──
  out.innerHTML += `
  <div class="tl-page" style="display:flex">
    <!-- Left sidebar -->
    <div style="width:72px;flex-shrink:0;background:${acc};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px 0">
      <div style="writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);font-size:.45rem;letter-spacing:.22em;text-transform:uppercase;color:${sec};font-weight:700">KONTAKT</div>
    </div>
    <!-- Contact info -->
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:40px 48px">
      <div style="margin-bottom:24px">${logoHtml(false)}</div>
      <div style="font-family:'Ubuntu',sans-serif;font-size:1.4rem;font-weight:700;color:${acc};margin-bottom:6px">${esc(d.name||'')}</div>
      ${d.firma?`<div style="font-size:.85rem;color:#666;margin-bottom:20px">${esc(d.firma)}</div>`:''}
      <div style="height:2px;width:48px;background:${sec};margin-bottom:20px"></div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${d.tel?`<div style="font-size:.82rem;color:#444;display:flex;gap:8px"><span style="color:${acc};font-weight:600">T</span>${esc(d.tel)}</div>`:''}
        ${d.email?`<div style="font-size:.82rem;color:#444;display:flex;gap:8px"><span style="color:${acc};font-weight:600">E</span>${esc(d.email)}</div>`:''}
        ${d.kontaktAdresse?`<div style="font-size:.78rem;color:#888;display:flex;gap:8px"><span style="color:${acc};font-weight:600">A</span>${esc(d.kontaktAdresse)}</div>`:''}
      </div>
    </div>
    <!-- Property summary -->
    <div style="width:260px;flex-shrink:0;background:${sec}20;display:flex;flex-direction:column;justify-content:center;padding:36px 28px;border-left:3px solid ${sec}">
      <div style="font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:${acc};font-weight:700;margin-bottom:12px">DAS OBJEKT</div>
      <div style="font-family:'Ubuntu',sans-serif;font-size:1.05rem;font-weight:700;color:${acc};line-height:1.3;margin-bottom:10px">${esc(d.titel||'')}</div>
      <div style="font-size:.78rem;color:#666;margin-bottom:6px">${esc(d.adresse||'')}</div>
      ${d.preis?`<div style="margin-top:14px;font-size:1rem;font-weight:700;color:${acc}">${esc(d.preis)}</div>`:''}
      ${d.kaeuferp?`<div style="font-size:.68rem;color:#999;margin-top:4px">Provision: ${esc(d.kaeuferp)}</div>`:''}
    </div>
  </div>`;
}
