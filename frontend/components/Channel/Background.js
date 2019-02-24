import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { PhotoCamera } from 'styled-icons/material/PhotoCamera'
import { UPDATE_USER_MUTATION } from '../../apollo/updateUser'

const Container = styled.div`
  position: relative;
  height: 35vh;
  background-color: ${props => props.theme.grey[0]};
  background-image: ${props => (props.image ? `url("${props.image}")` : 'none')};
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  cursor: pointer;
  input {
    display: none;
  }
  .overlay {
    position: absolute;
    top: 2rem;
    right: 2rem;
    display: none;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    svg {
      color: ${props => props.theme.white};
      margin: 1rem;
    }
  }
  &:hover .overlay {
    display: block;
  }
`

export default ({ inputRef, image, onClick, onChange }) => (
  <Mutation mutation={UPDATE_USER_MUTATION}>
    {(updateUser, { loading }) => (
      <Container image={image} onClick={onClick}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={false}
          onChange={e => onChange(e, updateUser, true)}
        />
        <div className="overlay">
          <PhotoCamera size={25} />
        </div>
      </Container>
    )}
  </Mutation>
)
