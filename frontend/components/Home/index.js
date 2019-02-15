import styled from 'styled-components'
import { Query } from 'react-apollo'
import VideoThumb from './VideoThumb'
import { VIDEOS_QUERY } from '../../apollo/videos'

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

const Videos = styled.div`
  display: flex;
  padding: 2rem;
`

class Home extends React.Component {
  render() {
    const {
      props: { drawer, user }
    } = this
    return (
      <Query query={VIDEOS_QUERY} variables={{ where: { isPublished: true, isPublic: true } }}>
        {({ data, loading, error }) => {
          if (loading) return null
          const videos = data.videos
          return (
            <Container drawer={drawer}>
              <div className="spacer" />
              <div>
                <div>
                  <div>Recommended</div>
                  <Videos>
                    {videos.map((v, i) => {
                      const view = user.views.find(vi => vi.video.id === v.id)
                      return <VideoThumb key={v.id} video={v} view={view} />
                    })}
                  </Videos>
                </div>
              </div>
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default Home
