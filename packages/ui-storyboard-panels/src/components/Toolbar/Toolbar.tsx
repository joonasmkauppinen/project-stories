import styled from '@emotion/styled';

const StyledToolbar = styled.div({
  backgroundColor: 'red',
  gridColumn: 'storyboard',
  height: 50,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 100,
});

export const Toolbar = () => {
  return <StyledToolbar />;
};
