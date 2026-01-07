import os
import shutil
from pathlib import Path

# Get directory sizes before
IMAGES_DIR = Path("public/images")
MUSIC_DIR = Path("public/music")
BACKUP_DIR = Path("public/.media_backup")

BACKUP_DIR.mkdir(exist_ok=True)

def get_dir_size(path):
    return sum(f.stat().st_size for f in path.glob("**/*") if f.is_file()) / (1024 * 1024)

print("Current media file sizes:")
print(f"Video files: {get_dir_size(IMAGES_DIR):.2f}MB")
print(f"Audio files: {get_dir_size(MUSIC_DIR):.2f}MB")

# For now, let's manually create a guide
print("\n" + "="*50)
print("MANUAL COMPRESSION GUIDE")
print("="*50)
print("\nYour files are too large for Vercel's 100MB limit.")
print("Options:")
print("\n1. Use FFmpeg (command line):")
print("   Videos: ffmpeg -i input.mp4 -b:v 1500k -b:a 128k output.mp4")
print("   Audio: ffmpeg -i input.mp3 -b:a 128k output.mp3")
print("\n2. Use Online Tools:")
print("   - CloudConvert.com")
print("   - TinyPNG/TinyMP4")
print("\n3. Use a CDN (recommended):")
print("   - AWS S3, Cloudinary, or Bunny CDN")
print("\nLargest files to prioritize:")

# List files by size
all_files = []
for f in IMAGES_DIR.glob("*.mp4"):
    all_files.append((f.name, f.stat().st_size / (1024*1024)))
for f in MUSIC_DIR.glob("*.mp3"):
    all_files.append((f.name, f.stat().st_size / (1024*1024)))

all_files.sort(key=lambda x: x[1], reverse=True)
for name, size in all_files[:10]:
    print(f"  {name}: {size:.2f}MB")
