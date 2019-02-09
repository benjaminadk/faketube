import styled from 'styled-components'
import axios from 'axios'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import formatFilename from '../lib/formatFilename'
import formatTag from '../lib/formatTag'
import InitialScreen from './Upload/InitialScreen'
import BigThumbnail from './Upload/BigThumbnail'
import ProgressBar from './Upload/ProgressBar'
import SharingBar from './Upload/SharingBar'
import Publish from './Upload/Publish'
import TabBar from './Upload/TabBar'
import UploadStatus from './Upload/UploadStatus'
import BasicForm from './Upload/BasicForm'
import Thumbnails from './Upload/Thumbnails'
import ImportModal from './Upload/ImportModal'

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
    saved: false,
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
    isPublic: true,
    isPublished: false,
    showImportModal: false,
    googleVideos: null
  }

  videoInput = React.createRef()
  imageInput = React.createRef()
  tagInput = React.createRef()

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.progress && this.state.progress) {
      this.timer1 = setInterval(this.uploadTimer, 1000)
    }

    if (prevState.progress !== 100 && this.state.progress === 100) {
      this.onVideoUploadComplete()
    }

    if (prevState.thumbnailURL !== this.state.thumbnailURL) {
      this.setState({ saved: false })
    }

    if (prevState.title !== this.state.title) {
      this.setState({ saved: false })
    }

    if (prevState.description !== this.state.description) {
      this.setState({ saved: false })
    }

    if (prevState.tags.length !== this.state.tags.length) {
      this.setState({ saved: false })
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

  onVideoUploadComplete = () => {
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
      variables: {
        data: {
          title,
          description: '',
          videoURL: fileURL,
          imageURL: this.getThumbnailSrc(2),
          isPublic: this.state.isPublic
        }
      }
    })
    const { success: success2, video } = res2.data.createVideo
    if (!success2) {
      return // error creating video
    }
    this.setState({ videoID: video.id })
  }

  onCancelClick = () => {
    if (confirm('Cancel upload?')) {
      source.cancel('Upload canceled by user.')
      clearInterval(this.timer1)
      this.setState({ time: 0, remaining: null, canceled: true })
    }
  }

  onPublishClick = async updateVideo => {
    if (!this.state.videoID) return
    if (!this.state.isPublished) {
      await this.setState({ isPublished: true })
    }
    const {
      videoID,
      title,
      description,
      tags,
      isPublic,
      isPublished,
      thumbnailURL,
      videoURL
    } = this.state
    const res = await updateVideo({
      variables: {
        id: videoID,
        data: {
          videoURL,
          imageURL: thumbnailURL,
          title,
          description,
          tags: { set: tags },
          isPublic,
          isPublished
        }
      }
    })
    const { success } = res.data.updateVideo
    if (!success) {
      return // error updating video
    }
    this.setState({ saved: true })
  }

  onTabClick = tab => this.setState({ tab })

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onTagsClick = () => {
    this.tagInput.current.focus()
  }

  onTagChange = e => {
    const { value } = e.target
    const re = /,$/
    if (re.test(value)) return
    this.setState({ tag: value })
  }

  onTagKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      const { tag, tags } = this.state
      const x = formatTag(tag)
      if (x.length < 2) return
      tags.push(x)
      this.setState({ tags, tag: '' }, () => {
        this.tagInput.current.focus()
      })
    } else if (e.keyCode === 8) {
      const { tag, tags } = this.state
      if (!tags.length || tag.length) return
      e.preventDefault()
      const x = tags.pop()
      this.setState({ tags }, () => {
        this.setState({ tag: x })
        setTimeout(() => this.tagInput.current.select(), 100)
      })
    }
  }

  onTagDelete = index => {
    this.setState(
      ({ tags }) => ({ tags: tags.filter((t, i) => i !== index) }),
      () => {
        this.tagInput.current.focus()
      }
    )
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
      return // error requesting upload url
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

  onImportClick = async () => {
    const { googlePhotoAT } = this.props.user
    if (!googlePhotoAT) {
      window.location.href = 'http://localhost:8888/api/photoAuth'
    }
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://photoslibrary.googleapis.com/v1/mediaItems',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${googlePhotoAT}`
        }
      })
      const googleVideos = res.data.mediaItems.filter(m => m.mimeType.slice(0, 5) === 'video')
      this.setState({ showImportModal: true, googleVideos })
    } catch (error) {
      console.log(error)
    }
  }

  onCloseImportModal = () => this.setState({ showImportModal: false })

  render() {
    const {
      state: {
        saved,
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
        isPublic,
        isPublished,
        showImportModal,
        googleVideos
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
            onImportClick={this.onImportClick}
          />
        ) : (
          <VideoScreen>
            <div className="video-top">
              <BigThumbnail showThumbnails={showThumbnails} url={thumbnailURL} />
              <div className="progress">
                <div className="progress-left">
                  {isPublished ? (
                    <SharingBar
                      title={title}
                      videoID={videoID}
                      thumbnailURL={thumbnailURL}
                      user={this.props.user}
                    />
                  ) : (
                    <ProgressBar
                      progress={progress}
                      showThumbnails={showThumbnails}
                      remaining={remaining}
                      canceled={canceled}
                      onCancelClick={this.onCancelClick}
                    />
                  )}
                  <TabBar tab={tab} onTabClick={this.onTabClick} />
                </div>
                <Publish
                  videoID={videoID}
                  saved={saved}
                  isPublished={isPublished}
                  onPublishClick={this.onPublishClick}
                />
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
                      inputRef={this.tagInput}
                      title={title}
                      description={description}
                      tag={tag}
                      tags={tags}
                      isPublic={isPublic}
                      onChange={this.onChange}
                      onTagsClick={this.onTagsClick}
                      onTagChange={this.onTagChange}
                      onTagDelete={this.onTagDelete}
                      onTagKeyDown={this.onTagKeyDown}
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
        <ImportModal
          show={showImportModal}
          videos={googleVideos}
          onClose={this.onCloseImportModal}
        />
      </Container>
    )
  }
}

export default withApollo(Upload)
