import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { MoreHoriz } from 'styled-icons/material/MoreHoriz'
import Thumbs from './Thumbs'
import ShareButton from './ShareButton'
import ShareModal from './ShareModal'
import SaveButton from './SaveButton'
import CreatedBy from './CreatedBy'
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
      .more-horiz {
        width: 2rem;
        height: 2rem;
        color: ${props => props.theme.grey[8]};
        cursor: pointer;
      }
    }
  }
  .author-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
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
    shareModal: false,
    playlistModal: false
  }

  componentDidMount() {
    this.setReview()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.video.id !== this.props.video.id) {
      this.setReview()
    }
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

  onShowPlaylistModal = () => this.setState({ playlistModal: true })

  onHidePlaylistModal = () => this.setState({ playlistModal: false })

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
            <SaveButton onClick={this.onShowPlaylistModal} />
            <MoreHoriz className="more-horiz" />
          </div>
        </div>
        <div className="author-row">
          <CreatedBy video={video} />
          <div className="subscribe">Subscribe 50K</div>
        </div>
        <Description video={video} />
        <ShareModal show={shareModal} video={video} time={time} onClose={this.onHideShareModal} />
      </Container>
    )
  }
}

export default withApollo(Details)
