import { AppState } from '../../../types';
import { useStore } from '../../../store/zustandStore';
import { defaultInitialState } from '../../../test-utils';

import { setIsEditingTextToFalse } from '../setIsEditingTextToFalse';

describe('Action - setIsEditingTextToFalse()', () => {
  test('Sets isEditingText to false correctly', () => {
    const stateWithIsEditingTextTrue: AppState = {
      ...defaultInitialState,
      userInteraction: {
        isDragging: false,
        isEditingText: true,
      },
    };

    useStore.setState(() => stateWithIsEditingTextTrue);

    setIsEditingTextToFalse();

    expect(useStore.getState().userInteraction.isEditingText).toBe(false);
  });
});
