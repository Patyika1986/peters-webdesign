/* Fictitious inventory example; no storage, network requests or real orders. */
export function createStockState(){return {stock:12,minimum:5,target:12,history:[]}}
export function applyStockMovement(state,kind,quantity){
 if(!state||![state.stock,state.minimum,state.target].every(Number.isSafeInteger)||state.stock<0||state.minimum<0||state.target<state.minimum)throw Error('Ungültiger Demo-Bestand.');
 if(!['remove','add'].includes(kind)||!Number.isSafeInteger(quantity)||quantity<1||quantity>999)throw Error('Bitte geben Sie eine ganze Menge von 1 bis 999 ein.');
 if(kind==='remove'&&quantity>state.stock)throw Error('Der Demo-Bestand reicht für diese Entnahme nicht aus.');
 const stock=state.stock+(kind==='add'?quantity:-quantity);if(stock>100000)throw Error('Die Demo-Obergrenze ist erreicht. Bitte setzen Sie das Beispiel zurück.');
 return {...state,stock,history:[{kind,quantity},...(state.history||[])].slice(0,5)};
}
export function stockProposal(state){return state.stock<=state.minimum?Math.max(0,state.target-state.stock):0}
export function initializeStockDemo(doc){const root=doc.querySelector('[data-stock-demo]');if(!root)return;const $=selector=>root.querySelector(selector),quantity=$('#stock-quantity'),status=$('[data-stock-status]');let state=createStockState();
 function render(){const low=state.stock<=state.minimum;$('[data-stock-value]').textContent=String(state.stock);$('[data-stock-level]').textContent=low?'Bestand knapp: Nachbestellung persönlich prüfen.':'Bestand ausreichend.';root.dataset.stockLevel=low?'low':'normal';$('[data-stock-proposal]').disabled=!stockProposal(state);$('[data-stock-proposal-panel]').hidden=true;$('[data-stock-approve]').disabled=false;const history=$('[data-stock-history]');history.replaceChildren();for(const item of state.history){const li=doc.createElement('li');li.textContent=(item.kind==='remove'?'Entnahme: ':'Wareneingang: ')+item.quantity+' Flaschen · fiktive Buchung';history.append(li)}}
 function move(kind){if(!quantity.reportValidity()){status.textContent='Bitte geben Sie eine ganze Menge von 1 bis 999 ein. Es wurde nichts gebucht.';return}try{const amount=Number(quantity.value);state=applyStockMovement(state,kind,amount);render();status.textContent=(kind==='remove'?'Entnahme':'Wareneingang')+' simuliert: '+amount+' Flaschen. Demo-Bestand: '+state.stock+'.'}catch(error){status.textContent=error.message}}
 $('[data-stock-remove]').addEventListener('click',()=>move('remove'));$('[data-stock-add]').addEventListener('click',()=>move('add'));
 $('[data-stock-proposal]').addEventListener('click',()=>{const amount=stockProposal(state);if(!amount)return;$('[data-stock-proposal-copy]').textContent='Fiktiver Vorschlag: '+amount+' Flaschen bis zum Zielbestand von '+state.target+'. Eine echte Bestellung ist damit nicht verbunden.';$('[data-stock-proposal-panel]').hidden=false;status.textContent='Bestellvorschlag zur Prüfung angezeigt. Es wurde nichts bestellt.'});
 $('[data-stock-approve]').addEventListener('click',()=>{if($('[data-stock-proposal-panel]').hidden||!stockProposal(state))return;$('[data-stock-approve]').disabled=true;status.textContent='Freigabe nur simuliert. Keine Bestellung, keine E-Mail und keine Änderung eines echten Bestands.'});
 $('[data-stock-reset]').addEventListener('click',()=>{state=createStockState();quantity.value='2';render();status.textContent='Beispiel zurückgesetzt. Es wurden keine echten Daten verändert.'});render();
}
if(typeof document!=='undefined')initializeStockDemo(document);
