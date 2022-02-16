import { AppState } from '../../../types/appState';

export const defaultInitialState: AppState = {
  cards: {},
  currentTool: 'move',
  isDragging: false,
  selectedCards: [],
  selectedLayers: [],
};
