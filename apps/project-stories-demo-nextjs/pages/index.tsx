import styled from '@emotion/styled';
import {
  LayersPanel,
  Toolbar,
} from '@joonasmkauppinen/project-stories/ui-storyboard-panels';
import {
  DESIGN_PANEL_WIDTH,
  Storyboard,
} from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';
import {
  actions,
  selectCards,
  selectSelection,
  useStore,
} from '@joonasmkauppinen/project-stories/store-zustand';

const StyledPage = styled.div({
  bottom: 0,
  display: 'grid',
  gridTemplateColumns: `[layers-panel] auto [storyboard] 1fr [design-panel] auto`,
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
});

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

const SafeHydrate = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
};

export function Index() {
  const cards = useStore(selectCards);
  const selection = useStore(selectSelection);

  return (
    <SafeHydrate>
      <StyledPage>
        <LayersPanel actions={actions} cards={cards} selection={selection} />
        <Storyboard actions={actions} cards={cards} selection={selection} />
        <Toolbar />
        <SamplePanel>Options panel coming soon.</SamplePanel>
      </StyledPage>
    </SafeHydrate>
  );
}

export default Index;
