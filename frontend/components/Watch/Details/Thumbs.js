import styled from 'styled-components'
import { ThumbUp } from 'styled-icons/material/ThumbUp'
import { ThumbDown } from 'styled-icons/material/ThumbDown'

const Container = styled.div`
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

const LikesRatio = styled.div`
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

const Thumbs = ({ video, onClick }) => {
  let likes = 0
  let dislikes = 0
  video.reviews.forEach(r => {
    if (r.status === 'LIKE') likes += 1
    if (r.status === 'DISLIKE') dislikes += 1
  })
  const percent = Math.round((likes / (likes + dislikes)) * 100)
  return (
    <Container>
      <div className="thumbs-top">
        <div className="thumbs" onClick={() => onClick('LIKE')}>
          <ThumbUp />
          <div>{likes}</div>
        </div>
        <div className="thumbs" onClick={() => onClick('DISLIKE')}>
          <ThumbDown />
          <div>{dislikes}</div>
        </div>
      </div>
      <LikesRatio percent={percent}>
        <div className="bar" />
      </LikesRatio>
    </Container>
  )
}

export default Thumbs
