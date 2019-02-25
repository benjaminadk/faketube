import styled from 'styled-components'

export const VideoListStyles = styled.div`
  max-width: 400px;
  .up-next {
    margin-bottom: 1rem;
    .up-next-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      & > :first-child {
        font-size: 1.6rem;
      }
      .up-next-switch {
        display: flex;
        align-items: center;
        & > :first-child {
          font-family: 'Roboto Bold';
          font-size: 1.3rem;
          text-transform: uppercase;
          color: ${props => props.theme.grey[8]};
          margin-right: 1rem;
        }
      }
    }
  }
  .video-list {
    padding-top: 1.5rem;
    border-top: 1px solid ${props => props.theme.grey[3]};
  }
`
