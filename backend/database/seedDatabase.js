require('dotenv').config()
const axios = require('axios')
const casual = require('casual')
const uuid = require('uuid/v1')

// helper function to send seed data to prisma
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

// generate sequencial unique ids
function createRandomId() {
  return uuid()
    .replace(/-/g, '')
    .slice(0, 10)
}

module.exports = async (videos, users) => {
  const lists = []
  const relations = []
  const reviews = []
  const comments = []
  const views = []
  const date = new Date().toISOString()

  // create admin user for myself
  const adminID = 'cjsdxbonw27a70b906tggjp38'
  const admin = {
    _typeName: 'User',
    id: adminID,
    name: 'Ben Brooke (benjaminadk)',
    email: 'benjaminadk@gmail.com',
    image:
      'https://lh4.googleusercontent.com/-9Q_OGPy0Reg/AAAAAAAAAAI/AAAAAAAAGBY/jBL8W7-pcpk/s96-c/photo.jpg',
    googleID: '117803716222757935095',
    role: 'ADMIN',
    verified: true,
    createdAt: date
  }
  // attach a watch later playlist to admin
  const watchLaterID = createRandomId()
  const watchLater = {
    _typeName: 'Playlist',
    id: watchLaterID,
    name: 'Watch later',
    isPublic: true,
    createdAt: date
  }
  const adminRel1 = { _typeName: 'Playlist', id: watchLaterID, fieldName: 'user' }
  const adminRel2 = { _typeName: 'User', id: adminID, fieldName: 'playlists' }
  const adminRelation = [adminRel1, adminRel2]
  relations.push(adminRelation)

  // create 5 users
  const userNodes = Array.from({ length: 5 }).map((el, i) => {
    const userID = createRandomId()
    const user = {}
    user._typeName = 'User'
    user.id = userID
    user.name = casual.username
    user.email = casual.email
    user.image = `https://s3-us-west-1.amazonaws.com/faketube/assets/avatar-${i + 1}.${
      i < 2 ? 'png' : 'jpg'
    }`
    user.googleID = i.toString()
    user.role = 'USER'
    user.verified = i % 2 === 0
    user.createdAt = date
    return user
  })

  // create videos from google sheets data
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

  // create list for video tags
  videoNodes.forEach((v, i) => {
    const list = {
      _typeName: 'Video',
      id: v.id,
      tags: videos[i][6].split(',').map(t => t.trim())
    }
    lists.push(list)

    // create one comment for each user for each video
    userNodes.forEach((u, j) => {
      const commentID = createRandomId()
      const comment = {
        _typeName: 'Comment',
        id: commentID,
        text: casual.sentences(Math.ceil(Math.random() * 10)),
        reply: false,
        edited: false,
        createdAt: date
      }
      comments.push(comment)
      const c1 = { _typeName: 'Comment', id: commentID, fieldName: 'video' }
      const c2 = { _typeName: 'Comment', id: commentID, fieldName: 'user' }
      const c3 = { _typeName: 'User', id: u.id, fieldName: 'comments' }
      const c4 = { _typeName: 'Video', id: v.id, fieldName: 'comments' }
      const commentRelation1 = [c1, c4]
      const commentRelation2 = [c2, c3]
      relations.push(commentRelation1, commentRelation2)

      // create a review for each user for each video
      const reviewID = createRandomId()
      const review = {
        _typeName: 'Review',
        id: reviewID,
        status: Math.floor(Math.random() * 5) === 4 ? 'DISLIKE' : 'LIKE',
        createdAt: date
      }
      reviews.push(review)
      const r1 = { _typeName: 'Review', id: reviewID, fieldName: 'video' }
      const r2 = { _typeName: 'Review', id: reviewID, fieldName: 'user' }
      const r3 = { _typeName: 'User', id: u.id, fieldName: 'reviews' }
      const r4 = { _typeName: 'Video', id: v.id, fieldName: 'reviews' }
      const reviewRelation1 = [r1, r4]
      const reviewRelation2 = [r2, r3]
      relations.push(reviewRelation1, reviewRelation2)

      // create a view for each user for each video
      const viewID = createRandomId()
      const view = {
        _typeName: 'View',
        id: viewID,
        complete: true,
        progress: 0,
        createdAt: date
      }
      views.push(view)
      const vw1 = { _typeName: 'View', id: viewID, fieldName: 'video' }
      const vw2 = { _typeName: 'View', id: viewID, fieldName: 'user' }
      const vw3 = { _typeName: 'User', id: u.id, fieldName: 'views' }
      const vw4 = { _typeName: 'Video', id: v.id, fieldName: 'views' }
      const viewRelation1 = [vw1, vw4]
      const viewRelation2 = [vw2, vw3]
      relations.push(viewRelation1, viewRelation2)
    })

    const v1 = { _typeName: 'Video', id: v.id, fieldName: 'user' }
    const v2 = { _typeName: 'User', id: admin.id, fieldName: 'videos' }
    const videoRelation = [v1, v2]
    relations.push(videoRelation)
  })

  // format nodes, lists and relations in proper objects
  const NODES = {
    valueType: 'nodes',
    values: [admin, watchLater, ...userNodes, ...videoNodes, ...comments, ...reviews, ...views]
  }
  const LISTS = { valueType: 'lists', values: lists }
  const RELATIONS = {
    valueType: 'relations',
    values: relations
  }

  // send data to prisma
  try {
    await sendData(NODES)
    await sendData(LISTS)
    await sendData(RELATIONS)
  } catch (error) {
    console.error('Error seeding database', error.message)
  } finally {
    console.log('Database seeded')
  }
}
