import styled from '@emotion/styled';
import {
  ID,
  Layer,
  LayerActionsProp,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';

interface StyledH1Props {
  hover: boolean;
}
const StyledH1 = styled.h1<StyledH1Props>(({ hover }) => ({
  margin: 0,
  padding: 0,
  position: 'absolute',
  outline: hover ? '2px solid #00aeff' : 'none',
  cursor: 'default',
  userSelect: 'none',
}));

interface TextLayerProps extends LayerActionsProp {
  layer: Layer;
  cardId: ID;
  layerId: ID;
}
export const TextLayer = ({
  cardId,
  layerId,
  actions,
  layer,
}: TextLayerProps) => {
  const elementRef = useRef<HTMLHeadingElement>(null);

  const handleMouseEnter: MouseEventHandler = useCallback(() => {
    if (layer.state === 'idle') {
      actions.setLayerStateToHovered({ cardId, layerId });
    }
  }, [actions, cardId, layer.state, layerId]);

  const handleMouseLeave: MouseEventHandler = useCallback(() => {
    if (layer.state !== 'active') {
      actions.setLayerStateToIdle({ cardId, layerId });
    }
  }, [actions, cardId, layer.state, layerId]);

  const handleMouseDown: MouseEventHandler = useCallback(
    (event) => {
      if (layer.state === 'hovered') {
        actions.setLayerStateToActive({
          layerId,
          cardId,
          isShiftKey: event.shiftKey,
        });
      }
    },
    [actions, cardId, layer.state, layerId]
  );

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    if (layer.size.height !== elementRef.current.clientHeight) {
      actions.setLayerHeight({
        cardId,
        layerId,
        height: elementRef.current.clientHeight,
      });
    }
  });

  return (
    <StyledH1
      id={layerId}
      data-layer-id={layerId}
      data-element-type="layer"
      data-context-area="storyboard"
      style={{
        top: layer.position.y,
        left: layer.position.x,
        width: layer.size.width,
      }}
      ref={elementRef}
      hover={layer.state === 'hovered'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    >
      {layer.value}
    </StyledH1>
  );
};
