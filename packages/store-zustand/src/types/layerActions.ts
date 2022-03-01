import {
  AddNewCard,
  AddTextLayerToCard,
  AddNewImageLayerViaFileInput,
  AddNewImageLayerViaDragAndDrop,
  DeleteSelectedCards,
  DeleteSelectedLayers,
  DeselectAll,
  OnDragSelection,
  ResizeSelectionFromCornerTopLeft,
  ResizeSelectionFromCornerTopRight,
  ResizeSelectionFromCornerBottomRight,
  ResizeSelectionFromCornerBottomLeft,
  ResizeSelectionFromSideBottom,
  ResizeSelectionFromSideTop,
  ResizeSelectionFromSideLeft,
  ResizeSelectionFromSideRight,
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
  addNewImageLayerViaFileInput: AddNewImageLayerViaFileInput;
  addNewImageLayerViaDragAndDrop: AddNewImageLayerViaDragAndDrop;
  deleteSelectedLayers: DeleteSelectedLayers;
  deleteSelectedCards: DeleteSelectedCards;
  deselectAll: DeselectAll;
  onDragSelection: OnDragSelection;
  resizeSelectionFromCornerTopLeft: ResizeSelectionFromCornerTopLeft;
  resizeSelectionFromCornerTopRight: ResizeSelectionFromCornerTopRight;
  resizeSelectionFromCornerBottomLeft: ResizeSelectionFromCornerBottomLeft;
  resizeSelectionFromCornerBottomRight: ResizeSelectionFromCornerBottomRight;
  resizeSelectionFromSideTop: ResizeSelectionFromSideTop;
  resizeSelectionFromSideBottom: ResizeSelectionFromSideBottom;
  resizeSelectionFromSideLeft: ResizeSelectionFromSideLeft;
  resizeSelectionFromSideRight: ResizeSelectionFromSideRight;
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
