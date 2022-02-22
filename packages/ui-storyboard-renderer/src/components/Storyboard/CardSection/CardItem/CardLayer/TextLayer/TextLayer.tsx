import {
  FormEventHandler,
  memo,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import styled from '@emotion/styled';
import {
  ID,
  Layer,
  LayerActionsProp,
} from '@joonasmkauppinen/project-stories/store-zustand';

import { StoryboardDataAttributes } from '../../../../../../types';

interface StyledH1Props extends StoryboardDataAttributes {
  hover: boolean;
  isEditingText: boolean;
}

const getOutlineStyle = ({
  hover,
  isEditingText,
}: Pick<StyledH1Props, 'hover' | 'isEditingText'>) => {
  if (isEditingText) {
    return '1px solid lightblue';
  }

  if (hover) {
    return '2px solid #00aeff';
  }

  return 'none';
};

const StyledH1 = styled.h1<StyledH1Props>(({ hover, isEditingText }) => ({
  margin: 0,
  padding: 0,
  position: 'absolute',
  outline: getOutlineStyle({ hover, isEditingText }),
  cursor: 'default',
  userSelect: 'none',
}));

interface TextLayerProps extends LayerActionsProp {
  layer: Layer;
  cardId: ID;
  layerId: ID;
  isEditingText: boolean;
}

/**
 * We need to prevent React from updating the component when editing the text
 * content. Otherwise the caret will jump to the beginning of the element on
 * every key stroke.
 */
const preventReactUpdate = (
  prevProps: Readonly<TextLayerProps>,
  nextProps: Readonly<TextLayerProps>
) => {
  if (prevProps.isEditingText === true && nextProps.isEditingText === true) {
    return true;
  } else {
    return false;
  }
};

export const TextLayer = memo(
  ({ cardId, layerId, actions, layer, isEditingText }: TextLayerProps) => {
    const elementRef = useRef<HTMLHeadingElement>(null);

    const contentEditable =
      isEditingText && layer.state === 'active:editing-text';

    const handleMouseEnter: MouseEventHandler = useCallback(() => {
      if (layer.state === 'idle') {
        actions.setLayerStateToHovered({ cardId, layerId });
      }
    }, [actions, cardId, layer.state, layerId]);

    const handleMouseLeave: MouseEventHandler = useCallback(() => {
      if (layer.state === 'hovered') {
        actions.setLayerStateToIdle({ cardId, layerId });
      }
    }, [actions, cardId, layer.state, layerId]);

    const handleMouseDown: MouseEventHandler = useCallback(
      (event) => {
        if (layer.state === 'hovered') {
          actions.setLayerStateToActive({
            layerId,
            cardId,
            isShiftKey: event.shiftKey,
          });
        }
      },
      [actions, cardId, layer.state, layerId]
    );

    const handleInput: FormEventHandler = useCallback(
      (event) => {
        const textContent = event.currentTarget.textContent;
        if (!textContent) {
          return;
        }

        actions.setTextLayerValue({
          cardId,
          layerId,
          value: textContent,
        });
      },
      [actions, cardId, layerId]
    );

    useEffect(() => {
      if (!elementRef.current) {
        return;
      }

      if (layer.size.height !== elementRef.current.clientHeight) {
        actions.setLayerHeight({
          cardId,
          layerId,
          height: elementRef.current.clientHeight,
        });
      }
    });

    useEffect(() => {
      if (isEditingText) {
        elementRef.current?.focus();
      }
    }, [isEditingText]);

    return (
      <StyledH1
        isEditingText={layer.state === 'active:editing-text'}
        contentEditable={contentEditable}
        onInput={handleInput}
        id={layerId}
        data-layer-id={layerId}
        data-card-id={cardId}
        data-element-type="layer:text"
        data-context-area="storyboard"
        style={{
          top: layer.position.y,
          left: layer.position.x,
          width: layer.size.width,
        }}
        ref={elementRef}
        hover={layer.state === 'hovered'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        dangerouslySetInnerHTML={{ __html: layer.value }}
      />
    );
  },
  preventReactUpdate
);
