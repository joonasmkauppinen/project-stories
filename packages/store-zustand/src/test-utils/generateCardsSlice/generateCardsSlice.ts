import { generateCard, generateTextLayer } from '../../generators';
import { Card, Layer, TestCardId, TestLayerId } from '../../types';

interface TestLayer extends Partial<Omit<Layer, 'sortOrderIndex'>> {
  id: TestLayerId;
}

interface TestCard extends Partial<Omit<Card, 'layers' | 'sortOrderIndex'>> {
  id: TestCardId;
  layers?: TestLayer[];
}

export const generateCardsSlice = (cards: TestCard[]) => {
  return Object.fromEntries(
    cards.map((card, index) => {
      const { layers, id, ...rest } = card;

      const generateLayers = (layers: TestLayer[]) =>
        Object.fromEntries(
          layers.map((layer, index) => {
            const { id, ...rest } = layer;
            return generateTextLayer({
              sortOrderIndex: index,
              top: 50 * index,
              type: 'text',
              testOverrides: { id: id, properties: rest },
            }).idWithData;
          })
        );

      return generateCard({
        sortOrderIndex: index,
        testOverrides: { id: id, properties: rest },
        layers: layers ? generateLayers(layers) : {},
      }).idWithData;
    })
  );
};
