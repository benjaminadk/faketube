const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const { prisma } = require('../generated')
const signToken = require('../middleware/signToken')

const {
  NODE_ENV,
  COOKIE,
  FRONTEND_DEV,
  FRONTEND_PROD,
  BACKEND_DEV,
  BACKEND_PROD,
  GOOGLE_PLUS_ID,
  GOOGLE_PLUS_SECRET
} = process.env

let token
const frontend = NODE_ENV === 'development' ? FRONTEND_DEV : FRONTEND_PROD
const backend = NODE_ENV === 'development' ? BACKEND_DEV : BACKEND_PROD

const googleOAuth = new GoogleStrategy(
  {
    clientID: GOOGLE_PLUS_ID,
    clientSecret: GOOGLE_PLUS_SECRET,
    callbackURL: `${backend}/api/google/callback`,
    passRequestToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    const googleID = profile.id
    const exists = await prisma.$exists.user({ googleID })
    console.log(exists)
    if (!exists) {
      let user = await prisma.createUser({
        googleID,
        name: profile.displayName,
        email: profile.emails[0].value.toLowerCase(),
        image: profile.photos[0].value,
        role: 'USER'
      })

      token = signToken(user.id)
      return done(null, {})
    } else {
      let user = await prisma.user({ googleID })
      token = signToken(user.id)
      return done(null, {})
    }
  }
)

const googleScope = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
})

const googleCallback = passport.authenticate('google', {
  failureRedirect: frontend,
  session: false
})

const googleRedirect = (req, res) => {
  res.cookie(COOKIE, token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  })
  res.redirect(frontend)
}

module.exports = {
  googleOAuth,
  googleScope,
  googleCallback,
  googleRedirect
}
