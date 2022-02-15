import styled from '@emotion/styled';
import {
  Cards,
  LayerActionsProp,
  SelectionItem,
  Size,
} from '@joonasmkauppinen/project-stories/store-zustand';

interface SelectionProps extends LayerActionsProp {
  selection: SelectionItem[];
  cards: Cards;
  isDragging: boolean;
}

interface StyledSelectionDivProps {
  size: Size;
}
const StyledSelectionDiv = styled.div<StyledSelectionDivProps>(({ size }) => ({
  position: 'absolute',
  width: size.width,
  height: size.height,
  boxShadow: '#1100ff 0px 0px 0px 2px',
  // pointerEvents: 'none',
}));

export const Selection = ({ selection, cards, isDragging }: SelectionProps) => {
  const selectionWithParentId = selection.find(
    (item) => typeof item.parentId === 'string'
  );

  if (
    isDragging ||
    selectionWithParentId === undefined ||
    selectionWithParentId.parentId === undefined
  ) {
    return null;
  }

  const activeCard = cards[selectionWithParentId.parentId].screenPosition;

  const activeLayers = selection
    .filter(({ parentId }) => typeof parentId === 'string')
    .map(({ parentId, id }) => cards[parentId as string].layers[id]);

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

  return (
    <StyledSelectionDiv
      data-context-area="storyboard"
      data-element-type="selection"
      style={{ top: position.y, left: position.x }}
      size={size}
    />
  );
};
