import { MoreHoriz } from 'styled-icons/material/MoreHoriz'
import VideoReview from './VideoReview'
import ShareButton from './ShareButton'
import ShareModal from './ShareModal'
import SaveButton from './SaveButton'
import CreatedBy from './CreatedBy'
import Description from './Description'
import { DetailsStyles } from './styles/Details'

class Details extends React.Component {
  state = {
    shareModal: false,
    playlistTool: false
  }

  onShowShareModal = () => this.setState({ shareModal: true })

  onHideShareModal = () => this.setState({ shareModal: false })

  togglePlaylistTool = () => this.setState(({ playlistTool }) => ({ playlistTool: !playlistTool }))

  render() {
    const {
      props: { video, time, user },
      state: { shareModal, playlistTool }
    } = this
    return (
      <DetailsStyles>
        <div className="title-row">{video.title}</div>
        <div className="actions-row">
          <div className="views">
            {video.views.length} view{video.views.length === 1 ? '' : 's'}
          </div>
          <div className="actions">
            <VideoReview video={video} user={user} onClick={this.onReviewClick} />
            <ShareButton onClick={this.onShowShareModal} />
            <SaveButton
              videoID={video.id}
              playlists={user.playlists}
              playlistTool={playlistTool}
              onClick={this.togglePlaylistTool}
            />
            <MoreHoriz className="more-horiz" />
          </div>
        </div>
        <div className="author-row">
          <CreatedBy video={video} />
          <div className="subscribe">Subscribe 50K</div>
        </div>
        <Description video={video} />
        <ShareModal show={shareModal} video={video} time={time} onClose={this.onHideShareModal} />
      </DetailsStyles>
    )
  }
}

export default Details
