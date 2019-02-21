import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import { VIDEOS_QUERY } from '../../../apollo/videos'
import VideoThumb from '../../VideoThumb'
import Switch from '../../Switch'

const Container = styled.div`
  max-width: 400px;
  .up-next {
    margin-bottom: 1rem;
    .up-next-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      & > :first-child {
        font-size: 1.6rem;
      }
      .up-next-switch {
        display: flex;
        align-items: center;
        & > :first-child {
          font-family: 'Roboto Bold';
          font-size: 1.3rem;
          text-transform: uppercase;
          color: ${props => props.theme.grey[8]};
          margin-right: 1rem;
        }
      }
    }
  }
  .video-list {
    padding-top: 1.5rem;
    border-top: 1px solid ${props => props.theme.grey[3]};
  }
`

class VideoList extends React.Component {
  state = {
    loading: true,
    videos: [],
    first: 20,
    autoplay: true
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

  toggleAutoplay = () => this.setState(({ autoplay }) => ({ autoplay: !autoplay }))

  render() {
    const {
      state: { loading, videos, autoplay }
    } = this
    if (loading) {
      return null
    } else {
      return (
        <Container>
          <div className="up-next">
            <div className="up-next-top">
              <div>Up next</div>
              <div className="up-next-switch">
                <div>autoplay</div>
                <Switch on={autoplay} onClick={this.toggleAutoplay} />
              </div>
            </div>
            <VideoThumb video={this.props.video} portrait={false} width={16.8} height={9.4} />
          </div>
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
