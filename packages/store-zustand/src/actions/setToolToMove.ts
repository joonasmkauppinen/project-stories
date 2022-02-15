import produce from 'immer';

import { AppState } from '../types/appState';
import { useStore } from '../store/zustandStore';

export type SetToolToMove = () => void;

export const setToolToMove: SetToolToMove = () =>
  useStore.setState(
    produce<AppState>((draft) => {
      draft.currentTool = 'move';
    })
  );
