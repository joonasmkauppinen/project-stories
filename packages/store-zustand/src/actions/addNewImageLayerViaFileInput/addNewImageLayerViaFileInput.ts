import produce from 'immer';

import { generateImageLayer } from '../../generators';
import { useStore } from '../../store/zustandStore';
import { AppState, ImageMimeType, Size } from '../../types';

export interface AddNewImageLayerViaFileInputPayload {
  resource: {
    fileName: string;
    src: string;
    mimeType: ImageMimeType;
    size: Size;
  };
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
