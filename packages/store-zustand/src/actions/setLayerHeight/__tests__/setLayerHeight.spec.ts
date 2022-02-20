import { AppState, TestCardId, TestLayerId } from '../../../types';
import { useStore } from '../../../store/zustandStore';
import { defaultInitialState, generateCardsSlice } from '../../../test-utils';

import { setLayerHeight } from '../setLayerHeight';

describe('Action - setLayerHeight()', () => {
  test('Sets layer height correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layerId: TestLayerId = 'test_layer_id_0';

    const stateWithOneIdleCardWithOneIdleLayer: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([
        {
          id: cardId,
          layers: [{ id: layerId, size: { width: 100, height: 100 } }],
        },
      ]),
    };

    useStore.setState(() => stateWithOneIdleCardWithOneIdleLayer);

    setLayerHeight({ cardId, layerId, height: 150 });

    expect(useStore.getState().cards[cardId].layers[layerId].size.height).toBe(
      150
    );
  });
});
