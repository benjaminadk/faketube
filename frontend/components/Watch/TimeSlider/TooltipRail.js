import styled from 'styled-components'
import formatDuration from '../../../lib/formatDuration'

function formatLeft(x) {
  if (x - 10 < 0) return 0
  else if (x - 10 > 80) return 80
  else {
    return x - 10
  }
}

const TimeRail = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => (props.hovered ? '.6rem' : '.35rem')};
  left: 0;
  cursor: pointer;
  background: ${props => props.theme.grey[10]};
  opacity: 0.5;
  transition: height 0.2s;
`

const Tooltip = styled.div.attrs(props => ({
  style: {
    left: formatLeft(props.percent) + '%'
  }
}))`
  position: absolute;
  bottom: 2rem;
  width: 16.8rem;
  height: 9.4rem;
  display: ${props => (props.hovered ? 'flex' : 'none')};
  justify-content: center;
  align-items: flex-end;
  background: white;
  & > :first-child {
    font-family: 'Roboto Bold';
    font-size: 1.3rem;
    background: rgba(0, 0, 0, 0.75);
    color: ${props => props.theme.white};
    border-radius: 2px;
    padding: 0.5rem 1rem;
  }
`

class TooltipRail extends React.Component {
  state = {
    value: null,
    percent: null
  }

  onMouseEnter = () => {
    this.props.setHovered(true)
    document.body.addEventListener('mousemove', this.onMouseMove)
  }

  onMouseLeave = () => {
    this.props.setHovered(false)
    this.setState({ value: null, percent: null })
    document.removeEventListener('mousemove', this.onMouseMove)
  }

  onMouseMove = e => {
    const { activeHandleID, getEventData } = this.props

    if (activeHandleID) {
      this.setState({ value: null, percent: null })
    } else {
      this.setState(getEventData(e))
    }
  }

  render() {
    const { value, percent } = this.state
    const { activeHandleID, getRailProps, hovered } = this.props
    return (
      <React.Fragment>
        <TimeRail
          {...getRailProps({
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            hovered
          })}
        />
        {!activeHandleID && value ? (
          <Tooltip hovered={hovered} percent={percent}>
            <div>{formatDuration(value)}</div>
          </Tooltip>
        ) : null}
      </React.Fragment>
    )
  }
}

export default TooltipRail
