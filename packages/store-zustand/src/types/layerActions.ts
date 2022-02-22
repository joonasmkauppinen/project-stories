import {
  AddNewCard,
  AddTextLayerToCard,
  DeleteSelectedCards,
  DeleteSelectedLayers,
  DeselectAll,
  OnDragSelection,
  ResizeLayerFromSideLeft,
  ResizeLayerFromSideRight,
  SetCardStateToActive,
  SetCardStateToHovered,
  SetCardStateToIdle,
  SetIsDraggingToFalse,
  SetIsDraggingToTrue,
  SetIsEditingTextToFalse,
  SetIsEditingTextToTrue,
  SetLayerHeight,
  SetLayerStateToActive,
  SetLayerStateToHovered,
  SetLayerStateToIdle,
  SetTextLayerStateToActiveEditingText,
  SetTextLayerValue,
  SetToolToMove,
  SetToolToText,
  UpdateCardScreenPosition,
} from '../actions';

export interface LayerActions {
  addNewCard: AddNewCard;
  addTextLayerToCard: AddTextLayerToCard;
  deleteSelectedLayers: DeleteSelectedLayers;
  deleteSelectedCards: DeleteSelectedCards;
  deselectAll: DeselectAll;
  onDragSelection: OnDragSelection;
  resizeLayerFromSideLeft: ResizeLayerFromSideLeft;
  resizeLayerFromSideRight: ResizeLayerFromSideRight;
  setCardStateToActive: SetCardStateToActive;
  setCardStateToHovered: SetCardStateToHovered;
  setCardStateToIdle: SetCardStateToIdle;
  setIsDraggingToFalse: SetIsDraggingToFalse;
  setIsDraggingToTrue: SetIsDraggingToTrue;
  setIsEditingTextToFalse: SetIsEditingTextToFalse;
  setIsEditingTextToTrue: SetIsEditingTextToTrue;
  setLayerHeight: SetLayerHeight;
  setLayerStateToActive: SetLayerStateToActive;
  setLayerStateToHovered: SetLayerStateToHovered;
  setLayerStateToIdle: SetLayerStateToIdle;
  setTextLayerStateToActiveEditingText: SetTextLayerStateToActiveEditingText;
  setTextLayerValue: SetTextLayerValue;
  setToolToMove: SetToolToMove;
  setToolToText: SetToolToText;
  updateCardScreenPosition: UpdateCardScreenPosition;
}

export interface LayerActionsProp {
  actions: LayerActions;
}
