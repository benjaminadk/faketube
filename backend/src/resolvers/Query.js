module.exports = {
  me: async (_, args, ctx, info) => ctx.user,

  videos: async (_, args, ctx, info) => await ctx.prisma.videos({ ...args })
}
