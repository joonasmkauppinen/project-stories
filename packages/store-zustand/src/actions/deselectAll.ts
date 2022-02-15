import produce from 'immer';

import { AppState, useStore } from '..';

export type DeselectAll = () => void;

export const deselectAll: DeselectAll = () =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();

      state.selectedLayers.forEach(({ cardId, layerId }) => {
        draft.cards[cardId].layers[layerId].state = 'idle';
      });
      draft.selectedLayers = [];

      state.selectedCards.forEach(({ cardId }) => {
        Object.keys(state.cards[cardId].layers).forEach((layerId) => {
          draft.cards[cardId].layers[layerId].metaState.parentCardActive =
            false;
        });

        draft.cards[cardId].state = 'idle';
      });
    })
  );
