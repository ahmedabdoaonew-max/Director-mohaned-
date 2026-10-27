const KEY="mohand_site_v3",B="https://www.gstatic.com/firebasejs/10.12.2/";
const im=(url,title="",desc="")=>({url,title,desc});
const U=id=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=80`;
const it=(type,title,desc,url,thumb,title_ar="",desc_ar="")=>({id:uid(),type,title,desc,url,thumb,title_ar,desc_ar});
export const uid=()=>Math.random().toString(36).slice(2,9);
export const blankImg=()=>im("","","");
const YT="https://www.youtube.com/watch?v=aqz-KE-bpKQ";
export const DEFAULTS=()=>({
 images:{hero:im(U("1536440136628-849c177e76a1"),"Hero background","Cinematic set"),about:im(U("1485846234645-a62644f84728"),"On set","Behind the scenes"),
  svc1:im(U("1478720568477-152d9b164e26"),"Direction",""),svc2:im(U("1492691527719-9d1e07e534b4"),"Cinematography",""),svc3:im(U("1574717024653-61fd2cf4d44d"),"Production","")},
 contact:{whatsapp:"",facebook:"",email:""},
 sections:[
  {id:"narrative",title:"Narrative",title_ar:"روائي",desc:"Short films and stories.",desc_ar:"أفلام قصيرة وقصص.",image:im(U("1492691527719-9d1e07e534b4"),"Narrative"),subs:[],
   items:[it("video","Midnight Echo","A short film about silence, memory and the cost of returning home.",YT,U("1492691527719-9d1e07e534b4"),"صدى منتصف الليل","فيلم قصير عن الصمت والذاكرة وثمن العودة إلى البيت."),
    it("image","Quiet Rooms","Three characters, one apartment, one overdue conversation.",U("1500530855697-b586d89ba3ee"),"","غرف هادئة","ثلاث شخصيات وشقة واحدة وحديث تأخر كثيرًا.")]},
  {id:"commercial",title:"Commercial",title_ar:"إعلانات",desc:"Campaigns and brand films.",desc_ar:"حملات وأفلام للعلامات التجارية.",image:im(U("1524758631624-e2822e304c36"),"Commercial"),subs:[],
   items:[it("video","Brand Pulse","Motion, energy and a clear visual narrative.",YT,U("1524758631624-e2822e304c36"),"نبض العلامة","حركة وطاقة وسرد بصري واضح.")]},
  {id:"documentary",title:"Documentary",title_ar:"وثائقي",desc:"Real people, real places.",desc_ar:"ناس حقيقيون وأماكن حقيقية.",image:im(U("1522202176988-66273c2fd55f"),"Documentary"),subs:[],
   items:[it("video","Hands of the Desert","A quiet portrait of a family that still crosses the dunes by foot.",YT,U("1522202176988-66273c2fd55f"),"أيادي الصحراء","بورتريه هادئ لعائلة ما زالت تعبر الكثبان سيرًا على الأقدام.")]}]});
let fb=null;
async function fire(){if(fb||!window.FIREBASE_CONFIG)return fb;
 const [a,f,au]=await Promise.all(["app","firestore","auth"].map(n=>import(B+`firebase-${n}.js`)));
 const app=a.initializeApp(window.FIREBASE_CONFIG);fb={f,au,db:f.getFirestore(app),auth:au.getAuth(app)};return fb}
export const isCloud=()=>!!window.FIREBASE_CONFIG;
export function norm(d){const x=DEFAULTS();d=d&&d.sections?d:x;d.images={...x.images,...d.images};d.contact={...x.contact,...d.contact};
 const dm=Object.fromEntries(x.sections.map(q=>[q.id,q]));
 d.sections.forEach(s=>{const q=dm[s.id];if(q){s.title_ar??=q.title_ar;s.desc_ar??=q.desc_ar}s.items??=[];s.subs??=[];s.image??=blankImg();s.subs.forEach(b=>{b.items??=[];b.image??=blankImg()})});return d}
export async function load(){
 try{const x=await fire();if(x){const s=await x.f.getDoc(x.f.doc(x.db,"site","main"));return norm(s.exists()?s.data():null)}}catch(e){console.warn("Cloud load failed",e)}
 try{return norm(JSON.parse(localStorage.getItem(KEY)))}catch{return norm(null)}}
export async function save(d){const x=await fire();
 if(x){await x.f.setDoc(x.f.doc(x.db,"site","main"),JSON.parse(JSON.stringify(d)));return}
 localStorage.setItem(KEY,JSON.stringify(d))}
export async function login(email,pw){const x=await fire();
 if(x){await x.au.signInWithEmailAndPassword(x.auth,email,pw);return}
 if(pw!==window.LOCAL_ADMIN_CODE)throw new Error("Wrong code");sessionStorage.adm="1"}
export async function logout(){const x=await fire();if(x)await x.au.signOut(x.auth);sessionStorage.removeItem("adm")}
export async function onAuth(cb){const x=await fire();if(x)x.au.onAuthStateChanged(x.auth,cb);else cb(sessionStorage.adm==="1"?{}:null)}

// ---- visit counter ----
const SKEY="mohand_stats_v1",TZ="Africa/Cairo";
export const dayKey=(off=0)=>new Date(Date.now()-off*864e5).toLocaleDateString("en-CA",{timeZone:TZ});
export async function trackVisit(){
 try{
  if(location.search.includes("notrack"))localStorage.setItem("mv_skip","1");
  if(localStorage.getItem("mv_skip")||sessionStorage.getItem("mv"))return;
  sessionStorage.setItem("mv","1");
  const isNew=!localStorage.getItem("mv_u");localStorage.setItem("mv_u","1");
  const d=dayKey(),x=await fire();
  if(x){await x.f.setDoc(x.f.doc(x.db,"stats","visits"),{total:x.f.increment(1),unique:x.f.increment(isNew?1:0),days:{[d]:x.f.increment(1)}},{merge:true});return}
  const s=JSON.parse(localStorage.getItem(SKEY)||'{"total":0,"unique":0,"days":{}}');
  s.total++;if(isNew)s.unique++;s.days[d]=(s.days[d]||0)+1;localStorage.setItem(SKEY,JSON.stringify(s));
 }catch(e){console.warn("visit not counted",e)}}
export async function loadStats(){
 const x=await fire(),blank={total:0,unique:0,days:{}};
 if(x){const s=await x.f.getDoc(x.f.doc(x.db,"stats","visits"));return s.exists()?{...blank,...s.data()}:blank}
 try{return {...blank,...JSON.parse(localStorage.getItem(SKEY))}}catch{return blank}}
