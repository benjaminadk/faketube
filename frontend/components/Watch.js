import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Player from './Watch/Player'

const VIDEO_QUERY = gql`
  query VIDEO_QUERY($id: ID!) {
    video(id: $id) {
      id
      videoURL
      thumbURL
      previewURL
      duration
      title
      description
      tags
      category
      createdAt
      views {
        id
      }
      user {
        id
        name
      }
    }
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  .left {
    padding: 2rem;
  }
`

class Watch extends React.Component {
  render() {
    return (
      <Container>
        <Query query={VIDEO_QUERY} variables={{ id: this.props.query.id }}>
          {({ data, loading, error }) => {
            if (loading) return null
            return (
              <div className="left">
                <Player video={data.video} />
              </div>
            )
          }}
        </Query>
        <div>list</div>
      </Container>
    )
  }
}

export default Watch
