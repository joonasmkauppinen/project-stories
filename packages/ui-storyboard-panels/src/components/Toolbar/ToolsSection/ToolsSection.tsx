import styled from '@emotion/styled';
import { t } from '@internal/i18n';
import {
  LayerActions,
  StoryboardTool,
} from '@joonasmkauppinen/project-stories/store-zustand';

import { IconButton } from '../IconButton/IconButton';
import { AddImageButton } from './AddImageButton/AddImageButton';

const Container = styled.section({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  marginLeft: 8,
});

const Divider = styled.div({
  backgroundColor: '#798681',
  height: 26,
  width: 1,
});

interface ToolsSectionProps {
  actions: LayerActions;
  currentTool: StoryboardTool;
}

export const ToolsSection = ({ actions, currentTool }: ToolsSectionProps) => {
  return (
    <Container>
      <IconButton
        title={t('iconButtonTitleMove')}
        icon="move"
        active={currentTool === 'move'}
        onClick={() => actions.setToolToMove()}
      />
      <IconButton
        title={t('iconButtonTitleText')}
        icon="text"
        active={currentTool === 'text'}
        onClick={() => actions.setToolToText()}
      />
      <IconButton
        title={t('iconButtonTitleHand')}
        icon="hand"
        active={currentTool === 'hand'}
        disabled
      />
      <Divider />
      <AddImageButton actions={actions} />
    </Container>
  );
};
