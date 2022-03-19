import styled from '@emotion/styled';

import { IconButton } from '../IconButton/IconButton';

import { IconAlignBottom } from './icons/IconAlignBottom';
import { IconAlignHorizontalCenter } from './icons/IconAlignHorizontalCenter';
import { IconAlignLeft } from './icons/IconAlignLeft';
import { IconAlignRight } from './icons/IconAlignRight';
import { IconAlignTop } from './icons/IconAlignTop';
import { IconAlignVerticalCenter } from './icons/IconAlignVerticalCenter';

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

export const LayerAlignmentTools = () => {
  return (
    <ContainerSection>
      <ButtonsWrapperDiv>
        <IconButton>
          <IconAlignLeft />
        </IconButton>
        <IconButton>
          <IconAlignHorizontalCenter />
        </IconButton>
        <IconButton>
          <IconAlignRight />
        </IconButton>
        <IconButton>
          <IconAlignTop />
        </IconButton>
        <IconButton>
          <IconAlignVerticalCenter />
        </IconButton>
        <IconButton>
          <IconAlignBottom />
        </IconButton>
      </ButtonsWrapperDiv>
    </ContainerSection>
  );
};
