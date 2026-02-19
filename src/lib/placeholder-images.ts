import data from '@/app/lib/placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

/**
 * Source of truth for all placeholder images in the application.
 * Imported from src/app/lib/placeholder-images.json
 */
export const PlaceHolderImages: ImagePlaceholder[] = (data as any).placeholderImages || [];
