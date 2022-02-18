import produce from 'immer';

import { useStore } from '../../store/zustandStore';
import { AppState, Coordinate, ID } from '../../types';

export interface ElementScreenPositionPayload {
  cardId: ID;
  position: Coordinate;
}

export type UpdateElementScreenPosition = (
  payload: ElementScreenPositionPayload
) => void;

export const updateCardScreenPosition: UpdateElementScreenPosition = ({
  cardId,
  position,
}) =>
  useStore.setState(
    produce((draft: AppState) => {
      draft.cards[cardId].screenPosition = position;
    })
  );
