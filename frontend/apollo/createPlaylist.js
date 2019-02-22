import gql from 'graphql-tag'

export const CREATE_PLAYLIST_MUTATION = gql`
  mutation CREATE_PLAYLIST_MUTATION($id: ID!, $data: PlaylistCreateInput) {
    createPlaylist(id: $id, data: $data) {
      success
      playlist {
        id
      }
    }
  }
`
