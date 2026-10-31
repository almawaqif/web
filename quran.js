// সম্পূর্ণ কুরআন লাইব্রেরি: ১১৪ সূরা, আরবি (উসমানী), বাংলা অনুবাদ (মুহিউদ্দীন খান), আয়াত ধরে অডিও (মিশারী আলাফাসী)
// ডেটা alquran.cloud API থেকে আসে এবং একবার খুললে ফোনে সংরক্ষিত থাকে (অফলাইনে পড়া যায়)।
(function(){
const API='https://api.alquran.cloud/v1/',BIS='بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
const g=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},s=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
document.getElementById('surah').insertAdjacentHTML('afterbegin',
`<details open id="qlib"><summary>সম্পূর্ণ কুরআন (১১৪ সূরা)</summary><div class="body">
<p class="m">আরবি, বাংলা অনুবাদ ও অডিও অনলাইন উৎস থেকে আসে। একবার খুললে অফলাইনেও পড়া যাবে।</p>
<input id="qf" type="search" placeholder="সূরার নাম বা নম্বর (যেমন Baqarah, ২, 36)" style="width:100%;padding:8px 12px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink);font:inherit">
<div id="ql" class="chips" style="max-height:200px;overflow:auto;margin:8px 0"></div><div id="qv"></div></div></details>`);
const ql=document.getElementById('ql'),qv=document.getElementById('qv');let list=g('qlist',null),au=null;
const num=t=>String(t).replace(/[০-৯]/g,d=>'০১২৩৪৫৬৭৮৯'.indexOf(d));
async function api(p){const r=await fetch(API+p);if(!r.ok)throw 0;return(await r.json()).data}
function draw(f){f=num(f||'').trim().toLowerCase();ql.innerHTML=(list||[]).filter(x=>!f||String(x.number)===f||(x.englishName+' '+x.name+' '+x.englishNameTranslation).toLowerCase().includes(f)).map(x=>`<button data-q="${x.number}">${bn(x.number)}. ${x.englishName}</button>`).join('')||'<span class="m">পাওয়া যায়নি</span>'}
async function init(){if(!list){try{list=await api('surah');s('qlist',list)}catch(e){ql.innerHTML='<span class="m">তালিকা আনা যায়নি, ইন্টারনেট দেখুন</span>';return}}draw();const l=g('ql',0);if(l)qv.innerHTML=`<p><button class="tools" style="padding:4px 12px;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:8px" data-q="${l}">শেষ পড়া সূরা খুলুন (${bn(l)})</button></p>`}
document.getElementById('qf').oninput=e=>draw(e.target.value);
function stop(){if(au){au.pause();au=null}}
function play(urls,i,btn){stop();if(i>=urls.length){if(btn)btn.textContent='▶ পুরো সূরা শুনুন';return}au=new Audio(urls[i]);au.onended=()=>play(urls,i+1,btn);au.play().catch(()=>{au=null})}
async function open(n){qv.innerHTML='<p class="m">লোড হচ্ছে…</p>';stop();let d=g('qs'+n,null);
if(!d){try{d=await api(`surah/${n}/editions/quran-uthmani,bn.bengali,ar.alafasy`);s('qs'+n,d)}catch(e){qv.innerHTML='<p class="m">এই সূরা আনা যায়নি। ইন্টারনেট চালু করে আবার চেষ্টা করুন।</p>';return}}
s('ql',n);const A=d[0].ayahs,B=d[1].ayahs,C=d[2].ayahs,info=d[0];
const clean=(a)=>{let t=a.text;if(n!==1&&a.numberInSurah===1&&t.startsWith('بِسْمِ')){const w=t.split(' ');if(w.length>4)t=w.slice(4).join(' ')}return t};
qv.innerHTML=`<h3 class="c" style="margin:8px 0">${info.name} · ${info.englishName}</h3><p class="m c">${bn(info.numberOfAyahs)} আয়াত · ${info.revelationType==='Meccan'?'মাক্কী':'মাদানী'}</p>
<div class="chips"><button id="qp">▶ পুরো সূরা শুনুন</button><button id="qh">মুখস্থ পরীক্ষা</button></div>
<label class="mem"><input type="checkbox" data-id="q${n}" ${mem['q'+n]?'checked':''}> মুখস্থ হয়েছে</label>
<div id="qa">${n!==1&&n!==9?`<p class="ar" style="text-align:center">${BIS}</p>`:''}`+
A.map((a,i)=>`<div class="v"><p class="ar">${clean(a)} ﴿${bn(a.numberInSurah)}﴾</p><p class="me">${B[i].text}</p><div class="chips" style="justify-content:flex-start"><button data-au="${C[i].audio}">▶ আয়াত ${bn(a.numberInSurah)}</button></div></div>`).join('')+'</div>';
const urls=C.map(x=>x.audio);document.getElementById('qp').onclick=function(){if(au){stop();this.textContent='▶ পুরো সূরা শুনুন'}else{this.textContent='⏸ থামান';play(urls,0,this)}};
document.getElementById('qh').onclick=()=>document.getElementById('qa').classList.toggle('hide');
qv.scrollIntoView()}
document.getElementById('qlib').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.q)open(+b.dataset.q);if(b.dataset.au){stop();au=new Audio(b.dataset.au);au.play().catch(()=>{})}});
init();
})();
