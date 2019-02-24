import gql from 'graphql-tag'

export const CREATE_COMMENT_REVIEW_MUTATION = gql`
  mutation CREATE_COMMENT_REVIEW_MUTATION($id: ID!, $status: ReviewStatus) {
    createCommentReview(id: $id, status: $status) {
      success
      review {
        id
      }
    }
  }
`
