const SERVICE_NAMES={webdesign:'Webdesign',profil:'Google-Unternehmensprofil',ads:'Google Ads',landingpage:'Landingpage',text:'Website-Texte',pflege:'Inhaltspflege',sonstiges:'Allgemeine Anfrage'};
const EMAIL=/^[^\s<>@\r\n]+@[^\s<>@\r\n]+\.[^\s<>@\r\n]+$/;
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const RATE_WINDOW=15*60*1000;const rateBuckets=new Map();
function jsonResponse(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}})}
function senderAddress(from){const match=String(from||'').match(/<([^<>]+)>$/);return match?match[1]:String(from||'')}
export function contactReady(env={}){return env.CONTACT_DELIVERY_ENABLED==='true'&&env.CONTACT_PRIVACY_READY==='true'&&Boolean(env.RESEND_API_KEY)&&EMAIL.test(senderAddress(env.CONTACT_FROM))&&EMAIL.test(env.CONTACT_TO||'peters-webdesign@outlook.de')&&(env.CONTACT_REQUIRE_CHALLENGE==='false'||Boolean(env.TURNSTILE_SECRET_KEY&&env.PUBLIC_TURNSTILE_SITE_KEY))}
export function validateInquiry(input){if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('invalid');const data={};for(const [key,max]of [['name',100],['email',180],['company',140],['phone',40],['message',2500]]){if(input[key]!==undefined&&typeof input[key]!=='string')throw new Error('invalid');data[key]=(input[key]||'').trim();if(data[key].length>max)throw new Error('invalid')}
 if(data.name.length<2||/[\r\n\x00]/.test(data.name)||!EMAIL.test(data.email)||data.message.length<20||data.message.includes('\x00')||/[\r\n\x00]/.test(data.company+data.phone)||!Object.hasOwn(SERVICE_NAMES,input.service)||input.privacy!==true||!UUID.test(input.submissionId||'')||String(input.website||'')!=='')throw new Error('invalid');
 return {...data,service:input.service,submissionId:input.submissionId,challengeToken:typeof input.challengeToken==='string'?input.challengeToken.slice(0,4096):''};}
function rateAllowed(ip,now){if(!ip)return true;const bucket=rateBuckets.get(ip);if(!bucket||now-bucket.start>RATE_WINDOW){if(rateBuckets.size>2048){for(const[k,v]of rateBuckets)if(now-v.start>RATE_WINDOW)rateBuckets.delete(k);if(rateBuckets.size>2048)rateBuckets.clear()}rateBuckets.set(ip,{start:now,count:1});return true}bucket.count++;return bucket.count<=5}
export async function handleContact(request,env={},dependencies={}){const fetcher=dependencies.fetcher||fetch,now=dependencies.now||Date.now;
 if(request.method!=='POST')return jsonResponse({ok:false,code:'method'},405);
 const origin=request.headers.get('origin');if(!origin||origin!==new URL(request.url).origin||request.headers.get('sec-fetch-site')==='cross-site')return jsonResponse({ok:false,code:'origin'},403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return jsonResponse({ok:false,code:'format'},415);
 if(Number(request.headers.get('content-length')||0)>16384)return jsonResponse({ok:false,code:'size'},413);
 if(!contactReady(env))return jsonResponse({ok:false,code:'unavailable'},503);
 let raw,data;try{raw=await request.text();if(new TextEncoder().encode(raw).byteLength>16384)return jsonResponse({ok:false,code:'size'},413);data=validateInquiry(JSON.parse(raw))}catch{return jsonResponse({ok:false,code:'validation'},400)}
 // Best-effort per-isolate guard; Turnstile is required by default for public delivery.
 if(!rateAllowed(request.headers.get('cf-connecting-ip'),now()))return jsonResponse({ok:false,code:'rate'},429);
 if(env.CONTACT_REQUIRE_CHALLENGE!=='false'){
  if(!data.challengeToken)return jsonResponse({ok:false,code:'challenge'},400);
  try{const verified=await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:data.challengeToken}),signal:AbortSignal.timeout(10000)});const result=await verified.json();if(!verified.ok||result.success!==true||result.action!=='project_inquiry'||result.hostname!==new URL(request.url).hostname)return jsonResponse({ok:false,code:'challenge'},400)}catch{return jsonResponse({ok:false,code:'challenge'},502)}
 }
 const text=['Neue Webdesign-Projektanfrage','Referenz: '+data.submissionId,'Leistung: '+SERVICE_NAMES[data.service],'','Name: '+data.name,'E-Mail: '+data.email,...(data.company?['Unternehmen: '+data.company]:[]),...(data.phone?['Telefon: '+data.phone]:[]),'',data.message,'','Datenschutzhinweis zur Bearbeitung der Anfrage bestätigt.'].join('\n');
 try{const response=await fetcher('https://api.resend.com/emails',{method:'POST',headers:{authorization:'Bearer '+env.RESEND_API_KEY,'content-type':'application/json','idempotency-key':'pw-'+data.submissionId},body:JSON.stringify({from:env.CONTACT_FROM,to:[env.CONTACT_TO||'peters-webdesign@outlook.de'],reply_to:data.email,subject:'Projektanfrage: '+SERVICE_NAMES[data.service],text}),signal:AbortSignal.timeout(10000)});
  if(!response.ok)return jsonResponse({ok:false,code:'delivery'},502);const result=await response.json();if(!result||typeof result.id!=='string'||result.id.length>100)return jsonResponse({ok:false,code:'delivery'},502);
  // Provider acceptance is not a mailbox-delivery confirmation. No personal data in response.
  return jsonResponse({ok:true,receiptId:data.submissionId,status:'accepted'},202);
 }catch{return jsonResponse({ok:false,code:'delivery'},502)}
}
