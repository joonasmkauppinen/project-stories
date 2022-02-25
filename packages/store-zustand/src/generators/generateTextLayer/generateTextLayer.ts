import { v4 as uuidv4 } from 'uuid';

import { TestTextLayerOverrides, TextLayerType } from '../../types';
import { GenerateLayerReturnType } from '../../types/generateLayer';

interface GenerateTextLayerProps {
  name?: string;
  sortOrderIndex: number;
  top: number;
  left?: number;
  width?: number;
  height?: number;
  value?: string;
  /**
   * ⚠️ Use this only for tests!
   */
  testOverrides?: TestTextLayerOverrides;
}

type GenerateTextLayer = (
  props: GenerateTextLayerProps
) => GenerateLayerReturnType<TextLayerType>;

export const generateTextLayer: GenerateTextLayer = ({
  name,
  sortOrderIndex,
  top,
  left,
  width,
  height,
  value,
  testOverrides,
}) => {
  const id = testOverrides?.id || uuidv4();
  const defaultName = `Text ${sortOrderIndex + 1}`;

  // TODO: This value should equal safe zone value in the future.
  const marginHorizontal = 20;

  const data: TextLayerType = {
    name: name ? name : defaultName,
    position: {
      x: left || marginHorizontal,
      y: top,
    },
    screenPosition: {
      x: NaN,
      y: NaN,
    },
    size: {
      // TODO: Get card width from constants.
      width: width || 360 - marginHorizontal * 2,
      height: height || NaN,
    },
    sortOrderIndex,
    state: 'idle',
    type: 'text',
    value: value || 'Text Layer',
    metaState: {
      parentCardActive: false,
    },
    ...testOverrides?.properties,
  };

  return {
    layerId: id,
    layerData: data,
    idWithData: [id, data],
  };
};
