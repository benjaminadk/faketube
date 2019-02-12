import styled from 'styled-components'
import formatDuration from '../../lib/formatDuration'

const Container = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 1.3rem;
  color: ${props => props.theme.white};
  margin-left: 1rem;
`

const TimeDisplay = ({ time, duration }) => (
  <Container>
    {formatDuration(time)}
    {' / '}
    {formatDuration(duration)}
  </Container>
)

export default TimeDisplay
