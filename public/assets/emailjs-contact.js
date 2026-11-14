/* Public EmailJS identifiers; never place a private API key here. No request before submit. */
(()=>{
 const settings={service_id:'service_ncpp0q7',template_id:'template_osvroo9',user_id:'EvRay3fqRqfybrR70'};
 let pending=false,lastSent=0;
 globalThis.PetersEmail={validate(form,status){
 for(const field of form.querySelectorAll('input,textarea,select')){
  field.setCustomValidity('');
  if(field.required&&field.type!=='checkbox'&&field.type!=='radio'&&!field.value.trim())field.setCustomValidity('Bitte füllen Sie dieses Pflichtfeld aus.');
  else if(field.validity.valueMissing)field.setCustomValidity(field.type==='checkbox'?'Bitte bestätigen Sie diesen Hinweis.':'Bitte füllen Sie dieses Pflichtfeld aus.');
  else if(field.validity.typeMismatch)field.setCustomValidity('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
  else if(field.minLength>0&&field.value.trim().length<field.minLength)field.setCustomValidity('Bitte geben Sie mindestens '+field.minLength+' Zeichen ein.');
  field.setAttribute('aria-invalid',String(!field.validity.valid));
 }
 if(!form.checkValidity()){status.textContent='Bitte prüfen Sie die markierten Pflichtfelder. Es wurde nichts gesendet.';form.reportValidity();return false}return true;
 },async send(data){
  if(pending||Date.now()-lastSent<1000)throw Error('Bitte warten Sie kurz, bevor Sie erneut senden.');
  if(data.website||!data.privacy||String(data.name||'').trim().length<2||!/^\S+@\S+\.\S+$/.test(data.email||'')||String(data.message||'').trim().length<15)throw Error('Bitte prüfen Sie Ihre Eingaben.');
  const details=['Name: '+data.name,'E-Mail für Ihre Antwort: '+data.email,'Leistung: '+(data.service||'Webdesign'),'Unternehmen: '+(data.company||'–'),'Telefon: '+(data.phone||'–'),'Anfragereferenz: '+data.submissionId,'',data.message].join('\n');
  pending=true;
  try{const response=await fetch('https://api.emailjs.com/api/v1.0/email/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...settings,template_params:{name:data.name,message:details}}),signal:AbortSignal.timeout(15000)});
   const result=await response.text();if(response.status!==200||result.trim()!=='OK')throw Error('Der Versand konnte nicht bestätigt werden. Ihre Eingaben bleiben erhalten. Bitte versuchen Sie es später erneut oder kontaktieren Sie Peter direkt.');lastSent=Date.now();return {ok:true,status:'accepted',receiptId:data.submissionId};
  }finally{pending=false}
 }};
})();
