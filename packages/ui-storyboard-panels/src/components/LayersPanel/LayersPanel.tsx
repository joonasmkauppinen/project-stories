import styled from '@emotion/styled';
import {
  Cards,
  LayerActionsProp,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { LAYERS_PANEL_INITIAL_WIDTH } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';

import { LayerIcon } from './LayerIcon/LayerIcon';
import { StyledLayerItemLi } from './LayerItem/LayerItem';
import { PanelHeader } from './PanelHeader/PanelHeader';

// TODO: Get style values from theme
const StyledPanelSection = styled.section({
  backgroundColor: '#2F3331',
  borderRight: 'solid 1px #4B5350',
  gridColumnEnd: 'layers-panel',
  gridColumnStart: 'layers-panel',
  width: LAYERS_PANEL_INITIAL_WIDTH,
});

const StyledUnorderedList = styled.ul({
  all: 'unset',
});

const Spacer = styled.div({
  height: 8,
  backgroundColor: '#1c1d1c',
});

const ListItemsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'scroll',
});

interface LayersPanelProps extends LayerActionsProp {
  cards: Cards;
}

export const LayersPanel = ({ actions, cards }: LayersPanelProps) => {
  return (
    <StyledPanelSection>
      <PanelHeader />
      <ListItemsContainer>
        <StyledUnorderedList>
          {Object.entries(cards).map(([cardId, card]) => (
            <>
              <Spacer />
              <StyledLayerItemLi
                id={`panel-card-item-${cardId}`}
                state={card.state}
                key={`panel-card-item-${cardId}`}
                onMouseEnter={() => {
                  if (card.state === 'idle')
                    actions.setCardStateToHovered({ cardId });
                }}
                onMouseLeave={() => {
                  if (card.state !== 'active') {
                    actions.setCardStateToIdle({ cardId });
                  }
                }}
                onMouseDown={(event) => {
                  if (card.state === 'hovered') {
                    actions.setCardStateToActive({
                      cardId,
                      isShiftKey: event.shiftKey,
                    });
                  }
                }}
                indentLevel={0}
              >
                <LayerIcon name="card" />
                {card.name}
              </StyledLayerItemLi>
              <StyledUnorderedList
                key={`layers-panel-card-item-${cardId}-layers`}
              >
                {Object.entries(card.layers).map(([layerId, layer]) => (
                  <StyledLayerItemLi
                    id={`panel-item-${layerId}`}
                    state={layer.state}
                    key={`panel-item-${layerId}`}
                    onMouseEnter={() => {
                      if (layer.state === 'idle') {
                        actions.setLayerStateToHovered({
                          layerId,
                          cardId,
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      if (layer.state !== 'active') {
                        actions.setLayerStateToIdle({
                          layerId,
                          cardId,
                        });
                      }
                    }}
                    onMouseDown={(event) => {
                      if (layer.state === 'hovered') {
                        actions.setLayerStateToActive({
                          layerId,
                          cardId,
                          isShiftKey: event.shiftKey,
                        });
                      }
                    }}
                    indentLevel={1}
                  >
                    <LayerIcon name={layer.type} />
                    {layer.value}
                  </StyledLayerItemLi>
                ))}
              </StyledUnorderedList>
            </>
          ))}
        </StyledUnorderedList>
      </ListItemsContainer>
    </StyledPanelSection>
  );
};
