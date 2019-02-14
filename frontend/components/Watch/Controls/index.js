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

const SettingsMenu = styled.div`
  position: absolute;
  top: -13rem;
  right: 5rem;
  display: ${props => (props.show ? 'block' : 'none')};
  width: 20rem;
  background: rgba(0, 0, 0, 0.85);
  & > :first-child {
    margin-top: 0.5rem;
  }
  & > :last-child {
    margin-bottom: 0.5rem;
  }
  .settings-row {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    cursor: pointer;
    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
    & > :first-child {
      font-family: 'Roboto Bold';
      font-size: 1.3rem;
      color: ${props => props.theme.white};
    }
  }
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
  showSettings,
  onTimeChange,
  onTimeSlideStart,
  onTimeSlideEnd,
  onHideVolume,
  onShowVolume,
  onVolumeClick,
  onVolumeChange,
  onPlayPauseClick,
  onHideSettings,
  onShowSettings
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
        <VolumeSlider volume={volume} show={showVolume} onVolumeChange={onVolumeChange} />
        <TimeDisplay time={time} duration={duration} />
      </div>
      <div>
        <SettingsButton
          show={showSettings}
          onShowSettings={onShowSettings}
          onHideSettings={onHideSettings}
        />
        <MiniButton />
        <TheaterButton />
        <FullscreenButton />
      </div>
    </div>
    <SettingsMenu show={showSettings}>
      <div className="settings-row">
        <div>Autoplay</div>
        <div>switch</div>
      </div>
      <div className="settings-row">
        <div>Speed</div>
        <div>normal</div>
      </div>
      <div className="settings-row">
        <div>Quality</div>
        <div>480</div>
      </div>
    </SettingsMenu>
  </Container>
)

export default Controls
