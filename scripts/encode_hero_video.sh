#!/usr/bin/env bash
# Encode the Home hero video, its poster and the stills cut from it.
#
# Usage: scripts/encode_hero_video.sh path/to/hero-video-studio-original.mp4 path/to/hero-poster.jpg
#
# The master is the owners' studio footage (1920x1080, 30 fps, 53.5 s, about
# 2.9 Mbps H.264 High), used complete and uncut by owner directive. It is
# served as is: the video stream is copied bit for bit (no re-encode, so no
# detail is lost) and only the audio track is dropped, with the index moved to
# the front (faststart) so playback starts while the file downloads. One file
# for every screen size: earlier downscaled tiers looked soft on phones.
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

ffmpeg -y -v error -i "$SRC" -map 0:v -c:v copy -an -movflags +faststart "$VIDEO/studio-hero.mp4"

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

ls -l "$VIDEO"/studio-hero.mp4 "$PHOTOS"/studio-hero-poster.jpg "$PHOTOS"/class-in-session-window-light.jpg \
  "$PHOTOS"/instructor-hands-on-correction.jpg "$PHOTOS"/instructor-cueing-class-with-mic.jpg
