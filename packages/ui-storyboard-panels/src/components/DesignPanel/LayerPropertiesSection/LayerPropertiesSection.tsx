import styled from '@emotion/styled';
import { t } from '@internal/i18n';
import { IconPositionY } from './icons/IconPositionY';
import { IconWidth } from './icons/IconWidth';
import { IconPositionX } from './icons/IconPositionX';
import { PropertyInput } from '../PropertyInput/PropertyInput';
import { IconHeight } from './icons/IconHeight';
import { IconLayerAngle } from './icons/IconLayerAngle';
import { IconCornerRadius } from './icons/IconCornerRadius';
import { IconLayerPadding } from './icons/IconLayerPadding';
import { Layer } from '@joonasmkauppinen/project-stories/store-zustand';

const Container = styled.section({
  backgroundColor: '#292D2B',
  display: 'flex',
  flexDirection: 'column',
  borderBottom: 'solid 1px #4B5350',
  padding: 16,
});

const Label = styled.p({
  color: 'white',
  fontSize: 11,
  fontWeight: 'bold',
  marginBottom: 16,
  userSelect: 'none',
});

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  marginBottom: 8,
});

interface LayerPropertiesSectionProps {
  activeLayers: Layer[];
}

export const LayerPropertiesSection = ({
  activeLayers,
}: LayerPropertiesSectionProps) => {
  if (activeLayers.length === 0) {
    return null;
  }

  if (activeLayers.length === 1) {
    const layer = activeLayers[0];

    return (
      <Container>
        <Label>{t('panelDesignLayerPropertiesLabel')}</Label>
        <Row>
          <PropertyInput
            renderIcon={<IconPositionX />}
            value={layer.position.x}
            width={90}
          />
          <PropertyInput
            renderIcon={<IconPositionY />}
            value={layer.position.y}
            width={90}
          />
        </Row>
        <Row>
          <PropertyInput
            renderIcon={<IconWidth />}
            value={layer.size.width}
            width={90}
          />
          <PropertyInput
            renderIcon={<IconHeight />}
            value={layer.size.height}
            width={90}
            disabled={layer.type === 'text'}
          />
        </Row>
        <Row>
          <PropertyInput renderIcon={<IconLayerAngle />} value={0} width={90} />
        </Row>
        <Row>
          <PropertyInput
            renderIcon={<IconLayerPadding />}
            value={0}
            width={90}
          />
          <PropertyInput
            renderIcon={<IconCornerRadius />}
            value={0}
            width={90}
          />
        </Row>
      </Container>
    );
  }

  return null;
};
