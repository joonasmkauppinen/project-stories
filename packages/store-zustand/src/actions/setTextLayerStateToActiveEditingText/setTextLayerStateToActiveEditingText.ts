import produce from 'immer';

import { AppState, ID } from '../../types';
import { useStore } from '../../store/zustandStore';

export interface SetTextLayerStateToActiveEditingTextPayload {
  cardId: ID;
  layerId: ID;
}

export type SetTextLayerStateToActiveEditingText = (
  payload: SetTextLayerStateToActiveEditingTextPayload
) => void;

export const setTextLayerStateToActiveEditingText: SetTextLayerStateToActiveEditingText =
  ({ cardId, layerId }) =>
    useStore.setState(
      produce<AppState>((draft) => {
        draft.cards[cardId].layers[layerId].state = 'active:editing-text';
      })
    );
