import styled, { keyframes } from 'styled-components'
import { darken, transparentize } from 'polished'
import { Spinner8 as Spinner } from 'styled-icons/icomoon/Spinner8'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import TextInput from './TextInput'

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($id: ID!, $data: CommentCreateInput) {
    createComment(id: $id, data: $data) {
      success
      comment {
        id
      }
    }
  }
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-gap: 3rem;
  margin-bottom: 2rem;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  & > :last-child {
    display: grid;
    grid-template-rows: auto 1fr;
    textarea {
      width: 100%;
      font-family: 'Roboto';
      font-size: 1.4rem;
      color: ${props => props.theme.black[0]};
      border: 0;
      outline: 0;
      padding-bottom: 0.5rem;
      overflow: hidden;
      resize: none;
    }
  }
`

export const Underline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 0.1rem;
  background: ${props => props.theme.grey[2]};
  & > :first-child,
  & > :last-child {
    opacity: ${props => (props.focus ? 1 : 0)};
    width: ${props => (props.focus ? '50%' : '0%')};
    height: 0.22rem;
    background: ${props => props.theme.grey[10]};
    transition: width 0.25s;
  }
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

const Loading = styled.div`
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

const AddComment = ({
  loading,
  image,
  text,
  focus,
  buttons,
  onChange,
  onFocus,
  onBlur,
  onCancelClick,
  onCommentClick
}) => {
  if (loading) {
    return (
      <Loading>
        <Spinner />
      </Loading>
    )
  } else {
    return (
      <Container>
        <img src={image} />
        <div>
          <div className="comments-input">
            <TextInput
              placeholder="Add a public comment..."
              value={text}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <Underline focus={focus}>
              <div />
              <div />
            </Underline>
          </div>
          <CommentButtons show={buttons} text={Boolean(text)}>
            <div onClick={onCancelClick}>cancel</div>
            <Mutation mutation={CREATE_COMMENT_MUTATION}>
              {(createComment, { loading }) => (
                <button disabled={loading || !text} onClick={() => onCommentClick(createComment)}>
                  comment
                </button>
              )}
            </Mutation>
          </CommentButtons>
        </div>
      </Container>
    )
  }
}

export default AddComment
