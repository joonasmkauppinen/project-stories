import { Coordinate } from '../appState/appState';

export type ID = string;

export interface SelectionDragPayload {
  movementX: number;
  movementY: number;
}

export interface ElementActionPayload {
  id: string;
  parentId?: string;
}

export interface ElementScreenPositionPayload extends ElementActionPayload {
  position: Coordinate;
}

export interface ElementStateToActivePayload extends ElementActionPayload {
  isShiftKey?: boolean;
}

export type OnDragSelection = (payload: SelectionDragPayload) => void;

export type SetElementStateToActive = (
  payload: ElementStateToActivePayload
) => void;

export type SetElementStateToHovered = (payload: ElementActionPayload) => void;

export type SetElementStateToIdle = (payload: ElementActionPayload) => void;

export type UpdateElementScreenPosition = (
  payload: ElementScreenPositionPayload
) => void;

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
