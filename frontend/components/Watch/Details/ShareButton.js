import styled from 'styled-components'
import { Reply } from 'styled-icons/material/Reply'

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.grey[8]};
  padding-bottom: 2rem;
  margin-right: 2rem;
  svg {
    width: 2rem;
    height: 2rem;
    color: inherit;
    transform: rotateY(180deg);
    margin-right: 1rem;
  }
  & > :last-child {
    text-transform: uppercase;
    font-family: 'Roboto Bold';
    font-size: 1.3rem;
  }
`

const ShareButton = ({ onClick }) => (
  <Container onClick={onClick}>
    <Reply />
    <div>share</div>
  </Container>
)

export default ShareButton
