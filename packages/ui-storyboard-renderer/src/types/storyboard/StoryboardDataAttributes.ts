import { ID } from '@joonasmkauppinen/project-stories/store-zustand';

export type DataContextArea = 'storyboard';

export type DataElementType =
  | 'selection'
  | 'selection:handle-side-left'
  | 'selection:handle-side-right'
  | 'selection:handle-corner-top-left'
  | 'selection:handle-corner-top-right'
  | 'selection:handle-corner-bottom-left'
  | 'selection:handle-corner-bottom-right'
  | 'card'
  | 'card-name'
  | 'layer';

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
