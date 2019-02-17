module.exports = `
  fragment CommentWithUser on Comment {
    id
    text
    reply
    edited
    createdAt
    user {
      id
      image
      name
    }
    reviews {
      id
      status
    }
    replies {
      id
      text
      reply
      edited
      createdAt
      user {
        id
        image
        name
      }
      reviews {
        id
        status
      }
    }
  }
`
