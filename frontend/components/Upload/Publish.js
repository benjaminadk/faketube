import styled from 'styled-components'
import { darken } from 'polished'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const UPDATE_VIDEO_MUTATION = gql`
  mutation UPDATE_VIDEO_MUTATION($id: ID!, $data: VideoCreateInput) {
    updateVideo(id: $id, data: $data) {
      success
      video {
        id
      }
    }
  }
`

const Container = styled.div`
  display: grid;
  grid-template-rows: 3rem 1fr;
  span {
    font-size: 1rem;
    justify-self: flex-end;
    margin-top: 1rem;
    margin-right: 1rem;
  }
`

const PublishButton = styled.button`
  width: 12rem;
  height: 3rem;
  border: 0;
  font-family: 'Roboto Bold';
  font-size: 1.1rem;
  background: ${props => darken(0.2, props.theme.secondary)};
  color: ${props => props.theme.white};
  border-radius: 2px;
  cursor: pointer;
  &:disabled {
    background: ${props => props.theme.grey[0]};
    color: ${props => props.theme.grey[10]};
    border: 1px solid ${props => props.theme.grey[5]};
  }
`

const Publish = ({ videoID, saved, isPublished, onPublishClick }) => (
  <Mutation mutation={UPDATE_VIDEO_MUTATION}>
    {(updateVideo, { loading }) => (
      <Container>
        <PublishButton disabled={saved || loading} onClick={() => onPublishClick(updateVideo)}>
          {loading ? 'Saving...' : isPublished ? 'Save changes' : 'Publish'}
        </PublishButton>
        <span>
          {!videoID
            ? ''
            : loading
            ? 'Saving...'
            : saved && isPublished
            ? 'All changes saved.'
            : saved && !isPublished
            ? 'Draft saved.'
            : 'Changes not saved.'}
        </span>
      </Container>
    )}
  </Mutation>
)

export default Publish
