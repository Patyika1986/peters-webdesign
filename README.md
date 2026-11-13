# peters webdesign

Unternehmenswebseite für Peter Lakatos, Nürnberg, mit zehn vollständigen interaktiven Branchenbeispielen. HTML5, CSS3 und JavaScript; keine Build-Abhängigkeiten oder externen Laufzeitbibliotheken.

## Starten

Im GitHub-Checkout `python3 -m http.server 8000` ausführen und `http://localhost:8000` öffnen. Die Hauptseite ist `index.html`, die Sammlung `beispiele/index.html`. Beim Sites-Quellrepository liegt die auszuliefernde Webseite stattdessen unter `dist/`.

## Hauptseite

Webdesign, Hosting, Wartung, Google-Unternehmensprofil und Google Ads. Landingpages, Website-Texte und Inhaltspflege sind separate Angebote nach individuellem Umfang. Webseitenpakete, Laufzeit, Steuerangaben und Einrichtungspreis sind transparent beschrieben.

## Zehn vollständige Branchenbeispiele

Jedes Beispiel umfasst sieben Abschnitte mit eigenen Inhalten, einer individuellen Designrichtung, einer Brancheninteraktion und einem Kontaktformular. Alle Marken und Betriebskonzepte sind fiktiv; keine Kundenreferenzen.

| Beispiel | Datei | Interaktion |
|---|---|---|
| Reinigung / klarraum | [Öffnen](beispiele/reinigung/index.html) | Reinigungsplaner |
| Friseur / NUANCE | [Öffnen](beispiele/friseur/index.html) | Salon-Leistungsstudio |
| Restaurant / CASA LIMONE | [Öffnen](beispiele/restaurant/index.html) | Speisekarten- und Vegetarischfilter |
| Handwerk / WERKSTÜCK | [Öffnen](beispiele/handwerk/index.html) | Räumliches Materialstudio |
| Architektur / LINIE / RAUM | [Öffnen](beispiele/architektur/index.html) | Entwurfsgalerie |
| Notariat / SIEGEL | [Öffnen](beispiele/notar/index.html) | Organisatorischer Themenwegweiser |
| Anwaltskanzlei / KONTUR RECHT | [Öffnen](beispiele/anwalt/index.html) | Anliegenauswahl |
| Physiotherapie / VIVA BEWEGUNG | [Öffnen](beispiele/physiotherapie/index.html) | Bewegungsthemen ohne medizinische Beratung |
| Immobilienvermittlung / AURA IMMOBILIEN | [Öffnen](beispiele/immobilien/index.html) | Objektfilter und temporäre Merkliste |
| Kfz-Werkstatt / DREHMOMENT | [Öffnen](beispiele/kfz/index.html) | Service-Checkliste |

## Formulare

Die Formulare validieren Eingaben im Browser und erstellen eine überprüfbare Anfragevorschau. Der anschließende E-Mail-Link öffnet ausdrücklich einen Entwurf an `pdfsr@outlook.com` für eine Webdesign-Anfrage an Peter Lakatos. Nutzer versenden die Nachricht selbst in ihrem E-Mail-Programm. Es gibt keinen Serverversand, keine Speicherung von Leads und keine tatsächliche Terminbuchung oder Bestellung. Alternativ kann der Text bewusst in die Zwischenablage kopiert werden. Bei Änderungen wird eine alte Vorschau verworfen.

Die Demos vermitteln keine Fachleistungen und nehmen keine Gesundheitsdaten, juristischen Fristen oder vertraulichen Dokumente entgegen. Notariats-, Kanzlei- und Physiotherapietexte enthalten keine Fachberatung. Immobilien und Speisekarten sind ausdrücklich als frei erfundene Beispiele markiert.

## Barrierearme Bedienung und Bewegung

Responsive Layouts, beschriftete Formulare, native Validierung, sichtbare Tastaturfokusse, überspringbare Navigation, Escape für das Mobilmenü und Statusmeldungen für interaktive Auswahlen. Animationen lassen sich pausieren; `prefers-reduced-motion` wird auch bei geänderter Systemeinstellung beachtet. Dies ist keine Zusage einer vollständigen Konformität mit einem bestimmten Barrierefreiheitsstandard.

## Bilder

Die Unsplash-Fotografien werden lokal unter `beispiele/assets/` ausgeliefert. Quellen stehen in `beispiele/bildquellen.html` und `beispiele/assets/bildquellen.json`. Keine externen Bildabrufe durch Besucher und keine externen Schriftarten oder Tracker. Vor Übernahme für eine reale Marke Bild- und Namensrechte prüfen.

## Prüfen

Python 3 und Node.js genügen:

```sh
python3 tests/verify-site.py
node tests/interactions.cjs
node --check script.js
node --check beispiele/assets/demos.js
```

Die Strukturprüfung kontrolliert HTML-Verschachtelung, eindeutige IDs, lokale Links, Assets und Formulare. Die DOM-Simulation prüft die zehn Brancheninteraktionen, Menü, reduzierte Bewegung, Pflichtfelder, Vorschau, Empfänger und das Verwerfen alter Formulardaten. Die Simulation ist kein visueller Browsertest. Eine visuelle Browserprüfung war in der Erstellungssitzung mangels Browsersteuerung nicht möglich.

## Vor tatsächlichem Geschäftseinsatz

Impressum und Datenschutz sind Entwürfe. Vollständige Geschäftsanschrift, gegebenenfalls Umsatzsteuer- und Registerangaben sowie tatsächliches Hosting ergänzen und rechtlich prüfen. Für die fiktiven Branchenbeispiele müssen bei einer realen Übernahme die jeweiligen tatsächlichen Anbieter-, Berufs-, Leistungs-, Preis- und sonstigen Pflichtangaben ergänzt werden. Für direkten Formularversand wäre ein tatsächlicher Versanddienst mit entsprechend angepassten Datenschutzhinweisen einzurichten.

## Lesbarkeit

Laufende Texte verwenden die lokal ausgelieferte Schrift Atkinson Hyperlegible. Kleine Hinweise und Beschriftungen sind vergrößert, Links und Bedienelemente erhalten mehr Platz. Die Lizenz der Schrift liegt unter `assets/fonts/OFL.txt` (im Sites-Quellrepository unter `dist/assets/fonts/OFL.txt`).

## Eigenständige Branchenlayouts

Die zehn Branchenbeispiele haben separate HTML-Kompositionen und jeweils eine eigene `design.css` im Branchenordner. Das frühere gemeinsame Branchen-Design wird von keiner Branchenseite mehr geladen. `beispiele/assets/foundation.css` enthält ausschließlich gemeinsame Grundlagen für Lesbarkeit, Bedienung und Formulare. Die Interaktionslogik bleibt in `beispiele/assets/demos.js`.

- Reinigung: Raumplan-Dashboard, tabellarische Leistungen, Pflegeplan
- Friseur: Magazin-Cover, editoriale Leistungszeilen, dunkles Look-Studio
- Restaurant: mediterrane Teller-Inszenierung, zweispaltige Speisekarte, Reservierungsticket
- Handwerk: Werkbuch, aufklappbare Werkfelder, räumliches Materiallabor
- Architektur: Seitenindex, großformatige Projektgalerie, versetzte Kompetenzfelder
- Notariat: Buch- und Dokumentgestaltung, Themenkapitel, Korrespondenzbogen
- Kanzlei: typografisches Manifest, Themenbänder und Mint-Kontrast
- Physiotherapie: organische Komposition, Bewegungswelten und Themenpfad
- Immobilien: Immobilienjournal, Suchdock und unterschiedlich gewichtete Objektübersicht
- Kfz: technische Service-Konsole mit dynamischer Rundanzeige

Die responsive Gestaltung und die reduzierte Bewegung sind in jeder eigenen Layoutdatei berücksichtigt. Eine visuelle Browserprüfung bleibt offen; die Code- und DOM-Prüfungen ersetzen sie nicht.
