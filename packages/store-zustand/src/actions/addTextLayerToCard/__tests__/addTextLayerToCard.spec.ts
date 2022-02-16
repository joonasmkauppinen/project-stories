import { AppState, TestCardId, TestLayerId } from '../../../types';
import { generateCard, generateLayer } from '../../../generators';
import { useStore } from '../../../store/zustandStore';

import { testInitialState } from '../../__test-utils__/testInitialState';

import { addTextLayerToCard } from '../addTextLayerToCard';

describe('Action - addTextLayerToCard', () => {
  test('Adds new layer to the card correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const emptyCard = generateCard({
      sortOrderIndex: 0,
      testOverrides: { id: cardId },
    }).idWithData;

    const initialStateWithEmptyCard: AppState = {
      ...testInitialState,
      cards: {
        ...emptyCard,
      },
    };

    useStore.setState(() => initialStateWithEmptyCard);

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
    const layerInActiveState = generateLayer({
      sortOrderIndex: 0,
      top: 0,
      type: 'text',
      testOverrides: { id: layerId, properties: { state: 'active' } },
    }).idWithData;

    const cardId: TestCardId = 'test_card_id_0';
    const cardWithOneActiveLayer = generateCard({
      sortOrderIndex: 0,
      layers: { ...layerInActiveState },
      testOverrides: { id: cardId },
    }).idWithData;

    const initialState: AppState = {
      ...testInitialState,
      cards: {
        ...cardWithOneActiveLayer,
      },
      selectedLayers: [{ cardId, layerId }],
    };

    useStore.setState(() => initialState);

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

    expect(useStore.getState().selectedLayers.length).toEqual(0);
  });

  test('Clears possible current selected cards correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const cardInActiveState = generateCard({
      sortOrderIndex: 0,
      testOverrides: { id: cardId, properties: { state: 'active' } },
    }).idWithData;

    const initialState: AppState = {
      ...testInitialState,
      cards: {
        ...cardInActiveState,
      },
      selectedCards: [{ cardId }],
    };

    useStore.setState(() => initialState);

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

    expect(useStore.getState().selectedCards.length).toEqual(0);
  });
});
