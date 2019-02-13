import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import Controls from './Controls'

const Container = styled.div`
  max-width: calc(calc(100vh - 216px) * 16 / 9);
  min-width: calc(480px * 16 / 9);
  position: relative;
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

  componentDidMount() {}

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
      <Container onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <Video ref={this.video} src={video.videoURL} onTimeUpdate={this.onTimeUpdate} />
        <Controls
          controls={controls}
          playing={playing}
          time={time}
          duration={video.duration}
          muted={muted}
          volume={volume}
          showVolume={showVolume}
          onTimeChange={this.onTimeChange}
          onTimeSlideStart={this.onTimeSlideStart}
          onTimeSlideEnd={this.onTimeSlideEnd}
          onPlayPauseClick={this.onPlayPauseClick}
          onVolumeClick={this.onVolumeClick}
          onVolumeChange={this.onVolumeChange}
          onHideVolume={this.onHideVolume}
          onShowVolume={this.onShowVolume}
        />
      </Container>
    )
  }
}

export default withApollo(Player)
