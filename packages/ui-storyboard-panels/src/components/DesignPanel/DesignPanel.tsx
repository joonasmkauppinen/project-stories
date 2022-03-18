import styled from '@emotion/styled';
import { DESIGN_PANEL_WIDTH } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';
import { PanelHeader } from './PanelHeader/PanelHeader';

const StyledPanelSection = styled.section({
  backgroundColor: '#292D2B',
  borderLeft: 'solid 1px #4B5350',
  gridColumnEnd: 'design-panel',
  gridColumnStart: 'design-panel',
  width: DESIGN_PANEL_WIDTH,
});

export const DesignPanel = () => {
  return (
    <StyledPanelSection>
      <PanelHeader />
    </StyledPanelSection>
  );
};
