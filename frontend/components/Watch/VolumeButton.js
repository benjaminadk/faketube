import styled from 'styled-components'
import { darken } from 'polished'
import { VolumeOff } from 'styled-icons/material/VolumeOff'
import { VolumeMute } from 'styled-icons/material/VolumeMute'
import { VolumeDown } from 'styled-icons/material/VolumeDown'
import { VolumeUp } from 'styled-icons/material/VolumeUp'

export const IconButton = styled.div`
  width: ${props => props.width}rem;
  display: grid;
  justify-items: center;
  align-items: center;
  color: ${props => darken(0.05, props.theme.white)};
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.white};
  }
  svg {
    width: ${props => props.size}rem;
    height: ${props => props.size}rem;
    color: inherit;
  }
`

const VolumeButton = ({ muted, volume, onClick, onMouseEnter }) => (
  <IconButton width={4} size={2.5} onClick={onClick} onMouseEnter={onMouseEnter}>
    {muted || volume === 0 ? (
      <VolumeOff />
    ) : volume < 0.33 ? (
      <VolumeMute />
    ) : volume < 0.66 ? (
      <VolumeDown />
    ) : (
      <VolumeUp />
    )}
  </IconButton>
)

export default VolumeButton
