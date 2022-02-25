export type BaseElementState = 'idle' | 'hovered' | 'active';

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

export type VideoMimeType = 'video/mp4';

export type AudioMimeType = 'audio/mpeg';

export type TextMimeType = 'text/plain';

export type ImageMimeType =
  | 'image/gif'
  | 'image/jpeg'
  | 'image/png'
  | 'image/svg+xml';

export type LayerType = 'text' | 'image' | 'video' | 'audio' | 'svg';

export interface Coordinate {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ImageResource {
  alt: string;
  id: ID;
  mimeType: ImageMimeType;
  size: Size;
  src: string;
  type: 'image';
  // TODO: Add property 'sizes'? Can be used to add 'srcset' attribute to the generated amp-story
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
  metaState: LayerMetaState;
  name: string;
  // type: LayerType;
}

export type TextLayerState = BaseElementState | 'active:editing-text';

export interface TextLayerType extends BaseLayer {
  type: 'text';
  value: string;
  state: TextLayerState;
}

export type ImageLayerState = BaseElementState | 'active:cropping';

export interface ImageLayerType extends BaseLayer {
  type: 'image';
  resource: ImageResource;
  state: ImageLayerState;
}

export type Layer = TextLayerType | ImageLayerType;

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
  state: BaseElementState;
}

export interface Cards {
  [key: string]: Card;
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
