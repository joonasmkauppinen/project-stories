import { AppState, TestCardId, TestLayerId } from '../../../types';
import { useStore } from '../../../store/zustandStore';
import { defaultInitialState, generateCardsSlice } from '../../../test-utils';

import { onDragSelection } from '../onDragSelection';

describe('Action - onDragSelection()', () => {
  test('Updates single selected layer position correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layerId: TestLayerId = 'test_layer_id_0';

    const stateWithOneCardAndOneActiveLayer: AppState = {
      ...defaultInitialState,
      selectedLayers: [{ cardId, layerId }],
      cards: generateCardsSlice([
        {
          id: cardId,
          layers: [{ id: layerId, state: 'active', position: { x: 0, y: 0 } }],
        },
      ]),
    };

    useStore.setState(() => stateWithOneCardAndOneActiveLayer);

    const layerPosition = () =>
      useStore.getState().cards[cardId].layers[layerId].position;

    onDragSelection({ movementX: 25, movementY: 55 });

    expect(layerPosition().x).toBe(25);
    expect(layerPosition().y).toBe(55);

    onDragSelection({ movementX: -25, movementY: -55 });

    expect(layerPosition().x).toBe(0);
    expect(layerPosition().y).toBe(0);
  });

  test('Updates two selected layers positions correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layer1Id: TestLayerId = 'test_layer_id_0';
    const layer2Id: TestLayerId = 'test_layer_id_1';

    const stateWithOneCardAndTwoActiveLayers: AppState = {
      ...defaultInitialState,
      selectedLayers: [
        { cardId, layerId: layer1Id },
        { cardId, layerId: layer2Id },
      ],
      cards: generateCardsSlice([
        {
          id: cardId,
          layers: [
            { id: layer1Id, state: 'active', position: { x: 0, y: 0 } },
            { id: layer2Id, state: 'active', position: { x: 25, y: 100 } },
          ],
        },
      ]),
    };

    useStore.setState(() => stateWithOneCardAndTwoActiveLayers);

    const layer1Position = () =>
      useStore.getState().cards[cardId].layers[layer1Id].position;

    const layer2Position = () =>
      useStore.getState().cards[cardId].layers[layer2Id].position;

    onDragSelection({ movementX: 25, movementY: 50 });

    expect(layer1Position().x).toBe(25);
    expect(layer1Position().y).toBe(50);

    expect(layer2Position().x).toBe(50);
    expect(layer2Position().y).toBe(150);

    onDragSelection({ movementX: -25, movementY: -50 });

    expect(layer1Position().x).toBe(0);
    expect(layer1Position().y).toBe(0);

    expect(layer2Position().x).toBe(25);
    expect(layer2Position().y).toBe(100);
  });
});
