import styled from '@emotion/styled';
import {
  ID,
  ImageLayerType,
} from '@joonasmkauppinen/project-stories/store-zustand';

import { StoryboardDataAttributes } from '../../../../../../types';

interface ImageLayerProps {
  layer: ImageLayerType;
  cardId: ID;
  layerId: ID;
}

const StyledImage = styled.img<StoryboardDataAttributes>({
  position: 'absolute',
  objectFit: 'cover',
});

export const ImageLayer = ({ layer, layerId, cardId }: ImageLayerProps) => {
  return (
    <StyledImage
      style={{
        top: layer.position.y,
        left: layer.position.x,
        width: layer.size.width,
        height: layer.size.height,
      }}
      src={layer.resource.src}
      data-layer-id={layerId}
      data-card-id={cardId}
      data-element-type="layer:image"
      data-context-area="storyboard"
    />
  );
};
