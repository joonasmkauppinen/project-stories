import styled from '@emotion/styled';
import { t } from '@internal/i18n';
import { ResourcePayload } from '@joonasmkauppinen/project-stories/store-zustand';

interface InfoBoxProps {
  fileResourceQueue: ResourcePayload[];
}

const Container = styled.div({
  position: 'absolute',
  top: 170,
  left: '50%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: 1,
});

const InfoText = styled.p({
  backgroundColor: 'black',
  border: '1px solid #798681',
  borderRadius: 3,
  padding: 10,
  color: 'white',
  fontSize: 14,
  boxShadow: '0px 5px 8px 0px black',
  width: 'max-content',
});

export const InfoBox = ({ fileResourceQueue }: InfoBoxProps) => {
  if (fileResourceQueue.length === 0) {
    return null;
  }

  return (
    <Container>
      <InfoText>{t('infoTestSelectCardToPlaceMedia')}</InfoText>
    </Container>
  );
};
