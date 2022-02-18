import { AppState, TestCardId, TestLayerId } from '../../../types';
import { useStore } from '../../../store/zustandStore';

import { defaultInitialState, generateCardsSlice } from '../../__test-utils__';

import { setCardStateToIdle } from '../setCardStateToIdle';

describe('Action - setCardStateToIdle()', () => {
  test('Sets previously active card state to idle correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';

    const stateWithOneActiveCard: AppState = {
      ...defaultInitialState,
      selectedCards: [{ cardId }],
      cards: generateCardsSlice([{ id: cardId, state: 'active' }]),
    };

    useStore.setState(() => stateWithOneActiveCard);

    expect(useStore.getState().selectedCards.length).toBe(1);
    expect(useStore.getState().cards[cardId].state).toBe('active');

    setCardStateToIdle({ cardId });

    expect(useStore.getState().selectedCards.length).toBe(0);
    expect(useStore.getState().cards[cardId].state).toBe('idle');
  });

  test('Sets previously active card layers "metaState.parentCardActive" to false', () => {
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

    setCardStateToIdle({ cardId });

    expect(
      useStore.getState().cards[cardId].layers[layer1Id].metaState
        .parentCardActive
    ).toBe(false);
    expect(
      useStore.getState().cards[cardId].layers[layer2Id].metaState
        .parentCardActive
    ).toBe(false);
  });

  test('Sets previously hovered card state to idle correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';

    const stateWithOneHoveredCard: AppState = {
      ...defaultInitialState,
      selectedCards: [{ cardId }],
      cards: generateCardsSlice([
        {
          id: cardId,
          state: 'hovered',
        },
      ]),
    };

    useStore.setState(() => stateWithOneHoveredCard);

    expect(useStore.getState().cards[cardId].state).toBe('hovered');

    setCardStateToIdle({ cardId });

    expect(useStore.getState().cards[cardId].state).toBe('idle');
  });

  test('Removes cardId from selectedCards array', () => {
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

    setCardStateToIdle({ cardId: card1Id });

    expect(useStore.getState().selectedCards.length).toBe(1);
    expect(useStore.getState().selectedCards).not.toContainEqual({
      cardId: card1Id,
    });
    expect(useStore.getState().selectedCards).toContainEqual({
      cardId: card2Id,
    });
  });
});
