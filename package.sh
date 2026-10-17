#!/usr/bin/env bash
# Gera dist/reel-advance-v<versão>.zip só com os arquivos que o Chrome precisa.
set -euo pipefail
cd "$(dirname "$0")"

VERSION=$(python3 -c "import json; print(json.load(open('manifest.json'))['version'])")
OUT="dist/reel-advance-v${VERSION}.zip"

mkdir -p dist
rm -f "$OUT"
zip -qr "$OUT" _locales manifest.json background.js content.js popup.html popup.js icons/icon-*.png
echo "$OUT ($(du -h "$OUT" | cut -f1))"
