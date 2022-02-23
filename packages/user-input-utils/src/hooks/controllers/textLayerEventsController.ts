import { LayerActions } from '@joonasmkauppinen/project-stories/store-zustand';
import { StoryboardDataValues } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';

export const textLayerEventsController = (actions: LayerActions) => {
  const handleDoubleClick = (event: MouseEvent) => {
    const eventTarget = event.target as HTMLElement;
    const { elementType, cardId, layerId } =
      eventTarget.dataset as unknown as StoryboardDataValues;

    if (elementType === 'layer:text') {
      console.log('Double click on text layer.');
      if (cardId && layerId) {
        actions.setTextLayerStateToActiveEditingText({ cardId, layerId });
      }
      actions.setIsEditingTextToTrue();
    }
  };

  console.log('Adding textLayerEventsController...');
  document.addEventListener('dblclick', handleDoubleClick);

  return () => {
    console.log('Removing textLayerEventsController...');
    document.removeEventListener('dblclick', handleDoubleClick);
  };
};
