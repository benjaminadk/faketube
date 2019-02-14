import styled from 'styled-components'
import { format } from 'date-fns'

const Container = styled.div`
  .title-row {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  .actions-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.grey[10]};
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid ${props => props.theme.grey[5]};
    .views {
      font-size: 1.6rem;
    }
    .actions {
      display: flex;
    }
  }
  .author-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    .author {
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
        }
        & > :last-child {
          font-size: 1.3rem;
          color: ${props => props.theme.grey[10]};
        }
      }
    }
    .subscribe {
      font-family: 'Roboto Bold';
      background: ${props => props.theme.primary};
      color: ${props => props.theme.white};
      text-transform: uppercase;
      padding: 1rem 1.5rem;
      border-radius: 2px;
      cursor: pointer;
    }
  }
`

class Details extends React.Component {
  state = {}

  render() {
    const {
      props: { video }
    } = this
    return (
      <Container>
        <div className="title-row">{video.title}</div>
        <div className="actions-row">
          <div className="views">
            {video.views.length} view{video.views.length === 1 ? '' : 's'}
          </div>
          <div className="actions">
            <div>like/dislike</div>
            <div>share</div>
            <div>save</div>
            <div>more</div>
          </div>
        </div>
        <div className="author-row">
          <div className="author">
            <img src={video.user.image} />
            <div className="author-info">
              <div>
                <div>{video.user.name}</div>
                <div>+</div>
              </div>
              <div>Published on {format(new Date(video.createdAt), 'MMM do, y')}</div>
            </div>
          </div>
          <div className="subscribe">Subscribe 50K</div>
        </div>
      </Container>
    )
  }
}

export default Details
