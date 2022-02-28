import produce from 'immer';

import { AppState, ID, TestImageLayerOverrides } from '../../types';
import { useStore } from '../../store/zustandStore';
import { generateImageLayer } from '../../generators';

export interface SetCardStateToActivePayload {
  cardId: ID;
  isShiftKey: boolean;
  /**
   * ⚠️ Use this only for unit tests!
   */
  testImageLayerOverrides?: TestImageLayerOverrides;
}

export type SetCardStateToActive = (
  payload: SetCardStateToActivePayload
) => void;

export const setCardStateToActive: SetCardStateToActive = ({
  cardId,
  isShiftKey,
  testImageLayerOverrides,
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

      if (state.fileResourceQueue.length === 1) {
        const resource = state.fileResourceQueue[0];
        const sortOrderIndex = Object.keys(state.cards[cardId].layers).length;
        const { layerId, layerData } = generateImageLayer({
          resource,
          sortOrderIndex,
          testOverrides: testImageLayerOverrides,
        });
        draft.cards[cardId].layers[layerId] = layerData;
        draft.fileResourceQueue = [];
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
