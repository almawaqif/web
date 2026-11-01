// আমার ধারা: টানা কত দিন পাঁচ ওয়াক্ত ট্র্যাকারে টিক দিয়েছেন, গত ৭ দিনের চার্ট ও ৩০ দিনের ছক।
// ডেটা নামাজ ট্র্যাকার (pt) থেকে আসে, তাই লগইন করলে ক্লাউডে সিঙ্ক হয়।
(function(){
const ds=n=>{const d=new Date();d.setDate(d.getDate()-n);return d.toLocaleDateString('en-CA')};
const cnt=k=>Object.values(pt[k]||{}).filter(Boolean).length;
const WD=['রবি','সোম','মঙ্গল','বুধ','বৃহস্পতি','শুক্র','শনি'];
document.getElementById('home').insertAdjacentHTML('beforeend','<details><summary>আমার ধারা (স্ট্রিক)</summary><div class="body" id="strk"></div></details>');
function render(){
 let s=0,i=cnt(ds(0))===5?0:1;for(;cnt(ds(i))===5;i++)s++;
 const ks=Object.keys(pt).filter(k=>cnt(k)===5).sort();let best=0,run=0,prev=null;
 for(const k of ks){run=(prev&&(new Date(k)-new Date(prev))===864e5)?run+1:1;best=Math.max(best,run);prev=k}
 const week=[...Array(7)].map((_,j)=>{const k=ds(6-j);return[k,cnt(k)]}),tot=week.reduce((a,x)=>a+x[1],0);
 const bars=week.map(([k,c])=>`<div style="flex:1;text-align:center"><div style="height:60px;display:flex;align-items:flex-end"><div style="width:100%;height:${c*20}%;min-height:3px;background:${c===5?'var(--green)':'var(--gold)'};border-radius:4px"></div></div><div class="m" style="font-size:12px">${WD[new Date(k+'T00:00').getDay()]}</div><div style="font-size:12px">${bn(c)}</div></div>`).join('');
 const grid=[...Array(30)].map((_,j)=>{const k=ds(29-j),c=cnt(k);return`<span title="${k}" style="width:14px;height:14px;border-radius:3px;display:inline-block;margin:2px;background:${c===5?'var(--green)':c>0?'var(--gold)':'var(--line)'}"></span>`}).join('');
 document.getElementById('strk').innerHTML=`<p class="c" style="font-size:22px;margin:6px 0"><b>🔥 ${bn(s)} দিন</b></p><p class="m c">টানা পাঁচ ওয়াক্ত পূর্ণ · সেরা ধারা: ${bn(best)} দিন${s===0?'<br>আজ ৫ ওয়াক্ত পূর্ণ করে নতুন ধারা শুরু করুন':cnt(ds(0))<5?'<br>আজ পূর্ণ করলে ধারা বাড়বে':''}</p>
 <p><b>গত ৭ দিন:</b> ${bn(tot)} / ৩৫ ওয়াক্ত</p><div style="display:flex;gap:6px">${bars}</div>
 <p style="margin-top:14px"><b>গত ৩০ দিন:</b></p><div>${grid}</div><p class="m" style="font-size:13px">সবুজ = ৫/৫, সোনালি = আংশিক, ধূসর = কিছু নয়</p>`}
document.addEventListener('change',e=>{if(e.target.dataset&&e.target.dataset.p)render()});
render();
})();
