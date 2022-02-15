import produce from 'immer';

import { AppState, ID, useStore } from '..';

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
        draft.selectedCards.push({ cardId });
      } else {
        state.selectedCards.forEach(({ cardId }) => {
          draft.cards[cardId].state = 'idle';
          Object.keys(state.cards[cardId].layers).forEach((layerId) => {
            draft.cards[cardId].layers[layerId].state = 'idle';
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
