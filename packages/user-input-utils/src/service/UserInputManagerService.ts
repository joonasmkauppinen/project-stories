import {
  AppState,
  LayerActions,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { GetState } from 'zustand';
import {
  KeyboardShortcutController,
  SelectionEventsController,
  TextLayerEventsController,
  CardElementEventsController,
} from './controllers';

export class UserInputManagerService {
  constructor(actions: LayerActions, getState: GetState<AppState>) {
    new CardElementEventsController(actions, getState);
    new KeyboardShortcutController(actions, getState);
    new SelectionEventsController(actions, getState);
    new TextLayerEventsController(actions);
  }
}
