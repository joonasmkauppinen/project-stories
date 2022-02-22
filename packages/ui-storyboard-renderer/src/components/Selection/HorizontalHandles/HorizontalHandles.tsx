import styled from '@emotion/styled';
import { Size } from '@joonasmkauppinen/project-stories/store-zustand';

import { StoryboardDataAttributes } from '../../../types';

interface HorizontalHandlesProps {
  size: Size;
}

const HANDLE_HEIGHT = 16;
const HANDLE_WIDTH = 5;

const Handle = styled.div({
  width: HANDLE_WIDTH,
  height: HANDLE_HEIGHT,
  backgroundColor: 'white',
  borderColor: '#004DE3',
  borderStyle: 'solid',
  borderWidth: 1,
  position: 'absolute',
  cursor: 'ew-resize',
  pointerEvents: 'all',
});

interface LeftHandleProps extends StoryboardDataAttributes {
  size: Size;
}

const LeftHandle = styled(Handle)<LeftHandleProps>`
  top: ${({ size: { height } }) => height / 2 - HANDLE_HEIGHT / 2}px;
  left: -3px;
`;

const RightHandle = styled(Handle)<LeftHandleProps>`
  top: ${({ size: { height } }) => height / 2 - HANDLE_HEIGHT / 2}px;
  right: -3px;
`;

export const HorizontalHandles = ({ size }: HorizontalHandlesProps) => {
  return (
    <>
      <LeftHandle
        size={size}
        data-context-area="storyboard"
        data-element-type="selection:handle-side-left"
      />
      <RightHandle
        size={size}
        data-context-area="storyboard"
        data-element-type="selection:handle-side-right"
      />
    </>
  );
};
