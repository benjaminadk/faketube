import Router from 'next/router'
import { MoreVert } from 'styled-icons/material/MoreVert'
import { WatchLater } from 'styled-icons/material/WatchLater'
import { CheckCircle } from 'styled-icons/material/CheckCircle'
import formatDistance from '../../lib/formatDistance'
import formatDuration from '../../lib/formatDuration'
import isVideoNew from '../../lib/isVideoNew'
import Popup from '../styles/Popup'
import { VideoThumbStyles, ViewProgress } from './styles/VideoThumb'
import PlaylistTool from './PlaylistTool'

class VideoThumb extends React.Component {
  state = {
    preview: false,
    previewFlag: true,
    x: null,
    y: null,
    popup: false,
    showPlaylist: false
  }

  componentDidMount() {
    this.setPopupCoordinates()
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onMenuClose)
  }

  setPopupCoordinates = () => {
    const { pageRef } = this.props
    let { offsetLeft: x, offsetTop: y } = this.anchor
    if (pageRef && pageRef.scrollTop) {
      y -= pageRef.scrollTop
    }
    this.setState({ x, y })
  }

  onMouseEnter = () => {
    if (this.state.previewFlag) {
      this.setState({ preview: true, previewFlag: false })
      this.timeout = setTimeout(() => this.setState({ preview: false, previewFlag: true }), 3000)
    }
  }

  onMouseLeave = () => {
    clearTimeout(this.timeout)
    this.setState({ preview: false, previewFlag: true })
  }

  onMenuOpen = () => {
    this.setPopupCoordinates()
    this.setState({ popup: true })
    document.body.addEventListener('click', this.onMenuClose)
  }

  onMenuClose = () => {
    this.setState({ popup: false })
    document.body.removeEventListener('click', this.onMenuClose)
  }

  onVideoClick = id => Router.push({ pathname: '/watch', query: { id } })

  onShowPlaylist = () => this.setState({ showPlaylist: true, popup: false })

  render() {
    const {
      props: { video, user, view, portrait, width, height },
      state: { preview, x, y, popup, showPlaylist }
    } = this
    return (
      <VideoThumbStyles
        portrait={portrait}
        width={width}
        height={height}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div className="top" onClick={() => this.onVideoClick(video.id)}>
          <img className="thumb" src={preview ? video.previewURL : video.thumbURL} />
          <div className="watch">
            <WatchLater />
          </div>
          <div className="later">Watch later</div>
          <div className="duration">{formatDuration(video.duration)}</div>
          {view && !view.complete ? (
            <ViewProgress progress={Math.round((view.progress / video.duration) * 100)}>
              <div className="view-progress" />
            </ViewProgress>
          ) : null}
        </div>
        <div className="bottom">
          <div className="title">
            <div title={video.title} onClick={() => this.onVideoClick(video.id)}>
              {video.title}
            </div>
            <div ref={el => (this.anchor = el)} onClick={this.onMenuOpen}>
              <MoreVert className="more-vert" />
            </div>
          </div>
          <div className="user">
            <div>{video.user.name}</div>
            {video.user.verified ? <CheckCircle className="verified" /> : null}
          </div>
          <div className="info">
            <div>{video.views.length} views</div>
            {portrait ? <div>&nbsp;&bull; {formatDistance(video.createdAt)} ago</div> : <div />}
          </div>
          {!portrait && isVideoNew(video.createdAt) ? <span className="new">New</span> : null}
        </div>
        <Popup show={popup} x={x - 120} y={y + 22.5}>
          <div>Not interested</div>
          <div>Save to Watch later</div>
          <div onClick={this.onShowPlaylist}>Save to playlist</div>
          <div>Report</div>
        </Popup>
        {/* <PlaylistTool
          show={showPlaylist}
          videoID={video.id}
          playlists={user.playlists}
          bottom={y - 200}
          left={x - 400}
        /> */}
      </VideoThumbStyles>
    )
  }
}

export default VideoThumb
