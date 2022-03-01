import produce from 'immer';

import { AppState } from '../../types';
import { useStore } from '../../store/zustandStore';

export interface ResizeSelectionFromSideBottomPayload {
  movementY: number;
}

export type ResizeSelectionFromSideBottom = (
  payload: ResizeSelectionFromSideBottomPayload
) => void;

export const resizeSelectionFromSideBottom: ResizeSelectionFromSideBottom = ({
  movementY,
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

      draft.cards[cardId].layers[layerId].size.height += movementY;
    })
  );
