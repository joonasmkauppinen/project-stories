import styled from '@emotion/styled';

import { t } from '../../../../../i18n/src/utils/translations';

import { PlusIcon } from './PlusIcon';

const StyledButton = styled.button({
  all: 'unset',
  alignSelf: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 75,
  height: 100,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#4A4D4A',
  borderRadius: 3,
  cursor: 'pointer',
  minWidth: 75,
  ':hover': {
    backgroundColor: '#4A4D4A',
    transition: 'background-color 100ms',
  },
});

const StyledContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledButtonLabel = styled.p({
  all: 'unset',
  fontSize: 9,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: 'white',
  marginTop: 12,
  userSelect: 'none',
});

interface AddCardButtonProps {
  onClick?: () => void;
}

export const AddCardButton = ({ onClick }: AddCardButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      <StyledContainer>
        <PlusIcon />
        <StyledButtonLabel>{t('buttonLabelAddCard')}</StyledButtonLabel>
      </StyledContainer>
    </StyledButton>
  );
};
