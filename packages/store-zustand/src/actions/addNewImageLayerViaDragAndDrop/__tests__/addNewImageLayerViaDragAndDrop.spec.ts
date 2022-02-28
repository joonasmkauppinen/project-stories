import {
  AppState,
  ImageLayerType,
  TestCardId,
  TestLayerId,
} from '../../../types';
import { useStore } from '../../../store/zustandStore';
import { defaultInitialState, generateCardsSlice } from '../../../test-utils';

import { addNewImageLayerViaDragAndDrop } from '../addNewImageLayerViaDragAndDrop';

describe('Action - addNewImageLayerViaDragAnsDrop()', () => {
  test('Adds new layer to card correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const imageLayerId: TestLayerId = 'test_layer_id_0';
    const stateWithOneCard: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([{ id: cardId }]),
    };

    useStore.setState(() => stateWithOneCard);

    addNewImageLayerViaDragAndDrop({
      cardId,
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
});
