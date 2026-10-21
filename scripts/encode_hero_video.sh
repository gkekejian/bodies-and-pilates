#!/usr/bin/env bash
# Encode the Home hero background video from the owner's master.
#
# Usage: scripts/encode_hero_video.sh path/to/hero-video-original.mov
#
# The master (old Wix hero, stock, 1920x1080, 19 s, about 24 MB) is kept in
# design-reference/old-site/ and never served. The page gets muted web
# renditions at 24 fps, WebM (VP9) first and MP4 (H.264, faststart) as the
# fallback: 1280x720 at about 0.8 Mbps for wide screens, 640x360 at about
# 0.3 Mbps for phones. Not trimmed: the old site looped all 19 seconds.
# Kept separate from scripts/import_media.py, which caps clips at 15 s.
set -euo pipefail
SRC="${1:?master .mov path}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/media/video"
mkdir -p "$OUT"
encode() { # width, name suffix, mp4 crf, webm crf, max kbps
  local vf="scale=$1:-2:flags=lanczos,fps=24"
  ffmpeg -y -v error -i "$SRC" -an -vf "$vf" \
    -c:v libx264 -profile:v high -preset slow -crf "$3" -maxrate "${5}k" -bufsize "$((2 * $5))k" \
    -pix_fmt yuv420p -movflags +faststart "$OUT/stock-hero-cadillac$2.mp4"
  ffmpeg -y -v error -i "$SRC" -an -vf "$vf" \
    -c:v libvpx-vp9 -crf "$4" -b:v "$(($5 * 8 / 10))k" -maxrate "${5}k" -bufsize "$((2 * $5))k" \
    -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p "$OUT/stock-hero-cadillac$2.webm"
}
encode 1280 "" 27 38 1100
encode 640 "-640" 28 40 450

ls -l "$OUT"/stock-hero-cadillac*
