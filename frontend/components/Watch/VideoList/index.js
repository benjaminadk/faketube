import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import { VIDEOS_QUERY } from '../../../apollo/videos'
import VideoThumb from '../../VideoThumb'

const Container = styled.div`
  max-width: 400px;
`

class VideoList extends React.Component {
  state = {
    loading: true,
    videos: [],
    first: 20
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    await this.setState({ loading: true })
    const {
      props: { video, client },
      state: { first }
    } = this
    const res = await client.query({
      query: VIDEOS_QUERY,
      variables: { where: { isPublic: true, isPublished: true }, first }
    })
    const videos = res.data.videos.filter(v => v.id !== video.id)
    await this.setState({ loading: false, videos })
  }

  render() {
    const {
      state: { loading, videos }
    } = this
    if (loading) {
      return null
    } else {
      return (
        <Container>
          <div className="video-list">
            {videos.map((v, i) => (
              <VideoThumb key={v.id} video={v} portrait={false} width={16.8} height={9.4} />
            ))}
          </div>
        </Container>
      )
    }
  }
}

export default withApollo(VideoList)
