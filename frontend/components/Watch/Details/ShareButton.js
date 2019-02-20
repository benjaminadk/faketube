import styled from 'styled-components'
import { Reply } from 'styled-icons/material/Reply'

export const Container = styled.div`
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
    margin-right: 1rem;
  }
  svg.reply {
    transform: rotateY(180deg);
  }
  & > :last-child {
    text-transform: uppercase;
    font-family: 'Roboto Bold';
    font-size: 1.3rem;
  }
`

export default ({ onClick }) => (
  <Container onClick={onClick}>
    <Reply className="reply" />
    <div>share</div>
  </Container>
)
