import gql from 'graphql-tag'

export const UPDATE_COMMENT_REVIEW_MUTATION = gql`
  mutation UPDATE_COMMENT_REVIEW_MUTATION($id: ID!, $status: ReviewStatus) {
    updateCommentReview(id: $id, status: $status) {
      success
      review {
        id
      }
    }
  }
`
