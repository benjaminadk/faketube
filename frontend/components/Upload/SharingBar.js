import styled from 'styled-components'
import Router from 'next/router'
import { darken } from 'polished'
import {
  FacebookShareButton,
  FacebookIcon,
  GooglePlusShareButton,
  GooglePlusIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TumblrShareButton,
  TumblrIcon
} from 'react-share'
import { PriorityHigh } from 'styled-icons/material/PriorityHigh'

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
  .share {
    .icons {
      display: flex;
      margin-bottom: 1rem;
      & > * {
        margin-right: 0.25rem;
        cursor: pointer;
        &:focus {
          outline: 0;
        }
      }
    }
    input {
      width: 66%;
      font-size: 2rem;
      padding: 0.5rem;
      color: ${props => props.theme.grey[10]};
      &:focus {
        outline: 1px solid ${props => darken(0.2, props.theme.secondary)};
      }
    }
  }
  .email {
    display: flex;
    flex-direction: column;
    textarea {
      font-family: 'Roboto';
      font-size: 1.3rem;
      margin-bottom: 1.5rem;
      padding: 0.5rem;
      &:focus {
        outline: 1px solid ${props => darken(0.2, props.theme.secondary)};
      }
    }
    .email-error {
      display: ${props => (props.error ? 'flex' : 'none')};
      align-items: center;
      background: ${props => darken(0.1, props.theme.primary)};
      color: ${props => props.theme.white};
      font-family: 'Roboto Bold';
      font-size: 1.3rem;
      padding: 0.75rem;
      svg {
        width: 3rem;
        height: 3rem;
        color: ${props => props.theme.white};
        margin-right: 10rem;
      }
    }
    .email-subheading {
      font-size: 1.3rem;
      color: ${props => props.theme.grey[10]};
      margin-bottom: 0.5rem;
    }
    .email-preview {
      font-size: 1.3rem;
      background: ${props => props.theme.grey[1]};
      padding: 1rem;
      margin-bottom: 1rem;
      .email-highlight,
      .email-link {
        color: ${props => darken(0.2, props.theme.secondary)};
        &:hover {
          text-decoration: underline;
        }
      }
      .email-message {
        margin: 0.5rem 0 0.5rem 1rem;
      }
      .email-link {
        font-family: 'Roboto Bold';
        margin-left: 0.5rem;
      }
    }
    button {
      align-self: flex-start;
      font-family: 'Roboto Bold';
      font-size: 1.1rem;
      border: 0;
      border-radius: 2px;
      padding: 0.85rem 1rem;
      background: ${props => darken(0.2, props.theme.secondary)};
      color: ${props => props.theme.white};
      cursor: pointer;
    }
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
    message: ''
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

  render() {
    const {
      state: { title, tab, message },
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
            <div className="share">
              <div className="icons">
                <FacebookShareButton url={url} quote={title}>
                  <FacebookIcon size={32} />
                </FacebookShareButton>
                <TwitterShareButton url={url} title={title}>
                  <TwitterIcon size={32} />
                </TwitterShareButton>
                <GooglePlusShareButton url={url}>
                  <GooglePlusIcon size={32} />
                </GooglePlusShareButton>
                <RedditShareButton url={url} title={title}>
                  <RedditIcon size={32} />
                </RedditShareButton>
                <TumblrShareButton url={url} title={title}>
                  <TumblrIcon size={32} />
                </TumblrShareButton>
                <PinterestShareButton url={url} media={thumbnailURL}>
                  <PinterestIcon size={32} />
                </PinterestShareButton>
              </div>
              <input
                ref={this.shareInput}
                type="text"
                value={url}
                readOnly
                onClick={this.onShareInputClick}
              />
            </div>
          ) : tab === 1 ? (
            <div>embed</div>
          ) : (
            <div className="email">
              <div className="email-error">
                <PriorityHigh />
                <span>Please enter a valid email address in the Email Addresses field </span>
              </div>
              <textarea placeholder="To" />
              <textarea
                name="message"
                placeholder="Optional message"
                value={message}
                onChange={this.onChange}
                maxLength={300}
              />
              <div className="email-subheading">Message preview:</div>
              <div className="email-preview">
                <div>
                  <span className="email-highlight">{user.name}</span> has shared a video with you
                  on FooTube
                </div>
                <div className="email-message">{message}</div>
                <div className="email-link">"{title}"</div>
              </div>
              <button>Send email</button>
            </div>
          )}
        </Container>
      </React.Fragment>
    )
  }
}

export default SharingBar
