#!/usr/bin/env bash
# Encode the Home hero video, its poster and the stills cut from it.
#
# Usage: scripts/encode_hero_video.sh path/to/hero-video-studio-original.mp4 path/to/hero-poster.jpg
#
# The master is the owners' studio footage (1920x1080, 30 fps, 53.5 s), used
# complete and uncut by owner directive: every rendition keeps every frame and
# the full running time. Only the delivery changes: the audio track is
# stripped (the hero is a muted loop) and the picture is scaled down, never
# cropped. WebM (VP9) is listed first and MP4 (H.264, faststart) is the
# fallback: 1280x720 for wide screens, 640x360 for phones.
#
# The poster (the owners' frame at 26 s) and three stills used on the home
# page are written to public/media/photos/ with metadata stripped, like
# scripts/import_media.py does for the photo library.
set -euo pipefail
SRC="${1:?master .mp4 path}"
POSTER="${2:?hero-poster.jpg path}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VIDEO="$ROOT/public/media/video"
PHOTOS="$ROOT/public/media/photos"
mkdir -p "$VIDEO" "$PHOTOS"

encode() { # width, file suffix, mp4 crf, webm crf, max kbps
  local vf="scale=$1:-2:flags=lanczos"
  ffmpeg -y -v error -i "$SRC" -an -vf "$vf" \
    -c:v libx264 -profile:v high -preset slow -crf "$3" -maxrate "${5}k" -bufsize "$((2 * $5))k" \
    -pix_fmt yuv420p -movflags +faststart "$VIDEO/studio-hero$2.mp4"
  ffmpeg -y -v error -i "$SRC" -an -vf "$vf" \
    -c:v libvpx-vp9 -crf "$4" -b:v "$(($5 * 8 / 10))k" -maxrate "${5}k" -bufsize "$((2 * $5))k" \
    -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p "$VIDEO/studio-hero$2.webm"
}
encode 1280 "" 28 38 1000
encode 640 "-640" 29 40 400

# Poster and stills: JPEG q82, progressive, no metadata (ffmpeg writes none we keep).
still() { # seconds, output name
  ffmpeg -y -v error -ss "$1" -i "$SRC" -frames:v 1 -q:v 1 "$PHOTOS/$2.png"
  python3 -I - "$PHOTOS/$2.png" "$PHOTOS/$2.jpg" <<'PY'
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert("RGB")
im.save(sys.argv[2], "JPEG", quality=82, optimize=True, progressive=True)
PY
  rm "$PHOTOS/$2.png"
}
python3 -I - "$POSTER" "$PHOTOS/studio-hero-poster.jpg" <<'PY'
import sys
from PIL import Image, ImageOps
im = ImageOps.exif_transpose(Image.open(sys.argv[1])).convert("RGB")
im.thumbnail((2048, 2048), Image.LANCZOS)
im.save(sys.argv[2], "JPEG", quality=82, optimize=True, progressive=True)
PY
still 53.2 "class-in-session-window-light"
still 35.5 "instructor-hands-on-correction"
still 12.5 "instructor-cueing-class-with-mic"

ls -l "$VIDEO"/studio-hero* "$PHOTOS"/studio-hero-poster.jpg "$PHOTOS"/class-in-session-window-light.jpg \
  "$PHOTOS"/instructor-hands-on-correction.jpg "$PHOTOS"/instructor-cueing-class-with-mic.jpg
