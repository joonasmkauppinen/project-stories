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
  selectCurrentTool,
  selectIsDragging,
  selectSelectedLayers,
  useStore,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { UserInputManagerService } from '@joonasmkauppinen/project-stories/services';
import { useEffect } from 'react';

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
  const selectedLayers = useStore(selectSelectedLayers);
  const currentTool = useStore(selectCurrentTool);
  const isDragging = useStore(selectIsDragging);

  useEffect(() => {
    new UserInputManagerService(actions, useStore.getState);
  }, []);

  // TODO: Refactor logic into UserInputManagerService.
  useEffect(() => {
    switch (currentTool) {
      case 'hand':
        document.body.style.cursor = 'grab';
        break;

      case 'text':
        document.body.style.cursor = 'crosshair';
        break;

      case 'move':
      default:
        document.body.style.cursor = 'default';
        break;
    }
  }, [currentTool]);

  return (
    <SafeHydrate>
      <StyledPage>
        <LayersPanel actions={actions} cards={cards} />
        <Storyboard
          actions={actions}
          cards={cards}
          selectedLayers={selectedLayers}
          isDragging={isDragging}
        />
        <Toolbar actions={actions} currentTool={currentTool} />
        <SamplePanel>Options panel coming soon.</SamplePanel>
      </StyledPage>
    </SafeHydrate>
  );
}

export default Index;
