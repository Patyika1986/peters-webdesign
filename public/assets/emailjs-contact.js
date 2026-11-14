/* Public EmailJS identifiers; never place a private API key here. No request before submit. */
(()=>{
 const settings={service_id:'service_ncpp0q7',template_id:'template_osvroo9',user_id:'EvRay3fqRqfybrR70'};
 let pending=false,lastSent=0;
 globalThis.PetersEmail={async send(data){
  if(pending||Date.now()-lastSent<1000)throw Error('Bitte warten Sie kurz, bevor Sie erneut senden.');
  if(data.website||!data.privacy||String(data.name||'').trim().length<2||!/^\S+@\S+\.\S+$/.test(data.email||'')||String(data.message||'').trim().length<15)throw Error('Bitte prüfen Sie Ihre Eingaben.');
  const details=['Leistung: '+(data.service||'Webdesign'),'Unternehmen: '+(data.company||'–'),'Telefon: '+(data.phone||'–'),'Anfragereferenz: '+data.submissionId,'',data.message].join('\n');
  pending=true;
  try{const response=await fetch('https://api.emailjs.com/api/v1.0/email/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...settings,template_params:{name:data.name,from_name:data.name,email:data.email,from_email:data.email,reply_to:data.email,to_email:'pdfsr@outlook.com',to_name:'Peter Lakatos',company:data.company||'',phone:data.phone||'',service:data.service||'Webdesign',subject:'Projektanfrage: '+(data.service||'Webdesign'),title:'Projektanfrage: '+(data.service||'Webdesign'),message:details,submission_id:data.submissionId}}),signal:AbortSignal.timeout(15000)});
   const result=await response.text();if(response.status!==200||result.trim()!=='OK')throw Error('Der Versand konnte nicht bestätigt werden. Bitte nutzen Sie den E-Mail-Entwurf oder kontaktieren Sie Peter direkt.');lastSent=Date.now();return {ok:true,status:'accepted',receiptId:data.submissionId};
  }finally{pending=false}
 }};
})();
