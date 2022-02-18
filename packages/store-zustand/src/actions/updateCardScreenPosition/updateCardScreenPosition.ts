import produce from 'immer';

import { useStore } from '../../store/zustandStore';
import { AppState, Coordinate, ID } from '../../types';

export interface CardScreenPositionPayload {
  cardId: ID;
  position: Coordinate;
}

export type UpdateCardScreenPosition = (
  payload: CardScreenPositionPayload
) => void;

export const updateCardScreenPosition: UpdateCardScreenPosition = ({
  cardId,
  position,
}) =>
  useStore.setState(
    produce((draft: AppState) => {
      draft.cards[cardId].screenPosition = position;
    })
  );
