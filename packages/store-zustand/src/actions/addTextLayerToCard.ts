import produce from 'immer';
import { generateLayer } from '../generators';

import { useStore } from '../store/zustandStore';
import { AppState, ID } from '../types/appState';

export interface AddTextLayerToCardPayload {
  cardId: ID;
  top: number;
  left?: number;
  width?: number;
  height?: number;
  value?: string;
}

export type AddTextLayerToCard = (payload: AddTextLayerToCardPayload) => void;

export const addTextLayerToCard: AddTextLayerToCard = ({
  cardId,
  top,
  height,
  left,
  value,
  width,
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
      const { layerId, layerData } = generateLayer({
        sortOrderIndex,
        type: 'text',
        top,
        left,
        width,
        height,
        value,
      });

      draft.cards[cardId].layers[layerId] = layerData;
      draft.currentTool = 'move';
    })
  );
