import type { Rolle } from '../types'

// Pixel-Figuren der Boxencrew: je Rolle zwei Bilder (A/B) aus 16 × 19 Pixeln,
// die im Takt wechseln, dazu ab und an ein Hüpfer. Ein Zeichen = ein Pixel.

export const FARBE: Record<string, string> = {
  S: '#F2C29A', // Haut
  s: '#C98E62', // Mund
  E: '#15171A', // Augen
  K: '#0E0F11', // Visier, Headset, Brille
  Y: '#FFC300', // Küstenwerk-Gelb
  y: '#B88A00',
  W: '#F4F4F4',
  w: '#B8BEC6',
  G: '#5C636B',
  g: '#3A3F45',
  D: '#262A2F', // Schuhe
  H: '#6B4226', // Haare
  T: '#454B53', // Reifen
  B: '#59C3F0', // Bildschirm
  R: '#D7263D', // Kanister
  O: '#F07A1A', // Streckenposten
  b: '#A0743C', // Klemmbrett
}

const UMRISS = '#15171A' // Asphalt

const zweites = (a: string[], aenderung: Record<number, string>) => a.map((zeile, i) => aenderung[i] ?? zeile)

const BEINE = (stoff: string) => [
  `....${stoff}${stoff}${stoff}..${stoff}${stoff}${stoff}....`,
  `....${stoff}${stoff}${stoff}..${stoff}${stoff}${stoff}....`,
  `....${stoff}${stoff}${stoff}..${stoff}${stoff}${stoff}....`,
  '...DDDD..DDDD...',
]

const MECHANIKER = [
  '................',
  '.....gggggg.....',
  '....ggggggggYYY.',
  '....SSSSSSSS....',
  '....SSSSSSSS....',
  '....SSESSESS....',
  '....SSSSSSSS....',
  '....SSSssSSS....',
  '.....SSSSSS.....',
  '...GGGGGGGGGG...',
  '..GGGGGGGGGGGG..',
  '..GGYYYYYYYYGG..',
  '..SGGGGGGGGGGS..',
  '....GGGGGGGG.w..',
  '....gggggggg.w..',
  '....GGG..GGGwww.',
  '....GYG..GYGw.w.',
  '....GGG..GGG....',
  '...DDDD..DDDD...',
]

const REIFENWECHSLER = [
  '................',
  '.....YYYYYY.....',
  '....YYYYYYYY....',
  '....YYYYYYYY....',
  '....YKKKKKKY....',
  '....YKWKKKKY....',
  '....YYYYYYYY....',
  '....YYYYYYYY....',
  '.....yyyyyy.....',
  '...WWWWYYWWWW...',
  '..WWWWWYYWWWWW..',
  '..WWYYYYYYYYWW..',
  '..wWWWWYYWWWWwgg',
  '....WWWYYWWW..g.',
  '.TT.gggggggg....',
  'TYwTWWW..WWW....',
  'TwwTWWW..WWW....',
  'TwYTWWW..WWW....',
  '.TT.DDD..DDD....',
]

const TEAMCHEF = [
  '................',
  '.....wwwwww.....',
  '....wHHHHHHw....',
  '...KHHHHHHHHK...',
  '...KSSSSSSSSK...',
  '...KSSESSESSK...',
  '...wSSSSSSSS....',
  '....wYSssSSS....',
  '.....SSSSSS.....',
  '...YYYYKKYYYY...',
  '..YYYYYYYYYYYY..',
  'bbbYYYYYYYYYYY..',
  'bWSYYYYYYYYYYS..',
  'bWb.YYYYYYYY....',
  'bbb.gggggggg....',
  ...BEINE('g'),
]

const RENNINGENIEUR = [
  '................',
  '.....HHHHHH.....',
  '....HHHHHHHH....',
  '....HSSSSSSH....',
  '....SSSSSSSS....',
  '....SKKSSKKS....',
  '....SSSSSSSS....',
  '....SSSssSSS....',
  '.....SSSSSS.....',
  '...GGGGYYGGGG...',
  '..GGggggggggGG..',
  '..GGgBBBBBBgGG..',
  '..SGgBWWBYBgGS..',
  '...wwwwwwwwww...',
  '....gggggggg....',
  ...BEINE('g'),
]

const LOLLIPOP = [
  '.............YY.',
  '.....WWWWWW.YYYY',
  '....WWWWWWWWYKKY',
  '....WWWWWWWWYYYY',
  '....SSSSSSSS.YY.',
  '....SSESSESS..w.',
  '....SSSSSSSS..w.',
  '....SSSssSSS..w.',
  '.....SSSSSS...S.',
  '...YYYYYYYYYYYY.',
  '..YYWYYYYYYWY...',
  '..WWWWWWWWWWW...',
  '..SYWYYYYYYWY...',
  '....YYYYYYYY....',
  '....gggggggg....',
  ...BEINE('g'),
]

const STRECKENPOSTEN = [
  '............W...',
  '.....HHHHHH.WYYY',
  '....HHHHHHHHWYYY',
  '....HSSSSSSHWYyY',
  '....SSSSSSSSWYYY',
  '....SSESSESSW...',
  '....SSSSSSSSW...',
  '....SSSssSSSW...',
  '.....SSSSSS.S...',
  '...OOOOOOOOOO...',
  '..OOOOOOOOOOO...',
  '..OOWWWWWWWWO...',
  '..SOOOOOOOOOO...',
  '....OOOOOOOO....',
  '....gggggggg....',
  ...BEINE('O'),
]

const TANKWART = [
  '................',
  '.....gggggg.....',
  '....gggYYggg....',
  '....gggYYggg....',
  '....gKWKKKKg....',
  '....gKKKKKKg....',
  '....gggggggg....',
  '....gggggggg....',
  '.....gggggg.....',
  '...wwwwwwwwww...',
  '..wwwwwwwwwwww..',
  '..wwYYYYYYYYww..',
  '..SwwwwwwwwwwS..',
  '....wwwwwwwwRRR.',
  '....ggggggggRYR.',
  '....www..wwwRRR.',
  '....www..www....',
  '....www..www....',
  '...DDDD..DDDD...',
]

// Je Rolle: Bild A, Bild B, Hüpf-Takt, Bild-Takt (verschieden, damit nicht alle gleichzeitig hüpfen).
export const SPRITES: Record<Rolle, { a: string[]; b: string[]; hopp: string; takt: string }> = {
  Teamchef: {
    a: TEAMCHEF,
    b: zweites(TEAMCHEF, {
      7: '....wySssSSS.S..',
      8: '.....SSSSSS..Y..',
      9: '...YYYYKKYYYYY..',
      11: 'bbbYYYYYYYYYY...',
      12: 'bWSYYYYYYYYYY...',
    }),
    hopp: '3.4s',
    takt: '1.2s',
  },
  Renningenieur: {
    a: RENNINGENIEUR,
    b: zweites(RENNINGENIEUR, { 5: '....SWKSSWKS....', 11: '..GGgBYBBWBgGG..', 12: '..SGgBBWWBBgGS..' }),
    hopp: '3s',
    takt: '1s',
  },
  Mechaniker: {
    a: MECHANIKER,
    b: zweites(MECHANIKER, {
      11: '..GGYYYYYYYYGG.w',
      12: '..SGGGGGGGGGGSww',
      13: '....GGGGGGGG...w',
      14: '....gggggggg....',
      15: '....GGG..GGG....',
      16: '....GYG..GYG....',
    }),
    hopp: '2.6s',
    takt: '.6s',
  },
  Reifenwechsler: {
    a: REIFENWECHSLER,
    b: zweites(REIFENWECHSLER, {
      12: '..wWWWWYYWWWWwgY',
      15: 'TwYTWWW..WWW....',
      17: 'TYwTWWW..WWW....',
    }),
    hopp: '2.2s',
    takt: '.4s',
  },
  'Lollipop-Mann': {
    a: LOLLIPOP,
    b: zweites(LOLLIPOP, { 2: '....WWWWWWWWYWWY' }),
    hopp: '3.8s',
    takt: '1.4s',
  },
  Streckenposten: {
    a: STRECKENPOSTEN,
    b: zweites(STRECKENPOSTEN, {
      1: '.....HHHHHH.W...',
      2: '....HHHHHHHHWYYY',
      3: '....HSSSSSSHWYYY',
      4: '....SSSSSSSSWYyY',
      5: '....SSESSESSWYYY',
    }),
    hopp: '2.8s',
    takt: '.5s',
  },
  Tankwart: {
    a: TANKWART,
    b: zweites(TANKWART, {
      13: '....wwwwwwww.RRR',
      14: '....gggggggg.RYR',
      15: '....www..www.RRR',
    }),
    hopp: '3.2s',
    takt: '.9s',
  },
}

// Zeile für Zeile: gleiche Nachbarn werden zu einem Rechteck zusammengefasst.
export function pixel(zeilen: string[]): string {
  let out = ''
  zeilen.forEach((zeile, y) => {
    let x = 0
    while (x < zeile.length) {
      const c = zeile[x]!
      let n = 1
      while (zeile[x + n] === c) n++
      if (c !== '.') out += `<rect x="${x}" y="${y}" width="${n}" height="1" fill="${FARBE[c]}"/>`
      x += n
    }
  })
  return out
}

const sichtbar = (werte: string, dur: string) =>
  `<animate attributeName="opacity" values="${werte}" calcMode="discrete" dur="${dur}" repeatCount="indefinite"/>`

// Dunkler Umriss um jede Figur, damit sie auf hellem wie dunklem Grund steht.
export function umriss(zeilen: string[]): string {
  const voll = (x: number, y: number) => (zeilen[y]?.[x] ?? '.') !== '.'
  let out = ''
  for (let y = -1; y <= zeilen.length; y++) {
    for (let x = -1; x <= 16; x++) {
      if (!voll(x, y) && (voll(x - 1, y) || voll(x + 1, y) || voll(x, y - 1) || voll(x, y + 1))) {
        out += `<rect x="${x}" y="${y}" width="1" height="1" fill="${UMRISS}"/>`
      }
    }
  }
  return out
}

// Ein Platz im Streifen je Figur: Namensschild oben, Figur steht unten auf dem Eingabefeld.
export const SLOT = 72
export const HOEHE = 92
const PIXEL = 3
const OBEN = 28 + PIXEL // erste Sprite-Zeile, eine Zeile Platz für den Umriss

export type Platz = { rolle: Rolle; aufgabe: string; taetigkeit: string }

const xml = (t: string) => t.replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`)
const kuerzen = (t: string, n: number) => (t.length > n ? `${t.slice(0, n - 1)}…` : t)

// Eine Figur, gezeichnet um ihre Mitte (x = 0); band() setzt sie prozentual.
function figur(p: Platz): string {
  const { a, b, hopp, takt } = SPRITES[p.rolle]
  const x0 = -SLOT / 2
  const sx = -(16 * PIXEL) / 2
  return (
    `<g><title>${xml(`${p.rolle}: ${p.aufgabe} · ${p.taetigkeit}`)}</title>` +
    `<rect x="${x0 + 2}" y="0" width="${SLOT - 4}" height="22" rx="4" fill="${UMRISS}"/>` +
    `<text x="0" y="9" fill="${FARBE.Y}" font-size="7.5" font-weight="700">${xml(p.rolle)}</text>` +
    `<text x="0" y="18.5" fill="${FARBE.W}" font-size="7">${xml(kuerzen(p.aufgabe, 15))}</text>` +
    `<rect x="${sx + 4 * PIXEL}" y="${OBEN + 19 * PIXEL}" width="${8 * PIXEL}" height="${PIXEL}" fill="#000" opacity=".3"/>` +
    `<g transform="translate(${sx} ${OBEN}) scale(${PIXEL})" shape-rendering="crispEdges"><g>` +
    `<animateTransform attributeName="transform" type="translate" values="0 0;0 -1;0 -2;0 -1;0 0" keyTimes="0;.78;.84;.9;.96" calcMode="discrete" dur="${hopp}" repeatCount="indefinite"/>` +
    `<g>${sichtbar('1;0', takt)}${umriss(a)}${pixel(a)}</g>` +
    `<g opacity="0">${sichtbar('0;1', takt)}${umriss(b)}${pixel(b)}</g>` +
    `</g></g></g>`
  )
}

// Die Desktop-App zeichnet das Bild in einem Rahmen mit max-width:100% und streckt
// das <svg> auf dessen volle Breite. Ohne viewBox und mit Prozent-Positionen verteilen
// sich die Figuren gleichmäßig über das ganze Eingabefeld, ohne zu skalieren.
export const BREITE_MAX = 4096 // Obergrenze der App für Svg-Breiten

export function band(plaetze: Platz[]): string {
  const n = plaetze.length
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="${HOEHE}" ` +
    `font-family="-apple-system, system-ui, sans-serif" text-anchor="middle">` +
    plaetze
      .map((p, i) => `<svg x="${(((i + 0.5) / n) * 100).toFixed(3)}%" y="0" width="1" height="${HOEHE}" overflow="visible">${figur(p)}</svg>`)
      .join('') +
    `</svg>`
  )
}

// ponytail: Rolle per Namensmuster des Agententyps, erste Regel gewinnt; Unbekanntes wird Mechaniker.
const REGELN: [RegExp, Rolle][] = [
  [/plan|strateg|council|orchestr/, 'Teamchef'],
  [/review|verif|check|judge|test/, 'Lollipop-Mann'],
  [/scan|secur|audit|drift|monitor|seo/, 'Streckenposten'],
  [/research|guide|analy|data|google|bing|ahrefs|maps/, 'Renningenieur'],
  [/explore|search|find|inventory|loader|backlink/, 'Reifenwechsler'],
  [/fork/, 'Tankwart'],
]

export function rolle(typ: string): Rolle {
  const t = typ.toLowerCase()
  return REGELN.find(([muster]) => muster.test(t))?.[1] ?? 'Mechaniker'
}
