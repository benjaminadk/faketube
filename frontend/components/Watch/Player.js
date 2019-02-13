import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Controls from './Controls'
import { VIDEO_QUERY } from '../../apollo/video'
import { ME_QUERY } from '../../apollo/me'

const CREATE_VIEW_MUTATION = gql`
  mutation CREATE_VIEW_MUTATION($id: ID!) {
    createView(id: $id) {
      success
      view {
        complete
        progress
      }
    }
  }
`

const UPDATE_VIEW_MUTATION = gql`
  mutation UPDATE_VIEW_MUTATION($id: ID!, $data: ViewCreateInput) {
    updateView(id: $id, data: $data) {
      success
      view {
        complete
        progress
      }
    }
  }
`

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
    muted: false,
    view: null
  }

  video = React.createRef()

  componentDidMount() {
    this.createVideoView()
    this.video.current.addEventListener('ended', () => this.onUpdateView(true))
  }

  async componentWillUnmount() {
    await this.onUpdateView(false)
  }

  createVideoView = async () => {
    const {
      user: { views },
      query,
      client
    } = this.props
    const view = views.find(v => v.video.id === query.id)
    if (view) {
      const time = view.complete || view.progress === 0 ? 0 : view.progress
      this.video.current.currentTime = time
      await this.setState({ view, time })
      return
    } else {
      const res = await client.mutate({
        mutation: CREATE_VIEW_MUTATION,
        variables: { id: query.id },
        refetchQueries: [{ query: VIDEO_QUERY, variables: { id: query.id } }, { query: ME_QUERY }]
      })
      this.setState({ view: res.data.createView.view })
    }
  }

  onUpdateView = async complete => {
    this.video.current.removeEventListener('ended', () => this.onUpdateView(true))
    const {
      state: { view, time },
      props: { client, query }
    } = this
    await client.mutate({
      mutation: UPDATE_VIEW_MUTATION,
      variables: { id: view.id, data: { complete, progress: time } },
      refetchQueries: [{ query: VIDEO_QUERY, variables: { id: query.id } }, { query: ME_QUERY }]
    })
  }

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
