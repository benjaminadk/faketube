import styled from 'styled-components'

const Popup = styled.div`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  z-index: 300;
  width: ${props => (props.width ? `${props.width}rem` : 'auto')};
  display: ${props => (props.show ? 'block' : 'none')};
  background: ${props => props.theme.white};
  box-shadow: ${props => props.theme.shadows[2]};
  font-size: 1.3rem;
  & > :first-child {
    margin-top: 0.5rem;
  }
  & > :last-child {
    margin-bottom: 0.5rem;
  }
  & > * {
    padding: 1.75rem;
    cursor: pointer;
    &:hover {
      background: ${props => props.theme.grey[1]};
    }
  }
`

export default Popup
