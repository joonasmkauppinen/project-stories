export type LayerID = string;

export type CardID = string;

export interface LayerActionPayload {
  cardId: CardID;
  layerId: LayerID;
}

export interface CardActionPayload {
  cardId: CardID;
}

export interface CardPositionPayload {
  cardId: CardID;
  x: string;
  y: string;
}

export type OnMouseEnterCard = (payload: CardActionPayload) => void;

export type OnMouseLeaveCard = (payload: CardActionPayload) => void;

export type OnMouseEnterLayer = (payload: LayerActionPayload) => void;

export type OnMouseLeaveLayer = (payload: LayerActionPayload) => void;

export type OnAddSelection = (payload: LayerActionPayload) => void;

export type SetCurrentActiveCard = (payload: CardActionPayload) => void;

export type SetCardStateToActive = (payload: CardActionPayload) => void;

export type SetCardStateToHovered = (payload: CardActionPayload) => void;

export type SetCardStateToIdle = (payload: CardActionPayload) => void;

export interface LayerActions {
  onAddSelection: OnAddSelection;
  onMouseEnterCard: OnMouseLeaveCard;
  onMouseEnterLayer: OnMouseEnterLayer;
  onMouseLeaveCard: OnMouseLeaveCard;
  onMouseLeaveLayer: OnMouseLeaveLayer;
  setCurrentActiveCard: SetCurrentActiveCard;
  setCardStateToActive: SetCardStateToActive;
  setCardStateToHovered: SetCardStateToHovered;
  setCardStateToIdle: SetCardStateToIdle;
}

export interface LayerActionsProp {
  actions: LayerActions;
}
