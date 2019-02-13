import gql from 'graphql-tag'

export const VIDEOS_QUERY = gql`
  query VIDEOS_QUERY(
    $where: VideoWhereInput
    $orderBy: VideoOrderByInput
    $skip: Int
    $first: Int
  ) {
    videos(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
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
      }
    }
  }
`
