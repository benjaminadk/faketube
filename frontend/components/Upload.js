import styled, { keyframes } from 'styled-components'
import { lighten, darken } from 'polished'
import { Spinner7 as Spinner } from 'styled-icons/icomoon/Spinner7'
import axios from 'axios'
import formatFilename from '../lib/formatFilename'
import InitialScreen from './Upload/InitialScreen'
import ProgressBar from './Upload/ProgressBar'
import ProgressMsg from './Upload/ProgressMsg'
import TabBar from './Upload/TabBar'
import UploadStatus from './Upload/UploadStatus'
import BasicForm from './Upload/BasicForm'
import Thumbnails from './Upload/Thumbnails'

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
  height: calc(100% - 5.5rem);
  display: grid;
  justify-items: center;
  margin-bottom: 5rem;
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
      .progress-left {
        display: grid;
        grid-template-rows: 3rem auto 1fr;
      }
      .progress-right {
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

const BasicInfo = styled.div`
  display: grid;
  grid-template-rows: 1fr 10rem;
`

class Upload extends React.Component {
  state = {
    progress: 0,
    progressDisplay: 0,
    time: 0,
    remaining: null,
    canceled: false,
    showThumbnails: true,
    thumbnail: null,
    imageFilename: '',
    imageURL: '',
    videoURL: ' ',
    tab: 0,
    title: '',
    description: '',
    tags: [],
    tag: ''
  }

  videoInput = React.createRef()
  imageInput = React.createRef()

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

  onVideoInputClick = () => this.videoInput.current.click()

  onVideoInputChange = async (e, signS3) => {
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
    this.setState({ videoURL: fileURL })
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

  onThumbnailClick = thumbnail => {
    if (!this.state.showThumbnails) return
    this.setState({ thumbnail })
  }

  getThumbnailSrc = x =>
    this.state.videoURL.replace(/\.\w+$/, `-${x}.jpg`).replace('/videos/', '/thumbnails/')

  onImageInputClick = () => this.imageInput.current.click()

  onImageInputChange = async (e, signS3) => {
    const file = e.target.files[0]
    if (!file) return
    const filename = formatFilename('user', this.props.user.id, 'thumbnails', file.name)
    const filetype = file.type
    await this.setState({ imageFilename: file.name })
    const res = await signS3({
      variables: { filename, filetype }
    })
    const { success, requestURL, fileURL } = res.data.signS3
    if (!success) {
      return // handle error
    }
    await axios({
      method: 'PUT',
      url: requestURL,
      headers: {
        'Content-Type': filetype
      },
      onUploadProgress: p => {
        const progress = Math.round((p.loaded * 100) / p.total)
        if (progress === 100) {
          this.setState({ imageURL: fileURL })
        }
      },
      data: file
    })
  }

  render() {
    const {
      state: {
        progress,
        remaining,
        canceled,
        showThumbnails,
        thumbnail,
        imageURL,
        imageFilename,
        videoURL,
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
            inputRef={this.videoInput}
            onChange={this.onVideoInputChange}
            onClick={this.onVideoInputClick}
          />
        ) : (
          <VideoScreen>
            <div className="top">
              <Thumbnail show={showThumbnails} url={imageURL ? imageURL : videoURL}>
                <Spinner />
              </Thumbnail>
              <div className="progress">
                <div className="progress-left">
                  <ProgressBar
                    progress={progress}
                    showThumbnails={showThumbnails}
                    remaining={remaining}
                    onCancelClick={this.onCancelClick}
                  />
                  <ProgressMsg
                    progress={progress}
                    showThumbnails={showThumbnails}
                    canceled={canceled}
                  />
                  <TabBar tab={tab} onTabClick={this.onTabClick} />
                </div>
                <div className="progress-right">
                  <PublishButton>Publish</PublishButton>
                  <span>Draft saved.</span>
                </div>
              </div>
            </div>
            <div className="bottom">
              <UploadStatus
                progress={progress}
                showThumbnails={showThumbnails}
                canceled={canceled}
              />
              <div className="right">
                {tab === 0 ? (
                  <BasicInfo>
                    <BasicForm
                      title={title}
                      description={description}
                      tag={tag}
                      tags={tags}
                      onChange={this.onChange}
                    />
                    <Thumbnails
                      inputRef={this.imageInput}
                      imageURL={imageURL}
                      imageFilename={imageFilename}
                      thumbnail={thumbnail}
                      showThumbnails={showThumbnails}
                      getThumbnailSrc={this.getThumbnailSrc}
                      onThumbnailClick={this.onThumbnailClick}
                      onImageInputClick={this.onImageInputClick}
                      onImageInputChange={this.onImageInputChange}
                    />
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
