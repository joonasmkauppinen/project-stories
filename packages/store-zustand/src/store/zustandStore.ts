import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import {
  SAMPLE_CARDS,
  LayerActions,
  SetCurrentActiveCard,
  OnMouseLeaveLayer,
  OnMouseEnterLayer,
  OnAddSelection,
  AppState,
  SetCardStateToActive,
  SetCardStateToHovered,
  SetCardStateToIdle,
  OnMouseEnterCard,
  OnMouseLeaveCard,
  OnDragSelection,
} from '@joonasmkauppinen/store-utils';

export const useStore = create<AppState>(
  devtools((_) => ({
    currentActiveCard: null,
    cards: { ...SAMPLE_CARDS },
    selection: [],
  }))
);

export const selectCurrentActiveCard = (state: AppState) =>
  state.currentActiveCard;
export const selectCards = (state: AppState) => state.cards;
export const selectSelection = (state: AppState) => state.selection;

const onAddSelection: OnAddSelection = ({ selectionItem, shiftKey }) =>
  useStore.setState(
    produce((draft: AppState) => {
      if (shiftKey) {
        draft.selection.push(selectionItem);
        return;
      }

      draft.selection = [selectionItem];
    })
  );

const onDragSelection: OnDragSelection = ({ movementX, movementY }) =>
  useStore.setState(
    produce((draft: AppState) => {
      draft.selection.forEach(({ parentId, id, position }) => {
        //TODO: Remove this hack and derive selection position from cards state.
        position.x += movementX;
        position.y += movementY;

        if (parentId) {
          draft.cards[parentId].layers[id].position.x += movementX;
          draft.cards[parentId].layers[id].position.y += movementY;
        }
      });
    })
  );

const setCurrentActiveCard: SetCurrentActiveCard = ({ cardId }) =>
  useStore.setState(() => ({ currentActiveCard: cardId }));

const setCardStateToActive: SetCardStateToActive = ({
  cardId: cardIdToUpdate,
}) =>
  useStore.setState(
    produce((draft: AppState) => {
      const state = useStore.getState();
      if (state.cards[cardIdToUpdate].state === 'hovered') {
        for (const cardId in state.cards) {
          if (cardId === cardIdToUpdate) {
            draft.cards[cardId].state = 'active';
          } else {
            draft.cards[cardId].state = 'idle';
          }
        }
      }
    })
  );

const setCardStateToHovered: SetCardStateToHovered = ({ cardId }) =>
  useStore.setState(
    produce((draft: AppState) => {
      draft.cards[cardId].state = 'hovered';
    })
  );

const setCardStateToIdle: SetCardStateToIdle = ({ cardId }) =>
  useStore.setState(
    produce((draft: AppState) => {
      const state = useStore.getState();

      if (state.cards[cardId].state !== 'active') {
        draft.cards[cardId].state = 'idle';
      }
    })
  );

const onMouseEnterLayer: OnMouseEnterLayer = ({ cardId, layerId }) =>
  useStore.setState(
    produce((draft: AppState) => {
      draft.cards[cardId].layers[layerId].state = 'hovered';
    })
  );

const onMouseLeaveLayer: OnMouseLeaveLayer = ({ cardId, layerId }) =>
  useStore.setState(
    produce((draft: AppState) => {
      draft.cards[cardId].layers[layerId].state = 'idle';
    })
  );

const onMouseEnterCard: OnMouseEnterCard = ({ cardId }) =>
  useStore.setState(
    produce((draft: AppState) => {
      const state = useStore.getState();
      if (state.cards[cardId].state === 'idle') {
        draft.cards[cardId].state = 'hovered';
      }
    })
  );

const onMouseLeaveCard: OnMouseLeaveCard = ({ cardId }) =>
  useStore.setState(
    produce((draft: AppState) => {
      const state = useStore.getState();
      if (state.cards[cardId].state === 'hovered') {
        draft.cards[cardId].state = 'idle';
      }
    })
  );

export const actions: LayerActions = {
  onAddSelection,
  onDragSelection,
  onMouseEnterLayer,
  onMouseLeaveLayer,
  onMouseEnterCard,
  onMouseLeaveCard,
  setCurrentActiveCard,
  setCardStateToActive,
  setCardStateToHovered,
  setCardStateToIdle,
};
