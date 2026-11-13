# Boxencrew

Eine Mod für Claude Code: Solange Subagenten arbeiten, stehen sie als kleine, hüpfende Pixel-Figuren im Küstenwerk-Look (Asphalt, Gelb, Weiß) über dem Eingabefeld, gleichmäßig über die ganze Breite verteilt. Über jeder Figur steht ein Namensschild mit Rolle und Aufgabe. Fährt man mit der Maus darüber, zeigt sie, was der Agent gerade tut. Ist ein Agent fertig, verschwindet seine Figur.

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

## Installation

In einer Claude-Code-Sitzung im Terminal:

```
/plugin install boxencrew --marketplace kuestenwerk/boxencrew
```

Danach die Frage nach dem Marketplace mit `y` bestätigen und als Bereich „user“ wählen (Enter).

Aus einer Shell:

```bash
claude plugin install boxencrew --marketplace kuestenwerk/boxencrew
```

In der Desktop-App (dort läuft `/plugin` nicht): auf das + neben dem Eingabefeld klicken, dann Plugins, Add marketplace mit `kuestenwerk/boxencrew`, dann Add plugin.

## Anpassen

- Figuren: `hooks/figuren.ts`, je Rolle zwei Bilder aus 16 × 19 Pixeln (ein Zeichen = ein Pixel, Farben in `FARBE`).
- Welche Rolle ein Agent bekommt: `REGELN` in `hooks/figuren.ts`, die erste passende Regel auf den Agententyp gewinnt.
- Neue Rolle: Bild und Regel in `hooks/figuren.ts`, Name in `types/index.d.ts`.
- Prüfen: `claude plugin test .` und `claude plugin validate .`
