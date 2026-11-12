# peters webdesign

Responsive Unternehmenswebseite für Peter Lakatos aus Nürnberg. HTML5, CSS3 und JavaScript ohne Build-Abhängigkeiten und ohne externe Laufzeitbibliotheken.

## Gestaltungsrichtung

Heller, großzügiger Auftritt mit klarer Typografie, weichen Farbverläufen und einer interaktiven Geräteinszenierung. Eigenständige Designbeispiele; keine übernommenen Logos oder Kundenreferenzen.

## Interaktionen

- Scrollabhängige Desktop-/Smartphone-Inszenierung auf großen Bildschirmen
- Live-Branchenvorschau für Studio, Handwerk und Beratung
- Umschaltung zwischen Desktop- und Smartphone-Ansicht
- Dezente Reaktion auf Zeigerbewegungen
- Animationspause und dynamische Berücksichtigung von `prefers-reduced-motion`
- Kompakte mobile Darstellung ohne lange Scroll-Szene
- Mobilmenü, FAQ und direkte Kontaktlinks

## Starten

`index.html` im Browser öffnen oder `python3 -m http.server 8000` im Projektverzeichnis ausführen und `http://localhost:8000` aufrufen.

## Dateien

- `index.html`: Startseite, Live-Vorschau, Leistungen, Referenz, Preise und Kontakt
- `style.css`: responsives Design, Gerätemodelle und Animationen
- `script.js`: Interaktionen, Scroll-Szenen und Bewegungssteuerung
- `impressum.html`, `datenschutz.html`: Rechtstextentwürfe mit Platzhaltern

## Vor öffentlichem Einsatz

Vollständige Geschäftsanschrift, gegebenenfalls Umsatzsteuer- und Registerangaben sowie tatsächliche Hosting- und Datenschutzangaben ergänzen und rechtlich prüfen. Der Einrichtungspreis wird individuell vor Beauftragung vereinbart.

## Prüfung

JavaScript-Syntax und interne Links geprüft. Menü, Escape-Taste, Branchenwechsel auf beiden Geräten, Gerätewahl, Statusmeldungen, Scrollberechnung, Animationspause und reduzierte Bewegung wurden in einer DOM-Simulation geprüft. Eine visuelle Browserprüfung war in der Erstellungssitzung mangels Browsersteuerung nicht möglich.
