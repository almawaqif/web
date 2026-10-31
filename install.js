// "অ্যাপ ইনস্টল" বোতাম: Android/Chrome-এ সরাসরি ইনস্টল, iPhone-এ ধাপ দেখায়।
(function(){
if(matchMedia('(display-mode: standalone)').matches||navigator.standalone)return;
const b=document.createElement('button');b.textContent='অ্যাপ ইনস্টল';b.hidden=true;document.querySelector('.tools').appendChild(b);
let dp=null;const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;b.hidden=false});
addEventListener('appinstalled',()=>{b.hidden=true;dp=null});
if(ios)b.hidden=false;
b.onclick=async()=>{if(dp){dp.prompt();await dp.userChoice;dp=null;b.hidden=true}
else alert(ios?'Safari-তে নিচের Share (⬆) বোতাম চাপুন, তারপর "Add to Home Screen" বেছে নিন।':'ব্রাউজার মেনু (⋮) থেকে "Install app" বা "Add to Home screen" বেছে নিন।')};
})();

// অফলাইন অবস্থা দেখা ও ক্যাশ রিসেট ("আরও" ট্যাবের নিচে)
(function(){const m=document.getElementById('more');if(!m)return;
m.insertAdjacentHTML('beforeend','<details><summary>অফলাইন অবস্থা</summary><div class="body"><p id="offst" class="m">পরীক্ষা হচ্ছে…</p><div class="chips"><button id="offreset">ক্যাশ রিসেট ও নতুন করে সংরক্ষণ</button></div></div></details>');
async function st(){const el=document.getElementById('offst');
 if(!('serviceWorker' in navigator)){el.textContent='এই ব্রাউজারে অফলাইন সমর্থিত নয়।';return}
 const reg=await navigator.serviceWorker.getRegistration(),names=await caches.keys();let n=0,home=false;
 for(const k of names){const c=await caches.open(k);n+=(await c.keys()).length;if(await c.match('./')||await c.match('index.html'))home=true}
 el.innerHTML='সার্ভিস ওয়ার্কার: '+(reg?(reg.active?'চালু ✔':'অপেক্ষায়'):'নেই ✘')+'<br>নিয়ন্ত্রণ: '+(navigator.serviceWorker.controller?'হ্যাঁ ✔':'না (একবার রিলোড করুন)')+'<br>সংরক্ষিত ফাইল: '+n+'টি<br>মূল পেজ সংরক্ষিত: '+(home?'হ্যাঁ ✔':'না ✘')+'<br>ক্যাশ: '+(names.join(', ')||'নেই')}
document.getElementById('offreset').onclick=async()=>{for(const r of await navigator.serviceWorker.getRegistrations())await r.unregister();for(const k of await caches.keys())await caches.delete(k);location.reload()};
st().catch(()=>{document.getElementById('offst').textContent='অবস্থা পড়া যায়নি।'});})();
