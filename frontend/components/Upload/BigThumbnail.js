import styled from 'styled-components'
import { Spinner7 as Spinner } from 'styled-icons/icomoon/Spinner7'
import { spin } from '../styles/animations'

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
    width: 2rem;
    height: 2rem;
    display: ${props => (props.show ? 'none' : 'block')};
    color: ${props => props.theme.grey[10]};
    animation: ${spin} 1s linear infinite;
  }
`

const BigThumbnail = ({ showThumbnails, url }) => (
  <Container show={showThumbnails} url={url}>
    <Spinner />
  </Container>
)

export default BigThumbnail
