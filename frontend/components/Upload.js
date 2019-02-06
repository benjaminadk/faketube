import styled from 'styled-components'
import { lighten, darken } from 'polished'
import axios from 'axios'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import formatFilename from '../lib/formatFilename'
import InitialScreen from './Upload/InitialScreen'
import BigThumbnail from './Upload/BigThumbnail'
import ProgressBar from './Upload/ProgressBar'
import ProgressMsg from './Upload/ProgressMsg'
import Publish from './Upload/Publish'
import TabBar from './Upload/TabBar'
import UploadStatus from './Upload/UploadStatus'
import BasicForm from './Upload/BasicForm'
import Thumbnails from './Upload/Thumbnails'

const CREATE_VIDEO_MUTATION = gql`
  mutation CREATE_VIDEO_MUTATION($data: VideoCreateInput) {
    createVideo(data: $data) {
      success
      video {
        id
      }
    }
  }
`

const source = axios.CancelToken.source()

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
  .video-top {
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
    }
  }
  .video-bottom {
    display: grid;
    grid-template-columns: 20rem 1fr;
    grid-gap: 1.5rem;
    margin-top: 1.5rem;
  }
`

const BasicInfo = styled.div`
  display: grid;
  grid-template-rows: 1fr 10rem;
`

class Upload extends React.Component {
  state = {
    draftSaved: false,
    videoID: '',
    progress: 0,
    time: 0,
    remaining: '',
    canceled: false,
    showThumbnails: false,
    thumbnailIndex: null,
    thumbnailURL: '',
    imageFilename: '',
    imageURL: '',
    videoURL: '',
    tab: 0,
    title: '',
    description: '',
    tag: '',
    tags: [],
    isPublic: true
  }

  videoInput = React.createRef()
  imageInput = React.createRef()

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.progress && this.state.progress) {
      this.timer1 = setInterval(this.uploadTimer, 1000)
    }

    if (prevState.progress !== 100 && this.state.progress === 100) {
      clearInterval(this.timer1)
      this.setState({ remaining: '20 seconds' })
      this.timer2 = setInterval(this.processingTimer, 1000)
      setTimeout(() => {
        clearInterval(this.timer2)
        this.setState(({ imageURL }) => ({
          time: 0,
          remaining: null,
          showThumbnails: true,
          thumbnailIndex: imageURL ? 4 : 2,
          thumbnailURL: imageURL ? imageURL : this.getThumbnailSrc(2)
        }))
      }, 20000)
    }
  }

  uploadTimer = () => {
    const { progress, time } = this.state
    const x = (time * 100) / progress - time + 20
    let remaining
    if (x >= 60) {
      remaining = Math.ceil(x / 60) + ' minutes'
    } else {
      remaining = Math.ceil(x) + ' seconds'
    }
    this.setState({ time: time + 1, remaining })
  }

  processingTimer = () => {
    let x = parseInt(this.state.remaining, 10)
    this.setState({ remaining: `${x - 1} seconds` })
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
      return // error requesting upload url
    }
    const title = file.name.replace(/\.\w+$/, '').replace(/[-_]/g, ' ')
    await this.setState({ title, videoURL: fileURL })
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
        // error uploading video
      }
    })
    const res2 = await this.props.client.mutate({
      mutation: CREATE_VIDEO_MUTATION,
      variables: { data: { title, videoURL: fileURL, imageURL: this.getThumbnailSrc(2) } }
    })
    const { success: success2, video } = res2.data.createVideo
    if (!success2) {
      return // error creating video
    }
    this.setState({ draftSaved: true, videoID: video.id })
  }

  onCancelClick = () => {
    if (confirm('Cancel upload?')) {
      source.cancel('Upload canceled by user.')
      clearInterval(this.timer1)
      this.setState({ time: 0, remaining: null, canceled: true })
    }
  }

  onTabClick = tab => this.setState({ tab })

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onThumbnailClick = thumbnailIndex => {
    if (!this.state.showThumbnails) return
    this.setState({
      thumbnailIndex,
      thumbnailURL:
        thumbnailIndex === 4 ? this.state.imageURL : this.getThumbnailSrc(thumbnailIndex)
    })
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
          this.setState({ imageURL: fileURL, thumbnailURL: fileURL, thumbnailIndex: 4 })
        }
      },
      data: file
    })
  }

  render() {
    const {
      state: {
        draftSaved,
        videoID,
        progress,
        remaining,
        canceled,
        showThumbnails,
        thumbnailIndex,
        thumbnailURL,
        imageURL,
        imageFilename,
        videoURL,
        tab,
        title,
        description,
        tags,
        tag,
        isPublic
      }
    } = this
    return (
      <Container>
        {progress === 0 ? (
          <InitialScreen
            inputRef={this.videoInput}
            isPublic={isPublic}
            onChange={this.onChange}
            onVideoInputChange={this.onVideoInputChange}
            onVideoInputClick={this.onVideoInputClick}
          />
        ) : (
          <VideoScreen>
            <div className="video-top">
              <BigThumbnail showThumbnails={showThumbnails} url={thumbnailURL} />
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
                <Publish videoID={videoID} draftSaved={draftSaved} />
              </div>
            </div>
            <div className="video-bottom">
              <UploadStatus
                progress={progress}
                showThumbnails={showThumbnails}
                canceled={canceled}
                videoID={videoID}
              />
              <div>
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
                      thumbnailIndex={thumbnailIndex}
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

export default withApollo(Upload)
