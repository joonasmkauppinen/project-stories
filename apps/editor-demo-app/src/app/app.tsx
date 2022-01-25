import styled from '@emotion/styled';

import { Card, EditorCanvas } from '@joonasmkauppinen/storyboard-renderer';

const StyledApp = styled.div`
  // Your style here
  height: 100vh;
  display: flex;
  flex-direction: row;
  background-color: red;
`;

const test = styled.div();

const SamplePanel = styled.div({
  backgroundColor: '#2F3331',
  width: 250,
  minWidth: 250,
});

const SAMPLE_CARDS: Card[] = [
  {
    autoAdvance: false,
    duration: 0,
    id: 'abc',
    layers: [
      {
        id: 'abc-layer-1',
        type: 'text',
      },
      {
        id: 'abc-layer-2',
        type: 'text',
      },
      {
        id: 'abc-layer-3',
        type: 'video',
      },
    ],
    name: 'Card 1',
    state: 'idle',
  },
  {
    autoAdvance: false,
    duration: 0,
    id: 'abc-2',
    layers: [
      {
        id: 'abc-2-layer-1',
        type: 'image',
      },
      {
        id: 'abc-2-layer-2',
        type: 'text',
      },
    ],
    name: 'Card 2',
    state: 'idle',
  },
];

export const App = () => {
  return (
    <StyledApp>
      <SamplePanel />
      <EditorCanvas onHover={() => null} state={{ cards: SAMPLE_CARDS }} />
      <SamplePanel />
    </StyledApp>
  );
};
