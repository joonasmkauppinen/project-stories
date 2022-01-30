import styled from '@emotion/styled';
import { Storyboard, LayersPanel } from '@joonasmkauppinen/storyboard-renderer';
import {
  selectCards,
  useStore,
  actions,
  selectSelection,
} from '@joonasmkauppinen/store-zustand';

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  background-color: red;
`;

const SamplePanel = styled.div({
  backgroundColor: '#2F3331',
  width: 250,
  minWidth: 250,
});

export const App = () => {
  const cards = useStore(selectCards);
  const selection = useStore(selectSelection);

  return (
    <StyledApp>
      <LayersPanel actions={actions} cards={cards} selection={selection} />
      <Storyboard actions={actions} cards={cards} selection={selection} />
      <SamplePanel />
    </StyledApp>
  );
};
