import styled from 'styled-components'

const BufferedTrack = styled.div.attrs(props => ({
  style: { width: props.buffered + '%' }
}))`
  position: absolute;
  left: 0;
  z-index: 1;
  height: ${props => (props.hovered ? '.5rem' : '.4rem')};
  background: ${props => props.theme.grey[5]};
  opacity: 0.5;
  cursor: pointer;
`

const Buffered = ({ buffered, hovered, setHovered, getTrackProps }) =>
  console.log(buffered) || (
    <BufferedTrack
      buffered={buffered}
      hovered={hovered}
      {...getTrackProps({
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false)
      })}
    />
  )

export default Buffered
