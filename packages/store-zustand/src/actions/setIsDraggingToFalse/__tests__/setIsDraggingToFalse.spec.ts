import { AppState } from '../../../types';
import { useStore } from '../../../store/zustandStore';
import { defaultInitialState } from '../../../test-utils';

import { setIsDraggingToFalse } from '../setIsDraggingToFalse';

describe('Action - setIsDraggingToFalse()', () => {
  test('Sets isDragging to false correctly', () => {
    const stateWithIsDraggingTrue: AppState = {
      ...defaultInitialState,
      userInteraction: {
        isDragging: true,
        isEditingText: false,
      },
    };

    useStore.setState(() => stateWithIsDraggingTrue);

    setIsDraggingToFalse();

    expect(useStore.getState().userInteraction.isDragging).toBe(false);
  });
});
