import styled from '@emotion/styled';
import { t } from '@internal/i18n';
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
      <IconButton
        title={t('iconButtonTitlePublishHistory')}
        icon="history"
        size="small"
        disabled
      />
      <Divider />
      <IconButton
        title={t('iconButtonTitleSettings')}
        icon="settings"
        size="small"
        disabled
      />
    </Container>
  );
};
