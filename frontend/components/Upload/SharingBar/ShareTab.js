import styled from 'styled-components'
import { darken } from 'polished'
import {
  FacebookShareButton,
  FacebookIcon,
  GooglePlusShareButton,
  GooglePlusIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TumblrShareButton,
  TumblrIcon
} from 'react-share'

const Container = styled.div`
  .icons {
    display: flex;
    margin-bottom: 1rem;
    & > * {
      margin-right: 0.25rem;
      cursor: pointer;
      &:focus {
        outline: 0;
      }
    }
  }
  input {
    width: 66%;
    font-size: 2rem;
    padding: 0.5rem;
    color: ${props => props.theme.grey[10]};
    &:focus {
      outline: 1px solid ${props => darken(0.2, props.theme.secondary)};
    }
  }
`

const ShareTab = ({ inputRef, url, title, thumbnailURL, onShareInputClick }) => (
  <Container>
    <div className="icons">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} />
      </TwitterShareButton>
      <GooglePlusShareButton url={url}>
        <GooglePlusIcon size={32} />
      </GooglePlusShareButton>
      <RedditShareButton url={url} title={title}>
        <RedditIcon size={32} />
      </RedditShareButton>
      <TumblrShareButton url={url} title={title}>
        <TumblrIcon size={32} />
      </TumblrShareButton>
      <PinterestShareButton url={url} media={thumbnailURL}>
        <PinterestIcon size={32} />
      </PinterestShareButton>
    </div>
    <input ref={inputRef} type="text" value={url} readOnly onClick={onShareInputClick} />
  </Container>
)

export default ShareTab
