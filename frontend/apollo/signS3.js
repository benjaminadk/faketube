import gql from 'graphql-tag'

export const SIGN_S3_MUTATION = gql`
  mutation SIGN_S3_MUTATION($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      success
      requestURL
      fileURL
    }
  }
`
