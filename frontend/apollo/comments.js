import gql from 'graphql-tag'

export const COMMENTS_QUERY = gql`
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
