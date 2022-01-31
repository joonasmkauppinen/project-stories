import { v4 as uuidv4 } from 'uuid';

import { Card, Layers } from '../../types';

interface GenerateCardProps {
  name?: string;
  sortOrderIndex: number;
  layers?: Layers;
}

type GenerateCardReturnType = { [key: string]: Card };

export const generateCard = ({
  name,
  sortOrderIndex,
  layers,
}: GenerateCardProps): GenerateCardReturnType => {
  const id = uuidv4();
  const defaultName = `Card ${sortOrderIndex + 1}`;

  return {
    [id]: {
      autoAdvance: false,
      duration: 0,
      layers: layers ? layers : {},
      name: name ? name : defaultName,
      sortOrderIndex,
      state: 'idle',
      screenPosition: {
        x: NaN,
        y: NaN,
      },
    },
  };
};
