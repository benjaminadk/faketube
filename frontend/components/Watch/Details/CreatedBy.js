import styled from 'styled-components'
import { CheckCircle } from 'styled-icons/boxicons-solid/CheckCircle'
import { format } from 'date-fns'

const Container = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
  .author-info {
    & > :first-child {
      display: flex;
      font-family: 'Roboto Bold';
      font-size: 1.4rem;
      margin-bottom: 0.25rem;
      svg {
        width: 1.5rem;
        height: 1.5rem;
        color: ${props => props.theme.grey[10]};
        margin-left: 0.5rem;
      }
    }
    & > :last-child {
      font-size: 1.3rem;
      color: ${props => props.theme.grey[10]};
    }
  }
`

export default ({ video }) => (
  <Container>
    <img src={video.user.image} />
    <div className="author-info">
      <div>
        <div>{video.user.name}</div>
        {video.user.verified ? <CheckCircle /> : null}
      </div>
      <div>Published on {format(new Date(video.createdAt), 'MMM do, y')}</div>
    </div>
  </Container>
)
