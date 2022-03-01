import produce from 'immer';

import { AppState } from '../../types';
import { useStore } from '../../store/zustandStore';

export interface ResizeSelectionFromCornerTopLeftPayload {
  movement: {
    movementX: number;
    movementY: number;
  };
}

export type ResizeSelectionFromCornerTopLeft = (
  payload: ResizeSelectionFromCornerTopLeftPayload
) => void;

export const resizeSelectionFromCornerTopLeft: ResizeSelectionFromCornerTopLeft =
  ({ movement }) =>
    useStore.setState(
      produce<AppState>((draft) => {
        const state = useStore.getState();
        const { cardId, layerId } = state.selectedLayers[0];
        const { movementX, movementY } = movement;

        draft.cards[cardId].layers[layerId].size.height += movementY * -1;
        draft.cards[cardId].layers[layerId].size.width += movementX * -1;
        draft.cards[cardId].layers[layerId].position.y += movementY;
        draft.cards[cardId].layers[layerId].position.x += movementX;
      })
    );
