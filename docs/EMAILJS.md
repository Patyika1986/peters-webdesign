# EmailJS-Formularversand

Service: service_ncpp0q7. Vorlage: template_osvroo9. Der Public Key ist ein öffentlicher Browser-Schlüssel, kein privates Geheimnis.

In der EmailJS-Vorlage Empfänger fest auf pdfsr@outlook.com setzen, Reply-To auf {{reply_to}}, Betreff auf {{subject}}. Inhalt mit {{name}}, {{email}} und {{message}} belegen. message enthält zusätzlich Leistung, Unternehmen, Telefon und Referenz. Ebenfalls verfügbar: from_name, from_email, to_name, to_email, company, phone, service, title, submission_id. Template-Variablen als Text verwenden, kein ungefiltertes HTML aus Besucherangaben.

EmailJS erlaubt die tatsächliche Site-Domain gegebenenfalls unter Account / Security / Allowed origins. Für die derzeitige Vorschau: https://peters-webdesign-nuernberg.peter-lakatos.chatgpt.site. Spätere eigene Domain ergänzen. Kontingent und Spam-Schutz im EmailJS-Konto prüfen. Keine Private Keys im Frontend verwenden.

Der Versand erfolgt direkt vom Browser an die EmailJS-REST-API ausschließlich nach expliziter Sendebetätigung, ohne externes SDK. Hauptformular bestätigt erst HTTP 200 mit OK. Zehn Branchenbeispiele haben eine lokale Vorschau und eine separate Sendeschaltfläche; sie versenden Webdesign-Anfragen, keine Branchenbuchungen. Die Resend-Alternative bleibt ausgeschaltet. Browserseitiger Doppelklickschutz und Validierung ersetzen keine anbieterseitige Missbrauchsabwehr.

Automatisierte Tests prüfen Payload, Reply-To, Fehler, Spamfalle und Doppelklickschutz mit simuliertem Versand. Kein echter Postfach-Eingang oder visueller Browsertest bestätigt. Nach Konfiguration der Vorlage eine reale Testanfrage über die Seite absenden und im EmailJS-Verlauf sowie Empfängerpostfach prüfen. Datenschutz-/Vertragsdetails sind vor öffentlichem Betrieb zu vervollständigen.
