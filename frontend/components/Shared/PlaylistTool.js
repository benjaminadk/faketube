import { Mutation } from 'react-apollo'
import { Add } from 'styled-icons/material/Add'
import { CheckBox } from 'styled-icons/material/CheckBox'
import { CheckBoxOutlineBlank } from 'styled-icons/material/CheckBoxOutlineBlank'
import { Public } from 'styled-icons/material/Public'
import { Lock } from 'styled-icons/material/Lock'
import { CREATE_PLAYLIST_MUTATION } from '../../apollo/createPlaylist'
import { TOGGLE_PLAYLIST_MUTATION } from '../../apollo/togglePlaylist'
import { ME_QUERY } from '../../apollo/me'
import sortByDate from '../../lib/sortByDate'
import { PlaylistStyles, ListItem } from './styles/PlaylistTool'
import UnderlinedInput from './UnderlinedInput'

class PlaylistTool extends React.Component {
  state = {
    checked: [],
    bottom: false,
    create: '',
    focus: false
  }

  componentDidMount() {
    this.setChecked()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show && !this.props.show) {
      this.setState({ bottom: false, create: '', focus: false })
    }

    if (prevProps.playlists.length !== this.props.playlists.length) {
      const { checked } = this.state
      this.setState({
        checked: [0, ...checked.map(c => c + 1)]
      })
    }

    if (prevProps.videoID !== this.props.videoID) {
      this.setChecked()
    }
  }

  setChecked = () => {
    const {
      props: { playlists, videoID }
    } = this
    const checked = sortByDate(playlists).map((p, i) => {
      if (p.videos.find(v => v.id === videoID)) {
        return i
      }
    })
    this.setState({ checked })
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

  onCreatePlaylist = async createPlaylist => {
    const {
      props: { videoID },
      state: { create }
    } = this
    if (!create) return // error create is required
    const res = await createPlaylist({
      variables: { id: videoID, data: { name: create } },
      refetchQueries: [{ query: ME_QUERY }]
    })
    const { success } = res.data.createPlaylist
    if (!success) {
      return // error creating playlist
    }
    this.setState({ create: '' })
  }

  onBottomClick = () => {
    this.setState({ bottom: true })
    this.onFocus()
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onFocus = () => {
    this.setState({ focus: true }, () => this.create.focus())
  }

  onBlur = () => this.setState({ focus: false })

  render() {
    const {
      props: { show, playlists },
      state: { checked, bottom, create, focus }
    } = this
    return (
      <PlaylistStyles show={show}>
        <div className="top">Save to...</div>
        <div className="main">
          {sortByDate(playlists).map((p, i) => {
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
            <div className="final">
              <div className="create-input">
                <div>Name</div>
                <UnderlinedInput
                  ref={el => (this.create = el)}
                  show={true}
                  focus={focus}
                  name="create"
                  placeholder="Enter playlist name..."
                  maxLength={150}
                  value={create}
                  background="white"
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                />
                <div>{create.length}/150</div>
              </div>
              <Mutation mutation={CREATE_PLAYLIST_MUTATION}>
                {createPlaylist => (
                  <div
                    className="create-button"
                    onClick={() => this.onCreatePlaylist(createPlaylist)}
                  >
                    create
                  </div>
                )}
              </Mutation>
            </div>
          ) : (
            <div className="initial" onClick={this.onBottomClick}>
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
