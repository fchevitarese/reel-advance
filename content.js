(() => {
  const DEFAULTS = { mode: 'video', speed: 80, interval: 5 };
  let settings = { ...DEFAULTS };
  let running = false;
  let target = null;
  let rafId = null;
  let timerId = null;
  let lastTs = 0;
  let carry = 0;
  let savedSnap = null;
  let watched = null;
  let lastTime = 0;

  chrome.storage.sync.get(DEFAULTS, (s) => { settings = s; });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return;
    for (const [key, { newValue }] of Object.entries(changes)) settings[key] = newValue;
    if (running) { halt(); begin(); }
  });

  // Feed da home rola no documento; Reels rola num div interno.
  function findScroller() {
    const doc = document.scrollingElement || document.documentElement;
    if (doc.scrollHeight > doc.clientHeight + 50) return doc;
    let best = doc;
    let bestArea = 0;
    for (const el of document.querySelectorAll('main, section, div')) {
      if (el.scrollHeight <= el.clientHeight + 50) continue;
      const { overflowY } = getComputedStyle(el);
      if (overflowY !== 'auto' && overflowY !== 'scroll') continue;
      const area = el.clientWidth * el.clientHeight;
      if (area > bestArea) { best = el; bestArea = area; }
    }
    return best;
  }

  function tick(ts) {
    const dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.1) : 0;
    lastTs = ts;
    // scrollTop arredonda pra inteiro; acumula fração pra velocidades baixas.
    carry += settings.speed * dt;
    const px = Math.floor(carry);
    if (px > 0) { target.scrollBy(0, px); carry -= px; }
    rafId = requestAnimationFrame(tick);
  }

  function nextPost() {
    const next = [...document.querySelectorAll('article')]
      .find((a) => a.getBoundingClientRect().top > 20);
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else target.scrollBy({ top: target.clientHeight * 0.9, behavior: 'smooth' });
  }

  // Vídeo com maior área visível = o que o usuário está assistindo.
  function visibleVideo() {
    let best = null;
    let bestArea = 0;
    for (const v of document.querySelectorAll('video')) {
      const r = v.getBoundingClientRect();
      const w = Math.min(r.right, innerWidth) - Math.max(r.left, 0);
      const h = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
      if (w > 0 && h > 0 && w * h > bestArea) { best = v; bestArea = w * h; }
    }
    return best;
  }

  function advance() {
    watched = null;
    nextPost();
    scheduleFallback();
  }

  // Post sem vídeo (foto) avança após o intervalo; com vídeo, espera terminar.
  function scheduleFallback() {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      if (visibleVideo()) scheduleFallback();
      else advance();
    }, settings.interval * 1000);
  }

  // Instagram usa <video loop>: 'ended' não dispara, então detecta a volta ao início.
  function onTimeUpdate(e) {
    const v = e.target;
    if (!(v instanceof HTMLVideoElement) || v !== visibleVideo()) return;
    if (v !== watched) { watched = v; lastTime = v.currentTime; return; }
    const looped = v.currentTime < lastTime - 0.5 && lastTime > v.duration - 1.5;
    lastTime = v.currentTime;
    if (looped) advance();
  }

  function onEnded(e) {
    if (e.target === visibleVideo()) advance();
  }

  function begin() {
    target = findScroller();
    if (settings.mode === 'step') {
      nextPost();
      timerId = setInterval(nextPost, settings.interval * 1000);
    } else if (settings.mode === 'video') {
      watched = null;
      document.addEventListener('timeupdate', onTimeUpdate, true);
      document.addEventListener('ended', onEnded, true);
      scheduleFallback();
    } else {
      // Reels usa scroll-snap mandatory: cada scrollBy pequeno pularia um reel inteiro.
      savedSnap = target.style.scrollSnapType;
      target.style.scrollSnapType = 'none';
      lastTs = 0;
      carry = 0;
      rafId = requestAnimationFrame(tick);
    }
  }

  function halt() {
    cancelAnimationFrame(rafId);
    clearInterval(timerId);
    clearTimeout(timerId);
    document.removeEventListener('timeupdate', onTimeUpdate, true);
    document.removeEventListener('ended', onEnded, true);
    if (savedSnap !== null) { target.style.scrollSnapType = savedSnap; savedSnap = null; }
    rafId = timerId = null;
  }

  function setRunning(on) {
    if (on === running) return;
    running = on;
    on ? begin() : halt();
    chrome.runtime.sendMessage({ type: 'state', running }).catch(() => {});
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && running) setRunning(false);
  });

  chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
    if (msg?.type === 'toggle') setRunning(!running);
    if (msg?.type === 'toggle' || msg?.type === 'get') reply({ running });
  });
})();
