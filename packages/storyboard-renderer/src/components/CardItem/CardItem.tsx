import { ReactElement, useRef } from 'react';
import styled from '@emotion/styled';
import {
  LayerActionsProp,
  CardActionPayload,
  LayerActionPayload,
  CardLayer,
  CardLayers,
  Coordinate,
  ElementState,
  Size,
} from '@joonasmkauppinen/store-utils';

export interface CardItemProps
  extends LayerActionsProp,
    CardActionPayload,
    React.HTMLAttributes<HTMLDivElement> {
  layers: CardLayers;
  state: ElementState;
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
  position: 'absolute',
  top: position.y,
  left: position.x,
  height: size.height,
  width: size.width,
  boxShadow: hover ? '#00aeff 0px 0px 0px 1px' : 'none',
  cursor: 'default',
  userSelect: 'none',
}));

interface TextLayerProps extends LayerActionsProp, LayerActionPayload {
  layer: CardLayer;
}
const TextLayer = ({ cardId, layerId, actions, layer }: TextLayerProps) => {
  return (
    <StyledH1
      size={layer.size}
      hover={layer.state === 'hovered'}
      onMouseEnter={() => actions.onMouseEnterLayer({ cardId, layerId })}
      onMouseLeave={() => actions.onMouseLeaveLayer({ cardId, layerId })}
      onMouseDown={(event) => {
        const { x, y } = event.currentTarget.getBoundingClientRect();
        actions.onAddSelection({
          selectionItem: {
            id: layerId,
            parentId: cardId,
            position: { x, y },
            size: layer.size,
          },
          shiftKey: event.shiftKey,
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
