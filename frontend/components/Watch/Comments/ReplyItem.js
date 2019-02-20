import { withApollo } from 'react-apollo'
import { MoreVert } from 'styled-icons/material/MoreVert'
import { linkifyComment } from '../../../lib/linkify'
import CommentStyles from '../../styles/Comment'
import NameAndDate from './NameAndDate'
import CommentThumbs from './CommentThumbs'
import CommentMenu from './CommentMenu'
import {
  CREATE_COMMENT_REVIEW_MUTATION,
  UPDATE_COMMENT_REVIEW_MUTATION,
  DELETE_COMMENT_MUTATION
} from './CommentItem'

class ReplyItem extends React.Component {
  state = {
    height: 0,
    more: false,
    expand: false,
    popup: false,
    x: null,
    y: null,
    isAuthor: false,
    isOwner: false,
    moreVert: false
  }

  componentDidMount() {
    this.setReview()
    this.setHeight()
    this.setPopupCoordinates()
    this.setAuthor()
    this.setOwner()
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onMenuClose)
  }

  setReview = () => {
    const { user, comment } = this.props
    const review = user.commentReviews.find(r => r.comment.id === comment.id)
    this.setState({ review })
  }

  setHeight = () => {
    const height = this.comment.scrollHeight
    const more = height > 80
    this.setState({ height, more })
  }

  setPopupCoordinates = () => {
    const { offsetLeft: x, offsetTop: y } = this.anchor
    this.setState({ x, y })
  }

  setAuthor = () => {
    const { user, comment } = this.props
    this.setState({ isAuthor: user.id === comment.user.id })
  }

  setOwner = () => {
    const { user, video } = this.props
    this.setState({ isOwner: user.id === video.user.id })
  }

  onReviewClick = async status => {
    const {
      props: { comment, client, getComments },
      state: { review }
    } = this
    if (!review) {
      let res = await client.mutate({
        mutation: CREATE_COMMENT_REVIEW_MUTATION,
        variables: { id: comment.id, status }
      })
      let { success, review: newReview } = res.data.createCommentReview
      if (!success) {
        return // error creating comment review
      }
      await this.setState({ review: newReview })
      await getComments()
    } else {
      const newStatus = review.status === status ? 'NONE' : status
      let res = await client.mutate({
        mutation: UPDATE_COMMENT_REVIEW_MUTATION,
        variables: { id: review.id, status: newStatus }
      })
      let { success, review: updatedReview } = res.data.updateCommentReview
      if (!success) {
        return // error updating comment review
      }
      await this.setState({ review: updatedReview })
      await getComments()
    }
  }

  onMouseEnter = () => this.setState({ moreVert: true })

  onMouseLeave = () => this.setState({ moreVert: false })

  onMenuOpen = () => {
    this.setPopupCoordinates()
    this.setState({ popup: true })
    document.body.addEventListener('click', this.onMenuClose)
  }

  onMenuClose = () => {
    this.setState({ popup: false })
    document.body.removeEventListener('click', this.onMenuClose)
  }

  onDeleteComment = async () => {
    const {
      comment: { id },
      client,
      getComments
    } = this.props
    const res = await client.mutate({
      mutation: DELETE_COMMENT_MUTATION,
      variables: { id }
    })
    const { success } = res.data.deleteComment
    if (!success) {
      return // error deleting comment
    }
    await getComments()
  }

  toggleExpand = () => this.setState(({ expand }) => ({ expand: !expand }))

  render() {
    const {
      props: { comment, video },
      state: { height, more, expand, popup, x, y, isAuthor, isOwner, review, moreVert }
    } = this
    return (
      <CommentStyles
        height={height}
        more={more}
        expand={expand}
        img={2.4}
        moreVert={moreVert}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <img src={comment.user.image} />
        <div className="comment-main">
          <NameAndDate comment={comment} />
          <div
            ref={el => (this.comment = el)}
            className="text-row"
            dangerouslySetInnerHTML={{ __html: linkifyComment(comment.text, video) }}
          />
          {more ? (
            <div className="more-row" onClick={this.toggleExpand}>
              {expand ? 'Show less' : 'Read more'}
            </div>
          ) : null}
          <CommentThumbs
            reviews={comment.reviews}
            review={review}
            onReviewClick={this.onReviewClick}
          />
        </div>
        <div ref={el => (this.anchor = el)}>
          <MoreVert className="more-vert" onClick={this.onMenuOpen} />
        </div>
        <CommentMenu
          show={popup}
          x={x}
          y={y}
          isAuthor={isAuthor}
          isOwner={isOwner}
          onDeleteComment={this.onDeleteComment}
        />
      </CommentStyles>
    )
  }
}

export default withApollo(ReplyItem)
