import { AppState } from '../../types/appState';

export const defaultInitialState: AppState = {
  cards: {},
  currentTool: 'move',
  selectedCards: [],
  selectedLayers: [],
  fileResourceQueue: [],
  userInteraction: {
    isDragging: false,
    isEditingText: false,
  },
};
