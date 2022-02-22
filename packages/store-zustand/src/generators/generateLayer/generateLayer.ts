import { v4 as uuidv4 } from 'uuid';

import { ID, Layer, LayerType, TestLayerOverrides } from '../../types';

interface GenerateLayerProps {
  name?: string;
  sortOrderIndex: number;
  type: LayerType;
  top: number;
  left?: number;
  width?: number;
  height?: number;
  value?: string;
  /**
   * ⚠️ Use this only for tests!
   */
  testOverrides?: TestLayerOverrides;
}

type GenerateLayerReturnType = {
  layerId: ID;
  layerData: Layer;
  idWithData: [string, Layer];
};

type GenerateLayer = (props: GenerateLayerProps) => GenerateLayerReturnType;

// TODO: Hard coded to type 'text' for now. More types coming later.
export const generateLayer: GenerateLayer = ({
  name,
  sortOrderIndex,
  type,
  top,
  left,
  width,
  height,
  value,
  testOverrides,
}) => {
  const id = testOverrides?.id || uuidv4();
  const defaultName = `${type} ${sortOrderIndex + 1}`;

  // TODO: This value should equal safe zone value in the future.
  const marginHorizontal = 20;

  const data: Layer = {
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
