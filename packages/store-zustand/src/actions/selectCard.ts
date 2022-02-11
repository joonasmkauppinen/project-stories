import produce from 'immer';

import { AppState, ID, useStore } from '..';

export interface SelectCardPayload {
  cardId: ID;
}

export type SelectCard = (payload: SelectCardPayload) => void;

export const selectCard: SelectCard = ({ cardId }) =>
  useStore.setState(
    produce<AppState>((draft) => {
      draft.cards[cardId].state = 'active';
      draft.selection = [];
      draft.selection.push({ id: cardId });
      Object.keys(draft.cards[cardId].layers).forEach((layerId) => {
        draft.cards[cardId].layers[layerId].state = 'active';
        draft.selection.push({ parentId: cardId, id: layerId });
      });
    })
  );
