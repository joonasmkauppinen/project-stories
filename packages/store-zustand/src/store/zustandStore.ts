import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { AppState, LayerActions } from '../types';
import {
  addNewCard,
  addTextLayerToCard,
  deleteSelectedCards,
  deleteSelectedLayers,
  deselectAll,
  onDragSelection,
  setCardStateToActive,
  setCardStateToHovered,
  setCardStateToIdle,
  setIsDraggingToFalse,
  setIsDraggingToTrue,
  setLayerStateToActive,
  setLayerStateToHovered,
  setLayerStateToIdle,
  setToolToMove,
  setToolToText,
  updateElementScreenPosition,
} from '../actions';
import { generateCard } from '../generators';

const [cardId, emptyCard] = generateCard({ sortOrderIndex: 0 }).idWithData;

export const initialState: AppState = {
  cards: {
    [cardId]: emptyCard,
  },
  currentTool: 'move',
  selectedCards: [],
  selectedLayers: [],
  isDragging: false,
};

export const useStore = create<AppState>(devtools((_) => initialState));

export const selectCards = (state: AppState) => state.cards;
export const selectCurrentTool = (state: AppState) => state.currentTool;
export const selectIsDragging = (state: AppState) => state.isDragging;
export const selectSelectedCards = (state: AppState) => state.selectedCards;
export const selectSelectedLayers = (state: AppState) => state.selectedLayers;

export const actions: LayerActions = {
  addNewCard,
  addTextLayerToCard,
  deleteSelectedLayers,
  deleteSelectedCards,
  deselectAll,
  onDragSelection,
  setLayerStateToActive,
  setLayerStateToHovered,
  setLayerStateToIdle,
  setCardStateToIdle,
  setCardStateToActive,
  setCardStateToHovered,
  setIsDraggingToFalse,
  setIsDraggingToTrue,
  setToolToMove,
  setToolToText,
  updateElementScreenPosition,
};
