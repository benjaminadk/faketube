import styled from 'styled-components'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import TopRow from './TopRow'
import AddComment from './AddComment'
import CommentList from './CommentList'

const COMMENTS_QUERY = gql`
  query COMMENTS_QUERY(
    $where: CommentWhereInput
    $orderBy: CommentOrderByInput
    $skip: Int
    $first: Int
  ) {
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
    orderBy: 'createdAt_DESC',
    skip: 0,
    first: 20,
    comments: [],
    focus: false,
    text: '',
    buttons: false
  }

  async componentDidMount() {
    await this.getComments('createdAt_DESC', 0, 20)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.text.length === 0 && this.state.text.length === 1) {
      this.setState({ buttons: true })
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
    this.setState({ loading: false, comments: res.data.comments })
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

  render() {
    const {
      props: { user },
      state: { loading, comments, focus, text, buttons }
    } = this
    return (
      <Container>
        <TopRow length={comments.length} />
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
        <CommentList comments={comments} />
      </Container>
    )
  }
}

export default withApollo(Comments)
