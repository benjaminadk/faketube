const { prisma } = require('../generated')
const UserWithRelations = require('../fragments/UserWithRelations')

module.exports = async (req, res, next) => {
  if (!req.userId) return next()
  const user = await prisma.user({ id: req.userId }).$fragment(UserWithRelations)
  req.user = user
  next()
}
