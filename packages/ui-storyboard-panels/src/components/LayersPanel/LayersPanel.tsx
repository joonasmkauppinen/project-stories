import styled from '@emotion/styled';
import { LAYERS_PANEL_INITIAL_WIDTH } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';
import { StoryboardProps } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';

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

export const LayersPanel = ({ actions, cards }: StoryboardProps) => {
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
                    actions.setElementStateToHovered({ id: cardId });
                }}
                onMouseLeave={() => {
                  if (card.state !== 'active') {
                    actions.setElementStateToIdle({ id: cardId });
                  }
                }}
                onMouseDown={() => {
                  if (card.state === 'hovered') {
                    actions.selectCard({ cardId });
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
                        actions.setElementStateToHovered({
                          id: layerId,
                          parentId: cardId,
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      if (layer.state !== 'active') {
                        actions.setElementStateToIdle({
                          id: layerId,
                          parentId: cardId,
                        });
                      }
                    }}
                    onMouseDown={({ shiftKey }) => {
                      if (layer.state === 'hovered') {
                        actions.setElementStateToActive({
                          id: layerId,
                          parentId: cardId,
                          isShiftKey: shiftKey,
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
