import styled from 'styled-components'
import { darken, transparentize } from 'polished'
import { Mutation } from 'react-apollo'
import { Search } from 'styled-icons/material/Search'
import { CheckBox } from 'styled-icons/material/CheckBox'
import { CheckBoxOutlineBlank } from 'styled-icons/material/CheckBoxOutlineBlank'
import { Public } from 'styled-icons/material/Public'
import { Subscriptions } from 'styled-icons/material/Subscriptions'
import { CREATE_PLAYLIST_MUTATION } from '../../apollo/createPlaylist'
import { TOGGLE_PLAYLIST_MUTATION } from '../../apollo/togglePlaylist'
import { ME_QUERY } from '../../apollo/me'

const PlaylistButton = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 3rem;
  button.add {
    width: 100%;
    font-family: 'Roboto Bold';
    font-size: 1.1rem;
    text-align: left;
    background: ${props => props.theme.grey[0]};
    padding: 0.75rem;
    border: 1px solid ${props => props.theme.grey[5]};
    border-radius: 2px;
    outline: 0;
    cursor: pointer;
    svg {
      width: 1.2rem;
      height: 1.2rem;
      padding: 0;
    }
    &:hover {
      background: ${props => props.theme.grey[1]};
    }
  }
`

const Container = styled.div`
  position: absolute;
  top: 4rem;
  width: 100%;
  display: ${props => (props.show ? 'block' : 'none')};
  background: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.grey[5]};
  box-shadow: ${props => props.theme.shadows[5]};
  .tool-top {
    display: grid;
    justify-items: center;
    align-items: center;
    padding: 1.25rem 2rem;
    .tool-search {
      width: 100%;
      display: flex;
      align-items: center;
      border: 1px solid ${props => props.theme.grey[5]};
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      .search {
        width: 2rem;
        height: 2rem;
        color: ${props => props.theme.grey[5]};
      }
      .search-input {
        border: 0;
        outline: 0;
        font-family: 'Roboto';
      }
    }
  }
  .tool-main {
    max-height: 20rem;
    padding-bottom: 1rem;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 1rem;
    }
    ::-webkit-scrollbar-track {
      background: white;
    }
    ::-webkit-scrollbar-thumb {
      background: ${props => props.theme.grey[3]};
    }
  }
  .tool-bottom {
    border-top: 1px solid ${props => props.theme.grey[5]};
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    .initial {
      font-size: 1.3rem;
      padding: 0.5rem;
      padding-left: 1.5rem;
      cursor: pointer;
      &:hover {
        background: ${props => props.theme.grey[1]};
      }
    }
    .final {
      padding: 1rem 2rem;
      .create-input {
        width: 100%;
        margin-bottom: 1.5rem;
        padding: 0.25rem 1rem;
      }
      .create-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        select {
          width: 7.5rem;
        }
        button.create {
          border: 0;
          outline: 0;
          background: ${props => darken(0.2, props.theme.secondary)};
          color: ${props => props.theme.white};
          font-family: 'Roboto Bold';
          font-size: 1.1rem;
          padding: 0.85rem 1rem;
          border-radius: 2px;
          cursor: pointer;
          &:disabled {
            background: ${props => transparentize(0.8, darken(0.2, props.theme.secondary))};
          }
        }
      }
    }
  }
`

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1.75rem 1fr 1.5rem;
  grid-gap: 0.5rem;
  align-items: center;
  padding: 0.25rem 1.5rem;
  &:hover {
    background: ${props => props.theme.grey[1]};
  }
  .check {
    width: 1.75rem;
    height: 1.75rem;
    color: ${props => props.theme.grey[5]};
  }
  .globe {
    width: 1.35rem;
    height: 1.35rem;
    color: ${props => props.theme.grey[5]};
    cursor: pointer;
  }
  .item-text {
    max-width: 19rem;
    font-size: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 1;
    white-space: nowrap;
    cursor: pointer;
  }
`

const Arrow = styled.div`
  position: absolute;
  top: 3.4rem;
  left: 50%;
  display: ${props => (props.show ? 'block' : 'none')};
  margin-left: -0.7rem;
  &::after {
    content: '';
    display: block;
    width: 1.4rem;
    height: 1.4rem;
    background: ${props => props.theme.white};
    transform: rotate(45deg);
    box-shadow: -1px -1px 1px -1px rgba(0, 0, 0, 0.75);
  }
`

function sortPlaylist(arr) {
  return arr.sort((a, b) => {
    if (b.createdAt > a.createdAt) return 1
    else if (b.createdAt < a.createdAt) return -1
    else return 0
  })
}

export default class PlaylistTool extends React.Component {
  state = {
    show: false,
    search: '',
    bottom: false,
    create: '',
    checked: [],
    playlists: []
  }

  componentDidMount() {
    this.setState({ playlists: sortPlaylist(this.props.playlists) })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.playlists.length !== this.props.playlists.length) {
      const { checked } = this.state
      this.setState({
        playlists: sortPlaylist(this.props.playlists),
        checked: [0, ...checked.map(c => c + 1)]
      })
    }
    if (this.state.search) {
      if (!this.state.bottom) {
        if (!this.props.playlists.find(p => new RegExp(this.state.search, 'i').test(p.name))) {
          if (this.state.create.length !== this.state.search.length) {
            this.setState({ create: this.state.search })
          }
        }
      }
    }
  }

  toggleShow = () => this.setState(({ show }) => ({ show: !show }))

  onCheckClick = async (i, togglePlaylist) => {
    const {
      props: { videoID },
      state: { checked, playlists }
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

  onBottomClick = () => this.setState({ bottom: true })

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onCreatePlaylist = async createPlaylist => {
    const {
      props: { videoID },
      state: { create }
    } = this
    const res = await createPlaylist({
      variables: { id: videoID, data: { name: create } },
      refetchQueries: [{ query: ME_QUERY }]
    })
    const { success, playlist } = res.data.createPlaylist
    if (!success) {
      return // error creating playlist
    }
    this.setState({ playlist, create: '' })
  }

  filterPlaylist = p => {
    const { search } = this.state
    if (!search) {
      return true
    } else {
      return new RegExp(search, 'i').test(p.name)
    }
  }

  render() {
    const {
      props: { videoID },
      state: { show, search, create, bottom, checked, playlists }
    } = this
    return (
      <PlaylistButton>
        <button type="button" className="add" disabled={!videoID} onClick={this.toggleShow}>
          {checked.length ? <Subscriptions /> : '+'}{' '}
          {checked.length > 1
            ? `${checked.length} playlists`
            : checked.length === 0
            ? 'Add to playlist'
            : playlists[checked[0]].name}
        </button>
        <Container show={show}>
          <div className="tool-top">
            <div className="tool-search">
              <Search className="search" />
              <input
                className="search-input"
                type="text"
                name="search"
                value={search}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="tool-main">
            {playlists.map((p, i) => {
              if (!this.filterPlaylist(p)) {
                return null
              }
              return (
                <Mutation key={p.id} mutation={TOGGLE_PLAYLIST_MUTATION}>
                  {(togglePlaylist, { loading }) => (
                    <ListItem onClick={() => this.onCheckClick(i, togglePlaylist)}>
                      {checked.indexOf(i) !== -1 ? (
                        <CheckBox className="check" />
                      ) : (
                        <CheckBoxOutlineBlank className="check" />
                      )}
                      <div className="item-text">{p.name}</div>
                      <Public className="globe" />
                    </ListItem>
                  )}
                </Mutation>
              )
            })}
          </div>
          <div className="tool-bottom">
            {bottom ? (
              <div className="final">
                <input
                  className="create-input"
                  type="text"
                  name="create"
                  value={create}
                  onChange={this.onChange}
                />
                <div className="create-buttons">
                  <select>
                    <option>Public</option>
                    <option>Private</option>
                  </select>
                  <Mutation mutation={CREATE_PLAYLIST_MUTATION}>
                    {(createPlaylist, { loading }) => (
                      <button
                        className="create"
                        onClick={() => this.onCreatePlaylist(createPlaylist)}
                        disabled={!create}
                      >
                        Create
                      </button>
                    )}
                  </Mutation>
                </div>
              </div>
            ) : (
              <div className="initial" onClick={this.onBottomClick}>
                {!bottom && create ? `"${create}" (create new)` : 'Create new playlist'}
              </div>
            )}
          </div>
        </Container>
        <Arrow show={show} />
      </PlaylistButton>
    )
  }
}
