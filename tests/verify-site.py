from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,sys
base=Path(__file__).resolve().parents[1];root=base/'public' if (base/'public').is_dir() else base/'dist' if (base/'dist/index.html').is_file() else base;all_docs={};void={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class Parse(HTMLParser):
 def __init__(self):super().__init__();self.stack=[];self.ids=[];self.links=[];self.assets=[];self.sections=0;self.forms=0;self.tree={'tag':'document','attrs':{},'children':[]};self.nodes=[self.tree]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs);n={'tag':tag,'attrs':a,'children':[]};self.nodes[-1]['children'].append(n)
  if 'id'in a:self.ids.append(a['id'])
  if tag=='a':self.links.append(a.get('href',''))
  if tag in {'img','script','link'}:
   v=a.get('src',a.get('href',''))
   if v:self.assets.append(v)
  if tag=='img':assert a.get('alt') is not None,('image alt missing',a)
  if tag=='section':self.sections+=1
  if tag=='form':self.forms+=1
  if tag not in void:self.stack.append(tag);self.nodes.append(n)
 def handle_endtag(self,tag):
  assert self.stack and self.stack[-1]==tag,('structure',tag,self.stack[-6:]);self.stack.pop();self.nodes.pop()
 def handle_data(self,text):self.nodes[-1]['children'].append(text)
for path in root.rglob('*.html'):
 c=Parse();c.feed(path.read_text());assert not c.stack,(path,c.stack);assert len(c.ids)==len(set(c.ids)),('duplicate ids',path);all_docs[path]=c
for path,c in all_docs.items():
 for link in c.links+c.assets:
  u=urlsplit(link)
  if u.scheme or u.netloc:continue
  target=((root/unquote(u.path).lstrip('/')) if u.path.startswith('/') else (path.parent/unquote(u.path))).resolve() if u.path else path
  if target.is_dir():target=target/'index.html'
  assert target.exists(),('missing file',path,link)
  if u.fragment and target in all_docs:assert unquote(u.fragment) in all_docs[target].ids,('missing anchor',path,link)
for slug in ['reinigung','friseur','restaurant','handwerk','architektur','notar','anwalt','physiotherapie','immobilien','kfz']:
 d={'slug':slug}
 path=root/'beispiele'/d['slug']/'index.html';c=all_docs[path];assert c.sections>=7,(d['slug'],c.sections);assert c.forms==1;assert all(x in c.ids for x in ['leistungen','erleben','studio','kontakt','main-nav','name','email','message']);print(d['slug'],':',c.sections,'Abschnitte, 1 Formular, Links und Struktur OK')
trees={path.parent.name:c.tree for path,c in all_docs.items() if path.parent.parent==root/'beispiele'}
if '--dom-output' in sys.argv:Path(sys.argv[sys.argv.index('--dom-output')+1]).write_text(json.dumps(trees))
print('Insgesamt',len(all_docs),'HTML-Seiten; alle lokalen Ziele und Assets vorhanden.')
