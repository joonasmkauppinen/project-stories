import produce from 'immer';

import { useStore } from '../store/zustandStore';
import { AppState, ID } from '../types';

export interface ElementStateToHoveredPayload {
  id: ID;
  parentId?: ID;
}

export type SetElementStateToHovered = (
  payload: ElementStateToHoveredPayload
) => void;

export const setElementStateToHovered: SetElementStateToHovered = ({
  id,
  parentId,
}) =>
  useStore.setState(
    produce((draft: AppState) => {
      // const state = useStore.getState();

      if (parentId) {
        // if (state.cards[parentId].state === 'idle') {
        //   draft.cards[parentId].state = 'hovered';
        // }
        draft.cards[parentId].layers[id].state = 'hovered';
      } else {
        draft.cards[id].state = 'hovered';
      }
    })
  );
