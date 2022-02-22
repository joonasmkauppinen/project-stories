import {
  AppState,
  TestCardId,
  TestLayerId,
  TextLayerState,
} from '../../../types';
import { defaultInitialState, generateCardsSlice } from '../../../test-utils';
import { useStore } from '../../../store/zustandStore';

import { setTextLayerStateToActiveEditingText } from '../setTextLayerStateToActiveEditingText';

describe('Action - setTextLayerStateToActiveEditingText()', () => {
  test('Sets layer state to "active:editing-text" correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layerId: TestLayerId = 'test_layer_id_0';

    const stateWithOneCardWithOneIdleLayer: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([
        { id: cardId, layers: [{ id: layerId, state: 'idle' }] },
      ]),
    };

    useStore.setState(() => stateWithOneCardWithOneIdleLayer);

    setTextLayerStateToActiveEditingText({ cardId, layerId });

    expect(
      useStore.getState().cards[cardId].layers[layerId].state
    ).toBe<TextLayerState>('active:editing-text');
  });
});
