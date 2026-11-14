from pathlib import Path
from decimal import Decimal
import re
root=Path(__file__).resolve().parents[1];root=root/'public' if (root/'public').is_dir() else root/'dist' if (root/'dist/index.html').is_file() else root
s=(root/'leistungen/webdesign.html').read_text()
google=(root/'leistungen/google-unternehmensprofil.html').read_text()+(root/'leistungen/google-ads.html').read_text()
def money(n):return f'{n:,.2f}'.replace(',','X').replace('.',',').replace('X','.')
for id in ['onepager','webseite']:
 m=re.search(r'<article\b[^>]*id="'+id+r'"[^>]*>(.*?)</article>',s,re.S);assert m,id;card=m.group(1)
 monthly=Decimal(re.search(r'class="price">(\d+) €',card).group(1));setup=Decimal(re.search(r'\+ (\d+) € netto Einrichtung',card).group(1));total=monthly*24+setup
 assert money(monthly*Decimal('1.19')) in card,(id,'Monats-USt.')
 assert money(setup*Decimal('1.19')) in card,(id,'Einrichtungs-USt.')
 assert money(total*Decimal('1.19')) in s,(id,'Gesamtbetrag brutto')
 assert f'{total:,.0f}'.replace(',','.')+' € netto' in s,(id,'Gesamtbetrag netto')
 print(id,': Monatsbetrag, Einrichtung und 24-Monats-Summe einschließlich USt. stimmen.')
cards=re.findall(r'<article class="google-package">(.*?)</article>',google,re.S);assert len(cards)==4
for c in cards:
 name=re.search(r'<h4>(.*?)</h4>',c).group(1);monthly=Decimal(re.search(r'google-package-price">(\d+) €',c).group(1));setup=Decimal(re.search(r'google-package-setup">\+ (\d+) €',c).group(1))
 assert money(monthly*Decimal('1.19')) in c,name
 assert money(setup*Decimal('1.19')) in c,name
 print(name,': Einrichtung und monatliche USt. stimmen.')
assert 'Das Unternehmensprofil ist bei Google kostenlos' in google
assert 'direkt an Google' in google
print('Vier separate Google-Pakete; Profilkosten und Werbebudget klar getrennt.')
# Standalone offers must show the full VAT-inclusive price, not a monthly instalment.
profile=(root/'leistungen/google-unternehmensprofil.html').read_text()
for source,offer in [(s,'modernisierung-onepager'),(s,'modernisierung-webseite'),(profile,'profil-einzelbeitrag')]:
 card=re.search(r'<article\b[^>]*id="'+offer+r'"[^>]*>(.*?)</article>',source,re.S).group(1)
 net=Decimal(re.search(r'pw-once-price">(\d+) €',card).group(1))
 assert money(net*Decimal('1.19')) in card,(offer,'Bruttopreis')
 assert 'netto / Monat' not in card,offer
 print(offer,': eigenständiger Preis mit korrekter Umsatzsteuer.')
for count in [4,5]:
 assert str(count*20)+' € netto / '+money(Decimal(count*20)*Decimal('1.19')).removesuffix(',00')+' € inkl. 19 % USt.' in profile
assert 'Kein Abo und keine 24 Monate Mindestlaufzeit.' in s
assert 'keine dreimonatige Mindestlaufzeit' in profile
print('Einmalleistungen von monatlichen Paketen getrennt; Beitragsbeispiele korrekt.')
ki=(root/'leistungen/ki-loesungen.html').read_text()
ai_cards=re.findall(r'<article class="pw-ai-plan"[^>]*>(.*?)</article>',ki,re.S)
assert len(ai_cards)==4
for card in ai_cards:
 setup=Decimal(re.search(r'pw-ai-setup">(\d+) €',card).group(1))
 assert money(setup*Decimal('1.19')) in card,'KI-Einrichtungs-USt.'
 monthly=Decimal(re.search(r'pw-ai-monthly"><strong>\+ (\d+) €',card).group(1))
 assert monthly==Decimal('30') and money(monthly*Decimal('1.19')) in card,'KI-Abo-USt.'
assert 'Zusätzliche Arbeiten und Wünsche werden separat abgerechnet.' in ki
assert 'zum Ende des jeweiligen Abrechnungsmonats kündbar' in ki
print('Vier KI-Pakete: Einrichtung und 30-Euro-Abo mit korrekter Umsatzsteuer und getrennten Zusatzarbeiten.')
