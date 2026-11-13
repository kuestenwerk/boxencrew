# Boxencrew

Eine Mod für Claude Code: Solange Subagenten arbeiten, stehen sie als kleine, hüpfende Pixel-Figuren im Renndesign-Look über dem Eingabefeld.

![Die sieben Figuren der Boxencrew mit Namensschild: Teamchef, Renningenieur, Mechaniker, Reifenwechsler, Lollipop-Mann, Streckenposten, Tankwart](docs/crew.svg)

## Installation

**In einer Claude-Code-Sitzung im Terminal:**

```
/plugin install boxencrew --marketplace kuestenwerk/boxencrew
```

Die Frage nach dem Marketplace mit `y` bestätigen, dann als Bereich „user“ wählen (Enter). Die Mod läuft sofort und in jeder neuen Sitzung.

**Aus einer Shell:**

```bash
claude plugin install boxencrew --marketplace kuestenwerk/boxencrew
```

Gilt ab der nächsten neuen Claude-Code-Sitzung.

**In der Desktop-App** (dort läuft `/plugin` nicht): auf das + neben dem Eingabefeld klicken, dann Plugins, Add marketplace mit `kuestenwerk/boxencrew`, dann Add plugin.

**Aktualisieren:** `claude plugin update boxencrew@boxencrew`, danach neue Sitzung.
**Entfernen:** `claude plugin uninstall boxencrew@boxencrew`

## Was sie zeigt

Die Figuren verteilen sich gleichmäßig über die ganze Breite des Eingabefelds. Über jeder Figur steht ein Namensschild mit Rolle und Aufgabe, beim Überfahren mit der Maus zeigt sie, was der Agent gerade tut. Ist ein Agent fertig, verschwindet seine Figur.

| Figur | Wer |
|---|---|
| Teamchef | die Hauptsitzung (solange die Crew draußen ist) und Plan-Agenten |
| Mechaniker | alles, was baut (Standard) |
| Reifenwechsler | Such-Agenten (Explore) |
| Lollipop-Mann | Reviewer und Prüfer |
| Streckenposten | Scans, Audits, SEO |
| Renningenieur | Recherche und Anleitungen |
| Tankwart | Forks |

Im Terminal erscheint statt der Bilder eine Textzeile je Figur.

## Anpassen

- Figuren: `hooks/figuren.ts`, je Rolle zwei Bilder aus 16 × 19 Pixeln (ein Zeichen = ein Pixel, Farben in `FARBE`).
- Welche Rolle ein Agent bekommt: `REGELN` in `hooks/figuren.ts`, die erste passende Regel auf den Agententyp gewinnt.
- Neue Rolle: Bild und Regel in `hooks/figuren.ts`, Name in `types/index.d.ts`.
- Prüfen: `claude plugin test .` und `claude plugin validate .`
- Bild oben neu erzeugen: `node docs/bild-erzeugen.mts` (Node 23.6 oder neuer).
