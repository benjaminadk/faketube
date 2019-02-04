import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { lighten, darken } from 'polished'
import { Close } from 'styled-icons/material/Close'
import axios from 'axios'
import formatFilename from '../lib/formatFilename'

const source = axios.CancelToken.source()

const SIGN_S3_MUTATION = gql`
  mutation SIGN_S3_MUTATION($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      success
      requestURL
      fileURL
    }
  }
`

const Container = styled.div`
  height: calc(100vh - 5.5rem);
  display: grid;
  justify-items: center;
  background: ${props => props.theme.grey[0]};
  input[type='file'] {
    display: none;
  }
`

const InitialScreen = styled.div`
  width: 66%;
  height: 66%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 1rem;
  margin-top: 1rem;
  .left {
    display: grid;
    grid-template-rows: 4fr 1fr;
    grid-gap: 1rem;
    .dropzone {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: ${props => props.theme.white};
      box-shadow: ${props => props.theme.shadows[1]};
      .heading {
        font-size: 2rem;
        margin: 0;
        padding-bottom: 1rem;
        color: ${props => props.theme.grey[14]};
      }
      .subheading {
        color: ${props => props.theme.grey[10]};
        margin: 0;
      }
    }
    .help {
      background: ${props => props.theme.white};
      box-shadow: ${props => props.theme.shadows[1]};
    }
  }
  .right {
    display: grid;
    grid-template-rows: 1fr 1fr 1.5fr;
    grid-gap: 1rem;
    & > * {
      background: ${props => props.theme.white};
      box-shadow: ${props => props.theme.shadows[1]};
    }
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
    .thumbnail {
      width: 20rem;
      height: 11.25rem;
      background: ${props => props.theme.grey[2]};
      border: 2px solid ${props => props.theme.grey[5]};
    }
    .progress {
      display: grid;
      grid-template-columns: 4fr 1fr;
      grid-gap: 1rem;
      .left {
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
      }
      .right {
        button {
        }
      }
    }
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
`

const Logo = styled.div`
  width: 12rem;
  height: 10rem;
  background-image: url('https://s3-us-west-1.amazonaws.com/faketube/assets/upload-grey.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  cursor: pointer;
  &:hover {
    background-image: url('https://s3-us-west-1.amazonaws.com/faketube/assets/upload-red.svg');
  }
`

class Upload extends React.Component {
  state = {
    progress: 10,
    time: 0,
    remaining: null,
    canceled: false
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
      this.setState({ time: 0, remaining: null })
      clearInterval(this.timer)
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

  render() {
    const {
      state: { progress, remaining, canceled }
    } = this
    return (
      <Container>
        {progress === 0 ? (
          <InitialScreen>
            <div className="left">
              <div className="dropzone">
                <Logo onClick={this.onFileClick} />
                <p className="heading">Select files to upload</p>
                <p className="subheading">Or drag and drop video files</p>
                <Mutation mutation={SIGN_S3_MUTATION}>
                  {signS3 => (
                    <input
                      ref={this.file}
                      type="file"
                      accept="video/*"
                      multiple={false}
                      onChange={e => this.onFileChange(e, signS3)}
                    />
                  )}
                </Mutation>
              </div>
              <div className="help" />
            </div>
            <div className="right">
              <div />
              <div />
              <div />
            </div>
          </InitialScreen>
        ) : (
          <VideoScreen>
            <div className="top">
              <div className="thumbnail" />
              <div className="progress">
                <div className="left">
                  <ProgressBar progress={progress}>
                    <ProgressFill progress={progress} />
                    <div className="bar-left">
                      {progress === 100 ? 'Processing Done' : `Uploading ${progress}%`}
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
                        : progress === 100
                        ? `Click "Publish" to make your video live.`
                        : `Your video is still uploading. Please keep this page open until it's done`}
                    </span>
                  </div>
                </div>
                <div className="right">
                  <PublishButton>Publish</PublishButton>
                </div>
              </div>
            </div>
            <div className="bottom">
              <img
                src="https://s3-us-west-1.amazonaws.com/faketube/user/cjrl9gxfwi93h0a22yr0pjebd/thumbnails/test-video.jpg"
                width="800"
              />
            </div>
          </VideoScreen>
        )}
      </Container>
    )
  }
}

export default Upload
