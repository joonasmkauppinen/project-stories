import styled from '@emotion/styled';
import { t } from '@internal/i18n';

const ContainerDiv = styled.div({
  backgroundColor: '#292D2B',
  fontSize: 10,
  height: 40,
  padding: 16,
  fontWeight: 'bold',
  color: 'white',
  textTransform: 'uppercase',
  borderBottom: 'solid 1px #4B5350',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const PanelHeader = () => {
  return <ContainerDiv>{t('panelDesignHeaderLabel')}</ContainerDiv>;
};
