import styled from 'styled-components'
import { darken } from 'polished'

const Container = styled.div`
  display: grid;
  grid-template-rows: 3rem 1fr;
  span {
    font-size: 1rem;
    justify-self: flex-end;
    margin-top: 1rem;
    margin-right: 1rem;
  }
`

const PublishButton = styled.button`
  width: 12rem;
  height: 3rem;
  border: 0;
  font-family: 'Roboto Bold';
  font-size: 1.1rem;
  background: ${props => darken(0.2, props.theme.secondary)};
  color: ${props => props.theme.white};
  border-radius: 2px;
  cursor: pointer;
`

const Publish = ({ videoID, draftSaved }) => (
  <Container>
    <PublishButton>Publish</PublishButton>
    <span>{!videoID ? '' : draftSaved ? 'Draft saved.' : 'Changes not saved.'}</span>
  </Container>
)

export default Publish
