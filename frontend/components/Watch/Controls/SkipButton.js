import { IconButton } from './VolumeButton'
import { SkipNext } from 'styled-icons/material/SkipNext'

const SkipButton = ({ onClick }) => (
  <IconButton width={4} size={3} onClick={onClick}>
    <SkipNext />
  </IconButton>
)

export default SkipButton
