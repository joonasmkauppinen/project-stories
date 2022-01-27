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
}
const StyledH1 = styled.h1<StyledH1Props>(({ hover, position }) => ({
  position: 'absolute',
  top: position.y,
  left: position.x,
  boxShadow: hover ? 'lightblue 0px 0px 0px 2px' : 'none',
  cursor: 'default',
  userSelect: 'none',
}));

interface TextLayerProps extends LayerActionsProp, LayerActionPayload {
  layer: CardLayer;
}
const TextLayer = ({ cardId, layerId, actions, layer }: TextLayerProps) => {
  return (
    <StyledH1
      hover={layer.state === 'hovered'}
      onMouseEnter={() => actions.onMouseEnterLayer({ cardId, layerId })}
      onMouseLeave={() => actions.onMouseLeaveLayer({ cardId, layerId })}
      onClick={() => actions.onAddSelection({ cardId, layerId })}
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
