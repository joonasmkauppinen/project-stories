import styled from '@emotion/styled';
import {
  LayersPanel,
  DesignPanel,
  Toolbar,
} from '@joonasmkauppinen/project-stories/ui-storyboard-panels';
import { Storyboard } from '@joonasmkauppinen/project-stories/ui-storyboard-renderer';
import {
  actions,
  selectCards,
  selectCurrentTool,
  selectUserInteraction,
  selectSelectedLayers,
  useStore,
  selectFileResourceQueue,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { useUserInputManager } from '@joonasmkauppinen/project-stories/user-input-utils';
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
  const userInteraction = useStore(selectUserInteraction);
  const fileResourceQueue = useStore(selectFileResourceQueue);

  useUserInputManager(actions, useStore.getState);

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
          userInteraction={userInteraction}
          fileResourceQueue={fileResourceQueue}
        />
        <Toolbar actions={actions} currentTool={currentTool} />
        <DesignPanel cards={cards} selectedLayers={selectedLayers} />
      </StyledPage>
    </SafeHydrate>
  );
}

export default Index;
