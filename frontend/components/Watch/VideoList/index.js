import { withApollo } from 'react-apollo'
import { VIDEOS_QUERY } from '../../../apollo/videos'
import VideoThumb from '../../Shared/VideoThumb'
import Switch from '../../Shared/Switch'
import { VideoListStyles } from './styles/VideoList'

class VideoList extends React.Component {
  state = {
    loading: true,
    videos: [],
    first: 20
  }

  componentDidMount() {
    this.getVideos()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.video.id !== this.props.video.id) {
      this.getVideos()
    }
  }

  getVideos = async () => {
    await this.setState({ loading: true })
    const {
      props: { video, client },
      state: { first, lastVideo }
    } = this
    const res = await client.query({
      query: VIDEOS_QUERY,
      variables: { where: { isPublic: true, isPublished: true }, first }
    })

    const rankedVideos = this.rankVideos(res.data.videos, video, lastVideo)
    const nextVideo = rankedVideos.shift()

    this.props.setNextVideo(nextVideo)
    await this.setState({ loading: false, videos: rankedVideos, lastVideo: video })
  }

  rankVideos = (videos, currentVideo, prevVideo) => {
    return videos
      .filter(v => v.id !== currentVideo.id)
      .map((v, i) => {
        let pts = 0
        if (currentVideo.category === v.category) pts += 2
        if (currentVideo.user.id === v.user.id) pts += 1
        v.tags.forEach(t => {
          if (currentVideo.tags.includes(t)) pts += 3
        })
        pts += v.reviews
          ? v.reviews.reduce(
              (acc, val) => (acc + val.status === 'LIKE' ? 4 : val.status === 'DISLIKE' ? -4 : 0),
              0
            )
          : 0
        pts += v.views.length
        if (prevVideo && prevVideo.id === v.id) pts = 0
        v.points = pts
        return v
      })
      .sort((a, b) => {
        if (b.points > a.points) return 1
        else if (b.points < a.points) return -1
        else {
          if (b.createdAt > a.createdAt) return 1
          else if (b.createdAt < a.createdAt) return -1
          else return 0
        }
      })
  }

  render() {
    const {
      props: { autoplay, nextVideo, toggleAutoplay },
      state: { loading, videos }
    } = this
    if (loading) {
      return null
    } else {
      return (
        <VideoListStyles>
          <div className="up-next">
            <div className="up-next-top">
              <div>Up next</div>
              <div className="up-next-switch">
                <div>autoplay</div>
                <Switch color="blue" on={autoplay} onClick={toggleAutoplay} />
              </div>
            </div>
            <VideoThumb video={nextVideo} portrait={false} width={16.8} height={9.4} />
          </div>
          <div className="video-list">
            {videos.map((v, i) => (
              <VideoThumb key={v.id} video={v} portrait={false} width={16.8} height={9.4} />
            ))}
          </div>
        </VideoListStyles>
      )
    }
  }
}

export default withApollo(VideoList)
