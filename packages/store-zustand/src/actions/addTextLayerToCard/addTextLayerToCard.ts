import produce from 'immer';

import { AppState, ID, TestTextLayerOverrides } from '../../types';
import { generateTextLayer } from '../../generators';
import { useStore } from '../../store/zustandStore';

export interface AddTextLayerToCardPayload {
  cardId: ID;
  top: number;
  left?: number;
  width?: number;
  height?: number;
  value?: string;
  testOverrides?: TestTextLayerOverrides;
}

export type AddTextLayerToCard = (payload: AddTextLayerToCardPayload) => void;

export const addTextLayerToCard: AddTextLayerToCard = ({
  cardId,
  top,
  height,
  left,
  value,
  width,
  testOverrides,
}) =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();

      // TODO: add clear selections helper function.
      state.selectedLayers.forEach(({ cardId, layerId }) => {
        draft.cards[cardId].layers[layerId].state = 'idle';
      });
      draft.selectedLayers = [];

      state.selectedCards.forEach(({ cardId }) => {
        draft.cards[cardId].state = 'idle';
      });
      draft.selectedCards = [];

      const sortOrderIndex = Object.keys(state.cards[cardId].layers).length;
      const { layerId, layerData } = generateTextLayer({
        sortOrderIndex,
        top,
        left,
        width,
        height,
        value,
        testOverrides,
      });

      draft.cards[cardId].layers[layerId] = layerData;
      draft.currentTool = 'move';
    })
  );
