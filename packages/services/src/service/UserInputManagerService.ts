import {
  AppState,
  LayerActions,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { StoryboardDataValues } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';
import { GetState } from 'zustand';
import {
  KeyboardShortcutController,
  SelectionEventsController,
} from '../controllers';
import { eventInsideSelectionBounds } from '../helpers/eventInsideSelectionBounds';

export class UserInputManagerService {
  private actions: LayerActions;
  private getState: () => AppState;

  private keyboardShortcutControllerInstance: KeyboardShortcutController;
  private selectionEventsControllerInstance: SelectionEventsController;

  constructor(actions: LayerActions, getState: GetState<AppState>) {
    this.actions = actions;
    this.getState = getState;

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);

    this.addMouseDownListener();
    this.addDoubleClickListener();

    this.keyboardShortcutControllerInstance = new KeyboardShortcutController(
      actions,
      getState
    );

    this.selectionEventsControllerInstance = new SelectionEventsController(
      actions,
      getState
    );
  }

  private addMouseDownListener() {
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  private addDoubleClickListener() {
    document.addEventListener('dblclick', this.handleDoubleClick);
  }

  private handleDoubleClick(event: MouseEvent) {
    const eventTarget = event.target as HTMLElement;
    const { elementType, cardId, layerId } =
      eventTarget.dataset as unknown as StoryboardDataValues;

    if (elementType === 'layer:text') {
      console.log('Double click on text layer.');
      if (cardId && layerId) {
        this.actions.setTextLayerStateToActiveEditingText({ cardId, layerId });
      }
      this.actions.setIsEditingTextToTrue();
    }
  }

  private handleMouseDown(event: MouseEvent) {
    const eventTarget = event.target as HTMLElement;
    const { elementType, cardId } =
      eventTarget.dataset as unknown as StoryboardDataValues;

    const eventPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    if (elementType === 'card') {
      if (this.getState().currentTool === 'text' && cardId) {
        this.actions.addTextLayerToCard({
          cardId,
          top: event.offsetY,
        });
      }
    }

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
