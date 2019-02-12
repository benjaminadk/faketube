import styled from 'styled-components'

const VolumeHandle = styled.div.attrs(props => ({
  style: {
    left: props.percent - 1 + '%'
  }
}))`
  position: absolute;
  top: -4px;
  display: ${props => (props.show ? 'block' : 'none')};
  width: 1.25rem;
  height: 1.25rem;
  background: ${props => props.theme.white};
  border-radius: 50%;
  cursor: pointer;
`

const Handle = ({ handle: { percent, id }, show, getHandleProps }) => (
  <VolumeHandle show={show} percent={percent} {...getHandleProps(id)} />
)

export default Handle
