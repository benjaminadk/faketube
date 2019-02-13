import styled from 'styled-components'
import TimeSlider from '../TimeSlider'
import PlayButton from './PlayButton'
import SkipButton from './SkipButton'
import VolumeButton from './VolumeButton'
import VolumeSlider from '../VolumeSlider'
import TimeDisplay from './TimeDisplay'
import SettingsButton from './SettingsButton'
import MiniButton from './MiniButton'
import TheaterButton from './TheaterButton'
import FullscreenButton from './FullscreenButton'

const Container = styled.div`
  position: absolute;
  bottom: 0.25rem;
  left: 0;
  width: 100%;
  height: 10%;
  opacity: ${props => (props.controls ? 1 : 0)};
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.85));
  padding: 0.5rem 1rem;
  transition: all 0.25s;
  .controls-top {
    margin-bottom: 0.5rem;
  }
  .controls-bottom {
    height: 100%;
    display: flex;
    justify-content: space-between;
    & > :first-child,
    & > :last-child {
      display: flex;
    }
  }
`

const VolumeWrapper = styled.div`
  width: ${props => (props.show ? '6rem' : 0)};
  display: grid;
  justify-items: center;
  align-items: center;
  transition: 0.25s;
`

const Controls = ({
  src,
  controls,
  playing,
  time,
  duration,
  muted,
  volume,
  showVolume,
  onTimeChange,
  onTimeSlideStart,
  onTimeSlideEnd,
  onHideVolume,
  onShowVolume,
  onVolumeClick,
  onVolumeChange,
  onPlayPauseClick
}) => (
  <Container controls={controls}>
    <div className="controls-top">
      <TimeSlider
        src={src}
        duration={duration}
        time={time}
        onTimeChange={onTimeChange}
        onTimeSlideStart={onTimeSlideStart}
        onTimeSlideEnd={onTimeSlideEnd}
      />
    </div>
    <div className="controls-bottom">
      <div onMouseLeave={onHideVolume}>
        <PlayButton playing={playing} onClick={onPlayPauseClick} />
        <SkipButton />
        <VolumeButton
          muted={muted}
          volume={volume}
          onClick={onVolumeClick}
          onMouseEnter={onShowVolume}
        />
        <VolumeWrapper show={showVolume}>
          <VolumeSlider volume={volume} show={showVolume} onVolumeChange={onVolumeChange} />
        </VolumeWrapper>
        <TimeDisplay time={time} duration={duration} />
      </div>
      <div>
        <SettingsButton />
        <MiniButton />
        <TheaterButton />
        <FullscreenButton />
      </div>
    </div>
  </Container>
)

export default Controls
