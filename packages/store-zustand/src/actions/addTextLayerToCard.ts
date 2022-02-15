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

      // TODO: add clear selections helper function.
      draft.selection = [];

      draft.cards[cardId].layers[layerId] = layerData;
      draft.currentTool = 'move';
    })
  );
