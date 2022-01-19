import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface EditorCanvasProps {}

const StyledEditorCanvas = styled.div`
  color: pink;
`;

export function EditorCanvas(props: EditorCanvasProps) {
  return (
    <StyledEditorCanvas>
      <h1>Welcome to EditorCanvas!</h1>
    </StyledEditorCanvas>
  );
}

export default EditorCanvas;
