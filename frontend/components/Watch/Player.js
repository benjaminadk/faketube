import styled from 'styled-components'
import TimeSlider from './TimeSlider'
import PlayButton from './Controls/PlayButton'
import SkipButton from './Controls/SkipButton'
import VolumeButton from './Controls/VolumeButton'
import VolumeSlider from './VolumeSlider'
import TimeDisplay from './Controls/TimeDisplay'
import SettingsButton from './Controls/SettingsButton'
import MiniButton from './Controls/MiniButton'
import TheaterButton from './Controls/TheaterButton'
import FullscreenButton from './Controls/FullscreenButton'

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
      justify-content: space-between;
      & > :first-child,
      & > :last-child {
        display: flex;
      }
    }
  }
`

const VolumeWrapper = styled.div`
  width: ${props => (props.show ? '6rem' : 0)};
  display: grid;
  justify-items: center;
  align-items: center;
  transition: 0.25s;
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
    showVolume: false,
    volume: 0.75,
    muted: false
  }

  video = React.createRef()

  onMouseEnter = () => this.setState({ controls: true })

  onMouseLeave = () => {
    if (this.state.playing) {
      this.setState({ controls: false })
    }
  }

  onTimeUpdate = () => this.setState({ time: Math.ceil(this.video.current.currentTime) })

  onTimeChange = values => {
    const time = values[0]
    if (this.state.playing) {
      this.video.current.currentTime = time
    }
    this.setState({ time })
  }

  onTimeSlideStart = async values => {
    await this.setState({ playing: false })
    const time = values[0]
    this.video.current.currentTime = time
    this.video.current.pause()
    this.setState({ time })
  }

  onTimeSlideEnd = values => {
    const time = values[0]
    this.video.current.currentTime = time
    this.video.current.play()
    this.setState({ time, playing: true })
  }

  onPlayPauseClick = () => {
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
      volume = 0.5
      this.video.current.muted = false
      this.video.current.volume = volume
    } else {
      volume = 0
      this.video.current.muted = true
      this.video.current.volume = volume
    }
    this.setState({ muted: !muted, volume })
  }

  onVolumeChange = values => {
    const volume = values[0]
    if (volume === 0) {
      this.video.current.muted = true
    }
    this.video.current.volume = volume
    this.setState({ volume, muted: volume === 0 })
  }

  onShowVolume = () => this.setState({ showVolume: true })

  onHideVolume = () => this.setState({ showVolume: false })

  render() {
    const {
      props: { video },
      state: { controls, time, playing, showVolume, volume, muted }
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
              onTimeSlideStart={this.onTimeSlideStart}
              onTimeSlideEnd={this.onTimeSlideEnd}
            />
          </div>
          <div className="controls-bottom">
            <div onMouseLeave={this.onHideVolume}>
              <PlayButton playing={playing} onClick={this.onPlayPauseClick} />
              <SkipButton />
              <VolumeButton
                muted={muted}
                volume={volume}
                onClick={this.onVolumeClick}
                onMouseEnter={this.onShowVolume}
              />
              <VolumeWrapper show={showVolume}>
                <VolumeSlider
                  volume={volume}
                  show={showVolume}
                  onVolumeChange={this.onVolumeChange}
                />
              </VolumeWrapper>
              <TimeDisplay time={time} duration={video.duration} />
            </div>
            <div>
              <SettingsButton />
              <MiniButton />
              <TheaterButton />
              <FullscreenButton />
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default Player
