import { AppState, TestCardId } from '../../../types';
import { useStore } from '../../../store/zustandStore';
import { defaultInitialState, generateCardsSlice } from '../../../test-utils';

import { setCardStateToHovered } from '../setCardStateToHovered';

describe('Action - setCardStateToHovered()', () => {
  test('Sets card state to hovered correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';

    const stateWithOneIdleCard: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([{ id: cardId, state: 'idle' }]),
    };

    useStore.setState(() => stateWithOneIdleCard);

    expect(useStore.getState().cards[cardId].state).toBe('idle');

    setCardStateToHovered({ cardId });

    expect(useStore.getState().cards[cardId].state).toBe('hovered');
  });
});
