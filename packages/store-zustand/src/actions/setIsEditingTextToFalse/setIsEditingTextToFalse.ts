import produce from 'immer';

import { AppState } from '../../types';
import { useStore } from '../../store/zustandStore';

export type SetIsEditingTextToFalse = () => void;

export const setIsEditingTextToFalse = () =>
  useStore.setState(
    produce<AppState>((draft) => {
      draft.userInteraction.isEditingText = false;
    })
  );
