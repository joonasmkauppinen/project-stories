import produce from 'immer';

import { AppState, ID } from '../../types';
import { useStore } from '../../store/zustandStore';

export interface SetCardStateToActivePayload {
  cardId: ID;
  isShiftKey: boolean;
}

export type SetCardStateToActive = (
  payload: SetCardStateToActivePayload
) => void;

export const setCardStateToActive: SetCardStateToActive = ({
  cardId,
  isShiftKey,
}) =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();

      if (isShiftKey) {
        if (
          !state.selectedCards.some(
            ({ cardId: selectedCardId }) => cardId === selectedCardId
          )
        ) {
          draft.selectedCards.push({ cardId });
        }
      } else {
        state.selectedCards.forEach(({ cardId }) => {
          draft.cards[cardId].state = 'idle';
          Object.keys(state.cards[cardId].layers).forEach((layerId) => {
            draft.cards[cardId].layers[layerId].state = 'idle';
            draft.cards[cardId].layers[layerId].metaState.parentCardActive =
              false;
          });
        });
        draft.selectedCards = [{ cardId }];
      }

      state.selectedLayers.forEach(({ cardId, layerId }) => {
        draft.cards[cardId].layers[layerId].state = 'idle';
      });
      draft.selectedLayers = [];

      draft.cards[cardId].state = 'active';

      Object.keys(state.cards[cardId].layers).forEach((layerId) => {
        draft.cards[cardId].layers[layerId].metaState.parentCardActive = true;
      });
    })
  );
