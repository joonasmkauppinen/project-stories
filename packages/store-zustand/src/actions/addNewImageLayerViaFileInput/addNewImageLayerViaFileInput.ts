import produce from 'immer';

import { generateImageLayer } from '../../generators';
import { useStore } from '../../store/zustandStore';
import { AppState, ResourcePayload } from '../../types';

export interface AddNewImageLayerViaFileInputPayload {
  resource: ResourcePayload;
}

export type AddNewImageLayerViaFileInput = (
  payload: AddNewImageLayerViaFileInputPayload
) => void;

export const addNewImageLayerViaFileInput: AddNewImageLayerViaFileInput = ({
  resource,
}) =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();

      if (state.selectedCards.length === 1) {
        const { cardId } = state.selectedCards[0];
        const sortOrderIndex = Object.keys(state.cards[cardId].layers).length;
        const { layerId, layerData } = generateImageLayer({
          sortOrderIndex,
          resource,
        });
        draft.cards[cardId].layers[layerId] = layerData;
        return;
      }

      draft.fileResourceQueue.push(resource);
    })
  );
