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
