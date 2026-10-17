# Chrome Web Store Listing — Reel Advance

> Last Updated: 2026-10-17

## Store Listing

**Extension Name**
Reel Advance

**Short Description** (≤132)
Avança sozinho para o próximo vídeo quando o atual termina no Instagram. Também rola o feed contínuo ou post a post.

**Detailed Description** (colar como texto puro)

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

**Primary Language**
Português (Brasil)

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|-------|-----------|--------|----------|
| Store Icon | 128×128 PNG | ✅ Ready | icons/icon-128.png |
| Screenshot 1 | 1280×800 | ✅ Ready | store-assets/screenshot-1.png |
| Screenshot 2 | 1280×800 | ✅ Ready | store-assets/screenshot-2.png |
| Small Promo Tile | 440×280 | ✅ Ready | store-assets/promo-small-440x280.png |
| Marquee Promo Tile | 1400×560 | ⬜ Not created | |

### Screenshot Notes
- Screenshots são ilustrativos (renderizados de `store-assets/render.html`), sem conteúdo de terceiros do Instagram.
- 1: vídeo terminando → próximo vídeo entra.
- 2: popup com os 3 modos e selo ON.
- Regerar: abrir `store-assets/render.html?s=1|2|tile` em viewport 1280×800 (tile 440×280) e capturar.
- Ícones: `python3 tools/make_icons.py`.

## Permissions Justification

| Permission | Type | Justification |
|------------|------|---------------|
| storage | permissions | Salva as preferências do usuário (modo de rolagem, velocidade em px/s e intervalo em segundos) para que sejam mantidas entre sessões e compartilhadas entre o popup e a página. |
| https://www.instagram.com/* | content_scripts (host) | O script roda só em www.instagram.com para rolar a página até o próximo vídeo ou post e detectar quando o vídeo em exibição terminou. Nenhum conteúdo da página é lido para outro fim, armazenado ou transmitido. |

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
| 1.0.0 | 2026-10-17 | Primeira versão: modos "Ao fim do vídeo", "Post a post" e "Contínuo"; atalho Alt+Shift+Y; Esc para parar. | Draft |

## Review Notes

### Known Issues / Limitations
- Depende da estrutura atual do Instagram (container de rolagem dos Reels, elementos `article` do feed). Mudanças no site podem exigir atualização.
- Se Alt+Shift+Y já estiver em uso por outra extensão, o Chrome deixa o atalho vazio; o usuário define outro em chrome://extensions/shortcuts.

### Rejection History
—
