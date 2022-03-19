import styled from '@emotion/styled';
import {
  Cards,
  SelectedLayer,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { DESIGN_PANEL_WIDTH } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';
import { LayerPropertiesSection } from './LayerPropertiesSection/LayerPropertiesSection';
import { PanelHeader } from './PanelHeader/PanelHeader';

const StyledPanelSection = styled.section({
  backgroundColor: '#292D2B',
  borderLeft: 'solid 1px #4B5350',
  gridColumnEnd: 'design-panel',
  gridColumnStart: 'design-panel',
  width: DESIGN_PANEL_WIDTH,
});

interface DesignPanelProps {
  cards: Cards;
  selectedLayers: SelectedLayer[];
}

export const DesignPanel = ({ cards, selectedLayers }: DesignPanelProps) => {
  const activeLayers = selectedLayers.map(
    ({ cardId, layerId }) => cards[cardId].layers[layerId]
  );

  return (
    <StyledPanelSection>
      <PanelHeader />
      <LayerPropertiesSection activeLayers={activeLayers} />
    </StyledPanelSection>
  );
};
