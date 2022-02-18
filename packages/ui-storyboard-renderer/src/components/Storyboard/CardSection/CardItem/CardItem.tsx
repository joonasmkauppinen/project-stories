import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import {
  CardState,
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
  state: CardState;
  cardId: ID;
}

const setBoxShadowByState = (state: CardState) => {
  if (state === 'active') {
    return 'fuchsia 0px 0px 0px 2px';
  }

  if (state === 'hovered') {
    return '#424342 0px 0px 0px 10px';
  }

  return '#424342 0px 0px 0px 0px';
};

const StyledCardItem = styled.div<{ state: CardState }>(({ state }) => ({
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
      actions.updateCardScreenPosition({
        cardId,
        position: { x, y },
      });
    }
  }, [actions, cardId]);

  return (
    <StyledCardItem
      id={cardId}
      data-card-id={cardId}
      data-element-type="card"
      data-context-area="storyboard"
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
