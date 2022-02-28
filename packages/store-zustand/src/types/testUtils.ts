import { ImageLayerType, TextLayerType } from '.';
import { Card } from './appState';

export type TestCardId =
  | 'test_card_id_0'
  | 'test_card_id_1'
  | 'test_card_id_2'
  | 'test_card_id_3';

export interface TestCardOverrides {
  id?: TestCardId;
  properties?: Partial<Omit<Card, 'sortOrderIndex'>>;
}

export type TestLayerId =
  | 'test_layer_id_0'
  | 'test_layer_id_1'
  | 'test_layer_id_2'
  | 'test_layer_id_3';

export interface TestTextLayerOverrides {
  id?: TestLayerId;
  properties?: Partial<Omit<TextLayerType, 'sortOrderIndex'>>;
}

export interface TestImageLayerOverrides {
  id?: TestLayerId;
  properties?: Partial<Omit<ImageLayerType, 'sortOrderIndex'>>;
}
