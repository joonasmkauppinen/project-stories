import produce from 'immer';

import { AppState } from '../../types';
import { useStore } from '../../store/zustandStore';

export interface ResizeSelectionFromSideTopPayload {
  movementY: number;
}

export type ResizeSelectionFromSideTop = (
  payload: ResizeSelectionFromSideTopPayload
) => void;

export const resizeSelectionFromSideTop: ResizeSelectionFromSideTop = ({
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

      draft.cards[cardId].layers[layerId].size.height += movementY * -1;
      draft.cards[cardId].layers[layerId].position.y += movementY;
    })
  );
