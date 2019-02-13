import styled from 'styled-components'
import { Query } from 'react-apollo'
import Player from './Watch/Player'
import { VIDEO_QUERY } from '../apollo/video'

const Container = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  .left {
    padding: 2rem;
  }
`

class Watch extends React.Component {
  render() {
    const {
      props: { user, query }
    } = this
    return (
      <Container>
        <Query query={VIDEO_QUERY} variables={{ id: query.id }}>
          {({ data, loading, error }) => {
            if (loading) return null
            return (
              <div className="left">
                <Player video={data.video} user={user} query={query} />
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
