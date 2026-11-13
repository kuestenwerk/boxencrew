// Erzeugt docs/crew.svg (animiertes Bild aller Figuren für die README).
// Aufruf im Repo-Ordner: node docs/bild-erzeugen.mts   (Node 23.6 oder neuer)
import { writeFileSync } from 'node:fs'

import { band, HOEHE, SPRITES } from '../hooks/figuren.ts'
import type { Rolle } from '../types'

const BEISPIEL: Record<Rolle, string> = {
  Teamchef: 'Kommandostand',
  Renningenieur: 'Doku nachschlagen',
  Mechaniker: 'Login-Seite bauen',
  Reifenwechsler: 'Dateien suchen',
  'Lollipop-Mann': 'Code-Review',
  Streckenposten: 'Sicherheits-Scan',
  Tankwart: 'Fork mit Kontext',
}

const rollen = Object.keys(SPRITES) as Rolle[]
const breite = rollen.length * 96
const innen = band(rollen.map(rolle => ({ rolle, aufgabe: BEISPIEL[rolle], taetigkeit: 'arbeitet' })))

// band() nimmt die volle Breite (100 %); hier bekommt es eine feste Breite für <img>.
const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${breite}" height="${HOEHE}" viewBox="0 0 ${breite} ${HOEHE}">` +
  innen +
  `</svg>`

writeFileSync(new URL('./crew.svg', import.meta.url), svg)
console.log(`docs/crew.svg: ${rollen.length} Figuren, ${breite} × ${HOEHE} px, ${svg.length} Zeichen`)
