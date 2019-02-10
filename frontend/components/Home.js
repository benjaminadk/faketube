import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const VIDEOS_QUERY = gql`
  query VIDEOS_QUERY(
    $where: VideoWhereInput
    $orderBy: VideoOrderByInput
    $skip: Int
    $first: Int
  ) {
    videos(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      id
      title
      description
    }
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: ${props => props.theme.white};
  .spacer {
    width: ${props => (props.drawer ? '24rem' : 0)};
    transition: width 0.25s ease-out;
  }
`

class Home extends React.Component {
  render() {
    const {
      props: { drawer }
    } = this
    return (
      <Query query={VIDEOS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return null
          console.log(data)
          return (
            <Container drawer={drawer}>
              <div className="spacer" />
              <div>HOME</div>
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default Home
