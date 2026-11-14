# EmailJS-Formularversand

Service: service_ncpp0q7. Vorlage: template_osvroo9. Der Public Key ist ein öffentlicher Browser-Schlüssel.

Die Vorlage benötigt ausschließlich {{name}} und {{message}}. name enthält den Absendernamen. message enthält Name, E-Mail-Adresse für die Antwort, Leistung, Unternehmen, Telefon, Referenz und Nachricht. Empfänger im EmailJS-Dashboard fest auf peters-webdesign@outlook.de setzen. Ein fester Betreff wie „Neue Anfrage – peters webdesign“ genügt. Kein dynamisches Reply-To vorausgesetzt: Die Antwortadresse steht im Nachrichtentext und wird für eine Antwort kopiert. Variablen als Text verwenden, kein ungefiltertes Besucher-HTML.

Der Website-Code kann die Empfängereinstellung im EmailJS-Konto nicht ändern. Diese muss im Dashboard geprüft werden. Die beiden Template-Parameter steuern keinen Empfänger.

Versand direkt vom Browser an die EmailJS-REST-API, ohne externes SDK und ausschließlich nach expliziter Sendebetätigung. Branchenbeispiele zeigen zuerst eine lokale Vorschau; deren Versand ist eine Webdesign-Anfrage und keine Branchenbuchung. Alternative Resend-Zustellung bleibt deaktiviert.

Gegebenenfalls im EmailJS-Konto den Ursprung https://peters-webdesign-nuernberg.peter-lakatos.chatgpt.site freigeben; spätere eigene Domain ergänzen. Kontingent und anbieterseitigen Spam-Schutz prüfen. Keine Private Keys im Frontend verwenden.

Automatisierte Tests prüfen die genau zwei Template-Felder, enthaltene Antwortadresse, Fehler und Doppelklickschutz mit simuliertem Versand. Kein realer Postfacheingang oder visueller Browsertest bestätigt. Nach Kontrolle des Empfängers eine reale Testanfrage absenden. Datenschutz-/Vertragsdetails vor öffentlichem Betrieb vervollständigen.
