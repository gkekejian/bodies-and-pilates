#!/usr/bin/env python3
"""
Build the favicon and app icons from the official round logo file.

The artwork is not redrawn or altered: it is scaled uniformly (never
stretched), centered on a square cream tile with clear space around it, and
saved at each icon size. Run after replacing public/images/bodies-and-pilates-logo-round.png.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images" / "bodies-and-pilates-logo-round.png"
CREAM = (253, 252, 250, 255)  # cream-50


def tile(size: int, pad: float) -> Image.Image:
    with Image.open(SRC) as im:
        im = im.convert("RGBA")
        inner = round(size * (1 - 2 * pad))
        scale = inner / max(im.size)
        w, h = round(im.width * scale), round(im.height * scale)
        logo = im.resize((w, h), Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), CREAM)
    canvas.alpha_composite(logo, ((size - w) // 2, (size - h) // 2))
    return canvas


def main():
    app = ROOT / "app"
    # Browser tab: tight padding so the mark reads at 16 px.
    tile(256, 0.04).save(app / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    tile(512, 0.06).convert("RGB").save(app / "icon.png", optimize=True)
    # iOS applies its own rounded mask, so keep wider clear space.
    tile(180, 0.10).convert("RGB").save(app / "apple-icon.png", optimize=True)
    print("favicon.ico, icon.png, apple-icon.png written")


if __name__ == "__main__":
    main()
