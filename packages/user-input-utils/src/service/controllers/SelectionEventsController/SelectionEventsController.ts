import { GetState } from 'zustand';
import {
  AppState,
  LayerActions,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { StoryboardDataValues } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';

import { eventInsideSelectionBounds } from '../../../helpers/eventInsideSelectionBounds';

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

export class SelectionEventsController {
  private actions: LayerActions;
  private getState: () => AppState;

  private interactionType: InteractionType = null;
  private previousMousePosition = { x: NaN, y: NaN };
  private lastUpdateCall: number | null = null;

  constructor(actions: LayerActions, getState: GetState<AppState>) {
    this.actions = actions;
    this.getState = getState;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.update = this.update.bind(this);

    this.addMouseDownListener();
  }

  private addMouseDownListener() {
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  private addMouseMoveAndUpListeners() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  private removeMouseMoveAndUpListeners() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  private handleMouseDown(event: MouseEvent) {
    const eventTarget = event.target as HTMLElement;
    const { contextArea, elementType } =
      eventTarget.dataset as unknown as StoryboardDataValues;

    if (contextArea !== 'storyboard') {
      return;
    }

    const eventPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    switch (elementType) {
      case 'selection:handle-side-left':
        this.interactionType = 'resize:side-left';
        break;

      case 'selection:handle-side-right':
        this.interactionType = 'resize:side-right';
        break;

      case 'layer:text':
        this.interactionType = 'move';
        break;

      default:
        if (eventInsideSelectionBounds(eventPosition)) {
          this.interactionType = 'move';
        } else {
          this.interactionType = null;
          this.actions.deselectAll();
          if (this.getState().userInteraction.isEditingText) {
            this.actions.setIsEditingTextToFalse();
          }
        }
        break;
    }

    this.previousMousePosition = eventPosition;

    this.addMouseMoveAndUpListeners();
  }

  private handleMouseMove(event: MouseEvent) {
    const {
      userInteraction: { isDragging, isEditingText },
    } = this.getState();

    if (isEditingText) {
      return;
    }

    event.preventDefault();

    if (this.interactionType === 'move' && isDragging === false) {
      this.actions.setIsDraggingToTrue();
    }

    if (this.lastUpdateCall) {
      cancelAnimationFrame(this.lastUpdateCall);
    }

    this.lastUpdateCall = requestAnimationFrame(() => {
      this.update({ x: event.clientX, y: event.clientY });
      this.lastUpdateCall = null;
    });
  }

  private handleMouseUp() {
    this.removeMouseMoveAndUpListeners();

    const {
      userInteraction: { isDragging },
    } = this.getState();

    if (isDragging) {
      this.actions.setIsDraggingToFalse();
      this.interactionType = null;
    }
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
}
