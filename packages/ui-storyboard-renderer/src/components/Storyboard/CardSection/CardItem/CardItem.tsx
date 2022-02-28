import {
  DragEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  BaseElementState,
  ID,
  isValidImageMimeType,
  LayerActionsProp,
  Layers,
  Size,
} from '@joonasmkauppinen/project-stories/store-zustand';

import {
  CARD_ITEM_HEIGHT,
  CARD_ITEM_WIDTH,
} from '../../../../constants/dimensions';
import { CardLayer } from './CardLayer/CardLayer';

export interface CardItemProps
  extends LayerActionsProp,
    React.HTMLAttributes<HTMLDivElement> {
  layers: Layers;
  state: BaseElementState;
  cardId: ID;
  isEditingText: boolean;
}

const HIGHLIGHT_WIDTH = 20;

const highlightStyle = css({
  ':before': {
    content: '""',
    position: 'absolute',
    top: HIGHLIGHT_WIDTH,
    bottom: HIGHLIGHT_WIDTH,
    left: HIGHLIGHT_WIDTH,
    right: HIGHLIGHT_WIDTH,
    outlineWidth: HIGHLIGHT_WIDTH,
    outlineColor: '#0500FF73',
    outlineStyle: 'solid',
    pointerEvents: 'none',
    zIndex: 9999,
  },
});

// TODO: Use outline instead of box-shadow.
const setBoxShadowByState = (state: BaseElementState) => {
  if (state === 'active') {
    return 'fuchsia 0px 0px 0px 2px';
  }

  if (state === 'hovered') {
    return '#424342 0px 0px 0px 10px';
  }

  return '#424342 0px 0px 0px 0px';
};

const StyledCardItem = styled.div<{ state: BaseElementState }>(({ state }) => ({
  backgroundColor: 'white',
  width: CARD_ITEM_WIDTH,
  height: CARD_ITEM_HEIGHT,
  display: 'block',
  position: 'relative',
  borderRadius: 2,
  boxShadow: setBoxShadowByState(state),
  transition: 'box-shadow 150ms cubic-bezier(0.18, 0.89, 0.32, 1.28)',
}));

export const CardItem = ({
  layers,
  cardId,
  actions,
  state,
  isEditingText,
  ...divElementAttrs
}: CardItemProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const cardItemRef = useRef<HTMLDivElement>(null);

  const handleDragEnter: DragEventHandler = useCallback(() => {
    if (isDragOver) {
      return;
    }

    setIsDragOver(true);
  }, [isDragOver]);

  const handleDragLeave: DragEventHandler = useCallback(() => {
    if (!isDragOver) {
      return;
    }

    setIsDragOver(false);
  }, [isDragOver]);

  const handleDragOver: DragEventHandler = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleDrop: DragEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      setIsDragOver(false);

      const file = event.dataTransfer.files[0];

      if (!isValidImageMimeType(file.type)) {
        console.error('Invalid file type: ', file.type);
        return;
      }

      const src = URL.createObjectURL(file);
      const imgSize = new Promise<Size>((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          resolve({ height: img.height, width: img.width });
        };
        img.onerror = () => {
          reject();
        };
      });

      try {
        actions.addNewImageViaDragAndDrop({
          cardId,
          resource: {
            fileName: file.name,
            mimeType: file.type,
            size: await imgSize,
            src,
          },
        });
      } catch (error) {
        console.error('Failed to resolve selected image size.');
      }
    },
    [actions, cardId]
  );

  useEffect(() => {
    if (cardItemRef.current) {
      const containerX = cardItemRef.current.parentElement?.offsetLeft;
      const containerY = cardItemRef.current.parentElement?.offsetTop;
      const x = (containerX as number) + cardItemRef.current.offsetLeft;
      const y = (containerY as number) + cardItemRef.current.offsetTop;
      actions.updateCardScreenPosition({
        cardId,
        position: { x, y },
      });
    }
  }, [actions, cardId]);

  return (
    <StyledCardItem
      id={cardId}
      css={[isDragOver && highlightStyle]}
      data-card-id={cardId}
      data-element-type="card"
      data-context-area="storyboard"
      state={state}
      ref={cardItemRef}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      {...divElementAttrs}
    >
      {Object.entries(layers).map(([layerId, layer]) => (
        <CardLayer
          isEditingText={isEditingText}
          actions={actions}
          cardId={cardId}
          key={`layer-${layerId}`}
          layer={layer}
          layerId={layerId}
        />
      ))}
    </StyledCardItem>
  );
};
