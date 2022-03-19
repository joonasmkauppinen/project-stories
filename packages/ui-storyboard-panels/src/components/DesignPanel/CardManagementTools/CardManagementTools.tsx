import styled from '@emotion/styled';

import { IconButton } from '../IconButton/IconButton';
import { IconAddNewCard } from './icons/IconAddNewCard';
import { IconDelete } from './icons/IconDelete';
import { IconDuplicateCard } from './icons/IconDuplicateCard';
import { IconMoveLeft } from './icons/IconMoveLeft';
import { IconMoveRight } from './icons/IconMoveRight';

import { IconPlayAnimations } from './icons/IconPlayAnimations';

const ContainerSection = styled.section({
  backgroundColor: '#292D2B',
  display: 'flex',
  flexDirection: 'column',
  borderBottom: 'solid 1px #4B5350',
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 8,
  paddingBottom: 8,
});

const ButtonsWrapperDiv = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const CardManagementTools = () => {
  return (
    <ContainerSection>
      <ButtonsWrapperDiv>
        <IconButton>
          <IconPlayAnimations />
        </IconButton>
        <IconButton>
          <IconMoveLeft />
        </IconButton>
        <IconButton>
          <IconMoveRight />
        </IconButton>
        <IconButton>
          <IconDuplicateCard />
        </IconButton>
        <IconButton>
          <IconAddNewCard />
        </IconButton>
        <IconButton>
          <IconDelete />
        </IconButton>
      </ButtonsWrapperDiv>
    </ContainerSection>
  );
};
