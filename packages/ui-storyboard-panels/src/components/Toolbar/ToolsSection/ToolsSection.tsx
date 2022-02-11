import styled from '@emotion/styled';
import { t } from '@internal/i18n';

import { IconButton } from '../IconButton/IconButton';

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

export const ToolsSection = () => {
  return (
    <Container>
      <IconButton title={t('iconButtonTitleMove')} icon="move" state="active" />
      <IconButton title={t('iconButtonTitleText')} icon="text" />
      <IconButton title={t('iconButtonTitleHand')} icon="hand" />
      <Divider />
      <IconButton title={t('iconButtonTitleAddImage')} icon="add-image" />
    </Container>
  );
};
