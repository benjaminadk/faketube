import { Fullscreen } from 'styled-icons/material/Fullscreen'
import { IconButton } from './VolumeButton'

const FullscreenButton = ({ onClick }) => (
  <IconButton width={4} size={3} onClick={onClick}>
    <Fullscreen />
  </IconButton>
)

export default FullscreenButton
