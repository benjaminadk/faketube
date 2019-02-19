import styled from 'styled-components'
import { KeyboardArrowUp } from 'styled-icons/material/KeyboardArrowUp'
import { KeyboardArrowDown } from 'styled-icons/material/KeyboardArrowDown'

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.black[0]};
  cursor: pointer;
  margin-bottom: 1rem;
  & > :first-child {
    font-family: 'Roboto Bold';
    font-size: 1.3rem;
  }
  svg {
    width: 2rem;
    height: 2rem;
  }
`

const ViewReplies = ({ count, expand, onClick }) => (
  <Container onClick={onClick}>
    <div>
      {expand ? 'Hide' : 'View'}
      {expand ? ` ` : ` ${count} `}repl{count === 1 ? 'y' : 'ies'}
    </div>
    {expand ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
  </Container>
)

export default ViewReplies
