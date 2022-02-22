import produce from 'immer';

import { AppState } from '../../types/appState';
import { useStore } from '../../store/zustandStore';

export type SetIsDraggingToFalse = () => void;

export const setIsDraggingToFalse: SetIsDraggingToFalse = () =>
  useStore.setState(
    produce<AppState>((draft) => {
      draft.userInteraction.isDragging = false;
    })
  );
