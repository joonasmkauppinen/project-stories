import styled from '@emotion/styled';
import { ActionsAndSettingsSection } from './ActionsAndSettingsSection/ActionsAndSettingsSection';
import { ProjectStateAndName } from './ProjectStateAndName/ProjectStateAndName';

import { ToolsSection } from './ToolsSection/ToolsSection';

const StyledToolbar = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#1A1B1AB2',
  gridColumn: 'storyboard',
  height: 52,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 100,
});

export const Toolbar = () => {
  return (
    <StyledToolbar>
      <ToolsSection />
      <ProjectStateAndName />
      <ActionsAndSettingsSection />
    </StyledToolbar>
  );
};
