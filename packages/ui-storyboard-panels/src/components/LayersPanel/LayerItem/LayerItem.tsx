import { CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import { TextLayerState } from '@joonasmkauppinen/project-stories/store-zustand';

interface StyledLayerItemLiProps {
  indentLevel: number;
  state: TextLayerState;
}

const INSET_AMOUNT = 40;

const hoverStyle: CSSObject = {
  borderColor: 'grey',
};

const activeStyle: CSSObject = {
  backgroundColor: '#4b534f',
};

const getBgStyleByState = (state: TextLayerState) => {
  switch (state) {
    case 'active':
    case 'active:editing-text':
      return activeStyle;

    case 'hovered':
      return hoverStyle;

    case 'idle':
    default:
      return undefined;
  }
};

// TODO: Get style values from theme
export const StyledLayerItemLi = styled.li<StyledLayerItemLiProps>(
  ({ indentLevel, state }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxSizing: 'border-box',
    border: '1px solid transparent',
    userSelect: 'none',
    padding: '12px 16px',
    color: 'white',
    fontSize: 13,
    fontWeight: indentLevel === 0 ? 'bold' : 'normal',
    listStyle: 'none',
    paddingInlineStart:
      indentLevel !== 0 ? INSET_AMOUNT * indentLevel : undefined,
    ...getBgStyleByState(state),
  })
);
