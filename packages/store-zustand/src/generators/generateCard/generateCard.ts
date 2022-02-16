import { v4 as uuidv4 } from 'uuid';

import { Card, Layers } from '../../types';
import { TestCardOverrides } from '../../types/testUtils';

interface GenerateCardProps {
  name?: string;
  sortOrderIndex: number;
  layers?: Layers;
  /**
   * ⚠️ Use this only for tests!
   */
  testOverrides?: TestCardOverrides;
}

interface GenerateCardReturnType {
  cardId: string;
  cardData: Card;
  idWithData: { [key: string]: Card };
}

export const generateCard = ({
  name,
  sortOrderIndex,
  layers,
  testOverrides,
}: GenerateCardProps): GenerateCardReturnType => {
  const id = testOverrides?.id || uuidv4();
  const defaultName = `Card ${sortOrderIndex + 1}`;
  const data: Card = {
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
    ...testOverrides?.properties,
  };

  return {
    cardId: id,
    cardData: data,
    idWithData: { [id]: data },
  };
};
