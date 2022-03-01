import { AppState, TestCardId, TestLayerId } from '../../../types';
import { defaultInitialState, generateCardsSlice } from '../../../test-utils';
import { useStore } from '../../../store/zustandStore';

import { resizeSelectionFromCornerBottomLeft } from '../resizeSelectionFromCornerBottomLeft';

describe('Action - resizeSelectionFromCornerBottomLeft()', () => {
  test('Updates layer size and position correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layerId: TestLayerId = 'test_layer_id_0';

    const stateWithOneCardWithOneActiveLayer: AppState = {
      ...defaultInitialState,
      selectedLayers: [{ cardId, layerId }],
      cards: generateCardsSlice([
        {
          id: cardId,
          layers: [
            {
              id: layerId,
              state: 'active',
              size: { height: 100, width: 100 },
              position: { x: 0, y: 0 },
            },
          ],
        },
      ]),
    };

    useStore.setState(() => stateWithOneCardWithOneActiveLayer);

    // Move corner inwards ↗
    resizeSelectionFromCornerBottomLeft({
      movement: { movementX: 10, movementY: -10 },
    });

    const layer = () => useStore.getState().cards[cardId].layers[layerId];

    expect(layer().position.x).toBe(10);
    expect(layer().position.y).toBe(0);
    expect(layer().size.height).toBe(90);
    expect(layer().size.width).toBe(90);
  });
});
