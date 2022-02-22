import {
  AppState,
  LayerActions,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { StoryboardDataValues } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';
import { GetState } from 'zustand';
import { KeyboardShortcutController } from '../controllers';

type InteractionType =
  | null
  | 'move'
  | 'resize:corner-bottom-left'
  | 'resize:corner-bottom-right'
  | 'resize:corner-top-left'
  | 'resize:corner-top-right'
  | 'resize:side-bottom'
  | 'resize:side-left'
  | 'resize:side-right'
  | 'resize:side-top';

export class UserInputManagerService {
  private actions: LayerActions;
  private getState: () => AppState;
  private interactionType: InteractionType = null;
  private isDragging = false;
  private isMouseDown = false;
  private lastUpdateCall: number | null = null;
  private previousMousePosition = { x: NaN, y: NaN };

  private keyboardShortcutControllerInstance: KeyboardShortcutController;

  constructor(actions: LayerActions, getState: GetState<AppState>) {
    this.actions = actions;
    this.getState = getState;

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.update = this.update.bind(this);

    this.addMouseDownListener();
    this.addDoubleClickListener();

    this.keyboardShortcutControllerInstance = new KeyboardShortcutController(
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

  private removeEventListeners() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  private update(clientPosition: { x: number; y: number }) {
    const movementX = clientPosition.x - this.previousMousePosition.x;
    const movementY = clientPosition.y - this.previousMousePosition.y;
    const movement = { movementX, movementY };

    switch (this.interactionType) {
      case 'move':
        this.actions.onDragSelection(movement);
        break;

      case 'resize:side-right':
        this.actions.resizeLayerFromSideRight({ movementX });
        break;

      case 'resize:side-left':
        this.actions.resizeLayerFromSideLeft({ movementX });
        break;
    }

    this.previousMousePosition = clientPosition;
  }

  private handleMouseMove(event: MouseEvent) {
    if (this.getState().userInteraction.isEditingText) {
      return;
    }

    if (this.interactionType === 'move' && this.isDragging === false) {
      this.isDragging = true;
      this.actions.setIsDraggingToTrue();
    }

    event.preventDefault();

    if (this.lastUpdateCall) {
      cancelAnimationFrame(this.lastUpdateCall);
    }

    this.lastUpdateCall = requestAnimationFrame(() => {
      this.update({ x: event.clientX, y: event.clientY });
      this.lastUpdateCall = null;
    });
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
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);

    const eventTarget = event.target as HTMLElement;
    const { contextArea, elementType } =
      eventTarget.dataset as unknown as StoryboardDataValues;

    this.isMouseDown = true;

    if (contextArea !== 'storyboard') {
      console.log('Clicked outside of storyboard context.');
      return;
    }

    if (
      elementType === 'layer:text' ||
      elementType === 'selection' ||
      elementType === 'selection:handle-side-right' ||
      elementType === 'selection:handle-side-left'
    ) {
      console.log('Clicked on layer or selection.');

      switch (elementType) {
        case 'selection:handle-side-left':
          this.interactionType = 'resize:side-left';
          break;

        case 'selection:handle-side-right':
          this.interactionType = 'resize:side-right';
          break;

        default:
          this.interactionType = 'move';
      }

      this.previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      return;
    }

    if ((event.target as HTMLElement).dataset['elementType'] === 'selection') {
      console.log('Clicked on selection.');
      return;
    }

    if ((event.target as HTMLElement).dataset['elementType'] === 'card-name') {
      console.log('Clicked on card name.');
      return;
    }

    // TODO: This will only work when there is no bg layer or other layers where the click event happened.
    if ((event.target as HTMLElement).dataset['elementType'] === 'card') {
      if (this.getState().currentTool === 'text') {
        const cardId = (event.target as HTMLElement).dataset[
          'cardId'
        ] as string;
        this.actions.addTextLayerToCard({
          cardId,
          top: event.offsetY,
        });
        return;
      }
    }

    console.log('Deselecting all...');
    // Didn't hit any relevant target, deselect all.
    this.actions.deselectAll();
    if (this.getState().userInteraction.isEditingText) {
      console.log('Setting isEditingText to false...');
      this.actions.setIsEditingTextToFalse();
    }
  }

  private handleMouseUp() {
    this.isMouseDown = false;

    if (this.interactionType !== null) {
      this.interactionType = null;
    }

    if (this.isDragging === true) {
      this.isDragging = false;
      this.actions.setIsDraggingToFalse();
    }

    this.removeEventListeners();
  }
}
