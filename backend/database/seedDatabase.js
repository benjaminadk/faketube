require('dotenv').config()
const axios = require('axios')
const uuid = require('uuid/v1')

async function sendData(data) {
  const res = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
    },
    url: `${process.env.PRISMA_ENDPOINT}/import`,
    data
  })
  console.log(res.data)
}

function createRandomId() {
  return uuid()
    .replace(/-/g, '')
    .slice(0, 10)
}

module.exports = async (videos, users) => {
  const lists = []
  const relations = []
  const date = new Date().toISOString()

  const adminID = createRandomId()
  const admin = {
    _typeName: 'User',
    id: adminID,
    name: 'Ben Brooke (benjaminadk)',
    email: 'benjaminadk@gmail.com',
    image:
      'https://lh4.googleusercontent.com/-9Q_OGPy0Reg/AAAAAAAAAAI/AAAAAAAAGBY/jBL8W7-pcpk/s96-c/photo.jpg',
    googleID: '117803716222757935095',
    role: 'ADMIN',
    createdAt: date
  }

  const videoNodes = videos.map((r, i) => {
    const videoID = createRandomId()
    const node = {
      _typeName: 'Video',
      id: videoID,
      videoURL: r[0],
      thumbURL: r[1],
      previewURL: r[2],
      duration: parseInt(r[3], 10),
      title: r[4],
      description: r[5],
      isPublic: true,
      isPublished: true,
      category: 'ENTERTAINMENT',
      allowComments: true,
      createdAt: date
    }
    return node
  })

  videoNodes.forEach((v, i) => {
    const list = {
      _typeName: 'Video',
      id: v.id,
      tags: videos[i][6].split(',').map(t => t.trim())
    }
    lists.push(list)

    const r1 = { _typeName: 'Video', id: v.id, fieldName: 'user' }
    const r2 = { _typeName: 'User', id: admin.id, fieldName: 'videos' }
    const relation = [r1, r2]
    relations.push(relation)
  })

  const NODES = { valueType: 'nodes', values: [admin, ...videoNodes] }
  const LISTS = { valueType: 'lists', values: lists }
  const RELATIONS = { valueType: 'relations', values: relations }

  try {
    await sendData(NODES)
    await sendData(LISTS)
    await sendData(RELATIONS)
  } catch (error) {
    console.error('Error seeding database', error)
  } finally {
    console.log('Database seeded')
  }
}
