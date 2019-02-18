import styled from 'styled-components'
import { AccountBox } from 'styled-icons/material/AccountBox'
import { MonetizationOn } from 'styled-icons/material/MonetizationOn'
import { Settings } from 'styled-icons/material/Settings'
import { ExitToApp } from 'styled-icons/material/ExitToApp'
import { Feedback } from 'styled-icons/material/Feedback'
import { Help } from 'styled-icons/material/Help'
import { Translate } from 'styled-icons/material/Translate'
import { Keyboard } from 'styled-icons/material/Keyboard'
import { Brightness4 } from 'styled-icons/material/Brightness4'
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight'

const Container = styled.div`
  position: absolute;
  top: 1rem;
  right: 10rem;
  z-index: 3;
  display: ${props => (props.show ? 'block' : 'none')};
  width: 30rem;
  box-shadow: ${props => props.theme.shadows[2]};
  .menu-top {
    display: grid;
    grid-template-columns: 4rem 1fr;
    grid-gap: 1rem;
    background: ${props => props.theme.grey[1]};
    padding: 2rem;
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      background: ${props => props.theme.white};
    }
    .menu-user {
      & > :first-child {
        font-family: 'Roboto Bold';
        font-size: 1.6rem;
      }
    }
  }
  .menu-main {
    margin-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.grey[3]};
  }
`

const MenuItem = styled.div`
  display: grid;
  grid-template-columns: 2.4rem 1fr 2.4rem;
  align-items: center;
  justify-items: space-between;
  padding: 1rem 1.5rem;
  background: ${props => props.theme.white};
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.grey[2]};
  }
  .menu-text {
    font-size: 1.4rem;
    margin-left: 3rem;
  }
  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: ${props => props.theme.grey[10]};
  }
`

const menu1 = [
  { text: 'My channel', icon: <AccountBox />, arrow: false },
  { text: 'Paid memberships', icon: <MonetizationOn />, arrow: false },
  { text: 'Creator Studio', icon: <Settings />, arrow: false },
  { text: 'Switch account', icon: <AccountBox />, arrow: true },
  { text: 'Sign out', icon: <ExitToApp />, arrow: false }
]

const menu2 = [
  { text: 'Dark theme: Off', icon: <Brightness4 />, arrow: true },
  { text: 'Language: English', icon: <Translate />, arrow: true },
  { text: 'Settings', icon: <Settings />, arrow: false },
  { text: 'Help', icon: <Help />, arrow: false },
  { text: 'Send feedback', icon: <Feedback />, arrow: false },
  { text: 'Keyboard shortcuts', icon: <Keyboard />, arrow: false }
]

class UserMenu extends React.Component {
  state = {}

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      document.body.addEventListener('click', this.props.closeUserMenu)
    }
    if (prevProps.show && !this.props.show) {
      document.body.removeEventListener('click', this.props.closeUserMenu)
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.props.closeUserMenu)
  }

  render() {
    const {
      props: { show, user, closeUserMenu }
    } = this
    return (
      <Container show={true}>
        <div className="menu-top">
          <img src={user.image} />
          <div className="menu-user">
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        </div>
        <div className="menu-main">
          {menu1.map(m => (
            <MenuItem key={m.text}>
              {m.icon}
              <div className="menu-text">{m.text}</div>
              {m.arrow ? <KeyboardArrowRight /> : <div />}
            </MenuItem>
          ))}
        </div>
        <div className="menu-main">
          {menu2.map(m => (
            <MenuItem key={m.text}>
              {m.icon}
              <div className="menu-text">{m.text}</div>
              {m.arrow ? <KeyboardArrowRight /> : <div />}
            </MenuItem>
          ))}
        </div>
      </Container>
    )
  }
}

export default UserMenu
