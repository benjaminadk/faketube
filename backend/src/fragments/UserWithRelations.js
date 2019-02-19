module.exports = `
  fragment UserWithRelations on User {
    id
    name
    email
    image
    verified
    googlePhotoAT
    googlePhotoRT
    role
    createdAt
    views {
      id
      complete
      progress
      video {
        id
      }
    }
    reviews {
      id
      status
      video {
        id
      }
    }
    commentReviews {
      id
      status
      comment {
        id
      }
    }
  }
`
