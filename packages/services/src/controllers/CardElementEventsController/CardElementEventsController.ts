import { GetState } from 'zustand';
import {
  AppState,
  LayerActions,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { StoryboardDataValues } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';

export class CardElementEventsController {
  private actions: LayerActions;
  private getState: () => AppState;

  constructor(actions: LayerActions, getState: GetState<AppState>) {
    this.actions = actions;
    this.getState = getState;

    this.handleMouseDown = this.handleMouseDown.bind(this);

    this.addMouseDownListener();
  }

  private addMouseDownListener() {
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  private handleMouseDown(event: MouseEvent) {
    const eventTarget = event.target as HTMLElement;
    const { elementType, cardId } =
      eventTarget.dataset as unknown as StoryboardDataValues;

    if (elementType === 'card') {
      if (this.getState().currentTool === 'text' && cardId) {
        this.actions.addTextLayerToCard({
          cardId,
          top: event.offsetY,
        });
      }
    }
  }
}
