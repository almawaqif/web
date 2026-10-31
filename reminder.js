// আজানের রিমাইন্ডার: ওয়াক্ত শুরু হলে নোটিফিকেশন। অ্যাপ/ট্যাব খোলা বা ব্যাকগ্রাউন্ডে থাকলে কাজ করে।
// পুরোপুরি বন্ধ থাকা অবস্থায় পাঠাতে Firebase Cloud Messaging ও সার্ভার লাগবে, সেটা এই ফাইলে নেই।
(function(){
const g=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},s=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
document.getElementById('home').insertAdjacentHTML('beforeend',
`<details><summary>আজানের রিমাইন্ডার</summary><div class="body">
<label class="mem"><input type="checkbox" id="rem"> ওয়াক্ত শুরু হলে নোটিফিকেশন দিন</label>
<div class="chips"><button id="remtest">নোটিফিকেশন পরীক্ষা করুন</button></div><p class="m" id="remt"></p>
<p class="m">অ্যাপ বা ব্রাউজার চালু থাকলে (ব্যাকগ্রাউন্ডে থাকলেও) কাজ করে; পুরোপুরি বন্ধ থাকলে আসবে না। iPhone-এ আগে "হোম স্ক্রিনে যোগ করুন"।</p></div></details>`);
const cb=document.getElementById('rem'),msg=document.getElementById('remt');
const ok=()=>'Notification' in window;
function note(t,b){const o={body:b,icon:'https://i.ibb.co.com/XrCP3wVn/file-0000000058dc8207863a8268fbf8e78e.png',tag:t};
 if(navigator.serviceWorker&&navigator.serviceWorker.ready)navigator.serviceWorker.ready.then(r=>r.showNotification(t,o)).catch(()=>{try{new Notification(t,o)}catch(e){}});
 else try{new Notification(t,o)}catch(e){}}
async function ask(){if(!ok()){msg.textContent='এই ব্রাউজারে নোটিফিকেশন সমর্থিত নয়।';return false}
 if(Notification.permission!=='granted'&&await Notification.requestPermission()!=='granted'){msg.textContent='নোটিফিকেশনের অনুমতি দেওয়া হয়নি। ব্রাউজার সেটিংস থেকে অনুমতি দিন।';return false}
 msg.textContent='';return true}
cb.checked=g('rem',false)&&ok()&&Notification.permission==='granted';
cb.onchange=async()=>{if(cb.checked&&!(await ask()))cb.checked=false;s('rem',cb.checked)};
document.getElementById('remtest').onclick=async()=>{if(await ask())note('নামাজ শিক্ষা','রিমাইন্ডার ঠিকমতো কাজ করছে।')};
setInterval(()=>{if(!cb.checked||typeof T==='undefined'||!T)return;
 for(const[k,b]of PN){const[h,m]=T[k].split(':'),d=new Date();d.setHours(h,m,0,0);const diff=Date.now()-d,key='nt_'+day+k;
  if(diff>=0&&diff<120000&&!g(key,false)){s(key,true);note(b+' এর ওয়াক্ত','আপনার '+b+' নামাজের সময় হয়েছে।')}}},15000);
})();
