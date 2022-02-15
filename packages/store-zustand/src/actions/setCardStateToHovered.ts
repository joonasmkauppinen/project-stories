import produce from 'immer';

import { AppState, ID, useStore } from '..';

export interface SetCardStateToHoveredPayload {
  cardId: ID;
}

export type SetCardStateToHovered = (
  payload: SetCardStateToHoveredPayload
) => void;

export const setCardStateToHovered: SetCardStateToHovered = ({ cardId }) =>
  useStore.setState(
    produce<AppState>((draft) => {
      draft.cards[cardId].state = 'hovered';
    })
  );
