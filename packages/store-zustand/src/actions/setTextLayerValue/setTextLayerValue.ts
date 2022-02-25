import produce from 'immer';

import { AppState, ID, TextLayerType } from '../../types';
import { useStore } from '../../store/zustandStore';
import { isTextLayer } from '../../guards/isTextLayer';

export interface SetTextLayerValuePayload {
  value: string;
  cardId: ID;
  layerId: ID;
}

export type SetTextLayerValue = (payload: SetTextLayerValuePayload) => void;

export const setTextLayerValue: SetTextLayerValue = ({
  value,
  cardId,
  layerId,
}) =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();
      const layerToUpdate = state.cards[cardId].layers[layerId];

      if (isTextLayer(layerToUpdate)) {
        (draft.cards[cardId].layers[layerId] as TextLayerType).value = value;
      } else {
        console.warn(
          'Attempted to call action "setTextLayerValue()" on layer type: ',
          layerToUpdate.type
        );
      }
    })
  );
