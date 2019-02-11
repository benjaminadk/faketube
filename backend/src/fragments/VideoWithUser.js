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
    user {
      id
      name
    }
  }
`
