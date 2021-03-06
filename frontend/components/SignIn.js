import { GoogleLogin } from 'react-google-login'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { ME_QUERY } from '../apollo/me'
import { googleClientId } from '../config'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($data: UserCreateInput) {
    signin(data: $data) {
      success
    }
  }
`

class SignIn extends React.Component {
  onSuccess = async response => {
    const {
      profileObj: { googleId: googleID, email, imageUrl: image, name }
    } = response
    const data = { googleID, email, name, image, role: 'USER' }
    const res = await this.props.client.mutate({
      mutation: SIGNIN_MUTATION,
      variables: { data },
      refetchQueries: [{ query: ME_QUERY }]
    })
    if (!res.data.signin.success) {
      alert('Error authenticating with Google Sign In')
    }
  }

  onFailure = res => {
    alert('Error authenticating with Google Sign In')
  }

  render() {
    return (
      <GoogleLogin
        clientId={googleClientId}
        onSuccess={this.onSuccess}
        onFailure={this.onFailure}
        scope="profile email"
        render={props => (
          <span onClick={props.onClick} className="sign-in">
            Sign in
          </span>
        )}
      />
    )
  }
}

export default withApollo(SignIn)
