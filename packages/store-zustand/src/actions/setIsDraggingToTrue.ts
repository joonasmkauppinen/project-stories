import produce from 'immer';

import { AppState } from '../types/appState';
import { useStore } from '../store/zustandStore';

export type SetIsDraggingToTrue = () => void;

export const setIsDraggingToTrue: SetIsDraggingToTrue = () =>
  useStore.setState(
    produce<AppState>((draft) => {
      draft.isDragging = true;
    })
  );
