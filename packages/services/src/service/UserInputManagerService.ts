import {
  AppState,
  LayerActions,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { StoryboardDataValues } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';
import { GetState } from 'zustand';

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
  private isMouseDown = false;
  private isDragging = false;
  private lastUpdateCall: number | null = null;
  private previousMousePosition = { x: NaN, y: NaN };
  private interactionType: InteractionType = null;
  private actions: LayerActions;
  private getState: () => AppState;

  constructor(actions: LayerActions, getState: GetState<AppState>) {
    this.actions = actions;
    this.getState = getState;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.update = this.update.bind(this);

    this.addMouseDownListener();
    this.addKeyDownListener();
  }

  private addKeyDownListener() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.repeat) {
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

  private addMouseDownListener() {
    document.addEventListener('mousedown', this.handleMouseDown);
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
      elementType === 'layer' ||
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
          value: 'I was added by a mouse click!',
        });
        return;
      }
    }

    console.log('Deselecting all...');
    // Didn't hit any relevant target, deselect all.
    this.actions.deselectAll();
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
