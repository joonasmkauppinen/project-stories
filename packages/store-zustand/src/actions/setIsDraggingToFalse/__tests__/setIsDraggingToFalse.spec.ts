import { AppState } from '../../../types';
import { useStore } from '../../../store/zustandStore';
import { defaultInitialState } from '../../../test-utils';

import { setIsDraggingToFalse } from '../setIsDraggingToFalse';

describe('Action - setIsDraggingToFalse()', () => {
  test('Sets isDragging to false correctly', () => {
    const stateWithIsDraggingTrue: AppState = {
      ...defaultInitialState,
      isDragging: true,
    };

    useStore.setState(() => stateWithIsDraggingTrue);

    setIsDraggingToFalse();

    expect(useStore.getState().isDragging).toBe(false);
  });
});
