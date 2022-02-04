import styled from '@emotion/styled';
import {
  Cards,
  LayerActionsProp,
  SelectionItem,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { Toolbar } from '@joonasmkauppinen/project-stories/ui-storyboard-panels';

import {
  CARD_ITEM_WIDTH,
  DESIGN_PANEL_WIDTH,
  LAYERS_PANEL_INITIAL_WIDTH,
} from '../../constants';
import { Selection } from '../Selection/Selection';

import { CardSection } from './CardSection/CardSection';
import { AddCardButton } from './AddCardButton/AddCardButton';

export interface StoryboardProps extends LayerActionsProp {
  cards: Cards;
  selection: SelectionItem[];
}

const StyledStoryboard = styled.div({
  backgroundColor: '#1B1D1C',
  overflow: 'auto',
  gridColumnEnd: 'storyboard',
  gridColumnStart: 'storyboard',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

const StyledStoryboardItemsContainerSection = styled.section({
  display: 'flex',
  flexDirection: 'row',
});

const INITIAL_CLIENT_WIDTH = window.innerWidth;

// Padding needed to bring the first card to the middle of the screen.
const PADDING_HORIZONTAL =
  (INITIAL_CLIENT_WIDTH - LAYERS_PANEL_INITIAL_WIDTH - DESIGN_PANEL_WIDTH) / 2 -
  CARD_ITEM_WIDTH / 2;

export const Storyboard = ({ cards, actions, selection }: StoryboardProps) => {
  return (
    <StyledStoryboard>
      <Toolbar />
      <StyledStoryboardItemsContainerSection
        style={{
          paddingLeft: PADDING_HORIZONTAL,
          paddingRight: PADDING_HORIZONTAL - 175, // TODO: Calculate padding right based on last element size.
        }}
      >
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
