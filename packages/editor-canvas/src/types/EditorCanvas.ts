export type EntityState = 'idle' | 'hovered' | 'active';

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

export interface LayerCoordinate {
  x: number;
  y: number;
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
  id: string;
  // position: LayerCoordinate;
  // resource: LayerResource;
  // state: EntityState;
  type: LayerType;
}

export interface Card {
  autoAdvance: boolean;
  duration: number;
  id: string;
  layers: CardLayer[];
  name: string;
  state: EntityState;
}

export type OnHoverCallback = (props: {
  parentId?: string;
  id: string;
}) => void;
