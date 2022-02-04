import styled from '@emotion/styled';

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
      <IconButton icon="move" state="active" />
      <IconButton icon="text" />
      <IconButton icon="hand" />
      <Divider />
      <IconButton icon="add-image" />
    </Container>
  );
};
