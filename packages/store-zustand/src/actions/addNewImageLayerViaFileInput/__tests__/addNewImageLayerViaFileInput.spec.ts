import {
  AppState,
  ImageLayerType,
  TestCardId,
  TestLayerId,
} from '../../../types';
import { useStore } from '../../../store/zustandStore';
import { defaultInitialState, generateCardsSlice } from '../../../test-utils';

import { addNewImageLayerViaFileInput } from '../addNewImageLayerViaFileInput';

describe('Action - addNewImageLayerViaFileInput()', () => {
  test('Adds a new image layer correctly when a target card is already selected', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const imageLayerId: TestLayerId = 'test_layer_id_0';

    const stateWithOneSelectedCard: AppState = {
      ...defaultInitialState,
      selectedCards: [{ cardId }],
      cards: generateCardsSlice([
        {
          id: cardId,
          state: 'active',
        },
      ]),
    };

    useStore.setState(() => stateWithOneSelectedCard);

    addNewImageLayerViaFileInput({
      resource: {
        fileName: 'Test image.jpeg',
        mimeType: 'image/jpeg',
        size: {
          height: 100,
          width: 100,
        },
        src: 'file://sample/path/to/file.jpeg',
      },
      testOverrides: {
        id: imageLayerId,
      },
    });

    const imageLayer = () =>
      useStore.getState().cards[cardId].layers[imageLayerId] as ImageLayerType;

    expect(imageLayer()).not.toBe(undefined);
    expect(imageLayer().resource).toMatchInlineSnapshot(`
      Object {
        "fileName": "Test image.jpeg",
        "id": "test_layer_id_0_resource",
        "mimeType": "image/jpeg",
        "size": Object {
          "height": 100,
          "width": 100,
        },
        "src": "file://sample/path/to/file.jpeg",
        "type": "image",
      }
    `);
  });

  test('Adds image resource into "fileResourceQueue" if no card is selected', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const imageLayerId: TestLayerId = 'test_layer_id_0';

    const stateWithOneCard: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([{ id: cardId }]),
    };

    useStore.setState(() => stateWithOneCard);

    addNewImageLayerViaFileInput({
      resource: {
        fileName: 'Test image.jpeg',
        mimeType: 'image/jpeg',
        size: {
          height: 100,
          width: 100,
        },
        src: 'file://sample/path/to/file.jpeg',
      },
      testOverrides: {
        id: imageLayerId,
      },
    });

    expect(useStore.getState().cards[cardId].layers[imageLayerId]).toBe(
      undefined
    );

    expect(useStore.getState().fileResourceQueue.length).toBe(1);
    expect(useStore.getState().fileResourceQueue).toMatchInlineSnapshot(`
      Array [
        Object {
          "fileName": "Test image.jpeg",
          "mimeType": "image/jpeg",
          "size": Object {
            "height": 100,
            "width": 100,
          },
          "src": "file://sample/path/to/file.jpeg",
        },
      ]
    `);
  });
});
