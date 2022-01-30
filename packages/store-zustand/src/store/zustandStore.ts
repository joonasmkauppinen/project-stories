import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { SAMPLE_CARDS } from '../sample-data/sampleCardsState/sampleCardsState';

import { AppState, LayerActions } from '../types';
import {
  onDragSelection,
  setElementStateToActive,
  setElementStateToHovered,
  setElementStateToIdle,
  updateElementScreenPosition,
} from '../actions';

export const useStore = create<AppState>(
  devtools((_) => ({
    activeCards: [],
    cards: { ...SAMPLE_CARDS },
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
