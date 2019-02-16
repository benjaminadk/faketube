module.exports = `
  fragment VideoWithUser on Video {
    id
    videoURL
    thumbURL
    posterURL
    previewURL
    duration
    title
    description
    tags
    isPublished
    isPublic
    category
    createdAt
    views {
      id
    }
    reviews {
      id
      status
    }
    comments {
      id
      text
      reply
      createdAt
      user {
        id
      }
    }
    user {
      id
      name
      image
    }
  }
`
