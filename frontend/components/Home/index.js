import styled from 'styled-components'
import { Query } from 'react-apollo'
import VideoThumb from '../Shared/VideoThumb'
import { VIDEOS_QUERY } from '../../apollo/videos'

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  background: ${props => props.theme.white};
  .spacer {
    width: ${props => (props.drawer ? '24rem' : 0)};
    transition: width 0.25s ease-out;
  }
  .content-wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
  }
  .heading {
    font-family: 'Roboto Bold';
    margin: 2rem 0 2rem 5rem;
  }
`

const Videos = styled.div`
  justify-self: center;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-left: 5rem;
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
                <div className="content-wrapper">
                  <div className="heading">Recommended</div>
                  <Videos>
                    {videos.map((v, i) => {
                      const view = user ? user.views.find(vi => vi.video.id === v.id) : null
                      return (
                        <VideoThumb
                          key={v.id}
                          video={v}
                          view={view}
                          portrait={true}
                          width={21}
                          height={11.8}
                        />
                      )
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
