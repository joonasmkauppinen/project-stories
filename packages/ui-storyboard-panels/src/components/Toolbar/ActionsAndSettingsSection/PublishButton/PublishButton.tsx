import styled from '@emotion/styled';
import { t } from '@internal/i18n';
import { buttonHoverStyle } from '../../styles/buttonHoverStyle';

const StyledButton = styled.button({
  all: 'unset',
  backgroundColor: '#00735E',
  borderStyle: 'solid',
  borderColor: '#0EC8A6',
  borderWidth: 1,
  borderRadius: 3,
  height: 26,
  paddingLeft: 12,
  paddingRight: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'not-allowed',
});

const StyledButtonLabel = styled.span({
  fontSize: 10,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: '#B6FFF2',
});

export const PublishButton = () => {
  return (
    <StyledButton>
      <StyledButtonLabel>{t('buttonLabelPublish')}</StyledButtonLabel>
    </StyledButton>
  );
};
