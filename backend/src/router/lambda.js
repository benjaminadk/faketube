const { prisma } = require('../generated')

module.exports = async (req, res) => {
  res.status(200).send()
  try {
    const srcKey = req.body.srcKey
    const duration = parseInt(req.body.duration, 10)
    const videos = await prisma.videos({ where: { videoURL_contains: srcKey } })
    const video = videos[0]
    await prisma.updateVideo({ where: { id: video.id }, data: { duration } })
    return
  } catch (error) {
    console.log(error)
  }
}
