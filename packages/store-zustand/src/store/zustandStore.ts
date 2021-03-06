import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { AppState, LayerActions } from '../types';
import {
  addNewCard,
  addNewImageLayerViaFileInput,
  addNewImageLayerViaDragAndDrop,
  addTextLayerToCard,
  deleteSelectedCards,
  deleteSelectedLayers,
  deselectAll,
  onDragSelection,
  resizeSelectionFromSideLeft,
  resizeSelectionFromSideRight,
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
  setTextLayerStateToActiveEditingText,
  setTextLayerValue,
  setToolToMove,
  setToolToText,
  updateCardScreenPosition,
  resizeSelectionFromSideBottom,
  resizeSelectionFromSideTop,
  resizeSelectionFromCornerBottomRight,
  resizeSelectionFromCornerBottomLeft,
  resizeSelectionFromCornerTopRight,
  resizeSelectionFromCornerTopLeft,
} from '../actions';
import { generateCard } from '../generators';

const [cardId, emptyCard] = generateCard({
  sortOrderIndex: 0,
}).idWithData;

export const initialState: AppState = {
  cards: {
    [cardId]: emptyCard,
  },
  currentTool: 'move',
  fileResourceQueue: [],
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
export const selectFileResourceQueue = (state: AppState) =>
  state.fileResourceQueue;

export const actions: LayerActions = {
  addNewCard,
  addTextLayerToCard,
  addNewImageLayerViaFileInput,
  addNewImageLayerViaDragAndDrop,
  deleteSelectedCards,
  deleteSelectedLayers,
  deselectAll,
  onDragSelection,
  resizeSelectionFromCornerTopLeft,
  resizeSelectionFromCornerTopRight,
  resizeSelectionFromCornerBottomLeft,
  resizeSelectionFromCornerBottomRight,
  resizeSelectionFromSideTop,
  resizeSelectionFromSideBottom,
  resizeSelectionFromSideLeft,
  resizeSelectionFromSideRight,
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
  setTextLayerStateToActiveEditingText,
  setTextLayerValue,
  setToolToMove,
  setToolToText,
  updateCardScreenPosition,
};
