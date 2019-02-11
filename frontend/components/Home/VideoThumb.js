import styled from 'styled-components'
import { MoreVert } from 'styled-icons/material/MoreVert'
import { WatchLater } from 'styled-icons/material/WatchLater'
import formatDistance from '../../lib/formatDistance'
import formatDuration from '../../lib/formatDuration'

const Container = styled.div`
  margin-right: 0.5rem;
  cursor: pointer;
  .top {
    position: relative;
    margin-bottom: 1rem;
    .thumb {
      width: 21rem;
      height: 11.8rem;
    }
    .watch {
      position: absolute;
      display: none;
      top: 5px;
      right: 5px;
      background: rgba(0, 0, 0, 0.65);
      border-radius: 2px;
      svg {
        width: 2rem;
        height: 2rem;
        color: ${props => props.theme.white};
        margin: 0.4rem;
      }
    }
    .duration {
      position: absolute;
      bottom: 7px;
      right: 5px;
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
      margin-bottom: 1rem;
      & > :first-child {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        width: 18rem;
        height: 3.2rem;
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
      font-size: 1.4rem;
      color: ${props => props.theme.grey[12]};
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

const Popup = styled.div`
  position: absolute;
  top: ${props => props.x + 45}px;
  left: ${props => props.y - 150}px;
  display: ${props => (props.show ? 'block' : 'none')};
  background: ${props => props.theme.white};
  box-shadow: ${props => props.theme.shadows[2]};
  font-size: 1.3rem;
  & > :first-child {
    margin-top: 0.5rem;
  }
  & > :last-child {
    margin-bottom: 0.5rem;
  }
  & > * {
    padding: 1.75rem;
    &:hover {
      background: ${props => props.theme.grey[1]};
    }
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
    const { offsetLeft: x, offsetTop: y } = this.anchor
    this.setState({ x, y })
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onMenuClose)
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
    this.setState({ popup: true })
    document.body.addEventListener('click', this.onMenuClose)
  }

  onMenuClose = () => {
    this.setState({ popup: false })
    document.body.removeEventListener('click', this.onMenuClose)
  }

  render() {
    const {
      props: { video },
      state: { preview, x, y, popup }
    } = this
    return (
      <Container onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <div className="top">
          <img className="thumb" src={preview ? video.previewURL : video.thumbURL} />
          <div className="watch">
            <WatchLater />
          </div>
          <div className="duration">{formatDuration(video.duration)}</div>
        </div>
        <div className="bottom">
          <div className="title">
            <div title={video.title}>{video.title}</div>
            <div ref={el => (this.anchor = el)} onClick={this.onMenuOpen}>
              <MoreVert className="more-vert" />
            </div>
          </div>
          <div className="user">{video.user.name}</div>
          <div className="info">
            {video.views.length} views &bull; {formatDistance(video.createdAt)} ago
          </div>
        </div>
        <Popup show={popup} x={x} y={y}>
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
