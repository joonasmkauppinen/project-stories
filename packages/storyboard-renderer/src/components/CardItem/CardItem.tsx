import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import {
  Coordinate,
  ElementState,
  ID,
  Layer,
  LayerActionsProp,
  Layers,
  Size,
} from '@joonasmkauppinen/store-zustand';

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
  width: 360,
  height: 640,
  display: 'block',
  position: 'relative',
  borderRadius: 2,
  boxShadow: setBoxShadowByState(state),
  transition: 'box-shadow 150ms cubic-bezier(0.18, 0.89, 0.32, 1.28)',
}));

interface StyledH1Props {
  hover: boolean;
  position: Coordinate;
  size: Size;
}
const StyledH1 = styled.h1<StyledH1Props>(({ hover, position, size }) => ({
  margin: 0,
  padding: 0,
  position: 'absolute',
  top: position.y,
  left: position.x,
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
  useEffect(() => {
    if (elementRef.current) {
      const { x, y } = elementRef.current.getBoundingClientRect();
      actions.updateElementScreenPosition({
        parentId: cardId,
        id: layerId,
        position: { x, y },
      });
    }
  }, []);

  return (
    <StyledH1
      ref={elementRef}
      size={layer.size}
      hover={layer.state === 'hovered'}
      onMouseEnter={() =>
        actions.setElementStateToHovered({ parentId: cardId, id: layerId })
      }
      onMouseLeave={() =>
        actions.setElementStateToIdle({ parentId: cardId, id: layerId })
      }
      onMouseDown={(event) => {
        actions.setElementStateToActive({
          id: layerId,
          parentId: cardId,
          isShiftKey: event.shiftKey,
        });
      }}
      position={layer.position}
    >
      {layer.type}
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
      const { x, y } = cardItemRef.current.getBoundingClientRect();
      actions.updateElementScreenPosition({
        id: cardId,
        position: { x, y },
      });
    }
  }, []);

  return (
    <StyledCardItem state={state} ref={cardItemRef} {...divElementAttrs}>
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
