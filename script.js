const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
window.addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('hide'),900));

// Music: starts at 0:14 and loops back to 0:14 forever.
const song=$('#song'), musicBtn=$('#musicBtn');
let musicStarted=false;
function playSong(){if(!song)return; if(song.currentTime<14 || song.currentTime>=song.duration-0.15) song.currentTime=14; song.volume=.72; song.play().then(()=>{musicStarted=true;musicBtn.classList.add('playing');musicBtn.innerHTML='❚❚ <span>Pausar canción</span>'}).catch(()=>{});}
song.addEventListener('ended',()=>{song.currentTime=14;playSong()});
// Some browsers don't honor ended when media is externally interrupted.
song.addEventListener('timeupdate',()=>{if(song.duration&&song.currentTime>=song.duration-.25){song.currentTime=14; if(!song.paused)song.play().catch(()=>{})}});
musicBtn.addEventListener('click',()=>{if(song.paused)playSong();else{song.pause();musicBtn.classList.remove('playing');musicBtn.innerHTML='♫ <span>Nuestra canción</span>'}});
$('#enterBtn').addEventListener('click',()=>{playSong();$('#comienzo').scrollIntoView({behavior:'smooth'})});$('#songPlay').addEventListener('click',playSong);

$$('[data-go]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.go;$('#'+id)?.scrollIntoView({behavior:'smooth'})}));

// Reveal animations.
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
$$('.reveal').forEach(e=>io.observe(e));

// Typewriter intro.
const lines=['Soley, si llegaste hasta aquí…','quiero que sepas que cada parte de esta página fue hecha pensando en ti.','No porque una página pueda explicar todo lo que siento,','sino porque quería dejarte un pequeño lugar al que puedas volver.','Uno donde siempre encuentres una foto, una canción y una razón para sonreír. 🩷'];let line=0,ch=0;function type(){const el=$('#typewriter');if(!el||line>=lines.length)return;if(ch<lines[line].length){el.textContent+=lines[line][ch++];setTimeout(type,28)}else{el.textContent+='\n';line++;ch=0;setTimeout(type,500)}}setTimeout(type,1100);

// Counter from Aug 28 2026 local midnight.
const start=new Date(2026,7,28,0,0,0);function counter(){let d=Math.max(0,Date.now()-start.getTime());let s=Math.floor(d/1000);$('#days').textContent=Math.floor(s/86400).toLocaleString('es-ES');$('#hours').textContent=String(Math.floor(s%86400/3600)).padStart(2,'0');$('#minutes').textContent=String(Math.floor(s%3600/60)).padStart(2,'0');$('#seconds').textContent=String(s%60).padStart(2,'0')}counter();setInterval(counter,1000);

// Photos and modal.
const photoData={
 '01':['assets/photos/01-original.jpeg','Un recuerdo que ya estaba aquí antes de que esta página tuviera forma.','Uno de nuestros recuerdos guardados.'],
 '02':['assets/photos/02-original.jpeg','Otro pedacito de nosotras.','Porque los detalles también cuentan nuestra historia.'],
 '03':['assets/photos/03-original.jpeg','Un momento que merece quedarse.','De esos que una guarda sin saber todavía cuánto significarán.'],
 '04':['assets/photos/04-original.jpeg','Un recuerdo nuestro.','Pequeño, real y completamente de nosotras.'],
 '05':['assets/photos/05-original.jpeg','Otra página de nuestra historia.','Porque cada foto puede esconder una anécdota.'],
 '06':['assets/photos/06-original.jpeg','Las manos, los detalles, nosotras.','Una imagen que guarda algo que las palabras no siempre explican.'],
 '07':['assets/photos/07-tobby.jpeg','Tobby 🐶','Nuestro hijo. El pequeño ladrón de calzones.'],
 '08':['assets/photos/08-flores.jpeg','21 de septiembre','Flores amarillas para mi amorch. 🌻'],
 '09':['assets/photos/09-luis-vega.jpeg','23 de septiembre','Luis Vega · la serenata.'],
 '10':['assets/photos/10-fexpocruz.jpeg','27 de septiembre','Sector ganadero · Fexpocruz.'],
 '11':['assets/photos/11-pijamada.jpeg','Una pijamada','Te quedaste dormida y yo tomé la foto. 🥹'],
 '12':['assets/photos/12-miniso.jpeg','Miniso','Un lugar que terminó guardando capítulos de nuestra historia.'],
 '13':['assets/photos/13-live.jpeg','El live','La gente se volvió loca. Y honestamente, entendible. 😭'],
 '14':['assets/photos/14-chimuelo.jpeg','Los anillos de Chimuelo 🐉','Porque sé cuánto te encanta Chimuelo.'],
 '15':['assets/photos/15-empezando.jpeg','Cuando recién empezaba todo','Cuando todavía no sabíamos todo lo que vendría.'],
 '16':['assets/photos/16-primer-beso.jpeg','28 de agosto de 2026','El momento literal del primer beso. El comienzo de nuestra historia. 🩷']
};
function openPhoto(id){const d=photoData[String(id).padStart(2,'0')];if(!d)return;$('#modalContent').innerHTML=`<img src="${d[0]}" alt="${d[1]}"><div class="modal-caption"><b>${d[1]}</b><p>${d[2]}</p></div>`;$('#modal').classList.add('show');$('#modal').setAttribute('aria-hidden','false');unlock('photo')}
$$('[data-photo]').forEach(e=>e.addEventListener('click',()=>openPhoto(e.dataset.photo)));$('#modalClose').addEventListener('click',closeModal);$('.modal-backdrop').addEventListener('click',closeModal);function closeModal(){$('#modal').classList.remove('show');$('#modal').setAttribute('aria-hidden','true')}document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

// Map pins.
$$('.map-pin').forEach(p=>p.addEventListener('click',()=>{const d=p.dataset;const photo=photoData[d.photo];$('#mapInfo').innerHTML=`<b>${d.place}</b><p><strong>${d.date}</strong> · ${d.story}</p>${photo?`<button class="map-memory-photo" data-map-photo="${d.photo}"><img src="${photo[0]}" alt="${photo[1]}"><span>ver el recuerdo 🩷</span></button>`:''}<a href="${d.map}" target="_blank" rel="noopener">abrir ubicación en Maps →</a>`;$('#mapInfo [data-map-photo]')?.addEventListener('click',()=>openPhoto(d.photo));unlock('map')}));

// Letters.
const letters={
 extrañes:{title:'Para cuando me extrañes',body:`Cuando me extrañes, quiero que recuerdes algo muy simple: siempre voy a contestarte. Siempre voy a estar aquí para ti. No quiero que un día difícil te haga pensar que estás sola. Puedes venir a mí, hablarme, buscarme, contarme cualquier tontería o simplemente decirme “te extraño”.\n\nNo prometo saber arreglar todo, pero sí prometo escucharte y acompañarte. Porque eres mi amorch y no quiero que olvides que tienes un lugar conmigo. 🩷\n\n— Manuela`},
 recuerdes:{title:'Para que nunca olvides lo que eres para mí',body:`Soley, eres única. No hay otra persona que sea exactamente tú, con tu carácter, tu determinación, tu forma de hablar, tus ocurrencias, tus ojos, tu manera de querer a tu familia y esa forma tuya de no dejarte por nadie.\n\nTe amo por lo que eres, no por una versión perfecta de ti. Te amo en lo bonito, en lo intenso, en lo gracioso y hasta en ese “ya me enojé, ay”.\n\nNunca quiero que olvides lo enorme que es el lugar que tienes en mi vida. 🩷\n\n— Manuela`},
 amor:{title:'Para cuando quieras saber qué significa nuestro amor',body:`Para mí, nuestro amor también significa querer poner a Dios en el centro. Quiero que nuestra relación tenga un amor que no dependa solamente de cómo nos sentimos un día, sino que también tenga fe, paciencia, cuidado y propósito.\n\nQuiero pedirle a Dios que cuide nuestra relación, que nos ayude a crecer, a perdonarnos, a hablarnos con amor y a construir algo bonito.\n\nY dentro de todo eso, estás tú: la persona que amo con todo mi corazón y con toda mi alma. 🩷\n\n— Manuela`},
 mejorando:{title:'Algo que nunca supe decirte',body:`Soley, estoy mejorando. Tal vez no siempre lo notes. Tal vez tampoco sepa decirte exactamente todo lo que estoy intentando cambiar. Pero estoy en ese proceso.\n\nNo quiero perderte. Y por eso quiero aprender a quererte mejor, escucharte mejor, cuidar lo que tenemos y crecer como persona. No te prometo que voy a ser perfecta; te prometo que voy a seguir intentándolo.\n\nTe amo, y eso también significa querer construir algo de lo que las dos podamos sentirnos orgullosas.\n\n— Manuela 🩷`}
};
$$('[data-letter]').forEach(b=>b.addEventListener('click',()=>{const d=letters[b.dataset.letter];$('#modalContent').innerHTML=`<div class="modal-caption"><span style="font-size:35px">💌</span><h2 style="font-size:45px">${d.title}</h2>${d.body.split('\n').map(x=>`<p style="font:18px/1.8 Georgia,serif">${x||'&nbsp;'}</p>`).join('')}</div>`;$('#modal').classList.add('show');unlock('letter')}));

// 100 reasons.
const reasons=[
'Porque eres tú, y eso ya significa muchísimo.','Porque amo tu carácter, incluso cuando tú no lo amas.','Porque tus ojos tienen una forma de hacerme olvidar lo que estaba diciendo.','Porque eres determinada.','Porque cuando quieres algo, vas por ello.','Porque no te dejas por nadie.','Porque ayudas a la gente.','Porque apoyas a quienes quieres.','Porque me das mi lugar.','Porque eres sincera.','Porque eres inteligente.','Porque eres amable.','Porque tienes destreza para hacer mil cosas.','Porque tu forma de hablar me encanta.','Porque no aceptas límites como si fueran definitivos.','Porque si encuentras un límite, intentas romperlo.','Porque te llevas tan bonito con tu familia.','Porque amo la forma en que quieres a tu padre.','Porque tu padre es un amor.','Porque eres muy fifi. Literalmente F-I-F-I. 😭','Porque dices “deja tu pitillerismo”.','Porque dices “ya me enojé, ay”.','Porque a veces me dices “Quéte”.','Porque dices “yo resuelvo”.','Porque haces que yo responda “pásame tu QR”.','Porque contigo podemos darnos besos y derretirnos.','Porque me haces reír.','Porque haces que un día normal tenga una anécdota.','Porque eres mi amorch.','Porque eres mi sol.','Porque eres mi persona favorita.','Porque aparecimos de la nada juntas.','Porque nuestra historia empezó sin un manual.','Porque sobrevivimos a mis cero indirectas captadas.','Porque todavía te acuerdas de todas esas indirectas.','Porque me encanta cuando me quieres hacer reír.','Porque me encanta cuando intentas animarme.','Porque hasta una pizza puede convertirse en un recuerdo de amor.','Porque me cuidaste cuando me sentía mal.','Porque hemos hablado hasta tarde.','Porque hemos dormido en videollamada.','Porque hiciste que una videollamada se sintiera como compañía real.','Porque conociste a mi madre.','Porque yo conocí a tu padre.','Porque compartimos nuestras familias.','Porque conociste a mi mejor amiga.','Porque conociste a Fernanda.','Porque hemos mezclado nuestros mundos.','Porque te dio pena saludar a mi hermano. 😭','Porque Tobby ahora tiene dos mamás.','Porque Tobby es parte de nuestra historia.','Porque tenemos historias absurdas que solo nosotras entendemos.','Porque Muxi forma parte del lore.','Porque los heladitos de porongo a las 3 a. m. forman parte del lore.','Porque eres influencer incluso cuando probablemente no estás intentando serlo.','Porque me encanta verte cumplir metas.','Porque quiero verte crecer.','Porque quiero verte feliz.','Porque quiero que consigas trabajos que te gusten.','Porque quiero que te valoren y no te exploten.','Porque quiero celebrar tus logros contigo.','Porque me gusta imaginar futuros contigo.','Porque quiero Tomorrowland contigo.','Porque quiero Maldivas contigo.','Porque me gusta imaginar atardeceres contigo.','Porque me gusta imaginar viajes contigo.','Porque me gusta imaginar más conciertos contigo.','Porque me gusta imaginar más pijamadas.','Porque quiero más conversaciones de madrugada.','Porque quiero más fotos feas que nos hagan reír.','Porque quiero más “yo resuelvo”.','Porque quiero más “pásame tu QR”.','Porque quiero más “deja tu pitillerismo”.','Porque quiero más “sos muy fifi”.','Porque quiero seguir aprendiendo tus palabras.','Porque quiero seguir aprendiendo tus silencios.','Porque me gusta cuando me miras.','Porque me gusta cuando me das besos.','Porque tus besos me derriten.','Porque me haces querer cuidar lo que tenemos.','Porque me haces querer ser mejor.','Porque me haces pensar en el futuro de una forma bonita.','Porque me recuerdas que el amor también está en los detalles.','Porque cada primera vez contigo se siente importante.','Porque nuestro primer beso tiene fecha.','Porque el 28 de agosto de 2026 ya no es una fecha cualquiera.','Porque tenemos lugares que cuentan historias.','Porque Century 21 Empire tiene un capítulo.','Porque Tulum tiene un capítulo.','Porque SONILUM tiene un capítulo.','Porque nuestras pijamadas tienen capítulos.','Porque cada recuerdo nuevo hace más grande esta historia.','Porque me gusta guardar nuestras fotos.','Porque quería hacerte esta página.','Porque quería que tuvieras un lugar al que volver.','Porque quiero que cuando me extrañes puedas encontrarme aquí.','Porque te amo por todo lo que eres.','Porque te elegiría otra vez.','Porque te elegiría todas las veces.','Porque simplemente eres Soley. 🩷'];
let ri=0;function showReason(){ri=(ri+1)%100;$('#reasonCounter').textContent=`RAZÓN ${String(ri+1).padStart(2,'0')} DE 100`;$('#reasonText').textContent=reasons[ri];$('#reasonBar').style.width=((ri+1)+'%');$('#reasonText').animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],500);if((ri+1)%10===0){unlock('reason'+ri);burst(8)}}$('#reasonBtn').addEventListener('click',showReason);

// Main quiz.
const quizQuestions=[
['¿Cómo empezó todo?',['A) Solo Manuela','B) Solo Soley','C) Las dos'],2],
['¿Dónde fue el primer beso?',['A) Aviator','B) Century 21 Empire','C) Tulum','D) SONILUM'],1],
['¿Quién dice “te extraño” primero?',['A) Manuela','B) Soley','C) Las dos'],0],
['¿Quién es más cariñosa?',['A) Manuela','B) Soley','C) Depende del día'],1],
['¿Quién es más celosa?',['A) Manuela','B) Soley','C) Las dos'],1],
['¿Cuál es la canción de ustedes?',['A) Préstame un beso','B) Otra','C) Ninguna'],0],
['¿Qué apodos son favoritos?',['A) Mi amor y mi sol','B) Reina y princesa','C) Fifi y Quéte'],0],
['Después de una pelea, ¿quién pide perdón primero?',['A) Manuela','B) Soley','C) Las dos'],0],
['¿Qué hace Soley que derrite a Manuela?',['A) Bailar','B) Darme besos','C) Cocinar'],1],
['La respuesta final es…',['A) Tobby','B) Chimuelo','C) Amor','D) Soley Beltran'],3]
];let qi=0;function renderQuiz(){const q=quizQuestions[qi];$('#quiz').innerHTML=`<div class="quiz-progress">PREGUNTA ${qi+1} DE ${quizQuestions.length}</div><div class="quiz-question">${q[0]}</div><div class="quiz-options">${q[1].map((o,i)=>`<button data-answer="${i}">${o}</button>`).join('')}</div><div class="quiz-feedback" id="quizFeedback"></div>`;$$('#quiz [data-answer]').forEach(b=>b.addEventListener('click',()=>{if(+b.dataset.answer===q[2]){if(qi<quizQuestions.length-1){$('#quizFeedback').textContent='¡SÍÍÍ! Sabía que lo sabías, amorch 🥹🩷';burst(6);qi++;setTimeout(renderQuiz,700)}else{unlock('quiz');$('#quiz').innerHTML=`<div class="quiz-result"><div class="big">🩷</div><h3>¡Terminaste el quiz!</h3><p>Si llegaste hasta aquí, significa que conoces bastante bien nuestra historia...</p><p>Pero hay una respuesta que nunca va a cambiar:</p><p><b>Tú eres mi persona favorita, Soley. 🩷</b></p><p>Y si tuviera que volver a elegirte, te elegiría todas las veces.</p><p class="signature">— Manuela 🩷</p></div>`}}else{$('#quizFeedback').textContent='Casi, amorch 😭🩷 inténtalo otra vez';burst(2)}}))}renderQuiz();

// Compatibility test.
const comp=[
['Después de una pelea, ¿quién dice “te amo” primero?',['Manuela','Soley','Las dos'],2],
['¿Quién empieza una guerra de cosquillas?',['Manuela','Soley','Las dos'],0],
['¿Quién mira a la otra cuando cree que no la están viendo?',['Manuela','Soley','Las dos'],2],
['Día libre juntas:',['Hacemos un plan exacto','Dormimos todo el día','Cada una por su lado','Lo que sea, mientras estemos juntas'],3],
['¿Quién dice “vamos a dormir” y termina hablando horas?',['Manuela','Soley','Las dos'],0],
['¿Quién da más besos?',['Manuela','Soley','Imposible contarlos'],2],
['Si una está triste, ¿qué hace la otra?',['Se va','La deja sola','Soley intenta animar a Manuela con besos'],2],
['¿Qué las representa?',['Que aparecieron de la nada juntas','El café','Los videojuegos'],0],
['Viaje de ensueño:',['París','Maldivas','Nueva York'],1],
['Una palabra para describir la relación:',['Caos','AMOR','FIFI'],1]
];
let ci=0;
function renderComp(){
  const q=comp[ci];
  $('#compat').innerHTML=`<div class="quiz-progress">COMPATIBILIDAD · ${ci+1}/10</div><div class="quiz-question">${q[0]}</div><div class="quiz-options">${q[1].map((o,i)=>`<button data-c="${i}">${o}</button>`).join('')}</div><div class="quiz-feedback" id="cf"></div>`;
  $$('#compat [data-c]').forEach(b=>b.addEventListener('click',()=>{
    if(+b.dataset.c!==q[2]){ $('#cf').textContent='Casi, amorch 😭🩷 inténtalo otra vez'; return; }
    ci++;
    if(ci<comp.length){ $('#cf').textContent='Exactamente. 🩷'; setTimeout(renderComp,450); }
    else{
      $('#compat').innerHTML=`<div class="quiz-result"><div class="big">100%</div><h3>SOLEY × MANUELA</h3><p>AMOR ∞ · BESOS ∞💋 · DERRETIRNOS 🔥🩷</p><p>Indirectas captadas: <b>0%</b> 😭</p><p>Pero una cosa sí quedó clarísima:</p><p class="big-final">AMOR</p><p>Y de alguna manera aparecieron de la nada juntas.</p></div>`;
      unlock('compat'); burst(12);
    }
  }));
}
renderComp();

// Heart hunt.
for(let i=0;i<5;i++){const b=document.createElement('button');b.className='hunt-heart';b.textContent='🩷';b.style.animationDelay=(i*.3)+'s';$('#heartHunt').appendChild(b);b.addEventListener('click',()=>{b.classList.add('found');const n=$$('.hunt-heart.found').length;$('#huntStatus').textContent=`${n} / 5 encontrados`;unlock('heart'+n);if(n===5){$('#huntFinish').classList.add('show');burst(15)}})}

// Gifts.
const gifts={hug:'ABRÁZAME 🫂 — Si estuviera ahí, te daría uno de esos abrazos que duran más de lo necesario.',kiss:'DAME UN BESO 💋 — Uno no alcanza. Necesitamos varios para derretirnos.',miss:'TE EXTRAÑO 💌 — Si pulsaste esto, ya sabes qué tienes que hacer: venir a hablarme.',night:'BUENAS NOCHES 🌙 — Si estás viendo esto de noche, en algún lugar estoy pensando en ti.',dont:'TE DIJE QUE NO LO TOCARAS 😭🩷 — Pero ya que lo hiciste: te amo, amorch.'};$$('[data-gift]').forEach(b=>b.addEventListener('click',()=>{toast(gifts[b.dataset.gift]);unlock('gift'+b.dataset.gift);burst(5)}));

// Secret AMOR.
$('#secretBtn').addEventListener('click',()=>{const v=$('#secretInput').value.trim().toUpperCase();if(v==='AMOR'){$('#secretFeedback').textContent='Sabía que la ibas a encontrar. 🥹';$('#secretLetter').classList.add('show');unlock('secret');burst(25)}else $('#secretFeedback').textContent='Mmm… no es esa, amorch 😭🩷 inténtalo otra vez.'});$('#secretInput').addEventListener('keydown',e=>{if(e.key==='Enter')$('#secretBtn').click()});

// Badges / discovery system.
const badgeData=[['kiss','💋','Primer beso','Encontraste el momento exacto.'],['map','🗺️','Nuestro mapa','Abriste un lugar de nuestra historia.'],['photo','📸','Álbum secreto','Abriste una foto.'],['letter','💌','Cartas abiertas','Leíste una carta.'],['quiz','🎮','Historia recordada','Terminaste el quiz.'],['compat','∞','100% compatibles','Terminaste la prueba.'],['reason9','💯','100 razones','Llegaste hasta el final de las razones.'],['heart5','🩷','Corazones encontrados','Encontraste los cinco.'],['secret','🔐','AMOR descubierto','Abriste el secreto.'],['giftDont','🚫','No tocar','Obviamente tocaste.'],['future','🌅','Soñamos juntas','Llegaste al futuro.'],['end','🏆','Capítulo final','Llegaste hasta aquí.']];const unlocked=new Set();function unlock(id){unlocked.add(id);if(id==='reason99')unlocked.add('reason9');if(id.startsWith('gift')&&id.includes('dont'))unlocked.add('giftDont');renderBadges();updateFlower()}function renderBadges(){const b=$('#badges');if(!b)return;b.innerHTML=badgeData.map(x=>`<div class="badge ${unlocked.has(x[0])?'unlocked':''}"><span>${x[1]}</span><b>${x[2]}</b><small>${x[3]}</small></div>`).join('');const count=unlocked.size;$('#completionText').textContent=`${count} descubrimientos desbloqueados · sigue explorando 🩷`};renderBadges();
function updateFlower(){const f=$('#flower');const t=$('#flowerText');const n=unlocked.size;if(n>=9){f.classList.add('grown');t.textContent='La flor ya creció. Igual que esta historia: cada pequeño gesto suma. 🌷🩷'}else t.textContent=`Está creciendo… ${n} pequeños descubrimientos la alimentan.`}

function burst(n=10){for(let i=0;i<n;i++){const p=document.createElement('span');p.className='petal';p.textContent=Math.random()>.4?'🩷':'✦';p.style.left=Math.random()*100+'vw';p.style.setProperty('--drift',(Math.random()*200-100)+'px');p.style.animationDuration=(3+Math.random()*3)+'s';$('#petals').appendChild(p);setTimeout(()=>p.remove(),7000)}}function toast(t){const x=$('#toast');x.textContent=t;x.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>x.classList.remove('show'),3500)}

// Stars for the night chapter.
for(let i=0;i<70;i++){const s=document.createElement('span');s.className='star';s.textContent=Math.random()>.7?'✦':'·';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.fontSize=(5+Math.random()*12)+'px';s.style.animationDelay=Math.random()*3+'s';$('#stars').appendChild(s)}

// A gentle night mode easter egg: press N.
document.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='n'){document.body.classList.toggle('night');toast(document.body.classList.contains('night')?'Modo noche 🌙':'Volvimos al día ☀️')}});
$('#futuro').addEventListener('click',()=>unlock('future'));new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)unlock('end')}),{threshold:.25}).observe($('#final'));$('#restartBtn').addEventListener('click',()=>{window.scrollTo({top:0,behavior:'smooth'});burst(20);toast('Otro capítulo, siempre. 🩷')});

// Extra: random hearts occasionally, but never enough to obstruct the page.
setInterval(()=>{if(Math.random()>.35)burst(1)},2800);

// Extended experience: progress, night mode, calendar, character test and future letter.
const journeyProgress=$('#journeyProgress'), completionMeter=$('#completionMeter');
function updateJourney(){const max=document.documentElement.scrollHeight-window.innerHeight;const pct=max>0?Math.min(100,Math.round(window.scrollY/max*100)):0;if(journeyProgress)journeyProgress.style.width=pct+'%';}
window.addEventListener('scroll',updateJourney,{passive:true});updateJourney();
const nightBtn=$('#nightBtn'); if(nightBtn){nightBtn.addEventListener('click',()=>{document.body.classList.toggle('night');nightBtn.textContent=document.body.classList.contains('night')?'☀️':'🌙';toast(document.body.classList.contains('night')?'Modo noche activado 🌙':'Modo día activado ☀️');});}
const calText={28:'28 de agosto de 2026 · el primer beso. El día que empezó nuestra historia. 🩷',30:'30 de agosto de 2026 · nuestra primera salida siendo algo.',10:'10 de septiembre de 2026 · nuestro primer concierto juntas.',21:'21 de septiembre de 2026 · flores amarillas para mi amorch. 🌻',23:'23 de septiembre de 2026 · la serenata de Luis Vega.',25:'25 de septiembre de 2026 · una de nuestras pijamadas.',27:'27 de septiembre de 2026 · sector ganadero en Fexpocruz.'};
$$('[data-cal]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.cal;$('#calendarMessage').textContent=calText[k];unlock('calendar');burst(3);}));
const characterResults=['💌 La romántica que guarda absolutamente todos los recuerdos.','🐶 La mamá de Tobby que todavía no supera lo del calzón.','😭 La que no captó las indirectas pero terminó viviendo la historia.','🎀 La fifi oficial de nuestra relación.','✨ La que dice “yo resuelvo” y después pasa el QR.','🌷 La que se derrite con un beso.'];
$('#characterBtn')?.addEventListener('click',()=>{const r=characterResults[Math.floor(Math.random()*characterResults.length)];$('#characterResult').textContent=r;unlock('character');burst(7);});
$('#futureLetterBtn')?.addEventListener('click',()=>{openLetterModal('Desde el futuro 🕊️',`Soley, si estás leyendo esto es porque pasó el tiempo y seguimos aquí. Quizá ya cumplimos algunos sueños y otros todavía están en camino. Quizá ya fuimos a Tomorrowland, quizá ya vimos juntas algún atardecer en Maldivas, quizá Tobby sigue siendo el pequeño jefe de la casa y quizá efectivamente terminamos con los famosos gemelos que tanto nos hacen bromear.\n\nPero si algo espero que nunca cambie es esto: que sigamos encontrando razones para elegirnos. Que tú sigas persiguiendo tus metas, que yo siga construyendo las mías, y que podamos mirarnos y decir “mira todo lo que hicimos”.\n\nOjalá hayas cumplido tus sueños, que hayas encontrado trabajos donde te valoren, que tu voz en redes haya crecido y que nunca hayas tenido que dejar de ser tú para conseguirlo. Y ojalá yo haya cumplido mi sueño de ser una gran ganadera agropecuaria.\n\nY si el futuro nos dio más historias, esta página probablemente se quedó pequeña. Porque contigo, la lista nunca termina.\n\n— Manuela 🩷`);unlock('futureLetter');burst(12);});
$('#exploreToast')?.addEventListener('click',()=>{toast('Pista: algunas cosas aparecen cuando tocas lo que parece decoración… 🩷');burst(5);});
function openLetterModal(title,body){$('#modalContent').innerHTML=`<div class="modal-caption"><span style="font-size:35px">✉️</span><h2 style="font-size:45px">${title}</h2>${body.split('\n').map(x=>`<p style="font:18px/1.8 Georgia,serif">${x||'&nbsp;'}</p>`).join('')}</div>`;$('#modal').classList.add('show');$('#modal').setAttribute('aria-hidden','false');}
badgeData.push(['calendar','📅','Calendario','Abriste una fecha de nuestra historia.'],['character','🎭','Personaje descubierto','Dejaste que el universo decidiera.'],['futureLetter','✉️','Carta del futuro','Abriste una carta que todavía no existe.']); renderBadges();
const oldUnlock=unlock; // keep existing discovery system and extend its visible meter
unlock=function(id){oldUnlock(id);const total=unlocked.size;const totalPossible=15;const pct=Math.min(100,Math.round(total/totalPossible*100));if(completionMeter)completionMeter.style.width=pct+'%';};
