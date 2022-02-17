import { AppState, TestCardId, TestLayerId } from '../../../types';
import { useStore } from '../../../store/zustandStore';

import { defaultInitialState, generateCardsSlice } from '../../__test-utils__';

import { addTextLayerToCard } from '../addTextLayerToCard';

describe('Action - addTextLayerToCard()', () => {
  test('Adds new layer to the card correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';

    const stateWithOneEmptyCard: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([{ id: cardId }]),
    };

    useStore.setState(() => stateWithOneEmptyCard);

    const cardLayers = () =>
      Object.values(useStore.getState().cards[cardId].layers);

    expect(cardLayers().length).toEqual(0);

    addTextLayerToCard({
      cardId,
      top: 0,
      testOverrides: { id: 'test_layer_id_0' },
    });

    expect(cardLayers().length).toEqual(1);
    expect(useStore.getState()).toMatchSnapshot();
  });

  test('Clears possible current selected layers correctly', () => {
    const layerId: TestLayerId = 'test_layer_id_0';
    const cardId: TestCardId = 'test_card_id_0';

    const stateWithCardWithOneActiveLayer: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([
        { id: cardId, layers: [{ id: layerId, state: 'active' }] },
      ]),
      selectedLayers: [{ cardId, layerId }],
    };

    useStore.setState(() => stateWithCardWithOneActiveLayer);

    expect(useStore.getState().selectedLayers.length).toEqual(1);
    expect(useStore.getState().selectedLayers).toMatchInlineSnapshot(`
      Array [
        Object {
          "cardId": "test_card_id_0",
          "layerId": "test_layer_id_0",
        },
      ]
    `);

    const newLayerId: TestLayerId = 'test_layer_id_1';
    addTextLayerToCard({ cardId, top: 100, testOverrides: { id: newLayerId } });

    expect(useStore.getState().cards[cardId].layers[layerId].state).toEqual(
      'idle'
    );
    expect(useStore.getState().selectedLayers.length).toEqual(0);
  });

  test('Clears possible current selected cards correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';

    const stateWithOneActiveCard: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([{ id: cardId, state: 'active' }]),
      selectedCards: [{ cardId }],
    };

    useStore.setState(() => stateWithOneActiveCard);

    expect(useStore.getState().selectedCards.length).toEqual(1);
    expect(useStore.getState().selectedCards).toMatchInlineSnapshot(`
      Array [
        Object {
          "cardId": "test_card_id_0",
        },
      ]
    `);

    addTextLayerToCard({
      cardId,
      top: 0,
      testOverrides: { id: 'test_layer_id_0' },
    });

    expect(useStore.getState().cards[cardId].state).toEqual('idle');
    expect(useStore.getState().selectedCards.length).toEqual(0);
  });
});
