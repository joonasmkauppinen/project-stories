import styled, { CSSObject } from '@emotion/styled';
import { buttonHoverStyle } from '../styles/buttonHoverStyle';

import { IconAddImage } from './icons/IconAddImage';
import { IconHand } from './icons/IconHand';
import { IconHistory } from './icons/IconHistory';
import { IconMove } from './icons/IconMove';
import { IconSettings } from './icons/IconSettings';
import { IconText } from './icons/IconText';

interface IconButtonProps {
  state?: 'idle' | 'active';
  size?: 'small' | 'normal';
  icon: 'move' | 'text' | 'hand' | 'add-image' | 'history' | 'settings';
  onClick?: () => void;
  title?: string;
}

interface StyledButtonProps {
  size: 'small' | 'normal';
  state: 'idle' | 'active';
}

const getBackgroundColorByState = (state: 'idle' | 'active'): CSSObject => {
  if (state === 'active') {
    return {
      backgroundColor: '#ffffff !important',
    };
  }
  return {
    backgroundColor: '#000000',
    ...buttonHoverStyle,
  };
};

const StyledButton = styled.button<StyledButtonProps>(({ state, size }) => ({
  all: 'unset',
  alignItems: 'center',
  backgroundColor: '#000000',
  ...getBackgroundColorByState(state),
  borderColor: '#798681',
  borderRadius: 3,
  borderStyle: 'solid',
  borderWidth: 1,
  display: 'flex',
  height: size === 'small' ? 26 : 36,
  justifyContent: 'center',
  width: size === 'small' ? 26 : 36,
  cursor: 'not-allowed',
}));

export const IconButton = ({
  icon,
  state = 'idle',
  onClick,
  size = 'normal',
  title,
}: IconButtonProps) => {
  const iconFill = state === 'idle' ? 'white' : 'black';

  return (
    <StyledButton title={title} state={state} onClick={onClick} size={size}>
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
