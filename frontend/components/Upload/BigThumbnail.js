import styled from 'styled-components'
import Loading from './Loading'

const Container = styled.div`
  width: 20rem;
  height: 11.25rem;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: ${props => (props.url ? 'transparent' : props.theme.grey[2])};
  background-image: ${props => (props.url ? `url("${props.url}")` : 'none')};
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px solid ${props => (props.url ? 'transparent' : props.theme.grey[5])};
  svg {
    display: ${props => (props.show ? 'none' : 'block')};
  }
`

const BigThumbnail = ({ showThumbnails, url }) => (
  <Container show={showThumbnails || url} url={url}>
    <Loading size={2} color={5} child={1} stop={showThumbnails || url} />
  </Container>
)

export default BigThumbnail
