import Router from 'next/router'
import formatDistance from '../../../lib/formatDistance'
import { NameDateStyles } from './styles/NameDate'

export default ({ comment }) => (
  <NameDateStyles>
    <div
      className="user-name"
      onClick={() => Router.push({ pathname: '/channel', query: { id: comment.user.id } })}
    >
      {comment.user.name}
    </div>
    <div className="user-created">
      {formatDistance(comment.createdAt)} ago {comment.edited ? '(edited)' : ''}
    </div>
  </NameDateStyles>
)
