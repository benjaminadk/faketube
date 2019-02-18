import styled from 'styled-components'
import { darken } from 'polished'
import { MoreVert } from 'styled-icons/material/MoreVert'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import isEqual from 'lodash.isequal'
import formatDistance from '../../../lib/formatDistance'
import { linkifyComment } from '../../../lib/linkify'
import CommentThumbs from './CommentThumbs'
import CommentMenu from './CommentMenu'

const CREATE_COMMENT_REVIEW_MUTATION = gql`
  mutation CREATE_COMMENT_REVIEW_MUTATION($id: ID!, $status: ReviewStatus) {
    createCommentReview(id: $id, status: $status) {
      success
      review {
        id
      }
    }
  }
`

const UPDATE_COMMENT_REVIEW_MUTATION = gql`
  mutation UPDATE_COMMENT_REVIEW_MUTATION($id: ID!, $status: ReviewStatus) {
    updateCommentReview(id: $id, status: $status) {
      success
      review {
        id
      }
    }
  }
`

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 4rem 1fr 2.5rem;
  grid-gap: 2rem;
  margin-bottom: 2rem;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  .comment-main {
    .user-row {
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
    }
    .text-row {
      max-height: ${props => (props.expand ? '100%' : '8rem')};
      overflow: hidden;
      font-size: 1.4rem;
      line-height: 2rem;
      margin-bottom: ${props => (props.more ? '0rem' : '1rem')};
      white-space: pre-wrap;
      a {
        color: ${props => darken(0.2, props.theme.secondary)};
      }
    }
    .more-row {
      font-family: 'Roboto Bold';
      font-size: 1.3rem;
      margin-bottom: 1rem;
      cursor: pointer;
    }
  }
  .more-vert {
    width: 2.5rem;
    height: 2.5rem;
    display: none;
    color: ${props => props.theme.grey[8]};
    margin-top: 1rem;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.grey[10]};
    }
  }

  &:hover .more-vert {
    display: block;
  }
`

class CommentItem extends React.Component {
  state = {
    height: 0,
    more: false,
    expand: false,
    popup: false,
    x: null,
    y: null,
    isAuthor: false,
    isOwner: false
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

  onReviewClick = async status => {
    const {
      props: { comment, client },
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
      await this.props.getComments()
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
      await this.props.getComments()
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

  toggleExpand = () => this.setState(({ expand }) => ({ expand: !expand }))

  render() {
    const {
      props: { video, comment },
      state: { height, more, expand, popup, x, y, isAuthor, isOwner, review }
    } = this
    return (
      <Container height={height} more={more} expand={expand}>
        <img src={comment.user.image} />
        <div className="comment-main">
          <div className="user-row">
            <div className="user-name">{comment.user.name}</div>
            <div className="user-created">
              {formatDistance(comment.createdAt)} ago {comment.edited ? '(edited)' : ''}
            </div>
          </div>
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
          <CommentThumbs reviews={comment.reviews} review={review} onClick={this.onReviewClick} />
          {comment.replies.length ? <div>replies</div> : null}
        </div>
        <div ref={el => (this.anchor = el)}>
          <MoreVert className="more-vert" onClick={this.onMenuOpen} />
        </div>
        <CommentMenu show={popup} x={x} y={y} isAuthor={isAuthor} isOwner={isOwner} />
      </Container>
    )
  }
}

export default withApollo(CommentItem)
