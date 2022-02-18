import produce from 'immer';

import { AppState } from '../../types';
import { useStore } from '../../store/zustandStore';

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
      draft.selectedCards = [];
    })
  );
