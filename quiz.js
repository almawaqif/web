// বিষয়ভিত্তিক কুইজ ও শেখার অর্জন (ব্যাজ)। ব্যাজ mem-এ সংরক্ষিত হয়, তাই লগইন করলে ক্লাউডেও সিঙ্ক হয়।
(function(){
const C={
namaz:['নামাজ',[['ফজরের সুন্নত কত রাকাত?',['২','৪','৩'],0],['হানাফী মতে বিতর নামাজ কী?',['ওয়াজিব','নফল','মুস্তাহাব'],0],['জানাজার নামাজে কয়টি তাকবীর?',['৩','৪','৫'],1],['জুমার ফরজ কত রাকাত?',['২','৪','৩'],0],['হানাফী মতে তারাবীহ কত রাকাত?',['৮','২০','১২'],1],['ঈদের নামাজ কত রাকাত?',['২','৩','৪'],0]]],
ozu:['ওযু ও গোসল',[['ওযুর ফরজ কয়টি?',['৩','৪','৫'],1],['হানাফী মতে মাথার কতটুকু মাসেহ ফরজ?',['এক-চতুর্থাংশ','অর্ধেক','পুরোটা'],0],['ফরজ গোসলের ফরজ কয়টি?',['২','৩','৪'],1],['পানি না পেলে কী করতে হয়?',['তায়াম্মুম','ওযু বাদ দেওয়া','গোসল'],0],['কোনটি ওযু ভাঙে?',['ঘুমিয়ে পড়া','কুলি করা','হাত ধোয়া'],0]]],
jnan:['ইসলামিক জ্ঞান',[['ইসলামের স্তম্ভ কয়টি?',['৩','৫','৬'],1],['ঈমানের মূল বিষয় কয়টি?',['৫','৬','৭'],1],['কুরআনে কতজন নবীর নাম এসেছে?',['২৫','২৪','২৭'],0],['প্রথম খলিফা কে?',['আবু বকর রা.','উমর রা.','আলী রা.'],0],['সাধারণ সম্পদে যাকাতের হার কত?',['২.৫%','৫%','১০%'],0],['শেষ নবী কে?',['মুহাম্মাদ ﷺ','ঈসা আ.','মূসা আ.'],0]]],
surah:['সূরা',[['সূরা ফাতিহায় কয়টি আয়াত?',['৫','৭','৯'],1],['সূরা কাউসারে কয়টি আয়াত?',['৩','৪','৫'],0],['সূরা নাসে কয়টি আয়াত?',['৫','৬','৭'],1],['"কুল হুওয়াল্লাহু আহাদ" কোন সূরার প্রথম আয়াত?',['ইখলাস','ফালাক','নাস'],0],['সূরা আসরে কয়টি আয়াত?',['৩','৪','৫'],0]]]};
const old=document.getElementById('quiz');old.id='quiz_old';old.hidden=true;old.insertAdjacentHTML('afterend','<div id="quiz2"></div>');
const el=document.getElementById('quiz2'),sh=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const best=()=>{try{return JSON.parse(localStorage.getItem('qbest'))||{}}catch(e){return{}}};
function home(){const b=best(),bd=Object.keys(C).filter(k=>mem['b_'+k]).map(k=>'🏅 '+C[k][0]+' বিশারদ');
el.innerHTML=`<p class="m">বিষয় বেছে নিন:</p><div class="chips">${Object.keys(C).map(k=>`<button data-c="${k}">${C[k][0]}${b[k]!=null?' ('+bn(b[k])+'/'+bn(C[k][1].length)+')':''}</button>`).join('')}<button data-c="all">সব মিলিয়ে (১০টি)</button></div><p class="m">আমার অর্জন: ${bd.join(' · ')||'এখনও কোনো ব্যাজ নেই। কোনো বিষয়ে সবগুলো ঠিক উত্তর দিলে ব্যাজ পাবেন।'}</p>`}
function run(k){let Q=k==='all'?sh(Object.values(C).flatMap(c=>c[1])).slice(0,10):C[k][1].slice();Q=sh(Q).map(q=>{const o=sh(q[1].map((t,i)=>[t,i===q[2]]));return[q[0],o]});let i=0,sc=0;
 (function step(){if(i>=Q.length){const b=best();if(k!=='all'&&(b[k]==null||sc>b[k])){b[k]=sc;try{localStorage.setItem('qbest',JSON.stringify(b))}catch(e){}}
  const full=sc===Q.length;if(full&&k!=='all'&&!mem['b_'+k]){mem['b_'+k]=true;save()}
  el.innerHTML=`<p class="c"><b>স্কোর: ${bn(sc)}/${bn(Q.length)}</b>${full&&k!=='all'?'<br>🏅 ব্যাজ অর্জন করেছেন!':''}</p><div class="chips"><button data-c="${k}">আবার খেলুন</button><button data-c="">বিষয়ে ফিরুন</button></div>`;return}
  const q=Q[i];el.innerHTML=`<p><b>${bn(i+1)}/${bn(Q.length)}. ${q[0]}</b></p>`+q[1].map((o,j)=>`<button class="opt" data-j="${j}">${o[0]}</button>`).join('');
  el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const ok=q[1][+b.dataset.j][1];if(ok)sc++;b.classList.add(ok?'ok':'no');el.querySelectorAll('.opt').forEach((x,j)=>{x.disabled=true;if(q[1][j][1])x.classList.add('ok')});setTimeout(()=>{i++;step()},900)})})()}
el.addEventListener('click',e=>{const b=e.target.closest('button[data-c]');if(!b)return;b.dataset.c?run(b.dataset.c):home()});
home();
})();
