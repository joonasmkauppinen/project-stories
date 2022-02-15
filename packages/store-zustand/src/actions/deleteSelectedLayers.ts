import produce from 'immer';

import { AppState } from '../types/appState';
import { useStore } from '../store/zustandStore';

// export interface DeleteSelectedLayersPayload {
//   cardId: ID;
// }

export type DeleteSelectedLayers = () => void;

export const deleteSelectedLayers: DeleteSelectedLayers = () =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();

      state.selection.forEach(({ id, parentId }) => {
        if (parentId) {
          delete draft.cards[parentId].layers[id];
        }
      });

      draft.selection = [];
    })
  );
