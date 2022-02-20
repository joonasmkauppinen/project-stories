import {
  ID,
  Layer,
  LayerActionsProp,
} from '@joonasmkauppinen/project-stories/store-zustand';

import { TextLayer } from './TextLayer/TextLayer';

interface CardLayerProps extends LayerActionsProp {
  cardId: ID;
  layer: Layer;
  layerId: ID;
}

export const CardLayer = ({
  actions,
  cardId,
  layer,
  layerId,
}: CardLayerProps) => {
  switch (layer.type) {
    case 'text':
      return (
        <TextLayer
          actions={actions}
          cardId={cardId}
          layer={layer}
          layerId={layerId}
        />
      );

    default:
      return null;
  }
};
