const { google } = require('googleapis')
const url = require('url')
const { prisma } = require('../generated')

const {
  NODE_ENV,
  GOOGLE_PHOTO_ID,
  GOOGLE_PHOTO_SECRET,
  FRONTEND_DEV,
  FRONTEND_PROD,
  BACKEND_DEV,
  BACKEND_PROD
} = process.env

const frontend = NODE_ENV === 'development' ? FRONTEND_DEV : FRONTEND_PROD
const backend = NODE_ENV === 'development' ? BACKEND_DEV : BACKEND_PROD

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_PHOTO_ID,
  GOOGLE_PHOTO_SECRET,
  `${backend}/api/photoAuth/callback`
)

const photoAuth = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/photoslibrary.readonly'
  })
  res.redirect(authUrl)
}

const photoAuthCallback = async (req, res) => {
  const qs = new url.URL(req.url, backend).searchParams
  const {
    tokens: { access_token: googlePhotoAT, refresh_token: googlePhotoRT }
  } = await oauth2Client.getToken(qs.get('code'))
  await prisma.updateUser({ where: { id: req.userId }, data: { googlePhotoAT, googlePhotoRT } })
  res.redirect(`${frontend}/upload`)
}

module.exports = {
  photoAuth,
  photoAuthCallback
}
