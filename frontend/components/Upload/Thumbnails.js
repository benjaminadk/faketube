import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { darken } from 'polished'
import { Spinner7 as Spinner } from 'styled-icons/icomoon/Spinner7'
import { Help } from 'styled-icons/material/Help'
import { spin } from '../styles/animations'
import { SIGN_S3_MUTATION } from '../../apollo/signS3'

const Container = styled.div`
  display: grid;
  grid-template-rows: 2.5rem 1fr;
  grid-gap: 0.5rem;
  & > :first-child {
    span {
      font-family: 'Roboto Bold';
      font-size: 1.1rem;
      text-transform: uppercase;
      margin-right: 0.5rem;
    }
    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: ${props => props.theme.grey[10]};
      cursor: pointer;
      &:hover {
        color: ${props => props.theme.black[0]};
      }
    }
  }
  & > :last-child {
    display: flex;
    .thumbnails {
      display: grid;
      grid-template-columns: repeat(3, 12rem);
      grid-gap: 1rem;
      margin-right: 1rem;
    }
  }
`

const Thumbnail = styled.div`
  width: 12rem;
  height: 6.75rem;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: ${props => props.theme.grey[1]};
  background-image: ${props => (props.show ? `url("${props.url}")` : 'none')};
  background-repeat: no-repeat;
  background-size: cover;
  outline: 4px solid ${props => (props.selected ? darken(0.1, props.theme.primary) : 'transparent')};
  cursor: pointer;
  &:hover .overlay {
    display: ${props => (!props.show || props.selected ? 'none' : 'grid')};
  }
  &:hover .special {
    display: ${props => (!props.show ? 'none' : 'grid')};
  }
  .overlay {
    display: none;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    outline: 3px solid ${props => props.theme.black[0]};
    outline-offset: 2px;
    span {
      font-family: 'Roboto Bold';
      font-size: 1.1rem;
      color: ${props => props.theme.white};
    }
    .change:hover {
      text-decoration: underline;
    }
  }
  svg {
    display: ${props => (!props.show ? 'block' : 'none')};
    width: 5rem;
    height: 5rem;
    color: rgba(0, 0, 0, 0.1);
    animation: ${spin} 2s linear infinite;
  }
`

const Uploader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-left: 1px solid ${props => (props.hideBorder ? 'transparent' : props.theme.grey[5])};
  padding-left: 1rem;
  margin-bottom: 2rem;
  button {
    height: 2.6rem;
    font-family: 'Roboto Bold';
    font-size: 1.1rem;
    background: ${props => props.theme.grey[0]};
    color: ${props => props.theme.grey[14]};
    border: 1px solid ${props => props.theme.grey[5]};
    border-radius: 2px;
    outline: 0;
    box-shadow: ${props => props.theme.shadows[1]};
    cursor: pointer;
    &:hover {
      border: 1px solid ${props => props.theme.grey[10]};
      box-shadow: ${props => props.theme.shadows[2]};
    }
  }
  .upload {
    width: 12rem;
  }
  .cancel {
    margin-top: 0.25rem;
  }
  span {
    font-size: 1.1rem;
    color: ${props => props.theme.grey[10]};
  }
  svg {
    width: 2rem;
    height: 2rem;
    color: ${props => props.theme.grey[5]};
    margin-bottom: 0.25rem;
    animation: ${spin} 1s linear infinite;
  }
`

const Thumbnails = ({
  inputRef,
  imageURL,
  imageFilename,
  thumbnailIndex,
  showThumbnails,
  getThumbnailSrc,
  onThumbnailClick,
  onImageInputClick,
  onImageInputChange
}) => (
  <Container>
    <div>
      <span>Video Thumbnails</span>
      <Help />
    </div>
    <div>
      <div className="thumbnails">
        {[1, 2, 3].map(i => (
          <Thumbnail
            key={i}
            index={i}
            show={showThumbnails}
            url={getThumbnailSrc(i)}
            selected={thumbnailIndex === i}
            onClick={() => onThumbnailClick(i)}
          >
            <Spinner />
            <div className="overlay">
              <span>Set as thumbnail</span>
            </div>
          </Thumbnail>
        ))}
      </div>
      <Mutation mutation={SIGN_S3_MUTATION}>
        {(signS3, { loading }) => (
          <Uploader hideBorder={imageURL || loading}>
            {loading ? (
              <React.Fragment>
                <Spinner />
                <span>
                  {imageFilename
                    .toLowerCase()
                    .trim()
                    .replace(/\s/g, '-')}
                </span>
                <button className="cancel">Cancel</button>
              </React.Fragment>
            ) : imageURL ? (
              <Thumbnail
                index={4}
                show={true}
                url={imageURL}
                selected={thumbnailIndex === 4}
                onClick={() => onThumbnailClick(4)}
              >
                <div className="overlay special">
                  <span className="change" onClick={onImageInputClick}>
                    Change image
                  </span>
                </div>
              </Thumbnail>
            ) : (
              <React.Fragment>
                <button className="upload" onClick={onImageInputClick}>
                  Custom thumbnail
                </button>
                <span>Maximum file size is 2 MB.</span>
              </React.Fragment>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg"
              multiple={false}
              onChange={e => onImageInputChange(e, signS3)}
            />
          </Uploader>
        )}
      </Mutation>
    </div>
  </Container>
)

export default Thumbnails
