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

const onAddSelection: OnAddSelection = ({ cardId, layerId }) =>
  useStore.setState(
    produce((draft: AppState) => {
      const state = useStore.getState();

      if (
        state.currentActiveCard !== cardId &&
        state.currentActiveCard !== null
      ) {
        draft.cards[state.currentActiveCard].state = 'idle';
        draft.currentActiveCard = cardId;
        draft.cards[cardId].state = 'active';
        draft.selection = [layerId];
        return;
      }

      if (state.currentActiveCard === null) {
        draft.currentActiveCard = cardId;
        draft.cards[cardId].state = 'active';
      }

      draft.selection.push(layerId);
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
  onMouseEnterLayer,
  onMouseLeaveLayer,
  onMouseEnterCard,
  onMouseLeaveCard,
  setCurrentActiveCard,
  setCardStateToActive,
  setCardStateToHovered,
  setCardStateToIdle,
};
