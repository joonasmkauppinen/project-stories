import { ID } from './appState';

export interface GenerateLayerReturnType<LayerType> {
  layerId: ID;
  layerData: LayerType;
  idWithData: [string, LayerType];
}
