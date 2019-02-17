import styled from 'styled-components'
import { ThumbUp } from 'styled-icons/material/ThumbUp'
import { ThumbDown } from 'styled-icons/material/ThumbDown'
import formatDistance from '../../../lib/formatDistance'

const Container = styled.div``

const Comment = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-gap: 2rem;
  margin-bottom: 2rem;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  & > :last-child {
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
      max-height: 8.5rem;
      overflow: hidden;
      font-size: 1.4rem;
      margin-bottom: 1rem;
      white-space: pre-wrap;
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
`

const CommentList = ({ comments }) => (
  <Container>
    {comments.map((c, i) => {
      let likes = 0
      c.reviews.forEach(r => {
        if (r.status === 'LIKE') likes += 1
      })
      return (
        <Comment key={c.id}>
          <img src={c.user.image} />
          <div>
            <div className="user-row">
              <div className="user-name">{c.user.name}</div>
              <div className="user-created">
                {formatDistance(c.createdAt)} ago {c.edited ? '(edited)' : ''}
              </div>
            </div>
            <div className="text-row">{c.text}</div>
            <div className="thumb-row">
              <ThumbUp />
              <div className="thumb-ups">{likes}</div>
              <ThumbDown className="thumb-down" />
              <div>reply</div>
            </div>
            {c.replies.length ? <div>replies</div> : null}
          </div>
        </Comment>
      )
    })}
  </Container>
)

export default CommentList
