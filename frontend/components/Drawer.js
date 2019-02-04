import styled from 'styled-components'
import { Menu } from 'styled-icons/material/Menu'
import { Home } from 'styled-icons/material/Home'
import { Whatshot } from 'styled-icons/material/Whatshot'
import { Subscriptions } from 'styled-icons/material/Subscriptions'
import { Folder } from 'styled-icons/material/Folder'
import { History } from 'styled-icons/material/History'
import { WatchLater } from 'styled-icons/material/WatchLater'
import { ThumbUp } from 'styled-icons/material/ThumbUp'

const Backdrop = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`

const Container = styled.div`
  width: 24rem;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  transform: ${props => (props.show ? `translateX(0)` : `translateX(-100%)`)};
  transition: all 0.5s ease-out;
  background: ${props => props.theme.white};
  .header {
    height: 5.5rem;
    display: grid;
    grid-template-columns: 8rem 10rem;
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
  }
  .menu {
    display: flex;
    flex-direction: column;
    padding: 1.2rem 0;
    border-bottom: 1px solid ${props => props.theme.grey[2]};
    .menu-item {
      min-height: 4rem;
      display: flex;
      align-items: center;
      padding: 0 2.4rem;
      cursor: pointer;
      &:hover {
        background: ${props => props.theme.grey[1]};
      }
      & > :first-child {
        margin-right: 2.4rem;
        svg {
          width: 2.4rem;
          height: 2.4rem;
          color: ${props => props.theme.grey[8]};
        }
      }
      & > :last-child {
        font-family: 'Roboto';
        font-size: 1.4rem;
      }
    }
  }
`

const menu1 = [
  { text: 'Home', icon: <Home /> },
  { text: 'Trending', icon: <Whatshot /> },
  { text: 'Subscriptions', icon: <Subscriptions /> }
]

const menu2 = [
  { text: 'Library', icon: <Folder /> },
  { text: 'History', icon: <History /> },
  { text: 'Watch later', icon: <WatchLater /> },
  { text: 'Liked videos', icon: <ThumbUp /> }
]

const Drawer = ({ show, closeDrawer }) => (
  <React.Fragment>
    <Backdrop show={show} />
    <Container show={show}>
      <div className="header">
        <div className="drawer-button">
          <Menu onClick={closeDrawer} />
        </div>
        <div className="logo">
          <img src="https://s3-us-west-1.amazonaws.com/faketube/assets/fake-tube-light.png" />
        </div>
      </div>
      <div className="menu">
        {menu1.map(m => (
          <div key={m.text} className="menu-item">
            <span>{m.icon}</span>
            <span>{m.text}</span>
          </div>
        ))}
      </div>
      <div className="menu">
        {menu2.map(m => (
          <div key={m.text} className="menu-item">
            <span>{m.icon}</span>
            <span>{m.text}</span>
          </div>
        ))}
      </div>
    </Container>
  </React.Fragment>
)

export default Drawer
