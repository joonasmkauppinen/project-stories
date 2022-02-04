import styled from '@emotion/styled';
import { t } from '@internal/i18n';

import { buttonHoverStyle } from '../../styles/buttonHoverStyle';

import { IconDropdownArrow } from './IconDropdownArrow/IconDropdownArrow';

const StyledButton = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'black',
  borderColor: '#798681',
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: 3,
  height: 26,
  ...buttonHoverStyle,
});

const DefaultButton = styled.button({
  all: 'unset',
  height: 26,
  display: 'flex',
  alignItems: 'center',
  cursor: 'not-allowed',
});

const DropdownButton = styled.button({
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 26,
  height: 26,
  cursor: 'default',
  position: 'relative',
  svg: {
    transition: 'transform 300ms cubic-bezier(0.22, 0.61, 0.36, 1)',
  },
  ':hover > svg': {
    transform: 'translateY(3px)',
  },
  ':focus > svg': {
    transform: 'translateY(3px)',
  },
  ':focus > ul': {
    display: 'flex',
  },
});

const ButtonLabel = styled.span({
  color: '#ffffff',
  fontSize: 10,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginLeft: 12,
});

const PopoverMenu = styled.ul({
  all: 'unset',
  position: 'absolute',
  top: 26 + 10,
  listStyle: 'none',
  display: 'none',
  flexDirection: 'column',
  backgroundColor: '#000000',
  borderColor: '#798681',
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: 2,
  width: 'max-content',
});

const MenuItem = styled.li({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
  color: '#ffffff',
  fontSize: 12,
  paddingLeft: 12,
  paddingRight: 12,
  height: 30,
  cursor: 'not-allowed',
  ':hover': {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
});

export const PreviewButton = () => {
  return (
    <StyledButton>
      <DefaultButton>
        <ButtonLabel>{t('buttonLabelPreview')}</ButtonLabel>
      </DefaultButton>
      <DropdownButton>
        <IconDropdownArrow />
        <PopoverMenu>
          <MenuItem>{t('popoverMenuPreviewTogglePreview')}</MenuItem>
          <MenuItem>{t('popoverMenuPreviewOpenToNewWindow')}</MenuItem>
        </PopoverMenu>
      </DropdownButton>
    </StyledButton>
  );
};
