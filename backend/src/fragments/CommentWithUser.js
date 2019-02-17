module.exports = `
  fragment CommentWithUser on Comment {
    id
    text
    reply
    createdAt
    user {
      id
      image
      name
    }
    replies {
      id
      text
      reply
      createdAt
      user {
        id
        image
        name
      }
    }
  }
`
