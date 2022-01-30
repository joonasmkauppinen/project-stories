import styled from '@emotion/styled';
import {
  Cards,
  LayerActionsProp,
  SelectionItem,
} from '@joonasmkauppinen/store-zustand';

import { CardSection } from '../CardSection/CardSection';
import { Selection } from '../Selection/Selection';

export interface StoryboardProps extends LayerActionsProp {
  cards: Cards;
  selection: SelectionItem[];
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

export const Storyboard = ({ cards, actions, selection }: StoryboardProps) => {
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
      <Selection cards={cards} actions={actions} selection={selection} />
    </StyledStoryboard>
  );
};
