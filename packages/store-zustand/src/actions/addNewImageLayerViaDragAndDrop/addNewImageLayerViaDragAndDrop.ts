import produce from 'immer';

import {
  AppState,
  ID,
  ResourcePayload,
  TestImageLayerOverrides,
} from '../../types';
import { useStore } from '../../store/zustandStore';
import { generateImageLayer } from '../../generators';

export interface AddNewImageLayerViaDragAndDropPayload {
  cardId: ID;
  resource: ResourcePayload;
  /**
   * ⚠️ Use this only for tests!
   */
  testOverrides?: TestImageLayerOverrides;
}

export type AddNewImageLayerViaDragAndDrop = (
  payload: AddNewImageLayerViaDragAndDropPayload
) => void;

export const addNewImageLayerViaDragAndDrop: AddNewImageLayerViaDragAndDrop = ({
  cardId,
  resource,
  testOverrides,
}) =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();
      const sortOrderIndex = Object.keys(state.cards[cardId].layers).length;
      const { layerId, layerData } = generateImageLayer({
        resource,
        sortOrderIndex,
        testOverrides,
      });

      draft.cards[cardId].layers[layerId] = layerData;
    })
  );
