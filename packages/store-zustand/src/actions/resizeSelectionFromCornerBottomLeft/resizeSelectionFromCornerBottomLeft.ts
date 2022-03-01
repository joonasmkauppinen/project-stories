import produce from 'immer';

import { AppState } from '../../types';
import { useStore } from '../../store/zustandStore';

export interface ResizeSelectionFromCornerBottomLeftPayload {
  movement: {
    movementX: number;
    movementY: number;
  };
}

export type ResizeSelectionFromCornerBottomLeft = (
  payload: ResizeSelectionFromCornerBottomLeftPayload
) => void;

export const resizeSelectionFromCornerBottomLeft: ResizeSelectionFromCornerBottomLeft =
  ({ movement }) =>
    useStore.setState(
      produce<AppState>((draft) => {
        const state = useStore.getState();
        const { cardId, layerId } = state.selectedLayers[0];
        const { movementX, movementY } = movement;

        draft.cards[cardId].layers[layerId].size.height += movementY;
        draft.cards[cardId].layers[layerId].size.width += movementX * -1;
        draft.cards[cardId].layers[layerId].position.x += movementX;
      })
    );
