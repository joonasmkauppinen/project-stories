import {
  AppState,
  LayerActions,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { StoryboardDataValues } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';
import { eventInsideSelectionBounds } from '../../helpers/eventInsideSelectionBounds';

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

export const selectionEventsController = (
  actions: LayerActions,
  getState: () => AppState
) => {
  let previousMousePosition = { x: NaN, y: NaN };
  let interactionType: InteractionType = null;
  let lastUpdateCall: number | null = null;

  const addMouseMoveAndUpListeners = () => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const removeMouseMoveAndUpListeners = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (event: MouseEvent) => {
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
      case 'selection:handle-side-top':
        interactionType = 'resize:side-top';
        break;

      case 'selection:handle-side-bottom':
        interactionType = 'resize:side-bottom';
        break;

      case 'selection:handle-side-left':
        interactionType = 'resize:side-left';
        break;

      case 'selection:handle-side-right':
        interactionType = 'resize:side-right';
        break;

      case 'selection:handle-corner-bottom-right':
        interactionType = 'resize:corner-bottom-right';
        break;

      case 'selection:handle-corner-bottom-left':
        interactionType = 'resize:corner-bottom-left';
        break;

      case 'selection:handle-corner-top-right':
        interactionType = 'resize:corner-top-right';
        break;

      case 'selection:handle-corner-top-left':
        interactionType = 'resize:corner-top-left';
        break;

      case 'layer:text':
      case 'layer:image':
        interactionType = 'move';
        break;

      default:
        if (eventInsideSelectionBounds(eventPosition)) {
          interactionType = 'move';
        } else {
          interactionType = null;
          actions.deselectAll();
          if (getState().userInteraction.isEditingText) {
            actions.setIsEditingTextToFalse();
          }
        }
        break;
    }

    previousMousePosition = eventPosition;

    addMouseMoveAndUpListeners();
  };

  const handleMouseMove = (event: MouseEvent) => {
    const {
      userInteraction: { isDragging, isEditingText },
    } = getState();

    if (isEditingText) {
      return;
    }

    event.preventDefault();

    if (interactionType === 'move' && isDragging === false) {
      actions.setIsDraggingToTrue();
    }

    if (lastUpdateCall) {
      cancelAnimationFrame(lastUpdateCall);
    }

    lastUpdateCall = requestAnimationFrame(() => {
      update({ x: event.clientX, y: event.clientY });
      lastUpdateCall = null;
    });
  };

  const handleMouseUp = () => {
    removeMouseMoveAndUpListeners();

    const {
      userInteraction: { isDragging },
    } = getState();

    if (isDragging) {
      actions.setIsDraggingToFalse();
      interactionType = null;
    }
  };

  const update = (clientPosition: { x: number; y: number }) => {
    const movementX = clientPosition.x - previousMousePosition.x;
    const movementY = clientPosition.y - previousMousePosition.y;
    const movement = { movementX, movementY };

    switch (interactionType) {
      case 'move':
        actions.onDragSelection(movement);
        break;

      case 'resize:side-top':
        actions.resizeSelectionFromSideTop({ movementY });
        break;

      case 'resize:side-bottom':
        actions.resizeSelectionFromSideBottom({ movementY });
        break;

      case 'resize:side-right':
        actions.resizeSelectionFromSideRight({ movementX });
        break;

      case 'resize:side-left':
        actions.resizeSelectionFromSideLeft({ movementX });
        break;

      case 'resize:corner-bottom-right':
        actions.resizeSelectionFromCornerBottomRight({ movement });
        break;

      case 'resize:corner-bottom-left':
        actions.resizeSelectionFromCornerBottomLeft({ movement });
        break;

      case 'resize:corner-top-right':
        actions.resizeSelectionFromCornerTopRight({ movement });
        break;

      case 'resize:corner-top-left':
        actions.resizeSelectionFromCornerTopLeft({ movement });
        break;
    }

    previousMousePosition = clientPosition;
  };

  console.log('Adding selectionEventsController...');
  document.addEventListener('mousedown', handleMouseDown);

  return () => {
    console.log('Removing selectionEventsController...');
    document.removeEventListener('mousedown', handleMouseDown);
  };
};
