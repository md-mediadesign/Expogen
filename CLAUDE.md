Arbeite autonom bis die Aufgabe vollständig gelöst ist.
Treffe selbst sinnvolle Entscheidungen.
Unterbrich nur wenn wichtige Informationen fehlen oder eine Entscheidung Auswirkungen auf Architektur oder Datenbank hat.

# Webseitenerstellung

## Tech Stack
- Next.js 15 + TypeScript + Tailwind CSS
- Framer Motion für Animationen

## Design-Regeln
- Nutze das AskUserQuestion Tool, um den Nutzer über das Websitedesign zu interviewen, damit du die Vorstellungen des Nutzers genau abbilden kannst
- Nutze den frontend-design Skill für alle UI-Entscheidungen
- Nutze UI/UX Pro Max für Design-System-Generierung
- Nutze ggf. 21st.dev für Component-Inspiration (falls vorgegeben)
- Keine generischen AI-Aesthetics
- Bold, distinctive Design-Choices
- Performance-optimiert (Core Web Vitals)

# Projekt: Expogen

Expogen ist ein Tool für Immobilienmakler zur schnellen Erstellung von Immobilien-Exposés.

Der Fokus liegt aktuell auf:
- verschiedenen Exposé-Templates
- einfacher Anpassbarkeit des Designs
- klarer Trennung von Inhalt, Layout und Bildmaterial
- schneller Vorschau und Weiterentwicklung im Frontend

## Projektstruktur

Wichtige Dateien und Ordner:

- `index.html` = Einstiegspunkt / Vorschau / Hauptseite
- `template-a.js` = Exposé-Template A
- `template-b.js` = Exposé-Template B
- `template-c.js` = Exposé-Template C
- `demo/fotos/` = Demo-Bilder für Außen- und Innenansichten
- `CLAUDE.md` = Projektregeln für Claude

## Ziel des Projekts

Das Tool soll Immobilienmaklern ermöglichen:

1. Immobilienbilder und Inhalte einfach einzubinden
2. zwischen mehreren Exposé-Designs zu wählen
3. Designs schnell anzupassen
4. hochwertige, moderne und verkaufsstarke Exposé-Layouts zu erzeugen
5. später daraus ein produktives Makler-Tool zu entwickeln

## Arbeitsweise

Claude soll in diesem Projekt:

- bestehende Dateien zuerst analysieren, bevor Änderungen gemacht werden
- kleine, gezielte Änderungen bevorzugen
- vorhandene Template-Strukturen respektieren
- Design und Code so aufbauen, dass neue Templates leicht ergänzt werden können
- keine unnötig komplexen Frameworks einführen, wenn das Ziel mit der vorhandenen Struktur besser erreicht wird

## Design-Regeln

Dieses Projekt soll stark designorientiert weiterentwickelt werden.

Claude soll:

- Design-Änderungen so umsetzen, dass sie leicht anpassbar bleiben
- wiederverwendbare Stilregeln bevorzugen
- Layout, Farben, Typografie, Abstände und Bildwirkung bewusst gestalten
- hochwertige, moderne, seriöse und vertriebsstarke Makler-Optik bevorzugen
- darauf achten, dass Designs professionell und nicht generisch wirken

## Anpassbarkeit des Designs

Design muss schnell veränderbar sein.

Claude soll deshalb möglichst:

- Farben zentral definierbar machen
- Schriftgrößen und Abstände konsistent strukturieren
- wiederkehrende Layout-Blöcke modular aufbauen
- Template-Unterschiede klar trennen
- Design-Entscheidungen so umsetzen, dass ich sie später leicht ändern kann

Wenn eine Änderung die Designlogik stark beeinflusst, soll Claude mich vorher fragen.

## Wann Claude fragen soll

Claude soll mich fragen, bevor er fortfährt, wenn:

- mehrere Designrichtungen sinnvoll möglich sind
- die visuelle Linie des Projekts deutlich verändert wird
- Inhalte oder Strukturen entfernt werden
- neue Dateien oder neue Template-Systeme eingeführt werden
- unklar ist, ob die Änderung nur dieses Template oder alle Templates betreffen soll

## Inhaltliche Ausrichtung

Das Tool richtet sich an Immobilienmakler.

Daher soll Claude bei Layout und Textstruktur berücksichtigen:

- starke Präsentation von Immobilienbildern
- gute Lesbarkeit von Eckdaten
- hochwertige Darstellung von Lage, Ausstattung und Highlights
- vertrauenswürdige, professionelle Gesamtwirkung
- verkaufsfördernde Präsentation ohne übertriebene Effekte

## Bildmaterial

Die Bilder im Ordner `demo/fotos/` dienen als Demo- und Testmaterial.

Claude darf diese verwenden, um:
- Layouts zu testen
- Bildbereiche zu optimieren
- Template-Wirkung zu verbessern

## Technische Regeln

Claude soll:

- möglichst mit der vorhandenen HTML/JS-Struktur arbeiten
- unnötige Neuaufbauten vermeiden
- Änderungen nachvollziehbar halten
- bestehende Dateien nicht grundlos umbenennen
- nur dann neue Dateien anlegen, wenn es die Struktur wirklich verbessert

## Grundprinzip

Pragmatisch vor Perfektion.

Lieber ein sauberes, gut anpassbares Exposé-Tool für Makler,
als eine technisch überladene Lösung.
