import styled from 'styled-components'
import { darken } from 'polished'
import { PhotoCamera } from 'styled-icons/material/PhotoCamera'
import { Search } from 'styled-icons/material/Search'

const Container = styled.div`
  .background {
    height: 35vh;
    background: pink;
  }
  .user-row {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 10rem 0;
    background: ${props => props.theme.grey[1]};
    .user-left {
      display: flex;
      align-items: center;
      .user-image {
        position: relative;
        margin-right: 2rem;
        cursor: pointer;
        img {
          width: 8rem;
          height: 8rem;
          border-radius: 50%;
        }
        .overlay {
          position: absolute;
          top: 2rem;
          left: 1.75rem;
          display: none;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 50%;
          svg {
            color: ${props => props.theme.white};
            margin: 1rem;
          }
        }
        input[type='file'] {
          display: none;
        }
      }
      .user-subs {
        & > :first-child {
          font-size: 2.4rem;
        }
        & > :last-child {
          font-size: 1.4rem;
          color: ${props => props.theme.grey[12]};
        }
      }
      .user-image:hover .overlay {
        display: block;
      }
    }
    .user-right {
      button {
        background: ${props => darken(0.2, props.theme.secondary)};
        color: ${props => props.theme.white};
        text-transform: uppercase;
        padding: 1rem 2rem;
        border: 0;
        outline: 0;
        border-radius: 2px;
        font-family: 'Roboto Bold';
        margin-right: 2rem;
        margin-top: 2rem;
      }
    }
  }
`

const Tabs = styled.div`
  display: flex;
  padding: 0 10rem;
  background: ${props => props.theme.grey[1]};
  .search {
    display: flex;
    padding: 1rem 1rem 1.5rem 3rem;
    cursor: pointer;
    svg {
      width: 2.25rem;
      height: 2.25rem;
      color: ${props => props.theme.grey[10]};
      margin-right: 1rem;
    }
  }
`

const Tab = styled.div`
  font-family: 'Roboto Bold';
  font-size: 1.4rem;
  color: ${props => (props.selected ? props.theme.black[2] : props.theme.grey[10])};
  text-transform: uppercase;
  padding: 1.5rem 3rem;
  border-bottom: 3px solid ${props => (props.selected ? props.theme.grey[10] : 'transparent')};
  cursor: pointer;
`

const SearchInput = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  input {
    background: ${props => props.theme.grey[1]};
    outline: 0;
    border: 0;
  }
  .underline {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 0.1rem;
    background: ${props => props.theme.black[0]};
    & > :first-child,
    & > :last-child {
      opacity: ${props => (props.focus ? 1 : 0)};
      width: ${props => (props.focus ? '50%' : '0%')};
      height: 0.22rem;
      background: ${props => props.theme.black[2]};
      transition: width 0.3s;
    }
  }
`

const tabs = ['home', 'videos', 'playlists', 'channels', 'discussion', 'about']

class Channel extends React.Component {
  state = {
    asOwner: false,
    tab: 0,
    showSearch: false,
    focusSearch: false,
    search: ''
  }

  componentDidMount() {
    const { user, query } = this.props
    if (user.id === query.id) {
      this.setState({ asOwner: true })
    }
  }

  onUserImageClick = () => this.file2.click()

  onUserImageChange = async e => {}

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value })

  onTabClick = tab => this.setState({ tab })

  onSearchClick = () => {
    this.setState({ showSearch: true }, () => this.search.focus())
  }

  onSearchFocus = () => this.setState({ focusSearch: true })

  onSearchBlur = () => this.setState({ showSearch: false, focusSearch: false })

  render() {
    const {
      props: { user },
      state: { asOwner, tab, showSearch, focusSearch, search }
    } = this
    return (
      <Container>
        <div className="background" />
        <div className="user-row">
          <div className="user-left">
            <div className="user-image">
              <img src={user.image} />
              <input
                ref={el => (this.file2 = el)}
                type="file"
                accept="image/*"
                multiple={false}
                onChange={this.onUserImageChange}
              />
              <div className="overlay">
                <PhotoCamera size={25} />
              </div>
            </div>
            <div className="user-subs">
              <div>{user.name}</div>
              <div>124 subscribers</div>
            </div>
          </div>
          {asOwner ? (
            <div className="user-right">
              <button>customize channel</button>
              <button>creator studio</button>
            </div>
          ) : (
            <div />
          )}
        </div>
        <Tabs>
          {tabs.map((t, i) => (
            <Tab key={t} selected={tab === i} onClick={() => this.onTabClick(i)}>
              {t}
            </Tab>
          ))}
          <div className="search">
            <Search onClick={this.onSearchClick} />
            <SearchInput show={showSearch} focus={focusSearch}>
              <input
                ref={el => (this.search = el)}
                name="search"
                value={search}
                onChange={this.onChange}
                onFocus={this.onSearchFocus}
                onBlur={this.onSearchBlur}
              />
              <div className="underline">
                <div />
                <div />
              </div>
            </SearchInput>
          </div>
        </Tabs>
      </Container>
    )
  }
}

export default Channel
