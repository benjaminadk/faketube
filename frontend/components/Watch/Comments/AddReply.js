import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Container, Underline, CommentButtons } from './AddComment'
import TextInput from './TextInput'

const CREATE_REPLY_MUTATION = gql`
  mutation CREATE_REPLY_MUTATION($id: ID!, $data: CommentCreateInput) {
    createReply(id: $id, data: $data) {
      success
      comment {
        id
      }
    }
  }
`

const ReplyContainer = styled(Container)`
  grid-template-columns: 2.4rem 1fr;
  grid-gap: 1rem;
  img {
    width: 2.4rem !important;
    height: 2.4rem !important;
  }
`

class AddReply extends React.Component {
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
      <ReplyContainer>
        <img src={image} />
        <div>
          <div className="comments-input">
            <TextInput
              placeholder="Add a public reply..."
              value={text}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
            <Underline focus={focus}>
              <div />
              <div />
            </Underline>
          </div>
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
      </ReplyContainer>
    )
  }
}

export default AddReply
