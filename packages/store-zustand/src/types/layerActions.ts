import {
  AddNewCard,
  DeselectAll,
  OnDragSelection,
  SetElementStateToActive,
  SetElementStateToHovered,
  SetElementStateToIdle,
  UpdateElementScreenPosition,
  SelectCard,
} from '../actions';

export interface LayerActions {
  addNewCard: AddNewCard;
  deselectAll: DeselectAll;
  onDragSelection: OnDragSelection;
  selectCard: SelectCard;
  setElementStateToActive: SetElementStateToActive;
  setElementStateToHovered: SetElementStateToHovered;
  setElementStateToIdle: SetElementStateToIdle;
  updateElementScreenPosition: UpdateElementScreenPosition;
}

export interface LayerActionsProp {
  actions: LayerActions;
}
