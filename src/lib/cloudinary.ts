/**
 * Cloudinary URL builder
 * Generates optimized URLs for videos and audio from Cloudinary
 */

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';

// Map of local paths to Cloudinary public IDs
const MEDIA_MAPPING: Record<string, string> = {
  // Videos
  '/images/s1.mp4': 'pbwavy/videos/s1',
  '/images/s2.mp4': 'pbwavy/videos/s2',
  '/images/s3.mp4': 'pbwavy/videos/s3',
  '/images/svid.mp4': 'pbwavy/videos/svid',
  '/images/k1.mp4': 'pbwavy/videos/k1',
  '/images/k2.mp4': 'pbwavy/videos/k2',
  '/images/k3.mp4': 'pbwavy/videos/k3',
  '/images/k4.mp4': 'pbwavy/videos/k4',
  '/images/m1.mp4': 'pbwavy/videos/m1',
  '/images/m2.mp4': 'pbwavy/videos/m2',
  '/images/m3.mp4': 'pbwavy/videos/m3',
  '/images/mcv.mp4': 'pbwavy/videos/mcv',
  '/images/mcov.mp4': 'pbwavy/videos/mcov',
  
  // Audio
  '/music/Outro - M83.mp3': 'pbwavy/audio/outro_m83',
  '/music/M83 - Outro - Dwayne L.mp3': 'pbwavy/audio/outro_m83_dwayne',
};

/**
 * Get optimized Cloudinary URL for a media file
 * Falls back to local path if Cloudinary not configured
 */
export function getMediaUrl(localPath: string): string {
  // If Cloudinary not configured, use local path
  if (!CLOUDINARY_CLOUD_NAME) {
    console.warn('Cloudinary not configured, using local media files');
    return localPath;
  }

  const publicId = MEDIA_MAPPING[localPath];
  
  if (!publicId) {
    console.warn(`No Cloudinary mapping found for ${localPath}`);
    return localPath;
  }

  // Build Cloudinary URL with optimizations
  const isVideo = localPath.endsWith('.mp4');
  const isAudio = localPath.endsWith('.mp3');

  if (isVideo) {
    // Optimize video: reduce quality and bitrate for web
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,c_scale,w_1280,br_1500k/${publicId}.mp4`;
  } else if (isAudio) {
    // Optimize audio: reduce bitrate
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,br_128k/${publicId}.mp3`;
  }

  return localPath;
}

/**
 * Get list of all available media files
 */
export function getAvailableMedia() {
  return MEDIA_MAPPING;
}
