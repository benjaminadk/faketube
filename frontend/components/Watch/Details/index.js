import styled from 'styled-components'
import { format } from 'date-fns'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Thumbs from './Thumbs'
import ShareButton from './ShareButton'
import ShareModal from './ShareModal'
import Description from './Description'
import { VIDEO_QUERY } from '../../../apollo/video'
import { ME_QUERY } from '../../../apollo/me'

const CREATE_REVIEW_MUTATION = gql`
  mutation CREATE_REVIEW_MUTATION($id: ID!, $status: ReviewStatus) {
    createReview(id: $id, status: $status) {
      success
      review {
        id
        status
      }
    }
  }
`

const UPDATE_REVIEW_MUTATION = gql`
  mutation UPDATE_REVIEW_MUTATION($id: ID!, $status: ReviewStatus) {
    updateReview(id: $id, status: $status) {
      success
      review {
        id
        status
      }
    }
  }
`

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
    margin-bottom: 2rem;
    border-bottom: 1px solid ${props => props.theme.grey[2]};
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
  state = {
    review: null,
    shareModal: false
  }

  componentDidMount() {
    this.setReview()
  }

  setReview = () => {
    const {
      props: { video, user }
    } = this
    const review = user.reviews.find(r => r.video.id === video.id)
    this.setState({ review })
  }

  onReviewClick = async status => {
    const {
      props: { video, client },
      state: { review }
    } = this
    if (!review) {
      let res = await client.mutate({
        mutation: CREATE_REVIEW_MUTATION,
        variables: { id: video.id, status },
        refetchQueries: [{ query: VIDEO_QUERY, variables: { id: video.id } }, { query: ME_QUERY }]
      })
      let { success, review: newReview } = res.data.createReview
      if (!success) {
        return // error creating review
      }
      this.setState({ review: newReview })
    } else {
      const newStatus = review.status === status ? 'NONE' : status
      let res = await client.mutate({
        mutation: UPDATE_REVIEW_MUTATION,
        variables: { id: review.id, status: newStatus },
        refetchQueries: [{ query: VIDEO_QUERY, variables: { id: video.id } }, { query: ME_QUERY }]
      })
      let { success, review: updatedReview } = res.data.updateReview
      if (!success) {
        return // error updating review
      }
      this.setState({ review: updatedReview })
    }
  }

  onShowShareModal = () => this.setState({ shareModal: true })

  onHideShareModal = () => this.setState({ shareModal: false })

  render() {
    const {
      props: { video, time },
      state: { shareModal }
    } = this
    return (
      <Container>
        <div className="title-row">{video.title}</div>
        <div className="actions-row">
          <div className="views">
            {video.views.length} view{video.views.length === 1 ? '' : 's'}
          </div>
          <div className="actions">
            <Thumbs video={video} onClick={this.onReviewClick} />
            <ShareButton onClick={this.onShowShareModal} />
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
        <Description video={video} />
        <ShareModal show={shareModal} video={video} time={time} onClose={this.onHideShareModal} />
      </Container>
    )
  }
}

export default withApollo(Details)
