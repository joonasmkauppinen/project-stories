import { v4 as uuidv4 } from 'uuid';

import { Card, Layers } from '../../types';

interface GenerateCardProps {
  name?: string;
  sortOrderIndex: number;
  layers?: Layers;
  /**
   * If passed, this will be set to as the card id instead of generating a uuid.
   *
   * ⚠️ Use this only for tests!
   */
  mockId?: string;
}

type GenerateCardReturnType = {
  cardId: string;
  cardData: Card;
  idWithData: { [key: string]: Card };
};

export const generateCard = ({
  name,
  sortOrderIndex,
  layers,
  mockId,
}: GenerateCardProps): GenerateCardReturnType => {
  const id = mockId || uuidv4();
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
  };

  return {
    cardId: id,
    cardData: data,
    idWithData: { [id]: data },
  };
};
