import { AppState, TestCardId, TestLayerId } from '../../../types';
import { useStore } from '../../../store/zustandStore';

import { defaultInitialState, generateCardsSlice } from '../../__test-utils__';

import { setCardStateToActive } from '../setCardStateToActive';

describe('Action - setCardStateToActive()', () => {
  test('Sets selected card state to active and sets "selectedCards" correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';

    const stateWithOneIdleCard: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([{ id: cardId }]),
    };

    useStore.setState(() => stateWithOneIdleCard);

    setCardStateToActive({ cardId, isShiftKey: false });

    expect(useStore.getState().cards[cardId].state).toBe('active');
    expect(useStore.getState().selectedCards.length).toBe(1);
    expect(useStore.getState().selectedCards).toMatchInlineSnapshot(`
      Array [
        Object {
          "cardId": "test_card_id_0",
        },
      ]
    `);
  });

  test('Adds a new value to "selectedCards" array when "isShiftKey" is true and sets the new cards state to active', () => {
    const card1Id: TestCardId = 'test_card_id_0';
    const card2Id: TestCardId = 'test_card_id_1';

    const stateWithOneActiveCardAndOneIdleCard: AppState = {
      ...defaultInitialState,
      selectedCards: [{ cardId: card1Id }],
      cards: generateCardsSlice([
        { id: card1Id, state: 'active' },
        { id: card2Id, state: 'idle' },
      ]),
    };

    useStore.setState(() => stateWithOneActiveCardAndOneIdleCard);

    setCardStateToActive({ cardId: card2Id, isShiftKey: true });

    expect(useStore.getState().cards[card2Id].state).toBe('active');
    expect(useStore.getState().selectedCards.length).toBe(2);
    expect(useStore.getState().selectedCards).toMatchInlineSnapshot(`
      Array [
        Object {
          "cardId": "test_card_id_0",
        },
        Object {
          "cardId": "test_card_id_1",
        },
      ]
    `);
  });

  test('Clears previous "selectedCards" before adding a new single card selection', () => {
    const card1Id: TestCardId = 'test_card_id_0';
    const card2Id: TestCardId = 'test_card_id_1';

    const stateWithOneActiveCardAndOneIdleCard: AppState = {
      ...defaultInitialState,
      selectedCards: [{ cardId: card1Id }],
      cards: generateCardsSlice([
        { id: card1Id, state: 'active' },
        { id: card2Id, state: 'idle' },
      ]),
    };

    useStore.setState(() => stateWithOneActiveCardAndOneIdleCard);

    expect(useStore.getState().cards[card1Id].state).toBe('active');
    expect(useStore.getState().cards[card2Id].state).toBe('idle');
    expect(useStore.getState().selectedCards).toMatchInlineSnapshot(`
      Array [
        Object {
          "cardId": "test_card_id_0",
        },
      ]
    `);

    setCardStateToActive({ cardId: card2Id, isShiftKey: false });

    expect(useStore.getState().cards[card1Id].state).toBe('idle');
    expect(useStore.getState().cards[card2Id].state).toBe('active');
    expect(useStore.getState().selectedCards.length).toBe(1);
    expect(useStore.getState().selectedCards).toMatchInlineSnapshot(`
      Array [
        Object {
          "cardId": "test_card_id_1",
        },
      ]
    `);
  });

  test('Clears "selectedLayers" when a card is selected', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layer1Id: TestLayerId = 'test_layer_id_0';
    const layer2Id: TestLayerId = 'test_layer_id_1';

    const stateWithOneIdleCardAndTwoActiveLayers: AppState = {
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

    useStore.setState(() => stateWithOneIdleCardAndTwoActiveLayers);

    expect(useStore.getState().selectedLayers.length).toBe(2);
    expect(useStore.getState().selectedCards.length).toBe(0);
    expect(useStore.getState().cards[cardId].layers[layer1Id].state).toBe(
      'active'
    );
    expect(useStore.getState().cards[cardId].layers[layer2Id].state).toBe(
      'active'
    );
    expect(useStore.getState().cards[cardId].state).toBe('idle');

    setCardStateToActive({ cardId, isShiftKey: false });

    expect(useStore.getState().selectedLayers.length).toBe(0);
    expect(useStore.getState().selectedCards.length).toBe(1);
    expect(useStore.getState().cards[cardId].layers[layer1Id].state).toBe(
      'idle'
    );
    expect(useStore.getState().cards[cardId].layers[layer2Id].state).toBe(
      'idle'
    );
    expect(useStore.getState().cards[cardId].state).toBe('active');
  });

  test('Clears previously selected card layers metaState."parentCardActive" when activating an other card', () => {
    const card1Id: TestCardId = 'test_card_id_0';
    const card1Layer1Id: TestLayerId = 'test_layer_id_0';
    const card1Layer2Id: TestLayerId = 'test_layer_id_1';

    const card2Id: TestCardId = 'test_card_id_1';

    const stateWithOneActiveCardWithTwoLayersAndOneIdleCard: AppState = {
      ...defaultInitialState,
      selectedCards: [{ cardId: card1Id }],
      cards: generateCardsSlice([
        {
          id: card1Id,
          state: 'active',
          layers: [
            {
              id: card1Layer1Id,
              state: 'idle',
              metaState: {
                parentCardActive: true,
              },
            },
            {
              id: card1Layer2Id,
              state: 'idle',
              metaState: {
                parentCardActive: true,
              },
            },
          ],
        },
        { id: card2Id, state: 'idle' },
      ]),
    };

    useStore.setState(() => stateWithOneActiveCardWithTwoLayersAndOneIdleCard);

    const card1Layer1 = () =>
      useStore.getState().cards[card1Id].layers[card1Layer1Id];
    const card1Layer2 = () =>
      useStore.getState().cards[card1Id].layers[card1Layer2Id];

    expect(card1Layer1().metaState.parentCardActive).toBe(true);
    expect(card1Layer2().metaState.parentCardActive).toBe(true);

    setCardStateToActive({ cardId: card2Id, isShiftKey: false });

    expect(card1Layer1().metaState.parentCardActive).toBe(false);
    expect(card1Layer2().metaState.parentCardActive).toBe(false);
  });

  test('Sets selected card layers "metaState.parentCardActive" to true', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layer1Id: TestLayerId = 'test_layer_id_0';
    const layer2Id: TestLayerId = 'test_layer_id_1';

    const stateWithOneIdleCardWithTwoIdleLayers: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([
        {
          id: cardId,
          state: 'idle',
          layers: [
            {
              id: layer1Id,
              state: 'idle',
              metaState: { parentCardActive: false },
            },
            {
              id: layer2Id,
              state: 'idle',
              metaState: { parentCardActive: false },
            },
          ],
        },
      ]),
    };

    useStore.setState(() => stateWithOneIdleCardWithTwoIdleLayers);

    setCardStateToActive({ cardId, isShiftKey: false });

    expect(
      useStore.getState().cards[cardId].layers[layer1Id].metaState
        .parentCardActive
    ).toBe(true);
    expect(
      useStore.getState().cards[cardId].layers[layer2Id].metaState
        .parentCardActive
    ).toBe(true);
  });

  test('Keeps the state same if called on already active card', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layer1Id: TestLayerId = 'test_layer_id_0';
    const layer2Id: TestLayerId = 'test_layer_id_1';

    const stateWithOneActiveCardWithTwoLayers: AppState = {
      ...defaultInitialState,
      selectedCards: [{ cardId }],
      cards: generateCardsSlice([
        {
          id: cardId,
          state: 'active',
          layers: [
            {
              id: layer1Id,
              state: 'idle',
              metaState: { parentCardActive: true },
            },
            {
              id: layer2Id,
              state: 'idle',
              metaState: { parentCardActive: true },
            },
          ],
        },
      ]),
    };

    useStore.setState(() => stateWithOneActiveCardWithTwoLayers);

    expect(useStore.getState()).toEqual(stateWithOneActiveCardWithTwoLayers);

    setCardStateToActive({ cardId, isShiftKey: false });

    expect(useStore.getState()).toEqual(stateWithOneActiveCardWithTwoLayers);

    setCardStateToActive({ cardId, isShiftKey: true });

    expect(useStore.getState()).toEqual(stateWithOneActiveCardWithTwoLayers);
  });
});
