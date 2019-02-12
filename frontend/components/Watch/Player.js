import styled from 'styled-components'
import { darken } from 'polished'
import TimeSlider from './TimeSlider'
import { PlayArrow } from 'styled-icons/material/PlayArrow'
import { Pause } from 'styled-icons/material/Pause'
import { SkipNext } from 'styled-icons/material/SkipNext'
import { VolumeOff } from 'styled-icons/material/VolumeOff'
import { VolumeMute } from 'styled-icons/material/VolumeMute'
import { VolumeDown } from 'styled-icons/material/VolumeDown'
import { VolumeUp } from 'styled-icons/material/VolumeUp'

const Container = styled.div`
  width: 100%;
  position: relative;
  .controls {
    position: absolute;
    bottom: 0.25rem;
    left: 0;
    width: 100%;
    height: 10%;
    opacity: ${props => (props.controls ? 1 : 0)};
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.85));
    padding: 0.5rem 1rem;
    transition: all 0.25s;
    .controls-top {
      margin-bottom: 0.5rem;
    }
    .controls-bottom {
      height: 100%;
      display: flex;
      .icon {
        width: 4rem;
        display: grid;
        justify-items: center;
        align-items: center;
        color: ${props => darken(0.05, props.theme.white)};
        cursor: pointer;
        &:hover {
          color: ${props => props.theme.white};
        }
      }
      svg {
        width: 2.75rem;
        height: 2.75rem;
        color: inherit;
      }
    }
  }
`

const Video = styled.video.attrs(props => ({
  autoPlay: true,
  muted: true
}))`
  width: 100%;
`

class Player extends React.Component {
  state = {
    controls: true,
    time: 0,
    playing: true,
    volume: 0.75,
    muted: false
  }

  video = React.createRef()

  onMouseEnter = () => this.setState({ controls: true })

  onMouseLeave = () => this.setState({ controls: true })

  onTimeUpdate = () => this.setState({ time: Math.ceil(this.video.current.currentTime) })

  onTimeChange = values => {
    const time = values[0]
    if (this.state.playing) {
      this.video.current.currentTime = time
    }
    this.setState({ time })
  }

  onSlideStart = async values => {
    await this.setState({ playing: false })
    const time = values[0]
    this.video.current.currentTime = time
    this.video.current.pause()
    this.setState({ time })
  }

  onSlideEnd = values => {
    const time = values[0]
    this.video.current.currentTime = time
    this.video.current.play()
    this.setState({ time, playing: true })
  }

  onPlayPause = () => {
    const { playing } = this.state
    if (playing) {
      this.video.current.pause()
    } else {
      this.video.current.play()
    }
    this.setState({ playing: !playing })
  }

  onVolumeClick = () => {
    const { muted } = this.state
    let volume
    if (muted) {
      volume = 0.75
      this.video.current.muted = false
      this.video.current.volume = volume
    } else {
      volume = 0
      this.video.current.muted = true
      this.video.current.volume = volume
    }
    this.setState({ muted: !muted, volume })
  }

  render() {
    const {
      props: { video },
      state: { controls, time, playing, volume, muted }
    } = this
    return (
      <Container
        controls={controls}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <Video ref={this.video} src={video.videoURL} onTimeUpdate={this.onTimeUpdate} />
        <div className="controls">
          <div className="controls-top">
            <TimeSlider
              duration={video.duration}
              time={time}
              onTimeChange={this.onTimeChange}
              onSlideStart={this.onSlideStart}
              onSlideEnd={this.onSlideEnd}
            />
          </div>
          <div className="controls-bottom">
            <div className="icon" onClick={this.onPlayPause}>
              {playing ? <Pause /> : <PlayArrow />}
            </div>
            <div className="icon">
              <SkipNext />
            </div>
            <div className="icon" onClick={this.onVolumeClick}>
              {muted || volume === 0 ? (
                <VolumeOff />
              ) : volume < 0.33 ? (
                <VolumeMute />
              ) : volume < 0.66 ? (
                <VolumeDown />
              ) : (
                <VolumeUp />
              )}
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default Player
