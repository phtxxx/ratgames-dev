'use strict';
(()=>{
const $=id=>document.getElementById(id);
const arena=$('arena'),scoreEl=$('score'),timeEl=$('time'),bestEl=$('best'),message=$('message'),status=$('status');
const startBtn=$('start'),pauseBtn=$('pause'),resetBtn=$('reset'),difficulty=$('difficulty');
const config={easy:{interval:1100,life:1800,size:75},normal:{interval:800,life:1250,size:62},hard:{interval:540,life:900,size:49}};
let running=false,paused=false,score=0,time=45,best=0,spawnTimer=null,tickTimer=null,targets=new Set(),remaining=0;
try{best=Number(localStorage.getItem('ratgames-dev-arena-best'))||0;}catch{}
bestEl.textContent=best;
function clearTimers(){clearInterval(spawnTimer);clearInterval(tickTimer);spawnTimer=tickTimer=null;}
function clearTargets(){for(const t of targets){clearTimeout(t.timer);t.el.remove();}targets.clear();}
function show(title,desc){message.hidden=false;message.innerHTML='';const h=document.createElement('h2'),p=document.createElement('p');h.textContent=title;p.textContent=desc;message.append(h,p);}
function update(){scoreEl.textContent=score;timeEl.textContent=time;bestEl.textContent=best;}
function finish(){running=false;paused=false;clearTimers();clearTargets();pauseBtn.disabled=true;startBtn.disabled=false;startBtn.textContent='▶ Jogar novamente';difficulty.disabled=false;status.textContent='Partida encerrada';show('Fim de jogo!','Você fez '+score+' pontos. Clique em Jogar novamente.');}
function addTarget(){
 if(!running||paused||targets.size>=8)return;
 const cfg=config[difficulty.value],gold=Math.random()<.18,el=document.createElement('button');
 const size=cfg.size;el.type='button';el.className='target'+(gold?' gold':'');el.textContent=gold?'★':'●';el.setAttribute('aria-label',gold?'Alvo dourado, 30 pontos':'Alvo, 10 pontos');el.style.width=size+'px';el.style.height=size+'px';
 el.style.left=Math.random()*Math.max(0,arena.clientWidth-size-8)+4+'px';el.style.top=Math.random()*Math.max(0,arena.clientHeight-size-8)+4+'px';
 const t={el,timer:null,remaining:cfg.life,created:Date.now()};
 const expire=()=>{targets.delete(t);el.remove();};
 function arm(){t.created=Date.now();t.timer=setTimeout(expire,t.remaining);}
 el.addEventListener('click',()=>{
  if(!running||paused)return;
  clearTimeout(t.timer);targets.delete(t);const points=gold?30:10;score+=points;
  if(score>best){best=score;try{localStorage.setItem('ratgames-dev-arena-best',String(best));}catch{}}
  update();const fx=document.createElement('div');fx.className='float';fx.textContent='+'+points;fx.style.left=el.style.left;fx.style.top=el.style.top;fx.style.color=gold?'#ffe16c':'#8af9de';arena.append(fx);setTimeout(()=>fx.remove(),750);el.remove();
 });
 arena.append(el);targets.add(t);arm();
}
function start(){
 clearTimers();clearTargets();running=true;paused=false;score=0;time=45;remaining=0;message.hidden=true;difficulty.disabled=true;startBtn.disabled=true;pauseBtn.disabled=false;pauseBtn.textContent='⏸ Pausar';status.textContent='Partida em andamento';update();arena.focus();
 const cfg=config[difficulty.value];addTarget();spawnTimer=setInterval(addTarget,cfg.interval);tickTimer=setInterval(()=>{if(paused)return;time--;update();if(time<=0)finish();},1000);
}
function togglePause(){
 if(!running)return;paused=!paused;
 if(paused){clearTimers();for(const t of targets){clearTimeout(t.timer);t.remaining=Math.max(1,t.remaining-(Date.now()-t.created));}show('Pausado','Clique em Continuar para retomar.');status.textContent='Pausado';pauseBtn.textContent='▶ Continuar';}
 else{message.hidden=true;for(const t of targets){t.created=Date.now();t.timer=setTimeout(()=>{targets.delete(t);t.el.remove();},t.remaining);}const cfg=config[difficulty.value];spawnTimer=setInterval(addTarget,cfg.interval);tickTimer=setInterval(()=>{time--;update();if(time<=0)finish();},1000);status.textContent='Partida em andamento';pauseBtn.textContent='⏸ Pausar';arena.focus();}
}
startBtn.addEventListener('click',start);pauseBtn.addEventListener('click',togglePause);resetBtn.addEventListener('click',()=>{finish();score=0;time=45;update();show('Pronto para jogar?','Clique em Iniciar partida para começar.');});
document.addEventListener('keydown',e=>{if(e.code==='Space'&&!e.repeat&&e.target.tagName!=='BUTTON'&&e.target.tagName!=='SELECT'){e.preventDefault();if(!running)start();else togglePause();}});
})();
