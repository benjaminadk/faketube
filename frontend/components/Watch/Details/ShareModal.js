import styled from 'styled-components'
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
  VKShareButton,
  VKIcon,
  RedditShareButton,
  RedditIcon,
  TumblrShareButton,
  TumblrIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share'
import { Code } from 'styled-icons/material/Code'
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight'
import { KeyboardArrowLeft } from 'styled-icons/material/KeyboardArrowLeft'
import Modal from '../../Modal'
import Toast from '../../Toast'
import copyToClipboard from '../../../lib/copyToClipboard'
import { frontend } from '../../../config'

const Container = styled.div`
  position: relative;
  width: 50rem;
  height: 30rem;
  background: ${props => props.theme.white};
  box-shadow: ${props => props.theme.shadows[2]};
  padding: 2rem;
  overflow: hidden;
  .heading {
    margin-bottom: 3rem;
  }
  .icon-row {
    display: flex;
    transform: ${props => (props.shift ? 'translateX(-40rem)' : 'translateX(0)')};
    transition: all 0.5s;
    margin-bottom: 3rem;
    .icon {
      display: grid;
      grid-template-rows: 6rem auto;
      grid-template-columns: 6rem;
      grid-gap: 0.5rem;
      justify-items: center;
      cursor: pointer;
      margin-right: 2rem;
      & > :last-child {
        font-size: 1.3rem;
      }
      .embed {
        width: 6rem;
        height: 6rem;
        display: grid;
        justify-items: center;
        align-items: center;
        background: ${props => props.theme.grey[1]};
        border-radius: 50%;
        svg {
          width: 3rem;
          height: 3rem;
          color: ${props => props.theme.grey[14]};
        }
      }
    }
  }
  .shift {
    position: absolute;
    top: 7.5rem;
    z-index: 2;
    width: 4rem;
    height: 4rem;
    justify-items: center;
    align-items: center;
    background: ${props => props.theme.white};
    border-radius: 50%;
    box-shadow: ${props => props.theme.shadows[5]};
    cursor: pointer;
    svg {
      width: 2.5rem;
      height: 2.5rem;
      color: ${props => props.theme.grey[10]};
    }
  }
  .shift.right {
    display: ${props => (props.shift ? 'none' : 'grid')};
    right: 0.5rem;
  }
  .shift.left {
    display: ${props => (props.shift ? 'grid' : 'none')};
    left: 0.5rem;
  }
  .url-input {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    border: 1px solid ${props => props.theme.grey[2]};
    background: ${props => props.theme.grey[0]};
    input {
      width: 75%;
      border: 0;
      outline: 0;
      font-family: 'Roboto';
      background: ${props => props.theme.grey[0]};
    }
    & > :last-child {
      font-family: 'Roboto Bold';
      font-size: 1.3rem;
      color: ${props => darken(0.2, props.theme.secondary)};
      text-transform: uppercase;
      cursor: pointer;
    }
  }
`

class ShareModal extends React.Component {
  state = {
    shift: false,
    text: '',
    toast: false
  }

  onShiftChange = shift => this.setState({ shift })

  onCopyLink = () => {
    const { id } = this.props.video
    copyToClipboard(`${frontend}/${id}`)
    this.setState({ toast: true })
    setTimeout(() => {
      this.setState({ toast: false })
    }, 6000)
  }

  render() {
    const {
      props: {
        show,
        video: { id, videoURL, title, thumbURL },
        onClose
      },
      state: { shift, toast }
    } = this
    const url = `${frontend}/${id}`
    return (
      <React.Fragment>
        <Toast text="Link copied to clipboard" show={toast} />
        <Modal show={show} color="dark" onClose={onClose}>
          <Container shift={shift}>
            <div className="shift right" onClick={() => this.onShiftChange(true)}>
              <KeyboardArrowRight />
            </div>
            <div className="shift left" onClick={() => this.onShiftChange(false)}>
              <KeyboardArrowLeft />
            </div>
            <div className="heading">Share a link</div>
            <div className="icon-row">
              <div className="icon">
                <div className="embed">
                  <Code />
                </div>
                <div>Embed</div>
              </div>
              <div className="icon">
                <TwitterShareButton url={videoURL} title={title}>
                  <TwitterIcon size={60} round={true} />
                </TwitterShareButton>
                <div>Twitter</div>
              </div>
              <div className="icon">
                <FacebookShareButton url={videoURL} quote={title}>
                  <FacebookIcon size={60} round={true} />
                </FacebookShareButton>
                <div>Facebook</div>
              </div>
              <div className="icon">
                <GooglePlusShareButton url={videoURL}>
                  <GooglePlusIcon size={60} round={true} />
                </GooglePlusShareButton>
                <div>Google+</div>
              </div>
              <div className="icon">
                <RedditShareButton url={videoURL} title={title}>
                  <RedditIcon size={60} round={true} iconBgStyle={{ fill: 'orangered' }} />
                </RedditShareButton>
                <div>Reddit</div>
              </div>
              <div className="icon">
                <TumblrShareButton url={videoURL} title={title}>
                  <TumblrIcon size={60} round={true} />
                </TumblrShareButton>
                <div>Tumblr</div>
              </div>
              <div className="icon">
                <PinterestShareButton url={videoURL} media={thumbURL} description={title}>
                  <PinterestIcon size={60} round={true} />
                </PinterestShareButton>
                <div>Pinterest</div>
              </div>
              <div className="icon">
                <VKShareButton url={videoURL} title={title} image={thumbURL}>
                  <VKIcon size={60} round={true} />
                </VKShareButton>
                <div>ВКонтакте</div>
              </div>
              <div className="icon">
                <LinkedinShareButton url={videoURL} title={title}>
                  <LinkedinIcon size={60} round={true} />
                </LinkedinShareButton>
                <div>Linkedin</div>
              </div>
              <div className="icon">
                <EmailShareButton url={videoURL} subject={title} body={videoURL}>
                  <EmailIcon size={60} round={true} />
                </EmailShareButton>
                <div>Email</div>
              </div>
            </div>
            <div className="url-input">
              <input type="text" value={url} onChange={() => {}} readOnly />
              <div onClick={this.onCopyLink}>copy</div>
            </div>
          </Container>
        </Modal>
      </React.Fragment>
    )
  }
}

export default ShareModal
