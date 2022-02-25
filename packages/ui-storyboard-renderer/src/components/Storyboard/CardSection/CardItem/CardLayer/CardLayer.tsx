import {
  ID,
  Layer,
  LayerActionsProp,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { ImageLayer } from './ImageLayer/ImageLayer';

import { TextLayer } from './TextLayer/TextLayer';

interface CardLayerProps extends LayerActionsProp {
  cardId: ID;
  layer: Layer;
  layerId: ID;
  isEditingText: boolean;
}

export const CardLayer = ({
  actions,
  cardId,
  layer,
  layerId,
  isEditingText,
}: CardLayerProps) => {
  switch (layer.type) {
    case 'text':
      return (
        <TextLayer
          actions={actions}
          cardId={cardId}
          layer={layer}
          layerId={layerId}
          isEditingText={isEditingText}
        />
      );

    case 'image':
      return <ImageLayer cardId={cardId} layer={layer} layerId={layerId} />;

    default:
      return null;
  }
};
