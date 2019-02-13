import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
      image
      googlePhotoAT
      googlePhotoRT
      role
      createdAt
      views {
        id
        video {
          id
        }
      }
    }
  }
`

const User = props => (
  <Query {...props} query={ME_QUERY}>
    {payload => props.children(payload)}
  </Query>
)

export default User
