import produce from 'immer';

import { AppState, ID } from '../..';
import { useStore } from '../../store/zustandStore';

export interface SetTextLayerValuePayload {
  value: string;
  cardId: ID;
  layerId: ID;
}

export type SetTextLayerValue = (payload: SetTextLayerValuePayload) => void;

export const setTextLayerValue: SetTextLayerValue = ({
  value,
  cardId,
  layerId,
}) =>
  useStore.setState(
    produce<AppState>((draft) => {
      draft.cards[cardId].layers[layerId].value = value;
    })
  );
