import produce from 'immer';

import { AppState, TestCardOverrides } from '../../types';
import { generateCard } from '../../generators';
import { useStore } from '../../store/zustandStore';

export interface AddNewCardPayload {
  /**
   * ⚠️ Use this only for tests!
   */
  testOverrides?: TestCardOverrides;
}

export type AddNewCard = (payload?: AddNewCardPayload) => void;

export const addNewCard: AddNewCard = (payload) =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();
      const sortOrderIndex = Object.keys(state.cards).length;

      const { cardId, cardData } = generateCard({
        sortOrderIndex,
        testOverrides: payload?.testOverrides,
      });

      draft.cards[cardId] = cardData;
    })
  );
