import produce from 'immer';

import { useStore } from '../../store/zustandStore';
import { AppState } from '../../types';

export interface SelectionDragPayload {
  movementX: number;
  movementY: number;
}

export type OnDragSelection = (payload: SelectionDragPayload) => void;

export const onDragSelection: OnDragSelection = ({ movementX, movementY }) =>
  useStore.setState(
    produce((draft: AppState) => {
      const state = useStore.getState();

      state.selectedLayers.forEach(({ cardId, layerId }) => {
        draft.cards[cardId].layers[layerId].position.x += movementX;
        draft.cards[cardId].layers[layerId].position.y += movementY;
      });
    })
  );
