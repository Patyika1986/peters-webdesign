# Google Ads: vorbereitet, noch nicht geschaltet

Stand: 14. November 2026. Keine Anmeldung an einem Google-Ads-Konto, kein Import, keine Aktivierung und keine Ausgabe wurden durchgeführt. Die CSV-Dateien sind Offline-Entwürfe.

## Empfohlener Start

Zuerst eine Suchkampagne für Webdesign in Nürnberg und dem abgestimmten tatsächlichen Zielgebiet testen. Die Website-Leistungen sind deutschlandweit möglich; eine bundesweite Ausspielung ist damit nicht automatisch wirtschaftlich. Profilbetreuung und Ads-Betreuung sind als spätere eigene Kampagnen vorbereitet. Das Budget nicht unbesehen auf drei kleine Kampagnen verteilen.

Als reine Rechengröße: 20 € durchschnittliches Tagesbudget entsprechen bei 30,4 Tagen 608 € pro Monat. Das ist kein zugesagtes Ergebnis und keine Budgetfreigabe. Geeignetes Budget und Zielgebiet werden mit Peter festgelegt. Tagesausgaben können schwanken; aktuelle Google-Budgetregeln vor Aktivierung prüfen.

## Entwurfsstruktur

| Kampagne | Anzeigengruppen | Zielseiten |
|---|---|---|
| Webdesign / Nürnberg | Onepager, Unternehmenswebseite | `/kampagnen/webdesign-nuernberg.html`, `/kampagnen/firmenwebseite.html` |
| Unternehmensprofil / Deutschland | Einrichtung, Betreuung | Profil-Leistungsseite, `/kampagnen/google-profil.html` |
| Ads Betreuung / Deutschland | Suchkampagnen-Betreuung | `/kampagnen/google-ads-betreuung.html` |

5 responsive Suchanzeigen mit jeweils 15 Titeln (höchstens 30 Zeichen) und 4 Beschreibungen (höchstens 90 Zeichen), 42 positive Keywords in Exact/Phrase-Varianten, negative Keyword-Vorschläge, Sitelinks und Zusatzinformationen sind vorbereitet. Preise und Mindestlaufzeiten stehen auf den jeweils passenden Zielseiten. Keine erfundenen Zertifizierungen, Erfolge oder Partner-Status.

## CSV-Dateien erzeugen

Die eingecheckten Entwürfe enthalten absichtlich die nicht erreichbare Platzhalter-Domain `DOMAIN-ERGAENZEN.invalid`. Budgets bleiben leer. Vor einem Kontoimport mit der tatsächlich bestätigten eigenen Domain neu erzeugen:

```sh
python3 scripts/prepare_ads.py --origin https://IHRE-BESTAETIGTE-DOMAIN.de --output /tmp/peters-ads-review
```

Der Generator lädt nichts hoch. Alle Kampagnen, Anzeigengruppen, Anzeigen und positiven Keywords bleiben `Paused`. Negative Keywords haben keinen eigenen Pausenstatus. Die Kampagnen bleiben pausiert. Im Google Ads Editor die Spaltenzuordnung, URL-Vorschau und sämtliche Änderungen prüfen. Sitelinks/Zusatzinformationen sind Entwürfe zur manuellen Zuordnung; ein CSV-Import ersetzt keine Prüfung im Konto.

## Vor einer Schaltung im Konto

1. Eigene Domain, öffentliche Erreichbarkeit ohne ChatGPT-Anmeldung und richtige finale URLs bestätigen. Die bisherige Sites-Fassung ist privat und keine freigegebene Ads-Zielseite.
2. Abrechnungsprofil, Unternehmensverifizierung soweit erforderlich, Kontoinhaber, Zugriffe und Zahlungsdaten vom tatsächlichen Kontoinhaber einrichten. Passwörter und API-Schlüssel nicht im Chat oder Git ablegen.
3. Zielregion, Sprache Deutsch und die Standorteinstellung bewusst wählen: Personen im tatsächlich gewünschten Zielgebiet statt ungeprüfter Interessensregionen. Die aktuelle Google-Oberfläche prüfen.
4. Keyword-Planer für Suchvolumen, Suchintention und voraussichtliche Klickkosten verwenden. Die Vorlagen enthalten keine erhobenen Suchvolumen oder Gebotsschätzungen.
5. Für den fokussierten Start Exact/Phrase-Kandidaten prüfen. Keine automatische Broad-Erweiterung, Netzwerk-Erweiterung oder Kampagnenautomatik unbesehen aktivieren. Google kann dennoch nahe Varianten ausspielen.
6. Nur die ausgewählten Kampagnen mit einem ausdrücklich bestätigten Budget einrichten. Suchpartner, Display-Erweiterung, automatische Assets und automatisch angewandte Empfehlungen bewusst prüfen.
7. Direktversand, Sicherheitsprüfung, tatsächliche Postfachzustellung und Dankeseite testen. Erst danach eine Formular-Conversion aktivieren.
8. Einwilligungszustände mit Tag Assistant testen. Bei Ablehnung keine Tags; eine neue bestätigte Anfrage nur einmal zählen. Nicht aus Formular-Klicks oder bloßen Dankeseiten-Aufrufen einen Lead machen.
9. Rechtsangaben und Datenschutzhinweise für den tatsächlichen Host, Versanddienst, Turnstile und aktivierte Google-Dienste abschließen.
10. Finale Anzeigen und Preise mit der Zielseite vergleichen. Erst nach dieser Prüfung die gewählte Kampagne bewusst aktivieren.

## Conversion-Plan

| Aktion | Vorgesehene Rolle | Umsetzung |
|---|---|---|
| Vom Versanddienst angenommene Projektanfrage | Primäre Lead-Conversion nach Freigabe | Nur nach erfolgreichem POST; UUID als `transaction_id`; kein Umsatzwert erfunden |
| Klick auf Telefon | Sekundärer Kontaktversuch | Lokales Data-Layer-Ereignis bei Einwilligung, noch keine separate Ads-Conversion konfiguriert |
| Klick auf E-Mail oder WhatsApp | Sekundärer Kontaktversuch | Kein Beleg für eine gesendete Nachricht oder einen Auftrag |
| Aufruf der Dankeseite | Keine Conversion | Erzeugt nie selbst eine Lead-Conversion |
| Qualifizierte Anfrage oder Auftrag | Spätere Ausbaustufe | Noch keine CRM-/Offline-Conversion-Verknüpfung implementiert |

Im Ads-Konto eine primäre Lead-Aktion mit geeigneter Zählmethode für Anfragen (typischerweise eine je Anzeigeninteraktion) einrichten und doppelte Importe vermeiden. Keinen Kontaktklick zugleich als primäres Lead-Ziel verwenden. Keine GA4-Parallelmessung, erweiterten Conversions oder Remarketing-Tags sind aktiviert.

## Nach dem Start

Suchbegriffe, irrelevante Klicks, tatsächliche Anfragequalität und Budgetverteilung regelmäßig prüfen. Nicht nur Klickzahlen bewerten. Änderungen, Kosten und Beobachtungen dokumentieren. Keine Ziel-CPA-/ROAS-Werte aus erfundenen Ergebnissen ableiten; Strategie und Gebote an tatsächliche Daten anpassen.

## Primärquellen

- [CSV vorbereiten](https://support.google.com/google-ads/editor/answer/56368?hl=en)
- [CSV-Spalten](https://support.google.com/google-ads/editor/answer/57747?hl=en)
- [CSV-Import prüfen](https://support.google.com/google-ads/editor/answer/30564?hl=en-GB)
- [Keyword-Optionen](https://support.google.com/google-ads/answer/7478529?hl=de)
- [Conversion-Einrichtung](https://support.google.com/google-ads/answer/16560108?hl=de)
- [Einwilligungsmodus](https://developers.google.com/tag-platform/security/guides/consent?hl=de)
- [Google-Ausgabengrenzen](https://support.google.com/google-ads/answer/10486637?hl=de)
