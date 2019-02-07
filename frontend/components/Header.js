import styled from 'styled-components'
import Router from 'next/router'
import NProgress from 'nprogress'
import { darken } from 'polished'
import { Menu } from 'styled-icons/material/Menu'
import { Search } from 'styled-icons/material/Search'
import { Videocam } from 'styled-icons/material/Videocam'
import { Apps } from 'styled-icons/material/Apps'
import { Chat } from 'styled-icons/material/Chat'
import { Notifications } from 'styled-icons/material/Notifications'
import { MoreVert } from 'styled-icons/material/MoreVert'
import SignIn from './SignIn'

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

const Container = styled.div`
  height: 5.5rem;
  display: grid;
  grid-template-columns: 8rem 10rem 1fr 28rem;
  border-bottom: 1px solid ${props => props.theme.grey[2]};
  .drawer-button {
    display: grid;
    justify-items: center;
    align-items: center;
    svg {
      width: 2.5rem;
      height: 2.5rem;
      color: ${props => props.theme.grey[8]};
      cursor: pointer;
    }
  }
  .logo {
    display: grid;
    justify-items: center;
    align-items: center;
    img {
      height: 2rem;
    }
  }
  .search {
    display: grid;
    justify-items: center;
    align-items: center;
    .bar {
      display: flex;
      justify-content: center;
      width: 100%;
      input[type='text'] {
        width: 66%;
        font-family: 'Roboto';
        font-size: 1.6rem;
        padding: 0.4rem 1rem;
        border: 1px solid ${props => props.theme.grey[5]};
        border-right: 0;
        border-top-left-radius: ${props => props.theme.borderRadius};
        border-bottom-left-radius: ${props => props.theme.borderRadius};
      }
      button {
        width: 6.5rem;
        background: ${props => props.theme.grey[0]};
        color: ${props => props.theme.grey[10]};
        border: 1px solid ${props => props.theme.grey[5]};
        border-top-right-radius: ${props => props.theme.borderRadius};
        border-bottom-right-radius: ${props => props.theme.borderRadius};
        cursor: pointer;
        svg {
          width: 2rem;
          height: 2rem;
          color: inherit;
        }
      }
    }
  }
  .icon-menu {
    display: grid;
    grid-template-columns: repeat(4, 5rem) 8rem;
    justify-items: center;
    align-items: center;
    .icon {
      cursor: pointer;
      svg {
        width: 2rem;
        height: 2rem;
        color: ${props => props.theme.grey[8]};
      }
    }
    .user {
      display: grid;
      justify-items: center;
      align-items: center;
      cursor: pointer;
      .sign-in {
        font-family: 'Roboto Bold';
        font-size: 1.35rem;
        text-transform: uppercase;
        color: ${props => darken(0.2, props.theme.secondary)};
      }
      img {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        border: 1px solid transparent;
        &:active {
          border: 1px solid ${props => props.theme.secondary};
        }
      }
    }
  }
`

class Header extends React.Component {
  render() {
    const {
      props: { user, openDrawer }
    } = this
    return (
      <Container>
        <div className="drawer-button">
          <Menu onClick={openDrawer} />
        </div>
        <div className="logo">
          <img src="https://s3-us-west-1.amazonaws.com/faketube/assets/fake-tube-light.png" />
        </div>
        <div className="search">
          <div className="bar">
            <input type="text" placeholder="Search" />
            <button>
              <Search />
            </button>
          </div>
        </div>
        <div className="icon-menu">
          <div className="icon" onClick={() => Router.push('/upload')}>
            <Videocam />
          </div>
          <div className="icon">
            <Apps />
          </div>
          <div className="icon">
            <Chat />
          </div>
          <div className="icon">{user ? <Notifications /> : <MoreVert />}</div>
          <div className="user">
            {user ? (
              <img src={user.image} />
            ) : (
              <SignIn />
              // <a href="http://localhost:8888/api/google">
              //   <span className="sign-in">Sign in</span>
              // </a>
            )}
          </div>
        </div>
      </Container>
    )
  }
}

export default Header
