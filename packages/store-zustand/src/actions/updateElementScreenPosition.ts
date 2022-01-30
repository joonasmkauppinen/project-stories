import produce from 'immer';

import { useStore } from '../store/zustandStore';
import { AppState, Coordinate, ID } from '../types';

export interface ElementScreenPositionPayload {
  id: ID;
  parentId?: ID;
  position: Coordinate;
}

export type UpdateElementScreenPosition = (
  payload: ElementScreenPositionPayload
) => void;

export const updateElementScreenPosition: UpdateElementScreenPosition = ({
  id,
  parentId,
  position,
}) =>
  useStore.setState(
    produce((draft: AppState) => {
      if (parentId) {
        draft.cards[parentId].layers[id].screenPosition = position;
      } else {
        draft.cards[id].screenPosition = position;
      }
    })
  );
