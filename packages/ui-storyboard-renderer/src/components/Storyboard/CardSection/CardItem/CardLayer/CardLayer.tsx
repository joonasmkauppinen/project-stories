import {
  ID,
  Layer,
  LayerActionsProp,
  UserInteraction,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { ImageLayer } from './ImageLayer/ImageLayer';

import { TextLayer } from './TextLayer/TextLayer';

interface CardLayerProps extends LayerActionsProp {
  cardId: ID;
  layer: Layer;
  layerId: ID;
  userInteraction: UserInteraction;
}

export const CardLayer = ({
  actions,
  cardId,
  layer,
  layerId,
  userInteraction,
}: CardLayerProps) => {
  switch (layer.type) {
    case 'text':
      return (
        <TextLayer
          actions={actions}
          cardId={cardId}
          layer={layer}
          layerId={layerId}
          userInteraction={userInteraction}
        />
      );

    case 'image':
      return (
        <ImageLayer
          actions={actions}
          cardId={cardId}
          layer={layer}
          layerId={layerId}
          userInteraction={userInteraction}
        />
      );

    default:
      return null;
  }
};
