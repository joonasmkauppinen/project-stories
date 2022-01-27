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
      },
      fhds343hgfs: {
        type: 'text',
        state: 'idle',
        position: {
          x: 50,
          y: 200,
        },
      },
      '2343rfjr3w': {
        type: 'video',
        state: 'idle',
        position: {
          x: 100,
          y: 300,
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
      },
      'abc-2-layer-2': {
        type: 'text',
        state: 'idle',
        position: {
          x: 0,
          y: 0,
        },
      },
    },
    name: 'Card 2',
    state: 'idle',
  },
};
