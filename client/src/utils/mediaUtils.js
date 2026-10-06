/**
 * Resolves any video or media URL, supporting Cloudinary, ImageKit, YouTube, Vimeo, direct MP4, or iframe embeds.
 *
 * @param {string} rawUrl - The input media URL or embed iframe code
 * @returns {{ type: 'video' | 'iframe' | 'image', url: string, provider: 'cloudinary' | 'imagekit' | 'youtube' | 'vimeo' | 'direct' | 'generic' }}
 */
export function resolveMediaSource(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      type: 'video',
      url: '/videos/stackyr-showcase.mp4',
      provider: 'direct'
    };
  }

  let url = rawUrl.trim();

  // 1. If user pasted a full <iframe ... src="..."> snippet, extract src
  const iframeMatch = url.match(/src=["']([^"']+)["']/i);
  if (iframeMatch) {
    url = iframeMatch[1];
  }

  // 2. Cloudinary Player Embed (e.g. https://player.cloudinary.com/embed/?cloud_name=...&public_id=...)
  if (url.includes('player.cloudinary.com')) {
    try {
      const parsed = new URL(url, 'https://player.cloudinary.com');
      parsed.searchParams.set('autoplay', 'true');
      parsed.searchParams.set('muted', 'true');
      parsed.searchParams.set('loop', 'true');
      parsed.searchParams.set('controls', 'false');
      return {
        type: 'iframe',
        url: parsed.toString(),
        provider: 'cloudinary'
      };
    } catch {
      return { type: 'iframe', url, provider: 'cloudinary' };
    }
  }

  // 3. Cloudinary Direct Video or Image (res.cloudinary.com)
  if (url.includes('res.cloudinary.com')) {
    const isImage = url.match(/\.(jpeg|jpg|png|webp|gif|avif|svg)($|\?)/i);
    if (isImage) {
      return { type: 'image', url, provider: 'cloudinary' };
    }

    let cleanUrl = url;
    // Cloudinary video URL without file extension can fail in native <video> tag
    if (!cleanUrl.match(/\.(mp4|webm|ogv|mov|m3u8)($|\?)/i)) {
      cleanUrl = cleanUrl.includes('?') 
        ? cleanUrl.replace('?', '.mp4?') 
        : cleanUrl + '.mp4';
    }

    return {
      type: 'video',
      url: cleanUrl,
      provider: 'cloudinary'
    };
  }

  // 4. ImageKit Media (ik.imagekit.io)
  if (url.includes('ik.imagekit.io')) {
    const isImage = url.match(/\.(jpeg|jpg|png|webp|gif|avif|svg)($|\?)/i);
    if (isImage) {
      return { type: 'image', url, provider: 'imagekit' };
    }

    let cleanUrl = url;
    if (!cleanUrl.match(/\.(mp4|webm|ogv|mov)($|\?)/i)) {
      cleanUrl = cleanUrl.includes('?') 
        ? cleanUrl.replace('?', '.mp4?') 
        : cleanUrl + '.mp4';
    }

    return {
      type: 'video',
      url: cleanUrl,
      provider: 'imagekit'
    };
  }

  // 5. YouTube Embed or Watch Link
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch) {
      videoId = ytMatch[1];
      const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;
      return { type: 'iframe', url: embedUrl, provider: 'youtube' };
    }
  }

  // 6. Vimeo Link
  if (url.includes('vimeo.com')) {
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
    if (vimeoMatch) {
      const vimeoId = vimeoMatch[1];
      const embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&autopause=0&background=1`;
      return { type: 'iframe', url: embedUrl, provider: 'vimeo' };
    }
  }

  // 7. Generic Image File
  if (url.match(/\.(jpeg|jpg|png|webp|gif|avif)($|\?)/i)) {
    return { type: 'image', url, provider: 'direct' };
  }

  // 8. Generic Embed
  if (url.includes('/embed/')) {
    return { type: 'iframe', url, provider: 'generic' };
  }

  // 9. Standard Video URL (local /videos/..., direct mp4, etc.)
  return {
    type: 'video',
    url,
    provider: 'direct'
  };
}
