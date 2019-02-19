import styled from 'styled-components'
import { darken } from 'polished'

const CommentStyles = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${props => props.img}rem 1fr 2.5rem;
  grid-gap: 2rem;
  margin-bottom: 1.5rem;
  img {
    width: ${props => props.img}rem !important;
    height: ${props => props.img}rem !important;
    border-radius: 50%;
  }
  .comment-main {
    .text-row {
      max-height: ${props => (props.expand ? '100%' : '8rem')};
      overflow: hidden;
      font-size: 1.4rem;
      line-height: 2rem;
      margin-bottom: ${props => (props.more ? '0rem' : '1rem')};
      white-space: pre-wrap;
      a {
        color: ${props => darken(0.2, props.theme.secondary)};
      }
    }
    .more-row {
      font-family: 'Roboto Bold';
      font-size: 1.3rem;
      margin-bottom: 1rem;
      cursor: pointer;
    }
  }
  .more-vert {
    width: 2.5rem;
    height: 2.5rem;
    display: ${props => (props.moreVert ? 'block' : 'none')};
    color: ${props => props.theme.grey[8]};
    margin-top: 1rem;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.grey[10]};
    }
  }
`

export default CommentStyles
