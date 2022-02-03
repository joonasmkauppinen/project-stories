import styled from '@emotion/styled';

import { StoryboardProps } from '../Storyboard/Storyboard';
import { LayerIcon } from './LayerIcon/LayerIcon';

import { StyledLayerItemLi } from './LayerItem/LayerItem';
import { PanelHeader } from './PanelHeader/PanelHeader';

// TODO: Get style values from theme
const StyledPanelSection = styled.section({
  gridColumnStart: 'layers-panel',
  gridColumnEnd: 'layers-panel',
  backgroundColor: '#2F3331',
  borderRight: 'solid 1px #4B5350',
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
                state={card.state}
                key={`layers-panel-card-item-${cardId}`}
                onMouseEnter={() =>
                  actions.setElementStateToHovered({ id: cardId })
                }
                onMouseLeave={() =>
                  actions.setElementStateToIdle({ id: cardId })
                }
                onMouseDown={() =>
                  actions.setElementStateToActive({ id: cardId })
                }
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
                    state={layer.state}
                    key={`layers-panel-item-${layerId}`}
                    onMouseEnter={() =>
                      actions.setElementStateToHovered({
                        id: layerId,
                        parentId: cardId,
                      })
                    }
                    onMouseLeave={() =>
                      actions.setElementStateToIdle({
                        id: layerId,
                        parentId: cardId,
                      })
                    }
                    onMouseDown={({ shiftKey }) => {
                      actions.setElementStateToActive({
                        id: layerId,
                        parentId: cardId,
                        isShiftKey: shiftKey,
                      });
                    }}
                    indentLevel={1}
                  >
                    <LayerIcon name={layer.type} />
                    {layer.name}
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
