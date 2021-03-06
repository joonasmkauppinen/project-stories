import produce from 'immer';

import { useStore } from '../../store/zustandStore';
import { AppState, ID } from '../../types';

export interface SetLayerStateToActivePayload {
  cardId: ID;
  layerId: ID;
  isShiftKey: boolean;
}

export type SetLayerStateToActive = (
  payload: SetLayerStateToActivePayload
) => void;

export const setLayerStateToActive: SetLayerStateToActive = ({
  cardId,
  layerId,
  isShiftKey,
}) =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();
      if (isShiftKey) {
        const selectedLayerInsideSameCard = state.selectedLayers.every(
          ({ cardId: selectedCardId }) => selectedCardId === cardId
        );

        if (selectedLayerInsideSameCard) {
          draft.selectedLayers.push({ cardId, layerId });
        } else {
          state.selectedLayers.forEach(({ cardId, layerId }) => {
            draft.cards[cardId].layers[layerId].state = 'idle';
          });
          draft.selectedLayers = [{ cardId, layerId }];
        }
      } else {
        state.selectedLayers.forEach(({ cardId, layerId }) => {
          draft.cards[cardId].layers[layerId].state = 'idle';
        });
        draft.selectedLayers = [{ cardId, layerId }];
      }

      state.selectedCards.forEach(({ cardId }) => {
        draft.cards[cardId].state = 'idle';
        Object.keys(state.cards[cardId].layers).forEach((layerId) => {
          draft.cards[cardId].layers[layerId].metaState.parentCardActive =
            false;
        });
      });
      draft.selectedCards = [];

      draft.cards[cardId].layers[layerId].state = 'active';
    })
  );
