import styled from '@emotion/styled';
import { IconButton } from '../IconButton/IconButton';
import { PreviewButton } from './PreviewButton/PreviewButton';
import { PublishButton } from './PublishButton/PublishButton';

const Container = styled.section({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  marginRight: 8,
  justifySelf: 'flex-end',
});

const Divider = styled.div({
  backgroundColor: '#798681',
  width: 1,
  height: 18,
});

export const ActionsAndSettingsSection = () => {
  return (
    <Container>
      <PreviewButton />
      <PublishButton />
      <Divider />
      <IconButton icon="history" size="small" />
      <Divider />
      <IconButton icon="settings" size="small" />
    </Container>
  );
};
