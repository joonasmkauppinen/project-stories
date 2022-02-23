export function eventInsideSelectionBounds(eventPosition: {
  x: number;
  y: number;
}): boolean {
  const selectionElement = document.getElementById('selection');
  if (selectionElement === null) {
    return false;
  }

  const { left, top, width, height } = selectionElement.getBoundingClientRect();
  const selectionX1 = left;
  const selectionY1 = top;
  const selectionX2 = left + width;
  const selectionY2 = top + height;

  return (
    selectionX1 < eventPosition.x &&
    selectionX2 > eventPosition.x &&
    selectionY1 < eventPosition.y &&
    selectionY2 > eventPosition.y
  );
}
