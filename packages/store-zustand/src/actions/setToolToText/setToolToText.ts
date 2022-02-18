import produce from 'immer';

import { AppState } from '../../types/appState';
import { useStore } from '../../store/zustandStore';

export type SetToolToText = () => void;

export const setToolToText: SetToolToText = () =>
  useStore.setState(
    produce<AppState>((draft) => {
      draft.currentTool = 'text';
    })
  );
