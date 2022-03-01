import produce from 'immer';

import { AppState } from '../../types';
import { useStore } from '../../store/zustandStore';

export interface ResizeSelectionFromCornerBottomRightPayload {
  movement: {
    movementX: number;
    movementY: number;
  };
}

export type ResizeSelectionFromCornerBottomRight = (
  payload: ResizeSelectionFromCornerBottomRightPayload
) => void;

export const resizeSelectionFromCornerBottomRight: ResizeSelectionFromCornerBottomRight =
  ({ movement }) =>
    useStore.setState(
      produce<AppState>((draft) => {
        const state = useStore.getState();
        const { cardId, layerId } = state.selectedLayers[0];
        const { movementX, movementY } = movement;

        draft.cards[cardId].layers[layerId].size.height += movementY;
        draft.cards[cardId].layers[layerId].size.width += movementX;
      })
    );
