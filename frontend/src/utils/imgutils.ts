import defaultImage from '../assets/default-product.png';

export { defaultImage };

export function getProductImage(image_url?: string | null): string {
  if (image_url?.startsWith('http')) return image_url;
  return defaultImage;
}

export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>
) {
  e.currentTarget.onerror = null; // prevent infinite loop
  e.currentTarget.src = defaultImage;
}