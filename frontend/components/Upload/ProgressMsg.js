import styled from 'styled-components'
import { darken } from 'polished'

const Container = styled.div`
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
`

const ProgressMsg = ({ progress, showThumbnails, canceled }) => (
  <Container>
    <span>*</span>
    <span>
      {canceled
        ? 'Upload canceled.'
        : progress === 100 && showThumbnails
        ? `Click "Publish" to make your video live.`
        : `Your video is still uploading. Please keep this page open until it's done`}
    </span>
  </Container>
)

export default ProgressMsg
