import styled from 'styled-components'
import { Check } from 'styled-icons/material/Check'
import { KeyboardArrowLeft } from 'styled-icons/material/KeyboardArrowLeft'

const Container = styled.div`
  position: absolute;
  top: ${props => (props.showSpeed ? '-28rem' : '-13rem')};
  right: ${props => (props.showSpeed ? '2rem' : '5rem')};
  display: ${props => (props.show ? 'block' : 'none')};
  width: ${props => (props.showSpeed ? '10rem' : '20rem')};
  background: rgba(0, 0, 0, 0.85);
  transition: all 0.1s;
  cursor: pointer;
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
    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
    & > :first-child {
      font-family: 'Roboto Bold';
      font-size: 1.3rem;
      color: ${props => props.theme.white};
    }
  }
  .speed-top {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid ${props => props.theme.grey[10]};
    & > :last-child {
      font-family: 'Roboto Bold';
      font-size: 1.3rem;
      color: ${props => props.theme.white};
    }
    svg {
      width: 2rem;
      height: 2rem;
      color: ${props => props.theme.white};
    }
  }
`

const SpeedRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
  & > :last-child {
    font-family: 'Roboto Bold';
    font-size: 1.3rem;
    color: ${props => props.theme.white};
  }
  svg {
    opacity: ${props => (props.selected ? 1 : 0)};
    width: 2rem;
    height: 2rem;
    color: ${props => props.theme.white};
    margin-right: 1rem;
  }
`

const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

class SettingsMenu extends React.Component {
  state = {
    showSpeed: false
  }

  onShowSpeed = () => this.setState({ showSpeed: true })

  onHideSpeed = () => this.setState({ showSpeed: false })

  onSpeedChange = s => {
    this.props.onSpeedChange(s)
    this.onHideSpeed()
  }

  render() {
    const {
      props: { show, speed },
      state: { showSpeed }
    } = this
    return (
      <Container show={show} showSpeed={showSpeed}>
        {showSpeed ? (
          <React.Fragment>
            <div className="speed-top" onClick={this.onHideSpeed}>
              <KeyboardArrowLeft />
              <div>Speed</div>
            </div>
            {speeds.map(s => (
              <SpeedRow key={s} selected={s === speed} onClick={() => this.onSpeedChange(s)}>
                <Check />
                <div>{s === 1 ? 'Normal' : s}</div>
              </SpeedRow>
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="settings-row">
              <div>Autoplay</div>
              <div>switch</div>
            </div>
            <div className="settings-row" onClick={this.onShowSpeed}>
              <div>Speed</div>
              <div>normal</div>
            </div>
            <div className="settings-row">
              <div>Quality</div>
              <div>480</div>
            </div>
          </React.Fragment>
        )}
      </Container>
    )
  }
}

export default SettingsMenu
