import produce from 'immer';

import { AppState } from '../../types/appState';
import { useStore } from '../../store/zustandStore';

export type DeleteSelectedCards = () => void;

export const deleteSelectedCards: DeleteSelectedCards = () =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();

      state.selectedCards.forEach(({ cardId }) => {
        delete draft.cards[cardId];
      });

      draft.selectedCards = [];
    })
  );
