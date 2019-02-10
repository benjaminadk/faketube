import styled from 'styled-components'
import Router from 'next/router'
import { darken } from 'polished'
import ShareTab from './ShareTab'
import EmailTab from './EmailTab'

const Title = styled.div`
  justify-self: flex-start;
  font-family: 'Roboto Bold';
  cursor: pointer;
`

const Container = styled.div`
  margin-bottom: 4rem;
  .tabs {
    display: flex;
    border-bottom: 1px solid ${props => props.theme.grey[5]};
    margin-bottom: 1.5rem;
  }
`

const Tab = styled.div`
  font-family: 'Roboto Bold';
  color: ${props => (props.selected ? props.theme.black[0] : props.theme.grey[5])};
  border-bottom: 2px solid
    ${props => (props.selected ? darken(0.1, props.theme.primary) : 'transparent')};
  margin-right: 4rem;
  padding-bottom: 0.75rem;
  cursor: pointer;
`

class SharingBar extends React.Component {
  state = {
    title: '',
    tab: 0,
    to: '',
    message: '',
    emailError: false,
    emailSent: false
  }

  shareInput = React.createRef()

  componentDidMount() {
    this.setState({ title: this.props.title })
  }

  onTitleClick = () => {
    Router.push({ pathname: '/videos', query: { id: this.props.videoID } })
  }

  onTabClick = tab => this.setState({ tab })

  onShareInputClick = () => this.shareInput.current.select()

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onSendEmail = async emailVideo => {
    const { to, title, message } = this.state
    const { videoID, thumbnailURL: thumbURL } = this.props
    if (!to) return this.setState({ emailError: true })
    const res = await emailVideo({
      variables: { data: { to, title, message, videoID, thumbURL } }
    })
    if (res.data.emailVideo.success) {
      this.setState({ emailError: false, emailSent: true, to: '', message: '' })
    } else {
      // error sending emails
    }
  }

  onResetEmail = () => this.setState({ emailSent: false })

  render() {
    const {
      state: { title, tab, to, message, emailError, emailSent },
      props: { videoID, thumbnailURL, user }
    } = this
    const url = `http://localhost:8889/videos?id=${videoID}`
    return (
      <React.Fragment>
        <Title onClick={this.onTitleClick}>{title}</Title>
        <Container>
          <div className="tabs">
            <Tab selected={tab === 0} onClick={() => this.onTabClick(0)}>
              Share
            </Tab>
            <Tab selected={tab === 1} onClick={() => this.onTabClick(1)}>
              Embed
            </Tab>
            <Tab selected={tab === 2} onClick={() => this.onTabClick(2)}>
              Email
            </Tab>
          </div>
          {tab === 0 ? (
            <ShareTab
              inputRef={this.shareInput}
              url={url}
              title={title}
              thumbnailURL={thumbnailURL}
              onShareInputClick={this.onShareInputClick}
            />
          ) : tab === 1 ? (
            <div>embed</div>
          ) : (
            <EmailTab
              emailSent={emailSent}
              emailError={emailError}
              title={title}
              to={to}
              message={message}
              user={user}
              onChange={this.onChange}
              onSendEmail={this.onSendEmail}
              onResetEmail={this.onResetEmail}
            />
          )}
        </Container>
      </React.Fragment>
    )
  }
}

export default SharingBar
