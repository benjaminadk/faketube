import styled from 'styled-components'
import { darken } from 'polished'
import { withApollo } from 'react-apollo'
import { SIGN_S3_MUTATION } from '../../apollo/signS3'
import { ME_QUERY } from '../../apollo/me'
import axios from 'axios'
import { PhotoCamera } from 'styled-icons/material/PhotoCamera'
import { Search } from 'styled-icons/material/Search'
import formatFilename from '../../lib/formatFilename'
import Background from './Background'
import UnderlinedInput from '../Shared/UnderlinedInput'

const Container = styled.div`
  width: 100%;
  display: flex;
  .spacer {
    width: ${props => (props.drawer ? '24rem' : 0)};
    transition: width 0.25s ease-out;
  }
  .content {
    width: 100%;
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

const tabs = ['home', 'videos', 'playlists', 'channels', 'discussion', 'about']

class Channel extends React.Component {
  state = {
    asOwner: false,
    tab: 0,
    showSearch: false,
    focusSearch: false,
    search: ''
  }

  file1 = React.createRef()
  file2 = React.createRef()

  componentDidMount() {
    const { user, query } = this.props
    if (user.id === query.id) {
      this.setState({ asOwner: true })
    }
  }

  onBackgroundClick = () => this.file1.current.click()

  onUserImageClick = () => this.file2.current.click()

  onImageChange = async (e, updateUser, background) => {
    const { client, user } = this.props
    const file = e.target.files[0]
    const filename = formatFilename('user', user.id, 'images', file.name)
    const filetype = file.type
    const res1 = await client.mutate({
      mutation: SIGN_S3_MUTATION,
      variables: { filename, filetype }
    })
    const { success: success1, requestURL, fileURL } = res1.data.signS3
    if (!success1) {
      return // error getting signed url
    }
    await axios({
      method: 'PUT',
      url: requestURL,
      headers: {
        'Content-Type': filetype
      },
      data: file
    })
    const data = background ? { backgroundImage: fileURL } : { image: fileURL }
    await updateUser({
      variables: { id: user.id, data },
      refetchQueries: [{ query: ME_QUERY }]
    })
  }

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
      props: { user, drawer },
      state: { asOwner, tab, showSearch, focusSearch, search }
    } = this
    return (
      <Container drawer={drawer}>
        <div className="spacer" />
        <div className="content">
          <Background
            inputRef={this.file1}
            image={user.backgroundImage}
            onClick={this.onBackgroundClick}
            onChange={this.onImageChange}
          />
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
              <UnderlinedInput
                ref={el => (this.search = el)}
                show={showSearch}
                focus={focusSearch}
                name="search"
                placeholder="Search"
                value={search}
                background="grey"
                onChange={this.onChange}
                onFocus={this.onSearchFocus}
                onBlur={this.onSearchBlur}
              />
            </div>
          </Tabs>
        </div>
      </Container>
    )
  }
}

export default withApollo(Channel)
