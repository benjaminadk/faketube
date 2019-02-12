const VideoWithUser = require('../fragments/VideoWithUser')

module.exports = {
  me: async (_, args, ctx, info) => ctx.user,

  video: async (_, args, ctx, info) => await ctx.prisma.video({ ...args }).$fragment(VideoWithUser),

  videos: async (_, args, ctx, info) =>
    await ctx.prisma.videos({ ...args }).$fragment(VideoWithUser)
}
