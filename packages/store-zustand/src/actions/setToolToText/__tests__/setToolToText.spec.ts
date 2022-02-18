import { AppState, StoryboardTool } from '../../../types';
import { useStore } from '../../../store/zustandStore';

import { defaultInitialState } from '../../__test-utils__';

import { setToolToText } from '../setToolToText';

describe('Action - setToolToText()', () => {
  test('Sets currentTool to text', () => {
    const stateWithCurrentToolAsMove: AppState = {
      ...defaultInitialState,
      currentTool: 'move',
    };

    useStore.setState(() => stateWithCurrentToolAsMove);

    setToolToText();

    expect(useStore.getState().currentTool).toBe<StoryboardTool>('text');
  });
});
