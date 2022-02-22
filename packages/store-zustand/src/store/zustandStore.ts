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
  resizeLayerFromSideLeft,
  resizeLayerFromSideRight,
  setCardStateToActive,
  setCardStateToHovered,
  setCardStateToIdle,
  setIsDraggingToFalse,
  setIsDraggingToTrue,
  setIsEditingTextToFalse,
  setIsEditingTextToTrue,
  setLayerHeight,
  setLayerStateToActive,
  setLayerStateToHovered,
  setLayerStateToIdle,
  setToolToMove,
  setToolToText,
  updateCardScreenPosition,
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
  userInteraction: {
    isDragging: false,
    isEditingText: false,
  },
};

export const useStore = create<AppState>(devtools((_) => initialState));

export const selectCards = (state: AppState) => state.cards;
export const selectCurrentTool = (state: AppState) => state.currentTool;
export const selectUserInteraction = (state: AppState) => state.userInteraction;
export const selectSelectedCards = (state: AppState) => state.selectedCards;
export const selectSelectedLayers = (state: AppState) => state.selectedLayers;

export const actions: LayerActions = {
  addNewCard,
  addTextLayerToCard,
  deleteSelectedCards,
  deleteSelectedLayers,
  deselectAll,
  onDragSelection,
  resizeLayerFromSideLeft,
  resizeLayerFromSideRight,
  setCardStateToActive,
  setCardStateToHovered,
  setCardStateToIdle,
  setIsDraggingToFalse,
  setIsDraggingToTrue,
  setIsEditingTextToFalse,
  setIsEditingTextToTrue,
  setLayerHeight,
  setLayerStateToActive,
  setLayerStateToHovered,
  setLayerStateToIdle,
  setToolToMove,
  setToolToText,
  updateCardScreenPosition,
};
