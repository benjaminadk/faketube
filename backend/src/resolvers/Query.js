const VideoWithUser = require('../fragments/VideoWithUser')
const CommentWithUser = require('../fragments/CommentWithUser')
const { commentsByDate, commentsByTop } = require('./utils')

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
