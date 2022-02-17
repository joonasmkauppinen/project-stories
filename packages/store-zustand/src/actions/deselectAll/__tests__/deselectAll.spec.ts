import { AppState, TestCardId, TestLayerId } from '../../../types';
import { useStore } from '../../../store/zustandStore';

import { defaultInitialState, generateCardsSlice } from '../../__test-utils__';

import { deselectAll } from '../deselectAll';

describe('Action - deselectAll()', () => {
  test('Clears selected layers correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';

    const layer1Id: TestLayerId = 'test_layer_id_0';
    const layer2Id: TestLayerId = 'test_layer_id_1';

    const stateWithOneCardAndTwoActiveLayers: AppState = {
      ...defaultInitialState,
      selectedLayers: [
        { cardId, layerId: layer1Id },
        { cardId, layerId: layer2Id },
      ],
      cards: generateCardsSlice([
        {
          id: cardId,
          layers: [
            { id: layer1Id, state: 'active' },
            { id: layer2Id, state: 'active' },
          ],
        },
      ]),
    };

    useStore.setState(() => stateWithOneCardAndTwoActiveLayers);

    expect(useStore.getState().selectedLayers.length).toBe(2);
    expect(useStore.getState().cards[cardId].layers[layer1Id].state).toBe(
      'active'
    );
    expect(useStore.getState().cards[cardId].layers[layer2Id].state).toBe(
      'active'
    );

    deselectAll();

    expect(useStore.getState().selectedLayers.length).toBe(0);
    expect(useStore.getState().cards[cardId].layers[layer1Id].state).toBe(
      'idle'
    );
    expect(useStore.getState().cards[cardId].layers[layer2Id].state).toBe(
      'idle'
    );
  });

  test('Clears selected cards correctly', () => {
    const card1Id: TestCardId = 'test_card_id_0';
    const card2Id: TestCardId = 'test_card_id_1';

    const stateWithTwoActiveCards: AppState = {
      ...defaultInitialState,
      selectedCards: [{ cardId: card1Id }, { cardId: card2Id }],
      cards: generateCardsSlice([
        { id: card1Id, state: 'active' },
        { id: card2Id, state: 'active' },
      ]),
    };

    useStore.setState(() => stateWithTwoActiveCards);

    expect(useStore.getState().selectedCards.length).toBe(2);
    expect(useStore.getState().cards[card1Id].state).toBe('active');
    expect(useStore.getState().cards[card2Id].state).toBe('active');

    deselectAll();

    expect(useStore.getState().selectedCards.length).toBe(0);
    expect(useStore.getState().cards[card1Id].state).toBe('idle');
    expect(useStore.getState().cards[card2Id].state).toBe('idle');
  });

  test('Clears selected card/s layers "metaState.parentCardActive" correctly', () => {
    const card1Id: TestCardId = 'test_card_id_0';
    const card1Layer1Id: TestLayerId = 'test_layer_id_0';
    const card1Layer2Id: TestLayerId = 'test_layer_id_1';

    const card2Id: TestCardId = 'test_card_id_1';
    const card2Layer1Id: TestLayerId = 'test_layer_id_0';

    const stateWithTwoActiveCardsAndLayersInMetaState: AppState = {
      ...defaultInitialState,
      selectedCards: [{ cardId: card1Id }, { cardId: card2Id }],
      cards: generateCardsSlice([
        {
          id: card1Id,
          state: 'active',
          layers: [
            {
              id: card1Layer1Id,
              state: 'idle',
              metaState: { parentCardActive: true },
            },
            {
              id: card1Layer2Id,
              state: 'idle',
              metaState: { parentCardActive: true },
            },
          ],
        },
        {
          id: card2Id,
          state: 'active',
          layers: [
            {
              id: card2Layer1Id,
              state: 'idle',
              metaState: { parentCardActive: true },
            },
          ],
        },
      ]),
    };

    useStore.setState(() => stateWithTwoActiveCardsAndLayersInMetaState);

    expect(useStore.getState().selectedCards.length).toBe(2);
    expect(
      useStore.getState().cards[card1Id].layers[card1Layer1Id].metaState
        .parentCardActive
    ).toBe(true);
    expect(
      useStore.getState().cards[card1Id].layers[card1Layer2Id].metaState
        .parentCardActive
    ).toBe(true);
    expect(
      useStore.getState().cards[card2Id].layers[card2Layer1Id].metaState
        .parentCardActive
    ).toBe(true);

    deselectAll();

    expect(useStore.getState().selectedCards.length).toBe(0);
    expect(
      useStore.getState().cards[card1Id].layers[card1Layer1Id].metaState
        .parentCardActive
    ).toBe(false);
    expect(
      useStore.getState().cards[card1Id].layers[card1Layer2Id].metaState
        .parentCardActive
    ).toBe(false);
    expect(
      useStore.getState().cards[card2Id].layers[card2Layer1Id].metaState
        .parentCardActive
    ).toBe(false);
  });
});
