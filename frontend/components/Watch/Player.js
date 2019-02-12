import styled from 'styled-components'
import TimeSlider from './TimeSlider'

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
    background: linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.75));
    padding: 1rem;
    transition: all 0.25s;
    .controls-top {
    }
    .controls-bottom {
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
    playing: true
  }

  video = React.createRef()

  onMouseEnter = () => this.setState({ controls: true })

  onMouseLeave = () => this.setState({ controls: false })

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

  render() {
    const {
      props: { video },
      state: { controls, time }
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
          <div className="controls-bottom">b</div>
        </div>
      </Container>
    )
  }
}

export default Player
