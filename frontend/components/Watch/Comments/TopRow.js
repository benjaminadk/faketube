import styled from 'styled-components'
import { Sort } from 'styled-icons/material/Sort'

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  margin-bottom: 3rem;
  .comments-sort {
    display: flex;
    align-items: center;
    color: ${props => props.theme.grey[10]};
    margin-left: 4rem;
    cursor: pointer;
    svg {
      width: 2rem;
      height: 2rem;
      color: inherit;
      margin-right: 0.5rem;
    }
    & > :last-child {
      font-family: 'Roboto Bold';
      font-size: 1.4rem;
      text-transform: uppercase;
    }
  }
`

const TopRow = ({ count }) => (
  <Container>
    <div>{count} Comments</div>
    <div className="comments-sort">
      <Sort />
      <div>sort by</div>
    </div>
  </Container>
)

export default TopRow
