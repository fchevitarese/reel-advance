// Atalho de teclado -> alterna rolagem na aba ativa.
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== 'toggle-scroll') return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;
  chrome.tabs.sendMessage(tab.id, { type: 'toggle' }).catch(() => {});
});

// Content script avisa estado -> badge "ON" no ícone daquela aba.
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg?.type !== 'state' || !sender.tab?.id) return;
  const tabId = sender.tab.id;
  chrome.action.setBadgeText({ tabId, text: msg.running ? 'ON' : '' });
  chrome.action.setBadgeBackgroundColor({ tabId, color: '#6366f1' });
});
