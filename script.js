/* ==================== CONFIGURATION ==================== */
const ROLES={coordinateur:'Coordinateur',prefet:"Prefet d'etablissement",enseignant:'Enseignant',eleve:'Eleve',parent:'Parent'};
const ROLE_ICONS={coordinateur:'fa-building-columns',prefet:'fa-shield-halved',enseignant:'fa-chalkboard-user',eleve:'fa-user-graduate',parent:'fa-people-roof'};
const NAV_ITEMS={
  coordinateur:[
    {id:'dashboard',icon:'fa-chart-line',label:'Tableau de bord'},
    {id:'rapports',icon:'fa-file-lines',label:'Rapports'},
    {id:'communications',icon:'fa-bullhorn',label:'Communications'},
    {id:'messages',icon:'fa-comments',label:'Messages'},
    {id:'assistant',icon:'fa-robot',label:'Assistant IA'},
    {id:'parametres',icon:'fa-gear',label:'Parametres'}
  ],
  prefet:[
    {id:'dashboard',icon:'fa-chart-line',label:'Tableau de bord'},
    {id:'eleves',icon:'fa-users',label:'Eleves'},
    {id:'rapports',icon:'fa-file-lines',label:'Rapports'},
    {id:'communications',icon:'fa-bullhorn',label:'Communications'},
    {id:'messages',icon:'fa-comments',label:'Messages'},
    {id:'paiements',icon:'fa-money-bill-wave',label:'Paiements'},
    {id:'points',icon:'fa-star',label:'Points'},
    {id:'utilisateurs',icon:'fa-user-gear',label:'Utilisateurs'},
    {id:'assistant',icon:'fa-robot',label:'Assistant IA'},
    {id:'parametres',icon:'fa-gear',label:'Parametres'}
  ],
  enseignant:[
    {id:'dashboard',icon:'fa-chart-line',label:'Tableau de bord'},
    {id:'eleves',icon:'fa-users',label:'Eleves'},
    {id:'rapports',icon:'fa-file-lines',label:'Rapports'},
    {id:'messages',icon:'fa-comments',label:'Messages'},
    {id:'points',icon:'fa-star',label:'Points'},
    {id:'assistant',icon:'fa-robot',label:'Assistant IA'},
    {id:'parametres',icon:'fa-gear',label:'Parametres'}
  ],
  eleve:[
    {id:'dashboard',icon:'fa-chart-line',label:'Tableau de bord'},
    {id:'messages',icon:'fa-comments',label:'Messages'},
    {id:'points',icon:'fa-star',label:'Mes Points'},
    {id:'assistant',icon:'fa-robot',label:'Assistant IA'},
    {id:'parametres',icon:'fa-gear',label:'Parametres'}
  ],
  parent:[
    {id:'dashboard',icon:'fa-chart-line',label:'Tableau de bord'},
    {id:'messages',icon:'fa-comments',label:'Messages'},
    {id:'paiements',icon:'fa-money-bill-wave',label:'Paiements'},
    {id:'points',icon:'fa-star',label:'Points'},
    {id:'assistant',icon:'fa-robot',label:'Assistant IA'},
    {id:'parametres',icon:'fa-gear',label:'Parametres'}
  ]
};
const OPS=[
  {id:'airtel',name:'Airtel Money',color:'#ED1C24',icon:'fa-mobile-screen'},
  {id:'vodacom',name:'Vodacom M-Pesa',color:'#E60000',icon:'fa-mobile-screen'},
  {id:'orange',name:'Orange Money',color:'#FF6600',icon:'fa-mobile-screen'},
  {id:'africell',name:'Africell Money',color:'#F7941D',icon:'fa-mobile-screen'}
];

/* ==================== BASE DE DONNEES ==================== */
const DB={
  _k:'edugest_pro_v2',
  _def:{
    schools:[
      {id:1,name:'Institut Mwanga',address:'Av. Kalemie, Uvira',code:'MW2025XYZ',logo:''},
      {id:2,name:'College Alfajiri',address:'Qt. Mulongwe, Uvira',code:'AL2025ABC',logo:''}
    ],
    users:[
      {id:1,name:'Jean Mukendi',email:'coord@edugest.pro',pw:'Admin@2025',role:'coordinateur',schoolId:1,phone:'+243 995 123 456',active:true},
      {id:2,name:'Marie Kashala',email:'prefet@edugest.pro',pw:'Prefet@2025',role:'prefet',schoolId:2,phone:'+243 996 234 567',active:true},
      {id:3,name:'Pierre Nyota',email:'prof@edugest.pro',pw:'Prof@2025',role:'enseignant',schoolId:1,phone:'+243 997 345 678',active:true},
      {id:4,name:'Amani Bahati',email:'eleve@edugest.pro',pw:'Eleve@2025',role:'eleve',schoolId:1,phone:'+243 998 456 789',active:true,class:'6eme A',parentId:5,dob:'2008-05-14',matricule:'MW-2025-001'},
      {id:5,name:'Fatuma Kiza',email:'parent@edugest.pro',pw:'Parent@2025',role:'parent',schoolId:1,phone:'+243 999 567 890',active:true,childId:4},
      {id:6,name:'Grace Mwenze',email:'grace@edugest.pro',pw:'Grace@2025',role:'enseignant',schoolId:2,phone:'+243 991 678 901',active:true},
      {id:7,name:'David Lushima',email:'david@edugest.pro',pw:'David@2025',role:'eleve',schoolId:2,phone:'+243 992 789 012',active:true,class:'5eme B',parentId:8,dob:'2009-08-22',matricule:'AL-2025-001'},
      {id:8,name:'Asha Ramazani',email:'asha@edugest.pro',pw:'Asha@2025',role:'parent',schoolId:2,phone:'+243 993 890 123',active:true,childId:7},
      {id:9,name:'Paul Kabongo',email:'paul@edugest.pro',pw:'Paul@2025',role:'prefet',schoolId:1,phone:'+243 994 901 234',active:true},
      {id:10,name:'Sylvie Mpinga',email:'sylvie@edugest.pro',pw:'Sylvie@2025',role:'eleve',schoolId:1,phone:'+243 985 012 345',active:true,class:'6eme A',parentId:5,dob:'2008-11-03',matricule:'MW-2025-002'},
      {id:11,name:'Jacques Ilunga',email:'jacques@edugest.pro',pw:'Jacques@2025',role:'eleve',schoolId:1,phone:'+243 986 123 456',active:true,class:'5eme A',parentId:null,dob:'2009-02-18',matricule:'MW-2025-003'}
    ],
    messages:[
      {id:1,from:1,to:3,text:'Bonjour Pierre, etat du rapport pedagogique ?',ts:'2025-02-20T09:30:00',read:true,img:null},
      {id:2,from:3,to:1,text:'Presque fini, je vous l\'envoie ce soir.',ts:'2025-02-20T09:45:00',read:true,img:null},
      {id:3,from:5,to:4,text:'Amani, as-tu recu tes notes ?',ts:'2025-02-21T14:00:00',read:true,img:null},
      {id:4,from:4,to:5,text:'Oui maman, 14/20 en maths !',ts:'2025-02-21T14:15:00',read:true,img:null}
    ],
    reports:[
      {id:1,type:'pedagogique',title:'Rapport pedagogique T1',content:'Bilan du premier trimestre...',authorId:3,schoolId:1,status:'depose_prefet',toId:9,createdAt:'2025-02-15T10:00:00',updatedAt:'2025-02-15T10:00:00'},
      {id:2,type:'discipline',title:'Rapport de discipline - Fevrier',content:'Incidents de discipline...',authorId:3,schoolId:1,status:'brouillon',toId:null,createdAt:'2025-02-20T08:00:00',updatedAt:'2025-02-20T08:00:00'},
      {id:3,type:'activite',title:'Rapport d\'activite culturelle',content:'La journee culturelle s\'est bien deroulee...',authorId:9,schoolId:1,status:'depose_coord',toId:1,createdAt:'2025-02-25T14:00:00',updatedAt:'2025-02-25T14:00:00'}
    ],
    communications:[
      {id:1,authorId:1,schoolId:0,title:'Calendrier scolaire 2025-2026',content:'Voici le calendrier officiel...',img:null,scope:'prefets',priority:'haute',createdAt:'2025-01-05T08:00:00'},
      {id:2,authorId:9,schoolId:1,title:'Reprise des cours le 6 janvier',content:'Tous les eleves doivent etre presents...',img:null,scope:'ecole',priority:'haute',createdAt:'2025-01-03T10:00:00'},
      {id:3,authorId:9,schoolId:1,title:'Examen du 2eme trimestre',content:'Les examens commenceront le 15 avril...',img:null,scope:'ecole',priority:'moyenne',createdAt:'2025-03-10T09:00:00'}
    ],
    payments:[
      {id:1,schoolId:1,studentId:4,amount:50000,paid:50000,status:'paid',term:'T1 2025',method:'airtel',phone:'0995456789',ref:'PAY-2025-001',date:'2025-01-10',receiptNo:'REC-MW-001'},
      {id:2,schoolId:1,studentId:4,amount:50000,paid:20000,status:'partial',term:'T2 2025',method:'vodacom',phone:'0995456789',ref:'PAY-2025-002',date:'2025-04-01',receiptNo:'REC-MW-002'},
      {id:3,schoolId:2,studentId:7,amount:45000,paid:45000,status:'paid',term:'T1 2025',method:'orange',phone:'0996234567',ref:'PAY-2025-003',date:'2025-01-15',receiptNo:'REC-AL-001'},
      {id:4,schoolId:2,studentId:7,amount:45000,paid:0,status:'unpaid',term:'T2 2025',method:'',phone:'',ref:'',date:'',receiptNo:''}
    ],
    points:[
      {id:1,studentId:4,teacherId:3,category:'comportement',value:3,comment:'Bon comportement en classe',date:'2025-02-10'},
      {id:2,studentId:4,teacherId:3,category:'participation',value:2,comment:'Participation active',date:'2025-02-12'},
      {id:3,studentId:4,teacherId:3,category:'devoir',value:-1,comment:'Devoir non remis',date:'2025-02-15'},
      {id:4,studentId:10,teacherId:3,category:'examen',value:4,comment:'Excellente copie',date:'2025-02-18'},
      {id:5,studentId:11,teacherId:3,category:'comportement',value:-2,comment:'Trouble en classe',date:'2025-02-20'},
      {id:6,studentId:7,teacherId:6,category:'participation',value:2,comment:'Bonne participation',date:'2025-02-22'}
    ],
    notifications:[
      {id:1,userId:1,text:'Rapport recu du prefet Paul Kabongo',read:false,ts:'2025-02-25T14:00:00',type:'report'},
      {id:2,userId:9,text:'Nouveau rapport de Pierre Nyota',read:false,ts:'2025-02-15T10:00:00',type:'report'},
      {id:3,userId:3,text:'Message de Jean Mukendi',read:false,ts:'2025-02-20T09:30:00',type:'message'},
      {id:4,userId:4,text:'Vos points ont ete mis a jour',read:false,ts:'2025-02-15T10:00:00',type:'points'}
    ],
    aiChats:{},
    nextId:{users:12,messages:5,reports:4,communications:4,payments:5,points:7,notifications:5}
  },
  init(){if(!localStorage.getItem(this._k))localStorage.setItem(this._k,JSON.stringify(this._def))},
  _g(){return JSON.parse(localStorage.getItem(this._k))},
  _s(d){localStorage.setItem(this._k,JSON.stringify(d))},
  get(k){return this._g()[k]||[]},
  set(k,v){const d=this._g();d[k]=v;this._s(d)},
  nid(k){const d=this._g();const id=d.nextId[k]||1;d.nextId[k]=id+1;this._s(d);return id},
  add(k,it){const d=this._g();it.id=this.nid(k);d[k].push(it);this._s(d);return it},
  upd(k,id,u){const d=this._g();const i=d[k].findIndex(x=>x.id===id);if(i>-1){Object.assign(d[k][i],u);this._s(d)}return d[k][i]},
  rm(k,id){const d=this._g();d[k]=d[k].filter(x=>x.id!==id);this._s(d)},
  find(k,id){return this.get(k).find(x=>x.id===id)},
  reset(){localStorage.setItem(this._k,JSON.stringify(this._def))}
};

/* ==================== ETAT GLOBAL ==================== */
let CU=null; // current user
let CP='dashboard'; // current page
let SBO=false; // sidebar open
let NPO=false; // notif panel open
let SEL_CONV=null; // selected conversation
let IMG_CB=null; // image upload callback
let CHARTS={};

/* ==================== UTILITAIRES ==================== */
function toast(msg,type='ok'){
  const c=document.getElementById('toasts');
  const t=document.createElement('div');
  t.className=`toast t-${type}`;
  t.innerHTML=`<i class="fas fa-${type==='ok'?'check-circle':type==='er'?'times-circle':type==='wa'?'exclamation-triangle':'info-circle'}"></i>${msg}`;
  c.appendChild(t);
  setTimeout(()=>{t.classList.add('rm');setTimeout(()=>t.remove(),300)},3000);
}
function showModal(title,bodyHtml,footHtml=''){
  const m=document.getElementById('modal-c');
  m.innerHTML=`<div class="mb"><div class="mh"><h3>${title}</h3><button class="mx" onclick="hideModal()"><i class="fas fa-times"></i></button></div><div class="mbody">${bodyHtml}</div>${footHtml?`<div class="mfoot">${footHtml}</div>`:''}</div>`;
  m.classList.remove('hidden');
}
function hideModal(){document.getElementById('modal-c').classList.add('hidden')}
function getUser(id){return DB.find('users',id)}
function getSchool(id){return DB.find('schools',id)}
function getSchoolUsers(sid){return DB.get('users').filter(u=>u.schoolId===sid&&u.active)}
function getSchoolStudents(sid){return DB.get('users').filter(u=>u.schoolId===sid&&u.role==='eleve'&&u.active)}
function getSchoolTeachers(sid){return DB.get('users').filter(u=>u.schoolId===sid&&u.role==='enseignant'&&u.active)}
function initials(name){return name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)}
function fmtDate(d){if(!d)return'-';const dt=new Date(d);return dt.toLocaleDateString('fr-FR',{day:'2-digit',month:'short',year:'numeric'})}
function fmtTime(d){if(!d)return'';const dt=new Date(d);return dt.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}
function fmtMoney(n){return new Intl.NumberFormat('fr-FR').format(n)+' CDF'}
function genCode(){const c='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';let r='';for(let i=0;i<8;i++)r+=c[Math.floor(Math.random()*c.length)];return r}
function genRef(){return 'PAY-'+Date.now().toString(36).toUpperCase()}
function genReceiptNo(sid){const s=getSchool(sid);const pre=s?s.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2):'XX';return `REC-${pre}-${String(DB.get('payments').length+1).padStart(3,'0')}`}

/* ==================== AUTH ==================== */
function showScreen(id){
  ['login-screen','register-screen'].forEach(s=>document.getElementById(s).classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
function fillL(e,p){document.getElementById('l-email').value=e;document.getElementById('l-pass').value=p}
function togglePw(id){const i=document.getElementById(id);i.type=i.type==='password'?'text':'password'}
function checkPwStr(){
  const p=document.getElementById('r-pass').value;let s=0;
  if(p.length>=8)s++;if(/[A-Z]/.test(p))s++;if(/[0-9]/.test(p))s++;if(/[^A-Za-z0-9]/.test(p))s++;
  const bar=document.getElementById('pw-str-bar');
  bar.style.width=(s*25)+'%';
  bar.style.background=s<2?'var(--err)':s<3?'var(--warn)':'var(--ok)';
}
function toggleRegCode(){
  const r=document.getElementById('r-role').value;
  document.getElementById('r-code-grp').classList.toggle('hidden',r==='');
}
function doLogin(e){
  e.preventDefault();
  const email=document.getElementById('l-email').value.trim().toLowerCase();
  const pass=document.getElementById('l-pass').value;
  const u=DB.get('users').find(x=>x.email.toLowerCase()===email&&x.pw===pass);
  if(!u){toast('Email ou mot de passe incorrect','er');return}
  if(!u.active){toast('Compte desactive','er');return}
  CU=u;
  sessionStorage.setItem('edugest_session',JSON.stringify({userId:u.id}));
  enterApp();
}
function doRegister(e){
  e.preventDefault();
  const name=document.getElementById('r-name').value.trim();
  const email=document.getElementById('r-email').value.trim().toLowerCase();
  const phone=document.getElementById('r-phone').value.trim();
  const role=document.getElementById('r-role').value;
  const code=document.getElementById('r-code').value.trim().toUpperCase();
  const pw=document.getElementById('r-pass').value;
  const pw2=document.getElementById('r-pass2').value;
  if(!role){toast('Choisissez un role','er');return}
  if(!code){toast('Entrez le code d\'etablissement','er');return}
  if(pw!==pw2){toast('Les mots de passe ne correspondent pas','er');return}
  if(pw.length<8){toast('Mot de passe trop court (min. 8)','er');return}
  const school=DB.get('schools').find(s=>s.code===code);
  if(!school){toast('Code d\'etablissement invalide','er');return}
  if(DB.get('users').find(u=>u.email.toLowerCase()===email)){toast('Cet email est deja utilise','er');return}
  const newUser={id:0,name,email,pw,role,schoolId:school.id,phone,active:true};
  if(role==='eleve'){newUser.class='Nouveau';newUser.matricule=school.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)+'-'+new Date().getFullYear()+'-'+String(DB.get('users').filter(u=>u.role==='eleve'&&u.schoolId===school.id).length+1).padStart(3,'0');newUser.dob='';newUser.parentId=null}
  if(role==='parent'){newUser.childId=null}
  DB.add('users',newUser);
  toast('Compte cree avec succes ! Connectez-vous.');
  showScreen('login-screen');
  document.getElementById('reg-form').reset();
}
function checkSession(){
  const s=sessionStorage.getItem('edugest_session');
  if(s){const d=JSON.parse(s);CU=getUser(d.userId);if(CU)enterApp()}
}
function doLogout(){
  CU=null;sessionStorage.removeItem('edugest_session');
  document.getElementById('app').classList.add('hidden');
  showScreen('login-screen');
  document.getElementById('login-form').reset();
}

/* ==================== NAVIGATION ==================== */
function enterApp(){
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('register-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('u-av').textContent=initials(CU.name);
  document.getElementById('u-nm').textContent=CU.name;
  buildNav();
  nav('dashboard');
  updateNotifBadge();
}
function buildNav(){
  const items=NAV_ITEMS[CU.role]||[];
  const unread=getMessageUnreadCount();
  document.getElementById('sb-nav').innerHTML=items.map(i=>{
    let badge='';
    if(i.id==='messages'&&unread>0)badge=`<span class="nb">${unread}</span>`;
    return `<div class="ni${i.id===CP?' act':''}" onclick="nav('${i.id}')"><i class="fas ${i.icon}"></i><span>${i.label}</span>${badge}</div>`;
  }).join('');
}
function nav(page){
  CP=page;
  if(SBO)toggleSB();
  buildNav();
  renderPage();
}
function toggleSB(){
  SBO=!SBO;
  document.getElementById('sidebar').classList.toggle('open',SBO);
  document.getElementById('sb-ov').classList.toggle('hidden',!SBO);
}
function toggleUD(){document.getElementById('u-drop').classList.toggle('hidden')}
function toggleNP(){
  NPO=!NPO;
  const p=document.getElementById('np');
  if(NPO){renderNotifPanel();p.classList.remove('hidden')}else{p.classList.add('hidden')}
}
function updateNotifBadge(){
  const notifs=DB.get('notifications').filter(n=>n.userId===CU.id&&!n.read);
  const b=document.getElementById('n-badge');
  if(notifs.length>0){b.textContent=notifs.length;b.classList.remove('hidden')}else{b.classList.add('hidden')}
}
function renderNotifPanel(){
  const notifs=DB.get('notifications').filter(n=>n.userId===CU.id).sort((a,b)=>new Date(b.ts)-new Date(a.ts)).slice(0,10);
  const colors={report:'bg-a',message:'bg-i',points:'bg-ok',payment:'bg-w',info:'bg-ok'};
  const icons={report:'fa-file-lines',message:'fa-comment',points:'fa-star',payment:'fa-money-bill',info:'fa-info-circle'};
  document.getElementById('np').innerHTML=`
    <div class="np-h"><h3>Notifications</h3><button class="btn btn-s btn-g" onclick="markAllRead()">Tout lire</button></div>
    ${notifs.length?notifs.map(n=>`<div class="ni${n.read?'':' unr'}" onclick="readNotif(${n.id})"><div class="ni-i ${colors[n.type]||'bg-ok'}" style="color:#fff"><i class="fas ${icons[n.type]||'fa-bell'}"></i></div><div><div class="ni-t">${n.text}</div><div class="ni-tm">${fmtDate(n.ts)} ${fmtTime(n.ts)}</div></div></div>`).join(''):'<div class="empty-s" style="padding:30px"><i class="fas fa-bell-slash"></i><p>Aucune notification</p></div>'}`;
}
function readNotif(id){DB.upd('notifications',id,{read:true});updateNotifBadge();renderNotifPanel()}
function markAllRead(){
  DB.get('notifications').filter(n=>n.userId===CU.id&&!n.read).forEach(n=>DB.upd('notifications',n.id,{read:true}));
  updateNotifBadge();renderNotifPanel();toast('Toutes les notifications marquees comme lues');
}
function globalSearch(q){
  if(!q.trim())return;
  // Recherche simple
  const results=[];
  const ql=q.toLowerCase();
  DB.get('users').forEach(u=>{if(u.schoolId===CU.schoolId&&(u.name.toLowerCase().includes(ql)||u.email.toLowerCase().includes(ql)))results.push({type:'user',label:u.name,sub:ROLES[u.role]})});
  DB.get('reports').forEach(r=>{if(r.schoolId===CU.schoolId&&r.title.toLowerCase().includes(ql))results.push({type:'report',label:r.title,sub:r.status})});
  if(results.length)toast(`${results.length} resultat(s) pour "${q}"`,'in');
}

/* ==================== RENDU DES PAGES ==================== */
function renderPage(){
  const c=document.getElementById('content');
  Object.values(CHARTS).forEach(ch=>{if(ch&&ch.destroy)ch.destroy()});CHARTS={};
  switch(CP){
    case 'dashboard':c.innerHTML=renderDashboard();initDashCharts();break;
    case 'eleves':c.innerHTML=renderEleves();break;
    case 'rapports':c.innerHTML=renderRapports();break;
    case 'communications':c.innerHTML=renderCommunications();break;
    case 'messages':c.innerHTML=renderMessages();initMsgList();break;
    case 'paiements':c.innerHTML=renderPaiements();break;
    case 'points':c.innerHTML=renderPoints();break;
    case 'utilisateurs':c.innerHTML=renderUtilisateurs();break;
    case 'assistant':c.innerHTML=renderAssistant();break;
    case 'parametres':c.innerHTML=renderParametres();break;
    default:c.innerHTML='<div class="empty-s"><i class="fas fa-folder-open"></i><p>Page non trouvee</p></div>';
  }
}

/* ==================== TABLEAU DE BORD (FIXÉ) ==================== */
function renderDashboard(){
  const sid=CU.schoolId;
  const students=getSchoolStudents(sid);
  const teachers=getSchoolTeachers(sid);
  const payments=DB.get('payments').filter(p=>p.schoolId===sid);
  const reports=DB.get('reports').filter(r=>r.schoolId===sid);
  const pts=DB.get('points').filter(p=>students.some(s=>s.id===p.studentId));
  const totalPaid=payments.reduce((s,p)=>s+p.paid,0);
  const totalDue=payments.reduce((s,p)=>s+p.amount,0);
  const totalPts=pts.reduce((s,p)=>s+p.value,0);

  const roleTitle=ROLES[CU.role];
  const recentActs=[
    {color:'var(--ok)',text:`${students.length} eleves inscrits cette annee`,time:'Cette saison'},
    {color:'var(--a)',text:`${payments.filter(p=>p.status==='paid').length} paiements completes`,time:'Ce trimestre'},
    {color:'var(--inf)',text:`${reports.filter(r=>r.status!=='brouillon').length} rapports deposés`,time:'En cours'},
    {color:'var(--warn)',text:`${payments.filter(p=>p.status==='unpaid').length} paiements en attente`,time:'Action requise'}
  ];
  if(CU.role==='eleve'){
    const myPts=pts.filter(p=>p.studentId===CU.id).reduce((s,p)=>s+p.value,0);
    const myPay=payments.filter(p=>p.studentId===CU.id);
    return `<div class="dash-wrap">
      <div class="dash-stats">
        <div class="sc"><div class="sci g"><i class="fas fa-star"></i></div><div><div class="scv">${myPts}</div><div class="scl">Mes points</div></div></div>
        <div class="sc"><div class="sci a"><i class="fas fa-file-lines"></i></div><div><div class="scv">${myPay.filter(p=>p.status==='paid').length}/${myPay.length}</div><div class="scl">Paiements</div></div></div>
        <div class="sc"><div class="sci t"><i class="fas fa-envelope"></i></div><div><div class="scv">${DB.get('messages').filter(m=>(m.to===CU.id||m.from===CU.id)).length}</div><div class="scl">Messages</div></div></div>
        <div class="sc"><div class="sci r"><i class="fas fa-bullhorn"></i></div><div><div class="scv">${DB.get('communications').filter(c=>c.schoolId===sid&&c.scope==='ecole').length}</div><div class="scl">Communications</div></div></div>
      </div>
      <div class="dash-charts">
        <div class="cc"><h3>Evolution de mes points</h3><canvas id="chart-pts"></canvas></div>
        <div class="cc"><h3>Activites recentes</h3><div class="cb" style="overflow-y:auto">${recentActs.slice(0,3).map(a=>`<div class="act-item"><div class="act-dot" style="background:${a.color}"></div><div><div>${a.text}</div><div class="act-time">${a.time}</div></div></div>`).join('')}</div></div>
      </div>
    </div>`;
  }
  if(CU.role==='parent'){
    const child=getUser(CU.childId);
    const childPts=child?pts.filter(p=>p.studentId===child.id).reduce((s,p)=>s+p.value,0):0;
    const childPay=child?payments.filter(p=>p.studentId===child.id):[];
    return `<div class="dash-wrap">
      <div class="dash-stats">
        <div class="sc"><div class="sci g"><i class="fas fa-user-graduate"></i></div><div><div class="scv">${child?child.name:'-'}</div><div class="scl">Mon enfant</div></div></div>
        <div class="sc"><div class="sci a"><i class="fas fa-star"></i></div><div><div class="scv">${childPts}</div><div class="scl">Points de l'enfant</div></div></div>
        <div class="sc"><div class="sci t"><i class="fas fa-money-bill-wave"></i></div><div><div class="scv">${fmtMoney(childPay.reduce((s,p)=>s+p.paid,0))}</div><div class="scl">Total paye</div></div></div>
        <div class="sc"><div class="sci r"><i class="fas fa-envelope"></i></div><div><div class="scv">${DB.get('messages').filter(m=>m.to===CU.id||m.from===CU.id).length}</div><div class="scl">Messages</div></div></div>
      </div>
      <div class="dash-charts">
        <div class="cc"><h3>Paiements de l'enfant</h3><canvas id="chart-pay"></canvas></div>
        <div class="cc"><h3>Activites recentes</h3><div class="cb" style="overflow-y:auto">${recentActs.slice(0,3).map(a=>`<div class="act-item"><div class="act-dot" style="background:${a.color}"></div><div><div>${a.text}</div><div class="act-time">${a.time}</div></div></div>`).join('')}</div></div>
      </div>
    </div>`;
  }

  return `<div class="dash-wrap">
    <div class="dash-stats">
      <div class="sc"><div class="sci g"><i class="fas fa-user-graduate"></i></div><div><div class="scv">${students.length}</div><div class="scl">Eleves</div></div></div>
      <div class="sc"><div class="sci a"><i class="fas fa-chalkboard-user"></i></div><div><div class="scv">${teachers.length}</div><div class="scl">Enseignants</div></div></div>
      <div class="sc"><div class="sci t"><i class="fas fa-money-bill-wave"></i></div><div><div class="scv">${fmtMoney(totalPaid)}</div><div class="scl">Paye / ${fmtMoney(totalDue)}</div></div></div>
      <div class="sc"><div class="sci r"><i class="fas fa-file-lines"></i></div><div><div class="scv">${reports.length}</div><div class="scl">Rapports</div></div></div>
    </div>
    <div class="dash-charts">
      <div class="cc"><h3>Paiements par trimestre</h3><canvas id="chart-pay"></canvas></div>
      <div class="cc"><h3>Repartition des points</h3><canvas id="chart-pts-dist"></canvas></div>
    </div>
    <div class="dash-bottom">
      <div class="cc"><h3>Activite recente</h3><div class="cb" style="overflow-y:auto">${recentActs.map(a=>`<div class="act-item"><div class="act-dot" style="background:${a.color}"></div><div><div>${a.text}</div><div class="act-time">${a.time}</div></div></div>`).join('')}</div></div>
      <div class="cc"><h3>Actions rapides</h3><div class="cb" style="display:flex;flex-direction:column;gap:6px">
        ${CU.role==='enseignant'?`<button class="btn btn-s btn-p" onclick="nav('rapports')"><i class="fas fa-upload"></i>Deposer un rapport</button><button class="btn btn-s btn-g" onclick="nav('points')"><i class="fas fa-star"></i>Gerer les points</button>`:''}
        ${CU.role==='prefet'?`<button class="btn btn-s btn-p" onclick="nav('rapports')"><i class="fas fa-upload"></i>Deposer un rapport</button><button class="btn btn-s btn-a" onclick="nav('communications')"><i class="fas fa-bullhorn"></i>Publier une communication</button><button class="btn btn-s btn-g" onclick="nav('paiements')"><i class="fas fa-money-bill"></i>Enregistrer un paiement</button>`:''}
        ${CU.role==='coordinateur'?`<button class="btn btn-s btn-p" onclick="nav('rapports')"><i class="fas fa-file-lines"></i>Consulter les rapports</button><button class="btn btn-s btn-a" onclick="nav('communications')"><i class="fas fa-bullhorn"></i>Nouvelle communication</button>`:''}
        <button class="btn btn-s btn-g" onclick="nav('messages')"><i class="fas fa-comments"></i>Messages</button>
        <button class="btn btn-s btn-g" onclick="nav('assistant')"><i class="fas fa-robot"></i>Assistant IA</button>
      </div></div>
    </div>
  </div>`;
}
function initDashCharts(){
  const sid=CU.schoolId;
  if(CU.role==='eleve'){
    const el=document.getElementById('chart-pts');if(!el)return;
    const pts=DB.get('points').filter(p=>p.studentId===CU.id).sort((a,b)=>new Date(a.date)-new Date(b.date));
    const cum=[];let s=0;pts.forEach(p=>{s+=p.value;cum.push(s)});
    CHARTS.pts=new Chart(el,{type:'line',data:{labels:pts.map(p=>fmtDate(p.date)),datasets:[{label:'Points cumules',data:cum,borderColor:'#40916C',backgroundColor:'rgba(64,145,108,.1)',fill:true,tension:.4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});
    return;
  }
  if(CU.role==='parent'){
    const el=document.getElementById('chart-pay');if(!el)return;
    const child=getUser(CU.childId);if(!child)return;
    const pays=DB.get('payments').filter(p=>p.studentId===child.id);
    CHARTS.pay=new Chart(el,{type:'bar',data:{labels:pays.map(p=>p.term),datasets:[{label:'Paye',data:pays.map(p=>p.paid),backgroundColor:'#40916C'},{label:'Reste',data:pays.map(p=>p.amount-p.paid),backgroundColor:'#E2E2D8'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:10}}}},scales:{y:{beginAtZero:true}}}});
    return;
  }
  const el1=document.getElementById('chart-pay');
  const el2=document.getElementById('chart-pts-dist');
  if(el1){
    const pays=DB.get('payments').filter(p=>p.schoolId===sid);
    const terms=[...new Set(pays.map(p=>p.term))];
    CHARTS.pay=new Chart(el1,{type:'bar',data:{labels:terms,datasets:[{label:'Paye',data:terms.map(t=>pays.filter(p=>p.term===t).reduce((s,p)=>s+p.paid,0)),backgroundColor:'#40916C'},{label:'Reste',data:terms.map(t=>pays.filter(p=>p.term===t).reduce((s,p)=>s+p.amount-p.paid,0)),backgroundColor:'#E2E2D8'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:10}}}},scales:{y:{beginAtZero:true}}}});
  }
  if(el2){
    const students=getSchoolStudents(sid);
    const pts=DB.get('points').filter(p=>students.some(s=>s.id===p.studentId));
    const cats=['comportement','participation','devoir','examen'];
    CHARTS.ptsDist=new Chart(el2,{type:'doughnut',data:{labels:cats,datasets:[{data:cats.map(c=>pts.filter(p=>p.category===c).length),backgroundColor:['#1B4332','#40916C','#C77B30','#D4A017']}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:10}}}}}});
  }
}

/* ==================== ELEVES & CARTES ==================== */
function renderEleves(){
  const sid=CU.schoolId;
  const students=getSchoolStudents(sid);
  const canManage=CU.role==='prefet'||CU.role==='enseignant';
  return `<div class="ptitle">Gestion des Eleves</div><div class="psub">${students.length} eleves inscrits</div>
  <div class="tab-bar no-print">
    <button class="tab-btn act" onclick="switchElTab(this,'el-list')">Liste</button>
    <button class="tab-btn" onclick="switchElTab(this,'el-cards')">Cartes d'identite</button>
  </div>
  <div id="el-list">
    <div style="display:flex;gap:8px;margin-bottom:14px" class="no-print">
      <input type="text" placeholder="Rechercher un eleve..." oninput="filterStudents(this.value)" style="flex:1;padding:9px 14px;border:2px solid var(--brd);border-radius:10px;font-size:12px;background:var(--bg)">
      ${canManage?`<button class="btn btn-s btn-p" onclick="showAddStudent()"><i class="fas fa-plus"></i> Ajouter</button>`:''}
    </div>
    <div class="card"><div class="tw"><table id="el-table">
      <thead><tr><th>Matricule</th><th>Nom</th><th>Classe</th><th>Points</th><th>Paiement</th><th>Actions</th></tr></thead>
      <tbody>${students.map(s=>{
        const pts=DB.get('points').filter(p=>p.studentId===s.id).reduce((a,p)=>a+p.value,0);
        const pays=DB.get('payments').filter(p=>p.studentId===s.id);
        const lastPay=pays[pays.length-1];
        const payBadge=lastPay?(lastPay.status==='paid'?'<span class="badge bg-ok">Paye</span>':lastPay.status==='partial'?'<span class="badge bg-w">Partiel</span>':'<span class="badge bg-d">Impaye</span>'):'<span class="badge bg-d">Aucun</span>';
        return `<tr><td><strong>${s.matricule||'-'}</strong></td><td>${s.name}</td><td>${s.class||'-'}</td><td><strong style="color:${pts>=0?'var(--ok)':'var(--err)'}">${pts}</strong></td><td>${payBadge}</td><td class="no-print"><button class="btn btn-s btn-g" onclick="showStudentCard(${s.id})"><i class="fas fa-id-card"></i></button> ${canManage?`<button class="btn btn-s btn-g" onclick="editStudent(${s.id})"><i class="fas fa-pen"></i></button>`:''}</td></tr>`;
      }).join('')}</tbody>
    </table></div></div>
  </div>
  <div id="el-cards" class="hidden">
    <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">${students.map(s=>renderIDCard(s)).join('')}</div>
  </div>`;
}
function renderIDCard(s){
  const school=getSchool(s.schoolId);
  return `<div class="id-card" id="card-${s.id}">
    <div class="id-badge">ELEVE</div>
    <div class="id-photo"><i class="fas fa-user"></i></div>
    <div class="id-info">
      <h4>${s.name.toUpperCase()}</h4>
      <p><i class="fas fa-hashtag"></i> ${s.matricule||'N/A'}</p>
      <p><i class="fas fa-calendar"></i> ${s.dob?fmtDate(s.dob):'N/A'}</p>
      <p><i class="fas fa-chalkboard"></i> ${s.class||'N/A'}</p>
      <p><i class="fas fa-phone"></i> ${s.phone||'N/A'}</p>
    </div>
    <div class="id-school">${school?school.name.toUpperCase():''}<br>Annee 2025-2026</div>
  </div>`;
}
function showStudentCard(id){
  const s=getUser(id);if(!s)return;
  const school=getSchool(s.schoolId);
  showModal('Carte d\'identite - '+s.name,`
    <div style="display:flex;justify-content:center;margin-bottom:16px">${renderIDCard(s)}</div>
    <div style="display:flex;gap:8px;justify-content:center" class="no-print">
      <button class="btn btn-s btn-p" onclick="printCard(${s.id})"><i class="fas fa-print"></i> Imprimer</button>
      <button class="btn btn-s btn-g" onclick="uploadStudentPhoto(${s.id})"><i class="fas fa-camera"></i> Photo</button>
    </div>
  `);
}
function printCard(id){
  const card=document.getElementById('card-'+id);if(!card)return;
  const w=window.open('','','width=400,height=300');
  w.document.write(`<html><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Outfit,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh}${document.querySelector('style').textContent}</style></head><body>${card.outerHTML}</body></html>`);
  w.document.close();w.print();
}
function uploadStudentPhoto(id){
  IMG_CB=function(base64){
    DB.upd('users',id,{photo:base64});
    const card=document.getElementById('card-'+id);
    if(card){const ph=card.querySelector('.id-photo');ph.innerHTML=`<img src="${base64}" alt="photo">`}
    toast('Photo mise a jour');
  };
  document.getElementById('img-input').click();
}
function showAddStudent(){
  showModal('Ajouter un eleve',`
    <div class="fg"><label>Nom complet</label><input id="ns-name" required></div>
    <div class="fg"><label>Date de naissance</label><input type="date" id="ns-dob"></div>
    <div class="fg"><label>Classe</label><input id="ns-class" placeholder="Ex: 6eme A"></div>
    <div class="fg"><label>Telephone</label><input type="tel" id="ns-phone"></div>
    <div class="fg"><label>Parent (optionnel)</label><select id="ns-parent"><option value="">Aucun</option>${DB.get('users').filter(u=>u.schoolId===CU.schoolId&&u.role==='parent').map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</select></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="addStudent()">Ajouter</button>`);
}
function addStudent(){
  const name=document.getElementById('ns-name').value.trim();if(!name){toast('Nom requis','er');return}
  const school=getSchool(CU.schoolId);
  const mat=school?school.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)+'-'+new Date().getFullYear()+'-'+String(DB.get('users').filter(u=>u.role==='eleve'&&u.schoolId===CU.schoolId).length+1).padStart(3,'0'):'XX';
  DB.add('users',{name,dob:document.getElementById('ns-dob').value,class:document.getElementById('ns-class').value.trim(),phone:document.getElementById('ns-phone').value.trim(),role:'eleve',schoolId:CU.schoolId,active:true,matricule:mat,parentId:document.getElementById('ns-parent').value?parseInt(document.getElementById('ns-parent').value):null});
  hideModal();toast('Eleve ajoute');renderPage();
}
function editStudent(id){
  const s=getUser(id);if(!s)return;
  showModal('Modifier l\'eleve',`
    <div class="fg"><label>Nom complet</label><input id="es-name" value="${s.name}"></div>
    <div class="fg"><label>Date de naissance</label><input type="date" id="es-dob" value="${s.dob||''}"></div>
    <div class="fg"><label>Classe</label><input id="es-class" value="${s.class||''}"></div>
    <div class="fg"><label>Telephone</label><input type="tel" id="es-phone" value="${s.phone||''}"></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="saveStudent(${id})">Enregistrer</button>`);
}
function saveStudent(id){
  DB.upd('users',id,{name:document.getElementById('es-name').value.trim(),dob:document.getElementById('es-dob').value,class:document.getElementById('es-class').value.trim(),phone:document.getElementById('es-phone').value.trim()});
  hideModal();toast('Eleve mis a jour');renderPage();
}
function switchElTab(btn,tabId){
  btn.parentElement.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('act'));btn.classList.add('act');
  document.getElementById('el-list').classList.toggle('hidden',tabId!=='el-list');
  document.getElementById('el-cards').classList.toggle('hidden',tabId!=='el-cards');
}
function filterStudents(q){
  const rows=document.querySelectorAll('#el-table tbody tr');
  rows.forEach(r=>{r.style.display=r.textContent.toLowerCase().includes(q.toLowerCase())?'':'none'});
}

/* ==================== RAPPORTS & DEPOTS ==================== */
function renderRapports(){
  const sid=CU.schoolId;
  let reports=DB.get('reports').filter(r=>r.schoolId===sid);
  const statusLabels={brouillon:'Brouillon',depose_prefet:'Depose au Prefet',recu_prefet:'Recu par Prefet',depose_coord:'Depose a la Coordination',recu_coord:'Recu par Coordination',valide:'Valide',rejete:'Rejete'};
  const statusClass={brouillon:'bg-w',depose_prefet:'bg-i',recu_prefet:'bg-a',depose_coord:'bg-i',recu_coord:'bg-a',valide:'bg-ok',rejete:'bg-d'};
  const typeLabels={pedagogique:'Pedagogique',discipline:'Discipline',financier:'Financier',activite:'Activite'};

  // Filtrer selon le role
  if(CU.role==='enseignant')reports=reports.filter(r=>r.authorId===CU.id);
  if(CU.role==='prefet')reports=reports.filter(r=>r.authorId===CU.id||r.toId===CU.id);
  if(CU.role==='coordinateur')reports=reports.filter(r=>r.toId===CU.id||r.status==='depose_coord'||r.status==='recu_coord');

  const canCreate=CU.role==='enseignant'||CU.role==='prefet';
  const canReceive=CU.role==='prefet'||CU.role==='coordinateur';

  return `<div class="ptitle">Rapports & Depots</div><div class="psub">Gestion et depot de rapports scolaires</div>
  <div style="display:flex;gap:8px;margin-bottom:14px">
    ${canCreate?`<button class="btn btn-s btn-p" onclick="showNewReport()"><i class="fas fa-plus"></i> Nouveau rapport</button>`:''}
    ${canReceive?`<button class="btn btn-s btn-a" onclick="showGenReport()"><i class="fas fa-wand-magic-sparkles"></i> Generer un rapport</button>`:''}
  </div>
  <div class="card"><div class="tw"><table>
    <thead><tr><th>Type</th><th>Titre</th><th>Auteur</th><th>Statut</th><th>Date</th><th>Actions</th></tr></thead>
    <tbody>${reports.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(r=>{
      const author=getUser(r.authorId);
      let actions=`<button class="btn btn-s btn-g" onclick="viewReport(${r.id})"><i class="fas fa-eye"></i></button>`;
      if(CU.role==='prefet'&&r.toId===CU.id&&r.status==='depose_prefet')actions+=` <button class="btn btn-s btn-p" onclick="receiveReport(${r.id})"><i class="fas fa-check"></i> Recevoir</button>`;
      if(CU.role==='prefet'&&r.status==='recu_prefet')actions+=` <button class="btn btn-s btn-a" onclick="forwardReport(${r.id})"><i class="fas fa-upload"></i> Deposer a la Coord.</button>`;
      if(CU.role==='prefet'&&r.status==='recu_prefet')actions+=` <button class="btn btn-s btn-d" onclick="rejectReport(${r.id})"><i class="fas fa-times"></i></button>`;
      if(CU.role==='coordinateur'&&r.toId===CU.id&&r.status==='depose_coord')actions+=` <button class="btn btn-s btn-p" onclick="receiveReport(${r.id})"><i class="fas fa-check"></i> Recevoir</button>`;
      if(CU.role==='coordinateur'&&r.status==='recu_coord')actions+=` <button class="btn btn-s btn-p" onclick="validateReport(${r.id})"><i class="fas fa-check-double"></i> Valider</button>`;
      if(r.status==='brouillon'&&r.authorId===CU.id)actions+=` <button class="btn btn-s btn-a" onclick="depositReport(${r.id})"><i class="fas fa-upload"></i> Deposer</button> <button class="btn btn-s btn-d" onclick="DB.rm('reports',${r.id});renderPage();toast('Supprime')"><i class="fas fa-trash"></i></button>`;
      return `<tr><td><span class="badge bg-i">${typeLabels[r.type]||r.type}</span></td><td><strong>${r.title}</strong></td><td>${author?author.name:'-'}</td><td><span class="badge ${statusClass[r.status]||'bg-w'}">${statusLabels[r.status]||r.status}</span></td><td>${fmtDate(r.createdAt)}</td><td>${actions}</td></tr>`;
    }).join('')||'<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--mut)">Aucun rapport</td></tr>'}</tbody>
  </table></div></div>`;
}
function showNewReport(){
  showModal('Nouveau rapport',`
    <div class="fg"><label>Type de rapport</label><select id="nr-type"><option value="pedagogique">Pedagogique</option><option value="discipline">Discipline</option><option value="activite">Activite</option><option value="financier">Financier</option></select></div>
    <div class="fg"><label>Titre</label><input id="nr-title" required></div>
    <div class="fg"><label>Contenu</label><textarea id="nr-content" rows="6" placeholder="Redigez votre rapport ici..."></textarea></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="saveNewReport()">Enregistrer</button>`);
}
function saveNewReport(){
  const title=document.getElementById('nr-title').value.trim();if(!title){toast('Titre requis','er');return}
  const type=document.getElementById('nr-type').value;
  const content=document.getElementById('nr-content').value;
  let toId=null;
  if(CU.role==='enseignant'){const prefet=DB.get('users').find(u=>u.schoolId===CU.schoolId&&u.role==='prefet');toId=prefet?prefet.id:null}
  DB.add('reports',{type,title,content,authorId:CU.id,schoolId:CU.schoolId,status:'brouillon',toId,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
  hideModal();toast('Rapport cree');renderPage();
}
function depositReport(id){
  const r=DB.find('reports',id);if(!r)return;
  if(CU.role==='enseignant'){const prefet=DB.get('users').find(u=>u.schoolId===CU.schoolId&&u.role==='prefet');DB.upd('reports',id,{status:'depose_prefet',toId:prefet?prefet.id:null,updatedAt:new Date().toISOString()});if(prefet)DB.add('notifications',{userId:prefet.id,text:`Nouveau rapport de ${CU.name}: ${r.title}`,read:false,ts:new Date().toISOString(),type:'report'})}
  hideModal();toast('Rapport depose');renderPage();updateNotifBadge();
}
function receiveReport(id){
  const r=DB.find('reports',id);if(!r)return;
  const newStatus=r.status==='depose_prefet'?'recu_prefet':'recu_coord';
  DB.upd('reports',id,{status:newStatus,updatedAt:new Date().toISOString()});
  toast('Rapport recu');renderPage();
}
function forwardReport(id){
  const coord=DB.get('users').find(u=>u.schoolId===CU.schoolId&&u.role==='coordinateur');
  if(!coord){toast('Aucun coordinateur trouve','er');return}
  DB.upd('reports',id,{status:'depose_coord',toId:coord.id,updatedAt:new Date().toISOString()});
  DB.add('notifications',{userId:coord.id,text:`Rapport recu du prefet ${CU.name}: ${DB.find('reports',id).title}`,read:false,ts:new Date().toISOString(),type:'report'});
  toast('Rapport depose a la coordination');renderPage();updateNotifBadge();
}
function rejectReport(id){DB.upd('reports',id,{status:'rejete',updatedAt:new Date().toISOString()});toast('Rapport rejete','wa');renderPage()}
function validateReport(id){DB.upd('reports',id,{status:'valide',updatedAt:new Date().toISOString()});toast('Rapport valide');renderPage()}
function viewReport(id){
  const r=DB.find('reports',id);if(!r)return;
  const author=getUser(r.authorId);
  const statusLabels={brouillon:'Brouillon',depose_prefet:'Depose au Prefet',recu_prefet:'Recu par Prefet',depose_coord:'Depose a la Coordination',recu_coord:'Recu par Coordination',valide:'Valide',rejete:'Rejete'};
  showModal(r.title,`
    <div style="display:flex;gap:12px;margin-bottom:14px;flex-wrap:wrap">
      <span class="badge bg-i">${r.type}</span>
      <span class="badge bg-a">${statusLabels[r.status]}</span>
    </div>
    <p style="font-size:12px;color:var(--mut);margin-bottom:12px">Auteur: ${author?author.name:'-'} | Cree: ${fmtDate(r.createdAt)} | Modifie: ${fmtDate(r.updatedAt)}</p>
    <div style="background:var(--bg);padding:16px;border-radius:10px;font-size:13px;line-height:1.7;white-space:pre-wrap">${r.content||'Aucun contenu'}</div>
  `);
}
function showGenReport(){
  const sid=CU.schoolId;
  const students=getSchoolStudents(sid);
  const teachers=getSchoolTeachers(sid);
  const payments=DB.get('payments').filter(p=>p.schoolId===sid);
  const pts=DB.get('points').filter(p=>students.some(s=>s.id===p.studentId));
  const totalPaid=payments.reduce((s,p)=>s+p.paid,0);
  const totalDue=payments.reduce((s,p)=>s+p.amount,0);
  const avgPts=students.length?(pts.reduce((s,p)=>s+p.value,0)/students.length).toFixed(1):0;

  let reportContent=`RAPPORT GENERE AUTOMATIQUEMENT\nEtablissement: ${getSchool(sid)?.name}\nDate: ${fmtDate(new Date())}\n${'='.repeat(50)}\n\n`;
  reportContent+=`EFFECTIFS:\n- Eleves: ${students.length}\n- Enseignants: ${teachers.length}\n\n`;
  reportContent+=`PAIEMENTS:\n- Total du: ${fmtMoney(totalDue)}\n- Total paye: ${fmtMoney(totalPaid)}\n- Taux de recouvrement: ${totalDue?((totalPaid/totalDue)*100).toFixed(1):0}%\n\n`;
  reportContent+=`POINTS (moyenne): ${avgPts}\n`;
  reportContent+=`- Comportement: ${pts.filter(p=>p.category==='comportement').reduce((s,p)=>s+p.value,0)}\n`;
  reportContent+=`- Participation: ${pts.filter(p=>p.category==='participation').reduce((s,p)=>s+p.value,0)}\n`;
  reportContent+=`- Devoirs: ${pts.filter(p=>p.category==='devoir').reduce((s,p)=>s+p.value,0)}\n`;
  reportContent+=`- Examens: ${pts.filter(p=>p.category==='examen').reduce((s,p)=>s+p.value,0)}\n`;

  showModal('Generer un rapport automatique',`
    <div class="fg"><label>Type</label><select id="gr-type"><option value="pedagogique">Pedagogique</option><option value="financier">Financier</option><option value="activite">Activite</option></select></div>
    <div class="fg"><label>Titre</label><input id="gr-title" value="Rapport synthetique - ${fmtDate(new Date())}"></div>
    <div class="fg"><label>Apercu du contenu</label><textarea id="gr-content" rows="10" style="font-size:11px">${reportContent}</textarea></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="saveGenReport()"><i class="fas fa-save"></i> Enregistrer</button> <button class="btn btn-a" onclick="printGenReport()"><i class="fas fa-print"></i> Imprimer</button>`);
}
function saveGenReport(){
  const title=document.getElementById('gr-title').value.trim();if(!title){toast('Titre requis','er');return}
  const type=document.getElementById('gr-type').value;
  const content=document.getElementById('gr-content').value;
  let toId=null;
  if(CU.role==='prefet'){const coord=DB.get('users').find(u=>u.schoolId===CU.schoolId&&u.role==='coordinateur');toId=coord?coord.id:null}
  DB.add('reports',{type,title,content,authorId:CU.id,schoolId:CU.schoolId,status:toId?'depose_coord':'brouillon',toId,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
  if(toId)DB.add('notifications',{userId:toId,text:`Rapport de ${CU.name}: ${title}`,read:false,ts:new Date().toISOString(),type:'report'});
  hideModal();toast('Rapport genere et enregistre');renderPage();updateNotifBadge();
}
function printGenReport(){const c=document.getElementById('gr-content').value;const w=window.open('','','width=600');w.document.write(`<pre style="font-family:monospace;font-size:12px;padding:20px">${c}</pre>`);w.document.close();w.print()}

/* ==================== COMMUNICATIONS ==================== */
function renderCommunications(){
  const sid=CU.schoolId;
  let comms=DB.get('communications').filter(c=>c.scope==='ecole'&&c.schoolId===sid);
  if(CU.role==='coordinateur')comms=DB.get('communications').filter(c=>c.scope==='prefets'||(c.scope==='ecole'&&c.schoolId===sid));
  if(CU.role==='prefet')comms=DB.get('communications').filter(c=>c.scope==='ecole'&&c.schoolId===sid);

  const canCreate=CU.role==='coordinateur'||CU.role==='prefet';
  const priorityLabels={haute:'Haute priorite',moyenne:'Moyenne',basse:'Basse'};
  const priorityClass={haute:'bg-d',moyenne:'bg-w',basse:'bg-ok'};

  return `<div class="ptitle">Communications Scolaires</div><div class="psub">${CU.role==='coordinateur'?'Communications de la coordination vers les etablissements':'Communications de votre etablissement'}</div>
  ${canCreate?`<div style="margin-bottom:14px"><button class="btn btn-s btn-p" onclick="showNewComm()"><i class="fas fa-plus"></i> Nouvelle communication</button></div>`:''}
  ${comms.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(c=>{
    const author=getUser(c.authorId);
    return `<div class="comm-card">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
        <span class="badge ${priorityClass[c.priority]||'bg-w'}">${priorityLabels[c.priority]||c.priority}</span>
        ${c.scope==='prefets'?'<span class="badge bg-i">Coordination → Prefets</span>':'<span class="badge bg-ok">Etablissement</span>'}
      </div>
      <h4>${c.title}</h4>
      <p>${c.content}</p>
      ${c.img?`<img src="${c.img}" alt="image">`:''}
      <div class="comm-meta"><span><i class="fas fa-user"></i> ${author?author.name:'-'}</span><span><i class="fas fa-calendar"></i> ${fmtDate(c.createdAt)}</span></div>
    </div>`;
  }).join('')||'<div class="empty-s"><i class="fas fa-bullhorn"></i><p>Aucune communication</p></div>'}`;
}
function showNewComm(){
  const scopeOpts=CU.role==='coordinateur'?`<option value="prefets">Vers les prefets</option><option value="ecole">Vers un etablissement</option>`:`<option value="ecole">Etablissement entier</option>`;
  const schoolOpts=CU.role==='coordinateur'?DB.get('schools').map(s=>`<option value="${s.id}">${s.name}</option>`).join(''):'';
  showModal('Nouvelle communication',`
    <div class="fg"><label>Destinataires</label><select id="nc-scope" onchange="document.getElementById('nc-school-grp').classList.toggle('hidden',this.value!=='ecole')">${scopeOpts}</select></div>
    <div class="fg" id="nc-school-grp" class="${CU.role!=='coordinateur'?'hidden':''}"><label>Etablissement</label><select id="nc-school">${schoolOpts||`<option value="${CU.schoolId}">${getSchool(CU.schoolId)?.name}</option>`}</select></div>
    <div class="fg"><label>Priorite</label><select id="nc-prio"><option value="moyenne">Moyenne</option><option value="haute">Haute</option><option value="basse">Basse</option></select></div>
    <div class="fg"><label>Titre</label><input id="nc-title" required></div>
    <div class="fg"><label>Contenu</label><textarea id="nc-content" rows="5"></textarea></div>
    <div class="fg"><label>Image (optionnel)</label><button class="btn btn-s btn-g" onclick="IMG_CB=function(b){document.getElementById('nc-img-prev').src=b;document.getElementById('nc-img-data').value=b};document.getElementById('img-input').click()"><i class="fas fa-image"></i> Ajouter une image</button><input type="hidden" id="nc-img-data"><img id="nc-img-prev" class="img-preview hidden"></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="saveNewComm()">Publier</button>`);
}
function saveNewComm(){
  const title=document.getElementById('nc-title').value.trim();if(!title){toast('Titre requis','er');return}
  const scope=document.getElementById('nc-scope').value;
  const schoolId=scope==='ecole'?(parseInt(document.getElementById('nc-school').value)||CU.schoolId):0;
  const img=document.getElementById('nc-img-data').value||null;
  DB.add('communications',{authorId:CU.id,schoolId,title,content:document.getElementById('nc-content').value,img,scope,priority:document.getElementById('nc-prio').value,createdAt:new Date().toISOString()});
  // Notifier les utilisateurs concernes
  if(scope==='prefets'){DB.get('users').filter(u=>u.role==='prefet').forEach(p=>DB.add('notifications',{userId:p.id,text:`Nouvelle communication de la coordination: ${title}`,read:false,ts:new Date().toISOString(),type:'info'}))}
  else{getSchoolUsers(schoolId).filter(u=>u.id!==CU.id).forEach(u=>DB.add('notifications',{userId:u.id,text:`Nouvelle communication: ${title}`,read:false,ts:new Date().toISOString(),type:'info'}))}
  hideModal();toast('Communication publiee');renderPage();updateNotifBadge();
}

/* ==================== MESSAGES ==================== */
function renderMessages(){
  const convos=getConversations();
  return `<div class="ptitle">Messages</div><div class="psub">Echangez avec les membres de votre etablissement</div>
  <div class="msg-lay">
    <div class="ml">
      <div class="ml-head"><input type="text" placeholder="Rechercher..." oninput="filterConvos(this.value)"></div>
      <div id="msg-list">${convos.map(c=>{
        const other=getUser(c.otherId);
        if(!other)return '';
        const lastMsg=c.lastMsg;
        const unread=c.unread;
        return `<div class="mli${SEL_CONV===c.otherId?' act':''}" onclick="openConv(${c.otherId})">
          <div class="ma" style="background:${lastMsg&&lastMsg.from===CU.id?'var(--pm)':'var(--p)'}">${initials(other.name)}</div>
          <div style="flex:1;min-width:0"><div class="mn">${other.name} <span style="font-size:9px;color:var(--mut)">(${ROLES[other.role]})</span></div><div class="mp">${lastMsg?(lastMsg.img?'📷 Image':lastMsg.text):'Aucun message'}</div></div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px"><span class="mt">${lastMsg?fmtTime(lastMsg.ts):''}</span>${unread?`<span style="width:8px;height:8px;border-radius:50%;background:var(--err)"></span>`:''}</div>
        </div>`;
      }).join('')||'<div class="empty-s" style="padding:20px"><i class="fas fa-comments"></i><p>Aucune conversation</p></div>'}</div>
    </div>
    <div class="mc">
      ${SEL_CONV?`<div class="mc-h"><span>${getUser(SEL_CONV)?.name||''} (${ROLES[getUser(SEL_CONV)?.role]||''})</span></div>
      <div class="mc-b" id="msg-bubbles">${renderMsgBubbles(SEL_CONV)}</div>
      <div class="mc-i">
        <button class="img-btn" onclick="IMG_CB=function(b){sendMsg(b)};document.getElementById('img-input').click()"><i class="fas fa-image"></i></button>
        <input type="text" id="msg-input" placeholder="Ecrivez un message..." onkeydown="if(event.key==='Enter')sendMsg()">
        <button class="send-btn" onclick="sendMsg()"><i class="fas fa-paper-plane"></i></button>
      </div>`:'<div class="empty-s" style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center"><i class="fas fa-comments"></i><p>Selectionnez une conversation</p></div>'}
    </div>
  </div>`;
}
function getConversations(){
  const msgs=DB.get('messages').filter(m=>m.from===CU.id||m.to===CU.id);
  const otherIds=[...new Set(msgs.map(m=>m.from===CU.id?m.to:m.from))];
  // Ajouter les utilisateurs de l'etablissement
  const schoolUsers=getSchoolUsers(CU.schoolId).filter(u=>u.id!==CU.id);
  const allIds=[...new Set([...otherIds,...schoolUsers.map(u=>u.id)])];
  return allIds.map(oid=>{
    const convMsgs=msgs.filter(m=>(m.from===CU.id&&m.to===oid)||(m.from===oid&&m.to===CU.id)).sort((a,b)=>new Date(b.ts)-new Date(a.ts));
    return {otherId:oid,lastMsg:convMsgs[0]||null,unread:convMsgs.filter(m=>m.to===CU.id&&!m.read).length};
  }).filter(c=>getUser(c.otherId)).sort((a,b)=>(b.lastMsg?new Date(b.lastMsg.ts):0)-(a.lastMsg?new Date(a.lastMsg.ts):0));
}
function openConv(oid){
  SEL_CONV=oid;
  // Marquer comme lu
  DB.get('messages').filter(m=>m.from===oid&&m.to===CU.id&&!m.read).forEach(m=>DB.upd('messages',m.id,{read:true}));
  buildNav();renderPage();
  setTimeout(()=>{const b=document.getElementById('msg-bubbles');if(b)b.scrollTop=b.scrollHeight},50);
}
function renderMsgBubbles(oid){
  const msgs=DB.get('messages').filter(m=>(m.from===CU.id&&m.to===oid)||(m.from===oid&&m.to===CU.id)).sort((a,b)=>new Date(a.ts)-new Date(b.ts));
  return msgs.map(m=>`<div class="mbub ${m.from===CU.id?'s':'r'}">
    ${m.text}
    ${m.img?`<img src="${m.img}" alt="image">`:''}
    <div class="bt">${fmtTime(m.ts)}</div>
  </div>`).join('');
}
function sendMsg(img){
  if(!SEL_CONV)return;
  const input=document.getElementById('msg-input');
  const text=img?'':input.value.trim();
  if(!text&&!img)return;
  DB.add('messages',{from:CU.id,to:SEL_CONV,text,ts:new Date().toISOString(),read:false,img:img||null});
  DB.add('notifications',{userId:SEL_CONV,text:`Nouveau message de ${CU.name}`,read:false,ts:new Date().toISOString(),type:'message'});
  if(input)input.value='';
  renderPage();
  setTimeout(()=>{const b=document.getElementById('msg-bubbles');if(b)b.scrollTop=b.scrollHeight},50);
  updateNotifBadge();
}
function initMsgList(){}
function filterConvos(q){
  document.querySelectorAll('.mli').forEach(el=>{el.style.display=el.textContent.toLowerCase().includes(q.toLowerCase())?'':'none'});
}
function getMessageUnreadCount(){return DB.get('messages').filter(m=>m.to===CU.id&&!m.read).length}

/* ==================== PAIEMENTS MOBILE MONEY ==================== */
function renderPaiements(){
  const sid=CU.schoolId;
  let payments=DB.get('payments').filter(p=>p.schoolId===sid);
  if(CU.role==='eleve')payments=payments.filter(p=>p.studentId===CU.id);
  if(CU.role==='parent')payments=payments.filter(p=>p.studentId===CU.childId);
  const students=getSchoolStudents(sid);
  const totalPaid=payments.reduce((s,p)=>s+p.paid,0);
  const totalDue=payments.reduce((s,p)=>s+p.amount,0);
  const canPay=CU.role==='prefet'||CU.role==='parent';

  return `<div class="ptitle">Paiements Scolaires</div><div class="psub">${fmtMoney(totalPaid)} payes sur ${fmtMoney(totalDue)} du</div>
  ${canPay?`<div style="margin-bottom:14px"><button class="btn btn-s btn-p" onclick="showNewPayment()"><i class="fas fa-plus"></i> Nouveau paiement</button></div>`:''}
  <div class="card"><div class="tw"><table>
    <thead><tr><th>Eleve</th><th>Trimestre</th><th>Montant</th><th>Paye</th><th>Statut</th><th>Mode</th><th>Recu</th><th>Actions</th></tr></thead>
    <tbody>${payments.sort((a,b)=>new Date(b.date||0)-new Date(a.date||0)).map(p=>{
      const stu=getUser(p.studentId);
      const statusBadge=p.status==='paid'?'<span class="badge bg-ok">Paye</span>':p.status==='partial'?'<span class="badge bg-w">Partiel</span>':'<span class="badge bg-d">Impaye</span>';
      const op=OPS.find(o=>o.id===p.method);
      return `<tr><td>${stu?stu.name:'-'}</td><td>${p.term}</td><td>${fmtMoney(p.amount)}</td><td><strong>${fmtMoney(p.paid)}</strong></td><td>${statusBadge}</td><td>${op?`<span style="color:${op.color};font-weight:600">${op.name}</span>`:'-'}</td><td>${p.receiptNo||'-'}</td><td>${p.receiptNo?`<button class="btn btn-s btn-g" onclick="showReceipt(${p.id})"><i class="fas fa-receipt"></i></button>`:''}</td></tr>`;
    }).join('')||'<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--mut)">Aucun paiement</td></tr>'}</tbody>
  </table></div></div>`;
}
function showNewPayment(){
  const sid=CU.schoolId;
  const students=getSchoolStudents(sid);
  const studentOpts=CU.role==='parent'?`<option value="${CU.childId}">${getUser(CU.childId)?.name||'Mon enfant'}</option>`:students.map(s=>`<option value="${s.id}">${s.name} (${s.matricule||''})</option>`).join('');
  showModal('Nouveau paiement',`
    <div class="fg"><label>Eleve</label><select id="np-student">${studentOpts}</select></div>
    <div class="fg"><label>Trimestre</label><select id="np-term"><option value="T1 2025">T1 2025</option><option value="T2 2025">T2 2025</option><option value="T3 2025">T3 2025</option></select></div>
    <div class="fg"><label>Montant a payer (CDF)</label><input type="number" id="np-amount" value="50000"></div>
    <div class="fg"><label>Montant paye (CDF)</label><input type="number" id="np-paid" value="50000"></div>
    <div class="fg"><label>Mode de paiement</label>
      <div class="ops-grid" id="np-ops">
        ${OPS.map((o,i)=>`<div class="op-card${i===0?' sel':''}" onclick="selectOp('${o.id}',this)"><div class="op-logo" style="color:${o.color}"><i class="fas ${o.icon}"></i></div><div class="op-name">${o.name}</div></div>`).join('')}
        <div class="op-card" onclick="selectOp('carte',this)"><div class="op-logo" style="color:var(--p)"><i class="fas fa-credit-card"></i></div><div class="op-name">Carte bancaire</div></div>
      </div>
      <input type="hidden" id="np-method" value="airtel">
    </div>
    <div class="fg" id="np-phone-grp"><label>Numero de telephone</label><input type="tel" id="np-phone" placeholder="+243 ..."></div>
    <div class="fg hidden" id="np-card-grp"><label>Numero de carte</label><input type="text" id="np-card" placeholder="XXXX XXXX XXXX XXXX" maxlength="19"></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="processPayment()"><i class="fas fa-check"></i> Confirmer le paiement</button>`);
}
let SEL_OP='airtel';
function selectOp(id,el){
  SEL_OP=id;
  document.querySelectorAll('#np-ops .op-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  document.getElementById('np-method').value=id;
  document.getElementById('np-phone-grp').classList.toggle('hidden',id==='carte');
  document.getElementById('np-card-grp').classList.toggle('hidden',id!=='carte');
}
function processPayment(){
  const studentId=parseInt(document.getElementById('np-student').value);
  const amount=parseInt(document.getElementById('np-amount').value)||0;
  const paid=parseInt(document.getElementById('np-paid').value)||0;
  if(paid<=0){toast('Montant invalide','er');return}
  const method=document.getElementById('np-method').value;
  const phone=method!=='carte'?document.getElementById('np-phone').value.trim():'';
  const ref=genRef();
  const receiptNo=genReceiptNo(CU.schoolId);
  const status=paid>=amount?'paid':paid>0?'partial':'unpaid';
  DB.add('payments',{schoolId:CU.schoolId,studentId,amount,paid,status,term:document.getElementById('np-term').value,method,phone,ref,date:new Date().toISOString(),receiptNo});
  // Notifier
  const stu=getUser(studentId);
  if(stu)DB.add('notifications',{userId:studentId,text:`Paiement de ${fmtMoney(paid)} enregistre pour ${document.getElementById('np-term').value}`,read:false,ts:new Date().toISOString(),type:'payment'});
  if(stu&&stu.parentId)DB.add('notifications',{userId:stu.parentId,text:`Paiement de ${fmtMoney(paid)} pour ${stu.name}`,read:false,ts:new Date().toISOString(),type:'payment'});
  hideModal();toast('Paiement enregistre avec succes');
  // Afficher le recu
  const payId=DB.get('payments').find(p=>p.ref===ref);
  if(payId)showReceipt(payId.id);
  renderPage();updateNotifBadge();
}
function showReceipt(id){
  const p=DB.find('payments',id);if(!p)return;
  const stu=getUser(p.studentId);
  const school=getSchool(p.schoolId);
  const op=OPS.find(o=>o.id===p.method);
  showModal('Recu de paiement',`
    <div style="display:flex;justify-content:center">
      <div class="receipt">
        <h3><i class="fas fa-graduation-cap"></i> ${school?school.name:'Etablissement'}</h3>
        <div class="r-sub">${school?school.address:''}</div>
        <hr>
        <div style="font-size:14px;font-weight:700;margin:8px 0">RECU DE PAIEMENT</div>
        <div class="r-row"><span>Numero de recu</span><strong>${p.receiptNo}</strong></div>
        <div class="r-row"><span>Date</span><span>${fmtDate(p.date)}</span></div>
        <div class="r-row"><span>Eleve</span><strong>${stu?stu.name:'-'}</strong></div>
        <div class="r-row"><span>Matricule</span><span>${stu?stu.matricule:'-'}</span></div>
        <div class="r-row"><span>Trimestre</span><span>${p.term}</span></div>
        <hr>
        <div class="r-row"><span>Montant du</span><span>${fmtMoney(p.amount)}</span></div>
        <div class="r-row"><span>Montant paye</span><span>${fmtMoney(p.paid)}</span></div>
        <div class="r-row"><span>Reste</span><span>${fmtMoney(p.amount-p.paid)}</span></div>
        <hr>
        <div class="r-total">${fmtMoney(p.paid)}</div>
        ${op?`<div class="r-ops" style="color:${op.color}"><i class="fas ${op.icon}"></i> ${op.name}</div>`:''}
        <div style="font-size:10px;color:var(--mut);margin-top:12px">Ref: ${p.ref}</div>
      </div>
    </div>
  `,`<button class="btn btn-g" onclick="hideModal()">Fermer</button><button class="btn btn-p" onclick="printReceipt(${id})"><i class="fas fa-print"></i> Imprimer</button>`);
}
function printReceipt(id){
  const p=DB.find('payments',id);if(!p)return;
  const stu=getUser(p.studentId);const school=getSchool(p.schoolId);const op=OPS.find(o=>o.id===p.method);
  const w=window.open('','','width=400');w.document.write(`<html><head><title>Recu</title><style>body{font-family:sans-serif;padding:20px;text-align:center}h3{color:#1B4332}hr{border:none;border-top:1px dashed #ccc;margin:12px 0}.r{display:flex;justify-content:space-between;padding:4px 0;font-size:13px}.total{font-size:20px;font-weight:800;color:#1B4332;margin:8px 0}</style></head><body>
  <h3>${school?school.name:''}</h3><p style="font-size:11px;color:#666">${school?school.address:''}</p><hr>
  <p style="font-weight:700">RECU DE PAIEMENT</p>
  <div class="r"><span>N° Recu</span><strong>${p.receiptNo}</strong></div>
  <div class="r"><span>Date</span><span>${fmtDate(p.date)}</span></div>
  <div class="r"><span>Eleve</span><strong>${stu?stu.name:''}</strong></div>
  <div class="r"><span>Matricule</span><span>${stu?stu.matricule:''}</span></div>
  <div class="r"><span>Trimestre</span><span>${p.term}</span></div><hr>
  <div class="r"><span>Montant du</span><span>${fmtMoney(p.amount)}</span></div>
  <div class="r"><span>Paye</span><span>${fmtMoney(p.paid)}</span></div>
  <div class="r"><span>Reste</span><span>${fmtMoney(p.amount-p.paid)}</span></div>
  <div class="total">${fmtMoney(p.paid)}</div>
  ${op?`<p style="color:${op.color};font-weight:600">${op.name}</p>`:''}
  <p style="font-size:10px;color:#999;margin-top:16px">Ref: ${p.ref}</p>
  </body></html>`);w.document.close();w.print();
}

/* ==================== POINTS ==================== */
function renderPoints(){
  const sid=CU.schoolId;
  if(CU.role==='eleve'){
    const pts=DB.get('points').filter(p=>p.studentId===CU.id).sort((a,b)=>new Date(b.date)-new Date(a.date));
    const total=pts.reduce((s,p)=>s+p.value,0);
    return `<div class="ptitle">Mes Points</div><div class="psub">Total: <strong style="color:${total>=0?'var(--ok)':'var(--err)'}">${total} points</strong></div>
    <div class="card"><div class="ch"><h3>Historique</h3></div><div class="cb">
      <table><thead><tr><th>Date</th><th>Categorie</th><th>Valeur</th><th>Commentaire</th><th>Enseignant</th></tr></thead>
      <tbody>${pts.map(p=>{const t=getUser(p.teacherId);return `<tr><td>${fmtDate(p.date)}</td><td><span class="badge bg-i">${p.category}</span></td><td><strong style="color:${p.value>=0?'var(--ok)':'var(--err)'}">${p.value>0?'+':''}${p.value}</strong></td><td>${p.comment||'-'}</td><td>${t?t.name:'-'}</td></tr>`}).join('')||'<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--mut)">Aucun point</td></tr>'}</tbody></table>
    </div></div>`;
  }
  if(CU.role==='parent'){
    const child=getUser(CU.childId);if(!child)return '<div class="empty-s"><p>Aucun enfant associe</p></div>';
    const pts=DB.get('points').filter(p=>p.studentId===child.id).sort((a,b)=>new Date(b.date)-new Date(a.date));
    const total=pts.reduce((s,p)=>s+p.value,0);
    return `<div class="ptitle">Points de ${child.name}</div><div class="psub">Total: <strong style="color:${total>=0?'var(--ok)':'var(--err)'}">${total} points</strong></div>
    <div class="card"><div class="cb"><table><thead><tr><th>Date</th><th>Categorie</th><th>Valeur</th><th>Commentaire</th></tr></thead>
    <tbody>${pts.map(p=>`<tr><td>${fmtDate(p.date)}</td><td><span class="badge bg-i">${p.category}</span></td><td><strong style="color:${p.value>=0?'var(--ok)':'var(--err)'}">${p.value>0?'+':''}${p.value}</strong></td><td>${p.comment||'-'}</td></tr>`).join('')||'<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--mut)">Aucun point</td></tr>'}</tbody></table></div></div>`;
  }
  // Enseignant ou prefet
  const students=getSchoolStudents(sid);
  const canAdd=CU.role==='enseignant';
  return `<div class="ptitle">Gestion des Points</div><div class="psub">${students.length} eleves</div>
  ${canAdd?`<div style="margin-bottom:14px"><button class="btn btn-s btn-p" onclick="showAddPoints()"><i class="fas fa-plus"></i> Attribuer des points</button></div>`:''}
  <div class="pt-grid">${students.map(s=>{
    const pts=DB.get('points').filter(p=>p.studentId===s.id).reduce((a,p)=>a+p.value,0);
    const catPts={comportement:0,participation:0,devoir:0,examen:0};
    DB.get('points').filter(p=>p.studentId===s.id).forEach(p=>{if(catPts.hasOwnProperty(p.category))catPts[p.category]+=p.value});
    return `<div class="pt-card"><div class="pt-av">${initials(s.name)}</div><div style="flex:1">
      <div style="font-size:13px;font-weight:600">${s.name}</div>
      <div style="font-size:11px;color:var(--mut)">${s.class||''} | ${s.matricule||''}</div>
      <div style="display:flex;gap:8px;margin-top:6px;font-size:10px">
        <span title="Comportement" style="color:${catPts.comportement>=0?'var(--ok)':'var(--err)'}"><i class="fas fa-heart"></i> ${catPts.comportement}</span>
        <span title="Participation" style="color:var(--inf)"><i class="fas fa-hand"></i> ${catPts.participation}</span>
        <span title="Devoir" style="color:var(--a)"><i class="fas fa-book"></i> ${catPts.devoir}</span>
        <span title="Examen" style="color:var(--warn)"><i class="fas fa-pen"></i> ${catPts.examen}</span>
      </div>
    </div><div class="pt-val">${pts}</div></div>`;
  }).join('')}</div>`;
}
function showAddPoints(){
  const students=getSchoolStudents(CU.schoolId);
  showModal('Attribuer des points',`
    <div class="fg"><label>Eleve</label><select id="ap-student">${students.map(s=>`<option value="${s.id}">${s.name} (${s.class||''})</option>`).join('')}</select></div>
    <div class="fg"><label>Categorie</label><select id="ap-cat"><option value="comportement">Comportement</option><option value="participation">Participation</option><option value="devoir">Devoir</option><option value="examen">Examen</option></select></div>
    <div class="fg"><label>Valeur (+ ou -)</label><input type="number" id="ap-val" value="1" min="-10" max="10"></div>
    <div class="fg"><label>Commentaire</label><input id="ap-comment" placeholder="Raison de l'attribution..."></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="savePoints()">Attribuer</button>`);
}
function savePoints(){
  const studentId=parseInt(document.getElementById('ap-student').value);
  const value=parseInt(document.getElementById('ap-val').value)||0;
  if(value===0){toast('Valeur ne peut etre 0','er');return}
  DB.add('points',{studentId,teacherId:CU.id,category:document.getElementById('ap-cat').value,value,comment:document.getElementById('ap-comment').value.trim(),date:new Date().toISOString()});
  DB.add('notifications',{userId:studentId,text:`${value>0?'+':''}${value} points (${document.getElementById('ap-cat').value})`,read:false,ts:new Date().toISOString(),type:'points'});
  hideModal();toast('Points attribues');renderPage();updateNotifBadge();
}

/* ==================== UTILISATEURS (ADMIN PREFET) ==================== */
function renderUtilisateurs(){
  if(CU.role!=='prefet'){return '<div class="empty-s"><i class="fas fa-lock"></i><p>Acces reserve a l\'admin</p></div>'}
  const users=getSchoolUsers(CU.schoolId).filter(u=>u.role!=='coordinateur');
  return `<div class="ptitle">Gestion des Utilisateurs</div><div class="psub">${users.length} utilisateurs dans l'etablissement</div>
  <div style="margin-bottom:14px;display:flex;gap:8px">
    <button class="btn btn-s btn-p" onclick="showAddUser()"><i class="fas fa-plus"></i> Ajouter un utilisateur</button>
    <button class="btn btn-s btn-g" onclick="showSchoolCode()"><i class="fas fa-key"></i> Code d'etablissement</button>
  </div>
  <div class="card"><div class="tw"><table>
    <thead><tr><th>Nom</th><th>Email</th><th>Role</th><th>Telephone</th><th>Statut</th><th>Actions</th></tr></thead>
    <tbody>${users.map(u=>`<tr>
      <td><strong>${u.name}</strong></td><td>${u.email}</td><td><span class="badge bg-i">${ROLES[u.role]}</span></td><td>${u.phone||'-'}</td>
      <td>${u.active?'<span class="badge bg-ok">Actif</span>':'<span class="badge bg-d">Inactif</span>'}</td>
      <td><button class="btn btn-s btn-g" onclick="toggleUserStatus(${u.id})"><i class="fas fa-${u.active?'ban':'check'}"></i></button>
      ${u.role!=='prefet'?`<button class="btn btn-s btn-d" onclick="removeUser(${u.id})"><i class="fas fa-trash"></i></button>`:''}</td>
    </tr>`).join('')}</tbody>
  </table></div></div>`;
}
function showAddUser(){
  showModal('Ajouter un utilisateur',`
    <div class="fg"><label>Nom complet</label><input id="nu-name"></div>
    <div class="fg"><label>Email</label><input type="email" id="nu-email"></div>
    <div class="fg"><label>Telephone</label><input type="tel" id="nu-phone"></div>
    <div class="fg"><label>Role</label><select id="nu-role"><option value="enseignant">Enseignant</option><option value="eleve">Eleve</option><option value="parent">Parent</option></select></div>
    <div class="fg"><label>Mot de passe initial</label><input type="password" id="nu-pass" value="ChangeMe@2025"></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="saveNewUser()">Creer</button>`);
}
function saveNewUser(){
  const name=document.getElementById('nu-name').value.trim();if(!name){toast('Nom requis','er');return}
  const email=document.getElementById('nu-email').value.trim();
  if(!email){toast('Email requis','er');return}
  if(DB.get('users').find(u=>u.email.toLowerCase()===email.toLowerCase())){toast('Email deja utilise','er');return}
  const role=document.getElementById('nu-role').value;
  const newUser={name,email,pw:document.getElementById('nu-pass').value,role,schoolId:CU.schoolId,phone:document.getElementById('nu-phone').value.trim(),active:true};
  if(role==='eleve'){newUser.class='Nouveau';newUser.matricule='XX-2025-'+String(DB.get('users').filter(u=>u.role==='eleve').length+1).padStart(3,'0');newUser.dob='';newUser.parentId=null}
  if(role==='parent')newUser.childId=null;
  DB.add('users',newUser);
  hideModal();toast('Utilisateur cree');renderPage();
}
function toggleUserStatus(id){DB.upd('users',id,{active:!getUser(id).active});toast('Statut modifie');renderPage()}
function removeUser(id){if(!confirm('Supprimer cet utilisateur ?'))return;DB.rm('users',id);toast('Utilisateur supprime');renderPage()}
function showSchoolCode(){
  const s=getSchool(CU.schoolId);
  showModal('Code d\'etablissement',`
    <div style="text-align:center;padding:20px">
      <p style="font-size:13px;color:var(--mut);margin-bottom:12px">Partagez ce code pour permettre aux nouveaux membres de rejoindre votre etablissement :</p>
      <div style="font-size:28px;font-weight:800;letter-spacing:4px;color:var(--p);background:var(--bg);padding:16px 24px;border-radius:12px;border:2px dashed var(--pl)">${s?s.code:'-'}</div>
      <p style="font-size:11px;color:var(--mut);margin-top:12px">${s?s.name:''}</p>
    </div>
  `);
}

/* ==================== RENDU DES PAGES ==================== */
function renderPage(){
  const c=document.getElementById('content');
  Object.values(CHARTS).forEach(ch=>{if(ch&&ch.destroy)ch.destroy()});CHARTS={};
  switch(CP){
    case 'dashboard':c.innerHTML=renderDashboard();initDashCharts();break;
    case 'eleves':c.innerHTML=renderEleves();break;
    case 'rapports':c.innerHTML=renderRapports();break;
    case 'communications':c.innerHTML=renderCommunications();break;
    case 'messages':c.innerHTML=renderMessages();break;
    case 'paiements':c.innerHTML=renderPaiements();break;
    case 'points':c.innerHTML=renderPoints();break;
    case 'utilisateurs':c.innerHTML=renderUtilisateurs();break;
    case 'assistant':c.innerHTML=renderAssistant();break;
    case 'parametres':c.innerHTML=renderParametres();break;
    default:c.innerHTML='<div class="empty-s"><i class="fas fa-folder-open"></i><p>Page non trouvee</p></div>';
  }
}

/* ==================== TABLEAU DE BORD (FIXE - PAS DE SCROLL INFINI) ==================== */
function renderDashboard(){
  const sid=CU.schoolId;
  const students=getSchoolStudents(sid);
  const teachers=getSchoolTeachers(sid);
  const payments=DB.get('payments').filter(p=>p.schoolId===sid);
  const reports=DB.get('reports').filter(r=>r.schoolId===sid);
  const pts=DB.get('points').filter(p=>students.some(s=>s.id===p.studentId));
  const totalPaid=payments.reduce((s,p)=>s+p.paid,0);
  const totalDue=payments.reduce((s,p)=>s+p.amount,0);

  if(CU.role==='eleve'){
    const myPts=pts.filter(p=>p.studentId===CU.id).reduce((s,p)=>s+p.value,0);
    const myPay=payments.filter(p=>p.studentId===CU.id);
    return `<div class="dash-wrap">
      <div class="dash-stats">
        <div class="sc"><div class="sci g"><i class="fas fa-star"></i></div><div><div class="scv">${myPts}</div><div class="scl">Mes points</div></div></div>
        <div class="sc"><div class="sci a"><i class="fas fa-file-lines"></i></div><div><div class="scv">${myPay.filter(p=>p.status==='paid').length}/${myPay.length}</div><div class="scl">Paiements</div></div></div>
        <div class="sc"><div class="sci t"><i class="fas fa-envelope"></i></div><div><div class="scv">${DB.get('messages').filter(m=>m.to===CU.id||m.from===CU.id).length}</div><div class="scl">Messages</div></div></div>
        <div class="sc"><div class="sci r"><i class="fas fa-bullhorn"></i></div><div><div class="scv">${DB.get('communications').filter(c=>c.schoolId===sid&&c.scope==='ecole').length}</div><div class="scl">Communications</div></div></div>
      </div>
      <div class="dash-charts">
        <div class="cc"><h3>Evolution de mes points</h3><canvas id="chart-pts"></canvas></div>
        <div class="cc"><h3>Activites recentes</h3><div class="cb" style="overflow-y:auto">${renderDashActivities(sid)}</div></div>
      </div>
    </div>`;
  }
  if(CU.role==='parent'){
    const child=getUser(CU.childId);
    const childPts=child?pts.filter(p=>p.studentId===child.id).reduce((s,p)=>s+p.value,0):0;
    const childPay=child?payments.filter(p=>p.studentId===child.id):[];
    return `<div class="dash-wrap">
      <div class="dash-stats">
        <div class="sc"><div class="sci g"><i class="fas fa-user-graduate"></i></div><div><div class="scv">${child?child.name:'-'}</div><div class="scl">Mon enfant</div></div></div>
        <div class="sc"><div class="sci a"><i class="fas fa-star"></i></div><div><div class="scv">${childPts}</div><div class="scl">Points</div></div></div>
        <div class="sc"><div class="sci t"><i class="fas fa-money-bill-wave"></i></div><div><div class="scv">${fmtMoney(childPay.reduce((s,p)=>s+p.paid,0))}</div><div class="scl">Total paye</div></div></div>
        <div class="sc"><div class="sci r"><i class="fas fa-envelope"></i></div><div><div class="scv">${DB.get('messages').filter(m=>m.to===CU.id||m.from===CU.id).length}</div><div class="scl">Messages</div></div></div>
      </div>
      <div class="dash-charts">
        <div class="cc"><h3>Paiements de l'enfant</h3><canvas id="chart-pay"></canvas></div>
        <div class="cc"><h3>Activites recentes</h3><div class="cb" style="overflow-y:auto">${renderDashActivities(sid)}</div></div>
      </div>
    </div>`;
  }
  // Coordinateur, Prefet, Enseignant
  return `<div class="dash-wrap">
    <div class="dash-stats">
      <div class="sc"><div class="sci g"><i class="fas fa-user-graduate"></i></div><div><div class="scv">${students.length}</div><div class="scl">Eleves</div></div></div>
      <div class="sc"><div class="sci a"><i class="fas fa-chalkboard-user"></i></div><div><div class="scv">${teachers.length}</div><div class="scl">Enseignants</div></div></div>
      <div class="sc"><div class="sci t"><i class="fas fa-money-bill-wave"></i></div><div><div class="scv">${fmtMoney(totalPaid)}</div><div class="scl">Paye / ${fmtMoney(totalDue)}</div></div></div>
      <div class="sc"><div class="sci r"><i class="fas fa-file-lines"></i></div><div><div class="scv">${reports.length}</div><div class="scl">Rapports</div></div></div>
    </div>
    <div class="dash-charts">
      <div class="cc"><h3>Paiements par trimestre</h3><canvas id="chart-pay"></canvas></div>
      <div class="cc"><h3>Repartition des points</h3><canvas id="chart-pts-dist"></canvas></div>
    </div>
    <div class="dash-bottom">
      <div class="cc"><h3>Activite recente</h3><div class="cb" style="overflow-y:auto">${renderDashActivities(sid)}</div></div>
      <div class="cc"><h3>Actions rapides</h3><div class="cb" style="display:flex;flex-direction:column;gap:6px">${renderQuickActions()}</div></div>
    </div>
  </div>`;
}
function renderDashActivities(sid){
  const students=getSchoolStudents(sid);
  const payments=DB.get('payments').filter(p=>p.schoolId===sid);
  const reports=DB.get('reports').filter(r=>r.schoolId===sid);
  const acts=[
    {color:'var(--ok)',text:`${students.length} eleves inscrits`,time:'Cette saison'},
    {color:'var(--a)',text:`${payments.filter(p=>p.status==='paid').length} paiements completes`,time:'Ce trimestre'},
    {color:'var(--inf)',text:`${reports.filter(r=>r.status!=='brouillon').length} rapports deposés`,time:'En cours'},
    {color:'var(--warn)',text:`${payments.filter(p=>p.status==='unpaid').length} paiements en attente`,time:'Action requise'}
  ];
  return acts.map(a=>`<div class="act-item"><div class="act-dot" style="background:${a.color}"></div><div><div>${a.text}</div><div class="act-time">${a.time}</div></div></div>`).join('');
}
function renderQuickActions(){
  let btns='';
  if(CU.role==='enseignant')btns=`<button class="btn btn-s btn-p" onclick="nav('rapports')"><i class="fas fa-upload"></i> Deposer un rapport</button><button class="btn btn-s btn-g" onclick="nav('points')"><i class="fas fa-star"></i> Gerer les points</button>`;
  if(CU.role==='prefet')btns=`<button class="btn btn-s btn-p" onclick="nav('rapports')"><i class="fas fa-upload"></i> Deposer un rapport</button><button class="btn btn-s btn-a" onclick="nav('communications')"><i class="fas fa-bullhorn"></i> Publier une communication</button><button class="btn btn-s btn-g" onclick="nav('paiements')"><i class="fas fa-money-bill"></i> Enregistrer un paiement</button>`;
  if(CU.role==='coordinateur')btns=`<button class="btn btn-s btn-p" onclick="nav('rapports')"><i class="fas fa-file-lines"></i> Consulter les rapports</button><button class="btn btn-s btn-a" onclick="nav('communications')"><i class="fas fa-bullhorn"></i> Nouvelle communication</button>`;
  btns+=`<button class="btn btn-s btn-g" onclick="nav('messages')"><i class="fas fa-comments"></i> Messages</button><button class="btn btn-s btn-g" onclick="nav('assistant')"><i class="fas fa-robot"></i> Assistant IA</button>`;
  return btns;
}
function initDashCharts(){
  const sid=CU.schoolId;
  if(CU.role==='eleve'){
    const el=document.getElementById('chart-pts');if(!el)return;
    const pts=DB.get('points').filter(p=>p.studentId===CU.id).sort((a,b)=>new Date(a.date)-new Date(b.date));
    const cum=[];let s=0;pts.forEach(p=>{s+=p.value;cum.push(s)});
    CHARTS.pts=new Chart(el,{type:'line',data:{labels:pts.map(p=>fmtDate(p.date)),datasets:[{label:'Points cumules',data:cum,borderColor:'#40916C',backgroundColor:'rgba(64,145,108,.1)',fill:true,tension:.4,pointRadius:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});
    return;
  }
  if(CU.role==='parent'){
    const el=document.getElementById('chart-pay');if(!el)return;
    const child=getUser(CU.childId);if(!child)return;
    const pays=DB.get('payments').filter(p=>p.studentId===child.id);
    CHARTS.pay=new Chart(el,{type:'bar',data:{labels:pays.map(p=>p.term),datasets:[{label:'Paye',data:pays.map(p=>p.paid),backgroundColor:'#40916C'},{label:'Reste',data:pays.map(p=>p.amount-p.paid),backgroundColor:'#E2E2D8'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:10}}}},scales:{y:{beginAtZero:true}}}});
    return;
  }
  const el1=document.getElementById('chart-pay');
  const el2=document.getElementById('chart-pts-dist');
  if(el1){
    const pays=DB.get('payments').filter(p=>p.schoolId===sid);
    const terms=[...new Set(pays.map(p=>p.term))];
    CHARTS.pay=new Chart(el1,{type:'bar',data:{labels:terms,datasets:[{label:'Paye',data:terms.map(t=>pays.filter(p=>p.term===t).reduce((s,p)=>s+p.paid,0)),backgroundColor:'#40916C',borderRadius:6},{label:'Reste',data:terms.map(t=>pays.filter(p=>p.term===t).reduce((s,p)=>s+p.amount-p.paid,0)),backgroundColor:'#E2E2D8',borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:10}}}},scales:{y:{beginAtZero:true}}}});
  }
  if(el2){
    const students=getSchoolStudents(sid);
    const pts=DB.get('points').filter(p=>students.some(s=>s.id===p.studentId));
    const cats=['comportement','participation','devoir','examen'];
    CHARTS.ptsDist=new Chart(el2,{type:'doughnut',data:{labels:cats,datasets:[{data:cats.map(c=>pts.filter(p=>p.category===c).length),backgroundColor:['#1B4332','#40916C','#C77B30','#D4A017']}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:10}}}}}});
  }
}

/* ==================== ELEVES & CARTES D'IDENTITE ==================== */
function renderEleves(){
  const sid=CU.schoolId;
  const students=getSchoolStudents(sid);
  const canManage=CU.role==='prefet'||CU.role==='enseignant';
  return `<div class="ptitle">Gestion des Eleves</div><div class="psub">${students.length} eleves inscrits</div>
  <div class="tab-bar no-print">
    <button class="tab-btn act" onclick="switchElTab(this,'el-list')">Liste</button>
    <button class="tab-btn" onclick="switchElTab(this,'el-cards')">Cartes d'identite</button>
  </div>
  <div id="el-list">
    <div style="display:flex;gap:8px;margin-bottom:14px" class="no-print">
      <input type="text" placeholder="Rechercher un eleve..." oninput="filterStudents(this.value)" style="flex:1;padding:9px 14px;border:2px solid var(--brd);border-radius:10px;font-size:12px;background:var(--bg)">
      ${canManage?`<button class="btn btn-s btn-p" onclick="showAddStudent()"><i class="fas fa-plus"></i> Ajouter</button>`:''}
    </div>
    <div class="card"><div class="tw"><table id="el-table">
      <thead><tr><th>Matricule</th><th>Nom</th><th>Classe</th><th>Points</th><th>Paiement</th><th>Actions</th></tr></thead>
      <tbody>${students.map(s=>{
        const sPts=DB.get('points').filter(p=>p.studentId===s.id).reduce((a,p)=>a+p.value,0);
        const sPays=DB.get('payments').filter(p=>p.studentId===s.id);
        const lastPay=sPays[sPays.length-1];
        const payB=lastPay?(lastPay.status==='paid'?'<span class="badge bg-ok">Paye</span>':lastPay.status==='partial'?'<span class="badge bg-w">Partiel</span>':'<span class="badge bg-d">Impaye</span>'):'<span class="badge bg-d">Aucun</span>';
        return `<tr><td><strong>${s.matricule||'-'}</strong></td><td>${s.name}</td><td>${s.class||'-'}</td><td><strong style="color:${sPts>=0?'var(--ok)':'var(--err)'}">${sPts}</strong></td><td>${payB}</td><td class="no-print"><button class="btn btn-s btn-g" onclick="showStudentCard(${s.id})"><i class="fas fa-id-card"></i></button> ${canManage?`<button class="btn btn-s btn-g" onclick="editStudent(${s.id})"><i class="fas fa-pen"></i></button>`:''}</td></tr>`;
      }).join('')}</tbody>
    </table></div></div>
  </div>
  <div id="el-cards" class="hidden">
    <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">${students.map(s=>renderIDCard(s)).join('')}</div>
  </div>`;
}
function renderIDCard(s){
  const school=getSchool(s.schoolId);
  return `<div class="id-card" id="card-${s.id}">
    <div class="id-badge">ELEVE</div>
    <div class="id-photo">${s.photo?`<img src="${s.photo}" alt="photo">`:'<i class="fas fa-user"></i>'}</div>
    <div class="id-info">
      <h4>${s.name.toUpperCase()}</h4>
      <p><i class="fas fa-hashtag"></i> ${s.matricule||'N/A'}</p>
      <p><i class="fas fa-calendar"></i> ${s.dob?fmtDate(s.dob):'N/A'}</p>
      <p><i class="fas fa-chalkboard"></i> ${s.class||'N/A'}</p>
      <p><i class="fas fa-phone"></i> ${s.phone||'N/A'}</p>
    </div>
    <div class="id-school">${school?school.name.toUpperCase():''}<br>Annee 2025-2026</div>
  </div>`;
}
function showStudentCard(id){
  const s=getUser(id);if(!s)return;
  showModal('Carte d\'identite - '+s.name,`
    <div style="display:flex;justify-content:center;margin-bottom:16px">${renderIDCard(s)}</div>
    <div style="display:flex;gap:8px;justify-content:center" class="no-print">
      <button class="btn btn-s btn-p" onclick="printCard(${s.id})"><i class="fas fa-print"></i> Imprimer</button>
      <button class="btn btn-s btn-g" onclick="uploadStudentPhoto(${s.id})"><i class="fas fa-camera"></i> Photo</button>
    </div>
  `);
}
function printCard(id){
  const card=document.getElementById('card-'+id);if(!card)return;
  const w=window.open('','','width=400,height=300');
  w.document.write('<html><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Outfit,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#fff}.id-card{width:340px;height:210px;background:linear-gradient(135deg,#1B4332,#2D6A4F);border-radius:14px;padding:16px;color:#fff;display:flex;gap:14px;position:relative;overflow:hidden}.id-card::before{content:"";position:absolute;top:-30px;right:-30px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,.06)}.id-card::after{content:"";position:absolute;bottom:-20px;left:-20px;width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,.04)}.id-badge{position:absolute;top:10px;right:12px;background:#C77B30;color:#fff;font-size:7px;font-weight:700;padding:2px 8px;border-radius:10px;z-index:1}.id-photo{width:80px;height:100px;background:rgba(255,255,255,.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:32px;flex-shrink:0;overflow:hidden;border:2px solid rgba(255,255,255,.2)}.id-photo img{width:100%;height:100%;object-fit:cover}.id-info{flex:1;display:flex;flex-direction:column;gap:3px;position:relative;z-index:1}.id-info h4{font-size:13px;font-weight:700}.id-info p{font-size:10px;opacity:.85}.id-school{position:absolute;bottom:12px;right:14px;font-size:8px;opacity:.6;text-align:right;z-index:1}</style></head><body>'+card.outerHTML+'</body></html>');
  w.document.close();w.print();
}
function uploadStudentPhoto(id){
  IMG_CB=function(base64){
    DB.upd('users',id,{photo:base64});
    const card=document.getElementById('card-'+id);
    if(card){const ph=card.querySelector('.id-photo');ph.innerHTML='<img src="'+base64+'" alt="photo">'}
    toast('Photo mise a jour');
  };
  document.getElementById('img-input').click();
}
function showAddStudent(){
  showModal('Ajouter un eleve',`
    <div class="fg"><label>Nom complet</label><input id="ns-name" required></div>
    <div class="fg"><label>Date de naissance</label><input type="date" id="ns-dob"></div>
    <div class="fg"><label>Classe</label><input id="ns-class" placeholder="Ex: 6eme A"></div>
    <div class="fg"><label>Telephone</label><input type="tel" id="ns-phone"></div>
    <div class="fg"><label>Parent (optionnel)</label><select id="ns-parent"><option value="">Aucun</option>${DB.get('users').filter(u=>u.schoolId===CU.schoolId&&u.role==='parent').map(p=>'<option value="'+p.id+'">'+p.name+'</option>').join('')}</select></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="addStudent()">Ajouter</button>`);
}
function addStudent(){
  const name=document.getElementById('ns-name').value.trim();if(!name){toast('Nom requis','er');return}
  const school=getSchool(CU.schoolId);
  const mat=school?school.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)+'-'+new Date().getFullYear()+'-'+String(DB.get('users').filter(u=>u.role==='eleve'&&u.schoolId===CU.schoolId).length+1).padStart(3,'0'):'XX';
  DB.add('users',{name,dob:document.getElementById('ns-dob').value,class:document.getElementById('ns-class').value.trim(),phone:document.getElementById('ns-phone').value.trim(),role:'eleve',schoolId:CU.schoolId,active:true,matricule:mat,parentId:document.getElementById('ns-parent').value?parseInt(document.getElementById('ns-parent').value):null});
  hideModal();toast('Eleve ajoute');renderPage();
}
function editStudent(id){
  const s=getUser(id);if(!s)return;
  showModal('Modifier l\'eleve',`
    <div class="fg"><label>Nom complet</label><input id="es-name" value="${s.name}"></div>
    <div class="fg"><label>Date de naissance</label><input type="date" id="es-dob" value="${s.dob||''}"></div>
    <div class="fg"><label>Classe</label><input id="es-class" value="${s.class||''}"></div>
    <div class="fg"><label>Telephone</label><input type="tel" id="es-phone" value="${s.phone||''}"></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="saveStudent(${id})">Enregistrer</button>`);
}
function saveStudent(id){
  DB.upd('users',id,{name:document.getElementById('es-name').value.trim(),dob:document.getElementById('es-dob').value,class:document.getElementById('es-class').value.trim(),phone:document.getElementById('es-phone').value.trim()});
  hideModal();toast('Eleve mis a jour');renderPage();
}
function switchElTab(btn,tabId){
  btn.parentElement.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('act'));btn.classList.add('act');
  document.getElementById('el-list').classList.toggle('hidden',tabId!=='el-list');
  document.getElementById('el-cards').classList.toggle('hidden',tabId!=='el-cards');
}
function filterStudents(q){
  document.querySelectorAll('#el-table tbody tr').forEach(r=>{r.style.display=r.textContent.toLowerCase().includes(q.toLowerCase())?'':'none'});
}

/* ==================== RAPPORTS & DEPOTS AUTOMATIQUES ==================== */
function renderRapports(){
  const sid=CU.schoolId;
  let reports=DB.get('reports').filter(r=>r.schoolId===sid);
  const sL={brouillon:'Brouillon',depose_prefet:'Depose au Prefet',recu_prefet:'Recu par Prefet',depose_coord:'Depose a la Coord.',recu_coord:'Recu par Coord.',valide:'Valide',rejete:'Rejete'};
  const sC={brouillon:'bg-w',depose_prefet:'bg-i',recu_prefet:'bg-a',depose_coord:'bg-i',recu_coord:'bg-a',valide:'bg-ok',rejete:'bg-d'};
  const tL={pedagogique:'Pedagogique',discipline:'Discipline',financier:'Financier',activite:'Activite'};
  if(CU.role==='enseignant')reports=reports.filter(r=>r.authorId===CU.id);
  if(CU.role==='prefet')reports=reports.filter(r=>r.authorId===CU.id||r.toId===CU.id);
  if(CU.role==='coordinateur')reports=reports.filter(r=>r.toId===CU.id||r.status==='depose_coord'||r.status==='recu_coord');
  const canCreate=CU.role==='enseignant'||CU.role==='prefet';
  const canGen=CU.role==='prefet'||CU.role==='coordinateur';
  return `<div class="ptitle">Rapports & Depots</div><div class="psub">Gestion et depot de rapports scolaires</div>
  <div style="display:flex;gap:8px;margin-bottom:14px">
    ${canCreate?'<button class="btn btn-s btn-p" onclick="showNewReport()"><i class="fas fa-plus"></i> Nouveau rapport</button>':''}
    ${canGen?'<button class="btn btn-s btn-a" onclick="showGenReport()"><i class="fas fa-wand-magic-sparkles"></i> Generer un rapport</button>':''}
  </div>
  <div class="card"><div class="tw"><table>
    <thead><tr><th>Type</th><th>Titre</th><th>Auteur</th><th>Statut</th><th>Date</th><th>Actions</th></tr></thead>
    <tbody>${reports.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(r=>{
      const author=getUser(r.authorId);
      let actions='<button class="btn btn-s btn-g" onclick="viewReport('+r.id+')"><i class="fas fa-eye"></i></button>';
      if(CU.role==='prefet'&&r.toId===CU.id&&r.status==='depose_prefet')actions+=' <button class="btn btn-s btn-p" onclick="receiveReport('+r.id+')"><i class="fas fa-check"></i></button>';
      if(CU.role==='prefet'&&r.status==='recu_prefet')actions+=' <button class="btn btn-s btn-a" onclick="forwardReport('+r.id+')"><i class="fas fa-upload"></i></button> <button class="btn btn-s btn-d" onclick="rejectReport('+r.id+')"><i class="fas fa-times"></i></button>';
      if(CU.role==='coordinateur'&&r.toId===CU.id&&r.status==='depose_coord')actions+=' <button class="btn btn-s btn-p" onclick="receiveReport('+r.id+')"><i class="fas fa-check"></i></button>';
      if(CU.role==='coordinateur'&&r.status==='recu_coord')actions+=' <button class="btn btn-s btn-p" onclick="validateReport('+r.id+')"><i class="fas fa-check-double"></i> Valider</button>';
      if(r.status==='brouillon'&&r.authorId===CU.id)actions+=' <button class="btn btn-s btn-a" onclick="depositReport('+r.id+')"><i class="fas fa-upload"></i> Deposer</button> <button class="btn btn-s btn-d" onclick="DB.rm(\'reports\','+r.id+');renderPage();toast(\'Supprime\')"><i class="fas fa-trash"></i></button>';
      return '<tr><td><span class="badge bg-i">'+(tL[r.type]||r.type)+'</span></td><td><strong>'+r.title+'</strong></td><td>'+(author?author.name:'-')+'</td><td><span class="badge '+(sC[r.status]||'bg-w')+'">'+(sL[r.status]||r.status)+'</span></td><td>'+fmtDate(r.createdAt)+'</td><td>'+actions+'</td></tr>';
    }).join('')||'<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--mut)">Aucun rapport</td></tr>'}</tbody>
  </table></div></div>`;
}
function showNewReport(){
  showModal('Nouveau rapport',`
    <div class="fg"><label>Type</label><select id="nr-type"><option value="pedagogique">Pedagogique</option><option value="discipline">Discipline</option><option value="activite">Activite</option><option value="financier">Financier</option></select></div>
    <div class="fg"><label>Titre</label><input id="nr-title" required></div>
    <div class="fg"><label>Contenu</label><textarea id="nr-content" rows="6" placeholder="Redigez votre rapport..."></textarea></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="saveNewReport()">Enregistrer</button>`);
}
function saveNewReport(){
  const title=document.getElementById('nr-title').value.trim();if(!title){toast('Titre requis','er');return}
  let toId=null;
  if(CU.role==='enseignant'){const pr=DB.get('users').find(u=>u.schoolId===CU.schoolId&&u.role==='prefet');toId=pr?pr.id:null}
  DB.add('reports',{type:document.getElementById('nr-type').value,title,content:document.getElementById('nr-content').value,authorId:CU.id,schoolId:CU.schoolId,status:'brouillon',toId,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
  hideModal();toast('Rapport cree');renderPage();
}
function depositReport(id){
  if(CU.role==='enseignant'){const pr=DB.get('users').find(u=>u.schoolId===CU.schoolId&&u.role==='prefet');DB.upd('reports',id,{status:'depose_prefet',toId:pr?pr.id:null,updatedAt:new Date().toISOString()});if(pr)DB.add('notifications',{userId:pr.id,text:'Nouveau rapport de '+CU.name,read:false,ts:new Date().toISOString(),type:'report'})}
  hideModal();toast('Rapport depose');renderPage();updateNotifBadge();
}
function receiveReport(id){
  const r=DB.find('reports',id);if(!r)return;
  DB.upd('reports',id,{status:r.status==='depose_prefet'?'recu_prefet':'recu_coord',updatedAt:new Date().toISOString()});
  toast('Rapport recu');renderPage();
}
function forwardReport(id){
  const coord=DB.get('users').find(u=>u.schoolId===CU.schoolId&&u.role==='coordinateur');
  if(!coord){toast('Aucun coordinateur','er');return}
  const r=DB.find('reports',id);
  DB.upd('reports',id,{status:'depose_coord',toId:coord.id,updatedAt:new Date().toISOString()});
  DB.add('notifications',{userId:coord.id,text:'Rapport de '+CU.name+': '+(r?r.title:''),read:false,ts:new Date().toISOString(),type:'report'});
  toast('Rapport depose a la coordination');renderPage();updateNotifBadge();
}
function rejectReport(id){DB.upd('reports',id,{status:'rejete',updatedAt:new Date().toISOString()});toast('Rapport rejete','wa');renderPage()}
function validateReport(id){DB.upd('reports',id,{status:'valide',updatedAt:new Date().toISOString()});toast('Rapport valide');renderPage()}
function viewReport(id){
  const r=DB.find('reports',id);if(!r)return;
  const author=getUser(r.authorId);
  const sL={brouillon:'Brouillon',depose_prefet:'Depose au Prefet',recu_prefet:'Recu par Prefet',depose_coord:'Depose a la Coord.',recu_coord:'Recu par Coord.',valide:'Valide',rejete:'Rejete'};
  showModal(r.title,`
    <div style="display:flex;gap:8px;margin-bottom:14px"><span class="badge bg-i">${r.type}</span><span class="badge bg-a">${sL[r.status]||r.status}</span></div>
    <p style="font-size:12px;color:var(--mut);margin-bottom:12px">Auteur: ${author?author.name:'-'} | Cree: ${fmtDate(r.createdAt)} | Modifie: ${fmtDate(r.updatedAt)}</p>
    <div style="background:var(--bg);padding:16px;border-radius:10px;font-size:13px;line-height:1.7;white-space:pre-wrap">${r.content||'Aucun contenu'}</div>
  `);
}
function showGenReport(){
  const sid=CU.schoolId;const students=getSchoolStudents(sid);const teachers=getSchoolTeachers(sid);
  const payments=DB.get('payments').filter(p=>p.schoolId===sid);
  const pts=DB.get('points').filter(p=>students.some(s=>s.id===p.studentId));
  const totalPaid=payments.reduce((s,p)=>s+p.paid,0);const totalDue=payments.reduce((s,p)=>s+p.amount,0);
  let content='RAPPORT GENERE AUTOMATIQUEMENT\nEtablissement: '+(getSchool(sid)?.name||'')+'\nDate: '+fmtDate(new Date())+'\n'+'='.repeat(50)+'\n\n';
  content+='EFFECTIFS:\n- Eleves: '+students.length+'\n- Enseignants: '+teachers.length+'\n\n';
  content+='PAIEMENTS:\n- Total du: '+fmtMoney(totalDue)+'\n- Total paye: '+fmtMoney(totalPaid)+'\n- Taux: '+(totalDue?((totalPaid/totalDue)*100).toFixed(1):0)+'%\n\n';
  content+='POINTS:\n- Comportement: '+pts.filter(p=>p.category==='comportement').reduce((s,p)=>s+p.value,0)+'\n';
  content+='- Participation: '+pts.filter(p=>p.category==='participation').reduce((s,p)=>s+p.value,0)+'\n';
  content+='- Devoirs: '+pts.filter(p=>p.category==='devoir').reduce((s,p)=>s+p.value,0)+'\n';
  content+='- Examens: '+pts.filter(p=>p.category==='examen').reduce((s,p)=>s+p.value,0)+'\n';
  showModal('Generer un rapport automatique',`
    <div class="fg"><label>Type</label><select id="gr-type"><option value="pedagogique">Pedagogique</option><option value="financier">Financier</option><option value="activite">Activite</option></select></div>
    <div class="fg"><label>Titre</label><input id="gr-title" value="Rapport synthetique - ${fmtDate(new Date())}"></div>
    <div class="fg"><label>Contenu</label><textarea id="gr-content" rows="10" style="font-size:11px">${content}</textarea></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="saveGenReport()"><i class="fas fa-save"></i> Enregistrer</button><button class="btn btn-a" onclick="printGenReport()"><i class="fas fa-print"></i> Imprimer</button>`);
}
function saveGenReport(){
  const title=document.getElementById('gr-title').value.trim();if(!title){toast('Titre requis','er');return}
  let toId=null;
  if(CU.role==='prefet'){const c=DB.get('users').find(u=>u.schoolId===CU.schoolId&&u.role==='coordinateur');toId=c?c.id:null}
  DB.add('reports',{type:document.getElementById('gr-type').value,title,content:document.getElementById('gr-content').value,authorId:CU.id,schoolId:CU.schoolId,status:toId?'depose_coord':'brouillon',toId,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
  if(toId)DB.add('notifications',{userId:toId,text:'Rapport de '+CU.name+': '+title,read:false,ts:new Date().toISOString(),type:'report'});
  hideModal();toast('Rapport genere');renderPage();updateNotifBadge();
}
function printGenReport(){const c=document.getElementById('gr-content').value;const w=window.open('','','width=600');w.document.write('<pre style="font-family:monospace;font-size:12px;padding:20px">'+c+'</pre>');w.document.close();w.print()}

/* ==================== COMMUNICATIONS SCOLAIRES ==================== */
function renderCommunications(){
  const sid=CU.schoolId;
  let comms=DB.get('communications');
  if(CU.role==='coordinateur')comms=comms.filter(c=>c.scope==='prefets'||(c.scope==='ecole'&&c.schoolId===sid));
  else comms=comms.filter(c=>c.scope==='ecole'&&c.schoolId===sid);
  const canCreate=CU.role==='coordinateur'||CU.role==='prefet';
  const pL={haute:'Haute priorite',moyenne:'Moyenne',basse:'Basse'};
  const pC={haute:'bg-d',moyenne:'bg-w',basse:'bg-ok'};
  return `<div class="ptitle">Communications Scolaires</div><div class="psub">${CU.role==='coordinateur'?'Communications de la coordination':'Communications de l\'etablissement'}</div>
  ${canCreate?'<div style="margin-bottom:14px"><button class="btn btn-s btn-p" onclick="showNewComm()"><i class="fas fa-plus"></i> Nouvelle communication</button></div>':''}
  ${comms.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(c=>{
    const author=getUser(c.authorId);
    return '<div class="comm-card"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span class="badge '+(pC[c.priority]||'bg-w')+'">'+(pL[c.priority]||c.priority)+'</span>'+(c.scope==='prefets'?'<span class="badge bg-i">Coord. → Prefets</span>':'<span class="badge bg-ok">Etablissement</span>')+'</div><h4>'+c.title+'</h4><p>'+c.content+'</p>'+(c.img?'<img src="'+c.img+'" alt="image">':'')+'<div class="comm-meta"><span><i class="fas fa-user"></i> '+(author?author.name:'-')+'</span><span><i class="fas fa-calendar"></i> '+fmtDate(c.createdAt)+'</span></div></div>';
  }).join('')||'<div class="empty-s"><i class="fas fa-bullhorn"></i><p>Aucune communication</p></div>'}`;
}
function showNewComm(){
  const scopeOpts=CU.role==='coordinateur'?'<option value="prefets">Vers les prefets</option><option value="ecole">Vers un etablissement</option>':'<option value="ecole">Etablissement entier</option>';
  const schoolOpts=CU.role==='coordinateur'?DB.get('schools').map(s=>'<option value="'+s.id+'">'+s.name+'</option>').join(''):'';
  showModal('Nouvelle communication',`
    <div class="fg"><label>Destinataires</label><select id="nc-scope">${scopeOpts}</select></div>
    ${CU.role==='coordinateur'?'<div class="fg"><label>Etablissement</label><select id="nc-school">'+schoolOpts+'</select></div>':''}
    <div class="fg"><label>Priorite</label><select id="nc-prio"><option value="moyenne">Moyenne</option><option value="haute">Haute</option><option value="basse">Basse</option></select></div>
    <div class="fg"><label>Titre</label><input id="nc-title" required></div>
    <div class="fg"><label>Contenu</label><textarea id="nc-content" rows="5"></textarea></div>
    <div class="fg"><label>Image (optionnel)</label><button class="btn btn-s btn-g" onclick="IMG_CB=function(b){document.getElementById(\'nc-img-prev\').src=b;document.getElementById(\'nc-img-data\').value=b;document.getElementById(\'nc-img-prev\').classList.remove(\'hidden\')};document.getElementById(\'img-input\').click()"><i class="fas fa-image"></i> Ajouter une image</button><input type="hidden" id="nc-img-data"><img id="nc-img-prev" class="img-preview hidden"></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="saveNewComm()">Publier</button>`);
}
function saveNewComm(){
  const title=document.getElementById('nc-title').value.trim();if(!title){toast('Titre requis','er');return}
  const scope=document.getElementById('nc-scope').value;
  const schoolId=scope==='ecole'?(CU.role==='coordinateur'?parseInt(document.getElementById('nc-school').value):CU.schoolId):0;
  const img=document.getElementById('nc-img-data').value||null;
  DB.add('communications',{authorId:CU.id,schoolId,title,content:document.getElementById('nc-content').value,img,scope,priority:document.getElementById('nc-prio').value,createdAt:new Date().toISOString()});
  if(scope==='prefets'){DB.get('users').filter(u=>u.role==='prefet').forEach(p=>DB.add('notifications',{userId:p.id,text:'Communication de la coordination: '+title,read:false,ts:new Date().toISOString(),type:'info'}))}
  else{getSchoolUsers(schoolId).filter(u=>u.id!==CU.id).forEach(u=>DB.add('notifications',{userId:u.id,text:'Nouvelle communication: '+title,read:false,ts:new Date().toISOString(),type:'info'}))}
  hideModal();toast('Communication publiee');renderPage();updateNotifBadge();
}

/* ==================== MESSAGES (TEXTE + IMAGES) ==================== */
function renderMessages(){
  const convos=getConversations();
  return `<div class="ptitle">Messages</div><div class="psub">Echangez avec les membres de l'etablissement</div>
  <div class="msg-lay">
    <div class="ml">
      <div class="ml-head"><input type="text" placeholder="Rechercher..." oninput="filterConvos(this.value)"></div>
      <div id="msg-list">${convos.map(c=>{
        const other=getUser(c.otherId);if(!other)return '';
        return '<div class="mli'+(SEL_CONV===c.otherId?' act':'')+'" onclick="openConv('+c.otherId+')"><div class="ma">'+initials(other.name)+'</div><div style="flex:1;min-width:0"><div class="mn">'+other.name+' <span style="font-size:9px;color:var(--mut)">('+ROLES[other.role]+')</span></div><div class="mp">'+(c.lastMsg?(c.lastMsg.img?'<i class="fas fa-image"></i> Image':c.lastMsg.text):'Aucun message')+'</div></div><div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px"><span class="mt">'+(c.lastMsg?fmtTime(c.lastMsg.ts):'')+'</span>'+(c.unread?'<span style="width:8px;height:8px;border-radius:50%;background:var(--err)"></span>':'')+'</div></div>';
      }).join('')||'<div class="empty-s" style="padding:20px"><i class="fas fa-comments"></i><p>Aucune conversation</p></div>'}</div>
    </div>
    <div class="mc">
      ${SEL_CONV?'<div class="mc-h"><span>'+(getUser(SEL_CONV)?.name||'')+' ('+ROLES[getUser(SEL_CONV)?.role]+')</span></div><div class="mc-b" id="msg-bubbles">'+renderMsgBubbles(SEL_CONV)+'</div><div class="mc-i"><button class="img-btn" onclick="IMG_CB=function(b){sendMsg(b)};document.getElementById(\'img-input\').click()"><i class="fas fa-image"></i></button><input type="text" id="msg-input" placeholder="Ecrivez un message..." onkeydown="if(event.key===\'Enter\')sendMsg()"><button class="send-btn" onclick="sendMsg()"><i class="fas fa-paper-plane"></i></button></div>':'<div class="empty-s" style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center"><i class="fas fa-comments"></i><p>Selectionnez une conversation</p></div>'}
    </div>
  </div>`;
}
function getConversations(){
  const msgs=DB.get('messages').filter(m=>m.from===CU.id||m.to===CU.id);
  const otherIds=[...new Set(msgs.map(m=>m.from===CU.id?m.to:m.from))];
  const schoolUsers=getSchoolUsers(CU.schoolId).filter(u=>u.id!==CU.id);
  const allIds=[...new Set([...otherIds,...schoolUsers.map(u=>u.id)])];
  return allIds.map(oid=>{
    const cMsgs=msgs.filter(m=>(m.from===CU.id&&m.to===oid)||(m.from===oid&&m.to===CU.id)).sort((a,b)=>new Date(b.ts)-new Date(a.ts));
    return {otherId:oid,lastMsg:cMsgs[0]||null,unread:cMsgs.filter(m=>m.to===CU.id&&!m.read).length};
  }).filter(c=>getUser(c.otherId)).sort((a,b)=>(b.lastMsg?new Date(b.lastMsg.ts):0)-(a.lastMsg?new Date(a.lastMsg.ts):0));
}
function openConv(oid){
  SEL_CONV=oid;
  DB.get('messages').filter(m=>m.from===oid&&m.to===CU.id&&!m.read).forEach(m=>DB.upd('messages',m.id,{read:true}));
  buildNav();renderPage();
  setTimeout(()=>{const b=document.getElementById('msg-bubbles');if(b)b.scrollTop=b.scrollHeight},50);
}
function renderMsgBubbles(oid){
  return DB.get('messages').filter(m=>(m.from===CU.id&&m.to===oid)||(m.from===oid&&m.to===CU.id)).sort((a,b)=>new Date(a.ts)-new Date(b.ts)).map(m=>'<div class="mbub '+(m.from===CU.id?'s':'r')+'">'+m.text+(m.img?'<img src="'+m.img+'" alt="image">':'')+'<div class="bt">'+fmtTime(m.ts)+'</div></div>').join('');
}
function sendMsg(img){
  if(!SEL_CONV)return;
  const input=document.getElementById('msg-input');
  const text=img?'':input.value.trim();
  if(!text&&!img)return;
  DB.add('messages',{from:CU.id,to:SEL_CONV,text,ts:new Date().toISOString(),read:false,img:img||null});
  DB.add('notifications',{userId:SEL_CONV,text:'Message de '+CU.name,read:false,ts:new Date().toISOString(),type:'message'});
  if(input)input.value='';
  renderPage();
  setTimeout(()=>{const b=document.getElementById('msg-bubbles');if(b)b.scrollTop=b.scrollHeight},50);
  updateNotifBadge();
}
function filterConvos(q){document.querySelectorAll('.mli').forEach(el=>{el.style.display=el.textContent.toLowerCase().includes(q.toLowerCase())?'':'none'})}
function getMessageUnreadCount(){return DB.get('messages').filter(m=>m.to===CU.id&&!m.read).length}

/* ==================== PAIEMENTS MOBILE MONEY & CARTE BANCAIRE ==================== */
function renderPaiements(){
  const sid=CU.schoolId;
  let payments=DB.get('payments').filter(p=>p.schoolId===sid);
  if(CU.role==='eleve')payments=payments.filter(p=>p.studentId===CU.id);
  if(CU.role==='parent')payments=payments.filter(p=>p.studentId===CU.childId);
  const totalPaid=payments.reduce((s,p)=>s+p.paid,0);const totalDue=payments.reduce((s,p)=>s+p.amount,0);
  const canPay=CU.role==='prefet'||CU.role==='parent';
  return `<div class="ptitle">Paiements Scolaires</div><div class="psub">${fmtMoney(totalPaid)} payes sur ${fmtMoney(totalDue)} du</div>
  ${canPay?'<div style="margin-bottom:14px"><button class="btn btn-s btn-p" onclick="showNewPayment()"><i class="fas fa-plus"></i> Nouveau paiement</button></div>':''}
  <div class="card"><div class="tw"><table>
    <thead><tr><th>Eleve</th><th>Trimestre</th><th>Montant</th><th>Paye</th><th>Statut</th><th>Mode</th><th>Recu</th><th>Actions</th></tr></thead>
    <tbody>${payments.sort((a,b)=>new Date(b.date||0)-new Date(a.date||0)).map(p=>{
      const stu=getUser(p.studentId);const op=OPS.find(o=>o.id===p.method);
      const sB=p.status==='paid'?'<span class="badge bg-ok">Paye</span>':p.status==='partial'?'<span class="badge bg-w">Partiel</span>':'<span class="badge bg-d">Impaye</span>';
      return '<tr><td>'+(stu?stu.name:'-')+'</td><td>'+p.term+'</td><td>'+fmtMoney(p.amount)+'</td><td><strong>'+fmtMoney(p.paid)+'</strong></td><td>'+sB+'</td><td>'+(op?'<span style="color:'+op.color+';font-weight:600">'+op.name+'</span>':'-')+'</td><td>'+(p.receiptNo||'-')+'</td><td>'+(p.receiptNo?'<button class="btn btn-s btn-g" onclick="showReceipt('+p.id+')"><i class="fas fa-receipt"></i></button>':'')+'</td></tr>';
    }).join('')||'<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--mut)">Aucun paiement</td></tr>'}</tbody>
  </table></div></div>`;
}
// let SEL_OP='airtel';
function showNewPayment(){
  const students=getSchoolStudents(CU.schoolId);
  const sOpts=CU.role==='parent'?'<option value="'+CU.childId+'">'+(getUser(CU.childId)?.name||'Mon enfant')+'</option>':students.map(s=>'<option value="'+s.id+'">'+s.name+' ('+s.matricule+')</option>').join('');
  showModal('Nouveau paiement',`
    <div class="fg"><label>Eleve</label><select id="np-student">${sOpts}</select></div>
    <div class="fg"><label>Trimestre</label><select id="np-term"><option value="T1 2025">T1 2025</option><option value="T2 2025">T2 2025</option><option value="T3 2025">T3 2025</option></select></div>
    <div class="fg"><label>Montant du (CDF)</label><input type="number" id="np-amount" value="50000"></div>
    <div class="fg"><label>Montant paye (CDF)</label><input type="number" id="np-paid" value="50000"></div>
    <div class="fg"><label>Mode de paiement</label>
      <div class="ops-grid" id="np-ops">
        ${OPS.map((o,i)=>'<div class="op-card'+(i===0?' sel':'')+'" onclick="selectOp(\''+o.id+'\',this)"><div class="op-logo" style="color:'+o.color+'"><i class="fas '+o.icon+'"></i></div><div class="op-name">'+o.name+'</div></div>').join('')}
        <div class="op-card" onclick="selectOp('carte',this)"><div class="op-logo" style="color:var(--p)"><i class="fas fa-credit-card"></i></div><div class="op-name">Carte bancaire</div></div>
      </div>
      <input type="hidden" id="np-method" value="airtel">
    </div>
    <div class="fg" id="np-phone-grp"><label>Numero de telephone</label><input type="tel" id="np-phone" placeholder="+243 ..."></div>
    <div class="fg hidden" id="np-card-grp"><label>Numero de carte</label><input type="text" id="np-card" placeholder="XXXX XXXX XXXX XXXX" maxlength="19"></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="processPayment()"><i class="fas fa-check"></i> Confirmer</button>`);
  SEL_OP='airtel';
}
function selectOp(id,el){
  SEL_OP=id;document.querySelectorAll('#np-ops .op-card').forEach(c=>c.classList.remove('sel'));el.classList.add('sel');
  document.getElementById('np-method').value=id;
  document.getElementById('np-phone-grp').classList.toggle('hidden',id==='carte');
  document.getElementById('np-card-grp').classList.toggle('hidden',id!=='carte');
}
function processPayment(){
  const studentId=parseInt(document.getElementById('np-student').value);
  const amount=parseInt(document.getElementById('np-amount').value)||0;
  const paid=parseInt(document.getElementById('np-paid').value)||0;
  if(paid<=0){toast('Montant invalide','er');return}
  const method=document.getElementById('np-method').value;
  const phone=method!=='carte'?document.getElementById('np-phone').value.trim():'';
  const ref=genRef();const receiptNo=genReceiptNo(CU.schoolId);
  const status=paid>=amount?'paid':paid>0?'partial':'unpaid';
  DB.add('payments',{schoolId:CU.schoolId,studentId,amount,paid,status,term:document.getElementById('np-term').value,method,phone,ref,date:new Date().toISOString(),receiptNo});
  const stu=getUser(studentId);
  if(stu)DB.add('notifications',{userId:studentId,text:'Paiement de '+fmtMoney(paid)+' enregistre',read:false,ts:new Date().toISOString(),type:'payment'});
  if(stu&&stu.parentId)DB.add('notifications',{userId:stu.parentId,text:'Paiement de '+fmtMoney(paid)+' pour '+stu.name,read:false,ts:new Date().toISOString(),type:'payment'});
  hideModal();toast('Paiement enregistre');
  const payId=DB.get('payments').find(p=>p.ref===ref);
  if(payId)setTimeout(()=>showReceipt(payId.id),300);
  renderPage();updateNotifBadge();
}
function showReceipt(id){
  const p=DB.find('payments',id);if(!p)return;
  const stu=getUser(p.studentId);const school=getSchool(p.schoolId);const op=OPS.find(o=>o.id===p.method);
  showModal('Recu de paiement',`
    <div style="display:flex;justify-content:center"><div class="receipt">
      <h3><i class="fas fa-graduation-cap"></i> ${school?school.name:''}</h3>
      <div class="r-sub">${school?school.address:''}</div><hr>
      <div style="font-size:14px;font-weight:700;margin:8px 0">RECU DE PAIEMENT</div>
      <div class="r-row"><span>N° Recu</span><strong>${p.receiptNo}</strong></div>
      <div class="r-row"><span>Date</span><span>${fmtDate(p.date)}</span></div>
      <div class="r-row"><span>Eleve</span><strong>${stu?stu.name:'-'}</strong></div>
      <div class="r-row"><span>Matricule</span><span>${stu?stu.matricule:'-'}</span></div>
      <div class="r-row"><span>Trimestre</span><span>${p.term}</span></div><hr>
      <div class="r-row"><span>Montant du</span><span>${fmtMoney(p.amount)}</span></div>
      <div class="r-row"><span>Paye</span><span>${fmtMoney(p.paid)}</span></div>
      <div class="r-row"><span>Reste</span><span>${fmtMoney(p.amount-p.paid)}</span></div><hr>
      <div class="r-total">${fmtMoney(p.paid)}</div>
      ${op?'<div class="r-ops" style="color:'+op.color+'"><i class="fas '+op.icon+'"></i> '+op.name+'</div>':''}
      <div style="font-size:10px;color:var(--mut);margin-top:12px">Ref: ${p.ref}</div>
    </div></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Fermer</button><button class="btn btn-p" onclick="printReceipt(${id})"><i class="fas fa-print"></i> Imprimer</button>`);
}
function printReceipt(id){
  const p=DB.find('payments',id);if(!p)return;
  const stu=getUser(p.studentId);const school=getSchool(p.schoolId);const op=OPS.find(o=>o.id===p.method);
  const w=window.open('','','width=400');
  w.document.write('<html><head><title>Recu</title><style>body{font-family:sans-serif;padding:20px;text-align:center}h3{color:#1B4332}hr{border:none;border-top:1px dashed #ccc;margin:12px 0}.r{display:flex;justify-content:space-between;padding:4px 0;font-size:13px}.total{font-size:20px;font-weight:800;color:#1B4332;margin:8px 0}</style></head><body><h3>'+(school?school.name:'')+'</h3><p style="font-size:11px;color:#666">'+(school?school.address:'')+'</p><hr><p style="font-weight:700">RECU DE PAIEMENT</p><div class="r"><span>N°</span><strong>'+p.receiptNo+'</strong></div><div class="r"><span>Date</span><span>'+fmtDate(p.date)+'</span></div><div class="r"><span>Eleve</span><strong>'+(stu?stu.name:'')+'</strong></div><div class="r"><span>Matricule</span><span>'+(stu?stu.matricule:'')+'</span></div><div class="r"><span>Trimestre</span><span>'+p.term+'</span></div><hr><div class="r"><span>Du</span><span>'+fmtMoney(p.amount)+'</span></div><div class="r"><span>Paye</span><span>'+fmtMoney(p.paid)+'</span></div><div class="r"><span>Reste</span><span>'+fmtMoney(p.amount-p.paid)+'</span></div><div class="total">'+fmtMoney(p.paid)+'</div>'+(op?'<p style="color:'+op.color+';font-weight:600">'+op.name+'</p>':'')+'<p style="font-size:10px;color:#999;margin-top:16px">Ref: '+p.ref+'</p></body></html>');
  w.document.close();w.print();
}

/* ==================== GESTION DES POINTS ==================== */
function renderPoints(){
  const sid=CU.schoolId;
  if(CU.role==='eleve'){
    const pts=DB.get('points').filter(p=>p.studentId===CU.id).sort((a,b)=>new Date(b.date)-new Date(a.date));
    const total=pts.reduce((s,p)=>s+p.value,0);
    return `<div class="ptitle">Mes Points</div><div class="psub">Total: <strong style="color:${total>=0?'var(--ok)':'var(--err)'}">${total} points</strong></div>
    <div class="card"><div class="ch"><h3>Historique</h3></div><div class="cb"><table><thead><tr><th>Date</th><th>Categorie</th><th>Valeur</th><th>Commentaire</th><th>Enseignant</th></tr></thead><tbody>${pts.map(p=>{const t=getUser(p.teacherId);return '<tr><td>'+fmtDate(p.date)+'</td><td><span class="badge bg-i">'+p.category+'</span></td><td><strong style="color:'+(p.value>=0?'var(--ok)':'var(--err)')+'">'+(p.value>0?'+':'')+p.value+'</strong></td><td>'+(p.comment||'-')+'</td><td>'+(t?t.name:'-')+'</td></tr>'}).join('')||'<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--mut)">Aucun point</td></tr>'}</tbody></table></div></div>`;
  }
  if(CU.role==='parent'){
    const child=getUser(CU.childId);if(!child)return '<div class="empty-s"><p>Aucun enfant associe</p></div>';
    const pts=DB.get('points').filter(p=>p.studentId===child.id).sort((a,b)=>new Date(b.date)-new Date(a.date));
    const total=pts.reduce((s,p)=>s+p.value,0);
    return `<div class="ptitle">Points de ${child.name}</div><div class="psub">Total: <strong style="color:${total>=0?'var(--ok)':'var(--err)'}">${total} points</strong></div>
    <div class="card"><div class="cb"><table><thead><tr><th>Date</th><th>Categorie</th><th>Valeur</th><th>Commentaire</th></tr></thead><tbody>${pts.map(p=>'<tr><td>'+fmtDate(p.date)+'</td><td><span class="badge bg-i">'+p.category+'</span></td><td><strong style="color:'+(p.value>=0?'var(--ok)':'var(--err)')+'">'+(p.value>0?'+':'')+p.value+'</strong></td><td>'+(p.comment||'-')+'</td></tr>').join('')||'<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--mut)">Aucun point</td></tr>'}</tbody></table></div></div>`;
  }
  const students=getSchoolStudents(sid);
  const canAdd=CU.role==='enseignant';
  return `<div class="ptitle">Gestion des Points</div><div class="psub">${students.length} eleves</div>
  ${canAdd?'<div style="margin-bottom:14px"><button class="btn btn-s btn-p" onclick="showAddPoints()"><i class="fas fa-plus"></i> Attribuer des points</button></div>':''}
  <div class="pt-grid">${students.map(s=>{
    const sPts=DB.get('points').filter(p=>p.studentId===s.id);
    const total=sPts.reduce((a,p)=>a+p.value,0);
    const cats={comportement:0,participation:0,devoir:0,examen:0};
    sPts.forEach(p=>{if(cats.hasOwnProperty(p.category))cats[p.category]+=p.value});
    return '<div class="pt-card"><div class="pt-av">'+initials(s.name)+'</div><div style="flex:1"><div style="font-size:13px;font-weight:600">'+s.name+'</div><div style="font-size:11px;color:var(--mut)">'+(s.class||'')+' | '+(s.matricule||'')+'</div><div style="display:flex;gap:8px;margin-top:6px;font-size:10px"><span style="color:'+(cats.comportement>=0?'var(--ok)':'var(--err)')+'" title="Comportement"><i class="fas fa-heart"></i> '+cats.comportement+'</span><span style="color:var(--inf)" title="Participation"><i class="fas fa-hand"></i> '+cats.participation+'</span><span style="color:var(--a)" title="Devoir"><i class="fas fa-book"></i> '+cats.devoir+'</span><span style="color:var(--warn)" title="Examen"><i class="fas fa-pen"></i> '+cats.examen+'</span></div></div><div class="pt-val">'+total+'</div></div>';
  }).join('')}</div>`;
}
function showAddPoints(){
  const students=getSchoolStudents(CU.schoolId);
  showModal('Attribuer des points',`
    <div class="fg"><label>Eleve</label><select id="ap-student">${students.map(s=>'<option value="'+s.id+'">'+s.name+' ('+s.class+')</option>').join('')}</select></div>
    <div class="fg"><label>Categorie</label><select id="ap-cat"><option value="comportement">Comportement</option><option value="participation">Participation</option><option value="devoir">Devoir</option><option value="examen">Examen</option></select></div>
    <div class="fg"><label>Valeur (+ ou -)</label><input type="number" id="ap-val" value="1" min="-10" max="10"></div>
    <div class="fg"><label>Commentaire</label><input id="ap-comment" placeholder="Raison..."></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="savePoints()">Attribuer</button>`);
}
function savePoints(){
  const studentId=parseInt(document.getElementById('ap-student').value);
  const value=parseInt(document.getElementById('ap-val').value)||0;
  if(value===0){toast('Valeur ne peut etre 0','er');return}
  const cat=document.getElementById('ap-cat').value;
  DB.add('points',{studentId,teacherId:CU.id,category:cat,value,comment:document.getElementById('ap-comment').value.trim(),date:new Date().toISOString()});
  DB.add('notifications',{userId:studentId,text:(value>0?'+':'')+value+' points ('+cat+')',read:false,ts:new Date().toISOString(),type:'points'});
  hideModal();toast('Points attribues');renderPage();updateNotifBadge();
}

/* ==================== GESTION UTILISATEURS (ADMIN = PREFET) ==================== */
function renderUtilisateurs(){
  if(CU.role!=='prefet')return '<div class="empty-s"><i class="fas fa-lock"></i><p>Acces reserve a l\'admin</p></div>';
  const users=getSchoolUsers(CU.schoolId).filter(u=>u.role!=='coordinateur');
  return `<div class="ptitle">Gestion des Utilisateurs</div><div class="psub">${users.length} utilisateurs</div>
  <div style="margin-bottom:14px;display:flex;gap:8px">
    <button class="btn btn-s btn-p" onclick="showAddUser()"><i class="fas fa-plus"></i> Ajouter</button>
    <button class="btn btn-s btn-g" onclick="showSchoolCode()"><i class="fas fa-key"></i> Code d'etablissement</button>
  </div>
  <div class="card"><div class="tw"><table>
    <thead><tr><th>Nom</th><th>Email</th><th>Role</th><th>Telephone</th><th>Statut</th><th>Actions</th></tr></thead>
    <tbody>${users.map(u=>'<tr><td><strong>'+u.name+'</strong></td><td>'+u.email+'</td><td><span class="badge bg-i">'+ROLES[u.role]+'</span></td><td>'+(u.phone||'-')+'</td><td>'+(u.active?'<span class="badge bg-ok">Actif</span>':'<span class="badge bg-d">Inactif</span>')+'</td><td><button class="btn btn-s btn-g" onclick="toggleUserStatus('+u.id+')"><i class="fas fa-'+(u.active?'ban':'check')+'"></i></button>'+(u.role!=='prefet'?' <button class="btn btn-s btn-d" onclick="removeUser('+u.id+')"><i class="fas fa-trash"></i></button>':'')+'</td></tr>').join('')}</tbody>
  </table></div></div>`;
}
function showAddUser(){
  showModal('Ajouter un utilisateur',`
    <div class="fg"><label>Nom</label><input id="nu-name"></div>
    <div class="fg"><label>Email</label><input type="email" id="nu-email"></div>
    <div class="fg"><label>Telephone</label><input type="tel" id="nu-phone"></div>
    <div class="fg"><label>Role</label><select id="nu-role"><option value="enseignant">Enseignant</option><option value="eleve">Eleve</option><option value="parent">Parent</option></select></div>
    <div class="fg"><label>Mot de passe initial</label><input type="password" id="nu-pass" value="ChangeMe@2025"></div>
  `,`<button class="btn btn-g" onclick="hideModal()">Annuler</button><button class="btn btn-p" onclick="saveNewUser()">Creer</button>`);
}
function saveNewUser(){
  const name=document.getElementById('nu-name').value.trim();if(!name){toast('Nom requis','er');return}
  const email=document.getElementById('nu-email').value.trim();if(!email){toast('Email requis','er');return}
  if(DB.get('users').find(u=>u.email.toLowerCase()===email.toLowerCase())){toast('Email deja utilise','er');return}
  const role=document.getElementById('nu-role').value;
  const newUser={name,email,pw:document.getElementById('nu-pass').value,role,schoolId:CU.schoolId,phone:document.getElementById('nu-phone').value.trim(),active:true};
  if(role==='eleve'){newUser.class='Nouveau';newUser.matricule='XX-2025-'+String(DB.get('users').filter(u=>u.role==='eleve').length+1).padStart(3,'0');newUser.dob='';newUser.parentId=null}
  if(role==='parent')newUser.childId=null;
  DB.add('users',newUser);hideModal();toast('Utilisateur cree');renderPage();
}
function toggleUserStatus(id){DB.upd('users',id,{active:!getUser(id).active});toast('Statut modifie');renderPage()}
function removeUser(id){if(!confirm('Supprimer cet utilisateur ?'))return;DB.rm('users',id);toast('Utilisateur supprime');renderPage()}
function showSchoolCode(){
  const s=getSchool(CU.schoolId);
  showModal('Code d\'etablissement',`<div style="text-align:center;padding:20px"><p style="font-size:13px;color:var(--mut);margin-bottom:12px">Partagez ce code pour que de nouveaux membres rejoignent :</p><div style="font-size:28px;font-weight:800;letter-spacing:4px;color:var(--p);background:var(--bg);padding:16px 24px;border-radius:12px;border:2px dashed var(--pl)">${s?s.code:'-'}</div><p style="font-size:11px;color:var(--mut);margin-top:12px">${s?s.name:''}</p></div>`);
}

/* ==================== ASSISTANT IA RENFORCE (PAR ROLE) ==================== */
function renderAssistant(){
  const chatKey='ai_'+CU.id;
  const chats=DB.get('aiChats');
  let history=chats[chatKey]||[];
  const school=getSchool(CU.schoolId);
  const students=getSchoolStudents(CU.schoolId);
  const teachers=getSchoolTeachers(school?school.id:0);
  const payments=DB.get('payments').filter(p=>p.schoolId===CU.schoolId);
  const pts=DB.get('points').filter(p=>students.some(s=>s.id===p.studentId));

  // Sidebar stats selon le role
  let sideHtml='';
  if(CU.role==='coordinateur'){
    const reports=DB.get('reports').filter(r=>r.schoolId===CU.schoolId);
    sideHtml=`<div class="aic"><h4><i class="fas fa-building-columns"></i> Vue Coordination</h4>
      <div class="aic-sr"><span>Etablissements</span><span class="v">${DB.get('schools').length}</span></div>
      <div class="aic-sr"><span>Rapports recus</span><span class="v">${reports.filter(r=>r.status==='depose_coord'||r.status==='recu_coord').length}</span></div>
      <div class="aic-sr"><span>Rapports valides</span><span class="v">${reports.filter(r=>r.status==='valide').length}</span></div>
      <div class="aic-sr"><span>Communications envoyees</span><span class="v">${DB.get('communications').filter(c=>c.authorId===CU.id).length}</span></div>
    </div>`;
  } else if(CU.role==='prefet'){
    const reports=DB.get('reports').filter(r=>r.schoolId===CU.schoolId);
    sideHtml=`<div class="aic"><h4><i class="fas fa-shield-halved"></i> Vue Prefet</h4>
      <div class="aic-sr"><span>Eleves</span><span class="v">${students.length}</span></div>
      <div class="aic-sr"><span>Enseignants</span><span class="v">${teachers.length}</span></div>
      <div class="aic-sr"><span>Rapports a traiter</span><span class="v">${reports.filter(r=>r.toId===CU.id&&r.status!=='valide'&&r.status!=='rejete').length}</span></div>
      <div class="aic-sr"><span>Paiements en attente</span><span class="v">${payments.filter(p=>p.status==='unpaid').length}</span></div>
    </div>`;
  } else if(CU.role==='enseignant'){
    sideHtml=`<div class="aic"><h4><i class="fas fa-chalkboard-user"></i> Vue Enseignant</h4>
      <div class="aic-sr"><span>Mes eleves</span><span class="v">${students.length}</span></div>
      <div class="aic-sr"><span>Points attribues</span><span class="v">${pts.filter(p=>p.teacherId===CU.id).length}</span></div>
      <div class="aic-sr"><span>Rapports en cours</span><span class="v">${DB.get('reports').filter(r=>r.authorId===CU.id&&r.status==='brouillon').length}</span></div>
    </div>`;
  } else if(CU.role==='eleve'){
    const myPts=pts.filter(p=>p.studentId===CU.id).reduce((s,p)=>s+p.value,0);
    sideHtml=`<div class="aic"><h4><i class="fas fa-user-graduate"></i> Mon Profil</h4>
      <div class="aic-sr"><span>Mes points</span><span class="v">${myPts}</span></div>
      <div class="aic-sr"><span>Classe</span><span class="v">${CU.class||'-'}</span></div>
      <div class="aic-sr"><span>Matricule</span><span class="v">${CU.matricule||'-'}</span></div>
    </div>`;
  } else if(CU.role==='parent'){
    const child=getUser(CU.childId);
    const childPts=child?pts.filter(p=>p.studentId===child.id).reduce((s,p)=>s+p.value,0):0;
    sideHtml=`<div class="aic"><h4><i class="fas fa-people-roof"></i> Vue Parent</h4>
      <div class="aic-sr"><span>Mon enfant</span><span class="v">${child?child.name:'-'}</span></div>
      <div class="aic-sr"><span>Points de l'enfant</span><span class="v">${childPts}</span></div>
      <div class="aic-sr"><span>Paiements</span><span class="v">${payments.filter(p=>p.studentId===CU.childId).length}</span></div>
    </div>`;
  }

  // Suggestions selon le role
  let suggestions=[];
  if(CU.role==='coordinateur')suggestions=['Etat des rapports','Communications envoyees','Rapports a valider','Statistiques globales'];
  else if(CU.role==='prefet')suggestions=['Rapports a traiter','Paiements en attente','Effectifs de l\'etablissement','Deposer un rapport'];
  else if(CU.role==='enseignant')suggestions=['Mes rapports','Gestion des points','Etat des eleves','Deposer un rapport'];
  else if(CU.role==='eleve')suggestions=['Mes points','Mes paiements','Mes messages','Communications'];
  else if(CU.role==='parent')suggestions=['Points de mon enfant','Paiements','Communications','Messages'];

  const bubblesHtml=history.map(h=>'<div class="ab '+(h.role==='user'?'u':'b')+'">'+h.text+'<div class="at">'+fmtTime(h.ts)+'</div></div>').join('');

  return `<div class="ai-lay">
    <div class="ai-c">
      <div class="mc-h"><span><i class="fas fa-robot" style="color:var(--a);margin-right:6px"></i>Assistant IA — ${ROLES[CU.role]}</span></div>
      <div class="ai-cb" id="ai-bubbles">
        <div class="ab b"><strong>Bonjour ${CU.name.split(' ')[0]} !</strong><br>Je suis l'assistant digital d'EduGest adapte a votre role de ${ROLES[CU.role]}. Je peux vous aider avec les informations de ${(school?school.name:'votre etablissement')}. Que souhaitez-vous savoir ?
          <div class="ai-sug">${suggestions.map(s=>'<button class="ai-sb" onclick="askAI(\''+s.replace(/'/g,"\\'")+'\')">'+s+'</button>').join('')}</div>
        </div>
        ${bubblesHtml}
      </div>
      <div class="mc-i">
        <input type="text" id="ai-input" placeholder="Posez votre question..." onkeydown="if(event.key==='Enter')sendAI()">
        <button class="send-btn" onclick="sendAI()"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
    <div class="ai-s">${sideHtml}</div>
  </div>`;
}
function askAI(q){document.getElementById('ai-input').value=q;sendAI()}
function sendAI(){
  const input=document.getElementById('ai-input');if(!input)return;
  const q=input.value.trim();if(!q)return;input.value='';
  const chatKey='ai_'+CU.id;
  const chats=DB.get('aiChats');
  if(!chats[chatKey])chats[chatKey]=[];
  chats[chatKey].push({role:'user',text:q,ts:new Date().toISOString()});
  const answer=generateAIResponse(q);
  chats[chatKey].push({role:'bot',text:answer,ts:new Date().toISOString()});
  DB.set('aiChats',chats);
  renderPage();
  setTimeout(()=>{const b=document.getElementById('ai-bubbles');if(b)b.scrollTop=b.scrollHeight},50);
}
function generateAIResponse(q){
  const ql=q.toLowerCase();
  const sid=CU.schoolId;const school=getSchool(sid);
  const students=getSchoolStudents(sid);const teachers=getSchoolTeachers(sid);
  const payments=DB.get('payments').filter(p=>p.schoolId===sid);
  const pts=DB.get('points').filter(p=>students.some(s=>s.id===p.studentId));
  const reports=DB.get('reports').filter(r=>r.schoolId===sid);
  const comms=DB.get('communications').filter(c=>c.schoolId===sid&&c.scope==='ecole');
  const totalPaid=payments.reduce((s,p)=>s+p.paid,0);const totalDue=payments.reduce((s,p)=>s+p.amount,0);

  if(CU.role==='coordinateur'){
    // Le coordinateur voit la vue globale, les rapports venant des prefets
    if(ql.includes('rapport')){const pending=reports.filter(r=>r.status==='depose_coord'||r.status==='recu_coord');const validated=reports.filter(r=>r.status==='valide');return `<strong>Rapports pour ${school?school.name:''}</strong><br><br>- En attente de validation : <strong>${pending.length}</strong><br>- Validés : <strong>${validated.length}</strong><br>- Rejetés : <strong>${reports.filter(r=>r.status==='rejete').length}</strong><br><br>${pending.length?'Derniers rapports en attente :<br>'+pending.slice(0,3).map(r=>'- '+r.title+' ('+fmtDate(r.createdAt)+')').join('<br>'):'Aucun rapport en attente.'}`}
    if(ql.includes('communication')){const sent=DB.get('communications').filter(c=>c.authorId===CU.id);return `<strong>Vos communications</strong><br><br>Vous avez envoyé <strong>${sent.length}</strong> communications.<br>${sent.length?'Dernières :<br>'+sent.slice(0,3).map(c=>'- '+c.title+' ('+(c.scope==='prefets'?'Vers prefets':'Ecole')+')').join('<br>'):'Aucune communication envoyée.'}`}
    if(ql.includes('statistique')||ql.includes('global')){return `<strong>Statistiques globales</strong><br><br>- Etablissements : ${DB.get('schools').length}<br>- Total eleves (tous etablissements) : ${DB.get('users').filter(u=>u.role==='eleve').length}<br>- Rapports totaux : ${reports.length}<br>- Communications : ${DB.get('communications').length}`}
    if(ql.includes('valider')){const toVal=reports.filter(r=>r.status==='recu_coord');return toVal.length?'<strong>Rapports a valider :</strong><br><br>'+toVal.map(r=>'- '+r.title+' par '+(getUser(r.authorId)?.name||'-')).join('<br>'):'Aucun rapport a valider actuellement.'}
  }
  if(CU.role==='prefet'){
    // Le prefet gere l'interne, depose vers la coordination
    if(ql.includes('rapport')){const toRecv=reports.filter(r=>r.toId===CU.id&&r.status==='depose_prefet');const toFwd=reports.filter(r=>r.status==='recu_prefet');return `<strong>Rapports</strong><br><br>- A recevoir des enseignants : <strong>${toRecv.length}</strong><br>- A transmettre a la coordination : <strong>${toFwd.length}</strong><br>- Deposes a la coordination : <strong>${reports.filter(r=>r.status==='depose_coord').length}</strong><br><br>${toRecv.length?'En attente :<br>'+toRecv.map(r=>'- '+r.title).join('<br>'):'Rien en attente.'}`}
    if(ql.includes('paiement')){const unpaid=payments.filter(p=>p.status==='unpaid');return `<strong>Paiements - ${school?school.name:''}</strong><br><br>- Total du : ${fmtMoney(totalDue)}<br>- Total paye : ${fmtMoney(totalPaid)}<br>- Taux de recouvrement : ${totalDue?((totalPaid/totalDue)*100).toFixed(1):0}%<br>- Impayes : <strong>${unpaid.length}</strong>${unpaid.length?'<br><br>Eleves impayes :<br>'+unpaid.map(p=>'- '+(getUser(p.studentId)?.name||'-')+' ('+p.term+')').join('<br>'):''}`}
    if(ql.includes('effectif')){return `<strong>Effectifs - ${school?school.name:''}</strong><br><br>- Eleves : <strong>${students.length}</strong><br>- Enseignants : <strong>${teachers.length}</strong><br>- Parents : <strong>${DB.get('users').filter(u=>u.schoolId===sid&&u.role==='parent').length}</strong>`}
    if(ql.includes('deposer')){return 'Pour deposer un rapport, allez dans la section <strong>Rapports</strong> puis cliquez sur <strong>Nouveau rapport</strong> ou <strong>Generer un rapport</strong> pour un rapport automatique. Les rapports sont d\'abord enregistres en brouillon, puis vous pouvez les deposer.'}
  }
  if(CU.role==='enseignant'){
    // L'enseignant depose vers le prefet, gere les points
    if(ql.includes('rapport')){const my=reports.filter(r=>r.authorId===CU.id);return `<strong>Mes rapports</strong><br><br>- Brouillons : <strong>${my.filter(r=>r.status==='brouillon').length}</strong><br>- Deposes au prefet : <strong>${my.filter(r=>r.status==='depose_prefet').length}</strong><br>- Recus par prefet : <strong>${my.filter(r=>r.status==='recu_prefet').length}</strong><br>- Valides : <strong>${my.filter(r=>r.status==='valide').length}</strong>`}
    if(ql.includes('point')){const myPts=pts.filter(p=>p.teacherId===CU.id);return `<strong>Mes attributions de points</strong><br><br>Vous avez attribue <strong>${myPts.length}</strong> fois des points.<br>- Positifs : ${myPts.filter(p=>p.value>0).length}<br>- Negatifs : ${myPts.filter(p=>p.value<0).length}<br><br>Categories :<br>- Comportement : ${myPts.filter(p=>p.category==='comportement').length}<br>- Participation : ${myPts.filter(p=>p.category==='participation').length}<br>- Devoirs : ${myPts.filter(p=>p.category==='devoir').length}<br>- Examens : ${myPts.filter(p=>p.category==='examen').length}`}
    if(ql.includes('eleve')){return `<strong>Mes eleves - ${school?school.name:''}</strong><br><br>${students.slice(0,8).map(s=>{const sp=pts.filter(p=>p.studentId===s.id).reduce((a,p)=>a+p.value,0);return '- '+s.name+' ('+s.class+') : <strong>'+sp+' pts</strong>'}).join('<br>')}${students.length>8?'<br>... et '+(students.length-8)+' autres':''}`}
  }
  if(CU.role==='eleve'){
    if(ql.includes('point')){const myPts=pts.filter(p=>p.studentId===CU.id);const total=myPts.reduce((s,p)=>s+p.value,0);return `<strong>Mes points : ${total}</strong><br><br>Detaill :<br>${myPts.map(p=>'- '+p.category+' : '+(p.value>0?'+':'')+p.value+' ('+p.comment+') - '+fmtDate(p.date)).join('<br>')||'Aucun point attribue.'}`}
    if(ql.includes('paiement')){const myPay=payments.filter(p=>p.studentId===CU.id);return `<strong>Mes paiements</strong><br><br>${myPay.map(p=>'- '+p.term+' : '+fmtMoney(p.paid)+' / '+fmtMoney(p.amount)+' ('+p.status+')</p>').join('<br>')||'Aucun paiement enregistre.'}`}
    if(ql.includes('message')){const myMsgs=DB.get('messages').filter(m=>m.to===CU.id||m.from===CU.id);return `Vous avez <strong>${myMsgs.length}</strong> messages. Allez dans la section <strong>Messages</strong> pour les consulter.`}
    if(ql.includes('communication')){return comms.length?'<strong>Communications récentes :</strong><br><br>'+comms.slice(0,3).map(c=>'- '+c.title+' ('+fmtDate(c.createdAt)+')').join('<br>'):'Aucune communication récente.'}
  }
  if(CU.role==='parent'){
    const child=getUser(CU.childId);
    if(ql.includes('point')||ql.includes('enfant')){if(!child)return 'Aucun enfant associe a votre compte.';const childPts=pts.filter(p=>p.studentId===child.id);const total=childPts.reduce((s,p)=>s+p.value,0);return `<strong>Points de ${child.name} : ${total}</strong><br><br>Detaill :<br>${childPts.map(p=>'- '+p.category+' : '+(p.value>0?'+':'')+p.value+' - '+p.comment).join('<br>')||'Aucun point.'}`}
    if(ql.includes('paiement')){if(!child)return 'Aucun enfant associe.';const childPay=payments.filter(p=>p.studentId===child.id);return `<strong>Paiements de ${child.name}</strong><br><br>${childPay.map(p=>'- '+p.term+' : '+fmtMoney(p.paid)+' / '+fmtMoney(p.amount)+' ('+p.status+')').join('<br>')||'Aucun paiement.'}`}
    if(ql.includes('communication')){return comms.length?'<strong>Communications :</strong><br><br>'+comms.slice(0,3).map(c=>'- '+c.title).join('<br>'):'Aucune communication.'}
  }
  // Reponse generique
  return `Je suis l'assistant de <strong>${school?school.name:'votre etablissement'}</strong>. En tant que <strong>${ROLES[CU.role]}</strong>, vous pouvez me poser des questions sur :<br><br>${CU.role==='coordinateur'?'- Les rapports des prefets<br>- Les communications<br>- Les statistiques globales':CU.role==='prefet'?'- Les rapports a traiter/transmettre<br>- Les paiements<br>- Les effectifs':CU.role==='enseignant'?'- Mes rapports<br>- La gestion des points<br>- Les eleves':'- Mes points<br>- Mes paiements<br>- Les communications'}<br><br>Essayez de cliquer sur les suggestions ci-dessus !`;
}

/* ==================== PARAMETRES ==================== */
function renderParametres(){
  const school=getSchool(CU.schoolId);
  return `<div class="ptitle">Parametres</div><div class="psub">Configuration de votre compte</div>
  <div class="set-grid">
    <div class="set-card">
      <h3><i class="fas fa-user"></i> Profil</h3>
      <div class="set-row"><label>Nom</label><input type="text" id="set-name" value="${CU.name}"></div>
      <div class="set-row"><label>Email</label><input type="text" value="${CU.email}" disabled style="opacity:.6"></div>
      <div class="set-row"><label>Telephone</label><input type="text" id="set-phone" value="${CU.phone||''}"></div>
      <div class="set-row"><label>Role</label><span class="badge bg-i">${ROLES[CU.role]}</span></div>
      <div class="set-row"><label>Etablissement</label><span style="font-weight:600">${school?school.name:'-'}</span></div>
      <div style="margin-top:14px"><button class="btn btn-s btn-p" onclick="saveProfile()"><i class="fas fa-save"></i> Enregistrer</button></div>
    </div>
    <div class="set-card">
      <h3><i class="fas fa-lock"></i> Securite</h3>
      <div class="set-row"><label>Ancien mot de passe</label><input type="password" id="set-oldpw"></div>
      <div class="set-row"><label>Nouveau mot de passe</label><input type="password" id="set-newpw"></div>
      <div class="set-row"><label>Confirmer</label><input type="password" id="set-newpw2"></div>
      <div style="margin-top:14px"><button class="btn btn-s btn-a" onclick="changePassword()"><i class="fas fa-key"></i> Changer le mot de passe</button></div>
    </div>
    <div class="set-card">
      <h3><i class="fas fa-info-circle"></i> A propos</h3>
      <div class="set-row"><label>Application</label><span>EduGest Pro</span></div>
      <div class="set-row"><label>Version</label><span>2.0.0</span></div>
      <div class="set-row"><label>Periode</label><span>2025-2026</span></div>
      <div class="set-row"><label>Donnees</label><span>Stockees localement</span></div>
    </div>
    <div class="set-card">
      <h3><i class="fas fa-database"></i> Donnees</h3>
      <div class="set-row"><label>Stockage</label><span>${(new Blob([localStorage.getItem(DB._k)||'']).size/1024).toFixed(1)} KB</span></div>
      <div style="margin-top:14px;display:flex;gap:8px">
        <button class="btn btn-s btn-g" onclick="exportData()"><i class="fas fa-download"></i> Exporter</button>
        <button class="btn btn-s btn-d" onclick="if(confirm('Reinitialiser toutes les donnees ?')){DB.reset();location.reload()}"><i class="fas fa-trash"></i> Reinitialiser</button>
      </div>
    </div>
  </div>`;
}
function saveProfile(){
  DB.upd('users',CU.id,{name:document.getElementById('set-name').value.trim(),phone:document.getElementById('set-phone').value.trim()});
  CU=getUser(CU.id);document.getElementById('u-av').textContent=initials(CU.name);document.getElementById('u-nm').textContent=CU.name;
  toast('Profil mis a jour');
}
function changePassword(){
  const old=document.getElementById('set-oldpw').value;const np=document.getElementById('set-newpw').value;const np2=document.getElementById('set-newpw2').value;
  if(old!==CU.pw){toast('Ancien mot de passe incorrect','er');return}
  if(np!==np2){toast('Les mots de passe ne correspondent pas','er');return}
  if(np.length<8){toast('Minimum 8 caracteres','er');return}
  DB.upd('users',CU.id,{pw:np});CU=getUser(CU.id);
  document.getElementById('set-oldpw').value='';document.getElementById('set-newpw').value='';document.getElementById('set-newpw2').value='';
  toast('Mot de passe change');
}
function exportData(){
  const data=localStorage.getItem(DB._k)||'{}';
  const blob=new Blob([data],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='edugest_backup_'+new Date().toISOString().slice(0,10)+'.json';a.click();
  URL.revokeObjectURL(url);toast('Donnees exportees');
}

/* ==================== UPLOAD D'IMAGE ==================== */
function handleImgUpload(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=function(ev){
    const base64=ev.target.result;
    if(IMG_CB){IMG_CB(base64);IMG_CB=null}
  };
  reader.readAsDataURL(file);
  e.target.value='';
}

/* ==================== LANGUE ==================== */
function setLang(lang){
  document.querySelectorAll('.lang-sw button').forEach(b=>b.classList.remove('act'));
  event.target.classList.add('act');
  toast('Langue '+lang.toUpperCase()+' (bientot disponible)','in');
}

/* ==================== FERMETURE DROPMENUS AU CLIC EXTÉRIEUR ==================== */
document.addEventListener('click',function(e){
  const ud=document.getElementById('u-drop');if(ud&&!ud.classList.contains('hidden')){
    if(!e.target.closest('.umen'))ud.classList.add('hidden');
  }
  const np=document.getElementById('np');if(np&&!np.classList.contains('hidden')){
    if(!e.target.closest('.np')&&!e.target.closest('.tib')){np.classList.add('hidden');NPO=false}
  }
});

/* ==================== INITIALISATION ==================== */
DB.init();
setTimeout(()=>{
  const splash=document.getElementById('splash');
  splash.classList.add('out');
  setTimeout(()=>{
    splash.classList.add('hidden');
    checkSession();
    if(!CU)showScreen('login-screen');
  },500);
},1500);