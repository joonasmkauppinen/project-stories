import { ImageMimeType } from '../types';

export const isValidImageMimeType = (
  mimeType: string
): mimeType is ImageMimeType => {
  switch (mimeType as ImageMimeType) {
    case 'image/gif':
    case 'image/jpeg':
    case 'image/png':
    case 'image/svg+xml':
      return true;

    default: {
      console.warn('Not a valid image mime type: ', mimeType);
      return false;
    }
  }
};
