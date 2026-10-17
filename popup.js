const DEFAULTS = { mode: 'video', speed: 80, interval: 5 };
const $ = (id) => document.getElementById(id);
const t = (key, ...subs) => chrome.i18n.getMessage(key, subs);

document.documentElement.lang = chrome.i18n.getUILanguage();
for (const el of document.querySelectorAll('[data-i18n]')) el.textContent = t(el.dataset.i18n);

function render(s) {
  $('mode').value = s.mode;
  $('speed').value = s.speed;
  $('interval').value = s.interval;
  $('speedVal').textContent = s.speed;
  $('intervalVal').textContent = s.interval;
  $('speedRow').hidden = s.mode !== 'continuous';
  $('intervalRow').hidden = s.mode === 'continuous';
  $('intervalText').textContent = t(s.mode === 'video' ? 'photos' : 'interval');
}

function setButton(running) {
  const btn = $('toggle');
  btn.disabled = false;
  btn.textContent = t(running ? 'stop' : 'start');
  btn.classList.toggle('on', running);
}

async function activeTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

// Mostra o atalho que o Chrome realmente atribuiu (pode estar vazio por conflito).
async function showHint() {
  const commands = await chrome.commands.getAll();
  const shortcut = commands.find((c) => c.name === 'toggle-scroll')?.shortcut;
  $('hint').textContent = shortcut ? t('hint', shortcut) : t('hintNoShortcut');
}

chrome.storage.sync.get(DEFAULTS, render);
showHint();

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
    $('toggle').textContent = t('openInstagram');
    $('hint').textContent = t('reloadHint');
  }
})();

$('toggle').addEventListener('click', async () => {
  const tab = await activeTab();
  const { running } = await chrome.tabs.sendMessage(tab.id, { type: 'toggle' });
  setButton(running);
});
