export type ElementState = 'idle' | 'hovered' | 'active';

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
  id: string;
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

export interface CardLayer {
  animation?: {
    type: LayerAnimationType;
    delay?: number;
    duration?: number;
  };
  // resource: LayerResource;
  position: Coordinate;
  size: Size;
  state: ElementState;
  type: LayerType;
}

export interface CardLayers {
  [key: string]: CardLayer;
}

export interface Card {
  position?: Coordinate;
  autoAdvance: boolean;
  duration: number;
  layers: CardLayers;
  name: string;
  state: ElementState;
}

export interface Cards {
  [key: string]: Card;
}

export interface SelectionItem {
  position: Coordinate;
  size: Size;
  id: string;
  parentId?: string;
}

export interface AppState {
  currentActiveCard: string | null;
  cards: Cards;
  selection: SelectionItem[];
}
