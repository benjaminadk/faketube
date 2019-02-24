import { Mutation } from 'react-apollo'
import { Add } from 'styled-icons/material/Add'
import { CheckBox } from 'styled-icons/material/CheckBox'
import { CheckBoxOutlineBlank } from 'styled-icons/material/CheckBoxOutlineBlank'
import { Public } from 'styled-icons/material/Public'
import { Lock } from 'styled-icons/material/Lock'
import { TOGGLE_PLAYLIST_MUTATION } from '../apollo/togglePlaylist'
import { ME_QUERY } from '../apollo/me'
import { PlaylistStyles, ListItem } from './styles/PlaylistTool'

class PlaylistTool extends React.Component {
  state = {
    checked: [],
    bottom: false
  }

  onCheckClick = async (i, togglePlaylist) => {
    const {
      props: { videoID, playlists },
      state: { checked }
    } = this
    if (checked.includes(i)) {
      this.setState({ checked: checked.filter((c, j) => c !== i) })
      await togglePlaylist({
        variables: { id: playlists[i].id, videoID, status: false },
        refetchQueries: [{ query: ME_QUERY }]
      })
    } else {
      checked.push(i)
      this.setState({ checked: checked })
      await togglePlaylist({
        variables: { id: playlists[i].id, videoID, status: true },
        refetchQueries: [{ query: ME_QUERY }]
      })
    }
  }

  render() {
    const {
      props: { show, playlists },
      state: { checked, bottom }
    } = this
    return (
      <PlaylistStyles show={show}>
        <div className="top">Save to...</div>
        <div className="main">
          {playlists.map((p, i) => {
            return (
              <Mutation key={p.id} mutation={TOGGLE_PLAYLIST_MUTATION}>
                {(togglePlaylist, { loading }) => (
                  <ListItem onClick={() => this.onCheckClick(i, togglePlaylist)}>
                    {checked.indexOf(i) !== -1 ? (
                      <CheckBox className="check blue" />
                    ) : (
                      <CheckBoxOutlineBlank className="check" />
                    )}
                    <div className="item-text">{p.name}</div>
                    {p.name === 'Watch later' ? (
                      <Lock className="globe" />
                    ) : (
                      <Public className="globe" />
                    )}
                  </ListItem>
                )}
              </Mutation>
            )
          })}
        </div>
        <div className="bottom">
          {bottom ? (
            <div className="final" />
          ) : (
            <div className="initial">
              <Add />
              <div>Create new playlist</div>
            </div>
          )}
        </div>
      </PlaylistStyles>
    )
  }
}

export default PlaylistTool
