import styled from '@emotion/styled';
import { LayerActionsProp, Cards } from '@joonasmkauppinen/store-utils';

import { CardSection } from '../CardSection/CardSection';

export interface StoryboardProps extends LayerActionsProp {
  cards: Cards;
}

const StyledStoryboard = styled.div({
  backgroundColor: '#1B1D1C',
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  overflow: 'scroll',
});

export const Storyboard = ({ cards, actions }: StoryboardProps) => {
  return (
    <StyledStoryboard>
      {Object.entries(cards).map(([cardId, card]) => (
        <CardSection
          cardId={cardId}
          key={`card-section-${cardId}`}
          card={card}
          actions={actions}
        />
      ))}
    </StyledStoryboard>
  );
};
