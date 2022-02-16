import { AppState, TestCardId } from '../../../types';
import { defaultInitialState } from '../../__test-utils__/defaultInitialState/defaultInitialState';
import { useStore } from '../../../store/zustandStore';

import { generateCardsSlice } from '../../__test-utils__';

import { addNewCard } from '../addNewCard';

describe('Action - addNewCard()', () => {
  test('adds new card object correctly', () => {
    const cardId1: TestCardId = 'test_card_id_0';
    const cardId2: TestCardId = 'test_card_id_1';

    const stateWithOneEmptyCard: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([{ id: cardId1 }]),
    };

    useStore.setState(() => stateWithOneEmptyCard);

    const firstCard = useStore.getState().cards[cardId1];
    expect(firstCard.name).toEqual('Card 1');
    expect(firstCard.sortOrderIndex).toEqual(0);
    expect(firstCard.state).toEqual('idle');

    addNewCard({ testOverrides: { id: cardId2 } });

    const newCard = useStore.getState().cards[cardId2];
    expect(newCard.name).toEqual('Card 2');
    expect(newCard.sortOrderIndex).toEqual(1);
    expect(newCard.state).toEqual('idle');

    const cardValues = Object.values(useStore.getState().cards);
    expect(cardValues.length).toBe(2);
  });
});
