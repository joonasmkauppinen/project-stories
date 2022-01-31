import produce from 'immer';

import { AppState, useStore } from '..';
import { generateCard } from '../generators';

export type AddNewCard = () => void;

export const addNewCard = () =>
  useStore.setState(
    produce<AppState>((draft) => {
      const state = useStore.getState();
      const sortOrderIndex = Object.keys(state.cards).length;

      draft.cards = {
        ...state.cards,
        ...generateCard({ sortOrderIndex }),
      };
    })
  );
