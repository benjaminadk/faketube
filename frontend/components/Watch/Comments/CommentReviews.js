import { ThumbUp } from 'styled-icons/material/ThumbUp'
import { ThumbDown } from 'styled-icons/material/ThumbDown'
import { CommentReviewsStyles } from './styles/CommentReviews'

export default ({ reviews, review, onReviewClick, onShowReplyInput }) => {
  const likes = reviews.reduce((x, r) => x + (r.status === 'LIKE' ? 1 : 0), 0)
  return (
    <CommentReviewsStyles status={review ? review.status : ''}>
      <ThumbUp className="thumb-up" onClick={() => onReviewClick('LIKE')} />
      <div className="likes">{likes}</div>
      <ThumbDown className="thumb-down" onClick={() => onReviewClick('DISLIKE')} />
      {onShowReplyInput ? <div onClick={onShowReplyInput}>reply</div> : <div />}
    </CommentReviewsStyles>
  )
}
