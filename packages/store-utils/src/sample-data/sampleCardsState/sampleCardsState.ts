import { Cards } from '../../types/appState/appState';

export const SAMPLE_CARDS: Cards = {
  qwerty: {
    autoAdvance: false,
    duration: 0,
    layers: {
      '234jfsdv': {
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
    autoAdvance: false,
    duration: 0,
    layers: {
      'abc-2-layer-1': {
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
