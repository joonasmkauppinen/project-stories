import produce from 'immer';

import { useStore } from '../../store/zustandStore';
import { AppState, ID } from '../../types';

export interface SetLayerStateToIdlePayload {
  cardId: ID;
  layerId: ID;
}

export type SetLayerStateToIdle = (payload: SetLayerStateToIdlePayload) => void;

export const setLayerStateToIdle: SetLayerStateToIdle = ({ cardId, layerId }) =>
  useStore.setState(
    produce<AppState>((draft) => {
      draft.cards[cardId].layers[layerId].state = 'idle';
    })
  );
