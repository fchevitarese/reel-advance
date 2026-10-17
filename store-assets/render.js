// Monta cada asset da loja: render.html?s=1|2|tile&lang=pt|en
const ICON = '../icons/icon-128.png';
const params = new URLSearchParams(location.search);
const lang = params.get('lang') || 'pt';

const T = {
  pt: {
    mode: 'Modo', video: 'Ao fim do vídeo', step: 'Post a post', continuous: 'Contínuo',
    photos: 'Fotos: 5 s', stop: 'Parar', hint: 'Atalho: Alt+Shift+Y · Esc para parar',
    ending: 'Terminando', next: 'Próximo',
    h1a: 'Acabou o vídeo?<br>Vai pro próximo sozinho.',
    pa: 'Sem ficar em loop e sem precisar rolar. Quando o vídeo termina, o próximo entra automaticamente.',
    h1b: 'Três jeitos de rolar',
    pb: `<b>Ao fim do vídeo</b>: avança quando o vídeo termina. Fotos avançam após o tempo escolhido.<br><br>
         <b>Post a post</b>: um post a cada N segundos.<br><br>
         <b>Contínuo</b>: rolagem suave na velocidade que você quiser.`,
    tile: 'Pula pro próximo vídeo quando o atual termina.',
  },
  en: {
    mode: 'Mode', video: 'When the video ends', step: 'Post by post', continuous: 'Continuous',
    photos: 'Photos: 5 s', stop: 'Stop', hint: 'Shortcut: Alt+Shift+Y · Esc to stop',
    ending: 'Ending', next: 'Next',
    h1a: 'Video over?<br>On to the next one.',
    pa: 'No more watching the same clip loop, no scrolling. When the video ends, the next one starts automatically.',
    h1b: 'Three ways to scroll',
    pb: `<b>When the video ends</b>: moves on when the video finishes. Photos move on after the time you pick.<br><br>
         <b>Post by post</b>: one post every N seconds.<br><br>
         <b>Continuous</b>: smooth scrolling at the speed you choose.`,
    tile: 'Skips to the next video when the current one ends.',
  },
}[lang];
document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

const popup = (open) => `
  <div class="popup">
    <h2>Reel Advance</h2>
    <label>${T.mode}</label>
    <div class="sel">${T.video} ${open ? '▴' : '▾'}</div>
    ${open ? `<div class="opts"><div class="on">${T.video}</div><div>${T.step}</div><div>${T.continuous}</div></div>` : ''}
    <label>${T.photos}</label>
    <div class="range"><i></i><b></b></div>
    <div class="btn">${T.stop}</div>
    <div class="hint">${T.hint}</div>
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
          <h1>${T.h1a}</h1>
          <p>${T.pa}</p>
        </div>
        <div class="stack">${reel('a', T.ending, 98)}</div>
        <div class="arrow">→</div>
        <div class="stack">${reel('b', T.next, 4)}</div>
      </div>`,
  2: `<div class="frame shot">
        <div class="copy">${brand}
          <h1>${T.h1b}</h1>
          <p>${T.pb}</p>
        </div>
        <div style="position:relative;transform:scale(1.5);margin-left:150px">${popup(true)}<span class="badge">ON</span></div>
      </div>`,
  tile: `<div class="frame tile">
        <img src="${ICON}" alt="" style="width:96px;height:96px;flex:none">
        <div><div style="font-size:30px;font-weight:700">Reel Advance</div>
        <div style="font-size:17px;color:#c7d2fe;margin-top:8px;line-height:1.35">${T.tile}</div></div>
      </div>`,
};

document.getElementById('root').innerHTML = views[params.get('s') || '1'];
