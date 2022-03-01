import produce from 'immer';

import { AppState } from '../../types';
import { useStore } from '../../store/zustandStore';

export interface ResizeSelectionFromCornerTopRightPayload {
  movement: {
    movementX: number;
    movementY: number;
  };
}

export type ResizeSelectionFromCornerTopRight = (
  payload: ResizeSelectionFromCornerTopRightPayload
) => void;

export const resizeSelectionFromCornerTopRight: ResizeSelectionFromCornerTopRight =
  ({ movement }) =>
    useStore.setState(
      produce<AppState>((draft) => {
        const state = useStore.getState();
        const { cardId, layerId } = state.selectedLayers[0];
        const { movementX, movementY } = movement;

        draft.cards[cardId].layers[layerId].size.height += movementY * -1;
        draft.cards[cardId].layers[layerId].size.width += movementX;
        draft.cards[cardId].layers[layerId].position.y += movementY;
      })
    );
