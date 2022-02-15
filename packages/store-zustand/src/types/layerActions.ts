import {
  AddNewCard,
  AddTextLayerToCard,
  DeselectAll,
  OnDragSelection,
  SelectCard,
  SetElementStateToActive,
  SetElementStateToHovered,
  SetElementStateToIdle,
  SetIsDraggingToFalse,
  SetIsDraggingToTrue,
  SetToolToMove,
  SetToolToText,
  UpdateElementScreenPosition,
} from '../actions';

export interface LayerActions {
  addNewCard: AddNewCard;
  addTextLayerToCard: AddTextLayerToCard;
  deselectAll: DeselectAll;
  onDragSelection: OnDragSelection;
  selectCard: SelectCard;
  setElementStateToActive: SetElementStateToActive;
  setElementStateToHovered: SetElementStateToHovered;
  setElementStateToIdle: SetElementStateToIdle;
  setIsDraggingToFalse: SetIsDraggingToFalse;
  setIsDraggingToTrue: SetIsDraggingToTrue;
  setToolToMove: SetToolToMove;
  setToolToText: SetToolToText;
  updateElementScreenPosition: UpdateElementScreenPosition;
}

export interface LayerActionsProp {
  actions: LayerActions;
}
