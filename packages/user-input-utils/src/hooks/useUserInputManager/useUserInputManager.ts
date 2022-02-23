import {
  AppState,
  LayerActions,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { useEffect } from 'react';
import { cardElementEventsController } from '../controllers/cardElementEventsController';
import { keyboardShortcutController } from '../controllers/keyboardShortcutController';
import { selectionEventsController } from '../controllers/selectionEventsController';
import { textLayerEventsController } from '../controllers/textLayerEventsController';

export const useUserInputManager = (
  actions: LayerActions,
  getState: () => AppState
) => {
  useEffect(() => {
    const removeKeyboardShortcutListener = keyboardShortcutController(
      actions,
      getState
    );

    const removeCardElementEventsController = cardElementEventsController(
      actions,
      getState
    );

    const removeSelectionEventsController = selectionEventsController(
      actions,
      getState
    );

    const removeTextLayerEventsController = textLayerEventsController(actions);

    return () => {
      removeKeyboardShortcutListener();
      removeCardElementEventsController();
      removeTextLayerEventsController();
      removeSelectionEventsController();
    };
  }, [actions, getState]);
};
