import {
  AppState,
  LayerActions,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { GetState } from 'zustand';

export class UserInputManagerService {
  private isMouseDown = false;
  private isDragging = false;
  private lastUpdateCall: number | null = null;
  private previousMousePosition = { x: NaN, y: NaN };
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

    switch (event.code) {
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
    const movement = {
      movementX: clientPosition.x - this.previousMousePosition.x,
      movementY: clientPosition.y - this.previousMousePosition.y,
    };

    this.actions.onDragSelection(movement);

    this.previousMousePosition = clientPosition;
  }

  private handleMouseMove(event: MouseEvent) {
    if (this.isDragging === false) {
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

    this.isMouseDown = true;

    if ((event.target as HTMLElement).dataset['contextArea'] !== 'storyboard') {
      console.log('Clicked outside of storyboard context.');
      return;
    }

    if (
      (event.target as HTMLElement).dataset['elementType'] === 'layer' ||
      (event.target as HTMLElement).dataset['elementType'] === 'selection'
    ) {
      console.log('Clicked on layer or selection.');
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

    if (this.isDragging === true) {
      this.isDragging = false;
      this.actions.setIsDraggingToFalse();
    }

    this.removeEventListeners();
  }
}
