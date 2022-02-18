import { AppState, LayerState, TestCardId, TestLayerId } from '../../../types';
import { useStore } from '../../../store/zustandStore';

import { defaultInitialState, generateCardsSlice } from '../../__test-utils__';

import { setLayerStateToHovered } from '../setLayerStateToHovered';

describe('Action - setLayerStateToHovered()', () => {
  test('Sets layer state to hovered correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layerId: TestLayerId = 'test_layer_id_0';

    const stateWithOneCardWithOneIdleLayer: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([
        { id: cardId, layers: [{ id: layerId, state: 'idle' }] },
      ]),
    };

    useStore.setState(() => stateWithOneCardWithOneIdleLayer);

    setLayerStateToHovered({ cardId, layerId });

    expect(
      useStore.getState().cards[cardId].layers[layerId].state
    ).toBe<LayerState>('hovered');
  });
});
