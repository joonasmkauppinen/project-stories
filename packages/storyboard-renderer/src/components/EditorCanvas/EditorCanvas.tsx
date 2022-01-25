import styled from '@emotion/styled';
import { Card, OnHoverCallback } from '../../types/EditorCanvas';
import { CardSection } from '../CardSection/CardSection';

/* eslint-disable-next-line */
export interface EditorCanvasProps {
  state: {
    cards: Card[];
  };
  onHover: OnHoverCallback;
}

const CardSectionContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const CardName = styled.p({
  color: 'white',
  size: 16,
});

const StyledEditorCanvas = styled.div({
  backgroundColor: '#1B1D1C',
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  overflow: 'scroll',
});

export const EditorCanvas = ({ state, onHover }: EditorCanvasProps) => {
  const { cards } = state;

  return (
    <StyledEditorCanvas>
      {cards.map((cardState) => (
        <CardSectionContainer key={`card-${cardState.id}`}>
          <CardName>{cardState.name}</CardName>
          <CardSection onHover={onHover} state={cardState} />
        </CardSectionContainer>
      ))}
    </StyledEditorCanvas>
  );
};
