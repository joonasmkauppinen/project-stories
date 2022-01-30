import produce from 'immer';

import { useStore } from '../store/zustandStore';
import { AppState, ID } from '../types';

export interface ElementStateToActivePayload {
  id: ID;
  parentId?: ID;
  isShiftKey?: boolean;
}

export type SetElementStateToActive = (
  payload: ElementStateToActivePayload
) => void;

export const setElementStateToActive: SetElementStateToActive = ({
  id,
  parentId,
  isShiftKey,
}) =>
  useStore.setState(
    produce((draft: AppState) => {
      const state = useStore.getState();

      // Only a card element was clicked. Remove layer selections.
      if (!parentId) {
        state.selection.forEach(({ id, parentId }) => {
          if (parentId) {
            draft.cards[parentId].layers[id].state = 'idle';
          } else {
            draft.cards[id].state = 'idle';
          }
        });
        draft.cards[id].state = 'active';
        draft.selection = [{ id }];
        return;
      }

      // Clear current multi selection if shift is not pressed and there are selections.
      if (!isShiftKey && state.selection.length > 0 && parentId) {
        state.selection.forEach(({ id, parentId }) => {
          if (parentId) {
            draft.cards[parentId].layers[id].state = 'idle';
          }
        });
        draft.selection = [{ id, parentId }];
      }

      if (parentId) {
        if (state.cards[parentId].state !== 'active') {
          draft.cards[parentId].state = 'active';
        }
        draft.cards[parentId].layers[id].state = 'active';
        draft.selection.push({ id, parentId });
      }
    })
  );
