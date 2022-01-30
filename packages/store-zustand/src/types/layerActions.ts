import {
  OnDragSelection,
  SetElementStateToActive,
  SetElementStateToHovered,
  SetElementStateToIdle,
  UpdateElementScreenPosition,
} from '../actions';

export interface LayerActions {
  onDragSelection: OnDragSelection;
  setElementStateToActive: SetElementStateToActive;
  setElementStateToHovered: SetElementStateToHovered;
  setElementStateToIdle: SetElementStateToIdle;
  updateElementScreenPosition: UpdateElementScreenPosition;
}

export interface LayerActionsProp {
  actions: LayerActions;
}
