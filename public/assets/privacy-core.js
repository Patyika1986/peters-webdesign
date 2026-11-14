export const CONSENT_VERSION=1;export const CONSENT_DAYS=180;
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function validChoice(choice,now=Date.now()){return Boolean(choice&&choice.version===CONSENT_VERSION&&typeof choice.adsMeasurement==='boolean'&&Number.isFinite(choice.time)&&choice.time<=now&&now-choice.time<CONSENT_DAYS*86400000)}
export function marketingAllowed(config,choice,now=Date.now()){return Boolean(config?.marketing?.enabled===true&&/^AW-\d{6,20}$/.test(config.marketing.adsId||'')&&/^[A-Za-z0-9_-]{3,100}$/.test(config.marketing.leadLabel||'')&&validChoice(choice,now)&&choice.adsMeasurement===true)}
export function leadConversion(config,choice,id,now=Date.now()){if(!marketingAllowed(config,choice,now)||!UUID.test(id||''))return null;return {send_to:config.marketing.adsId+'/'+config.marketing.leadLabel,transaction_id:id}}
export function contactEvent(href){if(href.startsWith('tel:'))return 'contact_phone_click';if(href.startsWith('mailto:'))return 'contact_email_click';try{const u=new URL(href);if(u.hostname==='wa.me'||u.hostname==='api.whatsapp.com')return 'contact_whatsapp_click'}catch{}return null}
