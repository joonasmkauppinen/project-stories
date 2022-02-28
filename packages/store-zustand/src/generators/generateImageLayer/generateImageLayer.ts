import { v4 as uuidv4 } from 'uuid';

import {
  ImageLayerType,
  ImageMimeType,
  Size,
  TestImageLayerOverrides,
} from '../../types';
import { GenerateLayerReturnType } from '../../types/generateLayer';

interface GenerateImageLayerProps {
  sortOrderIndex: number;
  resource: {
    fileName: string;
    src: string;
    mimeType: ImageMimeType;
    size: Size;
  };
  /**
   * ⚠️ Use this only for tests!
   */
  testOverrides?: TestImageLayerOverrides;
}

type GenerateImageLayer = (
  props: GenerateImageLayerProps
) => GenerateLayerReturnType<ImageLayerType>;

export const generateImageLayer: GenerateImageLayer = ({
  sortOrderIndex,
  resource: { fileName, mimeType, size, src },
  testOverrides,
}) => {
  const id = testOverrides?.id || uuidv4();
  const resourceId = testOverrides?.id
    ? `${testOverrides.id}_resource`
    : uuidv4();

  const defaultName = 'Image Layer';
  const defaultPosition = {
    x: 20,
    y: 20,
  };

  const defaultSize = {
    height: 320,
    width: 320,
  };

  const data: ImageLayerType = {
    metaState: {
      parentCardActive: false,
    },
    name: fileName || defaultName,
    position: defaultPosition,
    resource: {
      fileName,
      id: resourceId,
      mimeType,
      size,
      src,
      type: 'image',
    },
    size: defaultSize,
    sortOrderIndex,
    state: 'idle',
    type: 'image',
    // animation:
    ...testOverrides,
  };

  return {
    layerId: id,
    layerData: data,
    idWithData: [id, data],
  };
};
