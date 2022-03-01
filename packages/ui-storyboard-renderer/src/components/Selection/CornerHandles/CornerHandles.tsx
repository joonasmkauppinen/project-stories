import { css } from '@emotion/react';
import { StoryboardDataAttributes } from '../../../types';

const CORNER_HANDLE_SIZE = 7;

const cornerHandleStyle = css({
  width: CORNER_HANDLE_SIZE,
  height: CORNER_HANDLE_SIZE,
  backgroundColor: 'white',
  borderColor: '#004DE3',
  borderStyle: 'solid',
  borderWidth: 1,
  position: 'absolute',
  pointerEvents: 'all',
});

const sideHandleStyle = css({
  position: 'absolute',
  pointerEvents: 'all',
});

const TopLeftHandle = (dataAttributes: StoryboardDataAttributes) => (
  <div
    {...dataAttributes}
    style={{
      top: -CORNER_HANDLE_SIZE / 2 - 1,
      left: -CORNER_HANDLE_SIZE / 2 - 1,
      cursor: 'nwse-resize',
    }}
    css={cornerHandleStyle}
  ></div>
);

const TopRightHandle = (dataAttributes: StoryboardDataAttributes) => (
  <div
    {...dataAttributes}
    style={{
      top: -CORNER_HANDLE_SIZE / 2 - 1,
      right: -CORNER_HANDLE_SIZE / 2,
      cursor: 'nesw-resize',
    }}
    css={cornerHandleStyle}
  ></div>
);

const BottomLeftHandle = (dataAttributes: StoryboardDataAttributes) => (
  <div
    {...dataAttributes}
    style={{
      bottom: -CORNER_HANDLE_SIZE / 2,
      left: -CORNER_HANDLE_SIZE / 2 - 1,
      cursor: 'nesw-resize',
    }}
    css={cornerHandleStyle}
  ></div>
);

const BottomRightHandle = (dataAttributes: StoryboardDataAttributes) => (
  <div
    {...dataAttributes}
    style={{
      bottom: -CORNER_HANDLE_SIZE / 2,
      right: -CORNER_HANDLE_SIZE / 2,
      cursor: 'nwse-resize',
    }}
    css={cornerHandleStyle}
  ></div>
);

const TopSideHandle = (dataAttributes: StoryboardDataAttributes) => (
  <div
    {...dataAttributes}
    style={{
      height: CORNER_HANDLE_SIZE,
      top: -CORNER_HANDLE_SIZE / 2 - 1,
      left: CORNER_HANDLE_SIZE / 2 - 1,
      right: CORNER_HANDLE_SIZE / 2,
      cursor: 'ns-resize',
    }}
    css={sideHandleStyle}
  ></div>
);

const BottomSideHandle = (dataAttributes: StoryboardDataAttributes) => (
  <div
    {...dataAttributes}
    style={{
      height: CORNER_HANDLE_SIZE,
      bottom: -CORNER_HANDLE_SIZE / 2,
      left: CORNER_HANDLE_SIZE / 2 - 1,
      right: CORNER_HANDLE_SIZE / 2,
      cursor: 'ns-resize',
    }}
    css={sideHandleStyle}
  ></div>
);

const LeftSideHandle = (dataAttributes: StoryboardDataAttributes) => (
  <div
    {...dataAttributes}
    style={{
      width: CORNER_HANDLE_SIZE,
      top: CORNER_HANDLE_SIZE / 2 - 1,
      bottom: CORNER_HANDLE_SIZE / 2,
      left: -CORNER_HANDLE_SIZE / 2 - 1,
      cursor: 'ew-resize',
    }}
    css={sideHandleStyle}
  ></div>
);

const RightSideHandle = (dataAttributes: StoryboardDataAttributes) => (
  <div
    {...dataAttributes}
    style={{
      width: CORNER_HANDLE_SIZE,
      top: CORNER_HANDLE_SIZE / 2 - 1,
      bottom: CORNER_HANDLE_SIZE / 2,
      right: -CORNER_HANDLE_SIZE / 2,
      cursor: 'ew-resize',
    }}
    css={sideHandleStyle}
  ></div>
);

export const CornerHandles = () => {
  return (
    <>
      <TopSideHandle
        data-context-area="storyboard"
        data-element-type="selection:handle-side-top"
      />
      <BottomSideHandle
        data-context-area="storyboard"
        data-element-type="selection:handle-side-bottom"
      />
      <LeftSideHandle
        data-context-area="storyboard"
        data-element-type="selection:handle-side-left"
      />
      <RightSideHandle
        data-context-area="storyboard"
        data-element-type="selection:handle-side-right"
      />
      <TopLeftHandle
        data-context-area="storyboard"
        data-element-type="selection:handle-corner-top-left"
      />
      <TopRightHandle
        data-context-area="storyboard"
        data-element-type="selection:handle-corner-top-right"
      />
      <BottomLeftHandle
        data-context-area="storyboard"
        data-element-type="selection:handle-corner-bottom-left"
      />
      <BottomRightHandle
        data-context-area="storyboard"
        data-element-type="selection:handle-corner-bottom-right"
      />
    </>
  );
};
