import styled from 'styled-components'

const Overlay = styled.div`
  position: absolute;
  display: ${props => (props.show ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  background: black;
`

export default ({ show }) => <Overlay show={show} />
