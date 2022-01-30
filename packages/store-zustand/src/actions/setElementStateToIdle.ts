import produce from 'immer';

import { useStore } from '../store/zustandStore';
import { AppState, ID } from '../types';

export interface ElementStateToIdlePayload {
  id: ID;
  parentId?: ID;
}

export type SetElementStateToIdle = (
  payload: ElementStateToIdlePayload
) => void;

export const setElementStateToIdle: SetElementStateToIdle = ({
  id,
  parentId,
}) =>
  useStore.setState(
    produce((draft: AppState) => {
      const state = useStore.getState();

      if (parentId) {
        // if (state.cards[parentId].state === 'hovered') {
        //   draft.cards[parentId].state = 'idle';
        // }
        draft.cards[parentId].layers[id].state = 'idle';
      } else {
        if (state.cards[id].state === 'hovered') {
          draft.cards[id].state = 'idle';
        }
      }
    })
  );
