import { addNewCard } from '../addNewCard';

import { useStore } from '../../../store/zustandStore';
import { AppState } from '../../../types/appState';
import { generateCard } from '../../../generators';

const mockCardId1 = 'mock_card_id_0';
const mockCardId2 = 'mock_card_id_1';

const emptyCard = generateCard({
  sortOrderIndex: 0,
  mockId: mockCardId1,
}).idWithData;

const mockInitialState: AppState = {
  cards: {
    ...emptyCard,
  },
  currentTool: 'move',
  selectedCards: [],
  selectedLayers: [],
  isDragging: false,
};

beforeEach(() => {
  useStore.setState(() => mockInitialState);
});

describe('Action - addNewCard', () => {
  test('adds new card object correctly', () => {
    const initialCard = useStore.getState().cards[mockCardId1];
    expect(initialCard.name).toEqual('Card 1');
    expect(initialCard.sortOrderIndex).toEqual(0);
    expect(initialCard.state).toEqual('idle');

    addNewCard({ mockCardId: mockCardId2 });

    const newCard = useStore.getState().cards[mockCardId2];
    expect(newCard.name).toEqual('Card 2');
    expect(newCard.sortOrderIndex).toEqual(1);
    expect(newCard.state).toEqual('idle');

    expect(useStore.getState().cards).toMatchInlineSnapshot(`
      Object {
        "mock_card_id_0": Object {
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
        "mock_card_id_1": Object {
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
