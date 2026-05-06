// ══════════════════════════════════════════════════════
// TEMPLATE H — Querformat / Editorial Naturanwesen
// Playfair Display + Lato, organische Erdtöne, Stagger-Eyebrows
// Pull-Quotes, Spec-Rows mit Serif-Werten, Owner-Quote
// ══════════════════════════════════════════════════════
function buildPreviewH() {
  const d = data;
  const out = document.getElementById('preview-output');
  out.innerHTML = '';

  const pair = (typeof getColorPair === 'function') ? getColorPair() : { accent:'#4a5e40', secondary:'#8fa07e' };
  const acc = pair.accent;     // mappt auf Moss/Forest
  const sec = pair.secondary;  // mappt auf Sage

  // Tonale DNA — fix (bleibt unabhängig vom Color-Pair)
  const T = {
    parch:  '#f2ece0',
    linen:  '#e8e0ce',
    sand:   '#cfc4ad',
    bark:   '#7a6548',
    barkD:  '#4e3f28',
    soil:   '#2b1f0f',
    cream:  '#faf6ed',
    warm:   '#fdfaf4',
    tMid:   '#5c4a30',
    tSoft:  '#9a8668',
    rust:   '#8a4e2a',
  };

  // Fonts und Scoped-Styles einmalig injizieren
  const styleId = 'tmpl-h-style';
  let styleEl = document.getElementById(styleId);
  if (!styleEl) { styleEl = document.createElement('style'); styleEl.id = styleId; document.head.appendChild(styleEl); }
  styleEl.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Lato:wght@200;300;400&display=swap');
    .h-page { font-family:'Lato',sans-serif; font-weight:300; color:${T.soil}; }
    .h-page * { box-sizing:border-box; }
    .h-serif { font-family:'Playfair Display',serif; }
    .h-stag { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
    .h-stag::before { content:""; display:block; width:22px; height:1px; background:${acc}; }
    .h-stag span { font-size:8.5px; letter-spacing:.44em; text-transform:uppercase; color:${acc}; }
    .h-stag.dark::before { background:${sec}; }
    .h-stag.dark span { color:${sec}; }
    .h-rule { width:32px; height:2px; background:${acc}66; margin:10px 0 16px; }
    .h-pill { padding:6px 14px; border:1px solid rgba(242,236,224,.24); font-size:8.5px; letter-spacing:.22em; text-transform:uppercase; color:${T.parch}; background:rgba(242,236,224,.07); backdrop-filter:blur(4px); }
    .h-spec-row { display:flex; justify-content:space-between; align-items:baseline; padding:6px 0; gap:12px; border-bottom:1px solid rgba(122,101,72,.18); }
    .h-spec-k { font-size:8px; letter-spacing:.22em; text-transform:uppercase; color:${T.tSoft}; flex-shrink:0; }
    .h-spec-v { font-family:'Playfair Display',serif; font-size:11px; color:${T.soil}; text-align:right; }
    .h-feat { display:flex; align-items:flex-start; gap:9px; padding:7px 0; border-bottom:1px solid rgba(242,236,224,.09); }
    .h-feat-dot { width:4px; height:4px; border-radius:50%; background:${sec}; margin-top:6px; flex-shrink:0; }
    .h-feat-txt { font-size:9.5px; line-height:1.5; color:rgba(242,236,224,.72); }
    .h-feat-txt strong { color:${T.parch}; font-weight:400; }
    .h-dist-row { display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid rgba(122,101,72,.14); }
    .h-dist-k { font-size:8.5px; letter-spacing:.14em; color:${T.tMid}; text-transform:uppercase; }
    .h-dist-v { font-family:'Playfair Display',serif; font-size:11px; color:${T.rust}; }
    .h-page em.acc { font-style:italic; color:${acc}; }
    .h-page em.sage { font-style:italic; color:${sec}; }
  `;

  const esc = (typeof escHtml === 'function') ? escHtml : (s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
  const coverPhoto = photos.find(p => p.isCover) || photos[0];
  const coverIdx = photos.findIndex(p => p.isCover);
  const coverSlot = coverIdx >= 0 ? coverIdx : 0;

  const logoHtml = (light) => d.brandLogoSrc
    ? `<img src="${d.brandLogoSrc}" style="max-height:24px;object-fit:contain;${light?'filter:brightness(0) invert(1)':''};display:block">`
    : d.brandFirma ? `<span class="h-serif" style="font-size:13px;letter-spacing:.18em;color:${light?T.parch:T.soil}">${esc(d.brandFirma)}</span>` : '';

  // Kurzversion adresse → Stadt/Region
  const subline = d.adresse || '';

  // ── PAGE 1: COVER ────────────────────────────────────
  out.innerHTML += `
  <div class="tl-page h-page" style="background:${T.warm};display:flex;flex-direction:column;justify-content:flex-end;position:relative;overflow:hidden">
    <!-- Cover Background Photo -->
    ${coverPhoto
      ? `<div style="position:absolute;inset:0">${previewImgWrap(coverPhoto, coverSlot, 'width:100%;height:100%', 'filter:saturate(.92) brightness(.78)')}</div>`
      : `<div style="position:absolute;inset:0;background:linear-gradient(135deg,${acc} 0%, ${T.bark} 60%, ${T.barkD} 100%)"></div>`
    }
    <!-- Gradients -->
    <div style="position:absolute;inset:0;background:linear-gradient(115deg, rgba(43,31,15,.78) 0%, rgba(43,31,15,.32) 38%, rgba(43,31,15,0) 62%, rgba(43,31,15,.45) 92%), linear-gradient(180deg, rgba(43,31,15,.18) 0%, rgba(43,31,15,0) 40%, rgba(43,31,15,.92) 100%);pointer-events:none"></div>

    <!-- Top: Brand + Ref -->
    <div style="position:absolute;top:24px;left:32px;right:32px;display:flex;justify-content:space-between;align-items:flex-start;z-index:2">
      ${logoHtml(true) || `<div class="h-serif" style="color:${T.parch};font-size:13px;letter-spacing:.18em">${esc(d.brandFirma||d.firma||'')}</div>`}
      ${d.objektnr ? `<div style="font-size:8.5px;letter-spacing:.28em;text-transform:uppercase;color:rgba(242,236,224,.55);border:1px solid rgba(242,236,224,.22);padding:6px 14px">${esc(d.objektnr)}</div>` : ''}
    </div>

    <!-- Body: Title -->
    <div style="position:relative;padding:0 32px 60px;width:64%;z-index:2">
      <div class="h-stag dark"><span>${esc((d.eyebrow||'Premium-Immobilie'))}</span></div>
      <h1 class="h-serif" style="font-size:62px;font-weight:400;line-height:1;color:${T.parch};margin-bottom:10px;letter-spacing:-.005em">${esc(d.titel||'Objekt')}${d.untertitel ? `<br><span style="font-style:italic;color:${sec};font-weight:400">${esc(d.untertitel)}</span>` : ''}</h1>
      ${subline ? `<p style="font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:rgba(242,236,224,.55)">${esc(subline)}</p>` : ''}
    </div>

    <!-- Right: Preis-Anker -->
    ${d.preis ? `<div style="position:absolute;right:32px;bottom:60px;text-align:right;z-index:2">
      <div class="h-serif" style="font-size:30px;line-height:1;color:${T.parch}">${esc(d.preis)}</div>
      <div style="font-size:8.5px;letter-spacing:.32em;text-transform:uppercase;color:rgba(242,236,224,.55);margin-top:6px">Kaufpreis</div>
    </div>` : ''}

    <!-- Strip -->
    <div style="position:absolute;left:0;right:0;bottom:0;background:${acc}EE;backdrop-filter:blur(6px);padding:9px 32px;display:flex;align-items:center;gap:24px;z-index:2">
      ${[
        d.wohnflaeche && `${esc(d.wohnflaeche)} Wohnfläche`,
        d.gesamtflaeche && `${esc(d.gesamtflaeche)} Gesamt`,
        d.zimmer && `${esc(d.zimmer)} Zimmer`,
        d.baujahr && `Baujahr ${esc(d.baujahr)}`,
      ].filter(Boolean).map((t,i,arr) => `
        <div style="display:flex;align-items:center;gap:8px;font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:rgba(242,236,224,.72)">
          <div style="width:5px;height:5px;border-radius:50%;background:${sec}"></div>${t}
        </div>
        ${i<arr.length-1?`<div style="width:3px;height:3px;border-radius:50%;background:rgba(242,236,224,.22)"></div>`:''}
      `).join('')}
    </div>
  </div>`;

  // ── PAGE 2: AERIAL (full-bleed, ohne Texte) ───────────
  // Aerial = Slot 1 (zweites Photo); falls Cover dort liegt, weiche auf Slot 0 aus
  const aerialIdx = coverSlot === 1 ? 0 : 1;
  const aerialPhoto = photos[aerialIdx] || null;
  if (aerialPhoto) {
    out.innerHTML += `
    <div class="tl-page h-page" style="position:relative;overflow:hidden;background:linear-gradient(135deg,${acc},${T.bark})">
      <div style="position:absolute;inset:0">${previewImgWrap(aerialPhoto, aerialIdx, 'width:100%;height:100%', 'filter:saturate(.92)')}</div>
    </div>`;
  }

  // ── PAGE 3+: GALLERY (paginiert, Layout passt sich der Anzahl an) ──
  const galStart = TEMPLATE_SLOT_MAP?.['H']?.galleryStartIndex ?? 1;
  const galPhotos = photos.slice(galStart);
  if (galPhotos.length > 0) {
    const perPage = Math.max(1, parseInt(d.photosPerPage) || 6);
    const numPages = Math.ceil(galPhotos.length / perPage);
    for (let pg = 0; pg < numPages; pg++) {
      const set = galPhotos.slice(pg * perPage, (pg + 1) * perPage);
      const gimg = (p, idx, gridArea) => {
        if (!p) return `<div style="background:${T.linen};${gridArea}"></div>`;
        const cap = (p.caption || '').trim();
        const capHtml = cap
          ? `<div style="position:absolute;left:0;right:0;bottom:0;padding:22px 14px 10px;background:linear-gradient(180deg,rgba(43,31,15,0) 0%,rgba(43,31,15,.78) 100%);pointer-events:none">
              <div class="h-serif" style="font-size:10px;font-style:italic;color:${T.parch};line-height:1.3;letter-spacing:.01em">»${esc(cap)}«</div>
            </div>`
          : '';
        return `<div style="position:relative;overflow:hidden;${gridArea}">${previewImgWrap(p, galStart + pg*perPage + idx, 'width:100%;height:100%', 'filter:saturate(.92)')}${capHtml}</div>`;
      };

      const wrap = (gridStyle, slots) => `<div class="tl-page h-page" style="background:${T.linen};display:grid;${gridStyle};gap:3px">${slots}</div>`;
      const auto = () => set.map((p, i) => gimg(p, i, '')).join('');
      let variants = [];
      if (perPage === 1) {
        variants = [() => wrap('grid-template-columns:1fr;grid-template-rows:1fr', auto())];
      } else if (perPage === 2) {
        variants = [
          () => wrap('grid-template-columns:1fr 1fr;grid-template-rows:1fr', auto()),
          () => wrap('grid-template-columns:1fr;grid-template-rows:1fr 1fr', auto()),
        ];
      } else if (perPage === 3) {
        variants = [
          // wide top + 2 below (Querformat-Hero)
          () => wrap('grid-template-columns:1fr 1fr;grid-template-rows:1.3fr 1fr',
            gimg(set[0],0,'grid-column:1/3') + gimg(set[1],1,'') + gimg(set[2],2,'')),
          // 2 above + wide bottom
          () => wrap('grid-template-columns:1fr 1fr;grid-template-rows:1fr 1.3fr',
            gimg(set[0],0,'') + gimg(set[1],1,'') + gimg(set[2],2,'grid-column:1/3')),
          // 3 horizontale Streifen (alle Querformat)
          () => wrap('grid-template-columns:1fr;grid-template-rows:1fr 1fr 1fr', auto()),
        ];
      } else if (perPage === 4) {
        variants = [
          // 2x2 uniform (Zellen ~1.4:1 → Querformat)
          () => wrap('grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr', auto()),
          // wide hero top + 3 below
          () => wrap('grid-template-columns:1fr 1fr 1fr;grid-template-rows:1.3fr 1fr',
            gimg(set[0],0,'grid-column:1/4') + gimg(set[1],1,'') + gimg(set[2],2,'') + gimg(set[3],3,'')),
          // 3 above + wide bottom band
          () => wrap('grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1.3fr',
            gimg(set[0],0,'') + gimg(set[1],1,'') + gimg(set[2],2,'') + gimg(set[3],3,'grid-column:1/4')),
          // 4 horizontale Streifen (Magazin-Reihen)
          () => wrap('grid-template-columns:1fr;grid-template-rows:1fr 1fr 1fr 1fr', auto()),
        ];
      } else if (perPage === 5) {
        variants = [
          // wide top + 2x2 below (alle Zellen Querformat)
          () => wrap('grid-template-columns:1fr 1fr;grid-template-rows:1.3fr 1fr 1fr',
            gimg(set[0],0,'grid-column:1/3') + gimg(set[1],1,'') + gimg(set[2],2,'') + gimg(set[3],3,'') + gimg(set[4],4,'')),
          // 2x2 oben + wide unten
          () => wrap('grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr 1.3fr',
            gimg(set[0],0,'') + gimg(set[1],1,'') + gimg(set[2],2,'') + gimg(set[3],3,'') + gimg(set[4],4,'grid-column:1/3')),
          // 1 wide + 1 medium top, 3 below
          () => wrap('grid-template-columns:1fr 1fr 1fr;grid-template-rows:1.2fr 1fr',
            gimg(set[0],0,'grid-column:1/3;grid-row:1') + gimg(set[1],1,'grid-column:3;grid-row:1') +
            gimg(set[2],2,'') + gimg(set[3],3,'') + gimg(set[4],4,'')),
          // 3 oben + 1 medium + 1 wide unten (gespiegelt)
          () => wrap('grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1.2fr',
            gimg(set[0],0,'') + gimg(set[1],1,'') + gimg(set[2],2,'') +
            gimg(set[3],3,'grid-column:1;grid-row:2') + gimg(set[4],4,'grid-column:2/4;grid-row:2')),
        ];
      } else if (perPage === 6) {
        variants = [
          // wide hero top + 4 medium + wide band bottom (Editorial)
          () => wrap('grid-template-columns:1fr 1fr 1fr 1fr;grid-template-rows:1.3fr 1fr 1.3fr',
            gimg(set[0],0,'grid-column:1/5;grid-row:1') +
            gimg(set[1],1,'grid-column:1;grid-row:2') + gimg(set[2],2,'grid-column:2;grid-row:2') +
            gimg(set[3],3,'grid-column:3;grid-row:2') + gimg(set[4],4,'grid-column:4;grid-row:2') +
            gimg(set[5],5,'grid-column:1/5;grid-row:3')),
          // großer Hero links + 2 rechts + 3 wide unten
          () => wrap('grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr 1fr',
            gimg(set[0],0,'grid-column:1/3;grid-row:1/3') +
            gimg(set[1],1,'grid-column:3;grid-row:1') + gimg(set[2],2,'grid-column:3;grid-row:2') +
            gimg(set[3],3,'grid-column:1;grid-row:3') + gimg(set[4],4,'grid-column:2;grid-row:3') + gimg(set[5],5,'grid-column:3;grid-row:3')),
          // 3x2 mit oberer Reihe höher (Querformat-Zellen)
          () => wrap('grid-template-columns:1fr 1fr 1fr;grid-template-rows:1.2fr 1fr', auto()),
          // 2x3 stapel-Streifen (alle Zellen breit-Querformat)
          () => wrap('grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr 1fr', auto()),
        ];
      } else {
        const cols = perPage >= 12 ? 4 : 3;
        const rows = Math.ceil(perPage / cols);
        variants = [() => wrap(`grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr)`, auto())];
      }
      out.innerHTML += variants[pg % variants.length]();
    }
  }

  // ── PAGE: HIGHLIGHTS ─────────────────────────────────
  const highlights = (d.highlights || []).filter(Boolean);
  if (highlights.length > 0) {
    const half = Math.ceil(highlights.length / 2);
    const col1 = highlights.slice(0, half);
    const col2 = highlights.slice(half);
    out.innerHTML += `
    <div class="tl-page h-page" style="background:${acc};display:grid;grid-template-columns:.85fr 1fr 1fr;gap:32px;padding:36px 36px;align-content:center">
      <div>
        <div class="h-stag dark"><span>Highlights</span></div>
        <h2 class="h-serif" style="font-size:30px;font-weight:400;color:${T.parch};line-height:1.08">
          Was dieses<br>Anwesen<br><em class="sage">unvergleichlich</em><br>macht
        </h2>
        <p style="font-size:9.5px;line-height:1.85;color:rgba(242,236,224,.55);margin-top:14px;max-width:30ch">
          ${highlights.length} Argumente, die dieses Objekt von gewöhnlichen Immobilien unterscheiden.
        </p>
      </div>
      <ul style="list-style:none;padding:0;margin:0">
        ${col1.map(h=>`<li class="h-feat"><div class="h-feat-dot"></div><span class="h-feat-txt">${esc(h)}</span></li>`).join('')}
      </ul>
      <ul style="list-style:none;padding:0;margin:0">
        ${col2.map(h=>`<li class="h-feat"><div class="h-feat-dot"></div><span class="h-feat-txt">${esc(h)}</span></li>`).join('')}
      </ul>
    </div>`;
  }

  // ── PAGE: SPECS + GRUNDRISS + 360° TOUR ──────────────
  const specRows = [
    ['Objektnummer', d.objektnr],
    ['Objekt-Typ', d.type],
    ['Kaufpreis', d.preis],
    ['Käuferprovision', d.kaeuferp],
    ['Wohnfläche', d.wohnflaeche],
    ['Gesamtfläche', d.gesamtflaeche],
    ['Zimmer', d.zimmer],
    ['Baujahr', d.baujahr],
    ['Zustand', d.zustand],
    ['Heizung', d.heizung],
    ['Energieklasse', d.energieklasse],
    ['Hausgeld', d.hausgeld],
    ['Verfügbarkeit', d.verfuegbar],
    ['Stellplätze', (typeof formatStellplaetzeLines==='function' ? formatStellplaetzeLines(d.stellplaetze) : []).join(', ')],
  ].filter(r=>r[1]);

  const hasGrundriss = typeof grundrisse !== 'undefined' && grundrisse.length > 0;
  const has360 = d.extras360Enabled && d.link360;

  if (specRows.length > 0) {
    out.innerHTML += `
    <div class="tl-page h-page" style="background:${T.linen};display:grid;grid-template-columns:1fr 1fr 1fr;gap:28px;padding:30px 36px">
      <!-- Specs -->
      <div>
        <div class="h-stag"><span>Objektdaten</span></div>
        <h3 class="h-serif" style="font-size:24px;font-weight:400;color:${T.soil};line-height:1.12;margin-bottom:14px">
          Kenndaten &<br><em class="acc">Fakten</em>
        </h3>
        ${specRows.slice(0, 13).map(r => `
          <div class="h-spec-row">
            <span class="h-spec-k">${esc(r[0])}</span>
            <span class="h-spec-v">${esc(r[1]).replace(/\n/g,' · ')}</span>
          </div>`).join('')}
      </div>

      <!-- Grundriss -->
      <div>
        <div class="h-stag"><span>Grundrisse</span></div>
        <h3 class="h-serif" style="font-size:24px;font-weight:400;color:${T.soil};line-height:1.12;margin-bottom:14px">
          ${hasGrundriss ? 'Pläne' : 'Räume &'}<br><em class="acc">${hasGrundriss ? 'im Überblick' : 'Aufteilung'}</em>
        </h3>
        ${hasGrundriss
          ? grundrisse.slice(0,2).map((g,i)=>`
            <div style="background:#fff;border:1px solid ${T.sand};padding:8px;margin-bottom:8px">
              <div style="aspect-ratio:16/10;overflow:hidden">
                <img src="${g.src}" style="width:100%;height:100%;object-fit:contain;display:block" alt="">
              </div>
              <div style="font-size:8px;letter-spacing:.3em;text-transform:uppercase;color:${T.tSoft};margin-top:6px;text-align:center">
                ${esc(g.label || (i===0?'Erdgeschoss':'Obergeschoss'))}
              </div>
            </div>`).join('')
          : `<div style="background:#fff;border:1px solid ${T.sand};padding:14px;font-size:10px;line-height:1.7;color:${T.tMid}">
              ${(d.zimmer ? `<p><strong style="color:${T.soil}">${esc(d.zimmer)} Zimmer</strong></p>` : '')}
              ${(d.wohnflaeche ? `<p style="margin-top:6px">Wohnfläche: ${esc(d.wohnflaeche)}</p>` : '')}
              ${(d.gesamtflaeche ? `<p style="margin-top:4px">Gesamt: ${esc(d.gesamtflaeche)}</p>` : '')}
              <p style="margin-top:10px;color:${T.tSoft};font-size:9px;font-style:italic">Grundrisse können auf Anfrage übermittelt werden.</p>
            </div>`
        }
      </div>

      <!-- 360° Tour Box -->
      <div style="background:${T.barkD};color:${T.parch};padding:24px;display:flex;flex-direction:column;gap:12px;position:relative;overflow:hidden">
        <div style="position:absolute;right:-30px;bottom:-30px;width:140px;height:140px;border:1px solid ${sec}26;border-radius:50%"></div>
        <div class="h-stag dark"><span>${has360 ? '360°-Rundgang' : 'Besichtigung'}</span></div>
        <h3 class="h-serif" style="font-size:18px;line-height:1.15;color:${T.parch}">
          ${has360 ? `Das Anwesen<br><em class="sage">virtuell erleben</em>` : `Persönliche<br><em class="sage">Besichtigung</em>`}
        </h3>
        <p style="font-size:9.5px;line-height:1.7;color:rgba(242,236,224,.65)">
          ${has360
            ? 'Erkunden Sie das Objekt bequem von zu Hause — mit unserem interaktiven Rundgang durch alle Räume.'
            : 'Wir vereinbaren gerne einen individuellen Termin vor Ort. Kontaktieren Sie uns telefonisch oder per E-Mail.'}
        </p>
        ${has360
          ? `<div style="margin-top:auto;display:flex;align-items:center;gap:12px">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(d.link360)}" style="width:74px;height:74px;background:#fff;padding:4px;flex-shrink:0;display:block" alt="QR-Code 360°">
              <div style="display:flex;flex-direction:column;gap:6px;min-width:0">
                <div style="font-size:7px;letter-spacing:.3em;text-transform:uppercase;color:rgba(242,236,224,.5);line-height:1.5">QR scannen<br>& Tour starten</div>
                <a href="${esc(d.link360)}" target="_blank" style="font-size:7.5px;letter-spacing:.32em;text-transform:uppercase;color:${sec};text-decoration:none;border-bottom:1px solid ${sec}66;padding-bottom:2px;align-self:flex-start">Zum Rundgang →</a>
              </div>
            </div>`
          : (d.tel ? `<div style="font-family:'Playfair Display',serif;font-size:14px;color:${T.parch};margin-top:auto">${esc(d.tel)}</div>` : '')
        }
      </div>
    </div>`;
  }

  // ── PAGE: OWNER QUOTE + LAGE ─────────────────────────
  const ownerQuoteText = d.ownerQuote || d.eigentuemerZitat;
  const showLage = d.lage && (typeof isStepEnabled !== 'function' || isStepEnabled(8));
  if (ownerQuoteText || showLage) {
    out.innerHTML += `
    <div class="tl-page h-page" style="display:grid;grid-template-columns:1.1fr 1fr">
      <!-- Left: Owner Quote / Highlight -->
      <div style="background:${T.barkD};padding:30px 36px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden">
        <div style="position:absolute;left:-60px;top:-60px;width:240px;height:240px;border:1px solid ${sec}1f;border-radius:50%"></div>
        <div class="h-stag dark"><span>Charakter</span></div>
        <h2 class="h-serif" style="font-size:24px;color:${T.parch};font-weight:400;line-height:1.18;margin-bottom:18px">
          ${esc(d.titel || 'Eine Immobilie')}<br><em class="sage">mit Geschichte</em>
        </h2>
        ${ownerQuoteText
          ? `<blockquote class="h-serif" style="font-size:11px;font-style:italic;line-height:1.75;color:rgba(242,236,224,.85);border-left:2px solid ${sec};padding-left:18px;margin:0">»${esc(ownerQuoteText)}«</blockquote>
             <cite style="display:block;margin-top:14px;font-style:normal;font-size:8px;letter-spacing:.3em;text-transform:uppercase;color:${sec};padding-left:18px">${esc(d.ownerQuoteCite || 'Eigentümer')}</cite>`
          : `<p style="font-size:10.5px;line-height:1.85;color:rgba(242,236,224,.75);max-width:42ch">
              ${esc((d.beschreibung||'').split('\n').filter(Boolean)[0] || 'Eine außergewöhnliche Immobilie mit Charakter und Geschichte.')}
            </p>`
        }
      </div>

      <!-- Right: Lage -->
      <div style="background:${T.cream};padding:30px 36px;display:flex;flex-direction:column;justify-content:center">
        <div class="h-stag"><span>Lage</span></div>
        <h2 class="h-serif" style="font-size:24px;font-weight:400;color:${T.soil};line-height:1.12;margin-bottom:4px">
          Standort &<br><em class="acc">Umfeld</em>
        </h2>
        <div class="h-rule"></div>
        ${showLage
          ? `<div style="font-size:10px;line-height:1.8;color:${T.tMid};margin-bottom:16px">
              ${d.lage.split('\n').filter(Boolean).slice(0,3).map(esc).map(p=>`<p style="margin-bottom:6px">${p}</p>`).join('')}
            </div>`
          : ''}
        ${d.adresse
          ? `<div class="h-dist-row"><span class="h-dist-k">Adresse</span><span class="h-dist-v">${esc(d.adresse)}</span></div>`
          : ''}
        ${(typeof hasLageMedia==='function' && hasLageMedia())
          ? `<div style="margin-top:14px">${buildLageMediaHtml(75)}</div>`
          : ''}
      </div>
    </div>`;
  }

  // ── PAGE: PREIS + BROKER + FOOTER ────────────────────
  out.innerHTML += `
  <div class="tl-page h-page" style="background:${T.parch};padding:30px 36px;display:grid;grid-template-columns:1.1fr 1fr;gap:32px;align-items:center;position:relative;overflow:hidden">
    <!-- Decorative circles -->
    <div style="position:absolute;right:-120px;top:-120px;width:480px;height:480px;border-radius:50%;border:1px solid ${acc}1a;pointer-events:none"></div>
    <div style="position:absolute;right:-50px;top:-50px;width:340px;height:340px;border-radius:50%;border:1px solid ${acc}12;pointer-events:none"></div>

    <!-- Preis-Block -->
    <div style="position:relative;z-index:1">
      <div class="h-stag"><span>Kaufpreis</span></div>
      <div class="h-serif" style="font-size:48px;font-weight:400;color:${T.soil};line-height:1;margin-bottom:8px">
        ${esc(d.preis || 'Auf Anfrage')}
      </div>
      ${d.kaeuferp ? `<p style="font-size:9.5px;letter-spacing:.18em;color:${T.tSoft};text-transform:uppercase;margin-bottom:22px">Käuferprovision: ${esc(d.kaeuferp)}</p>` : '<div style="margin-bottom:22px"></div>'}
      <div style="display:inline-flex;align-items:center;gap:10px;padding:12px 26px;background:${T.barkD};color:${T.parch};font-size:8.5px;letter-spacing:.34em;text-transform:uppercase">
        Besichtigung anfragen →
      </div>
    </div>

    <!-- Broker Card -->
    <div style="background:${T.cream};padding:22px;border:1px solid ${T.sand};position:relative;z-index:1">
      <div style="display:flex;align-items:flex-start;gap:16px">
        <div style="width:64px;height:64px;border-radius:50%;background:${T.linen};border:2px solid ${T.sand};display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">
          ${d.brokerPhotoSrc
            ? `<img src="${d.brokerPhotoSrc}" alt="${esc(d.name||'')}" style="width:100%;height:100%;object-fit:cover;display:block">`
            : `<svg viewBox="0 0 24 24" fill="none" stroke="${T.bark}" stroke-width="1.2" style="width:30px;height:30px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
          }
        </div>
        <div>
          <div class="h-serif" style="font-size:17px;color:${T.soil};margin-bottom:2px">${esc(d.name||'Ihr Ansprechpartner')}</div>
          <div style="font-size:7.5px;letter-spacing:.3em;text-transform:uppercase;color:${T.tSoft};margin-bottom:4px">${esc(d.firma||'')}</div>
          ${d.objektnr ? `<div style="font-size:8.5px;letter-spacing:.18em;color:${acc};text-transform:uppercase">Objekt ${esc(d.objektnr)}</div>` : ''}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;margin-top:14px;padding-top:12px;border-top:1px solid rgba(122,101,72,.18)">
        ${d.tel ? `<div style="display:flex;align-items:center;gap:8px;font-size:9.5px;color:${T.tMid}">
          <svg viewBox="0 0 24 24" fill="none" stroke="${acc}" stroke-width="1.5" style="width:11px;height:11px;flex-shrink:0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.27 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.18 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.32-1.32a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          ${esc(d.tel)}
        </div>` : ''}
        ${d.email ? `<div style="display:flex;align-items:center;gap:8px;font-size:9.5px;color:${T.tMid};word-break:break-all">
          <svg viewBox="0 0 24 24" fill="none" stroke="${acc}" stroke-width="1.5" style="width:11px;height:11px;flex-shrink:0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          ${esc(d.email)}
        </div>` : ''}
        ${d.kontaktAdresse ? `<div style="grid-column:1/-1;font-size:8.5px;color:${T.tSoft};letter-spacing:.12em;padding-top:8px;margin-top:4px;border-top:1px solid rgba(122,101,72,.12)">
          ${esc(d.kontaktAdresse)}
        </div>` : ''}
      </div>
    </div>

    <!-- Footer Band -->
    <div style="position:absolute;left:0;right:0;bottom:0;background:${T.soil};padding:9px 36px;display:flex;justify-content:space-between;align-items:center">
      ${logoHtml(true) || `<div class="h-serif" style="color:${T.parch};font-size:13px;letter-spacing:.1em">${esc(d.brandFirma||d.firma||'')}</div>`}
      <div style="font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:rgba(242,236,224,.32);text-align:center">
        Alle Angaben ohne Gewähr · Irrtümer vorbehalten
      </div>
      <div style="font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(242,236,224,.28);text-align:right">
        ${d.objektnr ? `Obj.-Nr. ${esc(d.objektnr)}` : ''}
      </div>
    </div>
  </div>`;
}
