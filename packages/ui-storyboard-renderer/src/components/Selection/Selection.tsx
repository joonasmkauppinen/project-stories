import styled from '@emotion/styled';
import {
  Cards,
  Coordinate,
  LayerActionsProp,
  SelectionItem,
  Size,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { useCallback, useRef } from 'react';

interface SelectionProps extends LayerActionsProp {
  selection: SelectionItem[];
  cards: Cards;
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

export const Selection = ({ selection, actions, cards }: SelectionProps) => {
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

  if (!selection.some(({ parentId }) => typeof parentId === 'string')) {
    return null;
  }

  const activeCardId = selection.find(
    (item) => typeof item.parentId === 'string'
  );

  console.log('Active card id: ', activeCardId);

  const activeCard = cards[activeCardId?.parentId as string].screenPosition || {
    x: 0,
    y: 0,
  };

  const activeLayers = selection
    .filter(({ parentId }) => typeof parentId === 'string')
    .map(({ parentId, id }) => cards[parentId as string].layers[id]);

  console.log('Active layers: ', JSON.stringify(activeLayers, null, 2));

  const xMin = Math.min(...activeLayers.map(({ position }) => position.x));
  const yMin = Math.min(...activeLayers.map(({ position }) => position.y));

  const position = {
    x: xMin + activeCard.x,
    y: yMin + activeCard.y,
  };

  const size = {
    height:
      Math.max(
        ...activeLayers.map((layer) => layer.position.y + layer.size.height)
      ) - yMin,
    width:
      Math.max(
        ...activeLayers.map((layer) => layer.position.x + layer.size.width)
      ) - xMin,
  };

  console.log('Size: ', size);

  return (
    <StyledSelectionDiv
      onMouseDown={handleMouseDown}
      position={position}
      size={size}
    />
  );
};
