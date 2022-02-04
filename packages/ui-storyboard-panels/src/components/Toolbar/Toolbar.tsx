import styled from '@emotion/styled';

const StyledToolbar = styled.div({
  height: 50,
  backgroundColor: 'red',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
});

export const Toolbar = () => {
  return <StyledToolbar />;
};
