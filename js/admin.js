import {load,save,login,logout,onAuth,isCloud,uid,blankImg,norm,loadStats,dayKey} from "./store.js?v=9";
const $=s=>document.querySelector(s);
let lang=(()=>{try{return localStorage.getItem("alang")==="ar"?"ar":"en"}catch{return"en"}})();
const AR={"No preview yet": "لا توجد معاينة بعد", "Dashboard": "الرئيسية", "Cloud (Firebase): changes go live when you press Save.": "متصل بالسحابة (Firebase): التعديلات تظهر على الموقع بعد الضغط على حفظ.", "Local demo mode: data stays in this browser only.": "وضع تجريبي محلي: البيانات محفوظة في هذا المتصفح فقط.", "Sections": "الأقسام", "Site images": "صور الموقع", "Hero, about and service photos": "صور الواجهة وعني والخدمات", "Contact buttons": "أزرار التواصل", "WhatsApp, Facebook, Email": "واتساب وفيسبوك وإيميل", "Visits": "الزيارات", "Traffic statistics": "إحصائيات الزيارات", "Backup & restore": "نسخ احتياطي واستعادة", "Export or import your data": "تصدير أو استيراد بياناتك", "Hero background": "خلفية الواجهة", "About photo": "صورة عني", "Service: Direction": "خدمة: إخراج", "Service: Cinematography": "خدمة: تصوير سينمائي", "Service: Production": "خدمة: إنتاج", "Paste an image link (URL) for each spot on the site.": "الصق رابط صورة لكل مكان في الموقع.", "Image link (URL)": "رابط الصورة", "Title": "العنوان", "Description": "الوصف", "Floating buttons on the site. Leave a field empty to hide its button.": "أزرار عائمة في الموقع. اترك الخانة فارغة لإخفاء الزر.", "WhatsApp number (country code, digits only)": "رقم واتساب (مع كود الدولة، أرقام فقط)", "Facebook link": "رابط فيسبوك", "Email address": "البريد الإلكتروني", "Loading…": "جارٍ التحميل…", "Export": "تصدير", "Download all your content as a JSON file.": "نزّل كل المحتوى كملف JSON.", "Export data": "تصدير البيانات", "Import": "استيراد", "Load a previously exported file. It replaces the current content, then press Save.": "حمّل ملفًا تم تصديره من قبل. سيستبدل المحتوى الحالي، ثم اضغط حفظ.", "Import data": "استيراد البيانات", "Imported. Press Save": "تم الاستيراد. اضغط حفظ", "Invalid file": "ملف غير صالح", "+ Add section": "+ إضافة قسم", "All sections": "كل الأقسام", "Untitled": "بدون عنوان", "No sections yet.": "لا توجد أقسام بعد.", "No items yet. Add an image or a video.": "لا توجد عناصر بعد. أضف صورة أو فيديو.", "+ Add item": "+ إضافة عنصر", "Arabic version (optional)": "النسخة العربية (اختياري)", "Title (Arabic)": "العنوان (بالعربي)", "Description (Arabic)": "الوصف (بالعربي)", "Title (Arabic, optional)": "العنوان بالعربي (اختياري)", "Cover image": "صورة الغلاف", "After adding the section you can add items (images and videos) and subsections.": "بعد إضافة القسم يمكنك إضافة عناصر (صور وفيديو) وأقسام فرعية.", "+ Add subsection": "+ إضافة قسم فرعي", "Delete this section": "حذف هذا القسم", "New section": "قسم جديد", "Edit section": "تعديل القسم", "Add section": "إضافة القسم", "Enter a section title": "اكتب عنوان القسم", "Subsection title": "عنوان القسم الفرعي", "Delete this subsection": "حذف هذا القسم الفرعي", "After adding the subsection you can add items to it.": "بعد إضافة القسم الفرعي يمكنك إضافة عناصر إليه.", "New subsection": "قسم فرعي جديد", "Edit subsection": "تعديل القسم الفرعي", "Add subsection": "إضافة القسم الفرعي", "Enter a title": "اكتب العنوان", "Preview": "معاينة", "Image": "صورة", "Video": "فيديو", "Video link (YouTube, Vimeo or .mp4)": "رابط الفيديو (يوتيوب أو فيميو أو .mp4)", "Cover image link (optional, YouTube is automatic)": "رابط صورة الغلاف (اختياري، يوتيوب تلقائي)", "Delete this item": "حذف هذا العنصر", "New item": "عنصر جديد", "Edit item": "تعديل العنصر", "Add item": "إضافة العنصر", "Add a media link": "أضف رابط الوسائط", "Total visits": "إجمالي الزيارات", "Unique visitors": "زوار فريدون", "Today": "اليوم", "Last 7 days": "آخر 7 أيام", "Last 30 days": "آخر 30 يومًا", "Last 14 days": "آخر 14 يومًا", "A visit = one browser session on the public site. Add ?notrack to the site URL once on your own devices to exclude them.": "الزيارة = جلسة متصفح واحدة على الموقع. أضف ‎?notrack‎ لرابط الموقع مرة واحدة على أجهزتك لاستبعادها.", "Local demo mode: counts only this browser.": "وضع تجريبي محلي: يحسب هذا المتصفح فقط.", "Refresh": "تحديث", "Could not load visits: ": "تعذر تحميل الزيارات: ", "Cancel": "إلغاء", "Unsaved changes": "تعديلات غير محفوظة", "Save": "حفظ", "Saved": "تم الحفظ", "Save failed: ": "فشل الحفظ: ", "Added": "تمت الإضافة", "Delete this? This cannot be undone.": "حذف هذا العنصر؟ لا يمكن التراجع.", "You have unsaved changes. Sign out anyway?": "لديك تعديلات غير محفوظة. تسجيل الخروج؟", "No connection": "لا يوجد اتصال", "Email/Password sign-in is not enabled in Firebase": "تسجيل الدخول بالإيميل غير مفعّل في Firebase", "Wrong password": "كلمة المرور غير صحيحة", "e.g. Short Films": "مثال: أفلام قصيرة", "sections": "قسم", "items": "عنصر", "subsections": "قسم فرعي", "Items": "العناصر", "Subsections": "الأقسام الفرعية", "View site ↗": "الموقع ↗", "Sign out": "تسجيل الخروج", "Admin": "لوحة الإدارة", "Email": "البريد الإلكتروني", "Password": "كلمة المرور", "Sign in": "دخول", "Admin | Mohand": "لوحة الإدارة | Mohand", "Back": "رجوع"};
AR['Optional groups inside this section, e.g. "Short Films".']="مجموعات اختيارية داخل القسم، مثل «أفلام قصيرة».";
const _=s=>(lang==="ar"&&AR[s])||s;

let S,dirty=false,R=null,draft=null,cur=null;
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const get=p=>p.split(".").reduce((o,k)=>o?.[k],R)??"";
const put=(p,v)=>{const a=p.split("."),k=a.pop();a.reduce((o,x)=>o[x],R)[k]=v};
const ytId=u=>(String(u||"").match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)||[])[1];
const isVid=u=>/\.(mp4|webm|mov)(\?|$)/i.test(u||"");
const thumbOf=x=>x.thumb||(x.type==="image"?x.url:"")||(ytId(x.url)?`https://img.youtube.com/vi/${ytId(x.url)}/hqdefault.jpg`:"");
const mediaPrev=x=>{const t=thumbOf(x);if(t)return `<img src="${esc(t)}" alt="" onerror="this.remove()">`;
 if(x.type==="video"&&isVid(x.url))return `<video src="${esc(x.url)}#t=0.5" muted playsinline preload="metadata"></video>`;return ""};
const thumbImg=x=>{const t=thumbOf(x);return t?`<img src="${esc(t)}" alt="" onerror="this.remove()">`:""};
const pv=(k,x)=>`<div class="pv" data-pv="${k}" data-ph="${_("No preview yet")}">${mediaPrev(x)}</div>`;
const dirOf=p=>/(^|\.)(url|thumb|whatsapp|facebook|email)$/.test(p)?"ltr":"auto";
const field=(l,p,ph="")=>`<label>${l}<input data-f="${p}" value="${esc(get(p))}" placeholder="${esc(ph)}" autocomplete="off" dir="${dirOf(p)}"></label>`;
const area=(l,p)=>`<label>${l}<textarea data-f="${p}" rows="4" dir="auto">${esc(get(p))}</textarea></label>`;
const rtl=h=>h.replace(/<(input|textarea)/g,'<$1 dir="rtl"');
const cnt=s=>s.items.length+s.subs.reduce((n,b)=>n+b.items.length,0);
const secBy=id=>S.sections.find(s=>s.id===id);
const ICON={
 images:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5-5 4 4 3-3 4 4"/></svg>',
 sections:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>',
 contact:'<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>',
 stats:'<svg viewBox="0 0 24 24"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>',
 backup:'<svg viewBox="0 0 24 24"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/></svg>'};
function listFor(spec){const [k,sid,bid]=spec.split(":");if(k==="sections")return S.sections;
 const s=secBy(sid);if(k==="subs")return s.subs;return bid?s.subs.find(b=>b.id===bid).items:s.items}
const mv=(spec,i)=>`<span class="mv"><button data-a="mv" data-l="${spec}" data-i="${i}" data-d="-1" aria-label="Move up">&#8593;</button><button data-a="mv" data-l="${spec}" data-i="${i}" data-d="1" aria-label="Move down">&#8595;</button></span>`;
const getDraft=(key,make)=>{if(!draft||draft.key!==key)draft={key,obj:make()};return draft.obj};
const delBtn=(spec,id,t)=>`<button class="btn danger block" style="margin-top:18px" data-a="del" data-l="${spec}" data-id="${id}">${t}</button>`;

/* ---------- pages ---------- */
function pageHome(){
 const nI=S.sections.reduce((n,s)=>n+cnt(s),0);
 const tile=(h,ic,t,d)=>`<a class="tile" href="${h}">${ICON[ic]}<span><b>${t}</b><small>${d}</small></span><i class="chev">&#8250;</i></a>`;
 return {title:_("Dashboard"),html:`<p class="hint">${isCloud()?_("Cloud (Firebase): changes go live when you press Save."):_("Local demo mode: data stays in this browser only.")}</p><div class="tiles">`
  +tile("#/sections","sections",_("Sections"),`${S.sections.length} ${_("sections")} &middot; ${nI} ${_("items")}`)
  +tile("#/images","images",_("Site images"),_("Hero, about and service photos"))
  +tile("#/contact","contact",_("Contact buttons"),_("WhatsApp, Facebook, Email"))
  +tile("#/stats","stats",_("Visits"),_("Traffic statistics"))
  +tile("#/backup","backup",_("Backup & restore"),_("Export or import your data"))+`</div>`}}
const NAMES={hero:_("Hero background"),about:_("About photo"),svc1:_("Service: Direction"),svc2:_("Service: Cinematography"),svc3:_("Service: Production")};
function pageImages(){R=S.images;
 return {title:_("Site images"),back:"#",html:`<p class="hint">${_("Paste an image link (URL) for each spot on the site.")}</p>`+Object.keys(NAMES).map(k=>`<div class="card"><h3>${_(NAMES[k])}</h3>${pv(k+".url",{type:"image",url:get(k+".url")})}${field(_("Image link (URL)"),k+".url","https://...")}${field(_("Title"),k+".title")}</div>`).join("")}}
function pageContact(){R=S.contact;
 return {title:_("Contact buttons"),back:"#",html:`<p class="hint">${_("Floating buttons on the site. Leave a field empty to hide its button.")}</p><div class="card">${field(_("WhatsApp number (country code, digits only)"),"whatsapp","201012345678")}${field(_("Facebook link"),"facebook","https://facebook.com/...")}${field(_("Email address"),"email","name@example.com")}</div>`}}
function pageStats(){return {title:_("Visits"),back:"#",html:`<div id="vstats" class="hint">${_("Loading…")}</div>`,after:renderStats}}
function pageBackup(){return {title:_("Backup & restore"),back:"#",html:`<div class="card"><h3>${_("Export")}</h3><p>${_("Download all your content as a JSON file.")}</p><button class="btn block" id="exp">${_("Export data")}</button></div>
 <div class="card"><h3>${_("Import")}</h3><p>${_("Load a previously exported file. It replaces the current content, then press Save.")}</p><label class="btn block" style="margin:0">${_("Import data")}<input type="file" id="imp" accept=".json" hidden></label></div>`,
 after(){$("#exp").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,1)],{type:"application/json"}));a.download="site-data.json";a.click()};
  $("#imp").onchange=async e=>{try{S=norm(JSON.parse(await e.target.files[0].text()));dirty=true;bar();toast(_("Imported. Press Save"))}catch{toast(_("Invalid file"))}}}}}
function pageSections(){
 return {title:_("Sections"),back:"#",html:`<a class="btn gold block" href="#/sections/new">${_("+ Add section")}</a><h2 class="sh">${_("All sections")}</h2>`
  +(S.sections.length?`<div class="list">${S.sections.map((s,i)=>`<div class="row"><a class="rl" href="#/sections/${s.id}"><span class="th">${s.image.url?`<img src="${esc(s.image.url)}" alt="" onerror="this.remove()">`:""}</span><span class="tx"><b>${esc(s.title||_("Untitled"))}</b><small>${cnt(s)} ${_("items")} &middot; ${s.subs.length} ${_("subsections")}</small></span><i class="chev">&#8250;</i></a>${mv("sections",i)}</div>`).join("")}</div>`:`<div class="empty">${_("No sections yet.")}</div>`)}}
const itemRow=(x,i,spec,href)=>`<div class="row"><a class="rl" href="${href}"><span class="th">${thumbImg(x)}</span><span class="tx"><b>${esc(x.title||_("Untitled"))}</b><small><u class="bd" style="text-decoration:none">${x.type==="video"?_("Video"):_("Image")}</u></small></span><i class="chev">&#8250;</i></a>${mv(spec,i)}</div>`;
function itemsBlock(cont,spec,base){return `<h2 class="sh">${_("Items")} (${cont.items.length})<a class="btn gold" href="${base}/item/new">${_("+ Add item")}</a></h2>`
 +(cont.items.length?`<div class="list">${cont.items.map((x,i)=>itemRow(x,i,spec,`${base}/item/${x.id}`)).join("")}</div>`:`<div class="empty">${_("No items yet. Add an image or a video.")}</div>`)}
function pageSecEdit(sec){const key=location.hash,isNew=!sec;
 const o=sec||getDraft(key,()=>({id:uid(),title:"",desc:"",image:blankImg(),items:[],subs:[]}));R=o;const base=`#/sections/${o.id}`;
 let h=`<div class="card">${field(_("Title"),"title",_("e.g. Short Films"))}${area(_("Description"),"desc")}</div>
 <div class="card"><h3>${_("Arabic version (optional)")}</h3>${rtl(field(_("Title (Arabic)"),"title_ar"))}${rtl(area(_("Description (Arabic)"),"desc_ar"))}</div>
 <div class="card"><h3>${_("Cover image")}</h3>${pv("image.url",{type:"image",url:o.image.url})}${field(_("Image link (URL)"),"image.url","https://...")}</div>`;
 if(isNew)h+=`<p class="hint">${_("After adding the section you can add items (images and videos) and subsections.")}</p>`;
 else{h+=itemsBlock(o,`items:${o.id}`,base);
  h+=`<h2 class="sh">${_("Subsections")} (${o.subs.length})<a class="btn" href="${base}/sub/new">${_("+ Add subsection")}</a></h2><p class="hint" style="margin-top:-4px">${_('Optional groups inside this section, e.g. "Short Films".')}</p>`
   +(o.subs.length?`<div class="list">${o.subs.map((b,i)=>`<div class="row"><a class="rl" href="${base}/sub/${b.id}"><span class="th">${b.items[0]?thumbImg(b.items[0]):""}</span><span class="tx"><b>${esc(b.title||_("Untitled"))}</b><small>${b.items.length} ${_("items")}</small></span><i class="chev">&#8250;</i></a>${mv("subs:"+o.id,i)}</div>`).join("")}</div>`:"")
   +delBtn("sections",o.id,_("Delete this section"))}
 return {title:isNew?_("New section"):_("Edit section"),back:"#/sections",html:h,
  add:isNew?{label:_("Add section"),commit:()=>S.sections.push(o),next:base}:null,check:()=>o.title.trim()?"":_("Enter a section title")}}
function pageSubEdit(sec,sub){const key=location.hash,isNew=!sub;
 const o=sub||getDraft(key,()=>({id:uid(),title:"",desc:"",image:blankImg(),items:[]}));R=o;const base=`#/sections/${sec.id}/sub/${o.id}`;
 let h=`<p class="crumb">${esc(sec.title)}</p><div class="card">${field(_("Subsection title"),"title",_("e.g. Short Films"))}${rtl(field(_("Title (Arabic, optional)"),"title_ar"))}</div>`;
 if(!isNew)h+=itemsBlock(o,`items:${sec.id}:${o.id}`,base)+delBtn("subs:"+sec.id,o.id,_("Delete this subsection"));
 else h+=`<p class="hint">${_("After adding the subsection you can add items to it.")}</p>`;
 return {title:isNew?_("New subsection"):_("Edit subsection"),back:`#/sections/${sec.id}`,html:h,
  add:isNew?{label:_("Add subsection"),commit:()=>sec.subs.push(o),next:base}:null,check:()=>o.title.trim()?"":_("Enter a title")}}
function pageItem(sec,sub,iid){const cont=sub||sec,isNew=iid==="new",spec=sub?`items:${sec.id}:${sub.id}`:`items:${sec.id}`;
 const back=sub?`#/sections/${sec.id}/sub/${sub.id}`:`#/sections/${sec.id}`;
 const o=isNew?getDraft(location.hash,()=>({id:uid(),type:"image",title:"",desc:"",url:"",thumb:""})):cont.items.find(x=>x.id===iid);
 if(!o)return null;R=o;const v=o.type==="video";
 const h=`<p class="crumb">${esc(sec.title)}${sub?" &rsaquo; "+esc(sub.title):""}</p>
 <div class="card"><h3>${_("Preview")}</h3>${pv("item",o)}<div class="seg"><button data-a="type" data-v="image" class="${v?"":"on"}">${_("Image")}</button><button data-a="type" data-v="video" class="${v?"on":""}">${_("Video")}</button></div></div>
 <div class="card">${field(v?_("Video link (YouTube, Vimeo or .mp4)"):_("Image link (URL)"),"url",v?"https://youtube.com/watch?v=...":"https://...")}
 ${v?field(_("Cover image link (optional, YouTube is automatic)"),"thumb","https://..."):""}${field(_("Title"),"title")}${area(_("Description"),"desc")}</div>
 <div class="card"><h3>${_("Arabic version (optional)")}</h3>${rtl(field(_("Title (Arabic)"),"title_ar"))}${rtl(area(_("Description (Arabic)"),"desc_ar"))}</div>`
  +(isNew?"":delBtn(spec,o.id,_("Delete this item")));
 return {title:isNew?_("New item"):_("Edit item"),back,html:h,add:isNew?{label:_("Add item"),commit:()=>cont.items.push(o),next:back}:null,check:()=>o.url.trim()?"":_("Add a media link")}}
async function renderStats(){const el=$("#vstats");if(!el)return;
 try{const s=await loadStats(),D=s.days||{},n=k=>D[dayKey(k)]||0,sum=c=>{let t=0;for(let i=0;i<c;i++)t+=n(i);return t};
  const last=[...Array(14)].map((_,i)=>13-i),max=Math.max(1,...last.map(n));
  const card=(b,l)=>`<div class="vcard"><b>${b}</b><span>${l}</span></div>`;
  el.className="";el.innerHTML=`<div class="vcards">${card(s.total||0,_("Total visits"))}${card(s.unique||0,_("Unique visitors"))}${card(n(0),_("Today"))}${card(sum(7),_("Last 7 days"))}${card(sum(30),_("Last 30 days"))}</div>
  <h4>${_("Last 14 days")}</h4><div class="vbars">${last.map(k=>`<div class="vbar" title="${dayKey(k)}: ${n(k)}"><i style="height:${Math.round(n(k)/max*100)}%"></i><em>${n(k)}</em><small>${dayKey(k).slice(8)}</small></div>`).join("")}</div>
  <p class="hint" style="margin-top:12px">${isCloud()?_("A visit = one browser session on the public site. Add ?notrack to the site URL once on your own devices to exclude them."):_("Local demo mode: counts only this browser.")}</p><button class="btn" id="vref">${_("Refresh")}</button>`;
  $("#vref").onclick=()=>{el.className="hint";el.textContent=_("Loading…");renderStats()}}
 catch(e){el.className="err";el.textContent=_("Could not load visits: ")+e.message}}

/* ---------- router ---------- */
function route(p){const [a,sid,k,bid,k2,iid]=p;
 if(!a)return pageHome();
 if(a==="images")return pageImages();if(a==="contact")return pageContact();if(a==="stats")return pageStats();if(a==="backup")return pageBackup();
 if(a==="sections"){if(!sid)return pageSections();if(sid==="new")return pageSecEdit(null);
  const sec=secBy(sid);if(!sec)return null;if(!k)return pageSecEdit(sec);
  if(k==="item")return pageItem(sec,null,bid);
  if(k==="sub"){if(bid==="new")return pageSubEdit(sec,null);const sub=sec.subs.find(b=>b.id===bid);if(!sub)return null;
   if(!k2)return pageSubEdit(sec,sub);if(k2==="item")return pageItem(sec,sub,iid)}}
 return null}
function render(keep){const y=scrollY,key=location.hash;if(draft&&draft.key!==key)draft=null;R=null;
 let pg=null;try{pg=route(key.replace(/^#\/?/,"").split("/").filter(Boolean))}catch(e){console.error(e)}
 if(!pg){location.hash="";return}
 cur=pg;const back=pg.back;
 $("#ttl").textContent=pg.title;$("#back").hidden=!back;$("#logo").hidden=!!back;$("#back").onclick=()=>{draft=null;location.hash=back};
 $("#view").innerHTML=pg.html;pg.after&&pg.after();bar();scrollTo(0,keep?y:0)}
function bar(){const el=$("#savebar");if(!cur){el.hidden=true;return}
 if(cur.add){el.innerHTML=`<button class="btn ghost" data-a="cancel">${_("Cancel")}</button><button class="btn gold" data-a="add">${cur.add.label}</button>`;el.hidden=false}
 else if(dirty){el.innerHTML=`<span>${_("Unsaved changes")}</span><button class="btn gold" data-a="save">${_("Save")}</button>`;el.hidden=false}
 else el.hidden=true}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2200)}
async function doSave(){try{await save(S);dirty=false;toast(_("Saved"));bar()}catch(e){toast(_("Save failed: ")+e.message)}}

/* ---------- events ---------- */
document.addEventListener("input",e=>{const p=e.target.dataset?.f;if(!p||!R)return;put(p,e.target.value);
 if(!cur.add&&!dirty){dirty=true;bar()}
 document.querySelectorAll("[data-pv]").forEach(el=>{const k=el.dataset.pv;el.innerHTML=mediaPrev(k==="item"?R:{type:"image",url:get(k)})})});
document.addEventListener("click",async e=>{const b=e.target.closest("[data-a]");if(!b)return;const a=b.dataset.a;
 if(a==="mv"){const L=listFor(b.dataset.l),i=+b.dataset.i,j=i+ +b.dataset.d;if(j<0||j>=L.length)return;[L[i],L[j]]=[L[j],L[i]];dirty=true;render(true)}
 else if(a==="del"){if(!confirm(_("Delete this? This cannot be undone.")))return;const L=listFor(b.dataset.l),i=L.findIndex(x=>x.id===b.dataset.id);if(i>-1)L.splice(i,1);dirty=true;location.hash=cur.back}
 else if(a==="type"){R.type=b.dataset.v;if(!cur.add)dirty=true;render(true)}
 else if(a==="save")doSave();
 else if(a==="cancel"){draft=null;location.hash=cur.back}
 else if(a==="add"){const err=cur.check&&cur.check();if(err){toast(err);return}
  cur.add.commit();draft=null;const next=cur.add.next;
  try{await save(S);dirty=false;toast(_("Added"))}catch(x){dirty=true;toast(_("Save failed: ")+x.message)}
  location.hash=next}});
addEventListener("hashchange",()=>{if(S)render()});
$("#out").onclick=async()=>{if(dirty&&!confirm(_("You have unsaved changes. Sign out anyway?")))return;dirty=false;await logout();location.reload()};
$("#loginForm").onsubmit=async e=>{e.preventDefault();$("#err").textContent="";try{await login(window.ADMIN_EMAIL||$("#email").value,$("#pw").value)
 if(!isCloud())start()}catch(x){$("#err").textContent=/auth\//.test(x.message)?(/network/.test(x.message)?_("No connection"):/operation-not-allowed/.test(x.message)?_("Email/Password sign-in is not enabled in Firebase"):_("Wrong password")):x.message}};
addEventListener("beforeunload",e=>{if(dirty)e.preventDefault()});
async function start(){S=await load();$("#loginView").hidden=true;$("#app").hidden=false;render()}
if(!isCloud()||window.ADMIN_EMAIL)$("#emailRow").hidden=true;
onAuth(u=>u?start():($("#app").hidden=true,$("#loginView").hidden=false));

function applyStatic(){document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 document.querySelectorAll("[data-i]").forEach(e=>e.textContent=_(e.dataset.i));
 document.title=_("Admin | Mohand");document.querySelectorAll(".langbtn").forEach(b=>b.textContent=lang==="ar"?"English":"عربي");
 $("#back").setAttribute("aria-label",_("Back"))}
function toggleLang(){lang=lang==="ar"?"en":"ar";try{localStorage.setItem("alang",lang)}catch{}applyStatic();$("#err").textContent="";if(S&&cur)render(true)}
document.querySelectorAll(".langbtn").forEach(b=>b.onclick=toggleLang);
applyStatic();
