import { IconButton } from './VolumeButton'
import { PlayArrow } from 'styled-icons/material/PlayArrow'
import { Pause } from 'styled-icons/material/Pause'

const PlayButton = ({ playing, onClick }) => (
  <IconButton width={4} size={3} onClick={onClick}>
    {playing ? <Pause /> : <PlayArrow />}
  </IconButton>
)

export default PlayButton
