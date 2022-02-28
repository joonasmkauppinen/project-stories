import styled from '@emotion/styled';
import {
  isValidImageMimeType,
  LayerActions,
  Size,
} from '@joonasmkauppinen/project-stories/store-zustand';
import { ChangeEventHandler, useCallback, useRef } from 'react';
import { IconAddImage } from '../../IconButton/icons/IconAddImage';

const StyledLabel = styled.label({
  alignItems: 'center',
  borderColor: '#798681',
  borderRadius: 3,
  borderStyle: 'solid',
  borderWidth: 1,
  display: 'flex',
  height: 36,
  justifyContent: 'center',
  width: 36,
  ':hover': {
    backgroundColor: '#404040',
  },
});

interface AddImageButtonProps {
  actions: LayerActions;
}

export const AddImageButton = ({ actions }: AddImageButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange: ChangeEventHandler = useCallback(async () => {
    if (!inputRef.current) {
      return;
    }

    const currentFiles = inputRef.current.files;

    if (!currentFiles) {
      return;
    }

    console.log('Current files: ', currentFiles);
    const file = currentFiles[0];

    if (!isValidImageMimeType(file.type)) {
      return;
    }

    const src = URL.createObjectURL(file);
    const imgSize = new Promise<Size>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        resolve({ height: img.height, width: img.width });
      };
      img.onerror = () => {
        reject();
      };
    });

    try {
      actions.addNewImageLayerViaFileInput({
        resource: {
          fileName: file.name,
          mimeType: file.type,
          size: await imgSize,
          src,
        },
      });
      inputRef.current.files = null;
    } catch (error) {
      console.error('Failed to resolve selected image size.');
    }
  }, [actions]);

  return (
    <StyledLabel htmlFor="file-input">
      <IconAddImage fill="white" />
      <input
        id="file-input"
        ref={inputRef}
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </StyledLabel>
  );
};
