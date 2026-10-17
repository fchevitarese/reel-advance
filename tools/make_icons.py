"""Gera icons/icon-{16,32,48,128}.png. Uso: python3 tools/make_icons.py"""
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'icons'
TOP = (99, 102, 241)     # indigo
BOTTOM = (20, 184, 166)  # teal
SS = 8                   # supersampling p/ bordas suaves


def gradient(size):
    img = Image.new('RGB', (size, size))
    px = img.load()
    for y in range(size):
        t = y / (size - 1)
        c = tuple(round(a + (b - a) * t) for a, b in zip(TOP, BOTTOM))
        for x in range(size):
            px[x, y] = c
    return img


def icon(size):
    s = size * SS
    mask = Image.new('L', (s, s), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, s - 1, s - 1], radius=s * 0.22, fill=255)
    img = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    img.paste(gradient(s), mask=mask)

    # Play + chevron pra baixo = toca o vídeo e avança pro próximo.
    d = ImageDraw.Draw(img)
    cx = s / 2
    h = s * 0.40
    top = s * 0.15
    left = cx - h * 0.36
    d.polygon([(left, top), (left, top + h), (left + h * 0.87, top + h / 2)], fill='white')
    cw, ch, stroke = s * 0.44, s * 0.14, s * 0.10
    cy = s * 0.68
    d.line([(cx - cw / 2, cy), (cx, cy + ch), (cx + cw / 2, cy)], fill='white', width=round(stroke), joint='curve')
    for x, y in ((cx - cw / 2, cy), (cx + cw / 2, cy)):
        d.ellipse([x - stroke / 2, y - stroke / 2, x + stroke / 2, y + stroke / 2], fill='white')

    return img.resize((size, size), Image.LANCZOS)


OUT.mkdir(exist_ok=True)
for size in (16, 32, 48, 128):
    icon(size).save(OUT / f'icon-{size}.png')
    print(f'icons/icon-{size}.png')
