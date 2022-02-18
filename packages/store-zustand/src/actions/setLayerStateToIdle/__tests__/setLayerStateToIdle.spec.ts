import { AppState, LayerState, TestCardId, TestLayerId } from '../../../types';
import { useStore } from '../../../store/zustandStore';
import { defaultInitialState, generateCardsSlice } from '../../../test-utils';

import { setLayerStateToIdle } from '../setLayerStateToIdle';

describe('Action - setLayerStateToIdle()', () => {
  test('Sets layer state to idle correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layerId: TestLayerId = 'test_layer_id_0';

    const stateWithOneCardWithOneActiveLayer: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([
        { id: cardId, layers: [{ id: layerId, state: 'active' }] },
      ]),
    };

    useStore.setState(() => stateWithOneCardWithOneActiveLayer);

    setLayerStateToIdle({ cardId, layerId });

    expect(
      useStore.getState().cards[cardId].layers[layerId].state
    ).toBe<LayerState>('idle');
  });
});
