import produce from 'immer';

import { useStore } from '../store/zustandStore';
import { AppState } from '../types';

export interface SelectionDragPayload {
  movementX: number;
  movementY: number;
}

export type OnDragSelection = (payload: SelectionDragPayload) => void;

export const onDragSelection: OnDragSelection = ({ movementX, movementY }) =>
  useStore.setState(
    produce((draft: AppState) => {
      const state = useStore.getState();

      state.selection.forEach(({ parentId, id }) => {
        if (parentId) {
          draft.cards[parentId].layers[id].position.x += movementX;
          draft.cards[parentId].layers[id].position.y += movementY;

          Object.entries(draft.cards[parentId].layers).forEach(
            ([layerId, layer]) => {
              if (layerId === id && layer.screenPosition) {
                layer.screenPosition.x += movementX;
                layer.screenPosition.y += movementY;
              }
            }
          );
        }
      });
    })
  );
