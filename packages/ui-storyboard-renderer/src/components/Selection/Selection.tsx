import styled from '@emotion/styled';
import {
  Cards,
  SelectedLayer,
  UserInteraction,
} from '@joonasmkauppinen/project-stories/store-zustand';

import { StoryboardDataAttributes } from '../../types';
import { CornerHandles } from './CornerHandles/CornerHandles';

import { HorizontalHandles } from './HorizontalHandles/HorizontalHandles';

interface SelectionProps {
  selectedLayers: SelectedLayer[];
  cards: Cards;
  userInteraction: UserInteraction;
}

const StyledSelectionDiv = styled.div<StoryboardDataAttributes>({
  position: 'absolute',
  outline: '1px solid #004DE3',
  pointerEvents: 'none',
});

export const Selection = ({
  selectedLayers,
  cards,
  userInteraction,
}: SelectionProps) => {
  if (
    userInteraction.isDragging ||
    userInteraction.isEditingText ||
    selectedLayers.length === 0
  ) {
    return null;
  }

  const activeCard = cards[selectedLayers[0].cardId].screenPosition;

  const activeLayers = selectedLayers.map(
    ({ cardId, layerId }) => cards[cardId].layers[layerId]
  );

  const xMin = Math.min(...activeLayers.map(({ position }) => position.x));
  const yMin = Math.min(...activeLayers.map(({ position }) => position.y));

  const position = {
    x: xMin + activeCard.x,
    y: yMin + activeCard.y,
  };

  const size = {
    height:
      Math.max(
        ...activeLayers.map((layer) => layer.position.y + layer.size.height)
      ) - yMin,
    width:
      Math.max(
        ...activeLayers.map((layer) => layer.position.x + layer.size.width)
      ) - xMin,
  };

  const singleSelection =
    activeLayers.length === 1 ? activeLayers.pop() : undefined;

  return (
    <StyledSelectionDiv
      id="selection"
      data-context-area="storyboard"
      data-element-type="selection"
      style={{
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
      }}
    >
      {singleSelection &&
        (() => {
          switch (singleSelection.type) {
            case 'image':
              return <CornerHandles />;

            case 'text':
              return <HorizontalHandles size={size} />;
          }
        })()}
    </StyledSelectionDiv>
  );
};
