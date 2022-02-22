export type CardState = 'idle' | 'hovered' | 'active';

export type LayerState = 'idle' | 'hovered' | 'active';

export interface LayerMetaState {
  parentCardActive: boolean;
}

export type ID = string;

export type LayerAnimationType =
  | 'drop'
  | 'fade-in'
  | 'fly-in-bottom'
  | 'fly-in-left'
  | 'fly-in-right'
  | 'fly-in-top'
  | 'pan-down'
  | 'pan-left'
  | 'pan-right'
  | 'pan-up'
  | 'pulse'
  | 'rotate-in-left'
  | 'rotate-in-right'
  | 'twirl-in'
  | 'whoosh-in-left'
  | 'whoosh-in-right'
  | 'zoom-in'
  | 'zoom-out';

export type MimeType =
  | 'audio/mpeg'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/png'
  | 'image/svg+xml'
  | 'text/plain'
  | 'video/mp4';

export type LayerType = 'text' | 'image' | 'video' | 'audio' | 'svg';

export interface Coordinate {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface LayerResource {
  alt: string;
  height: number;
  id: ID;
  mimeType: MimeType;
  src: string;
  type: LayerType;
  width: number;
}

export interface BaseLayer {
  animation?: {
    type: LayerAnimationType;
    delay?: number;
    duration?: number;
  };
  sortOrderIndex: number;
  position: Coordinate;
  screenPosition: Coordinate;
  size: Size;
  state: LayerState;
  metaState: LayerMetaState;
  name: string;
  type?: LayerType;
}

export interface TextLayer extends BaseLayer {
  type: 'text';
  value: string;
}

export type Layer = TextLayer;

export interface Layers {
  [key: string]: Layer;
}

export interface Card {
  sortOrderIndex: number;
  screenPosition: Coordinate;
  autoAdvance: boolean;
  duration: number;
  layers: Layers;
  name: string;
  state: CardState;
}

export interface Cards {
  [key: string]: Card;
}

// TODO: refactor to SelectedLayers and SelectedCards
export interface SelectionItem {
  id: ID;
  parentId?: ID;
}

export interface SelectedLayer {
  cardId: ID;
  layerId: ID;
}

export interface SelectedCard {
  cardId: ID;
}

export type StoryboardTool = 'move' | 'text' | 'hand';

export interface UserInteraction {
  isDragging: boolean;
  isEditingText: boolean;
}

export interface AppState {
  cards: Cards;
  currentTool: StoryboardTool;
  selectedLayers: SelectedLayer[];
  selectedCards: SelectedCard[];
  userInteraction: UserInteraction;
}
