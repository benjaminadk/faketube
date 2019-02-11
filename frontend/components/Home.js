import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import VideoThumb from './Home/VideoThumbVideoThumb'

const VIDEOS_QUERY = gql`
  query VIDEOS_QUERY(
    $where: VideoWhereInput
    $orderBy: VideoOrderByInput
    $skip: Int
    $first: Int
  ) {
    videos(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
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
      props: { drawer }
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
                    {videos.map((v, i) => (
                      <VideoThumb key={v.id} video={v} />
                    ))}
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
