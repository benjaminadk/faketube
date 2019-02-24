import gql from 'graphql-tag'

export const CREATE_REVIEW_MUTATION = gql`
  mutation CREATE_REVIEW_MUTATION($id: ID!, $status: ReviewStatus) {
    createReview(id: $id, status: $status) {
      success
      review {
        id
        status
      }
    }
  }
`
