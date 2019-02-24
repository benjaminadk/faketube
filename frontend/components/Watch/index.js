import styled from 'styled-components'
import { Query } from 'react-apollo'
import Player from './Player'
import Details from './Details'
import Comments from './Comments'
import VideoList from './VideoList'
import { VIDEO_QUERY } from '../../apollo/video'

const Container = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  padding-top: 3rem;
  padding-bottom: 3rem;
  background: ${props => props.theme.white};
  .watch-left {
    justify-self: center;
    max-width: 875px;
  }
`

class Watch extends React.Component {
  state = {
    time: 0,
    autoplay: true,
    nextVideo: null
  }

  updateTime = time => this.setState({ time })

  toggleAutoplay = () => this.setState(({ autoplay }) => ({ autoplay: true })) // bug when false

  setNextVideo = nextVideo => {
    this.setState({ nextVideo })
  }

  render() {
    const {
      props: { user, query },
      state: { time, autoplay, nextVideo }
    } = this
    return (
      <Query query={VIDEO_QUERY} variables={{ id: query.id }}>
        {({ data, loading }) => {
          if (loading) return null
          return (
            <Container>
              <div className="watch-left">
                <Player
                  video={data.video}
                  nextVideo={nextVideo}
                  user={user}
                  query={query}
                  autoplay={autoplay}
                  updateTime={this.updateTime}
                  toggleAutoplay={this.toggleAutoplay}
                />
                <Details video={data.video} user={user} time={time} />
                <Comments video={data.video} user={user} query={query} />
              </div>
              <VideoList
                video={data.video}
                user={user}
                query={query}
                autoplay={autoplay}
                nextVideo={nextVideo}
                setNextVideo={this.setNextVideo}
                toggleAutoplay={this.toggleAutoplay}
              />
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default Watch
