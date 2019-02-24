import styled from 'styled-components'

export const VideoReviewStyles = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  margin-right: 2rem;
  .thumbs-top {
    display: flex;
    align-items: center;
    padding-bottom: 2rem;
    .thumbs:first-child {
      margin-right: 2rem;
      padding-left: 1rem;
    }
    .thumbs:last-child {
      padding-right: 1rem;
    }
    .thumbs {
      display: flex;
      align-items: center;
      color: ${props => props.theme.grey[8]};
      cursor: pointer;
      svg {
        width: 2rem;
        height: 2rem;
        color: inherit;
        margin-right: 0.75rem;
      }
      & > :last-child {
        font-family: 'Roboto Bold';
        font-size: 1.3rem;
      }
    }
  }
`

export const LikesRatioBar = styled.div`
  position: relative;
  width: 100%;
  height: 0.3rem;
  background: ${props => props.theme.grey[2]};
  .bar {
    position: absolute;
    width: ${props => props.percent}%;
    height: 0.3rem;
    background: ${props => props.theme.grey[6]};
  }
`
