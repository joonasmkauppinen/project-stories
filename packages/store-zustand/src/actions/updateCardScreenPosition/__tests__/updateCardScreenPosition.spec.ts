import { AppState, TestCardId } from '../../../types';
import { useStore } from '../../../store/zustandStore';

import { defaultInitialState, generateCardsSlice } from '../../__test-utils__';

import { updateCardScreenPosition } from '../updateCardScreenPosition';

describe('Action - updateCardScreenPosition()', () => {
  test('Updates card screen position correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';

    const stateWithOneCard: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([
        { id: cardId, screenPosition: { x: 0, y: 0 } },
      ]),
    };

    useStore.setState(() => stateWithOneCard);

    updateCardScreenPosition({ cardId, position: { x: 20, y: 30 } });

    expect(useStore.getState().cards[cardId].screenPosition.x).toBe(20);
    expect(useStore.getState().cards[cardId].screenPosition.y).toBe(30);
  });
});
