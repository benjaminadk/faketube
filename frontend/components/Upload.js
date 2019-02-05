import styled, { keyframes } from 'styled-components'
import { lighten, darken } from 'polished'
import Link from 'next/link'
import { Close } from 'styled-icons/material/Close'
import { Spinner7 as Spinner } from 'styled-icons/icomoon/Spinner7'
import { Help } from 'styled-icons/material/Help'
import axios from 'axios'
import formatFilename from '../lib/formatFilename'
import InitialScreen from './Upload/InitialScreen'

const source = axios.CancelToken.source()

const spin = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
`

const Container = styled.div`
  /* height: calc(100vh - 5.5rem); */
  display: grid;
  justify-items: center;
  background: ${props => props.theme.grey[0]};
  input[type='file'] {
    display: none;
  }
`

const VideoScreen = styled.div`
  width: 100rem;
  background: ${props => props.theme.white};
  padding: 1.5rem;
  margin-top: 1.5rem;
  box-shadow: ${props => props.theme.shadows[1]};
  .top {
    display: grid;
    grid-template-columns: 20rem 1fr;
    grid-gap: 1.5rem;
    .progress {
      display: grid;
      grid-template-columns: 5fr 1fr;
      grid-gap: 1rem;
      border-bottom: 1px solid ${props => props.theme.grey[5]};
      .left {
        display: grid;
        grid-template-rows: 3rem auto 1fr;
        .message {
          display: flex;
          align-items: center;
          margin-top: 0.5rem;
          & > :first-child {
            display: block;
            width: 2rem;
            height: 2rem;
            text-align: center;
            font-size: 2.5rem;
            background: ${props => darken(0.2, props.theme.secondary)};
            color: ${props => props.theme.white};
            border-radius: 3px;
            margin-right: 1rem;
          }
          & > :last-child {
            font-size: 1.3rem;
          }
        }
        .tabs {
          align-self: flex-end;
          display: flex;
        }
      }
      .right {
        display: grid;
        grid-template-rows: 3rem 1fr;
        span {
          font-size: 1rem;
          justify-self: flex-end;
          margin-top: 1rem;
          margin-right: 1rem;
        }
      }
    }
  }
  .bottom {
    display: grid;
    grid-template-columns: 20rem 1fr;
    grid-gap: 1.5rem;
    margin-top: 1.5rem;
    .upload-status {
      display: flex;
      flex-direction: column;
      & > :nth-child(1) {
        font-family: 'Roboto Bold';
        font-size: 1.3rem;
        color: ${props => props.theme.grey[12]};
        margin-bottom: 0.5rem;
      }
      & > :nth-child(2) {
        font-size: 1.1rem;
        color: ${props => props.theme.grey[10]};
        margin-bottom: 0.75rem;
      }
      & > :nth-child(3) {
        font-size: 1.1rem;
        color: ${props => props.theme.grey[10]};
      }
      & > :nth-child(4) {
        font-size: 1.1rem;
        color: ${props => darken(0.2, props.theme.secondary)};
      }
    }
  }
`

const Thumbnail = styled.div`
  width: 20rem;
  height: 11.25rem;
  display: grid;
  justify-items: center;
  align-items: center;
  background: ${props => props.theme.grey[2]};
  border: 2px solid ${props => props.theme.grey[5]};
  svg {
    width: 2rem;
    height: 2rem;
    display: ${props => (props.show ? 'none' : 'block')};
    color: ${props => props.theme.grey[10]};
    animation: ${spin} 1s linear infinite;
  }
`

const ProgressBar = styled.div`
  position: relative;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props =>
    props.progress === 100 ? lighten(0.3, props.theme.secondary) : props.theme.white};
  border: ${props =>
    props.progress === 100 ? `1px solid transparent` : `1px solid ${props.theme.grey[2]}`};
  border-right: ${props =>
    props.progress === 100
      ? `3px solid ${darken(0.2, props.theme.secondary)}`
      : `1px solid ${props.theme.grey[2]}`};
  font-family: 'Roboto Bold';
  font-size: 1.1rem;
  .bar-left {
    z-index: 1;
    text-transform: uppercase;
    margin-left: 1rem;
  }
  .bar-right {
    z-index: 1;
    margin-right: 1rem;
    & > :first-child {
      margin-right: 1rem;
    }
    svg {
      width: 1.25rem;
      height: 1.25rem;
      color: ${props => props.theme.grey[5]};
      cursor: pointer;
    }
  }
`

const ProgressFill = styled.div.attrs(props => ({
  style: {
    width: props.progress === 100 ? `0%` : `${props.progress}%`
  }
}))`
  position: absolute;
  top: 0;
  left: 0;
  height: 3rem;
  background-color: transparent;
  background-image: url('https://s3-us-west-1.amazonaws.com/faketube/assets/upload-bar-pattern.png');
  background-origin: padding-box;
  background-position: 0% 0%;
  border: 1px solid ${props => lighten(0.3, props.theme.secondary)};
`

const PublishButton = styled.button`
  width: 12rem;
  height: 3rem;
  border: 0;
  font-family: 'Roboto Bold';
  font-size: 1.1rem;
  background: ${props => darken(0.2, props.theme.secondary)};
  color: ${props => props.theme.white};
  border-radius: 2px;
  cursor: pointer;
`

const Tab = styled.div`
  font-family: 'Roboto Bold';
  font-size: 1.1rem;
  padding: 0 1rem 2rem 1rem;
  margin-right: 2rem;
  cursor: pointer;
  border-bottom: 4px solid
    ${props => (props.index === props.tab ? props.theme.primary : 'transparent')};
  &:hover {
    border-bottom: 4px solid ${props => props.theme.primary};
  }
`

const BasicInfo = styled.div`
  display: grid;
  grid-template-rows: 1fr 10rem;
  .top {
    display: grid;
    grid-template-columns: 45rem 1fr;
    fieldset {
      margin: 0;
      padding: 0;
      border: 0;
    }
    .left {
      & > :first-child,
      textarea {
        width: 100%;
        font-family: 'Roboto';
        font-size: 1.3rem;
        padding: 0.5rem 1rem;
        margin-bottom: 1.5rem;
        border: 1px solid ${props => props.theme.grey[5]};
      }
      .tags-wrapper {
        width: 100%;
        padding: 1rem 1rem;
        border: 1px solid ${props => props.theme.grey[5]};
        input {
          width: inherit;
          border: 0;
          outline: 0;
          font-family: 'Roboto';
          font-size: 1.3rem;
        }
      }
    }
    .right {
    }
  }
`

const Thumbnails = styled.div`
  display: grid;
  grid-template-rows: 2.5rem 1fr;
  grid-gap: 1rem;
  & > :first-child {
    font-size: 1.1rem;
    text-transform: uppercase;
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  & > :last-child {
    display: grid;
  }
`

class Upload extends React.Component {
  state = {
    progress: 10,
    progressDisplay: 0,
    time: 0,
    remaining: null,
    canceled: false,
    showThumbnails: false,
    fileURL: '',
    tab: 0,
    title: '',
    description: '',
    tags: [],
    tag: ''
  }

  file = React.createRef()

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.progress && this.state.progress) {
      this.timer = setInterval(() => {
        const { progress, time } = this.state
        const x = (time * 100) / progress - time
        let remaining
        if (x >= 60) {
          remaining = Math.ceil(x / 60) + ' minutes'
        } else {
          remaining = Math.ceil(x) + ' seconds'
        }
        this.setState({ time: time + 1, remaining })
      }, 1000)
    }

    if (prevState.progress !== 100 && this.state.progress === 100) {
      setTimeout(() => {
        clearInterval(this.timer)
        this.setState({ time: 0, remaining: null, showThumbnails: true })
      }, 20000)
    }
  }

  onFileClick = () => this.file.current.click()

  onFileChange = async (e, signS3) => {
    e.persist()
    const file = e.target.files[0]
    const filename = formatFilename('user', this.props.user.id, 'videos', file.name)
    const filetype = file.type
    const res1 = await signS3({
      variables: { filename, filetype }
    })
    const { success: success1, requestURL, fileURL } = res1.data.signS3
    if (!success1) {
      return // handle error
    }
    this.setState({ fileURL })
    await axios({
      method: 'PUT',
      url: requestURL,
      cancelToken: source.token,
      headers: {
        'Content-Type': filetype
      },
      onUploadProgress: p => {
        const progress = Math.round((p.loaded * 100) / p.total)
        this.setState({ progress })
      },
      data: file
    }).catch(function(thrown) {
      if (axios.isCancel) {
        console.log(thrown.message)
      } else {
        // handle error
      }
    })
  }

  onCancelClick = () => {
    if (confirm('Cancel upload?')) {
      source.cancel('Upload canceled by user.')
      clearInterval(this.timer)
      this.setState({ time: 0, remaining: null, canceled: true })
    }
  }

  onTabClick = tab => this.setState({ tab })

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  getThumbnailSrc = x =>
    this.state.fileURL.replace(/\.\w+$/, `-${x}.jpg`).replace('/videos/', '/thumbnails/')

  render() {
    const {
      state: {
        progress,
        remaining,
        canceled,
        showThumbnails,
        fileURL,
        tab,
        title,
        description,
        tags,
        tag
      }
    } = this
    return (
      <Container>
        {progress === 0 ? (
          <InitialScreen
            inputRef={this.file}
            onFileChange={this.onFileChange}
            onFileClick={this.onFileClick}
          />
        ) : (
          <VideoScreen>
            <div className="top">
              <Thumbnail show={showThumbnails} url={fileURL}>
                <Spinner />
              </Thumbnail>
              <div className="progress">
                <div className="left">
                  <ProgressBar progress={progress}>
                    <ProgressFill progress={progress} />
                    <div className="bar-left">
                      {progress === 100 && showThumbnails
                        ? 'Processing Done'
                        : progress === 100 && !showThumbnails
                        ? 'Processing...'
                        : `Uploading ${progress}%`}
                    </div>
                    <div className="bar-right">
                      <span>{remaining ? `About ${remaining} remaining.` : ''}</span>
                      <span>{remaining ? <Close onClick={this.onCancelClick} /> : ''}</span>
                    </div>
                  </ProgressBar>
                  <div className="message">
                    <span>*</span>
                    <span>
                      {canceled
                        ? 'Upload canceled.'
                        : progress === 100 && showThumbnails
                        ? `Click "Publish" to make your video live.`
                        : `Your video is still uploading. Please keep this page open until it's done`}
                    </span>
                  </div>
                  <div className="tabs">
                    <Tab index={0} tab={tab} onClick={() => this.onTabClick(0)}>
                      Basic info
                    </Tab>
                    <Tab index={1} tab={tab} onClick={() => this.onTabClick(1)}>
                      Translations
                    </Tab>
                    <Tab index={2} tab={tab} onClick={() => this.onTabClick(2)}>
                      Advanced settings
                    </Tab>
                  </div>
                </div>
                <div className="right">
                  <PublishButton>Publish</PublishButton>
                  <span>Draft saved.</span>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="upload-status">
                <span>Upload status:</span>
                <span>
                  {canceled
                    ? 'Upload canceled.'
                    : progress === 100 && showThumbnails
                    ? 'Upload complete!'
                    : 'Uploading your video...'}
                </span>
                <span>Your video will be live at:</span>
                <Link href={{ pathname: '/videos', query: { id: '12345' } }}>
                  <a>http://faketube.com/video</a>
                </Link>
              </div>
              <div className="right">
                {tab === 0 ? (
                  <BasicInfo>
                    <form>
                      <div className="top">
                        <fieldset className="left">
                          <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={title}
                            onChange={this.onChange}
                          />
                          <textarea
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={this.onChange}
                            rows={5}
                          />
                          <div className="tags-wrapper">
                            <input
                              type="text"
                              name="tag"
                              placeholder={
                                tags.length ? '' : 'Tags (e.g. albert einstein, flying pig, mashup)'
                              }
                              value={tag}
                              onChange={this.onChange}
                            />
                          </div>
                        </fieldset>
                        <fieldset className="right">right</fieldset>
                      </div>
                    </form>
                    <Thumbnails>
                      <div>
                        <span>Video Thumbnails</span>
                        <Help />
                      </div>
                      <div>
                        <div className="thumbnails">
                          <div className="thumbnail" />
                          <div className="thumbnail" />
                          <div className="thumbnail" />
                        </div>
                        <div className="uploader">
                          <button>Custom thumbnail</button>
                          <span>Maximum file size is 2 MB.</span>
                        </div>
                      </div>
                    </Thumbnails>
                  </BasicInfo>
                ) : tab === 1 ? (
                  <div>1</div>
                ) : (
                  <div>2</div>
                )}
              </div>
            </div>
          </VideoScreen>
        )}
      </Container>
    )
  }
}

export default Upload

// {
//   showThumbnails && (
//     <React.Fragment>
//       <img src={this.getThumbnailSrc(1)} />
//       <img src={this.getThumbnailSrc(2)} />
//       <img src={this.getThumbnailSrc(3)} />
//     </React.Fragment>
//   )
// }
