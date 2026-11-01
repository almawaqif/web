// "হাদিস" ট্যাব: বুখারী, মুসলিম, তিরমিযী, আবু দাউদ, নাসাঈ, ইবনে মাজাহ (ওপেন Hadith API, fawazahmed0) + হিসনুল মুসলিমের বাংলা বইয়ের লিংক।
// ওযু বিভাগটি এখান থেকে "আরও" ট্যাবে সরানো হয়।
(function(){
// ---- ওযু → আরও ট্যাব ----
const oz=document.getElementById('ozu'),moreEl=document.getElementById('more');
if(oz&&moreEl){const w=document.createElement('details');w.innerHTML='<summary>ওযু ও পবিত্রতা</summary><div class="body"></div>';const b=w.querySelector('.body');while(oz.firstChild)b.appendChild(oz.firstChild);moreEl.insertAdjacentElement('afterbegin',w);oz.remove()}
const nb=document.querySelector('nav [data-t="ozu"]');if(nb)nb.remove();
// ---- হাদিস ----
const CDN='https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/',H=document.getElementById('hadith');
const COL=[['bukhari','সহীহ বুখারী','ইমাম বুখারী রহ.',97],['muslim','সহীহ মুসলিম','ইমাম মুসলিম রহ.',57],['tirmidhi','জামে তিরমিযী','ইমাম তিরমিযী রহ.',49],['abudawud','সুনানে আবু দাউদ','ইমাম আবু দাউদ রহ.',43],['nasai','সুনানে নাসাঈ','ইমাম নাসাঈ রহ.',52],['ibnmajah','সুনানে ইবনে মাজাহ','ইমাম ইবনে মাজাহ রহ.',37]];
const HISN='https://old.islamhouse.com/40079/en/bn/books/(Hisn_Almuslim)_Fortress_of_the_Muslim,_Invocations_from_the_Quran_and_Sunnah';
const esc=s=>String(s==null?'':s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const J=async p=>{for(const u of[CDN+p+'.min.json',CDN+p+'.json']){try{const r=await fetch(u);if(r.ok)return await r.json()}catch(e){}}throw 0};
let ED=null,INFO=null,cur=null,ed=null,list=[],shown=0,rows=[];
async function eds(){if(ED)return ED;const j=await J('editions');ED=[];(function w(o){if(Array.isArray(o))o.forEach(w);else if(o&&typeof o==='object'){if(typeof o.name==='string'&&o.language)ED.push(o);else Object.values(o).forEach(w)}})(j);return ED}
const pick=(k,p)=>ED.find(e=>e.name===p+'-'+k);
async function names(k){try{INFO=INFO||await J('info');const m=INFO[k]&&INFO[k].metadata,s=m&&(m.sections||m.section);if(s&&typeof s==='object'&&!Array.isArray(s))return s}catch(e){}return null}
const hdr=(t,back)=>`<div style="display:flex;gap:8px;align-items:center;margin:0 0 10px"><button class="opt" style="width:auto;margin:0" data-back="${back}">← পিছনে</button><b>${t}</b></div>`;
function home(){H.innerHTML='<p class="note">হাদিসের মূল পাঠ ও অনুবাদ ওপেন হাদিস API থেকে আসে। ইন্টারনেট লাগে; একবার খোলা অংশ ফোনে সেভ থাকে। হাদিসের ব্যাখ্যা বা মাসআলার জন্য আলেমের পরামর্শ নিন।</p>'+COL.map(c=>`<button class="opt" data-col="${c[0]}"><b>${c[1]}</b><br><span class="m">${c[2]}</span></button>`).join('')+`<button class="opt" data-hisn="1"><b>হিসনুল মুসলিম</b><br><span class="m">দোয়া ও যিকিরের সংকলন · বাংলা বই (বাইরের লিংকে খুলবে)</span></button>`}
async function col(k){cur=COL.find(c=>c[0]===k);H.innerHTML=hdr(cur[1],'home')+'<p class="m">লোড হচ্ছে…</p>';
 try{await eds()}catch(e){H.innerHTML=hdr(cur[1],'home')+'<p class="m">সংস্করণের তালিকা আনা যায়নি। ইন্টারনেট দেখুন।</p>';return}
 const be=pick(k,'ben'),tr=be||pick(k,'eng');if(!tr){H.innerHTML=hdr(cur[1],'home')+'<p class="m">এই গ্রন্থের অনুবাদ পাওয়া যায়নি।</p>';return}
 const ar=pick(k,'ara');ed={tr:tr.name,ar:ar&&ar.name,bn:!!be,author:tr.author};
 const nm=await names(k),L=nm?Object.keys(nm).filter(n=>nm[n]).sort((a,b)=>a-b).map(n=>[n,nm[n]]):Array.from({length:cur[3]},(_,i)=>[i+1,'']);
 H.innerHTML=hdr(cur[1],'home')+(be?'':'<p class="note">এই গ্রন্থের বাংলা সংস্করণ পাওয়া যায়নি, তাই ইংরেজি অনুবাদ দেখানো হচ্ছে।</p>')+`<p class="m" style="font-size:13px">অনুবাদ: ${be?'বাংলা':'ইংরেজি'}${ed.author?' · '+esc(ed.author):''} · সূত্র: Hadith API (fawazahmed0)</p>
 <div style="display:flex;gap:8px;margin:8px 0"><input id="hn" type="number" min="1" placeholder="হাদিস নম্বর" style="flex:1;padding:8px 12px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink);font:inherit"><button class="opt" style="width:auto;margin:0" data-num="1">খুঁজুন</button></div><div id="hr"></div>
 <p class="m"><b>কিতাব (অধ্যায়):</b></p>`+L.map(([n,t])=>`<button class="opt" data-sec="${n}">কিতাব ${bn(n)}${t?' · '+esc(t):''}</button>`).join('')}
function card(t,a){const g=t.grades&&t.grades[0]?' · '+esc(t.grades[0].name+': '+t.grades[0].grade):'';
 const i=rows.push((a?a.text+'\n':'')+t.text+'\n— '+cur[1]+', হাদিস '+t.hadithnumber)-1;
 return`<div class="v"><p class="m">হাদিস নং ${bn(t.hadithnumber)}${g}</p>${a?`<p class="ar">${esc(a.text)}</p>`:''}<p class="me">${esc(t.text)}</p><button class="opt" style="width:auto" data-cp="${i}">কপি</button></div>`}
async function sec(n){H.innerHTML=hdr(cur[1]+' · কিতাব '+bn(n),'col')+'<p class="m">লোড হচ্ছে…</p>';
 try{const t=await J(`editions/${ed.tr}/sections/${n}`),a=ed.ar?await J(`editions/${ed.ar}/sections/${n}`).catch(()=>null):null,am={};
  if(a)a.hadiths.forEach(x=>{am[x.arabicnumber||x.hadithnumber]=x});
  list=t.hadiths.map(x=>[x,am[x.arabicnumber||0]||null]);shown=0;
  const nm=t.metadata&&t.metadata.section?Object.values(t.metadata.section)[0]:'';
  H.innerHTML=hdr(cur[1]+' · কিতাব '+bn(n),'col')+(nm?`<p class="m">${esc(nm)}</p>`:'')+'<div id="hl"></div><div id="hm2"></div>';nextPage()}
 catch(e){H.innerHTML=hdr(cur[1],'col')+'<p class="m">এই কিতাব লোড করা যায়নি। ইন্টারনেট দেখুন বা অন্য কিতাব চেষ্টা করুন।</p>'}}
function nextPage(){const L=document.getElementById('hl');list.slice(shown,shown+15).forEach(([t,a])=>L.insertAdjacentHTML('beforeend',card(t,a)));shown+=15;
 document.getElementById('hm2').innerHTML=shown<list.length?`<button class="opt c" data-more="1">আরও দেখান (${bn(list.length-shown)}টি বাকি)</button>`:'<p class="m c">— শেষ —</p>'}
async function num(){const v=+document.getElementById('hn').value,o=document.getElementById('hr');if(!v)return;o.textContent='লোড হচ্ছে…';
 try{const t=(await J(`editions/${ed.tr}/${v}`)).hadiths[0],a=ed.ar?await J(`editions/${ed.ar}/${t.arabicnumber||v}`).then(x=>x.hadiths[0]).catch(()=>null):null;o.innerHTML=card(t,a)}catch(e){o.textContent='এই নম্বরের হাদিস পাওয়া যায়নি।'}}
H.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.col)col(d.col);else if(d.hisn)window.open(HISN,'_blank');else if(d.back==='home')home();else if(d.back==='col')col(cur[0]);
 else if(d.sec!=null)sec(d.sec);else if(d.more)nextPage();else if(d.num)num();else if(d.cp!=null&&navigator.clipboard)navigator.clipboard.writeText(rows[+d.cp])});
home();
})();
