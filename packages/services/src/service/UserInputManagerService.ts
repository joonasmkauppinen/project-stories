import {
  AppState,
  LayerActions,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { StoryboardDataValues } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';
import { GetState } from 'zustand';
import {
  KeyboardShortcutController,
  SelectionEventsController,
  TextLayerEventsController,
  CardElementEventsController,
} from '../controllers';
import { eventInsideSelectionBounds } from '../helpers/eventInsideSelectionBounds';

export class UserInputManagerService {
  private actions: LayerActions;
  private getState: () => AppState;

  private cardElementEventsControllerInstance: CardElementEventsController;
  private keyboardShortcutControllerInstance: KeyboardShortcutController;
  private selectionEventsControllerInstance: SelectionEventsController;
  private textLayerEventsControllerInstance: TextLayerEventsController;

  constructor(actions: LayerActions, getState: GetState<AppState>) {
    this.actions = actions;
    this.getState = getState;

    this.handleMouseDown = this.handleMouseDown.bind(this);

    this.addMouseDownListener();

    this.cardElementEventsControllerInstance = new CardElementEventsController(
      actions,
      getState
    );
    this.keyboardShortcutControllerInstance = new KeyboardShortcutController(
      actions,
      getState
    );
    this.selectionEventsControllerInstance = new SelectionEventsController(
      actions,
      getState
    );
    this.textLayerEventsControllerInstance = new TextLayerEventsController(
      actions
    );
  }

  private addMouseDownListener() {
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  private handleMouseDown(event: MouseEvent) {
    const eventTarget = event.target as HTMLElement;
    const { elementType } =
      eventTarget.dataset as unknown as StoryboardDataValues;

    const eventPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    if (
      !eventInsideSelectionBounds(eventPosition) &&
      (elementType === 'card' || elementType === 'storyboard-background')
    ) {
      console.log('Deselecting all...');
      this.actions.deselectAll();
      if (this.getState().userInteraction.isEditingText) {
        console.log('Setting isEditingText to false...');
        this.actions.setIsEditingTextToFalse();
      }
    }
  }
}
