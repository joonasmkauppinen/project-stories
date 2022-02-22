import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import {
  BaseElementState,
  ID,
  LayerActionsProp,
  Layers,
} from '@joonasmkauppinen/project-stories/store-zustand';

import {
  CARD_ITEM_HEIGHT,
  CARD_ITEM_WIDTH,
} from '../../../../constants/dimensions';
import { CardLayer } from './CardLayer/CardLayer';

export interface CardItemProps
  extends LayerActionsProp,
    React.HTMLAttributes<HTMLDivElement> {
  layers: Layers;
  state: BaseElementState;
  cardId: ID;
  isEditingText: boolean;
}

const setBoxShadowByState = (state: BaseElementState) => {
  if (state === 'active') {
    return 'fuchsia 0px 0px 0px 2px';
  }

  if (state === 'hovered') {
    return '#424342 0px 0px 0px 10px';
  }

  return '#424342 0px 0px 0px 0px';
};

const StyledCardItem = styled.div<{ state: BaseElementState }>(({ state }) => ({
  backgroundColor: 'white',
  width: CARD_ITEM_WIDTH,
  height: CARD_ITEM_HEIGHT,
  display: 'block',
  position: 'relative',
  borderRadius: 2,
  boxShadow: setBoxShadowByState(state),
  transition: 'box-shadow 150ms cubic-bezier(0.18, 0.89, 0.32, 1.28)',
}));

export const CardItem = ({
  layers,
  cardId,
  actions,
  state,
  isEditingText,
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
        <CardLayer
          isEditingText={isEditingText}
          actions={actions}
          cardId={cardId}
          key={`layer-${layerId}`}
          layer={layer}
          layerId={layerId}
        />
      ))}
    </StyledCardItem>
  );
};
