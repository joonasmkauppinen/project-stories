import produce from 'immer';

import { useStore } from '../../store/zustandStore';
import { AppState, ID } from '../../types';

export interface SetLayerStateToHoveredPayload {
  cardId: ID;
  layerId: ID;
}

export type SetLayerStateToHovered = (
  payload: SetLayerStateToHoveredPayload
) => void;

export const setLayerStateToHovered: SetLayerStateToHovered = ({
  cardId,
  layerId,
}) =>
  useStore.setState(
    produce<AppState>((draft) => {
      draft.cards[cardId].layers[layerId].state = 'hovered';
    })
  );
