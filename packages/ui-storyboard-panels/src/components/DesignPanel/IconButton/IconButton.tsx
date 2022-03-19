import styled from '@emotion/styled';
import { ReactNode } from 'react';

const ContainerButton = styled.button({
  all: 'unset',
  borderRadius: 2,
  width: 26,
  height: 26,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ':hover': {
    backgroundColor: '#FFFFFF4D',
  },
});

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export const IconButton = ({ children, onClick }: IconButtonProps) => {
  return <ContainerButton onClick={onClick}>{children}</ContainerButton>;
};
