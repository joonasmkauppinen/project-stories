import styled from '@emotion/styled';
import { Card, ID, LayerActionsProp } from '@joonasmkauppinen/store-zustand';

import { CardItem } from './CardItem/CardItem';

export interface CardItemProps extends LayerActionsProp {
  cardId: ID;
  card: Card;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 100,
  marginRight: 100,
});

const CardName = styled.p({
  color: 'white',
  size: 16,
  userSelect: 'none',
});

export const CardSection = ({ card, actions, cardId }: CardItemProps) => {
  const { layers, name, state } = card;

  return (
    <Container key={`card-${cardId}`}>
      <CardName>{name}</CardName>
      <CardItem
        onMouseEnter={() => actions.setElementStateToHovered({ id: cardId })}
        onMouseLeave={() => actions.setElementStateToIdle({ id: cardId })}
        onMouseDown={() => actions.setElementStateToActive({ id: cardId })}
        state={state}
        actions={actions}
        cardId={cardId}
        layers={layers}
      />
    </Container>
  );
};
