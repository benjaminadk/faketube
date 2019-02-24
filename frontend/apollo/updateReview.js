import gql from 'graphql-tag'

export const UPDATE_REVIEW_MUTATION = gql`
  mutation UPDATE_REVIEW_MUTATION($id: ID!, $status: ReviewStatus) {
    updateReview(id: $id, status: $status) {
      success
      review {
        id
        status
      }
    }
  }
`
