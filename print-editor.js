// Gemeinsamer Print-Editor für Flyer, Plakat und Bauzaunbanner.
// Öffnet ein 2-Spalten-Modal mit Editor links und Live-Preview-iframe rechts.

const PRINT_TOOLS = {
  flyer:      { generate: typeof generateFlyer      === 'function' ? generateFlyer      : null, config: typeof FLYER_CONFIG      !== 'undefined' ? FLYER_CONFIG      : null, label: 'Flyer' },
  plakat:     { generate: typeof generatePlakat     === 'function' ? generatePlakat     : null, config: typeof PLAKAT_CONFIG     !== 'undefined' ? PLAKAT_CONFIG     : null, label: 'Plakat' },
  banner:     { generate: typeof generateBanner     === 'function' ? generateBanner     : null, config: typeof BANNER_CONFIG     !== 'undefined' ? BANNER_CONFIG     : null, label: 'Bauzaunbanner' },
  socialpost: { generate: typeof generateSocialpost === 'function' ? generateSocialpost : null, config: typeof SOCIALPOST_CONFIG !== 'undefined' ? SOCIALPOST_CONFIG : null, label: 'Social Media Post' },
  zeitung:    { generate: typeof generateZeitung    === 'function' ? generateZeitung    : null, config: typeof ZEITUNG_CONFIG    !== 'undefined' ? ZEITUNG_CONFIG    : null, label: 'Zeitungsanzeige' },
};

// Format-Größen pro Tool/Variante in mm – für Iframe-Sizing & Skalierung der Vorschau
const PRINT_DIMENSIONS = {
  flyer: {
    dinlang:   { w: 99,   h: 210  },
    a5:        { w: 148,  h: 210  },
    postkarte: { w: 148,  h: 105  },  // 2-seitig → wird im sizing als 1 Seite behandelt
  },
  plakat: {
    a3: { w: 297, h: 420 },
    a2: { w: 420, h: 594 },
  },
  banner: {
    standard: { w: 3400, h: 1730 },
  },
  socialpost: {
    standard: { w: 270, h: 270 },
  },
  zeitung: {
    small:  { w: 45,  h: 60  },
    medium: { w: 92,  h: 60  },
    large:  { w: 92,  h: 130 },
    half:   { w: 190, h: 140 },
    // 'custom' wird zur Laufzeit aus state.fields._w / _h ermittelt
  },
};

// Liefert Maße für aktuellen state – behandelt 'custom' (Zeitung) mit user-eingegebenen Werten
function _getDimensions(state) {
  if (!state) return null;
  if (state.tool === 'zeitung' && state.variant === 'custom') {
    const w = parseInt(state.fields?._w, 10);
    const h = parseInt(state.fields?._h, 10);
    if (w > 0 && h > 0) return { w, h };
    return { w: 92, h: 60 }; // Fallback
  }
  return (PRINT_DIMENSIONS[state.tool] || {})[state.variant] || null;
}

let _printState = null;
let _printRenderTimer = null;

function _printDefaultFields() {
  const d = (typeof data !== 'undefined') ? (data || {}) : {};
  return {
    kicker:        d.untertitel ? '' : '',
    titel:         d.titel || '',
    untertitel:    d.untertitel || '',
    preis:         d.preis || '',
    preisDetail:   d.preisDetail || '',
    adresse:       d.adresse || '',
    beschreibung:  d.beschreibung || '',
    wohnflaeche:   d.wohnflaeche || '',
    zimmer:        d.zimmer || '',
    baujahr:       d.baujahr || '',
    zustand:       d.zustand || '',
    energiestandard: d.energiestandard || '',
    heizung:       d.heizung || '',
    name:          d.name || '',
    firma:         d.firma || d.brandFirma || '',
    tel:           d.tel || '',
    email:         d.email || '',
  };
}

function _printAllPhotos() {
  const out = [];
  if (typeof photos !== 'undefined' && Array.isArray(photos)) {
    photos.forEach(p => { if (p && p.src) out.push({ src: p.src, caption: p.caption || '', kind: 'foto' }); });
  }
  if (typeof grundrisse !== 'undefined' && Array.isArray(grundrisse)) {
    grundrisse.forEach(p => { if (p && p.src) out.push({ src: p.src, caption: p.caption || 'Grundriss', kind: 'grundriss' }); });
  }
  return out;
}

function openPrintEditor(tool) {
  const t = PRINT_TOOLS[tool];
  if (!t || !t.generate || !t.config) {
    alert('Tool nicht verfügbar: ' + tool);
    return;
  }
  const allPhotos = _printAllPhotos();
  const slotCount = t.config.imageSlots || 1;
  const firstImg = allPhotos[0]?.src || '';

  _printState = {
    tool,
    variant: t.config.variants[0].id,
    fields: _printDefaultFields(),
    images: Array.from({ length: slotCount }, (_, i) => allPhotos[i]?.src || firstImg),
    accent: (typeof getColorPair === 'function' ? getColorPair().accent : '#c9a84c'),
    logoSrc: ((typeof data !== 'undefined' && data && data.brandLogoSrc) || null),
  };

  // Schließt vorher das Weitere-Medien-Modal, damit die Druckansicht freie Sicht hat
  if (typeof closeMediaModal === 'function') closeMediaModal();

  document.getElementById('printEditorOverlay').classList.add('open');
  _renderPrintEditorUI();
  _renderPrintPreview();
}

function closePrintEditor() {
  document.getElementById('printEditorOverlay').classList.remove('open');
  _printState = null;
}

function _renderPrintEditorUI() {
  if (!_printState) return;
  const t = PRINT_TOOLS[_printState.tool];
  const cfg = t.config;
  const head = document.getElementById('printEditorHeader');
  const editor = document.getElementById('printEditorPanel');

  // Header: Tool-Name + Variant-Tabs
  head.innerHTML = `
    <div class="pe-head-left">
      <div class="pe-head-title">${t.label}${(() => {
        const d = _getDimensions(_printState);
        return d ? ` <span id="peSizeBadge" style="font-size:.75rem;color:var(--gold);font-weight:600;letter-spacing:.04em">· ${d.w} × ${d.h} mm</span>` : '';
      })()}</div>
      <div class="pe-variant-tabs">
        ${cfg.variants.map(v => `
          <button class="pe-variant-tab${v.id === _printState.variant ? ' active' : ''}" onclick="setPrintVariant('${v.id}')">
            <span class="pe-variant-label">${v.label}</span>
            <span class="pe-variant-size">${v.size}</span>
          </button>
        `).join('')}
      </div>
    </div>
    <div class="pe-head-right">
      <button class="pe-btn pe-btn-primary" onclick="printFromEditor()">⎙ Drucken / Als PDF speichern</button>
      <button class="pe-close" onclick="closePrintEditor()" aria-label="Schließen">×</button>
    </div>
  `;

  // Editor-Panel: Bilder, dann Felder
  const allPhotos = _printAllPhotos();
  const slotCount = cfg.imageSlots || 1;
  const imageSection = `
    <div class="pe-section">
      <div class="pe-section-title">${slotCount > 1 ? 'Bilder' : 'Hauptbild'}</div>
      ${Array.from({ length: slotCount }, (_, slotIdx) => `
        <div class="pe-image-slot">
          <div class="pe-image-current">
            ${_printState.images[slotIdx] ? `<img src="${_printState.images[slotIdx]}" alt="">` : '<div class="pe-image-empty">kein Bild</div>'}
            <span class="pe-slot-num">${slotIdx + 1}</span>
          </div>
          <div class="pe-image-grid">
            ${allPhotos.length === 0 ? '<div class="pe-empty-hint">Keine Bilder im Expogen vorhanden. Lade in Schritt 5 Fotos hoch.</div>' :
              allPhotos.map((p, pi) => `
                <button class="pe-thumb${_printState.images[slotIdx] === p.src ? ' active' : ''}" onclick="setPrintImage(${slotIdx}, ${pi})" title="${p.caption ? p.caption.replace(/"/g, '&quot;') : (p.kind === 'grundriss' ? 'Grundriss' : 'Foto ' + (pi + 1))}">
                  <img src="${p.src}" alt="">
                  ${p.kind === 'grundriss' ? '<span class="pe-thumb-tag">G</span>' : ''}
                </button>
              `).join('')
            }
          </div>
        </div>
      `).join('')}
    </div>
  `;

  const fieldSection = `
    <div class="pe-section">
      <div class="pe-section-title">Texte</div>
      ${cfg.fields.map(fld => `
        <div class="pe-field">
          <label class="pe-label">${fld.label}</label>
          ${fld.multiline
            ? `<textarea class="pe-input pe-textarea" rows="3" placeholder="${fld.placeholder || ''}" oninput="setPrintField('${fld.key}', this.value)">${(_printState.fields[fld.key] || '').replace(/</g, '&lt;')}</textarea>`
            : `<input type="text" class="pe-input" placeholder="${fld.placeholder || ''}" value="${(_printState.fields[fld.key] || '').replace(/"/g, '&quot;')}" oninput="setPrintField('${fld.key}', this.value)">`
          }
        </div>
      `).join('')}
    </div>
  `;

  const noteSection = cfg.notes
    ? `<div class="pe-section pe-section-note"><div class="pe-note">ℹ ${cfg.notes}</div></div>`
    : '';

  editor.innerHTML = imageSection + fieldSection + noteSection;
}

function setPrintVariant(variantId) {
  if (!_printState) return;
  _printState.variant = variantId;
  _renderPrintEditorUI();
  _renderPrintPreview();
}

function setPrintField(key, value) {
  if (!_printState) return;
  _printState.fields[key] = value;
  // Bei Custom-Größe: Header-Badge live aktualisieren
  if (key === '_w' || key === '_h') {
    const d = _getDimensions(_printState);
    const badge = document.getElementById('peSizeBadge');
    if (d && badge) badge.textContent = `· ${d.w} × ${d.h} mm`;
  }
  _schedulePrintRender();
}

function setPrintImage(slotIdx, photoIdx) {
  if (!_printState) return;
  const all = _printAllPhotos();
  const p = all[photoIdx];
  if (!p) return;
  _printState.images[slotIdx] = p.src;
  _renderPrintEditorUI();
  _renderPrintPreview();
}

function _schedulePrintRender() {
  clearTimeout(_printRenderTimer);
  _printRenderTimer = setTimeout(_renderPrintPreview, 180);
}

function _renderPrintPreview() {
  if (!_printState) return;
  const t = PRINT_TOOLS[_printState.tool];
  const html = t.generate(_printState);
  const iframe = document.getElementById('printPreviewFrame');
  if (!iframe) return;
  iframe.srcdoc = html;
  requestAnimationFrame(() => _sizePrintIframe());
}

function _sizePrintIframe() {
  if (!_printState) return;
  const dim = _getDimensions(_printState);
  if (!dim) return;
  const stage  = document.getElementById('printPreviewStage');
  const iframe = document.getElementById('printPreviewFrame');
  const wrap   = stage?.parentElement; // .pe-preview
  if (!stage || !iframe || !wrap) return;

  // 1mm ≈ 3.7795px (96dpi)
  const mmToPx = 3.7795275591;
  const targetW = dim.w * mmToPx;
  const targetH = dim.h * mmToPx;

  // Verfügbarer Platz im Vorschau-Bereich (mit Padding-Reserve)
  const padding = 48;
  const availW = Math.max(200, wrap.clientWidth  - padding);
  const availH = Math.max(200, wrap.clientHeight - padding);
  const scale = Math.min(availW / targetW, availH / targetH, 1);

  // Stage erhält die SKALIERTE Größe (= echter Layout-Footprint im Flow)
  stage.style.width  = (targetW * scale) + 'px';
  stage.style.height = (targetH * scale) + 'px';

  // iframe ist absolut positioniert in der Stage und behält seine echten mm-Pixel-Maße
  iframe.style.width  = targetW + 'px';
  iframe.style.height = targetH + 'px';
  iframe.style.transform = `scale(${scale})`;
}

// Bei Resize neu skalieren
window.addEventListener('resize', () => { if (_printState) _sizePrintIframe(); });

function printFromEditor() {
  const iframe = document.getElementById('printPreviewFrame');
  if (!iframe || !iframe.contentWindow) {
    alert('Vorschau ist nicht bereit. Bitte einen Moment warten.');
    return;
  }
  try {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  } catch (e) {
    console.error('[PrintEditor] Druck fehlgeschlagen:', e);
    alert('Druck fehlgeschlagen. Bitte Browser-Konsole prüfen.');
  }
}
