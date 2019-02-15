import styled from 'styled-components'
import { Query } from 'react-apollo'
import Player from './Watch/Player'
import Details from './Watch/Details'
import { VIDEO_QUERY } from '../apollo/video'

const Container = styled.div`
  display: grid;
  grid-template-columns: 75% 25%;
  padding-top: 3rem;
  .left {
    justify-self: center;
    max-width: 875px;
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
                <Details video={data.video} user={user} />
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
