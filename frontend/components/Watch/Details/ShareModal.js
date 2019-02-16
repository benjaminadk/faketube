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
import { CheckBoxOutlineBlank } from 'styled-icons/material/CheckBoxOutlineBlank'
import { CheckBox } from 'styled-icons/material/CheckBox'
import Modal from '../../Modal'
import Toast from '../../Toast'
import copyToClipboard from '../../../lib/copyToClipboard'
import formatDuration from '../../../lib/formatDuration'
import formatHMStoSecs from '../../../lib/formatHMStoSecs'
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
    margin-bottom: 2rem;
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

const TimeCheck = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${props => props.theme.grey[2]};
  padding-top: 2rem;
  & > :first-child {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    cursor: pointer;
    svg {
      width: 2.5rem;
      height: 2.5rem;
      color: ${props => props.theme.grey[10]};
      margin-right: 1.5rem;
    }
    .checked {
      color: ${props => props.theme.secondary};
    }
  }
  input {
    width: 5rem;
    outline: 0;
    font-family: 'Roboto';
    margin-left: 1rem;
    border: 0;
    border-bottom: 1px solid ${props => props.theme.grey[5]};
    transition: all 0.25s;
    &:disabled {
      background: ${props => props.theme.white};
      color: ${props => props.theme.grey[3]};
      border: 0;
    }
    &:focus {
      border-bottom: 1px solid ${props => props.theme.black[0]};
    }
  }
`

function removeLeadingZeros(str) {
  const re = /0/
  if (re.test(str[0])) {
    return removeLeadingZeros(str.slice(1))
  }
  return str
}

class ShareModal extends React.Component {
  state = {
    shift: false,
    text: '',
    toast: false,
    timeCheck: false,
    time: 0,
    timeValue: 0
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      this.setState({ time: formatDuration(this.props.time), timeValue: this.props.time })
    }
    if (prevProps.show && !this.props.show) {
      this.setState({ timeCheck: false })
    }
  }

  onShiftChange = shift => this.setState({ shift })

  onCopyLink = () => {
    const { id } = this.props.video
    copyToClipboard(`${frontend}/watch?id=${id}`)
    this.setState({ toast: true })
    setTimeout(() => {
      this.setState({ toast: false })
    }, 6000)
  }

  onTimeCheckClick = () => {
    this.setState(({ timeCheck }) => ({ timeCheck: !timeCheck }))
  }

  onChange = e => {
    var { value } = e.target
    const { duration } = this.props.video
    const re = /[^0-9]/g
    if (re.test(value)) return
    if (parseInt(value, 10) > duration) {
      value = duration
    }
    this.setState({ time: value, timeValue: removeLeadingZeros(value) })
  }

  onBlur = () => {
    var { time } = this.state
    if (time === '') {
      time = 0
    }
    this.setState({ time: formatDuration(time) })
  }

  onFocus = () => {
    const { time } = this.state
    this.setState({ time: formatHMStoSecs(time) })
  }

  render() {
    const {
      props: {
        show,
        video: { id, videoURL, title, thumbURL },
        onClose
      },
      state: { shift, toast, timeCheck, time, timeValue }
    } = this
    const url = `${frontend}/watch?id=${id}${timeCheck ? `&t=${timeValue}` : ''}`
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
            <TimeCheck>
              <div onClick={this.onTimeCheckClick}>
                {timeCheck ? <CheckBox className="checked" /> : <CheckBoxOutlineBlank />}
                <div>Start at</div>
              </div>
              <input
                type="text"
                value={time}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                disabled={!timeCheck}
              />
            </TimeCheck>
          </Container>
        </Modal>
      </React.Fragment>
    )
  }
}

export default ShareModal
