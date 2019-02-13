module.exports = `
  fragment UserWithRelations on User {
    id
    name
    email
    image
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
  }
`
