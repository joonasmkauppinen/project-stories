import { AppState, StoryboardTool } from '../../../types';
import { useStore } from '../../../store/zustandStore';
import { defaultInitialState } from '../../../test-utils';

import { setToolToMove } from '../setToolToMove';

describe('Action - setToolToMove()', () => {
  test('Sets currentTool to move', () => {
    const stateWithCurrentToolAsText: AppState = {
      ...defaultInitialState,
      currentTool: 'text',
    };

    useStore.setState(() => stateWithCurrentToolAsText);

    setToolToMove();

    expect(useStore.getState().currentTool).toBe<StoryboardTool>('move');
  });
});
