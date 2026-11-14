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
