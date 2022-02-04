import styled from '@emotion/styled';
import {
  Storyboard,
  DESIGN_PANEL_WIDTH,
} from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';
import {
  LayersPanel,
  Toolbar,
} from '@joonasmkauppinen/project-stories/ui-storyboard-panels';
import {
  selectCards,
  useStore,
  actions,
  selectSelection,
} from '@joonasmkauppinen/project-stories/store-zustand';

const SamplePanel = styled.div({
  alignItems: 'flex-start',
  backgroundColor: '#2F3331',
  borderLeft: '1px solid#4B5350',
  color: '#9d9b9b',
  display: 'flex',
  fontSize: 15,
  fontWeight: 200,
  gridColumnEnd: 'design-panel',
  gridColumnStart: 'design-panel',
  justifyContent: 'center',
  paddingTop: 60,
  width: DESIGN_PANEL_WIDTH,
});

const AppContainer = styled.div({
  bottom: 0,
  display: 'grid',
  gridTemplateColumns: `[layers-panel] auto [storyboard] 1fr [design-panel] auto`,
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
});

export const App = () => {
  const cards = useStore(selectCards);
  const selection = useStore(selectSelection);

  return (
    <AppContainer>
      <LayersPanel actions={actions} cards={cards} selection={selection} />
      <Storyboard actions={actions} cards={cards} selection={selection} />
      <Toolbar />
      <SamplePanel>Options panel coming soon.</SamplePanel>
    </AppContainer>
  );
};
