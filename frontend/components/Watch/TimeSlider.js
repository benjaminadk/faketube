import styled from 'styled-components'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'
import formatDuration from '../../lib/formatDuration'

const rootStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
}

const TimeRail = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => (props.grow ? '.6rem' : '.3rem')};
  left: 0;
  cursor: pointer;
  background: ${props => props.theme.grey[14]};
  opacity: 0.5;
  transition: height 0.2s;
`

const TimeHandle = styled.div.attrs(props => ({
  style: {
    left: props.percent - 1 + '%'
  }
}))`
  display: ${props => (props.grow ? 'block' : 'none')};
  position: absolute;
  top: -2px;
  width: 1.2rem;
  height: 1.2rem;
  background: ${props => props.theme.primary};
  border-radius: 50%;
  cursor: pointer;
`

function Handle({ handle: { value, percent, id }, grow, getHandleProps }) {
  return <TimeHandle percent={percent} grow={grow} {...getHandleProps(id)} />
}

const TimeTrack = styled.div.attrs(({ target, source }) => ({
  style: { width: target.percent - source.percent + '%' }
}))`
  position: absolute;
  left: 0;
  z-index: 1;
  height: ${props => (props.grow ? '.6rem' : '.3rem')};
  background: ${props => props.theme.primary};
  cursor: pointer;
  transition: height 0.2s;
`

function Track({ time, source, target, grow, getTrackProps, onMouseEnter, onMouseLeave }) {
  return (
    <React.Fragment>
      <TimeTrack
        grow={grow}
        source={source}
        target={target}
        {...getTrackProps()}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </React.Fragment>
  )
}

class TimeSlider extends React.Component {
  state = {
    grow: false
  }

  onMouseEnter = () => {
    clearTimeout(this.timeout)
    this.setState({ grow: true })
  }

  onMouseLeave = () => {
    this.timeout = setTimeout(() => this.setState({ grow: false }), 1000)
  }

  onMouseMove = e => {
    console.log(e.clientX)
  }

  render() {
    const {
      props: { duration, time, onTimeChange, onSlideStart, onSlideEnd },
      state: { grow }
    } = this
    return (
      <Slider
        mode={1}
        step={1}
        domain={[0, duration]}
        values={[time]}
        rootStyle={rootStyle}
        onChange={onTimeChange}
        onSlideStart={onSlideStart}
        onSlideEnd={onSlideEnd}
      >
        <Rail>
          {({ getRailProps }) => (
            <React.Fragment>
              <TimeRail
                grow={grow}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onMouseMove={this.onMouseMove}
                {...getRailProps()}
              />
            </React.Fragment>
          )}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div>
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  grow={grow}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks right={false}>
          {({ tracks, getTrackProps }) => (
            <div>
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  time={time}
                  grow={grow}
                  source={source}
                  target={target}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    )
  }
}

export default TimeSlider
