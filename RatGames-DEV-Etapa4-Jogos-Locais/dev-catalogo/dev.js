'use strict';
const slugs = ['arena-roblox','avatares-roblox','boy-vs-girl','corrida-na-live','corrida-olimpica','desfile-roblox','disputa-ao-vivo','duelo-de-torres','flappy-fly','ovos-roblox','pipa-arena','tik-fighters','tower-sky','travesser-roblox'];
const media = '../../.build-src/ui/videos/';
const grade = document.getElementById('grade');
const modal = document.getElementById('modal');
const player = document.getElementById('player');
const title = document.getElementById('titulo');
function render(term='') {
 grade.replaceChildren();
 for (const slug of slugs.filter(x=>x.includes(term.trim().toLowerCase()))) {
  const card=document.createElement('article'); card.className='card';
  const img=document.createElement('img');img.src=media+slug+'.jpg';img.alt='Imagem de '+slug;img.loading='lazy';
  const h=document.createElement('h3');h.textContent=slug.replaceAll('-',' ');
  const btn=document.createElement('button');btn.textContent='Ver prévia';btn.onclick=()=>{title.textContent=h.textContent;player.src=media+slug+'.webm';modal.showModal();player.play().catch(()=>{});};
  card.append(img,h,btn);grade.append(card);
 }
}
document.getElementById('busca').addEventListener('input',e=>render(e.target.value));
document.getElementById('fechar').onclick=()=>modal.close();
modal.addEventListener('close',()=>{player.pause();player.removeAttribute('src');player.load();});
render();

const abrirLocal = document.getElementById('abrirJogoLocal');
const statusLocal = document.getElementById('statusLocal');
abrirLocal.addEventListener('click', async () => {
  if (!window.devLocal?.abrirHtml) { statusLocal.textContent = 'Ponte Electron indisponível.'; return; }
  try { const r = await window.devLocal.abrirHtml(); statusLocal.textContent = r.error || (r.opened ? 'Jogo HTML local aberto: '+r.name : 'Seleção cancelada.'); }
  catch (e) { statusLocal.textContent = 'Erro ao abrir jogo local: '+String(e.message||e); }
});
