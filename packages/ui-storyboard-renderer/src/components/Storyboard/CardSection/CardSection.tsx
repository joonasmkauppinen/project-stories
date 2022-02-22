import { MouseEventHandler, useCallback } from 'react';
import styled from '@emotion/styled';
import {
  Card,
  ID,
  LayerActionsProp,
} from '@joonasmkauppinen/project-stories/store-zustand';

import { StoryboardDataAttributes } from '../../../types';

import { CardItem } from './CardItem/CardItem';

export interface CardItemProps extends LayerActionsProp {
  cardId: ID;
  card: Card;
  isEditingText: boolean;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginRight: 100,
  position: 'relative',
});

// TODO: Don't use magical number for the positioning.
const CardName = styled.p<StoryboardDataAttributes>({
  color: 'white',
  size: 16,
  margin: 0,
  userSelect: 'none',
  position: 'absolute',
  left: 0,
  top: -30,
});

export const CardSection = ({
  card,
  actions,
  cardId,
  isEditingText,
}: CardItemProps) => {
  const { layers, name, state } = card;

  const handleClick: MouseEventHandler = useCallback(
    (event) => {
      actions.setCardStateToActive({ cardId, isShiftKey: event.shiftKey });
    },
    [actions, cardId]
  );

  return (
    <Container key={`card-${cardId}`}>
      <CardName
        data-context-area="storyboard"
        data-element-type="card-name"
        onClick={handleClick}
      >
        {name}
      </CardName>
      <CardItem
        isEditingText={isEditingText}
        state={state}
        actions={actions}
        cardId={cardId}
        layers={layers}
      />
    </Container>
  );
};
