import { AppState, TestCardId, TestLayerId } from '../../../types';
import { useStore } from '../../../store/zustandStore';
import { defaultInitialState, generateCardsSlice } from '../../../test-utils';

import { resizeSelectionFromSideRight } from '../resizeSelectionFromSideRight';

describe('Action - resizeLayerFromSideRight()', () => {
  test('Updates layer width correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layerId: TestLayerId = 'test_layer_id_0';

    const stateWithOneIdleCardWithOneActiveLayer: AppState = {
      ...defaultInitialState,
      selectedLayers: [{ cardId, layerId }],
      cards: generateCardsSlice([
        {
          id: cardId,
          layers: [
            { id: layerId, state: 'active', size: { height: 50, width: 100 } },
          ],
        },
      ]),
    };

    useStore.setState(() => stateWithOneIdleCardWithOneActiveLayer);

    resizeSelectionFromSideRight({ movementX: -10 });

    const layer = () => useStore.getState().cards[cardId].layers[layerId];
    expect(layer().size.width).toBe(90);

    resizeSelectionFromSideRight({ movementX: 10 });

    expect(layer().size.width).toBe(100);
  });

  test('Does not update state, if called when there are no selectedLayers', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layerId: TestLayerId = 'test_layer_id_0';

    const stateWithOneIdleCardWithOneIdleLayer: AppState = {
      ...defaultInitialState,
      selectedLayers: [],
      cards: generateCardsSlice([
        {
          id: cardId,
          layers: [
            { id: layerId, state: 'idle', size: { height: 50, width: 100 } },
          ],
        },
      ]),
    };

    useStore.setState(() => stateWithOneIdleCardWithOneIdleLayer);

    resizeSelectionFromSideRight({ movementX: 10 });

    expect(useStore.getState()).toStrictEqual(
      stateWithOneIdleCardWithOneIdleLayer
    );
  });

  test('Does not update state, if called when there are two or more selectedLayers', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layer1Id: TestLayerId = 'test_layer_id_0';
    const layer2Id: TestLayerId = 'test_layer_id_1';

    const stateWithOneIdleCardWithTwoActiveLayers: AppState = {
      ...defaultInitialState,
      selectedLayers: [
        { cardId, layerId: layer1Id },
        { cardId, layerId: layer2Id },
      ],
      cards: generateCardsSlice([
        {
          id: cardId,
          layers: [
            { id: layer1Id, state: 'active', size: { height: 50, width: 100 } },
            { id: layer2Id, state: 'active', size: { height: 50, width: 100 } },
          ],
        },
      ]),
    };

    useStore.setState(() => stateWithOneIdleCardWithTwoActiveLayers);

    resizeSelectionFromSideRight({ movementX: 10 });

    expect(useStore.getState()).toStrictEqual(
      stateWithOneIdleCardWithTwoActiveLayers
    );
  });
});
