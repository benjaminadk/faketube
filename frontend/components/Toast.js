import styled from 'styled-components'

const ToastStyles = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 200;
  display: ${props => (props.show ? 'block' : 'none')};
  background: ${props => props.theme.black[0]};
  color: ${props => props.theme.white};
  font-size: 1.3rem;
  padding: 1rem;
  border-radius: 2px;
`

export default ({ show, text }) => <ToastStyles show={show}>{text}</ToastStyles>
