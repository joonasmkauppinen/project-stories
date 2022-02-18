import { AppState } from '../../../types';
import { useStore } from '../../../store/zustandStore';

import { defaultInitialState } from '../../__test-utils__';

import { setIsDraggingToTrue } from '../setIsDraggingToTrue';

describe('Action - setIsDraggingToTrue()', () => {
  test('Sets isDragging to true correctly', () => {
    const stateWithIsDraggingFalse: AppState = {
      ...defaultInitialState,
      isDragging: false,
    };

    useStore.setState(() => stateWithIsDraggingFalse);

    setIsDraggingToTrue();

    expect(useStore.getState().isDragging).toBe(true);
  });
});
