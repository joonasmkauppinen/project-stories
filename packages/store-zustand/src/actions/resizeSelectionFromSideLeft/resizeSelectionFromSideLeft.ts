import produce from 'immer';

import { AppState } from '../../types';
import { useStore } from '../../store/zustandStore';

export interface ResizeSelectionFromSideLeftPayload {
  movementX: number;
}

export type ResizeSelectionFromSideLeft = (
  payload: ResizeSelectionFromSideLeftPayload
) => void;

export const resizeSelectionFromSideLeft: ResizeSelectionFromSideLeft = ({
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

      draft.cards[cardId].layers[layerId].size.width += movementX * -1;
      draft.cards[cardId].layers[layerId].position.x += movementX;
    })
  );
