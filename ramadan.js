// রমজান কাউন্টডাউন, সেহরি-ইফতারের সময় ও কাছের মসজিদ খোঁজা (Google Maps লিংক)।
// রমজানের তারিখ উম্মুল কুরা ক্যালেন্ডারের হিসাব; চাঁদ দেখা অনুযায়ী ১ দিন এদিক-ওদিক হতে পারে।
(function(){
document.getElementById('home').insertAdjacentHTML('beforeend','<details><summary>রমজান ও মসজিদ</summary><div class="body"><div id="rmz"></div><div id="rmt"></div><div class="chips"><button id="mosq">কাছের মসজিদ খুঁজুন</button></div></div></details>');
const F=new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura',{day:'numeric',month:'numeric',year:'numeric'});
const hj=t=>Object.fromEntries(F.formatToParts(new Date(t)).map(x=>[x.type,+x.value]));
const t12=t=>{let[h,m]=t.split(':');h=+h;return bn((h%12)||12)+':'+bn(m)+(h<12?' পূর্বাহ্ণ':' অপরাহ্ণ')};
function info(){const base=Date.now(),off=(typeof hoff==='number'?hoff:0)*864e5,h0=hj(base+off);
 if(h0.month===9)return`<p class="c" style="font-size:20px"><b>রমজানের ${bn(h0.day)} তম দিন</b></p>`;
 for(let i=1;i<=420;i++){const h=hj(base+off+i*864e5);if(h.month===9&&h.day===1){const g=new Date(base+i*864e5);
  return`<p class="c" style="font-size:20px"><b>রমজান শুরু হতে আনুমানিক ${bn(i)} দিন বাকি</b></p><p class="m c">প্রায় ${new Intl.DateTimeFormat('bn-BD',{day:'numeric',month:'long',year:'numeric'}).format(g)} (${bn(h.year)} হিজরি)</p>`}}
 return''}
function times(){const el=document.getElementById('rmt');if(typeof T==='undefined'||!T){el.innerHTML='<p class="m">সময় লোড হলে সেহরি-ইফতারের সময় দেখাবে।</p>';return}
 el.innerHTML=`<table><tr><td>সেহরি শেষ (ফজর শুরু)</td><td>${t12(T.Fajr)}</td></tr><tr><td>ইফতার (মাগরিব)</td><td>${t12(T.Maghrib)}</td></tr></table><p class="m" style="font-size:13px">সতর্কতার জন্য স্থানীয় মসজিদের সময়সূচির সাথে মিলিয়ে নিন।</p>`}
function draw(){document.getElementById('rmz').innerHTML=info();times()}
document.getElementById('mosq').onclick=()=>{const go=(la,lo)=>window.open('https://www.google.com/maps/search/mosque/@'+la+','+lo+',15z','_blank');
 navigator.geolocation?navigator.geolocation.getCurrentPosition(p=>go(p.coords.latitude,p.coords.longitude),()=>go(pos.la,pos.lo)):go(pos.la,pos.lo)};
draw();setInterval(draw,30000);
})();
