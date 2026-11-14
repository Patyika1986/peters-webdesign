"""Offline draft generator. Does not log into Google, upload, activate or spend."""
from pathlib import Path
from urllib.parse import urlsplit
import argparse,csv,json
BASE=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--origin');p.add_argument('--draft',action='store_true');p.add_argument('--output',type=Path,default=BASE/'docs/ads/drafts');args=p.parse_args()
if args.draft:
 origin='https://DOMAIN-ERGAENZEN.invalid'
else:
 u=urlsplit(args.origin or '')
 if u.scheme!='https' or not u.hostname or u.username or u.password or u.path not in ['','/'] or u.query or u.fragment or u.port or u.hostname.endswith(('.invalid','.example','.test','.localhost','.chatgpt.site')):p.error('Use the verified HTTPS custom origin, no paths or preview/placeholder hosts. No upload is performed.')
 origin=u.scheme+'://'+u.netloc
D=json.loads((BASE/'docs/ads/campaigns.json').read_text());out=args.output;out.mkdir(parents=True,exist_ok=True)
def write(name,fields,rows):
 with (out/name).open('w',encoding='utf-8-sig',newline='') as f:
  writer=csv.DictWriter(f,fieldnames=fields);writer.writeheader();writer.writerows(rows)
ads=[];keywords=[];campaigns={}
for group in D['groups']:
 campaign=group['campaign'];campaigns[campaign]={'Campaign':campaign,'Campaign type':'Search','Campaign status':'Paused','Budget':''}
 assert len(group['heads'])==15 and len(group['descs'])==4
 for h in group['heads']:assert len(h)<=30,(len(h),h)
 for d in group['descs']:assert len(d)<=90,(len(d),d)
 assert (BASE/'public'/group['path'].lstrip('/')).is_file(),group['path']
 ad={'Campaign':campaign,'Campaign status':'Paused','Ad group':group['group'],'Ad group status':'Paused','Ad type':'Responsive search ad','Status':'Paused','Final URL':origin+group['path'],'Path 1':'webdesign' if 'Webdesign' in campaign else 'google','Path 2':'anfrage'}
 ad.update({'Headline '+str(i+1):text for i,text in enumerate(group['heads'])});ad.update({'Description '+str(i+1):text for i,text in enumerate(group['descs'])});ads.append(ad)
 for word in group['keywords']:
  for match in ['Exact','Phrase']:keywords.append({'Campaign':campaign,'Campaign status':'Paused','Ad group':group['group'],'Ad group status':'Paused','Keyword':word,'Criterion Type':match,'Status':'Paused'})
write('01-campaigns-paused.csv',['Campaign','Campaign type','Campaign status','Budget'],campaigns.values())
write('02-responsive-search-ads-paused.csv',['Campaign','Campaign status','Ad group','Ad group status','Ad type','Status',*[f'Headline {i}'for i in range(1,16)],*[f'Description {i}'for i in range(1,5)],'Final URL','Path 1','Path 2'],ads)
write('03-keywords-paused.csv',['Campaign','Campaign status','Ad group','Ad group status','Keyword','Criterion Type','Status'],keywords)
write('04-negative-keywords.csv',['Campaign','Campaign status','Keyword','Criterion Type'],[{'Campaign':c,'Campaign status':'Paused','Keyword':n,'Criterion Type':'Negative phrase'}for c in campaigns for n in D['negativeKeywords']])
links=[('Pakete und Einrichtung','Klare Kosten von Anfang an','Monatlich plus Einrichtung','/leistungen/webdesign.html#paketwahl'),('Webdesign-Beispiele','Zehn eigene Branchenwelten','Fiktive Gestaltungsbeispiele','/beispiele/index.html'),('Über Peter Lakatos','Persönlicher Ansprechpartner','Aus Nürnberg für Deutschland','/ueber-peter.html'),('Projekt anfragen','Ihr Vorhaben besprechen','Unverbindlich Kontakt aufnehmen','/anfrage.html')]
for t,d1,d2,path in links:assert len(t)<=25 and len(d1)<=35 and len(d2)<=35
write('05-sitelinks-review.csv',['Link Text','Description Line 1','Description Line 2','Final URL'],[{'Link Text':t,'Description Line 1':a,'Description Line 2':b,'Final URL':origin+path}for t,a,b,path in links])
write('06-callouts-review.csv',['Callout Text'],[{'Callout Text':x}for x in ['Fester Ansprechpartner','Aus Nürnberg','Deutschlandweit tätig','Individuelles Webdesign','Klare Einrichtungskosten']])
(out/'README.txt').write_text('ENTWÜRFE – NICHT HOCHGELADEN, NICHT AKTIVIERT\n\n'+('Platzhalter-Domain enthalten. Vor Import mit bestätigter eigener Domain neu erzeugen.\n'if args.draft else 'Domain eingesetzt; dies bestätigt keine Domainkontrolle, Rechtsfreigabe oder Anzeigenfreigabe.\n')+'Alle Kampagnen, Anzeigengruppen, Anzeigen und positiven Keywords sind pausiert. Negative Keywords haben keinen eigenen Pausenstatus; die Kampagnen bleiben pausiert. Budgets sind absichtlich leer und müssen vor einem Import geprüft werden.\n\nGoogle Ads Editor: Spaltenzuordnung und Vorschau prüfen. Keine Änderungen ungeprüft veröffentlichen. Zielregionen, Sprache, Suchnetzwerk, Standortoptionen, Budget, Abrechnung, finale URLs und Conversion-Ziele manuell freigeben.\n\nSiehe ../START.md und ../../RELEASE.md.\n')
print(f'{len(campaigns)} pausierte Kampagnen, {len(ads)} Anzeigen und {len(keywords)} Keywords als Offline-Entwürfe in {out}. Kein Zugriff auf ein Google-Konto.')
