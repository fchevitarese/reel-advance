# Chrome Web Store Listing — Reel Advance

> Last Updated: 2026-10-17

## Store Listing

**Extension Name**
Reel Advance

**Short Description** (≤132) — vem de `extDescription` em `_locales/*/messages.json`

pt-BR:
Avança sozinho para o próximo vídeo quando o atual termina no Instagram. Também rola o feed contínuo ou post a post.

en:
Automatically moves to the next Instagram video when the current one ends. Also scrolls the feed continuously or post by post.

**Detailed Description — en** (texto puro)

```
Reel Advance moves to the next Instagram video as soon as the current one ends, instead of leaving it looping until you scroll.

FEATURES
• When the video ends: once the video finishes, the page scrolls to the next one. Works on Reels and in the feed. Photos move on after the time you choose.
• Post by post: moves one post every N seconds (1 to 30).
• Continuous: smooth, steady scrolling at an adjustable speed.
• Keyboard shortcut to start and stop (Alt+Shift+Y, can be changed at chrome://extensions/shortcuts).
• Press Esc to stop right away.
• "ON" badge on the icon while it's running.

HOW TO USE
1. Open instagram.com (Reels or feed).
2. Click the Reel Advance icon and pick a mode.
3. Click Start or press Alt+Shift+Y.
4. To stop, press Esc or click Stop.

PRIVACY
Reel Advance does not collect or send any data. It only saves your preferences (mode, speed and interval), which Chrome syncs across your devices if Chrome Sync is turned on. No analytics, no ads, no external servers.

PERMISSIONS
• Read and change data on www.instagram.com: needed to scroll the page and know when the video has ended. The extension does not run on any other site.
• Storage: saves your preferences.

Reel Advance is an independent project, not affiliated with Instagram or Meta.

Support: https://github.com/fchevitarese/reel-advance/issues
```

**Detailed Description — pt-BR** (texto puro)

```
Reel Advance passa para o próximo vídeo do Instagram assim que o atual termina, em vez de deixar o vídeo repetindo até você rolar.

FUNCIONALIDADES
• Ao fim do vídeo: quando o vídeo termina, a página rola para o próximo. Funciona nos Reels e no feed. Fotos avançam depois do tempo que você escolher.
• Post a post: avança um post a cada N segundos (1 a 30).
• Contínuo: rolagem suave e constante, com velocidade ajustável.
• Atalho de teclado para iniciar e parar (Alt+Shift+Y, configurável em chrome://extensions/shortcuts).
• Esc para parar na hora.
• Selo "ON" no ícone enquanto está ativo.

COMO USAR
1. Abra instagram.com (Reels ou feed).
2. Clique no ícone do Reel Advance e escolha o modo.
3. Clique em Iniciar ou use Alt+Shift+Y.
4. Para parar, aperte Esc ou clique em Parar.

PRIVACIDADE
O Reel Advance não coleta nem envia nenhum dado. Ele só guarda suas preferências (modo, velocidade e intervalo), que o Chrome sincroniza entre seus dispositivos se a sincronização estiver ativada. Não há analytics, anúncios nem servidores externos.

PERMISSÕES
• Ler e alterar dados em www.instagram.com: necessário para rolar a página e saber quando o vídeo terminou. A extensão não roda em nenhum outro site.
• Armazenamento: guarda suas preferências.

Reel Advance é um projeto independente, sem afiliação com Instagram ou Meta.

Suporte: https://github.com/fchevitarese/reel-advance/issues
```

**Category**
Social & Communication

**Single Purpose**
Rola automaticamente o Instagram para o próximo vídeo ou post, seja quando o vídeo atual termina ou em intervalo/velocidade escolhidos pelo usuário.

**Languages**
English (default, `_locales/en`) e Português (Brasil) (`_locales/pt_BR`). Cada idioma tem descrição e capturas próprias no painel.

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|-------|-----------|--------|----------|
| Store Icon | 128×128 PNG | ✅ Ready | icons/icon-128.png |
| Screenshots globais + en | 1280×800 | ✅ Ready | store-assets/en-screenshot-{1,2}.png |
| Screenshots pt-BR (localizadas) | 1280×800 | ✅ Ready | store-assets/screenshot-{1,2}.png |
| Small Promo Tile (global) | 440×280 | ✅ Ready | store-assets/en-promo-small-440x280.png |
| Marquee Promo Tile | 1400×560 | ⬜ Not created | |

### Screenshot Notes
- Screenshots são ilustrativos (renderizados de `store-assets/render.html`), sem conteúdo de terceiros do Instagram.
- 1: vídeo terminando → próximo vídeo entra.
- 2: popup com os 3 modos e selo ON.
- Regerar: abrir `store-assets/render.html?s=1|2|tile&lang=pt|en` em viewport 1280×800 (tile 440×280) e capturar.
- Ícones: `python3 tools/make_icons.py`.

## Permissions Justification

| Permission | Type | Justification |
|------------|------|---------------|
| storage | permissions | Stores the user's own preferences: scroll mode, scroll speed (px/s) and interval (seconds). These are read by the popup and the Instagram page script so the chosen settings persist between sessions. No other data is stored. |
| https://www.instagram.com/* | content_scripts (host) | The content script runs only on https://www.instagram.com/* because that is the single site the extension works on. It scrolls the page to the next video or post and listens for the playing video to finish so it knows when to advance. It does not read, store or transmit any page content, and it does not run on any other site. |

**Single purpose (enviado):** Automatically scrolls Instagram to the next video or post: when the current video ends, or at an interval/speed chosen by the user.

**Remote code**: Não. Todo o JavaScript está no pacote.

## Privacy & Data Use

### Data Collection

**Does the extension collect user data?** No

| Data Type | Collected? | Transmitted Off-Device? | Purpose | Shared with Third Parties? |
|-----------|-----------|------------------------|---------|---------------------------|
| Personally identifiable info | No | No | — | No |
| Health info | No | No | — | No |
| Financial info | No | No | — | No |
| Authentication info | No | No | — | No |
| Personal communications | No | No | — | No |
| Location | No | No | — | No |
| Web history | No | No | — | No |
| User activity | No | No | — | No |
| Website content | No | No | — | No |

Nota: as preferências usam o armazenamento sincronizado do Chrome (vai para a conta Google do usuário se o Chrome Sync estiver ativado). Isso está declarado na política de privacidade.

### Data Use Certification
- [x] Data is NOT sold to third parties
- [x] Data is NOT used for purposes unrelated to the extension's core functionality
- [x] Data is NOT used for creditworthiness or lending purposes

## Privacy Policy

**Privacy Policy URL**
https://fchevitarese.github.io/reel-advance/privacy.html

## Distribution

**Visibility**: Public
**Regions**: All regions

## Developer Info

**Publisher Name**: (preencher no dashboard)
**Contact Email**: (email verificado da conta de desenvolvedor)
**Support URL**: https://github.com/fchevitarese/reel-advance/issues
**Homepage URL**: https://github.com/fchevitarese/reel-advance

## Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.0.1 | 2026-10-17 | Traduções en (padrão) e pt-BR; popup mostra o atalho realmente atribuído. | Draft |
| 1.0.0 | 2026-10-17 | Primeira versão: modos "Ao fim do vídeo", "Post a post" e "Contínuo"; atalho Alt+Shift+Y; Esc para parar. Enviado só como rascunho, substituído pela 1.0.1. | Superseded |

## Review Notes

### Known Issues / Limitations
- Depende da estrutura atual do Instagram (container de rolagem dos Reels, elementos `article` do feed). Mudanças no site podem exigir atualização.
- Se Alt+Shift+Y já estiver em uso por outra extensão, o Chrome deixa o atalho vazio; o usuário define outro em chrome://extensions/shortcuts.

### Rejection History
—
