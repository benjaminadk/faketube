import styled from 'styled-components'
import { darken } from 'polished'

const Container = styled.div`
  position: relative;
  width: 3.5rem;
  height: 1.25rem;
  background: ${props => props.theme.grey[2]};
  border-radius: 1rem;
  .switch-handle {
    position: absolute;
    top: -0.3rem;
    right: ${props => (props.on ? 0 : '1.5rem')};
    width: 2rem;
    height: 2rem;
    background: ${props => (props.on ? darken(0.2, props.theme.secondary) : props.theme.grey[10])};
    border-radius: 50%;
    box-shadow: ${props => props.theme.shadows[5]};
    transition: right 0.25s;
  }
`

export default ({ on, onClick }) => (
  <Container on={on} onClick={onClick}>
    <div className="switch-handle" />
  </Container>
)
