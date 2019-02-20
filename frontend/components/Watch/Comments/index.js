import styled from 'styled-components'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import TopRow from './TopRow'
import AddComment from './AddComment'
import CommentItem from './CommentItem'

const COMMENTS_QUERY = gql`
  query COMMENTS_QUERY($where: CommentWhereInput, $orderBy: String, $skip: Int, $first: Int) {
    comments(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      id
      text
      reply
      edited
      createdAt
      user {
        id
        image
        name
      }
      reviews {
        id
        status
      }
      replies {
        id
        text
        reply
        edited
        createdAt
        user {
          id
          image
          name
        }
        reviews {
          id
          status
        }
      }
    }
  }
`

const Container = styled.div``

class Comments extends React.Component {
  state = {
    loading: true,
    orderBy: 'top',
    skip: 0,
    first: 20,
    comments: [],
    focus: false,
    text: '',
    buttons: false,
    count: 0
  }

  async componentDidMount() {
    await this.getComments()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.text.length === 0 && this.state.text.length >= 1) {
      this.setState({ buttons: true })
    }
    if (prevState.orderBy !== this.state.orderBy) {
      this.getComments()
    }
  }

  getComments = async () => {
    await this.setState({ loading: true })
    const {
      props: {
        query: { id },
        client
      },
      state: { orderBy, skip, first }
    } = this
    const res = await client.query({
      query: COMMENTS_QUERY,
      variables: {
        where: { video: { id }, reply: false },
        orderBy,
        skip,
        first
      },
      fetchPolicy: 'network-only'
    })
    const { comments } = res.data
    const count = comments.length
      ? comments.reduce((acc, val) => (acc += val.replies.length + 1), 0)
      : 0
    this.setState({ loading: false, comments, count })
  }

  onChange = e => {
    this.setState({ text: e.target.value })
  }

  onFocus = () => this.setState({ focus: true })

  onBlur = () => this.setState({ focus: false })

  onCommentClick = async createComment => {
    const {
      state: { text },
      props: {
        query: { id }
      }
    } = this
    const res = await createComment({
      variables: { id, data: { text, reply: false } }
    })
    const { success } = res.data.createComment
    if (!success) {
      return // error creating comment
    }
    this.setState({ text: '', buttons: false })
    await this.getComments()
  }

  onCancelClick = () => this.setState({ text: '', buttons: false })

  setOrderBy = orderBy => this.setState({ orderBy })

  render() {
    const {
      props: { user, video },
      state: { loading, comments, count, focus, text, buttons }
    } = this
    return (
      <Container>
        <TopRow count={count} setOrderBy={this.setOrderBy} />
        <AddComment
          loading={loading}
          image={user.image}
          focus={focus}
          text={text}
          buttons={buttons}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onCancelClick={this.onCancelClick}
          onCommentClick={this.onCommentClick}
        />
        <div>
          {comments.map(c => (
            <CommentItem
              key={c.id}
              video={video}
              user={user}
              comment={c}
              getComments={this.getComments}
            />
          ))}
        </div>
      </Container>
    )
  }
}

export default withApollo(Comments)
