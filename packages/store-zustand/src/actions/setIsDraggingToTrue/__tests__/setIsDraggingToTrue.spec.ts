import { AppState } from '../../../types';
import { useStore } from '../../../store/zustandStore';
import { defaultInitialState } from '../../../test-utils';

import { setIsDraggingToTrue } from '../setIsDraggingToTrue';

describe('Action - setIsDraggingToTrue()', () => {
  test('Sets isDragging to true correctly', () => {
    const stateWithIsDraggingFalse: AppState = {
      ...defaultInitialState,
      userInteraction: {
        isDragging: false,
        isEditingText: false,
      },
    };

    useStore.setState(() => stateWithIsDraggingFalse);

    setIsDraggingToTrue();

    expect(useStore.getState().userInteraction.isDragging).toBe(true);
  });
});
