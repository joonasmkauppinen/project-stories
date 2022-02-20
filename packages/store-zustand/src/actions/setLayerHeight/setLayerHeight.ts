import produce from 'immer';

import { AppState, ID } from '../../types';
import { useStore } from '../../store/zustandStore';

export interface SetLayerHeightPayload {
  cardId: ID;
  height: number;
  layerId: ID;
}

export type SetLayerHeight = (payload: SetLayerHeightPayload) => void;

export const setLayerHeight: SetLayerHeight = ({ cardId, height, layerId }) =>
  useStore.setState(
    produce<AppState>((draft) => {
      draft.cards[cardId].layers[layerId].size.height = height;
    })
  );
