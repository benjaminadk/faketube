import { MoreVert } from 'styled-icons/material/MoreVert'
import isEqual from 'lodash.isequal'
import { withApollo } from 'react-apollo'
import { CREATE_COMMENT_REVIEW_MUTATION } from '../../../apollo/createCommentReview'
import { UPDATE_COMMENT_REVIEW_MUTATION } from '../../../apollo/updateCommentReview'
import { DELETE_COMMENT_MUTATION } from '../../../apollo/deleteComment'
import { linkifyComment } from '../../../lib/linkify'
import NameDate from './NameDate'
import CommentReviews from './CommentReviews'
import CommentMenu from './CommentMenu'
import AddReply from './AddReply'
import ViewReplies from './ViewReplies'
import ReplyItem from './ReplyItem'
import { CommentItemStyles } from './styles/CommentItem'

class CommentItem extends React.Component {
  state = {
    height: 0,
    more: false,
    expand: false,
    popup: false,
    x: null,
    y: null,
    isAuthor: false,
    isOwner: false,
    replyInput: false,
    replies: false,
    moreVert: false
  }

  componentDidMount() {
    this.setReview()
    this.setHeight()
    this.setPopupCoordinates()
    this.setAuthor()
    this.setOwner()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.comment, this.props.comment)) {
      this.setReview()
    }
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

  onMouseEnter = () => this.setState({ moreVert: true })

  onMouseLeave = () => this.setState({ moreVert: false })

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

  onShowReplyInput = () => this.setState({ replyInput: true })

  onHideReplyInput = () => this.setState({ replyInput: false })

  toggleReplies = () => this.setState(({ replies }) => ({ replies: !replies }))

  render() {
    const {
      props: { video, comment, user, getComments },
      state: {
        height,
        more,
        expand,
        popup,
        x,
        y,
        isAuthor,
        isOwner,
        review,
        replyInput,
        replies,
        moreVert
      }
    } = this
    return (
      <CommentItemStyles
        height={height}
        more={more}
        expand={expand}
        img={4}
        moreVert={moreVert}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <img src={comment.user.image} />
        <div className="comment-main">
          <NameDate comment={comment} />
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
          <CommentReviews
            reviews={comment.reviews}
            review={review}
            onReviewClick={this.onReviewClick}
            onShowReplyInput={this.onShowReplyInput}
          />
          {replyInput ? (
            <AddReply
              commentId={comment.id}
              image={user.image}
              getComments={getComments}
              onHideReplyInput={this.onHideReplyInput}
            />
          ) : null}
          {comment.replies.length ? (
            <ViewReplies
              count={comment.replies.length}
              expand={replies}
              onClick={this.toggleReplies}
            />
          ) : null}
          {replies ? (
            <div className="comment-replies">
              {comment.replies
                .sort((a, b) => (b.createdAt >= a.createdAt ? 1 : -1))
                .map(r => (
                  <ReplyItem
                    key={r.id}
                    comment={r}
                    video={video}
                    user={user}
                    getComments={getComments}
                  />
                ))}
            </div>
          ) : null}
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
      </CommentItemStyles>
    )
  }
}

export default withApollo(CommentItem)
