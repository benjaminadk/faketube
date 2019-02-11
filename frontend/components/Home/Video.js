import styled from 'styled-components'
import { MoreVert } from 'styled-icons/material/MoreVert'
import { WatchLater } from 'styled-icons/material/WatchLater'
import formatDistance from '../../lib/formatDistance'

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
      background: rgba(0, 0, 0, 0.75);
      border-radius: 2px;
      svg {
        width: 2rem;
        height: 2rem;
        color: ${props => props.theme.white};
        margin: 0.4rem;
      }
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
`

class Video extends React.Component {
  state = {
    preview: false,
    previewFlag: true
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

  render() {
    const {
      props: { video },
      state: { preview }
    } = this
    return (
      <Container onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <div className="top">
          <img className="thumb" src={preview ? video.previewURL : video.thumbURL} />
          <div className="watch">
            <WatchLater />
          </div>
        </div>
        <div className="bottom">
          <div className="title">
            <div title={video.title}>{video.title}</div>
            <MoreVert className="more-vert" />
          </div>
          <div className="user">{video.user.name}</div>
          <div className="info">691 views &bull; {formatDistance(video.createdAt)} ago</div>
        </div>
      </Container>
    )
  }
}

export default Video
