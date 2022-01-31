import {
  OnDragSelection,
  SetElementStateToActive,
  SetElementStateToHovered,
  SetElementStateToIdle,
  UpdateElementScreenPosition,
  AddNewCard,
} from '../actions';

export interface LayerActions {
  addNewCard: AddNewCard;
  onDragSelection: OnDragSelection;
  setElementStateToActive: SetElementStateToActive;
  setElementStateToHovered: SetElementStateToHovered;
  setElementStateToIdle: SetElementStateToIdle;
  updateElementScreenPosition: UpdateElementScreenPosition;
}

export interface LayerActionsProp {
  actions: LayerActions;
}
