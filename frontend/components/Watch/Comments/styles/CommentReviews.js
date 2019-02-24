import styled from 'styled-components'
import { darken } from 'polished'

export const CommentReviewsStyles = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  .thumb-up,
  .thumb-down {
    width: 1.6rem;
    height: 1.6rem;
    cursor: pointer;
  }
  .thumb-up {
    margin-right: 0.75rem;
    color: ${props =>
      props.status === 'LIKE' ? darken(0.2, props.theme.secondary) : props.theme.grey[8]};
  }
  .thumb-down {
    margin-right: 2rem;
    color: ${props =>
      props.status === 'DISLIKE' ? darken(0.2, props.theme.secondary) : props.theme.grey[8]};
  }
  .likes {
    color: ${props => props.theme.grey[8]};
    font-size: 1.3rem;
    margin-right: 1rem;
  }
  & > :last-child {
    text-transform: uppercase;
    font-family: 'Roboto Bold';
    font-size: 1.3rem;
    color: ${props => props.theme.grey[10]};
    cursor: pointer;
  }
`
