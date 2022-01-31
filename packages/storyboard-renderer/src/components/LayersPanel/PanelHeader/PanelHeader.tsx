import styled from '@emotion/styled';
import { t } from '../../../utils/translations';

// TODO: Get style values from theme
const StyledDiv = styled.div({
  borderBottom: '1px solid #555e5a',
  color: 'white',
  fontSize: 11,
  fontWeight: 'bold',
  padding: '20px 16px',
  textTransform: 'uppercase',
});

export const PanelHeader = () => {
  return <StyledDiv>{t('layers')}</StyledDiv>;
};