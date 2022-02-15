import styled, { CSSObject } from '@emotion/styled';
import { buttonHoverStyle } from '../styles/buttonHoverStyle';

import { IconAddImage } from './icons/IconAddImage';
import { IconHand } from './icons/IconHand';
import { IconHistory } from './icons/IconHistory';
import { IconMove } from './icons/IconMove';
import { IconSettings } from './icons/IconSettings';
import { IconText } from './icons/IconText';

interface IconButtonProps {
  active?: boolean;
  disabled?: boolean;
  icon: 'move' | 'text' | 'hand' | 'add-image' | 'history' | 'settings';
  onClick?: () => void;
  size?: 'small' | 'normal';
  title?: string;
}

interface StyledButtonProps {
  active: boolean;
  disabled?: boolean;
  size: 'small' | 'normal';
}

const getBackgroundColorByState = (active: boolean): CSSObject => {
  if (active) {
    return {
      backgroundColor: '#ffffff !important',
    };
  }
  return {
    backgroundColor: '#000000',
    ...buttonHoverStyle,
  };
};

const StyledButton = styled.button<StyledButtonProps>(
  ({ active, disabled, size }) => ({
    all: 'unset',
    alignItems: 'center',
    ...getBackgroundColorByState(active),
    borderColor: '#798681',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    height: size === 'small' ? 26 : 36,
    justifyContent: 'center',
    width: size === 'small' ? 26 : 36,
    cursor: disabled ? 'not-allowed' : 'default',
  })
);

export const IconButton = ({
  active = false,
  disabled = false,
  icon,
  onClick,
  size = 'normal',
  title,
}: IconButtonProps) => {
  const iconFill = active ? 'black' : 'white';

  return (
    <StyledButton
      title={title}
      active={active}
      onClick={onClick}
      size={size}
      disabled={disabled}
    >
      {(() => {
        switch (icon) {
          case 'add-image':
            return <IconAddImage fill={iconFill} />;
          case 'hand':
            return <IconHand fill={iconFill} />;
          case 'move':
            return <IconMove fill={iconFill} />;
          case 'text':
            return <IconText fill={iconFill} />;
          case 'history':
            return <IconHistory />;
          case 'settings':
            return <IconSettings />;
        }
      })()}
    </StyledButton>
  );
};
