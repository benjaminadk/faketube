import { Query } from 'react-apollo'
import { ME_QUERY } from '../apollo/me'

const User = props => (
  <Query {...props} query={ME_QUERY}>
    {payload => props.children(payload)}
  </Query>
)

export default User
