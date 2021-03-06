import styled from '@emotion/styled';
import {
  Cards,
  LayerActionsProp,
  ResourcePayload,
  SelectedLayer,
  UserInteraction,
} from '@joonasmkauppinen/project-stories/store-zustand';

import {
  CARD_ITEM_WIDTH,
  DESIGN_PANEL_WIDTH,
  LAYERS_PANEL_INITIAL_WIDTH,
} from '../../constants';
import { Selection } from '../Selection/Selection';

import { CardSection } from './CardSection/CardSection';
import { AddCardButton } from './AddCardButton/AddCardButton';
import { useCallback, useMemo } from 'react';
import { StoryboardDataAttributes } from '../..';
import { InfoBox } from './InfoBox/InfoBox';

export interface StoryboardProps extends LayerActionsProp {
  cards: Cards;
  selectedLayers: SelectedLayer[];
  userInteraction: UserInteraction;
  fileResourceQueue: ResourcePayload[];
}

const StyledStoryboard = styled.div<StoryboardDataAttributes>({
  alignItems: 'center',
  backgroundColor: '#1B1D1C',
  display: 'flex',
  gridColumnEnd: 'storyboard',
  gridColumnStart: 'storyboard',
  overflow: 'auto',
  position: 'relative',
});

const StyledStoryboardItemsContainerSection =
  styled.section<StoryboardDataAttributes>({
    display: 'flex',
    flexDirection: 'row',
  });

export const Storyboard = ({
  cards,
  actions,
  selectedLayers,
  userInteraction,
  fileResourceQueue,
}: StoryboardProps) => {
  // Padding needed to bring the first card to the middle of the screen.
  const PADDING_HORIZONTAL = useMemo(() => {
    const INITIAL_CLIENT_WIDTH = window.innerWidth;
    return (
      (INITIAL_CLIENT_WIDTH - LAYERS_PANEL_INITIAL_WIDTH - DESIGN_PANEL_WIDTH) /
        2 -
      CARD_ITEM_WIDTH / 2
    );
  }, []);

  const handleClick = useCallback(() => {
    actions.addNewCard();
  }, [actions]);

  return (
    <StyledStoryboard
      data-context-area="storyboard"
      data-element-type="storyboard-background"
    >
      <StyledStoryboardItemsContainerSection
        data-context-area="storyboard"
        data-element-type="storyboard-background"
        style={{
          paddingLeft: PADDING_HORIZONTAL,
          paddingRight: PADDING_HORIZONTAL - 175, // TODO: Calculate padding right based on last element size.
        }}
      >
        {Object.entries(cards).map(([cardId, card]) => (
          <CardSection
            userInteraction={userInteraction}
            cardId={cardId}
            key={`card-section-${cardId}`}
            card={card}
            actions={actions}
          />
        ))}
        <AddCardButton onClick={handleClick} />
      </StyledStoryboardItemsContainerSection>
      <Selection
        cards={cards}
        selectedLayers={selectedLayers}
        userInteraction={userInteraction}
      />
      <InfoBox fileResourceQueue={fileResourceQueue} />
    </StyledStoryboard>
  );
};
