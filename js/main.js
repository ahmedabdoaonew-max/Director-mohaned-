import {load,trackVisit} from "./store.js?v=7";
let D,cur="all",sub="all",L=[];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let lang=(()=>{try{return localStorage.getItem("mlang")==="ar"?"ar":"en"}catch{return"en"}})();
const T={en:{title:"Mohand Lotfy | Film & Commercial Director",nHome:"Home",nWork:"Work",nAbout:"About",nServices:"Services",nContact:"Contact",director:"Director Mohand Lotfy",
 h1:"Stories shot to be <em>felt</em>.",heroP:"Films, commercials and campaigns with a strong cinematic identity.",cta1:"View work",cta2:"Start a project",
 mq1:"Direction",mq2:"Cinematography",mq3:"Production",workH:"Selected work",workP:"Choose a section to explore the projects.",
 aboutH:"An independent creator with a cinematic eye.",aboutP:"My work spans narrative films, brand campaigns and visual storytelling. Every project starts with intention and ends with honest, elegant images that stay with the viewer.",
 projects:"Projects",awards:"Awards",years:"Years",servH:"Services",sv1:"Creative vision, narrative development and visual storytelling.",sv2:"Rhythm, composition and light design for memorable images.",sv3:"Planning, coordination and delivery for branded and cinematic projects.",
 ctH:"Have a story to tell?",ctP:"Tell me about your project and I will reply within two days.",foot:"© 2026 Mohand Lotfy. All rights reserved.",
 all:"All Work",allSub:"Everything in one place",allShort:"All",item:"item",items:"items",image:"Image",video:"Video",empty:"Nothing here yet.",open:"Open video",toggle:"عربي"},
ar:{title:"Mohand Lotfy | مخرج أفلام وإعلانات",nHome:"الرئيسية",nWork:"الأعمال",nAbout:"عني",nServices:"الخدمات",nContact:"تواصل",director:"المخرج Mohand Lotfy",
 h1:"قصص تُصوَّر لتُحَسّ.",heroP:"أفلام وإعلانات وحملات بهوية سينمائية قوية.",cta1:"شاهد الأعمال",cta2:"ابدأ مشروعك",
 mq1:"إخراج",mq2:"تصوير سينمائي",mq3:"إنتاج",workH:"أعمال مختارة",workP:"اختر قسمًا لاستكشاف المشاريع.",
 aboutH:"صانع محتوى مستقل بعين سينمائية.",aboutP:"تتنوع أعمالي بين الأفلام الروائية وحملات العلامات التجارية والسرد البصري. يبدأ كل مشروع بنية واضحة، وينتهي بصور صادقة وأنيقة تبقى في ذاكرة المشاهد.",
 projects:"مشروع",awards:"جائزة",years:"سنوات خبرة",servH:"الخدمات",sv1:"رؤية إبداعية وتطوير للسرد وحكاية بصرية.",sv2:"إيقاع وتكوين وتصميم إضاءة لصور لا تُنسى.",sv3:"تخطيط وتنسيق وتسليم للمشاريع الإعلانية والسينمائية.",
 ctH:"عندك قصة تحب تحكيها؟",ctP:"احكِ لي عن مشروعك وسأرد عليك خلال يومين.",foot:"© 2026 Mohand Lotfy. جميع الحقوق محفوظة.",
 all:"كل الأعمال",allSub:"كل شيء في مكان واحد",allShort:"الكل",item:"عمل",items:"أعمال",image:"صورة",video:"فيديو",empty:"لا يوجد شيء هنا بعد.",open:"افتح الفيديو",toggle:"English"}};
const t=k=>T[lang][k];
const tr=(o,k)=>(lang==="ar"&&o[k+"_ar"])||o[k]||"";
function applyLang(){const d=T[lang];document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 $$("[data-i]").forEach(e=>e.textContent=d[e.dataset.i]);$$("[data-ih]").forEach(e=>e.innerHTML=d[e.dataset.ih]);
 document.title=d.title;const b=$("#lang");b.textContent=d.toggle;b.lang=lang==="ar"?"en":"ar"}
const ytId=u=>(String(u||"").match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)||[])[1];
const tab=(k,t,on,a)=>`<button class="tab${on?" on":""}" data-${a}="${esc(k)}">${esc(t)}</button>`;
function list(){const o=[];D.sections.forEach(s=>{if(cur!=="all"&&s.id!==cur)return;
 if(cur==="all"||sub==="all")o.push(...s.items.map(x=>({...x,cat:tr(s,"title"),sub:t(x.type)})));
 s.subs.forEach(b=>{if(cur==="all"||sub==="all"||b.id===sub)o.push(...b.items.map(x=>({...x,cat:tr(s,"title"),sub:tr(b,"title")})))})});return o}
const cnt=s=>s.items.length+s.subs.reduce((n,b)=>n+b.items.length,0);
const cat=(k,ti,d,img,n,on)=>`<button class="cat${on?" on":""}${img?"":" noimg"}" data-t="${esc(k)}" aria-pressed="${on}">${img?`<span class="cat-img"><img loading="lazy" src="${esc(img)}" alt=""></span>`:""}<span class="cat-txt"><b>${esc(ti)}</b>${d?`<small>${esc(d)}</small>`:""}<em>${n} ${n===1?t("item"):t("items")}</em></span></button>`;
function render(){const S=D.sections.find(s=>s.id===cur);
 $("#tabs").innerHTML=cat("all",t("all"),t("allSub"),"",D.sections.reduce((n,s)=>n+cnt(s),0),cur==="all")+D.sections.map(s=>cat(s.id,tr(s,"title"),tr(s,"desc"),s.image.url,cnt(s),s.id===cur)).join("");
 $("#subtabs").innerHTML=S&&S.subs.length?tab("all",t("allShort"),sub==="all","s")+S.subs.map(b=>tab(b.id,tr(b,"title"),b.id===sub,"s")).join(""):"";
 L=list();
 $("#grid").innerHTML=L.length?L.map((x,i)=>{const th=x.thumb||(x.type==="image"?x.url:"")||(ytId(x.url)?`https://img.youtube.com/vi/${ytId(x.url)}/maxresdefault.jpg`:"")||"assets/logo.svg";
  return `<button class="card" style="animation-delay:${i*70}ms" data-k="${i}"><div class="ph"><img loading="lazy" src="${esc(th)}" alt="${esc(tr(x,"title"))}"></div><div class="meta"><span>${esc(x.cat)}</span><span>${x.type==="video"?"▶ ":""}${esc(x.sub)}</span></div><h3>${esc(tr(x,"title"))}</h3><p>${esc(tr(x,"desc"))}</p></button>`}).join(""):`<p class="empty">${t("empty")}</p>`}
function media(x){const u=x.url||"";let m;
 if(m=u.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/))return `<iframe src="https://www.youtube.com/embed/${m[1]}" allow="encrypted-media;fullscreen" allowfullscreen></iframe>`;
 if(m=u.match(/vimeo\.com\/(\d+)/))return `<iframe src="https://player.vimeo.com/video/${m[1]}" allowfullscreen></iframe>`;
 if(/\.(mp4|webm|mov)(\?|$)/i.test(u))return `<video src="${esc(u)}" controls playsinline></video>`;
 return `<img src="${esc(x.type==="image"?u:x.thumb||u)}" alt="${esc(tr(x,"title"))}">`}
$("#tabs").addEventListener("click",e=>{const b=e.target.closest("[data-t]");if(!b)return;cur=b.dataset.t;sub="all";render();
 const k=$("#tabs .cat.on");if(k)k.focus({preventScroll:true});
 const t=$("#subtabs").innerHTML?$("#subtabs"):$("#grid");if(t.getBoundingClientRect().top>innerHeight*.6)t.scrollIntoView({behavior:"smooth",block:"start"})});
$("#tabs").addEventListener("error",e=>{const i=e.target;if(i.tagName==="IMG"){const c=i.closest(".cat");if(c)c.classList.add("noimg");i.remove()}},true);
$("#subtabs").addEventListener("click",e=>{const b=e.target.closest("[data-s]");if(b){sub=b.dataset.s;render()}});
$("#grid").addEventListener("error",e=>{const i=e.target;if(i.tagName==="IMG"&&/maxresdefault/.test(i.src))i.src=i.src.replace("maxresdefault","hqdefault")},true);
const modal=$("#modal");
function closeModal(){modal.hidden=true;modal.innerHTML="";document.body.style.overflow=""}
$("#grid").addEventListener("click",e=>{const c=e.target.closest(".card");if(!c)return;const x=L[c.dataset.k],mm=media(x);
 modal.innerHTML=`<div class="m-panel" role="dialog" aria-modal="true"><button class="close" aria-label="Close">×</button><div class="m-media${/^<img/.test(mm)?" is-img":""}">${mm}</div><div class="m-body"><h2>${esc(tr(x,"title"))}</h2><div class="chips"><span>${esc(x.cat)}</span><span>${esc(x.sub)}</span></div><p>${esc(tr(x,"desc"))}</p>${x.type==="video"&&x.url?`<a class="btn gold" href="${esc(x.url)}" target="_blank" rel="noopener">${t("open")}</a>`:""}</div></div>`;
 modal.hidden=false;document.body.style.overflow="hidden"});
modal.addEventListener("click",e=>{if(e.target===modal||e.target.closest(".close"))closeModal()});
addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
function contacts(){const c=D.contact||{},v=k=>String(c[k]||"").trim();
 const wa=v("whatsapp").replace(/\D/g,"").replace(/^00/,""),fb=v("facebook"),em=v("email");
 const set=(id,href)=>{const a=$(id);if(href){a.href=href;a.hidden=false}else a.hidden=true;return !!href};
 const fbUrl=!fb?"":/^https?:\/\//i.test(fb)?fb:/^[\w.\-\/]+$/.test(fb)?"https://facebook.com/"+fb.replace(/^\//,""):"";
 const emUrl=/^[^\s@]+@[^\s@]+$/.test(em)?"mailto:"+em:"";
 const n=[set("#fabWa",wa?"https://wa.me/"+wa:""),set("#fabFb",fbUrl),set("#fabMail",emUrl)].filter(Boolean).length;
 $("#fab").hidden=!n;
 if(emUrl){const b=$("#mailBtn");b.href=emUrl;b.textContent=em}}
function images(){$$("[data-img]").forEach(el=>{const i=D.images[el.dataset.img];if(i&&i.url){el.src=i.url;el.alt=i.title||"";el.title=i.desc||""}});
 const h=D.images.hero;if(h&&h.url)$("[data-bgimg]").style.backgroundImage=`url("${h.url.replace(/"/g,"%22")}")`}
D=await load();applyLang();images();render();
$("#lang").addEventListener("click",()=>{lang=lang==="ar"?"en":"ar";try{localStorage.setItem("mlang",lang)}catch{}applyLang();render();if(!modal.hidden)closeModal()});
contacts();trackVisit();
const bg=$(".hero-bg"),bar=$("#progress"),tb=$("#topbar");
addEventListener("scroll",()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
bar.style.width=(y/h*100)+"%";tb.classList.toggle("solid",y>40);if(y<innerHeight)bg.style.transform=`translateY(${y*.25}px) scale(1.05)`},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
$$(".reveal").forEach(el=>io.observe(el));
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,n=+el.dataset.n;let k=0;const t=setInterval(()=>{k+=Math.max(1,Math.ceil(n/40));if(k>=n){k=n;clearInterval(t)}el.textContent=k+"+"},35);cio.unobserve(el)}),{threshold:.6});
$$("[data-n]").forEach(el=>cio.observe(el));
const links=$$(".nav a"),sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
$$("main section[id]").forEach(s=>sio.observe(s));
