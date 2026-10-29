#!/usr/bin/env python3
"""
Import the owner's photo and video selects into the site.

Usage:
    python3 scripts/import_media.py [SOURCE_DIR]

SOURCE_DIR defaults to ./pilates-media-library. It may hold the files under
their final names (Route A) or under their Google Drive names, which end with
the original camera filename (Route B), in any subfolder layout. The mapping
lives in scripts/media-sources.json.

For each listed asset found:
  - Photos: EXIF orientation applied, all metadata stripped (no GPS or camera
    data is published), longest side capped at 2048 px, saved as progressive
    JPEG to public/media/photos/<final name>.
  - Videos: H.264, no audio track, longest side capped at 1280 px, moov atom
    up front for fast start, bitrate capped near 1 Mbps, trimmed to MAX_SECONDS (15), saved to
    public/media/video/<final name>. A poster frame is written to
    public/media/posters/<name>.jpg.
  - The social share image (1200x630) is cropped from the hero photo.

Writes lib/media-manifest.json, which the site reads at build time. Anything
not in the manifest simply does not render. Prints every missing file.

Requires Pillow and ffmpeg/ffprobe.
"""

import json
import re
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCES = json.loads((ROOT / "scripts" / "media-sources.json").read_text())
OUT_PHOTOS = ROOT / "public" / "media" / "photos"
OUT_VIDEO = ROOT / "public" / "media" / "video"
OUT_POSTERS = ROOT / "public" / "media" / "posters"
OUT_OG = ROOT / "public" / "media" / "og"
MANIFEST = ROOT / "lib" / "media-manifest.json"

MAX_PHOTO_SIDE = 2048
# Written by scripts/encode_hero_video.sh, not imported from the library.
HERO_VIDEO_FILES = (
    "studio-hero-poster.jpg",
    "class-in-session-window-light.jpg",
    "instructor-hands-on-correction.jpg",
    "instructor-cueing-class-with-mic.jpg",
)
MAX_VIDEO_SIDE = 1280
MAX_SECONDS = 15
OG_SOURCE = "group-class-plank-wide.jpg"
OG_SIZE = (1200, 630)

# Not published until the owner confirms who is in them (see BUILD-NOTES).
# Hold list from the owner, plus unplaced shots that show unidentified
# instructors rather than clients in a class.
HOLD = {
    "instructor-portrait-magic-circle.jpg",
    "instructor-portrait-seated-on-reformer.jpg",
    "instructor-portrait-ball-black-jacket.jpg",
    "instructor-portrait-smiling-with-ball.jpg",
    "instructor-seated-on-reformer-smiling.jpg",
    "instructor-portrait-seated-on-chair.jpg",
    "instructors-group-photo-three.jpg",
    "instructor-leading-class-wide.mp4",
    "side-lying-leg-work-photo.jpg",
}

MEDIA_EXT = {".jpg", ".jpeg", ".png", ".heic", ".mp4", ".mov", ".m4v"}


def index_source(src: Path):
    files = [p for p in src.rglob("*") if p.is_file() and p.suffix.lower() in MEDIA_EXT]
    return files


def find(files, final: str, camera: str):
    final_l = final.lower()
    stem = re.escape(Path(camera).stem)
    pattern = re.compile(rf"(^|[-_ ]){stem}\.[a-z0-9]+$", re.IGNORECASE)
    exact = [p for p in files if p.name.lower() == final_l]
    if exact:
        return exact[0]
    matches = [p for p in files if pattern.search(p.name)]
    return matches[0] if matches else None


def import_photo(path: Path, final: str):
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im)
        im = im.convert("RGB")
        im.thumbnail((MAX_PHOTO_SIDE, MAX_PHOTO_SIDE), Image.LANCZOS)
        out = OUT_PHOTOS / final
        # A fresh save without exif= drops every metadata block, GPS included.
        im.save(out, "JPEG", quality=82, optimize=True, progressive=True)
        return {"width": im.width, "height": im.height, "bytes": out.stat().st_size}


def probe(path: Path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
         "stream=width,height:stream_side_data=rotation:format=duration", "-of", "json", str(path)],
        capture_output=True, text=True, check=True,
    )
    return json.loads(out.stdout)


def import_video(path: Path, final: str):
    out = OUT_VIDEO / final
    scale = (
        f"scale='if(gte(iw,ih),min({MAX_VIDEO_SIDE},iw),-2)':'if(gte(iw,ih),-2,min({MAX_VIDEO_SIDE},ih))'"
    )
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-i", str(path), "-t", str(MAX_SECONDS), "-an",
         "-vf", scale, "-c:v", "libx264", "-preset", "slow", "-crf", "28",
         "-maxrate", "1M", "-bufsize", "2M",
         "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(out)],
        check=True,
    )
    info = probe(out)
    # Cover frame from about a third of the way in: the opening frames of
    # phone clips are often the camera settling on an empty corner.
    at = round(float(info["format"]["duration"]) * 0.35, 2)
    poster = OUT_POSTERS / (Path(final).stem + ".jpg")
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-ss", str(at), "-i", str(out), "-frames:v", "1",
         "-q:v", "3", str(poster)],
        check=True,
    )
    stream = info["streams"][0]
    return {
        "width": stream["width"],
        "height": stream["height"],
        "seconds": round(float(info["format"]["duration"]), 1),
        "bytes": out.stat().st_size,
        "poster": f"/media/posters/{poster.name}",
    }


def make_og(photo_path: Path):
    with Image.open(photo_path) as im:
        w, h = im.size
        target_ratio = OG_SIZE[0] / OG_SIZE[1]
        crop_h = int(w / target_ratio)
        if crop_h > h:
            crop_w = int(h * target_ratio)
            left = (w - crop_w) // 2
            box = (left, 0, left + crop_w, h)
        else:
            # Portrait source: keep the band a little above center, where
            # the subjects usually sit.
            top = max(0, min(h - crop_h, int(h * 0.42) - crop_h // 2))
            box = (0, top, w, top + crop_h)
        og = im.crop(box).resize(OG_SIZE, Image.LANCZOS)
        out = OUT_OG / "share.jpg"
        og.save(out, "JPEG", quality=85, optimize=True, progressive=True)
        return f"/media/og/{out.name}"


def main():
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "pilates-media-library"
    if not src.is_dir():
        sys.exit(f"Source folder not found: {src}")
    for d in (OUT_PHOTOS, OUT_VIDEO, OUT_POSTERS, OUT_OG):
        d.mkdir(parents=True, exist_ok=True)

    files = index_source(src)
    manifest = {"photos": {}, "videos": {}, "og": None}
    missing = []
    held = []
    for final, camera, folder in SOURCES:
        if final in HOLD:
            held.append(final)
            continue
        path = find(files, final, camera)
        if not path:
            missing.append(f"{final} ({camera}, {folder})")
            continue
        if final.endswith(".mp4"):
            manifest["videos"][final] = import_video(path, final)
        else:
            manifest["photos"][final] = import_photo(path, final)
        print(f"ok  {final}  <-  {path.relative_to(src)}")

    # Files written by scripts/encode_hero_video.sh (the hero poster and the
    # stills cut from the hero video) are not in the photo library; keep their
    # entries so a re-import does not drop them from the site.
    previous = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {"photos": {}}
    for name in HERO_VIDEO_FILES:
        if name in previous.get("photos", {}) and (OUT_PHOTOS / name).exists():
            manifest["photos"][name] = previous["photos"][name]

    if OG_SOURCE in manifest["photos"]:
        manifest["og"] = make_og(OUT_PHOTOS / OG_SOURCE)

    for kind in ("photos", "videos"):
        for key in manifest[kind]:
            manifest[kind][key].pop("bytes", None)
    MANIFEST.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n")

    print(f"\n{len(manifest['photos'])} photos, {len(manifest['videos'])} videos imported.")
    if held:
        print(f"{len(held)} on hold, not published: {', '.join(held)}")
    if missing:
        print(f"{len(missing)} missing:")
        for m in missing:
            print(f"  - {m}")


if __name__ == "__main__":
    main()
