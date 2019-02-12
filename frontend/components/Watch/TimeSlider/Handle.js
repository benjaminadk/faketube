import styled from 'styled-components'

const TimeHandle = styled.div.attrs(props => ({
  style: {
    left: props.percent - 1 + '%'
  }
}))`
  display: ${props => (props.hovered ? 'block' : 'none')};
  position: absolute;
  top: -3px;
  width: 1.35rem;
  height: 1.35rem;
  background: ${props => props.theme.primary};
  border-radius: 50%;
  cursor: pointer;
`

class Handle extends React.Component {
  onMouseEnter = () => {
    this.props.setHovered(true)
  }

  onMouseLeave = () => {
    this.props.setHovered(false)
  }

  render() {
    const {
      hovered,
      handle: { percent, id },
      getHandleProps
    } = this.props
    return (
      <TimeHandle
        hovered={hovered}
        percent={percent}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        {...getHandleProps(id)}
      />
    )
  }
}

export default Handle
