/* ============ GROUPIES VINTAGE — interazioni ============ */
(function(){
  'use strict';

  var intro=document.getElementById('intro');
  if(intro){
    window.addEventListener('load',function(){setTimeout(function(){intro.classList.add('gone');},1150);});
    setTimeout(function(){intro.classList.add('gone');},2600);
  }

  /* orari (getDay 0=Dom..6=Sab): Mer 14:30–19:30, Gio–Ven 11:30–19:30, Sab 12:30–19 */
  var HOURS={0:[],1:[],2:[],3:[[14.5,19.5]],4:[[11.5,19.5]],5:[[11.5,19.5]],6:[[12.5,19]]};
  var DAYS_IT=['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
  var DAYS_EN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function romeNow(){try{return new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Rome'}));}catch(e){return new Date();}}
  function fmt(h){var hh=Math.floor(h),mm=Math.round((h-hh)*60);return hh+(mm?(':'+(mm<10?'0':'')+mm):'');}
  function computeStatus(){
    var now=romeNow(),d=now.getDay(),cur=now.getHours()+now.getMinutes()/60,today=HOURS[d]||[],i,w;
    for(i=0;i<today.length;i++){w=today[i];if(cur>=w[0]&&cur<w[1])return {open:true,until:w[1]};}
    for(i=0;i<today.length;i++){if(cur<today[i][0])return {open:false,next:today[i][0],nextDay:d,sameDay:true};}
    for(var k=1;k<=7;k++){var nd=(d+k)%7,arr=HOURS[nd]||[];if(arr.length)return {open:false,next:arr[0][0],nextDay:nd,sameDay:false};}
    return {open:false};
  }
  function renderStatus(lang){
    var s=computeStatus(),badge=document.getElementById('openBadge');if(!badge)return;
    var t=badge.querySelector('.t'),en=(lang==='en');badge.classList.toggle('op',s.open);
    if(s.open){t.innerHTML='<b>'+(en?'Open now':'Aperto ora')+'</b>'+(en?'until ':'fino alle ')+fmt(s.until);}
    else if(s.next!=null){var day=s.sameDay?(en?'today':'oggi'):(en?DAYS_EN[s.nextDay]:DAYS_IT[s.nextDay]);t.innerHTML='<b>'+(en?'Closed':'Chiuso')+'</b>'+(en?'opens ':'apre ')+day+' '+fmt(s.next);}
    else{t.innerHTML='<b>'+(en?'Closed':'Chiuso')+'</b>'+(en?'see hours':'vedi orari');}
  }
  function renderHours(lang){
    var box=document.getElementById('hoursList');if(!box)return;var en=(lang==='en'),today=romeNow().getDay(),order=[1,2,3,4,5,6,0];
    box.innerHTML=order.map(function(d){
      var arr=HOURS[d]||[],label=en?DAYS_EN[d]:DAYS_IT[d];
      var val=arr.length?arr.map(function(w){return fmt(w[0])+'–'+fmt(w[1]);}).join(' · '):(en?'Closed':'Chiuso');
      return '<div class="hourrow'+(d===today?' today':'')+'"><span class="d">'+label+'</span><span>'+val+'</span></div>';
    }).join('');
  }

  /* i18n */
  var I18N={en:{
    "nav.story":"The shop","nav.peso":"By weight","nav.remade":"Remade","nav.gallery":"Gallery","nav.visit":"Find us",
    "bar.book":"Shop online",
    "hero.kick":"Vintage · rock & streetstyle · Ticinese",
    "hero.h1":"Vintage rock,<br><em>remade by hand</em>",
    "hero.sub":"Curated '80s-to-2000s streetstyle in the Ticinese since 2011. One-of-a-kind pieces, reworked by hand — and a whole floor sold by the kilo.",
    "hero.book":"Shop online","hero.remade":"Remade by hand",
    "hero.f1n":"4,8★","hero.f1l":"129 reviews",
    "hero.f2n":"dal 2011","hero.f2l":"in Ticinese",
    "hero.f3n":"al kg","hero.f3l":"2° piano",
    "hero.tag":"pezzo unico","hero.tags":"rilavorato a mano",
    "ribbon":"VINTAGE · RILAVORATO A MANO · A PESO · ROCK · DENIM · PEZZO UNICO · STREETSTYLE · DAL 2011 ·",
    "story.kick":"Alice Di Cipriani · dal 2011",
    "story.h2":"Da un banco al mercato, <em>a Groupies</em>",
    "story.p1":"Alice Di Cipriani ha cominciato con un banco al mercato nel 2005 e nel 2011 ha aperto Groupies, in Ticinese. Stilista e cacciatrice di vintage, sceglie ogni capo a mano — rock, denim, streetstyle degli anni '80, '90 e 2000.",
    "story.pull":"«Non solo vintage: pezzi unici, riportati a nuova vita.»",
    "story.p2":"Goth, punk, skater, metal, glam: qui ogni sottocultura trova il suo pezzo. E molti capi li rilavora Alice, con dettagli raccolti nei suoi viaggi — un ricamo thailandese, una toppa messicana su una vecchia giacca.",
    "story.sign":"Alice Di Cipriani · titolare & stylist",
    "peso.kick":"La firma della casa",
    "peso.h2":"Il vintage <em>a peso</em>",
    "peso.sub":"Due piani, due modi di comprare. Sotto scegli il pezzo, sopra riempi la borsa e paghi al chilo — sulla bilancia.",
    "f1.num":"1° piano","f1.t":"A pezzo","f1.p":"Al piano terra i capi scelti e i pezzi unici rilavorati a mano, ognuno col suo prezzo.",
    "f1.big":"€",
    "f2.num":"2° piano","f2.t":"Al chilo","f2.p":"Di sopra il vintage a peso: riempi la borsa, la metti sulla bilancia e paghi quanto pesa.",
    "f2.big":"kg",
    "peso.note":"Il pezzo che cerchi, o la caccia al tesoro a peso. Decidi tu.",
    "remade.kick":"Il pezzo unico",
    "remade.h2":"Rilavorato <em>a mano</em>",
    "remade.p1":"Groupies non è solo un negozio di vintage: è un laboratorio. Alice prende capi di un tempo e li ricuce, li customizza, li porta a nuova vita — così che nessun pezzo sia uguale a un altro.",
    "remade.p2":"Un ricamo raccolto in viaggio, una toppa, un taglio nuovo su una vecchia giacca di jeans. È vintage, ma è anche unico — e in molti casi, letteralmente uno solo al mondo.",
    "rt1":"Denim customizzato","rt2":"Giacche patchwork","rt3":"Capi rock","rt4":"Pezzi unici",
    "gal.kick":"In negozio",
    "gal.h2":"Tra i <em>rack</em>",
    "rev.kick":"La voce dei clienti","rev.h2":"Recensioni","rev.sub":"4,8 su Google · 129 recensioni",
    "rc1":"“The perfect vintage shop in Milan. Both the kilo sale upstairs and the individually priced items downstairs were great quality, and the vibe was very chill. The owner is so lovely. Grazie mille!”",
    "rc1m":"Georgina Brown · Google",
    "rc2":"“Easily the best find of my two weeks in Milan, and one that truly matched my style. The collection is incredibly well-curated. What makes it a 10/10 is the owner's energy.”",
    "rc2m":"Andy Hanul Lee · Google",
    "rc3":"«Bellissimo negozio, pezzi unici: ho trovato proprio quello che stavo cercando. Proprietaria disponibile e gentilissima. Super consigliato!»",
    "rc3m":"Recensione Google",
    "visit.kick":"Dove siamo","visit.h2":"Via G. G. Mora 7, Ticinese",
    "visit.addr":"Address","visit.hours":"Opening hours","visit.phone":"Phone","visit.shop":"Online shop","visit.book":"Shop online","visit.dir":"Directions",
    "faq.kick":"Good to know","faq.h2":"Questions & answers",
    "q1":"Where is Groupies and since when?","a1":"We're at Via Gian Giacomo Mora 7, in the Ticinese, a few steps from the Colonne di San Lorenzo. Alice opened the shop in 2011, after starting at a market stall in 2005.",
    "q2":"What does «al chilo» mean?","a2":"The ground floor has hand-picked pieces, each with its own price. Upstairs is the kilo floor: fill your bag, put it on the scale and pay by weight — a proper treasure hunt.",
    "q3":"What is «rilavorato a mano»?","a3":"Alice reworks many garments by hand — customising and repairing vintage into one-of-a-kind pieces, often with details she collects on her travels, so no two are alike.",
    "q4":"What kind of vintage do you have?","a4":"'80s to 2000s streetstyle, rock and denim, with pieces for goth, punk, skater and glam styles. Alice is a stylist and her own collection is on sale in the shop.",
    "q5":"Can I buy online?","a5":"Yes — a selection is on our online shop (groupiesvintage.bigcartel.com). But the kilo floor and the reworked pieces are best hunted in person.",
    "ft.tag":"Vintage rock & streetstyle in the Ticinese since 2011. Hand-picked and hand-remade pieces — and a whole floor sold by the kilo.",
    "ft.explore":"Explore","ft.contact":"Contact","ft.rights":"Demo site — not the official shop site.",
    "ft.disc":"Independent demonstration site created to show a possible online presence for Groupies Vintage. Photos, reviews and details come from public sources (Google Maps and press) and belong to their owners. Not affiliated with the shop."
  }};
  var current='it',ITCACHE={};
  function collectIT(){document.querySelectorAll('[data-i18n]').forEach(function(el){ITCACHE[el.getAttribute('data-i18n')]=el.innerHTML;});}
  function apply(lang){
    current=lang;var dict=(lang==='en')?I18N.en:null;
    document.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(lang==='en'){if(dict[k]!=null)el.innerHTML=dict[k];}else{if(ITCACHE[k]!=null)el.innerHTML=ITCACHE[k];}});
    document.documentElement.lang=lang;
    document.querySelectorAll('.lang button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-l')===lang);});
    renderHours(lang);renderStatus(lang);
  }

  function initReveal(){
    var els=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');});return;}
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
    els.forEach(function(e){io.observe(e);});
  }

  document.addEventListener('DOMContentLoaded',function(){
    collectIT();
    document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){apply(b.getAttribute('data-l'));});});
    var burger=document.querySelector('.burger'),links=document.querySelector('nav.links');
    if(burger){burger.addEventListener('click',function(){
      if(links.style.display==='flex'){links.style.display='';}
      else{links.style.display='flex';links.style.position='absolute';links.style.top='66px';links.style.right='18px';links.style.flexDirection='column';links.style.background='var(--concrete)';links.style.padding='16px 20px';links.style.border='2px solid var(--ink)';links.style.boxShadow='var(--shadow)';}
    });}
    document.querySelectorAll('nav.links a').forEach(function(a){a.addEventListener('click',function(){if(links&&window.innerWidth<=940)links.style.display='';});});
    renderHours('it');renderStatus('it');initReveal();
    setInterval(function(){renderStatus(current);},60000);
  });
})();
