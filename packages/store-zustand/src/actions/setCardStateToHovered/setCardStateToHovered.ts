import produce from 'immer';

import { AppState, ID } from '../../types';
import { useStore } from '../../store/zustandStore';

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
