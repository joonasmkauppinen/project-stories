import produce from 'immer';

import { AppState, useStore } from '..';

export type DeselectAll = () => void;

export const deselectAll: DeselectAll = () =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();

      state.selection.forEach(({ id, parentId }) => {
        if (parentId) {
          draft.cards[parentId].layers[id].state = 'idle';
        } else {
          draft.cards[id].state = 'idle';
        }
      });
      draft.selection = [];
    })
  );
