import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'
import TooltipRail from './TooltipRail'
import Track from './Track'
import Handle from './Handle'
import Buffered from './Buffered'

const rootStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
}

class TimeSlider extends React.Component {
  state = {
    hovered: false
  }

  setHovered = hovered => this.setState({ hovered })

  render() {
    const {
      props: { src, duration, time, buffered, onTimeChange, onTimeSlideStart, onTimeSlideEnd },
      state: { hovered }
    } = this
    return (
      <Slider
        mode={1}
        step={1}
        domain={[0, duration]}
        values={[time]}
        rootStyle={rootStyle}
        onChange={onTimeChange}
        onSlideStart={onTimeSlideStart}
        onSlideEnd={onTimeSlideEnd}
      >
        <Rail>
          {railProps => (
            <TooltipRail {...railProps} src={src} hovered={hovered} setHovered={this.setHovered} />
          )}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div>
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  hovered={hovered}
                  getHandleProps={getHandleProps}
                  setHovered={this.setHovered}
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
                  hovered={hovered}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                  setHovered={this.setHovered}
                />
              ))}
              <Buffered
                buffered={buffered}
                hovered={hovered}
                getTrackProps={getTrackProps}
                setHovered={this.setHovered}
              />
            </div>
          )}
        </Tracks>
      </Slider>
    )
  }
}

export default TimeSlider
