from pathlib import Path
from decimal import Decimal
import re
root=Path(__file__).resolve().parents[1];root=root/'dist' if (root/'dist').is_dir() else root
s=(root/'index.html').read_text()
def money(n):return f'{n:,.2f}'.replace(',','X').replace('.',',').replace('X','.')
for id in ['onepager','webseite']:
 m=re.search(r'<article\b[^>]*id="'+id+r'"[^>]*>(.*?)</article>',s,re.S);assert m,id;card=m.group(1)
 monthly=Decimal(re.search(r'class="price">(\d+) €',card).group(1));setup=Decimal(re.search(r'\+ (\d+) € netto Einrichtung',card).group(1));total=monthly*24+setup
 assert money(monthly*Decimal('1.19')) in card,(id,'Monats-USt.')
 assert money(setup*Decimal('1.19')) in card,(id,'Einrichtungs-USt.')
 assert money(total*Decimal('1.19')) in s,(id,'Gesamtbetrag brutto')
 assert f'{total:,.0f}'.replace(',','.')+' € netto' in s,(id,'Gesamtbetrag netto')
 print(id,': Monatsbetrag, Einrichtung und 24-Monats-Summe einschließlich USt. stimmen.')
cards=re.findall(r'<article class="google-package">(.*?)</article>',s,re.S);assert len(cards)==4
for c in cards:
 name=re.search(r'<h4>(.*?)</h4>',c).group(1);monthly=Decimal(re.search(r'google-package-price">(\d+) €',c).group(1));setup=Decimal(re.search(r'google-package-setup">\+ (\d+) €',c).group(1))
 assert money(monthly*Decimal('1.19')) in c,name
 assert money(setup*Decimal('1.19')) in c,name
 print(name,': Einrichtung und monatliche USt. stimmen.')
assert 'Das Unternehmensprofil selbst ist bei Google kostenlos' in s
assert 'das vereinbarte Werbebudget direkt an Google' in s
print('Vier separate Google-Pakete; Profilkosten und Werbebudget klar getrennt.')
