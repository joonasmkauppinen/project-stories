export type ElementState = 'idle' | 'hovered' | 'active';

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

// export interface TextResource {
//   id: string;
//   value: string;
//   mimeType: 'text/plain';
// }

// export interface VideoResource {
//   id:
// }

export interface Layer {
  sortOrderIndex: number;
  animation?: {
    type: LayerAnimationType;
    delay?: number;
    duration?: number;
  };
  // resource: LayerResource;
  position: Coordinate;
  screenPosition?: Coordinate;
  size: Size;
  state: ElementState;
  type: LayerType;
  name: string;
}

export interface Layers {
  [key: string]: Layer;
}

export interface Card {
  sortOrderIndex: number;
  screenPosition?: Coordinate;
  autoAdvance: boolean;
  duration: number;
  layers: Layers;
  name: string;
  state: ElementState;
}

export interface Cards {
  [key: string]: Card;
}

export interface SelectionItem {
  id: ID;
  parentId?: ID;
}

export interface AppState {
  activeCards: string[];
  hoveredCard: string;
  cards: Cards;
  selection: SelectionItem[];
}
