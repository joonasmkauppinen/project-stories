import styled from '@emotion/styled';
import {
  Card,
  ID,
  LayerActionsProp,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { useCallback } from 'react';

import { CardItem } from './CardItem/CardItem';

export interface CardItemProps extends LayerActionsProp {
  cardId: ID;
  card: Card;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginRight: 100,
  position: 'relative',
});

// TODO: Don't use magical number for the positioning.
const CardName = styled.p({
  color: 'white',
  size: 16,
  margin: 0,
  userSelect: 'none',
  position: 'absolute',
  left: 0,
  top: -30,
});

export const CardSection = ({ card, actions, cardId }: CardItemProps) => {
  const { layers, name, state } = card;

  const handleClick = useCallback(() => {
    if (card.state !== 'active') {
      actions.selectCard({ cardId });
    }
  }, [actions, card.state, cardId]);

  return (
    <Container key={`card-${cardId}`}>
      <CardName id={`card-name-${cardId}`} onClick={handleClick}>
        {name}
      </CardName>
      <CardItem
        state={state}
        actions={actions}
        cardId={cardId}
        layers={layers}
      />
    </Container>
  );
};
