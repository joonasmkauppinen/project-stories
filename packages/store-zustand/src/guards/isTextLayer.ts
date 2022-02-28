import { Layer, TextLayerType } from '../types';

export const isTextLayer = (layer: Layer): layer is TextLayerType =>
  layer.type === 'text';
