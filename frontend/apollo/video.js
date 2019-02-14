import gql from 'graphql-tag'

export const VIDEO_QUERY = gql`
  query VIDEO_QUERY($id: ID!) {
    video(id: $id) {
      id
      videoURL
      thumbURL
      previewURL
      duration
      title
      description
      tags
      category
      createdAt
      views {
        id
      }
      user {
        id
        name
        image
      }
    }
  }
`
