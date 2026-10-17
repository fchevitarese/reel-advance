// Monta cada asset da loja: render.html?s=1 | s=2 | s=tile
const ICON = '../icons/icon-128.png';

const popup = (open) => `
  <div class="popup">
    <h2>Reel Advance</h2>
    <label>Modo</label>
    <div class="sel">${open ? 'Ao fim do vídeo ▴' : 'Ao fim do vídeo ▾'}</div>
    ${open ? `<div class="opts"><div class="on">Ao fim do vídeo</div><div>Post a post</div><div>Contínuo</div></div>` : ''}
    <label>Fotos: 5 s</label>
    <div class="range"><i></i><b></b></div>
    <div class="btn">Parar</div>
    <div class="hint">Atalho: Alt+Shift+Y · Esc para parar</div>
  </div>`;

const reel = (cls, tag, progress) => `
  <div class="reel ${cls}">
    <span class="tag">${tag}</span>
    <div class="play"></div>
    <div class="bar"><i style="width:${progress}%"></i></div>
  </div>`;

const brand = `<div class="brand"><img src="${ICON}" alt="">Reel Advance</div>`;

const views = {
  1: `<div class="frame shot">
        <div class="copy">${brand}
          <h1>Acabou o vídeo?<br>Vai pro próximo sozinho.</h1>
          <p>Sem ficar em loop e sem precisar rolar. Quando o vídeo termina, o próximo entra automaticamente.</p>
        </div>
        <div class="stack">${reel('a', 'Terminando', 98)}</div>
        <div class="arrow">→</div>
        <div class="stack">${reel('b', 'Próximo', 4)}</div>
      </div>`,
  2: `<div class="frame shot">
        <div class="copy">${brand}
          <h1>Três jeitos de rolar</h1>
          <p><b>Ao fim do vídeo</b>: avança quando o vídeo termina. Fotos avançam após o tempo escolhido.<br><br>
             <b>Post a post</b>: um post a cada N segundos.<br><br>
             <b>Contínuo</b>: rolagem suave na velocidade que você quiser.</p>
        </div>
        <div style="position:relative;transform:scale(1.5);margin-left:150px">${popup(true)}<span class="badge">ON</span></div>
      </div>`,
  tile: `<div class="frame tile">
        <img src="${ICON}" alt="" style="width:96px;height:96px;flex:none">
        <div><div style="font-size:30px;font-weight:700">Reel Advance</div>
        <div style="font-size:17px;color:#c7d2fe;margin-top:8px;line-height:1.35">Pula pro próximo vídeo quando o atual termina.</div></div>
      </div>`,
};

const s = new URLSearchParams(location.search).get('s') || '1';
document.getElementById('root').innerHTML = views[s];
