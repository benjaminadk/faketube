import gql from 'graphql-tag'

export const CREATE_REPLY_MUTATION = gql`
  mutation CREATE_REPLY_MUTATION($id: ID!, $data: CommentCreateInput) {
    createReply(id: $id, data: $data) {
      success
      comment {
        id
      }
    }
  }
`
