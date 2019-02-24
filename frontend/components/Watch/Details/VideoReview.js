import { ThumbUp } from 'styled-icons/material/ThumbUp'
import { ThumbDown } from 'styled-icons/material/ThumbDown'
import { withApollo } from 'react-apollo'
import { VIDEO_QUERY } from '../../../apollo/video'
import { ME_QUERY } from '../../../apollo/me'
import { VideoReviewStyles, LikesRatioBar } from './styles/VideoReview'

class VideoReview extends React.Component {
  state = {
    review: null
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

  render() {
    const {
      props: { video }
    } = this
    const [likes, dislikes] = video.reviews.reduce(
      (acc, review) => {
        if (review.status === 'LIKE') acc[0]++
        else if (review.status === 'DISLIKE') acc[1]++
        return acc
      },
      [0, 0]
    )
    const percent = Math.round((likes / (likes + dislikes)) * 100)
    return (
      <VideoReviewStyles>
        <div className="thumbs-top">
          <div className="thumbs" onClick={() => this.onReviewClick('LIKE')}>
            <ThumbUp />
            <div>{likes}</div>
          </div>
          <div className="thumbs" onClick={() => onReviewClick('DISLIKE')}>
            <ThumbDown />
            <div>{dislikes}</div>
          </div>
        </div>
        <LikesRatioBar percent={percent}>
          <div className="bar" />
        </LikesRatioBar>
      </VideoReviewStyles>
    )
  }
}

export default withApollo(VideoReview)
