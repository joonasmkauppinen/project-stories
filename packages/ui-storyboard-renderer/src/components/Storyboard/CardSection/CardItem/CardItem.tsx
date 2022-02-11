import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import {
  ElementState,
  ID,
  Layer,
  LayerActionsProp,
  Layers,
  Size,
} from '@joonasmkauppinen/project-stories/store-zustand';

import {
  CARD_ITEM_HEIGHT,
  CARD_ITEM_WIDTH,
} from '../../../../constants/dimensions';

export interface CardItemProps
  extends LayerActionsProp,
    React.HTMLAttributes<HTMLDivElement> {
  layers: Layers;
  state: ElementState;
  cardId: ID;
}

const setBoxShadowByState = (state: ElementState) => {
  if (state === 'active') {
    return 'fuchsia 0px 0px 0px 2px';
  }

  if (state === 'hovered') {
    return '#424342 0px 0px 0px 10px';
  }

  return '#424342 0px 0px 0px 0px';
};

const StyledCardItem = styled.div<{ state: ElementState }>(({ state }) => ({
  backgroundColor: 'white',
  width: CARD_ITEM_WIDTH,
  height: CARD_ITEM_HEIGHT,
  display: 'block',
  position: 'relative',
  borderRadius: 2,
  boxShadow: setBoxShadowByState(state),
  transition: 'box-shadow 150ms cubic-bezier(0.18, 0.89, 0.32, 1.28)',
}));

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
const TextLayer = ({ cardId, layerId, actions, layer }: TextLayerProps) => {
  const elementRef = useRef<HTMLHeadingElement>(null);

  const handleMouseEnter: MouseEventHandler = useCallback(() => {
    if (layer.state === 'idle') {
      actions.setElementStateToHovered({ parentId: cardId, id: layerId });
    }
  }, [actions, cardId, layer.state, layerId]);

  const handleMouseLeave: MouseEventHandler = useCallback(() => {
    if (layer.state !== 'active') {
      actions.setElementStateToIdle({ parentId: cardId, id: layerId });
    }
  }, [actions, cardId, layer.state, layerId]);

  const handleMouseDown: MouseEventHandler = useCallback(
    (event) => {
      if (layer.state === 'hovered') {
        actions.setElementStateToActive({
          id: layerId,
          parentId: cardId,
          isShiftKey: event.shiftKey,
        });
      }
    },
    [actions, cardId, layer.state, layerId]
  );

  useEffect(() => {
    if (elementRef.current) {
      const x = elementRef.current.offsetLeft;
      const y = elementRef.current.offsetTop;
      actions.updateElementScreenPosition({
        parentId: cardId,
        id: layerId,
        position: { x, y },
      });
    }
  }, [actions, cardId, layerId]);

  return (
    <StyledH1
      id={`layer-${layerId}`}
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

export const CardItem = ({
  layers,
  cardId,
  actions,
  state,
  ...divElementAttrs
}: CardItemProps) => {
  const cardItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardItemRef.current) {
      const containerX = cardItemRef.current.parentElement?.offsetLeft;
      const containerY = cardItemRef.current.parentElement?.offsetTop;
      const x = (containerX as number) + cardItemRef.current.offsetLeft;
      const y = (containerY as number) + cardItemRef.current.offsetTop;
      actions.updateElementScreenPosition({
        id: cardId,
        position: { x, y },
      });
    }
  }, [actions, cardId]);

  return (
    <StyledCardItem
      id={`card-${cardId}`}
      state={state}
      ref={cardItemRef}
      {...divElementAttrs}
    >
      {Object.entries(layers).map(([layerId, layer]) => (
        <TextLayer
          cardId={cardId}
          actions={actions}
          key={`layer-${layerId}`}
          layer={layer}
          layerId={layerId}
        />
      ))}
    </StyledCardItem>
  );
};
