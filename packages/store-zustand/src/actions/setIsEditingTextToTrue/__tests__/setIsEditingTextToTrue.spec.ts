import { AppState } from '../../../types';
import { useStore } from '../../../store/zustandStore';
import { defaultInitialState } from '../../../test-utils';

import { setIsEditingTextToTrue } from '../setIsEditingTextToTrue';

describe('Action - setIsEditingTextToTrue()', () => {
  test('Sets isEditingText to true correctly', () => {
    const stateWithIsEditingTextFalse: AppState = {
      ...defaultInitialState,
      userInteraction: {
        isDragging: false,
        isEditingText: false,
      },
    };

    useStore.setState(() => stateWithIsEditingTextFalse);

    setIsEditingTextToTrue();

    expect(useStore.getState().userInteraction.isEditingText).toBe(true);
  });
});
