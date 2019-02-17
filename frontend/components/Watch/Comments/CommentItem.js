import styled from 'styled-components'
import { darken } from 'polished'
import { ThumbUp } from 'styled-icons/material/ThumbUp'
import { ThumbDown } from 'styled-icons/material/ThumbDown'
import { MoreVert } from 'styled-icons/material/MoreVert'
import formatDistance from '../../../lib/formatDistance'
import { linkifyComment } from '../../../lib/linkify'
import CommentMenu from './CommentMenu'

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
    .thumb-row {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      & > :first-child {
        margin-right: 0.75rem;
      }
      svg {
        width: 1.6rem;
        height: 1.6rem;
        color: ${props => props.theme.grey[8]};
        cursor: pointer;
      }
      .thumb-ups {
        color: ${props => props.theme.grey[8]};
        font-size: 1.3rem;
        margin-right: 1rem;
      }
      .thumb-down {
        margin-right: 2rem;
      }
      & > :last-child {
        text-transform: uppercase;
        font-family: 'Roboto Bold';
        font-size: 1.3rem;
        color: ${props => props.theme.grey[10]};
        cursor: pointer;
      }
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
    this.setHeight()
    this.setPopupCoordinates()
    this.setAuthor()
    this.setOwner()
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onMenuClose)
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
      state: { height, more, expand, popup, x, y, isAuthor, isOwner }
    } = this
    let likes = 0
    comment.reviews.forEach(r => {
      if (r.status === 'LIKE') likes += 1
    })
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
          <div className="thumb-row">
            <ThumbUp />
            <div className="thumb-ups">{likes}</div>
            <ThumbDown className="thumb-down" />
            <div>reply</div>
          </div>
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

export default CommentItem
