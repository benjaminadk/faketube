import gql from 'graphql-tag'

export const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($id: ID!, $data: CommentCreateInput) {
    createComment(id: $id, data: $data) {
      success
      comment {
        id
      }
    }
  }
`
