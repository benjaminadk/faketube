import gql from 'graphql-tag'

export const TOGGLE_PLAYLIST_MUTATION = gql`
  mutation TOGGLE_PLAYLIST_MUTATION($id: ID!, $videoID: ID!, $status: Boolean!) {
    togglePlaylist(id: $id, videoID: $videoID, status: $status) {
      success
    }
  }
`
