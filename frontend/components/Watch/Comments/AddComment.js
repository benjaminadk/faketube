import { Spinner8 as Spinner } from 'styled-icons/icomoon/Spinner8'
import { Mutation } from 'react-apollo'
import { CREATE_COMMENT_MUTATION } from '../../../apollo/createComment'
import CommentInput from '../../Shared/CommentInput'
import { AddCommentStyles, CommentButtons, Loading } from './styles/AddComment'

export default ({
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
      <AddCommentStyles>
        <img className="image-lg" src={image} />
        <div>
          <CommentInput
            focus={focus}
            placeholder="Add a public comment..."
            value={text}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
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
      </AddCommentStyles>
    )
  }
}
