# Übergabe und öffentlicher Start

## Fertig vorbereitet

- Kürzere Startseite mit getrennten Leistungsseiten für Webdesign, Unternehmensprofil und Google Ads.
- Vier fokussierte Kampagnen-Zielseiten, persönliche Seite, zentrale Projektanfrage und Wissensübersicht.
- Vorhandene zehn Branchenlayouts und alle Ratgeber erhalten.
- Bestätigte Anschrift, Kontakt und USt-IdNr. im Impressum und in strukturierten Unternehmensdaten.
- Serverfunktion für tatsächliche Anfragezustellung über Resend, mit Validierung, Herkunftsprüfung, Größenbegrenzung, Spamfalle, standardmäßig erforderlicher Turnstile-Prüfung und Idempotenz-Schlüssel.
- Keine erfolgreiche Versandmeldung bei fehlenden Zugangsdaten oder Providerfehler. E-Mail-Entwurf als transparenter Ersatzweg.
- Google-Ads-Consent-Mode-Grundlage: standardmäßig verweigert, keine Google-Bibliothek vor gültiger freiwilliger Zustimmung und vollständiger Aktivierung. Kontakt funktioniert unabhängig von Marketingzustimmung.
- Dynamische Canonical-/Open-Graph-Metadaten, Unternehmensdaten, Sitemap und Robots-Steuerung für die später bestätigte Domain.
- Offline-Anzeigenentwürfe und Generator; nichts geschaltet.

## Noch vom Inhaber zu bestätigen oder bereitzustellen

### Eigene Domain

`pdfsr.de` zeigt den bestehenden Reinigungsservice. Diese Seite und ihre DNS-Einträge werden nicht ersetzt. Noch offen ist eine separate Domain für peters webdesign oder ein ausdrücklich gewünschter zusätzlicher Bereich. Erst nach einer konkreten Domainentscheidung eine Domain in Sites hinzufügen und die dort tatsächlich zurückgegebenen DNS- und Zertifikatsprüfungen beim DNS-Anbieter einrichten. Keine Ziel-IP oder CNAME erfinden. Vorher prüfen, dass bestehende Website und E-Mail nicht unterbrochen werden.

Die Site bleibt privat. Ein öffentlicher Zugang wird nicht stillschweigend aus einer Domainnennung abgeleitet. Vor Ads muss die spätere Zielseite öffentlich ohne Anmeldung erreichbar sein.

### Persönliches Originalfoto

Das über GitHub main bereitgestellte `profilbild.jpeg` wurde am 14.11.2026 bytegenau als `public/assets/peter-lakatos-original.jpg` eingebaut. Startseite und persönliche Seite zeigen das vollständige Original proportional: keine generative Bearbeitung, Filter oder Beschnitt. Die Dateigleichheit wird per SHA-256 geprüft.

Die Originaldatei unverändert einbauen:

```sh
node scripts/install-portrait.mjs /absoluter/pfad/zum/original.jpg
```

Der Helfer kopiert Bytes unverändert und verifiziert den SHA-256-Wert. Die CSS-Klasse skaliert proportional mit `height:auto` und `object-fit:contain`; kein Crop und kein Filter.

### Direktversand

Im Sites-Einstellungsbereich tatsächliche Versanddaten hinterlegen, niemals in Git oder Chat:

- `RESEND_API_KEY`: API-Schlüssel des vom Inhaber eingerichteten Versandkontos.
- `CONTACT_FROM`: bestätigte Absenderadresse auf einer für den Versand freigegebenen Domain.
- `CONTACT_TO`: `pdfsr@outlook.com` ist als Ziel voreingestellt.
- `PUBLIC_TURNSTILE_SITE_KEY` und `TURNSTILE_SECRET_KEY`: für die tatsächliche Domain eingerichtete Turnstile-Schlüssel.
- `CONTACT_PRIVACY_READY=true`: erst nach Ergänzung und Prüfung der tatsächlichen Versand-/Spamprüfungsanbieter, Auftragsverarbeitung, Empfänger, Speicherfristen und Übermittlungsgrundlagen.
- `CONTACT_DELIVERY_ENABLED=true`: erst wenn Konfiguration und Test bereit sind.

`CONTACT_REQUIRE_CHALLENGE` bleibt standardmäßig aktiv. Der optionale Wert `false` ist ausschließlich für bewusst kontrollierte lokale Tests gedacht, nicht die empfohlene öffentliche Konfiguration. Der zusätzliche Rate-Guard arbeitet nur je Worker-Isolate; für produktiven Missbrauchsschutz geeignete Plattformregeln und die aktivierte Turnstile-Prüfung berücksichtigen.

Vor Ads eine Testanfrage übermitteln und den tatsächlichen Eingang im Zielpostfach prüfen. Die API kann nur bestätigen, dass der Versanddienst angenommen hat; das ist keine Zustellgarantie. Keine automatischen Antwort-E-Mails oder Newsletter werden versendet.

### Domain, Indexierung und Search Console

- `PUBLIC_SITE_ORIGIN`: die echte bestätigte HTTPS-Domain ohne Pfad.
- `PUBLIC_LEGAL_READY=true`: erst nach abschließender Prüfung der Anbieter-/Datenschutzangaben.
- `PUBLIC_INDEXABLE=true`: erst für den tatsächlich öffentlichen und freigegebenen Auftritt.
- `PUBLIC_SEARCH_CONSOLE_TOKEN`: optionaler tatsächlicher HTML-Verifikationstoken; alternativ DNS-Verifizierung manuell durchführen.

Ohne Domain, Rechtsfreigabe und Indexierungsflag bleiben Robots/Sitemap gesperrt. Die private Zugriffskontrolle bleibt zusätzlich bestehen. Branchen-Demos, Kampagnen-Landingpages, Kontaktbestätigung und Rechtstextentwürfe werden nicht in die Haupt-Sitemap aufgenommen. Landingpages können bei öffentlicher Erreichbarkeit für Anzeigen verwendet werden, obwohl sie `noindex` sind.

### Google-Messung

- `PUBLIC_ADS_ID`: tatsächliche Kennung im Format `AW-...`.
- `PUBLIC_ADS_LEAD_LABEL`: Label der tatsächlich im Ads-Konto eingerichteten Lead-Aktion.
- `PUBLIC_MARKETING_ENABLED=true`: erst nach Rechtsprüfung, korrekten IDs und bestandenem Einwilligungs-/Conversion-Test.

Erforderliche Einwilligungssignale werden differenziert gesetzt. Analytics und Anzeigenpersonalisierung bleiben verweigert; keine erweiterten Conversions oder Remarketing-Funktionen sind aktiviert. Keine Namen, E-Mail-Adressen, Telefonnummern, Nachrichtentexte oder Formularinhalte werden als Google-Ereignisparameter übergeben. Eine eigene Einwilligungssteuerung ist vorbereitet, aber kein Zertifikat für rechtliche Konformität; den endgültigen Aufbau mit einem passenden Verfahren/CMP prüfen.

## Ablauf der Freigabe

1. Domainentscheidung klären.
2. Öffentlichen Host und Datenschutzangaben abschließen.
3. Versand- und Turnstile-Konfiguration setzen, Testzustellung prüfen.
4. Echte Domain verbinden; Zertifikat und Umleitungen prüfen.
5. Visuellen Browsercheck durchführen (siehe `QA.md`).
6. Veröffentlichung ausdrücklich freigeben; Sites-Zugriff nur auf Wunsch ändern.
7. Search Console prüfen und Sitemap der echten Domain einreichen.
8. Google-Ads-Entwürfe mit echter Domain neu erzeugen, Konto-/Budget-/Conversionprüfung durchführen und erst dann gezielt aktivieren.
