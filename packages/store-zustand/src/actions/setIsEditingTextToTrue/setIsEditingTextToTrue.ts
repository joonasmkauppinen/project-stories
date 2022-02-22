import produce from 'immer';

import { AppState } from '../../types';
import { useStore } from '../../store/zustandStore';

export type SetIsEditingTextToTrue = () => void;

export const setIsEditingTextToTrue = () =>
  useStore.setState(
    produce<AppState>((draft) => {
      draft.userInteraction.isEditingText = true;
    })
  );
