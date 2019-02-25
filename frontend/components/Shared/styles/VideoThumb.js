import styled from 'styled-components'

export const VideoThumbStyles = styled.div`
  display: flex;
  flex-direction: ${props => (props.portrait ? 'column' : 'row')};
  margin-right: 0.5rem;
  margin-bottom: ${props => (props.portrait ? '3rem' : '.75rem')};
  cursor: pointer;
  .top {
    position: relative;
    margin-bottom: ${props => (props.portrait ? '1rem' : 0)};
    margin-right: ${props => (props.portrait ? 0 : '.75rem')};
    .thumb {
      width: ${props => props.width}rem;
      height: ${props => props.height}rem;
    }
    .watch {
      position: absolute;
      display: none;
      top: 5px;
      right: 5px;
      background: rgba(0, 0, 0, 0.75);
      border-radius: 2px;
      svg {
        width: 2rem;
        height: 2rem;
        color: ${props => props.theme.white};
        opacity: 0.8;
        margin: 0.4rem;
      }
      &:hover + .later {
        opacity: 0.75;
      }
    }
    .later {
      position: absolute;
      top: 5px;
      left: 50px;
      background: rgba(0, 0, 0, 0.75);
      color: ${props => props.theme.white};
      opacity: 0;
      border-radius: 2px;
      font-size: 1.3rem;
      padding: 0.75rem;
      transition: opacity 0.5s;
    }
    .duration {
      position: absolute;
      bottom: 7px;
      right: 5px;
      z-index: 2;
      font-family: 'Roboto Bold';
      font-size: 1.2rem;
      background: rgba(0, 0, 0, 0.8);
      color: ${props => props.theme.white};
      border-radius: 2px;
      padding: 0 0.35rem;
    }
  }
  .bottom {
    .title {
      display: grid;
      grid-template-columns: 18.5rem 2.5rem;
      min-height: 2.5rem;
      margin-bottom: 1rem;
      & > :first-child {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        width: 18rem;
        max-height: 3.2rem;
        -webkit-line-clamp: 2;
        font-family: 'Roboto Bold';
        font-size: 1.4rem;
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }
      .more-vert {
        display: none;
        width: 2.5rem;
        height: 2.5rem;
        color: ${props => props.theme.grey[5]};
        &:hover {
          color: ${props => props.theme.grey[10]};
        }
      }
    }
    .user,
    .info {
      display: flex;
      font-size: 1.4rem;
      color: ${props => props.theme.grey[12]};
    }
    .verified {
      width: 1.5rem;
      height: 1.5rem;
    }
    .new {
      font-size: 1.2rem;
      background: ${props => props.theme.grey[1]};
      color: ${props => props.theme.grey[10]};
      padding: 0.1rem 0.25rem;
      border-radius: 2px;
    }
  }
  &:hover .more-vert {
    display: block !important;
  }
  &:hover .watch {
    display: block !important;
  }
  &:hover .duration {
    display: none !important;
  }
`

export const ViewProgress = styled.div`
  position: absolute;
  bottom: 0.35rem;
  left: 0;
  width: 100%;
  height: 0.45rem;
  background: ${props => props.theme.grey[10]};
  .view-progress {
    position: absolute;
    bottom: 0rem;
    left: 0;
    width: ${props => props.progress}%;
    height: 0.45rem;
    background: ${props => props.theme.primary};
  }
`
