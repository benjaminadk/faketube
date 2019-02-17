import styled from 'styled-components'
import { Query } from 'react-apollo'
import Player from './Player'
import Details from './Details'
import Comments from './Comments'
import { VIDEO_QUERY } from '../../apollo/video'

const Container = styled.div`
  display: grid;
  grid-template-columns: 75% 25%;
  padding-top: 3rem;
  background: ${props => props.theme.white};
  .left {
    justify-self: center;
    max-width: 875px;
  }
`

class Watch extends React.Component {
  state = {
    time: 0
  }

  updateTime = time => this.setState({ time })

  render() {
    const {
      props: { user, query },
      state: { time }
    } = this
    return (
      <Container>
        <Query query={VIDEO_QUERY} variables={{ id: query.id }}>
          {({ data, loading, error }) => {
            if (loading) return null
            return (
              <div className="left">
                <Player video={data.video} user={user} query={query} updateTime={this.updateTime} />
                <Details video={data.video} user={user} time={time} />
                <Comments video={data.video} user={user} query={query} />
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
