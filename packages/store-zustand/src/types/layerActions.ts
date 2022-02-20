import {
  AddNewCard,
  AddTextLayerToCard,
  DeleteSelectedCards,
  DeleteSelectedLayers,
  DeselectAll,
  OnDragSelection,
  SetCardStateToActive,
  SetCardStateToHovered,
  SetCardStateToIdle,
  SetIsDraggingToFalse,
  SetIsDraggingToTrue,
  SetLayerHeight,
  SetLayerStateToActive,
  SetLayerStateToHovered,
  SetLayerStateToIdle,
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
  setCardStateToActive: SetCardStateToActive;
  setCardStateToHovered: SetCardStateToHovered;
  setCardStateToIdle: SetCardStateToIdle;
  setIsDraggingToFalse: SetIsDraggingToFalse;
  setIsDraggingToTrue: SetIsDraggingToTrue;
  setLayerHeight: SetLayerHeight;
  setLayerStateToActive: SetLayerStateToActive;
  setLayerStateToHovered: SetLayerStateToHovered;
  setLayerStateToIdle: SetLayerStateToIdle;
  setToolToMove: SetToolToMove;
  setToolToText: SetToolToText;
  updateCardScreenPosition: UpdateCardScreenPosition;
}

export interface LayerActionsProp {
  actions: LayerActions;
}
