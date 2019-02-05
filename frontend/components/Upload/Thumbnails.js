import styled from 'styled-components'
import { darken } from 'polished'
import { Spinner7 as Spinner } from 'styled-icons/icomoon/Spinner7'
import { Help } from 'styled-icons/material/Help'
import { spin } from '../styles/animations'

const Container = styled.div`
  display: grid;
  grid-template-rows: 2.5rem 1fr;
  grid-gap: 1rem;
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
    .uploader {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-left: 1px solid ${props => props.theme.grey[5]};
      padding-left: 1rem;
      margin-bottom: 2rem;
      button {
        width: 12rem;
        height: 2.5rem;
        font-family: 'Roboto Bold';
        font-size: 1.1rem;
        background: ${props => props.theme.grey[0]};
        color: ${props => props.theme.grey[14]};
        border: 1px solid ${props => props.theme.grey[5]};
        border-radius: 2px;
      }
      span {
        font-size: 1.1rem;
        color: ${props => props.theme.grey[10]};
      }
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
  .overlay {
    display: ${props => (!props.show || props.selected ? 'none' : props.hovered ? 'grid' : 'none')};
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
  }
  svg {
    display: ${props => (!props.show ? 'block' : 'none')};
    width: 5rem;
    height: 5rem;
    color: rgba(0, 0, 0, 0.1);
    animation: ${spin} 2s linear infinite;
  }
`

const Thumbnails = ({ thumbnail, showThumbnails, getThumbnailSrc, onThumbnailClick }) => (
  <Container>
    <div>
      <span>Video Thumbnails</span>
      <Help />
    </div>
    <div>
      <div className="thumbnails">
        <Thumbnail
          index={1}
          show={showThumbnails}
          url={getThumbnailSrc(1)}
          selected={thumbnail === 1}
          hovered={true}
          onClick={() => onThumbnailClick(1)}
        >
          <Spinner />
          <div className="overlay">
            <span>Set as thumbnail</span>
          </div>
        </Thumbnail>
        <Thumbnail
          index={2}
          show={showThumbnails}
          url={getThumbnailSrc(2)}
          selected={thumbnail === 2}
          onClick={() => onThumbnailClick(2)}
        >
          <Spinner />
        </Thumbnail>
        <Thumbnail
          index={3}
          show={showThumbnails}
          url={getThumbnailSrc(3)}
          selected={thumbnail === 3}
          onClick={() => onThumbnailClick(3)}
        >
          <Spinner />
        </Thumbnail>
      </div>
      <div className="uploader">
        <button>Custom thumbnail</button>
        <span>Maximum file size is 2 MB.</span>
      </div>
    </div>
  </Container>
)

export default Thumbnails
