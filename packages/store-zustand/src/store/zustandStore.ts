import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import {
  SAMPLE_CARDS,
  LayerActions,
  AppState,
  OnDragSelection,
  SetElementStateToActive,
  SetElementStateToHovered,
  SetElementStateToIdle,
  UpdateElementScreenPosition,
} from '@joonasmkauppinen/store-utils';

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

const onDragSelection: OnDragSelection = ({ movementX, movementY }) =>
  useStore.setState(
    produce((draft: AppState) => {
      const state = useStore.getState();

      state.selection.forEach(({ parentId, id }) => {
        if (parentId) {
          draft.cards[parentId].layers[id].position.x += movementX;
          draft.cards[parentId].layers[id].position.y += movementY;

          Object.entries(draft.cards[parentId].layers).forEach(
            ([layerId, layer]) => {
              if (layerId === id && layer.screenPosition) {
                layer.screenPosition.x += movementX;
                layer.screenPosition.y += movementY;
              }
            }
          );
        }
      });
    })
  );

const setElementStateToActive: SetElementStateToActive = ({
  id,
  parentId,
  isShiftKey,
}) =>
  useStore.setState(
    produce((draft: AppState) => {
      const state = useStore.getState();

      // Only a card element was clicked. Remove layer selections.
      if (!parentId) {
        state.selection.forEach(({ id, parentId }) => {
          if (parentId) {
            draft.cards[parentId].layers[id].state = 'idle';
          } else {
            draft.cards[id].state = 'idle';
          }
        });
        draft.cards[id].state = 'active';
        draft.selection = [{ id }];
        return;
      }

      // Clear current multi selection if shift is not pressed and there are selections.
      if (!isShiftKey && state.selection.length > 0 && parentId) {
        state.selection.forEach(({ id, parentId }) => {
          if (parentId) {
            draft.cards[parentId].layers[id].state = 'idle';
          }
        });
        draft.selection = [{ id, parentId }];
      }

      if (parentId) {
        if (state.cards[parentId].state !== 'active') {
          draft.cards[parentId].state = 'active';
        }
        draft.cards[parentId].layers[id].state = 'active';
        draft.selection.push({ id, parentId });
      }
    })
  );

const setElementStateToHovered: SetElementStateToHovered = ({ id, parentId }) =>
  useStore.setState(
    produce((draft: AppState) => {
      const state = useStore.getState();

      if (parentId) {
        if (state.cards[parentId].state === 'idle') {
          draft.cards[parentId].state = 'hovered';
        }
        draft.cards[parentId].layers[id].state = 'hovered';
      } else {
        draft.cards[id].state = 'hovered';
      }
    })
  );

const setElementStateToIdle: SetElementStateToIdle = ({ id, parentId }) =>
  useStore.setState(
    produce((draft: AppState) => {
      const state = useStore.getState();

      if (parentId) {
        // if (state.cards[parentId].state === 'hovered') {
        //   draft.cards[parentId].state = 'idle';
        // }
        draft.cards[parentId].layers[id].state = 'idle';
      } else {
        if (state.cards[id].state === 'hovered') {
          draft.cards[id].state = 'idle';
        }
      }
    })
  );

const updateElementScreenPosition: UpdateElementScreenPosition = ({
  id,
  parentId,
  position,
}) =>
  useStore.setState(
    produce((draft: AppState) => {
      if (parentId) {
        draft.cards[parentId].layers[id].screenPosition = position;
      } else {
        draft.cards[id].screenPosition = position;
      }
    })
  );

export const actions: LayerActions = {
  onDragSelection,
  setElementStateToActive,
  setElementStateToHovered,
  setElementStateToIdle,
  updateElementScreenPosition,
};
