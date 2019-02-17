const jwt = require('jsonwebtoken')
const axios = require('axios')
const { getSignedUrl } = require('../services/aws')
const { transport, makeEmail } = require('../services/email')

const { COOKIE, JWT_SECRET, MAIL_FROM, GOOGLE_PHOTO_ID, GOOGLE_PHOTO_SECRET } = process.env

module.exports = {
  signin: async (_, args, ctx, info) => {
    try {
      var user
      const exists = await ctx.prisma.$exists.user({ googleID: args.data.googleID })
      if (!exists) {
        user = await ctx.prisma.createUser({ ...args.data })
      } else {
        user = await ctx.prisma.user({ googleID: args.data.googleID })
      }
      const token = jwt.sign({ userId: user.id }, JWT_SECRET)
      ctx.res.cookie(COOKIE, token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365
      })
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  signout: async (_, args, ctx, info) => {
    ctx.res.clearCookie(COOKIE)
    return { success: true }
  },

  signS3: async (_, args, ctx, info) => {
    const Bucket = process.env.AWS_BUCKET
    const params = {
      Bucket,
      Key: args.filename,
      Expires: 60,
      ContentType: args.filetype
    }
    try {
      const requestURL = await getSignedUrl('putObject', params)
      const fileURL = `https://${Bucket}.s3.amazonaws.com/${args.filename}`
      return { success: true, requestURL, fileURL }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  createVideo: async (_, args, ctx, info) => {
    try {
      const video = await ctx.prisma.createVideo({
        ...args.data,
        user: { connect: { id: ctx.userId } }
      })
      return { success: true, video }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  updateVideo: async (_, args, ctx, info) => {
    try {
      const video = await ctx.prisma.updateVideo({
        where: { id: args.id },
        data: { ...args.data }
      })
      return { success: true, video }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  emailVideo: async (_, args, ctx, info) => {
    try {
      const { to, title, message, videoID, thumbURL } = args.data
      const recipients = to.split(',').map(t => t.trim().toLowerCase())
      recipients.forEach(async to => {
        await transport.sendMail({
          to,
          from: `'"${ctx.user.name} via FooTube" <${MAIL_FROM}>'`,
          subject: `${ctx.user.name} sent you a video: "${title}"`,
          html: await makeEmail(ctx.user, title, message, videoID, thumbURL)
        })
      })
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  createView: async (_, args, ctx, info) => {
    try {
      const view = await ctx.prisma.createView({
        video: { connect: { id: args.id } },
        user: { connect: { id: ctx.userId } }
      })
      return { success: true, view }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  updateView: async (_, args, ctx, info) => {
    try {
      const view = await ctx.prisma.updateView({
        where: { id: args.id },
        data: { ...args.data }
      })
      return { success: true, view }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  createReview: async (_, args, ctx, info) => {
    try {
      const review = await ctx.prisma.createReview({
        status: args.status,
        video: { connect: { id: args.id } },
        user: { connect: { id: ctx.userId } }
      })
      return { success: true, review }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  updateReview: async (_, args, ctx, info) => {
    try {
      const review = await ctx.prisma.updateReview({
        where: { id: args.id },
        data: { status: args.status }
      })
      return { success: true, review }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  createComment: async (_, args, ctx, info) => {
    try {
      const comment = await ctx.prisma.createComment({
        text: args.data.text,
        reply: args.data.reply,
        video: { connect: { id: args.id } },
        user: { connect: { id: ctx.userId } }
      })
      return { success: true, comment }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  refreshGooglePhotoToken: async (_, args, ctx, info) => {
    try {
      const { id, googlePhotoRT } = ctx.user
      const res = await axios({
        method: 'POST',
        url: 'https://www.googleapis.com/oauth2/v4/token',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          client_id: GOOGLE_PHOTO_ID,
          client_secret: GOOGLE_PHOTO_SECRET,
          refresh_token: googlePhotoRT,
          grant_type: 'refresh_token'
        }
      })
      await ctx.prisma.updateUser({ where: { id }, data: { googlePhotoAT: res.data.access_token } })
      return { success: true, token: res.data.access_token }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  }
}
