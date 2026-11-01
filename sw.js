const C='nz9',U='https://i.ibb.co.com/XrCP3wVn/file-0000000058dc8207863a8268fbf8e78e.png';
const FILES=['./','index.html','data.js','extra.js','knowledge.js','steps.js','reminder.js','quiz.js','quran.js','progress.js','ramadan.js','asma.js','install.js','manifest.json'];
// রিডাইরেক্ট করা রেসপন্স নেভিগেশনে চলে না (অফলাইনে "You're offline" আসার কারণ), তাই সাফ করে নেওয়া হয়
const clean=r=>(!r||!r.redirected)?Promise.resolve(r):r.blob().then(b=>new Response(b,{status:r.status,statusText:r.statusText,headers:r.headers}));
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all([
 ...FILES.map(f=>fetch(f,{cache:'reload'}).then(clean).then(r=>r&&r.ok&&c.put(f,r)).catch(()=>{})),
 fetch(new Request(U,{mode:'no-cors'})).then(r=>c.put(U,r)).catch(()=>{})])))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET'||!q.url.startsWith('http'))return;
 e.respondWith(fetch(q).then(r=>clean(r).then(x=>{if(x&&(x.ok||x.type==='opaque')){const y=x.clone();caches.open(C).then(c=>c.put(q,y)).catch(()=>{})}return x}))
  .catch(()=>caches.match(q,{ignoreSearch:true}).then(m=>m||(q.mode==='navigate'?caches.match('./').then(h=>h||caches.match('index.html')):undefined))))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(l=>l.length?l[0].focus():clients.openWindow('./')))});
