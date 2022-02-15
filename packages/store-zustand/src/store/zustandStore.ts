import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { AppState, LayerActions } from '../types';
import {
  addNewCard,
  addTextLayerToCard,
  deleteSelectedLayers,
  deselectAll,
  onDragSelection,
  selectCard,
  setElementStateToActive,
  setElementStateToHovered,
  setElementStateToIdle,
  setIsDraggingToFalse,
  setIsDraggingToTrue,
  setToolToMove,
  setToolToText,
  updateElementScreenPosition,
} from '../actions';
import { generateCard, generateLayer } from '../generators';

const { layerId, layerData } = generateLayer({
  type: 'text',
  sortOrderIndex: 0,
  top: 100,
});
const { layerId: layerId2, layerData: layerData2 } = generateLayer({
  type: 'text',
  sortOrderIndex: 1,
  top: 150,
});

const sampleLayers = {
  [layerId]: layerData,
  [layerId2]: layerData2,
};

export const useStore = create<AppState>(
  devtools((_) => ({
    cards: {
      ...generateCard({
        sortOrderIndex: 0,
        layers: sampleLayers,
      }),
    },
    currentTool: 'move',
    selection: [],
    isDragging: false,
  }))
);

export const selectCards = (state: AppState) => state.cards;
export const selectSelection = (state: AppState) => state.selection;
export const selectCurrentTool = (state: AppState) => state.currentTool;
export const selectIsDragging = (state: AppState) => state.isDragging;

export const actions: LayerActions = {
  addNewCard,
  addTextLayerToCard,
  deleteSelectedLayers,
  deselectAll,
  onDragSelection,
  selectCard,
  setElementStateToActive,
  setElementStateToHovered,
  setElementStateToIdle,
  setIsDraggingToFalse,
  setIsDraggingToTrue,
  setToolToMove,
  setToolToText,
  updateElementScreenPosition,
};
