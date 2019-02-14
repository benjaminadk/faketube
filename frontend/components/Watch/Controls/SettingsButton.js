import styled from 'styled-components'
import { Settings } from 'styled-icons/material/Settings'
import { IconButton } from './VolumeButton'

const SettingsIconButton = styled(IconButton)`
  svg {
    transform: ${props => (props.show ? `rotate(60deg)` : `rotate(0)`)};
    transition: all 0.25s ease-in-out;
  }
`

const SettingsButton = ({ show, onShowSettings, onHideSettings }) => (
  <SettingsIconButton
    show={show}
    width={4}
    size={2}
    onClick={show ? onHideSettings : onShowSettings}
  >
    <Settings />
  </SettingsIconButton>
)

export default SettingsButton
