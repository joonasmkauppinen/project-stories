import { Cards } from '@joonasmkauppinen/store-zustand';

export const SAMPLE_CARDS: Cards = {
  qwerty: {
    sortOrderIndex: 0,
    autoAdvance: false,
    duration: 0,
    layers: {
      '234jfsdv': {
        sortOrderIndex: 0,
        name: 'Text 1',
        type: 'text',
        state: 'idle',
        position: {
          x: 0,
          y: 100,
        },
        size: {
          height: 40,
          width: 150,
        },
      },
      fhds343hgfs: {
        sortOrderIndex: 1,
        name: 'Text 2',
        type: 'text',
        state: 'idle',
        position: {
          x: 50,
          y: 200,
        },
        size: {
          height: 40,
          width: 200,
        },
      },
      '2343rfjr3w': {
        sortOrderIndex: 2,
        name: 'Text 3',
        type: 'video',
        state: 'idle',
        position: {
          x: 100,
          y: 300,
        },
        size: {
          height: 40,
          width: 130,
        },
      },
    },
    name: 'Card 1',
    state: 'idle',
  },
  wasd: {
    sortOrderIndex: 1,
    autoAdvance: false,
    duration: 0,
    layers: {
      'abc-2-layer-1': {
        sortOrderIndex: 0,
        name: 'Layer in other card 1',
        type: 'image',
        state: 'idle',
        position: {
          x: 0,
          y: 0,
        },
        size: {
          height: 30,
          width: 100,
        },
      },
      'abc-2-layer-2': {
        sortOrderIndex: 1,
        name: 'Layer in other card 1',
        type: 'text',
        state: 'idle',
        position: {
          x: 0,
          y: 0,
        },
        size: {
          height: 30,
          width: 100,
        },
      },
    },
    name: 'Card 2',
    state: 'idle',
  },
};
