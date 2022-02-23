import { LayerActions } from '@joonasmkauppinen/project-stories/store-zustand';
import { StoryboardDataValues } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';

export class TextLayerEventsController {
  private actions: LayerActions;

  constructor(actions: LayerActions) {
    this.actions = actions;

    this.handleDoubleClick = this.handleDoubleClick.bind(this);

    this.addDoubleClickListener();
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
}
