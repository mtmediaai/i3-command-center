"""
extract_driving_frames.py - MTM Zero-COGS High-Fidelity Frame Extraction Engine
Extracts, purifies, and optimizes 120 frames from the Flow Woodlands-to-Houston Driving Video.
Applies refined optical feathered mask over Movement 5 text zone.
Generates responsive desktop (1920x1080) and mobile (960x540) WebP sequences.
"""

import os
import sys
import json
import math
import subprocess
from pathlib import Path
from PIL import Image, ImageFilter

VIDEO_PATH = r"C:\Users\kcjd6\Downloads\i3 Landing Page Flow Video Assets\Woodlands to Houston Driving Path.mp4"
PROJECT_ROOT = Path(r"C:\Users\kcjd6\.gemini\antigravity\scratch\i3-command-center")
PUBLIC_FRAMES = PROJECT_ROOT / "public" / "frames"
DESKTOP_DIR = PUBLIC_FRAMES / "driving-desktop"
MOBILE_DIR = PUBLIC_FRAMES / "driving-mobile"
TEMP_DIR = PROJECT_ROOT / "scratch" / "temp_driving_raw"

DESKTOP_DIR.mkdir(parents=True, exist_ok=True)
MOBILE_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)

TARGET_FRAMES = 120
QUALITY_DESKTOP = 72
QUALITY_MOBILE = 68

def extract_raw_frames():
    print(f"[1/4] Extracting {TARGET_FRAMES} raw frames via ffmpeg...")
    cmd = [
        "ffmpeg", "-i", VIDEO_PATH,
        "-vf", "fps=12,scale=1920:1080",
        "-frames:v", str(TARGET_FRAMES),
        "-q:v", "2",
        str(TEMP_DIR / "raw_%04d.png"),
        "-y"
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print("FFmpeg error:", res.stderr)
        sys.exit(1)
    print("Raw frame extraction complete.")

def build_purification_mask(w, h):
    mask = Image.new("L", (w, h), 0)
    for y in range(int(h * 0.50), h):
        for x in range(0, int(w * 0.55)):
            dx = max(0, x - 900)
            dy = max(0, 620 - y) if y < 620 else 0
            dist = math.sqrt(dx * dx + dy * dy)
            if dist == 0:
                val = 255
            else:
                val = max(0, int(255 * (1.0 - dist / 120.0)))
            mask.putpixel((x, y), val)
    return mask.filter(ImageFilter.GaussianBlur(radius=15))

def purify_and_encode():
    print("[2/4] Purifying Movement 5 artifact text & encoding WebP sequences...")
    raw_files = sorted(TEMP_DIR.glob("raw_*.png"))
    total_found = len(raw_files)
    print(f"Found {total_found} extracted raw frames.")

    mask = build_purification_mask(1920, 1080)
    black = Image.new("RGB", (1920, 1080), (5, 5, 5))

    desktop_bytes = 0
    mobile_bytes = 0

    for idx, raw_path in enumerate(raw_files[:TARGET_FRAMES]):
        frame_num = idx + 1
        frame_name = f"frame-{frame_num:04d}.webp"
        
        img = Image.open(raw_path).convert("RGB")
        
        # Apply purification mask on frames from movement 5 (frames >= 85)
        if frame_num >= 85:
            img = Image.composite(black, img, mask)

        # 1. Desktop Encode (1920x1080)
        desktop_target = DESKTOP_DIR / frame_name
        img.save(desktop_target, "WEBP", quality=QUALITY_DESKTOP, method=6)
        desktop_bytes += desktop_target.stat().st_size

        # 2. Mobile Encode (960x540)
        mobile_target = MOBILE_DIR / frame_name
        mobile_img = img.resize((960, 540), Image.Resampling.LANCZOS)
        mobile_img.save(mobile_target, "WEBP", quality=QUALITY_MOBILE, method=4)
        mobile_bytes += mobile_target.stat().st_size

        if frame_num % 20 == 0 or frame_num == TARGET_FRAMES:
            print(f"Processed frame {frame_num}/{TARGET_FRAMES}...")

    print("[3/4] Cleanup raw temporary files...")
    for f in raw_files:
        try:
            f.unlink()
        except:
            pass

    manifest = {
        "source": {
            "filename": "Woodlands to Houston Driving Path.mp4",
            "duration": 10.0,
            "resolution": "1920x1080",
            "fps": 24.0,
            "total_source_frames": 240
        },
        "frames": {
            "target_count": TARGET_FRAMES,
            "format": "webp",
            "naming_pattern": "frame-{NNNN}.webp"
        },
        "desktop": {
            "resolution": "1920x1080",
            "quality": QUALITY_DESKTOP,
            "total_bytes": desktop_bytes,
            "total_mb": round(desktop_bytes / (1024 * 1024), 2),
            "avg_kb": round(desktop_bytes / TARGET_FRAMES / 1024, 1)
        },
        "mobile": {
            "resolution": "960x540",
            "quality": QUALITY_MOBILE,
            "total_bytes": mobile_bytes,
            "total_mb": round(mobile_bytes / (1024 * 1024), 2),
            "avg_kb": round(mobile_bytes / TARGET_FRAMES / 1024, 1)
        }
    }

    manifest_path = PUBLIC_FRAMES / "driving-manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print(f"[4/4] Complete! Manifest generated at {manifest_path}")
    print(f"Desktop payload: {manifest['desktop']['total_mb']} MB (avg {manifest['desktop']['avg_kb']} KB/frame)")
    print(f"Mobile payload: {manifest['mobile']['total_mb']} MB (avg {manifest['mobile']['avg_kb']} KB/frame)")

if __name__ == "__main__":
    extract_raw_frames()
    purify_and_encode()
