import { v4 as uuidv4 } from 'uuid';

import { ImageLayerType } from '../../types';
import { GenerateLayerReturnType } from '../../types/generateLayer';

interface GenerateImageLayerProps {
  name?: string;
  sortOrderIndex: number;
}

type GenerateImageLayer = (
  props: GenerateImageLayerProps
) => GenerateLayerReturnType<ImageLayerType>;

export const generateImageLayer: GenerateImageLayer = ({
  name,
  sortOrderIndex,
}) => {
  const id = uuidv4();
  const resourceId = uuidv4();

  const defaultName = name || 'Image Layer';
  const defaultPosition = {
    x: 20,
    y: 20,
  };

  const defaultSize = {
    height: 300,
    width: 300,
  };

  const data: ImageLayerType = {
    metaState: {
      parentCardActive: false,
    },
    name: defaultName,
    position: defaultPosition,
    resource: {
      alt: '',
      id: resourceId,
      mimeType: 'image/png',
      size: {
        width: 300,
        height: 300,
      },
      src: '/sample_image.png',
      type: 'image',
    },
    screenPosition: {
      x: NaN,
      y: NaN,
    },
    size: defaultSize,
    sortOrderIndex,
    state: 'idle',
    type: 'image',
    // animation:
  };

  return {
    layerId: id,
    layerData: data,
    idWithData: [id, data],
  };
};
