import produce from 'immer';

import { AppState } from '../../types';
import { useStore } from '../../store/zustandStore';

export interface ResizeSelectionFromSideRightPayload {
  movementX: number;
}

export type ResizeSelectionFromSideRight = (
  payload: ResizeSelectionFromSideRightPayload
) => void;

export const resizeSelectionFromSideRight: ResizeSelectionFromSideRight = ({
  movementX,
}) =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();

      if (
        state.selectedLayers.length > 1 ||
        state.selectedLayers.length === 0
      ) {
        return;
      }

      const { cardId, layerId } = state.selectedLayers[0];

      draft.cards[cardId].layers[layerId].size.width += movementX;
    })
  );
