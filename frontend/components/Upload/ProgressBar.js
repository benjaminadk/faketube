import styled from 'styled-components'
import { lighten, darken } from 'polished'
import { Close } from 'styled-icons/material/Close'

const Bar = styled.div`
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

const Fill = styled.div.attrs(props => ({
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

const Message = styled.div`
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

const ProgressBar = ({ progress, showThumbnails, remaining, canceled, onCancelClick }) => (
  <React.Fragment>
    <Bar progress={progress}>
      <Fill progress={progress} />
      <div className="bar-left">
        {progress === 100 && showThumbnails
          ? 'Processing Done'
          : progress === 100 && !showThumbnails
          ? 'Processing...'
          : `Uploading ${progress}%`}
      </div>
      <div className="bar-right">
        <span>{remaining ? `About ${remaining} remaining.` : ''}</span>
        <span>{remaining ? <Close onClick={onCancelClick} /> : ''}</span>
      </div>
    </Bar>
    <Message>
      <span>*</span>
      <span>
        {canceled
          ? 'Upload canceled.'
          : progress === 100 && showThumbnails
          ? `Click "Publish" to make your video live.`
          : `Your video is still uploading. Please keep this page open until it's done`}
      </span>
    </Message>
  </React.Fragment>
)

export default ProgressBar
