import { Container } from './ShareButton'
import { PlaylistAdd } from 'styled-icons/material/PlaylistAdd'
import PlaylistTool from '../../Shared/PlaylistTool'

export default ({ videoID, playlists, playlistTool, onClick }) => (
  <Container>
    <PlaylistTool
      show={playlistTool}
      videoID={videoID}
      playlists={playlists}
      bottom={25}
      left={70}
    />
    <PlaylistAdd onClick={onClick} />
    <div onClick={onClick}>save</div>
  </Container>
)
