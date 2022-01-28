import styled from '@emotion/styled';
import {
  Coordinate,
  LayerActionsProp,
  SelectionItem,
  Size,
} from '@joonasmkauppinen/store-utils';
import { useCallback, useMemo, useRef, useState } from 'react';

interface SelectionProps extends LayerActionsProp {
  selection: SelectionItem[];
}

interface StyledSelectionDivProps {
  position: Coordinate;
  size: Size;
}
const StyledSelectionDiv = styled.div<StyledSelectionDivProps>(
  ({ position, size }) => ({
    position: 'absolute',
    width: size.width,
    height: size.height,
    top: position.y,
    left: position.x,
    boxShadow: '#1100ff 0px 0px 0px 2px',
  })
);

export const Selection = ({ selection, actions }: SelectionProps) => {
  const isMouseDown = useRef(false);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    // TODO: Improve perf by throttling onDragSelection calls by using requestAnimationFrame.
    // TODO: Consider making a UserInputManagerService to handle all input events.
    if (!isMouseDown.current) return;
    const { movementY, movementX } = event;
    actions.onDragSelection({ movementX, movementY });
  }, []);

  const handleMouseDown = useCallback(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    isMouseDown.current = true;
  }, []);

  const handleMouseUp = useCallback((event: MouseEvent) => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mousedown', handleMouseDown);
    isMouseDown.current = false;
  }, []);

  const { size, position } = useMemo(() => {
    const x = Math.min(...selection.map((item) => item.position.x));
    const y = Math.min(...selection.map((item) => item.position.y));
    const xMax = Math.max(
      ...selection.map((item) => item.position.x + item.size.width)
    );
    const yMax = Math.max(
      ...selection.map((item) => item.position.y + item.size.height)
    );

    return {
      position: {
        x,
        y,
      },
      size: {
        width: xMax - x,
        height: yMax - y,
      },
    };
  }, [selection]);

  if (selection.length === 0) {
    return null;
  }

  return (
    <StyledSelectionDiv
      onMouseDown={handleMouseDown}
      position={position}
      size={size}
    />
  );
};
