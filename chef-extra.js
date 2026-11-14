/* Chef Bull Brigade - chef-extra.js v2.9.77 - funzioni aggiuntive caricate da index.html */
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
(e.items||[]).forEach(it=>{const q=Number(it.qty)||1,t=(Number(it.price)||0)*q,a=q+' x '+(it.name||''),b=t>0?formatPrice(t):(/\(offerto\)/i.test(it.name||'')?'OFFERTO':'0,00');ep+=item(a,b)+'\n';pv+=a+'  '+b+'\n';});
if(e.disc&&Number(e.disc.amt)>0){const a='Sconto'+(e.disc.k==='pct'?' '+e.disc.v+'%':''),b='-'+formatPrice(e.disc.amt);ep+=lr(a,b)+'\n';pv+=a+'  '+b+'\n';}
if(Number(e.copOff)>0){const a=e.copOff+' x Pane e Coperto';ep+=item(a,'OFFERTO')+'\n';pv+=a+'  OFFERTO\n';}
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
${window.v71Sc2Sec?v71Sc2Sec(M):''}
<h2 class="sec">4. Fatture e bolle fotografate</h2>${foto||'<p>Nessuna foto salvata per questo mese (le foto si salvano dalle bolle caricate da questa versione in poi).</p>'}
</body></html>`;
const name='fascicolo-haccp-alicetta-'+M+'.html',file=new File([html],name,{type:'text/html'});
$('hxBox').innerHTML=`<h3>📤 Fascicolo HACCP · ${lbl}</h3><div class="fc-sub" style="margin-bottom:8px;">Contiene temperature e pulizie, SC1 con le foto delle fatture, SC2 prodotti non conformi e SC8. Pronto da mostrare, stampare o inviare.</div>
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
function draw(){if(act&&Date.now()-lastB>150000){act=1;end();return;}if(hid||!act&&!bar.classList.contains('ok'))return;const el=(Date.now()-t0)/1000;if(act){pct=Math.max(pct,Math.min(96,96*(1-Math.exp(-el/(22+done*6)))));$('jbT').textContent='⏳ '+(lab||window._jobLabel||'🤖 Gemini al lavoro');const d=det();$('jbD').textContent=(d?d+' · ':'')+'da '+Math.round(el)+' s · puoi continuare a usare l’app';}$('jbP').style.width=pct+'%';bar.classList.add('on');}
let lastB=0;function begin(){lastB=Date.now();clearTimeout(endT);if(!act&&!bar.classList.contains('busy')){t0=Date.now();done=0;pct=2;hid=false;lab=window._jobLabel||'';bar.classList.remove('ok');bar.classList.add('busy');window._jobAfter=null;}act++;if(window._jobLabel)lab=window._jobLabel;if(!tick)tick=setInterval(draw,500);draw();}
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
function order(){}
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
 if(!viaSU){const c=Math.min(cd,T);if(c>0.004)out.push({a:c,k:'card',l:nm});const rest=r2(T-c);if(rest>0.004)out.push({a:rest,k:'loc',l:nm});return out;}
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
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const r2=n=>Math.round((Number(n)||0)*100)/100;const eur=n=>'€ '+formatPrice(r2(n));
const pad=n=>String(n).padStart(2,'0');const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const addD=(s,n)=>{const x=new Date(s+'T12:00');x.setDate(x.getDate()+n);return iso(x);};
const dmy=s=>{const p=String(s||'').split('-');return p.length===3?p[2]+'/'+p[1]+'/'+p[0]:s;};
const hm=ts=>new Date(ts).toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'});
const owner=()=>/^christian$/i.test((state.waiterName||'').trim());
const wd=s=>new Date(s+'T12:00').toLocaleDateString('it-IT',{weekday:'long'});
const st=document.createElement('style');
st.textContent='.cx{border-radius:18px;padding:12px;margin-bottom:12px;background:#0F172A;color:#F1F5F9;border:2px solid #334155}.cx-nav{display:grid;grid-template-columns:42px 1fr 42px;gap:6px;align-items:center;margin-bottom:8px}.cx-nav button{border:2px solid #fff;border-radius:10px;background:#1E293B;color:#fff;font-weight:900;padding:6px}.cx-nav b{text-align:center;line-height:1.2}.cx-nav small{display:block;font-weight:700;opacity:.75;font-size:.72rem}.cx-big{text-align:center;margin:4px 0 8px}.cx-big small{display:block;font-weight:800;opacity:.8;font-size:.8rem}.cx-big b{font-size:2rem;color:#4ADE80}.cx-t{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px}.cx-t div{border-radius:12px;padding:8px 6px;text-align:center;font-weight:800;font-size:.72rem;line-height:1.2}.cx-t b{display:block;font-size:1rem;margin-top:3px}.cx-s{margin-top:10px;border-radius:14px;padding:10px;display:flex;gap:10px;align-items:center}.cx-s.g{background:#14532D;border:2px solid #22C55E}.cx-s.r{background:#7F1D1D;border:2px solid #EF4444}.cx-s.y{background:#713F12;border:2px solid #FACC15}.cx-s.n{background:#1E293B;border:2px dashed #64748B}.cx-l{width:44px;height:44px;border-radius:50%;flex:none;border:3px solid #fff}.g .cx-l{background:#22C55E;box-shadow:0 0 16px #22C55E}.r .cx-l{background:#EF4444;box-shadow:0 0 16px #EF4444}.y .cx-l{background:#FACC15;box-shadow:0 0 16px #FACC15}.n .cx-l{background:#64748B}.cx-s b{display:block;font-size:1.02rem;line-height:1.2}.cx-s small{display:block;font-weight:700;opacity:.9;font-size:.78rem;margin-top:2px}.cx-w{margin-top:8px;border-radius:12px;padding:8px 10px;font-weight:700;font-size:.76rem;line-height:1.3;background:#1E1B4B;color:#E0E7FF}.cx-btn{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px}.cx-btn label{border:2px solid #fff;border-radius:12px;background:#334155;color:#fff;font-weight:900;padding:10px 6px;text-align:center;font-size:.82rem;cursor:pointer}.cx details{margin-top:8px}.cx summary{font-weight:900;cursor:pointer;padding:4px 0}.cx-r{border-bottom:1px dashed #475569;padding:6px 0;font-size:.8rem;font-weight:700}.cx-r .a{display:flex;justify-content:space-between;gap:8px}.cx-r b{white-space:nowrap}.cx-r.bad{color:#FCA5A5}.cx-r.ok{color:#BBF7D0}.cx-r.mid{color:#FDE68A}.cx-fx{margin-top:5px;border:2px solid #fff;border-radius:9px;background:#334155;color:#fff;font-weight:900;padding:6px 9px;font-size:.78rem}';
document.head.appendChild(st);
/* --- quanto di ogni conto è passato da SumUp --- */
function parts0(e){const p=e.pay||{},T=r2(e.total),nm=e.tableName||'Conto',out=[];
 if(Array.isArray(p.parts)&&p.parts.length){p.parts.forEach((x,i)=>{const a=r2(x.a),q=' · quota '+(i+1)+'/'+p.parts.length;out.push({a,k:x.v==='loc'?'loc':x.m==='contanti'?'cash':'card',l:nm+q});});return out;}
 const cd=r2(p.card),cs=r2(p.cash),viaSU=/sumup/i.test(String(p.via||''));
 if(p.cashLoc!=null){const loc=r2(p.cashLoc),su=r2(T-loc);if(loc>0)out.push({a:loc,k:'loc',l:nm});if(su>0){const c=Math.min(cd,su);if(c>0)out.push({a:c,k:'card',l:nm});if(su-c>0.004)out.push({a:r2(su-c),k:'cash',l:nm});}return out;}
 if(!viaSU){const c=Math.min(cd,T);if(c>0.004)out.push({a:c,k:'card',l:nm});const rest=r2(T-c);if(rest>0.004)out.push({a:rest,k:'loc',l:nm});return out;}
 if(cd>0&&cs>0){out.push({a:cd,k:'card',l:nm},{a:cs,k:'cash',l:nm});return out;}
 out.push({a:T,k:p.m==='contanti'?'cash':'card',l:nm});return out;}
function parts(e){const out=parts0(e),tip=r2(e.pay&&e.pay.tipSU);if(tip>0){const c=out.find(x=>x.k==='card')||out.find(x=>x.k==='cash');if(c){c.a=r2(c.a+tip);c.tip=tip;}}out.forEach(x=>{x.e=e;x.ts=e.ts;});return out;}
/* giorno di servizio: i conti dopo mezzanotte (fino alle 5) vanno alla sera prima */
const svcOfTs=ts=>{const d=new Date(ts);if(d.getHours()<5)d.setDate(d.getDate()-1);return iso(d);};
const appDay=S=>{const L=[];(state.historyLog||[]).forEach(e=>{if(!e||!e.ts)return;if(svcDate(e)!==S)return;parts(e).forEach(x=>L.push(x));});return L.sort((a,b)=>a.ts-b.ts);};
let S=svcToday(),open=false;
const store=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}');}catch(e){return{};}};
const save=(k,o)=>{try{localStorage.setItem(k,JSON.stringify(o));}catch(e){}};
/* righe SumUp salvate per data di calendario; per la serata S prendo S dalle 5 e S+1 prima delle 5 */
const suDay=S=>{const R=store('alicetta_su_rows2');const L=[];(R[S]||[]).forEach(r=>{if(r.t>='05:00')L.push({...r,date:S});});(R[addD(S,1)]||[]).forEach(r=>{if(r.t<'05:00')L.push({...r,date:addD(S,1)});});return L.map(r=>({...r,ts:new Date(r.date+'T'+r.t+':00').getTime()})).sort((a,b)=>a.ts-b.ts);};
const hasPhoto=S=>{const R=store('alicetta_su_rows2');return !!((R[S]||[]).length||(R[addD(S,1)]||[]).some(r=>r.t<'05:00'));};
function rerender(){try{renderConti();}catch(e){}}
window.v41Nav=n=>{const v=addD(S,n);if(v>svcToday())return;S=v;state.contiPer='giorno';state.contiDay=S;open=false;rerender();};window.v41Parts=parts;window.v41Go=d=>{S=d;state.contiPer='giorno';state.contiDay=S;open=false;rerender();};
window.v41Clear=()=>{if(!confirm('Togliere le righe SumUp lette dalle foto per la serata del '+dmy(S)+'?'))return;const R=store('alicetta_su_rows2');if(R[S])R[S]=R[S].filter(r=>r.t<'05:00');const n=addD(S,1);if(R[n])R[n]=R[n].filter(r=>r.t>='05:00');save('alicetta_su_rows2',R);rerender();};
/* --- foto della lista Vendite: modello leggero, foto piccole, tutte insieme --- */
const MESI={gennaio:1,febbraio:2,marzo:3,aprile:4,maggio:5,giugno:6,luglio:7,agosto:8,settembre:9,ottobre:10,novembre:11,dicembre:12};
const pDate=s=>{s=String(s||'').trim().toLowerCase();let m=s.match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})/);if(m)return m[3]+'-'+pad(m[2])+'-'+pad(m[1]);m=s.match(/(\d{1,2})\s+([a-zà]+)\s+(\d{4})/);if(m&&MESI[m[2]])return m[3]+'-'+pad(MESI[m[2]])+'-'+pad(m[1]);return '';};
window.v41Photo=async inp=>{const fs=[...(inp.files||[])].slice(0,6);inp.value='';if(!fs.length)return;if(!getGeminiKey())return alert('Serve la chiave Gemini (⚙️ Opzioni).');
 const L='📷 Lettura lista SumUp ('+fs.length+(fs.length===1?' foto)':' foto)');window._jobLabel=L;
 const M=(typeof GEMINI_MODELS!=='undefined')?GEMINI_MODELS:null,orig=M?M.slice():null;
 if(M){const lite=M.filter(m=>/lite/.test(m)),rest=M.filter(m=>!/lite/.test(m));M.splice(0,M.length,...lite,...rest);}
 const one=async f=>{const b64=await shrinkImage(f,1100);const txt=await callGemini([{inline_data:{mime_type:'image/jpeg',data:b64}},{text:'Schermata "Vendite" del terminale SumUp. Per OGNI riga visibile dai: data (quella dell’intestazione di sezione sopra la riga, es. "8 NOVEMBRE 2026"; null se non si vede), ora HH:MM, descrizione, importo, esito ("riuscita" se c’è la spunta verde o "Pagata", "non riuscita" se c’è la X rossa o l’importo è barrato), tipo ("contanti" se l’icona è una banconota, altrimenti "carta"). Solo JSON: {"righe":[{"data":"8 novembre 2026","ora":"21:42","descrizione":"...","importo":91.35,"esito":"riuscita","tipo":"carta"}]}'}],true,{fast:true,timeout:30000});return JSON.parse(txt.slice(txt.indexOf('{'),txt.lastIndexOf('}')+1));};
 let res=[];try{res=await Promise.allSettled(fs.map(one));}finally{if(M)M.splice(0,M.length,...orig);}
 const R=store('alicetta_su_rows2');let n=0,err='';
 res.forEach(r=>{if(r.status!=='fulfilled'){err=(r.reason&&r.reason.message)||String(r.reason);return;}let last='';(r.value&&r.value.righe||[]).forEach(x=>{const a=r2(String(x.importo).replace(',','.')),t=String(x.ora||'').padStart(5,'0').slice(0,5);if(!(a>0)||!/^\d{2}:\d{2}$/.test(t))return;let d=pDate(x.data)||last;if(!d)d=t<'05:00'?addD(S,1):S;last=d;const ok=!/non/i.test(String(x.esito||''));const k=/contant/i.test(String(x.tipo||''))?'cash':'card';const A=R[d]=R[d]||[];if(!A.some(y=>y.t===t&&y.a===a&&y.ok===ok)){A.push({t,a,ok,k,d:String(x.descrizione||'').slice(0,40)});n++;}A.sort((p,q)=>q.t.localeCompare(p.t));});});
 save('alicetta_su_rows2',R);open=true;rerender();try{toast(err&&!n?'❌ '+esc(err):'✅ Lette '+n+' righe nuove da SumUp');}catch(e){}
 setTimeout(()=>{if(window._jobLabel===L)window._jobLabel='';},2500);};
/* --- correzioni --- */
const find=ts=>(state.historyLog||[]).find(e=>e&&e.ts===Number(ts));
const simple=e=>e&&!(e.pay&&Array.isArray(e.pay.parts)&&e.pay.parts.length);
async function saveH(){try{await saveState(false,{history:true});}catch(e){}rerender();}
const clean=p=>{delete p.cashLoc;delete p.cashSU;delete p.parts;return p;};
window.v41Tip=async(ts,v)=>{const e=find(ts);if(!e)return;if(!confirm('I '+formatPrice(v)+' € in più di '+(e.tableName||'questo conto')+' sono una mancia lasciata sul terminale SumUp?'))return;e.pay=Object.assign({},e.pay||{},{tipSU:r2(v)});e.mt=Date.now();await saveH();};
window.v41Su=async(ts,k)=>{const e=find(ts);if(!e)return;const T=r2(e.total);if(!confirm((e.tableName||'Conto')+' € '+formatPrice(T)+' → '+(k==='cash'?'contanti con SumUp':'carta SumUp')+'?'))return;e.pay=clean(Object.assign({},e.pay||{},k==='cash'?{m:'contanti',cash:T,card:0,via:'SumUp'}:{m:'carta',card:T,cash:0,via:'SumUp'}));e.mt=Date.now();await saveH();};
window.v41Part=async(ts,a,k)=>{const e=find(ts);if(!e)return;const T=r2(e.total),loc=r2(T-a);if(!confirm((e.tableName||'Conto')+' € '+formatPrice(T)+':\n€ '+formatPrice(a)+' '+(k==='cash'?'contanti con SumUp':'carta SumUp')+' + € '+formatPrice(loc)+' contanti cassa locale?'))return;e.pay=clean(Object.assign({},e.pay||{}));Object.assign(e.pay,k==='cash'?{m:'contanti',cash:T,card:0}:{m:'misto',card:a,cash:loc},{via:'SumUp + cassa locale',cashLoc:loc,cashSU:k==='cash'?a:0});e.mt=Date.now();await saveH();};
window.v41Loc=async ts=>{const e=find(ts);if(!e)return;const T=r2(e.total);if(!confirm((e.tableName||'Conto')+' € '+formatPrice(T)+' non è su SumUp: era contanti cassa locale?'))return;e.pay=clean(Object.assign({},e.pay||{},{m:'contanti',cash:T,card:0,via:'Registratore'}));delete e.pay.tipSU;e.mt=Date.now();await saveH();};
/* --- abbinamento --- */
function match(app,su){const A=app.filter(x=>x.k!=='loc').map(x=>({...x})),SU=su.filter(x=>x.ok).map(x=>({...x})),LOC=app.filter(x=>x.k==='loc').map(x=>({...x}));
 SU.forEach(s=>{let b=null,bd=1e15;A.forEach(a=>{if(a.m||Math.abs(a.a-s.a)>0.004)return;const d=Math.abs(a.ts-s.ts);if(d<bd){bd=d;b=a;}});if(b){b.m=s;s.m=b;}});
 SU.filter(s=>!s.m).forEach(s=>{const c=A.filter(a=>!a.m&&!a.near&&s.a>a.a&&s.a-a.a<=Math.max(5,a.a*0.2)&&Math.abs(a.ts-s.ts)<3*3600e3).sort((x,y)=>Math.abs(x.ts-s.ts)-Math.abs(y.ts-s.ts))[0];if(c){c.near=s;s.near=c;}});
 SU.filter(s=>!s.m&&!s.near).forEach(s=>{const ex=LOC.filter(a=>!a.used&&simple(a.e)&&Math.abs(a.a-s.a)<0.01).sort((x,y)=>Math.abs(x.ts-s.ts)-Math.abs(y.ts-s.ts))[0];if(ex){ex.used=1;s.locEx=ex;return;}const pt=LOC.filter(a=>!a.used&&simple(a.e)&&a.a>s.a&&Math.abs(a.ts-s.ts)<3*3600e3).sort((x,y)=>Math.abs(x.ts-s.ts)-Math.abs(y.ts-s.ts))[0];if(pt){pt.used=1;s.locPt=pt;}});
 return{A,SU};}
const ic=k=>k==='cash'?'💵':k==='loc'?'🏪':'💳';
function panel(){const app=appDay(S),card=app.filter(x=>x.k==='card').reduce((a,x)=>a+x.a,0),cash=app.filter(x=>x.k==='cash').reduce((a,x)=>a+x.a,0),loc=app.filter(x=>x.k==='loc').reduce((a,x)=>a+x.a,0),tips=app.reduce((a,x)=>a+(x.tip||0),0),tot=card+cash+loc;
 const night=app.filter(x=>new Date(x.ts).getHours()<5);
 const t=svcToday(),tag=S===t?' · OGGI':S===addD(t,-1)?' · IERI':'';
 let sem='',rows='';
 if(!hasPhoto(S)){sem=`<div class="cx-s n"><div class="cx-l"></div><div><b>Confronto con SumUp da fare</b><small>Fotografa la lista “Vendite” del terminale: anche 2–3 foto scorrendo fino alle righe della notte.</small></div></div>`;}
 else{const su=suDay(S),m=match(app,su),aU=m.A.filter(a=>!a.m&&!a.near),sU=m.SU.filter(s=>!s.m&&!s.near),nr=m.SU.filter(s=>s.near),okN=m.SU.filter(s=>s.m).length,suT=m.SU.reduce((a,s)=>a+s.a,0),appSU=card+cash;
  const nBad=aU.length+sU.length+nr.length;const cls=nBad?'r':'g';
  sem=`<div class="cx-s ${cls}"><div class="cx-l"></div><div><b>${nBad?'🔴 SumUp e app NON coincidono':'🟢 SumUp e app coincidono'}</b><small>${nBad?nBad+(nBad===1?' pagamento da sistemare':' pagamenti da sistemare')+' · SumUp '+eur(suT)+' · app '+eur(appSU):okN+' pagamenti, tutti al centesimo · '+eur(suT)}</small></div></div>`;
  const ko=su.filter(r=>!r.ok);
  rows=`<details ${nBad||open?'open':''}><summary>📋 ${nBad?'Cosa non torna e come sistemarlo':'Vedi riga per riga'}</summary>`+
  nr.map(s=>{const a=s.near,d=r2(s.a-a.a);return `<div class="cx-r mid"><div class="a"><span>🟡 ${esc(a.l)}: nell’app ${eur(a.a)}, su SumUp ${eur(s.a)} (${s.t})</span><b>+${formatPrice(d)}</b></div>${simple(a.e)?`<button class="cx-fx" onclick="v41Tip(${a.e.ts},${d})">💶 Sono ${formatPrice(d)} € di mancia</button>`:''}</div>`;}).join('')+
  sU.map(s=>`<div class="cx-r bad"><div class="a"><span>🔴 Su SumUp ma non nell’app: ${s.date!==S?'notte, ':''}${s.t} ${esc(s.d||'')} ${ic(s.k)}</span><b>${eur(s.a)}</b></div>${s.locEx?`<div>Nell’app ${esc(s.locEx.l)} ${eur(s.locEx.a)} è segnato come 🏪 cassa locale.</div><button class="cx-fx" onclick="v41Su(${s.locEx.e.ts},'${s.k}')">✔️ Era ${s.k==='cash'?'contanti SumUp':'carta SumUp'}</button>`:s.locPt?`<div>Forse è una parte di ${esc(s.locPt.l)} ${eur(s.locPt.a)} (alle ${hm(s.locPt.ts)}), segnato tutto come 🏪 cassa locale.</div><button class="cx-fx" onclick="v41Part(${s.locPt.e.ts},${s.a},'${s.k}')">✔️ ${formatPrice(s.a)} € ${s.k==='cash'?'contanti SumUp':'carta SumUp'} + ${formatPrice(r2(s.locPt.a-s.a))} € cassa locale</button>`:'<div>Pagamento fatto solo sul terminale: se è di un tavolo, correggi quel conto in Conti.</div>'}</div>`).join('')+
  aU.map(a=>`<div class="cx-r bad"><div class="a"><span>🔴 Nell’app come SumUp ma non sul terminale: ${hm(a.ts)} ${esc(a.l)} ${ic(a.k)}</span><b>${eur(a.a)}</b></div>${simple(a.e)?`<button class="cx-fx" onclick="v41Loc(${a.e.ts})">🏪 Era contanti cassa locale</button>`:''}</div>`).join('')+
  m.SU.filter(s=>s.m).map(s=>`<div class="cx-r ok"><div class="a"><span>🟢 ${s.t} ${esc(s.m.l)} ${ic(s.k)}${s.m.tip?' · 💶 mancia '+formatPrice(s.m.tip):''}</span><b>${eur(s.a)}</b></div></div>`).join('')+
  (ko.length?`<div class="cx-r" style="opacity:.6;">✖ Non riuscite su SumUp, non contano: ${ko.map(r=>r.t+' '+formatPrice(r.a)).join(' · ')}</div>`:'')+
  `<button class="cx-fx" style="width:100%;margin-top:8px;" onclick="v41Clear()">🗑️ Togli le righe lette dalle foto</button></details>`;}
 return `<div class="cx"><div class="cx-nav"><button onclick="v41Nav(-1)">◀</button><b>${wd(S)} ${dmy(S)}${tag}<small>pranzo + cena, compresi i conti battuti dopo mezzanotte</small></b><button onclick="v41Nav(1)" ${S>=t?'disabled style="opacity:.35"':''}>▶</button></div>
<div class="cx-big"><small>💰 Hai incassato</small><b>${eur(tot)}</b>${tips>0?`<small>di cui ${eur(tips)} di mance su SumUp</small>`:''}</div>
<div class="cx-t"><div style="background:#DBEAFE;color:#1E3A8A;">💳 Carta<br>SumUp<b>${eur(card)}</b></div><div style="background:#E0F2FE;color:#075985;">💵 Contanti<br>SumUp<b>${eur(cash)}</b></div><div style="background:#DCFCE7;color:#14532D;">🏪 Contanti<br>cassa locale<b>${eur(loc)}</b></div></div>
${sem}
${night.length?`<div class="cx-w">🌙 Battuti dopo mezzanotte e contati in questa serata: ${night.map(x=>hm(x.ts)+' '+esc(x.l)+' '+eur(x.a)+' '+ic(x.k)).join(' · ')}. Sul terminale SumUp sono nella lista del ${dmy(addD(S,1))}.</div>`:''}
<div class="cx-btn"><label>📷 Fotografa SumUp<input type="file" accept="image/*" capture="environment" multiple style="display:none" onchange="v41Photo(this)"></label><label>🖼️ Foto dalla galleria<input type="file" accept="image/*" multiple style="display:none" onchange="v41Photo(this)"></label></div>
${rows}</div>`;}
{const _r=renderConti;renderConti=function(){try{const P=state.contiPer;if(P==='giorno'&&state.contiDay)S=state.contiDay;else if(P==='oggi')S=svcToday();else if(P==='ieri')S=addD(svcToday(),-1);}catch(e){}const res=_r.apply(this,arguments);try{if(!owner())return res;document.querySelectorAll('.su-box').forEach(x=>x.remove());const h=panel();
 [['payTotals',0],['contiList',1]].forEach(([id,afterH])=>{const P=$(id);if(!P)return;let w=P.querySelector('.cx-wrap');if(!w){w=document.createElement('div');w.className='cx-wrap';const hh=afterH&&P.querySelector('h3');if(hh)hh.after(w);else P.prepend(w);}else if(!afterH)P.prepend(w);w.innerHTML=h;});}catch(e){console.error(e);}return res;};}
})();
}catch(e){console.error("chef-extra v2.9.41",e);}
try{
(function(){
const r2=n=>Math.round((Number(n)||0)*100)/100;
const suCashOf=L=>L.reduce((x,e)=>x+(window.v2934SuCash?v2934SuCash(e):0),0);
/* controllo chiusura: leggibile e senza contare i contanti battuti su SumUp */
ccLine=function(lbl,app,rt,kind,L){
 let note='';if(kind==='cash'&&lbl==='Contanti'){const su=r2(suCashOf(L));if(su>0){note=` <span style="font-weight:700;">(tolti € ${formatPrice(su)} di contanti battuti su SumUp, che non vanno sul registratore)</span>`;app=r2(app-su);}}
 if(rt==null)return `<div style="font-size:.8rem;opacity:.8;">${lbl} registratore: non inserito</div>`;
 const d=r2(rt-app);
 if(Math.abs(d)<0.01)return `<div style="font-size:.85rem;font-weight:800;color:#22C55E;padding:4px 0;">✅ ${lbl} registratore: quadra (€ ${formatPrice(rt)})${note}</div>`;
 if(Math.abs(d)<=2)return `<div style="background:#FEF3C7;border:2px solid #F59E0B;border-radius:10px;padding:8px 10px;margin:6px 0;font-size:.84rem;color:#78350F;"><b>🟡 ${lbl}: piccola differenza di € ${formatPrice(Math.abs(d))}</b><br>App € ${formatPrice(app)} · registratore € ${formatPrice(rt)}${note}. Probabile resto o arrotondamento: se ti torna, va bene così.</div>`;
 if(d<0){const part=e=>kind==='cash'?payOf(e).cash-(window.v2934SuCash?v2934SuCash(e):0):payOf(e).card;const ex=L.filter(e=>Math.abs(part(e)+d)<0.01);const c=ex.length?ex:L.filter(e=>part(e)>0);
  return `<div style="background:#FEE2E2;border:2px solid #EF4444;border-radius:10px;padding:8px 10px;margin:6px 0;font-size:.84rem;color:#7F1D1D;"><b>🔴 ${lbl}: sul registratore mancano € ${formatPrice(-d)}</b><br>App € ${formatPrice(app)} · registratore € ${formatPrice(rt)}${note}.<br>Probabile scontrino non emesso: emettilo e rifai la verifica.<div style="margin-top:6px;font-weight:900;">🔎 ${ex.length?'Conto con lo stesso importo:':'Conti in contanti da controllare:'}</div>${c.map(e=>`<div>• ${escH(e.tableName||'')} ${escH(e.time||'')} · € ${formatPrice(part(e))}</div>`).join('')}</div>`;}
 return `<div style="background:#FEF3C7;border:2px solid #F59E0B;border-radius:10px;padding:8px 10px;margin:6px 0;font-size:.84rem;color:#78350F;"><b>🟡 ${lbl}: sul registratore ci sono € ${formatPrice(d)} in più</b><br>App € ${formatPrice(app)} · registratore € ${formatPrice(rt)}${note}.<br>Probabile conto non chiuso nell’app o con la forma di pagamento sbagliata.</div>`;};
{const _s=saveCashClose;saveCashClose=function(){const r=_s.apply(this,arguments);try{const[a]=contiRange(),s=state.ccSvc,K=ccKey(a,s),C=ccClosures()[K];if(C&&C.rtCash!=null&&C.app){const L=(state.historyLog||[]).filter(e=>e&&svcDate(e)===a&&(s==='giorno'||svcOf(e)===s)),S=sumBlock(L),exp=r2(S.cash-suCashOf(L));C.app.cashRt=exp;C.diff.cash=r2(C.rtCash-exp);if(Math.abs(C.diff.cash)<=2)C.diff.cashSmall=C.diff.cash;const cOk=Math.abs(C.diff.cash)<=2;C.ok=cOk&&Math.abs(C.diff.el||0)<0.01&&(C.diff.pos==null||Math.abs(C.diff.pos)<0.01)&&(C.diff.su==null||Math.abs(C.diff.su)<0.01)&&!S.nd;saveState(false,{staff:true});renderCashClose();}}catch(e){console.error(e);}return r;};}
})();
}catch(e){console.error("chef-extra v2.9.42",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const r2=n=>Math.round((Number(n)||0)*100)/100;const eur=n=>'€ '+formatPrice(r2(n));
const pad=n=>String(n).padStart(2,'0');const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const owner=()=>/^christian$/i.test((state.waiterName||'').trim());
const st=document.createElement('style');
st.textContent='.cx-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:10px}.cx-tabs button{border:2px solid #475569;border-radius:12px;background:#1E293B;color:#fff;font-weight:900;padding:8px 2px;font-size:.8rem}.cx-tabs button.on{background:#FF2D95;border-color:#fff}.cx-tb{width:100%;border-collapse:collapse;font-size:.74rem;margin-top:10px}.cx-tb th{text-align:right;font-weight:900;padding:5px 3px;border-bottom:2px solid #475569;white-space:nowrap}.cx-tb th:first-child,.cx-tb td:first-child{text-align:left}.cx-tb td{text-align:right;padding:6px 3px;border-bottom:1px dashed #334155;white-space:nowrap;font-weight:700}.cx-tb tr.tot td{font-weight:900;border-top:2px solid #475569;border-bottom:0;color:#4ADE80}.cx-tb tr[onclick]{cursor:pointer}.cx-sc{overflow-x:auto}.cc-miss{background:#FEF3C7;color:#78350F;border:2px solid #F59E0B;border-radius:12px;padding:8px 10px;margin:6px 0 10px;font-weight:800;font-size:.84rem}.cc-miss button{margin:4px 6px 0 0;border:2px solid #78350F;border-radius:9px;background:#fff;color:#78350F;font-weight:900;padding:5px 9px}';
document.head.appendChild(st);
const P=window._cxP=window._cxP||{mode:'g',ref:null};
const partsOf=e=>{try{return window.v41Parts?v41Parts(e):[];}catch(x){return[];}};
function sums(L){const o={card:0,cash:0,loc:0,tip:0,n:0,cop:0};L.forEach(e=>{o.n++;o.cop+=Number(e.coperti)||0;partsOf(e).forEach(x=>{o[x.k]+=x.a;o.tip+=x.tip||0;});});return o;}
const monday=s=>{const d=new Date(s+'T12:00');const w=(d.getDay()+6)%7;d.setDate(d.getDate()-w);return iso(d);};
const addD=(s,n)=>{const x=new Date(s+'T12:00');x.setDate(x.getDate()+n);return iso(x);};
const MN=['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
function range(){const t=svcToday(),r=P.ref||t;if(P.mode==='s'){const a=monday(r);return{a,b:addD(a,6),lbl:'Settimana dal '+a.split('-').reverse().join('/').slice(0,5)+' al '+addD(a,6).split('-').reverse().join('/')};}
 if(P.mode==='m'){const y=+r.slice(0,4),m=+r.slice(5,7);const a=y+'-'+pad(m)+'-01',b=iso(new Date(y,m,0));return{a,b,lbl:MN[m-1]+' '+y};}
 const y=r.slice(0,4);return{a:y+'-01-01',b:y+'-12-31',lbl:'Anno '+y};}
window.v43Mode=m=>{P.mode=m;P.ref=null;try{renderConti();}catch(e){}};
window.v43Nav=n=>{const t=svcToday(),r=P.ref||t;let v;if(P.mode==='s')v=addD(r,7*n);else if(P.mode==='m'){const d=new Date(r.slice(0,7)+'-15T12:00');d.setMonth(d.getMonth()+n);v=iso(d);}else v=(+r.slice(0,4)+n)+r.slice(4);if(n>0&&range().b>=t)return;P.ref=v;try{renderConti();}catch(e){}};
window.v43Day=d=>{P.mode='g';P.ref=null;try{if(window.v41Go)v41Go(d);else renderConti();}catch(e){}};
window.v43Month=ym=>{P.mode='m';P.ref=ym+'-15';try{renderConti();}catch(e){}};
const tabs=()=>`<div class="cx-tabs">${[['g','Giorno'],['s','Settimana'],['m','Mese'],['a','Anno']].map(([k,l])=>`<button class="${P.mode===k?'on':''}" onclick="v43Mode('${k}')">${l}</button>`).join('')}</div>`;
window.v43Tabs=tabs;
function period(){const{a,b,lbl}=range(),t=svcToday();const L=(state.historyLog||[]).filter(e=>{if(!e)return false;const d=svcDate(e);return d>=a&&d<=b;});const S=sums(L),tot=S.card+S.cash+S.loc;
 let rows='';
 if(P.mode==='a'){const by={};L.forEach(e=>{const k=svcDate(e).slice(0,7);(by[k]=by[k]||[]).push(e);});rows=Object.keys(by).sort().map(k=>{const s=sums(by[k]);return `<tr onclick="v43Month('${k}')"><td>${MN[+k.slice(5)-1].slice(0,3)} ›</td><td>${formatPrice(r2(s.card))}</td><td>${formatPrice(r2(s.cash))}</td><td>${formatPrice(r2(s.loc))}</td><td><b>${formatPrice(r2(s.card+s.cash+s.loc))}</b></td></tr>`;}).join('');}
 else{const by={};L.forEach(e=>{const k=svcDate(e);(by[k]=by[k]||[]).push(e);});const days=[];for(let d=a;d<=b&&d<=t;d=addD(d,1))days.push(d);rows=days.map(d=>{const s=sums(by[d]||[]);const tt=s.card+s.cash+s.loc;const w=new Date(d+'T12:00').toLocaleDateString('it-IT',{weekday:'short'});return `<tr onclick="v43Day('${d}')" style="${tt?'':'opacity:.45'}"><td>${w} ${d.slice(8)}/${d.slice(5,7)} ›</td><td>${formatPrice(r2(s.card))}</td><td>${formatPrice(r2(s.cash))}</td><td>${formatPrice(r2(s.loc))}</td><td><b>${formatPrice(r2(tt))}</b></td></tr>`;}).reverse().join('');}
 const pct=v=>tot?' · '+Math.round(v/tot*100)+'%':'';
 return `<div class="cx">${tabs()}<div class="cx-nav"><button onclick="v43Nav(-1)">◀</button><b>${esc(lbl)}<small>${S.n} conti · ${S.cop} coperti${S.n?' · scontrino medio '+eur(tot/S.n):''}</small></b><button onclick="v43Nav(1)" ${b>=t?'disabled style="opacity:.35"':''}>▶</button></div>
<div class="cx-big"><small>💰 Hai incassato</small><b>${eur(tot)}</b>${S.tip>0?`<small>di cui ${eur(S.tip)} di mance su SumUp</small>`:''}</div>
<div class="cx-t"><div style="background:#DBEAFE;color:#1E3A8A;">💳 Carta<br>SumUp<b>${eur(S.card)}</b><small style="font-weight:700;">${pct(S.card).slice(3)}</small></div><div style="background:#E0F2FE;color:#075985;">💵 Contanti<br>SumUp<b>${eur(S.cash)}</b><small style="font-weight:700;">${pct(S.cash).slice(3)}</small></div><div style="background:#DCFCE7;color:#14532D;">🏪 Contanti<br>cassa locale<b>${eur(S.loc)}</b><small style="font-weight:700;">${pct(S.loc).slice(3)}</small></div></div>
<div class="cx-su" style="margin-top:8px;border-radius:12px;padding:9px 10px;background:#1D4ED8;color:#fff;font-weight:900;display:flex;justify-content:space-between;"><span>🟦 Totale SumUp (carta + contanti)</span><span>${eur(S.card+S.cash)}</span></div>
<div class="cx-sc"><table class="cx-tb"><thead><tr><th>${P.mode==='a'?'Mese':'Giorno'}</th><th>💳 SumUp</th><th>💵 SumUp</th><th>🏪 Locale</th><th>Totale</th></tr></thead><tbody>${rows||'<tr><td colspan="5">Nessun conto.</td></tr>'}<tr class="tot"><td>Totale</td><td>${formatPrice(r2(S.card))}</td><td>${formatPrice(r2(S.cash))}</td><td>${formatPrice(r2(S.loc))}</td><td>${formatPrice(r2(tot))}</td></tr></tbody></table></div>
<div style="font-size:.72rem;opacity:.75;margin-top:6px;font-weight:700;">Tocca un ${P.mode==='a'?'mese':'giorno'} per aprirlo. I conti dopo mezzanotte sono contati nella sera prima.</div></div>`;}
{const _r=renderConti;renderConti=function(){const res=_r.apply(this,arguments);try{if(!owner())return res;
 document.querySelectorAll('.cx-wrap').forEach(w=>{if(P.mode!=='g'){w.innerHTML=period();}else{const c=w.querySelector('.cx');if(c&&!c.querySelector('.cx-tabs'))c.insertAdjacentHTML('afterbegin',tabs());}});
 /* chiusure mancanti ben visibili nel registro */
 const el=$('cashClose');if(el&&!el.querySelector('.cc-miss')){const t=svcToday(),K=Object.keys(ccClosures()),D=new Set();(state.historyLog||[]).forEach(e=>{try{const d=svcDate(e);if(d&&d<t&&d>=addD(t,-30))D.add(d);}catch(x){}});const M=[...D].filter(d=>!K.some(k=>k.indexOf(d+'|')===0)).sort().reverse();
  if(M.length){const h=[...el.querySelectorAll('div,b,h3,h4')].find(x=>/Registro chiusure/.test(x.textContent)&&x.children.length<3);const box=document.createElement('div');box.className='cc-miss';box.innerHTML='⚠️ '+(M.length===1?'Manca la chiusura di':'Mancano le chiusure di')+':<br>'+M.map(d=>`<button onclick="ccOpen('${d}|giorno')">${new Date(d+'T12:00').toLocaleDateString('it-IT',{weekday:'short'})} ${d.slice(8)}/${d.slice(5,7)} · fai la chiusura</button>`).join('');if(h)h.after(box);else el.prepend(box);}}
}catch(e){console.error(e);}return res;};}
})();
}catch(e){console.error("chef-extra v2.9.43",e);}
try{
(function(){
const LB={card:'💳 carta SumUp',cash:'💵 contanti SumUp',loc:'🏪 contanti cassa locale'},CL={card:'#2563EB',cash:'#0891B2',loc:'#16A34A'};
const _pc=payChip;
payChip=function(e){try{const p=payOf(e);if(!e||p.m==='nd'||p.m==='buono'||!window.v41Parts)return _pc.apply(this,arguments);
 const P=v41Parts(e).filter(x=>x.a>0);if(!P.length)return _pc.apply(this,arguments);
 const g={};P.forEach(x=>{g[x.k]=(g[x.k]||0)+x.a;});const K=['card','cash','loc'].filter(k=>g[k]);const tip=P.reduce((a,x)=>a+(x.tip||0),0);
 const term=/terminal/i.test(String(e.pay&&e.pay.via||''))?' (terminale)':'';
 const sty=c=>`display:inline-block;font-size:.72rem;font-weight:900;color:#fff;background:${c};border-radius:6px;padding:2px 7px;line-height:1.35;`;
 if(K.length===1){const k=K[0];return `<span style="${sty(CL[k])}">${({card:'💳 Carta SumUp',cash:'💵 Contanti con SumUp',loc:'🏪 Contanti cassa locale'})[k]}${k==='card'?term:''}${tip>0?' · 💶 mancia € '+formatPrice(tip):''}</span>`;}
 return `<span style="${sty('#7C3AED')}">🔀 Pagato in parte: ${K.map(k=>`€ ${formatPrice(Math.round(g[k]*100)/100)} ${LB[k]}`).join(' + ')}${tip>0?' · 💶 mancia € '+formatPrice(tip):''}</span>`;}catch(x){return _pc.apply(this,arguments);}};
})();
}catch(e){console.error("chef-extra v2.9.44",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const r2=n=>Math.round((Number(n)||0)*100)/100;const eur=n=>'€ '+formatPrice(r2(n));
const pad=n=>String(n).padStart(2,'0');const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const addD=(s,n)=>{const x=new Date(s+'T12:00');x.setDate(x.getDate()+n);return iso(x);};
const isAl=()=>/^alice$/i.test((state.waiterName||'').trim());
const OK=['oggi','forn'];
const st=document.createElement('style');
st.textContent='body.al-mode #payTotals,body.al-mode #cashClose,body.al-mode #spCard,body.al-mode #ccBanner{display:none!important}body.al-mode #hubTabs_sales .hub-tab:not([data-p="oggi"]):not([data-p="forn"]){display:none!important}body.al-mode #hubDots_sales{display:none}.al{border-radius:18px;padding:12px;margin-bottom:12px;background:#0F172A;color:#F1F5F9;border:2px solid #334155}.al-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px}.al-tabs button{border:2px solid #475569;border-radius:12px;background:#1E293B;color:#fff;font-weight:900;padding:9px 2px}.al-tabs button.on{background:#FF2D95;border-color:#fff}.al-nav{display:grid;grid-template-columns:42px 1fr 42px;gap:6px;align-items:center;margin-bottom:8px}.al-nav button{border:2px solid #fff;border-radius:10px;background:#1E293B;color:#fff;font-weight:900;padding:6px}.al-nav b{text-align:center;line-height:1.2}.al-nav small{display:block;font-weight:700;opacity:.75;font-size:.74rem}.al-big{text-align:center;margin:6px 0 10px}.al-big small{display:block;font-weight:800;opacity:.85}.al-big b{font-size:2.1rem;color:#4ADE80}.al-k{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px}.al-k div{background:#1E293B;border-radius:12px;padding:8px 4px;text-align:center;font-weight:800;font-size:.72rem}.al-k b{display:block;font-size:1.1rem;margin-top:2px}.al-t{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px}.al-t div{border-radius:12px;padding:8px 4px;text-align:center;font-weight:800;font-size:.72rem;line-height:1.2}.al-t b{display:block;font-size:.98rem;margin-top:3px}.al h4{margin:14px 0 6px;font-size:1rem}.al-row{display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px dashed #334155;font-weight:700;font-size:.84rem}.al-rk{display:grid;grid-template-columns:24px 1fr auto;gap:6px;align-items:center;padding:5px 0;font-size:.82rem;font-weight:700}.al-rk i{display:block;height:7px;border-radius:9px;background:linear-gradient(90deg,#FF2D95,#1BE7FF);margin-top:3px}.al-rk .n{font-weight:900;color:#FDE68A;text-align:center}';
document.head.appendChild(st);
/* barra in basso: niente Menù e Ore, sì Vendite */
function nav(){const a=isAl();document.body.classList.toggle('al-mode',a);if(!a)return;let ch=false;[['navDishes','none'],['navTime','none'],['navSales','block']].forEach(([id,v])=>{const b=$(id);if(b&&b.style.display!==v){b.style.display=v;ch=true;}});if(ch&&window.v21UpdateDock)try{v21UpdateDock();}catch(e){}}
setInterval(nav,1000);nav();
/* apertura di Vendite per Alice: solo Oggi e Fornitori */
{const _s=switchMainView;switchMainView=function(v){if(v==='sales'&&isAl()){const w=state.waiterName;state.waiterName='Christian';let r;try{r=_s.apply(this,arguments);}finally{state.waiterName=w;}setTimeout(()=>{try{setHubPage('sales','oggi',0);}catch(e){}draw();},30);return r;}
 if((v==='dishes'||v==='time')&&isAl())return _s.call(this,'tables');return _s.apply(this,arguments);};}
{const _h=setHubPage;window.setHubPage=setHubPage=function(key,page,dir){if(key==='sales'&&isAl()&&OK.indexOf(page)<0)page='oggi';const r=_h.call(this,key,page,dir);if(key==='sales'&&page==='oggi'&&isAl())setTimeout(draw,30);return r;};}
/* --- riepilogo vendite --- */
const A=window._alP=window._alP||{m:'g',ref:null};
const MN=['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
const monday=s=>{const d=new Date(s+'T12:00');d.setDate(d.getDate()-(d.getDay()+6)%7);return iso(d);};
const fd=s=>s.slice(8)+'/'+s.slice(5,7)+'/'+s.slice(0,4);
function range(){const t=svcToday(),r=A.ref||t;if(A.m==='g')return{a:r,b:r,lbl:new Date(r+'T12:00').toLocaleDateString('it-IT',{weekday:'long'})+' '+fd(r)+(r===t?' · OGGI':r===addD(t,-1)?' · IERI':'')};
 if(A.m==='s'){const a=monday(r),b=addD(a,6);return{a,b,lbl:'dal '+fd(a).slice(0,5)+' al '+fd(b)};}
 const y=+r.slice(0,4),m=+r.slice(5,7);return{a:y+'-'+pad(m)+'-01',b:iso(new Date(y,m,0)),lbl:MN[m-1]+' '+y};}
window.v45M=m=>{A.m=m;A.ref=null;draw();};
window.v45N=n=>{const t=svcToday(),r=A.ref||t;let v;if(A.m==='g')v=addD(r,n);else if(A.m==='s')v=addD(r,7*n);else{const d=new Date(r.slice(0,7)+'-15T12:00');d.setMonth(d.getMonth()+n);v=iso(d);}if(n>0&&range().b>=t)return;A.ref=v;draw();};
window.v45D=d=>{A.m='g';A.ref=d;draw();};
const NOPE=/coperto|\bacqua\b/i;
function draw(){if(!isAl())return;const host=$('hub_sales_oggi');if(!host)return;let box=$('alSales');if(!box){box=document.createElement('div');box.id='alSales';host.prepend(box);}else if(host.firstElementChild!==box)host.prepend(box);
 const{a,b,lbl}=range(),t=svcToday();const L=(state.historyLog||[]).filter(e=>{if(!e)return false;const d=svcDate(e);return d>=a&&d<=b;});
 const s={card:0,cash:0,loc:0,n:L.length,cop:0};L.forEach(e=>{s.cop+=Number(e.coperti)||0;(window.v41Parts?v41Parts(e):[]).forEach(x=>{s[x.k]+=x.a;});});const tot=s.card+s.cash+s.loc;
 const R={};L.forEach(e=>(e.items||[]).forEach(i=>{if(!i||NOPE.test(i.name||'')||i.cat==='1 Coperto')return;const k=i.name;R[k]=R[k]||{q:0,v:0,c:i.cat||''};R[k].q+=Number(i.qty)||0;R[k].v+=(Number(i.price)||0)*(Number(i.qty)||0);}));
 const isDrink=c=>/bevand|vin|birr|caff|amar|bibit/i.test(c||'');
 const top=(f)=>Object.entries(R).filter(([k,v])=>f(v)).sort((x,y)=>y[1].q-x[1].q).slice(0,10);
 const rk=(list)=>{const mx=list.length?list[0][1].q:1;return list.map(([k,v],i)=>`<div class="al-rk"><span class="n">${i+1}</span><div>${esc(k.length>46?k.slice(0,44)+'…':k)}<i style="width:${Math.max(6,Math.round(v.q/mx*100))}%"></i></div><b>${v.q}×</b></div>`).join('')||'<div class="al-row"><span>Nessun piatto venduto.</span></div>';};
 let rows='';if(A.m!=='g'){const by={};L.forEach(e=>{const d=svcDate(e);(by[d]=by[d]||[]).push(e);});const D=[];for(let d=a;d<=b&&d<=t;d=addD(d,1))D.push(d);rows=`<h4>📅 Giorno per giorno</h4>`+D.reverse().map(d=>{const l=by[d]||[];let tt=0;l.forEach(e=>(window.v41Parts?v41Parts(e):[]).forEach(x=>tt+=x.a));return `<div class="al-row" onclick="v45D('${d}')" style="cursor:pointer;${tt?'':'opacity:.45'}"><span>${new Date(d+'T12:00').toLocaleDateString('it-IT',{weekday:'short'})} ${d.slice(8)}/${d.slice(5,7)} · ${l.length} conti ›</span><b>${eur(tt)}</b></div>`;}).join('');}
 box.innerHTML=`<div class="al"><div class="al-tabs">${[['g','Giorno'],['s','Settimana'],['m','Mese']].map(([k,l])=>`<button class="${A.m===k?'on':''}" onclick="v45M('${k}')">${l}</button>`).join('')}</div>
<div class="al-nav"><button onclick="v45N(-1)">◀</button><b>${esc(lbl)}<small>pranzo + cena</small></b><button onclick="v45N(1)" ${b>=t?'disabled style="opacity:.35"':''}>▶</button></div>
<div class="al-big"><small>💰 Incasso</small><b>${eur(tot)}</b></div>
<div class="al-k"><div>🧾 Conti<b>${s.n}</b></div><div>👥 Coperti<b>${s.cop}</b></div><div>💶 A coperto<b>${s.cop?eur(tot/s.cop):'—'}</b></div></div>
<div class="al-t"><div style="background:#DBEAFE;color:#1E3A8A;">💳 Carta<br>SumUp<b>${eur(s.card)}</b></div><div style="background:#E0F2FE;color:#075985;">💵 Contanti<br>SumUp<b>${eur(s.cash)}</b></div><div style="background:#DCFCE7;color:#14532D;">🏪 Contanti<br>cassa locale<b>${eur(s.loc)}</b></div></div>
${rows}
<h4>🏆 Piatti più venduti</h4>${rk(top(v=>!isDrink(v.c)))}
<h4>🍷 Bevande più vendute</h4>${rk(top(v=>isDrink(v.c)).slice(0,5))}
<button class="btn-main btn-bill" style="width:100%;margin-top:12px;" onclick="setHubPage('sales','forn')">📦 Fornitori · 📷 fotografa una fattura</button></div>`;}
{const _r=renderConti;renderConti=function(){const r=_r.apply(this,arguments);try{if(isAl())draw();}catch(e){}return r;};}
})();
}catch(e){console.error("chef-extra v2.9.45",e);}
try{
(function(){
const $=id=>document.getElementById(id);
/* ================= GRAFICA 3D ================= */
const FXK='alicetta_fx3d';
const fxOn=()=>localStorage.getItem(FXK)!=='0';
const st=document.createElement('style');st.id='fx3dCss';
st.textContent=`
body.fx3d{--fx-lip:rgba(0,0,0,.26);--fx-hi:rgba(255,255,255,.5);--fx-gl:rgba(255,255,255,.3);--fx-drop:0 8px 16px rgba(90,0,45,.30);--fx-drop-s:0 4px 8px rgba(90,0,45,.26);--fx-card:0 5px 0 rgba(120,0,60,.28),0 18px 32px rgba(90,0,45,.30),inset 0 1px 0 rgba(255,255,255,.95);--fx-ease:cubic-bezier(.2,.9,.3,1.25)}
body.fx3d.dark{--fx-lip:rgba(0,0,0,.34);--fx-hi:rgba(255,255,255,.30);--fx-gl:rgba(255,255,255,.18);--fx-drop:0 10px 20px rgba(0,0,0,.50);--fx-drop-s:0 5px 10px rgba(0,0,0,.42);--fx-card:0 20px 38px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.10)}
body.fx3d .k3{box-shadow:inset 0 -4px 0 var(--fx-lip),inset 0 2px 0 var(--fx-hi),inset 0 16px 14px -13px var(--fx-gl),var(--fx-drop);transition:transform .09s ease-out,box-shadow .09s ease-out,filter .12s;-webkit-tap-highlight-color:transparent}
body.fx3d .k3.k3s{box-shadow:inset 0 -3px 0 var(--fx-lip),inset 0 1.5px 0 var(--fx-hi),var(--fx-drop-s)}
body.fx3d .k3:active{box-shadow:inset 0 -1px 0 var(--fx-lip),inset 0 3px 6px rgba(0,0,0,.28),0 2px 4px rgba(0,0,0,.25);filter:brightness(.95)}
body.fx3d .k3.k3m:active{transform:translateY(3px) scale(.985)}
body.fx3d .k3:disabled,body.fx3d .k3[disabled]{box-shadow:inset 0 -2px 0 var(--fx-lip);filter:saturate(.7)}
body.fx3d .btn-print,body.fx3d .btn-note,body.fx3d .btn-back,body.fx3d .btn-qty{border-color:rgba(6,35,41,.18)}
body.fx3d .btn-main,body.fx3d .btn-modal{border-radius:14px}
body.fx3d .btn-note{border-radius:10px}
body.fx3d #tablesContainer .table-card:not(.marcia):not(.conto):not(.delayed){border-color:#8DF4FF;box-shadow:inset 0 -7px 0 rgba(0,0,0,.17),inset 0 2px 0 rgba(255,255,255,.8),inset 0 26px 22px -20px rgba(255,255,255,.65),0 12px 22px rgba(0,60,80,.38);transition:transform .1s ease-out,box-shadow .1s ease-out}
body.fx3d #tablesContainer .table-card.busy:not(.marcia):not(.conto):not(.delayed){border-color:#FF9C85;box-shadow:inset 0 -7px 0 rgba(0,0,0,.24),inset 0 2px 0 rgba(255,255,255,.5),inset 0 26px 22px -20px rgba(255,255,255,.4),0 12px 26px rgba(255,87,51,.42)}
body.fx3d #tablesContainer .table-card:not(.marcia):not(.conto):not(.delayed):active{transform:translateY(4px) scale(.975);box-shadow:inset 0 -2px 0 rgba(0,0,0,.2),inset 0 4px 8px rgba(0,0,0,.2),0 3px 6px rgba(0,0,0,.3)}
body.fx3d .cart-section,body.fx3d .hc-card,body.fx3d .kds-card,body.fx3d .order-header,body.fx3d .fire-box{box-shadow:var(--fx-card);border-radius:20px}
body.fx3d.dark .cart-section,body.fx3d.dark .kds-card,body.fx3d.dark .order-header{background-image:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,0) 110px);border-color:rgba(255,255,255,.10)}
body.fx3d .receipt-box{border-radius:24px;box-shadow:0 34px 70px rgba(0,0,0,.6),0 6px 0 rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.9)}
body.fx3d.dark .receipt-box{box-shadow:0 34px 70px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.12)!important;background-image:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,0) 130px)}
body.fx3d .modal-overlay{background:rgba(10,6,22,.6);-webkit-backdrop-filter:blur(5px) saturate(1.15);backdrop-filter:blur(5px) saturate(1.15)}
body.fx3d .modal-overlay.fx-in{animation:fxFade .2s ease-out}
body.fx3d .modal-overlay.fx-in>*{animation:fxPop .34s var(--fx-ease)}
body.fx3d .screen.fx-in{animation:fxFade .22s ease-out}
body.fx3d .topbar{box-shadow:0 8px 20px rgba(0,0,0,.30),inset 0 -1px 0 rgba(255,255,255,.14)}
body.fx3d .bottom-bar{box-shadow:0 -12px 26px rgba(0,0,0,.36),inset 0 1px 0 rgba(255,255,255,.3)}
body.fx3d .form-control,body.fx3d input[type=text],body.fx3d input[type=number],body.fx3d input[type=tel],body.fx3d input[type=search],body.fx3d input[type=email],body.fx3d input[type=date],body.fx3d input[type=time],body.fx3d textarea,body.fx3d select{box-shadow:inset 0 2px 4px rgba(0,0,0,.16),0 1px 0 rgba(255,255,255,.5);transition:box-shadow .15s}
body.fx3d.dark .form-control,body.fx3d.dark input[type=text],body.fx3d.dark input[type=number],body.fx3d.dark input[type=tel],body.fx3d.dark input[type=search],body.fx3d.dark input[type=email],body.fx3d.dark input[type=date],body.fx3d.dark input[type=time],body.fx3d.dark textarea,body.fx3d.dark select{box-shadow:inset 0 2px 5px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.06)}
body.fx3d input:focus,body.fx3d textarea:focus,body.fx3d select:focus{outline:none;box-shadow:inset 0 2px 4px rgba(0,0,0,.2),0 0 0 3px rgba(27,231,255,.5)}
body.fx3d #dock{box-shadow:0 6px 0 #021216,0 22px 40px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.28),inset 0 18px 18px -16px rgba(255,255,255,.18)}
body.fx3d #dock .btn-top .nv-i .ios-tile{box-shadow:inset 0 -3px 0 rgba(0,0,0,.24),inset 0 1.5px 0 rgba(255,255,255,.65),inset 0 12px 10px -9px rgba(255,255,255,.55),0 5px 9px rgba(0,0,0,.42)}
body.fx3d #dock .btn-top .nv-i .ios-tile svg{filter:drop-shadow(0 1.5px 0 rgba(0,0,0,.28))}
body.fx3d .mini-toast{box-shadow:inset 0 -3px 0 rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.25),0 12px 24px rgba(0,0,0,.45);border-radius:18px}
body.fx3d .version-badge,body.fx3d .sync-badge{box-shadow:inset 0 -2px 0 rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.25)}
@keyframes fxFade{from{opacity:0}to{opacity:1}}
@keyframes fxPop{0%{transform:translateY(26px) scale(.93);opacity:0}65%{transform:translateY(-3px) scale(1.012);opacity:1}100%{transform:none}}
@media (prefers-reduced-motion:reduce){body.fx3d .modal-overlay.fx-in,body.fx3d .modal-overlay.fx-in>*,body.fx3d .screen.fx-in{animation:none}body.fx3d .k3.k3m:active{transform:none}}
`;
document.head.appendChild(st);
/* etichetto i tasti: solo quelli con uno sfondo vero diventano "tasti 3D" */
const SEL='button,.menu-item,.room-tab,.mandata-btn,.cat-btn,label.btn-main,label.btn-note,label.btn-modal,.cx-btn label,a.btn-main';
const SKIP='#dock,.hub-tabs,.seg,.table-card,#jobBar .t,.topbar .logo';
function tag(){if(!fxOn())return;document.querySelectorAll(SEL).forEach(b=>{if(b.dataset.k)return;b.dataset.k='1';if(b.closest(SKIP))return;let cs;try{cs=getComputedStyle(b);}catch(e){return;}
 const bg=cs.backgroundColor||'',m=bg.match(/rgba?\(([^)]+)\)/),a=m?(m[1].split(',').length>3?parseFloat(m[1].split(',')[3]):1):0,img=cs.backgroundImage&&cs.backgroundImage!=='none';
 if(a<0.2&&!img)return;if(/inset/.test(b.style.boxShadow||''))return;
 b.classList.add('k3');const h=(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0)+(parseFloat(cs.fontSize)||14)*1.3;if(h<40)b.classList.add('k3s');
 if(cs.transform==='none'&&cs.position!=='fixed')b.classList.add('k3m');
 /* se scritta e sfondo hanno quasi lo stesso colore (succede col tema scuro) rendo la scritta leggibile */
 try{if(a>0.85&&!img){const L=c=>{const p=(c.match(/rgba?\(([^)]+)\)/)||[])[1];if(!p)return null;const v=p.split(',').slice(0,3).map(x=>{x=parseFloat(x)/255;return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4);});return 0.2126*v[0]+0.7152*v[1]+0.0722*v[2];};const lb=L(bg),lt=L(cs.color||'');if(lb!=null&&lt!=null){const r=(Math.max(lb,lt)+0.05)/(Math.min(lb,lt)+0.05);if(r<1.9)b.style.color=lb>0.4?'#062329':'#fff';}}}catch(e){}
});}
let tq=0;const mo=new MutationObserver(()=>{if(tq)return;tq=setTimeout(()=>{tq=0;try{tag();}catch(e){}},160);});
/* animazione di ingresso solo quando una finestra o una schermata si apre davvero */
const seen=new WeakMap();document.querySelectorAll('.modal-overlay,.screen').forEach(e=>seen.set(e,e.classList.contains('active')));
const mo2=new MutationObserver(L=>{if(!fxOn())return;L.forEach(r=>{const e=r.target;if(!e.classList)return;const isM=e.classList.contains('modal-overlay'),isS=e.classList.contains('screen');if(!isM&&!isS)return;const on=e.classList.contains('active'),was=seen.get(e);seen.set(e,on);if(on&&!was&&!e.classList.contains('sw-in-r')&&!e.classList.contains('sw-in-l')){e.classList.add('fx-in');setTimeout(()=>e.classList.remove('fx-in'),420);}});});
function fxApply(){const on=fxOn();document.body.classList.toggle('fx3d',on);if(on){try{tag();}catch(e){}
  try{if(!localStorage.getItem('alicetta_fx_icons')){localStorage.setItem('alicetta_fx_icons','1');const cur=localStorage.getItem('alicetta_icons')||'ios';if(cur!=='ios'&&cur!=='cbb'&&window.v221Icons){localStorage.setItem('alicetta_icons_prev',cur);v221Icons('ios');}}}catch(e){}}}
window.v47Fx=v=>{localStorage.setItem(FXK,v?'1':'0');if(!v){document.querySelectorAll('[data-k]').forEach(b=>{b.classList.remove('k3','k3s','k3m');delete b.dataset.k;});try{const p=localStorage.getItem('alicetta_icons_prev');if(p&&window.v221Icons){v221Icons(p);localStorage.removeItem('alicetta_icons_prev');localStorage.removeItem('alicetta_fx_icons');}}catch(e){}}fxApply();drawOpt();};
mo.observe(document.body,{childList:true,subtree:true});mo2.observe(document.body,{attributes:true,attributeFilter:['class'],subtree:true});
fxApply();setTimeout(fxApply,1500);

/* ================= SUONI ================= */
function note(f,t0,dur,vol,parts,type){const A=audioCtx,out=sndDest();(parts||[[1,1,1],[2.76,.28,.5],[5.4,.1,.28]]).forEach(([m,v,d])=>{const o=A.createOscillator(),g=A.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f*m,t0);g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(Math.max(0.0002,vol*v),t0+0.007);g.gain.exponentialRampToValueAtTime(0.0001,t0+dur*d);o.connect(g);g.connect(out);o.start(t0);o.stop(t0+dur*d+0.06);});}
const MAR=[[1,1,1],[4,.22,.35],[9.2,.06,.18]];   /* marimba: caldo, attacco netto */
const BELL=[[1,1,1],[2.76,.3,.55],[5.4,.12,.3]]; /* campanella */
const GLO=[[1,1,1],[2,.45,.7],[3,.16,.45]];      /* glockenspiel pieno */
const T=()=>{sndDest();return audioCtx.currentTime+0.03;};
const SND={
 /* cameriere: piatto pronto / campanello — due note che salgono, ripetute una volta più piano */
 sala(){const n=T();[[0,.95],[.62,.5]].forEach(([o,v])=>{note(1318.5,n+o,.55,v,MAR);note(1760,n+o+.15,.8,v,MAR);});},
 /* cucina (tablet KDS): nuova comanda — arpeggio di campanelle */
 cucina(){const n=T();[[784,0],[1046.5,.13],[1318.5,.26],[1568,.42]].forEach(([f,d],i)=>note(f,n+d,i===3?1.5:.7,i===3?1:.85,GLO));[[1318.5,1.05],[1568,1.18]].forEach(([f,d])=>note(f,n+d,.9,.55,GLO));},
 /* chiamata urgente (cercapersone): tre coppie decise ma intonate */
 chiamata(){const n=T();for(let k=0;k<3;k++){const o=k*.5;note(1174.7,n+o,.22,1,GLO,'triangle');note(1760,n+o+.13,.34,1,GLO,'triangle');}note(2349.3,n+1.55,1.1,.8,BELL);},
 /* ritardo: richiamo che scende, due volte */
 ritardo(){const n=T();[0,1.7].forEach(o=>{note(1760,n+o,.5,.9,BELL);note(1396.9,n+o+.2,.5,.9,BELL);note(1760,n+o+.4,.5,.9,BELL);note(1174.7,n+o+.62,1.1,1,BELL);});},
 /* timbratura: due note leggere */
 soft(){const n=T();note(1046.5,n,.5,.28,MAR);note(1568,n+.16,.8,.28,MAR);},
 /* allarme lungo */
 allarme(sec){const n=T(),d=Math.max(2,sec||4);for(let t=0;t<d;t+=.5){note(1174.7,n+t,.22,1,GLO,'triangle');note(1760,n+t+.13,.3,1,GLO,'triangle');}}
};
const safe=f=>function(){try{return f.apply(this,arguments);}catch(e){}};
playSimpleBell=safe(SND.sala);
playKitchenBell=safe(function(){if(typeof isKdsDev==='function'&&isKdsDev())SND.cucina();else SND.sala();});
playPagerSiren=safe(function(){window._sndLoud=true;try{SND.chiamata();}finally{setTimeout(()=>{window._sndLoud=false;},2800);}});
playLateChime=safe(function(){SND.ritardo();if(navigator.vibrate)try{navigator.vibrate([300,150,300]);}catch(e){}});
softChime=safe(SND.soft);
playPoliceSiren=safe(function(s){window._sndLoud=true;try{SND.allarme(s);}finally{setTimeout(()=>{window._sndLoud=false;},(s||4)*1000+300);}});
window.v47Snd=k=>{try{(SND[k]||SND.sala)();}catch(e){}};

/* ================= scheda in Opzioni ================= */
function drawOpt(){const host=$('viewMenuMgr');if(!host)return;let c=$('fxCard');if(!c){c=document.createElement('div');c.id='fxCard';c.className='cart-section';const th=$('themeCard');if(th&&th.parentNode)th.parentNode.insertBefore(c,th.nextSibling);else host.appendChild(c);}
 const on=fxOn();c.innerHTML=`<h3 style="margin-bottom:6px;">✨ Grafica 3D e suoni</h3><div class="fc-sub" style="margin-bottom:8px;">Tasti in rilievo che si premono, ombre, finestre che si aprono con un piccolo rimbalzo. Se qualcosa non ti piace o si vede male, spegnila: l’app torna com’era.</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><button class="btn-main ${on?'btn-bill':'btn-print'}" onclick="v47Fx(true)">${on?'✅ ':''}Grafica 3D accesa</button><button class="btn-main ${on?'btn-print':'btn-bill'}" onclick="v47Fx(false)">${on?'':'✅ '}Come prima</button></div>
<div style="font-weight:900;margin:12px 0 6px;">🔊 Prova i suoni nuovi</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><button class="btn-main btn-print" onclick="v47Snd('sala')">🛎️ Piatto pronto</button><button class="btn-main btn-print" onclick="v47Snd('cucina')">👨‍🍳 Nuova comanda</button><button class="btn-main btn-print" onclick="v47Snd('chiamata')">📟 Chiamata</button><button class="btn-main btn-print" onclick="v47Snd('ritardo')">⏰ Ritardo</button><button class="btn-main btn-print" onclick="v47Snd('soft')">🕒 Timbratura</button></div>`;}
setTimeout(drawOpt,1200);
{const _s=switchMainView;switchMainView=function(v){const r=_s.apply(this,arguments);if(v==='menuMgr')setTimeout(drawOpt,60);return r;};}
})();
}catch(e){console.error("chef-extra v2.9.47 grafica",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
/* ================= BIGLIETTO DA VISITA ================= */
const SK='alicetta_card_soc';
const soc=()=>{let o={};try{o=JSON.parse(localStorage.getItem(SK)||'{}')||{};}catch(e){}return{ig:o.ig||'alicettatrattoria',fb:o.fb||'https://www.facebook.com/share/14wr1teK7Dp/'};};
const clean=v=>String(v||'').trim().replace(/^(https?:\/\/)?(www\.|m\.)?(instagram|facebook)\.com\//i,'').replace(/^@/,'').replace(/[?#].*$/,'').replace(/\/+$/,'');
const base=()=>(typeof nfcBase==='function'?nfcBase():location.origin+location.pathname.replace(/[^/]*$/,''));
function cardUrl(){const s=soc(),q=[],ig=clean(s.ig),fb=clean(s.fb);if(ig)q.push('ig='+encodeURIComponent(ig).replace(/%2F/g,'/'));if(fb)q.push('fb='+encodeURIComponent(fb).replace(/%2F/g,'/'));return base()+'biglietto.html'+(q.length?'?'+q.join('&'):'');}
window.v47CardUrl=cardUrl;
function qr(){const b=$('bcQr');if(!b)return;b.innerHTML='';try{new QRCode(b,{text:cardUrl(),width:210,height:210,colorDark:'#14485A',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M});}catch(e){b.textContent='QR non disponibile offline';}const u=$('bcUrl');if(u)u.textContent=cardUrl();}
window.v47CardSoc=()=>{localStorage.setItem(SK,JSON.stringify({ig:($('bcIg')||{}).value||'',fb:($('bcFb')||{}).value||''}));qr();try{toast('✅ Link salvati nel biglietto');}catch(e){}};
window.v47CardNfc=async()=>{const st=$('bcSt');if(!('NDEFReader' in window)){st.style.color='#B91C1C';st.textContent='Questo telefono o questo browser non scrive i tag NFC: usa Chrome su Android con l’NFC acceso.';return;}
 try{st.style.color='#1D4ED8';st.textContent='📡 Avvicina la tessera o l’adesivo NFC al retro del telefono…';const r=new NDEFReader();await r.write({records:[{recordType:'url',data:cardUrl()}]});st.style.color='#166534';st.textContent='✅ Scritto! Ora chi avvicina il telefono a questo tag apre il tuo biglietto.';if(navigator.vibrate)try{navigator.vibrate(200);}catch(e){}}
 catch(e){st.style.color='#B91C1C';st.textContent='Non sono riuscito a scrivere: '+((e&&e.name==='NotAllowedError')?'consenti l’NFC a Chrome e riprova.':(e&&e.message)||'riprova tenendo il tag fermo.');}};
window.v47CardShare=async()=>{const u=cardUrl(),txt='Christian Carafa – Alicetta Trattoria, Fossacesia. Il mio biglietto da visita:';if(navigator.share){try{await navigator.share({title:'Christian Carafa – Alicetta Trattoria',text:txt,url:u});return;}catch(e){if(e&&e.name==='AbortError')return;}}window.open('https://wa.me/?text='+encodeURIComponent(txt+' '+u),'_blank');};
window.v47Card=()=>{let ov=$('bcModal');if(!ov){ov=document.createElement('div');ov.id='bcModal';ov.className='modal-overlay';ov.onclick=e=>{if(e.target===ov)ov.classList.remove('active');};document.body.appendChild(ov);}
 const s=soc();
 ov.innerHTML=`<div class="receipt-box" style="text-align:center;">
<div style="border-radius:16px;overflow:hidden;text-align:left;color:#0F2F38;background:#8CC0D4;box-shadow:0 5px 0 #5E93A8,0 12px 22px rgba(20,72,90,.3);margin-bottom:12px;"><img src="data:image/jpeg;base64,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" alt="Alicetta Trattoria" style="display:block;width:100%;height:auto;"><div style="padding:2px 16px 12px;"><div style="width:34px;height:3px;border-radius:3px;background:#D96C4E;margin:0 0 8px;"></div><div style="font-weight:900;">Christian Carafa</div><div style="font-weight:700;font-size:.8rem;color:#2F5866;">Titolare · +39 392 327 9000</div></div></div>
<div style="font-size:.86rem;font-weight:800;margin-bottom:8px;">Fai inquadrare questo codice al cliente</div>
<div id="bcQr" style="display:flex;justify-content:center;margin-bottom:6px;background:#fff;padding:8px;border-radius:14px;width:max-content;margin-left:auto;margin-right:auto;"></div>
<div id="bcUrl" style="font-size:.66rem;color:#6B7280;word-break:break-all;margin-bottom:10px;"></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><button class="btn-main btn-bill" onclick="v47CardShare()">📤 Invia il link</button><button class="btn-main btn-print" onclick="window.open(v47CardUrl(),'_blank')">👀 Apri</button></div>
<button class="btn-main btn-print" style="width:100%;margin-top:8px;" onclick="v47CardNfc()">📡 Scrivi su tessera o adesivo NFC</button>
<div id="bcSt" style="font-size:.8rem;font-weight:800;margin-top:6px;min-height:1.1em;"></div>
<div class="fc-sub" style="text-align:left;margin-top:6px;">Da telefono a telefono l’NFC non passa più (Android l’ha tolto). Con una tessera o un adesivo NFC scritto una volta, al cliente basta avvicinare il telefono.</div>
<details style="text-align:left;margin-top:10px;"><summary style="font-weight:900;cursor:pointer;">🔗 Instagram e Facebook di Alicetta</summary>
<div class="fc-sub" style="margin:6px 0;">Incolla i link delle pagine del locale: compaiono come tasti nel biglietto.</div>
<input id="bcIg" class="form-control" style="margin-bottom:6px;" placeholder="Link o nome Instagram" value="${esc(s.ig||'')}">
<input id="bcFb" class="form-control" style="margin-bottom:8px;" placeholder="Link o nome Facebook" value="${esc(s.fb||'')}">
<button class="btn-main btn-print" style="width:100%;" onclick="v47CardSoc()">💾 Salva i link</button></details>
<button class="btn-modal" style="background:#334155;color:#fff;width:100%;margin-top:12px;" onclick="document.getElementById('bcModal').classList.remove('active')">Chiudi</button></div>`;
 ov.classList.add('active');qr();};
{const _q=showQrModal;showQrModal=function(){const r=_q.apply(this,arguments);try{const ov=$('qrModal'),box=ov&&ov.classList.contains('active')&&ov.querySelector('.receipt-box');if(box&&!box.querySelector('.v47bc')){const b=document.createElement('button');b.className='btn-main btn-bill v47bc';b.style.cssText='width:100%;margin-top:10px;';b.innerHTML='💼 Il mio biglietto da visita';b.onclick=()=>{ov.classList.remove('active');v47Card();};const nfc=[...box.querySelectorAll('button')].find(x=>/Tag NFC per tavoli/.test(x.textContent));if(nfc)nfc.after(b);else box.appendChild(b);}}catch(e){}return r;};}
})();
}catch(e){console.error("chef-extra v2.9.47 biglietto",e);}
try{
(function(){
const $=id=>document.getElementById(id);
const F=['rs','piva','cf','addr','cap','city','prov','sdi','pec','email'];
const st=t=>{const e=$('invSt');if(e)e.textContent=t;};
function fill(o,src){let n=0;F.forEach(k=>{const v=String(o[k]||'').trim(),el=$('inv_'+k);if(v&&el){el.value=v;n++;}});
 if(o.importo){const nt=$('inv_note');if(nt&&!/Importo indicato/.test(nt.value))nt.value=(nt.value?nt.value+' · ':'')+'Importo indicato dal cliente: € '+o.importo;}
 st(n?`✅ ${src}: compilati ${n} campi. Controllali prima di salvare.`:`⚠️ ${src}: non ho trovato dati utili, scrivili a mano.`);
 try{const w=invWarnings(invRead()),iw=$('invWarn');if(iw)iw.textContent=w.length?'⚠️ '+w.join(' · '):'';invCheck();}catch(e){}return n;}
/* lettura del testo senza intelligenza artificiale */
function parse(raw){const T=String(raw||'').replace(/\r/g,'').replace(/[*_~]/g,''),L=T.split('\n').map(s=>s.trim()).filter(Boolean),o={};
 let m=T.match(/(?:p\.?\s*iva|partita\s*iva|vat)[^\d]{0,20}(?:IT)?\s?(\d{11})\b/i)||T.match(/\b(?:IT)?(\d{11})\b/);if(m)o.piva=m[1];
 m=T.match(/(?:c\.?\s*f\.?|cod(?:ice)?\.?\s*fisc(?:ale)?)[^A-Z0-9]{0,12}([A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z])/i);if(m)o.cf=m[1].toUpperCase();
 else if(o.piva&&/p\.?\s*iva\s*(?:e|\/|&)\s*c\.?\s*f/i.test(T))o.cf=o.piva;
 m=T.match(/(?:codice\s*(?:univoco|destinatario|sdi)|cod\.?\s*(?:univ|dest)\w*\.?|\bsdi\b|\bcud\b)[\s:.\-]*([A-Z0-9]{7})\b/i);if(m)o.sdi=m[1].toUpperCase();
 const mails=(T.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g)||[]).map(x=>x.replace(/[.,;]+$/,''));
 const pec=mails.find(x=>/pec|legalmail|postacert|arubapec|cert\./i.test(x))||((T.match(/\bpec\b[\s:.\-]*([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/i)||[])[1]);if(pec)o.pec=pec;
 const em=mails.find(x=>x!==pec);if(em)o.email=em;
 for(const l of L){const c=l.match(/\b(\d{5})\s*[-,]?\s*([A-Za-zÀ-ÿ'][A-Za-zÀ-ÿ' .-]*?)\s*[\(,-]?\s*\b([A-Za-z]{2})\b\)?\s*$/);if(c&&!/p\.?\s*iva|codice|c\.?f/i.test(l)){o.cap=c[1];o.city=c[2].trim().replace(/\s+/g,' ');o.prov=c[3].toUpperCase();break;}}
 const A=L.find(l=>/^(via|v\.le|viale|v\.|piazza|p\.zza|p\.za|piazzale|corso|c\.so|largo|strada|str\.|località|loc\.|contrada|c\.da|vicolo|borgo|lungomare|frazione|fraz\.)\s/i.test(l));if(A)o.addr=A.replace(/\s*[-,]\s*\d{5}.*$/,'').trim();
 const RS=L.find(l=>/\b(s\.?\s?r\.?\s?l\.?s?|s\.?\s?p\.?\s?a\.?|s\.?\s?n\.?\s?c\.?|s\.?\s?a\.?\s?s\.?|soc\.|societ[àa]|ditta|studio|coop\w*|impresa|associazione|onlus)\b/i.test(l)&&!/@/.test(l));
 o.rs=(RS||L.find(l=>!/\d{5}|@|p\.?\s*iva|codice|c\.?f\.?|euro|€|^(via|viale|piazza|corso)\b/i.test(l))||'').replace(/^(ragione\s*sociale|intestat\w*\s*a|fattura\s*a)[\s:.-]*/i,'').trim();
 m=T.match(/(?:euro|€|importo|totale)\s*[:.]?\s*(\d+(?:[.,]\d{1,2})?)/i)||T.match(/(\d+(?:[.,]\d{1,2})?)\s*(?:euro|€)/i);if(m)o.importo=m[1].replace('.',',');
 return o;}
window.v49Parse=parse;{const s=document.createElement('style');s.textContent='body.dark #invSt{color:#CBD5E1!important}';document.head.appendChild(s);}
const PROMPT_WA='Questa è una schermata di una chat WhatsApp (o di un messaggio) dove un cliente ha scritto i dati della sua azienda per ricevere una fattura elettronica italiana. Ignora il numero di telefono e il nome nella barra in alto della chat, gli orari dei messaggi e i messaggi che non contengono dati aziendali. Rispondi SOLO con un oggetto JSON con queste chiavi stringa: rs (ragione sociale), piva (solo 11 cifre, senza IT), cf, addr (via e numero civico), cap, city, prov (sigla 2 lettere), sdi (codice destinatario o codice univoco, 7 caratteri), pec, email, importo (l’importo in euro se il cliente lo ha scritto, altrimenti stringa vuota). Se un dato non è scritto metti stringa vuota: NON inventare niente. Se è scritto "P.IVA e CF" lo stesso numero vale per tutti e due.';
const PROMPT_TXT='Dal testo qui sotto estrai i dati aziendali per una fattura elettronica italiana. Rispondi SOLO con un oggetto JSON con queste chiavi stringa: rs, piva (11 cifre senza IT), cf, addr, cap, city, prov (2 lettere), sdi (7 caratteri), pec, email, importo. Se un dato manca metti stringa vuota, non inventare. Se è scritto "P.IVA e CF" lo stesso numero vale per tutti e due.\n\nTESTO:\n';
const jget=t=>JSON.parse(t.slice(t.indexOf('{'),t.lastIndexOf('}')+1));
window.v49Shot=async inp=>{const f=inp.files&&inp.files[0];inp.value='';if(!f)return;if(!getGeminiKey()){st('⚠️ Per leggere lo screenshot serve la chiave Gemini (⚙️ Opzioni). Usa “Incolla messaggio”: funziona anche senza.');return;}
 const L='💬 Lettura screenshot WhatsApp';window._jobLabel=L;st('⏳ Leggo lo screenshot di WhatsApp…');
 try{const b64=await shrinkImage(f,1400);const o=jget(await callGemini([{text:PROMPT_WA},{inline_data:{mime_type:'image/jpeg',data:b64}}],true,{fast:true,timeout:45000}));fill(o,'Screenshot letto');}
 catch(e){st('❌ Lettura non riuscita: '+(e.message||e)+'. Prova con “Incolla messaggio”.');}
 finally{setTimeout(()=>{if(window._jobLabel===L)window._jobLabel='';},2500);}};
window.v49PasteOpen=async()=>{const b=$('v49Box');if(!b)return;b.style.display='block';const ta=$('v49Txt');try{if(navigator.clipboard&&navigator.clipboard.readText){const c=await navigator.clipboard.readText();if(c&&c.trim()&&!ta.value)ta.value=c.trim();}}catch(e){}ta.focus();};
window.v49PasteGo=async()=>{const ta=$('v49Txt'),txt=(ta&&ta.value||'').trim();if(!txt){st('Incolla prima il messaggio del cliente nel riquadro.');return;}
 const o=parse(txt);const n=fill(o,'Messaggio letto');
 if((!o.rs||!o.piva||!o.sdi&&!o.pec)&&getGeminiKey()){st('⏳ Completo i dati mancanti…');try{const g=jget(await callGemini([{text:PROMPT_TXT+txt.slice(0,3000)}],true,{fast:true,timeout:30000}));const add={};F.forEach(k=>{const el=$('inv_'+k);if(g[k]&&el&&!el.value.trim())add[k]=g[k];});if(!o.importo&&g.importo)add.importo=g.importo;fill(Object.assign({},add),'Messaggio letto');}catch(e){if(!n)st('❌ Non sono riuscito a leggerlo: scrivi i dati a mano.');}}};
function inject(){const ov=$('invModal');if(!ov||!ov.classList.contains('active'))return;const box=ov.querySelector('.receipt-box');if(!box||box.querySelector('.v49row'))return;const grid=box.querySelector('label.btn-main')&&box.querySelector('label.btn-main').parentElement;
 const html=`<div class="v49row" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;"><label class="btn-main" style="display:block;text-align:center;cursor:pointer;font-size:.9rem;background:#25D366;color:#063A1E;">💬 Screenshot<br><span style="font-size:.72rem;">di WhatsApp</span><input type="file" accept="image/*" style="display:none;" onchange="v49Shot(this)"></label><button class="btn-main" style="font-size:.9rem;background:#E0F2FE;color:#075985;line-height:1.25;" onclick="v49PasteOpen()">📋 Incolla<br><span style="font-size:.72rem;">il messaggio</span></button></div>
<div id="v49Box" style="display:none;margin-bottom:8px;"><textarea id="v49Txt" class="form-control" rows="5" placeholder="Tieni premuto qui e scegli Incolla: il messaggio del cliente con i dati dell’azienda"></textarea><button class="btn-main btn-bill" style="width:100%;margin-top:6px;" onclick="v49PasteGo()">✨ Compila i campi</button></div>`;
 if(grid)grid.insertAdjacentHTML('afterend',html);else box.querySelector('h3').insertAdjacentHTML('afterend',html);}
new MutationObserver(()=>{try{inject();}catch(e){}}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
})();
}catch(e){console.error("chef-extra v2.9.49",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const r2=n=>Math.round((Number(n)||0)*100)/100;const f2=n=>r2(n).toFixed(2);
const x=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
const cut=(s,n)=>String(s||'').replace(/\s+/g,' ').trim().slice(0,n);
const owner=()=>/^christian$/i.test((state.waiterName||'').trim());
/* dati della società (dalla visura camerale) */
const CED={den:'CADIMA S.N.C. DI CARAFA CHRISTIAN E DI MASCIO ALICE',piva:'02446950699',ind:'VIA MARINA',civ:'25',cap:'66026',com:'ORTONA',prov:'CH',reaUff:'CH',reaN:'179642',email:'alicettatrattoria@gmail.com',locale:'Alicetta Trattoria, Via Lungomare 148, 66022 Fossacesia (CH)'};
function cfg(){const c=state.staffCfg=state.staffCfg||{};c.fe=c.fe||{};const f=c.fe;if(!f.start)f.start={'2026':3};if(!f.rf)f.rf='RF01';if(f.iva==null)f.iva=10;if(f.ivaCop==null||(f.ivaCop==22&&!f.ivaCopSet))f.ivaCop=f.iva;if(!f.prog)f.prog=0;return f;}
const pd=n=>String(n).padStart(2,'0');const iso=d=>d.getFullYear()+'-'+pd(d.getMonth()+1)+'-'+pd(d.getDate());
const dmy=s=>String(s||'').split('-').reverse().join('/');
function nextNum(y){const f=cfg();let m=Number(f.start[y])||0;(state.historyLog||[]).forEach(e=>{const v=e&&e.invoice;if(v&&v.feY==y&&Number(v.feN)>m)m=Number(v.feN);});return m+1;}
const find=ts=>(state.historyLog||[]).find(e=>e&&e.ts===Number(ts));
function check(d){const m=[];if(!d.rs)m.push('ragione sociale');if(!d.piva&&!d.cf)m.push('Partita IVA o codice fiscale');if(!d.addr)m.push('indirizzo');if(!/^\d{5}$/.test(d.cap||''))m.push('CAP (5 cifre)');if(!d.city)m.push('città');if(d.piva&&!/^\d{11}$/.test(d.piva))m.push('Partita IVA di 11 cifre');if(d.sdi&&!/^[A-Z0-9]{7}$/i.test(d.sdi))m.push('codice SDI di 7 caratteri');return m;}
function split(e){const f=cfg(),T=r2(e.total),isC=i=>i&&(i.cat==='1 Coperto'||/coperto/i.test(i.name||''));const it=e.items||[];const all=it.reduce((s,i)=>s+(Number(i.qty)||0)*(Number(i.price)||0),0),c=it.filter(isC).reduce((s,i)=>s+(Number(i.qty)||0)*(Number(i.price)||0),0);
 const aF=Number(f.iva)||10,aC=f.ivaCop!=null?Number(f.ivaCop):aF,copG=(all>0&&aC!==aF)?r2(Math.min(T,c*T/all)):0,food=r2(T-copG);const L=[];
 if(food>0){const im=r2(food/(1+aF/100));L.push({al:aF,gross:food,imp:im,iva:r2(food-im),kind:'food'});}if(copG>0){const im=r2(copG/(1+aC/100));L.push({al:aC,gross:copG,imp:im,iva:r2(copG-im),kind:'cop'});}
 const R={};L.forEach(l=>{const k=l.al.toFixed(2);R[k]=R[k]||{al:l.al,imp:0,iva:0};R[k].imp=r2(R[k].imp+l.imp);R[k].iva=r2(R[k].iva+l.iva);});return{T,L,R:Object.values(R)};}
window.v50Split=split;
function build(e,num,y,day,prog){const f=cfg(),d=e.invoice,S=split(e),T=S.T;
 const piva=String(d.piva||'').replace(/^IT/i,'').replace(/\s/g,''),cf=String(d.cf||'').toUpperCase().replace(/\s/g,''),sdi=String(d.sdi||'').toUpperCase().replace(/\s/g,'');
 const cod=/^[A-Z0-9]{7}$/.test(sdi)?sdi:'0000000';const pec=cod==='0000000'&&d.pec?d.pec:'';
 const sd=svcDate(e)||iso(new Date(e.ts||Date.now()));const cop=(e.items||[]).filter(i=>i.cat==='1 Coperto'||/coperto/i.test(i.name||'')).reduce((s,i)=>s+(Number(i.qty)||0),0)||Number(e.coperti)||0;
 const desc=cut(`Somministrazione di alimenti e bevande del ${dmy(sd)}`,1000);
 const p=e.pay||{},pays=[];const card=r2(p.card),cash=r2(p.cash);
 if(card>0&&cash>0){pays.push(['MP08',card],['MP01',r2(T-card)]);}else pays.push([p.m==='contanti'?'MP01':'MP08',T]);
 const caus=[`Corrispettivo già incassato il ${dmy(sd)} presso ${CED.locale}`];
 return `<?xml version="1.0" encoding="UTF-8"?>
<p:FatturaElettronica versione="FPR12" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:p="http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2 http://www.fatturapa.gov.it/export/fatturazione/sdi/fatturapa/v1.2/Schema_del_file_xml_FatturaPA_versione_1.2.xsd">
<FatturaElettronicaHeader>
<DatiTrasmissione><IdTrasmittente><IdPaese>IT</IdPaese><IdCodice>${CED.piva}</IdCodice></IdTrasmittente><ProgressivoInvio>${prog}</ProgressivoInvio><FormatoTrasmissione>FPR12</FormatoTrasmissione><CodiceDestinatario>${cod}</CodiceDestinatario>${pec?`<PECDestinatario>${x(cut(pec,256))}</PECDestinatario>`:''}</DatiTrasmissione>
<CedentePrestatore><DatiAnagrafici><IdFiscaleIVA><IdPaese>IT</IdPaese><IdCodice>${CED.piva}</IdCodice></IdFiscaleIVA><CodiceFiscale>${CED.piva}</CodiceFiscale><Anagrafica><Denominazione>${x(CED.den)}</Denominazione></Anagrafica><RegimeFiscale>${x(f.rf)}</RegimeFiscale></DatiAnagrafici><Sede><Indirizzo>${CED.ind}</Indirizzo><NumeroCivico>${CED.civ}</NumeroCivico><CAP>${CED.cap}</CAP><Comune>${CED.com}</Comune><Provincia>${CED.prov}</Provincia><Nazione>IT</Nazione></Sede><IscrizioneREA><Ufficio>${CED.reaUff}</Ufficio><NumeroREA>${CED.reaN}</NumeroREA><StatoLiquidazione>LN</StatoLiquidazione></IscrizioneREA><Contatti><Email>${x(CED.email)}</Email></Contatti></CedentePrestatore>
<CessionarioCommittente><DatiAnagrafici>${piva?`<IdFiscaleIVA><IdPaese>IT</IdPaese><IdCodice>${piva}</IdCodice></IdFiscaleIVA>`:''}${cf?`<CodiceFiscale>${x(cf)}</CodiceFiscale>`:''}<Anagrafica><Denominazione>${x(cut(d.rs,80))}</Denominazione></Anagrafica></DatiAnagrafici><Sede><Indirizzo>${x(cut(d.addr,60))}</Indirizzo><CAP>${x(d.cap)}</CAP><Comune>${x(cut(d.city,60))}</Comune>${/^[A-Z]{2}$/i.test(d.prov||'')?`<Provincia>${x(String(d.prov).toUpperCase())}</Provincia>`:''}<Nazione>IT</Nazione></Sede></CessionarioCommittente>
</FatturaElettronicaHeader>
<FatturaElettronicaBody>
<DatiGenerali><DatiGeneraliDocumento><TipoDocumento>TD01</TipoDocumento><Divisa>EUR</Divisa><Data>${day}</Data><Numero>${num}/${y}</Numero><ImportoTotaleDocumento>${f2(T)}</ImportoTotaleDocumento>${caus.map(c=>`<Causale>${x(cut(c,200))}</Causale>`).join('')}</DatiGeneraliDocumento></DatiGenerali>
<DatiBeniServizi>${S.L.map((l,i)=>`<DettaglioLinee><NumeroLinea>${i+1}</NumeroLinea><Descrizione>${x(l.kind==='cop'?cut('Coperto'+(cop?' ('+cop+(cop===1?' persona)':' persone)'):''),1000):desc)}</Descrizione><Quantita>1.00</Quantita><PrezzoUnitario>${f2(l.imp)}</PrezzoUnitario><PrezzoTotale>${f2(l.imp)}</PrezzoTotale><AliquotaIVA>${f2(l.al)}</AliquotaIVA></DettaglioLinee>`).join('')}${S.R.map(r=>`<DatiRiepilogo><AliquotaIVA>${f2(r.al)}</AliquotaIVA><ImponibileImporto>${f2(r.imp)}</ImponibileImporto><Imposta>${f2(r.iva)}</Imposta><EsigibilitaIVA>I</EsigibilitaIVA></DatiRiepilogo>`).join('')}</DatiBeniServizi>
<DatiPagamento><CondizioniPagamento>TP02</CondizioniPagamento>${pays.map(([m,a])=>`<DettaglioPagamento><ModalitaPagamento>${m}</ModalitaPagamento><ImportoPagamento>${f2(a)}</ImportoPagamento></DettaglioPagamento>`).join('')}</DatiPagamento>
</FatturaElettronicaBody>
</p:FatturaElettronica>`;}
window.v50Build=build;
function fileOf(v){return `IT${CED.piva}_${v.feProg}.xml`;}
function blobOf(e){const v=e.invoice;return new Blob([build(e,v.feN,v.feY,v.feDay,v.feProg)],{type:'application/xml'});}
function download(e){const b=blobOf(e),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=fileOf(e.invoice);document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),5000);}
window.v50Make=async ts=>{const e=find(ts);if(!e||!e.invoice)return;const d=e.invoice;const miss=check(d);if(miss.length)return alert('Per la fattura elettronica manca: '+miss.join(', ')+'.\nCorreggi i dati del cliente e riprova.');
 if(!d.feN){const f=cfg(),now=new Date(),y=String(now.getFullYear()),n=nextNum(y);
  if(!confirm(`Creo la fattura n. ${n}/${y} del ${now.toLocaleDateString('it-IT')}\nper ${d.rs}, totale € ${formatPrice(e.total||0)} (IVA ${f.ivaCop!=null&&f.ivaCop!=f.iva?'pasti '+f.iva+'%, coperto '+f.ivaCop+'%':f.iva+'% inclusa'})?`))return;
  f.prog=(Number(f.prog)||0)+1;d.feN=n;d.feY=y;d.feDay=iso(now);d.feProg=f.prog.toString(36).toUpperCase().padStart(5,'0');d.feAt=Date.now();d.feBy=state.waiterName||'';
  try{await saveState(false,{history:true,staff:true});}catch(x){}}
 download(e);try{renderInvList();}catch(z){}v50Show(ts);};
window.v50Share=async ts=>{const e=find(ts);if(!e||!e.invoice||!e.invoice.feN)return;try{const file=new File([blobOf(e)],fileOf(e.invoice),{type:'application/xml'});if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:'Fattura '+e.invoice.feN+'/'+e.invoice.feY});return;}}catch(x){if(x&&x.name==='AbortError')return;}download(e);};
window.v50Again=ts=>{const e=find(ts);if(e)download(e);};
window.v50Show=ts=>{const e=find(ts);if(!e)return;const v=e.invoice,f=cfg(),S=split(e),T=S.T;
 let ov=$('feModal');if(!ov){ov=document.createElement('div');ov.id='feModal';ov.className='modal-overlay';ov.onclick=ev=>{if(ev.target===ov)ov.classList.remove('active');};document.body.appendChild(ov);}
 ov.innerHTML=`<div class="receipt-box"><h3 style="color:var(--logo-coral);margin-bottom:4px;">📄 Fattura n. ${v.feN}/${v.feY}</h3><div class="fc-sub" style="margin-bottom:8px;">del ${dmy(v.feDay)} · file ${esc(fileOf(v))}</div>
<div style="border-radius:12px;padding:10px;background:rgba(14,165,183,.1);font-size:.86rem;line-height:1.5;margin-bottom:10px;"><b>${esc(v.rs)}</b><br>${S.R.map(r=>`IVA ${r.al}%: imponibile € ${formatPrice(r.imp)} · IVA € ${formatPrice(r.iva)}`).join('<br>')}<br><b>Totale € ${formatPrice(T)}</b></div>
<div style="font-weight:900;margin-bottom:6px;">Adesso trasmettila all'Agenzia delle Entrate</div>
<ol style="font-size:.84rem;line-height:1.45;padding-left:18px;margin:0 0 10px;"><li>Il file è nei <b>Download</b> del telefono.</li><li>Apri <b>Fatture e Corrispettivi</b> ed entra con lo SPID.</li><li><b>Fatturazione elettronica → Trasmissione → Trasmetti un file</b> e scegli il file ${esc(fileOf(v))}.</li><li>Dopo qualche minuto, in “Fatture emesse” vedi la ricevuta di consegna. Poi tocca ✅ Emessa.</li></ol>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><button class="btn-main btn-bill" onclick="window.open('https://ivaservizi.agenziaentrate.gov.it/portale/','_blank')">🌐 Fatture e Corrispettivi</button><button class="btn-main btn-print" onclick="v50Share(${e.ts})">📤 Condividi file</button><button class="btn-main btn-print" onclick="v50Again(${e.ts})">⬇️ Scarica di nuovo</button><button class="btn-main" style="background:#16A34A;color:#fff;" onclick="document.getElementById('feModal').classList.remove('active');invDone(${e.ts})">✅ Emessa</button></div>
<button class="btn-modal" style="background:#334155;color:#fff;width:100%;margin-top:10px;" onclick="document.getElementById('feModal').classList.remove('active')">Chiudi</button></div>`;ov.classList.add('active');};
window.v50Cfg=()=>{const f=cfg(),y=String(new Date().getFullYear());const a=prompt(`Ultimo numero di fattura emesso nel ${y} prima di questa app (anche con SumUp):`,String(f.start[y]||0));if(a===null)return;const n=parseInt(a,10);if(!(n>=0))return alert('Scrivi un numero, per esempio 3.');f.start[y]=n;
 const r=prompt('Regime fiscale (RF01 = ordinario; chiedi al commercialista se è diverso):',f.rf||'RF01');if(r!==null&&/^RF\d{2}$/i.test(r.trim()))f.rf=r.trim().toUpperCase();
 const i=prompt('Aliquota IVA di cibo e bevande in %:',String(f.iva));const ic=prompt('Aliquota IVA del coperto in %:',String(f.ivaCop));if(ic!==null&&Number(ic.replace(',','.'))>=0){f.ivaCop=Number(ic.replace(',','.'));f.ivaCopSet=1;}if(i!==null&&Number(i.replace(',','.'))>=0)f.iva=Number(i.replace(',','.'));
 saveState(false,{staff:true});try{renderInvList();}catch(e){}};
{const _r=renderInvList;renderInvList=function(){const r=_r.apply(this,arguments);try{if(!owner())return r;const el=$('invList');if(!el||el.style.display==='none')return r;const y=String(new Date().getFullYear()),f=cfg();
 const h=el.querySelector('h3');if(h&&!el.querySelector('.fe-bar')){h.insertAdjacentHTML('afterend',`<div class="fe-bar" style="display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:.78rem;font-weight:800;margin:0 0 8px;padding:8px 10px;border-radius:12px;background:rgba(14,165,183,.12);"><span>📄 Prossima fattura: <b>${nextNum(y)}/${y}</b> · IVA ${f.ivaCop!=null&&f.ivaCop!=f.iva?'pasti '+f.iva+'% · coperto '+f.ivaCop+'%':f.iva+'% su tutto'} · ${esc(f.rf)}</span><button class="btn-note" onclick="v50Cfg()">⚙️ Cambia</button></div>`);}
 el.querySelectorAll('button[onclick^="invCopy("]').forEach(b=>{const ts=(b.getAttribute('onclick').match(/invCopy\((\d+)\)/)||[])[1],e=find(ts);if(!e||!e.invoice||b.parentElement.querySelector('.fe-btn'))return;
  const n=document.createElement('button');n.className='btn-note fe-btn';n.style.cssText='background:#0E5563;color:#fff;';
  if(e.invoice.feN){n.textContent='📄 Fattura '+e.invoice.feN+'/'+e.invoice.feY;n.onclick=()=>v50Show(e.ts);}else if(!e.invoice.done){n.textContent='📄 Crea fattura elettronica';n.onclick=()=>v50Make(e.ts);}else return;b.after(n);});}catch(x){console.error(x);}return r;};}
})();
}catch(e){console.error("chef-extra v2.9.50",e);}
try{
(function(){
const $=id=>document.getElementById(id);const pad=n=>String(n).padStart(2,'0');
const vst=t=>{const e=$('resMsgSt');if(e)e.innerHTML=t;};
const MESI=['gen','feb','mar','apr','mag','giu','lug','ago','set','ott','nov','dic'];
/* formato dei tuoi contatti: "Cliente Techi X 2 12 Nov 20.00" */
function contactParse(t){const s=String(t||'').replace(/\s+/g,' ').trim();
 const m=s.match(/(?:cliente\s+)?([A-Za-zÀ-ÿ'][A-Za-zÀ-ÿ' ]*?)\s+[xX×]\s*(\d{1,2})\s+(\d{1,2})\s+([A-Za-zÀ-ÿ]{3,9})\.?\s+(\d{1,2})[.:](\d{2})\b/i);if(!m)return null;
 const mi=MESI.indexOf(m[4].toLowerCase().slice(0,3));if(mi<0)return null;const d=+m[3],now=new Date();let y=now.getFullYear();
 if(new Date(y,mi,d)<new Date(y,now.getMonth(),now.getDate()-1))y++;
 const ph=s.match(/(\+?\d[\d\s]{8,}\d)/);
 return{nome:m[1].trim(),persone:+m[2],data:y+'-'+pad(mi+1)+'-'+pad(d),ora:pad(+m[5])+':'+m[6],telefono:ph?ph[1].replace(/[^\d+]/g,''):''};}
window.v52Contact=contactParse;
function setF(o){const s=(id,v)=>{const e=$(id);if(e&&v!=null&&v!=='')e.value=v;};s('rName',o.nome);s('rPhone',o.telefono?String(o.telefono).replace(/[^\d+]/g,''):'');
 if(/^\d{4}-\d{2}-\d{2}$/.test(o.data||''))s('rDate',o.data);else if(window.v41NoDate)v41NoDate();if(/^\d{2}:\d{2}$/.test(o.ora||''))s('rTime',o.ora);if(o.persone)s('rCov',o.persone);s('rNote',o.note);}
async function saveNow(){const n=(($('rName')||{}).value||'').trim(),c=parseInt((($('rCov')||{}).value||''),10);
 if(!n||!c){vst('⚠️ Non trovo '+[!n&&'il nome',!c&&'i coperti'].filter(Boolean).join(' e ')+': completa il modulo e premi “Salva”.');return false;}
 const before=new Set(Object.keys(state.res||{}));const info=`${n} · ${String(($('rDate')||{}).value||'').split('-').reverse().join('/')} ${($('rTime')||{}).value} · ${c} pers.`;
 await saveRes();const id=Object.keys(state.res||{}).find(k=>!before.has(k));
 if(id){window._lastResId=id;vst('✅ Prenotazione salvata: '+escH(info));try{toast('✅ Salvata: '+escH(info)+' · <u onclick="v33ResUndo()">Annulla</u>',7000);}catch(e){}return true;}
 vst('⚠️ Controlla il modulo e premi “Salva”.');return false;}
/* Gemini veloce: 3 modelli insieme, vince il primo che risponde, tempo massimo fisso */
async function quick(parts,ms){const k=getGeminiKey();if(!k)throw new Error('Serve la chiave Gemini in ⚙️ Opzioni.');if(!navigator.onLine)throw new Error('Sei offline: serve internet.');
 const all=(typeof GEMINI_MODELS!=='undefined'?GEMINI_MODELS:['gemini-flash-latest']).slice();const order=all.filter(m=>/lite/.test(m)).concat(all.filter(m=>!/lite/.test(m)));
 const ctl=new AbortController(),to=setTimeout(()=>ctl.abort(),ms),errs=[];
 const call=async(mdl,think)=>{const gc={temperature:0,maxOutputTokens:2048,responseMimeType:'application/json'};if(think)gc.thinkingConfig=/gemini-3/.test(mdl)?{thinkingLevel:'low'}:{thinkingBudget:0};
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+mdl+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':k},body:JSON.stringify({contents:[{parts}],generationConfig:gc}),signal:ctl.signal});
  const d=await r.json().catch(()=>({}));if(!r.ok){const e=new Error((d.error&&d.error.message)||('HTTP '+r.status));e.status=r.status;throw e;}
  const t=(((d.candidates||[])[0]||{}).content||{}).parts;const tx=(t||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();if(!tx){const e=new Error('risposta vuota');e.status=0;throw e;}return tx;};
 const one=async mdl=>{try{return await call(mdl,true);}catch(e){if(e.status===400&&!/API key|API_KEY/i.test(e.message)){try{return await call(mdl,false);}catch(e2){errs.push([mdl,e2]);throw e2;}}errs.push([mdl,e]);throw e;}};
 try{return await Promise.any(order.map(one));}
 catch(e){const S=errs.map(x=>x[1].status),M=errs.map(x=>String(x[1].message||'')).join(' | ');console.warn('Gemini errori:',errs.map(x=>x[0]+': '+(x[1].status||'')+' '+x[1].message));
  if(ctl.signal.aborted&&errs.length<order.length)throw new Error('Gemini non ha risposto in '+Math.round(ms/1000)+' secondi (internet lento o Gemini sovraccarico).');
  if(/API key not valid|API_KEY_INVALID|PERMISSION_DENIED/i.test(M))throw new Error('La chiave Gemini non è valida o è stata disattivata: controllala in ⚙️ Opzioni.');
  if(S.includes(429)||/quota|RESOURCE_EXHAUSTED|rate/i.test(M))throw new Error('Hai finito per adesso le richieste gratuite di Gemini (limite di Google, non dell’app). Riprova fra qualche minuto, oppure domani.');
  if(S.includes(503)||/overloaded|UNAVAILABLE/i.test(M))throw new Error('Gemini è sovraccarico in questo momento (problema di Google). Riprova fra qualche minuto.');
  throw new Error('Gemini ha risposto con un errore: '+M.slice(0,180));}
 finally{clearTimeout(to);ctl.abort();}}
window.v33WaShot=async inp=>{const f=inp.files&&inp.files[0];inp.value='';if(!f)return;if(!getGeminiKey())return vst('🔑 Serve la chiave Gemini in ⚙️ Opzioni.');
 const L='📅 Lettura prenotazione';window._jobLabel=L;vst('⏳ Leggo lo screenshot…');
 try{const b64=await shrinkImage(f,1000),d=new Date(),GG=['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'],iso=d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
  const r=await quick([{inline_data:{mime_type:'image/jpeg',data:b64}},{text:`Oggi è ${iso} (${GG[d.getDay()]}). Questo è uno screenshot con la richiesta di prenotazione di un cliente di un ristorante. Può essere una chat WhatsApp (nome o numero del contatto in alto) oppure la scheda "Aggiungi ai contatti" o una rubrica. NELLA RUBRICA il campo Nome è scritto così: "Cliente <Nome> X <persone> <giorno> <mese> <ora>", per esempio "Cliente Techi X 2 12 Nov 20.00" significa nome Techi, 2 persone, 12 novembre, ore 20:00; il telefono è il numero mostrato. Rispondi SOLO JSON: {"nome":string|null,"telefono":string|null,"data":"YYYY-MM-DD"|null,"ora":"HH:MM"|null,"persone":number|null,"note":string|null}. In una chat: "stasera"/"oggi" = oggi, "domani" = domani, un giorno della settimana = il prossimo con quel nome; "alle 8" di sera = 20:00. Nelle note solo richieste utili (allergie, seggiolone, esterno, compleanno), brevi. Se l'anno manca usa il prossimo giorno futuro con quella data.`}],40000);
  const o=JSON.parse(r.slice(r.indexOf('{'),r.lastIndexOf('}')+1));setF(o);await saveNow();}
 catch(e){vst('❌ '+escH(e.message||e)+'<br>Prova così: copia il nome del contatto e tocca <b>⚡ Incolla e salva</b>: funziona subito, senza Gemini.');}
 finally{setTimeout(()=>{if(window._jobLabel===L)window._jobLabel='';},2500);}};
/* testo incollato nel formato dei contatti: lettura immediata, senza Gemini */
{const _p=window.v24Parse;if(_p)window.v24Parse=async function(){try{const ta=$('resMsg'),c=ta&&contactParse(ta.value);if(c){setF(c);vst('✅ Letto dal nome del contatto: controlla e salva.');return;}}catch(e){}return _p.apply(this,arguments);};}
})();
}catch(e){console.error("chef-extra v2.9.52",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const owner=()=>/^christian$/i.test((state.waiterName||'').trim());
const st=document.createElement('style');
st.textContent='#cuTabs{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;margin:0 0 12px;position:sticky;top:0;z-index:5;padding:6px 0;background:inherit}#cuTabs button{border:2px solid rgba(0,0,0,.12);border-radius:14px;background:#fff;color:#062329;font-weight:900;padding:9px 1px;font-size:.68rem;line-height:1.15}#cuTabs button b{display:block;font-size:1.25rem}#cuTabs button.on{background:#7C3AED;color:#fff;border-color:#fff}body.dark #cuTabs button:not(.on){background:#1E293B;color:#E2E8F0;border-color:#334155}.cu-hide{display:none!important}.cu-k{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0}.cu-k div{border-radius:12px;padding:8px 4px;text-align:center;font-weight:800;font-size:.72rem;background:rgba(124,58,237,.1)}.cu-k b{display:block;font-size:1.25rem}.bc-src{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-bottom:1px dashed var(--border);font-weight:800;font-size:.86rem}.bc-src input{width:22px;height:22px;flex:none;margin-top:1px}.bc-src small{display:block;font-weight:600;opacity:.75;font-size:.74rem}.bc-chip{border:2px solid #7C3AED;border-radius:999px;background:transparent;color:inherit;font-weight:800;padding:5px 10px;font-size:.76rem;margin:0 6px 6px 0}.bc-row{display:flex;justify-content:space-between;align-items:center;gap:6px;padding:6px 0;border-bottom:1px dashed var(--border);font-size:.82rem;font-weight:700}.bc-row.done{opacity:.5}.bc-row button{border:0;border-radius:9px;padding:5px 8px;font-weight:900;font-size:.74rem;background:rgba(0,0,0,.08);color:inherit}.bc-next{display:block;width:100%;border:0;border-radius:16px;padding:16px;font-weight:900;font-size:1.05rem;background:#25D366;color:#063A1E;margin:10px 0 6px}.bc-warn{border-radius:12px;padding:8px 10px;font-size:.78rem;font-weight:700;background:#FEF3C7;color:#78350F;margin:8px 0}';
document.head.appendChild(st);
/* ---------- sezione unica: Prenotazioni · Rubrica · Club · Messaggio a tutti ---------- */
const TABS=[['pren','📅','Prenota-<br>zioni'],['rub','📇','Rubrica'],['club','🎟️','Club'],['buoni','🎁','Buoni<br>regalo'],['bc','📣','Messaggio<br>a tutti']];
let TAB=localStorage.getItem('alicetta_cu_tab')||'pren';
const kind=el=>{if(el.id==='cuTabs')return'tabs';if(el.id==='cuClub')return'club';if(el.id==='cuBc')return'bc';const h=(el.querySelector('h3,summary')||el).textContent||'';if(/Rubrica clienti/.test(h)||el.id==='ctCard')return'rub';return'pren';};
function apply(){const host=$('resContent');if(!host)return;ensure(host);[...host.children].forEach(el=>{const k=kind(el);if(k==='tabs')return;el.classList.toggle('cu-hide',k!==TAB);if(k==='rub'&&TAB==='rub'){const d=el.matches('details')?el:el.querySelector('details');if(d&&!d.open)d.open=true;}});
 document.querySelectorAll('#cuTabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===TAB));if(TAB==='club')drawClub();if(TAB==='bc')drawBc();}
function ensure(host){if(!$('cuTabs')){const d=document.createElement('div');d.id='cuTabs';d.innerHTML=TABS.map(([k,i,l])=>`<button data-t="${k}" onclick="v54Tab('${k}')"><b>${i}</b>${l}</button>`).join('');host.prepend(d);}else if(host.firstElementChild!==$('cuTabs'))host.prepend($('cuTabs'));
 if(!$('cuClub')){const c=document.createElement('div');c.id='cuClub';c.className='cart-section';host.appendChild(c);}if(!$('cuBc')){const c=document.createElement('div');c.id='cuBc';c.className='cart-section';host.appendChild(c);}}
window.v54Tab=t=>{TAB=t;localStorage.setItem('alicetta_cu_tab',t);apply();window.scrollTo({top:0,behavior:'smooth'});};
{const _r=renderRes;renderRes=function(){const r=_r.apply(this,arguments);try{apply();}catch(e){}return r;};}
let aq=0;new MutationObserver(()=>{if(aq)return;aq=setTimeout(()=>{aq=0;try{if($('viewRes')&&$('viewRes').classList.contains('active')){const host=$('resContent');if(host&&[...host.children].some(el=>kind(el)!=='tabs'&&!el.classList.contains('cu-hide')&&kind(el)!==TAB))apply();}}catch(e){}},120);}).observe(document.body,{childList:true,subtree:true});
function label(){const b=$('navRes');const t=b&&b.querySelector('.nv-t');if(t&&t.textContent!=='Clienti'){t.textContent='Clienti';}}
setInterval(label,2000);label();
/* ---------- dati: Club + rubrica prenotazioni ---------- */
let CLUB=null,clubErr='';
async function loadClub(force){if(CLUB&&!force)return CLUB;try{const o=await fbGet('/fidelity/cards')||{};CLUB=Object.entries(o).map(([id,c])=>({id,...c}));clubErr='';}catch(e){clubErr=e.message||String(e);CLUB=CLUB||[];}return CLUB;}
const norm=p=>{let d=String(p||'').replace(/\D/g,'');if(d.startsWith('00'))d=d.slice(2);if(d.length===10&&d[0]==='3')d='39'+d;if((d.length===9||d.length===10)&&d[0]==='0')d='39'+d;return d.length>=11?d:'';};
const first=n=>{const w=String(n||'').trim().split(/\s+/)[0]||'';return w?w[0].toUpperCase()+w.slice(1).toLowerCase():'';};
function rubrica(){const M={};try{Object.values(JSON.parse(localStorage.getItem('alicetta_contacts')||'{}')||{}).forEach(c=>{const p=norm(c&&c.p);if(p)M[p]={n:c.n,p};});}catch(e){}
 Object.values(state.res||{}).forEach(r=>{const p=norm(r&&r.phone);if(p&&!M[p])M[p]={n:r.name,p};});return M;}
const STOP=()=>{const c=state.staffCfg=state.staffCfg||{};c.waStop=c.waStop||{};return c.waStop;};
/* ---------- Club ---------- */
async function drawClub(){const el=$('cuClub');if(!el)return;if(!el.dataset.ok){el.innerHTML='<h3>🎟️ Club</h3><div class="fc-sub">⏳ Carico i clienti del Club…</div>';}
 const L=await loadClub();el.dataset.ok='1';const mk=L.filter(c=>c.mkt).length,cal=L.reduce((s,c)=>s+Math.max(0,(c.earned||0)-(c.used||0)),0);
 el.innerHTML=`<h3 style="margin-bottom:4px;">🎟️ Club fedeltà</h3><div class="fc-sub">Ogni ${typeof FID_EUR!=='undefined'?FID_EUR:45} punti un calice di benvenuto (1 € = 1 punto). I clienti si iscrivono dal QR e scelgono se ricevere le promo.</div>
<div class="cu-k"><div>👥 Iscritti<b>${L.length}</b></div><div>📣 Accettano promo<b>${mk}</b></div><div>🥂 Calici da dare<b>${cal}</b></div></div>${clubErr?`<div class="bc-warn">⚠️ Non riesco a leggere il Club: ${esc(clubErr)}</div>`:''}
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><button class="btn-main btn-bill" onclick="openFidelity()">📒 Elenco clienti</button><button class="btn-main btn-print" onclick="showClubQr()">🎟️ QR del Club</button><button class="btn-main btn-print" onclick="openFidelity().then(()=>{try{fidNewForm();}catch(e){}})">➕ Nuovo cliente</button><button class="btn-main btn-print" onclick="v54Tab('bc')">📣 Scrivi a tutti</button></div>`;}
/* ---------- Messaggio a tutti ---------- */
const BK='alicetta_bc';const B=()=>{try{return JSON.parse(localStorage.getItem(BK)||'null')||{};}catch(e){return{};}};const Bs=o=>localStorage.setItem(BK,JSON.stringify(o));
const SRC=()=>{const o=B();return Object.assign({mk:true,nomk:false,rub:false},o.src||{});};
const TPL=[['🎉 Serata','Ciao {nome}! Venerdì sera da Alicetta serata speciale: … Prenota rispondendo a questo messaggio 🐟'],['🍽️ Menù','Ciao {nome}! Oggi a pranzo da Alicetta: … Ti aspettiamo!'],['🎂 Promo','Ciao {nome}! Per i soci del Club questo mese c’è …'],['📢 Avviso','Ciao {nome}, ti informiamo che Alicetta Trattoria resterà chiusa dal … al …']];
async function recipients(){const s=SRC(),M={},stop=STOP();if(s.mk||s.nomk){(await loadClub()).forEach(c=>{const p=norm(c.phone);if(!p)return;if(c.mkt?s.mk:s.nomk)M[p]={n:c.name,p,src:c.mkt?'Club ✓ promo':'Club'};});}
 if(s.rub)Object.values(rubrica()).forEach(c=>{if(!M[c.p])M[c.p]={n:c.n,p:c.p,src:'Rubrica'};});
 const all=Object.values(M);return{list:all.filter(c=>!stop[c.p]),stopped:all.filter(c=>stop[c.p]).length};}
const msgFor=(t,c,stopLine)=>(String(t||'').replace(/\{nome\}/g,first(c.n)||'').replace(/\s+([!,.])/g,'$1').trim()+(stopLine?'\n\nPer non ricevere più messaggi rispondi STOP.':''));
function waLink(p,text){const o=B(),app=o.app||'w4b',t=encodeURIComponent(text);if(app==='any')return 'https://wa.me/'+p+'?text='+t;
 const pkg=app==='w4b'?'com.whatsapp.w4b':'com.whatsapp';return `intent://send?phone=${p}&text=${t}#Intent;scheme=whatsapp;package=${pkg};S.browser_fallback_url=${encodeURIComponent('https://wa.me/'+p+'?text='+t)};end`;}
window.v54Src=(k,v)=>{const o=B();o.src=Object.assign(SRC(),{[k]:v});if((k==='nomk'||k==='rub')&&v&&!o.okServ){if(!confirm('Questi contatti NON hanno dato il consenso alle promozioni.\nPuoi scrivergli solo per comunicazioni di servizio (chiusure, cambi di orario, una prenotazione), non per pubblicità.\n\nConfermi che il messaggio è di servizio?')){o.src[k]=false;Bs(o);return drawBc();}o.okServ=1;}Bs(o);drawBc();};
window.v54Txt=v=>{const o=B();o.text=v;Bs(o);const pv=$('bcPrev');if(pv)pv.textContent=msgFor(v,{n:'Maria'},o.stopLine!==false);};
window.v54Tpl=i=>{const o=B();o.text=TPL[i][1];Bs(o);drawBc();};
window.v54Opt=(k,v)=>{const o=B();o[k]=v;Bs(o);drawBc();};
window.v54Start=async()=>{const o=B(),t=String(o.text||'').trim();if(t.length<5)return alert('Scrivi prima il messaggio.');const{list}=await recipients();if(!list.length)return alert('Nessun destinatario: scegli almeno un gruppo.');
 if(!confirm(`Preparo l’invio a ${list.length} ${list.length===1?'cliente':'clienti'}.\nPer ognuno si apre WhatsApp con il messaggio già scritto: tu tocchi solo “Invia” e torni qui.`))return;
 o.run={at:Date.now(),text:t,stopLine:o.stopLine!==false,list:list.map(c=>({n:c.n,p:c.p,st:''}))};Bs(o);drawBc();};
window.v54Next=()=>{const o=B(),R=o.run;if(!R)return;const c=R.list.find(x=>!x.st);if(!c){alert('✅ Inviato a tutti!');return;}c.st='inviato';c.at=Date.now();Bs(o);drawBc();location.href=waLink(c.p,msgFor(R.text,c,R.stopLine));};
window.v54Mark=(i,s)=>{const o=B(),R=o.run;if(!R||!R.list[i])return;const c=R.list[i];if(s==='stop'){if(!confirm(first(c.n)+' non vuole più messaggi? Lo tolgo da tutti gli invii futuri.'))return;STOP()[c.p]=Date.now();saveState(false,{staff:true});}c.st=s==='stop'?'STOP':s;Bs(o);drawBc();};
window.v54End=()=>{if(!confirm('Chiudere questo invio? Quelli non ancora inviati restano esclusi.'))return;const o=B();o.last={at:o.run.at,n:o.run.list.filter(x=>x.st==='inviato').length};delete o.run;Bs(o);drawBc();};
window.v54Vcf=async()=>{const{list}=await recipients();if(!list.length)return alert('Nessun destinatario.');const v=list.map(c=>['BEGIN:VCARD','VERSION:3.0','N:'+String(c.n||'').replace(/[;,]/g,' ')+';Cliente;;;','FN:Cliente '+String(c.n||'').replace(/[;,]/g,' '),'TEL;TYPE=CELL:+'+c.p,'END:VCARD'].join('\r\n')).join('\r\n');
 const b=new Blob([v],{type:'text/vcard'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='Clienti Alicetta ('+list.length+').vcf';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1500);};
window.v54Copy=()=>{const o=B();const t=msgFor(o.text,{n:''},o.stopLine!==false).replace(/^Ciao\s*[!,]\s*/,'Ciao! ');(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>{try{toast('📋 Messaggio copiato');}catch(e){}},()=>prompt('Copia il messaggio:',t));};
async function drawBc(){const el=$('cuBc');if(!el)return;if(!owner()){el.innerHTML='<h3>📣 Messaggio a tutti</h3><div class="fc-sub">Solo Christian può inviare messaggi ai clienti.</div>';return;}
 const o=B(),s=SRC(),R=o.run;
 if(R){const done=R.list.filter(x=>x.st).length,nx=R.list.find(x=>!x.st);
  el.innerHTML=`<h3 style="margin-bottom:4px;">📣 Invio in corso · ${done}/${R.list.length}</h3><div class="fc-sub">Tocca il tasto verde: si apre WhatsApp con il messaggio già pronto, tu premi Invia e torni qui per il prossimo.</div>
${nx?`<button class="bc-next" onclick="v54Next()">▶️ Invia a ${esc(first(nx.n)||'+'+nx.p)} (${done+1}/${R.list.length})</button>`:'<div class="bc-warn" style="background:#DCFCE7;color:#14532D;">✅ Finito: messaggio inviato a tutti.</div>'}
<div style="max-height:46vh;overflow:auto;">${R.list.map((c,i)=>`<div class="bc-row ${c.st?'done':''}"><span>${c.st==='inviato'?'✅':c.st==='saltato'?'⏭️':c.st==='STOP'?'🚫':'⬜'} ${esc(c.n||'')} <small style="opacity:.7">+${esc(c.p)}</small></span><span>${c.st?'':`<button onclick="v54Mark(${i},'saltato')">Salta</button>`} <button onclick="v54Mark(${i},'stop')" title="Non vuole messaggi">🚫</button></span></div>`).join('')}</div>
<button class="btn-main btn-print" style="width:100%;margin-top:10px;" onclick="v54End()">🏁 Chiudi questo invio</button>`;return;}
 el.innerHTML='<h3>📣 Messaggio a tutti</h3><div class="fc-sub">⏳ Preparo l’elenco…</div>';
 const CL=await loadClub(),mk=CL.filter(c=>c.mkt&&norm(c.phone)).length,nomk=CL.filter(c=>!c.mkt&&norm(c.phone)).length,clubP=new Set(CL.map(c=>norm(c.phone))),rub=Object.values(rubrica()).filter(c=>!clubP.has(c.p)).length;const{list,stopped}=await recipients();
 const app=o.app||'w4b',stopLine=o.stopLine!==false;
 el.innerHTML=`<h3 style="margin-bottom:4px;">📣 Messaggio a tutti</h3><div class="fc-sub">Scrivi un messaggio e mandalo ai tuoi clienti con WhatsApp Business, uno dopo l’altro con un tocco, oppure con una lista broadcast.</div>
<div style="font-weight:900;margin:12px 0 2px;">1 · A chi</div>
<label class="bc-src"><input type="checkbox" ${s.mk?'checked':''} onchange="v54Src('mk',this.checked)"><span>🎟️ Club che hanno accettato le promo (${mk})<small>Puoi mandare offerte, serate, novità.</small></span></label>
<label class="bc-src"><input type="checkbox" ${s.nomk?'checked':''} onchange="v54Src('nomk',this.checked)"><span>🎟️ Club senza consenso promo (${nomk})<small>Solo comunicazioni di servizio (chiusure, orari).</small></span></label>
<label class="bc-src"><input type="checkbox" ${s.rub?'checked':''} onchange="v54Src('rub',this.checked)"><span>📇 Rubrica prenotazioni, non iscritti al Club (${rub})<small>Solo comunicazioni di servizio.</small></span></label>
<div style="font-weight:800;margin:6px 0;">👥 Destinatari: ${list.length}${stopped?` · 🚫 ${stopped} esclusi perché hanno chiesto STOP`:''}${clubErr?` · ⚠️ Club non letto (${esc(clubErr)})`:''}</div>
<div style="font-weight:900;margin:12px 0 6px;">2 · Il messaggio</div>
<div>${TPL.map((t,i)=>`<button class="bc-chip" onclick="v54Tpl(${i})">${t[0]}</button>`).join('')}</div>
<textarea class="form-control" rows="5" placeholder="Ciao {nome}! …" oninput="v54Txt(this.value)">${esc(o.text||'')}</textarea>
<div class="fc-sub" style="margin:4px 0;">Scrivi <b>{nome}</b> e ognuno riceve il suo nome.</div>
<label class="bc-src" style="border:0;"><input type="checkbox" ${stopLine?'checked':''} onchange="v54Opt('stopLine',this.checked)"><span>Aggiungi in fondo “Per non ricevere più messaggi rispondi STOP”<small>Consigliato: protegge il tuo numero WhatsApp Business dalle segnalazioni.</small></span></label>
<div class="fc-sub" style="font-weight:800;">Anteprima:</div><div id="bcPrev" style="white-space:pre-wrap;border-radius:12px;padding:10px;background:#DCF8C6;color:#062329;font-size:.86rem;margin-bottom:6px;">${esc(msgFor(o.text,{n:'Maria'},stopLine))}</div>
<div style="font-weight:900;margin:12px 0 6px;">3 · Come inviarlo</div>
<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px;font-size:.8rem;font-weight:800;">Apri con: ${[['w4b','WhatsApp Business'],['wa','WhatsApp'],['any','Scegli ogni volta']].map(([k,l])=>`<button class="bc-chip" style="${app===k?'background:#7C3AED;color:#fff;':''}" onclick="v54Opt('app','${k}')">${l}</button>`).join('')}</div>
<button class="bc-next" onclick="v54Start()">▶️ Invio uno alla volta (${list.length})</button>
<div class="fc-sub">Ogni messaggio parte dal tuo WhatsApp Business ed è personale: lo ricevono tutti, anche chi non ha salvato il tuo numero.</div>
<details style="margin-top:10px;"><summary style="font-weight:900;cursor:pointer;">📋 Oppure con una lista broadcast di WhatsApp Business</summary><ol style="font-size:.82rem;line-height:1.45;padding-left:18px;"><li>Tocca <b>⬇️ Scarica i contatti</b> e apri il file: salva i ${list.length} clienti nella rubrica del telefono.</li><li>In WhatsApp Business: ⋮ → <b>Nuovo broadcast</b> → scegli i clienti (massimo 256 per lista).</li><li>Tocca <b>📋 Copia il messaggio</b> e incollalo nella lista.</li></ol><div class="bc-warn">La lista broadcast arriva <b>solo a chi ha salvato il tuo numero</b> nella sua rubrica. Con l’invio uno alla volta arriva a tutti.</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><button class="btn-main btn-print" onclick="v54Vcf()">⬇️ Scarica i contatti</button><button class="btn-main btn-print" onclick="v54Copy()">📋 Copia il messaggio</button></div></details>
<div class="bc-warn">⚠️ WhatsApp blocca i numeri che mandano troppi messaggi a chi non li vuole. Scrivi solo a chi ti conosce, non più di qualche decina al giorno, e togli subito chi risponde STOP (tasto 🚫).</div>${o.last?`<div class="fc-sub">Ultimo invio: ${new Date(o.last.at).toLocaleDateString('it-IT')} a ${o.last.n} clienti.</div>`:''}`;}
})();
}catch(e){console.error("chef-extra v2.9.54",e);}
try{
(function(){
/* 1) righe della lavagnetta: se Gemini le manda come elenco, una per riga (prima diventavano un'unica riga separata da virgole) */
const fixRighe=o=>{try{if(o&&typeof o==='object'&&!Array.isArray(o)&&Array.isArray(o.righe)){o.righe=o.righe.map(it=>{if(typeof it==='string')return it;if(it&&typeof it==='object'){const n=it.nome||it.piatto||it.name||it.riga||'',p=it.prezzo!=null?it.prezzo:(it.price!=null?it.price:''),f=it.finito||it.esaurito||it.finished;return [n,p===''?'':String(p).replace('.',','),f?'[FINITO]':''].join(' ').replace(/\s+/g,' ').trim();}return String(it||'');}).filter(Boolean).join('\n');}}catch(e){}return o;};
if(typeof window.jparse==='function'){const _j=window.jparse;window.jparse=function(){return fixRighe(_j.apply(this,arguments));};}
/* 2) Gemini più veloce: parte il primo modello, se entro pochi secondi non risponde (o dà errore) parte il successivo; vince il primo che risponde */
const _cg=callGemini;
async function hedged(parts,json,opts){const k=getGeminiKey();if(!k)throw new Error('API Key mancante');if(!navigator.onLine)throw new Error('Sei offline: serve internet.');
 const models=(typeof GEMINI_MODELS!=='undefined'?GEMINI_MODELS:['gemini-flash-latest']).slice();const ctl=new AbortController(),errs=[];let started=0;
 const total=Math.max(30000,Math.min(Number(opts.timeout)||90000,120000)),gap=parts.some(p=>p&&p.inline_data)?9000:6000;
 const call=async(mdl,think)=>{const gc={temperature:opts.temperature!=null?opts.temperature:0.2};if(opts.maxTokens)gc.maxOutputTokens=opts.maxTokens;if(json)gc.responseMimeType='application/json';if(think)gc.thinkingConfig=/gemini-3/.test(mdl)?{thinkingLevel:'low'}:{thinkingBudget:0};
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+mdl+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':k},body:JSON.stringify({contents:[{parts}],generationConfig:gc}),signal:ctl.signal});
  const d=await r.json().catch(()=>({}));if(!r.ok){const e=new Error((d.error&&d.error.message)||('HTTP '+r.status));e.status=r.status;throw e;}
  const c=((d.candidates||[])[0]||{});const tx=((c.content||{}).parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();if(!tx){const e=new Error(c.finishReason==='MAX_TOKENS'?'risposta troppo lunga':'risposta vuota');e.status=0;throw e;}return tx;};
 const one=async mdl=>{try{return await call(mdl,true);}catch(e){if(e.name==='AbortError')throw e;if(e.status===400&&!/API key|API_KEY/i.test(e.message)){try{return await call(mdl,false);}catch(e2){errs.push(e2);throw e2;}}errs.push(e);throw e;}};
 return await new Promise((resolve,reject)=>{let done=false,pending=0,timer=null;const fin=(ok,v)=>{if(done)return;done=true;clearTimeout(timer);clearTimeout(tt);ctl.abort();ok?resolve(v):reject(v);};
  const tt=setTimeout(()=>fin(false,new Error('Gemini non ha risposto in '+Math.round(total/1000)+' secondi.')),total);
  const next=()=>{if(done||started>=models.length)return;const m=models[started++];pending++;clearTimeout(timer);timer=setTimeout(next,gap);
   one(m).then(v=>fin(true,v),e=>{pending--;if(done)return;if(/API key not valid|API_KEY_INVALID/i.test(String(e.message)))return fin(false,new Error('La chiave Gemini non è valida: controllala in ⚙️ Opzioni.'));if(started<models.length)next();else if(!pending){const M=errs.map(x=>String(x.message)).join(' | ');fin(false,new Error(errs.some(x=>x.status===429)||/quota|RESOURCE_EXHAUSTED/i.test(M)?'Hai finito per adesso le richieste gratuite di Gemini: riprova fra qualche minuto.':errs.some(x=>x.status===503)?'Gemini è sovraccarico: riprova fra qualche minuto.':'Gemini: '+M.slice(0,160)));}});};
  next();});}
callGemini=window.callGemini=async function(parts,json,opts){opts=opts||{};if(opts.tools||opts.noHedge)return _cg.apply(this,arguments);try{return await hedged(parts,json,opts);}catch(e){throw e;}};
})();
}catch(e){console.error("chef-extra v2.9.55",e);}
try{
(function(){
const $=id=>document.getElementById(id);
const FOOD=['3 Antipasti','4 Primi Piatti','5 Secondi','5 Contorni','6 Desserts'];
/* 1) un piatto senza allergeni è "controllato": lo segno come "nessuno" invece di lasciarlo vuoto (prima restava per sempre "da completare") */
if(typeof window.algMerge==='function'){const _m=window.algMerge;window.algMerge=function(){const r=_m.apply(this,arguments);return Array.isArray(r)&&r.length?r:['nessuno'];};}
function fixData(){try{let n=0;(state.menu||[]).forEach(m=>{if(m&&FOOD.includes(m.cat)&&Array.isArray(m.allergens)&&!m.allergens.length){m.allergens=['nessuno'];n++;}});
 if(n&&/^christian$/i.test((state.waiterName||'').trim())){saveState(false,{menu:true});}return n;}catch(e){return 0;}}
setTimeout(fixData,4000);setInterval(fixData,20000);
const pending=()=>{let a=0,t=0;try{a=(state.menu||[]).filter(m=>FOOD.includes(m.cat)&&!(Array.isArray(m.allergens)&&m.allergens.length)).length;}catch(e){}try{t=missingTrItems().length;}catch(e){}return a+t;};
/* 2) barra "Sto elaborando il menù": secondi sempre visibili, e niente avviso vecchio se ormai è tutto fatto */
let t0=0,lastCls='';
function mp(){const b=$('mpBar');if(!b)return;let s=$('mpSec');if(!s){s=document.createElement('div');s.id='mpSec';s.style.cssText='font-size:.78rem;font-weight:900;opacity:.85;margin-top:4px;';const ref=$('mpS');(ref&&ref.parentNode?ref.parentNode:b).appendChild(s);}
 const on=/\bon\b/.test(b.className),warn=/warn/.test(b.className),done=/done/.test(b.className);
 if(on&&!warn&&!done){if(!t0||lastCls!=='work')t0=Date.now();lastCls='work';s.textContent='⏱️ '+Math.round((Date.now()-t0)/1000)+' s';}
 else if(on){if(lastCls==='work'&&t0)s.textContent='Durata: '+Math.round((Date.now()-t0)/1000)+' s';lastCls=warn?'warn':'done';if(warn&&!fixData()&&pending()===0&&window.v2918MpClose)v2918MpClose();if(warn&&pending()===0&&window.v2918MpClose)v2918MpClose();}
 else{lastCls='';t0=0;s.textContent='';}}
setInterval(mp,1000);
/* 3) ogni messaggio "⏳ …" (lavagnetta, fattura, prenotazioni, foto SumUp…) mostra da quanti secondi sta lavorando */
const T=new WeakMap();
setInterval(()=>{document.querySelectorAll('#oneSt,#ocrStatus,#invSt,#resMsgSt,#bcSt,#bcSt2,#feSt,[data-sec]').forEach(el=>{const sp=el.querySelector(':scope > .v56s');const txt=(el.textContent||'').replace(sp?sp.textContent:'','').trim();
 if(/^⏳/.test(txt)){let r=T.get(el);if(!r||r.t!==txt.slice(0,40)){r={t:txt.slice(0,40),at:r&&/^⏳/.test(r.t)?r.at:Date.now()};T.set(el,r);}const v=' · ⏱️ '+Math.round((Date.now()-r.at)/1000)+' s';if(sp){if(sp.textContent!==v)sp.textContent=v;}else{const n=document.createElement('span');n.className='v56s';n.textContent=v;el.appendChild(n);}}
 else{if(sp)sp.remove();T.delete(el);}});},1000);
})();
}catch(e){console.error("chef-extra v2.9.56",e);}
try{
(function(){
const $=id=>document.getElementById(id);
const st=document.createElement('style');
st.textContent='#waiterDisplay{position:relative!important;padding-right:52px!important}#fsMini{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:38px;height:34px;border-radius:9px;border:2px solid rgba(255,255,255,.85);background:rgba(0,0,0,.22);color:#fff;display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer;box-shadow:inset 0 -2px 0 rgba(0,0,0,.25)}#fsMini svg{width:20px;height:20px;stroke:#fff;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}#fsMini:active{transform:translateY(-50%) scale(.92)}.v2931lu button{color:#3B2A00!important;text-shadow:none!important;-webkit-text-fill-color:#3B2A00!important}';
document.head.appendChild(st);
const fsOn=()=>!!(document.fullscreenElement||document.webkitFullscreenElement);
const ICON_OUT='<svg viewBox="0 0 24 24"><path d="M9 4v5H4M15 4v5h5M4 15h5v5M20 15h-5v5"/></svg>',ICON_IN='<svg viewBox="0 0 24 24"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></svg>';
window.v57Fs=ev=>{if(ev){ev.stopPropagation();ev.preventDefault();}
 if(fsOn()){localStorage.setItem('alicetta_autofs','0');try{(document.exitFullscreen||document.webkitExitFullscreen).call(document);}catch(e){}try{toast('Schermo intero tolto. Per rimetterlo tocca di nuovo il quadratino.');}catch(e){}}
 else{localStorage.setItem('alicetta_autofs','1');try{const el=document.documentElement;(el.requestFullscreen||el.webkitRequestFullscreen).call(el,{navigationUI:'hide'}).catch(()=>{});}catch(e){}}
 setTimeout(paint,300);};
function paint(){const w=$('waiterDisplay');if(!w)return;let b=$('fsMini');if(!b||b.parentNode!==w){b=document.createElement('button');b.id='fsMini';b.type='button';b.onclick=window.v57Fs;w.appendChild(b);}
 const on=fsOn(),h=on?ICON_OUT:ICON_IN,t=on?'Esci dallo schermo intero':'Schermo intero';if(b.dataset.s!==String(on)){b.innerHTML=h;b.dataset.s=String(on);b.title=t;b.setAttribute('aria-label',t);}}
document.addEventListener('fullscreenchange',paint);document.addEventListener('webkitfullscreenchange',paint);
setInterval(paint,1000);paint();
})();
}catch(e){console.error("chef-extra v2.9.57",e);}
try{
(function(){
const copItem=()=>(state.menu||[]).find(m=>m&&m.cat==='1 Coperto')||null;
const tid=v=>{v=String(v||'').trim().toUpperCase().replace(/^TAVOLO\s*/,'');if(!v)return null;const id=/^E/.test(v)?'EST_'+v.replace(/^E\D*/,''):'INT_'+v.replace(/^\D*/,'');return state.tables[id]?id:null;};
function seat(r,id){const t=state.tables[id];if(!t)return false;t.items=t.items||[];
 if(t.items.length){alert(`⚠️ ${t.name} è già occupato: non aggiungo i coperti di ${r.name}.\nSe li fai sedere altrove, usa “Assegna” nella prenotazione o apri il tavolo giusto.`);return false;}
 const c=copItem(),n=Math.max(1,parseInt(r.covers,10)||1);t.openedAt=Date.now();t.customerName=r.name||'';t.resId=r.id||'';
 if(c)t.items.push({lineId:Date.now()+Math.random(),menuId:c.id,cat:c.cat,name:c.name,price:c.price,qty:n,mandata:state.currentMandata||1,waiter:state.waiterName||'Staff',note:'',sent:false});
 try{saveState(false,{tables:[id]});}catch(e){}try{state.activeTableId=id;renderOrderScreen();}catch(e){}try{renderTables();}catch(e){}
 try{toast(`✅ ${r.name} al ${t.name}: ${n} ${n===1?'coperto':'coperti'} già inseriti`);}catch(e){}return true;}
const _a=arriveRes;
arriveRes=window.arriveRes=async function(id){const t0=Date.now();const res=await _a.apply(this,arguments);try{const r=state.res&&state.res[id];if(!r||r.status!=='arrivato'||!(r.arrivedAt>=t0-1000))return res;r.id=r.id||id;
 let ids=r.tables||[];
 if(!ids.length){const free=Object.values(state.tables).filter(t=>t.room!=='asporto'&&!(t.items&&t.items.length)).sort((a,b)=>a.id.localeCompare(b.id,undefined,{numeric:true}));
  const v=prompt(`A quale tavolo fai sedere ${r.name} (${r.covers} pers.)?\nScrivi il numero, per esempio 7 (oppure E2 per l’esterna).${free.length?'\nLiberi: '+free.slice(0,12).map(t=>t.room==='esterna'?'E'+t.id.slice(4):t.id.slice(4)).join(', '):''}`,'');
  const k=tid(v);if(!k){if(v)alert('Tavolo non trovato: aprilo a mano.');return res;}r.tables=[k];try{await saveState(false,{res:[id]});}catch(e){}ids=[k];try{openTable(k);}catch(e){}}
 seat(r,ids[0]);}catch(e){console.error(e);}return res;};
})();
}catch(e){console.error("chef-extra v2.9.58",e);}
try{
(function(){
const $=id=>document.getElementById(id);
const st=document.createElement('style');st.textContent='.cov-off{display:block;margin-top:4px;font-size:.7rem;font-weight:900;background:#FEF3C7;color:#78350F;border-radius:999px;padding:2px 8px}.cop-undo{margin-left:8px;border:2px solid #78350F;background:#fff;color:#78350F;border-radius:999px;padding:3px 10px;font-weight:900;font-size:.78rem;cursor:pointer}';document.head.appendChild(st);
/* togliere un "coperto offerto" inserito per sbaglio */
window.v61CopUndo=async()=>{const t=state.tables[state.activeTableId];if(!t||!(Number(t.copOff)>0))return;
 if(!confirm('Togliere 1 coperto offerto?\nUsalo se era un errore: quella persona non c’era.'))return;
 const n=Number(t.copOff)||0,unit=n?(Number(t.copOffVal)||0)/n:0;t.copOff=n-1;t.copOffVal=Math.max(0,Math.round(((Number(t.copOffVal)||0)-unit)*100)/100);
 (t.copOffLog=t.copOffLog||[]).push({ts:Date.now(),by:state.waiterName||'Staff',n:-1,undo:true});
 try{await saveState(false,{tables:[t.id]});}catch(e){}try{renderOrderScreen();}catch(e){}try{renderTables();}catch(e){}};
{const _o=renderOrderScreen;renderOrderScreen=function(){const r=_o.apply(this,arguments);try{const t=state.tables[state.activeTableId];if(t&&Number(t.copOff)>0){document.querySelectorAll('div').forEach(d=>{if(d.dataset.cu||d.children.length||!/^🎁 \d+ copert[oi] offert/.test(d.textContent||''))return;d.dataset.cu='1';const b=document.createElement('button');b.className='cop-undo';b.textContent='↩️ Era un errore';b.onclick=v61CopUndo;d.appendChild(b);});}}catch(e){}return r;};}
/* sulla scheda del tavolo: se ci sono coperti offerti lo scrive sotto il numero */
{const _r=renderTables;renderTables=function(){const r=_r.apply(this,arguments);try{document.querySelectorAll('#tablesContainer .table-card[data-tid]').forEach(c=>{const t=state.tables[c.dataset.tid],b=c.querySelector('.cov-big');let e=c.querySelector('.cov-off');const n=t&&t.items&&t.items.length?Number(t.copOff)||0:0;
 if(!b||!n){if(e)e.remove();return;}const h=`di cui ${n} 🎁 ${n===1?'offerto':'offerti'}`;if(!e){e=document.createElement('span');e.className='cov-off';b.appendChild(e);}if(e.textContent!==h)e.textContent=h;});}catch(e){}return r;};}
setTimeout(()=>{try{renderTables();}catch(e){}},1500);
})();
}catch(e){console.error("chef-extra v2.9.61",e);}
try{
(function(){
const st=document.createElement('style');
st.textContent='.ct-more{display:inline-flex;align-items:center;gap:6px;margin-top:6px;padding:5px 11px;border-radius:999px;background:#1BE7FF;color:#062329;font-weight:900;font-size:.76rem;box-shadow:0 2px 0 #0E7490}.ct-more .c{display:none}details[open]>summary .ct-more{background:#334155;color:#fff;box-shadow:none}details[open]>summary .ct-more .o{display:none}details[open]>summary .ct-more .c{display:inline}#contiList details>summary{border-radius:12px;padding:4px 2px}#contiList details[open]{background:rgba(27,231,255,.06);border-radius:12px}';
document.head.appendChild(st);
function deco(){const L=document.getElementById('contiList');if(!L)return;L.querySelectorAll('details>summary').forEach(s=>{if(s.querySelector('.ct-more'))return;const left=s.firstElementChild;if(!left||!s.parentNode.querySelector('button'))return;
 const inv=/Fattura da emettere/.test(s.textContent||'');const b=document.createElement('span');b.className='ct-more';b.innerHTML=`<span class="o">${inv?'🧾 Tocca per emettere la fattura':'👆 Fattura, ricevuta, modifica'} ▾</span><span class="c">▴ Chiudi</span>`;left.appendChild(b);});}
let q=0;new MutationObserver(()=>{if(q)return;q=setTimeout(()=>{q=0;try{deco();}catch(e){}},150);}).observe(document.body,{childList:true,subtree:true});
setTimeout(deco,1500);
})();
}catch(e){console.error("chef-extra v2.9.62",e);}
try{
(function(){
const $=id=>document.getElementById(id);
const st=document.createElement('style');
st.textContent='.trash-btn{background:#FEE2E2!important;background-image:none!important;color:#B91C1C!important;border:2px solid #DC2626!important;box-shadow:0 3px 0 #991B1B!important;font-size:1.05rem!important;min-width:44px}.trash-btn:active{transform:translateY(2px);box-shadow:0 1px 0 #991B1B!important}#contiList{margin-top:10px}#hub_sales_oggi #contiList .cx-wrap,#hub_sales_oggi #contiList .su-box{display:none!important}';
document.head.appendChild(st);
/* 1) elenco dei conti subito sotto gli incassi, nella prima pagina di Vendite */
function place(){const P=$('payTotals'),C=$('contiList');if(!P||!C)return;if(P.nextElementSibling!==C)P.after(C);
 }
setInterval(place,500);place();
/* 2) cestini rossi e ben visibili */
function trash(){document.querySelectorAll('button').forEach(b=>{if(b.classList.contains('trash-btn'))return;const t=(b.textContent||'').trim();if(t==='🗑️'||t==='🗑'||/^🗑️?\s?(Elimina|Cancella)?$/.test(t))b.classList.add('trash-btn');});}
let q=0;new MutationObserver(()=>{if(q)return;q=setTimeout(()=>{q=0;try{trash();}catch(e){}},200);}).observe(document.body,{childList:true,subtree:true});trash();
})();
}catch(e){console.error("chef-extra v2.9.63",e);}
try{
(function(){
const $=id=>document.getElementById(id);
const st=document.createElement('style');
st.textContent=`body{--c-tot:#C81E1E;--c-loc:#A16207;--c-su:#15803D}body.dark{--c-tot:#FF6B6B;--c-loc:#FFD60A;--c-su:#4ADE80}
.cx-tb th:nth-child(2),.cx-tb th:nth-child(3),.cx-tb td:nth-child(2),.cx-tb td:nth-child(3){color:var(--c-su)!important}
.cx-tb th:nth-child(4),.cx-tb td:nth-child(4){color:var(--c-loc)!important}
.cx-tb th:nth-child(5),.cx-tb td:nth-child(5),.cx-tb td:nth-child(5) b{color:var(--c-tot)!important}
.cx-tb tr.tot td:first-child{color:var(--c-tot)!important}
.cx-big b{color:var(--c-tot)!important}
.cx-t>div:nth-child(1),.cx-t>div:nth-child(2){background:#DCFCE7!important;color:#14532D!important}
.cx-t>div:nth-child(3){background:#FEF9C3!important;color:#713F12!important}
.cx-su{background:#15803D!important;color:#fff!important}
.k-tot{color:var(--c-tot)!important;font-weight:900}.k-loc{color:var(--c-loc)!important;font-weight:900}.k-su{color:var(--c-su)!important;font-weight:900}
#hubTabs_ai .hub-tab[data-p="club"]{display:none!important}#cuClubAi .hub-page,#cuClubAi #hub_ai_club{display:block!important}#cuClubAi{margin-top:10px}
.rv-list{margin:8px 0}.rv-it{border:2px solid rgba(124,58,237,.5);border-radius:14px;padding:9px 10px;margin-bottom:8px;font-size:.84rem}.rv-it b{display:block}.rv-it .t{opacity:.9;margin:4px 0 6px;white-space:pre-wrap}.rv-it.done{opacity:.55}`;
document.head.appendChild(st);
/* ---------- colori nel registro chiusure: totale rosso, cassa locale giallo, SumUp verde ---------- */
if(typeof window.v2930DayTot==='function'){const _d=window.v2930DayTot;window.v2930DayTot=function(){let h=_d.apply(this,arguments)||'';return h.replace(/(Tot € [\d.,]+)/,'<span class="k-tot">$1</span>').replace(/(🏪 Cassa locale € [\d.,-]+)/,'<span class="k-loc">$1</span>').replace(/(🟦 SumUp € [\d.,-]+)/,'<span class="k-su">$1</span>');};}
/* ---------- 1) Club: salva tutti i soci nella rubrica del telefono ---------- */
window.v64ClubVcf=()=>{const L=(typeof fidCache!=='undefined'&&fidCache)||[];const ok=L.filter(c=>c&&c.phone);if(!ok.length)return alert('Nessun cliente con il telefono.');
 const num=p=>{let d=String(p||'').replace(/\D/g,'');if(d.startsWith('00'))d=d.slice(2);if(d.length===10&&d[0]==='3')d='39'+d;return '+'+d;};
 const v=ok.map(c=>{const n=String(c.name||'').replace(/[;,]/g,' ').trim();return['BEGIN:VCARD','VERSION:3.0','N:'+n+';Cliente Club;;;','FN:Cliente Club '+n,'TEL;TYPE=CELL:'+num(c.phone),'NOTE:Alicetta Club','END:VCARD'].join('\r\n');}).join('\r\n');
 const b=new Blob([v],{type:'text/vcard'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='Club Alicetta ('+ok.length+').vcf';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1500);try{toast('📇 Apri il file scaricato: salva '+ok.length+' clienti Club nella rubrica');}catch(e){}};
function fidBtn(){const l=$('fidList');if(!l)return;const m=l.closest('.modal-box')||l.parentNode;if(!m||m.querySelector('#fidVcf'))return;const csv=[...m.querySelectorAll('button')].find(b=>/CSV/.test(b.textContent||''));if(!csv)return;const b=document.createElement('button');b.id='fidVcf';b.className=csv.className;b.style.cssText=csv.style.cssText;b.textContent='📇 Salva tutti in rubrica';b.onclick=window.v64ClubVcf;csv.after(b);}
/* ---------- 2) due set di icone in più ---------- */
const SETS={tratt:{l:'🍝 Trattoria',i:{navTables:'🍝',navRes:'📒',navKds:'🍳',navTime:'🕰️',navHaccp:'❄️',navDishes:'📜',navSales:'💰',navAi:'🧠',navMenu:'🔧'}},mare:{l:'🌊 Mare',i:{navTables:'🐟',navRes:'⚓',navKds:'🦐',navTime:'⏳',navHaccp:'🧊',navDishes:'🐚',navSales:'🪙',navAi:'🐙',navMenu:'🧭'}}};
const icMode=()=>localStorage.getItem('alicetta_icons')||'';
function icApply(){const S=SETS[icMode()];if(S)Object.keys(S.i).forEach(id=>{const b=$(id),i=b&&b.querySelector('.nv-i');if(i&&i.textContent!==S.i[id])i.textContent=S.i[id];});
 const c=$('iconCard'),ch=c&&c.querySelector('.chips');if(ch&&!ch.querySelector('[data-x]')){Object.keys(SETS).forEach(k=>{const b=document.createElement('button');b.className='chipb'+(icMode()===k?' on':'');b.dataset.x=k;b.textContent=SETS[k].l;b.onclick=()=>window.v221Icons&&window.v221Icons(k);ch.appendChild(b);});}}
/* ---------- 4) recensioni da screenshot ---------- */
let RVL=[];try{RVL=JSON.parse(localStorage.getItem('alicetta_rvl')||'[]')||[];}catch(e){}
function rvDraw(){try{localStorage.setItem('alicetta_rvl',JSON.stringify(RVL.slice(0,80)));}catch(e){}const box=$('rvShots');if(!box)return;const todo=RVL.filter(r=>!r.done).length,done=RVL.length-todo;
 box.innerHTML=RVL.length?`<div class="rv-list"><div style="font-weight:900;margin-bottom:6px;">📝 Da rispondere: ${todo} · ✅ Già risposte: ${done}</div>${RVL.map((r,i)=>[r,i]).sort((a,b)=>(a[0].done?1:0)-(b[0].done?1:0)).map(([r,i])=>`<div class="rv-it ${r.done?'done':''}"><b>${'★'.repeat(r.stelle||0)}${'☆'.repeat(5-(r.stelle||0))} ${escH(r.nome||'Cliente')}${r.done?' · ✅ risposta fatta':''}</b><div class="t">${escH((r.testo||'(solo stelle, senza testo)').slice(0,260))}${(r.testo||'').length>260?'…':''}</div><button class="btn-note" style="padding:7px 12px;" onclick="v64RvUse(${i})">${r.done?'✍️ Rispondi di nuovo':'✍️ Rispondi a questa'}</button> ${r.done?`<button class="btn-note" style="padding:7px 12px;" onclick="v64RvTodo(${i})">↩️ Da rifare</button>`:''} <button class="btn-note" style="padding:7px 10px;" onclick="v64RvDel(${i})">✖</button></div>`).join('')}</div>`:'';}
window.v64RvTodo=i=>{if(RVL[i]){RVL[i].done=false;rvDraw();}};window.v64RvDel=i=>{if(RVL[i]&&confirm('Togliere questa recensione dall’elenco?')){RVL.splice(i,1);rvDraw();}};
window.v64RvUse=i=>{const r=RVL[i];if(!r)return;r.done=true;try{v215Set('text',r.testo||'');v215Set('name',r.nome||'');}catch(e){}const t=$('rvText');if(t)t.value=r.testo||'';const n=document.querySelector('#hub_ai_rev input[placeholder^="Nome del cliente"]');if(n)n.value=r.nome||'';
 const sb=document.querySelectorAll('#hub_ai_rev .star-row button')[(r.stelle||5)-1];if(sb)sb.click();rvDraw();if(t)t.scrollIntoView({behavior:'smooth',block:'center'});try{toast('Recensione inserita: ora tocca “Scrivi le risposte”');}catch(e){}};
window.v64RvShot=async inp=>{const F=[...(inp.files||[])].slice(0,6);inp.value='';if(!F.length)return;const m=$('rvShotSt');const say=t=>{if(m)m.textContent=t;};
 if(!getGeminiKey())return say('🔑 Serve la chiave Gemini in ⚙️ Opzioni.');say('⏳ Leggo '+(F.length===1?'lo screenshot':F.length+' screenshot')+'…');window._jobLabel='⭐ Lettura recensioni';
 try{const parts=[];for(const f of F)parts.push({inline_data:{mime_type:'image/jpeg',data:await shrinkImage(f,1400)}});
  parts.push({text:'Questi sono screenshot di recensioni di un ristorante (Google Maps, Tripadvisor o simili). Estrai TUTTE le recensioni leggibili. Per ognuna: nome di chi l’ha scritta, numero di stelle (1-5, conta le stelle piene), testo completo ESATTO nella lingua originale (se la recensione è tagliata con “Altro”, riporta la parte visibile). Ignora le risposte del proprietario, i pulsanti e la pubblicità. Se la stessa recensione compare in due screenshot, riportala una sola volta. Rispondi SOLO JSON: {"recensioni":[{"nome":string,"stelle":number,"testo":string}]}'});
  const r=await callGemini(parts,true,{fast:true,timeout:60000,maxTokens:4096});let o=JSON.parse(r.slice(r.indexOf('{'),r.lastIndexOf('}')+1));const L=(o.recensioni||[]).filter(x=>x&&(x.testo||x.stelle)).map(x=>({nome:String(x.nome||'').trim(),stelle:Math.max(1,Math.min(5,Math.round(Number(x.stelle)||5))),testo:String(x.testo||'').trim()}));
  if(!L.length)return say('⚠️ Non trovo recensioni in questi screenshot: prova con uno più nitido.');RVL=L.concat(RVL.filter(a=>!L.some(b=>b.nome===a.nome&&b.testo===a.testo)));rvDraw();say('✅ '+L.length+(L.length===1?' recensione letta.':' recensioni lette.'));if(L.length===1)window.v64RvUse(0);}
 catch(e){say('❌ '+(e.message||e));}finally{setTimeout(()=>{if(window._jobLabel==='⭐ Lettura recensioni')window._jobLabel='';},2500);}};
function rvBtn(){const el=$('hub_ai_rev');if(!el||el.querySelector('#rvShotBtn'))return;const p=[...el.querySelectorAll('button')].find(b=>/Incolla dagli appunti/.test(b.textContent||''));if(!p)return;const d=document.createElement('div');
 d.innerHTML='<label id="rvShotBtn" class="btn-note" style="display:block;width:100%;padding:10px;margin-bottom:6px;text-align:center;cursor:pointer;">🖼️ Screenshot delle recensioni (anche più di uno)<input type="file" accept="image/*" multiple style="display:none" onchange="v64RvShot(this)"></label><div id="rvShotSt" style="font-size:.8rem;font-weight:800;margin-bottom:4px;"></div><div id="rvShots"></div>';p.after(d);rvDraw();}
/* ---------- 5) Campagne Club dentro Clienti › Club ---------- */
let lastAi='';
function clubMove(){const v=$('viewRes'),rc=$('resContent'),pg=$('hub_ai_club');if(!v||!rc||!pg)return;let h=$('cuClubAi');if(!h){h=document.createElement('div');h.id='cuClubAi';rc.after(h);}if(pg.parentNode!==h)h.appendChild(pg);
 const on=(localStorage.getItem('alicetta_cu_tab')||'pren')==='club';h.style.display=on?'':'none';
 if(on&&v.classList.contains('active')&&!pg.dataset.ld&&window.v214ClubReload){pg.dataset.ld='1';try{window.v214ClubReload();}catch(e){}}
 const tabs=[...document.querySelectorAll('#hubTabs_ai .hub-tab')],act=tabs.find(t=>t.classList.contains('active'));
 if(act&&act.dataset.p==='club'&&$('viewAi')&&$('viewAi').classList.contains('active')){const i=tabs.indexOf(act),nx=tabs[i+1],pv=tabs[i-1];const go=(lastAi&&nx&&lastAi===nx.dataset.p)?pv:(nx||pv);if(go)go.click();}else if(act)lastAi=act.dataset.p;}
/* ---------- controllo leggibilità: testo chiaro su fondo chiaro (o scuro su scuro) viene corretto ---------- */
const P=c=>{const m=String(c||'').match(/rgba?\(([^)]+)\)/);if(!m)return null;const a=m[1].split(/[,\/\s]+/).filter(Boolean).map(Number);return[a[0],a[1],a[2],a.length>3?a[3]:1];};
const L=c=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2]);};
const CR=(a,b)=>{const x=L(a),y=L(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const mix=(c,t,k)=>[0,1,2].map(i=>Math.round(c[i]*(1-k)+t[i]*k));
function bgOf(el,cache){const chain=[];let e=el,res=null;while(e&&e.nodeType===1){if(cache.has(e)){res=cache.get(e);break;}chain.push(e);const cs=getComputedStyle(e),bi=cs.backgroundImage;
  if(bi&&bi!=='none'){const m=bi.match(/rgba?\([^)]+\)/g);if(m){const cols=m.map(P).filter(c=>c&&c[3]>.5);if(cols.length){res=[0,1,2].map(i=>Math.round(cols.reduce((s,c)=>s+c[i],0)/cols.length));break;}}else if(/url\(/.test(bi)){res=null;chain.forEach(x=>cache.set(x,null));return null;}}
  const b=P(cs.backgroundColor);if(b&&b[3]>.6){res=b.slice(0,3);break;}e=e.parentElement;}
 if(!res&&!e)res=document.body.classList.contains('dark')?[15,19,34]:[255,247,239];chain.forEach(x=>cache.set(x,res));return res;}
let themeKey='';
function fixColors(){const tk=document.body.className;if(tk!==themeKey){themeKey=tk;document.querySelectorAll('[data-cfx]').forEach(e=>{e.style.removeProperty('color');delete e.dataset.cfx;});}
 const roots=[...document.querySelectorAll('.screen.active,.modal-overlay.active,#dock,.topbar,#mpBar,#jobBar')];const cache=new Map();let n=0;
 for(const r of roots){const all=r.querySelectorAll('*');for(const el of all){if(n>3500)return;if(el.dataset.cfx==='x'||el.closest('svg,canvas,[data-nofix]'))continue;
   let has=false;for(const c of el.childNodes){if(c.nodeType===3&&/[A-Za-zÀ-ÿ0-9€]/.test(c.nodeValue)){has=true;break;}}if(!has&&!(/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)))continue;n++;
   const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden'||Number(cs.opacity)<.5)continue;const fg=P(cs.color);if(!fg)continue;const bg=bgOf(el,cache);if(!bg)continue;
   const f=fg[3]<1?mix(bg,fg,fg[3]):fg.slice(0,3);if(CR(f,bg)>=2.7){continue;}
   const dark=L(bg)<.32,tgt=dark?[255,255,255]:[8,22,28];let k=.5,c=mix(f,tgt,k);while(CR(c,bg)<4.2&&k<1){k+=.15;c=mix(f,tgt,Math.min(1,k));}
   el.style.setProperty('color',`rgb(${c[0]},${c[1]},${c[2]})`,'important');el.dataset.cfx='1';}}}
let fq=0;const sched=()=>{if(fq)return;fq=setTimeout(()=>{fq=0;try{fixColors();}catch(e){}},1200);};
new MutationObserver(sched).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
setInterval(()=>{try{fidBtn();icApply();rvBtn();clubMove();}catch(e){}},700);
{const w=()=>{if(typeof window.v221Icons==='function'&&!window.v221Icons._x){const _i=window.v221Icons;window.v221Icons=function(m){const r=_i.apply(this,arguments);try{icApply();const c=$('iconCard');if(c)c.querySelectorAll('[data-x]').forEach(b=>b.classList.toggle('on',b.dataset.x===m));}catch(e){}return r;};window.v221Icons._x=1;}};w();setTimeout(w,2000);}
setTimeout(()=>{try{fixColors();}catch(e){}},1500);
})();
}catch(e){console.error("chef-extra v2.9.64",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const st=document.createElement('style');
st.textContent=`.nt-box{border-radius:16px;padding:10px 12px;margin:0 0 10px;background:rgba(124,58,237,.14);border:2px solid rgba(124,58,237,.55)}.nt-row{display:grid;grid-template-columns:1fr auto;gap:8px}.nt-mic{border:0;border-radius:14px;padding:13px 10px;font-weight:900;font-size:1rem;background:#7C3AED;color:#fff;box-shadow:0 4px 0 #4C1D95}.nt-mic.rec{background:#DC2626;box-shadow:0 4px 0 #7F1D1D;animation:ntp 1s infinite}@keyframes ntp{50%{opacity:.6}}.nt-kb{border:0;border-radius:14px;padding:0 14px;font-weight:900;background:#1BE7FF;color:#062329;box-shadow:0 4px 0 #0E7490}.nt-live{font-size:.86rem;font-weight:700;margin-top:6px;min-height:1.1em}.nt-it{display:flex;gap:8px;align-items:flex-start;justify-content:space-between;padding:7px 0;border-top:1px dashed rgba(148,163,184,.5);font-size:.88rem;font-weight:700}.nt-it.done span.t{text-decoration:line-through;opacity:.55}.nt-it small{display:block;opacity:.7;font-weight:600;font-size:.7rem}.nt-it .b{display:flex;gap:5px;flex:none}.nt-it button{border:0;border-radius:9px;padding:6px 8px;font-weight:900;font-size:.76rem;background:rgba(148,163,184,.3);color:inherit}.nt-it button.k{background:#FBBF24;color:#3B2A00}.nt-c{display:inline-block;font-size:.68rem;font-weight:900;border-radius:999px;padding:1px 7px;margin-right:4px;vertical-align:1px}.nt-spesa{background:#DCFCE7;color:#14532D}.nt-fare{background:#DBEAFE;color:#1E3A8A}.nt-nota{background:#EDE9FE;color:#4C1D95}.bf-low{background:#FEF3C7;color:#78350F;border-radius:8px;padding:1px 7px;font-weight:900}.bf-say{border:0;border-radius:12px;padding:7px 12px;font-weight:900;background:#7C3AED;color:#fff;margin-right:6px}
.bf-k{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0}.bf-k div{border-radius:12px;padding:8px 4px;text-align:center;font-weight:800;font-size:.72rem;background:rgba(27,231,255,.12)}.bf-k b{display:block;font-size:1.3rem}.bf-l{font-size:.86rem;font-weight:700;padding:5px 0;border-top:1px dashed rgba(148,163,184,.4)}.bf-al{background:#FEE2E2;color:#7F1D1D;border-radius:8px;padding:1px 7px;font-weight:900}
.ag-row{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:0 0 8px}.ag-row button{border:2px solid rgba(124,58,237,.5);border-radius:14px;padding:9px 2px;font-weight:900;font-size:.78rem;background:transparent;color:inherit}.ag-row button b{display:block;font-size:1.2rem}.ag-row button.on{background:#7C3AED;color:#fff;border-color:#fff}.ag-hide{display:none!important}
.sc-ck{margin-top:8px;border-radius:12px;padding:10px;background:rgba(124,58,237,.12)}.sc-h{font-weight:900;margin:8px 0 4px}.sc-it{display:flex;gap:10px;align-items:flex-start;padding:7px 0;border-top:1px dashed rgba(148,163,184,.4);font-weight:700;font-size:.9rem}.sc-it input{width:24px;height:24px;flex:none}.sc-it.ok span{text-decoration:line-through;opacity:.55}.tu-res{display:inline-block;margin-top:4px;border-radius:999px;padding:2px 9px;font-size:.74rem;font-weight:900;background:#DBEAFE;color:#1E3A8A}`;
document.head.appendChild(st);
const cfg=()=>(state.staffCfg=state.staffCfg||{});const saveCfg=()=>{try{saveState(false,{staff:true});}catch(e){}};
const today=()=>{try{return buildDateISO();}catch(e){return new Date().toISOString().slice(0,10);}};
/* ---------- A) chiavi SumUp: copia di sicurezza condivisa, tornano da sole se il telefono le perde ---------- */
function suSync(){try{const k=(localStorage.getItem('alicetta_sumup_key')||'').trim(),a=(localStorage.getItem('alicetta_sumup_app')||'').trim(),c=cfg(),cl=c.sumup||{};
 if(k&&a){if(cl.key!==k||cl.app!==a){c.sumup={key:k,app:a,at:Date.now(),by:state.waiterName||''};saveCfg();}}
 else if(cl.key&&cl.app){localStorage.setItem('alicetta_sumup_key',cl.key);localStorage.setItem('alicetta_sumup_app',cl.app);const i=$('sumupKey'),j=$('sumupApp');if(i)i.value=cl.key;if(j)j.value=cl.app;try{toast('🔑 Chiavi SumUp recuperate dalla copia di sicurezza');}catch(e){}}
 const i=$('sumupKey');if(i&&!$('suEye')){const b=document.createElement('button');b.id='suEye';b.type='button';b.className='btn-note';b.style.cssText='margin-top:4px;padding:6px 10px;font-size:.78rem;';b.textContent='👁️ Mostra la chiave';b.onclick=()=>{i.type=i.type==='password'?'text':'password';b.textContent=i.type==='password'?'👁️ Mostra la chiave':'🙈 Nascondi la chiave';};i.after(b);
  const n=document.createElement('div');n.id='suNote';n.style.cssText='font-size:.74rem;font-weight:700;opacity:.8;margin-top:4px;';i.parentNode.parentNode.appendChild(n);}
 const n=$('suNote');if(n)n.textContent=(k&&a)?'✅ Chiavi presenti su questo dispositivo e salvate nella copia di sicurezza.':(cl.key?'':'⚠️ Chiavi mancanti: se un altro dispositivo le ha ancora, aprilo con questa versione e torneranno anche qui.');}catch(e){}}
if(typeof saveSumup==='function'){const _s=saveSumup;saveSumup=function(){const r=_s.apply(this,arguments);setTimeout(suSync,300);return r;};}
setInterval(suSync,8000);setTimeout(suSync,3500);
/* ---------- B) note vocali (in app, condivise tra i dispositivi) + invio a Google Keep ---------- */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let rec=null,recHost='';
const notes=()=>{const c=cfg();c.notes=Array.isArray(c.notes)?c.notes:[];return c.notes;};
const NCAT=t=>/\b(ordin|compr|prend[ei]re|manca|mancano|finit|fornitor|spesa|pesce|verdur|frutta|vino|vini|birr|acqua|pane|olio|farina|uova|latte|carne|cozze|vongol|alici)/i.test(t)?'spesa':/\b(chiam|telefon|sistem|ripar|aggiust|pulir|pulisci|prenot|pagar|pagare|bolletta|scriv|mandar|controll|verific|portar|cambiar)/i.test(t)?'fare':'nota';
const CATL={spesa:'🛒 Spesa',fare:'🔧 Da fare',nota:'📝 Nota'};
function addNote(t,cat){t=String(t||'').trim();if(t.length<2)return;t=t.charAt(0).toUpperCase()+t.slice(1);const N=notes();N.unshift({id:Date.now().toString(36)+Math.random().toString(36).slice(2,5),ts:Date.now(),by:state.waiterName||'Staff',text:t,cat:cat||NCAT(t)});if(N.length>120)N.length=120;saveCfg();drawNotes();try{toast('📝 Nota salvata · '+CATL[N[0].cat]);}catch(e){}}
window.v65AddNote=addNote;
window.v65Mic=host=>{if(rec){try{rec.stop();}catch(e){}return;}if(!SR){const t=prompt('Scrivi la nota:');if(t)addNote(t);return;}
 const live=$('ntLive_'+host),btn=$('ntMic_'+host);let fin='';rec=new SR();recHost=host;rec.lang='it-IT';rec.interimResults=true;rec.continuous=true;
 rec.onresult=e=>{let it='';for(let i=e.resultIndex;i<e.results.length;i++){if(e.results[i].isFinal)fin+=e.results[i][0].transcript+' ';else it+=e.results[i][0].transcript;}if(live)live.textContent='🎙️ '+fin+it;};
 const end=()=>{const h=recHost;rec=null;const b=$('ntMic_'+h);if(b){b.classList.remove('rec');b.textContent='🎤 Nota vocale';}const l=$('ntLive_'+h);if(l)l.textContent='';if(fin.trim())addNote(fin);};
 rec.onerror=e=>{if(live)live.textContent=e.error==='not-allowed'?'⚠️ Consenti il microfono per questo sito.':'⚠️ Non ho sentito: riprova.';};rec.onend=end;
 try{rec.start();if(btn){btn.classList.add('rec');btn.textContent='⏹️ Tocca per finire';}if(live)live.textContent='🎙️ Parla pure…';}catch(e){rec=null;}};
window.v65Type=()=>{const t=prompt('Scrivi la nota:');if(t)addNote(t);};
window.v65Done=id=>{const n=notes().find(x=>x.id===id);if(!n)return;n.done=n.done?0:Date.now();saveCfg();drawNotes();};
window.v65Del=id=>{const N=notes(),i=N.findIndex(x=>x.id===id);if(i<0)return;if(!confirm('Cancellare questa nota?'))return;N.splice(i,1);saveCfg();drawNotes();};
window.v65Keep=async id=>{const n=notes().find(x=>x.id===id);if(!n)return;const text=n.text;try{if(navigator.share){await navigator.share({title:'Nota Alicetta',text});n.keep=Date.now();saveCfg();drawNotes();return;}}catch(e){if(e&&e.name==='AbortError')return;}
 try{await navigator.clipboard.writeText(text);alert('📋 Nota copiata: apri Google Keep e incollala.');}catch(e){prompt('Copia la nota:',text);}};
window.v65All=h=>{const o=$('ntList_'+h);if(o){o.dataset.all=o.dataset.all?'':'1';drawNotes();}};
function noteHtml(h){const N=notes(),open=N.filter(n=>!n.done),box=$('ntList_'+h),all=box&&box.dataset.all,L=all?N:open.slice(0,4);
 return L.map(n=>`<div class="nt-it ${n.done?'done':''}"><span class="t"><span class="nt-c nt-${n.cat||'nota'}">${CATL[n.cat||'nota']||'📝 Nota'}</span> ${esc(n.text)}<small>${esc(n.by||'')} · ${new Date(n.ts).toLocaleString('it-IT',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}${n.keep?' · inviata a Keep':''}</small></span><span class="b"><button class="k" onclick="v65Keep('${n.id}')">📤 Keep</button><button onclick="v65Done('${n.id}')">${n.done?'↩️':'✅'}</button><button onclick="v65Del('${n.id}')">🗑️</button></span></div>`).join('')+((N.length>L.length||all)?`<div style="text-align:center;margin-top:6px;"><button class="btn-note" style="padding:5px 12px;font-size:.76rem;" onclick="v65All('${h}')">${all?'Mostra solo quelle da fare':'Vedi tutte ('+N.length+')'}</button></div>`:'');}
let lastSig='';
function drawNotes(){['ai','kds'].forEach(h=>{const b=$('ntList_'+h);if(b)b.innerHTML=noteHtml(h);const c=$('ntCnt_'+h);if(c){const o=notes().filter(n=>!n.done).length;c.textContent=o?o+(o===1?' nota da fare':' note da fare'):'Nessuna nota da fare';}});}
function noteBox(h){return `<div class="nt-box" id="ntBox_${h}"><div class="nt-row"><button class="nt-mic" id="ntMic_${h}" onclick="v65Mic('${h}')">🎤 Nota vocale</button><button class="nt-kb" onclick="v65Type()">⌨️</button></div><div class="nt-live" id="ntLive_${h}"></div><div style="font-size:.76rem;font-weight:800;opacity:.85;" id="ntCnt_${h}"></div><div id="ntList_${h}"></div></div>`;}
function placeNotes(){const t=$('hubTabs_ai');if(t&&!$('ntBox_ai')){const d=document.createElement('div');d.id='aiTop';d.innerHTML=noteBox('ai')+'<div id="bfBox"></div><div class="ag-row" id="agRow"></div>';t.before(d);drawNotes();}
 const k=document.querySelector('#viewKds .kds-Banner');if(k&&!$('ntBox_kds')){const d=document.createElement('div');d.innerHTML=noteBox('kds');k.after(d.firstChild);drawNotes();}
 const sig=JSON.stringify(notes().map(n=>[n.id,n.done?1:0,n.keep?1:0]));if(sig!==lastSig){lastSig=sig;drawNotes();}}
/* ---------- E) briefing prima del servizio ---------- */
let CLUB=null,clubAt=0;
async function bdays(){if(!/^christian$/i.test((state.waiterName||'').trim()))return[];if(!CLUB||Date.now()-clubAt>36e5){try{const o=await fbGet('/fidelity/cards')||{};CLUB=Object.values(o);clubAt=Date.now();}catch(e){CLUB=CLUB||[];}}
 const n=new Date(),out=[];CLUB.forEach(c=>{const m=String(c.bday||c.birthday||'').match(/(\d{2})[-\/](\d{2})$/);if(!m)return;let mo=+m[1],d=+m[2];if(/\//.test(c.bday||''))[d,mo]=[+m[1],+m[2]];let dt=new Date(n.getFullYear(),mo-1,d);const df=Math.round((dt-new Date(n.getFullYear(),n.getMonth(),n.getDate()))/864e5);if(df>=0&&df<=7)out.push({n:c.name,df,d,mo});});return out.sort((a,b)=>a.df-b.df);}
const AL=/allerg|celiac|intoller|glutine|lattosio|vegan|vegetar|senza |crostace|frutta a guscio|arachid/i;
window.v65Brief=async()=>{const hosts=['bfBox','bfKds','bfTav'].map(i=>$(i)).filter(Boolean);if(!hosts.length)return;const d=today(),R=Object.values(state.res||{}).filter(r=>r&&r.date===d&&!/cancel|noshow|no-show/i.test(r.status||'')).sort((a,b)=>String(a.time).localeCompare(String(b.time))),cov=R.reduce((s,r)=>s+(parseInt(r.covers,10)||0),0);
 const out=(state.menu||[]).filter(m=>m&&!['1 Coperto','2 Bevande'].includes(m.cat)&&(m.soldOut||(typeof stockLeft==='function'&&stockLeft(m)===0)));const open=Object.values(state.tables||{}).filter(t=>t.items&&t.items.length).length;const al=R.filter(r=>AL.test(r.note||''));
 const low=(state.menu||[]).filter(m=>m&&!['1 Coperto','2 Bevande'].includes(m.cat)&&!m.soldOut&&typeof stockLeft==='function'&&(()=>{const l=stockLeft(m);return l!==null&&l>0&&l<=5;})()).map(m=>({n:m.name,l:stockLeft(m)})).sort((a,b)=>a.l-b.l);
 let B=[];try{B=await bdays();}catch(e){}
 const say=[`Briefing di oggi.`,R.length?`${R.length} prenotazioni, ${cov} coperti.`:'Nessuna prenotazione.',...R.map(r=>`Alle ${r.time||''}, ${r.name||''}, ${r.covers||''} persone${r.note?', nota: '+r.note:''}.`),out.length?`Piatti finiti: ${out.map(m=>m.name).join(', ')}.`:'',low.length?`Quasi finiti: ${low.map(m=>m.n+', ne restano '+m.l).join('; ')}.`:'',B.length?`Compleanni del Club: ${B.map(b=>b.n).join(', ')}.`:''].filter(Boolean).join(' ');window._bfSay=say;
 const html=k=>`<details class="cart-section" style="margin-bottom:10px;" ${localStorage.getItem('alicetta_bf_open_'+k)===(k==='bfBox'?'0':'1')?(k==='bfBox'?'':'open'):(k==='bfBox'?'open':'')} ontoggle="localStorage.setItem('alicetta_bf_open_${k}',this.open?'1':'0')"><summary style="font-weight:900;font-size:1.05rem;cursor:pointer;">📋 Briefing di oggi${low.length||out.length?` · ⛔ ${out.length} finiti · ⚠️ ${low.length} quasi finiti`:''}</summary>
<div class="bf-k"><div>📅 Prenotazioni<b>${R.length}</b>${cov} coperti</div><div>⛔ Piatti finiti<b>${out.length}</b></div><div>🍽️ Tavoli aperti<b>${open}</b></div></div>
${R.length?R.map(r=>`<div class="bf-l">🕒 ${esc(r.time||'')} · <b>${esc(r.name||'')}</b> · ${esc(String(r.covers||''))} pers.${(r.tables||[]).length?' · '+(r.tables||[]).map(i=>esc((state.tables[i]||{}).name||i)).join('+'):''}${r.status==='arrivato'?' · ✅ arrivati':''}${r.note?`<br>${AL.test(r.note)?'<span class="bf-al">⚠️ '+esc(r.note)+'</span>':'📝 '+esc(r.note)}`:''}</div>`).join(''):'<div class="bf-l">Nessuna prenotazione per oggi.</div>'}
${al.length?`<div class="bf-l"><span class="bf-al">⚠️ ${al.length} ${al.length===1?'prenotazione con allergie o richieste':'prenotazioni con allergie o richieste'}: avvisa la cucina</span></div>`:''}
${out.length?`<div class="bf-l">⛔ Finiti: ${out.map(m=>esc(m.name)).join(' · ')}</div>`:''}${low.length?`<div class="bf-l">⚠️ Quasi finiti: ${low.map(m=>`${esc(m.n)} <span class="bf-low">${m.l}</span>`).join(' · ')}</div>`:''}
${B.length&&/^christian$/i.test((state.waiterName||'').trim())?`<div class="bf-l">🎂 Compleanni Club: ${B.map(b=>`<b>${esc(b.n||'')}</b> ${b.df===0?'oggi':b.df===1?'domani':'il '+String(b.d).padStart(2,'0')+'/'+String(b.mo).padStart(2,'0')}`).join(' · ')}</div>`:''}
<div style="text-align:right;margin-top:6px;"><button class="bf-say" onclick="v69Say()">🔊 Leggi ad alta voce</button><button class="btn-note" style="padding:5px 12px;font-size:.76rem;" onclick="v65Brief()">🔄 Aggiorna</button></div></details>`;
 hosts.forEach(h=>{const v=html(h.id);if(h.dataset.h!==v){const op=h.querySelector('details');const was=op?op.open:null;h.innerHTML=v;if(was!==null){const d2=h.querySelector('details');if(d2)d2.open=was;}h.dataset.h=v;}});};
window.v69Say=()=>{try{const u=new SpeechSynthesisUtterance(window._bfSay||'');u.lang='it-IT';u.rate=1;speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){alert('Questo telefono non legge ad alta voce.');}};
/* ---------- F) schede AI raggruppate in 4 ---------- */
const GRP=[['cucina','🍳','Cucina',['prev','chef','tempi','menu']],['chiedi','💬','Chiedi',['chiedi']],['rev','⭐','Recensioni',['rev']],['mkt','📣','Post',['post']]];
let G=localStorage.getItem('alicetta_ai_grp')||'cucina';
function grpApply(){const row=$('agRow'),T=[...document.querySelectorAll('#hubTabs_ai .hub-tab')];if(!row||!T.length)return;if(!row.children.length)row.innerHTML=GRP.map(g=>`<button data-g="${g[0]}" onclick="v65Grp('${g[0]}')"><b>${g[1]}</b>${g[2]}</button>`).join('');
 const act=T.find(t=>t.classList.contains('active'));if(act){const ag=GRP.find(g=>g[3].includes(act.dataset.p));if(ag&&ag[0]!==G){G=ag[0];localStorage.setItem('alicetta_ai_grp',G);}}
 const cur=GRP.find(g=>g[0]===G)||GRP[0];T.forEach(t=>t.classList.toggle('ag-hide',t.dataset.p!=='club'&&!cur[3].includes(t.dataset.p)));row.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.g===G));const dots=$('hubDots_ai');if(dots)dots.style.display='none';}
window.v65Grp=g=>{G=g;localStorage.setItem('alicetta_ai_grp',g);const cur=GRP.find(x=>x[0]===g),t=document.querySelector(`#hubTabs_ai .hub-tab[data-p="${cur[3][0]}"]`);if(t)t.click();grpApply();};
/* ---------- C) Sous-Chef: lista con caselle da spuntare ---------- */
function sousCk(){const box=$('sousChefBox');if(!box)return;const ai=[...box.children].find(d=>d.style&&/pre-wrap/.test(d.style.whiteSpace||''));if(!ai||ai.dataset.ck)return;const tx=(ai.textContent||'').trim();if(!tx||/^⏳/.test(tx)||tx.length<20)return;ai.dataset.ck='1';
 const key='alicetta_sc_'+today();let done={};try{done=JSON.parse(localStorage.getItem(key)||'{}');}catch(e){}
 const lines=tx.replace(/\*\*/g,'').split(/\n+/).map(l=>l.trim()).filter(Boolean);let i=0;
 const h=lines.map(l=>{const m=l.match(/^(?:[*•\-–]|\d+[.)])\s+(.*)$/);if(m){const id=i++;return `<label class="sc-it ${done[id]?'ok':''}"><input type="checkbox" ${done[id]?'checked':''} onchange="v65Sc(${id},this)"><span>${esc(m[1])}</span></label>`;}return `<div class="sc-h">${esc(l)}</div>`;}).join('');
 ai.style.display='none';const d=document.createElement('div');d.className='sc-ck';d.innerHTML='<div style="font-weight:900;">✅ Preparazione di oggi: spunta quello che hai fatto</div>'+h;ai.after(d);}
window.v65Sc=(id,el)=>{const key='alicetta_sc_'+today();let done={};try{done=JSON.parse(localStorage.getItem(key)||'{}');}catch(e){}done[id]=el.checked?1:0;localStorage.setItem(key,JSON.stringify(done));el.closest('.sc-it').classList.toggle('ok',el.checked);};
/* ---------- D) Turni: accanto ai coperti previsti, quelli già prenotati ---------- */
function turniRes(){const P=$('tuPlan');if(!P)return;const y=new Date().getFullYear();P.querySelectorAll('div').forEach(c=>{if(c.dataset.tr||c.children.length<2||c.closest('[data-tr]')||((c.textContent||'').match(/\b\d{2}\/\d{2}\b/g)||[]).length!==1)return;const own=[...c.childNodes].filter(n=>n.nodeType===1);const m=(c.textContent||'').match(/\b(\d{2})\/(\d{2})\b/);if(!m||!/coperti previsti/.test(c.textContent||'')||c.querySelector('[data-tr]'))return;
 if(!/coperti previsti/.test(own.map(n=>n.textContent).join(' ')))return;c.dataset.tr='1';const d=`${y}-${m[2]}-${m[1]}`;const R=Object.values(state.res||{}).filter(r=>r&&r.date===d&&!/cancel|noshow/i.test(r.status||''));const cov=R.reduce((s,r)=>s+(parseInt(r.covers,10)||0),0);if(!R.length)return;
 const s=document.createElement('div');s.innerHTML=`<span class="tu-res">📅 Già prenotati: ${cov} coperti in ${R.length} ${R.length===1?'prenotazione':'prenotazioni'}</span>`;c.appendChild(s);});}
let bfDay='';
function bfHosts(){const kb=$('ntBox_kds');if(kb&&!$('bfKds')){const d=document.createElement('div');d.id='bfKds';kb.after(d);}
 const vt=$('viewTables');if(vt&&!$('bfTav')){const d=document.createElement('div');d.id='bfTav';d.style.margin='0 0 10px';const ref=vt.querySelector('.room-tabs,.rooms,#roomTabs')||vt.firstElementChild;if(ref&&ref.parentNode===vt)vt.insertBefore(d,ref.nextSibling);else vt.prepend(d);}}
setInterval(()=>{try{placeNotes();grpApply();sousCk();turniRes();bfHosts();const k=today()+'|'+JSON.stringify(Object.values(state.res||{}).map(r=>[r.time,r.covers,r.status,r.note]))+'|'+(state.menu||[]).map(m=>(m.soldOut?1:0)+':'+(typeof stockLeft==='function'?stockLeft(m):'')).join(',')+'|'+Math.floor(Date.now()/6e4);if(k!==bfDay&&['bfBox','bfKds','bfTav'].some(i=>$(i))){bfDay=k;window.v65Brief();}}catch(e){}},900);
})();
}catch(e){console.error("chef-extra v2.9.65",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const st=document.createElement('style');
st.textContent=`#hubTabs_sales .hub-tab[data-p="buoni"]{display:none!important}#cuBuoni .hub-page,#cuBuoni #hub_sales_buoni{display:block!important}#cuBuoni{margin-top:10px}
.gh-b{border-radius:14px;padding:10px 12px;margin:8px 0;background:#FEF3C7;color:#78350F;font-weight:800;font-size:.86rem;border:2px solid #F59E0B}.gh-b button{display:block;width:100%;margin-top:8px;border:0;border-radius:12px;padding:11px;font-weight:900;background:#F59E0B;color:#3B2A00}.gh-chip{display:block;margin-top:4px;font-size:.7rem;font-weight:900;background:#FEF3C7;color:#78350F;border-radius:999px;padding:2px 8px}
.dup-chip{display:inline-block;margin-top:5px;font-size:.74rem;font-weight:900;background:#FEF3C7;color:#78350F;border-radius:8px;padding:3px 8px;border:1px solid #F59E0B}
.vc-ov{position:fixed;inset:0;z-index:99990;background:rgba(2,6,23,.72);display:flex;align-items:center;justify-content:center;padding:14px}.vc-box{width:min(460px,100%);max-height:86vh;display:flex;flex-direction:column;border-radius:20px;padding:16px;background:#fff;color:#0F2933}body.dark .vc-box{background:#1E293B;color:#F1F5F9}.vc-l{overflow:auto;margin:10px 0;border-top:1px dashed rgba(148,163,184,.6)}.vc-l div{display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-bottom:1px dashed rgba(148,163,184,.6);font-size:.86rem;font-weight:700}.vc-l small{opacity:.75;font-weight:700}`;
document.head.appendChild(st);
/* ---------- 1) Buoni regalo dentro Clienti ---------- */
let lastS='';
function buoniMove(){const v=$('viewRes'),rc=$('resContent'),pg=$('hub_sales_buoni');if(!v||!rc||!pg)return;let h=$('cuBuoni');if(!h){h=document.createElement('div');h.id='cuBuoni';rc.after(h);}if(pg.parentNode!==h)h.appendChild(pg);
 const on=(localStorage.getItem('alicetta_cu_tab')||'pren')==='buoni';h.style.display=on?'':'none';
 if(on&&v.classList.contains('active')){if(!pg.classList.contains('active'))pg.classList.add('active');if(!pg.dataset.ld){pg.dataset.ld='1';try{window.v211Show&&window.v211Show('sales','buoni');}catch(e){}}}else if(!on){pg.dataset.ld='';}
 const tabs=[...document.querySelectorAll('#hubTabs_sales .hub-tab')],act=tabs.find(t=>t.classList.contains('active'));
 if(act&&act.dataset.p==='buoni'&&$('viewSales')&&$('viewSales').classList.contains('active')){const i=tabs.indexOf(act),nx=tabs[i+1],pv=tabs[i-1];const go=(lastS&&nx&&lastS===nx.dataset.p)?pv:(nx||pv);if(go)go.click();}else if(act)lastS=act.dataset.p;}
/* ---------- 2) tavolo "fantasma": già pagato ma tornato aperto ---------- */
const ids=L=>new Set((L||[]).map(i=>String(i.lineId)));
function paidTwin(t){if(!t||!t.items||!t.items.length)return null;const mine=ids(t.items),lim=Date.now()-18*36e5;
 return (state.historyLog||[]).slice().reverse().find(e=>{if(!e||(e.ts||0)<lim||!e.items||!e.items.length)return false;const his=ids(e.items);for(const k of mine)if(!his.has(k))return false;return true;})||null;}
window.v66Ghost=async()=>{const t=state.tables[state.activeTableId],e=paidTwin(t);if(!t||!e)return;if(!confirm(`Libero ${t.name} senza creare un altro conto?\nIl conto da € ${formatPrice(e.total||0)} delle ${e.time||''} resta com’è.`))return;
 t.items=[];t.openedAt=0;t.invoice=null;t.preAt=0;t.copOff=0;t.copOffVal=0;t.copOffLog=[];t.customerName='';t.split=null;try{t.firedAt={};t.doneAt={};}catch(x){}
 try{await saveState(false,{tables:[t.id]});}catch(x){}try{switchMainView('tables');renderTables();}catch(x){}try{toast('🧹 '+t.name+' liberato: nessun conto doppio');}catch(x){}};
{const _o=renderOrderScreen;renderOrderScreen=function(){const r=_o.apply(this,arguments);try{document.querySelectorAll('.gh-b').forEach(x=>x.remove());const t=state.tables[state.activeTableId],e=paidTwin(t);if(e){const d=document.createElement('div');d.className='gh-b';d.innerHTML=`👻 Attenzione: questi piatti risultano <b>già pagati</b> alle ${esc(e.time||'')} (${esc(e.tableName||'')} · € ${formatPrice(e.total||0)}). Il tavolo è tornato aperto per un problema di sincronizzazione tra dispositivi: <b>non incassarlo di nuovo</b>.<button onclick="v66Ghost()">🧹 Libera il tavolo senza rifare il conto</button>`;
  const host=document.querySelector('#viewOrder .cart-section')||$('viewOrder');if(host)host.prepend(d);}}catch(e){}return r;};}
{const _r=renderTables;renderTables=function(){const r=_r.apply(this,arguments);try{document.querySelectorAll('#tablesContainer .table-card[data-tid]').forEach(c=>{const t=state.tables[c.dataset.tid];let e=c.querySelector('.gh-chip');const g=paidTwin(t);if(!g){if(e)e.remove();return;}if(!e){e=document.createElement('span');e.className='gh-chip';c.appendChild(e);}e.textContent='👻 già pagato alle '+(g.time||'');});}catch(e){}return r;};}
/* nei conti: segnala i doppioni (stessi piatti dello stesso tavolo) */
function dupMark(){const L=$('contiList');if(!L)return;const H=state.historyLog||[];L.querySelectorAll('details').forEach(d=>{if(d.dataset.dp)return;const b=d.querySelector('button[onclick]');const m=b&&String(b.getAttribute('onclick')).match(/\((\d{12,})/);if(!m)return;d.dataset.dp='1';const e=H.find(x=>x&&String(x.ts)===m[1]);if(!e||!e.items||!e.items.length)return;const mine=ids(e.items);
 const tw=H.find(x=>x&&x!==e&&x.items&&x.items.length&&(x.ts||0)<(e.ts||0)&&(e.ts-x.ts)<24*36e5&&[...mine].every(k=>ids(x.items).has(k)));if(!tw)return;const s=d.querySelector('summary'),left=s&&s.firstElementChild;if(!left)return;const c=document.createElement('span');c.className='dup-chip';c.textContent=`⚠️ Possibile doppione del conto delle ${tw.time||''}: stessi piatti. Se SumUp ha un solo pagamento, apri ed elimina questo.`;left.appendChild(c);});}
/* ---------- 3) anteprima dei contatti prima di importarli ---------- */
if(typeof window.v64ClubVcf==='function'){const _v=window.v64ClubVcf;window.v64ClubVcf=function(){const L=((typeof fidCache!=='undefined'&&fidCache)||[]).filter(c=>c&&c.phone);if(!L.length)return _v.apply(this,arguments);
 const num=p=>{let d=String(p||'').replace(/\D/g,'');if(d.startsWith('00'))d=d.slice(2);if(d.length===10&&d[0]==='3')d='39'+d;return '+'+d.replace(/^(\d{2})(\d{3})(\d{3})(\d+)$/,'$1 $2 $3 $4');};
 const o=document.createElement('div');o.className='vc-ov';o.innerHTML=`<div class="vc-box"><h3 style="margin:0 0 4px;">📇 Così verranno salvati nel telefono</h3><div style="font-size:.8rem;font-weight:700;opacity:.8;">${L.length} contatti. Il nome inizia con “Cliente Club”, così li ritrovi tutti insieme in rubrica e nelle liste di WhatsApp. Se un numero c’è già, Android di solito unisce i due contatti.</div>
<div class="vc-l">${L.map(c=>`<div><span><b>Cliente Club ${esc(String(c.name||'').trim())}</b><br><small>Nota: Alicetta Club${c.mkt?' · accetta promo':''}</small></span><span style="white-space:nowrap;">${esc(num(c.phone))}</span></div>`).join('')}</div>
<div style="display:grid;grid-template-columns:1fr 1.4fr;gap:8px;"><button class="btn-main btn-print" id="vcNo">Annulla</button><button class="btn-main btn-bill" id="vcOk">⬇️ Scarica e importa</button></div></div>`;
 document.body.appendChild(o);o.querySelector('#vcNo').onclick=()=>o.remove();o.querySelector('#vcOk').onclick=()=>{o.remove();_v();};o.onclick=e=>{if(e.target===o)o.remove();};};}
setInterval(()=>{try{buoniMove();dupMark();}catch(e){}},800);
})();
}catch(e){console.error("chef-extra v2.9.66",e);}
try{
(function(){
const $=id=>document.getElementById(id);
const owner=()=>/^christian$/i.test((state.waiterName||'').trim());
const HIDE=['club','turni','rank','costi','report'];
const st=document.createElement('style');
st.textContent=HIDE.map(k=>`#hubTabs_ai .hub-tab[data-p="${k}"]`).join(',')+'{display:none!important}#numBox .hub-page,#oreTurni .hub-page{display:block!important}#oreTurni{margin-top:12px}.num-d{margin-bottom:10px}.num-d>summary{list-style:none;cursor:pointer;font-weight:900;font-size:1.05rem;padding:13px 14px;border-radius:16px;background:rgba(77,124,15,.22);border:2px solid rgba(132,204,22,.6);display:flex;justify-content:space-between;align-items:center}.num-d>summary::after{content:"▾";font-size:1.1rem}.num-d[open]>summary::after{content:"▴"}.num-d[open]>summary{margin-bottom:8px}.ore-h{font-weight:900;font-size:1.1rem;margin:14px 2px 8px}';
document.head.appendChild(st);
const show=(k)=>{const n=$('hub_ai_'+k);if(!n)return;n.classList.add('active');try{window.v211Show&&window.v211Show('ai',k);}catch(e){}};
/* ---------- Turni e costo del personale dentro Ore ---------- */
let oreOn=false;
function ore(){const v=$('viewTime'),tc=$('timeContent'),pg=$('hub_ai_turni');if(!v||!tc||!pg)return;let h=$('oreTurni');if(!h){h=document.createElement('div');h.id='oreTurni';h.innerHTML='<div class="ore-h">👥 Turni e costo del personale</div>';tc.after(h);}if(pg.parentNode!==h)h.appendChild(pg);
 h.style.display=owner()?'':'none';const act=v.classList.contains('active')&&owner();if(act&&!oreOn){oreOn=true;show('turni');}else if(!act)oreOn=false;}
/* ---------- Classifica, Costi e Report dentro Vendite › Numeri ---------- */
const NUM=[['rank','🏆 Classifica dei piatti'],['costi','💰 Costi e margini'],['report','📰 Report della settimana']];
function numeri(){const pc=$('hub_sales_conti');if(!pc)return;let b=$('numBox');if(!b){b=document.createElement('div');b.id='numBox';b.innerHTML=NUM.map(([k,l],i)=>`<details class="num-d" data-k="${k}" ${i===0?'open':''}><summary>${l}</summary><div class="num-c"></div></details>`).join('');pc.appendChild(b);
  b.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)show(d.dataset.k);}));}
 NUM.forEach(([k])=>{const n=$('hub_ai_'+k),c=b.querySelector(`details[data-k="${k}"] .num-c`);if(n&&c&&n.parentNode!==c)c.appendChild(n);});
 const t=document.querySelector('#hubTabs_sales .hub-tab[data-p="conti"]');if(t&&t.textContent!=='📊 Numeri')t.textContent='📊 Numeri';
 const vis=!!pc.offsetParent;if(vis&&!b.dataset.on){b.dataset.on='1';const o=b.querySelector('details[open]');if(o)show(o.dataset.k);}else if(!vis)b.dataset.on='';}
/* il filtro "Pagati con carta/contanti" porta all'elenco dei conti nella pagina Oggi */
if(typeof payFilter==='function'){const _p=payFilter;payFilter=function(m){const r=_p.apply(this,arguments);try{if(state.contiPay){const t=document.querySelector('#hubTabs_sales .hub-tab[data-p="oggi"]');if(t)t.click();setTimeout(()=>{const c=$('contiList');if(c)c.scrollIntoView({behavior:'smooth',block:'start'});},150);}}catch(e){}return r;};}
/* nella barra AI: salta le schede spostate */
let last='';
function skip(){const v=$('viewAi');if(!v||!v.classList.contains('active'))return;const T=[...document.querySelectorAll('#hubTabs_ai .hub-tab')],a=T.find(t=>t.classList.contains('active'));if(!a)return;if(!HIDE.includes(a.dataset.p)){last=a.dataset.p;return;}
 const i=T.indexOf(a),vis=t=>t&&!HIDE.includes(t.dataset.p);let f=T.slice(i+1).find(vis),bk=T.slice(0,i).reverse().find(vis);const li=T.findIndex(t=>t.dataset.p===last);const go=(li>i?bk:f)||f||bk;if(go)go.click();}
setInterval(()=>{try{ore();numeri();skip();}catch(e){}},700);
})();
}catch(e){console.error("chef-extra v2.9.67",e);}
try{
(function(){
const $=id=>document.getElementById(id);
const st=document.createElement('style');
st.textContent='body .star-row button.on,body.dark .star-row button.on,body.dark #hub_ai_rev .star-row button.on{background:#F59E0B!important;color:#3B2A00!important;border-color:#FDE68A!important;transform:scale(1.06)}#rvStarAuto{font-size:.74rem;font-weight:800;opacity:.85;margin:-2px 0 6px}';document.head.appendChild(st);
const SIG='la Ciurma di Alicetta';
{const w=()=>{if(typeof window.v215Sig==='function'&&!window.v215Sig._c){const _s=window.v215Sig;window.v215Sig=function(s,b){localStorage.setItem('alicetta_rv_sig',s);const r=_s.apply(this,arguments);try{b.parentElement.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));}catch(e){}return r;};window.v215Sig._c=1;}};w();setTimeout(w,2000);}
function sig(){const el=$('hub_ai_rev');if(!el)return;const ch=[...el.querySelectorAll('.chips')].find(c=>/Tutta la brigata/.test(c.textContent||''));if(!ch||ch.querySelector('[data-ciurma]'))return;
 const b=document.createElement('button');b.className='chipb';b.dataset.ciurma='1';b.textContent='⚓ '+SIG;b.onclick=()=>window.v215Sig(SIG,b);const nes=[...ch.children].find(x=>/Nessuna/.test(x.textContent||''));ch.insertBefore(b,nes||null);
 const saved=localStorage.getItem('alicetta_rv_sig');if(saved===SIG){ch.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));try{window.v215Sig(SIG,b);}catch(e){}}
 const lb=[...el.querySelectorAll('.v14-lbl')].find(x=>/^Stelle/.test(x.textContent||''));if(lb&&!$('rvStarAuto')){const n=document.createElement('div');n.id='rvStarAuto';n.textContent='Con lo screenshot le stelle si scelgono da sole; qui servono solo se incolli il testo.';lb.after(n);}}
setInterval(()=>{try{sig();}catch(e){}},700);
})();
}catch(e){console.error("chef-extra v2.9.68",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);const CUR='v2.9.77';
const owner=()=>/^christian$/i.test((state.waiterName||'').trim());
const st=document.createElement('style');
st.textContent=`.qr-c1{background:#FF5A36!important;color:#fff!important;box-shadow:0 4px 0 #B3361A!important}.qr-c2{background:#FDE047!important;color:#3B2A00!important;box-shadow:0 4px 0 #CA8A04!important}.qr-c3{background:#22C55E!important;color:#052E16!important;box-shadow:0 4px 0 #15803D!important}.qr-c4{background:#1BE7FF!important;color:#062329!important;box-shadow:0 4px 0 #0E7490!important}.qr-c5{background:#7C3AED!important;color:#fff!important;box-shadow:0 4px 0 #4C1D95!important}.qr-c6{background:#EC4899!important;color:#fff!important;box-shadow:0 4px 0 #9D174D!important}.qr-c1,.qr-c2,.qr-c3,.qr-c4,.qr-c5,.qr-c6{-webkit-text-fill-color:currentColor!important;text-shadow:none!important;border:0!important}
.wn-ov{position:fixed;inset:0;z-index:99995;background:rgba(2,6,23,.75);display:flex;align-items:center;justify-content:center;padding:14px}.wn-box{width:min(480px,100%);max-height:84vh;overflow:auto;border-radius:22px;padding:18px;background:#fff;color:#0F2933;box-shadow:0 20px 50px rgba(0,0,0,.45)}body.dark .wn-box{background:#1E293B;color:#F1F5F9}.wn-box h3{margin:0 0 4px;font-size:1.25rem}.wn-v{font-weight:900;margin:12px 0 4px;color:#7C3AED}body.dark .wn-v{color:#C4B5FD}.wn-box li{margin:4px 0;font-weight:700;font-size:.9rem;line-height:1.35}.wn-ok{width:100%;margin-top:12px;border:0;border-radius:14px;padding:13px;font-weight:900;font-size:1rem;background:#7C3AED;color:#fff}
.pp-box{margin-bottom:10px}.pp-res{white-space:pre-wrap;border-radius:12px;padding:10px;margin:8px 0;background:rgba(124,58,237,.12);font-size:.88rem;font-weight:600}.pp-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ch-say{margin-top:8px;border:0;border-radius:12px;padding:9px 12px;font-weight:900;background:#7C3AED;color:#fff}`;
document.head.appendChild(st);
/* ---------- 1) finestra QR: un colore diverso per ogni tasto ---------- */
const QRC=[[/Vedi il menù come lo vedono/,'qr-c1'],[/QR del menù pranzo/,'qr-c2'],[/Vedi il menù pranzo/,'qr-c3'],[/Tag NFC/,'qr-c4'],[/biglietto da visita/,'qr-c5'],[/QR Club|Alicetta Club/,'qr-c6']];
function qrCol(){const ov=$('qrModal');if(!ov||!ov.classList.contains('active'))return;ov.querySelectorAll('button').forEach(b=>{if(b.dataset.qc)return;const t=b.textContent||'';const m=QRC.find(([r])=>r.test(t));if(m){b.classList.add(m[1]);b.dataset.qc='1';}});}
/* ---------- 4a) recensioni: Gemini conosce i piatti del menù ---------- */
{const w=()=>{if(typeof window.v215Gen==='function'&&!window.v215Gen._m){const _g=window.v215Gen;window.v215Gen=async function(){const ta=[...document.querySelectorAll('#hub_ai_rev textarea')].find(t=>/cliente abituale/.test(t.placeholder||''));const orig=ta?ta.value:'';
  const D=(state.menu||[]).filter(m=>m&&!['1 Coperto','2 Bevande'].includes(m.cat)&&m.name).map(m=>m.name).slice(0,45);
  try{if(D.length&&window.v215Set)v215Set('note',(orig?orig+'\n':'')+'Piatti del nostro menù (se la recensione ne nomina uno, citalo con il nome giusto, senza inventarne altri): '+D.join('; '));}catch(e){}
  try{return await _g.apply(this,arguments);}finally{try{window.v215Set&&v215Set('note',orig);}catch(e){}}};window.v215Gen._m=1;}};w();setTimeout(w,2500);}
/* ---------- 4b) recensione da 1-3 stelle: nota automatica per la brigata ---------- */
{const w=()=>{if(typeof window.v64RvShot==='function'&&!window.v64RvShot._n){const _r=window.v64RvShot;window.v64RvShot=async function(){const res=await _r.apply(this,arguments);try{const L=JSON.parse(localStorage.getItem('alicetta_rvl')||'[]');const seen=JSON.parse(localStorage.getItem('alicetta_rv_noted')||'{}');let n=0;
  L.forEach(r=>{if(!r||!(r.stelle<=3))return;const k=(r.nome||'')+'|'+String(r.testo||'').slice(0,60);if(seen[k])return;seen[k]=Date.now();n++;window.v65AddNote&&v65AddNote(`Recensione ${r.stelle}★ di ${r.nome||'un cliente'}: “${String(r.testo||'').slice(0,160)}” — parliamone e vediamo cosa migliorare`,'fare');});
  localStorage.setItem('alicetta_rv_noted',JSON.stringify(seen));if(n)setTimeout(()=>{try{toast('📝 '+n+(n===1?' recensione negativa messa':' recensioni negative messe')+' nelle note per la brigata');}catch(e){}},1200);}catch(e){}return res;};window.v64RvShot._n=1;}};w();setTimeout(w,2500);}
/* ---------- 4c) Chiedi: domande rapide e risposta letta ad alta voce ---------- */
const QQ=['Com’è andata ieri?','Qual è il piatto più venduto questa settimana?','Quanto ho incassato questo mese?','Quanti coperti ho fatto la settimana scorsa?'];
window.v69Q=i=>{try{v217Q(QQ[i]);const e=$('chQ');if(e)e.value=QQ[i];v217Ask(QQ[i]);}catch(e){}};
window.v69Read=()=>{const o=$('chOut');const t=o&&o.innerText.replace(/🔊 Leggi la risposta/g,'').trim();if(!t)return;try{const u=new SpeechSynthesisUtterance(t.slice(0,1200));u.lang='it-IT';speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){}};
function chiedi(){const el=$('hub_ai_chiedi');if(!el)return;const s=el.querySelector('.cart-section');if(s&&!$('chQuick')){const d=document.createElement('div');d.id='chQuick';d.innerHTML='<div class="v14-lbl">⚡ Domande rapide</div><div class="chips">'+QQ.map((q,i)=>`<button class="chipb" onclick="v69Q(${i})">${esc(q)}</button>`).join('')+'</div>';const m=$('chMsg');if(m)m.after(d);else s.appendChild(d);}
 const o=$('chOut');if(o&&o.innerText.trim().length>20&&!o.querySelector('.ch-say')){const b=document.createElement('button');b.className='ch-say';b.textContent='🔊 Leggi la risposta';b.onclick=window.v69Read;o.appendChild(b);}}
/* ---------- 4d) post social dalla foto del piatto ---------- */
let PP={busy:false,res:null,file:null};
window.v69PostPhoto=async inp=>{const f=inp.files&&inp.files[0];inp.value='';if(!f)return;if(!getGeminiKey())return alert('Serve la chiave Gemini in ⚙️ Opzioni.');PP={busy:true,res:null,file:f};drawPP();
 const M=(state.menu||[]).filter(m=>m&&!['1 Coperto'].includes(m.cat)&&m.name).map(m=>`${m.name} | € ${formatPrice(m.price||0)}${Array.isArray(m.allergens)&&m.allergens.length&&m.allergens[0]!=='nessuno'?' | allergeni: '+m.allergens.join(', '):''}`).slice(0,70);
 window._jobLabel='📸 Post dalla foto';
 try{const b64=await shrinkImage(f,1200);const r=await callGemini([{inline_data:{mime_type:'image/jpeg',data:b64}},{text:`Sei il social media manager di Alicetta Trattoria, trattoria di mare a Fossacesia sulla Costa dei Trabocchi. Guarda la foto e riconosci quale piatto del menù è (scegli SOLO dalla lista). Poi scrivi un post per Instagram e uno per Facebook, in italiano, tono caldo e naturale, niente frasi fatte, al massimo 3 emoji, con il prezzo e, se ci sono, gli allergeni. Hashtag solo nel post Instagram (6-9, locali e di cucina). Menù:\n${M.join('\n')}\nRispondi SOLO JSON: {"piatto":string,"instagram":string,"facebook":string}`}],true,{timeout:60000,maxTokens:2048});
  PP.res=JSON.parse(r.slice(r.indexOf('{'),r.lastIndexOf('}')+1));}catch(e){PP.res={err:e.message||String(e)};}finally{PP.busy=false;drawPP();setTimeout(()=>{if(window._jobLabel==='📸 Post dalla foto')window._jobLabel='';},2000);}};
window.v69PPShare=async k=>{const t=PP.res&&PP.res[k];if(!t)return;try{if(PP.file&&navigator.canShare&&navigator.canShare({files:[PP.file]})){await navigator.share({files:[PP.file],text:t});return;}if(navigator.share){await navigator.share({text:t});return;}}catch(e){if(e&&e.name==='AbortError')return;}
 try{await navigator.clipboard.writeText(t);toast('📋 Testo copiato');}catch(e){prompt('Copia il testo:',t);}};
function drawPP(){const b=$('ppBox');if(!b)return;const R=PP.res;b.innerHTML=`<div class="cs-h"><h3>📸 Post dalla foto del piatto</h3></div><div class="fc-sub" style="margin-bottom:8px;">Fotografa il piatto: Gemini lo riconosce dal menù e scrive i post con prezzo e allergeni.</div>
<label class="btn-main" style="display:block;text-align:center;background:#7C3AED;color:#fff;cursor:pointer;">${PP.busy?'⏳ Sto scrivendo i post…':'📸 Fotografa il piatto'}<input type="file" accept="image/*" capture="environment" style="display:none" onchange="v69PostPhoto(this)"></label>
${R&&R.err?`<div class="pp-res">❌ ${esc(R.err)}</div>`:''}${R&&!R.err?`<div class="fc-sub" style="margin-top:8px;font-weight:900;">🍽️ ${esc(R.piatto||'')}</div><div class="v14-lbl">Instagram</div><div class="pp-res">${esc(R.instagram||'')}</div><div class="v14-lbl">Facebook</div><div class="pp-res">${esc(R.facebook||'')}</div><div class="pp-row"><button class="btn-main btn-bill" onclick="v69PPShare('instagram')">📤 Condividi Instagram</button><button class="btn-main btn-print" onclick="v69PPShare('facebook')">📤 Condividi Facebook</button></div>`:''}`;}
function post(){const el=$('hub_ai_post');if(!el||$('ppBox'))return;const s=el.querySelector('.cart-section');if(!s)return;const d=document.createElement('div');d.id='ppBox';d.className='cart-section pp-box';el.insertBefore(d,s);drawPP();}
/* ---------- 5) novità della versione ---------- */
const LOG=[
['v2.9.77',['✅ Chiamate: sulla notifica c’è il tasto “Ricevuto”. Lo tocchi e il suono si ferma, e chi ha chiamato riceve “Serena ha ricevuto la chiamata”.','🔔 Le chiamate ora suonano a priorità alta (una volta sola) e toccando la notifica si apre l’app.']],
['v2.9.77',['🖥️ KDS: le comande dei tavoli ora sono subito sotto la barra dei tasti; briefing, note vocali e avvisi sono più piccoli e stanno sotto.','🔔 Notifiche: chi manda l’avviso non lo riceve più. Ogni dispositivo ora ha UN solo argomento ntfy (il suo nome). Vedi Opzioni › Controllo notifiche per l’argomento giusto e le prove.','🔎 In Opzioni puoi provare la notifica e controllare se il server la riceve: se non suona, l’elenco ti dice cosa guardare nell’app ntfy.']],
['v2.9.75',['🎁 Il “−” su caffè e coperto ora chiede: Offerto (resta sullo scontrino come OFFERTO) oppure Errore (toglie del tutto).','⏳ Avviso “stanno per finire”: in base alle ultime serate, ti dice quali piatti con scorta finiranno e verso che ora (in Tavoli e sul KDS).','💌 Club › Grazie ai clienti di ieri sera: messaggio WhatsApp ai soci con consenso, anche scritto da Gemini.','🏷️ HACCP › Lotti e scadenze: foto dell’etichetta, Gemini legge lotto e scadenza, riempie la scheda SC1 e ti avvisa quando un prodotto sta per scadere.']],
['v2.9.74',['🔁 Rimetti un piatto: dal tasto nella finestra “Aggiungi piatto” e sul KDS (🔁 RIMETTI PIATTO) trovi i piatti finiti e tutti quelli già fatti in passato, da rimettere con un tocco.','I piatti segnati FINITO sulla lavagnetta restano in lista come ESAURITI (non spariscono più), così il KDS può rimetterli.','📸 Chiusura cassa: foto dello scontrino Z o del report SumUp, Gemini legge i totali e verifica da solo.','🔎 Se i conti non tornano l’app indica il conto sospetto, e 🤖 Gemini lo spiega.']],
['v2.9.73',['Vendite: ora vengono prima i conti, poi la 🧾 Chiusura cassa (con 🔍 Allinea i conti) e solo dopo le fatture da emettere.','Dopo "Verifica e salva chiusura" compare un grande riquadro animato: ✅ I CONTI TORNANO! (verde, con la spunta e i coriandoli) oppure ⚠️ I CONTI NON TORNANO (rosso).']],
['v2.9.72',['⭐ Recensioni ha un tasto tutto suo in cima alla sezione AI (prima era dentro Marketing).','Tema chiaro: celeste più deciso al posto del quasi bianco.','HACCP: 📚 Tutte le schede (SC1, SC2, SC3, SC4, SC6, SC8) uguali ai moduli di carta, da vedere, stampare e condividere.','📦 Tutte le bolle e fatture acquisite, con ricerca e foto del documento.']],
['v2.9.71',['Tema chiaro: celeste tenue con bordino verde acido.','Briefing: tasto ⏹️ Ferma per interrompere la lettura ad alta voce.','HACCP: nuova scheda SC2 Prodotti non conformi, compilata dai dati della bolla e stampabile uguale al modulo cartaceo.','HACCP: un tasto per stampare o condividere tutte le schede insieme.']],
['v2.9.70',['Tema chiaro più riposante: niente più bianco pieno.','📅 Chiusura della giornata in Vendite › Chiusura: numeri del giorno, racconto a voce e riassunto con Gemini; la sera l’app te la ricorda.','🛒 Lista spesa dalle note vocali, divisa per tipo, da mandare su WhatsApp.','Sous-Chef: le porzioni tengono conto anche delle prenotazioni di oggi.','🌍 Traduttore per parlare con i clienti stranieri (sul tavolo e in AI › Chiedi).']],
['v2.9.69',['Finestra 📲: ogni tasto ha un colore diverso.','Briefing di oggi anche sui Tavoli e sul KDS, con i piatti quasi finiti e il tasto 🔊 per leggerlo ad alta voce.','Note vocali smistate da sole in 🛒 Spesa, 🔧 Da fare e 📝 Nota.','Recensioni: le risposte citano i piatti veri del menù; quelle da 1-3★ diventano una nota per la brigata.','Chiedi: domande rapide e 🔊 risposta letta ad alta voce.','Post: 📸 foto del piatto → post Instagram e Facebook con prezzo e allergeni.','Questa finestra delle novità: la ritrovi in Opzioni.']],
['v2.9.68',['Soci salvati in rubrica come “Cliente Club …”.','Recensioni: stella scelta ben visibile e firma “⚓ la Ciurma di Alicetta”.']],
['v2.9.67',['Turni e costo del personale spostati in Ore.','Vendite › 📊 Numeri: Classifica, Costi e margini, Report.']],
['v2.9.66',['Buoni regalo spostati in Clienti.','Tavolo già pagato che torna aperto: avviso 👻 e liberazione senza doppio conto.','Anteprima dei contatti prima di salvarli in rubrica.']],
['v2.9.65',['Chiavi SumUp con copia di sicurezza.','🎤 Note vocali in AI e sul KDS, con invio a Google Keep.','Briefing di oggi, schede AI raggruppate, Sous-Chef a caselle, prenotati nei turni.']],
['v2.9.64',['Colori controllati in tutta l’app; totale rosso, cassa locale giallo, SumUp verde.','Recensioni da screenshot; Campagne Club in Clienti; icone Trattoria e Mare.']]];
const vn=v=>v.replace(/[^\d.]/g,'').split('.').map(Number);const newer=(a,b)=>{const x=vn(a),y=vn(b);for(let i=0;i<3;i++){if((x[i]||0)!==(y[i]||0))return (x[i]||0)>(y[i]||0);}return false;};
function listHtml(L){return L.map(([v,a])=>`<div class="wn-v">${v}</div><ul style="margin:0;padding-left:18px;">${a.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`).join('');}
function whatsNew(){const seen=localStorage.getItem('alicetta_seen_ver');if(seen===CUR)return;const L=seen?LOG.filter(([v])=>newer(v,seen)):LOG.slice(0,1);localStorage.setItem('alicetta_seen_ver',CUR);if(!L.length)return;
 const o=document.createElement('div');o.className='wn-ov';o.innerHTML=`<div class="wn-box"><h3>🆕 Cosa c’è di nuovo</h3><div style="font-size:.8rem;font-weight:700;opacity:.8;">Chef Bull Brigade ${CUR}. Ritrovi queste note in ⚙️ Opzioni › Novità.</div>${listHtml(L)}<button class="wn-ok">👍 Ho capito</button></div>`;document.body.appendChild(o);o.querySelector('.wn-ok').onclick=()=>o.remove();}
function notesCard(){const v=$('viewMenuMgr');if(!v||$('wnCard'))return;const c=document.createElement('details');c.id='wnCard';c.className='cart-section';c.innerHTML=`<summary style="font-weight:900;font-size:1.05rem;cursor:pointer;">🆕 Novità delle versioni <span style="font-size:.78rem;opacity:.75;">(${CUR})</span></summary>${listHtml(LOG)}`;const t=v.querySelector('.screen-title');if(t)t.after(c);else v.prepend(c);}
setTimeout(whatsNew,3500);
setInterval(()=>{try{qrCol();chiedi();post();notesCard();}catch(e){}},700);
})();
}catch(e){console.error("chef-extra v2.9.69",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const owner=()=>/^christian$/i.test((state.waiterName||'').trim());
const cfg=()=>(state.staffCfg=state.staffCfg||{});const saveCfg=()=>{try{saveState(false,{staff:true});}catch(e){}};
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
const st=document.createElement('style');
st.textContent=`
/* ---- tema chiaro più riposante: niente bianco pieno ---- */
body:not(.dark){--card:#EEE7FA}
body:not(.dark) .cart-section,body:not(.dark) .receipt-box,body:not(.dark) .modal-box{background:#EEE7FA!important;border-color:#D9CCF2!important}
body:not(.dark) .cart-section [style*="background:#fff"],body:not(.dark) .cart-section [style*="background:#FFF"],body:not(.dark) .cart-section [style*="background: #fff"],body:not(.dark) .receipt-box[style*="background:#fff"],body:not(.dark) .wn-box,body:not(.dark) .vc-box{background:#F5F0FC!important}
body:not(.dark) input.form-control,body:not(.dark) textarea,body:not(.dark) .v14-in,body:not(.dark) .v14-ta,body:not(.dark) select{background:#F7F3FD!important;border-color:#D4C6EE!important;color:#1E1B2E!important}
body:not(.dark) .chipb:not(.on),body:not(.dark) .cat-btn:not(.active),body:not(.dark) #cuTabs button:not(.on),body:not(.dark) .star-row button:not(.on),body:not(.dark) .seg{background:#E2D8F5!important;border-color:#CDBDEB!important;color:#2E1065!important}
body:not(.dark) .hub-tabs{background:rgba(255,255,255,.18)!important}
body:not(.dark) .table-card{filter:saturate(.9) brightness(.97)}
/* ---- chiusura della giornata ---- */
.dc-k{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0}.dc-k div{border-radius:12px;padding:8px 4px;text-align:center;font-weight:800;font-size:.72rem;background:rgba(124,58,237,.12)}.dc-k b{display:block;font-size:1.15rem}.dc-k .t b{color:var(--c-tot,#C81E1E)}.dc-l{font-size:.84rem;font-weight:700;padding:4px 0}.dc-rep{white-space:pre-wrap;border-radius:12px;padding:10px;margin:8px 0;background:rgba(34,197,94,.14);font-size:.88rem;font-weight:600}
.dc-nudge{position:fixed;left:10px;right:10px;bottom:96px;z-index:9990;border-radius:18px;padding:12px 14px;background:#312E81;color:#fff;box-shadow:0 12px 30px rgba(0,0,0,.4);font-weight:800}.dc-nudge div{display:grid;grid-template-columns:1.4fr 1fr;gap:8px;margin-top:8px}.dc-nudge button{border:0;border-radius:12px;padding:11px;font-weight:900}.dc-nudge .a{background:#FBBF24;color:#3B2A00}.dc-nudge .b{background:rgba(255,255,255,.2);color:#fff}
/* ---- lista spesa, traduttore ---- */
.sp-btn{display:block;width:100%;margin-top:8px;border:0;border-radius:12px;padding:10px;font-weight:900;background:#DCFCE7;color:#14532D}
.ov2{position:fixed;inset:0;z-index:99980;background:rgba(2,6,23,.75);display:flex;align-items:center;justify-content:center;padding:12px}.ov2-b{width:min(480px,100%);max-height:88vh;overflow:auto;border-radius:20px;padding:16px;background:#F5F0FC;color:#1E1B2E}body.dark .ov2-b{background:#1E293B;color:#F1F5F9}.ov2-b h3{margin:0 0 6px}
.sp-g{font-weight:900;margin:10px 0 4px}.sp-i{padding:4px 0;font-weight:700;border-bottom:1px dashed rgba(148,163,184,.5)}
.tr-l{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px}.tr-l button{border:2px solid #7C3AED;border-radius:999px;padding:6px 11px;font-weight:900;background:transparent;color:inherit}.tr-l button.on{background:#7C3AED;color:#fff}
.tr-big{display:grid;grid-template-columns:1fr 1fr;gap:8px}.tr-big button{border:0;border-radius:16px;padding:16px 8px;font-weight:900;font-size:1rem;color:#fff}.tr-out{border-radius:14px;padding:12px;margin-top:10px;font-size:1.25rem;font-weight:800;line-height:1.3;background:rgba(124,58,237,.14);min-height:60px}.tr-out small{display:block;font-size:.78rem;opacity:.75;font-weight:700;margin-top:6px}
.tr-fab{position:fixed;right:12px;bottom:170px;z-index:900;border:0;border-radius:999px;padding:11px 14px;font-weight:900;background:#7C3AED;color:#fff;box-shadow:0 6px 16px rgba(0,0,0,.35)}`;
document.head.appendChild(st);
/* =================== CHIUSURA DELLA GIORNATA =================== */
const iso=d=>{const p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());};
const svcDay=()=>{const n=new Date();if(n.getHours()<5)n.setDate(n.getDate()-1);return iso(n);};
const dOf=e=>{try{return svcDate(e);}catch(x){return e.date;}};
function dayStats(d){const L=(state.historyLog||[]).filter(e=>e&&dOf(e)===d);let tot=0,cop=0,card=0,cash=0,pr={n:0,t:0},ce={n:0,t:0};const D={};
 L.forEach(e=>{const t=Number(e.total)||0;tot+=t;cop+=Number(e.coperti)||0;try{const p=payOf(e);card+=p.card||0;cash+=p.cash||0;}catch(x){}const h=new Date(e.ts||0).getHours();const s=(h>=5&&h<17)?pr:ce;s.n++;s.t+=t;(e.items||[]).forEach(i=>{if(!i||/Coperto/i.test(i.cat||i.name||''))return;D[i.name]=(D[i.name]||0)+(Number(i.qty)||0);});});
 const top=Object.entries(D).sort((a,b)=>b[1]-a[1]).slice(0,5);return{L,n:L.length,tot,cop,card,cash,pr,ce,top};}
const days=()=>{const c=cfg();c.days=c.days||{};return c.days;};
let DC={note:'',busy:false};
window.v70DcMic=()=>{if(!SR){const t=prompt('Com’è andata la giornata?',DC.note);if(t!=null){DC.note=t;drawDay();}return;}try{const r=new SR();r.lang='it-IT';r.continuous=true;r.interimResults=false;let txt='';r.onresult=e=>{for(let i=e.resultIndex;i<e.results.length;i++)if(e.results[i].isFinal)txt+=e.results[i][0].transcript+' ';};r.onend=()=>{if(txt.trim()){DC.note=(DC.note?DC.note+' ':'')+txt.trim();drawDay();}};r.start();toast('🎤 Racconta pure, poi resta in silenzio qualche secondo');}catch(e){}};
window.v70DcNote=v=>{DC.note=v;};
window.v70DcClose=async()=>{const d=svcDay(),S=dayStats(d);DC.busy=true;drawDay();const base=`Giornata del ${d.split('-').reverse().join('/')}: ${S.n} conti, ${S.cop} coperti, incasso € ${formatPrice(S.tot)} (carta € ${formatPrice(S.card)}, contanti € ${formatPrice(S.cash)}). Pranzo: ${S.pr.n} conti € ${formatPrice(S.pr.t)}. Cena: ${S.ce.n} conti € ${formatPrice(S.ce.t)}. Più venduti: ${S.top.map(x=>x[0]+' ('+x[1]+')').join(', ')||'—'}.`;
 let rep=base+(DC.note?'\nNote di Christian: '+DC.note:'');
 if(getGeminiKey()&&navigator.onLine){try{rep=(await callGemini([{text:`Sei l'assistente di Alicetta Trattoria. Scrivi il riassunto della giornata per il titolare, in italiano semplice, massimo 8 righe: cosa è andato bene, cosa no, 2 cose da fare domani. Usa SOLO questi numeri e queste note, non inventare.\nNumeri: ${base}\nNote del titolare: ${DC.note||'nessuna'}`}],false,{timeout:45000,maxTokens:900})).trim();}catch(e){}}
 days()[d]={at:Date.now(),by:state.waiterName||'',note:DC.note,report:rep,tot:S.tot,n:S.n,cop:S.cop};saveCfg();DC={note:'',busy:false};drawDay();try{toast('✅ Giornata chiusa e salvata');}catch(e){}const n=document.querySelector('.dc-nudge');if(n)n.remove();};
window.v70DcShare=()=>{const r=days()[svcDay()];if(!r)return;const t='📅 '+r.report;if(navigator.share)navigator.share({text:t}).catch(()=>{});else window.open('https://wa.me/?text='+encodeURIComponent(t),'_blank');};
window.v70DcReopen=()=>{const d=svcDay(),r=days()[d];if(!r||!confirm('Riaprire la giornata per rifare il riassunto?'))return;DC.note=r.note||'';delete days()[d];saveCfg();drawDay();};
function drawDay(){const b=$('dcCard');if(!b)return;const d=svcDay(),S=dayStats(d),R=days()[d];const lbl=new Date(d+'T12:00').toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long'});
 b.innerHTML=`<div class="cs-h"><h3>📅 Chiusura della giornata</h3></div><div class="fc-sub">${esc(lbl)} · pranzo + cena. Dopo la chiusura cassa, chiudi anche la giornata: resta nello storico.</div>
<div class="dc-k"><div class="t">💰 Incasso<b>€ ${formatPrice(S.tot)}</b></div><div>🧾 Conti<b>${S.n}</b></div><div>👥 Coperti<b>${S.cop}</b></div></div>
<div class="dc-l">☀️ Pranzo: ${S.pr.n} conti · € ${formatPrice(S.pr.t)} &nbsp; 🌙 Cena: ${S.ce.n} conti · € ${formatPrice(S.ce.t)}</div>
<div class="dc-l">💳 Carta € ${formatPrice(S.card)} · 💵 Contanti € ${formatPrice(S.cash)}</div>${S.top.length?`<div class="dc-l">🏆 ${S.top.map(x=>esc(x[0])+' ×'+x[1]).join(' · ')}</div>`:''}
${R?`<div class="dc-rep">✅ Giornata chiusa alle ${new Date(R.at).toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'})}\n\n${esc(R.report)}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><button class="btn-main btn-bill" onclick="v70DcShare()">📤 Condividi</button><button class="btn-main btn-print" onclick="v70DcReopen()">↩️ Rifai</button></div>`:
`<div class="v14-lbl">Com’è andata? (facoltativo)</div><div style="display:grid;grid-template-columns:56px 1fr;gap:6px;"><button class="btn-note" style="font-size:1.2rem;" onclick="v70DcMic()">🎤</button><textarea class="v14-ta" rows="2" placeholder="es. tanta gente a cena, la frittura è finita presto…" oninput="v70DcNote(this.value)">${esc(DC.note)}</textarea></div>
<button class="btn-main" style="width:100%;margin-top:8px;background:#7C3AED;color:#fff;" onclick="v70DcClose()" ${DC.busy?'disabled':''}>${DC.busy?'⏳ Preparo il riassunto…':'🌙 Chiudi la giornata'}</button>`}`;}
function dayCard(){const pg=$('hub_sales_chiusura');if(!pg||!owner())return;let b=$('dcCard');if(!b){b=document.createElement('div');b.id='dcCard';b.className='cart-section';pg.prepend(b);drawDay();}else if(pg.firstElementChild!==b)pg.prepend(b);
 if(pg.offsetParent){const k=svcDay()+'|'+(state.historyLog||[]).length+'|'+(days()[svcDay()]?1:0);if(b.dataset.k!==k&&!DC.busy&&!b.contains(document.activeElement)){b.dataset.k=k;drawDay();}}}
window.v70DcGo=()=>{const n=document.querySelector('.dc-nudge');if(n)n.remove();try{switchMainView('sales');const t=document.querySelector('#hubTabs_sales .hub-tab[data-p="chiusura"]');if(t)t.click();setTimeout(()=>{const c=$('dcCard');if(c)c.scrollIntoView({behavior:'smooth',block:'start'});},300);}catch(e){}};
window.v70DcLater=()=>{localStorage.setItem('alicetta_dc_snooze',String(Date.now()+45*6e4));const n=document.querySelector('.dc-nudge');if(n)n.remove();};
function nudge(){if(!owner()||document.querySelector('.dc-nudge'))return;const h=new Date().getHours(),d=svcDay();if(!(h>=22||h<4))return;if(days()[d])return;if(Number(localStorage.getItem('alicetta_dc_snooze')||0)>Date.now())return;
 if(!dayStats(d).n)return;if(Object.values(state.tables||{}).some(t=>t.items&&t.items.length))return;
 const n=document.createElement('div');n.className='dc-nudge';n.innerHTML='🌙 Servizio finito: dopo la chiusura cassa, chiudi anche la giornata<div><button class="a" onclick="v70DcGo()">📅 Chiudi la giornata</button><button class="b" onclick="v70DcLater()">⏰ Più tardi</button></div>';document.body.appendChild(n);}
/* =================== LISTA SPESA DALLE NOTE =================== */
const GR=[['🐟 Pesce e frutti di mare',/pesce|alic|cozz|vongol|gamber|totan|calamar|polp|baccal|sgombr|naselo|nasello|orata|spigol|tonno|scamp/i],['🥬 Frutta e verdura',/verdur|frutt|insalat|pomodor|cipoll|patat|zucca|limon|rape|cicori|verza|erbe|prezzem|aglio|funghi|champignon/i],['🍷 Bevande',/vino|vini|birr|acqua|bibit|caff|liquor|amaro|spumant/i],['🥩 Carne e salumi',/carne|maial|pecor|salum|prosciut|ventricin|manzo|pollo/i],['🧀 Latticini e uova',/formagg|latte|burr|panna|uova|ricott|mozzar|pecorino/i],['🍞 Dispensa',/pane|farin|olio|sale|zucchero|pasta|riso|aceto|spezie|caper|olive|pangrattato/i]];
const spesa=()=>((cfg().notes)||[]).filter(n=>n&&!n.done&&n.cat==='spesa');
const clean=t=>String(t||'').replace(/^(ordinare|comprare|prendere|manca(no)?|serve|servono)\s+(il |lo |la |i |gli |le |l')?/i,'').replace(/\s+per\s+(oggi|domani|sabato|domenica|lunedì|martedì|mercoledì|giovedì|venerdì)\b.*$/i,'').trim();
function groups(){const G={};spesa().forEach(n=>{const t=clean(n.text);const g=(GR.find(([,r])=>r.test(n.text))||['📦 Altro'])[0];(G[g]=G[g]||[]).push(t.charAt(0).toUpperCase()+t.slice(1));});return G;}
const spText=()=>{const G=groups();return 'Ciao! Per Alicetta Trattoria ci servirebbe:\n'+Object.entries(G).map(([g,a])=>g+'\n'+a.map(x=>'• '+x).join('\n')).join('\n')+'\nGrazie!';};
window.v70Spesa=()=>{const G=groups();if(!Object.keys(G).length)return alert('Nessuna nota 🛒 Spesa da fare.');const o=document.createElement('div');o.className='ov2';o.innerHTML=`<div class="ov2-b"><h3>🛒 Lista della spesa</h3><div style="font-size:.8rem;font-weight:700;opacity:.8;">Dalle note vocali “Spesa”, divise per tipo. Mandala al fornitore giusto su WhatsApp.</div>${Object.entries(G).map(([g,a])=>`<div class="sp-g">${g}</div>${a.map(x=>`<div class="sp-i">• ${esc(x)}</div>`).join('')}`).join('')}
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;"><button class="btn-main btn-bill" id="spWa">💬 WhatsApp</button><button class="btn-main btn-print" id="spCp">📋 Copia</button></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;"><button class="btn-main btn-print" id="spOk">✅ Fatta: togli le note</button><button class="btn-main btn-print" id="spX">Chiudi</button></div></div>`;document.body.appendChild(o);
 o.querySelector('#spWa').onclick=()=>window.open('https://wa.me/?text='+encodeURIComponent(spText()),'_blank');o.querySelector('#spCp').onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(spText()).then(()=>toast('📋 Lista copiata'));};
 o.querySelector('#spOk').onclick=()=>{if(!confirm('Segnare come fatte tutte le note della spesa?'))return;spesa().forEach(n=>n.done=Date.now());saveCfg();o.remove();try{toast('✅ Spesa fatta');}catch(e){}};o.querySelector('#spX').onclick=()=>o.remove();o.onclick=e=>{if(e.target===o)o.remove();};};
function spBtns(){const n=spesa().length;['ai','kds'].forEach(h=>{const box=$('ntBox_'+h);if(!box)return;let b=box.querySelector('.sp-btn');if(!n){if(b)b.remove();return;}if(!b){b=document.createElement('button');b.className='sp-btn';b.onclick=window.v70Spesa;box.appendChild(b);}const t='🛒 Lista spesa ('+n+') · manda al fornitore';if(b.textContent!==t)b.textContent=t;});}
/* =================== SOUS-CHEF CON LE PRENOTAZIONI DI OGGI =================== */
const booked=()=>{const d=iso(new Date());return Object.values(state.res||{}).filter(r=>r&&r.date===d&&!/cancel|noshow/i.test(r.status||'')).reduce((s,r)=>s+(parseInt(r.covers,10)||0),0);};
if(typeof sousChefStats==='function'){const _s=sousChefStats;sousChefStats=function(){const s=_s.apply(this,arguments);try{const b=booked();s.booked=b;const D={};(state.historyLog||[]).forEach(e=>{if(e&&e.date&&new Date(e.date+'T12:00:00').getDay()===s.wd)D[e.date]=(D[e.date]||0)+(Number(e.coperti)||0);});const dv=Object.values(D),base=dv.length?dv.reduce((a,c)=>a+c,0)/dv.length:0;const tgt=Math.max(s.cop||0,b);if(s.n&&base>0&&tgt>base*1.05){const f=tgt/base;s.f=f;s.cop=tgt;s.dish=s.dish.map(([a,v])=>[a,Math.round(v*f*10)/10]);s.cat=s.cat.map(([a,v])=>[a,Math.round(v*f*10)/10]);}}catch(e){}return s;};}
if(typeof runSousChef==='function'){const _r=runSousChef;runSousChef=async function(){const r=_r.apply(this,arguments);try{const box=$('sousChefBox'),b=booked();if(box&&b){const d=document.createElement('div');d.style.cssText='margin-bottom:6px;font-weight:900;';d.textContent='📅 Prenotati oggi: '+b+' coperti — porzioni calcolate anche su questo numero.';box.prepend(d);}}catch(e){}return r;};}
/* =================== TRADUTTORE PER LA SALA =================== */
const LG=[['en','🇬🇧 Inglese','en-GB','inglese'],['de','🇩🇪 Tedesco','de-DE','tedesco'],['fr','🇫🇷 Francese','fr-FR','francese'],['es','🇪🇸 Spagnolo','es-ES','spagnolo'],['nl','🇳🇱 Olandese','nl-NL','olandese'],['pl','🇵🇱 Polacco','pl-PL','polacco']];
let TL=localStorage.getItem('alicetta_tr_lang')||'en';
const speak=(t,l)=>{try{const u=new SpeechSynthesisUtterance(t);u.lang=l;speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){}};
function listen(lang,cb){if(!SR){const t=prompt('Scrivi la frase:');if(t)cb(t);return;}try{const r=new SR();r.lang=lang;r.interimResults=false;r.onresult=e=>cb(e.results[0][0].transcript);r.onerror=()=>toast('Non ho sentito: riprova');r.start();toast('🎤 Parla ora');}catch(e){}}
async function tr(text,from,to){if(!getGeminiKey())throw new Error('Serve la chiave Gemini in ⚙️ Opzioni.');const r=await callGemini([{text:`Traduci dal ${from} al ${to} questa frase detta in un ristorante (trattoria di mare). Tono cortese e naturale. Rispondi SOLO con la traduzione.\n«${text}»`}],false,{timeout:30000,maxTokens:400});return String(r).replace(/^[«"“]|[»"”]$/g,'').trim();}
window.v70Tr=()=>{const o=document.createElement('div');o.className='ov2';o.id='trOv';const draw=(out)=>{const L=LG.find(x=>x[0]===TL);o.innerHTML=`<div class="ov2-b"><h3>🌍 Parla con il cliente</h3><div style="font-size:.8rem;font-weight:700;opacity:.8;">Scegli la lingua, tocca e parla: l’app traduce, mostra la frase grande e la legge ad alta voce.</div>
<div class="tr-l">${LG.map(x=>`<button class="${x[0]===TL?'on':''}" data-l="${x[0]}">${x[1]}</button>`).join('')}</div>
<div class="tr-big"><button style="background:#16A34A;" id="trMe">🇮🇹 Parlo io<br><small>→ ${L[3]}</small></button><button style="background:#7C3AED;" id="trCl">${L[1].split(' ')[0]} Parla il cliente<br><small>→ italiano</small></button></div>
<div class="tr-out" id="trOut">${out||'La traduzione comparirà qui.'}</div><button class="btn-main btn-print" style="width:100%;margin-top:10px;" id="trX">Chiudi</button></div>`;
 o.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{TL=b.dataset.l;localStorage.setItem('alicetta_tr_lang',TL);draw();});o.querySelector('#trX').onclick=()=>o.remove();
 o.querySelector('#trMe').onclick=()=>listen('it-IT',async t=>{const L2=LG.find(x=>x[0]===TL);draw('⏳ Traduco…<small>'+esc(t)+'</small>');try{const r=await tr(t,'italiano',L2[3]);draw(esc(r)+'<small>🇮🇹 '+esc(t)+'</small>');speak(r,L2[2]);}catch(e){draw('❌ '+esc(e.message||e));}});
 o.querySelector('#trCl').onclick=()=>{const L2=LG.find(x=>x[0]===TL);listen(L2[2],async t=>{draw('⏳ Traduco…<small>'+esc(t)+'</small>');try{const r=await tr(t,L2[3],'italiano');draw('🇮🇹 '+esc(r)+'<small>'+esc(t)+'</small>');speak(r,'it-IT');}catch(e){draw('❌ '+esc(e.message||e));}});};};
 draw();document.body.appendChild(o);o.addEventListener('click',e=>{if(e.target===o)o.remove();});};
function trFab(){const v=$('viewOrder');let b=$('trFab');const on=v&&v.classList.contains('active');if(!on){if(b)b.remove();return;}if(!b){b=document.createElement('button');b.id='trFab';b.className='tr-fab';b.textContent='🌍 Traduci';b.onclick=window.v70Tr;document.body.appendChild(b);}
 const ch=$('chQuick');if(ch&&!$('trChiedi')){const d=document.createElement('button');d.id='trChiedi';d.className='btn-main';d.style.cssText='width:100%;margin-top:10px;background:#7C3AED;color:#fff;';d.textContent='🌍 Traduttore per parlare con i clienti stranieri';d.onclick=window.v70Tr;ch.after(d);}}
setInterval(()=>{try{dayCard();spBtns();trFab();const ch=$('chQuick');if(ch&&!$('trChiedi')){const d=document.createElement('button');d.id='trChiedi';d.className='btn-main';d.style.cssText='width:100%;margin-top:10px;background:#7C3AED;color:#fff;';d.textContent='🌍 Traduttore per parlare con i clienti stranieri';d.onclick=window.v70Tr;ch.after(d);}}catch(e){}},800);
setInterval(()=>{try{nudge();}catch(e){}},60000);setTimeout(()=>{try{nudge();}catch(e){}},8000);
})();
}catch(e){console.error("chef-extra v2.9.70",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);const pad=n=>String(n).padStart(2,'0');
const st=document.createElement('style');
st.textContent=`
/* tema chiaro: celeste tenue con bordino verde acido */
body:not(.dark){--card:#BFE2F6}
body:not(.dark) .cart-section,body:not(.dark) .receipt-box,body:not(.dark) .modal-box,body:not(.dark) .hc-card,body:not(.dark) .ov2-b,body:not(.dark) .wn-box,body:not(.dark) .vc-box{background:#BFE2F6!important;border:2px solid #A3E635!important}
body:not(.dark) .cart-section [style*="background:#fff"],body:not(.dark) .cart-section [style*="background:#FFF"],body:not(.dark) .cart-section [style*="background: #fff"],body:not(.dark) .receipt-box[style*="background:#fff"]{background:#CFE9F8!important}
body:not(.dark) input.form-control,body:not(.dark) textarea,body:not(.dark) .v14-in,body:not(.dark) .v14-ta,body:not(.dark) select{background:#D8EEFA!important;border:2px solid #BEF264!important;color:#0F2933!important}
body:not(.dark) .chipb:not(.on),body:not(.dark) .cat-btn:not(.active),body:not(.dark) #cuTabs button:not(.on),body:not(.dark) .star-row button:not(.on),body:not(.dark) .seg{background:#A9D6F0!important;border:2px solid #A3E635!important;color:#0F2933!important}
body:not(.dark) .bf-k div,body:not(.dark) .dc-k div,body:not(.dark) .cu-k div{background:#A9D6F0!important}
.bf-stop{border:0;border-radius:12px;padding:7px 12px;font-weight:900;background:#DC2626;color:#fff;margin-right:6px}
.s2-row{display:flex;gap:8px;align-items:flex-start;justify-content:space-between;padding:8px 0;border-top:1px dashed rgba(148,163,184,.5);font-size:.86rem;font-weight:700}.s2-row small{display:block;font-weight:600;opacity:.8}.s2-row button{border:0;border-radius:9px;padding:6px 9px;font-weight:900;background:rgba(148,163,184,.3);color:inherit}
.s2-l{font-weight:900;font-size:.8rem;margin:10px 0 4px}.s2-ch{display:flex;flex-wrap:wrap;gap:6px}.s2-ch button{border:2px solid #DC2626;border-radius:999px;padding:6px 10px;font-weight:800;font-size:.8rem;background:transparent;color:inherit}.s2-ch button.on{background:#DC2626;color:#fff}.s2-in{width:100%;border-radius:12px;padding:10px;border:2px solid rgba(148,163,184,.6);font-weight:700;font-size:.9rem;background:transparent;color:inherit;box-sizing:border-box}.s2-g{display:grid;grid-template-columns:1fr 1fr;gap:8px}`;
document.head.appendChild(st);
/* ---------- stop alla lettura ad alta voce ---------- */
window.v71Stop=()=>{try{speechSynthesis.cancel();}catch(e){}};
function stopBtn(){document.querySelectorAll('.bf-say').forEach(b=>{if(b.nextElementSibling&&b.nextElementSibling.classList.contains('bf-stop'))return;const s=document.createElement('button');s.className='bf-stop';s.textContent='⏹️ Ferma';s.onclick=window.v71Stop;b.after(s);});
 document.querySelectorAll('.ch-say').forEach(b=>{if(b.nextElementSibling&&b.nextElementSibling.classList.contains('bf-stop'))return;const s=document.createElement('button');s.className='bf-stop';s.style.marginLeft='6px';s.textContent='⏹️ Ferma';s.onclick=window.v71Stop;b.after(s);});}
/* =================== SC2 · PRODOTTI NON CONFORMI =================== */
const FULL=n=>{const t=String(n||'').trim();return /^alice$/i.test(t)?'Alice Di Mascio':/^christian$/i.test(t)?'Christian Carafa':t;};
const MESI=['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
const today=()=>{const d=new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());};const dmy=s=>s?String(s).split('-').reverse().join('/'):'';
let D={};try{D=JSON.parse(localStorage.getItem('alicetta_sc2')||'{}')||{};}catch(e){}
const saveL=()=>{try{localStorage.setItem('alicetta_sc2',JSON.stringify(D));}catch(e){}};
async function put(id,v){if(v)D[id]=v;else delete D[id];saveL();try{await fbSend('/costi/haccp/sc2/'+id,v?'PUT':'DELETE',v||undefined);}catch(e){try{toast('⚠️ Salvato sul telefono, lo invio quando c’è rete');}catch(x){}}draw();}
let pulled=false;async function pull(){try{const r=await fbGet('/costi/haccp/sc2');if(r&&typeof r==='object'){D=Object.assign({},r,Object.fromEntries(Object.entries(D).filter(([k])=>!r[k]&&Date.now()-(D[k].ts||0)<864e5)));saveL();draw();}}catch(e){}}
let M=today().slice(0,7);
const rows=m=>Object.entries(D).filter(([i,r])=>r&&String(r.d||'').slice(0,7)===(m||M)).sort((a,b)=>String(a[1].d).localeCompare(String(b[1].d))||(a[1].ts||0)-(b[1].ts||0));
const bolle=()=>{try{const C=window.v211Data?v211Data():null;return (C&&C.bolle)||{};}catch(e){return{};}};
const NAT=['Data di scadenza','Aspetto esteriore','Temperatura'],AZ=['Reso al fornitore','Prodotto eliminato','Segnalazione al fornitore','Merce non accettata'];
let E=null;
function edDraw(){const o=$('s2Ov');if(!o||!E)return;const B=E.bolla,R=(B&&B.righe)||[];
 o.innerHTML=`<div class="ov2-b"><h3>⛔ Prodotto non conforme</h3><div style="font-size:.8rem;font-weight:700;opacity:.8;">Scheda SC2. ${B?'Dati presi dalla bolla: controlla e completa.':'Compila i dati del prodotto.'}</div>
${R.length?`<div class="s2-l">Quale prodotto della bolla?</div><div class="s2-ch">${R.map((r,i)=>`<button class="${E.pi===i?'on':''}" onclick="v71Pick(${i})">${esc(String(r.p||r.i||'').slice(0,34))}</button>`).join('')}</div>`:''}
<div class="s2-g"><div><div class="s2-l">Data</div><input class="s2-in" type="date" value="${esc(E.r.d)}" onchange="v71F('d',this.value)"></div><div><div class="s2-l">Bolla n.</div><input class="s2-in" value="${esc(E.r.num||'')}" oninput="v71F('num',this.value)"></div></div>
<div class="s2-l">Prodotto</div><input class="s2-in" value="${esc(E.r.prod||'')}" oninput="v71F('prod',this.value)">
<div class="s2-g"><div><div class="s2-l">Lotto</div><input class="s2-in" value="${esc(E.r.lotto||'')}" oninput="v71F('lotto',this.value)"></div><div><div class="s2-l">Quantità</div><input class="s2-in" value="${esc(E.r.qta||'')}" oninput="v71F('qta',this.value)"></div></div>
<div class="s2-l">Produttore / Fornitore</div><input class="s2-in" value="${esc(E.r.forn||'')}" oninput="v71F('forn',this.value)">
<div class="s2-l">Natura della non conformità</div><div class="s2-ch">${NAT.map(n=>`<button class="${(E.r.nat||'').split(' – ').includes(n)?'on':''}" onclick="v71Nat('${n}')">${n}</button>`).join('')}</div><input class="s2-in" style="margin-top:6px;" placeholder="Dettaglio (es. arrivato a +9 °C, confezione rotta…)" value="${esc(E.r.natx||'')}" oninput="v71F('natx',this.value)">
<div class="s2-l">Azione correttiva intrapresa</div><div class="s2-ch">${AZ.map(n=>`<button class="${E.r.az===n?'on':''}" onclick="v71Az('${n}')">${n}</button>`).join('')}</div><input class="s2-in" style="margin-top:6px;" placeholder="oppure scrivila" value="${esc(AZ.includes(E.r.az)?'':(E.r.az||''))}" oninput="v71F('az',this.value)">
<div class="s2-l">Addetto al controllo</div><input class="s2-in" value="${esc(E.r.add||'')}" oninput="v71F('add',this.value)">
<div class="s2-g" style="margin-top:12px;"><button class="btn-main btn-print" onclick="v71Close()">Annulla</button><button class="btn-main btn-bill" onclick="v71Save()">💾 Salva nella scheda</button></div>${E.id?`<button class="btn-note" style="width:100%;margin-top:8px;padding:9px;color:#B91C1C;" onclick="v71Del()">🗑️ Elimina questa riga</button>`:''}</div>`;}
window.v71F=(k,v)=>{if(E)E.r[k]=v;};
window.v71Nat=n=>{if(!E)return;const a=(E.r.nat||'').split(' – ').filter(Boolean);const i=a.indexOf(n);if(i>=0)a.splice(i,1);else a.push(n);E.r.nat=NAT.filter(x=>a.includes(x)).join(' – ');edDraw();};
window.v71Az=n=>{if(!E)return;E.r.az=E.r.az===n?'':n;edDraw();};
window.v71Pick=i=>{if(!E||!E.bolla)return;const r=E.bolla.righe[i];E.pi=i;E.r.prod=String(r.p||r.i||'').trim();E.r.lotto=r.l||'';E.r.qta=(r.q!=null&&r.q!==''?String(r.q).replace('.',','):'')+(r.u?' '+r.u:'');edDraw();};
window.v71Close=()=>{const o=$('s2Ov');if(o)o.remove();E=null;};
window.v71Save=async()=>{if(!E)return;const r=E.r;if(!String(r.prod||'').trim())return alert('Scrivi il prodotto.');if(!r.nat&&!r.natx)return alert('Indica la natura della non conformità.');if(!r.az)return alert('Indica l’azione correttiva.');const id=E.id||('n'+Date.now());r.ts=r.ts||Date.now();const isNew=!E.id;window.v71Close();await put(id,r);M=String(r.d).slice(0,7);draw();try{toast('✅ Salvato nella scheda SC2');if(isNew&&typeof ntfyPost==='function'&&!/^christian$/i.test((state.waiterName||'').trim()))ntfyPost('christian','⛔ Prodotto non conforme',r.prod+' · '+(r.forn||'')+' · '+(r.nat||r.natx),5);}catch(e){}};
window.v71Del=async()=>{if(!E||!E.id||!confirm('Eliminare questa riga dalla scheda SC2?'))return;const id=E.id;window.v71Close();await put(id,null);};
function open(r,bolla,id){E={r:Object.assign({d:today(),num:'',prod:'',lotto:'',qta:'',forn:'',nat:'',natx:'',az:'',add:FULL(state.waiterName)||'Alice Di Mascio'},r||{}),bolla:bolla||null,id:id||null,pi:-1};let o=$('s2Ov');if(!o){o=document.createElement('div');o.id='s2Ov';o.className='ov2';document.body.appendChild(o);}edDraw();if(bolla&&bolla.righe&&bolla.righe.length===1)window.v71Pick(0);}
window.v71New=()=>open();
window.v71Edit=id=>{const r=D[id];if(r)open(JSON.parse(JSON.stringify(r)),r.src?bolle()[r.src]:null,id);};
window.v71FromBolla=bid=>{const b=bolle()[bid];if(!b)return;const p=$('s2Pick');if(p)p.remove();open({d:b.data||today(),num:b.num||'',forn:b.fornitore||'',src:bid},b);};
window.v71Bolle=()=>{const L=Object.entries(bolle()).filter(([i,b])=>b&&b.tipo!=='scontrino').sort((a,b)=>String(b[1].data).localeCompare(String(a[1].data))).slice(0,20);if(!L.length)return alert('Nessuna bolla caricata: fotografala in Fornitori oppure usa “A mano”.');
 const o=document.createElement('div');o.id='s2Pick';o.className='ov2';o.innerHTML=`<div class="ov2-b"><h3>📦 Da quale bolla?</h3>${L.map(([i,b])=>`<div class="s2-row" onclick="v71FromBolla('${i}')" style="cursor:pointer;"><span><b>${esc(dmy(b.data).slice(0,5))} · ${esc(b.fornitore||'')}</b>${b.num?' · n. '+esc(b.num):''}<small>${esc((b.righe||[]).map(r=>r.p||r.i).filter(Boolean).slice(0,5).join(', '))}</small></span><span>›</span></div>`).join('')}<button class="btn-main btn-print" style="width:100%;margin-top:10px;" onclick="document.getElementById('s2Pick').remove()">Chiudi</button></div>`;document.body.appendChild(o);o.onclick=e=>{if(e.target===o)o.remove();};};
window.v71M=n=>{const d=new Date(M+'-15T12:00');d.setMonth(d.getMonth()+n);M=d.getFullYear()+'-'+pad(d.getMonth()+1);draw();};
/* quando una merce accettata diventa "non conforme" si apre la scheda SC2 già compilata */
{const w=()=>{if(typeof window.v2931C==='function'&&!window.v2931C._s2){const _c=window.v2931C;window.v2931C=function(id){const r=_c.apply(this,arguments);setTimeout(()=>{try{const S=JSON.parse(localStorage.getItem('alicetta_sc1')||'{}'),x=S[id];if(x&&x.c===false&&!Object.values(D).some(y=>y&&y.sc1===id)){const b=x.src?bolle()[x.src]:null;open({d:x.d||today(),num:x.num||'',forn:x.forn||'',prod:b?'':x.prod||'',src:x.src||'',sc1:id},b);}}catch(e){}},350);return r;};window.v2931C._s2=1;}};w();setTimeout(w,3000);}
/* ---------- stampa identica al modulo cartaceo ---------- */
const natTxt=r=>[r.nat,r.natx].filter(Boolean).join(': ');
function sheet(R,perPage){perPage=perPage||20;const pages=Math.max(1,Math.ceil(R.length/perPage));let h='';for(let p=0;p<pages;p++){const L=R.slice(p*perPage,(p+1)*perPage);const tr=r=>`<tr><td>${r?esc(dmy(r.d)):''}</td><td>${r?esc(r.prod||''):''}</td><td>${r?esc(r.num||''):''}</td><td>${r?esc(r.lotto||''):''}</td><td>${r?esc(r.qta||''):''}</td><td>${r?esc(r.forn||''):''}</td><td>${r?esc(natTxt(r)):''}</td><td>${r?esc(r.az||''):''}</td><td>${r?esc(r.add||''):''}</td></tr>`;
  h+=`<div class="pg"><table class="hd"><tr><td class="l"></td><td class="c"><div class="lg"><svg viewBox="0 0 60 18" width="34" height="10"><path d="M4 9 L16 3 L40 3 L52 9 L40 15 L16 15 Z M52 9 L58 4 L58 14 Z" fill="none" stroke="#D98C6A" stroke-width="1.6"/></svg><b>ALICETTA</b><i>TRATTORIA</i></div></td><td class="r">SCHEDE DI AUTOCONTROLLO HACCP</td></tr></table>
<table class="sc"><colgroup><col style="width:7%"><col style="width:13%"><col style="width:6%"><col style="width:7%"><col style="width:8%"><col style="width:12%"><col style="width:25%"><col style="width:13%"><col style="width:9%"></colgroup>
<tr><th colspan="9" class="tt">SC2 - SCHEDA PRODOTTI NON CONFORMI</th></tr>
<tr class="h"><th>Data</th><th>Prodotto</th><th>Bolla<br>n.</th><th>Lotto</th><th>Quantità</th><th>Produttore/<br>Fornitore</th><th>Natura della Non Conformità<br>(Data di scadenza – Aspetto esteriore - Temperatura)</th><th>Azione correttiva intrapresa</th><th>Addetto al controllo</th></tr>
${Array.from({length:perPage},(_,i)=>tr(L[i])).join('')}</table>
<div class="ft"><span class="is"><b>IS</b><small>srl</small></span><span class="isn">ITALIA Safety srl</span><span class="ad">C/da Alboreto Zona Ind.le – 66026 Ortona (CH) – Tel./Fax. 085.9039196 - P.Iva 02391680697 – e.mail : italiasafety@pec.it</span></div></div>`;}return h;}
const CSS=`@page{size:A4 landscape;margin:9mm}*{box-sizing:border-box}body{font-family:Calibri,Arial,sans-serif;color:#000;margin:0;background:#fff}.pg{page-break-after:always;height:190mm;display:flex;flex-direction:column}.pg:last-child{page-break-after:auto}table{border-collapse:collapse;width:100%}.hd td{border:1px solid #000;height:20mm;vertical-align:middle}.hd .l{width:8%}.hd .c{text-align:center}.hd .r{width:19%;text-align:center;font-weight:bold;font-size:10.5pt;padding:0 6px}.lg{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;background:#3D4B66;color:#D98C6A;width:22mm;height:17mm;line-height:1}.lg b{font-size:8.5pt;letter-spacing:1.5px;margin-top:2px}.lg i{font-size:4.5pt;font-style:normal;letter-spacing:2px;margin-top:2px}.sc{margin-top:3mm;flex:1}.sc td,.sc th{border:1px solid #000}.sc .tt{color:#1F5FBF;font-size:12pt;text-align:center;padding:5px;border-bottom:0}.sc .h th{font-size:9.5pt;padding:5px 3px;vertical-align:middle;border:1px solid #000!important;border-top:0!important}.sc td{height:6.4mm;font-size:8.5pt;padding:1px 3px;vertical-align:middle;overflow:hidden}.ft{display:flex;align-items:center;gap:10px;margin-top:4mm;font-size:8.5pt;color:#333}.is{display:inline-flex;align-items:baseline;border:1.5px solid #8A8F3C;border-radius:50% 50% 6px 6px;padding:2px 7px;color:#333}.is b{font-size:13pt}.is small{font-size:6pt}.isn{font-size:15pt;letter-spacing:.5px;color:#222;margin-right:14px}.ad{flex:1;text-align:center}`;
const doc=(m)=>`<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SC2 Prodotti non conformi ${MESI[+(m||M).slice(5,7)-1]} ${(m||M).slice(0,4)} – Alicetta Trattoria</title><style>${CSS}</style></head><body>${sheet(rows(m).map(x=>x[1]))}</body></html>`;
window.v71Html=doc;
window.v71Print=()=>{const html=doc(),w=window.open('','_blank');if(!w){return window.v71Share(true);}w.document.write(html);w.document.close();setTimeout(()=>{try{w.print();}catch(e){}},700);};
window.v71Share=async dlOnly=>{const name='SC2-prodotti-non-conformi-'+M+'.html',file=new File([doc()],name,{type:'text/html'});const dl=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(file);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},2000);};
 if(dlOnly!==true){try{if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:'SC2 – Prodotti non conformi',text:'Scheda SC2 Alicetta Trattoria – '+MESI[+M.slice(5,7)-1]+' '+M.slice(0,4)});return;}}catch(e){if(e&&e.name==='AbortError')return;}}dl();try{toast('File scaricato: aprilo per stamparlo o allegalo');}catch(e){}};
/* sezione SC2 dentro il fascicolo HACCP del mese */
window.v71Sc2Sec=m=>{const R=rows(m).map(x=>x[1]);const td=v=>`<td>${esc(v==null?'':v)}</td>`;return `<h2 class="sec">SC2 – Prodotti non conformi</h2><table><tr><th>Data</th><th>Prodotto</th><th>Bolla n.</th><th>Lotto</th><th>Quantità</th><th>Produttore / Fornitore</th><th>Natura della non conformità</th><th>Azione correttiva</th><th>Addetto</th></tr>${R.map(r=>`<tr>${td(dmy(r.d))}${td(r.prod)}${td(r.num)}${td(r.lotto)}${td(r.qta)}${td(r.forn)}${td(natTxt(r))}${td(r.az)}${td(r.add)}</tr>`).join('')||'<tr><td colspan="9">Nessun prodotto non conforme nel mese.</td></tr>'}</table>`;};
/* ---------- riquadro nella pagina HACCP ---------- */
function card(){const R=rows(),lbl=MESI[+M.slice(5,7)-1]+' '+M.slice(0,4);return `<h3>⛔ Prodotti non conformi <span class="fc-sub">(scheda SC2)</span></h3><div class="fc-sub" style="margin:4px 0 8px;">Quando segni una merce come <b>NC</b> nell’accettazione qui sopra, questa scheda si apre già compilata con i dati della bolla: scegli il prodotto, il problema e cosa hai fatto.</div>
<div class="hx-nav"><button class="btn-note" onclick="v71M(-1)">◀</button><b>${lbl}</b><button class="btn-note" onclick="v71M(1)">▶</button></div>
<div class="hx-g"><button class="btn-main btn-print" onclick="v71Bolle()">📦 Da una bolla</button><button class="btn-main btn-bill" onclick="v71New()">✍️ A mano</button></div>
${R.map(([id,r])=>`<div class="s2-row"><span onclick="v71Edit('${id}')" style="flex:1;cursor:pointer;"><b>${esc(dmy(r.d).slice(0,5))} · ${esc(r.prod)}</b>${r.qta?' · '+esc(r.qta):''}<small>${esc(r.forn||'')}${r.num?' · bolla n. '+esc(r.num):''}${r.lotto?' · lotto '+esc(r.lotto):''}</small><small>⚠️ ${esc(natTxt(r))} → ${esc(r.az||'')} · ✍️ ${esc(r.add||'')}</small></span><button onclick="v71Edit('${id}')">✏️</button></div>`).join('')||'<div class="fc-sub">Nessun prodotto non conforme in questo mese.</div>'}
<div class="hx-g" style="margin-top:8px;"><button class="btn-note" style="padding:10px;" onclick="v71Print()">🖨️ Stampa scheda SC2</button><button class="btn-note" style="padding:10px;" onclick="v71Share()">📤 Condividi SC2</button></div>
<button class="btn-main btn-bill" style="width:100%;margin-top:10px;" onclick="v2932Fasc&&v2932Fasc()">📤 Stampa o condividi TUTTE le schede HACCP<br><span style="font-size:.72rem;">temperature, pulizie, SC1, SC2, SC8 e foto delle bolle</span></button>`;}
let sig='';
function draw(){document.querySelectorAll('.hxHost').forEach(h=>{let c=h.querySelector('.s2Card');const html=card();if(!c){c=document.createElement('div');c.className='hc-card s2Card';h.appendChild(c);c.innerHTML=html;}else if(c.dataset.h!==html){c.innerHTML=html;}c.dataset.h=html;});}
setInterval(()=>{try{stopBtn();if(document.querySelector('.hxHost')){if(!pulled){pulled=true;pull();}draw();}}catch(e){}},700);
})();
}catch(e){console.error("chef-extra v2.9.71",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);const pad=n=>String(n).padStart(2,'0');
const owner=()=>/^christian$/i.test((state.waiterName||'').trim());
const FULL=n=>{const t=String(n||'').trim();return /^alice$/i.test(t)?'Alice Di Mascio':/^christian$/i.test(t)?'Christian Carafa':/^serena$/i.test(t)?'Serena':t;};
const MESI=['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
const today=()=>{const d=new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());};const dmy=s=>s?String(s).split('-').reverse().join('/'):'';
const LS=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')||{};}catch(e){return{};}};
const addM=(m,n)=>{const d=new Date(m+'-15T12:00');d.setMonth(d.getMonth()+n);return d.getFullYear()+'-'+pad(d.getMonth()+1);};
const st=document.createElement('style');
st.textContent=`.h72-ov{position:fixed;inset:0;z-index:99970;background:#0B1220;color:#F1F5F9;display:flex;flex-direction:column}body:not(.dark) .h72-ov{background:#DDF0FA;color:#0F2933}.h72-top{display:flex;align-items:center;gap:8px;padding:12px 12px 8px}.h72-top h3{flex:1;margin:0;font-size:1.1rem}.h72-x{border:0;border-radius:12px;padding:9px 14px;font-weight:900;background:#334155;color:#fff}.h72-body{flex:1;overflow:auto;padding:0 12px 20px}.h72-nav{display:flex;align-items:center;gap:8px;margin:4px 0 10px}.h72-nav b{flex:1;text-align:center;text-transform:capitalize;font-size:1.05rem}.h72-nav button{border:0;border-radius:12px;padding:9px 16px;font-weight:900;background:#1BE7FF;color:#062329}
.h72-it{border-radius:16px;padding:12px;margin-bottom:10px;background:rgba(148,163,184,.16);border:2px solid #A3E635}.h72-it b{font-size:1rem}.h72-it small{display:block;opacity:.8;font-weight:700;margin:2px 0 8px}.h72-b{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:6px}.h72-b button,.h72-all button{border:0;border-radius:12px;padding:10px 4px;font-weight:900;font-size:.84rem}.h72-b .v{background:#7C3AED;color:#fff}.h72-b .p{background:#1BE7FF;color:#062329}.h72-b .s{background:#22C55E;color:#052E16}.h72-all{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:6px 0 14px}.h72-all button{background:#F59E0B;color:#3B2A00;padding:13px 4px}
.h72-fr{background:#fff;border-radius:8px;overflow:hidden;margin-top:4px}.h72-fr iframe{border:0;width:1123px;height:794px;transform-origin:0 0;display:block}
.h72-hub{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}.h72-hub button{border:0;border-radius:16px;padding:14px 6px;font-weight:900;font-size:.92rem;color:#fff;box-shadow:0 4px 0 rgba(0,0,0,.3)}
.bl-s{width:100%;box-sizing:border-box;border-radius:12px;padding:11px;border:2px solid #A3E635;font-weight:700;font-size:.95rem;margin-bottom:10px;background:transparent;color:inherit}.bl-m{font-weight:900;margin:12px 0 6px;text-transform:capitalize}.bl-c{border-radius:14px;padding:10px 12px;margin-bottom:8px;background:rgba(148,163,184,.16)}.bl-c summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:8px;font-weight:800}.bl-c summary small{display:block;font-weight:600;opacity:.8}.bl-r{display:grid;grid-template-columns:1fr auto auto;gap:8px;font-size:.82rem;padding:4px 0;border-top:1px dashed rgba(148,163,184,.5)}.bl-c img{max-width:100%;border-radius:8px;margin-top:8px}`;
document.head.appendChild(st);
/* =================== DATI =================== */
const EQ0=[{id:'e1',n:'Frigo cucina',min:0,max:4,sn:2},{id:'e2',n:'Frigo pesce',min:0,max:2,sn:1},{id:'e3',n:'Frigo sala',min:0,max:4,sn:4},{id:'e4',n:'Congelatore',min:-30,max:-18,sn:5}];
const DEFSN={e1:2,e2:1,e3:4,e4:5};
/* elenco pulizie uguale ai moduli SC3 e SC4 */
const CL=[
{id:'s3a',sh:'sc3',g:'Cucina',pn:'Soffitto e lampadari',fl:'Mensile Deragnatura',f:'m'},{id:'s3b',sh:'sc3',g:'Cucina',pn:'Pareti lavabili e sup. lav.',fl:'Settimanale',f:'s'},{id:'s3c',sh:'sc3',g:'Cucina',pn:'Area rifiuti',fl:'Giornaliero',f:'g'},{id:'c2',sh:'sc3',g:'Cucina',pn:'Pavimenti',fl:'Giornaliero',f:'g'},
{id:'s3e',sh:'sc3',g:'Area somministrazione',pn:'Pavimento',fl:'Giornaliero',f:'g'},{id:'s3f',sh:'sc3',g:'Area somministrazione',pn:'Porte e finestre',fl:'Settimanale',f:'s'},
{id:'s3g',sh:'sc3',g:'Servizi igienici',pn:'Pavimento',fl:'Giornaliero',f:'g'},{id:'c3',sh:'sc3',g:'Servizi igienici',pn:'Sanitari Lavelli',fl:'Giornaliero',f:'g'},
{id:'s4a',sh:'sc4',g:'Cucina',pn:'Coltelli Stoviglie',fl:'Fine ciclo lavorazione',f:'g'},{id:'s4b',sh:'sc4',g:'Cucina',pn:'Forno',fl:'Fine ciclo lavorazione',f:'g'},{id:'s4c',sh:'sc4',g:'Cucina',pn:'Lavelli',fl:'Giornaliero',f:'g'},{id:'c5',sh:'sc4',g:'Cucina',pn:'Frigoriferi congelatori abbattitore',fl:'Settimanale',f:'s'},{id:'c6',sh:'sc4',g:'Cucina',pn:'Cappa di aspirazione',fl:'Settimanale',f:'s'},
{id:'s4f',sh:'sc4',g:'Area bar',pn:'Bancone bar',fl:'Fine ciclo lavorazione',f:'g'},{id:'s4g',sh:'sc4',g:'Area bar',pn:'Macchina del caffè',fl:'Giornaliero',f:'g'}
].map(c=>Object.assign(c,{n:c.g+' · '+c.pn+(c.fl==='Fine ciclo lavorazione'?' (a fine lavorazione)':'')}));
const H=()=>LS('alicetta_haccp');
const eqs=()=>{const c=H().cfg;return ((c&&c.eq)||EQ0).map(e=>e.sn===undefined&&DEFSN[e.id]?Object.assign({},e,{sn:DEFSN[e.id]}):e);};
const cls=()=>{const c=H().cfg;return (c&&c.cl)||[];};
const cfgOk=()=>cls().some(c=>c.sh==='sc3')&&cls().some(c=>c.sh==='sc4');
window.v72Adopt=async()=>{if(!owner())return alert('Può farlo solo Christian.');if(!confirm('Sostituisco l’elenco delle pulizie con quello dei moduli SC3 e SC4 (strutture e attrezzature)?\n\nLe spunte già messe su pavimenti cucina, bagni, frigoriferi e cappa restano. Le altre voci vecchie non compariranno più.'))return;
 const h=H(),old=(h.cfg||{}),cfg={eq:old.eq||EQ0,cl:CL.map(c=>({id:c.id,n:c.n,f:c.f,sh:c.sh,g:c.g,pn:c.pn,fl:c.fl})),rem:old.rem||{a:'10:30',b:'17:30',c:'23:00'}};
 h.cfg=cfg;try{localStorage.setItem('alicetta_haccp',JSON.stringify(h));}catch(e){}try{await fbSend('/costi/haccp/cfg','PUT',cfg);}catch(e){alert('Salvato su questo telefono; lo invierò agli altri quando c’è rete: riapri HACCP più tardi.');}
 try{toast('✅ Pulizie aggiornate ai moduli SC3 e SC4');}catch(e){}setTimeout(()=>location.reload(),900);};
const LOG={};
async function logOf(ym){if(LOG[ym])return LOG[ym];let d=(H().log||{})[ym];if(navigator.onLine){try{const r=await fbGet('/costi/haccp/log/'+ym);if(r&&typeof r==='object')d=Object.assign({},r,d||{});}catch(e){}}LOG[ym]=d||{};return LOG[ym];}
const SCD={};
async function scOf(k){if(SCD[k])return SCD[k];let d=LS('alicetta_'+k);if(navigator.onLine){try{const r=await fbGet('/costi/haccp/'+k);if(r&&typeof r==='object')d=Object.assign({},d,r);}catch(e){}}SCD[k]=d;return d;}
const inM=(o,f,m)=>Object.values(o).filter(r=>r&&String(r[f]||'').slice(0,7)===m).sort((a,b)=>String(a[f]).localeCompare(String(b[f]))||(a.ts||0)-(b.ts||0));
/* =================== MODULI UGUALI ALLA CARTA =================== */
const LOGO=`<div class="lg"><svg viewBox="0 0 60 18" width="30" height="9"><path d="M4 9 L16 3 L40 3 L52 9 L40 15 L16 15 Z M52 9 L58 4 L58 14 Z" fill="none" stroke="#D98C6A" stroke-width="1.6"/></svg><b>ALICETTA</b><i>TRATTORIA</i></div>`;
const CSS=`@page{size:A4 landscape;margin:9mm}*{box-sizing:border-box}body{font-family:Calibri,Arial,sans-serif;color:#000;margin:0;background:#fff}.pg{page-break-after:always;height:190mm;width:279mm;display:flex;flex-direction:column;overflow:hidden}.pg:last-child{page-break-after:auto}table{border-collapse:collapse;width:100%;table-layout:fixed}td,th{border:1px solid #000;font-weight:normal;overflow:hidden}.lg{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;background:#3D4B66;color:#D98C6A;width:19mm;height:14mm;line-height:1}.lg b{font-size:7.5pt;letter-spacing:1.3px;margin-top:2px;font-weight:bold}.lg i{font-size:4pt;font-style:normal;letter-spacing:1.8px;margin-top:2px}
.hA td{height:18mm;vertical-align:middle}.hA .l{width:8%}.hA .c{text-align:center}.hA .r{width:19%;text-align:center;font-weight:bold;font-size:10.5pt}
.hB td{height:16mm;vertical-align:top;padding:3px 5px}.hB .l{width:31%;text-align:center;vertical-align:middle}.hB .r{font-weight:bold;font-size:9.5pt}.hB .r span{margin-left:18mm}.hB u{text-decoration:none;border-bottom:1px solid #000;display:inline-block;min-width:26mm;text-align:center;font-weight:normal}
.tt{color:#1F5FBF;font-size:12pt;text-align:center;padding:4px;font-weight:bold;border-bottom:0}.g{flex:1;margin-top:3mm}.g th{font-size:9pt;font-weight:bold;padding:3px 2px;vertical-align:middle;text-align:center}.g td{font-size:8pt;padding:0 3px;vertical-align:middle}.c{text-align:center}
.ft{display:flex;align-items:center;gap:10px;margin-top:3mm;font-size:8.5pt;color:#333}.is{display:inline-flex;align-items:baseline;border:1.5px solid #8A8F3C;border-radius:50% 50% 6px 6px;padding:2px 7px}.is b{font-size:13pt}.is small{font-size:6pt}.isn{font-size:15pt;letter-spacing:.5px;margin-right:14px}.ad{flex:1;text-align:center}
.nt{font-size:8.5pt;margin-top:2mm;font-weight:bold}.nt i{color:#C00000;font-style:normal;text-decoration:underline}.sg{font-size:9.5pt;margin-top:3mm}
.cl td,.cl th{font-size:7.5pt;height:4.6mm;padding:0 1px}.cl .p{width:10.5%;text-align:left;padding-left:3px}.cl .f{width:9%;text-align:center}.cl .d{text-align:center}.cl .y td{background:#FFE600;text-align:left;padding-left:3px}.cl .mh{text-align:left;font-weight:bold;font-size:8.5pt;padding-left:4px}.cl .x{text-align:center;font-weight:bold;font-size:8pt}.cl th{font-weight:bold;text-align:left;padding-left:3px;vertical-align:top}.blk{margin-top:4mm}`;
const FOOT=`<div class="ft"><span class="is"><b>IS</b><small>srl</small></span><span class="isn">ITALIA Safety srl</span><span class="ad">C/da Alboreto Zona Ind.le – 66026 Ortona (CH) – Tel./Fax. 085.9039196 - P.Iva 02391680697 – e.mail : italiasafety@pec.it</span></div>`;
const HA=`<table class="hA"><tr><td class="l"></td><td class="c">${LOGO}</td><td class="r">SCHEDE DI AUTOCONTROLLO HACCP</td></tr></table>`;
const HB=(t,m,noM)=>`<table class="hB"><tr><td class="l">${LOGO}</td><td class="r">${t}${noM?'':`<span>Mese <u>${m?MESI[+m.slice(5,7)-1].toUpperCase():''}</u> Anno <u>${m?m.slice(0,4):''}</u></span>`}</td></tr></table>`;
const cols=a=>'<colgroup>'+a.map(w=>`<col style="width:${w}%">`).join('')+'</colgroup>';
const pages=(R,n,fn)=>{const P=Math.max(1,Math.ceil(R.length/n));let h='';for(let p=0;p<P;p++)h+=fn(Array.from({length:n},(_,i)=>R[p*n+i]||null));return h;};
const td=(v,c)=>`<td${c?' class="'+c+'"':''}>${v==null?'':esc(v)}</td>`;
async function sc1(m){const R=inM(await scOf('sc1'),'d',m);return pages(R,19,L=>`<div class="pg">${HA}<table class="g" style="flex:none">${cols([8,13,17,33,5,5,19])}<tr><th colspan="7" class="tt">SC1 – SCHEDA DI REGISTRAZIONE ACCETTAZIONE PRODOTTI DEPERIBILI</th></tr><tr><th rowspan="2">Data accettazione</th><th rowspan="2">ESTREMI DEL DOCUMENTO DI ACCOMPAGNAMENTO<br>N° Fatt.<br>o bolla</th><th rowspan="2">Fornitore</th><th rowspan="2">Prodotto conferito (lotto)/<br>vedi fattura</th><th colspan="2">CONFORMITA’*</th><th rowspan="2">FIRMA ADDETTO AL RICEVIMENTO MERCI</th></tr><tr><th>C</th><th>NC</th></tr>
${L.map(r=>`<tr style="height:6.2mm">${td(r&&dmy(r.d))}${td(r&&r.num)}${td(r&&r.forn)}${td(r&&String(r.prod||'').slice(0,110))}${td(r?(r.c?'X':''):'','c')}${td(r?(r.c?'':'X'):'','c')}${td(r&&r.firma)}</tr>`).join('')}</table>
<div class="nt"><i>*Conformita’</i>: l’addetto al ricevimento merci prima di accettare i prodotti si assicura che questi siano trasportati in modo igienico e rispettando le idonee temperature ed inoltre effettua un accurato esame visivo degli stessi al fine di controllare l’integrità delle confezioni, l’assenza di insudiciamento o di alterazioni visibili dei prodotti.</div><div class="sg">Firma del responsabile dell’autocontrollo ______________________________</div><div style="flex:1"></div>${FOOT}</div>`);}
async function sc2(m){const R=inM(await scOf('sc2'),'d',m);const nat=r=>[r.nat,r.natx].filter(Boolean).join(': ');return pages(R,20,L=>`<div class="pg">${HA}<table class="g">${cols([7,13,6,7,8,12,25,13,9])}<tr><th colspan="9" class="tt">SC2 - SCHEDA PRODOTTI NON CONFORMI</th></tr><tr><th>Data</th><th>Prodotto</th><th>Bolla<br>n.</th><th>Lotto</th><th>Quantità</th><th>Produttore/<br>Fornitore</th><th>Natura della Non Conformità<br>(Data di scadenza – Aspetto esteriore - Temperatura)</th><th>Azione correttiva intrapresa</th><th>Addetto al controllo</th></tr>
${L.map(r=>`<tr style="height:6.3mm">${td(r&&dmy(r.d))}${td(r&&r.prod)}${td(r&&r.num)}${td(r&&r.lotto)}${td(r&&r.qta)}${td(r&&r.forn)}${td(r&&nat(r))}${td(r&&r.az)}${td(r&&r.add)}</tr>`).join('')}</table>${FOOT}</div>`);}
async function sc6(m){const L=await logOf(m),E=eqs(),T=today(),dim=new Date(+m.slice(0,4),+m.slice(5,7),0).getDate();const f=v=>{const n=Number(v);return (isFinite(n)?String(Math.round(n*10)/10):String(v)).replace('.',',');};let rows='';
 for(let d=1;d<=31;d++){const dd=pad(d),ex=d<=dim,ks=ex?Object.keys(L).filter(k=>k.startsWith(dd+'_')):[];const tk=ks.filter(k=>k.startsWith(dd+'_t_')).map(k=>L[k]).filter(Boolean).sort((a,b)=>(a.ts||0)-(b.ts||0));
  const cell=n=>{const e=E.find(x=>+x.sn===n);if(!e)return'';const a=tk.filter(x=>x.e===e.id);if(!a.length)return'';const mm=a.find(x=>x.s==='m'),ss=a.find(x=>x.s==='s');return [mm,ss].filter(Boolean).map(x=>f(x.v)).join(' / ');};
  const past=ex&&(m+'-'+dd)<T;const closed=past&&!ks.length;const az=tk.map(x=>x.a).filter(Boolean).join('; ');const by=tk[0]?FULL(tk[0].by):'';const hr=tk[0]?new Date(tk[0].ts).toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'}):'';
  rows+=`<tr style="height:4.9mm"><td>${dd}</td>${td(closed?'CHIUSO':hr,'c')}${[1,2,3,4,5,6,7,8,9,10].map(n=>td(closed&&E.some(x=>+x.sn===n)?'/':cell(n),'c')).join('')}${td(az)}${td(by,'c')}</tr>`;}
 return `<div class="pg">${HB('SC 6- SCHEDA REGISTRAZIONE TEMPERATURE',m)}<table class="g">${cols([4.5,7,5,5,5,5,5,5,5,5,5,5,17.5,16])}<tr><th>Data</th><th>ORARIO</th>${[1,2,3,4,5,6,7,8,9,10].map(n=>`<th>Temp.<br>N° ${n}</th>`).join('')}<th style="font-weight:normal;font-size:10pt">Eventuali azioni correttive</th><th>Addetto al controllo</th></tr>${rows}</table>
<div style="font-size:7pt;margin-top:1.5mm;color:#333">${E.filter(e=>e.sn).sort((a,b)=>a.sn-b.sn).map(e=>'N° '+e.sn+' = '+esc(e.n)+' ('+f(e.min)+' / '+f(e.max)+' °C)').join(' · ')} · due valori nella stessa casella = mattina / sera</div></div>`;}
async function clBlock(sh,m,blank){const C=(cfgOk()?cls():CL).filter(c=>c.sh===sh);const L=blank?{}:await logOf(m),P=blank?{}:await logOf(addM(m,-1));const all=Object.assign({},P,L);const mark=(c,d)=>{if(blank)return'';const dd=pad(d);if(c.f==='g')return L[dd+'_c_'+c.id]?'X':'';const iso=m+'-'+dd;return Object.keys(all).some(k=>k.endsWith('_c_'+c.id)&&all[k]&&all[k].d===iso)?'X':'';};
 let h=`<table class="cl blk"><colgroup><col style="width:10.5%"><col style="width:9%">${'<col>'.repeat(31)}</colgroup><tr><th rowspan="2">Punto<br>intervento</th><th rowspan="2">Frequenza</th><td colspan="31" class="mh">MESE <span style="display:inline-block;min-width:42mm;border-bottom:1px solid #000;text-align:center;font-weight:normal;text-transform:capitalize">${blank?'':MESI[+m.slice(5,7)-1]}</span> ANNO <span style="display:inline-block;min-width:36mm;border-bottom:1px solid #000;text-align:center;font-weight:normal">${blank?'':m.slice(0,4)}</span></td></tr><tr>${Array.from({length:31},(_,i)=>`<td class="d">${pad(i+1)}</td>`).join('')}</tr>`;let g='';
 C.forEach(c=>{if(c.g!==g){g=c.g;h+=`<tr class="y"><td colspan="2">${esc(g)}</td>${'<td style="background:#fff"></td>'.repeat(31)}</tr>`;}h+=`<tr><td class="p">${esc(c.pn)}</td><td class="f">${esc(c.fl)}</td>${Array.from({length:31},(_,i)=>`<td class="x">${mark(c,i+1)}</td>`).join('')}</tr>`;});return h+'</table>';}
async function scCl(sh,m){const nx=addM(m,1),nl=await logOf(nx),has=Object.keys(nl).some(k=>/_c_/.test(k));const t=sh==='sc3'?'SC3 – SCHEDA EFFETTUAZIONE PULIZIE DELLE STRUTTURE':'SC4 – SCHEDA EFFETTUAZIONE PULIZIE DELLE ATTREZZATURE';
 return `<div class="pg">${HB(t,null,true)}${await clBlock(sh,m)}${await clBlock(sh,nx,!has)}<div class="sg" style="display:flex;gap:10mm"><span>Firma del responsabile Autocontrollo____________________________________</span>${sh==='sc4'?'<span>altro:.................................................................................</span>':''}</div></div>`;}
async function sc8(m){const R=inM(await scOf('sc8'),'dab',m);return pages(R,27,L=>`<div class="pg">${HB('SC 8- SCHEDA REGISTRAZIONE ABBATTIMENTO',m)}<div style="font-size:7.5pt;margin:1mm 0 0 48mm">C = CONFORME &nbsp; <b>NC</b> = NON CONFORME</div><table class="g" style="margin-top:0">${cols([10,15,3.5,3.5,14.5,12,11,8,7.5,9,7])}<tr><th>DATA ARRIVO</th><th>ALIMENTO</th><th>C</th><th>NC</th><th>FORNITORE/<br>NS PRODUZIONE</th><th>DATA<br>ABBATTIMENTO</th><th>PESO<br>/ N° FATT</th><th>ORA<br>INGRESSO</th><th>ORA<br>USCITA</th><th>DATA USCITA</th><th>Addetto al Controllo</th></tr>
${L.map(r=>`<tr style="height:5.2mm">${td(r&&dmy(r.arr),'c')}${td(r&&r.al)}${td(r?(r.c!==false?'X':''):'','c')}${td(r?(r.c!==false?'':'X'):'','c')}${td(r&&r.forn)}${td(r&&dmy(r.dab),'c')}${td(r&&r.peso)}${td(r&&r.oin,'c')}${td(r&&r.oout,'c')}${td(r&&dmy(r.dout),'c')}${td(r&&r.add)}</tr>`).join('')}</table><div style="font-size:8.5pt;margin-top:2mm">EVENTUALI CONDIZIONI CORRETTIVE: ..........................................................................................................................................................................................</div></div>`);}
const SH=[['sc6','🧊 SC6 · Temperature frigoriferi','una riga al giorno, colonne Temp. N° 1-10',sc6],['sc3','🧹 SC3 · Pulizie delle strutture','cucina, sala, servizi igienici',m=>scCl('sc3',m)],['sc4','🧽 SC4 · Pulizie delle attrezzature','cucina e area bar',m=>scCl('sc4',m)],['sc1','📦 SC1 · Accettazione merci','dalle bolle e fatture caricate',sc1],['sc2','⛔ SC2 · Prodotti non conformi','merce con problemi',sc2],['sc8','❄️ SC8 · Abbattimento','alimenti abbattuti',sc8]];
const wrap=(body,t)=>`<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=1123"><title>${t}</title><style>${CSS}</style></head><body>${body}</body></html>`;
async function build(keys,m){let b='';for(const s of SH){if(keys.includes(s[0]))b+=await s[3](m);}return wrap(b,(keys.length===1?keys[0].toUpperCase():'Schede HACCP')+' '+MESI[+m.slice(5,7)-1]+' '+m.slice(0,4)+' – Alicetta Trattoria');}
window.v72Build=build;
let M=today().slice(0,7);
async function out(keys,how){try{toast('⏳ Preparo le schede…');}catch(e){}const html=await build(keys,M),name=(keys.length===1?keys[0].toUpperCase():'schede-haccp')+'-alicetta-'+M+'.html',file=new File([html],name,{type:'text/html'});
 const dl=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(file);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},2000);};
 if(how==='print'){const w=window.open('','_blank');if(!w){dl();return toast('File scaricato: aprilo e stampalo');}w.document.write(html);w.document.close();setTimeout(()=>{try{w.print();}catch(e){}},800);return;}
 try{if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:'Schede HACCP Alicetta',text:'Schede HACCP Alicetta Trattoria – '+MESI[+M.slice(5,7)-1]+' '+M.slice(0,4)});return;}}catch(e){if(e&&e.name==='AbortError')return;}dl();try{toast('File scaricato: allegalo a WhatsApp o all’email');}catch(e){}}
window.v72Out=(k,how)=>out(k==='all'?SH.map(s=>s[0]):[k],how);
window.v72See=async k=>{const box=$('h72v_'+k);if(!box)return;if(box.innerHTML){box.innerHTML='';return;}box.innerHTML='<div style="padding:10px;color:#000">⏳ Carico…</div>';const html=await build([k],M);const w=Math.min(window.innerWidth-28,1123),sc=w/1123;const n=(html.match(/class="pg"/g)||[]).length||1;
 box.innerHTML=`<div class="h72-fr" style="height:${Math.round(794*sc*n)}px"><iframe style="transform:scale(${sc});height:${794*n}px"></iframe></div>`;box.querySelector('iframe').srcdoc=html.replace('<style>','<style>.pg{margin:9mm auto;height:190mm}body{background:#fff}');};
window.v72M=n=>{M=addM(M,n);Object.keys(SCD).forEach(k=>delete SCD[k]);drawSh();};
async function counts(){const L=await logOf(M);const o={sc6:Object.keys(L).filter(k=>/_t_/.test(k)).length+' misure',sc3:'',sc4:''};const c=Object.keys(L).filter(k=>/_c_/.test(k)).length;o.sc3=c+' spunte nel mese';o.sc4=o.sc3;for(const k of ['sc1','sc2','sc8']){const f=k==='sc8'?'dab':'d';o[k]=inM(await scOf(k),f,M).length+' righe';}return o;}
async function drawSh(){const b=$('h72Body');if(!b)return;const lbl=MESI[+M.slice(5,7)-1]+' '+M.slice(0,4);b.innerHTML=`<div class="h72-nav"><button onclick="v72M(-1)">◀</button><b>${lbl}</b><button onclick="v72M(1)">▶</button></div><div style="font-weight:700;opacity:.8">⏳ Carico i dati…</div>`;const c=await counts();
 b.innerHTML=`<div class="h72-nav"><button onclick="v72M(-1)">◀</button><b>${lbl}</b><button onclick="v72M(1)">▶</button></div>
<div class="h72-all"><button onclick="v72Out('all','print')">🖨️ Stampa tutte</button><button onclick="v72Out('all','share')">📤 Condividi tutte</button></div>
${!cfgOk()?`<div class="h72-it" style="border-color:#F59E0B"><b>🧹 Pulizie non ancora uguali ai moduli</b><small>Le schede SC3 e SC4 hanno voci fisse (soffitto, pareti, area rifiuti, forno, bancone bar…). L’elenco nell’app è ancora quello vecchio: finché non lo aggiorni, in queste due schede compaiono solo pavimenti cucina, sanitari, frigoriferi e cappa.</small>${owner()?'<button class="h72-x" style="background:#F59E0B;color:#3B2A00;width:100%" onclick="v72Adopt()">✅ Usa l’elenco dei moduli SC3 e SC4</button>':'<small>Può farlo Christian.</small>'}</div>`:''}
${SH.map(s=>`<div class="h72-it"><b>${s[1]}</b><small>${s[2]} · ${c[s[0]]||''}</small><div class="h72-b"><button class="v" onclick="v72See('${s[0]}')">👁️ Vedi</button><button class="p" onclick="v72Out('${s[0]}','print')">🖨️ Stampa</button><button class="s" onclick="v72Out('${s[0]}','share')">📤 Invia</button></div><div id="h72v_${s[0]}"></div></div>`).join('')}`;}
window.v72Sheets=()=>{let o=$('h72Ov');if(o)o.remove();o=document.createElement('div');o.id='h72Ov';o.className='h72-ov';o.innerHTML=`<div class="h72-top"><h3>📚 Schede HACCP</h3><button class="h72-x" onclick="document.getElementById('h72Ov').remove()">✕ Chiudi</button></div><div class="h72-body" id="h72Body"></div>`;document.body.appendChild(o);Object.keys(LOG).forEach(k=>delete LOG[k]);Object.keys(SCD).forEach(k=>delete SCD[k]);drawSh();};
/* =================== TUTTE LE BOLLE =================== */
let BL=null,BQ='';
async function loadB(){let b={};try{const C=window.v211Data?v211Data():null;b=Object.assign({},(C&&C.bolle)||{});}catch(e){}if(navigator.onLine){try{const r=await fbGet('/costi/bolle');if(r&&typeof r==='object')b=Object.assign({},b,r);}catch(e){}}BL=b;}
window.v72BQ=v=>{BQ=v;drawB(true);};
window.v72Foto=async(id,ts)=>{const box=$('blf_'+id);if(!box)return;box.innerHTML='⏳ Carico la foto…';try{const f=await fbGet('/costi/haccpfoto/s'+ts);if(f&&f.imgs&&f.imgs.length){box.innerHTML=f.imgs.map(b=>`<img src="data:image/jpeg;base64,${b}">`).join('');return;}}catch(e){}box.innerHTML='<small>Nessuna foto salvata per questo documento.</small>';};
function drawB(keep){const b=$('h72BBody');if(!b||!BL)return;const q=BQ.trim().toLowerCase();const L=Object.entries(BL).filter(([i,x])=>x&&x.data).filter(([i,x])=>!q||(String(x.fornitore||'')+' '+String(x.num||'')+' '+(x.righe||[]).map(r=>r.p||r.i).join(' ')).toLowerCase().includes(q)).sort((a,b)=>String(b[1].data).localeCompare(String(a[1].data))||(b[1].ts||0)-(a[1].ts||0));
 const tot=L.reduce((s,[i,x])=>s+(Number(x.tot)||0),0);let m='',h='';L.forEach(([id,x])=>{const ym=String(x.data).slice(0,7);if(ym!==m){m=ym;const ms=L.filter(([i,y])=>String(y.data).slice(0,7)===ym);h+=`<div class="bl-m">${MESI[+ym.slice(5,7)-1]} ${ym.slice(0,4)} · ${ms.length} documenti · € ${formatPrice(ms.reduce((s,[i,y])=>s+(Number(y.tot)||0),0))}</div>`;}
  h+=`<details class="bl-c"><summary><span>${x.tipo==='scontrino'?'🧾':x.tipo==='bolla'?'📦':'📄'} ${esc(dmy(x.data))} · ${esc(x.fornitore||'')}<small>${esc(x.tipo||'documento')}${x.num?' n. '+esc(x.num):''} · ${(x.righe||[]).length} prodotti</small></span><b>€ ${formatPrice(x.tot||0)}</b></summary>${(x.righe||[]).map(r=>`<div class="bl-r"><span>${esc(r.p||r.i||'')}${r.l?' <small>· lotto '+esc(r.l)+'</small>':''}</span><span>${r.q!=null?esc(String(r.q).replace('.',','))+' '+esc(r.u||''):''}</span><span>${r.t!=null?'€ '+formatPrice(r.t):(r.pu!=null?'€ '+formatPrice(r.pu):'')}</span></div>`).join('')}<div style="margin-top:8px"><button class="btn-note" style="padding:7px 12px" onclick="v72Foto('${id}',${x.ts||0})">📷 Vedi la foto del documento</button></div><div id="blf_${id}"></div></details>`;});
 const list=`<div style="font-weight:800;margin-bottom:6px">${L.length} documenti · totale € ${formatPrice(tot)} (IVA esclusa)</div>${h||'<div style="opacity:.8;font-weight:700">Nessuna bolla trovata.</div>'}`;
 if(keep&&$('blList')){$('blList').innerHTML=list;return;}b.innerHTML=`<input class="bl-s" placeholder="🔎 Cerca fornitore, numero o prodotto" value="${esc(BQ)}" oninput="v72BQ(this.value)"><div id="blList">${list}</div>`;}
window.v72Bolle=async()=>{let o=$('h72Ov');if(o)o.remove();o=document.createElement('div');o.id='h72Ov';o.className='h72-ov';o.innerHTML=`<div class="h72-top"><h3>📦 Tutte le bolle e fatture</h3><button class="h72-x" onclick="document.getElementById('h72Ov').remove()">✕ Chiudi</button></div><div class="h72-body" id="h72BBody"><div style="font-weight:700;opacity:.8">⏳ Carico i documenti…</div></div>`;document.body.appendChild(o);await loadB();drawB();};
/* =================== TASTI NELLA PAGINA HACCP E IN FORNITORI =================== */
function hub(){document.querySelectorAll('.hxHost').forEach(h=>{if(h.querySelector('.h72-hub'))return;const d=document.createElement('div');d.className='h72-hub';d.innerHTML='<button style="background:#7C3AED" onclick="v72Sheets()">📚 Tutte le schede HACCP<br><small style="font-weight:700">frigoriferi, pulizie, merce, abbattimenti</small></button><button style="background:#0E7490" onclick="v72Bolle()">📦 Tutte le bolle<br><small style="font-weight:700">consulta i documenti acquisiti</small></button>';h.prepend(d);});
 const p=$('hcPage');if(p&&!p.querySelector('.h72-hub')&&!document.querySelector('.hxHost .h72-hub')){/* la pagina non è ancora pronta */}
 const fo=$('hub_sales_forn');if(fo&&!fo.querySelector('.h72-bf')){const b=document.createElement('button');b.className='btn-main btn-bill h72-bf';b.style.cssText='width:100%;margin-bottom:10px;';b.textContent='📦 Consulta tutte le bolle e fatture acquisite';b.onclick=window.v72Bolle;fo.prepend(b);}}
setInterval(()=>{try{hub();}catch(e){}},800);
})();
}catch(e){console.error("chef-extra v2.9.72",e);}
try{(function(){const w=()=>{if(typeof window.v217Ask==='function'&&!window.v217Ask._r){const _a=window.v217Ask;window.v217Ask=function(q){const t=String(q||(document.getElementById('chQ')||{}).value||'');if(/recension/i.test(t)&&window.v65Grp){v65Grp('rev');try{toast('⭐ Ecco le risposte alle recensioni');}catch(e){}return;}return _a.apply(this,arguments);};window.v217Ask._r=1;}};w();setTimeout(w,2500);})();}catch(e){}
try{
(function(){
const $=id=>document.getElementById(id);
const st=document.createElement('style');
st.textContent=`
.v73ok{position:relative;overflow:hidden;border-radius:18px;padding:16px 14px;margin:6px 0 12px;text-align:center;color:#fff;background:linear-gradient(135deg,#16A34A,#22C55E 55%,#84CC16);border:3px solid #A3E635;box-shadow:0 6px 0 #166534,0 10px 24px rgba(22,163,74,.45);animation:v73pop .6s cubic-bezier(.2,1.4,.4,1) both}
.v73ok .v73c{width:74px;height:74px;margin:0 auto 6px;position:relative}
.v73ok .v73c:before{content:'';position:absolute;inset:0;border-radius:50%;background:rgba(255,255,255,.35);animation:v73ring 1.4s ease-out infinite}
.v73ok svg{position:relative;width:74px;height:74px}
.v73ok svg circle{fill:#fff;}
.v73ok svg path{fill:none;stroke:#16A34A;stroke-width:9;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:60;stroke-dashoffset:60;animation:v73draw .6s .35s ease-out forwards}
.v73ok b.v73t{display:block;font-size:1.45rem;font-weight:900;letter-spacing:.2px;text-shadow:0 2px 0 rgba(0,0,0,.25)}
.v73ok .v73s{font-size:.86rem;font-weight:800;margin-top:3px;text-shadow:0 1px 0 rgba(0,0,0,.25)}
.v73ok i.v73d{position:absolute;top:-10px;width:9px;height:14px;border-radius:2px;opacity:0;animation:v73fall 1.9s ease-in forwards}
.v73no{border-radius:18px;padding:14px;margin:6px 0 12px;text-align:center;color:#fff;background:linear-gradient(135deg,#B91C1C,#EF4444);border:3px solid #FCA5A5;box-shadow:0 6px 0 #7F1D1D;animation:v73shake .6s both}
.v73no b{display:block;font-size:1.3rem;font-weight:900}.v73no span{font-size:.84rem;font-weight:800}
@keyframes v73pop{0%{transform:scale(.6);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes v73ring{0%{transform:scale(.7);opacity:.9}100%{transform:scale(1.7);opacity:0}}
@keyframes v73draw{to{stroke-dashoffset:0}}
@keyframes v73fall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(190px) rotate(520deg);opacity:0}}
@keyframes v73shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-9px)}40%{transform:translateX(9px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}
@media(prefers-reduced-motion:reduce){.v73ok,.v73ok *,.v73no{animation:none!important}.v73ok svg path{stroke-dashoffset:0}}`;
document.head.appendChild(st);
const fmt=n=>(typeof formatPrice==='function'?formatPrice(n):Number(n).toFixed(2).replace('.',','));
const COL=['#FDE047','#F472B6','#38BDF8','#FFFFFF','#FB923C'];
function banner(sv){
 const el=Date.now()-(sv.at||0);const fresh=el>=0&&el<3500;const dl=fresh?'-'+el+'ms':'-9s';
 const a=sv.app||{};const n=[sv.rtCash,sv.rtEl,sv.pos,sv.suCash].filter(x=>x!=null).length;
 if(sv.ok){let c='';if(fresh)for(let i=0;i<22;i++)c+=`<i class="v73d" style="left:${(i*4.6+Math.random()*3).toFixed(1)}%;background:${COL[i%5]};animation-delay:calc(${dl} + ${(Math.random()*.6).toFixed(2)}s)"></i>`;
  return `<div class="v73ok" style="${fresh?'':'animation:none;'}">${c}<div class="v73c"><svg viewBox="0 0 74 74"><circle cx="37" cy="37" r="34"/><path d="M21 38 L33 50 L54 26" style="${fresh?'animation-delay:calc('+dl+' + .35s)':'animation:none;stroke-dashoffset:0'}"/></svg></div><b class="v73t">I CONTI TORNANO!</b><div class="v73s">App e SumUp coincidono · ${n} controlli ok<br>Incasso € ${fmt(a.tot||0)} · ${a.n||0} conti</div></div>`;}
 return `<div class="v73no" style="${fresh?'':'animation:none;'}"><b>⚠️ I CONTI NON TORNANO</b><span>Guarda qui sotto cosa controllare, poi rifai la verifica</span></div>`;}
if(typeof ccResultHtml==='function'){const _r=ccResultHtml;ccResultHtml=function(sv,L){const h=_r.apply(this,arguments);try{return banner(sv)+h;}catch(e){return h;}};}
/* dopo il salvataggio porta in vista il risultato */
if(typeof saveCashClose==='function'){const _s=saveCashClose;saveCashClose=function(){const r=_s.apply(this,arguments);try{setTimeout(()=>{const x=$('ccResult');if(x&&x.querySelector('.v73ok,.v73no'))x.scrollIntoView({behavior:'smooth',block:'center'});},120);const k=(state.staffCfg&&state.staffCfg.closures||{});}catch(e){}return r;};}
/* ordine: conti, chiusura cassa (con Allinea conti), poi fatture da emettere */
function order(){const c=$('contiList'),cc=$('cashClose'),i=$('invList');if(!c||!cc)return;if(c.nextElementSibling!==cc)c.after(cc);if(i&&cc.nextElementSibling!==i)cc.after(i);}
window.v73Order=order;order();setInterval(order,400);
})();

}catch(e){console.error("chef-extra v2.9.73",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);
const tst=m=>{try{__toast(m,2800,1);}catch(e){try{alert(m);}catch(x){}}};
const nk=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]/g,'');
const SKIP=c=>c==='1 Coperto'||c==='2 Bevande';
const st=document.createElement('style');
st.textContent=`.v74b{width:100%;margin:0 0 10px;background:linear-gradient(135deg,#7C3AED,#C026D3);color:#fff;font-weight:900;border:2px solid #A3E635;border-radius:14px;padding:12px;font-size:1rem;box-shadow:0 4px 0 #581C87}
.v74chip{display:flex;justify-content:space-between;align-items:center;gap:8px;width:100%;text-align:left;margin:0 0 6px;padding:10px 12px;border-radius:12px;border:2px solid #A3E635;background:#D8EEFA;color:#1F2937;font-weight:800;font-size:.92rem;cursor:pointer}
.v74chip small{display:block;font-weight:600;color:#4B5563;font-size:.72rem}.v74chip em{font-style:normal;font-weight:900;background:#16A34A;color:#fff;border-radius:10px;padding:5px 10px;white-space:nowrap}
.v74chip.off em{background:#F59E0B;color:#422006}.v74h{font-weight:900;font-size:.85rem;margin:10px 0 6px;color:#9D174D}
body.dark .v74chip{background:#1E293B;color:#F1F5F9;border-color:#84CC16}body.dark .v74chip small{color:#CBD5E1}body.dark .v74h{color:#F9A8D4}
.v74k{background:#FEF3C7;border:2px solid #F59E0B;border-radius:12px;padding:10px;margin:8px 0;font-size:.84rem;color:#451A03}.v74k b{color:#92400E}
.v74z{background:#EDE9FE;border:2px solid #8B5CF6;border-radius:14px;padding:10px;margin:0 0 10px;color:#2E1065;font-size:.8rem}
.v74z .st{font-weight:800;margin-top:6px}`;
document.head.appendChild(st);
/* ---------- archivio piatti ---------- */
const cfg=()=>{state.staffCfg=state.staffCfg||{};return state.staffCfg;};
const arch=()=>{const c=cfg();c.menuArch=c.menuArch||{};return c.menuArch;};
function snap(){try{if(!Array.isArray(state.menu)||!state.menu.length)return;const A=arch();let nw=0;state.menu.forEach(m=>{if(!m||!m.name||SKIP(m.cat))return;const k=nk(m.name);if(!k)return;const o=A[k];if(!o)nw++;if(!o||o.p!==m.price||o.c!==m.cat||(!o.al&&m.allergens)||(!o.tr&&m.tr&&Object.keys(m.tr).length)){A[k]={n:m.name,c:m.cat,p:Number(m.price)||0,al:m.allergens||(o&&o.al)||undefined,tr:(m.tr&&Object.keys(m.tr).length)?m.tr:(o&&o.tr)||undefined,t:Date.now()};if(!o)nw=nw||1;}else o.t=o.t||Date.now();});
 const ks=Object.keys(A);if(ks.length>140){ks.sort((a,b)=>(A[a].t||0)-(A[b].t||0)).slice(0,ks.length-140).forEach(k=>delete A[k]);}
 if(nw&&typeof saveState==='function')saveState(false,{staff:true});}catch(e){}}
setInterval(snap,5000);setTimeout(snap,1500);
function cands(){const M=new Map();const A=arch();Object.keys(A).forEach(k=>{const o=A[k];M.set(k,{k,n:o.n,c:o.c,p:o.p,al:o.al,tr:o.tr,t:o.t||0,cnt:0});});
 try{(state.historyLog||[]).forEach(e=>{(e&&e.items||[]).forEach(i=>{const n=i&&i.name;if(!n||/^pane e coperto$/i.test(n))return;let c=i.cat||(typeof guessCategoryFromDishName==='function'?guessCategoryFromDishName(n,'AUTO'):'3 Antipasti');if(SKIP(c))return;const k=nk(n);if(!k)return;const o=M.get(k);if(o){o.cnt++;if((e.ts||0)>o.t)o.t=e.ts||0;}else M.set(k,{k,n,c,p:Number(i.price)||0,t:e.ts||0,cnt:1});});});}catch(e){}
 return [...M.values()];}
const inMenu=k=>(state.menu||[]).find(m=>nk(m.name)===k);
/* ---------- rimettere un piatto ---------- */
window.v74On=id=>{const m=(state.menu||[]).find(x=>x.id===id);if(!m)return;m.soldOut=false;if(state.stock&&state.stock[id]!==undefined)delete state.stock[id];saveState(false,{menu:true,stock:true});tst('✅ '+m.name+' è di nuovo disponibile');draw();try{renderStock();}catch(e){}try{renderDishList();}catch(e){}try{renderMenuGrid();}catch(e){}};
window.v74Add=k=>{const c=cands().find(x=>x.k===k);if(!c)return;const ex=inMenu(k);if(ex){return v74On(ex.id);}
 const id=Math.max(1000,...(state.menu||[]).map(x=>Number(x.id)||0))+1;const m={id,cat:c.c,name:c.n,price:Number(c.p)||0};if(c.al)m.allergens=c.al;if(c.tr)m.tr=c.tr;state.menu.push(m);
 saveState(false,{menu:true});tst('➕ '+c.n+' rimesso in carta'+(c.p?' a '+formatPrice(c.p)+' €':' (controlla il prezzo)'));if(!c.tr&&typeof retranslateDish==='function')try{retranslateDish(m);}catch(e){}
 draw();try{renderStock();}catch(e){}try{renderDishList();}catch(e){}try{renderMenuGrid();}catch(e){}};
let Q='';
function body(){const q=nk(Q);const off=(state.menu||[]).filter(m=>m.soldOut&&!SKIP(m.cat)&&(!q||nk(m.name).includes(q)));
 const C=cands().filter(x=>!inMenu(x.k)&&(!q||x.k.includes(q))).sort((a,b)=>(q?0:(b.t-a.t))||b.cnt-a.cnt||a.n.localeCompare(b.n,'it')).slice(0,q?40:25);
 let h='';
 h+=`<div class="v74h">⛔ Finiti adesso (${off.length})</div>`+(off.length?off.map(m=>`<button class="v74chip off" onclick="v74On(${m.id})"><span>${esc(m.name)}<small>${esc(m.cat.replace(/^\d\s*/,''))} · ${formatPrice(m.price)} €</small></span><em>✅ Rimetti</em></button>`).join(''):'<div class="fc-sub" style="margin-bottom:4px;">Nessun piatto finito.</div>');
 h+=`<div class="v74h">🔁 Già fatti in passato, non in carta${q?'':' (i più recenti)'}</div>`+(C.length?C.map(x=>`<button class="v74chip" onclick="v74Add('${x.k}')"><span>${esc(x.n)}<small>${esc(x.c.replace(/^\d\s*/,''))} · ${x.p?formatPrice(x.p)+' €':'prezzo da impostare'}${x.cnt?' · venduto '+x.cnt+' volte':''}</small></span><em>➕ Rimetti</em></button>`).join(''):'<div class="fc-sub">Nessun piatto trovato: scrivilo con “Aggiungi piatto”.</div>');
 return h;}
function draw(){const b=$('v74Body');if(b)b.innerHTML=body();}
window.v74Pick=()=>{let ov=$('v74Ov');if(!ov){ov=document.createElement('div');ov.id='v74Ov';ov.className='modal-overlay';document.body.appendChild(ov);}
 Q='';ov.innerHTML=`<div class="receipt-box" style="max-width:520px;max-height:90vh;overflow:auto;"><h3 style="color:var(--logo-coral);margin-bottom:6px;">🔁 Rimetti un piatto</h3><div class="fc-sub" style="margin-bottom:8px;">Tocca un piatto per rimetterlo subito in cassa, sul menù QR e in cucina. Cerca il nome per trovare anche quelli più vecchi.</div><input id="v74Q" class="form-control" placeholder="🔎 Cerca (es. cime di rape)" style="margin-bottom:6px;" oninput="v74Search(this.value)"><div id="v74Body"></div><div class="modal-actions"><button class="btn-modal" style="background:#334155;color:#fff;" onclick="document.getElementById('v74Ov').classList.remove('active')">Chiudi</button></div></div>`;
 ov.classList.add('active');draw();};
window.v74Search=v=>{Q=v||'';draw();};
/* tasto nella finestra "Nuovo piatto al volo" */
{const _o=openAddDish;openAddDish=function(){const r=_o.apply(this,arguments);try{const ov=$('addDishModal'),box=ov&&ov.querySelector('.receipt-box'),h=box&&box.querySelector('h3');if(h&&!box.querySelector('.v74b')){h.insertAdjacentHTML('afterend','<button class="v74b" onclick="document.getElementById(\'addDishModal\').classList.remove(\'active\');v74Pick()">🔁 Riaggiungi un piatto già fatto</button>');}}catch(e){}return r;};}
/* KDS: tasto e riepilogo dei finiti nel pannello scorte */
function kdsBtn(){const s=document.querySelector('#viewKds .kds-Banner button[onclick="toggleStock()"]');if(s&&!document.querySelector('#viewKds .v74kb')){const b=document.createElement('button');b.className='btn-stock-big v74kb';b.style.marginLeft='6px';b.textContent='🔁 RIMETTI PIATTO';b.onclick=v74Pick;s.after(b);}}
setInterval(kdsBtn,1500);kdsBtn();
{const _r=renderStock;renderStock=function(){const r=_r.apply(this,arguments);try{const p=$('stockPanel');if(p&&!p.querySelector('.v74top')){const off=(state.menu||[]).filter(m=>m.soldOut&&!SKIP(m.cat));p.insertAdjacentHTML('afterbegin',`<div class="v74top"><button class="v74b" onclick="v74Pick()">🔁 Rimetti un piatto finito o tolto dal menù</button>${off.length?`<div class="v74h">⛔ Finiti (${off.length})</div>`+off.map(m=>`<button class="v74chip off" onclick="v74On(${m.id})"><span>${esc(m.name)}</span><em>✅ Rimetti</em></button>`).join(''):''}</div>`);}}catch(e){}return r;};}
/* la lavagnetta: i piatti segnati FINITO restano in lista come ESAURITI */
let FIN=null;
{const _f=chalkboardFinitoNames;chalkboardFinitoNames=function(){const r=_f.apply(this,arguments);try{if(r&&r.length)FIN={n:r.slice(),t:Date.now()};}catch(e){}return r;};}
{const _s=syncChalkboardToStateMenu;syncChalkboardToStateMenu=function(list){snap();const old=(state.menu||[]).map(m=>({...m})),r=_s.apply(this,arguments);
 try{if(FIN&&Date.now()-FIN.t<120000){const C=cands();FIN.n.forEach(nm=>{const k=nk(nm);if(!k||state.menu.some(m=>nk(m.name)===k))return;
  const o=old.find(m=>!SKIP(m.cat)&&(nk(m.name)===k||(k.length>=10&&(nk(m.name).startsWith(k.slice(0,14))||k.startsWith(nk(m.name).slice(0,14))))));
  const c=C.find(x=>x.k===k);const id=Math.max(1000,...state.menu.map(x=>Number(x.id)||0))+1;
  if(o){state.menu.push({...o,id:(state.menu.some(x=>x.id===o.id)?id:o.id),soldOut:true});}
  else{const cat=(c&&c.c)||(typeof guessCategoryFromDishName==='function'?guessCategoryFromDishName(nm,'AUTO'):'3 Antipasti');if(SKIP(cat))return;state.menu.push({id,cat,name:nm,price:(c&&Number(c.p))||14,soldOut:true,...(c&&c.al?{allergens:c.al}:{}),...(c&&c.tr?{tr:c.tr}:{})});}});FIN=null;}}catch(e){console.error(e);}
 return r;};}
/* ================= chiusura cassa: foto scontrino Z e sospetto ================= */
const num=v=>{if(v==null||v==='')return null;if(typeof v==='number')return isFinite(v)?v:null;let s=String(v).replace(/[^\d,.\-]/g,'');if(!s)return null;if(s.includes(',')&&s.includes('.'))s=s.replace(/\./g,'').replace(',','.');else if(s.includes(','))s=s.replace(',','.');const n=parseFloat(s);return isFinite(n)?n:null;};
const PROMPT='Questa è la foto di uno scontrino di chiusura giornaliera (chiusura Z del registratore di cassa telematico) oppure di un report giornaliero SumUp (terminale carte). Rispondi SOLO con un oggetto JSON: {"tipo":"registratore" oppure "sumup" oppure "altro","data":"AAAA-MM-GG" oppure null,"contanti":numero oppure null,"carte":numero oppure null,"totale":numero oppure null}. Regole: per il registratore "contanti" è il totale pagato in contanti e "carte" il totale dei pagamenti elettronici/carte/bancomat; per il report SumUp "carte" è il totale incassato con carta e "contanti" i pagamenti in contanti registrati su SumUp, se presenti. Numeri con il punto decimale (es. 123.50), senza simbolo euro. Se un valore non si legge con certezza metti null: non inventare.';
function jp(t){const a=String(t||'');const i=a.indexOf('{'),j=a.lastIndexOf('}');if(i<0||j<i)throw new Error('risposta non leggibile');return JSON.parse(a.slice(i,j+1));}
window.v74ReadZ=async inp=>{const fs=[...(inp.files||[])];inp.value='';if(!fs.length)return;const box=$('v74zst');if(!getGeminiKey()){if(box)box.textContent='⚠️ Manca la chiave Gemini (Opzioni).';return;}
 const t0=Date.now();const tm=setInterval(()=>{if(box)box.textContent='⏳ Leggo la foto… '+Math.round((Date.now()-t0)/1000)+' s';},500);const got=[],bad=[];
 try{for(const f of fs){try{const b64=await shrinkImage(f);const r=jp(await callGemini([{inline_data:{mime_type:'image/jpeg',data:b64}},{text:PROMPT}],true));got.push(r);}catch(e){bad.push(e.message||String(e));}}}finally{clearInterval(tm);}
 const set=(id,v)=>{const e=$(id);if(e&&v!=null)e.value=String(Math.round(v*100)/100);};const said=[];let dateWarn='';const[a]=(typeof contiRange==='function'?contiRange():[null]);
 got.forEach(r=>{const c=num(r.contanti),k=num(r.carte);if(r.data&&a&&r.data!==a)dateWarn=' ⚠️ La data sullo scontrino è '+r.data.split('-').reverse().join('/')+', ma stai chiudendo il '+a.split('-').reverse().join('/')+'.';
  if(r.tipo==='registratore'){set('ccRtCash',c);set('ccRtEl',k);if(c!=null)said.push('registratore contanti € '+formatPrice(c));if(k!=null)said.push('registratore elettronico € '+formatPrice(k));}
  else if(r.tipo==='sumup'){set('ccPos',k);set('ccSuCash',c);if(k!=null)said.push('SumUp carte € '+formatPrice(k));if(c!=null)said.push('SumUp contanti € '+formatPrice(c));}
  else bad.push('non riconosco il tipo di scontrino');});
 if(box)box.innerHTML=(said.length?'✅ Letto dalla foto: <b>'+esc(said.join(' · '))+'</b>.'+esc(dateWarn):'')+(bad.length?'<br>⚠️ '+esc(bad.join(' · '))+'. Riprova con una foto più dritta e luminosa.':'');
 if(said.length&&!dateWarn){setTimeout(()=>{try{saveCashClose();}catch(e){}},500);}};
{const _r=renderCashClose;renderCashClose=function(){const r=_r.apply(this,arguments);try{const el=$('cashClose');if(el&&el.querySelector('#ccRtCash')&&!el.querySelector('.v74z')){const lab=$('ccRtCash').previousElementSibling;const d=document.createElement('div');d.className='v74z';d.innerHTML='<b>📸 Leggi i totali dalla foto</b><br>Fotografa lo scontrino di chiusura Z del registratore e/o il report SumUp: Gemini compila i campi e verifica da solo.<label class="v74b" style="display:block;text-align:center;margin:8px 0 0;cursor:pointer;">📷 Scegli o scatta la foto<input type="file" accept="image/*" multiple style="display:none" onchange="v74ReadZ(this)"></label><div class="st" id="v74zst"></div>';if(lab)lab.before(d);}}catch(e){}return r;};}
/* sospetto: quale conto non torna */
function subset(arr,target,maxn){const R=[];const n=arr.length;if(n>16)arr=arr.slice(0,16);const go=(i,cur,sum)=>{if(R.length>=3)return;if(Math.abs(sum-target)<0.01&&cur.length>=2){R.push(cur.slice());return;}if(cur.length>=maxn||i>=arr.length)return;for(let j=i;j<arr.length;j++){cur.push(arr[j]);go(j+1,cur,sum+arr[j].a);cur.pop();}};go(0,[],0);return R;}
function parts(L,kind){return L.map(e=>{const p=payOf(e);return{e,a:Math.round((kind==='cash'?p.cash:p.card)*100)/100};}).filter(x=>x.a>0.004);}
const lbl=x=>esc(x.e.tableName||'Conto')+' ore '+esc(x.e.time||'')+' · € '+formatPrice(x.a);
function diag(sv,L){const d=sv.diff||{};const out=[];const cash=d.cash||0,el=d.el||0,pos=d.pos==null?0:d.pos;const Pc=parts(L,'cash'),Pk=parts(L,'card');
 const near=(P,t)=>{const ex=P.filter(x=>Math.abs(x.a-t)<0.01);if(ex.length)return {t:'one',l:ex};const s=subset(P,t,3);return s.length?{t:'sum',l:s}:null;};
 const show=(r)=>r.t==='one'?r.l.map(lbl).join(' <i>oppure</i> '):r.l.map(g=>g.map(lbl).join(' + ')).join(' <i>oppure</i> ');
 if(Math.abs(cash)>0.009&&Math.abs(el)>0.009&&Math.abs(cash+el)<0.01){const t=Math.abs(cash);const P=cash>0?Pk:Pc;const r=near(P,t);out.push(`Sul registratore i contanti sono ${cash>0?'+':'−'}€ ${formatPrice(t)} e l’elettronico ${el>0?'+':'−'}€ ${formatPrice(t)}: è un <b>pagamento segnato con la forma sbagliata</b>.${r?'<br>Sospetto: '+show(r)+' (era '+(cash>0?'carta, ma l’hai pagato in contanti':'contanti, ma è stato pagato con carta')+'?). Correggi con “✏️ Cambia pagamento”.':''}`);}
 else{
  if(Math.abs(cash)>0.009){const t=Math.abs(cash);if(cash<0){const r=near(Pc,t);out.push(`Contanti: sul registratore mancano <b>€ ${formatPrice(t)}</b>.${r?'<br>Sospetto scontrino non battuto: '+show(r):'<br>Nessun conto in contanti di questo importo: può essere un conto in parte contanti, o un incasso senza scontrino.'}`);}else{out.push(`Contanti: sul registratore ci sono <b>€ ${formatPrice(t)} in più</b> dell’app: probabile conto non chiuso nell’app o battuto in contanti anziché carta.`);}}
  if(Math.abs(el)>0.009){const t=Math.abs(el);if(el<0){const r=near(Pk,t);out.push(`Elettronico: sul registratore mancano <b>€ ${formatPrice(t)}</b>.${r?'<br>Sospetto scontrino non battuto: '+show(r):''}`);}else out.push(`Elettronico: sul registratore ci sono <b>€ ${formatPrice(t)} in più</b> dell’app: probabile conto carta non chiuso nell’app.`);}
  if(Math.abs(pos)>0.009){const t=Math.abs(pos);if(pos<0){const r=near(Pk,t);out.push(`SumUp carte: sul terminale mancano <b>€ ${formatPrice(t)}</b>.${r?'<br>Sospetto: '+show(r)+' (segnato carta ma non passato sul terminale?).':''}`);}else out.push(`SumUp carte: il terminale ha <b>€ ${formatPrice(t)} in più</b>: un pagamento passato su SumUp non è registrato come carta nell’app.`);}
 }
 if(!out.length)return '';
 return `<div class="v74k"><b>🔎 Sospetti</b><br>${out.join('<hr style="border:0;border-top:1px dashed #D97706;margin:6px 0;">')}<button class="v74b" style="margin:8px 0 0;" onclick="v74Ai()">🤖 Chiedi a Gemini</button><div id="v74ai" style="margin-top:6px;white-space:pre-wrap;"></div></div>`;}
window.v74Ai=async()=>{const out=$('v74ai');if(!out)return;if(!getGeminiKey()){out.textContent='⚠️ Manca la chiave Gemini (Opzioni).';return;}
 const[a]=contiRange(),s=state.ccSvc,L=(state.historyLog||[]).filter(e=>e&&svcDate(e)===a&&(s==='giorno'||svcOf(e)===s)),sv=(state.staffCfg.closures||{})[ccKey(a,s)]||{};
 const lines=L.map(e=>{const p=payOf(e);return `${e.tableName||'Conto'} ore ${e.time||'?'} totale ${formatPrice(e.total)} pagamento ${p.m} (contanti ${formatPrice(p.cash)}, carta ${formatPrice(p.card)})${e.pay&&e.pay.via?' via '+e.pay.via:''}`;}).join('\n');
 const q=`Sei l'assistente di cassa di una trattoria. La chiusura cassa del ${a} non torna. Differenze (registratore/POS meno app, in euro): contanti ${(sv.diff||{}).cash||0}, elettronico ${(sv.diff||{}).el||0}, POS carte ${(sv.diff||{}).pos==null?'non inserito':sv.diff.pos}, SumUp contanti ${(sv.diff||{}).su==null?'non inserito':sv.diff.su}. Conti chiusi nell'app:\n${lines}\nIn italiano semplice, massimo 4 righe: indica il conto più sospetto (solo tra quelli elencati, non inventarne) e cosa controllare. Se non si può capire, dillo.`;
 const t0=Date.now();const tm=setInterval(()=>{out.textContent='⏳ Gemini sta guardando i conti… '+Math.round((Date.now()-t0)/1000)+' s';},500);
 try{const r=await callGemini([{text:q}]);out.textContent='🤖 '+String(r||'').trim();}catch(e){out.textContent='⚠️ Gemini non risponde: '+(e.message||e);}finally{clearInterval(tm);}};
{const _r=ccResultHtml;ccResultHtml=function(sv,L){const h=_r.apply(this,arguments);try{return sv.ok?h:h+diag(sv,L);}catch(e){return h;}};}
})();

}catch(e){console.error("chef-extra v2.9.74",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);const pad=n=>String(n).padStart(2,'0');
const tst=m=>{try{__toast(m,2800,1);}catch(e){try{alert(m);}catch(x){}}};
const isoD=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const dmy=s=>s?String(s).split('-').reverse().join('/'):'';
const owner=()=>/^christian$/i.test((state.waiterName||'').trim());
const FULLN=n=>{const t=String(n||'').trim();return /^alice$/i.test(t)?'Alice Di Mascio':/^christian$/i.test(t)?'Christian Carafa':t;};
const st=document.createElement('style');
st.textContent=`.o75b{display:block;width:100%;margin:0 0 8px;padding:14px;border-radius:14px;font-weight:900;font-size:1rem;border:2px solid #A3E635;cursor:pointer}
.o75g{background:linear-gradient(135deg,#F59E0B,#FB923C);color:#fff;box-shadow:0 4px 0 #B45309}.o75r{background:#FEE2E2;color:#991B1B;border-color:#F87171}.o75c{background:#334155;color:#fff;border-color:#334155}
.o75off{color:#B45309;font-weight:900}
.f75{display:none;margin:8px 0;padding:10px 12px;border-radius:14px;background:#FEF3C7;border:2px solid #F59E0B;color:#451A03;font-size:.86rem;font-weight:700}.f75 b{color:#92400E}.f75 button{margin-top:6px;border:0;border-radius:10px;padding:8px 12px;font-weight:900;background:#F59E0B;color:#422006}
.t75,.l75{background:#EDE9FE;border:2px solid #8B5CF6;border-radius:14px;padding:12px;margin-top:12px;color:#2E1065}.t75 h3,.l75 h3{margin-bottom:4px;color:#4C1D95}
.t75 .r{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 0;border-bottom:1px dashed #A78BFA;font-size:.86rem}
.t75 textarea,.l75 input{width:100%;border:2px solid #A3E635;border-radius:10px;padding:8px;font-family:inherit;font-size:.9rem;background:#F8FAFC;color:#1F2937}
.t75 .b{border:0;border-radius:10px;padding:9px 12px;font-weight:900;background:#7C3AED;color:#fff;margin:6px 6px 0 0}.t75 .b.g{background:#16A34A}.t75 .b.d{background:#0891B2}
.l75 .lr{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 0;border-bottom:1px dashed #A78BFA;font-size:.85rem}.l75 .lr.x{background:#FEE2E2;border-radius:8px;padding:8px}.l75 .lr.w{background:#FEF3C7;border-radius:8px;padding:8px}
.l75 .b{border:0;border-radius:10px;padding:9px 12px;font-weight:900;background:#7C3AED;color:#fff}.l75 .b.s{background:#16A34A;padding:6px 10px}
.l75 label{display:block;font-weight:800;font-size:.78rem;margin:6px 0 2px}`;
document.head.appendChild(st);
/* ================= 1) OFFERTO invece di eliminato (caffè e coperto) ================= */
const isCaffe=i=>i&&/^caff/i.test(i.name||'')&&!/\(offerto\)/i.test(i.name||'');
const isCopI=i=>i&&(i.cat==='1 Coperto'||/coperto/i.test(i.name||''));
function choose(lid){const t=state.tables[state.activeTableId],it=t&&(t.items||[]).find(i=>i.lineId===lid);if(!it)return;let ov=$('o75Ov');if(!ov){ov=document.createElement('div');ov.id='o75Ov';ov.className='modal-overlay';document.body.appendChild(ov);}
 ov.innerHTML=`<div class="receipt-box" style="text-align:center;"><h3 style="color:var(--logo-coral);margin-bottom:6px;">Togli 1 ${esc(it.name)}</h3><div class="fc-sub" style="margin-bottom:10px;">Cosa è successo?</div><button class="o75b o75g" onclick="v75Do(${lid},'off')">🎁 Offerto<br><small style="font-weight:700">non si paga e resta scritto sullo scontrino</small></button><button class="o75b o75r" onclick="v75Do(${lid},'del')">✖ Era un errore<br><small style="font-weight:700">lo tolgo del tutto</small></button><button class="o75b o75c" onclick="document.getElementById('o75Ov').classList.remove('active')">Annulla</button></div>`;ov.classList.add('active');}
window.v75Do=(lid,how)=>{const ov=$('o75Ov');if(ov)ov.classList.remove('active');const t=state.tables[state.activeTableId];if(!t)return;const idx=(t.items||[]).findIndex(i=>i.lineId===lid);if(idx<0)return;const it=t.items[idx],ws=isItemSent(t,it);
 if(how==='off'){const pr=Number(it.price)||0;
  if(isCopI(it)){t.copOff=(Number(t.copOff)||0)+1;t.copOffVal=Math.round(((Number(t.copOffVal)||0)+pr)*100)/100;(t.copOffLog=t.copOffLog||[]).push({ts:Date.now(),by:state.waiterName||'Staff',n:1});}
  else{const nm=it.name+' (offerto)';const ex=t.items.find(x=>x.offered&&x.name===nm&&x.mandata===it.mandata);if(ex)ex.qty+=1;else t.items.push({lineId:Date.now()+Math.random(),menuId:it.menuId,cat:it.cat,name:nm,price:0,origPrice:pr,offered:true,qty:1,mandata:it.mandata,waiter:state.waiterName||'Staff',note:'',sent:it.sent});}}
 it.qty-=1;if(it.qty<=0)t.items.splice(t.items.indexOf(it),1);
 if(ws||how==='off')saveState(false,{tables:[state.activeTableId]});else saveLocalOnly();renderOrderScreen();if(how==='off')tst('🎁 '+it.name+' segnato come offerto');};
{const _c=changeItemQty;changeItemQty=function(lid,d){try{const t=state.tables[state.activeTableId],it=t&&(t.items||[]).find(i=>i.lineId===lid);if(d<0&&it&&!it.offered&&(isCaffe(it)||isCopI(it))&&(Number(it.price)||0)>0){choose(lid);return;}}catch(e){}return _c.apply(this,arguments);};}
/* nel carrello: "OFFERTO" al posto di "incluso" */
{const _o=renderOrderScreen;renderOrderScreen=function(){const r=_o.apply(this,arguments);try{document.querySelectorAll('#cartList .cart-row, .cart-row').forEach(row=>{if(/\(offerto\)/i.test(row.textContent||'')){const b=[...row.querySelectorAll('.cart-price b')].find(x=>/incluso/i.test(x.textContent));if(b){b.textContent='🎁 OFFERTO';b.className='o75off';}}});}catch(e){}return r;};}
/* il coperto offerto compare come riga nel pre-conto e nel riepilogo cliente */
function withCop(t,fn){let add=null;try{const n=Number(t&&t.copOff)||0;if(n>0&&Array.isArray(t.items)){add={lineId:'o75',cat:'1 Coperto',name:'Pane e Coperto (offerto)',price:0,qty:n,offered:true};t.items.push(add);}}catch(e){}try{return fn();}finally{if(add)t.items=t.items.filter(i=>i!==add);}}
{const _m=makeReceipt;makeReceipt=function(t){return withCop(t,()=>_m.call(this,t));};}
{const _p=showPreBill;showPreBill=function(){const t=state.tables[state.activeTableId];return withCop(t,()=>_p.apply(this,arguments));};}
/* ================= 2) piatti che stanno per finire ================= */
const OFF=40;
function sold(e,nm){return (e.items||[]).filter(i=>i&&i.name===nm&&!i.offered).reduce((s,i)=>s+(Number(i.qty)||0),0);}
function forecast(){const out=[];try{const now=new Date(),nm=now.getHours()*60+now.getMinutes(),cena=nm>=16*60;const end=cena?23*60+30:15*60+30;if((!cena&&nm<10*60)||nm>end-10)return out;
 const lo=cena?16*60:10*60,today0=isoD(now),days={};(state.historyLog||[]).forEach(e=>{if(!e||!e.ts)return;const d=new Date(e.ts-OFF*60000),k=isoD(d);if(k===today0||(now-d)>40*86400000)return;const m=d.getHours()*60+d.getMinutes();if(cena?m<lo:(m<lo||m>=16*60))return;(days[k]=days[k]||[]).push({m,e});});
 const D=Object.keys(days);if(D.length<3)return out;
 (state.menu||[]).forEach(m=>{if(!m||m.soldOut||['1 Coperto','2 Bevande'].includes(m.cat))return;const l=typeof stockLeft==='function'?stockLeft(m):null;if(l===null||l<=0)return;
  const bins={};let rem=0,days0=0;D.forEach(k=>{let r=0,any=false;days[k].forEach(({m:mm,e})=>{const q=sold(e,m.name);if(q>0){any=true;if(mm>=nm){r+=q;const b=Math.floor(mm/15)*15;bins[b]=(bins[b]||0)+q;}}});if(any)days0++;rem+=r;});
  if(days0<2)return;const avg=rem/D.length;if(avg<=0||l>avg*1.05+0.01)return;
  let cum=0,eta=null;for(let b=Math.floor(nm/15)*15;b<=end;b+=15){cum+=(bins[b]||0)/D.length;if(cum>=l){eta=b+10;break;}}
  out.push({m,l,avg:Math.round(avg),eta:eta==null?null:eta});});
 out.sort((a,b)=>(a.eta||9999)-(b.eta||9999));}catch(e){console.error(e);}return out;}
const hm=x=>pad(Math.floor(x/60))+':'+pad(x%60);
function drawF(){const W=forecast();[['viewTables','v75ft'],['viewKds','v75fk']].forEach(([v,id])=>{const host=$(v);if(!host)return;let el=$(id);if(!el){el=document.createElement('div');el.id=id;el.className='f75';const b=host.querySelector('.kds-Banner,.screen-title');if(b)b.after(el);else host.prepend(el);}
  if(!W.length){el.style.display='none';return;}el.style.display='block';el.innerHTML='⏳ <b>Stanno per finire</b><br>'+W.slice(0,3).map(w=>`• <b>${esc(String(w.m.name).slice(0,42))}</b>: ne restano <b>${w.l}</b>, di solito da qui a fine servizio se ne vendono <b>${w.avg}</b>${w.eta?' → finirà verso le <b>'+hm(w.eta)+'</b>':''}`).join('<br>')+`<br><button onclick="try{v28StockOpen()}catch(e){switchMainView('kds')}">📦 Apri le scorte</button>`;});}
setInterval(drawF,30000);setTimeout(drawF,2500);window.v75Fc=forecast;window.v75Draw=drawF;
/* ================= 3) grazie ai clienti del Club ================= */
const norm=p=>{let d=String(p||'').replace(/\D/g,'');if(d.startsWith('00'))d=d.slice(2);if(d.length===10&&d[0]==='3')d='39'+d;if((d.length===9||d.length===10)&&d[0]==='0')d='39'+d;return d.length>=11?d:'';};
const first=n=>{const w=String(n||'').trim().split(/\s+/)[0]||'';return w?w[0].toUpperCase()+w.slice(1).toLowerCase():'';};
const TK='alicetta_thx';const TS=()=>{try{return JSON.parse(localStorage.getItem(TK)||'{}')||{};}catch(e){return{};}};
const DEF='Ciao {nome}! 💛 Grazie di essere stato/a da noi da Alicetta: è sempre un piacere averti a tavola. Ti aspettiamo presto!\n\nLa Ciurma di Alicetta';
let TX=localStorage.getItem('alicetta_thx_txt')||DEF,CL=null,tBusy=false,tErr='';
async function loadT(){tBusy=true;try{const o=await fbGet('/fidelity/cards')||{};CL=Object.entries(o).map(([id,c])=>({id,...c}));tErr='';}catch(e){tErr=e.message||String(e);CL=CL||[];}tBusy=false;}
const recent=()=>{const lim=Date.now()-30*3600000,stop=(state.staffCfg&&state.staffCfg.waStop)||{};return (CL||[]).filter(c=>c.mkt&&c.last&&c.last>=lim&&norm(c.phone)&&!stop[norm(c.phone)]);};
function waApp(){try{return (JSON.parse(localStorage.getItem('alicetta_bc')||'{}')||{}).app||'w4b';}catch(e){return 'w4b';}}
function waLink(p,text){const app=waApp(),t=encodeURIComponent(text);if(app==='any')return 'https://wa.me/'+p+'?text='+t;const pkg=app==='w4b'?'com.whatsapp.w4b':'com.whatsapp';return `intent://send?phone=${p}&text=${t}#Intent;scheme=whatsapp;package=${pkg};S.browser_fallback_url=${encodeURIComponent('https://wa.me/'+p+'?text='+t)};end`;}
const msg=c=>String(TX).replace(/\{nome\}/g,first(c.name)||'').replace(/\s+([!,.])/g,'$1').trim();
function drawT(){const host=$('cuClub');if(!host)return;let el=$('cuThx');if(!el){el=document.createElement('div');el.id='cuThx';el.className='t75';host.appendChild(el);}
 if(!CL&&!tBusy){loadT().then(drawT);}
 const L=recent(),S=TS();const day=isoD(new Date());const done=S[day]||{};
 el.innerHTML=`<h3>💌 Grazie ai clienti di ieri sera</h3><div class="fc-sub" style="color:#4C1D95">Solo soci del Club che hanno <b>accettato i messaggi</b> e sono stati da te nelle ultime 30 ore. Un messaggio per volta, da WhatsApp.</div>
 <textarea id="thxTxt" rows="4" oninput="v75ThxTxt(this.value)" style="margin-top:8px">${esc(TX)}</textarea>
 <button class="b d" onclick="v75ThxAi()">🤖 Scrivilo con Gemini</button><button class="b" onclick="v75ThxReset()">↩️ Testo base</button><div id="thxSt" class="fc-sub" style="margin-top:4px;color:#4C1D95"></div>
 ${tErr?`<div class="fc-sub" style="color:#B91C1C">⚠️ ${esc(tErr)}</div>`:''}
 <div style="margin-top:6px">${CL?(L.length?L.map(c=>{const p=norm(c.phone);return `<div class="r"><div><b>${esc(c.name)}</b><div class="fc-sub">visite ${c.visits||1}</div></div>${done[p]?'<span style="font-weight:900;color:#166534">✓ inviato</span>':`<button class="b g" onclick="v75ThxSend('${p}','${c.id}')">💬 Invia</button>`}</div>`;}).join(''):'<div class="fc-sub" style="margin:6px 0">Nessun cliente del Club da ringraziare adesso (serve che abbiano inquadrato il QR dello scontrino e dato il consenso).</div>'):'<div class="fc-sub">⏳ Carico il Club…</div>'}</div>`;}
window.v75ThxTxt=v=>{TX=v;localStorage.setItem('alicetta_thx_txt',v);};
window.v75ThxReset=()=>{TX=DEF;localStorage.setItem('alicetta_thx_txt',TX);drawT();};
window.v75ThxSend=(p,id)=>{const c=(CL||[]).find(x=>x.id===id);if(!c)return;const S=TS(),day=isoD(new Date());S[day]=S[day]||{};S[day][p]=1;Object.keys(S).sort().slice(0,-5).forEach(k=>delete S[k]);localStorage.setItem(TK,JSON.stringify(S));window.open(waLink(p,msg(c)),'_blank');setTimeout(drawT,600);};
window.v75ThxAi=async()=>{const s=$('thxSt');if(!getGeminiKey()){if(s)s.textContent='⚠️ Manca la chiave Gemini (Opzioni).';return;}
 let top='';try{const m={},d=isoD(new Date(Date.now()-6*3600000));(state.historyLog||[]).filter(e=>e&&svcDate(e)===d||(e&&Date.now()-e.ts<30*3600000)).forEach(e=>(e.items||[]).forEach(i=>{if(i&&!/coperto|acqua|caff|vino|birra/i.test(i.name||''))m[i.name]=(m[i.name]||0)+(Number(i.qty)||0);}));top=Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]).join('; ');}catch(e){}
 const t0=Date.now(),tm=setInterval(()=>{if(s)s.textContent='⏳ Gemini scrive… '+Math.round((Date.now()-t0)/1000)+' s';},500);
 try{const r=await callGemini([{text:'Scrivi un breve messaggio WhatsApp (massimo 3 frasi, tono caldo e familiare, italiano, al massimo 2 emoji) per ringraziare un cliente di una trattoria di pesce a Fossacesia (Alicetta Trattoria) che è stato a cena da noi. Inizia con "Ciao {nome}!" (lascia proprio il segnaposto {nome}). '+(top?'Puoi citare, se ti sembra naturale, uno di questi piatti serviti: '+top+'. ':'')+'Non promettere sconti né regali. Chiudi con la firma "La Ciurma di Alicetta" su una riga a parte. Rispondi SOLO con il testo del messaggio.'}]);
  const x=String(r||'').trim().replace(/^["“]|["”]$/g,'');if(x.length<10)throw new Error('risposta vuota');TX=x;localStorage.setItem('alicetta_thx_txt',x);drawT();}catch(e){if(s)s.textContent='⚠️ Gemini non risponde: '+(e.message||e);}finally{clearInterval(tm);}};
setInterval(()=>{try{const h=$('cuClub');if(h&&h.offsetParent&&!$('cuThx'))drawT();}catch(e){}},1200);
/* ================= 4) lotti e scadenze da foto etichetta ================= */
const LK='alicetta_lotti';let LT=null;
const lread=()=>{if(LT)return LT;try{LT=JSON.parse(localStorage.getItem(LK)||'{}')||{};}catch(e){LT={};}return LT;};
async function lsave(id,v){const T=lread();if(v)T[id]=v;else delete T[id];localStorage.setItem(LK,JSON.stringify(T));try{await fbSend('/costi/haccp/lotti/'+id,v?'PUT':'DELETE',v||undefined);}catch(e){}}
let pulledL=false;async function lpull(){if(pulledL)return;pulledL=true;try{const r=await fbGet('/costi/haccp/lotti');if(r&&typeof r==='object'){LT=Object.assign({},r,lread());localStorage.setItem(LK,JSON.stringify(LT));}}catch(e){}}
const dleft=s=>{if(!s)return null;const a=new Date(s+'T12:00'),b=new Date(isoD(new Date())+'T12:00');return Math.round((a-b)/86400000);};
function lotsList(){return Object.entries(lread()).map(([id,x])=>({id,...x})).filter(x=>!x.done).sort((a,b)=>String(a.s||'9999').localeCompare(String(b.s||'9999')));}
function drawL(){const mounts=[...document.querySelectorAll('.hxHost')];mounts.forEach(h=>{let el=h.querySelector('.l75');if(!el){el=document.createElement('div');el.className='l75';h.appendChild(el);}
 const L=lotsList(),n=L.filter(x=>{const d=dleft(x.s);return d!=null&&d<=2;}).length;
 el.innerHTML=`<h3>🏷️ Lotti e scadenze ${n?`<span style="background:#DC2626;color:#fff;border-radius:10px;padding:1px 8px;font-size:.8rem;">${n}</span>`:''}</h3><div class="fc-sub" style="color:#4C1D95;margin-bottom:8px;">Fotografa l’etichetta: Gemini legge prodotto, lotto e scadenza. Ti avviso quando un prodotto sta per scadere.</div>
 <label class="b" style="display:block;text-align:center;cursor:pointer;padding:12px;margin-bottom:8px;">📸 Foto etichetta<input type="file" accept="image/*" multiple style="display:none" onchange="v75Lab(this)"></label><div id="l75st" class="fc-sub" style="color:#4C1D95"></div>
 ${L.slice(0,12).map(x=>{const d=dleft(x.s);const cls=d!=null&&d<0?'x':d!=null&&d<=2?'w':'';return `<div class="lr ${cls}"><div><b>${esc(x.p)}</b><div class="fc-sub">${x.l?'lotto '+esc(x.l)+' · ':''}${x.s?(d<0?'⛔ SCADUTO il ':d===0?'⚠️ scade OGGI · ':d<=2?'⚠️ scade tra '+d+' g · ':'scade il ')+dmy(x.s):'senza scadenza'}</div></div><button class="b s" onclick="v75LotDone('${x.id}')">✓ Finito</button></div>`;}).join('')||'<div class="fc-sub">Nessun lotto registrato.</div>'}`;});}
window.v75LotDone=id=>{const x=lread()[id];if(!x)return;lsave(id,{...x,done:Date.now()});drawL();};
const LP='Questa è la foto di una o più etichette di prodotti alimentari (confezione, vaschetta, cartellino del fornitore). Rispondi SOLO con un array JSON, un oggetto per prodotto: [{"prodotto":"nome del prodotto","lotto":"codice lotto oppure null","scadenza":"AAAA-MM-GG oppure null","fornitore":"produttore o fornitore oppure null"}]. La scadenza è "da consumarsi entro" o "da consumarsi preferibilmente entro"; se c\'è solo mese e anno usa l\'ultimo giorno del mese. Se non leggi con certezza un valore metti null, non inventare.';
function jarr(t){const a=String(t||'');const i=a.indexOf('['),j=a.lastIndexOf(']');if(i<0||j<i)throw new Error('risposta non leggibile');return JSON.parse(a.slice(i,j+1));}
let PEND=null;
window.v75Lab=async inp=>{const fs=[...(inp.files||[])];inp.value='';if(!fs.length)return;const s=document.querySelector('#l75st');if(!getGeminiKey()){if(s)s.textContent='⚠️ Manca la chiave Gemini (Opzioni).';return;}
 const t0=Date.now(),tm=setInterval(()=>{document.querySelectorAll('#l75st').forEach(e=>e.textContent='⏳ Leggo l’etichetta… '+Math.round((Date.now()-t0)/1000)+' s');},500);const got=[],bad=[];
 try{for(const f of fs){try{const b64=await shrinkImage(f);const a=jarr(await callGemini([{inline_data:{mime_type:'image/jpeg',data:b64}},{text:LP}],true));a.forEach(x=>{if(x&&x.prodotto)got.push({p:String(x.prodotto).trim(),l:x.lotto?String(x.lotto).trim():'',s:/^\d{4}-\d{2}-\d{2}$/.test(x.scadenza||'')?x.scadenza:'',f:x.fornitore?String(x.fornitore).trim():''});});}catch(e){bad.push(e.message||String(e));}}}finally{clearInterval(tm);}
 document.querySelectorAll('#l75st').forEach(e=>e.textContent=got.length?'':'⚠️ '+(bad[0]||'Non ho letto nulla')+'. Riprova con una foto più vicina e luminosa.');if(!got.length)return;PEND=got;review();};
function review(){let ov=$('l75Ov');if(!ov){ov=document.createElement('div');ov.id='l75Ov';ov.className='modal-overlay';document.body.appendChild(ov);}
 ov.innerHTML=`<div class="receipt-box l75" style="max-width:520px;max-height:90vh;overflow:auto;background:#EDE9FE;"><h3>🏷️ Controlla cosa ho letto</h3><div class="fc-sub" style="color:#4C1D95">Correggi se serve, poi salva.</div>${PEND.map((x,i)=>`<div style="border-bottom:1px dashed #A78BFA;padding:6px 0"><label>Prodotto</label><input id="l75p${i}" value="${esc(x.p)}"><label>Lotto</label><input id="l75l${i}" value="${esc(x.l)}"><label>Scadenza</label><input id="l75s${i}" type="date" value="${esc(x.s)}"></div>`).join('')}
 <label style="display:flex;gap:8px;align-items:center;margin-top:8px;"><input type="checkbox" id="l75sc" checked style="width:20px;height:20px;"> Aggiungi anche alla scheda accettazione merci (SC1)</label>
 <div class="modal-actions" style="margin-top:10px;"><button class="btn-modal" style="background:#334155;color:#fff;" onclick="document.getElementById('l75Ov').classList.remove('active')">Annulla</button><button class="btn-modal" style="background:#16A34A;color:#fff;" onclick="v75LabSave()">💾 Salva</button></div></div>`;ov.classList.add('active');}
window.v75LabSave=async()=>{const P=PEND||[];const rows=[];P.forEach((x,i)=>{const p=($('l75p'+i)||{}).value||'',l=($('l75l'+i)||{}).value||'',s=($('l75s'+i)||{}).value||'';if(p.trim())rows.push({p:p.trim(),l:l.trim(),s,f:x.f});});
 const sc=$('l75sc')&&$('l75sc').checked;$('l75Ov').classList.remove('active');if(!rows.length)return;rows.forEach((r,i)=>lsave('l'+Date.now()+i,{p:r.p,l:r.l,s:r.s,f:r.f,d:isoD(new Date()),by:FULLN(state.waiterName),ts:Date.now()}));drawL();tst('✅ '+rows.length+(rows.length===1?' lotto registrato':' lotti registrati'));
 if(sc&&typeof v2931Edit==='function'){const forn=[...new Set(rows.map(r=>r.f).filter(Boolean))].join(', ');setTimeout(()=>v2931Edit('sc1',null,{d:isoD(new Date()),num:'',forn,prod:rows.map(r=>r.p+(r.l?' (lotto '+r.l+(r.s?', scad. '+dmy(r.s):'')+')':(r.s?' (scad. '+dmy(r.s)+')':''))).join(', '),c:true,firma:FULLN(state.waiterName)||'Alice Di Mascio'}),300);}};
setInterval(()=>{try{if(document.querySelector('.hxHost')&&!document.querySelector('.hxHost .l75')){lpull().then(drawL);drawL();}}catch(e){}},1500);
/* avviso scadenze (una volta al giorno, a chi apre l'app) */
function warnScad(){try{const k='alicetta_scad_d',d=isoD(new Date());if(localStorage.getItem(k)===d)return;const L=lotsList().filter(x=>{const n=dleft(x.s);return n!=null&&n<=1;});if(!L.length)return;localStorage.setItem(k,d);tst('⚠️ In scadenza: '+L.slice(0,3).map(x=>x.p+(dleft(x.s)<0?' (scaduto)':dleft(x.s)===0?' (oggi)':' (domani)')).join(', ')+'. Guarda HACCP › Lotti.');}catch(e){}}
setTimeout(()=>lpull().then(warnScad),6000);
window.v75Lots=lotsList;
})();

}catch(e){console.error("chef-extra v2.9.75",e);}
try{
(function(){
const $=id=>document.getElementById(id);const esc=s=>escH(s);const pad=n=>String(n).padStart(2,'0');
const tst=m=>{try{__toast(m,3200,1);}catch(e){try{alert(m);}catch(x){}}};
const nk=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
const code=()=>(localStorage.getItem('alicetta_ntfy')||'').trim();
const ME=()=>nk(state.waiterName);
const WAIT=['christian','alice','serena'],ALL=[...WAIT,'kdscucina'];
/* ---------- 1) niente più suoni a chi ha mandato l'avviso; un solo argomento per dispositivo ---------- */
function dest(t){t=nk(t);const L=t==='tutti'?ALL:t==='sala'?WAIT:[t];const me=ME();return L.filter(x=>x&&x!==me);}
async function post(x,o){try{await fetch('https://ntfy.sh',{method:'POST',body:JSON.stringify(Object.assign({topic:code()+'-'+x},o))});return true;}catch(e){return false;}}
ntfyPost=async function(target,title,msg,prio){if(!code()||!navigator.onLine)return;await Promise.all(dest(target).map(x=>post(x,{title,message:msg||' ',priority:prio||4,tags:['bell']})));};
sendPush=async function(target,msg,from){if(!code())return;await Promise.all(dest(target).map(x=>post(x,{title:'🔔 Chiamata da '+(from||'Sala'),message:msg,priority:5,tags:['bell','rotating_light']})));};
ntfyTopicsFor=function(wn){return [ntfyTopic(wn)];};
try{if(!localStorage.getItem('alicetta_ntfy_v76')){localStorage.setItem('alicetta_ntfy_v76','1');localStorage.removeItem('alicetta_ntfy_ok2');setTimeout(()=>{try{checkNtfyNag();}catch(e){}},2500);}}catch(e){}
/* ---------- 2) KDS: prima le comande dei tavoli ---------- */
const st=document.createElement('style');
st.textContent=`body.kdsd #viewKds.active{display:flex;flex-direction:column}
body.kdsd #viewKds .kds-Banner{order:1;padding:6px 8px;margin:0 0 6px}
body.kdsd #viewKds .kds-Banner>*:first-child:not(button){font-size:.7rem;margin:0 0 3px;opacity:.8}
body.kdsd #viewKds .kds-Banner button{padding:6px 10px;font-size:.78rem;margin:2px}
body.kdsd #viewKds .kds-Banner .btn-stock-big{font-size:.95rem;padding:8px 14px;box-shadow:0 3px 0 #062329}
body.kdsd #kLoadK{order:2;margin:0 0 6px}
body.kdsd #stockPanel{order:2}
body.kdsd #kdsContainer{order:3}
body.kdsd #resBoardKds{order:5}
body.kdsd #ntBox_kds{order:6;margin:12px 0 4px;padding:6px 8px}
body.kdsd #ntBox_kds .nt-mic{padding:8px;font-size:.82rem}body.kdsd #ntBox_kds .nt-kb{padding:0 10px}
body.kdsd #bfKds{order:7}body.kdsd #bfKds details,body.kdsd #bfKds .hc-card{font-size:.8rem}
body.kdsd #v75fk{order:4;margin:0 0 6px;padding:6px 10px;font-size:.78rem}
body.kdsd #ntfyNag{display:none!important}
body.kdsd .st-banner{top:auto!important;bottom:6px!important;left:auto!important;right:6px!important;transform:none!important;max-width:min(430px,60vw);padding:6px 10px!important;font-size:.78rem!important}
body.kdsd .st-banner button{padding:5px 9px!important;font-size:.75rem!important}`;
document.head.appendChild(st);
setInterval(()=>{try{document.body.classList.toggle('kdsd',typeof isKdsDev==='function'&&isKdsDev());}catch(e){}},700);
/* ---------- 3) controllo e prove delle notifiche (in Opzioni) ---------- */
const NAMES=[['Christian','christian'],['Alice','alice'],['Serena','serena'],['KDS Cucina','kdscucina']];
const dev=()=>{const w=String(state.waiterName||'').trim();return w||'(nessun nome)';};
function card(){const inp=$('ntfyInput');const sec=inp&&inp.closest('.cart-section');if(!sec)return;let el=$('n76');if(!el){el=document.createElement('div');el.id='n76';el.className='cart-section';sec.after(el);}
 if(el.dataset.k===code()+'|'+ME()&&el.dataset.ok)return;el.dataset.k=code()+'|'+ME();el.dataset.ok='1';
 const me=ME(),mine=code()?code()+'-'+me:'';
 el.innerHTML=`<h3 style="margin-bottom:6px;">🔔 Controllo notifiche di questo dispositivo</h3>
 ${code()?`<div style="font-size:.85rem;font-weight:700;">Questo dispositivo è: <b>${esc(dev())}</b><br>Nell’app <b>ntfy</b> deve esserci <u>solo</u> questo argomento:</div><div style="font-family:monospace;font-weight:900;font-size:.95rem;background:#FEF3C7;color:#451A03;border:2px dashed #F59E0B;border-radius:10px;padding:8px;margin:6px 0;word-break:break-all;">${esc(mine)}</div><div style="font-size:.78rem;opacity:.85;margin-bottom:8px;">Tutti gli altri argomenti (…-sala, …-tutti, quelli degli altri) vanno tolti: non servono più e sono il motivo per cui ti suonava anche quando chiamavi tu.</div>
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;"><button class="btn-note" onclick="v76Test()">🔔 Prova su questo (5 s)</button><button class="btn-note" onclick="v76Srv()">🔎 Il server riceve?</button></div>
 <div style="display:flex;gap:6px;margin-top:6px;"><select id="n76to" class="form-control">${NAMES.filter(n=>n[1]!==me).map(n=>`<option value="${n[1]}">${n[0]}</option>`).join('')}</select><button class="btn-note" onclick="v76To()">📲 Manda una prova</button></div>
 <div id="n76st" style="margin-top:8px;font-size:.84rem;font-weight:800;"></div>`:'<div style="font-size:.85rem;">Manca il codice notifiche: inseriscilo qui sopra e premi Salva.</div>'}
 <details style="margin-top:10px;"><summary style="font-weight:900;cursor:pointer;">📋 Se non suona: controlla l’app ntfy sul telefono</summary><div style="font-size:.82rem;line-height:1.5;margin-top:6px;">
 <b>1. Notifiche silenziate (la causa più comune)</b><br>Apri ntfy. In alto a destra, se vedi una <b>campanella barrata</b>, le notifiche sono silenziate per tutti gli argomenti: toccala per riattivarle. Anche accanto a ogni argomento non deve esserci la campanella barrata: apri l’argomento, tocca ⋮ in alto e scegli “Riattiva notifiche”.<br>
 <b>2. Suono e popup di Android</b><br>Impostazioni del telefono › App › ntfy › Notifiche. Nelle categorie “Urgenti” e “Alta priorità” attiva <b>suono</b> e <b>mostra come popup</b>.<br>
 <b>3. Batteria</b><br>Impostazioni › App › ntfy › Batteria › <b>Senza restrizioni</b> (altrimenti Android lo addormenta a schermo spento).<br>
 <b>4. Non disturbare</b><br>Nella categoria “Urgenti” attiva “Ignora Non disturbare”, così suona anche di sera col silenzioso.<br>
 <b>5. Volume</b><br>Alza il volume delle notifiche (non solo quello della suoneria) e togli la modalità silenziosa.<br>
 <b>6. Argomento giusto</b><br>Deve essere scritto <b>esattamente</b> come sopra, tutto minuscolo.</div></details>`;}
setInterval(()=>{try{card();}catch(e){}},1500);
const out=h=>{const e=$('n76st');if(e)e.innerHTML=h;};
window.v76Test=async()=>{if(!code())return;out('⏳ Invio…');const ok=await post(ME(),{title:'🔔 Prova campanello',message:'Se la senti a schermo spento è tutto a posto ✅',priority:5,tags:['bell'],delay:'5s'});out(ok?'✅ Prova inviata. <b>Spegni lo schermo</b>: tra 5 secondi deve suonare. Se non suona, controlla l’elenco qui sotto (punto 1: campanella barrata).':'⚠️ Non riesco a contattare ntfy: serve internet.');};
window.v76To=async()=>{const to=($('n76to')||{}).value;if(!to||!code())return;out('⏳ Invio…');const ok=await post(to,{title:'🔔 Prova da '+dev(),message:'Prova notifica: se la senti è tutto a posto ✅',priority:5,tags:['bell']});out(ok?'✅ Prova inviata a '+esc(to)+'. Chiedi se è suonata.':'⚠️ Non riesco a contattare ntfy: serve internet.');};
window.v76Srv=async()=>{if(!code())return;out('⏳ Controllo…');try{const r=await fetch('https://ntfy.sh/'+code()+'-'+ME()+'/json?poll=1&since=6h');const t=await r.text();const L=t.split('\n').filter(Boolean).map(x=>{try{return JSON.parse(x);}catch(e){return null;}}).filter(x=>x&&x.event==='message');
 if(!L.length){out('ℹ️ Nelle ultime 6 ore al server non è arrivato nulla per <b>'+esc(ME())+'</b>. Normale se nessuno ti ha chiamato: premi “Prova su questo” e ricontrolla.');return;}
 const l=L[L.length-1],d=new Date(l.time*1000);out('✅ Il server ha ricevuto <b>'+L.length+'</b> messaggi in 6 ore. Ultimo alle <b>'+pad(d.getHours())+':'+pad(d.getMinutes())+'</b>: “'+esc(String(l.title||l.message||'').slice(0,60))+'”.<br>Se il telefono non suona, il problema è nelle impostazioni dell’app ntfy (apri l’elenco qui sotto, punto 1).');}catch(e){out('⚠️ Non riesco a leggere dal server: '+esc(e.message||e));}};
})();

}catch(e){console.error("chef-extra v2.9.77",e);}
try{
(function(){
const nk=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
const code=()=>(localStorage.getItem('alicetta_ntfy')||'').trim();
const ME=()=>nk(state.waiterName);
const WAIT=['christian','alice','serena'],ALL=[...WAIT,'kdscucina'];
const NAME={christian:'Christian',alice:'Alice',serena:'Serena',kdscucina:'KDS Cucina'};
const dest=t=>{t=nk(t);const L=t==='tutti'?ALL:t==='sala'?WAIT:[t];return L.filter(x=>x&&x!==ME());};
const APP=location.origin+location.pathname;
async function post(x,o){try{await fetch('https://ntfy.sh',{method:'POST',body:JSON.stringify(Object.assign({topic:code()+'-'+x},o))});return true;}catch(e){return false;}}
/* chiamate: priorità alta (suona una volta), tocca = apre l'app, bottone "Ricevuto" = ferma il suono e avvisa chi ha chiamato */
sendPush=async function(target,msg,from){if(!code())return;const caller=code()+'-'+(ME()||nk(from)||'sala');
 await Promise.all(dest(target).map(x=>post(x,{title:'🔔 Chiamata da '+(from||'Sala'),message:msg,priority:4,tags:['bell'],click:APP,
  actions:[{action:'http',label:'✅ Ricevuto',url:'https://ntfy.sh/'+caller,method:'POST',headers:{Title:(NAME[x]||x)+' ha ricevuto la chiamata',Priority:'3',Tags:'white_check_mark'},body:'«'+String(msg||'').slice(0,90)+'»',clear:true}]})));};
/* se il destinatario conferma dall'app, avviso anche chi ha chiamato */
{const _t=triggerIncomingPagerAlert;triggerIncomingPagerAlert=function(ev){window._v77Call=ev;return _t.apply(this,arguments);};}
{const _a=ackIncomingPage;ackIncomingPage=function(){const ev=window._v77Call;window._v77Call=null;const r=_a.apply(this,arguments);try{if(ev&&ev.from&&code()&&nk(ev.from)!==ME())post(nk(ev.from),{title:'✅ '+(NAME[ME()]||state.waiterName||'Qualcuno')+' ha ricevuto la chiamata',message:'«'+String(ev.msg||'').slice(0,90)+'»',priority:3,tags:['white_check_mark']});}catch(e){}return r;};}
/* prove con la stessa priorità delle chiamate vere */
const _o=window.v76Test;window.v76Test=async function(){const e=document.getElementById('n76st');if(!code())return;if(e)e.textContent='⏳ Invio…';const ok=await post(ME(),{title:'🔔 Prova campanello',message:'Se la senti a schermo spento è tutto a posto ✅',priority:4,tags:['bell'],delay:'5s',click:APP});if(e)e.innerHTML=ok?'✅ Prova inviata. <b>Spegni lo schermo</b>: tra 5 secondi deve suonare. Se non suona, controlla l’elenco qui sotto (punto 1: campanella barrata).':'⚠️ Non riesco a contattare ntfy: serve internet.';};
const _p=window.v76To;window.v76To=async function(){const e=document.getElementById('n76st'),to=(document.getElementById('n76to')||{}).value;if(!to||!code())return;if(e)e.textContent='⏳ Invio…';const caller=code()+'-'+ME();const ok=await post(to,{title:'🔔 Prova da '+(state.waiterName||''),message:'Prova notifica: tocca ✅ Ricevuto per fermare il suono e avvisarmi.',priority:4,tags:['bell'],click:APP,actions:[{action:'http',label:'✅ Ricevuto',url:'https://ntfy.sh/'+caller,method:'POST',headers:{Title:(NAME[to]||to)+' ha ricevuto la prova',Priority:'3',Tags:'white_check_mark'},body:'Prova ricevuta',clear:true}]});if(e)e.innerHTML=ok?'✅ Prova inviata a '+(NAME[to]||to)+'. Quando tocca “Ricevuto” ti arriva la conferma.':'⚠️ Non riesco a contattare ntfy: serve internet.';};
/* consiglio nell'elenco delle impostazioni */
setInterval(()=>{try{const d=document.querySelector('#n76 details div');if(d&&!d.dataset.t7){d.dataset.t7='1';d.insertAdjacentHTML('beforeend','<br><b>7. Il suono non si ferma</b><br>Scorri via la notifica, oppure tocca <b>✅ Ricevuto</b> sulla notifica: si ferma e chi ha chiamato riceve la conferma. Se continua a lungo, in Impostazioni › App › ntfy › Notifiche scegli per “Alta priorità” e “Urgenti” un <b>suono breve di notifica</b> (non una suoneria o una sveglia).');}}catch(e){}},2000);
})();

}catch(e){console.error("chef-extra v2.9.77",e);}
try{(function(){const V='v2.9.77';const f=()=>{document.querySelectorAll('.version-badge').forEach(e=>{if(e.textContent!==V)e.textContent=V;});if(document.title!=='Chef Bull Brigade - '+V)document.title='Chef Bull Brigade - '+V;};f();setInterval(f,5000);})();}catch(e){}
