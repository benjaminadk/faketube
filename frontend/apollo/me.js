import gql from 'graphql-tag'

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
      image
      backgroundImage
      verified
      googlePhotoAT
      googlePhotoRT
      role
      createdAt
      playlists {
        id
        name
        description
        isPublic
        createdAt
      }
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
  }
`
