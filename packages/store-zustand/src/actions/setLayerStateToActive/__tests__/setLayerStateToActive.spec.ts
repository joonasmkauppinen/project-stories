import {
  AppState,
  CardState,
  LayerState,
  SelectedLayer,
  TestCardId,
  TestLayerId,
} from '../../../types';
import { useStore } from '../../../store/zustandStore';

import { defaultInitialState, generateCardsSlice } from '../../__test-utils__';

import { setLayerStateToActive } from '../setLayerStateToActive';

describe('Action - setLayerStateToActive()', () => {
  test('Sets the selected layer state to active correctly', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layerId: TestLayerId = 'test_layer_id_0';

    const stateWithOneCardWithOneIdleLayer: AppState = {
      ...defaultInitialState,
      cards: generateCardsSlice([
        { id: cardId, layers: [{ id: layerId, state: 'idle' }] },
      ]),
    };

    useStore.setState(() => stateWithOneCardWithOneIdleLayer);

    setLayerStateToActive({ cardId, layerId, isShiftKey: false });

    expect(
      useStore.getState().cards[cardId].layers[layerId].state
    ).toBe<LayerState>('active');
    expect(useStore.getState().selectedLayers.length).toBe(1);
    expect(useStore.getState().selectedLayers).toContainEqual<SelectedLayer>({
      cardId,
      layerId,
    });
  });

  test('Clears previously selected cards and their layers "metaState.parentCardActive" and sets card/s state to idle', () => {
    const card1Id: TestCardId = 'test_card_id_0';
    const card1Layer1Id: TestLayerId = 'test_layer_id_0';

    const card2Id: TestCardId = 'test_card_id_1';
    const card2Layer1Id: TestLayerId = 'test_layer_id_0';

    const stateWithOneActiveCardWithOneLayerAndOneIdleCardWithOneLayer: AppState =
      {
        ...defaultInitialState,
        selectedCards: [{ cardId: card1Id }],
        cards: generateCardsSlice([
          {
            id: card1Id,
            state: 'active',
            layers: [
              {
                id: card1Layer1Id,
                state: 'idle',
                metaState: { parentCardActive: true },
              },
            ],
          },
          {
            id: card2Id,
            state: 'idle',
            layers: [
              {
                id: card2Layer1Id,
                state: 'idle',
                metaState: { parentCardActive: false },
              },
            ],
          },
        ]),
      };

    useStore.setState(
      () => stateWithOneActiveCardWithOneLayerAndOneIdleCardWithOneLayer
    );

    setLayerStateToActive({
      cardId: card2Id,
      layerId: card2Layer1Id,
      isShiftKey: false,
    });

    expect(useStore.getState().selectedCards.length).toBe(0);
    expect(useStore.getState().cards[card1Id].state).toBe<CardState>('idle');
    expect(
      useStore.getState().cards[card1Id].layers[card1Layer1Id].metaState
        .parentCardActive
    ).toBe(false);
  });

  test('Clears previously selected layer/s and sets their state to idle, then adds newly selected layer into selectedLayers array', () => {
    const cardId: TestCardId = 'test_card_id_0';
    const layer1Id: TestLayerId = 'test_layer_id_0';
    const layer2Id: TestLayerId = 'test_layer_id_1';

    const stateWithOneIdleCardWithTwoLayersAndOtherOneIsActive: AppState = {
      ...defaultInitialState,
      selectedLayers: [{ cardId, layerId: layer1Id }],
      cards: generateCardsSlice([
        {
          id: cardId,
          state: 'idle',
          layers: [
            {
              id: layer1Id,
              state: 'active',
            },
            {
              id: layer2Id,
              state: 'idle',
            },
          ],
        },
      ]),
    };

    useStore.setState(
      () => stateWithOneIdleCardWithTwoLayersAndOtherOneIsActive
    );

    setLayerStateToActive({ cardId, layerId: layer2Id, isShiftKey: false });

    expect(
      useStore.getState().selectedLayers
    ).not.toContainEqual<SelectedLayer>({
      cardId,
      layerId: layer1Id,
    });
    expect(
      useStore.getState().cards[cardId].layers[layer1Id].state
    ).toBe<LayerState>('idle');
    expect(useStore.getState().selectedLayers).toContainEqual<SelectedLayer>({
      cardId,
      layerId: layer2Id,
    });
    expect(
      useStore.getState().cards[cardId].layers[layer2Id].state
    ).toBe<LayerState>('active');
  });

  describe('when isShiftKey is true', () => {
    describe('and selection is inside the same card', () => {
      test('Adds selected layer into selectedLayers array', () => {
        const cardId: TestCardId = 'test_card_id_0';
        const layer1Id: TestLayerId = 'test_layer_id_0';
        const layer2Id: TestLayerId = 'test_layer_id_1';

        const stateWithOneIdleCardWithTwoLayersAndOtherOneIsActive: AppState = {
          ...defaultInitialState,
          selectedLayers: [{ cardId, layerId: layer1Id }],
          cards: generateCardsSlice([
            {
              id: cardId,
              state: 'idle',
              layers: [
                {
                  id: layer1Id,
                  state: 'active',
                },
                {
                  id: layer2Id,
                  state: 'idle',
                },
              ],
            },
          ]),
        };

        useStore.setState(
          () => stateWithOneIdleCardWithTwoLayersAndOtherOneIsActive
        );

        setLayerStateToActive({
          cardId,
          layerId: layer2Id,
          isShiftKey: true,
        });

        expect(useStore.getState().selectedLayers.length).toBe(2);
        expect(useStore.getState().selectedLayers).toEqual<SelectedLayer[]>([
          { cardId, layerId: layer1Id },
          { cardId, layerId: layer2Id },
        ]);
      });
    });

    describe('and selection is NOT inside the same card', () => {
      test('Clears previous selectedLayers array and sets their state to idle, then adds selected layer into selectedLayers array', () => {
        const card1Id: TestCardId = 'test_card_id_0';
        const card1Layer1Id: TestLayerId = 'test_layer_id_0';
        const card1Layer2Id: TestLayerId = 'test_layer_id_0';

        const card2Id: TestCardId = 'test_card_id_1';
        const card2Layer1Id: TestLayerId = 'test_layer_id_0';

        const stateWithOneIdleCardWithTwoActiveLayersAndOneIdleCardWithOneIdleLayer: AppState =
          {
            ...defaultInitialState,
            selectedLayers: [
              { cardId: card1Id, layerId: card1Layer1Id },
              { cardId: card1Id, layerId: card1Layer2Id },
            ],
            cards: generateCardsSlice([
              {
                id: card1Id,
                layers: [
                  { id: card1Layer1Id, state: 'active' },
                  { id: card1Layer2Id, state: 'active' },
                ],
              },
              { id: card2Id, layers: [{ id: card2Layer1Id, state: 'idle' }] },
            ]),
          };

        useStore.setState(
          () =>
            stateWithOneIdleCardWithTwoActiveLayersAndOneIdleCardWithOneIdleLayer
        );

        setLayerStateToActive({
          cardId: card2Id,
          layerId: card2Layer1Id,
          isShiftKey: true,
        });

        expect(
          useStore.getState().cards[card1Id].layers[card1Layer1Id].state
        ).toBe<LayerState>('idle');
        expect(
          useStore.getState().cards[card1Id].layers[card1Layer2Id].state
        ).toBe<LayerState>('idle');
        expect(useStore.getState().selectedLayers.length).toBe(1);
        expect(useStore.getState().selectedLayers).toEqual<SelectedLayer[]>([
          { cardId: card2Id, layerId: card2Layer1Id },
        ]);
      });
    });
  });
});
