import styled from '@emotion/styled';
import React, { MouseEvent, MouseEventHandler } from 'react';
import { CardLayer, OnHoverCallback } from '../../types';
import { hoverStyles } from '../../styles/hoverStyle';

/* eslint-disable-next-line */
export interface CardItemProps {
  layers: CardLayer[];
  id: string;
  onHover: OnHoverCallback;
}

const StyledCardItem = styled.div({
  backgroundColor: 'white',
  width: 360,
  height: 640,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 50,
  borderRadius: 4,
});

const StyledH1 = styled.h1(hoverStyles);

export const CardItem = ({ layers, id, onHover }: CardItemProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  // const handleOnHover = (
  //   event: React.MouseEvent<
  //     HTMLHeadingElement | HTMLDivElement,
  //     globalThis.MouseEvent
  //   >,
  //   id: string,
  //   parentId?: string
  // ) => {
  //   event.stopPropagation();
  // };

  const handler: MouseEventHandler = (event) => {
    console.log('Handler called...');
  };

  return (
    <StyledCardItem id={id}>
      {layers.map((layer) => (
        <StyledH1
          onMouseEnter={() => console.log('onMouseEnter')}
          onMouseLeave={() => console.log('onMouseLeave')}
          id={layer.id}
          key={`card-layer-${layer.id}`}
        >
          {layer.type}
        </StyledH1>
      ))}
    </StyledCardItem>
  );
};
