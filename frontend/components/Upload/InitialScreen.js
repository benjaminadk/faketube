import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { SIGN_S3_MUTATION } from '../../apollo/signS3'

const Container = styled.div`
  width: 66%;
  height: 90%;
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
      select {
        font-family: 'Roboto Bold';
        font-size: 1.1rem;
        background: ${props => props.theme.grey[0]};
        color: ${props => props.theme.grey[12]};
        margin-top: 2rem;
        padding: 0.5rem 1rem;
        border: 1px solid ${props => props.theme.grey[5]};
        border-radius: 2px;
        outline: 0;
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

const InitialScreen = ({ inputRef, isPublic, onChange, onVideoInputChange, onVideoInputClick }) => (
  <Container>
    <div className="left">
      <div className="dropzone">
        <Logo onClick={onVideoInputClick} />
        <p className="heading">Select files to upload</p>
        <p className="subheading">Or drag and drop video files</p>
        <Mutation mutation={SIGN_S3_MUTATION}>
          {signS3 => (
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              multiple={false}
              onChange={e => onVideoInputChange(e, signS3)}
            />
          )}
        </Mutation>
        <select name="isPublic" value={isPublic} onChange={onChange}>
          <option value={true}>Public</option>
          <option value={false}>Private</option>
        </select>
      </div>
      <div className="help" />
    </div>
    <div className="right">
      <div />
      <div />
      <div />
    </div>
  </Container>
)

export default InitialScreen
