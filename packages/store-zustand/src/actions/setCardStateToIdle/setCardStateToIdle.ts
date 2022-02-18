import produce from 'immer';

import { AppState, ID } from '../../types';
import { useStore } from '../../store/zustandStore';

export interface SetCardStateToIdlePayload {
  cardId: ID;
}

export type SetCardStateToIdle = (payload: SetCardStateToIdlePayload) => void;

export const setCardStateToIdle: SetCardStateToIdle = ({ cardId }) =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();

      Object.keys(state.cards[cardId].layers).forEach((layerId) => {
        draft.cards[cardId].layers[layerId].metaState.parentCardActive = false;
      });

      const updatedSelectedCards = state.selectedCards.filter(
        ({ cardId: selectedCardId }) => selectedCardId !== cardId
      );

      draft.selectedCards = updatedSelectedCards;

      draft.cards[cardId].state = 'idle';
    })
  );
