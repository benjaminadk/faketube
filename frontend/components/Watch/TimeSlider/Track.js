import styled from 'styled-components'

const TimeTrack = styled.div.attrs(({ target, source }) => ({
  style: { width: target.percent - source.percent + '%' }
}))`
  position: absolute;
  left: 0;
  z-index: 1;
  height: ${props => (props.hovered ? '.5rem' : '.4rem')};
  background: ${props => props.theme.primary};
  cursor: pointer;
`

class Track extends React.Component {
  onMouseEnter = () => {
    this.props.setHovered(true)
  }

  onMouseLeave = () => {
    this.props.setHovered(false)
  }

  render() {
    const { source, target, hovered, getTrackProps } = this.props
    return (
      <TimeTrack
        {...getTrackProps({
          source,
          target,
          hovered,
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave
        })}
      />
    )
  }
}

export default Track
