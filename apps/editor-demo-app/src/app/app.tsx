import styled from '@emotion/styled';
import { Storyboard } from '@joonasmkauppinen/storyboard-renderer';
import {
  selectCurrentActiveCard,
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
      <SamplePanel />
      <Storyboard actions={actions} cards={cards} selection={selection} />
      <SamplePanel />
    </StyledApp>
  );
};
