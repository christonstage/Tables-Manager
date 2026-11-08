/* Chef Bull Brigade - chef-extra.js v2.9.40 - funzioni aggiuntive caricate da index.html */
try{
(function(){
const $=id=>document.getElementById(id);
const norm=x=>String(x||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
window.v46Known=()=>{const L=(state.menu||[]).filter(m=>m.cat==='2 Bevande'&&!/^(acqua|caff|coca|liquore|calice)/i.test(m.name)).map(m=>m.name);
return '\nNomi già in carta (se una bottiglia è una di queste usa ESATTAMENTE lo stesso nome, accenti compresi): '+L.join('; ')+'.\nSe ci sono BIRRE mettile nello stesso elenco con "tipo":"birra" e come nome marca + stile (per esempio "Birra <Marca> Pils", "Birra <Marca> Blanche", "Birra <Marca> Session IPA"): un elemento per ogni stile diverso. Trascrivi i nomi con gli accenti esatti dell\'etichetta.';};
window.v46Beer=(v,NEW)=>{const t=String(v.tipo||'').toLowerCase();if(!/birr|beer/.test(t)&&!/^birra\b/i.test(v.nome||''))return false;
let name=String(v.nome).trim().replace(/\s+/g,' ');if(!/^birra\b/i.test(name))name='Birra '+name;
const beers=(state.menu||[]).filter(m=>m.cat==='2 Bevande'&&(m.wtype==='birre'||/\bbirr/i.test(m.name)));
const brandW=w=>w!=='birra'&&w.length>2;const words=norm(name).split(' ').filter(brandW);
beers.forEach(m=>{norm(m.name).split(' ').filter(brandW).forEach(w=>{const i=words.indexOf(w);if(i<0){const j=words.findIndex(x=>x.length>=3&&w.startsWith(x)&&w.length-x.length<=2);if(j>=0){const orig=m.name.split(/\s+/).find(p=>norm(p)===w);if(orig)name=name.replace(new RegExp('\\b'+words[j]+'\\b','i'),orig);words[j]=w;}}});});
const ex=beers.find(m=>norm(m.name)===norm(name));if(ex){if(ex.soldOut)ex.soldOut=false;return true;}
if(NEW.some(x=>norm(x.name)===norm(name)))return true;
const brand=words[0]||'';const same=beers.find(m=>brand&&norm(m.name).includes(brand));
NEW.push({name,price:same?same.price:'',on:!!same,wt:'birre',ann:''});return true;};
function stat(){const c=$('wcCard');if(!c)return;let e=$('wcStat');if(!e){e=document.createElement('div');e.id='wcStat';e.className='fc-sub';e.style.cssText='margin:-2px 0 8px;font-weight:800;';const b=c.querySelector('button');if(b)b.before(e);}
const W=(state.menu||[]).filter(m=>isWineItem(m)&&classifyWineItem(m.name)!=='calici'),full=W.filter(m=>m.uv&&m.alc).length;let L={};try{L=JSON.parse(localStorage.getItem('alicetta_wine_net')||'{}');}catch(x){}
const t=L.at?new Date(L.at).toLocaleString('it-IT',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}):'';
const h=`📋 Schede con uvaggio e gradazione: <b>${full} di ${W.length}</b>${t?' · ultima ricerca '+t:' · nessuna ricerca ancora'}${L.err?' · <span style="color:#B91C1C">⚠️ '+escH(String(L.err).slice(0,90))+'</span>':''}${L.toolErr?'<br>🔎 Ricerca Google non disponibile con la tua chiave: <span style="color:#B45309">'+escH(String(L.toolErr).slice(0,160))+'</span>. Schede preparate da Gemini: <b>da verificare</b>.':''}`;if(e.innerHTML!==h)e.innerHTML=h;}
setInterval(()=>{try{stat();}catch(x){}},1500);
})();
}catch(e){console.error("chef-extra blocco 1",e);}
try{
(function(){
const M=['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'],G=['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
const pad=n=>String(n).padStart(2,'0'),iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const tday=()=>{const d=new Date();if(d.getHours()<5)d.setDate(d.getDate()-1);d.setHours(12,0,0,0);return d;};
window.v47Nav=d=>{const x=new Date(d+'T12:00'),t=tday(),diff=Math.round((x-t)/864e5),tag=diff===0?'OGGI':diff===1?'DOMANI':diff===-1?'IERI':'';
return `<div class="rv-nav"><button class="rv-a" onclick="v47Day(-1)" aria-label="Giorno prima">◀</button><button class="rv-d" onclick="v47Pick()"><small>📋 Elenco prenotazioni di</small>📅 ${G[x.getDay()]} ${x.getDate()} ${M[x.getMonth()]}${tag?' · '+tag:''}</button><button class="rv-a" onclick="v47Day(1)" aria-label="Giorno dopo">▶</button></div>`;};
window.v47Day=n=>{const e=document.getElementById('rView');if(!e)return;const x=new Date((e.value||iso(tday()))+'T12:00');x.setDate(x.getDate()+n);e.value=iso(x);renderResList();};
window.v47Pick=()=>{const e=document.getElementById('rView');if(!e)return;try{if(e.showPicker){e.showPicker();return;}}catch(x){}const v=prompt('Quale giorno vuoi vedere? (gg/mm/aaaa)','');if(!v)return;const m=v.match(/(\d{1,2})\D(\d{1,2})\D(\d{2,4})/);if(m){e.value=(m[3].length===2?'20'+m[3]:m[3])+'-'+pad(m[2])+'-'+pad(m[1]);renderResList();}};
})();
}catch(e){console.error("chef-extra blocco 2",e);}
try{
(function(){
const $=id=>document.getElementById(id);const MAX=6;let P=[],CB=null,U=[];
function draw(){U.forEach(u=>URL.revokeObjectURL(u));U=P.map(f=>URL.createObjectURL(f));const n=P.length;
$('bpBox').innerHTML=`<h3 style="color:var(--logo-coral);margin-bottom:2px;">📄 Pagine della bolla</h3><div class="fc-sub">Se la bolla o la fattura ha più pagine, aggiungile tutte prima di farla leggere. Massimo ${MAX}.</div>
<div class="bp-grid">${P.map((f,i)=>`<div class="bp-it"><img src="${U[i]}" alt="Pagina ${i+1}"><b>${i+1}</b><button onclick="v48Rm(${i})" aria-label="Togli pagina ${i+1}">✕</button></div>`).join('')}</div>
${n<MAX?`<div class="bp-add"><button class="btn-main btn-print" onclick="v48Add(true)">📷 Aggiungi pagina</button><button class="btn-note" onclick="v48Add(false)">🖼️ Dalla galleria</button></div>`:''}
<button class="btn-main btn-bill" style="width:100%;margin-top:10px;" ${n?'':'disabled'} onclick="v48Go()">✅ Leggi la bolla (${n} ${n===1?'pagina':'pagine'})</button>
<div class="modal-actions"><button class="btn-modal" style="background:#334155;color:#fff;" onclick="v48Close()">Annulla</button></div>`;
$('bpModal').classList.add('active');}
window.v48Pages=(files,cb)=>{P=files.slice(0,MAX);CB=cb;draw();};
window.v48Add=cam=>{const i=document.createElement('input');i.type='file';i.accept='image/*';if(cam)i.capture='environment';else i.multiple=true;i.onchange=()=>{const f=[...i.files];if(!f.length)return;P=P.concat(f).slice(0,MAX);draw();};i.click();};
window.v48Rm=i=>{P.splice(i,1);if(!P.length)return v48Close();draw();};
window.v48Close=()=>{$('bpModal').classList.remove('active');U.forEach(u=>URL.revokeObjectURL(u));U=[];P=[];};
window.v48Go=()=>{if(!P.length||!CB)return;const f=P.slice();$('bpModal').classList.remove('active');setTimeout(()=>{U.forEach(u=>URL.revokeObjectURL(u));U=[];},3000);P=[];CB(f);};
})();
}catch(e){console.error("chef-extra blocco 3",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const c=v=>Math.round(Number(v||0)*100);const eur=n=>'€ '+formatPrice(n);
const hm=ts=>new Date(ts).toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'});
let tt=0;function toast(m,ms){__toast(m,ms||2800,1)}
let TID=null;const T=()=>state.tables[TID];
const dist=(cents,n)=>{const b=Math.floor(cents/n),r=cents-b*n;return Array.from({length:n},(_,i)=>(b+(i<r?1:0))/100);};
const tot=t=>Math.round(getTableTotal(t)*100)/100;
const paidSum=sp=>sp.shares.filter(x=>x.paid).reduce((a,x)=>a+c(x.amt),0)/100;
const save=()=>{try{saveState(false,{tables:[TID]});}catch(e){}};
function fix(t){const sp=t.split;if(!sp)return;const open=sp.shares.filter(x=>!x.paid&&!x.pend),rest=c(tot(t))-sp.shares.filter(x=>x.paid||x.pend).reduce((a,x)=>a+c(x.amt),0);if(open.length&&sp.shares.reduce((a,x)=>a+c(x.amt),0)!==c(tot(t))){const d=dist(Math.max(0,rest),open.length);open.forEach((x,i)=>x.amt=d[i]);}}
function draw(){const t=T();if(!t)return;const sp=t.split,T0=tot(t);let h=`<div class="cs-h"><h3>👥 Conto diviso · ${esc(t.name)}</h3><button class="btn-note" onclick="v49Close()">Chiudi</button></div>`;
if(!sp){h+=`<div style="font-size:1.6rem;font-weight:900;text-align:center;margin:6px 0;">${eur(T0)}</div><div style="font-weight:800;">In quante persone dividere il conto?</div><div class="sp-n">${[2,3,4,5,6,7,8,9,10].map(n=>`<button onclick="v49Make(${n})">${n}</button>`).join('')}<button onclick="v49Make(0)" style="width:auto;padding:0 12px;border-radius:23px;">altro…</button></div><div class="fc-sub">Le quote sono uguali e calcolate al centesimo. Dopo puoi cambiare l’importo di una quota: le altre si adeguano da sole.</div>`;}
else{fix(t);const P=paidSum(sp),R=Math.max(0,Math.round((T0-P)*100)/100);
h+=`<div class="sp-tot"><div><small>Totale</small><b>${eur(T0)}</b></div><div><small>Pagato</small><b style="color:#16A34A">${eur(P)}</b></div><div><small>Da pagare</small><b style="color:#DC2626">${eur(R)}</b></div></div><div class="sp-bar"><i style="width:${T0?Math.min(100,P/T0*100):0}%"></i></div>`;
h+=sp.shares.map((x,i)=>{const lab=`Quota ${i+1} di ${sp.shares.length}`;
if(x.paid)return`<div class="sp-row paid"><div class="sp-h"><span>✅ ${lab}</span><span>${eur(x.amt)}</span></div><div class="sp-s">${({tap:'💳 Carta SumUp (Tap to Pay)',term:'💳 Carta su Terminal SumUp',su:'💵 Contanti con SumUp',loc:'💵 Contanti cassa locale'})[x.via]||(x.paid==='carta'?'💳 Carta con SumUp':'💵 Contanti')} · ${hm(x.at)}${x.by?' · '+esc(x.by):''} <button class="btn-note" style="padding:2px 8px;font-size:.72rem;margin-left:6px;" onclick="v49Undo(${i})">↺ annulla</button></div></div>`;
if(x.pend)return`<div class="sp-row pend"><div class="sp-h"><span>⏳ ${lab}</span><span>${eur(x.amt)}</span></div><div class="sp-s">SumUp avviato alle ${hm(x.pend)}: è andato a buon fine?</div><div class="sp-b"><button style="background:#16A34A;color:#fff" onclick="v49Paid(${i},'carta')">✅ Sì, pagato</button><button style="background:#fff;color:#062329" onclick="v49NoPend(${i})">✖ No</button></div></div>`;
return`<div class="sp-row"><div class="sp-h"><span>${lab}</span><button class="amt" onclick="v49Amt(${i})" aria-label="Cambia importo">${eur(x.amt)} ✏️</button></div><div class="sp-b"><button style="background:#1BE7FF;color:#062329" onclick="v49Sum(${i})">💳 Carta SumUp<br><small>Tap to Pay</small></button><button style="background:#2563EB;color:#fff" onclick="v49Paid(${i},'carta','term')">💳 Carta<br><small>Terminal SumUp</small></button><button style="background:#16A34A;color:#fff" onclick="v49Paid(${i},'contanti','su')">💵 Contanti<br><small>con SumUp</small></button><button style="background:#065F46;color:#fff" onclick="v49Paid(${i},'contanti','loc')">💵 Contanti<br><small>cassa locale</small></button></div></div>`;}).join('');
if(Math.abs(sp.shares.reduce((a,x)=>a+c(x.amt),0)-c(T0))>0&&!sp.shares.some(x=>!x.paid&&!x.pend))h+=`<div class="fc-sub" style="color:#B45309;font-weight:800;">⚠️ Il totale è cambiato dopo i pagamenti: aggiungi una quota per la differenza.</div>`;
h+=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px;"><button class="btn-note" onclick="v49AddQ()">➕ Aggiungi quota</button><button class="btn-note" style="background:#FEE2E2;color:#991B1B;border-color:#991B1B;" onclick="v49Cancel()">🗑️ Annulla divisione</button></div>`;}
$('spBox').innerHTML=h;$('spModal').classList.add('active');}
window.v49Open=id=>{TID=id||state.activeTableId;const t=T();if(!t||!t.items||!t.items.length)return alert('Nessun ordine attivo.');draw();};
window.v49Close=()=>{$('spModal').classList.remove('active');};
window.v49Make=n=>{const t=T();if(!t)return;if(!n){const v=parseInt(prompt('In quante persone?','11'),10);if(!(v>1&&v<=40))return;n=v;}t.split={n,shares:dist(c(tot(t)),n).map(a=>({amt:a,paid:null}))};save();draw();};
window.v49Amt=i=>{const t=T(),sp=t&&t.split;if(!sp)return;const x=sp.shares[i];const v=parseFloat(String(prompt('Importo della quota '+(i+1)+' (€):',formatPrice(x.amt))||'').replace(',','.'));if(isNaN(v)||v<=0)return;
const others=sp.shares.filter((y,j)=>j!==i&&!y.paid&&!y.pend),fixedC=sp.shares.filter((y,j)=>j!==i&&(y.paid||y.pend)).reduce((a,y)=>a+c(y.amt),0),rest=c(tot(t))-fixedC-c(v);
if(rest<0||(!others.length&&rest!==0))return alert('Con questo importo le quote non tornano con il totale di '+eur(tot(t))+'.');x.amt=Math.round(v*100)/100;const d=others.length?dist(rest,others.length):[];others.forEach((y,k)=>y.amt=d[k]);save();draw();};
window.v49AddQ=()=>{const t=T(),sp=t&&t.split;if(!sp)return;sp.shares.push({amt:0,paid:null});const open=sp.shares.filter(y=>!y.paid&&!y.pend),rest=c(tot(t))-sp.shares.filter(y=>y.paid||y.pend).reduce((a,y)=>a+c(y.amt),0),d=dist(Math.max(0,rest),open.length);open.forEach((y,k)=>y.amt=d[k]);sp.n=sp.shares.length;save();draw();};
window.v49Cancel=()=>{const t=T();if(!t||!t.split)return;if(t.split.shares.some(x=>x.paid)&&!confirm('Alcune quote sono già pagate. Annullare comunque la divisione? I pagamenti segnati andranno persi.'))return;delete t.split;save();draw();};
window.v49Undo=i=>{const t=T(),x=t&&t.split&&t.split.shares[i];if(!x||!confirm('Segnare di nuovo da pagare la quota '+(i+1)+'?'))return;x.paid=null;delete x.at;delete x.by;save();draw();};
window.v49NoPend=i=>{const t=T(),x=t&&t.split&&t.split.shares[i];if(!x)return;delete x.pend;save();draw();};
function maybeClose(t){const sp=t.split;if(!sp||sp.shares.some(x=>!x.paid))return false;const cash=sp.shares.filter(x=>x.paid==='contanti').reduce((a,x)=>a+c(x.amt),0)/100,card=sp.shares.filter(x=>x.paid==='carta').reduce((a,x)=>a+c(x.amt),0)/100;
if(c(cash+card)<c(tot(t)))return false;const loc=sp.shares.filter(x=>x.paid==='contanti'&&x.via==='loc').reduce((a,x)=>a+c(x.amt),0)/100,csu=Math.round((cash-loc)*100)/100;const pay={m:cash&&card?'misto':(card?'carta':'contanti'),cash,card,via:loc>=cash+card-0.001?'Registratore':(loc>0?'SumUp + cassa locale':'SumUp'),cashSU:csu,cashLoc:loc,split:sp.shares.length,parts:sp.shares.map(x=>({a:x.amt,m:x.paid,v:x.via||''}))};
$('spModal').classList.remove('active');state.activeTableId=t.id;toast(`✅ ${esc(t.name)}: tutte le ${sp.shares.length} quote pagate, tavolo chiuso`);freeCurrentTable(pay);return true;}
window.v49Paid=(i,m,v)=>{const t=T(),x=t&&t.split&&t.split.shares[i];if(!x)return;x.paid=m;x.via=v||(m==='carta'?'tap':'su');x.at=Date.now();x.by=(state.waiterName||'').trim();delete x.pend;save();if(!maybeClose(t))draw();};
window.v49Sum=i=>{const t=T(),x=t&&t.split&&t.split.shares[i];if(!x)return;
const key=(localStorage.getItem('alicetta_sumup_key')||'').trim(),app=(localStorage.getItem('alicetta_sumup_app')||'').trim();if(!key||!app)return alert('Inserisci Affiliate Key e App ID SumUp nelle Opzioni.');
if(!confirm('Incassare '+eur(x.amt)+' con SumUp (quota '+(i+1)+' di '+t.split.shares.length+')?'))return;
x.pend=Date.now();save();draw();
const amt=Number(x.amt).toFixed(2),cb=location.origin+location.pathname+'?sumup=1&tb='+encodeURIComponent(t.id)+'&sq='+i,ios=/iPhone|iPad|iPod/i.test(navigator.userAgent),tx=t.id+'-q'+i+'-'+Date.now(),title=t.name+' · quota '+(i+1)+'/'+t.split.shares.length;
const q=ios?{'affiliate-key':key,'app-id':app,amount:amt,currency:'EUR',title,'foreign-tx-id':tx,callbacksuccess:cb,callbackfail:cb+'&fail=1'}:{'affiliate-key':key,'app-id':app,total:amt,currency:'EUR',title,'foreign-tx-id':tx,callback:cb};
const qs=Object.entries(q).map(([k,v])=>k+'='+encodeURIComponent(v)).join('&');setTimeout(()=>{window.location.href=(!ios&&localStorage.getItem('alicetta_sumup_mode')!=='scheme')?'intent://pay/1.0?'+qs+'#Intent;scheme=sumupmerchant;package=com.kaching.merchant;end':'sumupmerchant://pay/1.0?'+qs;},300);};
{const _h=handleSumupReturn;handleSumupReturn=function(){let p;try{p=new URLSearchParams(location.search);}catch(e){return _h.apply(this,arguments);}
if(!p.get('sumup')||p.get('sq')===null)return _h.apply(this,arguments);
const tb=p.get('tb'),i=parseInt(p.get('sq'),10),st=(p.get('smp-status')||'').toLowerCase(),fail=p.get('fail')==='1'||st==='failed'||st==='invalidstate';
try{history.replaceState(null,'',location.pathname);}catch(e){}
const t=state.tables[tb],x=t&&t.split&&t.split.shares[i];if(!x)return;TID=tb;
if(fail){delete x.pend;save();toast('❌ Pagamento SumUp della quota '+(i+1)+' non riuscito');}
else{x.paid='carta';x.at=Date.now();x.by=(state.waiterName||'').trim();delete x.pend;save();toast('✅ Quota '+(i+1)+' pagata con SumUp');if(maybeClose(t))return;}
setTimeout(draw,300);};}
{const _f=freeCurrentTable;freeCurrentTable=function(){const t=state.tables[state.activeTableId];const r=_f.apply(this,arguments);if(t&&(!t.items||!t.items.length))delete t.split;return r;};}
splitBillPrompt=function(){v49Open();};
{const _o=openTable;openTable=function(id){const r=_o.apply(this,arguments);try{const t=state.tables[id];if(t&&t.split&&t.split.shares.some(x=>x.pend))setTimeout(()=>v49Open(id),500);}catch(e){}return r;};}
{const _r=renderTables;renderTables=function(){const r=_r.apply(this,arguments);try{document.querySelectorAll('#tablesContainer .table-card[data-tid]').forEach(cd=>{const t=state.tables[cd.dataset.tid];let e=cd.querySelector('.sp-chip');if(!t||!t.split||!t.items||!t.items.length){if(e)e.remove();return;}const n=t.split.shares.filter(x=>x.paid).length;const h=`👥 ${n}/${t.split.shares.length} quote pagate`;if(!e){e=document.createElement('div');e.className='sp-chip';e.style.cssText='margin-top:6px;font-size:.72rem;font-weight:900;background:#16A34A;color:#fff;border-radius:10px;padding:3px 8px;';cd.appendChild(e);}if(e.textContent!==h)e.textContent=h;});}catch(e){}return r;};}
$('spModal').addEventListener('click',e=>{if(e.target.id==='spModal')v49Close();});
})();
}catch(e){console.error("chef-extra blocco 4",e);}
try{
(function(){
const $=id=>document.getElementById(id);
let tt=0;function toast(m,ms){__toast(m,ms||3000,1)}
const RX=/^(cicori|patat|insalat|verdur|chips|spinac|broccol|fagiol|piselli|peperon|melanzan|zucchin|funghi|carciof|bietol|friariell|cime di rapa|rucola|caponata|purè|pure\b|contorno)/i;
window.isContorno=n=>{const t=String(n||'').trim();return RX.test(t)&&t.split(/\s+/).length<=6&&!/\b(con|al|alla|alle|ai)\b.*\b(manzo|maiale|pecora|agnello|pollo|pesce|baccal|merluzz|alici|seppi|calamar|polp|salsicc)/i.test(t);};
{const _g=guessCategoryFromDishName;guessCategoryFromDishName=function(n,fb){if((!fb||fb==='AUTO')&&isContorno(n))return'5 Contorni';return _g.apply(this,arguments);};}
{const _s=syncChalkboardToStateMenu;syncChalkboardToStateMenu=function(list){try{(list||[]).forEach(p=>{if(p&&p.cat==='5 Secondi'&&isContorno(p.name))p.cat='5 Contorni';});}catch(e){}return _s.apply(this,arguments);};}
setTimeout(()=>{try{if(!/^christian$/i.test((state.waiterName||'').trim())||localStorage.getItem('alicetta_contorni_mig'))return;localStorage.setItem('alicetta_contorni_mig','1');const L=(state.menu||[]).filter(m=>m.cat==='5 Secondi'&&isContorno(m.name));if(!L.length)return;L.forEach(m=>m.cat='5 Contorni');saveState(false,{menu:true});try{renderDishes();}catch(e){}toast('🥗 Nuova categoria Contorni: spostati '+L.map(m=>escH(m.name)).join(', '));}catch(e){}},6000);
{const _ia=itemActions;itemActions=function(id){const r=_ia.apply(this,arguments);try{const m=state.menu.find(x=>x.id===id),box=document.querySelector('#itemActModal .receipt-box');if(!m||!box||box.querySelector('.mv-chips'))return r;const h=box.querySelector('h3');const d=document.createElement('div');d.className='mv-chips';
d.innerHTML='<span>📂 Sposta in:</span>'+CATEGORIES.filter(c=>c!=='1 Coperto').map(c=>`<button class="${c===m.cat?'on':''}" onclick="v50Move(${id},'${c}')">${c.replace(/^\d+\s*/,'')}</button>`).join('');h.after(d);}catch(e){}return r;};}
window.v50Move=(id,c)=>{const m=state.menu.find(x=>x.id===id);if(!m||m.cat===c)return;const from=m.cat;m.cat=c;saveState(false,{menu:true});try{closeItemAct();}catch(e){const o=$('itemActModal');if(o)o.classList.remove('active');}try{renderDishes();}catch(e){}try{renderMenuMgr();}catch(e){}toast('📂 '+escH(m.name)+': da '+escH(from.replace(/^\d+\s*/,''))+' a '+escH(c.replace(/^\d+\s*/,'')));};
})();
}catch(e){console.error("chef-extra blocco 5",e);}
try{
(function(){
const $=id=>document.getElementById(id);
let tt=0;function toast(m,ms){__toast(m,ms||4000,1)}
const mark=(t,o)=>{if(t&&o){t.closedSess=Math.max(Number(t.closedSess)||0,Number(o)||0);t.closedAt=Date.now();}};
{const _r=resetTableObj;resetTableObj=function(t){const o=t&&t.openedAt;const r=_r.apply(this,arguments);mark(t,o);return r;};}
{const _f=freeCurrentTable;freeCurrentTable=function(pay){const id=state.activeTableId,t=state.tables[id],o=t&&t.openedAt,had=!!(t&&t.items&&t.items.length);const r=_f.apply(this,arguments);try{if(had&&t&&(!t.items||!t.items.length)&&o){mark(t,o);saveState(false,{tables:[id]});}}catch(e){}return r;};}
const base=()=>getCleanFirebaseUrl()+'/pos_state';
async function stale(id){const t=state.tables[id];if(!t||!t.items||!t.items.length||!t.openedAt||Date.now()-t.openedAt<3*3600e3)return false;
try{const r=await fetch(base()+'/tables/'+encodeURIComponent(id)+'/closedSess.json?t='+Date.now(),{cache:'no-store'});if(!r.ok)return false;const cs=Number(await r.json())||0;
if(cs&&cs>=t.openedAt){const nm=t.name;resetTableObj(t);t.closedSess=Math.max(t.closedSess||0,cs);try{delete state.pending.tables[id];}catch(x){}toast('🧹 '+escH(nm)+': su questo telefono c’era una copia vecchia di un conto già chiuso, l’ho scartata.');return true;}}catch(e){}return false;}
{const _p=pushToCloud;pushToCloud=async function(o){try{const ids=o&&o.tables&&o.tables.length?o.tables.slice():(!o||o.full?Object.keys(state.tables||{}):[]);let drop=[];for(const id of ids){if(await stale(id))drop.push(id);}
if(drop.length&&o&&o.tables)o={...o,tables:o.tables.filter(x=>!drop.includes(x))};if(drop.length){try{saveLocalOnly();renderTables();}catch(e){}}}catch(e){}return _p.call(this,o);};}
const dur=ms=>{const h=Math.floor(ms/3600e3),d=Math.floor(h/24);return d?d+(d===1?' giorno':' giorni')+(h%24?' e '+(h%24)+' h':''):h+' ore';};
{const _t=renderTables;renderTables=function(){const r=_t.apply(this,arguments);try{document.querySelectorAll('#tablesContainer .table-card[data-tid]').forEach(c=>{const t=state.tables[c.dataset.tid];let e=c.querySelector('.ghost-chip');const old=t&&t.items&&t.items.length&&t.openedAt&&Date.now()-t.openedAt>16*3600e3;
if(!old){if(e)e.remove();return;}const h='⚠️ Aperto da '+dur(Date.now()-t.openedAt)+': se è un conto vecchio, aprilo e chiudilo o eliminalo';if(!e){e=document.createElement('div');e.className='ghost-chip';e.style.cssText='margin-top:6px;font-size:.72rem;font-weight:900;background:#FEF3C7;color:#78350F;border:2px solid #F59E0B;border-radius:10px;padding:4px 8px;line-height:1.25;';c.appendChild(e);}if(e.textContent!==h)e.textContent=h;
c.querySelectorAll('*').forEach(x=>{if(x.children.length===0&&/^⏱️?\s*\d{3,}:\d{2}$/.test(x.textContent.trim()))x.textContent='⏱️ '+dur(Date.now()-t.openedAt);});});}catch(e){}return r;};}
playSimpleBell=function(){try{sndDest();const n=audioCtx.currentTime+0.02;[[1,.38,.55],[2.76,.12,.22],[5.4,.05,.1]].forEach(([m,v,d])=>{const os=audioCtx.createOscillator(),g=audioCtx.createGain();os.type='sine';os.frequency.setValueAtTime(2350*m,n);g.gain.setValueAtTime(0.0001,n);g.gain.exponentialRampToValueAtTime(v,n+0.004);g.gain.exponentialRampToValueAtTime(0.0001,n+d);os.connect(g);g.connect(sndDest());os.start(n);os.stop(n+d+0.05);});}catch(e){}};
})();
}catch(e){console.error("chef-extra blocco 6",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const isOwner=()=>/^christian$/i.test((state.waiterName||'').trim());
const FOOD=['3 Antipasti','4 Primi Piatti','5 Secondi','5 Contorni','6 Desserts'];
const noAlg=()=>(state.menu||[]).filter(m=>FOOD.includes(m.cat)&&!(Array.isArray(m.allergens)&&m.allergens.length));
const noTr=()=>{try{return missingTrItems();}catch(e){return[];}};
const todo=()=>{const a=new Set(noAlg().map(m=>m.id));noTr().forEach(m=>a.add(m.id));return a.size;};
const qrUrl=()=>new URL('menu.html',location.href).href;
function label(){const n=todo();return `🔄 Aggiorna menù clienti, QR e allergeni<small>${n?n+(n===1?' piatto da completare (traduzioni o allergeni)':' piatti da completare (traduzioni o allergeni)'):'Tutto in ordine: tocca per ricontrollare e pubblicare'}</small>`;}
function paint(){document.querySelectorAll('.sync-btn').forEach(b=>{const h=label();if(b.innerHTML!==h)b.innerHTML=h;b.classList.toggle('todo',todo()>0);});}
function place(){if(!isOwner())return;
const ob=$('oneBox');if(ob&&!$('syncA')){const w=document.createElement('div');w.id='syncA';w.innerHTML='<button class="sync-btn" onclick="v51Sync(\'A\')"></button><div class="sync-st" id="syncStA"></div>';ob.after(w);}
const ad=document.querySelector('button[onclick="openAddDish()"]');if(ad&&!$('syncB')){const box=ad.closest('div');const w=document.createElement('div');w.id='syncB';w.innerHTML='<button class="sync-btn" onclick="v51Sync(\'B\')"></button><div class="sync-st" id="syncStB"></div>';(box&&box.parentElement?box:ad).after(w);}
paint();}
let busy=false;
window.v51Sync=async which=>{if(busy)return;busy=true;const st=$('syncSt'+which)||$('syncStA');const say=h=>{if(st)st.innerHTML=h;};
try{let algAI=0,algLoc=0;const A=noAlg();
if(A.length){say(`⏳ Allergeni: completo ${A.length} ${A.length===1?'piatto':'piatti'}…`);
for(let i=0;i<A.length;i+=12){const B=A.slice(i,i+12);let ok=false;
if(getGeminiKey()&&navigator.onLine){try{const out=await v33Race(callGemini([{text:`Menù di una trattoria di pesce abruzzese. Per ogni voce restituisci SOLO un array JSON [{"id":id,"allergens":[codici tra ${ALG_CODES}]}]. Gli allergeni vanno dedotti da ingredienti e preparazioni tipiche.${window.ALG_RULES||''} Voci (id|categoria|nome):\n${B.map(m=>m.id+'|'+m.cat+'|'+m.name).join('\n')}`}],true,{fast:true,temperature:0}),60000);
let arr=jparse(out);if(!Array.isArray(arr))arr=Object.values(arr).find(Array.isArray)||[];arr.forEach(x=>{const m=state.menu.find(k=>String(k.id)===String(x&&x.id));if(m){m.allergens=algMerge(cleanAlg(x.allergens),m.name,m.cat);algAI++;}});ok=true;}catch(e){}}
B.forEach(m=>{if(!(Array.isArray(m.allergens)&&m.allergens.length)){m.allergens=algMerge([],m.name,m.cat);if(!m.allergens.length)m.allergens=['nessuno'];algLoc++;}});}}
const tr0=noTr().length;
if(tr0&&getGeminiKey()&&navigator.onLine){say(`⏳ Traduzioni: completo ${tr0} ${tr0===1?'voce':'voci'} in 12 lingue…`);try{await completeTranslations(true);}catch(e){}}
const tr1=noTr().length;
say('⏳ Pubblico il menù per il QR…');await saveState(false,{menu:true});
try{renderDishes();}catch(e){}
const parts=[];if(A.length)parts.push(`allergeni per ${A.length} ${A.length===1?'piatto':'piatti'}${algLoc&&!algAI?' (con le regole dell’app)':''}`);if(tr0)parts.push(`traduzioni per ${tr0-tr1} ${tr0-tr1===1?'voce':'voci'}`);
say(`✅ Menù clienti aggiornato: ${(state.menu||[]).length} voci pubblicate${parts.length?' · '+parts.join(' · '):''}.${tr1?' <span style="color:#B45309">'+tr1+' traduzioni restano da fare: riprova fra poco.</span>':''} <a href="${qrUrl()}" target="_blank" rel="noopener">👀 Vedi il menù come il cliente</a>`);
}catch(e){say('❌ '+esc(e.message||e));}finally{busy=false;paint();}};
{const _s=window.saveAddDish;if(typeof _s==='function'){saveAddDish=function(){const r=_s.apply(this,arguments);setTimeout(paint,800);setTimeout(paint,6000);return r;};}}
setInterval(()=>{try{place();}catch(e){}},1500);
})();
}catch(e){console.error("chef-extra blocco 7",e);}
try{
(function(){
const $=id=>document.getElementById(id);
let tt=0;function toast(m,ms){__toast(m,ms||3500,1)}
window.v53Merge=(c,l)=>{if(!c)return l;if(!l)return c;
if(c.openedAt&&l.openedAt&&c.openedAt!==l.openedAt)return (Number(l.openedAt)>Number(c.openedAt))?l:c;
const out={...c,...l};const ci=Array.isArray(c.items)?c.items:[],li=Array.isArray(l.items)?l.items:[];const byId={};ci.forEach(x=>{if(x&&x.lineId!=null)byId[x.lineId]=x;});
const items=ci.map(x=>{const y=li.find(z=>z&&z.lineId===x.lineId);if(!y)return x;const m={...x};Object.keys(y).forEach(k=>{if(y[k]===true&&!x[k])m[k]=true;});if(y.note&&!x.note)m.note=y.note;return m;});
li.forEach(y=>{if(y&&y.lineId!=null&&!byId[y.lineId]&&y.sent===false)items.push(y);});out.items=items;
['firedMandate','doneMandate'].forEach(k=>{const a=c[k]||{},b=l[k]||{};const r={};new Set([...Object.keys(a),...Object.keys(b)]).forEach(m=>{r[m]=!!(a[m]||b[m]);});out[k]=r;});
['firedAt','doneAt'].forEach(k=>{const a=c[k]||{},b=l[k]||{};const r={};new Set([...Object.keys(a),...Object.keys(b)]).forEach(m=>{const v=[a[m],b[m]].filter(Boolean).map(Number);if(v.length)r[m]=Math.min(...v);});out[k]=r;});
if(!items.length&&ci.length===0&&li.length&&!c.openedAt)return l;return out;};
setInterval(()=>{try{if(state.pushing>0&&window._pushSince&&Date.now()-window._pushSince>25000){state.pushing=0;window._pushSince=0;}}catch(e){}},5000);
let busy=false;
window.v53Reconnect=async()=>{if(busy)return;busy=true;const b=$('syncIndicator');toast('🔄 Mi ricollego al cloud…',20000);
try{state.pushing=0;window._pushSince=0;let ok=false;
try{const r=await fetch(getCleanFirebaseUrl()+'/pos_state/updatedAt.json?t='+Date.now(),{cache:'no-store',...(AbortSignal.timeout?{signal:AbortSignal.timeout(12000)}:{})});ok=r.ok;}catch(e){}
if(!ok){toast('❌ Nessuna connessione al cloud. Controlla il Wi-Fi del dispositivo e riprova. <button class="btn-note" style="margin-left:6px;" onclick="location.reload()">Ricarica l’app</button>',9000);if(b)b.textContent='Off';return;}
state.remoteStamp=0;await pullFromCloud(true);
const pend=Object.keys((state.pending||{}).tables||{}).filter(id=>state.tables[id]);
if(pend.length){try{await saveState(false,{tables:pend});}catch(e){}}
try{if($('viewKds').classList.contains('active'))renderKds();else if($('viewTables').classList.contains('active'))renderTables();else if($('viewOrder').classList.contains('active')&&state.activeTableId)renderOrderScreen();}catch(e){}
const n=Object.values(state.tables||{}).filter(t=>t.items&&t.items.length).length;
toast(`✅ Ricollegato · dati aggiornati alle ${new Date().toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'})} · ${n} ${n===1?'tavolo aperto':'tavoli aperti'}${pend.length?' · inviate '+pend.length+' modifiche in attesa':''}`,5000);
if(b){b.textContent='LIVE';b.classList.add('rc-ok');setTimeout(()=>b.classList.remove('rc-ok'),2500);}
}catch(e){toast('❌ '+escH(e.message||e),6000);}finally{busy=false;}};
window.addEventListener('online',()=>setTimeout(()=>{try{v53Reconnect();}catch(e){}},1500));
})();
}catch(e){console.error("chef-extra blocco 8",e);}
try{
(function(){
const base=()=>getCleanFirebaseUrl()+'/pos_state';const sig=()=>(window.AbortSignal&&AbortSignal.timeout?{signal:AbortSignal.timeout(15000)}:{});
async function kdsPush(id){const t=state.tables[id];if(!t)return true;const u=base()+'/tables/'+encodeURIComponent(id)+'.json';
const r=await fetch(u+'?t='+Date.now(),{cache:'no-store',...sig()});if(!r.ok)return false;const c=await r.json();
if(!c||!Array.isArray(c.items)){return (await fetch(u,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(t),...sig()})).ok;}
if(c.openedAt&&t.openedAt&&c.openedAt!==t.openedAt){Object.assign(t,c);return true;}
const rd={};(t.items||[]).forEach(i=>{if(i&&i.ready&&i.lineId!=null)rd[i.lineId]=i.readyAt||Date.now();});
c.items.forEach(ci=>{if(ci&&rd[ci.lineId]&&!ci.ready){ci.ready=true;ci.readyAt=rd[ci.lineId];}});
const body={items:c.items,doneMandate:{...(c.doneMandate||{}),...(t.doneMandate||{})},doneAt:{...(c.doneAt||{}),...(t.doneAt||{})}};
const ok=(await fetch(u,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),...sig()})).ok;
if(ok){t.items=c.items;t.doneMandate=body.doneMandate;t.doneAt=body.doneAt;['firedMandate','firedAt','sentOnce','openedAt'].forEach(k=>{if(c[k]!==undefined)t[k]=c[k];});}
return ok;}
{const _p=pushToCloud;pushToCloud=async function(o){if(!isKdsDev())return _p.call(this,o);
try{let ids=o&&o.tables?o.tables.slice():[];if(!o||o.full){ids=Object.keys(((state.pending||{}).tables)||{});o={menu:true,stock:true};}
let all=true;for(const id of ids){let ok=false;try{ok=await kdsPush(id);}catch(e){ok=false;}if(ok){try{delete state.pending.tables[id];}catch(x){}}else all=false;}
o={...(o||{}),tables:[]};if(!all){const b=document.getElementById('syncIndicator');if(b)b.textContent='Off';}
try{saveLocalOnly();}catch(e){}
if(ids.length){try{renderKds();}catch(e){}}
}catch(e){}
return _p.call(this,o);};}
})();
}catch(e){console.error("chef-extra blocco 9",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
let tt=0;function toast(m,ms){__toast(m,ms||3000,1)}
const num=v=>{const n=parseFloat(String(v==null?'':v).replace(',','.'));return isNaN(n)?0:n;};
const eur=n=>'€ '+formatPrice(n);
const dfmt=d=>String(d||'').split('-').reverse().join('/');
const nk=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const pad=n=>String(n).padStart(2,'0');
const svc=()=>{const d=new Date();if(d.getHours()<5)d.setDate(d.getDate()-1);return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());};

const SIGNS=['Alice Di Mascio','Christian Carafa'];
const normSign=s=>{const t=nk(s);if(/mascio|alice/.test(t))return'Alice Di Mascio';if(/carafa|christian/.test(t))return'Christian Carafa';return'';};
const slotOf=t=>t?(parseInt(t.slice(0,2),10)<15?'m':'s'):'m';
function eqList(){try{if(window.v2916Eq)return v2916Eq();}catch(e){}return[{id:'e1',n:'Frigo cucina',min:0,max:4,sn:2},{id:'e2',n:'Frigo pesce',min:0,max:2,sn:1},{id:'e3',n:'Frigo sala',min:0,max:4,sn:4},{id:'e4',n:'Congelatore',min:-30,max:-18,sn:5}];}
function existD(id,date,slot){try{const H=JSON.parse(localStorage.getItem('alicetta_haccp')||'{}'),L=(H.log||{})[date.slice(0,7)]||{},x=L[date.slice(8,10)+'_t_'+id+'_'+slot];return x?{v:String(x.v).replace('.',',')}:null;}catch(e){return null;}}
const exist=(id,slot)=>existD(id,svc(),slot);
function inject(){document.querySelectorAll('#hcPage .hc-card, #hcModalBox .hc-card').forEach(card=>{const h=card.querySelector('h3');if(!h||!/Temperature/.test(h.textContent)||card.querySelector('.hcph'))return;const seg=card.querySelector('.seg');if(!seg)return;
const d=document.createElement('div');d.className='hcph';d.innerHTML='<div class="hcph-g"><button class="btn-main btn-print" onclick="v2915Tph(true,this)">📷 Scatta foto</button><button class="btn-main btn-bill" onclick="v2915Tph(false,this)">🖼️ Foto o file</button></div><div class="fc-sub" style="margin-top:4px;">Fotografa la scheda cartacea (anche tutto il mese) oppure il display di un frigo: leggo i valori e tu confermi.</div>';seg.after(d);});}
let it=0;const kick=()=>{clearTimeout(it);it=setTimeout(()=>{try{inject();}catch(e){}},60);};
['hcPage','hcModalBox'].forEach(id=>{const e=$(id);if(e)new MutationObserver(kick).observe(e,{childList:true});});
setInterval(()=>{try{inject();}catch(e){}},2000);
let TP=null;
window.v2915Tph=(cam,btn)=>{let slot=new Date().getHours()<15?'m':'s';try{const b=btn.closest('.hc-card').querySelector('.seg button.on');if(b)slot=/Sera/.test(b.textContent)?'s':'m';}catch(e){}
const i=document.createElement('input');i.type='file';if(cam){i.accept='image/*';i.capture='environment';}else{i.accept='image/*,application/pdf';i.multiple=true;}
i.onchange=()=>{const f=[...i.files];if(f.length)tpRead(f,slot);};i.click();};
async function toPart(f){if(f.type==='application/pdf'){if(f.size>9e6)throw new Error('PDF troppo grande (massimo 9 MB)');const b=await new Promise((ok,ko)=>{const r=new FileReader();r.onload=()=>ok(String(r.result).split(',')[1]);r.onerror=ko;r.readAsDataURL(f);});return{inline_data:{mime_type:'application/pdf',data:b}};}
return{inline_data:{mime_type:'image/jpeg',data:await shrinkImage(f,2400)}};}
function guess(x,eq){const n=parseInt(x.numero,10);if(n>0){const e=eq.filter(q=>q.sn===n);if(e.length===1)return e[0].id;}
const m=String(x.etichetta||'').match(/N\s*[°º.]?\s*(\d{1,2})/i);if(m){const e=eq.filter(q=>q.sn===parseInt(m[1],10));if(e.length===1)return e[0].id;}
const l=nk(x.etichetta);if(!l)return'';const hit=eq.filter(e=>{const w=nk(e.n).split(' ').filter(y=>y.length>2);return w.length&&w.every(y=>l.includes(y));});return hit.length===1?hit[0].id:'';}
async function tpRead(files,slot){const eq=eqList();TP={busy:true,msg:'⏳ Leggo '+(files.length>1?files.length+' file':'la foto')+'… (la scheda di un mese può richiedere un minuto)',slot,rows:[]};$('tphModal').classList.add('active');tpDraw();
try{if(!getGeminiKey())throw new Error('Serve la chiave Gemini: inseriscila in ⚙️ Opzioni.');
const parts=[];for(const f of files.slice(0,6))parts.push(await toPart(f));
parts.push({text:`Le immagini (o PDF) possono essere di due tipi.\nTIPO A: una SCHEDA CARTACEA di registrazione delle temperature (HACCP) di un ristorante, con intestazione "Mese" e "Anno", una riga per ogni giorno (Data 01-31), la colonna ORARIO, le colonne "Temp. N°1 … Temp. N°10" (di solito sono scritte solo alcune, per esempio la 1, la 2, la 4 e la 5; la 3 può essere vuota), le azioni correttive e la firma "Addetto al controllo".\nTIPO B: la foto di un termometro o di un display di un frigorifero o congelatore.\nApparecchi del locale (id | nome | numero della colonna sulla scheda | limiti in °C):\n${eq.map(e=>e.id+' | '+e.n+' | N°'+(e.sn||'?')+' | '+e.min+' / '+e.max).join('\n')}\nPer il TIPO A rispondi con "righe": una per ogni giorno che ha dei valori scritti, con "giorno" (numero), "orario" (HH:MM, 24 ore, come scritto; null se non si legge), "valori" (oggetto: chiave = numero della colonna Temp N° come stringa, valore = numero; il segno + è solo positivo, il meno indica sotto zero, il congelatore è di solito intorno a -20; usa il punto decimale; null se non si legge), "firma" (testo della firma o null), "chiuso" (true se la riga dice chiuso o è sbarrata). Non inventare righe vuote. Leggi tutte le righe, dalla prima all'ultima. Riporta anche "mese" (1-12) e "anno" scritti in intestazione (null se non si leggono).\nPer il TIPO B rispondi con "letture": per ogni valore "numero" (il numero N° scritto sul display o sull'etichetta, o null), "etichetta" (testo letto vicino o null), "apparecchio_id" (id sopra, solo se lo capisci, altrimenti null), "valore" (numero, negativo se sotto zero), "foto" (numero d'ordine dell'immagine). Se un display mostra minima e massima prendi solo la temperatura attuale.\nRispondi SOLO con JSON: {"mese":null,"anno":null,"righe":[],"letture":[]}. Non inventare valori che non si leggono.`});
const out=await (window.v33Race||((p)=>p))(callGemini(parts,true,{temperature:0,timeout:100000}),115000);
let o=jparse(out);if(Array.isArray(o))o={letture:o};
const rs=Array.isArray(o.righe)?o.righe:[];
if(rs.length){const now=svc();let mese=parseInt(o.mese,10),anno=parseInt(o.anno,10);if(!(mese>=1&&mese<=12))mese=+now.slice(5,7);if(!(anno>=2020&&anno<=2100))anno=+now.slice(0,4);const dim=new Date(anno,mese,0).getDate(),seen=new Set();
const rows=[];rs.forEach(r=>{const g=parseInt(r&&r.giorno,10);if(!(g>=1&&g<=dim)||seen.has(g))return;seen.add(g);const vals={};Object.entries(r.valori||{}).forEach(([k,v])=>{const n=parseInt(k,10),x=parseFloat(String(v).replace(',','.'));if(n>0&&n<=10&&isFinite(x)&&x>=-60&&x<=150)vals[n]=x;});const t=String(r.orario||'').match(/(\d{1,2})[:.](\d{2})/),time=t&&+t[1]<24&&+t[2]<60?pad(+t[1])+':'+t[2]:'';
rows.push({date:anno+'-'+pad(mese)+'-'+pad(g),time,vals,sign:normSign(r.firma),on:!r.chiuso&&Object.keys(vals).length>0});});
rows.sort((a,b)=>a.date.localeCompare(b.date));const cols=[...new Set(rows.flatMap(r=>Object.keys(r.vals).map(Number)))].sort((a,b)=>a-b);
if(!rows.length||!cols.length)throw new Error('Non riesco a leggere i valori della scheda: avvicinati, con più luce, e prova a fotografare metà foglio alla volta.');
const map={};cols.forEach(n=>{const e=eq.filter(q=>q.sn===n);map[n]=e.length===1?e[0].id:'';});
TP={mode:'tab',busy:false,rows,cols,map,sign:SIGNS[0],mese,anno};}
else{const ids=new Set(eq.map(e=>e.id));
const rows=(Array.isArray(o.letture)?o.letture:[]).filter(x=>x&&isFinite(parseFloat(String(x.valore).replace(',','.')))).map(x=>{const v=parseFloat(String(x.valore).replace(',','.'));const id=ids.has(x.apparecchio_id)?x.apparecchio_id:guess(x,eq);return{id,val:v,label:x.etichetta&&x.etichetta!=='null'?String(x.etichetta):'',foto:x.foto||1};}).filter(r=>r.val>=-60&&r.val<=150);
if(!rows.length)throw new Error('Non riesco a leggere nessuna temperatura: avvicinati al display, con più luce, e riprova.');
TP={mode:'one',busy:false,slot,rows};}}
catch(e){TP={busy:false,err:e.message||String(e)};}
tpDraw();}
const bad=(e,v)=>{if(!e||v==null||!isFinite(v))return false;let x=v;if(e.max<0&&x>0)x=-x;return x<e.min||x>e.max;};
function tpDraw(){const box=$('tphBox');if(!box||!TP)return;const eq=eqList();let h='<div class="cs-h"><h3>📷 Temperature da foto o file</h3></div>';
if(TP.busy){box.innerHTML=h+`<div class="fc-sub gen-pulse" style="font-weight:800;margin:10px 0;">${esc(TP.msg)}</div><div class="modal-actions"><button class="btn-modal" style="background:#334155;color:#fff;" onclick="v2915TpClose()">Annulla</button></div>`;return;}
if(TP.err){box.innerHTML=h+`<div style="color:#B91C1C;font-weight:800;margin:10px 0;">❌ ${esc(TP.err)}</div><div class="modal-actions"><button class="btn-modal" style="background:#334155;color:#fff;" onclick="v2915TpClose()">Chiudi</button></div>`;return;}
if(TP.mode==='tab')return tpDrawTab(box,h,eq);
const cnt={};TP.rows.forEach(r=>{if(r.id)cnt[r.id]=(cnt[r.id]||0)+1;});
h+=`<div class="fc-sub" style="margin-bottom:6px;">Controlla i valori letti e l’apparecchio di ognuno, poi salva. Se un valore è sbagliato, correggilo.</div><div class="seg"><button class="${TP.slot==='m'?'on':''}" onclick="v2915TpSlot('m')">☀️ Mattina</button><button class="${TP.slot==='s'?'on':''}" onclick="v2915TpSlot('s')">🌙 Sera</button></div>`;
h+=TP.rows.map((r,i)=>{const e=eq.find(x=>x.id===r.id);let v=Number(r.val);if(e&&e.max<0&&v>0)v=-v;const out=!!e&&(v<e.min||v>e.max),ex=r.id?exist(r.id,TP.slot):null,dup=r.id&&cnt[r.id]>1;
return`<div class="tp-row${out?' bad':''}"><select onchange="v2915TpSel(${i},this.value)"><option value="">— ignora —</option>${eq.map(x=>`<option value="${esc(x.id)}"${x.id===r.id?' selected':''}>${esc(x.n)}${x.sn?' (N°'+x.sn+')':''}</option>`).join('')}</select><input inputmode="decimal" value="${esc(String(r.val).replace('.',','))}" oninput="v2915TpVal(${i},this.value)" aria-label="Temperatura in gradi"><div class="tp-lbl">foto ${esc(r.foto)}${r.label?' · letto «'+esc(r.label)+'»':''}${out?' · <b style="color:#B91C1C">⚠️ fuori limite ('+e.min+' / '+e.max+')</b>':''}${ex?' · già registrato '+esc(ex.v)+'° (verrà sostituito)':''}${dup?' · <b style="color:#B45309">apparecchio ripetuto: vale il primo</b>':''}${!r.id?' · scegli l’apparecchio':''}</div></div>`;}).join('');
const n=new Set(TP.rows.filter(r=>r.id&&isFinite(r.val)).map(r=>r.id)).size;
h+=`<div class="modal-actions" style="margin-top:12px;"><button class="btn-modal" style="background:#334155;color:#fff;" onclick="v2915TpClose()">Annulla</button><button class="btn-modal" style="background:#0891B2;color:#fff;" onclick="v2915TpApply()">💾 Salva ${n} ${n===1?'temperatura':'temperature'}</button></div>`;
const ae=document.activeElement;if(ae&&box.contains(ae)&&ae.tagName==='INPUT')return;box.innerHTML=h;}
function tpDrawTab(box,h,eq){const T=TP,MESI=['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
const on=T.rows.filter(r=>r.on),cells=on.reduce((s,r)=>s+T.cols.filter(n=>T.map[n]&&r.vals[n]!=null&&isFinite(r.vals[n])).length,0);
h+=`<div class="fc-sub" style="margin-bottom:8px;">Ho letto la scheda di <b>${MESI[T.mese-1]} ${T.anno}</b>: ${T.rows.length} giorni. Controlla le colonne, gli orari e i valori (in rosso quelli fuori limite), poi salva. L’orario decide se vale come mattina (prima delle 15) o sera.</div>`;
h+=`<div class="hc-sub" style="margin-top:0">Colonne della scheda → apparecchi</div>`+T.cols.map(n=>`<div class="tp-map"><b>N°${n}</b><select onchange="v2915TpMap(${n},this.value)"><option value="">— ignora —</option>${eq.map(x=>`<option value="${esc(x.id)}"${T.map[n]===x.id?' selected':''}>${esc(x.n)} (${x.min} / ${x.max} °C)</option>`).join('')}</select></div>`).join('')+`<div class="fc-sub">Le corrispondenze si ricordano per le prossime volte.</div>`;
h+=`<div class="hc-sub">Firma di chi ha fatto i controlli</div><div class="chips" style="margin:2px 0 8px;">${SIGNS.map(s=>`<button class="chipb${T.sign===s?' on':''}" onclick="v2915TpSign('${s}')">✍️ ${s}</button>`).join('')}</div>`;
h+=`<div class="chips" style="margin:2px 0 6px;"><button class="chipb" onclick="v2915TpAll(true)">☑️ Tutti i giorni</button><button class="chipb" onclick="v2915TpAll(false)">☐ Nessuno</button></div>`;
h+=T.rows.map((r,i)=>{const sl=slotOf(r.time),ex=T.cols.some(n=>T.map[n]&&existD(T.map[n],r.date,sl));const d=r.date.slice(8,10)+'/'+r.date.slice(5,7);
return`<div class="tp-day${r.on?'':' off'}"><div class="tp-dh"><input type="checkbox" ${r.on?'checked':''} onchange="v2915TpOn(${i},this.checked)" aria-label="Includi il giorno"><b>${d}</b><input type="time" value="${esc(r.time)}" onchange="v2915TpTime(${i},this.value)" aria-label="Orario"><span class="tp-sl" id="tpsl${i}">${sl==='m'?'☀️ mattina':'🌙 sera'}</span>${r.sign?`<span class="tp-ex" style="background:#E0F2FE;color:#075985">✍️ ${esc(r.sign.split(' ')[0])}</span>`:''}${ex?'<span class="tp-ex">già presente: lo sostituisco</span>':''}</div><div class="tp-cells">${T.cols.map(n=>{const e=eq.find(x=>x.id===T.map[n]),v=r.vals[n];return`<label class="${bad(e,v)?'bad':''}"><small>N°${n}${e?' '+esc(e.n):' —'}</small><input inputmode="decimal" value="${v==null?'':String(v).replace('.',',')}" oninput="v2915TpCell(${i},${n},this)" aria-label="N° ${n}"></label>`;}).join('')}</div></div>`;}).join('');
h+=`<div class="modal-actions" style="margin-top:12px;"><button class="btn-modal" style="background:#334155;color:#fff;" onclick="v2915TpClose()">Annulla</button><button class="btn-modal" style="background:#0891B2;color:#fff;" onclick="v2915TpApply()">💾 Salva ${on.length} ${on.length===1?'giorno':'giorni'} (${cells} valori)</button></div>`;
const ae=document.activeElement;if(ae&&box.contains(ae)&&ae.tagName==='INPUT'&&ae.type!=='checkbox')return;box.innerHTML=h;}
window.v2915TpClose=()=>{$('tphModal').classList.remove('active');TP=null;};
window.v2915TpSlot=s=>{if(TP){TP.slot=s;tpDraw();}};
window.v2915TpSel=(i,v)=>{if(TP&&TP.rows[i]){TP.rows[i].id=v;tpDraw();}};
window.v2915TpVal=(i,v)=>{if(TP&&TP.rows[i]){const n=parseFloat(String(v).replace(',','.'));TP.rows[i].val=isNaN(n)?NaN:n;}};
window.v2915TpMap=(n,id)=>{if(!TP)return;TP.map[n]=id;Object.keys(TP.map).forEach(k=>{if(+k!==n&&id&&TP.map[k]===id)TP.map[k]='';});tpDraw();};
window.v2915TpSign=s=>{if(TP){TP.sign=s;tpDraw();}};
window.v2915TpAll=v=>{if(TP&&TP.rows){TP.rows.forEach(r=>{r.on=v&&Object.keys(r.vals).length>0;});tpDraw();}};
window.v2915TpOn=(i,v)=>{if(TP&&TP.rows[i]){TP.rows[i].on=!!v;tpDraw();}};
window.v2915TpTime=(i,v)=>{if(!TP||!TP.rows[i])return;TP.rows[i].time=v||'';const e=$('tpsl'+i);if(e)e.textContent=slotOf(v)==='m'?'☀️ mattina':'🌙 sera';};
window.v2915TpCell=(i,n,el)=>{if(!TP||!TP.rows[i])return;const x=parseFloat(String(el.value).replace(',','.'));if(isNaN(x))delete TP.rows[i].vals[n];else TP.rows[i].vals[n]=x;const e=eqList().find(q=>q.id===TP.map[n]);if(el.parentElement)el.parentElement.classList.toggle('bad',bad(e,isNaN(x)?null:x));};
async function applyTab(){const T=TP,eq=eqList(),out={};let cnt=0,nbad=0,days=new Set();
const sn={};T.cols.forEach(n=>{if(T.map[n])sn[n]=T.map[n];});
for(const r of T.rows.filter(q=>q.on)){const slot=slotOf(r.time),t=r.time||(slot==='m'?'09:00':'19:30'),ts=new Date(r.date+'T'+t+':00').getTime();if(isNaN(ts))continue;const ym=r.date.slice(0,7);
for(const n of T.cols){const id=T.map[n],v=r.vals[n];if(!id||v==null||!isFinite(v))continue;const e=eq.find(x=>x.id===id);if(!e)continue;let val=v;if(e.max<0&&val>0)val=-val;const ok=val>=e.min&&val<=e.max;
(out[ym]=out[ym]||{})[r.date.slice(8,10)+'_t_'+id+'_'+slot]={k:'t',d:r.date,e:id,s:slot,v:val,ts,by:r.sign||T.sign,ok,imp:1};cnt++;days.add(r.date);if(!ok)nbad++;}}
if(!cnt)return toast('Non c’è niente da salvare: controlla colonne e giorni spuntati');
$('tphModal').classList.remove('active');TP=null;
try{if(window.v2916SetSn)await v2916SetSn(sn);}catch(e){}
for(const ym of Object.keys(out)){try{await v2916WriteDays(ym,out[ym]);}catch(e){toast('⚠️ Non riesco a salvare: '+esc(e.message||e),6000);return;}}
toast(`✅ Registrate ${cnt} temperature di ${days.size} giorni${nbad?' · ⚠️ '+nbad+' fuori limite (vedi il registro del mese)':''}`,6000);}
window.v2915TpApply=async()=>{if(!TP)return;if(TP.mode==='tab')return applyTab();
if(typeof v216Temp!=='function'||typeof v216Slot!=='function')return alert('Il registro HACCP non è disponibile su questo dispositivo.');
const seen=new Set(),list=TP.rows.filter(r=>{if(!r.id||!isFinite(r.val)||seen.has(r.id))return false;seen.add(r.id);return true;});if(!list.length)return toast('Scegli almeno un apparecchio');
const slot=TP.slot,eq=eqList();$('tphModal').classList.remove('active');TP=null;v216Slot(slot);let n=0,bd=[];
for(const r of list){let inp=$('hct_'+r.id);if(!inp&&typeof v216Edit==='function'){v216Edit(r.id);inp=$('hct_'+r.id);}if(!inp)continue;
inp.value=String(r.val).replace('.',',');try{await v216Temp(r.id);n++;}catch(e){}
const e=eq.find(x=>x.id===r.id);if(e&&bad(e,r.val))bd.push(e.n);}
toast(`✅ Salvate ${n} ${n===1?'temperatura':'temperature'} (${slot==='m'?'mattina':'sera'})${bd.length?' · ⚠️ fuori norma: '+bd.map(esc).join(', '):''}`,5000);};

const FK=n=>String(n||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\b(s\.?\s?r\.?\s?l\.?s?|s\.?\s?p\.?\s?a\.?|s\.?\s?n\.?\s?c\.?|s\.?\s?a\.?\s?s\.?|soc\.?\s?coop\.?)\b/g,' ').replace(/[^a-z0-9]/g,'');
const FS={mode:'forn',q:'',year:''};let PICK=[];
const docTot=b=>num(b.tot)||(b.righe||[]).reduce((s,r)=>s+num(r.q)*num(r.pu),0);
function bolle(){const C=window.v211Data?v211Data():{};return Object.entries((C&&C.bolle)||{}).filter(([id,b])=>b&&Array.isArray(b.righe)).map(([id,b])=>({id,...b}));}
function suppliers(){const G={},map={};bolle().forEach(b=>{const k=FK(b.fornitore);if(!k)return;const key=Object.keys(G).find(x=>x===k||(k.length>4&&x.includes(k))||(x.length>4&&k.includes(x)));const g=key?G[key]:(G[k]={k,names:{},docs:[]});g.names[b.fornitore]=(g.names[b.fornitore]||0)+1;g.docs.push(b);map[b.fornitore]=g;});
Object.values(G).forEach(g=>{g.name=Object.entries(g.names).sort((a,b)=>b[1]-a[1]||b[0].length-a[0].length)[0][0];g.keys=Object.keys(g.names).map(nk);g.tot=g.docs.reduce((s,b)=>s+docTot(b),0);});
return{G:Object.values(G),map};}
function place(){const host=$('hub_sales_forn');if(!host||!host.childElementCount||$('fsCard'))return;const c=document.createElement('div');c.className='cart-section';c.id='fsCard';host.children[0].after(c);drawFs();}
function drawFs(){const c=$('fsCard');if(!c)return;
c.innerHTML=`<div class="cs-h"><h3>🔎 Cerca fornitori e prezzi</h3></div><div class="seg"><button class="${FS.mode==='forn'?'on':''}" onclick="v2915FsMode('forn')">🏭 Per fornitore</button><button class="${FS.mode==='prod'?'on':''}" onclick="v2915FsMode('prod')">🛒 Per prodotto</button></div><input id="fsQ" class="v14-in" autocomplete="off" placeholder="${FS.mode==='forn'?'Nome del fornitore (es. La Selva)':'Prodotto (es. vongole, olio, farina)'}" value="${esc(FS.q)}" oninput="v2915FsQ(this.value)"><div id="fsChips"></div><div id="fsRes"></div>`;drawRes();}
function chipsHtml(L){PICK=L.map(x=>x.v);return'<div class="chips" style="margin:4px 0 8px;">'+L.map((x,i)=>`<button class="chipb" onclick="v2915FsPick(${i})">${esc(x.t)}</button>`).join('')+'</div>';}
function drawRes(){const ch=$('fsChips'),rs=$('fsRes');if(!ch||!rs)return;if(!bolle().length){ch.innerHTML='';rs.innerHTML='<div class="fc-sub">Non ci sono ancora bolle, fatture o scontrini. Carica il primo documento qui sopra.</div>';return;}
if(FS.mode==='forn')resForn(ch,rs);else resProd(ch,rs);}
function resForn(ch,rs){const{G}=suppliers(),q=nk(FS.q).split(' ').filter(Boolean);
ch.innerHTML=chipsHtml(G.slice().sort((a,b)=>b.docs.length-a.docs.length||a.name.localeCompare(b.name)).slice(0,40).map(g=>({t:g.name+' · '+g.docs.length,v:g.name})));
if(!q.length){rs.innerHTML='<div class="fc-sub">Tocca un fornitore oppure scrivi il nome: vedrai tutte le sue bolle e fatture.</div>';return;}
const M=G.filter(g=>g.keys.some(n=>q.every(w=>n.includes(w)))).slice(0,3);
if(!M.length){rs.innerHTML='<div class="fc-sub">Nessun fornitore con questo nome.</div>';return;}
rs.innerHTML=M.map(g=>{const years=[...new Set(g.docs.map(b=>String(b.data||'').slice(0,4)).filter(Boolean))].sort().reverse(),D=g.docs.filter(b=>!FS.year||String(b.data||'').startsWith(FS.year)).sort((a,b)=>String(b.data||'').localeCompare(String(a.data||''))||(b.ts||0)-(a.ts||0)),tot=D.reduce((s,b)=>s+docTot(b),0),prod={};
D.forEach(b=>b.righe.forEach(r=>{const n=String(r.i||'').trim();if(n)prod[n]=(prod[n]||0)+num(r.q)*num(r.pu);}));const top=Object.entries(prod).sort((a,b)=>b[1]-a[1]).slice(0,6);
return`<div class="fs-h">${esc(g.name)}</div>
${years.length>1?`<div class="chips" style="margin:2px 0 4px;"><button class="chipb${!FS.year?' on':''}" onclick="v2915FsYear('')">Tutti</button>${years.map(y=>`<button class="chipb${FS.year===y?' on':''}" onclick="v2915FsYear('${y}')">${y}</button>`).join('')}</div>`:''}
<div class="fs-kpi"><div><small>Documenti</small><b>${D.length}</b></div><div><small>Totale (IVA esclusa)</small><b>${eur(tot)}</b></div><div><small>Ultimo acquisto</small><b>${D.length?dfmt(D[0].data):'—'}</b></div></div>
${top.length?`<div class="fc-sub" style="margin-bottom:6px;">Compri soprattutto: ${top.map(([n,v])=>esc(n)+' ('+eur(v)+')').join(' · ')}</div>`:''}
${D.length?D.map(b=>`<details class="fs-doc"><summary><span><b>${b.tipo==='scontrino'?'🛒 ':'📄 '}${dfmt(b.data)}</b> <span class="fc-sub">${b.righe.length} ${b.righe.length===1?'riga':'righe'}</span></span><b>${eur(docTot(b))}</b></summary><div style="margin-top:6px;">${b.righe.map(r=>`<div class="fs-ln"><span>${esc(r.i)} <span class="fc-sub">${formatPrice(num(r.q)).replace(',00','')} ${esc(r.u||'')}</span></span><span>${eur(num(r.pu))}/${esc(r.u||'')}</span></div>`).join('')}<button class="btn-note" style="margin-top:6px;background:#FEE2E2;color:#991B1B;border-color:#991B1B;" onclick="v211BlDelete('${esc(b.id)}')">🗑️ Elimina bolla</button></div></details>`).join(''):'<div class="fc-sub">Nessun documento in questo periodo.</div>'}`;}).join('');}
function resProd(ch,rs){const{map}=suppliers(),B=bolle(),q=nk(FS.q).split(' ').filter(Boolean),st=w=>w.length>4?w.slice(0,-1):w;
if(!q.length||q.join('').length<2){const c={};B.forEach(b=>b.righe.forEach(r=>{const n=String(r.i||'').trim().toLowerCase();if(n)c[n]=(c[n]||0)+1;}));
ch.innerHTML=chipsHtml(Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,24).map(([n,k])=>({t:n,v:n})));rs.innerHTML='<div class="fc-sub">Scrivi un prodotto (o tocca uno qui sopra): ti mostro i prezzi di tutti i fornitori da cui l’hai comprato.</div>';return;}
ch.innerHTML='';const G={};
B.forEach(b=>b.righe.forEach(r=>{const t=nk((r.i||'')+' '+(r.p||''));if(!q.every(w=>t.includes(st(w))))return;const pu=num(r.pu);if(!(pu>0))return;const key=(r.k||nk(r.i))+'|'+(r.u||'kg'),g=G[key]=G[key]||{name:r.i,u:r.u||'kg',P:[],last:''};const sg=map[b.fornitore];g.P.push({d:b.data||'',f:sg?sg.name:b.fornitore,fk:sg?sg.k:FK(b.fornitore),pu,q:num(r.q),tipo:b.tipo||'fattura'});if(String(b.data||'')>=g.last){g.last=String(b.data||'');g.name=r.i;}}));
const L=Object.values(G).sort((a,b)=>b.P.length-a.P.length);
if(!L.length){rs.innerHTML='<div class="fc-sub">Nessun acquisto di questo prodotto. Prova con un nome più corto (per esempio “vongol”).</div>';return;}
rs.innerHTML=L.slice(0,8).map(g=>{const S={};g.P.forEach(p=>{const s=S[p.fk]=S[p.fk]||{f:p.f,P:[]};s.P.push(p);});
const A=Object.values(S).map(s=>{s.P.sort((a,b)=>a.d.localeCompare(b.d));const l=s.P[s.P.length-1],v=s.P.map(p=>p.pu);return{f:s.f,pu:l.pu,d:l.d,tipo:l.tipo,n:s.P.length,avg:v.reduce((a,b)=>a+b,0)/v.length,mn:Math.min(...v),mx:Math.max(...v)};}).sort((a,b)=>a.pu-b.pu),best=A[0],worst=A[A.length-1];
const old=Date.now()-180*864e5,hist=g.P.slice().sort((a,b)=>b.d.localeCompare(a.d)||0);
return`<div class="fs-h">${esc(g.name)} <span class="fc-sub" style="text-transform:none;">· prezzi per ${esc(g.u)}, IVA esclusa</span></div>
${A.map((a,i)=>`<div class="bp-line${i===0&&A.length>1?' best':''}"><span class="nm">${i===0&&A.length>1?'🏆 ':''}${a.tipo==='scontrino'?'🛒 ':''}${esc(a.f)}</span><span class="pr" style="${a.d&&new Date(a.d+'T12:00').getTime()<old?'opacity:.55':''}">${eur(a.pu)}/${esc(g.u)}</span>${A.length>1?(i===0?'<span class="gp" style="background:#DCFCE7;color:#166534;">migliore</span>':`<span class="gp">+${Math.round((a.pu/best.pu-1)*100)}%</span>`):''}<span class="old" style="font-size:.66rem;">${dfmt(a.d)}</span></div><div class="fc-sub" style="margin:-1px 0 4px 2px;">media ${eur(a.avg)} · da ${eur(a.mn)} a ${eur(a.mx)} · ${a.n} ${a.n===1?'acquisto':'acquisti'}</div>`).join('')}
${A.length>1?`<div class="fc-sub" style="font-weight:800;">💡 Il più conveniente è <b>${esc(best.f)}</b>: costa il ${Math.round((1-best.pu/worst.pu)*100)}% in meno del più caro (${esc(worst.f)}).</div>`:'<div class="fc-sub">Un solo fornitore per questo prodotto: per il confronto servono acquisti da almeno due.</div>'}
<details class="fs-doc"><summary><b>📜 Tutti gli acquisti (${hist.length})</b></summary><div style="margin-top:6px;">${hist.slice(0,60).map(p=>`<div class="fs-ln"><span>${dfmt(p.d)} · ${esc(p.f)}${p.q?' <span class="fc-sub">'+formatPrice(p.q).replace(',00','')+' '+esc(g.u)+'</span>':''}</span><span>${eur(p.pu)}</span></div>`).join('')}</div></details>`;}).join('')+(L.length>8?`<div class="fc-sub" style="margin-top:8px;">Altri ${L.length-8} prodotti simili: scrivi il nome più preciso per restringere.</div>`:'');}
window.v2915FsMode=m=>{FS.mode=m;FS.q='';FS.year='';drawFs();};
let ft=0;window.v2915FsQ=v=>{FS.q=v;FS.year='';clearTimeout(ft);ft=setTimeout(drawRes,250);};
window.v2915FsPick=i=>{FS.q=PICK[i]||'';FS.year='';const e=$('fsQ');if(e)e.value=FS.q;drawRes();};
window.v2915FsYear=y=>{FS.year=y;drawRes();};

const isoD2=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
window.v2916Day=ts=>{const e=(state.historyLog||[]).find(x=>x&&x.ts===ts);if(!e)return;const cur=svcDate(e),def=cur.split('-').reverse().join('/');
const v=prompt(e.tableName+' · € '+formatPrice(e.total||0)+'\nIn che giorno va registrato il conto?\n(scrivi gg/mm/aaaa)',def);if(v==null)return;
const m=v.match(/(\d{1,2})\D+(\d{1,2})\D+(\d{2,4})/);if(!m)return alert('Data non valida: scrivila come 29/10/2026');
let y=+m[3];if(y<100)y+=2000;const mo=+m[2],d=+m[1];const chk=new Date(y,mo-1,d,12);if(chk.getMonth()!==mo-1||chk.getDate()!==d)return alert('Data non valida');
if(chk.getTime()>Date.now()+864e5)return alert('Non si può mettere un giorno nel futuro.');
const tm=String(e.time||'21:00').match(/(\d{1,2}):(\d{2})/);let hh=tm?+tm[1]:21,mi=tm?+tm[2]:0;const dt=new Date(y,mo-1,d,hh,mi);if(hh<5)dt.setDate(dt.getDate()+1);
if(isoD2(new Date(y,mo-1,d))===svcDate(e)){toast('È già registrato in quel giorno');return;}
e.moved={from:e.ts,by:(state.waiterName||'').trim(),at:Date.now()};e.ts=dt.getTime();e.date=isoD2(dt);e.mt=Date.now();
saveState(false,{history:true});try{renderConti();}catch(x){}toast('📅 Conto spostato al '+d+'/'+mo+'/'+y);};
function dayBtns(){document.querySelectorAll('#hub_sales_conti button[onclick^="v26EditTot("]').forEach(b=>{if(b.dataset.dd)return;b.dataset.dd='1';const m=(b.getAttribute('onclick')||'').match(/\((\d+)\)/);if(!m)return;const n=document.createElement('button');n.className='btn-note v2916d';n.textContent='📅 Giorno';n.setAttribute('onclick','v2916Day('+m[1]+')');b.after(n);});}
new MutationObserver(()=>{clearTimeout(window._ddT);window._ddT=setTimeout(()=>{try{dayBtns();}catch(e){}},120);}).observe(document.body,{childList:true,subtree:true});
{const _f=freeCurrentTable;freeCurrentTable=function(pay){const t=pay&&state.tables[state.activeTableId],start=Date.now();let od=null;
if(t&&t.items&&t.items.length&&t.openedAt){const a=svcDate({ts:t.openedAt}),b=svcDate({ts:start});if(a<b){const ds=a.split('-').reverse().slice(0,2).join('/');if(confirm(t.name+' è aperto dal '+ds+' e non è mai stato chiuso.\n\nOK = registro il conto nel giorno '+ds+'\nAnnulla = lo registro oggi'))od=a;}}
const r=_f.apply(this,arguments);
if(od){try{const e=(state.historyLog||[]).slice().reverse().find(x=>x&&x.ts>=start-1000);if(e){const p=od.split('-').map(Number),nts=new Date(p[0],p[1]-1,p[2],23,0).getTime();e.moved={from:e.ts,by:(state.waiterName||'').trim(),at:Date.now()};e.ts=nts;e.date=od;e.time='23:00';e.mt=Date.now();if(window._lastClose)window._lastClose.at=nts;saveState(false,{history:true});toast('📅 Conto registrato nel giorno '+od.split('-').reverse().slice(0,2).join('/'));}}catch(x){}}
return r;};}


{const _s=syncChalkboardToStateMenu;syncChalkboardToStateMenu=function(list){
const keep=(state.menu||[]).filter(m=>m&&m.cat==='5 Contorni').map(m=>({...m})),st0={};
keep.forEach(m=>{if(state.stock&&state.stock[m.id])st0[m.id]={...state.stock[m.id]};});
const r=_s.apply(this,arguments);
try{state.menu=state.menu||[];keep.forEach(m=>{const k=normDish(m.name),same=state.menu.find(x=>normDish(x.name)===k);
if(same){if(same.cat!=='5 Contorni'&&same.cat!=='1 Coperto'&&same.cat!=='2 Bevande')same.cat='5 Contorni';return;}
const id=state.menu.some(x=>x.id===m.id)?Math.max(1000,...state.menu.map(x=>Number(x.id)||0))+1:m.id;
state.menu.push({...m,id});if(st0[m.id]){state.stock=state.stock||{};state.stock[id]=st0[m.id];}});}catch(e){console.error(e);}
return r;};}

let pt=0;new MutationObserver(()=>{clearTimeout(pt);pt=setTimeout(()=>{try{place();}catch(e){}},150);}).observe(document.body,{childList:true,subtree:true});
})();
}catch(e){console.error("chef-extra blocco 10",e);}
try{
(function(){
const $=id=>document.getElementById(id);
const FOOD=['3 Antipasti','4 Primi Piatti','5 Secondi','5 Contorni','6 Desserts'];
const remain=()=>{let a=0,t=0;try{a=(state.menu||[]).filter(m=>FOOD.includes(m.cat)&&!(Array.isArray(m.allergens)&&m.allergens.length)).length;}catch(e){}try{t=missingTrItems().length;}catch(e){}return{a,t,n:a+t};};
let active=0,S=null,idle=0,hideT=0,timer=0;
function paint(cls,title,pct,sub){const b=$('mpBar');if(!b)return;b.className='on'+(cls?' '+cls:'');$('mpT').textContent=title;$('mpI').style.width=pct+'%';$('mpS').textContent=sub;}
window.v2918MpClose=()=>{const b=$('mpBar');if(b)b.className='';clearTimeout(hideT);};
function start(){if(S)return;S={peak:Math.max(1,remain().n),t0:Date.now(),worked:false};idle=0;clearTimeout(hideT);if(!timer)timer=setInterval(tick,600);tick();}
function end(r){const el=Date.now()-S.t0,worked=S.worked;S=null;clearInterval(timer);timer=0;
if(r.n===0){if(worked||el>3500){const n=(state.menu||[]).length;paint('done','✅ Menù completo',100,n+' voci pronte: tutte con gli allergeni e tradotte in 12 lingue. I clienti le vedono già dal QR.');hideT=setTimeout(v2918MpClose,9000);}else v2918MpClose();}
else paint('warn','⚠️ Elaborazione non finita',Math.round(100-r.n/Math.max(1,r.n+1)*100),'Restano '+r.n+' voci ('+r.a+' da controllare per gli allergeni, '+r.t+' da tradurre). Tocca “Aggiorna menù clienti, QR e allergeni” per completare.');}
function tick(){if(!S)return;const r=remain();if(r.n>S.peak)S.peak=r.n;if(r.n>0)S.worked=true;
if(active>0){idle=0;let pct=Math.round((S.peak-r.n)/S.peak*100);pct=Math.min(95,Math.max(4,pct));const parts=[];if(r.a)parts.push('allergeni: '+r.a+' piatti da fare');if(r.t)parts.push('traduzioni: '+r.t+' voci da fare');
paint('', 'Sto elaborando il menù… '+pct+'%',pct,parts.length?parts.join(' · '):'Pubblico il menù per i clienti…');}
else{idle+=600;if(idle>=2400)end(r);}}
const track=fn=>async function(){active++;start();try{return await fn.apply(this,arguments);}finally{active--;}};
try{completeTranslations=track(completeTranslations);}catch(e){}
try{elaboraLavagnettaZeroClick=track(elaboraLavagnettaZeroClick);}catch(e){}
try{if(typeof window.v51Sync==='function')window.v51Sync=track(window.v51Sync);}catch(e){}
try{if(typeof enrichMenuAI==='function')enrichMenuAI=track(enrichMenuAI);}catch(e){}
window.v2918Preview=()=>{let u='';try{u=state.qrUrl||'';}catch(e){}if(!u)u=new URL('menu.html',location.href).href;window.open(u,'_blank');};
{const _q=showQrModal;showQrModal=function(){const r=_q.apply(this,arguments);try{const ov=document.getElementById('qrModal');if(!ov||!ov.classList.contains('active'))return r;const box=ov.querySelector('.receipt-box');if(!box||box.querySelector('.v2918pv'))return r;const close=box.querySelector('button.btn-modal');
const b=document.createElement('button');b.className='btn-main btn-bill v2918pv';b.style.cssText='width:100%;margin-bottom:8px;';b.innerHTML='👀 Vedi il menù come lo vedono i clienti';b.setAttribute('onclick','v2918Preview()');if(close)close.before(b);else box.appendChild(b);}catch(e){}return r;};}
})();
}catch(e){console.error("chef-extra blocco 11",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const isOwner=()=>/^christian$/i.test((state.waiterName||'').trim());
const eur=n=>'€ '+formatPrice(n);
let tt=0;function toast(m,ms){__toast(m,ms||3000,0)}
const GG=['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'],MM=['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
const pad=n=>String(n).padStart(2,'0');
const addD=(s,n)=>{const d=new Date(s+'T12:00');d.setDate(d.getDate()+n);return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());};
const dlabel=s=>{const d=new Date(s+'T12:00');return GG[d.getDay()]+' '+d.getDate()+' '+MM[d.getMonth()];};

{const _g=getFilteredHistory;getFilteredHistory=function(){if(state.reportPeriod==='daily'){const d=state.repDay||svcToday();return(state.historyLog||[]).filter(e=>{try{return e&&svcDate(e)===d;}catch(x){return false;}});}return _g.apply(this,arguments);};}
window.v2919Rd=n=>{const t=svcToday(),d=addD(state.repDay||t,n);if(d>t)return;state.repDay=d;updateDailyStats();};
window.v2919RdToday=()=>{state.repDay=svcToday();updateDailyStats();};
{const _u=updateDailyStats;updateDailyStats=function(){const r=_u.apply(this,arguments);try{const c=$('dailyStats');if(c&&state.reportPeriod==='daily'){const t=svcToday(),d=state.repDay||t,tag=d===t?' · OGGI':d===addD(t,-1)?' · IERI':'';c.insertAdjacentHTML('afterbegin',`<div class="rd-nav"><button onclick="v2919Rd(-1)" aria-label="Serata prima">◀</button><b>🌙 ${dlabel(d)}${tag}</b><button onclick="v2919Rd(1)" aria-label="Serata dopo" ${d>=t?'disabled style="opacity:.35"':''}>▶</button></div>`);}}catch(e){}return r;};}

const openN=()=>Object.values(state.tables||{}).filter(t=>t&&t.items&&t.items.length).length;
function lastBillTs(){let m=0;const d=svcToday();(state.historyLog||[]).forEach(e=>{try{if(e&&svcDate(e)===d&&(e.ts||0)>m)m=e.ts;}catch(x){}});return m;}
const ccDone=()=>{try{const t=svcToday();return Object.keys(ccClosures()).some(k=>k.indexOf(t+'|')===0);}catch(e){return false;}};window.v2928CcDone=ccDone;
function closedFlag(){try{const C=JSON.parse(localStorage.getItem('alicetta_chiusura')||'{}');return !!((C.log||{})[svcToday()]||{}).closed;}catch(e){return false;}}
function check(){if(!isOwner())return;if(document.querySelector('.modal-overlay.active'))return;const h=new Date().getHours();if(!(h>=21||h<5))return;
if(openN()>0)return;const lt=lastBillTs();if(!lt)return;const age=Date.now()-lt;if(age<3000)return;if(ccDone())return;
if(Date.now()-(Number(localStorage.getItem('alicetta_endnag_t'))||0)<10*60000)return;if(Date.now()<(Number(localStorage.getItem('alicetta_cc_snooze'))||0))return;
try{const now=Date.now(),d=svcToday();if(Object.values(state.res||{}).some(r=>r&&r.date===d&&r.status==='attesa'&&resTs(r)>now-30*60000))return;}catch(e){}
localStorage.setItem('alicetta_endnag_t',String(Date.now()));show();}
function show(){const d=svcToday(),L=(state.historyLog||[]).filter(e=>{try{return e&&svcDate(e)===d;}catch(x){return false;}}),S=sumBlock(L);let au=[];try{au=(window.v31AuditLines?v31AuditLines():[]).slice(0,3);}catch(e){}
$('endBox').innerHTML=`<h3 style="color:var(--logo-coral);margin-bottom:2px;">🌙 Tutti i tavoli sono chiusi</h3><div class="fc-sub" style="font-weight:800;">Serata di ${dlabel(d)}</div>
<div class="en-k"><div><small>Incasso</small><b>${eur(S.tot)}</b></div><div><small>Coperti</small><b>${S.cop}</b></div><div><small>Conti</small><b>${S.n}</b></div></div>
<div class="fc-sub" style="margin-bottom:6px;">💵 ${eur(S.cash)} · 💳 ${eur(S.card)}${S.nd?' · ❔ '+eur(S.nd):''}</div>
${au.length?`<div class="en-w">⚠️ Da controllare:<br>${au.map(x=>'• '+esc(x)).join('<br>')}</div>`:''}
<div style="font-weight:800;margin:6px 0 2px;color:#B91C1C;">Per finire la serata fai la chiusura cassa: questa finestra torna ogni 10 minuti finché non è fatta.</div><button class="btn-main btn-bill" style="width:100%;margin-top:8px;font-size:1.1rem;" onclick="v2928Go()">🧾 Fai la chiusura cassa adesso</button>
<button class="btn-note" style="width:100%;margin-top:8px;padding:11px;" onclick="v2919Full()">📋 Checklist e riepilogo WhatsApp</button><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;"><button class="btn-note" style="padding:11px;" onclick="v2938Snooze(30)">⏰ Tra 30 min</button><button class="btn-note" style="padding:11px;" onclick="v2938Snooze(60)">⏰ Tra 1 ora</button></div>`;
$('endModal').classList.add('active');try{if(navigator.vibrate)navigator.vibrate(60);}catch(e){}}
window.v2919Later=()=>$('endModal').classList.remove('active');
window.v2919Full=()=>{$('endModal').classList.remove('active');try{switchMainView('sales');setHubPage('sales','chiusura');}catch(e){}};
window.v2919Close=async()=>{$('endModal').classList.remove('active');
(state.historyLog||[]).forEach(e=>{if(e)e.closedEvening=true;});try{await saveState(false,{history:true});}catch(e){}
try{if(window.v22Close){const oc=window.confirm;window.confirm=()=>true;try{await v22Close();}finally{window.confirm=oc;}}else toast('🌙 Serata chiusa');}catch(e){}
try{updateDailyStats();}catch(e){}};

setInterval(()=>{if(document.visibilityState==='visible'){try{check();}catch(e){}}},5000);
window.v2919Check=check;
})();
}catch(e){console.error("chef-extra blocco 12",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const isOwner=()=>/^christian$/i.test((state.waiterName||'').trim());
const pad=n=>String(n).padStart(2,'0');
const day=()=>{const d=new Date();if(d.getHours()<5)d.setDate(d.getDate()-1);return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());};
const num=v=>{const n=parseFloat(String(v==null?'':v).replace(',','.'));return isNaN(n)?0:n;};
const base=()=>location.origin+location.pathname.replace(/[^/]*$/,'');
const link=()=>base()+'menu.html?speciale=1';
let tt=0;function toast(m,ms){__toast(m,ms||3000,1)}
let SP=(()=>{try{return JSON.parse(localStorage.getItem('alicetta_special')||'null');}catch(e){return null;}})();
let D=(()=>{try{return JSON.parse(localStorage.getItem('alicetta_special_draft')||'null');}catch(e){return null;}})()||{title:'Menù di Halloween 🎃',date:day(),price:'',inc:'',note:'',text:''};
let MSG='',busy=false;
const srcNow=()=>JSON.stringify({t:(D.title||'').trim(),d:D.date||'',p:String(D.price||'').trim(),i:(D.inc||'').trim(),n:(D.note||'').trim(),x:(D.text||'').trim()});
const dirty=()=>{if(!isOn())return false;try{return localStorage.getItem('alicetta_special_src')!==srcNow();}catch(e){return false;}};
const hm=ts=>new Date(ts).toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'});
let T0=0,CUR=null,TICK=0;
const fmtT=ms=>{const x=Math.floor(ms/1000);return Math.floor(x/60)+':'+String(x%60).padStart(2,'0');};
const paintMp=()=>{const b=$('mpBar');if(!b||!CUR)return;b.className='on'+(CUR.cls?' '+CUR.cls:'');$('mpT').textContent=CUR.t;$('mpI').style.width=CUR.p+'%';$('mpS').textContent=CUR.sub+(T0&&CUR.cls!=='done'?' · da '+fmtT(Date.now()-T0):'');};
const mp=(cls,t,p,sub)=>{CUR={cls,t,p,sub};paintMp();};
const tstart=()=>{T0=Date.now();clearInterval(TICK);TICK=setInterval(paintMp,1000);};
const tstop=()=>{T0=0;clearInterval(TICK);TICK=0;};
const lim=(p,ms,msg)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error(msg)),ms))]);
function statusBox(){if(busy)return`<div class="sp-st" style="background:#FEF3C7;border:2px solid #F59E0B;color:#78350F;"><b>⏳ Sto pubblicando…</b><div style="font-size:.78rem;font-weight:700;">Guarda la barra in basso: finché non compare ✅ non è ancora online.</div></div>`;
if(isOn()){const d=dirty();return d?`<div class="sp-st" style="background:#FFEDD5;border:2px solid #EA580C;color:#7C2D12;"><b>✏️ Pubblicato, ma con modifiche non ancora online</b><div style="font-size:.78rem;font-weight:700;">I clienti vedono ancora la versione delle ${hm(SP.ts)}. Premi “Aggiorna il menù speciale”.</div></div>`:`<div class="sp-st" style="background:#DCFCE7;border:2px solid #16A34A;color:#14532D;"><b>✅ PUBBLICATO · ${hm(SP.ts)}</b><div style="font-size:.78rem;font-weight:700;">I clienti lo vedono già dal QR${SP.verified?' (controllato: è online)':''}.</div></div>`;}
return`<div class="sp-st" style="background:#E5E7EB;border:2px solid #9CA3AF;color:#374151;"><b>⚪ NON PUBBLICATO</b><div style="font-size:.78rem;font-weight:700;">I clienti ancora non lo vedono. Compila i piatti e premi “Pubblica”.</div></div>`;}
const saveD=()=>{try{localStorage.setItem('alicetta_special_draft',JSON.stringify(D));}catch(e){}};
const isOn=()=>!!(SP&&SP.on&&(SP.secs||[]).length);
function parse(t){const secs=[];let cur=null;String(t||'').split('\n').map(x=>x.trim()).filter(Boolean).forEach(l=>{if(/^#/.test(l)){cur={n:l.replace(/^#+\s*/,''),items:[]};secs.push(cur);return;}
if(!cur){cur={n:'Menù',items:[]};secs.push(cur);}l=l.replace(/^[-•*]\s*/,'');let p=null;const m=l.match(/^(.*?\S)\s+(\d{1,3}(?:[.,]\d{1,2})?)\s*(?:€|eur)?\s*$/i);if(m&&m[1].length>2){p=num(m[2]);l=m[1].replace(/[-–—:.\s]+$/,'');}
cur.items.push({n:l,...(p>0?{p}:{})});});return secs.filter(s=>s.items.length);}
function toText(secs){return(secs||[]).map(s=>'# '+s.n+'\n'+(s.items||[]).map(i=>i.n+(i.p>0?' '+String(i.p).replace('.',','):'')).join('\n')).join('\n\n');}
async function pull(){try{const d=await fbGet('/fidelity/pub/special');if(d&&typeof d==='object'){SP=d;localStorage.setItem('alicetta_special',JSON.stringify(d));}}catch(e){}}
function place(){if(!isOwner())return;const dc=$('dishesContent');if(!dc||$('spCard'))return;const c=document.createElement('div');c.className='cart-section';c.id='spCard';const lu=$('luCard');if(lu)lu.after(c);else dc.before(c);draw();pull().then(()=>{if($('spCard')&&!busy)draw();});}
function draw(){const c=$('spCard');if(!c)return;const on=isOn();
c.innerHTML=`<div class="cs-h" style="margin-bottom:6px;"><h3>🎃 Menù speciale</h3></div>${statusBox()}
<div class="fc-sub" style="margin-bottom:8px;line-height:1.4;">Per le serate a tema (Halloween, Capodanno…): carichi i piatti della serata e i clienti li vedono con un QR dedicato. Il menù alla carta <b>non viene toccato</b>.</div>
<label class="btn-note" style="display:block;text-align:center;padding:12px;cursor:pointer;">📸 Foto del menù speciale (leggo io i piatti)<input type="file" accept="image/*" multiple style="display:none" onchange="v2920Photo(this)"></label>
${MSG?`<div class="fc-sub" style="font-weight:800;margin:6px 0;">${MSG}</div>`:''}
<div class="v14-lbl">Titolo</div><input class="v14-in" value="${esc(D.title)}" oninput="v2920F('title',this.value)">
<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:6px;"><div><div class="v14-lbl" style="margin-top:0">Data della serata</div><input class="v14-in" type="date" value="${esc(D.date)}" onchange="v2920F('date',this.value)"></div><div><div class="v14-lbl" style="margin-top:0">Prezzo fisso € <span class="fc-sub">(vuoto = alla carta)</span></div><input class="v14-in" inputmode="decimal" placeholder="es. 35" value="${esc(D.price)}" oninput="v2920F('price',this.value)"></div></div>
<div class="v14-lbl">Piatti della serata <span class="fc-sub">(una riga per piatto, “# ” per le portate, prezzo facoltativo in fondo)</span></div>
<textarea class="lu-ta" id="spTxt" placeholder="# Antipasti&#10;Zuppa di zucca e castagne 12&#10;# Primi&#10;Ravioli neri al sugo di mare 16&#10;# Dolci&#10;Dolcetto o scherzetto 7" oninput="v2920F('text',this.value)">${esc(D.text)}</textarea>
<input class="v14-in" placeholder="Cosa è incluso (facoltativo, es. calice di benvenuto)" value="${esc(D.inc)}" oninput="v2920F('inc',this.value)">
<input class="v14-in" placeholder="Nota per i clienti (facoltativa)" value="${esc(D.note)}" oninput="v2920F('note',this.value)">
<button class="btn-main btn-bill" style="width:100%;margin-top:6px;" onclick="v2920Pub()">${on?'🔄 Aggiorna il menù speciale':'✅ Pubblica il menù speciale'}</button>
<button class="btn-main btn-print" style="width:100%;margin-top:8px;" onclick="v2920View()">👀 Vedi il menù speciale come lo vedono i clienti</button>
<div class="lu-card" style="margin-top:10px;"><div class="lu-qr"><div id="spQr"></div><div style="flex:1;min-width:150px;"><b>🔲 QR del menù speciale</b><div style="font-size:.78rem;font-weight:700;margin:4px 0 8px;">È sempre lo stesso: stampalo e mettilo sui tavoli. Mostra il menù speciale pubblicato.</div><button class="btn-note" onclick="v2920Print()">🖨️ Stampa QR</button> <button class="btn-note" onclick="v2920Copy()">📋 Link</button></div></div></div>
${on?`<button class="btn-note" style="margin-top:8px;color:#B91C1C;" onclick="v2920Off()">🗑️ Togli il menù speciale</button>`:''}`;
try{const q=$('spQr');if(q&&window.QRCode){q.innerHTML='';new QRCode(q,{text:link(),width:260,height:260,correctLevel:QRCode.CorrectLevel.M});}}catch(e){}}
window.v2920F=(k,v)=>{D[k]=v;saveD();};
window.v2920Photo=async inp=>{const fs=[...(inp.files||[])];inp.value='';if(!fs.length)return;if(!getGeminiKey()){MSG='🔑 Serve la chiave Gemini in ⚙️ Opzioni.';draw();return;}MSG='⏳ Leggo il menù…';draw();
try{const parts=[];for(const f of fs.slice(0,4))parts.push({inline_data:{mime_type:'image/jpeg',data:await shrinkImage(f,2000)}});
parts.push({text:'Queste foto mostrano il MENÙ SPECIALE di una serata a tema di una trattoria. Estrai: titolo (se scritto), prezzo fisso (numero, solo se è un menù a prezzo unico), cosa è incluso, una eventuale nota, e le portate con i piatti nell\'ordine scritto, ognuno con il prezzo se è scritto accanto. Copia i nomi come sono scritti, non inventare piatti. Rispondi SOLO JSON: {"titolo":string|null,"prezzo_fisso":number|null,"incluso":string|null,"nota":string|null,"sezioni":[{"nome":"Antipasti","piatti":[{"nome":"","prezzo":number|null}]}]}'});
const r=await callGemini(parts,true,{temperature:.1});const o=jparse(r);const secs=(o.sezioni||[]).map(s=>({n:String(s.nome||'Menù'),items:(s.piatti||[]).filter(p=>p&&p.nome).map(p=>({n:String(p.nome),...(num(p.prezzo)>0?{p:num(p.prezzo)}:{})}))})).filter(s=>s.items.length);
if(!secs.length)throw new Error('non ho trovato piatti nella foto');
D.text=toText(secs);if(o.titolo)D.title=String(o.titolo).slice(0,60);if(num(o.prezzo_fisso)>0)D.price=String(o.prezzo_fisso);if(o.incluso)D.inc=String(o.incluso).slice(0,120);if(o.nota)D.note=String(o.nota).slice(0,160);saveD();
MSG=`✅ Letti ${secs.reduce((a,s)=>a+s.items.length,0)} piatti in ${secs.length} portate. Controlla e premi “Pubblica”.`;}
catch(e){MSG='❌ '+esc(e.message||e);}draw();};
async function translate(names){const need=[...new Set(names.filter(Boolean))];if(!need.length||!getGeminiKey())return{};try{const r=await callGemini([{text:`Traduci questi testi di un menù speciale di una trattoria di pesce abruzzese in inglese (en), tedesco (de), francese (fr) e spagnolo (es). Resta fedele, non aggiungere ingredienti, non tradurre i nomi propri. Rispondi SOLO JSON: {"<testo italiano>":{"en":"","de":"","fr":"","es":""}}. Testi: ${JSON.stringify(need)}`}],true,{temperature:.1});const o=jparse(r),m={};Object.keys(o).forEach(k=>{if(o[k]&&typeof o[k]==='object')m[k]=o[k];});return m;}catch(e){return{};}}
const STP=['Preparo i piatti','Metto il menù online (in italiano)','Controllo che sia davvero online','Traduco in inglese, tedesco, francese e spagnolo'],ICN=['⚪','⏳','✅','⚠️'];let SS=[0,0,0,0];
const lines=x=>STP.map((t,i)=>ICN[SS[i]]+' '+(i+1)+'. '+t+(SS[i]===1&&i===3?' (al massimo 45 secondi)':'')).join('\n')+(x?'\n\n'+x:'');
const show=(pct,title,x,cls)=>mp(cls||'',title+(cls==='done'||cls==='warn'?'':' · '+pct+'%'),pct,lines(x));
window.v2920Pub=async()=>{if(busy)return false;const secs=parse(D.text);if(!secs.length){MSG='Scrivi o fotografa i piatti della serata.';mp('warn','⚠️ Mancano i piatti',0,'Scrivi o fotografa i piatti della serata, poi premi Pubblica.');setTimeout(v2918MpClose,5000);draw();return false;}
busy=true;MSG='';draw();tstart();let ok=false,creep=0;const nP=secs.reduce((a,s)=>a+s.items.length,0);SS=[1,0,0,0];
try{const title=(D.title||'').trim()||'Menù speciale',inc=(D.inc||'').trim(),note=(D.note||'').trim();
show(10,'Pubblico il menù speciale',nP+' piatti in '+secs.length+' portate');
const data={on:true,title,titletr:null,d:D.date||day(),price:num(D.price)>0?num(D.price):null,inc,inctr:null,note,notetr:null,secs:secs.map(s=>({n:s.n,tr:null,items:s.items.map(i=>({n:i.n,tr:null,...(i.p>0?{p:i.p}:{})}))})),ts:Date.now(),by:(state.waiterName||'').trim()};
SS=[2,1,0,0];show(30,'Pubblico il menù speciale');
await lim(fbSend('/fidelity/pub/special','PUT',data),25000,'il database non risponde (controlla la connessione)');
SS=[2,2,1,0];show(55,'Pubblico il menù speciale');
let verified=false;try{const c=await lim(fbGet('/fidelity/pub/special'),15000,'timeout');verified=!!(c&&c.on&&c.ts===data.ts);}catch(e){}
SS[2]=verified?2:3;data.verified=verified;SP=data;try{localStorage.setItem('alicetta_special',JSON.stringify(data));localStorage.setItem('alicetta_special_src',srcNow());}catch(e){}
ok=true;busy=false;draw();
if(!verified){SS[3]=0;show(100,'⚠️ Inviato, ma non riesco a controllarlo','Premi “Vedi come lo vedono i clienti” per verificare che sia online.','warn');tstop();return true;}
if(!getGeminiKey()){SS[3]=3;show(100,'✅ PUBBLICATO (solo italiano)','Alle '+hm(data.ts)+' · online e controllato. Traduzioni non fatte: manca la chiave Gemini.','done');tstop();if(window.v22Confetti)v22Confetti(70);setTimeout(()=>{const b=$('mpBar');if(b&&b.classList.contains('done'))v2918MpClose();},15000);return true;}
SS[3]=1;let p=70;show(p,'✅ Già online in italiano','I clienti lo vedono già. Ora traduco: se Gemini è lento resta in italiano.');
creep=setInterval(()=>{if(p<95){p+=2;show(p,'✅ Già online in italiano','I clienti lo vedono già. Ora traduco: se Gemini è lento resta in italiano.');}},1500);
const names=[title,inc,note,...secs.map(s=>s.n),...secs.flatMap(s=>s.items.map(i=>i.n))];
let T={};try{T=await lim(translate(names),45000,'timeout traduzioni')||{};}catch(e){T={};}
clearInterval(creep);creep=0;
if(Object.keys(T).length){const d2={...data,titletr:T[title]||null,inctr:inc?(T[inc]||null):null,notetr:note?(T[note]||null):null,secs:data.secs.map(s=>({n:s.n,tr:T[s.n]||null,items:s.items.map(i=>({...i,tr:T[i.n]||null}))}))};
try{await lim(fbSend('/fidelity/pub/special','PUT',d2),20000,'timeout');SP=d2;localStorage.setItem('alicetta_special',JSON.stringify(d2));SS[3]=2;show(100,'✅ PUBBLICATO e tradotto','Alle '+hm(d2.ts)+' · '+nP+' piatti · 4 lingue. I clienti lo vedono dal QR.','done');}
catch(e){SS[3]=3;show(100,'✅ PUBBLICATO (solo italiano)','Online alle '+hm(data.ts)+'. Le traduzioni non sono state salvate: riprova con “Aggiorna”.','done');}}
else{SS[3]=3;show(100,'✅ PUBBLICATO (solo italiano)','Online alle '+hm(data.ts)+'. Le traduzioni non sono arrivate (Gemini occupato): i clienti lo vedono in italiano. Riprova più tardi con “Aggiorna”.','done');}
tstop();if(window.v22Confetti)v22Confetti(70);setTimeout(()=>{const b=$('mpBar');if(b&&b.classList.contains('done'))v2918MpClose();},20000);}
catch(e){if(creep)clearInterval(creep);tstop();const k=SS.indexOf(1);if(k>=0)SS[k]=3;mp('warn','❌ Menù speciale NON pubblicato',0,lines('Errore: '+(e.message||e)+'. Controlla la connessione e riprova.'));}
busy=false;draw();return ok;};
window.v2920View=async()=>{if(busy)return;const url=link();
if(!isOn()){if(!parse(D.text).length)return alert('Non c’è ancora nessun menù speciale: scrivi o fotografa i piatti e premi “Pubblica”.');
if(!confirm('Il menù speciale non è ancora pubblicato.\n\nOK = lo pubblico adesso e poi te lo mostro\nAnnulla = non faccio niente'))return;
const w=window.open('about:blank','_blank');const ok=await v2920Pub();if(ok&&w)w.location.href=url;else if(w)w.close();return;}
if(dirty()){if(confirm('Hai modifiche non ancora pubblicate: i clienti vedono la versione vecchia.\n\nOK = pubblico le modifiche e poi guardo\nAnnulla = guardo la versione già pubblicata')){const w=window.open('about:blank','_blank');const ok=await v2920Pub();if(w){if(ok)w.location.href=url;else w.close();}return;}}
window.open(url,'_blank');};
window.v2920Off=async()=>{if(!confirm('Togliere il menù speciale? Il QR mostrerà “non disponibile”.'))return;try{await fbSend('/fidelity/pub/special','PUT',{on:false,ts:Date.now()});}catch(e){}SP=null;try{localStorage.removeItem('alicetta_special');}catch(e){}MSG='';try{localStorage.removeItem('alicetta_special_src');}catch(e){}mp('done','🗑️ Menù speciale tolto',100,'Il QR ora mostra “non disponibile”.');setTimeout(v2918MpClose,6000);draw();};
window.v2920Copy=async()=>{try{await navigator.clipboard.writeText(link());toast('📋 Link copiato');}catch(e){prompt('Link:',link());}};
window.v2920Print=()=>{const q=$('spQr'),cv=q&&q.querySelector('canvas'),src=cv?cv.toDataURL('image/png'):((q&&q.querySelector('img'))||{}).src;if(!src)return toast('QR non disponibile offline');const w=window.open('','_blank');if(!w)return;
w.document.write(`<!DOCTYPE html><html><head><title>QR menù speciale</title><style>body{font-family:Arial,sans-serif;text-align:center;padding:30px}h1{color:#EA580C;margin:0 0 6px}h2{margin:0 0 20px}img{width:300px;height:300px}p{font-size:18px;color:#444}</style></head><body><h1>ALICETTA TRATTORIA</h1><h2>${esc(D.title||'Menù speciale')}</h2><img src="${src}"><p>Inquadra il QR per vedere il menù della serata</p><p style="font-size:14px">Scan to see tonight’s special menu</p></body></html>`);w.document.close();setTimeout(()=>{try{w.print();}catch(e){}},500);};
setInterval(()=>{try{place();}catch(e){}},1500);
})();
}catch(e){console.error("chef-extra blocco 13",e);}
try{
(function(){
const pad=n=>String(n).padStart(2,'0'),iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const MM=['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'],GG=['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
const per=()=>state.timePeriod||'daily',refD=()=>state.timeRef||buildDateISO();
const pre=(p,r)=>p==='monthly'?r.slice(0,7):p==='yearly'?r.slice(0,4):r;
periodShifts=function(){const p=per(),td=buildDateISO(),ref=refD(),k=pre(p,ref);return buildShifts().filter(s=>p==='daily'?(dkey(s.in)===ref||(s.open&&ref===td)):dkey(s.in).startsWith(k));};
const label=()=>{const p=per(),r=refD(),d=new Date(r+'T12:00');return p==='daily'?GG[d.getDay()]+' '+d.getDate()+' '+MM[d.getMonth()]+' '+d.getFullYear():p==='monthly'?MM[d.getMonth()]+' '+d.getFullYear():String(d.getFullYear());};
const isNow=()=>pre(per(),refD())===pre(per(),buildDateISO());
window.v2924Nav=n=>{const p=per(),d=new Date(refD()+'T12:00');if(n>0&&isNow())return;if(p==='daily')d.setDate(d.getDate()+n);else if(p==='monthly'){d.setDate(1);d.setMonth(d.getMonth()+n);}else{d.setMonth(0,1);d.setFullYear(d.getFullYear()+n);}
let r=iso(d);const td=buildDateISO();if(r>td)r=td;state.timeRef=r===td?null:r;renderTime();};
window.v2924Now=()=>{state.timeRef=null;renderTime();};
{const _s=setTimePeriod;setTimePeriod=function(p){state.timeRef=null;return _s.apply(this,arguments);};}
{const _r=renderTime;renderTime=function(){const r=_r.apply(this,arguments);try{const t=document.querySelector('#timeContent .rep-tabs');if(t&&!(t.nextElementSibling&&t.nextElementSibling.classList.contains('v2924n'))){const now=isNow(),d=document.createElement('div');d.className='v2924n';d.style.cssText='display:grid;grid-template-columns:52px 1fr 52px;gap:6px;align-items:center;margin:10px 0;';
d.innerHTML=`<button class="btn-note" style="min-height:44px;font-size:1.1rem;" onclick="v2924Nav(-1)" aria-label="Indietro">◀</button><button class="btn-note" style="min-height:44px;font-weight:900;text-transform:capitalize;" onclick="v2924Now()">📅 ${label()}${now?' · in corso':''}${now?'':'<br><small style="font-weight:700;text-transform:none;">tocca per tornare a oggi</small>'}</button><button class="btn-note" style="min-height:44px;font-size:1.1rem;${now?'opacity:.3;':''}" ${now?'disabled':''} onclick="v2924Nav(1)" aria-label="Avanti">▶</button>`;t.after(d);}}catch(e){}return r;};}
exportTimeCSV=function(){const p=per(),ref=refD(),S=periodShifts().sort((a,b)=>a.in-b.in);
if(!S.length){let e=document.getElementById('miniToast');if(!e){e=document.createElement('div');e.id='miniToast';e.className='mini-toast';document.body.appendChild(e);}e.textContent='Nessuna timbratura in questo periodo ('+label()+')';e.classList.add('on');setTimeout(()=>e.classList.remove('on'),3000);return;}
const f=x=>(x/3600000).toFixed(2).replace('.',','),tot={};
const rows=['Dipendente;Data;Entrata;Uscita;Ore lavorate;Pausa'].concat(S.map(s=>{const a=tot[s.emp]=tot[s.emp]||{w:0,b:0,n:0};a.w+=s.work;a.b+=s.brk;a.n++;return[s.emp,dkey(s.in),hmin(s.in),s.out?hmin(s.out):'aperto',f(s.work),f(s.brk)].join(';');}));
rows.push('');rows.push('RIEPILOGO '+label().toUpperCase()+';Turni;;;Ore lavorate;Pausa');let tw=0,tb=0,tn=0;Object.entries(tot).sort().forEach(([e,a])=>{rows.push([e,a.n,'','',f(a.w),f(a.b)].join(';'));tw+=a.w;tb+=a.b;tn+=a.n;});rows.push(['TOTALE',tn,'','',f(tw),f(tb)].join(';'));
const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+rows.join('\n')],{type:'text/csv'}));a.download='presenze_'+pre(p,ref)+'.csv';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1500);};
})();
}catch(e){console.error("chef-extra blocco 14",e);}
try{
(function(){
const $=id=>document.getElementById(id);
const GR=[['3 Antipasti','🥗 Antipasti'],['4 Primi Piatti','🍝 Primi'],['5 Secondi','🐟 Secondi'],['5 Contorni','🥬 Contorni'],['6 Desserts','🍰 Dolci']];
const byName=(x,y)=>String(x.name||'').localeCompare(String(y.name||''),'it',{sensitivity:'base',numeric:true});
const row=m=>{const l=stockLeft(m);return`<div class="cart-row"><div class="cart-info"><b>${escH(m.name)}</b></div><div class="cart-controls"><button class="btn-qty" onclick="adjStock(${m.id},-1)">-</button><button class="btn-note" style="min-width:104px;${l===0?'background:#FEE2E2;color:#991B1B;':l!==null?'background:#FDE047;color:#422006;':''}" onclick="askStock(${m.id})">${l===null?'∞ senza limite':(l===0?'0 · finito':'❗ '+l+(l===1?' rimasta':' rimaste'))}</button><button class="btn-qty" onclick="adjStock(${m.id},1)">+</button></div></div>`;};
renderStock=function(){const p=$('stockPanel');if(!p)return;let h='<h3 style="margin-bottom:6px;">📦 Scorte</h3><div style="font-size:0.75rem;color:var(--muted);margin-bottom:6px;">Il numero indica le <b>porzioni rimaste</b>. Toccalo per scrivere quante ce ne sono (oppure +5 per aggiungerne). Restano salvate da un giorno all’altro; a zero il piatto diventa esaurito in cassa e sul menù QR.</div>';
GR.forEach(([c,l])=>{const it=(state.menu||[]).filter(m=>m.cat===c).sort(byName);if(!it.length)return;const cnt=it.filter(m=>{const x=stockLeft(m);return x!==null&&x>0;}).length,fin=it.filter(m=>stockLeft(m)===0).length;
h+=`<h4 class="st-gh">${l}<span>${it.length} piatti${cnt?' · ❗ '+cnt+' contati':''}${fin?' · '+fin+' finiti':''}</span></h4><div class="st-grp">${it.map(row).join('')}</div>`;});
p.innerHTML=h;};
try{renderStock();}catch(e){}
const clean=s=>String(s==null?'':s).normalize('NFC').replace(/[’‘´`]/g,"'").replace(/[“”«»]/g,'"').replace(/[–—]/g,'-').replace(/€/g,'EUR').replace(/…/g,'...').replace(/×/g,'x').replace(/[^\x00-\xFF]/g,'');
{const _e=encodeBase64UTF8;encodeBase64UTF8=function(s){return _e(clean(s).replace(/\x1B@/g,'\x1B@\x1Bt\x10'));};}
const W=48,ESC='\x1B',GS='\x1D';
const lr=(a,b,w)=>{w=w||W;a=clean(a);b=clean(b);const sp=w-a.length-b.length;return sp>=1?a+' '.repeat(sp)+b:a.slice(0,Math.max(0,w-b.length-1))+' '+b;};
const item=(a,b)=>{a=clean(a);b=clean(b);const max=W-b.length-1;if(a.length<=max)return lr(a,b);const L=[];let cur='';a.split(' ').forEach(w=>{const lim=L.length?W-4:max;if(cur&&(cur+' '+w).length>lim){L.push(cur);cur=w;}else cur=cur?cur+' '+w:w;});if(cur)L.push(cur);return L.map((l,i)=>i===0?lr(l,b):'    '+l).join('\n');};
const qr=data=>{const d=clean(data),n=d.length+3;return GS+'(k\x04\x00\x31\x41\x32\x00'+GS+'(k\x03\x00\x31\x43\x06'+GS+'(k\x03\x00\x31\x45\x31'+GS+'(k'+String.fromCharCode(n%256,Math.floor(n/256))+'\x31\x50\x30'+d+GS+'(k\x03\x00\x31\x51\x30';};
const payLbl=e=>{try{const p=payOf(e);return{contanti:'Contanti',carta:'Carta',misto:'Contanti + carta',buono:'Buono regalo',nd:'-'}[p.m]||'-';}catch(x){return'-';}};
window.v2925PrintBill=key=>{const e=(state.historyLog||[]).find(x=>x&&(x.rid===key||String(x.ts)===String(key)));if(!e)return alert('Conto non trovato.');
const d=new Date(e.ts),dt=d.toLocaleDateString('it-IT')+(e.time?' ore '+e.time:''),sep='-'.repeat(W)+'\n';
let ep=ESC+'@'+ESC+'a\x01'+ESC+'!\x38'+'ALICETTA\n'+ESC+'!\x10'+'TRATTORIA\n'+ESC+'!\x00'+'Fossacesia (CH)\n\n'+ESC+'!\x08'+'RIEPILOGO DEL CONTO\n'+ESC+'!\x00'+clean(e.tableName||'')+' - '+dt+'\n'+ESC+'a\x00'+sep;
let pv='ALICETTA TRATTORIA\nRiepilogo del conto\n'+(e.tableName||'')+' - '+dt+'\n'+'-'.repeat(34)+'\n';
(e.items||[]).forEach(it=>{const q=Number(it.qty)||1,t=(Number(it.price)||0)*q,a=q+' x '+(it.name||''),b=t>0?formatPrice(t):'0,00';ep+=item(a,b)+'\n';pv+=a+'  '+b+'\n';});
if(e.disc&&Number(e.disc.amt)>0){const a='Sconto'+(e.disc.k==='pct'?' '+e.disc.v+'%':''),b='-'+formatPrice(e.disc.amt);ep+=lr(a,b)+'\n';pv+=a+'  '+b+'\n';}
if(Number(e.copOff)>0){const a='Coperti offerti: '+e.copOff;ep+=a+'\n';pv+=a+'\n';}
ep+=sep+ESC+'!\x30'+lr('TOTALE EUR',formatPrice(e.total||0),24)+'\n'+ESC+'!\x00'+lr('Pagamento',payLbl(e))+'\n'+sep;
pv+='-'.repeat(34)+'\nTOTALE EUR '+formatPrice(e.total||0)+'\nPagamento: '+payLbl(e)+'\n';
ep+=ESC+'a\x01'+'Documento non valido ai fini fiscali\n\nGrazie e a presto!\n';
if(e.rid&&window.grazieUrl){ep+='\nRiepilogo, recensione e Fidelity Card:\n'+qr(grazieUrl(e.rid))+'\n';pv+='\n[QR: riepilogo e Fidelity Card]\n';}
ep+=ESC+'a\x00'+'\n\n\n'+GS+'V\x42\x00';pv+='\nDocumento non valido ai fini fiscali';
dispatchPrint(pv,ep);};
function rcBtns(){document.querySelectorAll('#hub_sales_conti button[onclick^="v26EditTot("]').forEach(b=>{if(b.dataset.rc)return;b.dataset.rc='1';const m=(b.getAttribute('onclick')||'').match(/\((\d+)\)/);if(!m)return;const n=document.createElement('button');n.className='btn-note';n.textContent='🖨️ Ricevuta';n.setAttribute('onclick','v2925PrintBill('+m[1]+')');b.after(n);});}
new MutationObserver(()=>{clearTimeout(window._rcT);window._rcT=setTimeout(()=>{try{rcBtns();}catch(e){}},150);}).observe(document.body,{childList:true,subtree:true});
{const _s=showReceiptQr;showReceiptQr=function(rid){const r=_s.apply(this,arguments);try{const a=document.querySelector('#rcptModal .modal-actions');if(a&&!a.querySelector('.v2925pr')){const b=document.createElement('button');b.className='btn-modal v2925pr';b.style.cssText='background:#0E7490;color:#fff;';b.textContent='🖨️ Ricevuta';b.onclick=()=>v2925PrintBill(rid);a.prepend(b);}}catch(e){}return r;};}
})();
}catch(e){console.error("chef-extra blocco 15",e);}
try{
(function(){
const luLink=()=>location.origin+location.pathname.replace(/[^/]*$/,'')+'menu.html?pranzo=1';
window.v2931LuView=()=>window.open(luLink(),'_blank');
window.v2931LuQr=()=>{const b=document.getElementById('luQrBox');b.innerHTML='';try{new QRCode(b,{text:luLink(),width:240,height:240,colorDark:'#062329',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M});}catch(e){b.textContent='QR non disponibile';}document.getElementById('luQrLink').textContent=luLink();document.getElementById('luQrModal').classList.add('active');};
{const _q=showQrModal;showQrModal=function(){const r=_q.apply(this,arguments);try{const ov=document.getElementById('qrModal');if(!ov||!ov.classList.contains('active'))return r;const box=ov.querySelector('.receipt-box');if(!box||box.querySelector('.v2931lu'))return r;const close=box.querySelector('button.btn-modal');
const d=document.createElement('div');d.className='v2931lu';d.innerHTML='<button class="btn-main" style="width:100%;margin-bottom:8px;background:#FDE047;color:#062329;" onclick="v2931LuQr()">🌞 QR del menù pranzo</button><button class="btn-main" style="width:100%;margin-bottom:8px;background:#F59E0B;color:#062329;" onclick="v2931LuView()">👀 Vedi il menù pranzo come i clienti</button>';
if(close)close.before(d);else box.appendChild(d);}catch(e){}return r;};}
})();
}catch(e){console.error("chef-extra blocco 16",e);}
try{
(function(){
const isOwner=()=>/^christian$/i.test((state.waiterName||'').trim());
const dayBills=d=>(state.historyLog||[]).filter(e=>{try{return e&&svcDate(e)===d;}catch(x){return false;}});
const missing=()=>{const t=svcToday(),K=Object.keys(ccClosures()),D=new Set();(state.historyLog||[]).forEach(e=>{try{const d=svcDate(e);if(d&&d<t)D.add(d);}catch(x){}});return[...D].filter(d=>!K.some(k=>k.indexOf(d+'|')===0)).sort();};
const fmtD=d=>new Date(d+'T12:00').toLocaleDateString('it-IT',{weekday:'short',day:'numeric',month:'numeric'});
window.v2928Recover=()=>{if(!isOwner())return alert('Solo Christian può ricostruire le chiusure.');const M=missing();if(!M.length)return alert('Non mancano chiusure: tutti i giorni con conti hanno la loro chiusura.');
const rows=M.map(d=>{const S=sumBlock(dayBills(d));return{d,S};});
const txt=rows.slice(0,14).map(r=>'• '+fmtD(r.d)+': € '+formatPrice(r.S.tot)+' ('+r.S.n+' conti)').join('\n')+(rows.length>14?'\n… e altri '+(rows.length-14)+' giorni':'');
if(!confirm('Ricostruisco '+rows.length+' chiusure mancanti con i totali dell’app (contanti e carte dei conti di quel giorno):\n\n'+txt+'\n\nNel registro saranno segnate “🔄 Ricostruita”, perché la cassa non è stata contata. Procedo?'))return;
const C=ccClosures();rows.forEach(({d,S})=>{C[d+'|giorno']={rtCash:S.cash,rtEl:S.card,pos:null,suCash:null,app:{cash:S.cash,card:S.card,tot:S.tot,n:S.n},diff:{cash:0,el:0,pos:null,su:null},ok:true,auto:true,at:Date.now(),by:'Ricostruita dall’app'};});
saveState(false,{staff:true});try{renderConti();}catch(e){}alert('✅ Fatto: '+rows.length+' chiusure aggiunte al registro.');};
window.v2928Go=()=>{const m=document.getElementById('endModal');if(m)m.classList.remove('active');try{switchMainView('sales');setHubPage('sales','oggi');}catch(e){}state.contiPer='oggi';state.ccSvc='giorno';try{renderConti();}catch(e){}setTimeout(()=>{const el=document.getElementById('cashClose');if(el)el.scrollIntoView({behavior:'smooth',block:'start'});},250);};
{const _r=renderCashClose;renderCashClose=function(){const r=_r.apply(this,arguments);try{const el=document.getElementById('cashClose');if(el&&isOwner()&&!el.querySelector('.v2928rec')){const M=missing();if(M.length){const b=document.createElement('button');b.className='btn-main v2928rec';b.style.cssText='width:100%;margin:0 0 10px;background:#0369A1;color:#fff;';b.textContent='🔄 Ricostruisci '+M.length+(M.length===1?' chiusura mancante':' chiusure mancanti');b.onclick=v2928Recover;el.prepend(b);}}}catch(e){}return r;};}
{const _s=saveCashClose;saveCashClose=function(){const r=_s.apply(this,arguments);try{if(window.v2928CcDone&&v2928CcDone()){const t=svcToday();dayBills(t).forEach(e=>{e.closedEvening=true;});saveState(false,{history:true});}}catch(e){}tick();return r;};}
function tick(){const b=document.getElementById('ccBanner');if(!b)return;let on=false;try{const h=new Date().getHours(),t=svcToday();on=isOwner()&&(h>=21||h<5)&&!Object.values(state.tables||{}).some(x=>x&&x.items&&x.items.length)&&dayBills(t).length>0&&!(window.v2928CcDone&&v2928CcDone());}catch(e){}b.style.display=on?'block':'none';}
setInterval(tick,5000);
})();
}catch(e){console.error("chef-extra blocco 17",e);}
try{
(function(){
const $=id=>document.getElementById(id);
const isOwner=()=>/^christian$/i.test((state.waiterName||'').trim());
const pad=n=>String(n).padStart(2,'0'),iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const addD=(s,n)=>{const d=new Date(s+'T12:00');d.setDate(d.getDate()+n);return iso(d);};
const lbl=s=>new Date(s+'T12:00').toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long'});
window.v2929FidAdd=async id=>{if(!isOwner())return alert('Solo Christian può modificare i punti.');let c;try{c=await fbGet('/fidelity/cards/'+id);}catch(e){return alert('Connessione assente: riprova.');}if(!c)return alert('Cliente non trovato.');
const v=prompt('➕ Conto da aggiungere a '+(c.name||'')+'\nScrivi l’importo del conto in € (es. 74,50).\nPer togliere punti scrivi un numero negativo (es. -20).');if(v==null)return;const amt=Math.round(parseFloat(String(v).replace(',','.'))*100)/100;if(!isFinite(amt)||amt===0||Math.abs(amt)>5000)return alert('Importo non valido.');
const dv=prompt('Data del conto (gg/mm/aaaa). Lascia vuoto per oggi.',''),m=String(dv||'').match(/(\d{1,2})\D+(\d{1,2})\D+(\d{2,4})/);let ts=Date.now();if(m){let y=+m[3];if(y<100)y+=2000;const d=new Date(y,+m[2]-1,+m[1],21,0);if(!isNaN(d))ts=Math.min(d.getTime(),Date.now());}
const eur=Math.max(0,Math.round(((Number(c.eur)||0)+amt)*100)/100),bonus=Number(c.bonus)||0,earned=Math.floor((eur+bonus)/FID_EUR),used=Number(c.used)||0,visits=Math.max(0,(Number(c.visits)||0)+(amt>0?1:0)),last=Math.max(Number(c.last)||0,amt>0?ts:0)||c.last||null;
const adj=Array.isArray(c.adj)?c.adj.slice(-30):[];adj.push({ts:Date.now(),d:ts,amt,by:(state.waiterName||'').trim()});
try{await fbSend('/fidelity/cards/'+id,'PATCH',{eur,earned,visits,last,adj});await fbSend('/fidelity/pub/'+await fidPubKey(id.slice(1)),'PATCH',{eur:eur+bonus,av:Math.max(0,earned-used)});}catch(e){return alert('Non salvato: '+(e.message||e));}
try{const x=(fidCache||[]).find(k=>k.id===id);if(x)Object.assign(x,{eur,earned,visits,last,adj});renderFidList();}catch(e){}
const ne=earned-(Number(c.earned)||0);alert('✅ '+(amt>0?'Aggiunti ':'Tolti ')+Math.abs(Math.floor(amt))+' punti a '+(c.name||'')+'. Ora ha '+Math.floor(eur+bonus)+' punti'+(ne>0?' e '+ne+(ne===1?' nuovo calice':' nuovi calici')+' da consegnare 🥂':'')+'.');};
{const _f=renderFidList;renderFidList=function(){const r=_f.apply(this,arguments);try{if(isOwner())document.querySelectorAll('button[onclick^="toggleFidMkt("]').forEach(b=>{if(b.dataset.add)return;b.dataset.add='1';const m=(b.getAttribute('onclick')||'').match(/toggleFidMkt\('([^']+)'\)/);if(!m)return;const n=document.createElement('button');n.className='btn-note';n.textContent='➕ Conto vecchio / punti';n.setAttribute('onclick',"v2929FidAdd('"+m[1]+"')");b.before(n);});}catch(e){}return r;};}
window.v2929OtherDay=()=>{const y=addD(svcToday(),-1),v=prompt('Di quale giorno vuoi fare la chiusura? (gg/mm/aaaa)',y.split('-').reverse().join('/'));if(v==null)return;const m=String(v).match(/(\d{1,2})\D+(\d{1,2})\D+(\d{2,4})/);if(!m)return alert('Data non valida');let yy=+m[3];if(yy<100)yy+=2000;const d=yy+'-'+pad(+m[2])+'-'+pad(+m[1]);if(d>svcToday())return alert('Non si può fare la chiusura di un giorno futuro.');ccOpen(d+'|giorno');};
{const _r=renderCashClose;renderCashClose=function(){const r=_r.apply(this,arguments);try{const el=$('cashClose');if(el&&isOwner()&&!el.querySelector('.v2929od')){const b=document.createElement('button');b.className='btn-note v2929od';b.style.cssText='width:100%;margin:0 0 10px;padding:11px;';b.textContent='➕ Chiusura di un altro giorno';b.onclick=v2929OtherDay;const rec=el.querySelector('.v2928rec');if(rec)rec.after(b);else el.prepend(b);}}catch(e){}return r;};}
window.v2929Day=n=>{const[a,b]=contiRange();let d=(a===b?a:svcToday());d=addD(d,n);if(d>svcToday())return;state.contiPer=d===svcToday()?'oggi':'giorno';state.contiDay=d;renderConti();};
{const _c=renderConti;renderConti=function(){const r=_c.apply(this,arguments);try{const T=$('payTotals');if(T&&!T.querySelector('.v2929nav')){const bar=T.querySelector('.cat-bar');const[a,b]=contiRange(),cur=a===b?a:null,isT=cur===svcToday();const d=document.createElement('div');d.className='v2929nav';d.style.cssText='display:grid;grid-template-columns:48px 1fr 48px;gap:6px;align-items:center;margin:4px 0 8px;';
d.innerHTML=`<button class="btn-note" style="min-height:42px;font-size:1.1rem;" onclick="v2929Day(-1)" aria-label="Giorno prima">◀</button><div style="text-align:center;font-weight:900;font-size:.88rem;text-transform:capitalize;">${cur?lbl(cur)+(isT?' · oggi':''):'tocca ◀ per i singoli giorni'}</div><button class="btn-note" style="min-height:42px;font-size:1.1rem;${isT?'opacity:.3;':''}" ${isT?'disabled':''} onclick="v2929Day(1)" aria-label="Giorno dopo">▶</button>`;
if(bar)bar.after(d);else T.prepend(d);}}catch(e){}return r;};}
setInterval(()=>{try{const lu=$('luCard'),sp=$('spCard');if(lu&&sp&&(sp.compareDocumentPosition(lu)&Node.DOCUMENT_POSITION_FOLLOWING))sp.before(lu);}catch(e){}},1200);
})();
}catch(e){console.error("chef-extra blocco 18",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const isOwner=()=>/^christian$/i.test((state.waiterName||'').trim());
const isSU=e=>/sumup/i.test(String(e&&e.pay&&e.pay.via||''));
const r2=n=>Math.round((Number(n)||0)*100)/100;
window.v2930DayTot=(d,s)=>{try{const L=(state.historyLog||[]).filter(e=>e&&svcDate(e)===d&&(s==='giorno'||!s||svcOf(e)===s));const tot=L.reduce((a,e)=>a+(Number(e.total)||0),0),su=L.reduce((a,e)=>a+(e.pay&&e.pay.cashLoc!=null?(Number(e.total)||0)-Number(e.pay.cashLoc):(isSU(e)?(Number(e.total)||0):0)),0);
return `<br><span style="font-weight:800;color:var(--text,inherit);">Tot € ${formatPrice(tot)} · 🏪 Cassa locale € ${formatPrice(tot-su)} · 🟦 SumUp € ${formatPrice(su)}</span>`;}catch(e){return'';}};
const SU=[['2026-11-06','15:26',122,'split'],['2026-11-06','15:21',64,'cash'],['2026-11-06','14:18',56,'cash'],['2026-11-06','14:09',51,'card'],
['2026-11-05','14:48',74,'cash'],['2026-11-05','14:28',74,'card'],
['2026-10-31','20:03',22,'cash'],['2026-10-31','15:16',86,'card'],['2026-10-31','13:51',89,'card'],
['2026-10-30','22:25',10,'cash'],['2026-10-30','22:13',111.5,'card'],
['2026-10-29','21:12',70,'card'],
['2026-10-25','22:11',64,'card'],['2026-10-25','15:13',70,'card'],['2026-10-25','15:10',99,'card'],['2026-10-25','14:18',74,'card'],['2026-10-25','14:12',49,'card'],['2026-10-25','13:24',109,'card'],
['2026-10-24','23:11',89,'cash'],['2026-10-24','22:17',77,'card'],['2026-10-24','21:24',92,'cash'],['2026-10-24','16:11',113,'card'],['2026-10-24','15:00',52,'cash'],
['2026-10-23','22:47',188,'card'],['2026-10-23','22:04',203.5,'split'],['2026-10-23','21:18',79,'card'],
['2026-10-22','22:33',100,'card'],['2026-10-22','21:57',41.5,'card'],['2026-10-22','21:27',171,'card'],['2026-10-22','21:06',66,'card'],['2026-10-22','20:52',114,'card'],
['2026-10-21','22:53',223,'card'],['2026-10-21','22:44',44,'cash'],['2026-10-21','21:29',69,'card']];
const FROM='2026-10-21',TO='2026-11-06';
const addD=(s,n)=>{const d=new Date(s+'T12:00');d.setDate(d.getDate()+n);const p=x=>String(x).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());};
const tsOf=(d,t)=>new Date(d+'T'+t+':00').getTime();
const kindOf=e=>{const m=payOf(e).m;return m==='contanti'?'cash':m==='carta'?'card':m==='misto'?'split':'other';};
let PLAN=null;
function plan(){const H=(state.historyLog||[]).filter(e=>e&&!e.deleted&&Number(e.total)>0&&svcDate(e)>=addD(FROM,-1)&&svcDate(e)<=TO);const used=new Set(),P=[];
const pick=(s,days,needKind)=>{let best=null,bd=1e15;H.forEach(e=>{if(used.has(e))return;if(Math.abs((Number(e.total)||0)-s[2])>0.01)return;if(!days.includes(svcDate(e)))return;if(needKind&&s[3]!=='split'&&kindOf(e)!==s[3])return;const dd=Math.abs((e.ts||0)-tsOf(s[0],s[1]));if(dd<bd){bd=dd;best=e;}});return best;};
SU.forEach(s=>{let e=pick(s,[s[0]],true)||pick(s,[s[0]],false)||pick(s,[addD(s[0],1),addD(s[0],-1)],false);if(e){used.add(e);P.push({s,e});}else P.push({s,e:null});});
const local=H.filter(e=>!used.has(e)&&svcDate(e)>=FROM);return{P,local};}
const lbl=d=>new Date(d+'T12:00').toLocaleDateString('it-IT',{day:'2-digit',month:'2-digit'});
const kn={cash:'contanti',card:'carta',split:'diviso'};
window.v2930Open=()=>{if(!isOwner())return alert('Solo Christian.');PLAN=plan();const{P,local}=PLAN;
const toSU=P.filter(x=>x.e&&!isSU(x.e)),fix=P.filter(x=>x.e&&x.s[3]!=='split'&&kindOf(x.e)!==x.s[3]),move=P.filter(x=>x.e&&svcDate(x.e)!==x.s[0]),miss=P.filter(x=>!x.e),toLoc=local.filter(isSU);
const row=(t,c)=>`<div style="font-size:.8rem;padding:3px 0;border-bottom:1px dashed var(--border);${c?'color:'+c+';':''}">${t}</div>`;
$('suBox').innerHTML=`<h3 style="margin-bottom:4px;">🔍 Allinea i conti con SumUp</h3><div class="fc-sub" style="margin-bottom:8px;">Dal 21/10 al 06/11, confrontando i conti dell’app con le foto del terminale SumUp. Controlla e premi Applica.</div>
<div style="font-weight:900;margin-top:6px;">🟦 Da segnare come SumUp (${toSU.length})</div>${toSU.map(x=>row(`${lbl(x.s[0])} ${x.s[1]} · ${esc(x.e.tableName||'')} € ${formatPrice(x.s[2])} · ${kn[x.s[3]]}`)).join('')||row('nessuno')}
${fix.length?`<div style="font-weight:900;margin-top:8px;">💳 Forma di pagamento da correggere (${fix.length})</div>${fix.map(x=>row(`${lbl(x.s[0])} · ${esc(x.e.tableName||'')} € ${formatPrice(x.s[2])}: ${kn[kindOf(x.e)]||'?'} → ${kn[x.s[3]]}`)).join('')}`:''}
${move.length?`<div style="font-weight:900;margin-top:8px;">📅 Conti nel giorno sbagliato (${move.length})</div>${move.map(x=>row(`${esc(x.e.tableName||'')} € ${formatPrice(x.s[2])}: ${lbl(svcDate(x.e))} → ${lbl(x.s[0])}`)).join('')}`:''}
<div style="font-weight:900;margin-top:8px;">🏪 Da segnare come cassa locale (${toLoc.length})</div>${toLoc.map(e=>row(`${lbl(svcDate(e))} · ${esc(e.tableName||'')} € ${formatPrice(e.total)}`)).join('')||row('nessuno')}
<div class="fc-sub" style="margin-top:4px;">Gli altri ${local.length-toLoc.length} conti non presenti su SumUp sono già su cassa locale.</div>
<div style="font-weight:900;margin-top:8px;color:#B91C1C;">❓ Pagamenti SumUp che nell’app non ci sono (${miss.length})</div>${miss.map(x=>row(`${lbl(x.s[0])} ${x.s[1]} · € ${formatPrice(x.s[2])} · ${kn[x.s[3]]}`,'#B91C1C')).join('')||row('nessuno')}
${miss.length?`<label style="display:flex;gap:8px;align-items:center;margin-top:8px;font-weight:800;font-size:.85rem;"><input type="checkbox" id="suAddMiss" style="width:22px;height:22px;"> Aggiungili come conti “Recuperato da SumUp”</label><div class="fc-sub">Spunta solo se sei sicuro che nell’app mancano davvero: se lo stesso conto c’è con un importo un po’ diverso (sconto, mancia), aggiungerlo lo conterebbe due volte.</div>`:''}
<div class="modal-actions" style="margin-top:12px;"><button class="btn-modal" style="background:#334155;color:#fff;" onclick="document.getElementById('suModal').classList.remove('active')">Annulla</button><button class="btn-modal" style="background:#0369A1;color:#fff;" onclick="v2930Apply()">✅ Applica</button></div>`;
$('suModal').classList.add('active');};
window.v2930Apply=()=>{if(!PLAN)return;const{P,local}=PLAN,addMiss=!!($('suAddMiss')&&$('suAddMiss').checked);let n=0;const now=Date.now();
P.forEach(({s,e})=>{if(!e)return;const tot=Number(e.total)||0;let pay=Object.assign({},e.pay||{});
if(s[3]==='cash')pay={m:'contanti',cash:tot,via:'SumUp'};else if(s[3]==='card')pay={m:'carta',card:tot,via:'SumUp'};else{pay.via='SumUp';if(!pay.m)pay.m='misto';}
e.pay=pay;if(svcDate(e)!==s[0]){e.moved={from:e.ts,by:'Allineamento SumUp',at:now};e.ts=tsOf(s[0],s[1]);e.date=s[0];e.time=s[1];}e.mt=now;e.suChk=now;n++;});
local.forEach(e=>{if(isSU(e)){e.pay=Object.assign({},e.pay||{},{via:'Registratore'});e.mt=now;e.suChk=now;n++;}});
let added=0;if(addMiss)P.filter(x=>!x.e).forEach(({s})=>{const ts=tsOf(s[0],s[1]);state.historyLog.push({ts,date:s[0],time:s[1],tableName:'Recuperato da SumUp',items:[],total:s[2],coperti:0,pay:s[3]==='cash'?{m:'contanti',cash:s[2],via:'SumUp'}:s[3]==='card'?{m:'carta',card:s[2],via:'SumUp'}:{m:'misto',cash:0,card:s[2],via:'SumUp'},recovered:true,mt:now,rid:'su'+ts});added++;});
saveState(false,{history:true});$('suModal').classList.remove('active');PLAN=null;try{renderConti();}catch(e){}
alert('✅ Fatto: '+n+' conti sistemati'+(added?' e '+added+' pagamenti SumUp aggiunti':'')+'. Le chiusure mostrano ora i totali cassa locale / SumUp aggiornati.');};
{const _r=renderCashClose;renderCashClose=function(){const r=_r.apply(this,arguments);try{const el=$('cashClose');if(el&&isOwner()&&!el.querySelector('.v2930su')){const b=document.createElement('button');b.className='btn-main v2930su';b.style.cssText='width:100%;margin:0 0 10px;background:#1D4ED8;color:#fff;';b.textContent='🔍 Allinea i conti con SumUp (21/10 – 06/11)';b.onclick=v2930Open;el.prepend(b);}}catch(e){}return r;};}
})();
}catch(e){console.error("chef-extra blocco 19",e);}
try{
(function(){
const $=id=>document.getElementById(id),esc=s=>escH(s),pad=n=>String(n).padStart(2,'0');
const isOwner=()=>/^christian$/i.test((state.waiterName||'').trim());
const FULL=n=>{const t=String(n||'').trim();return /^alice$/i.test(t)?'Alice Di Mascio':/^christian$/i.test(t)?'Christian Carafa':t;};
const today=()=>{const d=new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());};
const dmy=s=>s?String(s).split('-').reverse().join('/'):'';
const MESI=['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
let tt=0;function toast(m,ms){__toast(m,ms||3000,0)}
const D={sc1:{},sc8:{}};['sc1','sc8'].forEach(k=>{try{D[k]=JSON.parse(localStorage.getItem('alicetta_'+k)||'{}')||{};}catch(e){}});
const saveL=k=>{try{localStorage.setItem('alicetta_'+k,JSON.stringify(D[k]));}catch(e){}};
const meC=()=>/^christian$/i.test((state.waiterName||'').trim());
function notify(k,v){try{if(meC()||typeof ntfyPost!=='function')return;const who=FULL(state.waiterName)||'?';if(k==='sc1')ntfyPost('christian','📦 Merce accettata',(v.forn||'')+(v.num?' n. '+v.num:'')+' · '+(v.c?'conforme':'NON conforme')+' · '+who,v.c?3:5);else ntfyPost('christian','❄️ Abbattimento registrato',(v.al||'')+' · '+who,3);}catch(e){}}
async function put(k,id,v){const isNew=!!v&&!D[k][id];if(v)D[k][id]=v;else delete D[k][id];if(isNew)notify(k,v);saveL(k);try{await fbSend('/costi/haccp/'+k+'/'+id,v?'PUT':'DELETE',v||undefined);}catch(e){toast('⚠️ Salvato sul telefono, lo invio quando c’è rete');}}
async function pull(){for(const k of ['sc1','sc8']){try{const r=await fbGet('/costi/haccp/'+k);if(r&&typeof r==='object'){D[k]=r;saveL(k);}}catch(e){}}}
let M=today().slice(0,7);
const prodTxt=b=>(b.righe||[]).map(r=>{const n=String(r.p||r.i||'').trim();return n+(r.l?' (lotto '+r.l+')':'');}).filter(Boolean).join(', ');
function small(b64){return new Promise(ok=>{const im=new Image();im.onload=()=>{const m=1100,sc=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*sc);c.height=Math.round(im.height*sc);c.getContext('2d').drawImage(im,0,0,c.width,c.height);ok(c.toDataURL('image/jpeg',.6).split(',')[1]);};im.onerror=()=>ok(null);im.src='data:image/jpeg;base64,'+b64;});}
async function saveFoto(rid,arr){try{const L=(await Promise.all((arr||[]).slice(0,6).map(small))).filter(Boolean);if(!L.length)return 0;await fbSend('/costi/haccpfoto/'+rid,'PUT',{imgs:L,ts:Date.now()});return L.length;}catch(e){return 0;}}
window.v2931Sc1FromBolla=async(id,b,fromSave)=>{if(!b||b.tipo==='scontrino'||!b.data)return;if(Object.values(D.sc1).some(x=>x&&x.src===id))return;const rid='s'+(b.ts||Date.now());const row={d:b.data,num:b.num||'',forn:b.fornitore||'',prod:prodTxt(b)||'vedi fattura',c:true,firma:FULL(state.waiterName)||'Alice Di Mascio',src:id,ts:Date.now()};
if(fromSave&&Array.isArray(window.__blImgs)&&window.__blImgs.length){const n=await saveFoto(rid,window.__blImgs);window.__blImgs=null;if(n)row.foto=n;}put('sc1',rid,row);draw();};
function syncBolle(){try{const C=window.v211Data?v211Data():null;if(!C||!C.bolle)return;Object.entries(C.bolle).forEach(([id,b])=>{if(b&&b.data>='2026-11-01')v2931Sc1FromBolla(id,b);});}catch(e){}}
function rowsOf(k,f){return Object.entries(D[k]).filter(([id,r])=>r&&String(r[f]||'').slice(0,7)===M).sort((a,b)=>String(a[1][f]).localeCompare(String(b[1][f]))||(a[1].ts||0)-(b[1].ts||0));}
function draw(){const H=[...document.querySelectorAll('.hxHost')];if(!H.length)return;const lbl=MESI[+M.slice(5,7)-1]+' '+M.slice(0,4);
const nav=`<div class="hx-nav"><button class="btn-note" onclick="v2931M(-1)">◀</button><b>${lbl}</b><button class="btn-note" onclick="v2931M(1)">▶</button></div>`;
const s1=rowsOf('sc1','d'),s8=rowsOf('sc8','dab');
let wk=0;try{const C=window.v211Data?v211Data():{};const a=new Date();a.setDate(a.getDate()-7);const t=a.toISOString().slice(0,10);wk=Object.values((C&&C.bolle)||{}).filter(b=>b&&b.data>=t).length;}catch(e){}
const __h=`<div class="hc-card"><h3>🧾 Fatture e bolle</h3><div class="fc-sub" style="margin:4px 0 8px;">Ultimi 7 giorni: <b>${wk}</b> documenti caricati. Quando carichi una bolla o una fattura in Fornitori, finisce da sola nella scheda di accettazione qui sotto.</div>${isOwner()?'<button class="btn-main btn-bill" style="width:100%;" onclick="v2931Forn()">📦 Apri fatture e bolle</button>':''}<button class="btn-main btn-print" style="width:100%;margin-top:8px;" onclick="v2932Fasc()">📤 Fascicolo HACCP del mese<br><span style="font-size:.72rem;">temperature, pulizie, accettazione con foto delle fatture, abbattimento · stampa, WhatsApp, email</span></button></div>
<div class="hc-card"><h3>📦 Accettazione merci <span class="fc-sub">(scheda SC1)</span></h3>${nav}
<div class="hx-g"><button class="btn-main btn-print" onclick="v2931Photo('sc1')">📸 Foto bolla</button><button class="btn-main btn-bill" onclick="v2931Edit('sc1')">✍️ A mano</button></div>
${s1.map(([id,r])=>`<div class="hx-row"><div onclick="v2931Edit('sc1','${id}')" style="flex:1;cursor:pointer;"><b>${dmy(r.d).slice(0,5)} · ${esc(r.forn)}</b>${r.num?' · n. '+esc(r.num):''}<div class="fc-sub">${esc(r.prod)}</div><div class="fc-sub">✍️ ${esc(r.firma||'')}</div></div><button class="hx-c ${r.c?'ok':'no'}" onclick="v2931C('${id}')">${r.c?'C ✓':'NC ✗'}</button></div>`).join('')||'<div class="fc-sub">Nessuna accettazione in questo mese.</div>'}
<button class="btn-note" style="width:100%;margin-top:8px;padding:10px;" onclick="v2931Print('sc1')">🖨️ Stampa scheda SC1 del mese</button></div>
<div class="hc-card"><h3>❄️ Abbattimento <span class="fc-sub">(scheda SC8)</span></h3>${nav}
<div class="hx-g"><button class="btn-main btn-print" onclick="v2931Photo('sc8')">📸 Foto etichetta</button><button class="btn-main btn-bill" onclick="v2931Edit('sc8')">✍️ A mano</button></div>
${s8.map(([id,r])=>`<div class="hx-row" onclick="v2931Edit('sc8','${id}')" style="cursor:pointer;"><div style="flex:1;"><b>${dmy(r.dab).slice(0,5)} · ${esc(r.al)}</b><div class="fc-sub">${esc(r.forn||'ns produzione')}${r.peso?' · '+esc(r.peso):''}${r.oin?' · '+esc(r.oin)+'→'+esc(r.oout||'…'):''}${r.scad?' · scade '+dmy(r.scad).slice(0,5):''}</div><div class="fc-sub">✍️ ${esc(r.add||'')}</div></div><span class="hx-c ${r.c!==false?'ok':'no'}">${r.c!==false?'C ✓':'NC ✗'}</span></div>`).join('')||'<div class="fc-sub">Nessun abbattimento in questo mese.</div>'}
<button class="btn-note" style="width:100%;margin-top:8px;padding:10px;" onclick="v2931Print('sc8')">🖨️ Stampa scheda SC8 del mese</button></div>`;H.forEach(x=>x.innerHTML=__h);}
let pulled=false;function place(){let n=false;[['hcPage','hxA'],['hcModalBox','hxB']].forEach(([p,id])=>{const e=$(p);if(e&&!$(id)){const d=document.createElement('div');d.id=id;d.className='hxHost';e.after(d);n=true;}});if(n){syncBolle();draw();if(!pulled){pulled=true;pull().then(()=>{syncBolle();draw();});}}}
setInterval(()=>{try{place();}catch(e){}},1500);
window.v2931M=n=>{const d=new Date(M+'-15T12:00');d.setMonth(d.getMonth()+n);M=d.getFullYear()+'-'+pad(d.getMonth()+1);draw();};
window.v2931Forn=()=>{try{switchMainView('sales');setHubPage('sales','forn');}catch(e){}};
window.v2931C=id=>{const r=D.sc1[id];if(!r)return;put('sc1',id,{...r,c:!r.c});draw();};
const F={sc1:[['d','Data accettazione','date'],['num','N° fattura o bolla'],['forn','Fornitore'],['prod','Prodotti conferiti (lotto)','area'],['firma','Firma addetto al ricevimento']],
sc8:[['al','Alimento'],['forn','Fornitore / ns produzione'],['arr','Data arrivo','date'],['dab','Data abbattimento','date'],['peso','Peso / N° fattura'],['oin','Ora ingresso','time'],['oout','Ora uscita','time'],['dout','Data uscita','date'],['scad','Scadenza (dall’etichetta)','date'],['add','Addetto al controllo']]};
let ED=null;
window.v2931Edit=(k,id,pre)=>{const fo=pre&&pre._foto;if(pre)delete pre._foto;const r=id?{...D[k][id]}:(pre||(k==='sc1'?{d:today(),c:true,firma:FULL(state.waiterName)}:{dab:today(),arr:today(),forn:'ns produzione',c:true,add:FULL(state.waiterName)}));ED={k,id,r,fo};
$('hxBox').innerHTML=`<h3>${k==='sc1'?'📦 Accettazione merci':'❄️ Abbattimento'}</h3>${fo&&fo.length?`<div class="fc-sub">📎 ${fo.length} foto del documento: verranno salvate con la riga</div>`:r.foto?`<div class="fc-sub">📎 ${r.foto} foto salvate</div>`:''}${F[k].map(([f,l,t])=>`<label>${l}</label>${t==='area'?`<textarea class="v14-in" id="hx_${f}" rows="3">${esc(r[f]||'')}</textarea>`:`<input class="v14-in" id="hx_${f}" type="${t||'text'}" value="${esc(r[f]||'')}">`}`).join('')}
<label><input type="checkbox" id="hx_c" ${r.c!==false?'checked':''} style="width:20px;height:20px;vertical-align:middle;"> Conforme (C)</label>
<div class="modal-actions" style="margin-top:12px;">${id?`<button class="btn-modal" style="background:#B91C1C;color:#fff;" onclick="v2931Del()">🗑️</button>`:''}<button class="btn-modal" style="background:#334155;color:#fff;" onclick="document.getElementById('hxModal').classList.remove('active')">Annulla</button><button class="btn-modal" style="background:#0891B2;color:#fff;" onclick="v2931Save()">💾 Salva</button></div>`;
$('hxModal').classList.add('active');};
window.v2931Save=()=>{if(!ED)return;const{k,id}=ED,r={...ED.r};F[k].forEach(([f])=>{const e=$('hx_'+f);if(e)r[f]=e.value.trim();});r.c=$('hx_c').checked;r.ts=r.ts||Date.now();if(k==='sc1'&&!r.d)return alert('Serve la data');if(k==='sc8'&&(!r.al||!r.dab))return alert('Servono alimento e data di abbattimento');
const rid=id||((k==='sc1'?'s':'a')+Date.now()),fo=ED.fo;$('hxModal').classList.remove('active');if(fo&&fo.length){toast('⏳ Salvo le foto…');saveFoto(rid,fo).then(n=>{if(n){r.foto=n;put(k,rid,r);draw();}});}put(k,rid,r);M=String(k==='sc1'?r.d:r.dab).slice(0,7)||M;draw();toast('✅ Registrato');};
window.v2931Del=()=>{if(!ED||!ED.id||!confirm('Eliminare questa riga?'))return;put(ED.k,ED.id,null);$('hxModal').classList.remove('active');draw();};
window.v2931Photo=k=>{const i=document.createElement('input');i.type='file';i.accept='image/*';i.multiple=k==='sc1';i.onchange=()=>{const f=[...i.files];if(f.length)read(k,f);};i.click();};
async function read(k,files){if(!getGeminiKey())return alert('Serve la chiave Gemini in ⚙️ Opzioni.');toast('⏳ Leggo la foto…');
try{const parts=[],raw=[];for(const f of files.slice(0,4)){const b64=await shrinkImage(f,2000);raw.push(b64);parts.push({inline_data:{mime_type:'image/jpeg',data:b64}});}
const y=new Date().getFullYear();
parts.push({text:k==='sc1'?`Foto di una fattura o DDT di un fornitore di alimenti. Rispondi SOLO JSON: {"data":"YYYY-MM-DD","numero_documento":string|null,"fornitore":nome breve senza forma societaria,"prodotti":[{"nome":nome breve del prodotto in italiano,"lotto":numero di lotto se scritto altrimenti null}]}. Elenca tutti i prodotti.`:`Foto di un'etichetta di cucina (abbattimento o preparazione) scritta a mano. Campi tipici: Contenuto, Confezionato il, Scadenza, Dipendente, Responsabile. Rispondi SOLO JSON: {"contenuto":string,"confezionato":"YYYY-MM-DD"|null,"scadenza":"YYYY-MM-DD"|null,"dipendente":string|null,"responsabile":string|null}. Le date come 03/11/26 sono giorno/mese/anno ${y}.`});
const o=jparse(await callGemini(parts,true,{temperature:0}));const ok=s=>/^\d{4}-\d{2}-\d{2}$/.test(String(s||''));
if(k==='sc1')v2931Edit('sc1',null,{d:ok(o.data)?o.data:today(),num:String(o.numero_documento||'').replace(/^null$/,''),forn:String(o.fornitore||''),prod:(o.prodotti||[]).map(p=>p&&p.nome?p.nome+(p.lotto&&p.lotto!=='null'?' (lotto '+p.lotto+')':''):'').filter(Boolean).join(', ')||'vedi fattura',c:true,firma:FULL(state.waiterName),_foto:raw});
else{const d=ok(o.confezionato)?o.confezionato:today();v2931Edit('sc8',null,{_foto:raw,al:String(o.contenuto||''),forn:'ns produzione',arr:d,dab:d,scad:ok(o.scadenza)?o.scadenza:'',c:true,add:FULL(o.dipendente)||FULL(state.waiterName),resp:String(o.responsabile||'')});}}
catch(e){alert('Non riesco a leggere la foto: '+(e.message||e)+'. Riprova o inserisci a mano.');}}
window.v2931Print=k=>{const lbl=MESI[+M.slice(5,7)-1]+' '+M.slice(0,4);const w=window.open('','_blank');if(!w)return;const td=v=>`<td>${esc(v==null?'':v)}</td>`;
const head=`<html><head><meta charset="utf-8"><title>${k.toUpperCase()} ${lbl}</title><style>@page{size:A4 landscape;margin:10mm}body{font-family:Arial,sans-serif;font-size:11px;color:#000}h2{color:#1D4ED8;text-align:center;margin:4px 0}table{width:100%;border-collapse:collapse}th,td{border:1px solid #000;padding:4px;vertical-align:top}th{font-size:10px}.c{text-align:center;font-weight:bold}.top{display:flex;justify-content:space-between;border:1px solid #000;padding:6px 10px;margin-bottom:8px;font-weight:bold}</style></head><body><div class="top"><span>ALICETTA TRATTORIA</span><span>SCHEDE DI AUTOCONTROLLO HACCP</span></div>`;
let h;if(k==='sc1'){const R=rowsOf('sc1','d');h=head+`<h2>SC1 – SCHEDA DI REGISTRAZIONE ACCETTAZIONE PRODOTTI DEPERIBILI · ${lbl}</h2><table><tr><th>Data accettazione</th><th>Estremi del documento di accompagnamento N° Fatt. o bolla</th><th>Fornitore</th><th>Prodotto conferito (lotto) / vedi fattura</th><th>C</th><th>NC</th><th>Firma addetto al ricevimento merci</th></tr>${R.map(([i,r])=>`<tr>${td(dmy(r.d))}${td(r.num)}${td(r.forn)}${td(r.prod)}<td class="c">${r.c?'X':''}</td><td class="c">${r.c?'':'X'}</td>${td(r.firma)}</tr>`).join('')}</table><p><b style="color:#B91C1C">*Conformità:</b> l’addetto al ricevimento merci prima di accettare i prodotti si assicura che questi siano trasportati in modo igienico e rispettando le idonee temperature ed inoltre effettua un accurato esame visivo degli stessi al fine di controllare l’integrità delle confezioni, l’assenza di insudiciamento o di alterazioni visibili dei prodotti.</p><p>Firma del responsabile dell’autocontrollo: <b>Alice Di Mascio</b> ____________________</p>`;}
else{const R=rowsOf('sc8','dab');h=head+`<h2>SC8 – SCHEDA REGISTRAZIONE ABBATTIMENTO · Mese ${MESI[+M.slice(5,7)-1]} Anno ${M.slice(0,4)}</h2><div>C = CONFORME · NC = NON CONFORME</div><table><tr><th>Data arrivo</th><th>Alimento</th><th>C</th><th>NC</th><th>Fornitore / ns produzione</th><th>Data abbattimento</th><th>Peso / N° fatt</th><th>Ora ingresso</th><th>Ora uscita</th><th>Data uscita</th><th>Addetto al controllo</th></tr>${R.map(([i,r])=>`<tr>${td(dmy(r.arr))}${td(r.al)}<td class="c">${r.c!==false?'X':''}</td><td class="c">${r.c!==false?'':'X'}</td>${td(r.forn)}${td(dmy(r.dab))}${td(r.peso)}${td(r.oin)}${td(r.oout)}${td(dmy(r.dout))}${td(r.add)}</tr>`).join('')}</table><p>Eventuali condizioni correttive: ____________________________________________</p>`;}
w.document.write(h+'</body></html>');w.document.close();setTimeout(()=>{try{w.print();}catch(e){}},500);};
window.v2932Fasc=async()=>{const lbl=MESI[+M.slice(5,7)-1]+' '+M.slice(0,4);toast('⏳ Preparo il fascicolo di '+lbl+'…');
let rep='',repCss='';try{if(window.v2932Rep){const x=await v2932Rep(M);const st=x.match(/<style[^>]*>([\s\S]*?)<\/style>/i),bd=x.match(/<body[^>]*>([\s\S]*?)<\/body>/i);repCss=st?st[1]:'';rep=bd?bd[1]:x;}}catch(e){rep='<p>Registro temperature non disponibile offline.</p>';}await pull();const td=v=>`<td>${esc(v==null?'':v)}</td>`,S1=rowsOf('sc1','d'),S8=rowsOf('sc8','dab');let foto='';for(const[id,r]of S1){if(!r.foto)continue;try{const f=await fbGet('/costi/haccpfoto/'+id);if(f&&f.imgs)foto+=`<div class="pg"><h3>${dmy(r.d)}· ${esc(r.forn)}${r.num?' · n. '+esc(r.num):''}</h3>${f.imgs.map(b=>`<img src="data:image/jpeg;base64,${b}">`).join('')}</div>`;}catch(e){}}const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fascicolo HACCP ${lbl}– Alicetta Trattoria</title><style>${repCss}body{font-family:Arial,sans-serif;font-size:11px;color:#000;background:#fff;margin:12px}h1{font-size:18px;margin:0 0 4px}h2{color:#1D4ED8;font-size:14px;border-bottom:2px solid #1D4ED8;padding-bottom:3px;margin-top:22px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #000;padding:4px;vertical-align:top}.c{text-align:center;font-weight:bold}.pg{page-break-inside:avoid;margin:10px 0}.pg img{max-width:100%;display:block;margin:6px 0;border:1px solid #999}.sec{page-break-before:always}@page{size:A4;margin:10mm}</style></head><body>
<h1>ALICETTA TRATTORIA · Fossacesia — Fascicolo HACCP di ${lbl}</h1><div>Responsabile dell’autocontrollo: <b>Alice Di Mascio</b> · Titolare: <b>Christian Carafa</b> · creato il ${new Date().toLocaleString('it-IT')}</div>
<h2>1. Registro temperature e pulizie</h2>${rep||'<p>Nessun dato.</p>'}
<h2 class="sec">2. SC1 – Accettazione prodotti deperibili</h2><table><tr><th>Data</th><th>N° fatt. o bolla</th><th>Fornitore</th><th>Prodotto conferito (lotto)</th><th>C</th><th>NC</th><th>Firma addetto</th></tr>${S1.map(([i,r])=>`<tr>${td(dmy(r.d))}${td(r.num)}${td(r.forn)}${td(r.prod)}<td class="c">${r.c?'X':''}</td><td class="c">${r.c?'':'X'}</td>${td(r.firma)}</tr>`).join('')||'<tr><td colspan="7">Nessuna accettazione registrata.</td></tr>'}</table>
<h2 class="sec">3. SC8 – Abbattimento</h2><table><tr><th>Data arrivo</th><th>Alimento</th><th>C</th><th>NC</th><th>Fornitore / ns produzione</th><th>Data abbattimento</th><th>Peso / N° fatt</th><th>Ora ingresso</th><th>Ora uscita</th><th>Data uscita</th><th>Scadenza</th><th>Addetto</th></tr>${S8.map(([i,r])=>`<tr>${td(dmy(r.arr))}${td(r.al)}<td class="c">${r.c!==false?'X':''}</td><td class="c">${r.c!==false?'':'X'}</td>${td(r.forn)}${td(dmy(r.dab))}${td(r.peso)}${td(r.oin)}${td(r.oout)}${td(dmy(r.dout))}${td(dmy(r.scad))}${td(r.add)}</tr>`).join('')||'<tr><td colspan="12">Nessun abbattimento registrato.</td></tr>'}</table>
<h2 class="sec">4. Fatture e bolle fotografate</h2>${foto||'<p>Nessuna foto salvata per questo mese (le foto si salvano dalle bolle caricate da questa versione in poi).</p>'}
</body></html>`;
const name='fascicolo-haccp-alicetta-'+M+'.html',file=new File([html],name,{type:'text/html'});
$('hxBox').innerHTML=`<h3>📤 Fascicolo HACCP · ${lbl}</h3><div class="fc-sub" style="margin-bottom:8px;">Contiene temperature e pulizie, SC1 con le foto delle fatture e SC8. Pronto da mostrare, stampare o inviare.</div>
<button class="btn-main btn-print" style="width:100%;" id="hxF1">🖨️ Stampa o salva PDF</button><button class="btn-main btn-bill" style="width:100%;margin-top:8px;" id="hxF2">📤 Invia (WhatsApp, email…)</button><button class="btn-note" style="width:100%;margin-top:8px;padding:10px;" id="hxF3">⬇️ Scarica il file</button>
<div class="fc-sub" style="margin-top:8px;">Per l’email: tocca “Invia” e scegli Gmail, così il file è già allegato.</div><div class="modal-actions" style="margin-top:12px;"><button class="btn-modal" style="background:#334155;color:#fff;" onclick="document.getElementById('hxModal').classList.remove('active')">Chiudi</button></div>`;
const dl=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(file);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},2000);};
$('hxF1').onclick=()=>{const w=window.open('','_blank');if(!w)return dl();w.document.write(html);w.document.close();setTimeout(()=>{try{w.print();}catch(e){}},700);};
$('hxF2').onclick=async()=>{try{if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:'Fascicolo HACCP '+lbl,text:'Fascicolo HACCP Alicetta Trattoria – '+lbl});return;}}catch(e){if(e&&e.name==='AbortError')return;}dl();toast('File scaricato: allegalo a WhatsApp o all’email');};
$('hxF3').onclick=dl;$('hxModal').classList.add('active');};
function lastWeek(){const d=new Date();const day=(d.getDay()+6)%7;const mon=new Date(d);mon.setDate(d.getDate()-day-7);const sun=new Date(mon);sun.setDate(mon.getDate()+6);const f=x=>x.getFullYear()+'-'+pad(x.getMonth()+1)+'-'+pad(x.getDate());return[f(mon),f(sun)];}
window.v2931Mon=force=>{const[a,b]=lastWeek(),key='alicetta_fattmon',wk=a;if(!force&&(localStorage.getItem(key)===wk||Date.now()<(Number(localStorage.getItem(key+'_snz'))||0)))return;if(document.querySelector('.modal-overlay.active')&&!force)return;
let L=[];try{const C=window.v211Data?v211Data():{};L=Object.values((C&&C.bolle)||{}).filter(x=>x&&x.data>=a&&x.data<=b).sort((x,y)=>x.data.localeCompare(y.data));}catch(e){}
const tot=L.reduce((s,x)=>s+(Number(x.tot)||0),0),txt='Fatture e bolle Alicetta Trattoria dal '+dmy(a)+' al '+dmy(b)+':\n'+L.map(x=>'• '+dmy(x.data)+' '+(x.fornitore||'')+(x.num?' n. '+x.num:'')+' € '+formatPrice(x.tot||0)).join('\n')+'\nTotale imponibile € '+formatPrice(tot);
$('hxBox').innerHTML=`<h3>📤 Lunedì: invia le fatture</h3><div class="fc-sub" style="margin-bottom:8px;">Settimana dal <b>${dmy(a)}</b> al <b>${dmy(b)}</b>: ${L.length} documenti, € ${formatPrice(tot)} imponibile.</div>${L.map(x=>`<div class="hx-row"><span>${dmy(x.data).slice(0,5)} · ${esc(x.fornitore||'')}${x.num?' · n. '+esc(x.num):''}</span><b>€ ${formatPrice(x.tot||0)}</b></div>`).join('')||'<div class="fc-sub">Nessun documento caricato la settimana scorsa.</div>'}
<div class="fc-sub" style="margin-top:8px;">Manda al commercialista anche le foto o i PDF dei documenti.</div><div class="modal-actions" style="margin-top:12px;flex-wrap:wrap;"><button class="btn-modal" style="background:#334155;color:#fff;" onclick="v2931MonLater()">Più tardi</button><button class="btn-modal" style="background:#25D366;color:#062329;" id="hxShare">📤 Invia elenco</button><button class="btn-modal" style="background:#16A34A;color:#fff;" onclick="v2931MonDone('${wk}')">✅ Fatto</button></div>`;
$('hxShare').onclick=async()=>{if(navigator.share){try{await navigator.share({text:txt});return;}catch(e){}}window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank');};$('hxModal').classList.add('active');};
window.v2931MonLater=()=>{localStorage.setItem('alicetta_fattmon_snz',String(Date.now()+2*3600e3));$('hxModal').classList.remove('active');};
window.v2931MonDone=wk=>{localStorage.setItem('alicetta_fattmon',wk);$('hxModal').classList.remove('active');toast('✅ Fatture della settimana segnate come inviate');};
setInterval(()=>{try{const d=new Date();if(isOwner()&&d.getDay()===1&&d.getHours()>=9&&document.visibilityState==='visible')v2931Mon(false);}catch(e){}},60000);
{const _t=window.v216Temp;if(_t)window.v216Temp=async function(id){const inp=document.getElementById('hct_'+id),v=inp?inp.value:'';const r=await _t.apply(this,arguments);try{if(!meC()&&v&&typeof ntfyPost==='function'){const e=(window.v2916Eq?v2916Eq():[]).find(x=>x.id===id);ntfyPost('christian','🌡️ Temperatura registrata',(e?e.n+': ':'')+v+' °C · '+FULL(state.waiterName),3);}}catch(e){}return r;};}
{const _w=window.v2916WriteDays;if(_w)window.v2916WriteDays=async function(ym,obj){const r=await _w.apply(this,arguments);try{if(!meC()&&typeof ntfyPost==='function')ntfyPost('christian','🌡️ Temperature dalla scheda',Object.keys(obj||{}).length+' valori registrati · '+FULL(state.waiterName),3);}catch(e){}return r;};}
if(typeof addTime==='function'){const _a=addTime;addTime=async function(emp,type,ts){const r=await _a.apply(this,arguments);try{if(!meC()&&typeof ntfyPost==='function'&&Math.abs(Date.now()-(ts||0))<5*60000){const L={in:'🟢 Entrata',bstart:'☕ Inizio pausa',bend:'↩️ Fine pausa',out:'🔴 Uscita'};ntfyPost('christian',(L[type]||'⏱️ Timbratura')+': '+emp,'alle '+new Date(ts||Date.now()).toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'}),3);}}catch(e){}return r;};}
})();
}catch(e){console.error("chef-extra blocco 20",e);}
try{
(function(){
const $=id=>document.getElementById(id),ESC='\x1B',GS='\x1D';
const qr=(d,size)=>{const n=d.length+3;return GS+'(k\x04\x00\x31\x41\x32\x00'+GS+'(k\x03\x00\x31\x43'+String.fromCharCode(size||8)+GS+'(k\x03\x00\x31\x45\x31'+GS+'(k'+String.fromCharCode(n%256,Math.floor(n/256))+'\x31\x50\x30'+d+GS+'(k\x03\x00\x31\x51\x30';};
/* QR del Club su scontrino */
window.v2933PrintClub=()=>{const u=clubUrl();const ep=ESC+'@'+ESC+'a\x01'+ESC+'!\x38'+'ALICETTA\n'+ESC+'!\x10'+'TRATTORIA\n\n'+ESC+'!\x30'+'ALICETTA CLUB\n'+ESC+'!\x00'+'\nIscriviti col tuo numero di telefono:\n1 euro = 1 punto, ogni '+FID_EUR+' punti\nun calice di benvenuto in regalo!\n\n'+qr(u,8)+'\n\nInquadra il codice con la fotocamera\n\n\n\n'+GS+'V\x42\x00';
dispatchPrint('ALICETTA CLUB\n[QR '+u+']\nIscriviti col tuo numero di telefono',ep);};
{const _s=showClubQr;showClubQr=function(){const r=_s.apply(this,arguments);try{const a=document.querySelector('#clubQrModal .modal-actions');if(a&&!a.querySelector('.v2933c')){const b=document.createElement('button');b.className='btn-modal v2933c';b.style.cssText='background:#0E7490;color:#fff;';b.textContent='🖨️ Stampa';b.onclick=v2933PrintClub;a.prepend(b);}}catch(e){}return r;};}
/* tasto Stampa pre-conto nel tavolo */
function preBtn(){document.querySelectorAll('button').forEach(b=>{if(b.dataset.pc||!/Paga con SumUp/.test(b.textContent||'')||b.closest('.modal-overlay'))return;b.dataset.pc='1';const p=b.previousElementSibling;if(p&&p.classList&&p.classList.contains('v2933pre'))return;const n=document.createElement('button');n.className='btn-main btn-print v2933pre';n.style.cssText='width:100%;margin-bottom:12px;';n.innerHTML='🖨️ Stampa pre-conto';n.onclick=()=>showPreBill();b.before(n);});}
new MutationObserver(()=>{clearTimeout(window._pcT);window._pcT=setTimeout(()=>{try{preBtn();}catch(e){}},200);}).observe(document.body,{childList:true,subtree:true});
/* dopo ogni pagamento (contanti, Tap to Pay, Terminal SumUp): barra per stampare la ricevuta */
{const _f=freeCurrentTable;freeCurrentTable=function(pay){const start=Date.now(),t=pay&&state.tables[state.activeTableId],nm=t?t.name:'';const r=_f.apply(this,arguments);
try{if(pay&&nm){setTimeout(()=>{const e=(state.historyLog||[]).slice().reverse().find(x=>x&&x.ts>=start-1000&&x.tableName===nm)||(state.historyLog||[]).slice().reverse().find(x=>x&&(x.ts||0)>=start-1000);if(!e)return;
$('rcBarT').textContent='🧾 '+nm+' pagato · € '+formatPrice(e.total||0);$('rcBarP').onclick=()=>{v2925PrintBill(e.rid||e.ts);$('rcBar').classList.remove('on');};$('rcBar').classList.add('on');clearTimeout(window._rcbT);window._rcbT=setTimeout(()=>$('rcBar').classList.remove('on'),90000);},600);}}catch(x){}
return r;};}
/* prova stampante in Opzioni */
window.v2933Test=()=>{const n=new Date().toLocaleString('it-IT');const ep=ESC+'@'+ESC+'a\x01'+ESC+'!\x38'+'PROVA\n'+ESC+'!\x00'+'Chef Bull Brigade\n'+n+'\n\n'+ESC+'a\x00'+'Accenti: à è é ì ò ù - Perché? Così!\n'+'Totale        EUR 12,50\n'+'-'.repeat(48)+'\n'+ESC+'a\x01'+'Se leggi bene gli accenti e vedi il QR,\nla stampante è pronta.\n\n'+qr('https://christonstage.github.io/Tables-Manager/menu.html',6)+'\n\n\n\n'+GS+'V\x42\x00';
dispatchPrint('PROVA STAMPANTE\nAccenti: à è é ì ò ù\n[QR]',ep);};
function testBtn(){const c=$('chkRawbt');if(!c||$('v2933t'))return;const b=document.createElement('button');b.id='v2933t';b.className='btn-main btn-print';b.style.cssText='width:100%;margin-top:8px;';b.textContent='🖨️ Prova stampante';b.onclick=v2933Test;const l=c.closest('label')||c.parentElement;(l||c).after(b);}
setInterval(()=>{try{testBtn();}catch(e){}},1500);
})();
}catch(e){console.error("chef-extra blocco 21",e);}
try{
(function(){
window.v2936Mixed=()=>{v49Open();try{const t=state.tables[state.activeTableId];if(t&&!t.split)v49Make(2);}catch(e){}};
function add(){document.querySelectorAll('.v2933pre').forEach(p=>{const nx=p.nextElementSibling;if(nx&&nx.classList&&nx.classList.contains('v2936sp'))return;const d=document.createElement('div');d.className='v2936sp';d.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;';
d.innerHTML='<button class="btn-main btn-bill" style="padding:12px 6px;line-height:1.2;" onclick="v49Open()">👥 Dividi<br><small style="font-size:.78rem;">tra persone</small></button><button class="btn-main btn-bill" style="padding:12px 6px;line-height:1.2;" onclick="v2936Mixed()">💳 + 💵 Paga<br><small style="font-size:.78rem;">parte carta, parte contanti</small></button>';p.after(d);});}
new MutationObserver(()=>{clearTimeout(window._v36T);window._v36T=setTimeout(()=>{try{add();}catch(e){}},220);}).observe(document.body,{childList:true,subtree:true});
})();
}catch(e){console.error("chef-extra blocco 22",e);}
try{
(function(){
const $=id=>document.getElementById(id);
const st=document.createElement('style');
st.textContent='.cov-big{display:inline-block;margin:2px auto 6px;background:#062329;color:#fff;font-weight:900;font-size:1.45rem;line-height:1.1;padding:3px 14px;border-radius:999px;border:3px solid #fff;box-shadow:0 3px 0 rgba(0,0,0,.25)}.cov-big small{font-size:.75rem;font-weight:800;margin-left:3px}.cov-big.q{background:#FDE68A;color:#78350F;font-size:1rem}#jobBar{position:fixed;left:10px;right:10px;bottom:calc(124px + env(safe-area-inset-bottom,0px));z-index:95;display:none;background:#062329;color:#fff;border:2px solid #A78BFA;border-radius:16px;padding:9px 12px;box-shadow:0 10px 26px rgba(0,0,0,.45);font-weight:800;font-size:.85rem}#jobBar.on{display:block}#jobBar .t{display:flex;gap:8px;align-items:center}#jobBar .t b{flex:1}#jobBar .t button{border:0;border-radius:10px;padding:6px 10px;font-weight:900;background:rgba(255,255,255,.18);color:#fff}#jobBar .d{font-size:.74rem;font-weight:700;opacity:.85;margin-top:3px}#jobBar .p{height:10px;border-radius:99px;background:rgba(255,255,255,.18);margin-top:6px;overflow:hidden}#jobBar .p i{display:block;height:100%;width:0;background:linear-gradient(90deg,#FF3EA5,#A78BFA,#1BE7FF);border-radius:99px;transition:width .5s}#jobBar.ok{border-color:#22C55E}details.res-done{margin-top:10px;border-top:2px solid var(--border);padding-top:6px}details.res-done summary{font-weight:900;cursor:pointer;padding:6px 0}';
document.head.appendChild(st);
/* coperti ben visibili sulle schede dei tavoli */
const covOf=t=>(t.items||[]).filter(i=>i.cat==='1 Coperto'||/coperto/i.test(i.name||'')).reduce((s,c)=>s+(Number(c.qty)||0),0)+(Number(t.copOff)||0);
{const _r=renderTables;renderTables=function(){const r=_r.apply(this,arguments);try{document.querySelectorAll('#tablesContainer .table-card[data-tid]').forEach(c=>{const t=state.tables[c.dataset.tid];let e=c.querySelector('.cov-big');if(!t||!t.items||!t.items.length){if(e)e.remove();return;}const n=covOf(t);const h=n?`👥 ${n}<small>${n===1?'coperto':'coperti'}</small>`:'👥 ?<small>coperti</small>';if(!e){e=document.createElement('div');const nm=c.querySelector('.table-name');if(nm)nm.after(e);else c.prepend(e);}e.className='cov-big'+(n?'':' q');if(e.innerHTML!==h)e.innerHTML=h;});}catch(x){}return r;};}
/* prenotazioni: arrivati e cancellati in fondo, chiusi */
window.v2937Undo=async id=>{const r=state.res&&state.res[id];if(!r)return;if(!confirm('Rimettere '+r.name+' tra le prenotazioni in arrivo?'))return;r.status='attesa';delete r.arrivedAt;delete r.noShow;await saveState(false,{res:[id]});renderResList();};
window.v2937NoShow=async id=>{const r=state.res&&state.res[id];if(!r)return;if(!confirm(r.name+' ('+r.time+', '+r.covers+' pers.) non è venuto?\nLa tolgo dalle prenotazioni in arrivo.'))return;r.status='cancellata';r.noShow=true;r.noShowAt=Date.now();r.noShowBy=state.waiterName||'';await saveState(false,{res:[id]});try{renderTables();}catch(e){}try{renderResList();}catch(e){}};
{const _l=renderResList;renderResList=function(){const r=_l.apply(this,arguments);try{const el=$('resList');const sec=el&&el.querySelector('.cart-section');if(!sec)return r;const done=[];sec.querySelectorAll('button[onclick^="arriveRes("]').forEach(b=>{const id=(b.getAttribute('onclick').match(/arriveRes\('([^']+)'/)||[])[1],x=state.res&&state.res[id];if(!x)return;const row=b.closest('div[style*="padding:8px 0"]');if(!row)return;if(x.status==='arrivato'){b.outerHTML=`<button class="btn-note" onclick="v2937Undo('${id}')">↩️ Non ancora arrivati</button>`;done.push(row);}else if(x.status==='cancellata')done.push(row);});if(done.length){const d=document.createElement('details');d.className='res-done';d.innerHTML=`<summary>✅ Arrivati e cancellati (${done.length})</summary>`;done.forEach(x=>d.appendChild(x));sec.appendChild(d);}}catch(e){}return r;};}
{const _b=renderResBoard;renderResBoard=function(id){const r=_b.apply(this,arguments);try{const el=$(id);if(el)el.querySelectorAll('button[onclick^="arriveRes("]').forEach(b=>{const row=b.parentElement;if(!row||!/IN RITARDO/.test(row.textContent)||row.querySelector('.v37ns'))return;const rid=(b.getAttribute('onclick').match(/arriveRes\('([^']+)'/)||[])[1];const n=document.createElement('button');n.className='btn-note v37ns';n.style.cssText='padding:5px 10px;margin-left:6px;font-size:.78rem;';n.textContent='✖ Non vengono';n.onclick=()=>v2937NoShow(rid);b.after(n);});}catch(e){}return r;};}
/* barra di avanzamento per tutte le elaborazioni con Gemini */
const bar=document.createElement('div');bar.id='jobBar';bar.innerHTML='<div class="t"><b id="jbT"></b><button id="jbX">Nascondi</button></div><div class="d" id="jbD"></div><div class="p"><i id="jbP"></i></div>';document.body.appendChild(bar);
let act=0,t0=0,done=0,pct=0,lab='',hid=false,tick=0,endT=0;window._jobAfter=null;
$('jbX').onclick=e=>{e.stopPropagation();hid=true;bar.classList.remove('on');};
bar.onclick=()=>{if(bar.classList.contains('ok')&&window._jobAfter){const f=window._jobAfter;window._jobAfter=null;bar.classList.remove('on','ok');try{f();}catch(x){}}};
const det=()=>{for(const id of ['oneSt','invSt','ocrStatus','wcNetSt','v2918Prog','pubSt']){const e=$(id);const s=e&&(e.textContent||'').trim();if(s&&/⏳|…|\.\.\./.test(s))return s.slice(0,110);}return'';};
function draw(){if(hid||!act&&!bar.classList.contains('ok'))return;const el=(Date.now()-t0)/1000;if(act){pct=Math.max(pct,Math.min(96,96*(1-Math.exp(-el/(22+done*6)))));$('jbT').textContent='⏳ '+(lab||window._jobLabel||'🤖 Gemini al lavoro');const d=det();$('jbD').textContent=(d?d+' · ':'')+'da '+Math.round(el)+' s · puoi continuare a usare l’app';}$('jbP').style.width=pct+'%';bar.classList.add('on');}
function begin(){clearTimeout(endT);if(!act&&!bar.classList.contains('busy')){t0=Date.now();done=0;pct=2;hid=false;lab=window._jobLabel||'';bar.classList.remove('ok');bar.classList.add('busy');window._jobAfter=null;}act++;if(window._jobLabel)lab=window._jobLabel;if(!tick)tick=setInterval(draw,500);draw();}
function end(){act=Math.max(0,act-1);done++;if(act)return;endT=setTimeout(()=>{if(act)return;clearInterval(tick);tick=0;bar.classList.remove('busy');pct=100;$('jbT').textContent='✅ '+(lab||'Elaborazione')+': fatto';$('jbD').textContent=window._jobAfter?'Tocca qui per vedere il risultato':'In '+Math.round((Date.now()-t0)/1000)+' s';$('jbP').style.width='100%';bar.classList.add('ok');if(!hid)bar.classList.add('on');setTimeout(()=>{if(!act&&!window._jobAfter)bar.classList.remove('on','ok');},window._jobAfter?60000:4000);},1800);}
const _f=window.fetch;window.fetch=function(u){let url='';try{url=String(u&&u.url||u);}catch(e){}if(!/generativelanguage\.googleapis\.com/.test(url))return _f.apply(this,arguments);begin();const p=_f.apply(this,arguments);p.then(end,end);return p;};
const lbl=(name,L)=>{const o=window[name];if(typeof o!=='function')return;window[name]=async function(){window._jobLabel=L;lab=act?L:lab;try{return await o.apply(this,arguments);}finally{setTimeout(()=>{if(window._jobLabel===L)window._jobLabel='';},2500);}};};
lbl('v35Go','📸 Lettura lavagnetta e vini');lbl('completeTranslations','🌍 Traduzioni del menù');lbl('v45Net','🍷 Schede dei vini');lbl('v33WnApply','🍷 Carta dei vini');
/* biglietto da visita: lettura in sottofondo, i dati restano anche se chiudi la finestra */
{const _i=window.invFromPhoto;if(_i)window.invFromPhoto=async function(ev){const tid=state.activeTableId;window._jobLabel='🪪 Lettura biglietto da visita';try{await _i.apply(this,arguments);}finally{setTimeout(()=>{if(window._jobLabel==='🪪 Lettura biglietto da visita')window._jobLabel='';},2500);}
 try{const d=invRead();if(d&&Object.values(d).some(v=>v)){window._invDraft={tid,d,at:Date.now()};const m=$('invModal');if(!m||!m.classList.contains('active')){window._jobAfter=()=>{if(state.tables[tid]){openTable(tid);setTimeout(()=>{state.activeTableId=tid;openInvoice();},300);}};}}}catch(e){}};}
{const _o=window.openInvoice;if(_o)window.openInvoice=function(){const r=_o.apply(this,arguments);try{const D=window._invDraft,t=state.tables[state.activeTableId];if(D&&t&&D.tid===t.id&&!t.invoice&&Date.now()-D.at<3600e3){let n=0;Object.entries(D.d).forEach(([k,v])=>{const el=$('inv_'+k);if(v&&el&&!el.value){el.value=v;n++;}});if(n){const s=$('invSt');if(s)s.textContent='✅ Dati letti dal biglietto: controllali prima di salvare.';try{invCheck();}catch(e){}}}}catch(e){}return r;};}
{const _s=window.saveInvoice;if(_s)window.saveInvoice=function(){const r=_s.apply(this,arguments);try{const t=state.tables[state.activeTableId];if(t&&t.invoice)window._invDraft=null;}catch(e){}return r;};}
})();
}catch(e){console.error("chef-extra v2.9.37",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);const eur=n=>'€ '+formatPrice(Math.round((Number(n)||0)*100)/100);
const st=document.createElement('style');
st.textContent='body.cc-snz #ccBanner{display:none!important}#ccBanner .snz{display:flex;gap:6px;justify-content:center;margin-top:7px}#ccBanner .snz button{border:2px solid #fff;background:rgba(255,255,255,.15);color:#fff;border-radius:10px;padding:6px 10px;font-weight:900;font-size:.82rem}.su-box{background:#DBEAFE;color:#0B2545;border-radius:14px;padding:10px 12px;margin-bottom:10px;border:2px solid #1D4ED8}.su-box summary{list-style:none;cursor:pointer;font-weight:900;display:flex;justify-content:space-between;gap:8px;align-items:center}.su-box summary::-webkit-details-marker{display:none}.su-big{font-size:1.25rem;color:#1D4ED8}.su-nav{display:grid;grid-template-columns:40px 1fr 40px;gap:6px;align-items:center;margin:8px 0}.su-nav button{border:2px solid #0B2545;border-radius:10px;background:#fff;font-weight:900;padding:6px}.su-row{display:flex;justify-content:space-between;gap:8px;border-bottom:1px dashed #93C5FD;padding:5px 0;font-size:.84rem;font-weight:700}.su-row b{white-space:nowrap}.su-in{display:flex;gap:6px;align-items:center;margin-top:8px;font-weight:800;font-size:.85rem}.su-in input{flex:1;min-width:0;border:2px solid #0B2545;border-radius:10px;padding:8px;font-weight:900;font-size:1rem}.su-diff{margin-top:6px;font-weight:900;border-radius:10px;padding:7px 9px}';
document.head.appendChild(st);
/* ---- rimanda la chiusura cassa ---- */
const snzUntil=()=>Number(localStorage.getItem('alicetta_cc_snooze'))||0;
const hm=ts=>new Date(ts).toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'});
function snzApply(){document.body.classList.toggle('cc-snz',Date.now()<snzUntil());}
window.v2938Snooze=(min,ev)=>{if(ev)ev.stopPropagation();const t=Date.now()+min*60000;localStorage.setItem('alicetta_cc_snooze',String(t));localStorage.setItem('alicetta_endnag_t',String(t));snzApply();const m=$('endModal');if(m)m.classList.remove('active');try{toast('⏰ Ti ricordo la chiusura cassa alle '+hm(t));}catch(e){}};
{const b=$('ccBanner');if(b&&!b.querySelector('.snz'))b.insertAdjacentHTML('beforeend','<div class="snz"><button onclick="v2938Snooze(30,event)">⏰ Tra 30 min</button><button onclick="v2938Snooze(60,event)">⏰ Tra 1 ora</button></div>');}
setInterval(snzApply,15000);snzApply();
/* ---- Conti: prima i conti, poi le fatture ---- */
function order(){const c=$('contiList'),i=$('invList');if(c&&i&&c.nextElementSibling!==i)c.after(i);}
order();setInterval(order,3000);
/* ---- confronto con il terminale SumUp (giorno di calendario, come SumUp) ---- */
const pad=n=>String(n).padStart(2,'0');const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
let suDay=iso(new Date()),suOpen=false;
function tx(e){const p=e.pay||{},T=Number(e.total)||0,nm=e.tableName||'Conto',out=[];
 if(Array.isArray(p.parts)&&p.parts.length){p.parts.forEach((x,i)=>{if(x.v==='loc')return;out.push({a:Number(x.a)||0,k:x.m==='contanti'?'cash':'card',l:nm+' · quota '+(i+1)+'/'+p.parts.length});});return out;}
 if(p.cashLoc!=null){const s=Math.round((T-Number(p.cashLoc))*100)/100;if(s>0.004){const cd=Number(p.card)||0;if(cd>0.004)out.push({a:Math.min(cd,s),k:'card',l:nm});const cs=Math.round((s-Math.min(cd,s))*100)/100;if(cs>0.004)out.push({a:cs,k:'cash',l:nm+' (contanti)'});}return out;}
 if(!/sumup/i.test(String(p.via||'')))return out;
 const cd=Number(p.card)||0,cs=Number(p.cash)||0;
 if(p.m==='misto'&&cd>0&&cs>0){out.push({a:cd,k:'card',l:nm},{a:cs,k:'cash',l:nm+' (contanti)'});}
 else out.push({a:T,k:p.m==='contanti'?'cash':'card',l:nm});return out;}
function dayTx(d){const L=[];(state.historyLog||[]).forEach(e=>{if(!e||!e.ts)return;if(iso(new Date(e.ts))!==d)return;tx(e).forEach(x=>L.push({...x,ts:e.ts}));});return L.sort((a,b)=>b.ts-a.ts);}
const lbl=d=>{const t=iso(new Date()),y=new Date();y.setDate(y.getDate()-1);const x=new Date(d+'T12:00');return x.toLocaleDateString('it-IT',{weekday:'short',day:'numeric',month:'long'})+(d===t?' · OGGI':d===iso(y)?' · IERI':'');};
window.v2938Nav=n=>{const x=new Date(suDay+'T12:00');x.setDate(x.getDate()+n);const v=iso(x);if(v>iso(new Date()))return;suDay=v;suOpen=true;try{renderConti();}catch(e){}};
window.v2938Set=v=>{const k='alicetta_su_tot';let M={};try{M=JSON.parse(localStorage.getItem(k)||'{}');}catch(e){}const n=parseFloat(String(v).replace(/\./g,'').replace(',','.'));if(n>=0)M[suDay]=n;else delete M[suDay];localStorage.setItem(k,JSON.stringify(M));suOpen=true;try{renderConti();}catch(e){}};
function box(){const L=dayTx(suDay),tot=L.reduce((a,x)=>a+x.a,0),cd=L.filter(x=>x.k==='card').reduce((a,x)=>a+x.a,0),cs=tot-cd;let M={};try{M=JSON.parse(localStorage.getItem('alicetta_su_tot')||'{}');}catch(e){}const su=M[suDay];
 const diff=su!=null?Math.round((su-tot)*100)/100:null;
 const dh=diff==null?'':Math.abs(diff)<0.01?'<div class="su-diff" style="background:#DCFCE7;color:#14532D;">✅ Torna al centesimo con SumUp</div>':`<div class="su-diff" style="background:#FEF3C7;color:#78350F;">⚠️ Differenza ${diff>0?'+':''}${formatPrice(diff)} €: ${diff>0?'su SumUp c’è di più (pagamento fatto solo sul terminale, mancia, o conto segnato come contanti/cassa locale)':'nell’app c’è di più (pagamento SumUp non riuscito ma segnato come pagato, o fatto in contanti/cassa locale)'}. Confronta riga per riga qui sotto.</div>`;
 return `<details class="su-box" ${suOpen?'open':''} ontoggle="window._suO=this.open"><summary><span>🟦 Da confrontare con SumUp<br><small style="font-weight:700;">${esc(lbl(suDay))} · ${L.length} pagamenti</small></span><span class="su-big">${eur(tot)}</span></summary>
<div class="su-nav"><button onclick="v2938Nav(-1)">◀</button><b style="text-align:center;">${esc(lbl(suDay))}</b><button onclick="v2938Nav(1)" ${suDay>=iso(new Date())?'disabled style="opacity:.35"':''}>▶</button></div>
<div style="font-size:.8rem;font-weight:800;">💳 Carte ${eur(cd)} · 💵 Contanti su SumUp ${eur(cs)}</div>
<div style="font-size:.74rem;font-weight:700;margin:4px 0 6px;opacity:.85;">Come il terminale: giorno da mezzanotte a mezzanotte (un conto pagato dopo le 24 va nel giorno dopo). Su SumUp conta solo le righe ✅ Riuscita.</div>
<div class="su-in">Totale sul terminale: <input inputmode="decimal" placeholder="es. 813,35" value="${su!=null?formatPrice(su):''}" onchange="v2938Set(this.value)"></div>${dh}
<div style="margin-top:8px;">${L.map(x=>`<div class="su-row"><span>${hm(x.ts)} · ${esc(x.l)} ${x.k==='cash'?'💵':'💳'}</span><b>${eur(x.a)}</b></div>`).join('')||'<div class="fc-sub">Nessun pagamento SumUp in questo giorno.</div>'}</div></details>`;}
{const _r=renderConti;renderConti=function(){const r=_r.apply(this,arguments);try{if(window._suO!=null)suOpen=window._suO;const c=$('contiList');if(c&&/^christian$/i.test((state.waiterName||'').trim())){const h=c.querySelector('h3');const d=document.createElement('div');d.innerHTML=box();const el=d.firstElementChild;if(h)h.after(el);else c.prepend(el);}order();}catch(e){}return r;};}
})();
}catch(e){console.error("chef-extra v2.9.38",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const r2=n=>Math.round((Number(n)||0)*100)/100;const eur=n=>'€ '+formatPrice(r2(n));
const pad=n=>String(n).padStart(2,'0');const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const dmy=s=>{const p=String(s||'').split('-');return p.length===3?p[2]+'/'+p[1]+'/'+p[0]:s;};
const hm=ts=>new Date(ts).toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'});
const owner=()=>/^christian$/i.test((state.waiterName||'').trim());
const st=document.createElement('style');
st.textContent='.cx{border-radius:18px;padding:12px;margin-bottom:12px;background:#0F172A;color:#F1F5F9;border:2px solid #334155}.cx-h{display:flex;align-items:center;gap:10px}.cx-l{width:46px;height:46px;border-radius:50%;flex:none;box-shadow:inset 0 -4px 0 rgba(0,0,0,.25),0 0 18px currentColor;border:3px solid #fff}.cx-l.g{background:#22C55E;color:#22C55E}.cx-l.y{background:#FACC15;color:#FACC15}.cx-l.r{background:#EF4444;color:#EF4444}.cx-l.n{background:#64748B;color:transparent}.cx-h b{font-size:1.05rem;line-height:1.2}.cx-h small{display:block;font-weight:700;opacity:.8;font-size:.78rem}.cx-nav{display:grid;grid-template-columns:42px 1fr 42px;gap:6px;align-items:center;margin:10px 0}.cx-nav button{border:2px solid #fff;border-radius:10px;background:#1E293B;color:#fff;font-weight:900;padding:6px}.cx-nav b{text-align:center}.cx-t{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px}.cx-t div{border-radius:12px;padding:8px 6px;text-align:center;font-weight:800;font-size:.72rem;line-height:1.2}.cx-t b{display:block;font-size:1.02rem;margin-top:3px}.cx-su{margin-top:8px;border-radius:12px;padding:9px 10px;background:#1D4ED8;color:#fff;font-weight:900;display:flex;justify-content:space-between;align-items:center;gap:8px}.cx-su b{font-size:1.25rem}.cx-tot{display:flex;justify-content:space-between;font-weight:800;font-size:.85rem;margin-top:6px;opacity:.9}.cx-w{margin-top:8px;border-radius:12px;padding:8px 10px;font-weight:800;font-size:.8rem;line-height:1.3}.cx-btn{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px}.cx-btn label,.cx-btn button{border:2px solid #fff;border-radius:12px;background:#334155;color:#fff;font-weight:900;padding:10px 6px;text-align:center;font-size:.82rem;cursor:pointer}.cx-in{display:flex;gap:6px;align-items:center;margin-top:8px;font-weight:800;font-size:.8rem}.cx-in input{flex:1;min-width:0;border-radius:10px;border:2px solid #fff;background:#1E293B;color:#fff;padding:8px;font-weight:900;font-size:1rem}.cx details{margin-top:8px}.cx summary{font-weight:900;cursor:pointer;padding:4px 0}.cx-r{display:flex;justify-content:space-between;gap:8px;border-bottom:1px dashed #475569;padding:5px 0;font-size:.8rem;font-weight:700}.cx-r b{white-space:nowrap}.cx-r.bad{color:#FCA5A5}.cx-r.ok{color:#BBF7D0}.cx-r.mid{color:#FDE68A}.cx-fx{margin-top:4px;border:2px solid #fff;border-radius:9px;background:#334155;color:#fff;font-weight:900;padding:4px 8px;font-size:.76rem}';
document.head.appendChild(st);
/* --- quanto di ogni conto è passato da SumUp --- */
function parts(e){const out=parts0(e),tip=r2(e.pay&&e.pay.tipSU);if(tip>0){const c=out.find(x=>x.k==='card')||out.find(x=>x.k==='cash');if(c){c.a=r2(c.a+tip);c.tip=tip;}}out.forEach(x=>x.e=e);return out;}
function parts0(e){const p=e.pay||{},T=r2(e.total),nm=e.tableName||'Conto',out=[];
 if(Array.isArray(p.parts)&&p.parts.length){p.parts.forEach((x,i)=>{const a=r2(x.a),q=' · quota '+(i+1)+'/'+p.parts.length;if(x.v==='loc')out.push({a,k:'loc',l:nm+q});else out.push({a,k:x.m==='contanti'?'cash':'card',l:nm+q});});return out;}
 const cd=r2(p.card),cs=r2(p.cash),viaSU=/sumup/i.test(String(p.via||''));
 if(p.cashLoc!=null){const loc=r2(p.cashLoc),su=r2(T-loc);if(loc>0)out.push({a:loc,k:'loc',l:nm});if(su>0){const c=Math.min(cd,su);if(c>0)out.push({a:c,k:'card',l:nm});if(su-c>0.004)out.push({a:r2(su-c),k:'cash',l:nm});}return out;}
 if(!viaSU){out.push({a:T,k:'loc',l:nm});return out;}
 if(cd>0&&cs>0){out.push({a:cd,k:'card',l:nm},{a:cs,k:'cash',l:nm});return out;}
 out.push({a:T,k:p.m==='contanti'?'cash':'card',l:nm});return out;}
function nightBefore(D){const x=new Date(D+'T00:00:00').getTime(),L=[];(state.historyLog||[]).forEach(e=>{if(!e||!e.ts||e.ts<x-6*3600e3||e.ts>=x)return;parts(e).forEach(p=>L.push({...p,ts:e.ts,eve:true}));});return L;}
function day(D){const L=[];(state.historyLog||[]).forEach(e=>{if(!e||!e.ts||iso(new Date(e.ts))!==D)return;const sd=svcDate(e);parts(e).forEach(x=>L.push({...x,ts:e.ts,prev:sd&&sd<D}));});return L.sort((a,b)=>a.ts-b.ts);}
let D=iso(new Date()),open=false;
const store=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}');}catch(e){return{};}};
const save=(k,o)=>{try{localStorage.setItem(k,JSON.stringify(o));}catch(e){}};
window.v39Nav=n=>{const x=new Date(D+'T12:00');x.setDate(x.getDate()+n);const v=iso(x);if(v>iso(new Date()))return;D=v;open=true;rerender();};
window.v39Tot=v=>{const M=store('alicetta_su_tot');const s=String(v).trim();const n=parseFloat(s.replace(/\./g,'').replace(',','.'));if(s&&n>=0)M[D]=n;else delete M[D];save('alicetta_su_tot',M);open=true;rerender();};
window.v39Clear=()=>{if(!confirm('Togliere la lista SumUp letta dalle foto per il '+dmy(D)+'?'))return;const R=store('alicetta_su_rows');delete R[D];save('alicetta_su_rows',R);rerender();};
function rerender(){try{renderConti();}catch(e){}}
/* --- foto della lista Vendite di SumUp letta con Gemini --- */
window.v39Photo=async inp=>{const fs=[...(inp.files||[])].slice(0,6);inp.value='';if(!fs.length)return;if(!getGeminiKey())return alert('Serve la chiave Gemini (⚙️ Opzioni).');
 const L='📷 Lettura lista SumUp ('+fs.length+(fs.length===1?' foto)':' foto)');window._jobLabel=L;const R=store('alicetta_su_rows');let rows=R[D]||[];let tot=null,err='';
 const one=async f=>{const b64=await shrinkImage(f,1300);const txt=await callGemini([{inline_data:{mime_type:'image/jpeg',data:b64}},{text:'Schermata "Vendite" del terminale SumUp. Leggi TUTTE le righe visibili. Solo JSON: {"totale_giorno":numero o null,"righe":[{"ora":"HH:MM","descrizione":"testo","importo":numero,"esito":"riuscita" o "non riuscita","tipo":"carta" o "contanti"}]}. tipo "contanti" se l’icona è una banconota. Importi barrati = "non riuscita". Decimali col punto.'}],true,{fast:true,timeout:45000});return JSON.parse(txt.slice(txt.indexOf('{'),txt.lastIndexOf('}')+1));};
 const res=await Promise.allSettled(fs.map(one));
 res.forEach(r=>{if(r.status!=='fulfilled'){err=(r.reason&&r.reason.message)||String(r.reason);return;}const o=r.value||{};if(o.totale_giorno!=null&&!isNaN(o.totale_giorno))tot=Number(o.totale_giorno);
  (o.righe||[]).forEach(x=>{const a=r2(String(x.importo).replace(',','.')),t=String(x.ora||'').padStart(5,'0').slice(0,5);if(!(a>0)||!/^\d{2}:\d{2}$/.test(t))return;const ok=!/non/i.test(String(x.esito||''));const k=/contant/i.test(String(x.tipo||''))?'cash':'card';if(!rows.some(y=>y.t===t&&y.a===a&&y.ok===ok))rows.push({t,a,ok,k,d:String(x.descrizione||'').slice(0,40)});});});
 rows.sort((a,b)=>a.t.localeCompare(b.t));R[D]=rows;save('alicetta_su_rows',R);if(tot!=null){const M=store('alicetta_su_tot');M[D]=tot;save('alicetta_su_tot',M);}
 open=true;rerender();try{toast(err&&!rows.length?'❌ '+esc(err):'✅ Lette '+rows.length+' righe SumUp');}catch(e){}
 setTimeout(()=>{if(window._jobLabel===L)window._jobLabel='';},2500);};
/* --- correzioni rapide dal confronto --- */
const find=ts=>(state.historyLog||[]).find(e=>e&&e.ts===Number(ts));
async function saveH(){try{await saveState(false,{history:true});}catch(e){}rerender();}
window.v40Tip=async(ts,v)=>{const e=find(ts);if(!e)return;if(!confirm('La differenza di '+formatPrice(v)+' € su '+(e.tableName||'questo conto')+' è una mancia lasciata sul terminale SumUp?'))return;e.pay=Object.assign({},e.pay||{},{tipSU:r2(v)});e.mt=Date.now();await saveH();try{toast('💶 Mancia registrata');}catch(x){}};
window.v40Su=async(ts,k)=>{const e=find(ts);if(!e)return;const T=r2(e.total);if(!confirm((e.tableName||'Conto')+' € '+formatPrice(T)+': segnarlo come '+(k==='cash'?'contanti con SumUp':'carta SumUp')+'?'))return;e.pay=Object.assign({},e.pay||{},k==='cash'?{m:'contanti',cash:T,card:0,via:'SumUp'}:{m:'carta',card:T,cash:0,via:'SumUp'});delete e.pay.cashLoc;delete e.pay.cashSU;delete e.pay.parts;e.mt=Date.now();await saveH();try{toast('✅ Corretto');}catch(x){}};
window.v40Loc=async ts=>{const e=find(ts);if(!e)return;const T=r2(e.total);if(!confirm((e.tableName||'Conto')+' € '+formatPrice(T)+': non risulta su SumUp. Segnarlo come contanti cassa locale?'))return;e.pay=Object.assign({},e.pay||{},{m:'contanti',cash:T,card:0,via:'Registratore'});delete e.pay.cashLoc;delete e.pay.cashSU;delete e.pay.parts;delete e.pay.tipSU;e.mt=Date.now();await saveH();try{toast('✅ Corretto');}catch(x){}};
const simple=e=>e&&!(e.pay&&Array.isArray(e.pay.parts)&&e.pay.parts.length);
/* --- abbinamento righe SumUp ↔ app --- */
function match(app,su){const NB=nightBefore(D);const A=app.filter(x=>x.k!=='loc').map(x=>({...x,m:null})),EV=NB.filter(x=>x.k!=='loc').map(x=>({...x,m:null})),S=su.filter(x=>x.ok).map(x=>({...x,m:null}));
 const tsOf=t=>{const [h,m]=t.split(':').map(Number);return new Date(D+'T'+pad(h)+':'+pad(m)+':00').getTime();};
 S.forEach(s=>{s.ts=tsOf(s.t);let best=null,bd=1e15;(s.t<'05:00'?A.concat(EV):A).forEach(a=>{if(a.m||Math.abs(a.a-s.a)>0.004)return;const d=Math.abs(a.ts-s.ts);if(d<bd){bd=d;best=a;}});if(best){best.m=s;s.m=best;}});
 const near=[];S.filter(s=>!s.m).forEach(s=>{const c=A.filter(a=>!a.m&&!a.near&&Math.abs(a.a-s.a)<=Math.max(5,a.a*0.1)&&Math.abs(a.ts-s.ts)<3*3600e3).sort((x,y)=>Math.abs(x.ts-s.ts)-Math.abs(y.ts-s.ts))[0];if(c){c.near=s;s.near=c;near.push([c,s]);}});
 const LOC=app.filter(x=>x.k==='loc').concat(NB.filter(x=>x.k==='loc'));S.filter(s=>!s.m&&!s.near).forEach(s=>{const c=LOC.filter(a=>!a.used&&Math.abs(a.a-s.a)<0.01&&simple(a.e)).sort((x,y)=>Math.abs(x.ts-s.ts)-Math.abs(y.ts-s.ts))[0];if(c){c.used=1;s.loc=c;}});
return{A,S,near,EVm:EV.filter(x=>x.m)};}
function panel(){const L=day(D),card=L.filter(x=>x.k==='card').reduce((a,x)=>a+x.a,0),cash=L.filter(x=>x.k==='cash').reduce((a,x)=>a+x.a,0),loc=L.filter(x=>x.k==='loc').reduce((a,x)=>a+x.a,0),su=r2(card+cash);
 const prev=L.filter(x=>x.prev),prevT=prev.reduce((a,x)=>a+x.a,0);const tips=L.reduce((a,x)=>a+(x.tip||0),0);
 const nx=new Date(D+'T12:00');nx.setDate(nx.getDate()+1);const N=iso(nx);const late=(state.historyLog||[]).filter(e=>e&&e.ts&&iso(new Date(e.ts))===N&&svcDate(e)===D).reduce((a,e)=>a+parts(e).filter(x=>x.k!=='loc').reduce((b,x)=>b+x.a,0),0);
 const T=store('alicetta_su_tot')[D],rows=store('alicetta_su_rows')[D]||[];
 let lamp='n',msg='Fotografa la lista Vendite del terminale oppure scrivi il suo totale',sub='',detail='';
 if(rows.length){const m=match(L,rows);const aU=m.A.filter(a=>!a.m),sU=m.S.filter(s=>!s.m),suOk=m.S.reduce((a,s)=>a+s.a,0);
  if(!aU.length&&!sU.length){lamp='g';msg='SumUp e app coincidono';sub=m.S.length+' pagamenti riusciti · '+eur(suOk);}
  else{lamp=m.near.length===aU.length&&m.near.length===sU.length?'y':'r';msg=lamp==='y'?'Quasi: '+m.near.length+(m.near.length===1?' importo diverso':' importi diversi'):(()=>{const k=m.near.length+sU.filter(s=>!s.near).length+aU.filter(a=>!a.near).length;return 'Non coincidono: '+k+(k===1?' cosa da controllare':' cose da controllare');})();sub='SumUp '+eur(suOk)+' · app '+eur(su);}
  const ko=rows.filter(r=>!r.ok);const miss=T!=null?r2(T-suOk):0;if(Math.abs(miss)>=0.01)sub+=' · ⚠️ alle foto mancano '+eur(miss)+' rispetto al totale del terminale';
  detail=`<details ${lamp!=='g'?'open':''}><summary>📋 Riga per riga (${m.S.length} SumUp · ${m.A.length} app)</summary>`+
  m.near.map(([a,s])=>{const d=r2(s.a-a.a);return `<div class="cx-r mid"><span>🟡 ${s.t} SumUp ${eur(s.a)} ↔ ${esc(a.l)} ${eur(a.a)} (alle ${hm(a.ts)})${d>0&&simple(a.e)?`<br><button class="cx-fx" onclick="v40Tip(${a.e.ts},${d})">💶 È una mancia di ${formatPrice(d)} €</button>`:''}</span><b>${d>0?'+':''}${formatPrice(d)}</b></div>`;}).join('')+
  sU.filter(s=>!s.near).map(s=>`<div class="cx-r bad"><span>🔴 Solo su SumUp: ${s.t} ${esc(s.d||'')} ${s.k==='cash'?'💵':'💳'}${s.loc?`<br>Nell’app ${esc(s.loc.l)} ${eur(s.loc.a)} (${s.loc.eve?'ieri sera ':''}alle ${hm(s.loc.ts)}) è segnato come cassa locale <button class="cx-fx" onclick="v40Su(${s.loc.e.ts},'${s.k}')">✔️ Era ${s.k==='cash'?'contanti SumUp':'carta SumUp'}</button>`:''}</span><b>${eur(s.a)}</b></div>`).join('')+
  aU.filter(a=>!a.near).map(a=>`<div class="cx-r bad"><span>🔴 Solo nell’app: ${hm(a.ts)} ${esc(a.l)} ${a.k==='cash'?'💵':'💳'}${simple(a.e)?` <button class="cx-fx" onclick="v40Loc(${a.e.ts})">🏪 Era cassa locale</button>`:''}</span><b>${eur(a.a)}</b></div>`).join('')+
  m.S.filter(s=>s.m).map(s=>`<div class="cx-r ok"><span>🟢 ${s.t} ${esc(s.m.l)}${s.m.prev||s.m.eve?' · 🌙 di ieri sera':''}${s.m.tip?' · 💶 mancia '+formatPrice(s.m.tip):''} ${s.k==='cash'?'💵':'💳'}</span><b>${eur(s.a)}</b></div>`).join('')+
  (ko.length?`<div class="cx-r" style="opacity:.6;"><span>✖ Non riuscite su SumUp (non contano): ${ko.map(r=>r.t+' '+formatPrice(r.a)).join(' · ')}</span></div>`:'')+
  `<button class="cx-btn" style="display:block;width:100%;margin-top:6px;border:2px solid #fff;border-radius:12px;background:#334155;color:#fff;font-weight:900;padding:8px;" onclick="v39Clear()">🗑️ Togli la lista letta dalle foto</button></details>`;}
 else if(T!=null){const d=r2(T-su);if(Math.abs(d)<0.01){lamp='g';msg='SumUp e app coincidono';sub='Totale '+eur(T);}else{lamp='r';msg='Differenza '+(d>0?'+':'')+formatPrice(d)+' €';sub='SumUp '+eur(T)+' · app '+eur(su)+' · fotografa la lista per sapere quale conto';}}
 const appRows=`<details><summary>🧾 Pagamenti SumUp nell’app (${L.filter(x=>x.k!=='loc').length})</summary>${L.filter(x=>x.k!=='loc').slice().reverse().map(x=>`<div class="cx-r"><span>${hm(x.ts)} · ${esc(x.l)}${x.prev?' · 🌙 di ieri sera':''} ${x.k==='cash'?'💵':'💳'}</span><b>${eur(x.a)}</b></div>`).join('')||'<div class="cx-r"><span>Nessuno</span></div>'}</details>`;
 const t=iso(new Date()),y=new Date();y.setDate(y.getDate()-1);const tag=D===t?' · OGGI':D===iso(y)?' · IERI':'';
 return `<div class="cx"><div class="cx-h"><div class="cx-l ${lamp}"></div><div><b>${lamp==='g'?'🟢 ':lamp==='y'?'🟡 ':lamp==='r'?'🔴 ':''}${esc(msg)}</b><small>${esc(sub||'Cassa SumUp del giorno, da mezzanotte a mezzanotte')}</small></div></div>
<div class="cx-nav"><button onclick="v39Nav(-1)">◀</button><b>${new Date(D+'T12:00').toLocaleDateString('it-IT',{weekday:'long'})} ${dmy(D)}${tag}</b><button onclick="v39Nav(1)" ${D>=t?'disabled style="opacity:.35"':''}>▶</button></div>
<div class="cx-t"><div style="background:#DBEAFE;color:#1E3A8A;">💳 Carta<br>SumUp<b>${eur(card)}</b></div><div style="background:#E0F2FE;color:#075985;">💵 Contanti<br>SumUp<b>${eur(cash)}</b></div><div style="background:#DCFCE7;color:#14532D;">🏪 Contanti<br>cassa locale<b>${eur(loc)}</b></div></div>
<div class="cx-su"><span>🟦 Totale SumUp<br><small style="font-weight:700;">deve coincidere col terminale</small></span><b>${eur(su)}</b></div>
<div class="cx-tot"><span>Incasso del giorno (SumUp + cassa locale)</span><span>${eur(su+loc)}</span></div>${tips>0?`<div class="cx-tot"><span>💶 di cui mance lasciate su SumUp</span><span>${eur(tips)}</span></div>`:''}
${prev.length?`<div class="cx-w" style="background:#312E81;color:#E0E7FF;">🌙 Conti di <b>ieri sera</b> battuti dopo mezzanotte (${eur(prevT)}): ${prev.map(x=>hm(x.ts)+' '+esc(x.l)+' '+eur(x.a)+' '+(x.k==='loc'?'🏪':x.k==='cash'?'💵 SumUp':'💳 SumUp')).join(' · ')}. Nell’app sono nella serata del ${dmy(svcDate({ts:prev[0].ts}))}, su SumUp in questo giorno.</div>`:''}
${late>0?`<div class="cx-w" style="background:#3B0764;color:#F3E8FF;">🌙 ${eur(late)} di questa sera è stato battuto dopo mezzanotte: SumUp lo mette nel giorno ${dmy(N)}.</div>`:''}
<div class="cx-btn"><label>📷 Fotografa SumUp<input type="file" accept="image/*" capture="environment" multiple style="display:none" onchange="v39Photo(this)"></label><label>🖼️ Foto dalla galleria<input type="file" accept="image/*" multiple style="display:none" onchange="v39Photo(this)"></label></div>
<div class="cx-in">o scrivi il totale del terminale: <input inputmode="decimal" placeholder="es. 813,35" value="${T!=null?formatPrice(T):''}" onchange="v39Tot(this.value)"></div>
${detail}${appRows}</div>`;}
{const _r=renderConti;renderConti=function(){const res=_r.apply(this,arguments);try{if(!owner())return res;document.querySelectorAll('.su-box').forEach(x=>x.remove());const h=panel();
 const P=$('payTotals');if(P){let w=P.querySelector('.cx-wrap');if(!w){w=document.createElement('div');w.className='cx-wrap';P.prepend(w);}else P.prepend(w);w.innerHTML=h;}
 const C=$('contiList');if(C){let w=C.querySelector('.cx-wrap');if(!w){w=document.createElement('div');w.className='cx-wrap';const hh=C.querySelector('h3');if(hh)hh.after(w);else C.prepend(w);}w.innerHTML=h;}}catch(e){console.error(e);}return res;};}
/* --- date sempre giorno/mese/anno --- */
const RX=/\b(20\d\d)-(\d\d)-(\d\d)\b/g,SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,INPUT:1,CODE:1,PRE:1,OPTION:1};
function fix(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentNode;if(!p||SKIP[p.nodeName]||p.isContentEditable)return NodeFilter.FILTER_REJECT;return /\b20\d\d-\d\d-\d\d\b/.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;}});const L=[];while(w.nextNode())L.push(w.currentNode);L.forEach(n=>{n.nodeValue=n.nodeValue.replace(RX,'$3/$2/$1');});}
let q=null;new MutationObserver(ms=>{if(q)return;q=setTimeout(()=>{q=null;try{fix(document.body);}catch(e){}},250);}).observe(document.body,{childList:true,subtree:true,characterData:true});
setTimeout(()=>{try{fix(document.body);}catch(e){}},1500);
})();
(function(){const _g=window.callGemini;if(typeof _g!=='function')return;window.callGemini=callGemini=function(parts,json,opts){if(!opts&&/🪪/.test(window._jobLabel||''))opts={fast:true,timeout:45000};return _g.call(this,parts,json,opts);};})();
}catch(e){console.error("chef-extra v2.9.40",e);}
try{(function(){const V='v2.9.40';const f=()=>{document.querySelectorAll('.version-badge').forEach(e=>{if(e.textContent!==V)e.textContent=V;});if(document.title!=='Chef Bull Brigade - '+V)document.title='Chef Bull Brigade - '+V;};f();setInterval(f,5000);})();}catch(e){}
