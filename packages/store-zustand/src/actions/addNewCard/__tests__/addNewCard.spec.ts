import { addNewCard } from '../addNewCard';

import { AppState, TestCardId } from '../../../types';
import { generateCard } from '../../../generators';
import { testInitialState } from '../../__test-utils__/testInitialState';
import { useStore } from '../../../store/zustandStore';

const testCardId1: TestCardId = 'test_card_id_0';
const testCardId2: TestCardId = 'test_card_id_1';

const emptyCard = generateCard({
  sortOrderIndex: 0,
  testOverrides: { id: testCardId1 },
}).idWithData;

const testStateWithEmptyCard: AppState = {
  ...testInitialState,
  cards: {
    ...emptyCard,
  },
};

beforeEach(() => {
  useStore.setState(() => testStateWithEmptyCard);
});

describe('Action - addNewCard', () => {
  test('adds new card object correctly', () => {
    const initialCard = useStore.getState().cards[testCardId1];
    expect(initialCard.name).toEqual('Card 1');
    expect(initialCard.sortOrderIndex).toEqual(0);
    expect(initialCard.state).toEqual('idle');

    addNewCard({ testOverrides: { id: testCardId2 } });

    const newCard = useStore.getState().cards[testCardId2];
    expect(newCard.name).toEqual('Card 2');
    expect(newCard.sortOrderIndex).toEqual(1);
    expect(newCard.state).toEqual('idle');

    expect(useStore.getState().cards).toMatchInlineSnapshot(`
      Object {
        "test_card_id_0": Object {
          "autoAdvance": false,
          "duration": 0,
          "layers": Object {},
          "name": "Card 1",
          "screenPosition": Object {
            "x": NaN,
            "y": NaN,
          },
          "sortOrderIndex": 0,
          "state": "idle",
        },
        "test_card_id_1": Object {
          "autoAdvance": false,
          "duration": 0,
          "layers": Object {},
          "name": "Card 2",
          "screenPosition": Object {
            "x": NaN,
            "y": NaN,
          },
          "sortOrderIndex": 1,
          "state": "idle",
        },
      }
    `);
  });
});
