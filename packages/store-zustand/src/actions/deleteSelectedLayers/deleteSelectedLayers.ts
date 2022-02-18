import produce from 'immer';

import { AppState } from '../../types/appState';
import { useStore } from '../../store/zustandStore';

export type DeleteSelectedLayers = () => void;

export const deleteSelectedLayers: DeleteSelectedLayers = () =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();

      state.selectedLayers.forEach(({ cardId, layerId }) => {
        delete draft.cards[cardId].layers[layerId];
      });

      draft.selectedLayers = [];
    })
  );
