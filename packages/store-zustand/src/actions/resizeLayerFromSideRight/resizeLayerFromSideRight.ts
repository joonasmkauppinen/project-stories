import produce from 'immer';

import { AppState } from '../../types';
import { useStore } from '../../store/zustandStore';

export interface ResizeLayerFromSideRightPayload {
  movementX: number;
}

export type ResizeLayerFromSideRight = (
  payload: ResizeLayerFromSideRightPayload
) => void;

export const resizeLayerFromSideRight: ResizeLayerFromSideRight = ({
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
