import Image from 'next/image';

// Local images are optimised by next/image. Remote URLs (for example admin uploads
// later) are shown as is, so no extra config is needed when images are added.
export default function TourImage({ image, fallbackAlt = '', sizes, priority = false }) {
  if (!image?.url) return null;
  const remote = /^https?:\/\//.test(image.url);
  return (
    <Image
      src={image.url}
      alt={image.alt || fallbackAlt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={remote}
      style={{ objectFit: 'cover' }}
    />
  );
}
