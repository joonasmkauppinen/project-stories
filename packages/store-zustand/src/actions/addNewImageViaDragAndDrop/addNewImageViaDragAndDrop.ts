import produce from 'immer';

import { AppState, ID, ResourcePayload } from '../../types';
import { useStore } from '../../store/zustandStore';
import { generateImageLayer } from '../../generators';

export interface AddNewImageViaDragAndDropPayload {
  cardId: ID;
  resource: ResourcePayload;
}

export type AddNewImageViaDragAndDrop = (
  payload: AddNewImageViaDragAndDropPayload
) => void;

export const addNewImageViaDragAndDrop: AddNewImageViaDragAndDrop = ({
  cardId,
  resource,
}) =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();
      const sortOrderIndex = Object.keys(state.cards[cardId].layers).length;
      const { layerId, layerData } = generateImageLayer({
        resource,
        sortOrderIndex,
      });

      draft.cards[cardId].layers[layerId] = layerData;
    })
  );
