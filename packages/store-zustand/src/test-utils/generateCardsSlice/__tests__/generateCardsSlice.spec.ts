import { TestCardId, TestLayerId } from '../../../types';

import { generateCardsSlice } from '../generateCardsSlice';

describe('test-util - generateCardsSlice()', () => {
  test('Generates one card with no layers correctly', () => {
    const oneCardWithoutLayers = generateCardsSlice([
      {
        id: 'test_card_id_0',
      },
    ]);

    expect(oneCardWithoutLayers).toMatchSnapshot();
  });

  test('Generates one card with layers correctly', () => {
    const oneCardWithLayers = generateCardsSlice([
      {
        id: 'test_card_id_0',
        layers: [{ id: 'test_layer_id_0' }],
      },
    ]);

    expect(oneCardWithLayers).toMatchSnapshot();
  });

  test('Generates two cards with no layers correctly', () => {
    const twoCardsWithoutLayers = generateCardsSlice([
      {
        id: 'test_card_id_0',
      },
      {
        id: 'test_card_id_1',
      },
    ]);

    expect(twoCardsWithoutLayers).toMatchSnapshot();
  });

  test('Generates two cards with layers correctly', () => {
    const twoCardsWithLayers = generateCardsSlice([
      {
        id: 'test_card_id_0',
        layers: [{ id: 'test_layer_id_0' }],
      },
      {
        id: 'test_card_id_1',
        layers: [{ id: 'test_layer_id_0' }, { id: 'test_layer_id_1' }],
      },
    ]);

    expect(twoCardsWithLayers).toMatchSnapshot();
  });

  test('Sets card "state" override property correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const cardWithStateActive = generateCardsSlice([
      { id: cardId, state: 'active' },
    ]);

    expect(cardWithStateActive[cardId].state).toBe('active');
  });

  test('Sets layer "state" override property correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layerId: TestLayerId = 'test_layer_id_0';
    const cardWithLayerStateActive = generateCardsSlice([
      { id: cardId, layers: [{ id: layerId, state: 'active' }] },
    ]);

    expect(cardWithLayerStateActive[cardId].layers[layerId].state).toBe(
      'active'
    );
  });
});
