module.exports = `
  fragment VideoWithUser on Video {
    id
    videoURL
    thumbURL
    posterURL
    previewURL
    title
    description
    tags
    isPublished
    isPublic
    category
    createdAt
    user {
      id
      name
    }
  }
`
