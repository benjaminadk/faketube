import styled from 'styled-components'
import { MoreVert } from 'styled-icons/material/MoreVert'
import { WatchLater } from 'styled-icons/material/WatchLater'
import { CheckCircle } from 'styled-icons/material/CheckCircle'
import Router from 'next/router'
import formatDistance from '../lib/formatDistance'
import formatDuration from '../lib/formatDuration'
import isVideoNew from '../lib/isVideoNew'
import Popup from './styles/Popup'

const Container = styled.div`
  display: flex;
  flex-direction: ${props => (props.portrait ? 'column' : 'row')};
  margin-right: 0.5rem;
  margin-bottom: ${props => (props.portrait ? '3rem' : '.75rem')};
  cursor: pointer;
  .top {
    position: relative;
    margin-bottom: ${props => (props.portrait ? '1rem' : 0)};
    margin-right: ${props => (props.portrait ? 0 : '.75rem')};
    .thumb {
      width: ${props => props.width}rem;
      height: ${props => props.height}rem;
    }
    .watch {
      position: absolute;
      display: none;
      top: 5px;
      right: 5px;
      background: rgba(0, 0, 0, 0.75);
      border-radius: 2px;
      svg {
        width: 2rem;
        height: 2rem;
        color: ${props => props.theme.white};
        opacity: 0.8;
        margin: 0.4rem;
      }
      &:hover + .later {
        opacity: 0.75;
      }
    }
    .later {
      position: absolute;
      top: 5px;
      left: 50px;
      background: rgba(0, 0, 0, 0.75);
      color: ${props => props.theme.white};
      opacity: 0;
      border-radius: 2px;
      font-size: 1.3rem;
      padding: 0.75rem;
      transition: opacity 0.5s;
    }
    .duration {
      position: absolute;
      bottom: 7px;
      right: 5px;
      z-index: 2;
      font-family: 'Roboto Bold';
      font-size: 1.2rem;
      background: rgba(0, 0, 0, 0.8);
      color: ${props => props.theme.white};
      border-radius: 2px;
      padding: 0 0.35rem;
    }
  }
  .bottom {
    .title {
      display: grid;
      grid-template-columns: 18.5rem 2.5rem;
      min-height: 2.5rem;
      margin-bottom: 1rem;
      & > :first-child {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        width: 18rem;
        max-height: 3.2rem;
        -webkit-line-clamp: 2;
        font-family: 'Roboto Bold';
        font-size: 1.4rem;
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }
      .more-vert {
        display: none;
        width: 2.5rem;
        height: 2.5rem;
        color: ${props => props.theme.grey[5]};
        &:hover {
          color: ${props => props.theme.grey[10]};
        }
      }
    }
    .user,
    .info {
      display: flex;
      font-size: 1.4rem;
      color: ${props => props.theme.grey[12]};
    }
    .verified {
      width: 1.5rem;
      height: 1.5rem;
    }
    .new {
      font-size: 1.2rem;
      background: ${props => props.theme.grey[1]};
      color: ${props => props.theme.grey[10]};
      padding: 0.1rem 0.25rem;
      border-radius: 2px;
    }
  }
  &:hover .more-vert {
    display: block !important;
  }
  &:hover .watch {
    display: block !important;
  }
  &:hover .duration {
    display: none !important;
  }
`

const ViewProgress = styled.div`
  position: absolute;
  bottom: 0.35rem;
  left: 0;
  width: 100%;
  height: 0.45rem;
  background: ${props => props.theme.grey[10]};
  .view-progress {
    position: absolute;
    bottom: 0rem;
    left: 0;
    width: ${props => props.progress}%;
    height: 0.45rem;
    background: ${props => props.theme.primary};
  }
`

class VideoThumb extends React.Component {
  state = {
    preview: false,
    previewFlag: true,
    x: null,
    y: null,
    popup: false
  }

  componentDidMount() {
    this.setPopupCoordinates()
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onMenuClose)
  }

  setPopupCoordinates = () => {
    const { offsetLeft: x, offsetTop: y } = this.anchor
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

  render() {
    const {
      props: { video, view, portrait, width, height },
      state: { preview, x, y, popup }
    } = this
    return (
      <Container
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
          <div>Save to playlist</div>
          <div>Report</div>
        </Popup>
      </Container>
    )
  }
}

export default VideoThumb
