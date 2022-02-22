import { AppState, TestCardId, TestLayerId } from '../../../types';
import { defaultInitialState, generateCardsSlice } from '../../../test-utils';
import { useStore } from '../../../store/zustandStore';

import { setTextLayerValue } from '../setTextLayerValue';

describe('Action - setTextLayerValue()', () => {
  test('Sets layer value correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layerId: TestLayerId = 'test_layer_id_0';

    const stateWithOneIdleCardWithOneActiveLayer: AppState = {
      ...defaultInitialState,
      selectedLayers: [{ cardId, layerId }],
      cards: generateCardsSlice([
        {
          id: cardId,
          layers: [{ id: layerId, state: 'active', value: 'Text Layer' }],
        },
      ]),
    };

    useStore.setState(() => stateWithOneIdleCardWithOneActiveLayer);

    setTextLayerValue({ cardId, layerId, value: 'New value' });

    expect(useStore.getState().cards[cardId].layers[layerId].value).toBe(
      'New value'
    );
  });
});
