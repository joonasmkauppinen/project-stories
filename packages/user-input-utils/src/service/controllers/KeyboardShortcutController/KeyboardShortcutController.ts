import {
  AppState,
  LayerActions,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { GetState } from 'zustand';

export class KeyboardShortcutController {
  private actions: LayerActions;
  private getState: () => AppState;

  constructor(actions: LayerActions, getState: GetState<AppState>) {
    this.actions = actions;
    this.getState = getState;

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.addKeydownListener();
  }

  private addKeydownListener() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.repeat) {
      return;
    }

    if (this.getState().userInteraction.isEditingText) {
      console.log('In text edit mode. Not listening for key strokes.');
      return;
    }

    console.log('Keydown: ', event.code);

    switch (event.code) {
      case 'Backspace': {
        if (this.getState().selectedCards.length > 0) {
          console.log('Deleting selected cards...');
          this.actions.deleteSelectedCards();
        }

        if (this.getState().selectedLayers.length > 0) {
          console.log('Deleting selected layers...');
          this.actions.deleteSelectedLayers();
        }
        break;
      }

      // Move tool shortcut
      case 'KeyV':
        this.actions.setToolToMove();
        break;

      // Text tool shortcut
      case 'KeyT':
        this.actions.setToolToText();
        break;

      // Add new card item shortcut
      case 'KeyN': {
        if (event.ctrlKey) {
          event.preventDefault();
          this.actions.addNewCard();
        }
        break;
      }
    }
  }
}
