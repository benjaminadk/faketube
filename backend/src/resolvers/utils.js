function commentsByDate(a, b) {
  if (b.createdAt > a.createdAt) return 1
  else if (b.createdAt < a.createdAt) return -1
  else return 0
}

function commentsByTop(a, b) {
  const x = getCommentEngagement(b)
  const y = getCommentEngagement(a)
  if (x > y) return 1
  else if (x < y) return -1
  else {
    return commentsByDate(a, b)
  }
}

function getCommentEngagement(comment) {
  return (
    comment.reviews.reduce((acc, val) => {
      if (val.status === 'LIKE') {
        acc += 1
      } else if (val.status === 'DISLIKE') {
        acc -= 1
      }
      return acc
    }, 0) +
    comment.replies.length * 2
  )
}

module.exports = {
  commentsByDate,
  commentsByTop
}
