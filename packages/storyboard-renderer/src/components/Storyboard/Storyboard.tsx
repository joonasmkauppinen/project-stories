import styled from '@emotion/styled';
import {
  Cards,
  LayerActionsProp,
  SelectionItem,
} from '@joonasmkauppinen/store-zustand';

import { CardSection } from './CardSection/CardSection';
import { Selection } from '../Selection/Selection';
import { AddCardButton } from './AddCardButton/AddCardButton';
import { CARD_ITEM_HEIGHT, CARD_ITEM_WIDTH } from '../../constants/dimensions';

export interface StoryboardProps extends LayerActionsProp {
  cards: Cards;
  selection: SelectionItem[];
}

const StyledStoryboard = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: '#1B1D1C',
  overflow: 'auto',
});

const StyledStoryboardItemsContainerSection = styled.section({
  display: 'flex',
  flexDirection: 'row',
  width: 'max-content',
});

const INITIAL_CLIENT_WIDTH = window.innerWidth;
const INITIAL_CLIENT_HEIGHT = window.innerHeight;

const PADDING_VERTICAL = INITIAL_CLIENT_HEIGHT / 2 - CARD_ITEM_HEIGHT / 2;
const PADDING_HORIZONTAL = INITIAL_CLIENT_WIDTH / 2 - CARD_ITEM_WIDTH / 2;

export const Storyboard = ({ cards, actions, selection }: StoryboardProps) => {
  return (
    <StyledStoryboard
      style={{
        paddingTop: PADDING_VERTICAL,
        paddingBottom: PADDING_VERTICAL,
        paddingLeft: PADDING_HORIZONTAL,
        paddingRight: PADDING_HORIZONTAL,
      }}
    >
      <StyledStoryboardItemsContainerSection>
        {Object.entries(cards).map(([cardId, card]) => (
          <CardSection
            cardId={cardId}
            key={`card-section-${cardId}`}
            card={card}
            actions={actions}
          />
        ))}
        <AddCardButton onClick={() => actions.addNewCard()} />
      </StyledStoryboardItemsContainerSection>
      <Selection cards={cards} actions={actions} selection={selection} />
    </StyledStoryboard>
  );
};
