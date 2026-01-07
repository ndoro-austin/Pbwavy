# Cloudinary Setup Guide

Your project now uses Cloudinary to serve videos and audio instead of storing them locally. This solves the Vercel deployment size issues.

## Step 1: Create a Cloudinary Account

1. Go to https://cloudinary.com/users/register/free
2. Sign up for a FREE account
3. Complete email verification
4. Go to your Dashboard

## Step 2: Get Your Cloud Name

1. In your Cloudinary Dashboard, you'll see your **Cloud Name** at the top
2. Copy it and update `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
```

## Step 3: Upload Your Media Files

### Option A: Using Cloudinary Web Interface (Easiest)

1. Go to https://cloudinary.com/console/media_library
2. Create a folder: `pbwavy`
3. Inside `pbwavy`, create subfolders: `videos` and `audio`
4. Upload your files:
   - **Videos**: Upload all `.mp4` files from `public/images/` to `pbwavy/videos/`
   - **Audio**: Upload all `.mp3` files from `public/music/` to `pbwavy/audio/`

The system expects files named:
- `s1.mp4`, `s2.mp4`, `s3.mp4`, `svid.mp4`
- `k1.mp4`, `k2.mp4`, `k3.mp4`, `k4.mp4`
- `m1.mp4`, `m2.mp4`, `m3.mp4`, `mcv.mp4`, `mcov.mp4`
- `outro_m83.mp3`, `outro_m83_dwayne.mp3`

### Option B: Using Upload API

Use the provided upload script in `scripts/upload-to-cloudinary.js` (coming soon).

## Step 4: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and check if:
- Background music plays ✓
- Videos load in WAVE pages ✓
- Videos load in Homepage portfolio slider ✓

## Step 5: Deploy to Vercel

Once Cloudinary is configured:

```bash
git add .
git commit -m "Set up Cloudinary for media delivery"
git push
```

Update your Vercel environment variables:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name`

## How It Works

- The `getMediaUrl()` function in `src/lib/cloudinary.ts` converts local paths to Cloudinary URLs
- Files are automatically optimized: videos compressed to 1500k bitrate, audio to 128k
- Falls back to local files if Cloudinary not configured (useful for development)

## Free Tier Limits

- 25 GB storage
- 25 GB monthly transformations
- More than enough for portfolio videos!

## Troubleshooting

**Videos/audio still not playing?**
- Check `.env.local` has correct `CLOUDINARY_CLOUD_NAME`
- Verify files are uploaded to correct Cloudinary folders
- Check browser console for 404 errors

**Want to serve from a different CDN?**
- Update `src/lib/cloudinary.ts` with your CDN URLs instead
