import styled from '@emotion/styled';
import {
  ID,
  Layer,
  LayerActionsProp,
  Size,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';

interface StyledH1Props {
  hover: boolean;
  size: Size;
}
const StyledH1 = styled.h1<StyledH1Props>(({ hover, size }) => ({
  margin: 0,
  padding: 0,
  position: 'absolute',
  height: size.height,
  width: size.width,
  boxShadow: hover ? '#00aeff 0px 0px 0px 1px' : 'none',
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
      style={{ top: layer.position.y, left: layer.position.x }}
      ref={elementRef}
      size={layer.size}
      hover={layer.state === 'hovered'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    >
      {layer.value}
    </StyledH1>
  );
};
