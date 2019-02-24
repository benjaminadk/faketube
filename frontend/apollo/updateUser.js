import gql from 'graphql-tag'

export const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($id: ID!, $data: UserUpdateInput) {
    updateUser(id: $id, data: $data) {
      success
    }
  }
`
