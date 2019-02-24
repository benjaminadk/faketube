import styled, { keyframes } from 'styled-components'
import { PlayArrow } from 'styled-icons/material/PlayArrow'
import { Pause } from 'styled-icons/material/Pause'

const grow = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(2);
    opacity: 0;
  }
`

const Container = styled.div.attrs(props => ({}))`
  position: absolute;
  top: calc(50% - 2rem);
  left: calc(50% - 2rem);
  width: 4rem;
  height: 4rem;
  display: ${props => (props.show ? 'grid' : 'none')};
  align-items: center;
  justify-items: center;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 50%;
  animation: ${grow} 1s forwards;
  svg {
    width: 2rem;
    height: 2rem;
    color: ${props => props.theme.white};
  }
`

export default class OverlayIcon extends React.Component {
  state = {
    show: false,
    play: true
  }

  componentDidUpdate(prevProps) {
    if (prevProps.playing !== this.props.playing) {
      this.setState({ show: true, play: this.props.playing })
      setTimeout(() => this.setState({ show: false }), 1000)
    }
  }

  render() {
    const {
      state: { show, play }
    } = this
    return <Container show={show}>{play ? <PlayArrow /> : <Pause />}</Container>
  }
}
