export type Bioma =
  | 'mata-atlantica'
  | 'cerrado'
  | 'amazonia'
  | 'caatinga'
  | 'pampa'
  | 'pantanal';

export interface Plant {
  id: string;
  name: string;
  scientific: string;
  bioma: Bioma;
  svg: string;
  width: number;
  height: number;
}

export interface Vase {
  id: string;
  name: string;
  svg: string;
  width: number;
  height: number;
}

// ─── SVG helpers ────────────────────────────────────────────────────────────

function toDataUrl(svg: string): string {
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// ─── Plants ─────────────────────────────────────────────────────────────────

const manacaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <defs>
    <radialGradient id="mpc" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f5d76e"/>
      <stop offset="100%" stop-color="#e8b020"/>
    </radialGradient>
    <radialGradient id="mp1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c084fc"/>
      <stop offset="60%" stop-color="#9333ea"/>
      <stop offset="100%" stop-color="#6b21a8"/>
    </radialGradient>
  </defs>
  <!-- stem -->
  <path d="M100 280 Q95 220 90 180 Q85 140 100 120" stroke="#2D6A4F" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- leaves -->
  <ellipse cx="78" cy="200" rx="22" ry="10" fill="#2D6A4F" transform="rotate(-30 78 200)" opacity="0.9"/>
  <ellipse cx="118" cy="185" rx="20" ry="9" fill="#52B788" transform="rotate(25 118 185)" opacity="0.9"/>
  <!-- petals 5 -->
  <ellipse cx="100" cy="80" rx="18" ry="32" fill="url(#mp1)" transform="rotate(0 100 110)" opacity="0.92"/>
  <ellipse cx="100" cy="80" rx="18" ry="32" fill="url(#mp1)" transform="rotate(72 100 110)" opacity="0.92"/>
  <ellipse cx="100" cy="80" rx="18" ry="32" fill="url(#mp1)" transform="rotate(144 100 110)" opacity="0.92"/>
  <ellipse cx="100" cy="80" rx="18" ry="32" fill="url(#mp1)" transform="rotate(216 100 110)" opacity="0.92"/>
  <ellipse cx="100" cy="80" rx="18" ry="32" fill="url(#mp1)" transform="rotate(288 100 110)" opacity="0.92"/>
  <!-- center -->
  <circle cx="100" cy="110" r="12" fill="url(#mpc)"/>
  <circle cx="100" cy="110" r="5" fill="#c45c2a"/>
  <!-- second flower smaller -->
  <ellipse cx="145" cy="100" rx="13" ry="22" fill="#a855f7" transform="rotate(0 145 120)" opacity="0.85"/>
  <ellipse cx="145" cy="100" rx="13" ry="22" fill="#a855f7" transform="rotate(72 145 120)" opacity="0.85"/>
  <ellipse cx="145" cy="100" rx="13" ry="22" fill="#a855f7" transform="rotate(144 145 120)" opacity="0.85"/>
  <ellipse cx="145" cy="100" rx="13" ry="22" fill="#a855f7" transform="rotate(216 145 120)" opacity="0.85"/>
  <ellipse cx="145" cy="100" rx="13" ry="22" fill="#a855f7" transform="rotate(288 145 120)" opacity="0.85"/>
  <circle cx="145" cy="120" r="9" fill="url(#mpc)"/>
</svg>`;

const quaresmeiraSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <defs>
    <radialGradient id="qr1" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#f9a8d4"/>
      <stop offset="100%" stop-color="#be185d"/>
    </radialGradient>
    <radialGradient id="qrc" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fde68a"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </radialGradient>
  </defs>
  <path d="M100 280 Q102 240 98 200 Q96 170 100 140" stroke="#2D6A4F" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="72" cy="210" rx="24" ry="11" fill="#2D6A4F" transform="rotate(-40 72 210)"/>
  <ellipse cx="130" cy="195" rx="22" ry="10" fill="#52B788" transform="rotate(35 130 195)"/>
  <ellipse cx="100" cy="72" rx="22" ry="36" fill="url(#qr1)" transform="rotate(0 100 108)" opacity="0.93"/>
  <ellipse cx="100" cy="72" rx="22" ry="36" fill="url(#qr1)" transform="rotate(72 100 108)" opacity="0.93"/>
  <ellipse cx="100" cy="72" rx="22" ry="36" fill="url(#qr1)" transform="rotate(144 100 108)" opacity="0.93"/>
  <ellipse cx="100" cy="72" rx="22" ry="36" fill="url(#qr1)" transform="rotate(216 100 108)" opacity="0.93"/>
  <ellipse cx="100" cy="72" rx="22" ry="36" fill="url(#qr1)" transform="rotate(288 100 108)" opacity="0.93"/>
  <circle cx="100" cy="108" r="13" fill="url(#qrc)"/>
  <!-- stamens -->
  <line x1="100" y1="103" x2="100" y2="95" stroke="#c45c2a" stroke-width="1.5"/>
  <line x1="105" y1="105" x2="110" y2="97" stroke="#c45c2a" stroke-width="1.5"/>
  <line x1="95" y1="105" x2="90" y2="97" stroke="#c45c2a" stroke-width="1.5"/>
  <!-- bud -->
  <ellipse cx="58" cy="130" rx="10" ry="16" fill="#ec4899" opacity="0.8"/>
  <path d="M53 128 Q58 120 63 128" fill="#be185d"/>
</svg>`;

const heliconiaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <defs>
    <linearGradient id="hb1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fb923c"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
    <linearGradient id="hb2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fcd34d"/>
      <stop offset="100%" stop-color="#fb923c"/>
    </linearGradient>
  </defs>
  <!-- main stem -->
  <path d="M100 280 L100 80" stroke="#2D6A4F" stroke-width="5" fill="none"/>
  <!-- large leaves -->
  <path d="M100 240 Q60 200 30 220 Q65 195 100 210" fill="#2D6A4F" opacity="0.9"/>
  <path d="M100 200 Q145 165 170 185 Q138 162 100 175" fill="#52B788" opacity="0.9"/>
  <!-- bracts -->
  <path d="M100 80 Q70 90 60 110 Q80 95 100 100 Z" fill="url(#hb1)"/>
  <path d="M100 100 Q130 110 140 130 Q120 115 100 120 Z" fill="url(#hb1)" opacity="0.9"/>
  <path d="M100 120 Q72 130 62 150 Q80 135 100 140 Z" fill="url(#hb2)"/>
  <path d="M100 140 Q128 150 138 170 Q118 155 100 160 Z" fill="url(#hb2)" opacity="0.85"/>
  <path d="M100 160 Q72 170 62 190 Q82 175 100 180 Z" fill="url(#hb1)" opacity="0.75"/>
  <!-- small flowers inside bracts -->
  <ellipse cx="80" cy="102" rx="5" ry="10" fill="#fef9c3" opacity="0.9"/>
  <ellipse cx="120" cy="122" rx="5" ry="10" fill="#fef9c3" opacity="0.9"/>
  <ellipse cx="80" cy="142" rx="5" ry="10" fill="#fef9c3" opacity="0.85"/>
</svg>`;

const bromeliaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <defs>
    <linearGradient id="brg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
  </defs>
  <!-- outer spiky leaves -->
  <path d="M100 280 Q60 240 40 200 Q70 230 100 240" fill="#2D6A4F"/>
  <path d="M100 280 Q140 240 160 200 Q130 230 100 240" fill="#52B788"/>
  <path d="M100 240 Q50 210 25 160 Q65 195 100 200" fill="#2D6A4F" opacity="0.9"/>
  <path d="M100 240 Q150 210 175 160 Q135 195 100 200" fill="#52B788" opacity="0.9"/>
  <path d="M100 200 Q45 180 30 130 Q70 165 100 165" fill="#2D6A4F" opacity="0.85"/>
  <path d="M100 200 Q155 180 170 130 Q130 165 100 165" fill="#52B788" opacity="0.85"/>
  <!-- inner rosette leaves -->
  <path d="M100 165 Q70 145 65 110 Q85 140 100 140" fill="#1a4731"/>
  <path d="M100 165 Q130 145 135 110 Q115 140 100 140" fill="#1a4731"/>
  <path d="M100 140 Q75 125 72 95 Q88 120 100 118" fill="#2D6A4F"/>
  <path d="M100 140 Q125 125 128 95 Q112 120 100 118" fill="#2D6A4F"/>
  <!-- central flower spike -->
  <rect x="95" y="60" width="10" height="60" rx="5" fill="url(#brg)"/>
  <!-- flower tips -->
  <ellipse cx="100" cy="58" rx="8" ry="12" fill="#f87171"/>
  <ellipse cx="93" cy="72" rx="5" ry="8" fill="#fbbf24"/>
  <ellipse cx="107" cy="80" rx="5" ry="8" fill="#fbbf24"/>
  <ellipse cx="93" cy="94" rx="5" ry="7" fill="#fbbf24"/>
</svg>`;

const semprevivaS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <defs>
    <radialGradient id="svp" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef9c3"/>
      <stop offset="70%" stop-color="#fde68a"/>
      <stop offset="100%" stop-color="#d4a017"/>
    </radialGradient>
  </defs>
  <!-- thin wiry stems -->
  <path d="M100 280 Q98 260 95 230 Q92 210 88 185" stroke="#6b7280" stroke-width="1.5" fill="none"/>
  <path d="M100 280 Q103 255 106 225 Q110 200 114 175" stroke="#6b7280" stroke-width="1.5" fill="none"/>
  <path d="M100 280 Q96 265 90 245 Q85 225 80 205" stroke="#6b7280" stroke-width="1.5" fill="none"/>
  <path d="M100 280 Q104 258 112 235 Q118 215 122 195" stroke="#6b7280" stroke-width="1.5" fill="none"/>
  <!-- small grassy leaves at base -->
  <path d="M90 270 Q80 250 75 230" stroke="#52B788" stroke-width="2" fill="none"/>
  <path d="M110 270 Q120 250 125 230" stroke="#52B788" stroke-width="2" fill="none"/>
  <!-- daisy flower 1 - main -->
  <g transform="translate(88 185)">
    <ellipse cx="0" cy="-14" rx="5" ry="14" fill="#fef9c3" transform="rotate(0)"/>
    <ellipse cx="0" cy="-14" rx="5" ry="14" fill="#fef9c3" transform="rotate(40)"/>
    <ellipse cx="0" cy="-14" rx="5" ry="14" fill="#fef9c3" transform="rotate(80)"/>
    <ellipse cx="0" cy="-14" rx="5" ry="14" fill="#fef9c3" transform="rotate(120)"/>
    <ellipse cx="0" cy="-14" rx="5" ry="14" fill="#fef9c3" transform="rotate(160)"/>
    <ellipse cx="0" cy="-14" rx="5" ry="14" fill="#fef9c3" transform="rotate(200)"/>
    <ellipse cx="0" cy="-14" rx="5" ry="14" fill="#fef9c3" transform="rotate(240)"/>
    <ellipse cx="0" cy="-14" rx="5" ry="14" fill="#fef9c3" transform="rotate(280)"/>
    <ellipse cx="0" cy="-14" rx="5" ry="14" fill="#fef9c3" transform="rotate(320)"/>
    <circle cx="0" cy="0" r="8" fill="url(#svp)"/>
  </g>
  <!-- flower 2 -->
  <g transform="translate(114 175)">
    <ellipse cx="0" cy="-11" rx="4" ry="11" fill="#fef9c3" transform="rotate(0)"/>
    <ellipse cx="0" cy="-11" rx="4" ry="11" fill="#fef9c3" transform="rotate(45)"/>
    <ellipse cx="0" cy="-11" rx="4" ry="11" fill="#fef9c3" transform="rotate(90)"/>
    <ellipse cx="0" cy="-11" rx="4" ry="11" fill="#fef9c3" transform="rotate(135)"/>
    <ellipse cx="0" cy="-11" rx="4" ry="11" fill="#fef9c3" transform="rotate(180)"/>
    <ellipse cx="0" cy="-11" rx="4" ry="11" fill="#fef9c3" transform="rotate(225)"/>
    <ellipse cx="0" cy="-11" rx="4" ry="11" fill="#fef9c3" transform="rotate(270)"/>
    <ellipse cx="0" cy="-11" rx="4" ry="11" fill="#fef9c3" transform="rotate(315)"/>
    <circle cx="0" cy="0" r="6" fill="url(#svp)"/>
  </g>
  <!-- flower 3 (bud) -->
  <g transform="translate(80 205)">
    <ellipse cx="0" cy="-9" rx="3.5" ry="9" fill="#fde68a" transform="rotate(0)"/>
    <ellipse cx="0" cy="-9" rx="3.5" ry="9" fill="#fde68a" transform="rotate(60)"/>
    <ellipse cx="0" cy="-9" rx="3.5" ry="9" fill="#fde68a" transform="rotate(120)"/>
    <ellipse cx="0" cy="-9" rx="3.5" ry="9" fill="#fde68a" transform="rotate(180)"/>
    <ellipse cx="0" cy="-9" rx="3.5" ry="9" fill="#fde68a" transform="rotate(240)"/>
    <ellipse cx="0" cy="-9" rx="3.5" ry="9" fill="#fde68a" transform="rotate(300)"/>
    <circle cx="0" cy="0" r="5" fill="#d4a017"/>
  </g>
  <!-- flower 4 -->
  <g transform="translate(122 195)">
    <ellipse cx="0" cy="-10" rx="4" ry="10" fill="#fef9c3" transform="rotate(0)"/>
    <ellipse cx="0" cy="-10" rx="4" ry="10" fill="#fef9c3" transform="rotate(60)"/>
    <ellipse cx="0" cy="-10" rx="4" ry="10" fill="#fef9c3" transform="rotate(120)"/>
    <ellipse cx="0" cy="-10" rx="4" ry="10" fill="#fef9c3" transform="rotate(180)"/>
    <ellipse cx="0" cy="-10" rx="4" ry="10" fill="#fef9c3" transform="rotate(240)"/>
    <ellipse cx="0" cy="-10" rx="4" ry="10" fill="#fef9c3" transform="rotate(300)"/>
    <circle cx="0" cy="0" r="7" fill="url(#svp)"/>
  </g>
</svg>`;

const ipeAmarelSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <defs>
    <radialGradient id="iy" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </radialGradient>
  </defs>
  <!-- branches -->
  <path d="M100 280 Q100 240 100 200" stroke="#92400e" stroke-width="6" fill="none"/>
  <path d="M100 230 Q80 210 55 220" stroke="#92400e" stroke-width="3" fill="none"/>
  <path d="M100 210 Q125 185 150 195" stroke="#92400e" stroke-width="3" fill="none"/>
  <path d="M100 200 Q95 175 85 160" stroke="#92400e" stroke-width="2.5" fill="none"/>
  <path d="M100 200 Q110 170 125 155" stroke="#92400e" stroke-width="2.5" fill="none"/>
  <path d="M100 200 Q100 165 100 148" stroke="#92400e" stroke-width="2.5" fill="none"/>
  <!-- trumpet flowers -->
  <!-- cluster center -->
  <g transform="translate(100 130)">
    <path d="M0 0 Q-10 -8 -8 -18 Q0 -22 8 -18 Q10 -8 0 0Z" fill="url(#iy)"/>
    <path d="M-5 -5 Q-18 -10 -20 -22 Q-12 -26 -8 -18 Q-6 -12 -5 -5Z" fill="url(#iy)"/>
    <path d="M5 -5 Q18 -10 20 -22 Q12 -26 8 -18 Q6 -12 5 -5Z" fill="url(#iy)"/>
    <path d="M0 -3 Q-12 2 -14 12 Q-6 16 0 12 Q3 5 0 -3Z" fill="url(#iy)"/>
    <path d="M0 -3 Q12 2 14 12 Q6 16 0 12 Q-3 5 0 -3Z" fill="url(#iy)"/>
  </g>
  <!-- branch flowers left -->
  <g transform="translate(62 208)">
    <path d="M0 0 Q-8 -6 -6 -14 Q0 -17 6 -14 Q8 -6 0 0Z" fill="#fef08a"/>
    <path d="M-4 -4 Q-14 -8 -15 -17 Q-9 -20 -6 -14Z" fill="#fef08a"/>
    <path d="M4 -4 Q14 -8 15 -17 Q9 -20 6 -14Z" fill="#fef08a"/>
    <path d="M0 -2 Q-9 2 -10 9 Q-5 12 0 9Z" fill="#fef08a"/>
    <path d="M0 -2 Q9 2 10 9 Q5 12 0 9Z" fill="#fef08a"/>
  </g>
  <!-- branch flowers right -->
  <g transform="translate(148 183)">
    <path d="M0 0 Q-8 -6 -6 -14 Q0 -17 6 -14 Q8 -6 0 0Z" fill="#fde047"/>
    <path d="M-4 -4 Q-14 -8 -15 -17 Q-9 -20 -6 -14Z" fill="#fde047"/>
    <path d="M4 -4 Q14 -8 15 -17 Q9 -20 6 -14Z" fill="#fde047"/>
    <path d="M0 -2 Q-9 2 -10 9 Q-5 12 0 9Z" fill="#fde047"/>
    <path d="M0 -2 Q9 2 10 9 Q5 12 0 9Z" fill="#fde047"/>
  </g>
  <!-- scattered petals / fallen -->
  <ellipse cx="75" cy="255" rx="8" ry="5" fill="#fef08a" transform="rotate(-20 75 255)" opacity="0.7"/>
  <ellipse cx="125" cy="260" rx="7" ry="4" fill="#fde047" transform="rotate(15 125 260)" opacity="0.7"/>
</svg>`;

const orquideaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <defs>
    <radialGradient id="oq1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e9d5ff"/>
      <stop offset="60%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </radialGradient>
    <radialGradient id="oqlip" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fde68a"/>
      <stop offset="100%" stop-color="#c45c2a"/>
    </radialGradient>
  </defs>
  <!-- pseudobulb -->
  <ellipse cx="100" cy="248" rx="14" ry="20" fill="#52B788"/>
  <!-- leaves -->
  <path d="M94 248 Q70 230 55 200 Q80 220 94 235" fill="#2D6A4F"/>
  <path d="M106 248 Q130 230 145 200 Q120 220 106 235" fill="#52B788"/>
  <!-- stem -->
  <path d="M100 228 Q102 200 100 170 Q99 145 100 120" stroke="#52B788" stroke-width="2.5" fill="none"/>
  <!-- Cattleya flower - large showy -->
  <!-- 3 sepals -->
  <ellipse cx="100" cy="88" rx="12" ry="28" fill="url(#oq1)" transform="rotate(0 100 116)" opacity="0.85"/>
  <ellipse cx="100" cy="88" rx="12" ry="28" fill="url(#oq1)" transform="rotate(120 100 116)" opacity="0.85"/>
  <ellipse cx="100" cy="88" rx="12" ry="28" fill="url(#oq1)" transform="rotate(240 100 116)" opacity="0.85"/>
  <!-- 2 petals (wider, wavy) -->
  <ellipse cx="100" cy="86" rx="18" ry="28" fill="#c084fc" transform="rotate(60 100 116)" opacity="0.9"/>
  <ellipse cx="100" cy="86" rx="18" ry="28" fill="#c084fc" transform="rotate(300 100 116)" opacity="0.9"/>
  <!-- labellum (lip) -->
  <ellipse cx="100" cy="124" rx="16" ry="12" fill="url(#oqlip)"/>
  <path d="M88 124 Q100 134 112 124 Q100 142 88 124Z" fill="#fbbf24"/>
  <!-- column -->
  <ellipse cx="100" cy="116" rx="5" ry="8" fill="#f5f0e8"/>
  <!-- second bud -->
  <ellipse cx="135" cy="130" rx="7" ry="12" fill="#d8b4fe" opacity="0.75"/>
  <path d="M130 128 Q135 120 140 128" fill="#a855f7" opacity="0.8"/>
</svg>`;

const vitoriaRegiaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="vr1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#fce7f3"/>
      <stop offset="100%" stop-color="#f9a8d4"/>
    </radialGradient>
    <radialGradient id="vrl" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#52B788"/>
      <stop offset="60%" stop-color="#2D6A4F"/>
      <stop offset="100%" stop-color="#1a4731"/>
    </radialGradient>
  </defs>
  <!-- lily pad (view from above) -->
  <circle cx="100" cy="100" r="88" fill="url(#vrl)" opacity="0.9"/>
  <!-- pad veins -->
  <line x1="100" y1="12" x2="100" y2="188" stroke="#1a4731" stroke-width="1.5" opacity="0.5"/>
  <line x1="12" y1="100" x2="188" y2="100" stroke="#1a4731" stroke-width="1.5" opacity="0.5"/>
  <line x1="37" y1="37" x2="163" y2="163" stroke="#1a4731" stroke-width="1" opacity="0.4"/>
  <line x1="163" y1="37" x2="37" y2="163" stroke="#1a4731" stroke-width="1" opacity="0.4"/>
  <!-- gap in pad -->
  <path d="M100 12 L112 26 L100 100 L88 26 Z" fill="#0d1a0d" opacity="0.3"/>
  <!-- flower outer petals -->
  <ellipse cx="100" cy="70" rx="14" ry="26" fill="url(#vr1)" transform="rotate(0 100 100)" opacity="0.9"/>
  <ellipse cx="100" cy="70" rx="14" ry="26" fill="url(#vr1)" transform="rotate(30 100 100)" opacity="0.9"/>
  <ellipse cx="100" cy="70" rx="14" ry="26" fill="url(#vr1)" transform="rotate(60 100 100)" opacity="0.9"/>
  <ellipse cx="100" cy="70" rx="14" ry="26" fill="url(#vr1)" transform="rotate(90 100 100)" opacity="0.9"/>
  <ellipse cx="100" cy="70" rx="14" ry="26" fill="url(#vr1)" transform="rotate(120 100 100)" opacity="0.9"/>
  <ellipse cx="100" cy="70" rx="14" ry="26" fill="url(#vr1)" transform="rotate(150 100 100)" opacity="0.9"/>
  <ellipse cx="100" cy="70" rx="14" ry="26" fill="url(#vr1)" transform="rotate(180 100 100)" opacity="0.9"/>
  <ellipse cx="100" cy="70" rx="14" ry="26" fill="url(#vr1)" transform="rotate(210 100 100)" opacity="0.9"/>
  <ellipse cx="100" cy="70" rx="14" ry="26" fill="url(#vr1)" transform="rotate(240 100 100)" opacity="0.9"/>
  <ellipse cx="100" cy="70" rx="14" ry="26" fill="url(#vr1)" transform="rotate(270 100 100)" opacity="0.9"/>
  <ellipse cx="100" cy="70" rx="14" ry="26" fill="url(#vr1)" transform="rotate(300 100 100)" opacity="0.9"/>
  <ellipse cx="100" cy="70" rx="14" ry="26" fill="url(#vr1)" transform="rotate(330 100 100)" opacity="0.9"/>
  <!-- inner petals pink -->
  <ellipse cx="100" cy="80" rx="9" ry="18" fill="#fbcfe8" transform="rotate(15 100 100)"/>
  <ellipse cx="100" cy="80" rx="9" ry="18" fill="#fbcfe8" transform="rotate(75 100 100)"/>
  <ellipse cx="100" cy="80" rx="9" ry="18" fill="#fbcfe8" transform="rotate(135 100 100)"/>
  <ellipse cx="100" cy="80" rx="9" ry="18" fill="#fbcfe8" transform="rotate(195 100 100)"/>
  <ellipse cx="100" cy="80" rx="9" ry="18" fill="#fbcfe8" transform="rotate(255 100 100)"/>
  <ellipse cx="100" cy="80" rx="9" ry="18" fill="#fbcfe8" transform="rotate(315 100 100)"/>
  <!-- center -->
  <circle cx="100" cy="100" r="14" fill="#fde68a"/>
  <circle cx="100" cy="100" r="7" fill="#f59e0b"/>
</svg>`;

const mandacaruSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <defs>
    <linearGradient id="mc1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4a7c59"/>
      <stop offset="50%" stop-color="#52B788"/>
      <stop offset="100%" stop-color="#4a7c59"/>
    </linearGradient>
    <radialGradient id="mcf" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#fefce8"/>
      <stop offset="100%" stop-color="#fde68a"/>
    </radialGradient>
  </defs>
  <!-- main trunk -->
  <rect x="82" y="100" width="36" height="170" rx="18" fill="url(#mc1)"/>
  <!-- trunk ridges / ribs -->
  <line x1="91" y1="100" x2="91" y2="270" stroke="#2D6A4F" stroke-width="2" opacity="0.5"/>
  <line x1="100" y1="100" x2="100" y2="270" stroke="#2D6A4F" stroke-width="2" opacity="0.5"/>
  <line x1="109" y1="100" x2="109" y2="270" stroke="#2D6A4F" stroke-width="2" opacity="0.5"/>
  <!-- spines -->
  <line x1="88" y1="120" x2="78" y2="116" stroke="#d4a017" stroke-width="1.5"/>
  <line x1="88" y1="130" x2="76" y2="128" stroke="#d4a017" stroke-width="1.5"/>
  <line x1="88" y1="145" x2="78" y2="141" stroke="#d4a017" stroke-width="1.5"/>
  <line x1="112" y1="120" x2="122" y2="116" stroke="#d4a017" stroke-width="1.5"/>
  <line x1="112" y1="130" x2="124" y2="128" stroke="#d4a017" stroke-width="1.5"/>
  <line x1="112" y1="145" x2="122" y2="141" stroke="#d4a017" stroke-width="1.5"/>
  <!-- left arm -->
  <path d="M88 160 Q60 155 52 140 Q52 120 65 118 Q68 118 68 130 Q68 148 88 155" fill="url(#mc1)" stroke="#2D6A4F" stroke-width="1"/>
  <!-- left arm spines -->
  <line x1="58" y1="138" x2="50" y2="132" stroke="#d4a017" stroke-width="1.5"/>
  <line x1="62" y1="128" x2="55" y2="120" stroke="#d4a017" stroke-width="1.5"/>
  <!-- right arm -->
  <path d="M112 175 Q140 170 148 155 Q148 135 135 133 Q132 133 132 145 Q132 163 112 170" fill="url(#mc1)" stroke="#2D6A4F" stroke-width="1"/>
  <!-- flower at top -->
  <g transform="translate(100 100)">
    <ellipse cx="0" cy="-12" rx="7" ry="14" fill="url(#mcf)" transform="rotate(0)"/>
    <ellipse cx="0" cy="-12" rx="7" ry="14" fill="url(#mcf)" transform="rotate(45)"/>
    <ellipse cx="0" cy="-12" rx="7" ry="14" fill="url(#mcf)" transform="rotate(90)"/>
    <ellipse cx="0" cy="-12" rx="7" ry="14" fill="url(#mcf)" transform="rotate(135)"/>
    <ellipse cx="0" cy="-12" rx="7" ry="14" fill="url(#mcf)" transform="rotate(180)"/>
    <ellipse cx="0" cy="-12" rx="7" ry="14" fill="url(#mcf)" transform="rotate(225)"/>
    <ellipse cx="0" cy="-12" rx="7" ry="14" fill="url(#mcf)" transform="rotate(270)"/>
    <ellipse cx="0" cy="-12" rx="7" ry="14" fill="url(#mcf)" transform="rotate(315)"/>
    <circle cx="0" cy="0" r="9" fill="#fde68a"/>
  </g>
</svg>`;

const verbenaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <defs>
    <radialGradient id="vb1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e9d5ff"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </radialGradient>
  </defs>
  <!-- stems branching -->
  <path d="M100 280 Q100 265 100 250" stroke="#52B788" stroke-width="3" fill="none"/>
  <path d="M100 250 Q85 235 72 225" stroke="#52B788" stroke-width="2" fill="none"/>
  <path d="M100 250 Q115 235 128 225" stroke="#52B788" stroke-width="2" fill="none"/>
  <path d="M100 250 Q100 235 100 222" stroke="#52B788" stroke-width="2" fill="none"/>
  <path d="M72 225 Q65 210 58 200" stroke="#52B788" stroke-width="1.5" fill="none"/>
  <path d="M72 225 Q72 210 72 197" stroke="#52B788" stroke-width="1.5" fill="none"/>
  <path d="M128 225 Q135 210 142 200" stroke="#52B788" stroke-width="1.5" fill="none"/>
  <path d="M128 225 Q128 210 128 197" stroke="#52B788" stroke-width="1.5" fill="none"/>
  <path d="M100 222 Q92 207 85 196" stroke="#52B788" stroke-width="1.5" fill="none"/>
  <path d="M100 222 Q108 207 115 196" stroke="#52B788" stroke-width="1.5" fill="none"/>
  <!-- leaves -->
  <path d="M88 252 Q78 240 68 238 Q75 248 88 250" fill="#2D6A4F"/>
  <path d="M112 252 Q122 240 132 238 Q125 248 112 250" fill="#52B788"/>
  <!-- tiny flower clusters at each tip -->
  <!-- cluster 1 center -->
  <g transform="translate(100 215)">
    <circle cx="-5" cy="-3" r="4" fill="#7c3aed"/>
    <circle cx="5" cy="-3" r="4" fill="#8b5cf6"/>
    <circle cx="0" cy="3" r="4" fill="#7c3aed"/>
    <circle cx="-8" cy="3" r="3" fill="#a78bfa"/>
    <circle cx="8" cy="3" r="3" fill="#8b5cf6"/>
    <circle cx="0" cy="-8" r="3.5" fill="#6d28d9"/>
  </g>
  <!-- cluster at left branches -->
  <g transform="translate(58 192)">
    <circle cx="-4" cy="-2" r="3.5" fill="#7c3aed"/>
    <circle cx="4" cy="-2" r="3.5" fill="#8b5cf6"/>
    <circle cx="0" cy="4" r="3.5" fill="#6d28d9"/>
    <circle cx="-6" cy="3" r="2.5" fill="#a78bfa"/>
    <circle cx="6" cy="3" r="2.5" fill="#7c3aed"/>
  </g>
  <g transform="translate(72 190)">
    <circle cx="-3" cy="-2" r="3" fill="#8b5cf6"/>
    <circle cx="3" cy="-2" r="3" fill="#7c3aed"/>
    <circle cx="0" cy="3" r="3" fill="#a78bfa"/>
    <circle cx="-5" cy="2" r="2" fill="#6d28d9"/>
    <circle cx="5" cy="2" r="2" fill="#8b5cf6"/>
  </g>
  <!-- cluster right -->
  <g transform="translate(142 192)">
    <circle cx="-4" cy="-2" r="3.5" fill="#8b5cf6"/>
    <circle cx="4" cy="-2" r="3.5" fill="#7c3aed"/>
    <circle cx="0" cy="4" r="3.5" fill="#a78bfa"/>
    <circle cx="-6" cy="3" r="2.5" fill="#6d28d9"/>
    <circle cx="6" cy="3" r="2.5" fill="#8b5cf6"/>
  </g>
  <g transform="translate(128 190)">
    <circle cx="-3" cy="-2" r="3" fill="#7c3aed"/>
    <circle cx="3" cy="-2" r="3" fill="#8b5cf6"/>
    <circle cx="0" cy="3" r="3" fill="#6d28d9"/>
    <circle cx="-5" cy="2" r="2" fill="#a78bfa"/>
  </g>
  <!-- cluster right small -->
  <g transform="translate(85 188)">
    <circle cx="-3" cy="-2" r="3" fill="#a78bfa"/>
    <circle cx="3" cy="-2" r="3" fill="#7c3aed"/>
    <circle cx="0" cy="4" r="3" fill="#8b5cf6"/>
  </g>
  <g transform="translate(115 188)">
    <circle cx="-3" cy="-2" r="3" fill="#8b5cf6"/>
    <circle cx="3" cy="-2" r="3" fill="#a78bfa"/>
    <circle cx="0" cy="4" r="3" fill="#7c3aed"/>
  </g>
  <!-- white petal highlights -->
  <circle cx="58" cy="189" r="1.5" fill="white" opacity="0.7"/>
  <circle cx="100" cy="209" r="1.5" fill="white" opacity="0.7"/>
  <circle cx="142" cy="189" r="1.5" fill="white" opacity="0.7"/>
</svg>`;

// ─── Vases ───────────────────────────────────────────────────────────────────

const vasoBarro = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
  <defs>
    <linearGradient id="vb" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9a4a1e"/>
      <stop offset="30%" stop-color="#c45c2a"/>
      <stop offset="70%" stop-color="#c45c2a"/>
      <stop offset="100%" stop-color="#7c3816"/>
    </linearGradient>
    <linearGradient id="vbr" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d97741"/>
      <stop offset="100%" stop-color="#7c3816"/>
    </linearGradient>
  </defs>
  <!-- shadow -->
  <ellipse cx="100" cy="232" rx="55" ry="6" fill="#0d1a0d" opacity="0.4"/>
  <!-- vase body -->
  <path d="M60 200 Q52 170 55 140 Q58 110 75 95 Q85 88 100 86 Q115 88 125 95 Q142 110 145 140 Q148 170 140 200 Z"
        fill="url(#vbr)"/>
  <!-- vase front highlight -->
  <path d="M70 195 Q65 165 67 138 Q70 112 82 100 Q90 94 100 93 Q110 94 118 100 Q130 112 133 138 Q135 165 130 195 Z"
        fill="url(#vb)" opacity="0.9"/>
  <!-- rim -->
  <ellipse cx="100" cy="86" rx="32" ry="9" fill="#c45c2a"/>
  <ellipse cx="100" cy="82" rx="32" ry="9" fill="#d97741"/>
  <ellipse cx="100" cy="80" rx="28" ry="6" fill="#7c3816"/>
  <!-- soil inside -->
  <ellipse cx="100" cy="80" rx="24" ry="4" fill="#3d2b1f" opacity="0.8"/>
  <!-- texture lines -->
  <path d="M70 130 Q100 125 130 130" stroke="#7c3816" stroke-width="1" fill="none" opacity="0.5"/>
  <path d="M65 155 Q100 149 135 155" stroke="#7c3816" stroke-width="1" fill="none" opacity="0.5"/>
  <path d="M67 178 Q100 172 133 178" stroke="#7c3816" stroke-width="1" fill="none" opacity="0.4"/>
  <!-- base ring -->
  <ellipse cx="100" cy="200" rx="42" ry="6" fill="#7c3816"/>
  <ellipse cx="100" cy="198" rx="42" ry="6" fill="#9a4a1e"/>
</svg>`;

const vasoCeramica = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
  <defs>
    <linearGradient id="vc" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4cfc8"/>
      <stop offset="25%" stop-color="#f5f0e8"/>
      <stop offset="75%" stop-color="#f5f0e8"/>
      <stop offset="100%" stop-color="#b8b2aa"/>
    </linearGradient>
    <linearGradient id="vcr" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f5f0e8"/>
      <stop offset="100%" stop-color="#c8c2ba"/>
    </linearGradient>
  </defs>
  <ellipse cx="100" cy="232" rx="50" ry="5" fill="#0d1a0d" opacity="0.35"/>
  <!-- body (cylindrical with slight taper) -->
  <path d="M68 205 Q62 175 65 148 Q67 118 78 102 Q88 90 100 88 Q112 90 122 102 Q133 118 135 148 Q138 175 132 205 Z"
        fill="url(#vcr)"/>
  <path d="M78 200 Q72 170 75 145 Q77 118 86 106 Q93 97 100 96 Q107 97 114 106 Q123 118 125 145 Q128 170 122 200 Z"
        fill="url(#vc)" opacity="0.9"/>
  <!-- rim -->
  <ellipse cx="100" cy="88" rx="30" ry="8" fill="#d4cfc8"/>
  <ellipse cx="100" cy="85" rx="30" ry="8" fill="#f5f0e8"/>
  <ellipse cx="100" cy="83" rx="26" ry="5.5" fill="#9a9590"/>
  <ellipse cx="100" cy="83" rx="22" ry="3.5" fill="#2d2a26" opacity="0.7"/>
  <!-- decorative band -->
  <path d="M72 148 Q100 143 128 148" stroke="#4a7a4a" stroke-width="2.5" fill="none" opacity="0.6"/>
  <path d="M74 153 Q100 148 126 153" stroke="#4a7a4a" stroke-width="1" fill="none" opacity="0.4"/>
  <!-- base -->
  <ellipse cx="100" cy="205" rx="38" ry="5.5" fill="#9a9590"/>
  <ellipse cx="100" cy="203" rx="38" ry="5.5" fill="#c8c2ba"/>
</svg>`;

const cachepotMacrame = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" width="200" height="260">
  <defs>
    <linearGradient id="mp" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c4a35a"/>
      <stop offset="50%" stop-color="#e8c97a"/>
      <stop offset="100%" stop-color="#c4a35a"/>
    </linearGradient>
  </defs>
  <!-- hanging ropes -->
  <line x1="75" y1="0" x2="78" y2="60" stroke="#c4a35a" stroke-width="2.5"/>
  <line x1="100" y1="0" x2="100" y2="55" stroke="#c4a35a" stroke-width="2.5"/>
  <line x1="125" y1="0" x2="122" y2="60" stroke="#c4a35a" stroke-width="2.5"/>
  <!-- knots at top -->
  <circle cx="75" cy="0" r="3" fill="#c4a35a"/>
  <circle cx="100" cy="0" r="3" fill="#c4a35a"/>
  <circle cx="125" cy="0" r="3" fill="#c4a35a"/>
  <!-- macrame net pattern -->
  <!-- cross ropes -->
  <path d="M78 60 Q100 65 122 60" stroke="#c4a35a" stroke-width="2" fill="none"/>
  <!-- diamond knots -->
  <circle cx="100" cy="65" r="3.5" fill="#c4a35a"/>
  <!-- diagonal ropes making diamonds -->
  <line x1="78" y1="60" x2="86" y2="82" stroke="#c4a35a" stroke-width="2"/>
  <line x1="122" y1="60" x2="114" y2="82" stroke="#c4a35a" stroke-width="2"/>
  <line x1="100" y1="65" x2="86" y2="82" stroke="#c4a35a" stroke-width="2"/>
  <line x1="100" y1="65" x2="114" y2="82" stroke="#c4a35a" stroke-width="2"/>
  <!-- second row -->
  <path d="M78 60 Q72 90 70 110" stroke="#c4a35a" stroke-width="2" fill="none"/>
  <path d="M122 60 Q128 90 130 110" stroke="#c4a35a" stroke-width="2" fill="none"/>
  <line x1="86" y1="82" x2="80" y2="105" stroke="#c4a35a" stroke-width="2"/>
  <line x1="114" y1="82" x2="120" y2="105" stroke="#c4a35a" stroke-width="2"/>
  <line x1="86" y1="82" x2="94" y2="104" stroke="#c4a35a" stroke-width="2"/>
  <line x1="114" y1="82" x2="106" y2="104" stroke="#c4a35a" stroke-width="2"/>
  <!-- knots -->
  <circle cx="86" cy="82" r="3" fill="#c4a35a"/>
  <circle cx="114" cy="82" r="3" fill="#c4a35a"/>
  <circle cx="80" cy="105" r="2.5" fill="#c4a35a"/>
  <circle cx="94" cy="104" r="2.5" fill="#c4a35a"/>
  <circle cx="106" cy="104" r="2.5" fill="#c4a35a"/>
  <circle cx="120" cy="105" r="2.5" fill="#c4a35a"/>
  <!-- horizontal band -->
  <path d="M70 110 Q100 116 130 110" stroke="#c4a35a" stroke-width="2.5" fill="none"/>
  <!-- pot inside -->
  <path d="M72 110 Q68 145 72 175 Q80 195 100 198 Q120 195 128 175 Q132 145 128 110 Z"
        fill="#8B6914"/>
  <path d="M76 110 Q73 143 76 172 Q83 190 100 193 Q117 190 124 172 Q127 143 124 110 Z"
        fill="url(#mp)" opacity="0.85"/>
  <!-- pot rim -->
  <ellipse cx="100" cy="110" rx="30" ry="7" fill="#c4a35a"/>
  <ellipse cx="100" cy="107" rx="26" ry="5" fill="#8B6914" opacity="0.8"/>
  <!-- fringe at bottom -->
  <line x1="72" y1="178" x2="68" y2="210" stroke="#c4a35a" stroke-width="1.5"/>
  <line x1="80" y1="194" x2="77" y2="225" stroke="#c4a35a" stroke-width="1.5"/>
  <line x1="90" y1="198" x2="88" y2="230" stroke="#c4a35a" stroke-width="1.5"/>
  <line x1="100" y1="199" x2="100" y2="231" stroke="#c4a35a" stroke-width="1.5"/>
  <line x1="110" y1="198" x2="112" y2="230" stroke="#c4a35a" stroke-width="1.5"/>
  <line x1="120" y1="194" x2="123" y2="225" stroke="#c4a35a" stroke-width="1.5"/>
  <line x1="128" y1="178" x2="132" y2="210" stroke="#c4a35a" stroke-width="1.5"/>
</svg>`;

const vasoVidro = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
  <defs>
    <linearGradient id="vv" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a7c4b5" stop-opacity="0.3"/>
      <stop offset="20%" stop-color="#d4e9e0" stop-opacity="0.15"/>
      <stop offset="50%" stop-color="#e8f5f0" stop-opacity="0.1"/>
      <stop offset="80%" stop-color="#d4e9e0" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#7aada0" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="vvwater" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4a90b0" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#2D6A4F" stop-opacity="0.3"/>
    </linearGradient>
  </defs>
  <ellipse cx="100" cy="232" rx="48" ry="5" fill="#0d1a0d" opacity="0.3"/>
  <!-- glass body -->
  <path d="M65 210 Q58 175 60 148 Q62 115 72 98 Q82 84 100 82 Q118 84 128 98 Q138 115 140 148 Q142 175 135 210 Z"
        fill="url(#vv)" stroke="#a7c4b5" stroke-width="1.5" stroke-opacity="0.6"/>
  <!-- water inside -->
  <path d="M68 205 Q62 170 64 148 Q66 118 75 104 Q84 94 100 93 Q116 94 125 104 Q134 118 136 148 Q138 170 132 205 Z"
        fill="url(#vvwater)"/>
  <!-- glass highlight left -->
  <path d="M68 115 Q64 145 65 175" stroke="white" stroke-width="3" fill="none" opacity="0.3" stroke-linecap="round"/>
  <!-- glass highlight right thin -->
  <path d="M130 120 Q134 148 132 172" stroke="white" stroke-width="1.5" fill="none" opacity="0.2" stroke-linecap="round"/>
  <!-- rim -->
  <ellipse cx="100" cy="82" rx="32" ry="8" fill="none" stroke="#a7c4b5" stroke-width="1.5" stroke-opacity="0.7"/>
  <ellipse cx="100" cy="79" rx="32" ry="8" fill="none" stroke="#d4e9e0" stroke-width="1" stroke-opacity="0.5"/>
  <!-- opening -->
  <ellipse cx="100" cy="79" rx="28" ry="5" fill="#1a2e28" opacity="0.6"/>
  <!-- base -->
  <ellipse cx="100" cy="210" rx="40" ry="6" fill="none" stroke="#a7c4b5" stroke-width="1.5" stroke-opacity="0.6"/>
  <ellipse cx="100" cy="214" rx="38" ry="5" fill="#a7c4b5" opacity="0.2"/>
</svg>`;

// ─── Exported data ───────────────────────────────────────────────────────────

export const PLANTS: Plant[] = [
  {
    id: 'manaca-da-serra',
    name: 'Manacá-da-serra',
    scientific: 'Tibouchina mutabilis',
    bioma: 'mata-atlantica',
    svg: toDataUrl(manacaSvg),
    width: 200,
    height: 280,
  },
  {
    id: 'quaresmeira',
    name: 'Quaresmeira',
    scientific: 'Tibouchina granulosa',
    bioma: 'mata-atlantica',
    svg: toDataUrl(quaresmeiraSvg),
    width: 200,
    height: 280,
  },
  {
    id: 'heliconia',
    name: 'Helicônia',
    scientific: 'Heliconia psittacorum',
    bioma: 'mata-atlantica',
    svg: toDataUrl(heliconiaSvg),
    width: 200,
    height: 280,
  },
  {
    id: 'bromelia-imperial',
    name: 'Bromélia-imperial',
    scientific: 'Alcantarea imperialis',
    bioma: 'mata-atlantica',
    svg: toDataUrl(bromeliaSvg),
    width: 200,
    height: 280,
  },
  {
    id: 'sempre-viva',
    name: 'Sempre-viva',
    scientific: 'Syngonanthus nitens',
    bioma: 'cerrado',
    svg: toDataUrl(semprevivaS),
    width: 200,
    height: 280,
  },
  {
    id: 'ipe-amarelo',
    name: 'Ipê-amarelo',
    scientific: 'Handroanthus albus',
    bioma: 'pantanal',
    svg: toDataUrl(ipeAmarelSvg),
    width: 200,
    height: 280,
  },
  {
    id: 'orquidea-cattleya',
    name: 'Orquídea Cattleya',
    scientific: 'Cattleya labiata',
    bioma: 'amazonia',
    svg: toDataUrl(orquideaSvg),
    width: 200,
    height: 280,
  },
  {
    id: 'vitoria-regia',
    name: 'Vitória-régia',
    scientific: 'Victoria amazonica',
    bioma: 'pantanal',
    svg: toDataUrl(vitoriaRegiaSvg),
    width: 200,
    height: 200,
  },
  {
    id: 'mandacaru',
    name: 'Mandacaru',
    scientific: 'Cereus jamacaru',
    bioma: 'caatinga',
    svg: toDataUrl(mandacaruSvg),
    width: 200,
    height: 280,
  },
  {
    id: 'verbena-do-campo',
    name: 'Verbena-do-campo',
    scientific: 'Verbena bonariensis',
    bioma: 'pampa',
    svg: toDataUrl(verbenaSvg),
    width: 200,
    height: 280,
  },
];

export const VASES: Vase[] = [
  {
    id: 'barro',
    name: 'Vaso de barro',
    svg: toDataUrl(vasoBarro),
    width: 200,
    height: 240,
  },
  {
    id: 'ceramica',
    name: 'Cerâmica branca',
    svg: toDataUrl(vasoCeramica),
    width: 200,
    height: 240,
  },
  {
    id: 'macrame',
    name: 'Cachepô de macramê',
    svg: toDataUrl(cachepotMacrame),
    width: 200,
    height: 260,
  },
  {
    id: 'vidro',
    name: 'Vaso de vidro',
    svg: toDataUrl(vasoVidro),
    width: 200,
    height: 240,
  },
];

export const BIOMA_LABELS: Record<string, string> = {
  'todos': 'Todos',
  'mata-atlantica': 'Mata Atlântica',
  'cerrado': 'Cerrado',
  'amazonia': 'Amazônia',
  'caatinga': 'Caatinga',
  'pampa': 'Pampa',
  'pantanal': 'Pantanal',
};
