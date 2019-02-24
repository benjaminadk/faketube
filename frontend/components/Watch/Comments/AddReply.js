import { Mutation } from 'react-apollo'
import { CREATE_REPLY_MUTATION } from '../../../apollo/createReply'
import CommentInput from '../../Shared/CommentInput'
import { AddReplyStyles, CommentButtons } from './styles/AddComment'

export default class AddReply extends React.Component {
  state = {
    focus: false,
    text: ''
  }

  onChange = e => this.setState({ text: e.target.value })

  onFocus = () => this.setState({ focus: true })

  onBlur = () => this.setState({ focus: false })

  onReplyClick = async createReply => {
    const {
      state: { text },
      props: { commentId }
    } = this
    const res = await createReply({
      variables: { id: commentId, data: { text, reply: true } }
    })
    const { success } = res.data.createReply
    if (!success) {
      return // error creating comment
    }
    this.setState({ text: '' })
    this.props.onHideReplyInput()
    await this.props.getComments()
  }

  onCancelClick = () => {
    this.setState({ text: '' })
    this.props.onHideReplyInput()
  }

  render() {
    const {
      props: { image },
      state: { focus, text }
    } = this
    return (
      <AddReplyStyles>
        <img className="image-sm" src={image} />
        <div>
          <CommentInput
            focus={focus}
            placeholder="Add a public reply..."
            value={text}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          <CommentButtons show={true} text={Boolean(text)}>
            <div onClick={this.onCancelClick}>cancel</div>
            <Mutation mutation={CREATE_REPLY_MUTATION}>
              {(createReply, { loading }) => (
                <button disabled={loading || !text} onClick={() => this.onReplyClick(createReply)}>
                  reply
                </button>
              )}
            </Mutation>
          </CommentButtons>
        </div>
      </AddReplyStyles>
    )
  }
}
