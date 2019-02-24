import styled, { keyframes } from 'styled-components'
import { darken, transparentize } from 'polished'

export const AddCommentStyles = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-gap: 3rem;
  margin-bottom: 2rem;
  .image-lg {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  .image-sm {
    width: 2.4rem !important;
    height: 2.4rem !important;
    border-radius: 50%;
  }
  & > :last-child {
    display: grid;
    grid-template-rows: auto 1fr;
  }
`

export const AddReplyStyles = styled(AddCommentStyles)`
  grid-template-columns: 2.4rem 1fr;
  grid-gap: 1rem;
`

export const CommentButtons = styled.div`
  justify-self: flex-end;
  display: ${props => (props.show ? 'flex' : 'none')};
  align-items: center;
  margin-top: 0.5rem;
  & > * {
    text-transform: uppercase;
    font-family: 'Roboto Bold';
    font-size: 1.4rem;
    border-radius: 2px;
    cursor: pointer;
  }
  & > :first-child {
    color: ${props => props.theme.grey[10]};
    padding: 1rem 2rem;
    margin-right: 0.5rem;
  }
  & > :last-child {
    background: ${props =>
      props.text
        ? darken(0.2, props.theme.secondary)
        : transparentize(0.8, darken(0.2, props.theme.secondary))};
    color: ${props => props.theme.white};
    padding: 1rem 2rem;
    border: 0;
    outline: 0;
  }
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Loading = styled.div`
  width: 100%;
  height: 6rem;
  display: grid;
  justify-items: center;
  align-items: center;
  margin-bottom: 3rem;
  svg {
    width: 4rem;
    height: 4rem;
    color: ${props => props.theme.grey[10]};
    animation: ${spin} 0.5s linear infinite;
  }
`
