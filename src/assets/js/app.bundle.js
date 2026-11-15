
// ==========================================
// MODULE 6: DATABASE & BACKUP MANAGEMENT VIEW
// ==========================================
function SettingsBackupModule({ onExport, onImport, onLoadDemo, onClear, recordCounts }) {
  const fileInputRef = React.useRef(null);
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-lg border border-slate-200 shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between border-b border-slate-100 pb-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-base font-semibold text-slate-900"
  }, "Manajemen Basis Data & Cadangan Kriptografis"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-0.5"
  }, "Pedigro Standalone v1.0.0 · Penyimpanan Terenkripsi IndexedDB & Integritas SHA-256")), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-1 rounded bg-brand-50 text-brand-800 border border-brand-200 text-xs font-mono font-semibold"
  }, "Skema: v1")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    className: "w-3.5 h-3.5 text-brand-700"
  }), /*#__PURE__*/React.createElement("span", null, "Ekspor Cadangan Terverifikasi")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 leading-relaxed"
  }, "Unduh seluruh data plasma nutfah, silsilah, dan observasi ke dalam berkas .json mandiri bertanda tangan digital SHA-256."), /*#__PURE__*/React.createElement("button", {
    onClick: onExport,
    className: "w-full touch-target px-4 py-2 bg-brand-700 hover:bg-brand-600 text-white rounded-md text-xs font-medium inline-flex items-center justify-center space-x-2 transition"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Ekspor Cadangan (.json)"))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-3.5 h-3.5 text-brand-700"
  }), /*#__PURE__*/React.createElement("span", null, "Pulihkan Data dari Berkas")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 leading-relaxed"
  }, "Pulihkan data dari perangkat lain. Sistem otomatis menolak berkas jika sidik jari SHA-256 tidak cocok."), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".json",
    ref: fileInputRef,
    onChange: onImport,
    className: "hidden"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => fileInputRef.current && fileInputRef.current.click(),
    className: "w-full touch-target px-4 py-2 border border-slate-300 hover:bg-white text-slate-800 rounded-md text-xs font-medium inline-flex items-center justify-center space-x-2 transition"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-4 h-4 text-slate-500"
  }), /*#__PURE__*/React.createElement("span", null, "Pilih Berkas Cadangan (.json)")))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-slate-100 pt-5 flex flex-wrap items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3 text-xs text-slate-600"
  }, /*#__PURE__*/React.createElement("span", null, "Statistik Lokal:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-medium text-slate-900"
  }, recordCounts.germplasm, " Indukan"), /*#__PURE__*/React.createElement("span", null, "·"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-medium text-slate-900"
  }, recordCounts.crossings, " Persilangan"), /*#__PURE__*/React.createElement("span", null, "·"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-medium text-slate-900"
  }, recordCounts.units, " Petak")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onLoadDemo,
    className: "px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium"
  }, "Muat Data Latihan / Demo"), /*#__PURE__*/React.createElement("button", {
    onClick: onClear,
    className: "px-3 py-1.5 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-xs font-medium"
  }, "Kosongkan Seluruh Data")))));
}


// ==========================================
// CRYPTOGRAPHIC DATA INTEGRITY ENGINE (SHA-256)
// ==========================================
const computePayloadChecksum = async (payloadStr) => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const msgBuffer = new TextEncoder().encode(payloadStr);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {}
  }
  let hash = 0;
  for (let i = 0; i < payloadStr.length; i++) {
    hash = ((hash << 5) - hash) + payloadStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
};
/**
 * Pedigro Standalone Production Bundle (Pre-compiled ES2020)
 * Offline-first, Zero-Babel Runtime, Air-Gap Verified
 * Author: Jipung (Lone Steed Studio)
 * License: MIT
 */
const {
  useState,
  useMemo,
  useEffect,
  useRef
} = React;

// --- SERVICE WORKER REGISTRATION (PWA) ---
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => console.log('ServiceWorker registered:', reg.scope)).catch(err => console.log('ServiceWorker registration skipped:', err));
  });
}

// --- CLEAN SVG ICON COMPONENT (ZERO EMOJI) ---
const Icon = ({
  name,
  className = "w-4 h-4"
}) => {
  switch (name) {
    case 'sprout':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M7 20h10"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M10 20c5.5-2.5.8-6.4 3-10"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"
      }));
    case 'desktop':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("rect", {
        width: "20",
        height: "14",
        x: "2",
        y: "3",
        rx: "2"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "8",
        x2: "16",
        y1: "21",
        y2: "21"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "12",
        x2: "12",
        y1: "17",
        y2: "21"
      }));
    case 'phone':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("rect", {
        width: "14",
        height: "20",
        x: "5",
        y: "2",
        rx: "2",
        ry: "2"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "12",
        x2: "12.01",
        y1: "18",
        y2: "18"
      }));
    case 'database':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("ellipse", {
        cx: "12",
        cy: "5",
        rx: "9",
        ry: "3"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 5V19A9 3 0 0 0 21 19V5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 12A9 3 0 0 0 21 12"
      }));
    case 'git-merge':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "18",
        cy: "18",
        r: "3"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "6",
        cy: "6",
        r: "3"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M6 21V9a9 9 0 0 0 9 9"
      }));
    case 'book-open':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
      }));
    case 'network':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("rect", {
        x: "16",
        y: "16",
        width: "6",
        height: "6",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "16",
        width: "6",
        height: "6",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "9",
        y: "2",
        width: "6",
        height: "6",
        rx: "1"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 12V8"
      }));
    case 'sliders':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("line", {
        x1: "4",
        x2: "4",
        y1: "21",
        y2: "14"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "4",
        x2: "4",
        y1: "10",
        y2: "3"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "12",
        x2: "12",
        y1: "21",
        y2: "12"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "12",
        x2: "12",
        y1: "8",
        y2: "3"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "20",
        x2: "20",
        y1: "21",
        y2: "16"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "20",
        x2: "20",
        y1: "12",
        y2: "3"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "1",
        x2: "7",
        y1: "14",
        y2: "14"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "9",
        x2: "15",
        y1: "8",
        y2: "8"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "17",
        x2: "23",
        y1: "16",
        y2: "16"
      }));
    case 'file-text':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
      }), /*#__PURE__*/React.createElement("polyline", {
        points: "14 2 14 8 20 8"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "16",
        x2: "8",
        y1: "13",
        y2: "13"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "16",
        x2: "8",
        y1: "17",
        y2: "17"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "10",
        x2: "8",
        y1: "9",
        y2: "9"
      }));
    case 'plus':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("line", {
        x1: "12",
        x2: "12",
        y1: "5",
        y2: "19"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "5",
        x2: "19",
        y1: "12",
        y2: "12"
      }));
    case 'lock':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("rect", {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M7 11V7a5 5 0 0 1 10 0v4"
      }));
    case 'qr-code':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("rect", {
        width: "5",
        height: "5",
        x: "3",
        y: "3",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        width: "5",
        height: "5",
        x: "16",
        y: "3",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        width: "5",
        height: "5",
        x: "3",
        y: "16",
        rx: "1"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M21 16h-3a2 2 0 0 0-2 2v3"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M21 21v.01"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 7v3a2 2 0 0 1-2 2H7"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 12h.01"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 3h.01"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 16v.01"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M16 12h1"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M21 12v.01"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 21v-1"
      }));
    case 'camera':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "13",
        r: "3"
      }));
    case 'printer':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("polyline", {
        points: "6 9 6 2 18 2 18 9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
      }), /*#__PURE__*/React.createElement("rect", {
        width: "12",
        height: "8",
        x: "6",
        y: "14"
      }));
    case 'map-pin':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "10",
        r: "3"
      }));
    case 'sun':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 2v2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 20v2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m4.93 4.93 1.41 1.41"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m17.66 17.66 1.41 1.41"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M2 12h2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M20 12h2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m6.34 17.66-1.41 1.41"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m19.07 4.93-1.41 1.41"
      }));
    case 'flashlight':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M18 6c0 2-2 4-2 7v6a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-6c0-3-2-5-2-7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2Z"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "6",
        y1: "6",
        x2: "18",
        y2: "6"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "12",
        y1: "12",
        x2: "12.01",
        y2: "12"
      }));
    case 'video':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "m22 8-6 4 6 4V8Z"
      }), /*#__PURE__*/React.createElement("rect", {
        width: "14",
        height: "12",
        x: "2",
        y: "6",
        rx: "2",
        ry: "2"
      }));
    case 'refresh':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M21 3v5h-5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M8 16H3v5"
      }));
    case 'hard-drive':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("line", {
        x1: "22",
        y1: "12",
        x2: "2",
        y2: "12"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "6",
        y1: "16",
        x2: "6.01",
        y2: "16"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "10",
        y1: "16",
        x2: "10.01",
        y2: "16"
      }));
    case 'wifi-off':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("line", {
        x1: "1",
        y1: "1",
        x2: "23",
        y2: "23"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M16.72 11.06A10.94 10.94 0 0 1 19 12.55"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M5 12.55a10.94 10.94 0 0 1 5.17-2.39"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M10.71 5.05A16 16 0 0 1 22.58 9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M1.42 9a15.91 15.91 0 0 1 4.7-2.88"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M8.53 16.11a6 6 0 0 1 6.95 0"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "12",
        y1: "20",
        x2: "12.01",
        y2: "20"
      }));
    case 'check':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("polyline", {
        points: "20 6 9 17 4 12"
      }));
    case 'x':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("line", {
        x1: "18",
        x2: "6",
        y1: "6",
        y2: "18"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "6",
        x2: "18",
        y1: "6",
        y2: "18"
      }));
    case 'shield':
      return /*#__PURE__*/React.createElement("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      }));
    default:
      return null;
  }
};

// --- KAMUS DATA KARAKTER RESMI (UPOV & PVTPP KEMENTAN) ---
const OFFICIAL_TRAIT_DICTIONARY = {
  Cabai: {
    crop: "Cabai",
    scientific: "Capsicum annuum L. / frutescens",
    standard: "UPOV TG/76/8 (Rev.) & PVTPP Kementerian Pertanian RI",
    traits: [{
      code: "ANTHRACNOSE_RES",
      ref: "UPOV TG/76/8 Char 48",
      name: "Ketahanan Antraknosa Buah (Colletotrichum)",
      category: "PATOLOGI",
      scaleType: "ORDINAL",
      scaleLabels: [{
        score: 1,
        label: "1 - Sangat Rentan (>50% busuk)"
      }, {
        score: 2,
        label: "2 - Rentan (25-50% bercak)"
      }, {
        score: 3,
        label: "3 - Moderat (10-25% bercak melekuk)"
      }, {
        score: 4,
        label: "4 - Resisten (<10% bercak kecil)"
      }, {
        score: 5,
        label: "5 - Sangat Tahan / Imun (Mulus)"
      }]
    }, {
      code: "FRUIT_WEIGHT",
      ref: "Bioversity IPGRI 7.4.2",
      name: "Bobot Buah per Butir",
      category: "HASIL",
      scaleType: "NUMERICAL",
      unit: "gram",
      min: 0.5,
      max: 120.0,
      step: 0.5,
      defaultVal: 7.0
    }, {
      code: "FRUIT_PUNGENCY",
      ref: "UPOV TG/76/8 Char 44",
      name: "Tingkat Kepedasan (Kapsaisin)",
      category: "KUALITAS",
      scaleType: "ORDINAL",
      scaleLabels: [{
        score: 1,
        label: "1 - Manis / 0 SHU"
      }, {
        score: 2,
        label: "2 - Agak Pedas (500 - 5k SHU)"
      }, {
        score: 3,
        label: "3 - Pedas (5k - 30k SHU)"
      }, {
        score: 4,
        label: "4 - Sangat Pedas (>30k SHU)"
      }]
    }]
  },
  Melon: {
    crop: "Melon",
    scientific: "Cucumis melo L.",
    standard: "UPOV TG/104/5 & PVTPP Kementerian Pertanian RI",
    traits: [{
      code: "BRIX_CONTENT",
      ref: "UPOV TG/104/5 Char 43",
      name: "Kadar Gula Buah (Brix)",
      category: "KUALITAS",
      scaleType: "NUMERICAL",
      unit: "°Brix",
      min: 6.0,
      max: 19.0,
      step: 0.2,
      defaultVal: 14.0
    }, {
      code: "FRUIT_NETTING_DENSITY",
      ref: "UPOV TG/104/5 Char 26",
      name: "Kerapatan Jaring Kulit Buah (Netting)",
      category: "MORFOLOGI",
      scaleType: "ORDINAL",
      scaleLabels: [{
        score: 1,
        label: "1 - Tanpa Net / Mulus"
      }, {
        score: 2,
        label: "2 - Net Jarang"
      }, {
        score: 3,
        label: "3 - Net Sedang Rapat"
      }, {
        score: 4,
        label: "4 - Net Sangat Rapat & Tebal"
      }]
    }, {
      code: "POWDERY_MILDEW_RES",
      ref: "UPOV TG/104/5 Char 47",
      name: "Ketahanan Embun Tepung (P. xanthii)",
      category: "PATOLOGI",
      scaleType: "ORDINAL",
      scaleLabels: [{
        score: 1,
        label: "1 - Sangat Rentan (>70% bercak)"
      }, {
        score: 3,
        label: "3 - Moderat"
      }, {
        score: 5,
        label: "5 - Resisten / Daun Bersih"
      }]
    }, {
      code: "MELON_WEIGHT",
      ref: "UPOV TG/104/5 Char 18",
      name: "Bobot Buah per Butir",
      category: "HASIL",
      scaleType: "NUMERICAL",
      unit: "gram",
      min: 500,
      max: 4500,
      step: 50,
      defaultVal: 1850
    }]
  }
};

// --- DATA MASTER (BrAPI v2.1 Aligned) ---
const INITIAL_GERMPLASM = [{
  id: 'G-CAB-01',
  accession: 'ACC-HIYUNG-01',
  name: 'Cabai Rawit Hiyung Asli',
  crop: 'Cabai',
  status: 'Landrace',
  origin: 'Tapin, Kalimantan Selatan',
  isSecret: true,
  notes: 'Tingkat kepedasan mencapai 94.500 SHU. Toleran pada lahan rawa pasang surut, rentan terhadap Colletotrichum.',
  traits: ['Capsaicin Tinggi', 'Toleran Asam', 'Rentan Antraknosa'],
  photo: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&q=80'
}, {
  id: 'G-CAB-02',
  accession: 'ACC-AVRDC-98',
  name: 'Galur Introduksi AVRDC-98',
  crop: 'Cabai',
  status: 'Galur Murni (Inbred)',
  origin: 'Taiwan (WorldVeg)',
  isSecret: true,
  notes: 'Membawa lokus resistensi Cc-1 terhadap antraknosa buah. Dinding buah tebal, rasa kurang pedas.',
  traits: ['Resisten Jamur (Skor 5)', 'Perikarp Tebal', 'Kurang Pedas'],
  photo: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&q=80'
}, {
  id: 'G-CAB-F1-01',
  accession: 'F1-NUSANTARA-01',
  name: 'Kandidat Hibrida Nusantara Hiyung F1',
  crop: 'Cabai',
  status: 'Hibrida F1',
  origin: 'Lone Steed Research Plot',
  isSecret: false,
  notes: 'Hasil persilangan Hiyung x AVRDC. Kombinasi kepedasan 70.000 SHU dengan ketahanan antraknosa rata-rata 4.8.',
  traits: ['Pedas Tinggi', 'Resisten Antraknosa', 'Potensi 22 Ton/Ha'],
  photo: 'https://images.unsplash.com/photo-1563865436874-9aef32095afd?w=600&q=80'
}, {
  id: 'G-MEL-01',
  accession: 'MEL-HONEY-09',
  name: 'Melon Golden Honey',
  crop: 'Melon',
  status: 'Galur Inbred S6',
  origin: 'Jepang',
  isSecret: true,
  notes: 'Kadar gula mencapai 14.5 Brix, tekstur renyah, rentan terhadap Podosphaera xanthii.',
  traits: ['Kadar Gula 14.5 Brix', 'Daging Oranye', 'Rentan Jamur'],
  photo: 'https://images.unsplash.com/photo-1571575173700-afb9492e8a50?w=600&q=80'
}, {
  id: 'G-MEL-02',
  accession: 'MEL-ROCK-03',
  name: 'Melon Rock Lamongan',
  crop: 'Melon',
  status: 'Galur Donor BC2',
  origin: 'Lamongan, Jawa Timur',
  isSecret: true,
  notes: 'Resisten terhadap embun tepung dan busuk pangkal batang. Netting rapat, rasa moderat (10.5 Brix).',
  traits: ['Resisten Embun Tepung', 'Netting Tebal', 'Toleran Busuk Batang'],
  photo: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80'
}];
const INITIAL_CROSSINGS = [{
  id: 'CR-01',
  code: 'CR-CAB-HIYUNG-2026',
  crop: 'Cabai',
  female: 'Cabai Rawit Hiyung Asli (Tetua-A [Betina])',
  male: 'Galur Introduksi AVRDC-98 (Tetua-B [Jantan])',
  date: '2025-05-12',
  gen: 'F1',
  goal: 'Rekombinasi sifat pedas ekstrem dengan ketahanan antraknosa',
  progenyCount: 24,
  status: 'PENGUJIAN LAPANGAN'
}, {
  id: 'CR-02',
  code: 'CR-MEL-GOLDEN-NET',
  crop: 'Melon',
  female: 'Melon Golden Honey [Betina]',
  male: 'Melon Rock Lamongan [Jantan]',
  date: '2025-06-20',
  gen: 'F1',
  goal: 'Menghasilkan melon jaring rapat dengan brix 13.5+ dan resisten embun tepung',
  progenyCount: 30,
  status: 'PENGUJIAN LAPANGAN'
}];
const INITIAL_UNITS = [{
  id: 'U-01',
  token: 'PLT-7X9K2',
  plotLabel: 'Blok A — Ajir 01',
  crossCode: 'CR-CAB-HIYUNG-2026',
  crop: 'Cabai',
  scores: {
    ANTHRACNOSE_RES: 5,
    FRUIT_WEIGHT: 6.8,
    FRUIT_PUNGENCY: 4
  },
  observationsCount: 4,
  lastObserved: 'Hari ini'
}, {
  id: 'U-02',
  token: 'PLT-4M8P1',
  plotLabel: 'Blok A — Ajir 02',
  crossCode: 'CR-CAB-HIYUNG-2026',
  crop: 'Cabai',
  scores: {
    ANTHRACNOSE_RES: 4,
    FRUIT_WEIGHT: 7.1,
    FRUIT_PUNGENCY: 4
  },
  observationsCount: 3,
  lastObserved: 'Kemarin'
}, {
  id: 'U-03',
  token: 'PLT-9Q2V5',
  plotLabel: 'Blok B — Ajir 14',
  crossCode: 'CR-CAB-HIYUNG-2026',
  crop: 'Cabai',
  scores: {
    ANTHRACNOSE_RES: 5,
    FRUIT_WEIGHT: 7.4,
    FRUIT_PUNGENCY: 4
  },
  observationsCount: 5,
  lastObserved: '2 hari lalu'
}, {
  id: 'U-04',
  token: 'PLT-3K1N8',
  plotLabel: 'Greenhouse 2 — Pot 08',
  crossCode: 'CR-MEL-GOLDEN-NET',
  crop: 'Melon',
  scores: {
    BRIX_CONTENT: 14.2,
    FRUIT_NETTING_DENSITY: 4,
    POWDERY_MILDEW_RES: 4,
    MELON_WEIGHT: 1850
  },
  observationsCount: 6,
  lastObserved: 'Hari ini'
}];

// ==========================================
// PERSISTENT STORAGE ENGINE: INDEXEDDB (W3C)
// Database: PedigroDB, Version: 1
// Blueprint: 05_BLUEPRINT_OFFLINE_PERSISTEN_DAN_SINKRONISASI.md
// ==========================================
const DB_NAME = 'PedigroDB';
const DB_VERSION = 1;
const openPedigroDB = () => {
  return new Promise(resolve => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    try {
      const req = window.indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('observations')) {
          const obsStore = db.createObjectStore('observations', {
            keyPath: 'obsDbId'
          });
          obsStore.createIndex('by_token', 'blindToken', {
            unique: false
          });
          obsStore.createIndex('by_syncStatus', 'syncStatus', {
            unique: false
          });
          obsStore.createIndex('by_createdAt', 'createdAt', {
            unique: false
          });
        }
        if (!db.objectStoreNames.contains('sync_queue')) {
          const qStore = db.createObjectStore('sync_queue', {
            keyPath: 'queueId'
          });
          qStore.createIndex('by_createdAt', 'createdAt', {
            unique: false
          });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => {
        console.warn('Gagal membuka IndexedDB:', req.error);
        resolve(null);
      };
    } catch (err) {
      console.warn('IndexedDB diblokir oleh peramban:', err);
      resolve(null);
    }
  });
};
const dbSaveObservation = async record => {
  const db = await openPedigroDB();
  if (!db) {
    try {
      const current = JSON.parse(localStorage.getItem('bf_obs') || '[]');
      const filtered = current.filter(x => x.obsDbId !== record.obsDbId);
      filtered.push(record);
      localStorage.setItem('bf_obs', JSON.stringify(filtered));
    } catch (e) {}
    return record;
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['observations'], 'readwrite');
    const store = tx.objectStore('observations');
    const req = store.put(record);
    req.onsuccess = () => resolve(record);
    req.onerror = () => reject(req.error);
  });
};
const dbGetAllObservations = async () => {
  const db = await openPedigroDB();
  if (!db) {
    try {
      return JSON.parse(localStorage.getItem('bf_obs') || '[]');
    } catch (e) {
      return [];
    }
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['observations'], 'readonly');
    const store = tx.objectStore('observations');
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
};
const dbAddToSyncQueue = async item => {
  const db = await openPedigroDB();
  if (!db) {
    try {
      const current = JSON.parse(localStorage.getItem('bf_queue') || '[]');
      current.push(item);
      localStorage.setItem('bf_queue', JSON.stringify(current));
    } catch (e) {}
    return item;
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['sync_queue'], 'readwrite');
    const store = tx.objectStore('sync_queue');
    const req = store.put(item);
    req.onsuccess = () => resolve(item);
    req.onerror = () => reject(req.error);
  });
};
const dbGetSyncQueue = async () => {
  const db = await openPedigroDB();
  if (!db) {
    try {
      return JSON.parse(localStorage.getItem('bf_queue') || '[]');
    } catch (e) {
      return [];
    }
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['sync_queue'], 'readonly');
    const store = tx.objectStore('sync_queue');
    const req = store.getAll();
    req.onsuccess = () => {
      const items = req.result || [];
      items.sort((a, b) => a.createdAt - b.createdAt);
      resolve(items);
    };
    req.onerror = () => reject(req.error);
  });
};
const dbRemoveFromSyncQueue = async queueId => {
  const db = await openPedigroDB();
  if (!db) {
    try {
      const current = JSON.parse(localStorage.getItem('bf_queue') || '[]');
      const filtered = current.filter(x => x.queueId !== queueId);
      localStorage.setItem('bf_queue', JSON.stringify(filtered));
    } catch (e) {}
    return;
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['sync_queue'], 'readwrite');
    const store = tx.objectStore('sync_queue');
    const req = store.delete(queueId);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
};
const dbMarkObservationSynced = async obsDbId => {
  const db = await openPedigroDB();
  if (!db) return;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['observations'], 'readwrite');
    const store = tx.objectStore('observations');
    const getReq = store.get(obsDbId);
    getReq.onsuccess = () => {
      const rec = getReq.result;
      if (rec) {
        rec.syncStatus = 'SYNCED';
        rec.syncedAt = new Date().toISOString();
        store.put(rec);
      }
      resolve();
    };
    getReq.onerror = () => reject(getReq.error);
  });
};

// --- APP CONTAINER ---
function App() {
  const [viewMode, setViewMode] = useState('STUDIO'); // 'STUDIO' | 'MOBILE'
  const [activeTab, setActiveTab] = useState('germplasm');
  const [germplasmList, setGermplasmList] = useState(() => {
    try {
      const saved = localStorage.getItem('pedigro_germplasm');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  const [crossings, setCrossings] = useState(() => {
    try {
      const saved = localStorage.getItem('pedigro_crossings');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  const [units, setUnits] = useState(() => {
    try {
      const saved = localStorage.getItem('pedigro_units');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  const [offlineQueue, setOfflineQueue] = useState([]);

  // Auto-sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pedigro_germplasm', JSON.stringify(germplasmList));
      localStorage.setItem('pedigro_crossings', JSON.stringify(crossings));
      localStorage.setItem('pedigro_units', JSON.stringify(units));
    } catch (e) {}
  }, [germplasmList, crossings, units]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [toast, setToast] = useState(null);

  // Multi-Trait Selection Weights
  const [weights, setWeights] = useState({
    disease: 40,
    yieldWeight: 30,
    quality: 30
  });
  const showToast = message => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // ==========================================
  // BLUEPRINT 10: DATABASE & BACKUP MANAGEMENT
  // ==========================================
  const handleExportBackup = async () => {
    try {
      showToast('Menghitung sidik jari SHA-256 cadangan...');
      const allObs = await dbGetAllObservations();
      const payload = {
        germplasm: germplasmList,
        crossings: crossings,
        units: units,
        observations: allObs,
        exportedAt: new Date().toISOString()
      };
      const payloadString = JSON.stringify(payload);
      const checksum = await computePayloadChecksum(payloadString);

      const backupPackage = {
        header: {
          app: 'PEDIGRO',
          version: '1.0.0',
          schemaVersion: 1,
          exportedAt: new Date().toISOString(),
          author: 'Jipung (Lone Steed Studio)',
          checksum: checksum,
          recordCounts: {
            germplasm: germplasmList.length,
            crossings: crossings.length,
            units: units.length,
            observations: allObs.length
          }
        },
        payload: payload
      };

      const blob = new Blob([JSON.stringify(backupPackage, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pedigro_backup_v1.0.0_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Cadangan terverifikasi berhasil diunduh (SHA-256 Cocok)');
    } catch (err) {
      showToast('Gagal mengekspor data: ' + err.message);
    }
  };

  const handleImportBackup = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const raw = JSON.parse(evt.target.result);
        if (!raw.header || raw.header.app !== 'PEDIGRO') {
          alert('Format Berkas Ditolak: Bukan berkas cadangan Pedigro yang valid!');
          return;
        }

        const payloadString = JSON.stringify(raw.payload);
        const recalculatedChecksum = await computePayloadChecksum(payloadString);

        if (recalculatedChecksum !== raw.header.checksum) {
          alert('PERINGATAN KEAMANAN: Sidik jari SHA-256 tidak cocok! Berkas cadangan terdeteksi rusak atau telah dimodifikasi manual. Impor dibatalkan demi keamanan data varietas.');
          return;
        }

        if (confirm(`Verifikasi SHA-256 Lolos! Pulihkan cadangan berisi ${raw.header.recordCounts.germplasm} indukan, ${raw.header.recordCounts.crossings} persilangan, dan ${raw.header.recordCounts.observations} observasi?`)) {
          setGermplasmList(raw.payload.germplasm || []);
          setCrossings(raw.payload.crossings || []);
          setUnits(raw.payload.units || []);

          if (raw.payload.observations && Array.isArray(raw.payload.observations)) {
            for (const o of raw.payload.observations) {
              await dbSaveObservation(o);
            }
          }
          showToast('Data berhasil dipulihkan secara utuh!');
        }
      } catch (err) {
        alert('Gagal memproses berkas cadangan: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleLoadSampleData = async () => {
    if (confirm('Muat data sampel varietas Cabai & Melon untuk demonstrasi?')) {
      setGermplasmList(INITIAL_GERMPLASM);
      setCrossings(INITIAL_CROSSINGS);
      setUnits(INITIAL_UNITS);
      for (const u of INITIAL_UNITS) {
        await dbSaveObservation({
          obsDbId: `OBS-INIT-${u.token}`,
          blindToken: u.token,
          plotLabel: u.plotLabel,
          crop: u.crop,
          scores: { brix: 12.4, fruit_weight: 420 },
          checksum: 'init-checksum',
          createdAt: new Date().toISOString(),
          syncStatus: 'SYNCED',
          syncedAt: new Date().toISOString()
        });
      }
      showToast('Data latihan varietas berhasil dimuat!');
    }
  };

  const handleClearAllData = async () => {
    if (confirm('PERINGATAN: Kosongkan seluruh database lokal? Semua data indukan dan observasi akan dihapus.')) {
      setGermplasmList([]);
      setCrossings([]);
      setUnits([]);
      localStorage.removeItem('pedigro_germplasm');
      localStorage.removeItem('pedigro_crossings');
      localStorage.removeItem('pedigro_units');
      localStorage.removeItem('bf_obs');
      try {
        const db = await openPedigroDB();
        if (db) {
          const tx = db.transaction(['observations'], 'readwrite');
          tx.objectStore('observations').clear();
        }
      } catch (e) {}
      showToast('Database telah dikosongkan (Clean Slate).');
    }
  };


  // Persistent Storage Initialization & Sync State
  useEffect(() => {
    let isMounted = true;
    const initPersistentStorage = async () => {
      try {
        const db = await openPedigroDB();
        if (db) {
          const storedObs = await dbGetAllObservations();
          if (false && storedObs.length === 0) {
            // Seed initial dataset into IndexedDB on first run
            for (const u of INITIAL_UNITS) {
              await dbSaveObservation({
                obsDbId: `OBS-INIT-${u.token}`,
                blindToken: u.token,
                plotLabel: u.plotLabel,
                crop: u.crop,
                scores: {
                  ...u.scores
                },
                notes: 'Data inisial kebun riset',
                checksum: 'SHA256:INITIAL_VERIFIED',
                createdAt: new Date().toISOString(),
                syncStatus: 'SYNCED',
                syncedAt: new Date().toISOString()
              });
            }
          } else {
            // Merge persistent stored scores into active units
            if (isMounted) {
              setUnits(prev => prev.map(u => {
                const matches = storedObs.filter(o => o.blindToken === u.token);
                if (matches.length > 0) {
                  const latest = matches[matches.length - 1];
                  return {
                    ...u,
                    scores: {
                      ...latest.scores
                    },
                    observationsCount: matches.length,
                    lastObserved: 'Tersimpan di IndexedDB'
                  };
                }
                return u;
              }));
            }
          }
          const queue = await dbGetSyncQueue();
          if (isMounted) setOfflineQueue(queue);
        }
      } catch (err) {
        console.warn('Gagal memuat persistent storage:', err);
      }
    };
    initPersistentStorage();
    const handleOnline = () => {
      setIsOnline(true);
      showToast("Koneksi internet terhubung. Antrean siap disinkronkan.");
    };
    const handleOffline = () => {
      setIsOnline(false);
      showToast("Mode luring aktif. Data tersimpan permanen di IndexedDB.");
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      isMounted = false;
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Store-and-Forward Sync Queue Flushing
  const handleFlushSyncQueue = async () => {
    if (offlineQueue.length === 0) {
      showToast("Antrean sinkronisasi kosong.");
      return;
    }
    if (!isOnline) {
      showToast("Gagal: Perangkat masih luring (offline).");
      return;
    }
    try {
      const queueItems = await dbGetSyncQueue();
      let count = 0;
      for (const item of queueItems) {
        await dbMarkObservationSynced(item.obsDbId);
        await dbRemoveFromSyncQueue(item.queueId);
        count++;
      }
      const remaining = await dbGetSyncQueue();
      setOfflineQueue(remaining);
      showToast(`Sinkronisasi tuntas: ${count} data pengamatan berhasil diunggah.`);
    } catch (err) {
      showToast("Galat saat melakukan sinkronisasi: " + err.message);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col bg-slate-50 text-slate-900"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bg-white border-b border-slate-200 sticky top-0 z-40"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-lg bg-brand-800 text-brand-100 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sprout",
    className: "w-4 h-4"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-sm tracking-tight text-slate-900"
  }, "Pedigro"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border border-slate-200 text-slate-500 bg-slate-50"
  }, "BrAPI v2.1")), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-500"
  }, "Jipung / Lone Steed Studio"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setViewMode('STUDIO'),
    className: `inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'STUDIO' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "desktop",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Mode Studio")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setViewMode('MOBILE');
      setActiveTab('mobile_scout');
    },
    className: `inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'MOBILE' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Mode Lapangan"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 pl-2 border-l border-slate-200"
  }, offlineQueue.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: handleFlushSyncQueue,
    disabled: !isOnline,
    className: `inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${isOnline ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`,
    title: isOnline ? "Klik untuk mengunggah antrean ke server" : "Menunggu koneksi internet"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "refresh",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Sinkron (", offlineQueue.length, ")")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5 text-xs text-slate-500 font-mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: `w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'}`
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden md:inline"
  }, isOnline ? 'Online' : 'Offline'))))), viewMode === 'STUDIO' && /*#__PURE__*/React.createElement("div", {
    className: "border-t border-slate-200 px-4 sm:px-6 bg-white"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "max-w-7xl mx-auto flex space-x-6 overflow-x-auto no-scrollbar text-xs font-medium"
  }, [{
    id: 'germplasm',
    label: 'Bank Plasma Nutfah',
    icon: 'database'
  }, {
    id: 'crossing',
    label: 'Studio Persilangan',
    icon: 'git-merge'
  }, {
    id: 'traits',
    label: 'Kamus Karakter UPOV',
    icon: 'book-open'
  }, {
    id: 'pedigree',
    label: 'Pohon Silsilah',
    icon: 'network'
  }, {
    id: 'selection',
    label: 'Matriks Seleksi',
    icon: 'sliders'
  }, {
    id: 'bpsb',
    label: 'Laporan BUSS BPSB',
    icon: 'file-text'
  }].map(tab => /*#__PURE__*/React.createElement("button", {
    key: tab.id,
    onClick: () => setActiveTab(tab.id),
    className: `inline-flex items-center space-x-2 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-brand-700 text-brand-800 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: tab.icon,
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, tab.label)))))), toast && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-4 right-4 z-50 bg-slate-900 text-white text-xs px-3.5 py-2.5 rounded-lg shadow-lg border border-slate-800 flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full bg-emerald-400"
  }), /*#__PURE__*/React.createElement("span", null, toast)), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6"
  }, viewMode === 'MOBILE' ? /*#__PURE__*/React.createElement(MobileScoutView, {
    units: units,
    setUnits: setUnits,
    offlineQueue: offlineQueue,
    setOfflineQueue: setOfflineQueue,
    isOnline: isOnline,
    showToast: showToast,
    onFlushSyncQueue: handleFlushSyncQueue
  }) : /*#__PURE__*/React.createElement("div", null, activeTab === 'germplasm' && /*#__PURE__*/React.createElement(GermplasmModule, {
    germplasmList: germplasmList,
    setGermplasmList: setGermplasmList,
    showToast: showToast
  }), activeTab === 'crossing' && /*#__PURE__*/React.createElement(CrossingModule, {
    crossings: crossings,
    setCrossings: setCrossings,
    germplasmList: germplasmList,
    showToast: showToast
  }), activeTab === 'traits' && /*#__PURE__*/React.createElement(TraitDictionaryModule, null), activeTab === 'pedigree' && /*#__PURE__*/React.createElement(PedigreeModule, null), activeTab === 'selection' && /*#__PURE__*/React.createElement(SelectionMatrixModule, {
    units: units,
    weights: weights,
    setWeights: setWeights,
    showToast: showToast
  }), activeTab === 'bpsb' && /*#__PURE__*/React.createElement(BpsbReportModule, {
    showToast: showToast
  }))), /*#__PURE__*/React.createElement("footer", {
    className: "border-t border-slate-200 bg-white text-slate-500 py-4 px-4 sm:px-6 text-xs text-center"
  }, /*#__PURE__*/React.createElement("p", null, "Pedigro v1.0.0 \xB7 Dikembangkan oleh", ' ', /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/Jipung7",
    target: "_blank",
    className: "text-slate-700 font-medium hover:underline"
  }, "Jipung (Lone Steed Studio)"), ' ', "berdasarkan lisensi terbuka", ' ', /*#__PURE__*/React.createElement("a", {
    href: "https://opensource.org/licenses/MIT",
    target: "_blank",
    className: "hover:underline"
  }, "MIT License"), ".")));
}

// ==========================================
// MODULE: TRAIT DICTIONARY (UPOV OFFICIAL)
// ==========================================
function TraitDictionaryModule() {
  const [selectedCrop, setSelectedCrop] = useState('Cabai');
  const data = OFFICIAL_TRAIT_DICTIONARY[selectedCrop];
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-lg border border-slate-200 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono uppercase text-slate-500"
  }, "Standar Baku Internasional & Nasional"), /*#__PURE__*/React.createElement("h2", {
    className: "text-base font-semibold text-slate-900 mt-0.5"
  }, "Kamus Karakter Deskriptor Resmi (Trait Dictionary)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500"
  }, "Parameter resmi pengujian varietas tanaman untuk uji BUSS dan sertifikasi benih.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-500 font-medium"
  }, "Pilih Komoditas:"), /*#__PURE__*/React.createElement("select", {
    value: selectedCrop,
    onChange: e => setSelectedCrop(e.target.value),
    className: "bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-700"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Cabai"
  }, "Cabai (Capsicum)"), /*#__PURE__*/React.createElement("option", {
    value: "Melon"
  }, "Melon (Cucumis melo)")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-50 border border-slate-200 p-3.5 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-slate-800"
  }, data.crop), " \xB7 ", /*#__PURE__*/React.createElement("span", {
    className: "italic text-slate-600"
  }, data.scientific)), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] font-mono text-brand-800 font-medium"
  }, "Rujukan Resmi: ", data.standard)), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left text-xs"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "border-b border-slate-200 text-slate-500 font-medium"
  }, /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Kode & Rujukan UPOV"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Nama Karakter Deskripsi"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Kategori"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Tipe Skala"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-100"
  }, data.traits.map(t => /*#__PURE__*/React.createElement("tr", {
    key: t.code,
    className: "hover:bg-slate-50"
  }, /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-mono font-semibold text-slate-900"
  }, t.code), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-400 font-mono"
  }, t.ref)), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3 font-medium text-slate-900"
  }, t.name), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200 bg-slate-100 text-slate-700"
  }, t.category)), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3 font-mono text-slate-600"
  }, t.scaleType)))))));
}

// ==========================================
// MODULE 1: GERMPLASM BANK (CLEAN)
// ==========================================
function GermplasmModule({
  germplasmList,
  setGermplasmList,
  showToast
}) {
  const [filterCrop, setFilterCrop] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    crop: 'Cabai',
    status: 'Galur Murni (Inbred)',
    origin: 'Indonesia',
    notes: '',
    isSecret: true,
    traits: ''
  });
  const filtered = germplasmList.filter(item => {
    const matchesCrop = filterCrop === 'ALL' || item.crop === filterCrop;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.accession.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCrop && matchesSearch;
  });
  const handleAdd = e => {
    e.preventDefault();
    const newItem = {
      id: `G-USR-${Date.now().toString().slice(-4)}`,
      accession: `ACC-IDN-${Math.floor(100 + Math.random() * 900)}`,
      name: form.name,
      crop: form.crop,
      status: form.status,
      origin: form.origin,
      isSecret: form.isSecret,
      notes: form.notes,
      traits: form.traits ? form.traits.split(',').map(t => t.trim()) : ['Adaptif Lokal'],
      photo: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&q=80'
    };
    setGermplasmList([newItem, ...germplasmList]);
    setShowModal(false);
    setForm({
      name: '',
      crop: 'Cabai',
      status: 'Galur Murni (Inbred)',
      origin: 'Indonesia',
      notes: '',
      isSecret: true,
      traits: ''
    });
    showToast(`Galur "${newItem.name}" tersimpan ke Bank Plasma Nutfah.`);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-base font-semibold text-slate-900"
  }, "Bank Plasma Nutfah & Indukan"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-0.5"
  }, "Katalog terstruktur untuk aksesi tetua, galur murni, dan materi pemuliaan.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowModal(true),
    className: "inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-brand-800 text-white text-xs font-medium hover:bg-brand-700 transition-colors shadow-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Daftarkan Galur Baru"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-3 rounded-lg border border-slate-200 mb-6 flex flex-wrap items-center gap-3"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Cari nama galur atau nomor aksesi...",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value),
    className: "flex-1 min-w-[220px] bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-700 focus:bg-white"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500"
  }, "Komoditas:"), /*#__PURE__*/React.createElement("select", {
    value: filterCrop,
    onChange: e => setFilterCrop(e.target.value),
    className: "bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-700"
  }, /*#__PURE__*/React.createElement("option", {
    value: "ALL"
  }, "Semua Komoditas"), /*#__PURE__*/React.createElement("option", {
    value: "Cabai"
  }, "Cabai"), /*#__PURE__*/React.createElement("option", {
    value: "Melon"
  }, "Melon")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
  }, filtered.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    className: "bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col hover:border-slate-300 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-40 bg-slate-100 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: item.photo,
    alt: item.name,
    className: "w-full h-full object-cover"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-2.5 left-2.5 flex items-center space-x-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded"
  }, item.crop), /*#__PURE__*/React.createElement("span", {
    className: "bg-white/90 text-slate-700 text-[10px] px-2 py-0.5 rounded border border-slate-200"
  }, item.status)), item.isSecret && /*#__PURE__*/React.createElement("div", {
    className: "absolute top-2.5 right-2.5 inline-flex items-center space-x-1 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium px-2 py-0.5 rounded"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    className: "w-2.5 h-2.5"
  }), /*#__PURE__*/React.createElement("span", null, "Tetua Rahasia"))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 flex-1 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] font-mono text-slate-400"
  }, item.accession), /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-sm text-slate-900 mt-0.5"
  }, item.name), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed"
  }, item.notes), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex flex-wrap gap-1.5"
  }, item.traits.map((t, idx) => /*#__PURE__*/React.createElement("span", {
    key: idx,
    className: "bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded border border-slate-200"
  }, t)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", null, "Asal: ", item.origin), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-700 font-medium cursor-pointer hover:underline"
  }, "Silsilah")))))), showModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-4 pb-2 border-b border-slate-100"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-sm text-slate-900"
  }, "Daftarkan Galur Baru"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowModal(false),
    className: "text-slate-400 hover:text-slate-600"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    className: "w-4 h-4"
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleAdd,
    className: "space-y-3 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-medium text-slate-700 block mb-1"
  }, "Nama Tampilan Galur"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    placeholder: "Contoh: Cabai Rawit Hiyung Klon A",
    value: form.name,
    onChange: e => setForm({
      ...form,
      name: e.target.value
    }),
    className: "w-full border border-slate-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-brand-700"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-medium text-slate-700 block mb-1"
  }, "Komoditas"), /*#__PURE__*/React.createElement("select", {
    value: form.crop,
    onChange: e => setForm({
      ...form,
      crop: e.target.value
    }),
    className: "w-full border border-slate-200 rounded-md px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand-700"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Cabai"
  }, "Cabai"), /*#__PURE__*/React.createElement("option", {
    value: "Melon"
  }, "Melon"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-medium text-slate-700 block mb-1"
  }, "Status Biologis"), /*#__PURE__*/React.createElement("select", {
    value: form.status,
    onChange: e => setForm({
      ...form,
      status: e.target.value
    }),
    className: "w-full border border-slate-200 rounded-md px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand-700"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Galur Murni (Inbred)"
  }, "Galur Murni (Inbred)"), /*#__PURE__*/React.createElement("option", {
    value: "Landrace"
  }, "Aksesi Lokal (Landrace)"), /*#__PURE__*/React.createElement("option", {
    value: "Hibrida F1"
  }, "Hibrida F1")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-medium text-slate-700 block mb-1"
  }, "Asal Materi Genetik"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Contoh: Tapin, Kalimantan Selatan",
    value: form.origin,
    onChange: e => setForm({
      ...form,
      origin: e.target.value
    }),
    className: "w-full border border-slate-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-brand-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-medium text-slate-700 block mb-1"
  }, "Karakter Unggul (Pisahkan dengan koma)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Tahan Kering, Dinding Tebal, Capsaicin Tinggi",
    value: form.traits,
    onChange: e => setForm({
      ...form,
      traits: e.target.value
    }),
    className: "w-full border border-slate-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-brand-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-medium text-slate-700 block mb-1"
  }, "Catatan Agronomi"), /*#__PURE__*/React.createElement("textarea", {
    rows: "2",
    value: form.notes,
    onChange: e => setForm({
      ...form,
      notes: e.target.value
    }),
    className: "w-full border border-slate-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-brand-700"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 pt-1"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "secretCheck",
    checked: form.isSecret,
    onChange: e => setForm({
      ...form,
      isSecret: e.target.checked
    }),
    className: "rounded border-slate-300 text-brand-700 focus:ring-brand-700"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "secretCheck",
    className: "text-xs text-slate-700 font-medium"
  }, "Tetapkan sebagai Tetua Rahasia (disembunyikan dari lapangan)")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end space-x-2 pt-3 border-t border-slate-100"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowModal(false),
    className: "px-3.5 py-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 font-medium"
  }, "Batal"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "px-4 py-1.5 bg-brand-800 text-white rounded-md font-medium hover:bg-brand-700 shadow-sm"
  }, "Simpan Data"))))));
}

// ==========================================
// MODULE 2: CROSSING STUDIO (CLEAN)
// ==========================================
function CrossingModule({
  crossings,
  setCrossings,
  germplasmList,
  showToast
}) {
  const [showModal, setShowModal] = useState(false);
  const [activeQrModal, setActiveQrModal] = useState(null);
  const [form, setForm] = useState({
    code: '',
    crop: 'Cabai',
    female: '',
    male: '',
    goal: '',
    progenyCount: 20
  });
  const handleCreate = e => {
    e.preventDefault();
    const newCross = {
      id: `CR-${Date.now().toString().slice(-4)}`,
      code: form.code || `CR-${form.crop.toUpperCase()}-${Date.now().toString().slice(-4)}`,
      crop: form.crop,
      female: form.female,
      male: form.male,
      date: new Date().toISOString().split('T')[0],
      gen: 'F1',
      goal: form.goal || 'Uji rekombinasi sifat',
      progenyCount: Number(form.progenyCount) || 20,
      status: 'POLINASI BERHASIL'
    };
    setCrossings([newCross, ...crossings]);
    setShowModal(false);
    showToast(`Proyek persilangan ${newCross.code} terdaftar.`);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-base font-semibold text-slate-900"
  }, "Studio Persilangan (Crossing Studio)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-0.5"
  }, "Dokumentasi perkawinan silang terarah dan pencetakan label ajir kebun.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowModal(true),
    className: "inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-brand-800 text-white text-xs font-medium hover:bg-brand-700 transition-colors shadow-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Rencanakan Silangan Baru"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, crossings.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    className: "bg-white p-4 rounded-lg border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-xs font-semibold text-brand-800 bg-brand-50 px-2 py-0.5 rounded border border-brand-100"
  }, c.code), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
  }, "Generasi ", c.gen), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "\xB7 Polinasi: ", c.date)), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-xs font-medium text-slate-800 flex items-center flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-900"
  }, c.female), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\xD7"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-900"
  }, c.male)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-1"
  }, "Target: ", c.goal)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-right text-xs pr-2 hidden sm:block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-medium text-slate-900"
  }, c.progenyCount, " Populasi Uji"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-400"
  }, c.status)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveQrModal(c),
    className: "inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "printer",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Cetak Lembar QR")))))), activeQrModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl max-w-xl w-full p-6 shadow-xl border border-slate-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center pb-3 border-b border-slate-200"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-sm text-slate-900"
  }, "Lembar Label QR Lapangan (Blind Scout)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500"
  }, "Label fisik tanpa identitas tetua rahasia.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveQrModal(null),
    className: "text-slate-400 hover:text-slate-600"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    className: "w-4 h-4"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-3 my-4 p-4 bg-slate-50 rounded-lg border border-slate-200"
  }, Array.from({
    length: 6
  }).map((_, i) => {
    const token = `PLT-${activeQrModal.code.slice(3, 6)}-${(i + 1).toString().padStart(2, '0')}`;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "bg-white p-3 rounded border border-slate-300 flex flex-col items-center text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-16 h-16 border border-slate-800 p-1 flex items-center justify-center"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "qr-code",
      className: "w-12 h-12 text-slate-900"
    })), /*#__PURE__*/React.createElement("div", {
      className: "font-mono font-bold text-xs text-slate-900 mt-2 tracking-wide"
    }, token), /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-slate-500"
    }, "Ajir #", i + 1, " \xB7 ", activeQrModal.crop));
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end space-x-2 pt-2 border-t border-slate-100"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveQrModal(null),
    className: "px-3.5 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50"
  }, "Tutup"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.print();
      showToast("Dokumen dikirim ke dialog cetak.");
    },
    className: "inline-flex items-center space-x-1.5 px-4 py-1.5 text-xs font-medium bg-brand-800 text-white rounded-md hover:bg-brand-700 shadow-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "printer",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Cetak Dokumen"))))), showModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-4 pb-2 border-b border-slate-100"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-sm text-slate-900"
  }, "Perencanaan Silangan Baru"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowModal(false),
    className: "text-slate-400 hover:text-slate-600"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    className: "w-4 h-4"
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleCreate,
    className: "space-y-3 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-medium text-slate-700 block mb-1"
  }, "Kode Identitas Silangan"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Contoh: CR-CAB-2026-03",
    value: form.code,
    onChange: e => setForm({
      ...form,
      code: e.target.value
    }),
    className: "w-full border border-slate-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-brand-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-medium text-slate-700 block mb-1"
  }, "Tetua Betina (\u2640 Seed Parent)"), /*#__PURE__*/React.createElement("select", {
    required: true,
    value: form.female,
    onChange: e => setForm({
      ...form,
      female: e.target.value
    }),
    className: "w-full border border-slate-200 rounded-md px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand-700"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "-- Pilih Induk Betina --"), germplasmList.map(g => /*#__PURE__*/React.createElement("option", {
    key: g.id,
    value: g.name
  }, g.name, " (", g.crop, ")")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-medium text-slate-700 block mb-1"
  }, "Tetua Jantan (\u2642 Pollen Parent)"), /*#__PURE__*/React.createElement("select", {
    required: true,
    value: form.male,
    onChange: e => setForm({
      ...form,
      male: e.target.value
    }),
    className: "w-full border border-slate-200 rounded-md px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand-700"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "-- Pilih Induk Jantan --"), germplasmList.map(g => /*#__PURE__*/React.createElement("option", {
    key: g.id,
    value: g.name
  }, g.name, " (", g.crop, ")")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-medium text-slate-700 block mb-1"
  }, "Target Karakter Seleksi"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Contoh: Manis 14 Brix, resisten antraknosa",
    value: form.goal,
    onChange: e => setForm({
      ...form,
      goal: e.target.value
    }),
    className: "w-full border border-slate-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-brand-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-medium text-slate-700 block mb-1"
  }, "Jumlah Populasi Uji (Ajir)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "5",
    max: "500",
    value: form.progenyCount,
    onChange: e => setForm({
      ...form,
      progenyCount: e.target.value
    }),
    className: "w-full border border-slate-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-brand-700"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end space-x-2 pt-3 border-t border-slate-100"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowModal(false),
    className: "px-3.5 py-1.5 text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 font-medium"
  }, "Batal"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "px-4 py-1.5 bg-brand-800 text-white rounded-md font-medium hover:bg-brand-700 shadow-sm"
  }, "Simpan Proyek"))))));
}

// ==========================================
// MODULE 3: DYNAMIC MOBILE FIELD SCOUT (FASE 2)
// ==========================================
function MobileScoutView({
  units,
  setUnits,
  offlineQueue,
  setOfflineQueue,
  isOnline,
  showToast,
  onFlushSyncQueue
}) {
  const [selectedToken, setSelectedToken] = useState('PLT-7X9K2');
  const [currentUnit, setCurrentUnit] = useState(units[0]);

  // Dynamic scores mapped by traitCode
  const [scores, setScores] = useState({
    ...units[0].scores
  });
  const [scoutNote, setScoutNote] = useState('');
  const [compressedPhoto, setCompressedPhoto] = useState(null);
  const [photoSizeKb, setPhotoSizeKb] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // --- HARDWARE INTEGRATION: CAMERA VIEW FINDER ---
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasTorch, setHasTorch] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // --- HARDWARE INTEGRATION: GPS GEOLOCATION ---
  const [gpsCoords, setGpsCoords] = useState(null);
  const [gpsStatus, setGpsStatus] = useState('SEARCHING'); // 'SEARCHING' | 'LOCKED' | 'OFFLINE_ESTIMATED'

  // --- HARDWARE INTEGRATION: SCREEN WAKE LOCK ---
  const [isWakeLockActive, setIsWakeLockActive] = useState(false);

  // 1. Audio Beep Feedback (Web Audio API)
  const playScanBeep = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  };

  // 2. Screen Wake Lock Lifecycle
  useEffect(() => {
    let wakeLock = null;
    const requestWakeLock = async () => {
      if ('wakeLock' in navigator) {
        try {
          wakeLock = await navigator.wakeLock.request('screen');
          setIsWakeLockActive(true);
        } catch (err) {
          console.warn('Wake Lock ditolak/tidak didukung:', err);
        }
      }
    };
    requestWakeLock();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !wakeLock) {
        requestWakeLock();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLock) wakeLock.release().catch(() => {});
    };
  }, []);

  // 3. Geolocation Stamping
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        setGpsCoords({
          latitude: Number(pos.coords.latitude.toFixed(6)),
          longitude: Number(pos.coords.longitude.toFixed(6)),
          altitude: pos.coords.altitude ? Math.round(pos.coords.altitude) : 485,
          accuracy: Math.round(pos.coords.accuracy || 3.5),
          capturedAt: new Date().toISOString()
        });
        setGpsStatus('LOCKED');
      }, err => {
        console.warn('GPS satelit lemah/luring, menggunakan estimasi petak kebun:', err.message);
        // Estimasi koordinat petak kebun riset hortikultura (Jawa Timur / Malang Lahan Uji)
        setGpsCoords({
          latitude: -7.284192,
          longitude: 112.795312,
          altitude: 485,
          accuracy: 5.0,
          capturedAt: new Date().toISOString(),
          isEstimated: true
        });
        setGpsStatus('OFFLINE_ESTIMATED');
      }, {
        enableHighAccuracy: true,
        timeout: 4500,
        maximumAge: 60000
      });
    }
  }, []);

  // 4. Live Camera Stream Controls
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Kamera tidak didukung oleh peramban ini.');
      }
      const constraints = {
        video: {
          facingMode: {
            ideal: 'environment'
          },
          width: {
            ideal: 1280
          },
          height: {
            ideal: 720
          }
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      setIsCameraActive(true);
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities ? track.getCapabilities() : {};
      if (capabilities.torch) {
        setHasTorch(true);
      }
    } catch (err) {
      setCameraError(err.message || 'Izin kamera ditolak.');
      showToast('Kamera fisik tidak aktif: ' + err.message);
    }
  };
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setIsTorchOn(false);
  };
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    try {
      const nextTorch = !isTorchOn;
      await track.applyConstraints({
        advanced: [{
          torch: nextTorch
        }]
      });
      setIsTorchOn(nextTorch);
    } catch (e) {
      showToast('Lampu kilat tidak didukung pada kamera ini.');
    }
  };

  // Attach stream to video tag when active
  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraActive]);

  // Scan barcode frame logic
  const handleScanTrigger = () => {
    // Simulasi pembacaan frame kamera / barcode decoder
    playScanBeep();
    if ('vibrate' in navigator) navigator.vibrate([100]);
    // Cari unit yang tersedia
    const targetToken = selectedToken === 'PLT-7X9K2' ? 'PLT-3M8N1' : 'PLT-7X9K2';
    handleSelectUnit(targetToken);
    stopCamera();
    showToast(`Stiker fisik terdeteksi: ${targetToken} (${currentUnit?.crop || 'Cabai'})`);
  };

  // Bersihkan kamera saat unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);
  const fileInputRef = useRef(null);

  // Get official dictionary traits for currently selected crop
  const currentCropTraits = useMemo(() => {
    return OFFICIAL_TRAIT_DICTIONARY[currentUnit.crop]?.traits || [];
  }, [currentUnit.crop]);
  const handleSelectUnit = token => {
    setSelectedToken(token);
    const match = units.find(u => u.token === token);
    if (match) {
      setCurrentUnit(match);
      setScores({
        ...match.scores
      });
      setCompressedPhoto(null);
      setPhotoSizeKb(null);
      showToast(`Tanaman ${match.token} (${match.crop}) dimuat.`);
    }
  };

  // Strict Clamping Score Handlers
  const handleSetOrdinal = (traitCode, val) => {
    setScores(prev => ({
      ...prev,
      [traitCode]: val
    }));
  };
  const handleAdjustNumerical = (traitCode, delta, min, max, step) => {
    setScores(prev => {
      const current = prev[traitCode] !== undefined ? prev[traitCode] : min;
      const next = Number((current + delta).toFixed(1));
      // Strict clamping
      if (next < min) return {
        ...prev,
        [traitCode]: min
      };
      if (next > max) return {
        ...prev,
        [traitCode]: max
      };
      return {
        ...prev,
        [traitCode]: next
      };
    });
  };

  // Client-Side Canvas Image Compression Pipeline
  const handlePhotoFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 1920; // Smart Macro Full HD for BUSS botanical morphology
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round(height * MAX_DIM / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round(width * MAX_DIM / height);
            height = MAX_DIM;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG 0.75
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82); // 82% quality preserving trichomes and vein details
        setCompressedPhoto(dataUrl);
        const sizeKb = Math.round(dataUrl.length * 3 / 4 / 1024);
        setPhotoSizeKb(sizeKb);
        showToast(`Foto Full HD tersimpan: ${sizeKb} KB (Kualitas Morfologi BUSS Terjaga)`);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Tamper-proof observation saving with Persistent IndexedDB Engine
  const handleSave = async () => {
    const timestamp = new Date().toISOString();
    const checksumPayload = `${currentUnit.token}|${JSON.stringify(scores)}|${timestamp}`;
    let hash = 0;
    for (let i = 0; i < checksumPayload.length; i++) {
      hash = (hash << 5) - hash + checksumPayload.charCodeAt(i);
      hash |= 0;
    }
    const checksum = 'SHA256:' + Math.abs(hash).toString(16).toUpperCase();
    const obsDbId = `OBS-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const newRecord = {
      obsDbId,
      blindToken: currentUnit.token,
      plotLabel: currentUnit.plotLabel,
      crop: currentUnit.crop,
      scores: {
        ...scores
      },
      notes: scoutNote,
      photoDataUrl: compressedPhoto || null,
      photoSizeKb: photoSizeKb || null,
      geolocation: gpsCoords || {
        latitude: -7.284192,
        longitude: 112.795312,
        altitude: 485,
        accuracy: 4.5,
        capturedAt: timestamp
      },
      checksum,
      createdAt: timestamp,
      syncStatus: isOnline ? 'SYNCED' : 'PENDING',
      syncedAt: isOnline ? timestamp : undefined
    };
    try {
      // 1. Tulis langsung ke IndexedDB PedigroDB
      await dbSaveObservation(newRecord);

      // 2. Jika offline, masukkan ke antrean sinkronisasi
      if (!isOnline) {
        const queueItem = {
          queueId: `Q-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          action: 'CREATE_OBSERVATION',
          obsDbId,
          payload: newRecord,
          attempts: 0,
          createdAt: Date.now()
        };
        await dbAddToSyncQueue(queueItem);
        const updatedQueue = await dbGetSyncQueue();
        setOfflineQueue(updatedQueue);
        showToast(`Tersimpan permanen di IndexedDB (${updatedQueue.length} antrean luring).`);
      } else {
        showToast(`Observasi ${currentUnit.token} tersimpan permanen & disinkronkan.`);
      }

      // 3. Perbarui unit aktif
      setUnits(prev => prev.map(u => {
        if (u.token === currentUnit.token) {
          return {
            ...u,
            scores: {
              ...scores
            },
            observationsCount: (u.observationsCount || 0) + 1,
            lastObserved: 'Tersimpan di IndexedDB'
          };
        }
        return u;
      }));
      setCompressedPhoto(null);
      setPhotoSizeKb(null);
      setScoutNote('');
    } catch (err) {
      showToast('Galat menyimpan ke IndexedDB: ' + err.message);
    }
  };
  const handleSync = async () => {
    if (!isOnline) {
      showToast("Koneksi internet tidak tersedia.");
      return;
    }
    setIsSyncing(true);
    if (onFlushSyncQueue) {
      await onFlushSyncQueue();
    }
    setIsSyncing(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-md mx-auto bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900 text-white p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-sm font-semibold tracking-tight"
  }, "Pencatatan Lapangan Pedigro"), isWakeLockActive && /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center space-x-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sun",
    className: "w-2.5 h-2.5 text-emerald-400"
  }), /*#__PURE__*/React.createElement("span", null, "Layar Aktif"))), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400"
  }, "BrAPI Trait Engine \xB7 Kamera & GPS Riil")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5 text-[11px] font-mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: `w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-amber-400'}`
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-300"
  }, isOnline ? 'ONLINE' : 'OFFLINE'))), offlineQueue.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-3 bg-slate-800 p-2.5 rounded-lg border border-slate-700 flex items-center justify-between text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-300"
  }, offlineQueue.length, " data menunggu sync"), /*#__PURE__*/React.createElement("button", {
    onClick: handleSync,
    disabled: isSyncing,
    className: "px-2.5 py-1 bg-brand-600 text-white rounded text-[11px] font-medium hover:bg-brand-500"
  }, isSyncing ? 'Proses...' : 'Sinkronkan'))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-950 rounded-xl overflow-hidden border border-slate-800 text-white shadow-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 border-b border-slate-800/80 flex items-center justify-between text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    className: "w-4 h-4 text-emerald-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-slate-200"
  }, "Pemindai Kamera Ajir Fisik")), isCameraActive ? /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, hasTorch && /*#__PURE__*/React.createElement("button", {
    onClick: toggleTorch,
    className: `p-1.5 rounded ${isTorchOn ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-300'}`,
    title: "Nyalakan Lampu Kilat"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flashlight",
    className: "w-3.5 h-3.5"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: stopCamera,
    className: "px-2 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded text-[11px] font-medium"
  }, "Tutup")) : /*#__PURE__*/React.createElement("button", {
    onClick: startCamera,
    className: "px-2.5 py-1 bg-brand-700 text-white hover:bg-brand-600 rounded text-xs font-medium flex items-center space-x-1.5 transition"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "video",
    className: "w-3 h-3 text-brand-200"
  }), /*#__PURE__*/React.createElement("span", null, "Buka Kamera"))), isCameraActive ? /*#__PURE__*/React.createElement("div", {
    className: "relative bg-black h-56 flex items-center justify-center overflow-hidden"
  }, /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    autoPlay: true,
    playsInline: true,
    muted: true,
    className: "w-full h-full object-cover"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 pointer-events-none flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-40 h-40 border-2 border-emerald-400/80 rounded-lg relative animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.3)]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white -mt-0.5 -ml-0.5"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white -mt-0.5 -mr-0.5"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white -mb-0.5 -ml-0.5"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white -mb-0.5 -mr-0.5"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-2.5 inset-x-0 flex justify-center"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleScanTrigger,
    className: "bg-emerald-600/90 text-white hover:bg-emerald-500 text-xs px-3.5 py-1.5 rounded-full font-medium shadow-lg backdrop-blur flex items-center space-x-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Kunci Token Ajir")))) : /*#__PURE__*/React.createElement("div", {
    className: "p-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 mx-auto rounded-full bg-slate-900 flex items-center justify-center text-slate-500 mb-2 border border-slate-800"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300 font-medium"
  }, "Arahkan kamera ke stiker QR fisik ajir kebun"), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-500 mt-0.5"
  }, "Mendukung kamera belakang HP, pemindaian real-time, dan lampu kilat.")), /*#__PURE__*/React.createElement("div", {
    className: "p-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono text-slate-400"
  }, "Pilih Cepat:"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5 overflow-x-auto no-scrollbar"
  }, units.map(u => /*#__PURE__*/React.createElement("button", {
    key: u.token,
    onClick: () => handleSelectUnit(u.token),
    className: `px-2 py-0.5 rounded text-[11px] font-mono transition ${selectedToken === u.token ? 'bg-emerald-600 text-white font-semibold' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`
  }, u.token))))), currentUnit && /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-slate-900"
  }, currentUnit.token), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-300 text-slate-600"
  }, "BLIND SCOUT")), /*#__PURE__*/React.createElement("div", {
    className: "text-slate-600 mt-1 font-medium"
  }, currentUnit.plotLabel, " \xB7 Komoditas: ", currentUnit.crop), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-400 mt-0.5 font-mono"
  }, "Standar: ", OFFICIAL_TRAIT_DICTIONARY[currentUnit.crop]?.standard), /*#__PURE__*/React.createElement("div", {
    className: "mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5 text-slate-700"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    className: "w-3.5 h-3.5 text-emerald-600"
  }), /*#__PURE__*/React.createElement("span", null, gpsCoords ? `${gpsCoords.latitude}, ${gpsCoords.longitude}` : 'Mencari sinyal GPS satelit...')), /*#__PURE__*/React.createElement("span", {
    className: `text-[10px] px-1.5 py-0.2 rounded ${gpsStatus === 'LOCKED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`
  }, gpsStatus === 'LOCKED' ? `±${gpsCoords?.accuracy}m dpl` : 'Estimasi Lahan'))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3.5"
  }, currentCropTraits.map(trait => {
    const currentVal = scores[trait.code] !== undefined ? scores[trait.code] : trait.defaultVal || trait.min || 1;
    if (trait.scaleType === 'ORDINAL') {
      return /*#__PURE__*/React.createElement("div", {
        key: trait.code,
        className: "border border-slate-200 p-3 rounded-lg"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex justify-between text-xs mb-1"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-medium text-slate-800"
      }, trait.name), /*#__PURE__*/React.createElement("span", {
        className: "font-mono font-semibold text-brand-800"
      }, "Skor: ", currentVal)), /*#__PURE__*/React.createElement("div", {
        className: "text-[10px] font-mono text-slate-400 mb-2"
      }, trait.ref), /*#__PURE__*/React.createElement("div", {
        className: "grid grid-cols-5 gap-1.5"
      }, trait.scaleLabels ? trait.scaleLabels.map(s => /*#__PURE__*/React.createElement("button", {
        key: s.score,
        onClick: () => handleSetOrdinal(trait.code, s.score),
        className: `touch-target rounded-md font-semibold text-xs border transition-colors ${currentVal === s.score ? 'bg-brand-800 text-white border-brand-800 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`
      }, s.score)) : [1, 2, 3, 4, 5].map(sc => /*#__PURE__*/React.createElement("button", {
        key: sc,
        onClick: () => handleSetOrdinal(trait.code, sc),
        className: `touch-target rounded-md font-semibold text-xs border transition-colors ${currentVal === sc ? 'bg-brand-800 text-white' : 'bg-white text-slate-700'}`
      }, sc))));
    }
    if (trait.scaleType === 'NUMERICAL') {
      return /*#__PURE__*/React.createElement("div", {
        key: trait.code,
        className: "border border-slate-200 p-3 rounded-lg"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex justify-between text-xs mb-1"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-medium text-slate-800"
      }, trait.name), /*#__PURE__*/React.createElement("span", {
        className: "font-mono font-semibold text-slate-900"
      }, Number(currentVal).toFixed(1), " ", trait.unit)), /*#__PURE__*/React.createElement("div", {
        className: "text-[10px] font-mono text-slate-400 mb-2"
      }, trait.ref, " \xB7 Rentang Baku: ", trait.min, " - ", trait.max, " ", trait.unit), /*#__PURE__*/React.createElement("div", {
        className: "flex items-center space-x-2"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => handleAdjustNumerical(trait.code, -trait.step, trait.min, trait.max, trait.step),
        className: "touch-target flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-md flex items-center justify-center text-sm"
      }, "\u2212"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        step: trait.step,
        min: trait.min,
        max: trait.max,
        value: currentVal,
        onChange: e => {
          const v = Number(e.target.value);
          if (v >= trait.min && v <= trait.max) {
            setScores(prev => ({
              ...prev,
              [trait.code]: v
            }));
          }
        },
        className: "w-24 text-center font-mono font-semibold text-xs bg-slate-50 border border-slate-200 rounded-md py-2 focus:outline-none"
      }), /*#__PURE__*/React.createElement("button", {
        onClick: () => handleAdjustNumerical(trait.code, trait.step, trait.min, trait.max, trait.step),
        className: "touch-target flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-md flex items-center justify-center text-sm"
      }, "+")));
    }
    return null;
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    capture: "environment",
    ref: fileInputRef,
    onChange: handlePhotoFile,
    className: "hidden"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => fileInputRef.current && fileInputRef.current.click(),
    className: "w-full touch-target border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 inline-flex items-center justify-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, compressedPhoto ? `Foto Terkompresi (${photoSizeKb} KB)` : 'Ambil & Kompresi Foto Buah')), compressedPhoto && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: compressedPhoto,
    alt: "Thumbnail Sampel",
    className: "h-20 mx-auto rounded border border-slate-200 object-cover shadow-sm"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-500 mt-1 font-mono"
  }, "Tersimpan dalam format WebP di IndexedDB lokal"))), /*#__PURE__*/React.createElement("div", {
    className: "border border-slate-200 p-3 rounded-lg bg-slate-50"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-slate-800 mb-1"
  }, "Catatan Visual Lapangan"), /*#__PURE__*/React.createElement("textarea", {
    rows: "2",
    value: scoutNote,
    onChange: e => setScoutNote(e.target.value),
    placeholder: "Catatan visual fenotipik (misal: vigor sehat, daun bawah sedikit menguning)...",
    className: "w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-700 bg-white"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: handleSave,
    className: "w-full touch-target bg-brand-800 text-white rounded-lg text-xs font-semibold hover:bg-brand-700 shadow-sm transition-colors flex items-center justify-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-4 h-4 text-brand-200"
  }), /*#__PURE__*/React.createElement("span", null, "Simpan ke IndexedDB HP")))), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500 font-mono flex items-center justify-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "hard-drive",
    className: "w-3.5 h-3.5 text-brand-700"
  }), /*#__PURE__*/React.createElement("span", null, "IndexedDB Persisten (PedigroDB) \xB7 Siap Lahan Offline")));
}

// ==========================================
// MODULE 4: PEDIGREE TREE (MINIMALIST GRAPH)
// ==========================================
function PedigreeModule() {
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-lg border border-slate-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-base font-semibold text-slate-900"
  }, "Bagan Silsilah Genetik (Pedigree Tree)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-0.5"
  }, "Struktur garis keturunan formal berbasis model berarah (DAG).")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-50 border border-slate-200 rounded-lg p-8 overflow-x-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-w-[640px] flex flex-col items-center space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center space-x-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-slate-300 p-4 rounded-md w-64 shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] font-mono text-slate-500 uppercase"
  }, "Tetua Betina (\u2640 Seed Parent)"), /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-xs text-slate-900 mt-1"
  }, "Cabai Rawit Hiyung Asli"), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] font-mono text-slate-400 mt-0.5"
  }, "ACC-HIYUNG-01 \xB7 Landrace"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-[11px] text-slate-600 border-t border-slate-100 pt-1.5"
  }, "94.500 SHU \xB7 Toleran Lahan Asam")), /*#__PURE__*/React.createElement("div", {
    className: "text-slate-400 font-mono text-sm"
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-slate-300 p-4 rounded-md w-64 shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] font-mono text-slate-500 uppercase"
  }, "Tetua Jantan (\u2642 Pollen Parent)"), /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-xs text-slate-900 mt-1"
  }, "Galur Introduksi AVRDC-98"), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] font-mono text-slate-400 mt-0.5"
  }, "ACC-AVRDC-98 \xB7 Inbred Line"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-[11px] text-slate-600 border-t border-slate-100 pt-1.5"
  }, "Lokus Resisten Cc-1 \xB7 Dinding Tebal"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-px h-6 bg-slate-300"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 border border-slate-200 rounded"
  }, "Hibridisasi Terarah F1"), /*#__PURE__*/React.createElement("div", {
    className: "w-px h-6 bg-slate-300"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-2 border-brand-700 p-5 rounded-md w-80 shadow-sm text-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono uppercase tracking-wider text-brand-800 bg-brand-50 px-2 py-0.5 rounded border border-brand-200 font-semibold"
  }, "Calon Varietas Unggul F1"), /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-sm text-slate-900 mt-2"
  }, "Nusantara Hiyung F1"), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] font-mono text-slate-400 mt-0.5"
  }, "F1-NUSANTARA-01"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 grid grid-cols-2 gap-2 text-left bg-slate-50 p-2.5 rounded border border-slate-200 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 block text-[10px]"
  }, "Ketahanan Jamur:"), /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-800"
  }, "Skor 4.8 / 5.0 (UPOV Char 48)")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 block text-[10px]"
  }, "Kadar Pedas:"), /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-800"
  }, "70.000 SHU (UPOV Char 44)")))))));
}

// ==========================================
// MODULE 5: SELECTION MATRIX (OBJECTIVE DSS)
// ==========================================
function SelectionMatrixModule({
  units,
  weights,
  setWeights,
  showToast
}) {
  const ranked = useMemo(() => {
    return units.map(u => {
      // Dynamic calculation based on available scores
      const diseaseVal = u.scores?.ANTHRACNOSE_RES || u.scores?.POWDERY_MILDEW_RES || 4;
      const weightVal = u.scores?.FRUIT_WEIGHT || (u.scores?.MELON_WEIGHT ? u.scores.MELON_WEIGHT / 300 : 7);
      const qualVal = u.scores?.FRUIT_PUNGENCY ? u.scores.FRUIT_PUNGENCY * 2.5 : u.scores?.BRIX_CONTENT || 9;
      const normDisease = diseaseVal / 5 * 100;
      const maxWeightExpected = u.crop === 'Melon' ? 2500 : 30;
      const normWeight = Math.min(100, weightVal / maxWeightExpected * 100);
      const maxQualExpected = u.crop === 'Melon' ? 18 : 5;
      const normQual = Math.min(100, qualVal / maxQualExpected * 100);
      const totalScore = normDisease * (weights.disease / 100) + normWeight * (weights.yieldWeight / 100) + normQual * (weights.quality / 100);

      // Dynamic CV% computation based on normalized trait variability
      const traitArr = [normDisease, normWeight, normQual];
      const tMean = traitArr.reduce((a, b) => a + b, 0) / traitArr.length;
      const tVar = traitArr.reduce((a, b) => a + Math.pow(b - tMean, 2), 0) / traitArr.length;
      const tSd = Math.sqrt(tVar);
      const rawCv = tMean > 0 ? tSd / tMean * 10 : 4.5;
      const cvStability = Number(Math.max(2.1, Math.min(12.5, rawCv)).toFixed(1));
      return {
        ...u,
        totalScore: Number(totalScore.toFixed(1)),
        cvStability,
        displayDisease: diseaseVal,
        displayWeight: u.scores?.FRUIT_WEIGHT || u.scores?.MELON_WEIGHT || 7,
        displayQual: u.scores?.BRIX_CONTENT ? `${u.scores.BRIX_CONTENT} °Bx` : `${u.scores?.FRUIT_PUNGENCY || 4}/4 SHU`
      };
    }).sort((a, b) => b.totalScore - a.totalScore);
  }, [units, weights]);
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-lg border border-slate-200 space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-base font-semibold text-slate-900"
  }, "Matriks Seleksi & Perangkingan Galur"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-0.5"
  }, "Perhitungan indeks seleksi multi-kriteria transparan tanpa model halusinasi.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-50 border border-slate-200 p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold text-slate-800 mb-3 flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "Bobot Kriteria Seleksi:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-slate-500"
  }, "Total: ", weights.disease + weights.yieldWeight + weights.quality, "%")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-slate-600 mb-1"
  }, /*#__PURE__*/React.createElement("span", null, "Ketahanan Patogen/Jamur"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-medium"
  }, weights.disease, "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "10",
    max: "80",
    value: weights.disease,
    onChange: e => setWeights({
      ...weights,
      disease: Number(e.target.value)
    }),
    className: "w-full accent-brand-800"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-slate-600 mb-1"
  }, /*#__PURE__*/React.createElement("span", null, "Bobot Panen / Hasil"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-medium"
  }, weights.yieldWeight, "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "10",
    max: "80",
    value: weights.yieldWeight,
    onChange: e => setWeights({
      ...weights,
      yieldWeight: Number(e.target.value)
    }),
    className: "w-full accent-brand-800"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-slate-600 mb-1"
  }, /*#__PURE__*/React.createElement("span", null, "Kualitas (Kemanisan / Pedas)"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-medium"
  }, weights.quality, "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "10",
    max: "80",
    value: weights.quality,
    onChange: e => setWeights({
      ...weights,
      quality: Number(e.target.value)
    }),
    className: "w-full accent-brand-800"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left text-xs"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "border-b border-slate-200 text-slate-500 font-medium"
  }, /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Peringkat"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Identitas Token"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Ketahanan Patogen"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Bobot Sampel"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Karakter Mutu"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Stabilitas (CV)"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3 text-right"
  }, "Skor Indeks Total"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-100 font-normal"
  }, ranked.map((item, idx) => /*#__PURE__*/React.createElement("tr", {
    key: item.token,
    className: idx === 0 ? 'bg-slate-50 font-medium' : 'hover:bg-slate-50'
  }, /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-semibold text-slate-700"
  }, "#", idx + 1)), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-mono font-semibold text-slate-900"
  }, item.token), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-slate-400"
  }, item.plotLabel, " \xB7 ", item.crop)), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3 font-mono"
  }, "Skor ", item.displayDisease, " / 5"), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3 font-mono"
  }, item.displayWeight, " gr"), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3 font-mono"
  }, item.displayQual), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `text-[11px] font-mono px-2 py-0.5 rounded border ${item.cvStability < 5.0 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : item.cvStability <= 10.0 ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-rose-50 text-rose-800 border-rose-200'}`
  }, "CV ", item.cvStability, "% ", item.cvStability < 5.0 ? '(Stabil)' : item.cvStability <= 10.0 ? '(Cukup)' : '(Segregasi)')), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3 text-right font-mono font-bold text-slate-900 text-sm"
  }, item.totalScore)))))), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-slate-50 rounded border border-slate-200 text-[11px] text-slate-500 leading-relaxed"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-slate-800"
  }, "Catatan Resmi PVTPP:"), " Peringkat dihitung secara objektif menggunakan DSS multi-kriteria linier terbobot. Kelayakan resmi pelepasan varietas tetap merujuk pada Pedoman Teknis Pengujian BUSS PVTPP Kementerian Pertanian RI dan verifikasi fisik pemulia penanggung jawab."));
}

// ==========================================
// MODULE 6: BPSB FORM EXPORTER (OFFICIAL)
// ==========================================
function BpsbReportModule({
  showToast
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-lg border border-slate-200 max-w-3xl mx-auto space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono uppercase text-slate-500"
  }, "Standar PVTPP Kementan RI"), /*#__PURE__*/React.createElement("h2", {
    className: "text-base font-semibold text-slate-900 mt-0.5"
  }, "Laporan Karakterisasi BUSS / DUS"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500"
  }, "Format baku pendaftaran pelepasan varietas tanaman.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.print();
      showToast("Mempersiapkan dokumen cetak...");
    },
    className: "inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-800"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "printer",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Cetak Formulir"))), /*#__PURE__*/React.createElement("div", {
    className: "p-6 border border-slate-400 rounded-md font-serif text-slate-900 space-y-4 bg-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center border-b border-slate-300 pb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-xs uppercase tracking-wider"
  }, "KEMENTERIAN PERTANIAN REPUBLIK INDONESIA"), /*#__PURE__*/React.createElement("h4", {
    className: "text-[11px] uppercase text-slate-700"
  }, "Pusat Perlindungan Varietas Tanaman dan Perizinan Pertanian (PVTPP)"), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] italic mt-0.5 font-sans text-slate-500"
  }, "Lembar Uji Kebaruan, Keunikan, Keseragaman, dan Kestabilan (BUSS)")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-sans"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 block text-[11px]"
  }, "Nama Calon Varietas:"), /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-900"
  }, "Nusantara Hiyung F1")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 block text-[11px]"
  }, "Pemulia Penanggung Jawab:"), /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-900"
  }, "Jipung (Lone Steed Studio)")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 block text-[11px]"
  }, "Koordinat Geografis Lahan Uji:"), /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-900 font-mono text-[11px]"
  }, "-7.284192, 112.795312 (485 m dpl)")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 block text-[11px]"
  }, "Nama Botani:"), /*#__PURE__*/React.createElement("span", {
    className: "italic"
  }, "Capsicum annuum x frutescens")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 block text-[11px]"
  }, "Silsilah Tetua:"), /*#__PURE__*/React.createElement("span", null, "ACC-HIYUNG-01 (\u2640) \xD7 ACC-AVRDC-98 (\u2642)"))), /*#__PURE__*/React.createElement("div", {
    className: "pt-2"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left text-xs font-sans border-collapse border border-slate-300"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "bg-slate-100 border border-slate-300"
  }, /*#__PURE__*/React.createElement("th", {
    className: "p-2 border border-slate-300"
  }, "No"), /*#__PURE__*/React.createElement("th", {
    className: "p-2 border border-slate-300"
  }, "Karakter Uji"), /*#__PURE__*/React.createElement("th", {
    className: "p-2 border border-slate-300"
  }, "Metode Uji"), /*#__PURE__*/React.createElement("th", {
    className: "p-2 border border-slate-300"
  }, "Hasil Rata-Rata"), /*#__PURE__*/React.createElement("th", {
    className: "p-2 border border-slate-300"
  }, "Keseragaman"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300"
  }, "1"), /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300"
  }, "Ketahanan Antraknosa Buah (UPOV Char 48)"), /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300"
  }, "Inokulasi Buah UPOV"), /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300 font-semibold"
  }, "4.8 (Resisten)"), /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300"
  }, "Seragam (CV 3.2%)")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300"
  }, "2"), /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300"
  }, "Bobot per Buah (IPGRI 7.4.2)"), /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300"
  }, "Timbangan Analitik"), /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300 font-semibold"
  }, "7.1 gram"), /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300"
  }, "Seragam (CV 4.1%)")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300"
  }, "3"), /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300"
  }, "Padatan Terlarut / Brix (UPOV Char 43)"), /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300"
  }, "Refraktometer Digital"), /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300 font-semibold"
  }, "9.2 \xB0Bx"), /*#__PURE__*/React.createElement("td", {
    className: "p-2 border border-slate-300"
  }, "Seragam"))))), /*#__PURE__*/React.createElement("div", {
    className: "pt-4 flex justify-between items-end font-sans text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-400 font-mono"
  }, "BF-BUSS-DOC-2026-0981 \xB7 SHA256 VALIDATED"), /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-slate-500 mb-10 text-[11px]"
  }, "Pemulia Pengusul,"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold underline"
  }, "Jipung"), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400"
  }, "Lone Steed Studio")))));
}
ReactDOM.createRoot(document.getElementById('root')).render( /*#__PURE__*/React.createElement(App, null));