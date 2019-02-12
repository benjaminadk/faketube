import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'
import styled from 'styled-components'
import VolumeHandle from './Handle'

const VolumeRail = styled.div`
  height: 0.3rem;
  background: ${props => props.theme.grey[5]};
  opacity: 0.6;
  cursor: pointer;
`

const VolumeTrack = styled.div.attrs(({ target, source }) => ({
  style: { width: target.percent - source.percent + '%' }
}))`
  position: absolute;
  left: 0;
  bottom: 0.25px;
  z-index: 1;
  height: 0.3rem;
  background: ${props => props.theme.white};
  cursor: pointer;
`

const rootStyle = {
  position: 'relative',
  width: '100%',
  alignSelf: 'center'
}

class VolumeSlider extends React.Component {
  state = {}
  render() {
    const {
      props: { volume, show, onVolumeChange }
    } = this
    return (
      <Slider
        mode={1}
        step={0.01}
        domain={[0, 1]}
        values={[volume]}
        rootStyle={rootStyle}
        onChange={onVolumeChange}
      >
        <Rail>{({ getRailProps }) => <VolumeRail {...getRailProps()} />}</Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div>
              {handles.map(handle => (
                <VolumeHandle
                  key={handle.id}
                  show={show}
                  handle={handle}
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
                <VolumeTrack key={id} source={source} target={target} {...getTrackProps()} />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    )
  }
}

export default VolumeSlider
