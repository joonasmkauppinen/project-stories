import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { AppState, LayerActions } from '../types';
import {
  addNewCard,
  deselectAll,
  onDragSelection,
  selectCard,
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
          ...generateLayer({
            type: 'text',
            sortOrderIndex: 0,
            position: { x: 50, y: 100 },
          }),
          ...generateLayer({
            type: 'text',
            sortOrderIndex: 1,
            position: { x: 50, y: 150 },
          }),
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
  addNewCard,
  deselectAll,
  onDragSelection,
  selectCard,
  setElementStateToActive,
  setElementStateToHovered,
  setElementStateToIdle,
  updateElementScreenPosition,
};
