import { ID } from '@joonasmkauppinen/project-stories/store-zustand';

export type DataContextArea = 'storyboard';

export type DataElementType =
  | 'card'
  | 'card-name'
  | 'layer:text'
  | 'selection'
  | 'selection:handle-corner-bottom-left'
  | 'selection:handle-corner-bottom-right'
  | 'selection:handle-corner-top-left'
  | 'selection:handle-corner-top-right'
  | 'selection:handle-side-left'
  | 'selection:handle-side-right'
  | 'storyboard-background';

export interface StoryboardDataAttributes {
  'data-context-area': DataContextArea;
  'data-element-type': DataElementType;
  'data-card-id'?: ID;
  'data-layer-id'?: ID;
}

export interface StoryboardDataValues {
  contextArea: DataContextArea;
  elementType: DataElementType;
  cardId?: ID;
  layerId?: ID;
}
