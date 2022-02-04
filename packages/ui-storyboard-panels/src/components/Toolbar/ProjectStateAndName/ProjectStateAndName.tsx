import styled from '@emotion/styled';

const Container = styled.section({
  display: 'flex',
  flexDirection: 'row',
  alignSelf: 'stretch',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
});

const ProjectState = styled.p({
  fontSize: 12,
  color: '#A3A4A3',
  fontWeight: '500',
  textTransform: 'uppercase',
  margin: 0,
});

const ProjectName = styled.p({
  fontSize: 13,
  color: '#ffffff',
  fontWeight: '500',
  margin: 0,
});

export const ProjectStateAndName = () => {
  return (
    <Container>
      <ProjectState>draft /&nbsp;</ProjectState>
      <ProjectName>Demo Project</ProjectName>
    </Container>
  );
};
