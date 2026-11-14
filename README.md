# peters webdesign

HTML5/CSS3/JavaScript-Auftritt für Peter Lakatos aus Nürnberg, deutschlandweit tätig. Persönliche Unternehmenswebseite, drei eigenständige Leistungsseiten, vier Kampagnen-Zielseiten, Ratgeber, zentrale Projektanfrage und zehn vollständig unterschiedliche Branchenbeispiele.

## Projektstruktur

- `public/`: auszuliefernde HTML-, CSS-, JavaScript- und Bilddateien
- `server/contact.mjs`: serverseitige Anfragezustellung (Resend), derzeit ohne aktive Zugangsdaten
- `server/worker.mjs`: Laufzeitkonfiguration, Auslieferung, Robots, Sitemap und Metadaten
- `scripts/build.mjs`: deterministischer, abhängigkeitenfreier Worker-Build
- `scripts/prepare_ads.py`: Offline-Generator für pausierte Ads-Entwürfe
- `scripts/install-portrait.mjs`: unveränderte Originaldatei bytegenau einbauen
- `tests/`: Inhalt, Preise, Interaktionen, Backend und Einwilligung
- `docs/RELEASE.md`: Aktivierung, Domain, Rechtsangaben und offene Inhaberentscheidungen
- `docs/ads/START.md`: Kampagnenplan, Zielseiten, Messung und Konto-Freigabe
- `docs/QA.md`: Prüfungen und Grenze der fehlenden visuellen Browserprüfung

Node.js ab 22 genügt für den Worker-Build und die Node-Tests; Python 3 für Inhalts-/Preisprüfungen und CSV-Vorbereitung. Keine Laufzeitpakete zu installieren.

```sh
npm run build
npm run dev
npm test
npm run check:content
python3 scripts/prepare_ads.py --draft
```

`npm run dev` stellt die gebaute Fassung lokal unter `http://127.0.0.1:4174` bereit. Der Entwicklungsserver wurde hier nicht gestartet, da die Sites-Browsersteuerung fehlt.

Ein statischer Server mit dem Dokumentenstamm `public/` eignet sich für die reine Darstellung; die API ist dort nicht aktiv. Für den tatsächlichen Direktversand und dynamische Laufzeitfunktionen das Worker-Artefakt in Sites bereitstellen. Die primäre Veröffentlichung bleibt auf derselben Site-ID in `.openai/hosting.json`.

## Aktueller Status

Der Auftritt bleibt privat. Es wurden keine DNS-Einträge verändert und weder Werbung geschaltet noch Werbebudget ausgegeben. Direktversand, Turnstile und Google-Messung sind vorbereitet, aber ohne Schlüssel und Freigaben deaktiviert. Die Anfrage bietet bis zur Aktivierung transparent einen selbst zu versendenden E-Mail-Entwurf an. Keine Anfrage wird bei einem technischen Fehler als erfolgreich ausgegeben.

Domainentscheidung, Versandkonfiguration und finale Datenschutzangaben sind offen. Ein Originalfoto darf nach ausdrücklicher Vorgabe ausschließlich proportional angezeigt werden, ohne generative Bearbeitung, Filter oder Crop. Eine generativ bearbeitete Zwischenfassung wurde nicht veröffentlicht und liegt nicht in den Website-Assets. Für den Einbau fehlt die Originaldatei im ausführenden Dateisystem; bisher nur Chat-Vorschau.

## Leistungen und Preise

| Webseitenpaket | Monat netto | Einrichtung netto | Gesamt 24 Monate netto | Gesamt inkl. 19 % USt. |
|---|---:|---:|---:|---:|
| Onepager | 50 € | 299 € | 1.499 € | 1.783,81 € |
| Bis fünf Seiten | 70 € | 499 € | 2.179 € | 2.593,01 € |

24 Monate Mindestlaufzeit, danach gehört die Webseite dem Kunden; Betreuung freiwillig verlängerbar. Landingpages, Website-Texte, Inhaltspflege und Google-Leistungen separat.

| Google-Leistung | Monat netto | Einrichtung netto |
|---|---:|---:|
| Profil-Start / ein Standort | – | 249 € einmalig |
| Profil-Aktiv | 149 € | 249 € |
| Profil-Plus | 229 € | 249 € |
| Ads-Start | 299 € | 399 € |
| Ads-Plus | 449 € | 599 € |

Alle Dienstleistungspreise zuzüglich 19 % USt.; Website zeigt Bruttopreise. Bereits beauftragter Profil-Start wird nicht doppelt berechnet, wenn kein erneuter Aufbau nötig ist. Laufende Google-Betreuung: drei Monate Mindestlaufzeit, danach monatlich kündbar. Das Unternehmensprofil selbst ist kostenlos. Ads-Werbebudget separat direkt an Google. Keine Platzierungs-, Lead- oder Umsatzgarantien.

## Branchenkollektion

Reinigung (Raumplan-Dashboard), Friseur (Modemagazin), Restaurant (mediterrane Speisekarte), Handwerk (Werkbuch/Materiallabor), Architektur (Galerie mit Seitenindex), Notariat (Dokumentgestaltung), Kanzlei (typografisches Manifest), Physiotherapie (organischer Themenpfad), Immobilien (Journal/Objektkollektion), Kfz (Service-Konsole). Jede Seite hat sieben Inhaltsbereiche, eigenes Layout, eigene Farben und ein Demo-Kontaktformular. Marken, Fachangebote und Beispielpreise sind fiktiv und keine Kundenreferenzen. Rechtliche/medizinische Fachleistungen werden nicht vermittelt.

## Daten, Bilder und Schriften

Keine Zugangsdaten in Git. `.env.example` enthält nur leere Namen und deaktivierte Vorgaben; reale Werte gehören in Sites-Laufzeiteinstellungen. Lokale Schrift Atkinson Hyperlegible mit Lizenz unter `public/assets/fonts/OFL.txt`. Illustrative Unsplash-Bilder werden lokal ausgeliefert; Quellen unter `public/beispiele/bildquellen.html`.

Die HTML-Inhalte behalten große Schrift, gut erreichbare Links und reduzierte Bewegung. Ein vollständiger Konformitätsnachweis zu einem bestimmten Barrierefreiheitsstandard wird nicht behauptet. Visuelle Browserprüfung noch offen; siehe `docs/QA.md`.
