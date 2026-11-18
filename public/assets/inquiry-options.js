/* Only allowlisted selections become form text. No personal data in links. */
const SERVICES={webdesign:'Neue Webseite',modernisierung:'Modernisierung einer bestehenden Webseite',profilbeitrag:'Einzelne Google-Profilbeiträge',profil:'Google-Unternehmensprofil',ads:'Google Ads',landingpage:'Landingpage',text:'Website-Texte',pflege:'Inhaltspflege',ki:'KI-Lösungen / Automatisierung',sonstiges:'Allgemeine Anfrage'};
const PACKAGES={
 webdesign:{onepager:'Neuer Onepager mit Hosting und Wartung',webseite:'Neue Webseite bis fünf Seiten mit Hosting und Wartung',individuell:'Individuelles Angebot für eine neue Webseite'},
 modernisierung:{onepager:'Einmalige Modernisierung eines Onepagers',webseite:'Einmalige Modernisierung einer Webseite bis fünf Seiten',individuell:'Individuelle Prüfung einer bestehenden Webseite'},
 profil:{start:'Profil-Start: Einrichtung',aktiv:'Profil-Aktiv: laufende Betreuung',plus:'Profil-Plus: laufende Betreuung'},
 ads:{start:'Google Ads Start',plus:'Google Ads Plus'},
 ki:{vorlagen:'KI-Vorlagen',beitraege:'KI-Beitragsassistent',anfragen:'KI-Anfrage-Assistent',termine:'Termin-Automatisierung'}
};
export const INDUSTRIES={reinigung:'Reinigung',friseur:'Friseur',restaurant:'Restaurant',handwerk:'Handwerk',architektur:'Architektur',notar:'Notariat',anwalt:'Anwaltskanzlei',physiotherapie:'Physiotherapie',immobilien:'Immobilienvermittlung',kfz:'Kfz-Werkstatt'};
export function resolveInquirySelection(search=''){
 const params=new URLSearchParams(search),service=params.get('leistung');if(!Object.hasOwn(SERVICES,service))return {service:'',title:'',prompt:''};
 const packageId=params.get('paket'),title=Object.hasOwn(PACKAGES,service)&&Object.hasOwn(PACKAGES[service],packageId)?PACKAGES[service][packageId]:SERVICES[service];
 const industry=params.get('branche'),sector=Object.hasOwn(INDUSTRIES,industry)?INDUSTRIES[industry]:'';
 let prompt='Ich interessiere mich für: '+title+(sector?' für meinen Betrieb im Bereich '+sector:'')+'.\n';
 if(service==='modernisierung'){prompt+='Meine bestehende Webseite: \n';if(params.get('betreuung')==='separat')prompt+='Bitte bieten Sie die laufende Betreuung separat an.\n'}
 if(service==='webdesign'&&params.get('betreuung')==='ohne')prompt+='Ich möchte einen einmaligen Auftrag ohne Betreuungsabo.\n';
 prompt+=service==='ki'?'Meine wiederkehrende Aufgabe: ':'Mein Vorhaben: ';
 return {service,title:title+(sector?' · '+sector:''),prompt};
}
