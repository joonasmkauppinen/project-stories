import { v4 as uuidv4 } from 'uuid';

import { Layer, LayerType } from '../../types';

interface GenerateLayerProps {
  name?: string;
  sortOrderIndex: number;
  type: LayerType;
}

type GenerateLayerReturnType = { [key: string]: Layer };

type GenerateLayer = (props: GenerateLayerProps) => GenerateLayerReturnType;

// TODO: Hard coded to type 'text' for now. More types coming later.
export const generateLayer: GenerateLayer = ({
  name,
  sortOrderIndex,
  type,
}) => {
  const id = uuidv4();
  const defaultName = `${type} ${sortOrderIndex + 1}`;

  return {
    [id]: {
      name: name ? name : defaultName,
      position: {
        x: 0,
        y: 0,
      },
      screenPosition: {
        x: NaN,
        y: NaN,
      },
      size: {
        width: 200,
        height: 40,
      },
      sortOrderIndex,
      state: 'idle',
      type: 'text',
      value: 'Hello World',
    },
  };
};
