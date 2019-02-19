import styled from 'styled-components'
import formatDistance from '../../../lib/formatDistance'

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  .user-name {
    font-family: 'Roboto Bold';
    margin-right: 0.5rem;
  }
  .user-created {
    color: ${props => props.theme.grey[10]};
    margin-right: 0.5rem;
    &:hover {
      color: ${props => props.theme.black[0]};
    }
  }
`

const NameAndDate = ({ comment }) => (
  <Container>
    <div className="user-name">{comment.user.name}</div>
    <div className="user-created">
      {formatDistance(comment.createdAt)} ago {comment.edited ? '(edited)' : ''}
    </div>
  </Container>
)

export default NameAndDate
