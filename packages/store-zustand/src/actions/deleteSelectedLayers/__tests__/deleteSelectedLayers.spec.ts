import { useStore } from '../../../store/zustandStore';
import { AppState, TestCardId, TestLayerId } from '../../../types';
import { defaultInitialState, generateCardsSlice } from '../../../test-utils';

import { deleteSelectedLayers } from '../deleteSelectedLayers';

describe('Action - deleteSelectedLayers()', () => {
  test('Deletes selected layers correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';

    const layer1Id: TestLayerId = 'test_layer_id_0';
    const layer2Id: TestLayerId = 'test_layer_id_1';

    const stateWithCardAndTwoActiveLayers: AppState = {
      ...defaultInitialState,
      selectedLayers: [
        { cardId, layerId: layer1Id },
        { cardId, layerId: layer2Id },
      ],
      cards: generateCardsSlice([
        {
          id: cardId,
          layers: [
            { id: layer1Id, state: 'active' },
            { id: layer2Id, state: 'active' },
          ],
        },
      ]),
    };

    useStore.setState(() => stateWithCardAndTwoActiveLayers);

    expect(useStore.getState().selectedLayers.length).toBe(2);
    expect(useStore.getState().cards[cardId].layers[layer1Id]).not.toBe(
      undefined
    );
    expect(useStore.getState().cards[cardId].layers[layer2Id]).not.toBe(
      undefined
    );

    deleteSelectedLayers();

    expect(useStore.getState().selectedLayers.length).toBe(0);
    expect(useStore.getState().cards[cardId].layers[layer1Id]).toBe(undefined);
    expect(useStore.getState().cards[cardId].layers[layer2Id]).toBe(undefined);
  });

  test.todo('Updates remaining layers "sortOrderIndex" correctly');
});
