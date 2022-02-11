import { LayerActions } from '@joonasmkauppinen/project-stories/store-zustand';

export class UserInputManagerService {
  private isMouseDown = false;
  private isDragging = false;
  private lastUpdateCall: number | null = null;
  private previousMousePosition = { x: NaN, y: NaN };
  private actions: LayerActions;

  constructor(actions: LayerActions) {
    this.actions = actions;
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.update = this.update.bind(this);

    this.addMouseDownListener();
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
      return;
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

    if ((event.target as HTMLElement).id.includes('panel')) {
      return;
    }

    if (
      (event.target as HTMLElement).id.includes('layer') ||
      (event.target as HTMLElement).id === 'current-selection'
    ) {
      this.isDragging = true;
      this.previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      return;
    }

    if ((event.target as HTMLElement).id === 'current-selection') {
      return;
    }

    if ((event.target as HTMLElement).id.includes('card-name')) {
      return;
    }

    // Didn't hit any relevant target, deselect all.
    this.actions.deselectAll();
  }

  private handleMouseUp() {
    this.isMouseDown = false;

    if (this.isDragging === true) {
      this.isDragging = false;
    }

    this.removeEventListeners();
  }
}
