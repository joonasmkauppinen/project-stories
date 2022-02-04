import styled from '@emotion/styled';
import { LayerType } from '@joonasmkauppinen/project-stories/store-zustand';

import { CardIcon } from './Icons/CardIcon';
import { ImageIcon } from './Icons/ImageIcon';
import { TextIcon } from './Icons/TextIcon';

interface LayerIconProps {
  name: LayerType | 'card';
}

const StyledContainer = styled.span({
  marginRight: 8,
});

// TODO: Get icon color from theme.
// TODO: Refactor to a single component instead of mulitple.
export const LayerIcon = ({ name }: LayerIconProps) => {
  switch (name) {
    case 'audio':
      // TODO: Add audio layer icon.
      return null;

    case 'card':
      return <CardIcon />;

    case 'image':
      return <ImageIcon />;

    case 'svg':
      // TODO: Add shape layer icon.
      return null;

    case 'text':
      return <TextIcon />;

    case 'video':
      // TODO: Add video layer icon.
      return null;

    default:
      return null;
  }
};
