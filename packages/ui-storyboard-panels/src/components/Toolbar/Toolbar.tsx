import styled from '@emotion/styled';
import {
  LayerActions,
  StoryboardTool,
} from '@joonasmkauppinen/project-stories/store-zustand';
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

interface ToolbarProps {
  actions: LayerActions;
  currentTool: StoryboardTool;
}

export const Toolbar = ({ actions, currentTool }: ToolbarProps) => {
  return (
    <StyledToolbar>
      <ToolsSection actions={actions} currentTool={currentTool} />
      <ProjectStateAndName />
      <ActionsAndSettingsSection />
    </StyledToolbar>
  );
};
