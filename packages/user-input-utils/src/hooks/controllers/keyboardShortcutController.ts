import {
  AppState,
  LayerActions,
} from '@joonasmkauppinen/project-stories/store-zustand';

export const keyboardShortcutController = (
  actions: LayerActions,
  getState: () => AppState
) => {
  console.log('Adding keyboardShortcutController...');
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }

    if (getState().userInteraction.isEditingText) {
      console.log('In text edit mode. Not listening for shortcuts.');
      return;
    }

    console.log('Keydown: ', event.code);

    switch (event.code) {
      case 'Backspace': {
        if (getState().selectedCards.length > 0) {
          console.log('Deleting selected cards...');
          actions.deleteSelectedCards();
        }

        if (getState().selectedLayers.length > 0) {
          console.log('Deleting selected layers...');
          actions.deleteSelectedLayers();
        }
        break;
      }

      // Move tool shortcut
      case 'KeyV':
        actions.setToolToMove();
        break;

      // Text tool shortcut
      case 'KeyT':
        actions.setToolToText();
        break;

      // Add new card item shortcut
      case 'KeyN': {
        if (event.ctrlKey) {
          event.preventDefault();
          actions.addNewCard();
        }
        break;
      }
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    console.log('Removing keyboardShortcutController...');
    document.removeEventListener('keydown', handleKeyDown);
  };
};
