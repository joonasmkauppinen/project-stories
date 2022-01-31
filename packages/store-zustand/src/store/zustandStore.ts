import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { AppState, LayerActions } from '../types';
import {
  onDragSelection,
  setElementStateToActive,
  setElementStateToHovered,
  setElementStateToIdle,
  updateElementScreenPosition,
} from '../actions';
import { generateCard, generateLayer } from '../generators';

export const useStore = create<AppState>(
  devtools((_) => ({
    activeCards: [],
    cards: {
      ...generateCard({
        sortOrderIndex: 0,
        layers: {
          ...generateLayer({ type: 'text', sortOrderIndex: 0 }),
        },
      }),
    },
    hoveredCard: '',
    selection: [],
  }))
);

export const selectActiveCards = (state: AppState) => state.activeCards;
export const selectHoveredCard = (state: AppState) => state.hoveredCard;
export const selectCards = (state: AppState) => state.cards;
export const selectSelection = (state: AppState) => state.selection;

export const actions: LayerActions = {
  onDragSelection,
  setElementStateToActive,
  setElementStateToHovered,
  setElementStateToIdle,
  updateElementScreenPosition,
};
