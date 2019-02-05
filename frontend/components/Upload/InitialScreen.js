import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { SIGN_S3_MUTATION } from '../../apollo/signS3'

const Container = styled.div`
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

const InitialScreen = ({ inputRef, onFileChange, onFileClick }) => (
  <Container>
    <div className="left">
      <div className="dropzone">
        <Logo onClick={onFileClick} />
        <p className="heading">Select files to upload</p>
        <p className="subheading">Or drag and drop video files</p>
        <Mutation mutation={SIGN_S3_MUTATION}>
          {signS3 => (
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              multiple={false}
              onChange={e => onFileChange(e, signS3)}
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
  </Container>
)

export default InitialScreen
