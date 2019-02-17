const VideoWithUser = require('../fragments/VideoWithUser')
const CommentWithUser = require('../fragments/CommentWithUser')

module.exports = {
  me: async (_, args, ctx, info) => ctx.user,

  video: async (_, args, ctx, info) => await ctx.prisma.video({ ...args }).$fragment(VideoWithUser),

  videos: async (_, args, ctx, info) =>
    await ctx.prisma.videos({ ...args }).$fragment(VideoWithUser),

  comments: async (_, args, ctx, info) =>
    await ctx.prisma.comments({ ...args }).$fragment(CommentWithUser)
}
