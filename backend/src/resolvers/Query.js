const VideoWithUser = require('../fragments/VideoWithUser')
const CommentWithUser = require('../fragments/CommentWithUser')

function commentsByDate(a, b) {
  return b.createdAt - a.createdAt
}

function commentsByTop(a, b) {
  return getCommentEngagement(b) - getCommentEngagement(a)
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
  me: async (_, args, ctx, info) => ctx.user,

  video: async (_, args, ctx, info) => await ctx.prisma.video({ ...args }).$fragment(VideoWithUser),

  videos: async (_, args, ctx, info) =>
    await ctx.prisma.videos({ ...args }).$fragment(VideoWithUser),

  comments: async (_, args, ctx, info) => {
    const comments = await ctx.prisma
      .comments({ where: { ...args.where } })
      .$fragment(CommentWithUser)
    if (args.orderBy === 'date') {
      let sorted = comments.sort(commentsByDate)
      return sorted.slice(args.skip, args.first)
    } else {
      let sorted = comments.sort(commentsByTop)
      return sorted.slice(args.skip, args.first)
    }
  }
}
