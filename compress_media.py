import os
from pathlib import Path
from moviepy.editor import VideoFileClip, AudioFileClip
import shutil

# Directories
IMAGES_DIR = Path("public/images")
MUSIC_DIR = Path("public/music")
BACKUP_DIR = Path("public/.media_backup")

# Create backup directory
BACKUP_DIR.mkdir(exist_ok=True)

def compress_video(input_path, output_path, bitrate="1500k"):
    """Compress video files"""
    try:
        print(f"Compressing {input_path.name}...")
        clip = VideoFileClip(str(input_path))
        
        # Write video with reduced bitrate
        clip.write_videofile(
            str(output_path),
            codec='libx264',
            audio_codec='aac',
            bitrate=bitrate,
            verbose=False,
            logger=None
        )
        
        clip.close()
        
        original_size = input_path.stat().st_size / (1024 * 1024)
        compressed_size = output_path.stat().st_size / (1024 * 1024)
        reduction = ((original_size - compressed_size) / original_size) * 100
        
        print(f"✓ {input_path.name}: {original_size:.2f}MB → {compressed_size:.2f}MB ({reduction:.1f}% reduction)")
        
    except Exception as e:
        print(f"✗ Error compressing {input_path.name}: {e}")

def compress_audio(input_path, output_path, bitrate="128k"):
    """Compress audio files"""
    try:
        print(f"Compressing {input_path.name}...")
        audio = AudioFileClip(str(input_path))
        
        # Write audio with reduced bitrate
        audio.write_audiofile(
            str(output_path),
            codec='libmp3lame',
            bitrate=bitrate,
            verbose=False,
            logger=None
        )
        
        audio.close()
        
        original_size = input_path.stat().st_size / (1024 * 1024)
        compressed_size = output_path.stat().st_size / (1024 * 1024)
        reduction = ((original_size - compressed_size) / original_size) * 100
        
        print(f"✓ {input_path.name}: {original_size:.2f}MB → {compressed_size:.2f}MB ({reduction:.1f}% reduction)")
        
    except Exception as e:
        print(f"✗ Error compressing {input_path.name}: {e}")

# Compress videos
print("\n=== COMPRESSING VIDEOS ===")
for video_file in IMAGES_DIR.glob("*.mp4"):
    backup_path = BACKUP_DIR / video_file.name
    if not backup_path.exists():
        shutil.copy2(video_file, backup_path)
    compress_video(video_file, video_file, bitrate="1500k")

# Compress audio
print("\n=== COMPRESSING AUDIO ===")
for audio_file in MUSIC_DIR.glob("*.mp3"):
    backup_path = BACKUP_DIR / audio_file.name
    if not backup_path.exists():
        shutil.copy2(audio_file, backup_path)
    compress_audio(audio_file, audio_file, bitrate="128k")

print("\n=== COMPRESSION COMPLETE ===")
print(f"Original files backed up to: {BACKUP_DIR}")
