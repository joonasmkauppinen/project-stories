import produce from 'immer';

import { AppState, useStore } from '../..';
import { generateCard } from '../../generators';

export interface AddNewCardPayload {
  /**
   * If passed, this will be set to as the new card id instead of generating a
   * uuid.
   *
   * ⚠️ Use this only for tests!
   */
  mockCardId?: string;
}

export type AddNewCard = (payload?: AddNewCardPayload) => void;

export const addNewCard: AddNewCard = (payload) =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();
      const sortOrderIndex = Object.keys(state.cards).length;

      const { cardId, cardData } = generateCard({
        sortOrderIndex,
        mockId: payload?.mockCardId,
      });

      draft.cards[cardId] = cardData;
    })
  );
