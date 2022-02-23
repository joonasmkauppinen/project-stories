import {
  AppState,
  LayerActions,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { StoryboardDataValues } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';

export const cardElementEventsController = (
  actions: LayerActions,
  getState: () => AppState
) => {
  console.log('Adding cardElementEventsController...');

  const handleMouseDown = (event: MouseEvent) => {
    const eventTarget = event.target as HTMLElement;
    const { elementType, cardId } =
      eventTarget.dataset as unknown as StoryboardDataValues;

    if (elementType === 'card') {
      if (getState().currentTool === 'text' && cardId) {
        actions.addTextLayerToCard({
          cardId,
          top: event.offsetY,
        });
      }
    }
  };

  document.addEventListener('mousedown', handleMouseDown);

  return () => {
    document.removeEventListener('mousedown', handleMouseDown);
  };
};
