import styled from '@emotion/styled';
import {
  Storyboard,
  LayersPanel,
  LAYERS_PANEL_INITIAL_WIDTH,
  DESIGN_PANEL_WIDTH,
} from '@joonasmkauppinen/storyboard-renderer';
import {
  selectCards,
  useStore,
  actions,
  selectSelection,
} from '@joonasmkauppinen/store-zustand';

const SamplePanel = styled.div({
  gridColumnStart: 'design-panel',
  gridColumnEnd: 'design-panel',
  backgroundColor: '#2F3331',
  borderLeft: '1px solid#4B5350',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  fontSize: 15,
  fontWeight: 200,
  color: '#9d9b9b',
  paddingTop: 60,
});

const AppContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: `[layers-panel] ${LAYERS_PANEL_INITIAL_WIDTH}px [storyboard] 1fr [design-panel] ${DESIGN_PANEL_WIDTH}px`,
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

export const App = () => {
  const cards = useStore(selectCards);
  const selection = useStore(selectSelection);

  return (
    <AppContainer>
      <LayersPanel actions={actions} cards={cards} selection={selection} />
      <Storyboard actions={actions} cards={cards} selection={selection} />
      <SamplePanel>Options panel coming soon.</SamplePanel>
    </AppContainer>
  );
};
