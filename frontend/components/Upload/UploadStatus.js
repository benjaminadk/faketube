import styled from 'styled-components'
import { darken } from 'polished'
import Link from 'next/link'

const Container = styled.div`
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
`

const UploadStatus = ({ progress, showThumbnails, canceled, videoID }) => (
  <Container>
    <span>Upload status:</span>
    <span>
      {canceled
        ? 'Upload canceled.'
        : progress === 100 && showThumbnails
        ? 'Upload complete!'
        : 'Uploading your video.'}
    </span>
    {videoID ? (
      <React.Fragment>
        <span>Your video will be live at:</span>
        <Link href={{ pathname: '/videos', query: { id: videoID } }}>
          <a>http://localhost:8889/videos?id={videoID}</a>
        </Link>
      </React.Fragment>
    ) : null}
  </Container>
)

export default UploadStatus
