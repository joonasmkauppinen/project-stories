import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  actions,
  ID,
  ImageLayerType,
  LayerActions,
  UserInteraction,
} from '@joonasmkauppinen/project-stories/store-zustand';

import { StoryboardDataAttributes } from '../../../../../../types';
import { MouseEventHandler, useCallback } from 'react';

interface ImageLayerProps {
  layer: ImageLayerType;
  cardId: ID;
  layerId: ID;
  actions: LayerActions;
  userInteraction: UserInteraction;
}

const StyledImage = styled.img<StoryboardDataAttributes>({
  position: 'absolute',
  objectFit: 'cover',
});

const hoverStyle = css({
  outline: '2px solid #00aeff',
});

export const ImageLayer = ({
  layer,
  layerId,
  cardId,
  userInteraction,
}: ImageLayerProps) => {
  const handleMouseEnter: MouseEventHandler = useCallback(() => {
    if (userInteraction.isDragging || userInteraction.isEditingText) {
      return;
    }

    if (layer.state === 'idle') {
      actions.setLayerStateToHovered({ cardId, layerId });
    }
  }, [
    cardId,
    layer.state,
    layerId,
    userInteraction.isDragging,
    userInteraction.isEditingText,
  ]);

  const handleMouseLeave: MouseEventHandler = useCallback(() => {
    if (layer.state === 'hovered') {
      actions.setLayerStateToIdle({ cardId, layerId });
    }
  }, [cardId, layer.state, layerId]);

  const handleMouseOver: MouseEventHandler = useCallback(() => {
    if (userInteraction.isDragging || userInteraction.isEditingText) {
      return;
    }

    if (layer.state === 'idle') {
      actions.setLayerStateToHovered({ cardId, layerId });
    }
  }, [
    cardId,
    layer.state,
    layerId,
    userInteraction.isDragging,
    userInteraction.isEditingText,
  ]);

  const handleMouseDown: MouseEventHandler = useCallback(
    (event) => {
      if (layer.state === 'hovered') {
        actions.setLayerStateToActive({
          cardId,
          layerId,
          isShiftKey: event.shiftKey,
        });
      }
    },
    [cardId, layer.state, layerId]
  );

  return (
    <StyledImage
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      css={[layer.state === 'hovered' && hoverStyle]}
      style={{
        top: layer.position.y,
        left: layer.position.x,
        width: layer.size.width,
        height: layer.size.height,
      }}
      draggable={false}
      src={layer.resource.src}
      data-layer-id={layerId}
      data-card-id={cardId}
      data-element-type="layer:image"
      data-context-area="storyboard"
    />
  );
};
