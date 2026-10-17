const DEFAULTS = { mode: 'video', speed: 80, interval: 5 };
const $ = (id) => document.getElementById(id);

function render(s) {
  $('mode').value = s.mode;
  $('speed').value = s.speed;
  $('interval').value = s.interval;
  $('speedVal').textContent = s.speed;
  $('intervalVal').textContent = s.interval;
  $('speedRow').hidden = s.mode !== 'continuous';
  $('intervalRow').hidden = s.mode === 'continuous';
  $('intervalLabel').firstChild.textContent = s.mode === 'video' ? 'Fotos: ' : 'Intervalo: ';
}

function setButton(running) {
  const btn = $('toggle');
  btn.disabled = false;
  btn.textContent = running ? 'Parar' : 'Iniciar';
  btn.classList.toggle('on', running);
}

async function activeTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

chrome.storage.sync.get(DEFAULTS, render);

for (const id of ['mode', 'speed', 'interval']) {
  $(id).addEventListener('input', () => {
    const s = {
      mode: $('mode').value,
      speed: Number($('speed').value),
      interval: Number($('interval').value),
    };
    render(s);
    chrome.storage.sync.set(s);
  });
}

(async () => {
  const tab = await activeTab();
  try {
    const { running } = await chrome.tabs.sendMessage(tab.id, { type: 'get' });
    setButton(running);
  } catch {
    $('toggle').textContent = 'Abra instagram.com';
    $('hint').textContent = 'Se já está aberto, recarregue a página.';
  }
})();

$('toggle').addEventListener('click', async () => {
  const tab = await activeTab();
  const { running } = await chrome.tabs.sendMessage(tab.id, { type: 'toggle' });
  setButton(running);
});
