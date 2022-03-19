import styled from '@emotion/styled';
import { useState } from 'react';

interface ContainerProps {
  active: boolean;
  width?: number;
}

const Container = styled.div<ContainerProps>(
  {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 2,
    ':hover': {
      border: 'solid 1px #696C6B',
    },
  },
  ({ active, width }) => ({
    width,
    border: active ? 'solid 1px #1DAEFF !important' : 'solid 1px transparent',
  })
);

interface IconWrapperProps {
  disabled: boolean;
}

const IconWrapper = styled.div<IconWrapperProps>(
  {
    width: 28,
    height: 28,
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ({ disabled }) => ({
    cursor: disabled ? 'default' : 'ew-resize',
    opacity: disabled ? 0.4 : 1,
  })
);

interface TextInputProps {
  active: boolean;
  readOnlyStyle: boolean;
}

const TextInput = styled.input<TextInputProps>(
  {
    all: 'unset',
    color: 'white',
    width: '100%',
    fontSize: 12,
    marginLeft: 2,
    userSelect: 'none',
  },
  ({ active, readOnlyStyle }) => ({
    cursor: active ? 'auto' : 'default',
    opacity: readOnlyStyle ? 0.4 : 1,
  })
);

interface PropertyInputProps {
  disabled?: boolean;
  renderIcon: JSX.Element;
  value: number;
  width?: number;
}

export const PropertyInput = ({
  value,
  renderIcon,
  width,
  disabled = false,
}: PropertyInputProps) => {
  const [active, setActive] = useState(false);

  return (
    <Container width={width} active={active}>
      <IconWrapper disabled={disabled}>{renderIcon}</IconWrapper>
      <TextInput
        readOnlyStyle={disabled === true}
        active={active}
        value={value}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        disabled={disabled}
      />
    </Container>
  );
};
