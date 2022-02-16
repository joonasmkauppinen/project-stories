import { AppState } from '../../types/appState';
import { initialState } from '../../store/zustandStore';

/**
 * Same as the real `initialState`, but the `cards`object is set to empty
 * object.
 */
export const testInitialState: AppState = {
  ...initialState,
  cards: {},
};
