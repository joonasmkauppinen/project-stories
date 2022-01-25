import styled from '@emotion/styled';
import { Card, OnHoverCallback } from '../../types/EditorCanvas';
import { CardItem } from '../CardItem/CardItem';

/* eslint-disable-next-line */
export interface CardItemProps {
  state: Card;
  onHover: OnHoverCallback;
}

export const CardSection = ({ state, onHover }: CardItemProps) => {
  const { layers, id } = state;

  return <CardItem onHover={onHover} id={id} layers={layers} />;
};
