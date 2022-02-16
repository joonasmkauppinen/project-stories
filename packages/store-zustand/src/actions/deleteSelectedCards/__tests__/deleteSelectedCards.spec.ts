import { AppState, TestCardId } from '../../../types';
import { useStore } from '../../../store/zustandStore';

import { defaultInitialState, generateCardsSlice } from '../../__test-utils__';

import { deleteSelectedCards } from '../deleteSelectedCards';

describe('Action - deleteSelectedCards()', () => {
  test('Deletes selected cards correctly', () => {
    const cardId1: TestCardId = 'test_card_id_0';
    const cardId2: TestCardId = 'test_card_id_1';

    const initialState: AppState = {
      ...defaultInitialState,
      selectedCards: [{ cardId: cardId1 }, { cardId: cardId2 }],
      cards: generateCardsSlice([
        {
          id: cardId1,
          state: 'active',
        },
        {
          id: cardId2,
          state: 'active',
          layers: [
            {
              id: 'test_layer_id_0',
              metaState: { parentCardActive: true },
            },
          ],
        },
      ]),
    };

    useStore.setState(() => initialState);

    expect(useStore.getState().selectedCards.length).toEqual(2);
    expect(useStore.getState().cards[cardId1]).not.toBe(undefined);
    expect(useStore.getState().cards[cardId2]).not.toBe(undefined);

    deleteSelectedCards();

    expect(useStore.getState().selectedCards.length).toEqual(0);
    expect(useStore.getState().cards[cardId1]).toBe(undefined);
    expect(useStore.getState().cards[cardId2]).toBe(undefined);
  });
});
