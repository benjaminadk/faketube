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
      video {
        id
      }
    }
  }
`
